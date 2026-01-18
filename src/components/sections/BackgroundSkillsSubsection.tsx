import { ArrowDownUp, ArrowUpDown, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { ResumeData } from "../../types/resume";
import { SectionInput } from "../SectionInput";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface BackgroundSkillsSubsectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
}

export const BackgroundSkillsSubsection = ({
	resumeData,
	updateResumeData,
}: BackgroundSkillsSubsectionProps) => {
	const isVisible = resumeData.sectionsVisible?.skills !== false;
	const [activeTab, setActiveTab] = useState<string>("live");

	const handleSortSkills = () => {
		const skillsText = resumeData.skills.trim();
		if (!skillsText) return;

		// Parse skills - handle both markdown list format and comma-separated
		let skillsList: string[] = [];

		// Try markdown list format first (lines starting with - or *)
		const markdownLines = skillsText.split("\n").filter((line) => line.trim());
		const isMarkdownList = markdownLines.some(
			(line) => line.trim().startsWith("-") || line.trim().startsWith("*"),
		);

		if (isMarkdownList) {
			// Extract skills from markdown list format
			skillsList = markdownLines
				.map((line) => {
					const trimmed = line.trim();
					// Remove markdown list markers (-, *, or numbered)
					return trimmed
						.replace(/^[-*]\s+/, "")
						.replace(/^\d+\.\s+/, "")
						.trim();
				})
				.filter((skill) => skill.length > 0);
		} else {
			// Try comma-separated format
			skillsList = skillsText
				.split(",")
				.map((skill) => skill.trim())
				.filter((skill) => skill.length > 0);
		}

		if (skillsList.length === 0) return;

		// Remove duplicates (case-insensitive) and sort alphabetically
		const seen = new Set<string>();
		const uniqueSkills = skillsList.filter((skill) => {
			const lower = skill.toLowerCase();
			if (seen.has(lower)) {
				return false;
			}
			seen.add(lower);
			return true;
		});

		// Sort alphabetically (case-insensitive)
		const sortedSkills = uniqueSkills.sort((a, b) =>
			a.localeCompare(b, undefined, { sensitivity: "base" }),
		);

		// Convert back to comma-separated format
		const sortedCommaSeparated = sortedSkills.join(", ");

		updateResumeData({ skills: sortedCommaSeparated });
	};

	const handleSwapDraft = () => {
		const currentLive = resumeData.skills;
		const currentDraft = resumeData.skillsDraft || "";
		updateResumeData({
			skills: currentDraft,
			skillsDraft: currentLive,
		});
	};

	return (
		<div className="flex flex-col gap-3" id="section-skills">
			<div className="flex items-center justify-between">
				<h3 className="text-base font-semibold text-gray-900 dark:text-white">
					Skills
				</h3>
				<div className="flex items-center gap-2">
					<Button
						onClick={handleSortSkills}
						size="sm"
						variant="outline"
						title="Sort skills alphabetically"
					>
						<ArrowDownUp className="size-4 mr-1" />
						Sort
					</Button>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							updateResumeData({
								sectionsVisible: {
									...resumeData.sectionsVisible,
									skills: !isVisible,
								},
							});
						}}
						className="p-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
						title={isVisible ? "Hide in preview" : "Show in preview"}
					>
						{isVisible ? (
							<Eye className="h-4 w-4" />
						) : (
							<EyeOff className="h-4 w-4" />
						)}
					</button>
				</div>
			</div>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="live">Live</TabsTrigger>
					<TabsTrigger
						value="draft"
						className="data-[state=active]:!bg-amber-50/50 dark:data-[state=active]:!bg-amber-950/30 data-[state=active]:!text-foreground data-[state=active]:border-amber-300 dark:data-[state=active]:border-amber-700 data-[state=active]:border-dashed data-[state=active]:border-2"
					>
						Draft
					</TabsTrigger>
				</TabsList>
				<TabsContent value="live" className="mt-2 space-y-4">
					<SectionInput
						label="Skills"
						value={resumeData.skills}
						onChange={(value) => updateResumeData({ skills: value })}
						placeholder="- Skill 1\n- Skill 2\n- Skill 3"
					/>
				</TabsContent>
				<TabsContent value="draft" className="mt-2 space-y-4">
					<div className="flex flex-col gap-3">
						<div className="flex items-center justify-between">
							<p className="text-xs text-muted-foreground">
								This draft is not shown in the preview.
							</p>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={handleSwapDraft}
								className="h-8 gap-1.5"
							>
								<ArrowUpDown className="size-3.5" />
								Swap with Live
							</Button>
						</div>
						<SectionInput
							value={resumeData.skillsDraft || ""}
							onChange={(value) => updateResumeData({ skillsDraft: value })}
							placeholder="Draft skills..."
						/>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

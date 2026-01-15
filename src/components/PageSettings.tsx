import { Settings2 } from "lucide-react";
import type { ResumeData } from "../types/resume";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface PageSettingsProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
}

export const PageSettings = ({
	resumeData,
	updateResumeData,
}: PageSettingsProps) => {
	const sections = [
		{ id: "experience", label: "Work History" },
		{ id: "sideProjects", label: "Side Projects" },
		{ id: "volunteering", label: "Volunteering" },
		{ id: "background", label: "Background" },
		{ id: "personal", label: "Personal" },
	] as const;

	const allVisibleStates = {
		experience: resumeData.sectionsVisible?.experience !== false,
		sideProjects: resumeData.sectionsVisible?.sideProjects !== false,
		volunteering: resumeData.sectionsVisible?.volunteering !== false,
		education: resumeData.sectionsVisible?.education !== false,
		skills: resumeData.sectionsVisible?.skills !== false,
		personal: resumeData.sectionsVisible?.personal !== false,
	};

	const hasHidden = Object.values(allVisibleStates).some((v) => !v);
	const hasVisible = Object.values(allVisibleStates).some((v) => v);

	const handleToggleAll = (visible: boolean) => {
		updateResumeData({
			sectionsVisible: {
				...resumeData.sectionsVisible,
				experience: visible,
				sideProjects: visible,
				volunteering: visible,
				education: visible,
				skills: visible,
				personal: visible,
			},
		});
	};

	const handleToggleSection = (sectionId: string) => {
		if (sectionId === "background") {
			const currentVisible =
				resumeData.sectionsVisible?.education !== false ||
				resumeData.sectionsVisible?.skills !== false;
			updateResumeData({
				sectionsVisible: {
					...resumeData.sectionsVisible,
					education: !currentVisible,
					skills: !currentVisible,
				},
			});
		} else {
			const key = sectionId as keyof NonNullable<ResumeData["sectionsVisible"]>;
			const currentVisible = resumeData.sectionsVisible?.[key] !== false;
			updateResumeData({
				sectionsVisible: {
					...resumeData.sectionsVisible,
					[key]: !currentVisible,
				},
			});
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" size="icon" className="size-9 rounded-full">
					<Settings2 className="size-5" />
					<span className="sr-only">Page Settings</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-56 p-4" align="end">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<h4 className="font-medium leading-none text-sm">
								Visible Sections
							</h4>
							<p className="text-[10px] text-muted-foreground">
								Toggle which sections to show.
							</p>
						</div>
					</div>

					<div className="flex items-center -space-x-px w-full">
						<Button
							variant="outline"
							size="sm"
							className="h-7 text-[10px] flex-1 rounded-r-none"
							onClick={() => handleToggleAll(true)}
							disabled={!hasHidden}
						>
							Show All
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="h-7 text-[10px] flex-1 rounded-l-none"
							onClick={() => handleToggleAll(false)}
							disabled={!hasVisible}
						>
							Hide All
						</Button>
					</div>

					<div className="space-y-3 pt-1">
						{sections.map((section) => {
							const isChecked =
								section.id === "background"
									? resumeData.sectionsVisible?.education !== false ||
										resumeData.sectionsVisible?.skills !== false
									: resumeData.sectionsVisible?.[
											section.id as keyof NonNullable<
												ResumeData["sectionsVisible"]
											>
										] !== false;

							return (
								<div key={section.id} className="flex items-center space-x-3">
									<Checkbox
										id={`visible-${section.id}`}
										checked={isChecked}
										onCheckedChange={() => handleToggleSection(section.id)}
									/>
									<Label
										htmlFor={`visible-${section.id}`}
										className="text-sm font-medium leading-none cursor-pointer"
									>
										{section.label}
									</Label>
								</div>
							);
						})}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

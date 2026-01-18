import { ArrowUpDown } from "lucide-react";
import { useRef, useState } from "react";
import type { ResumeData } from "../../types/resume";
import { ErrorBoundary } from "../ErrorBoundary";
import { SectionInput } from "../SectionInput";
import { Button } from "../ui/button";
import { CollapsibleContent } from "../ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { SectionHeader } from "./SectionHeader";

interface PersonalSectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	isOpen: boolean;
	attributes: React.HTMLAttributes<HTMLButtonElement>;
	listeners: React.HTMLAttributes<HTMLButtonElement>;
}

export const PersonalSection = ({
	resumeData,
	updateResumeData,
	isOpen,
	attributes,
	listeners,
}: PersonalSectionProps) => {
	const personal = resumeData.personal || { bulletPoints: "", visible: true };
	const sectionTitle = resumeData.sectionTitles?.personal || "Personal";
	const bulletPointsRef = useRef<HTMLTextAreaElement>(null);
	const draftRef = useRef<HTMLTextAreaElement>(null);
	const [activeTab, setActiveTab] = useState<string>("live");

	const handleFieldChange = (
		field: "bulletPoints" | "bulletPointsDraft" | "visible",
		value: string | boolean,
	) => {
		updateResumeData({
			personal: {
				...personal,
				[field]: value,
			},
		});
	};

	const handleSwapDraft = () => {
		const currentLive = personal.bulletPoints;
		const currentDraft = personal.bulletPointsDraft || "";
		updateResumeData({
			personal: {
				...personal,
				bulletPoints: currentDraft,
				bulletPointsDraft: currentLive,
			},
		});
	};

	return (
		<ErrorBoundary>
			<SectionHeader
				title={sectionTitle}
				isOpen={isOpen}
				attributes={attributes}
				listeners={listeners}
				onTitleChange={(newTitle) => {
					updateResumeData({
						sectionTitles: {
							...resumeData.sectionTitles,
							personal: newTitle,
						},
					});
				}}
			/>
			<CollapsibleContent>
				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="w-full mt-4"
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
							ref={bulletPointsRef}
							label="Bullet Points"
							value={personal.bulletPoints}
							onChange={(value) => handleFieldChange("bulletPoints", value)}
							placeholder="- Description or achievement\n- Another point"
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
								ref={draftRef}
								value={personal.bulletPointsDraft || ""}
								onChange={(value) => handleFieldChange("bulletPointsDraft", value)}
								placeholder="Draft bullet points..."
							/>
						</div>
					</TabsContent>
				</Tabs>
			</CollapsibleContent>
		</ErrorBoundary>
	);
};

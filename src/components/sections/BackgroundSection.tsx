import type { ResumeData } from "../../types/resume";
import { ErrorBoundary } from "../ErrorBoundary";
import { CollapsibleContent } from "../ui/collapsible";
import { BackgroundEducationSubsection } from "./BackgroundEducationSubsection";
import { BackgroundSkillsSubsection } from "./BackgroundSkillsSubsection";
import { SectionHeader } from "./SectionHeader";

interface BackgroundSectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	attributes: React.HTMLAttributes<HTMLButtonElement>;
	listeners: React.HTMLAttributes<HTMLButtonElement>;
}

export const BackgroundSection = ({
	resumeData,
	updateResumeData,
	isOpen,
	attributes,
	listeners,
}: BackgroundSectionProps) => {
	const sectionTitle = resumeData.sectionTitles?.background || "Background";

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
							background: newTitle,
						},
					});
				}}
			/>
			<CollapsibleContent>
				<div className="flex flex-col gap-3">
					<BackgroundSkillsSubsection
						resumeData={resumeData}
						updateResumeData={updateResumeData}
					/>
					<BackgroundEducationSubsection
						resumeData={resumeData}
						updateResumeData={updateResumeData}
					/>
				</div>
			</CollapsibleContent>
		</ErrorBoundary>
	);
};

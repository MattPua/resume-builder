import type { ResumeData } from "../../types/resume";
import { ErrorBoundary } from "../ErrorBoundary";
import { TextInput } from "../TextInput";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { SectionHeader } from "./SectionHeader";

interface HeaderSectionProps {
	resumeData: ResumeData;
	updateResumeData: (data: Partial<ResumeData>) => void;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export const HeaderSection = ({
	resumeData,
	updateResumeData,
	isOpen,
	onOpenChange,
}: HeaderSectionProps) => {
	const sectionTitle = resumeData.sectionTitles?.header || "Header & Contact";

	return (
		<ErrorBoundary>
			<Collapsible
				open={isOpen}
				onOpenChange={onOpenChange}
				className="rounded-lg border shadow-sm transition-all duration-200 bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
				id="section-header"
			>
				<div className="p-6">
					<SectionHeader
						title={sectionTitle}
						isOpen={isOpen}
						onTitleChange={(newTitle) =>
							updateResumeData({
								sectionTitles: {
									...resumeData.sectionTitles,
									header: newTitle,
								},
							})
						}
					/>
					<CollapsibleContent>
						<div className="flex flex-col gap-4">
							<TextInput
								label="Name"
								value={resumeData.name}
								onChange={(value) => updateResumeData({ name: value })}
								placeholder="Your Full Name"
							/>
							<TextInput
								label="Email"
								type="email"
								value={resumeData.email}
								onChange={(value) => updateResumeData({ email: value })}
								placeholder="your.email@example.com"
							/>
							<TextInput
								label="Phone"
								type="tel"
								value={resumeData.phone}
								onChange={(value) => updateResumeData({ phone: value })}
								placeholder="(123) 456-7890"
							/>
							<TextInput
								label="Website"
								type="url"
								value={resumeData.website}
								onChange={(value) => updateResumeData({ website: value })}
								placeholder="https://yourwebsite.com"
							/>
							<TextInput
								label="GitHub"
								type="url"
								value={resumeData.github}
								onChange={(value) => updateResumeData({ github: value })}
								placeholder="https://github.com/username"
							/>
						</div>
					</CollapsibleContent>
				</div>
			</Collapsible>
		</ErrorBoundary>
	);
};

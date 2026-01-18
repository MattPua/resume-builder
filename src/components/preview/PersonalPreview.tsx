import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ResumeData } from "../../types/resume";
import { SectionPreview } from "./SectionPreview";

interface PersonalPreviewProps {
	personal?: ResumeData["personal"];
	title?: string;
	backgroundColor?: string;
	textColor?: string;
	layoutMode?: "compact" | "default" | "comfortable";
	onFocusSection?: () => void;
}

export const PersonalPreview = ({
	personal,
	title = "Personal",
	backgroundColor,
	textColor,
	layoutMode = "default",
	onFocusSection,
}: PersonalPreviewProps) => {
	if (!personal) return null;
	if (!personal.bulletPoints || personal.bulletPoints.trim() === "")
		return null;

	return (
		<SectionPreview
			title={title}
			backgroundColor={backgroundColor}
			textColor={textColor}
			layoutMode={layoutMode}
		>
			<div
				role="button"
				tabIndex={0}
				className="prose prose-sm max-w-none group cursor-pointer hover:bg-primary/5 transition-colors rounded-md -m-1 p-1"
				onClick={onFocusSection}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onFocusSection?.();
					}
				}}
			>
				<ReactMarkdown remarkPlugins={[remarkGfm]}>
					{personal.bulletPoints}
				</ReactMarkdown>
			</div>
		</SectionPreview>
	);
};

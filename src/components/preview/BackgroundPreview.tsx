import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { EducationEntry } from "../../types/resume";
import { SectionPreview } from "./SectionPreview";

interface BackgroundPreviewProps {
	education: (EducationEntry & { originalIndex: number })[];
	skills: string;
	showSkills: boolean;
	title?: string;
	backgroundColor?: string;
	textColor?: string;
	layoutMode?: "compact" | "default" | "comfortable";
	onFocusSection?: (index?: number | "skills") => void;
}

export const BackgroundPreview = ({
	education,
	skills,
	showSkills,
	title = "Background",
	backgroundColor,
	textColor,
	layoutMode = "default",
	onFocusSection,
}: BackgroundPreviewProps) => {
	const hasEducation = education.length > 0;
	const hasSkills = showSkills && skills;

	if (!hasEducation && !hasSkills) return null;

	const spacingMap = {
		compact: "gap-1",
		default: "gap-2",
		comfortable: "gap-3",
	}[layoutMode];

	return (
		<SectionPreview
			title={title}
			backgroundColor={backgroundColor}
			textColor={textColor}
			layoutMode={layoutMode}
		>
			<div className={`flex flex-col ${spacingMap}`}>
				{hasEducation && (
					<div className="flex flex-col gap-1">
						{education.map((entry) => (
							<div
								key={`${entry.institution}-${entry.degree}-${entry.originalIndex}`}
								role="button"
								tabIndex={0}
								className="group cursor-pointer hover:bg-primary/5 transition-colors rounded-md -m-1 p-1"
								onClick={() => onFocusSection?.(entry.originalIndex)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										onFocusSection?.(entry.originalIndex);
									}
								}}
							>
								<div className="flex items-baseline justify-between gap-4">
									<h3
										className="text-base font-semibold text-gray-900"
										style={{ color: "#111827" }}
									>
										{entry.degree}
										{entry.institution && (
											<>
												{" @ "}
												{entry.institutionUrl ? (
													<a
														href={entry.institutionUrl}
														target="_blank"
														rel="noopener noreferrer"
														style={{
															color: "#111827",
															textDecoration: "none",
														}}
														onClick={(e) => e.stopPropagation()}
													>
														{entry.institution}
													</a>
												) : (
													entry.institution
												)}
											</>
										)}
									</h3>
									{(entry.startDate || entry.endDate) && (
										<span
											className="text-sm text-gray-600 whitespace-nowrap shrink-0"
											style={{ color: "#4b5563" }}
										>
											{entry.startDate}{" "}
											{entry.endDate ? `— ${entry.endDate}` : ""}
										</span>
									)}
								</div>
								{entry.bulletPoints && (
									<div className="prose prose-sm max-w-none mt-0">
										<ReactMarkdown remarkPlugins={[remarkGfm]}>
											{entry.bulletPoints}
										</ReactMarkdown>
									</div>
								)}
							</div>
						))}
					</div>
				)}
				{hasSkills && (
					<div
						role="button"
						tabIndex={0}
						className="group cursor-pointer hover:bg-primary/5 transition-colors rounded-md -m-1 p-1"
						onClick={() => onFocusSection?.("skills")}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								onFocusSection?.("skills");
							}
						}}
					>
						<div className="flex items-start gap-2">
							<span
								className="text-sm font-semibold text-gray-900 whitespace-nowrap"
								style={{ color: "#111827" }}
							>
								Skills:
							</span>
							<div className="prose prose-sm max-w-none flex-1">
								<ReactMarkdown remarkPlugins={[remarkGfm]}>
									{skills}
								</ReactMarkdown>
							</div>
						</div>
					</div>
				)}
			</div>
		</SectionPreview>
	);
};

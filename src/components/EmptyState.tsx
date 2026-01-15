import { Link } from "@tanstack/react-router";
import { FileText, HelpCircle, Plus, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import logo from "./ui/logo.webp";

interface EmptyStateProps {
	onStartFresh: () => void;
	onLoadSample: () => void;
	onImportMarkdownText: () => void;
}

export const EmptyState = ({
	onStartFresh,
	onLoadSample,
	onImportMarkdownText,
}: EmptyStateProps) => {
	return (
		<div className="flex flex-col items-start justify-center min-h-[80vh] px-4">
			<div className="mt-10 sm:mt-0 max-w-2xl w-full text-center space-y-10 sm:space-y-8 animate-in fade-in zoom-in duration-500">
				<div className="flex items-center justify-center">
					<div className="relative">
						<div className="absolute inset-0 rounded-full bg-gray-50 bg-animate-pulse scale-150" />
						<img
							src={logo}
							alt="Your Resume Builder Logo"
							className="size-24 object-contain relative z-10 dark:invert"
						/>
					</div>
				</div>

				<div className="space-y-4 sm:space-y-3">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
						Build your professional resume in minutes.
					</h1>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
					<div className="flex flex-col gap-2">
						<Button
							onClick={onStartFresh}
							size="lg"
							className="h-auto py-6 flex flex-col items-center gap-3 text-lg"
							aria-label="Start a new resume from scratch"
						>
							<Plus className="size-6" />
							<div className="flex flex-col items-center">
								<span>Start from Scratch</span>
								<span className="text-xs font-normal opacity-80">
									Begin with a blank canvas
								</span>
							</div>
						</Button>

						<Button
							variant="secondary"
							onClick={onLoadSample}
							className="h-auto py-4 flex items-center justify-center gap-2"
							aria-label="Load sample data to see how it works"
						>
							<Sparkles className="size-4 text-amber-500" />
							<span className="font-semibold text-sm">Load Sample Data</span>
						</Button>
					</div>

					<div className="grid grid-cols-1 gap-2">
						<Button
							variant="outline"
							onClick={onImportMarkdownText}
							className="h-full py-6 flex flex-col items-center justify-center gap-3 px-6"
							aria-label="Import resume by pasting markdown text"
						>
							<FileText className="size-6 text-blue-500" />
							<div className="flex flex-col items-center">
								<span className="font-semibold text-lg">Paste Markdown</span>
								<span className="text-xs font-normal text-gray-500">
									Import from text
								</span>
							</div>
						</Button>
					</div>
				</div>

				<div className="pt-2 space-y-4">
					<p className="text-xs text-gray-500 dark:text-gray-500">
						Already have a resume? Try the Markdown import to quickly bring your
						data over.
					</p>
					<p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1.5">
						<HelpCircle className="size-4" />
						<span>Have questions? Check out our</span>
						<Link
							to="/faqs"
							className="text-primary hover:underline font-semibold"
						>
							Frequently Asked Questions
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

import { Github } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../ui/tooltip";

export const SiteFooter = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4 px-4 lg:px-8 no-print mt-auto">
			<div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
						© {currentYear} Your Resume Builder.
					</p>
					<span className="hidden md:inline text-gray-300 dark:text-gray-700">|</span>
					<p className="hidden md:inline text-xs text-gray-400 dark:text-gray-500">
						A tool for crafting professional resumes with ease.
					</p>
				</div>

				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2 pr-4 md:border-r border-gray-200 dark:border-gray-800">
						<span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
							Theme
						</span>
						<ThemeToggle />
					</div>
					
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full size-8 hover:bg-gray-100 dark:hover:bg-gray-700"
								asChild
							>
								<a
									href="https://github.com/MattPua/resume-builder"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Github className="size-4" />
									<span className="sr-only">GitHub Repository</span>
								</a>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>View on GitHub</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</footer>
	);
};

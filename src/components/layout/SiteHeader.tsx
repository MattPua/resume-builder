import logo from "../ui/logo.jpeg";
import { Link } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const SiteHeader = () => {
	return (
		<header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 no-print">
			<div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-3 group cursor-pointer">
					<img
						src={logo}
						alt="Your Resume Builder Logo"
						className="size-12 object-contain dark:invert transition-transform duration-300 group-hover:scale-110"
					/>
					<div className="relative">
						<h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
							Your Resume Builder
						</h1>
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-in-out group-hover:w-full" />
					</div>
				</Link>
				<div className="flex items-center gap-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full size-10"
								asChild
							>
								<Link to="/about">
									<Info className="size-5" />
									<span className="sr-only">How it works & Privacy</span>
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>How it works & Privacy</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</header>
	);
};

import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Database,
	FileText,
	HelpCircle,
	ShieldCheck,
	Sparkles,
	User,
	Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import logo from "./ui/logo.webp";

interface EmptyStateProps {
	onStartFresh: () => void;
	onLoadSample: () => void;
	onImportMarkdownText: () => void;
	hasExistingData?: boolean;
}

export const EmptyState = ({
	onStartFresh,
	onLoadSample,
	onImportMarkdownText,
	hasExistingData = false,
}: EmptyStateProps) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
			<div className="mt-10 sm:mt-0 max-w-2xl w-full text-center space-y-6 sm:space-y-4 animate-in fade-in zoom-in duration-500">
				<div className="flex items-center justify-center">
					<div className="relative">
						<img
							src={logo}
							alt="Your Resume Builder Logo"
							className="size-32 sm:size-40 object-contain relative z-10 dark:invert"
						/>
					</div>
				</div>

				<div className="space-y-4 sm:space-y-3">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
						Build a Professional Resume for Free — No Signup Required
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
						Create a modern, ATS-friendly resume directly in your browser. Your
						data never leaves your device.
					</p>
				</div>

				<div
					className={`grid grid-cols-1 ${hasExistingData ? "" : "sm:grid-cols-2"} gap-4 pt-2`}
				>
					<div className="flex flex-col gap-2">
						<Button
							onClick={onStartFresh}
							size="lg"
							className={`h-auto py-6 flex flex-col items-center gap-3 text-lg group transition-all duration-300 ${
								hasExistingData
									? "w-full max-w-md mx-auto bg-primary shadow-xl shadow-primary/20 -translate-y-1 hover:bg-primary/90 hover:shadow-primary/30 hover:-translate-y-1.5"
									: ""
							}`}
							aria-label={
								hasExistingData ? "Continue Building" : "Build Your Resume Free"
							}
						>
							<div className="flex flex-col items-center gap-1 relative">
								<span className="flex items-center gap-2 font-bold">
									{hasExistingData
										? "Continue Building"
										: "Build Your Resume Free"}
									{hasExistingData && (
										<ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 animate-mini-bounce" />
									)}
								</span>
								<span className="text-xs font-normal opacity-80">
									{hasExistingData
										? "Pick up right where you left off"
										: "100% Free • No Payment Required"}
								</span>
								{hasExistingData && (
									<div className="absolute -top-8 -right-8 transition-opacity duration-500">
										<Sparkles className="size-6 text-yellow-400 animate-pulse" />
									</div>
								)}
							</div>
						</Button>

						{!hasExistingData && (
							<Button
								variant="secondary"
								onClick={onLoadSample}
								className="h-auto py-4 flex items-center justify-center gap-2"
								aria-label="Load sample data to see how it works"
							>
								<Sparkles className="size-4 text-amber-500" />
								<span className="font-semibold text-sm">
									Try with Sample Data
								</span>
							</Button>
						)}
					</div>

					{!hasExistingData && (
						<div className="grid grid-cols-1 gap-2">
							<Button
								variant="outline"
								onClick={onImportMarkdownText}
								className="h-full py-6 flex flex-col items-center justify-center gap-3 px-6"
								aria-label="Start Without Signing Up"
							>
								<FileText className="size-6 text-blue-500" />
								<div className="flex flex-col items-center">
									<span className="font-semibold text-lg">
										Start Without Signing Up
									</span>
									<span className="text-xs font-normal text-gray-500">
										Paste Markdown
									</span>
								</div>
							</Button>
						</div>
					)}
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-12">
					<div className="flex flex-col items-center gap-3 group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
						<div className="size-14 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 group-hover:shadow-xl group-hover:shadow-green-500/20">
							<ShieldCheck className="size-7" />
						</div>
						<div className="text-center space-y-1">
							<p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
								100% Free
							</p>
							<p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
								No hidden costs or subscriptions
							</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-3 group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
						<div className="size-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:shadow-xl group-hover:shadow-blue-500/20">
							<User className="size-7" />
						</div>
						<div className="text-center space-y-1">
							<p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
								No Account
							</p>
							<p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
								Start building immediately
							</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-3 group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
						<div className="size-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 group-hover:shadow-xl group-hover:shadow-purple-500/20">
							<Database className="size-7" />
						</div>
						<div className="text-center space-y-1">
							<p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
								Privacy-First
							</p>
							<p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
								All data stays local in your browser
							</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-3 group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
						<div className="size-14 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 group-hover:shadow-xl group-hover:shadow-amber-500/20">
							<Zap className="size-7" />
						</div>
						<div className="text-center space-y-1">
							<p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
								ATS-Friendly
							</p>
							<p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
								Recruiter-approved templates
							</p>
						</div>
					</div>
				</div>

				<div className="pt-2 space-y-4">
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

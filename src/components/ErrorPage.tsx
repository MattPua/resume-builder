import { Link } from "@tanstack/react-router";
import { AlertTriangle, Home, RefreshCw, ShieldAlert } from "lucide-react";
import { SiteFooter } from "./layout/SiteFooter";
import { SiteHeader } from "./layout/SiteHeader";
import { Button } from "./ui/button";

interface ErrorPageProps {
	error?: Error | null;
	resetErrorBoundary?: () => void;
}

export const ErrorPage = ({ error, resetErrorBoundary }: ErrorPageProps) => {
	const handleRefresh = () => {
		if (resetErrorBoundary) {
			resetErrorBoundary();
		} else {
			window.location.reload();
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
			<SiteHeader />

			<main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16 text-center">
				<div className="relative mb-8 group">
					<div className="absolute inset-0 rounded-full bg-red-500/10 animate-ping scale-150 opacity-20" />
					<div className="size-32 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-600 relative z-10 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
						<ShieldAlert className="size-16 animate-pulse" />
					</div>
					<div className="absolute -top-2 -right-2 size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 animate-bounce delay-100">
						<AlertTriangle className="size-6" />
					</div>
				</div>

				<div className="space-y-4 max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
					<h1 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-6xl">
						Oops!
					</h1>
					<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
						Something went sideways.
					</h2>
					<p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
						{error?.message ||
							"The resume builder encountered an unexpected error. Don't worry, your data is likely safe in local storage."}
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 mt-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
					<Button
						onClick={handleRefresh}
						size="lg"
						className="gap-2 px-8 py-6 text-lg"
					>
						<RefreshCw className="size-5" />
						Try Again
					</Button>
					<Button
						asChild
						variant="outline"
						size="lg"
						className="gap-2 px-8 py-6 text-lg"
					>
						<Link to="/">
							<Home className="size-5" />
							Back to Home
						</Link>
					</Button>
				</div>

				<div className="mt-12 text-sm text-gray-500 flex items-center gap-2 italic">
					<div className="size-1.5 rounded-full bg-red-500 animate-pulse" />
					We're working on making this more stable for your next career move!
				</div>
			</main>

			<SiteFooter />
		</div>
	);
};

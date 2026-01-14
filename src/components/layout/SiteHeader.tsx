import { InfoDialog } from "./InfoDialog";
import logo from "../ui/logo.jpeg";

export const SiteHeader = () => {
	return (
		<header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 no-print">
			<div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<img
						src={logo}
						alt="Your Resume Builder Logo"
						className="size-12 object-contain dark:invert"
					/>
					<h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
						Your Resume Builder
					</h1>
				</div>
				<div className="flex items-center gap-2">
					<InfoDialog />
				</div>
			</div>
		</header>
	);
};

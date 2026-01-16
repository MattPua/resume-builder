import * as React from "react";
import {
	Briefcase,
	ChevronsDown,
	ChevronsUp,
	Contact,
	FileDown,
	FileText,
	Folder,
	GraduationCap,
	HeartHandshake,
	Plus,
	RotateCcw,
	Search,
} from "lucide-react";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import type { ResumeData } from "@/types/resume";

const SECTION_ICONS = {
	header: Contact,
	experience: Briefcase,
	background: GraduationCap,
	sideProjects: Folder,
	volunteering: HeartHandshake,
	personal: FileText,
};

const SECTION_TITLES = {
	header: "Header & Contact",
	experience: "Experience",
	background: "Background",
	sideProjects: "Side Projects",
	volunteering: "Volunteering",
	personal: "Personal",
};

interface QuickNavProps {
	sectionOrder: string[];
	sectionsVisible?: ResumeData["sectionsVisible"];
	onSelectSection: (sectionId: string) => void;
	onAddExperience?: () => void;
	onAddEducation?: () => void;
	onAddProject?: () => void;
	onCollapseAll?: () => void;
	onExpandAll?: () => void;
	onExportPDF?: () => void;
	onReset?: () => void;
}

export const QuickNav = ({
	sectionOrder,
	sectionsVisible,
	onSelectSection,
	onAddExperience,
	onAddEducation,
	onAddProject,
	onCollapseAll,
	onExpandAll,
	onExportPDF,
	onReset,
}: QuickNavProps) => {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const visibleSections = ["header", ...sectionOrder].filter(
		(sectionId) =>
			sectionId === "header" ||
			sectionsVisible?.[sectionId as keyof typeof sectionsVisible] !== false,
	);

	const handleSelect = (sectionId: string) => {
		onSelectSection(sectionId);
		setOpen(false);
	};

	return (
		<>
			<div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:block no-print">
				<button
					onClick={() => setOpen(true)}
					className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all text-sm text-gray-500 dark:text-gray-400 group"
					type="button"
				>
					<Search className="size-4 group-hover:text-primary transition-colors" />
					<span>Quick Navigate</span>
					<div className="flex items-center gap-1 ml-2">
						<Kbd className="bg-gray-100 dark:bg-gray-700 border-none h-4 min-w-4 text-[10px]">
							{navigator.platform.indexOf("Mac") > -1 ? "⌘" : "Ctrl"}
						</Kbd>
						<Kbd className="bg-gray-100 dark:bg-gray-700 border-none h-4 min-w-4 text-[10px]">
							K
						</Kbd>
					</div>
				</button>
			</div>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a section name or action..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Quick Add">
						{onAddExperience && (
							<CommandItem
								onSelect={() => {
									onAddExperience();
									setOpen(false);
								}}
								className="flex items-center gap-2 cursor-pointer"
							>
								<Plus className="size-4" />
								<span>Add Work Experience</span>
							</CommandItem>
						)}
						{onAddEducation && (
							<CommandItem
								onSelect={() => {
									onAddEducation();
									setOpen(false);
								}}
								className="flex items-center gap-2 cursor-pointer"
							>
								<Plus className="size-4" />
								<span>Add Education</span>
							</CommandItem>
						)}
						{onAddProject && (
							<CommandItem
								onSelect={() => {
									onAddProject();
									setOpen(false);
								}}
								className="flex items-center gap-2 cursor-pointer"
							>
								<Plus className="size-4" />
								<span>Add Side Project</span>
							</CommandItem>
						)}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="View Actions">
						{onExpandAll && (
							<CommandItem
								onSelect={() => {
									onExpandAll();
									setOpen(false);
								}}
								className="flex items-center gap-2 cursor-pointer"
							>
								<ChevronsDown className="size-4" />
								<span>Expand All Sections</span>
							</CommandItem>
						)}
						{onCollapseAll && (
							<CommandItem
								onSelect={() => {
									onCollapseAll();
									setOpen(false);
								}}
								className="flex items-center gap-2 cursor-pointer"
							>
								<ChevronsUp className="size-4" />
								<span>Collapse All Sections</span>
							</CommandItem>
						)}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Data & Export">
						{onExportPDF && (
							<CommandItem
								onSelect={() => {
									onExportPDF();
									setOpen(false);
								}}
								className="flex items-center gap-2 cursor-pointer"
							>
								<FileDown className="size-4" />
								<span>Export to PDF</span>
							</CommandItem>
						)}
						{onReset && (
							<CommandItem
								onSelect={() => {
									onReset();
									setOpen(false);
								}}
								className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
							>
								<RotateCcw className="size-4" />
								<span>Reset Resume Data</span>
							</CommandItem>
						)}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Navigate to Section">
						{visibleSections.map((sectionId) => {
							const Icon = SECTION_ICONS[sectionId as keyof typeof SECTION_ICONS];
							const title =
								SECTION_TITLES[sectionId as keyof typeof SECTION_TITLES];

							return (
								<CommandItem
									key={sectionId}
									onSelect={() => handleSelect(sectionId)}
									className="flex items-center gap-2 cursor-pointer"
								>
									<Icon className="size-4" />
									<span>{title}</span>
								</CommandItem>
							);
						})}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};

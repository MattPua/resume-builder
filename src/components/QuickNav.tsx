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
	ChevronLeft,
	Layout,
	Palette,
	Type,
	Sun,
	Moon,
	Monitor,
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
import { useTheme } from "./ThemeProvider";

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
	onSelectSection: (sectionId: string, index?: number | "skills") => void;
	onAddExperience?: () => void;
	onAddEducation?: () => void;
	onAddProject?: () => void;
	onAddVolunteering?: () => void;
	onCollapseAll?: () => void;
	onExpandAll?: () => void;
	onExportPDF?: () => void;
	onReset?: () => void;
	onUpdateData?: (data: Partial<ResumeData>) => void;
	fonts?: { name: string; value: string }[];
	resumeData?: ResumeData;
}

export const QuickNav = ({
	sectionOrder,
	sectionsVisible,
	onSelectSection,
	onAddExperience,
	onAddEducation,
	onAddProject,
	onAddVolunteering,
	onCollapseAll,
	onExpandAll,
	onExportPDF,
	onReset,
	onUpdateData,
	fonts = [],
	resumeData,
}: QuickNavProps) => {
	const [open, setOpen] = React.useState(false);
	const [search, setSearch] = React.useState("");
	const [view, setView] = React.useState<
		"main" | "fonts" | "colors" | "layout" | "exp" | "edu" | "proj" | "vol" | "theme"
	>("main");
	const { setTheme } = useTheme();

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
			if (e.key === "Backspace" && search === "" && view !== "main") {
				e.preventDefault();
				setView("main");
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [search, view]);

	// Reset when dialog closes
	React.useEffect(() => {
		if (!open) {
			setSearch("");
			setView("main");
		}
	}, [open]);

	const visibleSections = ["header", ...sectionOrder].filter((sectionId) => {
		if (sectionId === "header") return true;
		if (sectionId === "background") {
			return (
				sectionsVisible?.education !== false || sectionsVisible?.skills !== false
			);
		}
		return (
			sectionsVisible?.[sectionId as keyof typeof sectionsVisible] !== false
		);
	});

	const handleSelect = (sectionId: string) => {
		onSelectSection(sectionId);
		setOpen(false);
	};

	const handleJumpToEntry = (sectionId: string, index: number) => {
		onSelectSection(sectionId, index);
		setOpen(false);
	};

	const COLORS = [
		{ name: "Slate", value: "#475569" },
		{ name: "Blue", value: "#2563eb" },
		{ name: "Emerald", value: "#059669" },
		{ name: "Rose", value: "#e11d48" },
		{ name: "Amber", value: "#d97706" },
		{ name: "Violet", value: "#7c3aed" },
		{ name: "System", value: "" },
	];

	return (
		<>
			<div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:block no-print">
				<button
					onClick={() => setOpen(true)}
					className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all text-sm text-gray-500 dark:text-gray-400 group cursor-pointer"
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
				<CommandInput
					placeholder={
						view === "fonts"
							? "Search fonts..."
							: view === "colors"
								? "Search colors..."
								: view === "layout"
									? "Search layouts..."
									: view === "theme"
										? "Search themes..."
										: view === "exp"
											? "Search work experience..."
										: view === "edu"
											? "Search education..."
											: view === "proj"
												? "Search side projects..."
												: view === "vol"
													? "Search volunteering..."
													: "Type a section name or action..."
					}
					value={search}
					onValueChange={setSearch}
				/>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>

					{view === "main" && (
						<>
							<CommandGroup heading="Quick Add">
								{onAddExperience && sectionsVisible?.experience !== false && (
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
								{onAddEducation && sectionsVisible?.education !== false && (
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
								{onAddProject && sectionsVisible?.sideProjects !== false && (
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
								{onAddVolunteering && sectionsVisible?.volunteering !== false && (
									<CommandItem
										onSelect={() => {
											onAddVolunteering();
											setOpen(false);
										}}
										className="flex items-center gap-2 cursor-pointer"
									>
										<Plus className="size-4" />
										<span>Add Volunteering</span>
									</CommandItem>
								)}
							</CommandGroup>
							<CommandSeparator />

							<CommandGroup heading="Navigate to Section">
								{visibleSections.map((sectionId) => {
									const Icon =
										SECTION_ICONS[sectionId as keyof typeof SECTION_ICONS];
									const title =
										SECTION_TITLES[sectionId as keyof typeof SECTION_TITLES];

									return (
										<React.Fragment key={sectionId}>
											<CommandItem
												onSelect={() => handleSelect(sectionId)}
												className="flex items-center gap-2 cursor-pointer"
											>
												<Icon className="size-4" />
												<span>Jump to {title}</span>
											</CommandItem>

											{/* Specific entry sub-menus */}
											{sectionId === "experience" &&
												resumeData?.experience &&
												resumeData.experience.length > 0 && (
													<CommandItem
														onSelect={() => {
															setView("exp");
															setSearch("");
														}}
														className="flex items-center gap-2 cursor-pointer ml-6 text-xs text-muted-foreground justify-between"
													>
														<span>Jump to specific experience...</span>
														<Kbd className="bg-transparent border-none text-[10px] opacity-40">
															Enter
														</Kbd>
													</CommandItem>
												)}
											{sectionId === "background" &&
												resumeData?.education &&
												resumeData.education.length > 0 &&
												sectionsVisible?.education !== false && (
													<CommandItem
														onSelect={() => {
															setView("edu");
															setSearch("");
														}}
														className="flex items-center gap-2 cursor-pointer ml-6 text-xs text-muted-foreground justify-between"
													>
														<span>Jump to specific education...</span>
														<Kbd className="bg-transparent border-none text-[10px] opacity-40">
															Enter
														</Kbd>
													</CommandItem>
												)}
											{sectionId === "sideProjects" &&
												resumeData?.sideProjects &&
												resumeData.sideProjects.length > 0 && (
													<CommandItem
														onSelect={() => {
															setView("proj");
															setSearch("");
														}}
														className="flex items-center gap-2 cursor-pointer ml-6 text-xs text-muted-foreground justify-between"
													>
														<span>Jump to specific project...</span>
														<Kbd className="bg-transparent border-none text-[10px] opacity-40">
															Enter
														</Kbd>
													</CommandItem>
												)}
											{sectionId === "volunteering" &&
												resumeData?.volunteering &&
												resumeData.volunteering.length > 0 && (
													<CommandItem
														onSelect={() => {
															setView("vol");
															setSearch("");
														}}
														className="flex items-center gap-2 cursor-pointer ml-6 text-xs text-muted-foreground justify-between"
													>
														<span>Jump to specific volunteering...</span>
														<Kbd className="bg-transparent border-none text-[10px] opacity-40">
															Enter
														</Kbd>
													</CommandItem>
												)}
										</React.Fragment>
									);
								})}
							</CommandGroup>
							<CommandSeparator />

							<CommandGroup heading="Appearance">
								<CommandItem
									onSelect={() => {
										setView("fonts");
										setSearch("");
									}}
									className="flex items-center gap-2 cursor-pointer justify-between"
								>
									<div className="flex items-center gap-2">
										<Type className="size-4" />
										<span>Change Font...</span>
									</div>
									<Kbd className="bg-transparent border-none text-[10px] opacity-40">
										Enter
									</Kbd>
								</CommandItem>
								<CommandItem
									onSelect={() => {
										setView("colors");
										setSearch("");
									}}
									className="flex items-center gap-2 cursor-pointer justify-between"
								>
									<div className="flex items-center gap-2">
										<Palette className="size-4" />
										<span>Change Color...</span>
									</div>
									<Kbd className="bg-transparent border-none text-[10px] opacity-40">
										Enter
									</Kbd>
								</CommandItem>
								<CommandItem
									onSelect={() => {
										setView("layout");
										setSearch("");
									}}
									className="flex items-center gap-2 cursor-pointer justify-between"
								>
									<div className="flex items-center gap-2">
										<Layout className="size-4" />
										<span>Change Layout...</span>
									</div>
									<Kbd className="bg-transparent border-none text-[10px] opacity-40">
										Enter
									</Kbd>
								</CommandItem>
								<CommandItem
									onSelect={() => {
										setView("theme");
										setSearch("");
									}}
									className="flex items-center gap-2 cursor-pointer justify-between"
								>
									<div className="flex items-center gap-2">
										<Sun className="size-4 dark:hidden" />
										<Moon className="size-4 hidden dark:block" />
										<span>Change Theme...</span>
									</div>
									<Kbd className="bg-transparent border-none text-[10px] opacity-40">
										Enter
									</Kbd>
								</CommandItem>
							</CommandGroup>
							<CommandSeparator />

							<CommandGroup heading="View Actions">
								<CommandItem
									onSelect={() => {
										onExpandAll?.();
										setOpen(false);
									}}
									className="flex items-center gap-2 cursor-pointer"
									value="expand all sections"
								>
									<ChevronsDown className="size-4" />
									<span>Expand All Sections</span>
								</CommandItem>
								<CommandItem
									onSelect={() => {
										onCollapseAll?.();
										setOpen(false);
									}}
									className="flex items-center gap-2 cursor-pointer"
									value="collapse all sections"
								>
									<ChevronsUp className="size-4" />
									<span>Collapse All Sections</span>
								</CommandItem>
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
						</>
					)}

					{view === "fonts" && (
						<>
							<CommandGroup heading="Select Font">
								<CommandItem
									onSelect={() => setView("main")}
									className="flex items-center gap-2 cursor-pointer text-muted-foreground"
								>
									<ChevronLeft className="size-4" />
									<span>Back to main menu</span>
									<Kbd className="ml-auto bg-transparent border-none text-[10px] opacity-40">
										Esc
									</Kbd>
								</CommandItem>
								<CommandSeparator className="my-1" />
								{fonts.map((font) => (
									<CommandItem
										key={font.value}
										onSelect={() => {
											onUpdateData?.({ fontFamily: font.value });
											setOpen(false);
										}}
										className="flex items-center gap-2 cursor-pointer"
									>
										<Type className="size-4" />
										<span style={{ fontFamily: font.value }}>{font.name}</span>
									</CommandItem>
								))}
							</CommandGroup>
						</>
					)}

					{view === "colors" && (
						<>
							<CommandGroup heading="Select Header Color">
								<CommandItem
									onSelect={() => setView("main")}
									className="flex items-center gap-2 cursor-pointer text-muted-foreground"
								>
									<ChevronLeft className="size-4" />
									<span>Back to main menu</span>
									<Kbd className="ml-auto bg-transparent border-none text-[10px] opacity-40">
										Esc
									</Kbd>
								</CommandItem>
								<CommandSeparator className="my-1" />
								{COLORS.map((color) => (
									<CommandItem
										key={color.name}
										onSelect={() => {
											onUpdateData?.({ sectionHeaderTextColor: color.value });
											setOpen(false);
										}}
										className="flex items-center gap-2 cursor-pointer"
									>
										<Palette className="size-4" />
										<div className="flex items-center gap-2 flex-1">
											<span>{color.name}</span>
											{color.value && (
												<div
													className="size-3 rounded-full border border-gray-200 ml-auto"
													style={{ backgroundColor: color.value }}
												/>
											)}
										</div>
									</CommandItem>
								))}
							</CommandGroup>
						</>
					)}

					{view === "layout" && (
						<>
							<CommandGroup heading="Select Layout Mode">
								<CommandItem
									onSelect={() => setView("main")}
									className="flex items-center gap-2 cursor-pointer text-muted-foreground"
								>
									<ChevronLeft className="size-4" />
									<span>Back to main menu</span>
									<Kbd className="ml-auto bg-transparent border-none text-[10px] opacity-40">
										Esc
									</Kbd>
								</CommandItem>
								<CommandSeparator className="my-1" />
								<CommandItem
									onSelect={() => {
										onUpdateData?.({ layoutMode: "compact" });
										setOpen(false);
									}}
									className="flex items-center gap-2 cursor-pointer"
								>
									<Layout className="size-4 opacity-70" />
									<span>Compact</span>
								</CommandItem>
								<CommandItem
									onSelect={() => {
										onUpdateData?.({ layoutMode: "default" });
										setOpen(false);
									}}
									className="flex items-center gap-2 cursor-pointer"
								>
									<Layout className="size-4" />
									<span>Default</span>
								</CommandItem>
								<CommandItem
									onSelect={() => {
										onUpdateData?.({ layoutMode: "comfortable" });
										setOpen(false);
									}}
									className="flex items-center gap-2 cursor-pointer"
								>
									<Layout className="size-4 scale-110" />
									<span>Comfortable</span>
								</CommandItem>
							</CommandGroup>
						</>
					)}

					{view === "theme" && (
						<>
							<CommandGroup heading="Select Theme">
								<CommandItem
									onSelect={() => setView("main")}
									className="flex items-center gap-2 cursor-pointer text-muted-foreground"
								>
									<ChevronLeft className="size-4" />
									<span>Back to main menu</span>
									<Kbd className="ml-auto bg-transparent border-none text-[10px] opacity-40">
										Esc
									</Kbd>
								</CommandItem>
								<CommandSeparator className="my-1" />
								<CommandItem
									onSelect={() => {
										setTheme("light");
										setOpen(false);
									}}
									className="flex items-center gap-2 cursor-pointer"
								>
									<Sun className="size-4" />
									<span>Light</span>
								</CommandItem>
								<CommandItem
									onSelect={() => {
										setTheme("dark");
										setOpen(false);
									}}
									className="flex items-center gap-2 cursor-pointer"
								>
									<Moon className="size-4" />
									<span>Dark</span>
								</CommandItem>
								<CommandItem
									onSelect={() => {
										setTheme("system");
										setOpen(false);
									}}
									className="flex items-center gap-2 cursor-pointer"
								>
									<Monitor className="size-4" />
									<span>System</span>
								</CommandItem>
							</CommandGroup>
						</>
					)}

					{view === "exp" && (
						<CommandGroup heading="Jump to Experience">
							<CommandItem
								onSelect={() => setView("main")}
								className="flex items-center gap-2 cursor-pointer text-muted-foreground"
							>
								<ChevronLeft className="size-4" />
								<span>Back to main menu</span>
							</CommandItem>
							<CommandSeparator className="my-1" />
							{resumeData?.experience.map((entry, index) => (
								<CommandItem
									key={index}
									onSelect={() => handleJumpToEntry("experience", index)}
									className="flex items-center gap-2 cursor-pointer"
								>
									<Briefcase className="size-4" />
									<span>
										{entry.company || entry.title || `Experience #${index + 1}`}
									</span>
								</CommandItem>
							))}
						</CommandGroup>
					)}

					{view === "edu" && (
						<CommandGroup heading="Jump to Education">
							<CommandItem
								onSelect={() => setView("main")}
								className="flex items-center gap-2 cursor-pointer text-muted-foreground"
							>
								<ChevronLeft className="size-4" />
								<span>Back to main menu</span>
							</CommandItem>
							<CommandSeparator className="my-1" />
							{resumeData?.education.map((entry, index) => (
								<CommandItem
									key={index}
									onSelect={() => handleJumpToEntry("background", index)}
									className="flex items-center gap-2 cursor-pointer"
								>
									<GraduationCap className="size-4" />
									<span>
										{entry.institution ||
											entry.degree ||
											`Education #${index + 1}`}
									</span>
								</CommandItem>
							))}
						</CommandGroup>
					)}

					{view === "proj" && (
						<CommandGroup heading="Jump to Project">
							<CommandItem
								onSelect={() => setView("main")}
								className="flex items-center gap-2 cursor-pointer text-muted-foreground"
							>
								<ChevronLeft className="size-4" />
								<span>Back to main menu</span>
							</CommandItem>
							<CommandSeparator className="my-1" />
							{resumeData?.sideProjects.map((entry, index) => (
								<CommandItem
									key={index}
									onSelect={() => handleJumpToEntry("sideProjects", index)}
									className="flex items-center gap-2 cursor-pointer"
								>
									<Folder className="size-4" />
									<span>{entry.title || `Project #${index + 1}`}</span>
								</CommandItem>
							))}
						</CommandGroup>
					)}

					{view === "vol" && (
						<CommandGroup heading="Jump to Volunteering">
							<CommandItem
								onSelect={() => setView("main")}
								className="flex items-center gap-2 cursor-pointer text-muted-foreground"
							>
								<ChevronLeft className="size-4" />
								<span>Back to main menu</span>
							</CommandItem>
							<CommandSeparator className="my-1" />
							{resumeData?.volunteering.map((entry, index) => (
								<CommandItem
									key={index}
									onSelect={() => handleJumpToEntry("volunteering", index)}
									className="flex items-center gap-2 cursor-pointer"
								>
									<HeartHandshake className="size-4" />
									<span>
										{entry.organization ||
											entry.role ||
											`Volunteering #${index + 1}`}
									</span>
								</CommandItem>
							))}
						</CommandGroup>
					)}
				</CommandList>
			</CommandDialog>
		</>
	);
};

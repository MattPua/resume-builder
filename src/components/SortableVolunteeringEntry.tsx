import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { VolunteeringEntry } from "../types/resume";
import { VolunteeringEntryEditor } from "./VolunteeringEntryEditor";

interface SortableVolunteeringEntryProps {
	entry: VolunteeringEntry;
	index: number;
	onChange: (index: number, entry: VolunteeringEntry) => void;
	onDelete: (index: number) => void;
	isOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export const SortableVolunteeringEntry = ({
	entry,
	index,
	onChange,
	onDelete,
	isOpen,
	onOpenChange,
}: SortableVolunteeringEntryProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: `volunteering-${index}` });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<div ref={setNodeRef} style={style}>
			<VolunteeringEntryEditor
				entry={entry}
				index={index}
				onChange={onChange}
				onDelete={onDelete}
				dragAttributes={attributes}
				dragListeners={listeners}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
		</div>
	);
};

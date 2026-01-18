import { useEffect, useMemo, useRef } from "react";
import { Field, FieldContent, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

interface TextInputProps {
	label?: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	type?: "text" | "email" | "tel" | "url";
	id?: string;
}

export const TextInput = ({
	label,
	value,
	onChange,
	placeholder = "",
	type = "text",
	id,
}: TextInputProps) => {
	const inputId = useMemo(
		() =>
			id ||
			`text-input-${(label || "field").toLowerCase().replace(/\s+/g, "-")}-${Math.random().toString(36).substring(2, 9)}`,
		[id, label],
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<Field orientation="vertical">
			{label && (
				<FieldLabel
					htmlFor={inputId}
					className="text-sm font-semibold text-gray-700 dark:text-gray-300"
				>
					{label}
				</FieldLabel>
			)}
			<FieldContent>
				<Input
					id={inputId}
					type={type}
					value={value}
					onChange={handleChange}
					placeholder={placeholder}
				/>
			</FieldContent>
		</Field>
	);
};

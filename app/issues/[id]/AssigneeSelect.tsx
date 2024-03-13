"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
	return (
		<Select.Root>
			<Select.Trigger placeholder="Assign..." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Sugggestions</Select.Label>
					<Select.Item value="1">User 1</Select.Item>
					<Select.Item value="2">User 2</Select.Item>
					<Select.Item value="3">User 3</Select.Item>
					<Select.Item value="4">User 4</Select.Item>
					<Select.Item value="5">User 5</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};

export default AssigneeSelect;

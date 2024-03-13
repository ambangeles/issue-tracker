"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const {
		data: users,
		error,
		isLoading,
	} = useQuery<User[]>({
		queryKey: ["users"],
		queryFn: async () => {
			return await axios
				.get<User[]>("/api/users")
				.then((res) => res.data);
		},
		staleTime: 1000 * 60,
		retry: 3,
	});

	if (isLoading) return <Skeleton />;

	if (error) return null;

	return (
		<>
			<Select.Root
				defaultValue={issue.assignedtoUserId || ""}
				onValueChange={async (userId) => {
					try {
						await axios.patch(`/api/issues/${issue.id}`, {
							assignedToUserId: userId || null,
						});
					} catch (error) {
						toast.error("Failed to update assignee");
					}
				}}
			>
				<Select.Trigger placeholder={"Assign..."} />
				<Select.Content>
					<Select.Group>
						<Select.Label>Sugggestions</Select.Label>
						<Select.Item value={""}>Unassigned</Select.Item>
						{users?.map((user) => (
							<Select.Item
								key={user.id}
								value={user.id.toString()}
							>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	);
};

export default AssigneeSelect;

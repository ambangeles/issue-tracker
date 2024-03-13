"use client";
import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
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
		<Select.Root>
			<Select.Trigger placeholder={"Assign..."} />
			<Select.Content>
				<Select.Group>
					<Select.Label>Sugggestions</Select.Label>
					{users?.map((user) => (
						<Select.Item key={user.id} value={user.id.toString()}>
							{user.name}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};

export default AssigneeSelect;

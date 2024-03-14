import prisma from "@/prisma/client";
import { Box, Flex, Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge, Link } from "@/app/components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { title } from "process";

const IssuesPage = async ({
	searchParams,
}: {
	searchParams: { status: Status; orderBy: keyof Issue };
}) => {
	const statuses = Object.values(Status);

	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	const columns: {
		label: string;
		value: keyof Issue;
		clasName?: string;
	}[] = [
		{
			label: "Issue",
			value: "title",
		},
		{
			label: "Status",
			value: "status",
			clasName: "hidden md:table-cell",
		},
		{
			label: "Created",
			value: "createdAt",
			clasName: "hidden md:table-cell",
		},
	];

	const orderBy = columns
		.map((column) => column.value)
		.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: "asc" }
		: undefined;

	const issues = await prisma.issue.findMany({
		where: {
			status: status,
		},
		orderBy
	});

	return (
		<div>
			<IssueActions />
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						{columns.map((column) => (
							<Table.ColumnHeaderCell
								className={column.clasName}
								key={column.value}
							>
								<Flex align={"center"}>
									<NextLink
										href={{
											query: {
												...searchParams,
												orderBy: column.value,
											},
										}}
									>
										{column.label}
									</NextLink>
									{column.value === searchParams.orderBy && (
										<ArrowUpIcon />
									)}
								</Flex>
							</Table.ColumnHeaderCell>
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Link href={`/issues/${issue.id}`}>
									{issue.title}
								</Link>
								<div className="block md:hidden">
									<IssueStatusBadge status={issue.status} />
								</div>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<IssueStatusBadge status={issue.status} />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								{issue.createdAt.toDateString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export default IssuesPage;

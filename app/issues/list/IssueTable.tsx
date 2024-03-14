import { IssueStatusBadge } from "@/app/components";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";

export interface IssueQuery {
	status: Status;
	orderBy: keyof Issue;
	page: string;
}

interface Props {
	searchParams: IssueQuery;
	issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {

	return (
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
	);
};

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

export const columnNames = columns.map((column) => column.value);

export default IssueTable;

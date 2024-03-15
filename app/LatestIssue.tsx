import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge } from "./components";
import Link from "next/link";

const LatestIssue = async () => {
	const issues = await prisma.issue.findMany({
		orderBy: {
			createdAt: "desc",
		},
		take: 5,
		include: {
			assignedtoUser: true,
		},
	});

	return (
		<Card>
			<Heading size={"4"} mb={"5"}>Latest Issues</Heading>
			<Table.Root>
			<Table.Body>
				{issues.map((issue) => (
					<Table.Row key={issue.id}>
						<Table.Cell>
							<Flex justify={"between"}>
								<Flex
									direction={"column"}
									align={"start"}
									gap={"2"}
								>
									<Link href={`/issues/${issue.id}`}>
										{issue.title}
									</Link>
									<IssueStatusBadge status={issue.status} />
								</Flex>
								{issue.assignedtoUser && (
									<Avatar
										src={issue.assignedtoUser.image!}
										fallback="?"
										size={"2"}
										radius="full"
									/>
								)}
							</Flex>
						</Table.Cell>
						{/* <Table.Cell className="hidden md:table-cell">
						{issue.status}
					</Table.Cell>
					<Table.Cell className="hidden md:table-cell">
						{issue.createdAt}
					</Table.Cell> */}
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
		</Card>
	);
};

export default LatestIssue;

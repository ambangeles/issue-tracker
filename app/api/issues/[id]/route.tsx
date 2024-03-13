import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	
	const body = await request.json();
	const validation = patchIssueSchema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(
			{ errors: validation.error.format() },
			{ status: 400 }
		);
	}

	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if (!issue) {
		return NextResponse.json(
			{ message: "Issue not found" },
			{ status: 404 }
		);
	}

	if (body.assignedToUserId) {
		const user = await prisma.user.findUnique({
			where: {
				id: body.assignedToUserId,
			},
		});

		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 400 }
			);
		}
	}


	const updatedIssue = await prisma.issue.update({
		where: {
			id: parseInt(params.id),
		},
		data: {
			title: body.title,
			description: body.description,
			assignedtoUserId: body.assignedToUserId
		},
	});

	return NextResponse.json(updatedIssue);
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if (!issue) {
		return NextResponse.json({ error: "Issue not found" }, { status: 404 });
	}

	await prisma.issue.delete({
		where: {
			id: parseInt(params.id),
		},
	});

	return NextResponse.json({ message: "Issue deleted" });
}

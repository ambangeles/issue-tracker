import { z } from "zod";

export const issueSchema = z.object({
	title: z.string().min(1, "Title is required").max(65535),
	description: z.string().min(1, "Description is required"),
});

export const patchIssueSchema = z.object({
	title: z.string().min(1, "Title is required").max(65535).optional(),
	description: z.string().min(1, "Description is required").optional(),
	assignedToUserId: z
		.string()
		.min(1, "AssignedtoUserId is required")
		.max(255)
		.optional()
		.nullable(),
});

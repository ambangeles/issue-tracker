"use client";

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
	const path = usePathname();
	const { status, data: session } = useSession();
	const links = [
		{
			label: "Dashboard",
			href: "/",
		},
		{
			label: "Issues",
			href: "/issues/list",
		},
	];
	return (
		<nav className="border-b mb-5 px-5 py-3">
			<Container>
				<Flex justify={"between"}>
					<Flex align={"center"} gap={"3"}>
						<Link href={"/"}>
							<AiFillBug />
						</Link>
						<div className="space-x-6">
							{links.map((link, index) => (
								<Link
									key={index}
									href={link.href}
									className={classnames({
										"text-zinc-900": path === link.href,
										"text-zinc-500 hover:text-zinc-800 transition-colors":
											true,
									})}
								>
									{link.label}
								</Link>
							))}
						</div>
					</Flex>
					<Box>
						{status === "authenticated" ? (
							// <Link href="/api/auth/signout">Sign out</Link>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Avatar
										src={session.user!.image!}
										fallback="?"
										size={"2"}
										radius="full"
										className="cursor-pointer"
									/>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Label>
										<Text size={"2"}>{session.user!.email}</Text>
									</DropdownMenu.Label>
									<DropdownMenu.Item>
										<Link href="/api/auth/signout">
											Sign out
										</Link>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						) : (
							<Link href="/api/auth/signin">Sign in</Link>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
	);
};

export default Navbar;

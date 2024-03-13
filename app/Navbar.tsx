"use client";

import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Flex,
	Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "./components";

const Navbar = () => {
	return (
		<nav className="border-b mb-5 px-5 py-3">
			<Container>
				<Flex justify={"between"}>
					<Flex align={"center"} gap={"3"}>
						<Link href={"/"}>
							<AiFillBug />
						</Link>
						<Navlinks />
					</Flex>
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
};

const Navlinks = () => {
	const path = usePathname();
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
		<div className="space-x-6">
			{links.map((link, index) => (
				<Link
					key={index}
					href={link.href}
					className={classnames({
						"nav-link": true,
						"!text-zinc-900": path === link.href,
					})}
				>
					{link.label}
				</Link>
			))}
		</div>
	);
};

const AuthStatus = () => {
	const { status, data: session } = useSession();

	if (status === "loading") {
		return <Skeleton width={"3rem"} />;
	}

	return (
		<Box>
			{status === "authenticated" ? (
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar
							src={session.user!.image!}
							fallback="?"
							size={"2"}
							radius="full"
							className="cursor-pointer"
							referrerPolicy="no-referrer"
						/>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Label>
							<Text size={"2"}>{session.user!.email}</Text>
						</DropdownMenu.Label>
						<DropdownMenu.Item>
							<Link href="/api/auth/signout">Sign out</Link>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			) : (
				<Link href="/api/auth/signin" className="nav-link">Sign in</Link>
			)}
		</Box>
	);
};

export default Navbar;

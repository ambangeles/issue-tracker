"use client";

import { Box, Container, Flex } from "@radix-ui/themes";
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
							<Link href="/api/auth/signout">Sign out</Link>
						) : (
							<Link href="/api/auth/signin">Sign in</Link>
						)}
					</Box>{" "}
				</Flex>
			</Container>
		</nav>
	);
};

export default Navbar;

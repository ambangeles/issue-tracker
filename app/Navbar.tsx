import { link } from "fs";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
	const links = [
		{
			label: "Dashboard",
			href: "/",
		},
		{
			label: "Issues",
			href: "/",
		},
	];
	return (
		<nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
			<Link href={"/"}>
				<AiFillBug />
			</Link>
			<div className="space-x-6">
				{links.map((link, index) => (
					<Link
						key={index}
						href={link.href}
						className="text-zinc-500 hover:text-zinc-800 transition-colors"
					>
						{link.label}
					</Link>
				))}
			</div>
		</nav>
	);
};

export default Navbar;

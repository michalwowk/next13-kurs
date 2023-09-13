"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

type ActiveLinkProps = {
	href: string;
	children: ReactNode;
	className?: string;
	activeClassName?: string;
};

export const ActiveLink = ({ href, children, className, activeClassName }: ActiveLinkProps) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			className={clsx("text-blue-400 hover:text-blue-600", className, isActive && activeClassName)}
			href={href}
		>
			{children}
		</Link>
	);
};

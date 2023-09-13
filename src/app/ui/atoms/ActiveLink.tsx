"use client";

import { type URL } from "url";
import Link from "next/link";
import clsx from "clsx";
import type { Route } from "next";
import { type ReactNode } from "react";
import { usePathname } from "next/navigation";

interface ActiveLinkProps<T extends string> {
	href: Route<T> | URL;
	children: ReactNode;
	className?: string;
	activeClassName?: string;
}

export const ActiveLink = <T extends string>({
	href,
	children,
	className,
	activeClassName,
}: ActiveLinkProps<T>) => {
	const urlString = typeof href === "string" ? href : href.href;
	const isActive = urlString === usePathname();
	return (
		<Link
			className={clsx("text-blue-400 hover:text-blue-600", className, isActive && activeClassName)}
			href={href}
		>
			{children}
		</Link>
	);
};

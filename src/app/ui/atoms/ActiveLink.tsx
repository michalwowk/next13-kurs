"use client";

import Link from "next/link";
import clsx from "clsx";
import type { Route } from "next";
import { usePathname } from "next/navigation";

export const ActiveLink = <T extends string>({
	href,
	children,
	className,
	activeClassName,
	exact,
}: {
	activeClassName?: string;
	exact?: boolean;
	href: Route<T> | URL;
	children: React.ReactNode;
	className?: string;
}) => {
	const urlString = typeof href === "string" ? href : href.href;
	const pathname = usePathname();
	const isActive = exact ? urlString === pathname : pathname.startsWith(urlString);

	return (
		<Link
			className={clsx("text-blue-400 hover:text-blue-600", className, isActive && activeClassName)}
			href={href}
		>
			{children}
		</Link>
	);
};

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
	href: Route<T>;
	children: React.ReactNode;
	className?: string;
}) => {
	const pathname = usePathname();
	const isActive = exact ? href === pathname : pathname.startsWith(href);

	return (
		<Link
			className={clsx(className, isActive && activeClassName)}
			href={href}
			{...(isActive && { "aria-current": "page" })}
		>
			{children}
		</Link>
	);
};

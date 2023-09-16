"use client";

import Link from "next/link";
import clsx from "clsx";
import type { Route } from "next";
import { usePathname } from "next/navigation";

export async function generateStaticParams() {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
	const products = (await res.json()) as { id: string; title: string }[];

	return products.map((product) => ({ productId: product.id }));
}

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

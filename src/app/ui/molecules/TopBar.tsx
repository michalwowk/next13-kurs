"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { type Route } from "next";
import { type ProductOrderByInput } from "@/gql/graphql";

const options: { label: string; value: ProductOrderByInput; testId: string }[] = [
	{
		label: "Newest",
		value: "createdAt_DESC",
		testId: "sort-by-newest",
	},
	{
		label: "Oldest",
		value: "createdAt_ASC",
		testId: "sort-by-oldest",
	},
	{
		label: "Price: Low to High",
		value: "price_ASC",
		testId: "sort-by-price",
	},
	{
		label: "Price: High to Low",
		value: "price_DESC",
		testId: "sort-by-price",
	},
	{
		label: "Rating: Low to High",
		value: "averageRating_ASC",
		testId: "sort-by-rating",
	},
	{
		label: "Rating: High to Low",
		value: "averageRating_DESC",
		testId: "sort-by-rating",
	},
];

export const TopBarWrapper = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<div className="bg-gray-100">
			<div className="container mx-auto flex justify-between px-8">
				<div className="mx-auto py-8">{children}</div>
				<select
					name="sort-by"
					id="sort-by-id"
					defaultValue={options[0]?.value}
					onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
						router.push(`${pathname}?sort=${event.target.value}` as Route);
					}}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value} data-testid={option.testId}>
							{option.label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

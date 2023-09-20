import { type ProductListItemFragment } from "@/gql/graphql";

export const getAllProducts = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
	const data = (await res.json()) as ProductListItemFragment[];

	return data;
};

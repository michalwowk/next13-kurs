import { type ProductItemType } from "@/ui/types";

export const getAllProducts = async () => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
	const data = (await res.json()) as ProductItemType[];

	return data;
};

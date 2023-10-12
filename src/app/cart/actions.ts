"use server";

import { revalidateTag } from "next/cache";
import { executeGraphQl } from "@/api/utils";
import { CartChangeItemQuantityDocument, CartRemoveItemDocument } from "@/gql/graphql";

export const changeItemQuantity = (itemId: string, quantity: number) => {
	const res = executeGraphQl({
		query: CartChangeItemQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
	});

	revalidateTag("cart");

	return res;
};

export async function removeItemFromCartById(itemId: string) {
	return executeGraphQl({
		query: CartRemoveItemDocument,
		variables: {
			itemId,
		},
	});
}

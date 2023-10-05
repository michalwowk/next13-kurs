"use server";

import { executeGraphQl } from "@/api/utils";
import { CartChangeItemQuantityDocument, CartRemoveItemDocument } from "@/gql/graphql";

export const changeItemQuantity = (itemId: string, quantity: number) => {
	return executeGraphQl({
		query: CartChangeItemQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
	});
};

export async function removeItemFromCartById(itemId: string) {
	return executeGraphQl({
		query: CartRemoveItemDocument,
		variables: {
			itemId,
		},
	});
}

"use server";

import { executeGraphQl } from "@/api/utils";
import { CartChangeItemQuantityDocument } from "@/gql/graphql";

export const changeItemQuantity = (itemId: string, quantity: number) => {
	return executeGraphQl({
		query: CartChangeItemQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
	});
};

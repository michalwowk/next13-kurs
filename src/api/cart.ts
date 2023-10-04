import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { executeGraphQl } from "@/api/utils";
import {
	CartGetByIdDocument,
	CartCreateDocument,
	ProductGetByIdDocument,
	CartAddItemDocument,
} from "@/gql/graphql";

export async function getOrCreateCart() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeGraphQl({
			query: CartGetByIdDocument,
			variables: { id: cartId },
		});
		if (cart) {
			return cart;
		}
	}

	const { createOrder: newCart } = await executeGraphQl({ query: CartCreateDocument });
	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id);
	return newCart;
}

export async function addProductToCart(cartId: string, productId: string) {
	const { product } = await executeGraphQl({
		query: ProductGetByIdDocument,
		variables: { id: productId },
	});
	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeGraphQl({
		query: CartAddItemDocument,
		variables: {
			cartId,
			productId,
			total: product.price,
		},
	});

	revalidateTag("cart");
}

export async function getCartById(cartId: string) {
	return executeGraphQl({
		query: CartGetByIdDocument,
		variables: {
			id: cartId,
		},
	});
}

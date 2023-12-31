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
			cache: "no-store",
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

	cookies().set("cartId", newCart.id, {
		httpOnly: true,
		sameSite: "lax",
	});
	return newCart;
}

export async function addProductToCart({
	orderItemId,
	productId,
	total,
	quantity,
	orderId,
}: {
	orderItemId: string;
	productId: string;
	total: number;
	quantity: number;
	orderId: string;
}) {
	const { product } = await executeGraphQl({
		query: ProductGetByIdDocument,
		variables: { id: productId },
		cache: "no-store",
	});

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeGraphQl({
		query: CartAddItemDocument,
		variables: {
			orderItemId,
			productId,
			total,
			quantity,
			orderId,
		},
	});

	revalidateTag("cart");
}

export async function getCartById(cartId: string) {
	const res = executeGraphQl({
		query: CartGetByIdDocument,
		variables: {
			id: cartId,
		},
		next: {
			tags: ["cart"],
			revalidate: 0,
		},
	});

	return res;
}

export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;

	if (cartId) {
		const cart = await executeGraphQl({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			next: {
				tags: ["cart"],
				revalidate: 0,
			},
		});

		if (cart.order) {
			return cart.order;
		}
	}
}

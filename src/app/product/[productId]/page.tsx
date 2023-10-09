import { type Metadata } from "next";
import { notFound } from "next/navigation";
import NextImage from "next/image";

import { formatMoney } from "../../../utils";
import { getSingleProductById } from "@/api/product";
import { AddToCartButton } from "@/ui/molecules/AddToCartButton";
import { addProductToCart, getOrCreateCart } from "@/api/cart";
import { SuggestedProducts } from "@/ui/organisms/SuggestedProducts";
import { InputGroup } from "@/ui/atoms/InputGroup";
import { Label } from "@/ui/atoms/Label";
import { Input } from "@/ui/atoms/Input";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const { product } = await getSingleProductById(params.productId);

	if (!product) {
		notFound();
	}

	return {
		title: product.name,
		description: product.description,
	};
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
	const { product } = await getSingleProductById(params.productId);

	if (!product) {
		notFound();
	}

	async function addToCartAction() {
		"use server";
		const cart = await getOrCreateCart();

		const existingOrderItem = cart.orderItems.find((item) => item.product?.id === params.productId);
		const quantity = existingOrderItem ? existingOrderItem.quantity + 1 : 1;
		const totalPrice = existingOrderItem ? quantity * product.price : product.price;

		await addProductToCart({
			orderItemId: existingOrderItem?.id || cart.id,
			productId: params.productId,
			total: totalPrice,
			quantity,
			orderId: cart.id,
		});
	}

	return (
		<main className="container mx-auto">
			<div className="mt-5 flex items-center justify-center">
				<NextImage src={product.images[0].url} alt={product.name} width={500} height={500} />
				<div className="max-w-lg">
					<h1 className="text-2xl font-bold">{product.name}</h1>
					<p className="mt-3">{product.description}</p>
					<div className="flex justify-between">
						<span className="mt-3 text-2xl font-bold">
							<span className="sr-only">Cena:</span> {formatMoney(product.price / 100)}
						</span>
					</div>
					<form action={addToCartAction}>
						<AddToCartButton />
					</form>
				</div>
			</div>

			<SuggestedProducts
				currentProductId={product.id}
				categorySlug={product.categories[0]?.slug}
				collectionSlug={product.collections[0]?.slug}
			/>

			<section className="max-w-md">
				<h2>Share you feedback</h2>
				<form data-testid="add-review-form">
					<InputGroup>
						<Label htmlFor="headline">Headline</Label>
						<Input id="headline" type="text" />
					</InputGroup>

					<InputGroup>
						<Label htmlFor="content">content</Label>
						<Input id="content" type="text" />
					</InputGroup>

					<InputGroup>
						<Label htmlFor="rating">rating</Label>
						<Input id="rating" type="text" />
					</InputGroup>

					<InputGroup>
						<Label htmlFor="name">name</Label>
						<Input id="name" type="text" />
					</InputGroup>

					<InputGroup>
						<Label htmlFor="email">email</Label>
						<Input id="email" type="text" />
					</InputGroup>
				</form>
			</section>
		</main>
	);
}

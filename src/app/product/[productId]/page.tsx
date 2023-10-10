import { type Metadata } from "next";
import { notFound } from "next/navigation";
import NextImage from "next/image";

import { Suspense } from "react";
import { formatMoney } from "../../../utils";
import { getSingleProductById } from "@/api/product";
import { AddToCartButton } from "@/ui/molecules/AddToCartButton";
import { addProductToCart, getOrCreateCart } from "@/api/cart";
import { SuggestedProducts } from "@/ui/organisms/SuggestedProducts";
import { InputGroup } from "@/ui/atoms/InputGroup";
import { Label } from "@/ui/atoms/Label";
import { Input } from "@/ui/atoms/Input";
import { addReview } from "@/api/reviews";

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

export default async function ProductPage({
	params: { productId },
}: {
	params: { productId: string };
}) {
	const { product } = await getSingleProductById(productId);

	if (!product) {
		notFound();
	}

	async function addToCartAction() {
		"use server";
		const cart = await getOrCreateCart();

		const existingOrderItem = cart.orderItems.find((item) => item.product?.id === productId);
		const quantity = existingOrderItem ? existingOrderItem.quantity + 1 : 1;
		const totalPrice = existingOrderItem ? quantity * product.price : product.price;

		await addProductToCart({
			orderItemId: existingOrderItem?.id || cart.id,
			productId: productId,
			total: totalPrice,
			quantity,
			orderId: cart.id,
		});
	}

	async function addReviewAction(formData: FormData) {
		"use server";

		await addReview({ productId, formData });
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

			<SuggestedProducts />

			<div className="grid grid-cols-2 gap-x-10">
				<section>
					<h2 className="mt-8 text-xl font-bold">Share you feedback</h2>
					<form data-testid="add-review-form" action={addReviewAction}>
						<InputGroup>
							<Label htmlFor="headline">Headline</Label>
							<Input id="headline" type="text" name="headline" />
						</InputGroup>

						<InputGroup>
							<Label htmlFor="content">content</Label>
							<Input id="content" type="text" name="content" />
						</InputGroup>

						<InputGroup>
							<Label htmlFor="rating">rating</Label>
							<Input id="rating" type="number" name="rating" min={0} max={5} />
						</InputGroup>

						<InputGroup>
							<Label htmlFor="name">name</Label>
							<Input id="name" type="text" name="name" />
						</InputGroup>

						<InputGroup>
							<Label htmlFor="email">email</Label>
							<Input id="email" type="text" name="email" />
						</InputGroup>

						<button type="submit" className="mt-2 w-full border-[1px]">
							Add review
						</button>
					</form>
				</section>
				<section>
					<h2 className="mt-8 text-xl font-bold">Reviews</h2>
					{product.reviews.map((review) => (
						<div key={review.id} className="mb-2 flex flex-col border p-2">
							<h3 className="title-font text-2xl font-bold">{review.headline}</h3>
							<p>{review.content}</p>
							<p>{review.rating}</p>
							<p>
								{review.name} - {review.email}
							</p>
						</div>
					))}
				</section>
			</div>
		</main>
	);
}

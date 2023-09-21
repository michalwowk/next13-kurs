import { type Metadata } from "next";
import { notFound } from "next/navigation";
import NextImage from "next/image";
import { executeGraphql } from "../../../api/utils";

import { formatMoney } from "../../../utils";
import { SingleProductGetItemByIdDocument } from "@/gql/graphql";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const { product } = await executeGraphql(SingleProductGetItemByIdDocument, {
		id: params.productId,
	});

	if (!product) {
		notFound();
	}

	return {
		title: product.name,
		description: product.description,
		openGraph: {
			title: `Name: ${product.name}`,
			description: product.description,
			images: [
				{
					url: product.images[0].url,
					alt: product.description,
				},
			],
		},
	};
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
	const { product } = await executeGraphql(SingleProductGetItemByIdDocument, {
		id: params.productId,
	});

	if (!product) {
		notFound();
	}

	return (
		<main className="container mx-auto ">
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
				</div>
			</div>
		</main>
	);
}

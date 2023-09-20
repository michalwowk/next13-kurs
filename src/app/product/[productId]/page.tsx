import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { executeGraphql } from "../../../api/utils";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { ProductGetByIdDocument } from "@/gql/graphql";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: params.productId,
	});

	if (!product) {
		notFound();
	}

	return {
		title: product.name,
	};
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: params.productId,
	});

	if (!product) {
		notFound();
	}

	return (
		<article className="max-w-sm">
			<ProductCoverImage src={product.images[0].url} alt={product.name} />
			<ProductListItemDescription product={product} />
		</article>
	);
}

import { type Metadata } from "next";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { type ProductItemType } from "@/ui/types";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const res = await fetch("https://naszsklep-api.vercel.app/api/products/" + params.productId);
	const product = (await res.json()) as { title: string; description: string };

	return {
		title: product.title,
		description: product.description,
	};
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${params.productId}`);
	const product = (await res.json()) as ProductItemType;

	return (
		<article className="max-w-sm">
			<ProductCoverImage src={product.image} alt={product.title} />
			<ProductListItemDescription product={product} />
		</article>
	);
}

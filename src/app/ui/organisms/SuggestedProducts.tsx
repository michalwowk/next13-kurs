import { getSuggestedProductsList } from "@/api/products";
import { ProductListItem } from "@/ui/molecules/ProductListItem";

type SuggestedProductsProps = {
	collectionSlug?: string;
	categorySlug?: string;
	currentProductId: string;
};

export const SuggestedProducts = async ({
	collectionSlug,
	categorySlug,
	currentProductId,
}: SuggestedProductsProps) => {
	const { products } = await getSuggestedProductsList({
		id: currentProductId,
		collectionSlug,
		categorySlug,
	});

	if (!products.length) {
		return null;
	}

	return (
		<div className="mt-10">
			<h2 className="text-xl font-bold">Suggested Products</h2>
			<ul
				className="mt-8 grid gap-8 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
				data-testid="related-products"
			>
				{products.map((product) => {
					return <ProductListItem key={product.id} product={product} />;
				})}
			</ul>
		</div>
	);
};

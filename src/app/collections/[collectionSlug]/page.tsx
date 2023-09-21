import { executeGraphql } from "@/api/utils";
import { ProductList } from "@/ui/organisms/ProductList";
import { ProductsGetListByCollectionSlugDocument } from "@/gql/graphql";

export default async function PaginatedProductsPage({
	params: { collectionSlug },
}: {
	params: { collectionSlug: string };
}) {
	const { products } = await executeGraphql(ProductsGetListByCollectionSlugDocument, {
		collectionSlug,
	});

	return (
		<main>
			<section className="mx-auto max-w-md p-12 sm:max-w-2xl lg:max-w-6xl">
				<ProductList products={products} />
			</section>
		</main>
	);
}

import { PRODUCTS_PER_PAGE } from "../../../../constants";
import { getTotalNumberOfPages, transformIntoTitle } from "../../../../utils";
import { ProductsPagination } from "@/ui/molecules/ProductsPagination";
import { ProductList } from "@/ui/organisms/ProductList";
import {
	getProductsListByCollectionSlug,
	getTotalAmountOfProductsByCollectionSlug,
} from "@/api/products";
import { TopBarWrapper } from "@/ui/molecules/TopBar";

export default async function PaginatedProductsPage({
	params: { pageNumber, collectionSlug },
}: {
	params: { pageNumber: string; collectionSlug: string };
}) {
	const firstProductPointer = (Number(pageNumber) - 1) * PRODUCTS_PER_PAGE;

	const { products } = await getProductsListByCollectionSlug({
		collectionSlug,
		first: PRODUCTS_PER_PAGE,
		skip: firstProductPointer,
	});

	const totalAmountOfProducts = await getTotalAmountOfProductsByCollectionSlug(collectionSlug);

	const totalNumberOfPages = getTotalNumberOfPages(totalAmountOfProducts, PRODUCTS_PER_PAGE);

	return (
		<main>
			<TopBarWrapper>
				<h2 className="text-bold">{transformIntoTitle(collectionSlug)}</h2>
			</TopBarWrapper>
			<section className="mx-auto max-w-md p-12 sm:max-w-2xl lg:max-w-6xl">
				<ProductList products={products} />
				<ProductsPagination
					totalNumberOfPages={totalNumberOfPages}
					route={`/collections/${collectionSlug}`}
				/>
			</section>
		</main>
	);
}

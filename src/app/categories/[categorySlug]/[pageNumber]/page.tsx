import { PRODUCTS_PER_PAGE } from "../../../../constants";
import { getTotalNumberOfPages, transformIntoTitle } from "../../../../utils";
import { ProductsPagination } from "@/ui/molecules/ProductsPagination";
import { ProductList } from "@/ui/organisms/ProductList";
import {
	getProductsListByCategorySlug,
	getTotalAmountOfProductsByCategorySlug,
} from "@/api/products";
import { TopBarWrapper } from "@/ui/molecules/TopBar";

export default async function PaginatedProductsPage({
	params: { pageNumber, categorySlug },
}: {
	params: { pageNumber: string; categorySlug: string };
}) {
	const firstProductPointer = (Number(pageNumber) - 1) * PRODUCTS_PER_PAGE;

	const { products } = await getProductsListByCategorySlug({
		categorySlug,
		first: PRODUCTS_PER_PAGE,
		skip: firstProductPointer,
	});

	const totalAmountOfProducts = await getTotalAmountOfProductsByCategorySlug(categorySlug);

	const totalNumberOfPages = getTotalNumberOfPages(totalAmountOfProducts, PRODUCTS_PER_PAGE);

	return (
		<main>
			<TopBarWrapper>
				<h2 className="text-bold">{transformIntoTitle(categorySlug)}</h2>
			</TopBarWrapper>
			<section className="mx-auto max-w-md p-12 sm:max-w-2xl lg:max-w-6xl">
				<ProductList products={products} />
				<ProductsPagination
					totalNumberOfPages={totalNumberOfPages}
					route={`/categories/${categorySlug}`}
				/>
			</section>
		</main>
	);
}

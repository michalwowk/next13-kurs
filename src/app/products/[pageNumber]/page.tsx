import { PRODUCTS_PER_PAGE } from "../../../constants";
import { getTotalNumberOfPages } from "../../../utils";
import { ProductsPagination } from "@/ui/molecules/ProductsPagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsList, getTotalAmountOfProducts } from "@/api/products";
import { type ProductOrderByInput } from "@/gql/graphql";
import { TopBarWrapper } from "@/ui/molecules/TopBar";

type PaginatedProductsPageType = {
	params: { pageNumber: number };
	searchParams: { sort: string };
};

export async function generateStaticParams() {
	const totalAmountOfProducts = await getTotalAmountOfProducts();

	const totalNumberOfPages = getTotalNumberOfPages(totalAmountOfProducts, PRODUCTS_PER_PAGE);

	const arrayOfPageNumbers = Array.from({ length: totalNumberOfPages }, (_, i) => i);

	return arrayOfPageNumbers.map((pageNumber) => {
		return {
			pageNumber: String(pageNumber + 1),
		};
	});
}

export default async function PaginatedProductsPage({
	params: { pageNumber },
	searchParams: { sort },
}: PaginatedProductsPageType) {
	const firstProductPointer = (Number(pageNumber) - 1) * PRODUCTS_PER_PAGE;

	const { products } = await getProductsList({
		first: PRODUCTS_PER_PAGE,
		skip: firstProductPointer,
		orderBy: sort as ProductOrderByInput,
	});

	const totalAmountOfProducts = await getTotalAmountOfProducts();

	const totalNumberOfPages = getTotalNumberOfPages(totalAmountOfProducts, PRODUCTS_PER_PAGE);

	return (
		<main>
			<section className="mx-auto max-w-md p-12 sm:max-w-2xl lg:max-w-6xl">
				<TopBarWrapper>
					<h2>Products</h2>
				</TopBarWrapper>
				<ProductList products={products} />
				<ProductsPagination totalNumberOfPages={totalNumberOfPages} route="/products" />
			</section>
		</main>
	);
}

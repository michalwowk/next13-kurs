import { PRODUCTS_PER_PAGE } from "../../../constants";
import { getTotalNumberOfPages } from "../../../utils";
import { ProductsPagination } from "@/ui/molecules/ProductsPagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsList, getTotalAmountOfProducts } from "@/api/products";

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
}: {
	params: { pageNumber: string };
}) {
	const firstProductPointer = (Number(pageNumber) - 1) * PRODUCTS_PER_PAGE;

	const { products } = await getProductsList({
		first: PRODUCTS_PER_PAGE,
		skip: firstProductPointer,
	});

	const totalAmountOfProducts = await getTotalAmountOfProducts();

	const totalNumberOfPages = getTotalNumberOfPages(totalAmountOfProducts, PRODUCTS_PER_PAGE);

	return (
		<main>
			<section className="mx-auto max-w-md p-12 sm:max-w-2xl lg:max-w-6xl">
				<ProductList products={products} />
				<ProductsPagination totalNumberOfPages={totalNumberOfPages} route="/products" />
			</section>
		</main>
	);
}
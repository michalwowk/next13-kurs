import { executeGraphql } from "@/api/utils";
import { ProductsPagination } from "@/ui/molecules/ProductsPagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { type ProductListItemFragment, ProductsGetListByCategorySlugDocument } from "@/gql/graphql";

const PRODUCTS_PER_PAGE = 4;

const getTotalNumberOfPages = (
	products: ProductListItemFragment[],
	PRODUCTS_PER_PAGE: number,
): number => {
	return Math.ceil(products.length / PRODUCTS_PER_PAGE);
};

// export async function generateStaticParams() {
// 	const { products } = await executeGraphql(ProductsGetListDocument);
// 	const totalNumberOfPages = getTotalNumberOfPages(products, PRODUCTS_PER_PAGE);
// 	const arrayOfPageNumbers = Array.from({ length: totalNumberOfPages }, (_, i) => i);

// 	return arrayOfPageNumbers.map((pageNumber) => {
// 		return {
// 			pageNumber: String(pageNumber + 1),
// 		};
// 	});
// }

export default async function PaginatedProductsPage({
	params: { pageNumber, categorySlug },
}: {
	params: { pageNumber: string; categorySlug: string };
}) {
	const { products } = await executeGraphql(ProductsGetListByCategorySlugDocument, {
		categorySlug,
	});
	const firstProductPointer = (Number(pageNumber) - 1) * PRODUCTS_PER_PAGE;
	const lastProductPointer = firstProductPointer + PRODUCTS_PER_PAGE;
	const totalNumberOfPages = getTotalNumberOfPages(products, PRODUCTS_PER_PAGE);

	return (
		<main>
			<section className="mx-auto max-w-md p-12 sm:max-w-2xl lg:max-w-6xl">
				<ProductList products={products.slice(firstProductPointer, lastProductPointer)} />
				<ProductsPagination
					totalNumberOfPages={totalNumberOfPages}
					route={`/categories/${categorySlug}`}
				/>
			</section>
		</main>
	);
}

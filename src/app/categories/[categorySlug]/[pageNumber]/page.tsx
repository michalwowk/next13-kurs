import { PRODUCTS_PER_PAGE } from "../../../../constants";
import { getTotalNumberOfPages } from "../../../../utils";
import { executeGraphql } from "@/api/utils";
import { ProductsPagination } from "@/ui/molecules/ProductsPagination";
import { ProductList } from "@/ui/organisms/ProductList";
import {
	type ProductListItemFragment,
	ProductsGetListByCategorySlugDocument,
	ProductsGetTotalCountByCategorySlugDocument,
} from "@/gql/graphql";

export async function generateStaticParams({
	params: { categorySlug },
}: {
	params: { pageNumber: string; categorySlug: string };
}) {
	const { productsConnection } = await executeGraphql(ProductsGetTotalCountByCategorySlugDocument, {
		categorySlug,
	});
	const totalAmountOfProducts = productsConnection.aggregate.count;
	const totalNumberOfPages = getTotalNumberOfPages(totalAmountOfProducts, PRODUCTS_PER_PAGE);
	const arrayOfPageNumbers = Array.from({ length: totalNumberOfPages }, (_, i) => i);

	return arrayOfPageNumbers.map((pageNumber) => {
		return {
			pageNumber: String(pageNumber + 1),
		};
	});
}

export default async function PaginatedProductsPage({
	params: { pageNumber, categorySlug },
}: {
	params: { pageNumber: string; categorySlug: string };
}) {
	const firstProductPointer = (Number(pageNumber) - 1) * PRODUCTS_PER_PAGE;

	const { products } = await executeGraphql(ProductsGetListByCategorySlugDocument, {
		categorySlug,
		first: PRODUCTS_PER_PAGE,
		skip: firstProductPointer,
	});
	const { productsConnection } = await executeGraphql(ProductsGetTotalCountByCategorySlugDocument, {
		categorySlug,
	});

	const totalAmountOfProducts = productsConnection.aggregate.count;

	const totalNumberOfPages = getTotalNumberOfPages(totalAmountOfProducts, PRODUCTS_PER_PAGE);

	return (
		<main>
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

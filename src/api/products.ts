import { executeGraphQl } from "@/api/utils";
import {
	ProductsGetListByCategorySlugDocument,
	ProductsGetListByCollectionSlugDocument,
	ProductsGetListByNameOrCategoryNameDocument,
	ProductsGetListDocument,
	ProductsGetSuggestedListDocument,
	ProductsGetTotalCountByCategorySlugDocument,
	ProductsGetTotalCountByCollectionSlugDocument,
	ProductsGetTotalCountDocument,
} from "@/gql/graphql";

export async function getSuggestedProductsList() {
	return executeGraphQl({ query: ProductsGetSuggestedListDocument });
}

export async function getSearchProducts(query: string) {
	return executeGraphQl({
		query: ProductsGetListByNameOrCategoryNameDocument,
		variables: {
			query,
		},
	});
}
export async function getTotalAmountOfProducts() {
	const { productsConnection } = await executeGraphQl({
		query: ProductsGetTotalCountDocument,
	});
	const totalAmountOfProducts = productsConnection.aggregate.count;

	return totalAmountOfProducts;
}

export async function getProductsList({ first, skip }: { first: number; skip: number }) {
	return executeGraphQl({
		query: ProductsGetListDocument,
		variables: {
			first,
			skip,
		},
	});
}

export async function getProductsListByCollectionSlug({
	collectionSlug,
	first,
	skip,
}: {
	collectionSlug: string;
	first: number;
	skip: number;
}) {
	return executeGraphQl({
		query: ProductsGetListByCollectionSlugDocument,
		variables: {
			collectionSlug,
			first,
			skip,
		},
	});
}

export async function getProductsListByCategorySlug({
	categorySlug,
	first,
	skip,
}: {
	categorySlug: string;
	first: number;
	skip: number;
}) {
	return executeGraphQl({
		query: ProductsGetListByCategorySlugDocument,
		variables: {
			categorySlug,
			first,
			skip,
		},
	});
}

export async function getTotalAmountOfProductsByCategorySlug(categorySlug: string) {
	const { productsConnection } = await executeGraphQl({
		query: ProductsGetTotalCountByCategorySlugDocument,
		variables: {
			categorySlug,
		},
	});

	return productsConnection.aggregate.count;
}

export async function getTotalAmountOfProductsByCollectionSlug(collectionSlug: string) {
	const { productsConnection } = await executeGraphQl({
		query: ProductsGetTotalCountByCollectionSlugDocument,
		variables: {
			collectionSlug,
		},
	});

	return productsConnection.aggregate.count;
}

import { executeGraphql } from "@/api/utils";
import { ProductsGetListByNameOrCategoryNameDocument } from "@/gql/graphql";
import { ProductList } from "@/ui/organisms/ProductList";

type SearchPageProps = {
	searchParams: {
		query: string;
	};
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const query = searchParams.query;
	const { products } = await executeGraphql(ProductsGetListByNameOrCategoryNameDocument, {
		query,
	});
	return (
		<main>
			<section className="mx-auto max-w-md p-12 sm:max-w-2xl lg:max-w-6xl">
				{products.length === 0 ? (
					<h2 className="text-center">No products found</h2>
				) : (
					<ProductList products={products} />
				)}
			</section>
		</main>
	);
};

export default SearchPage;

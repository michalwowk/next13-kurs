import { getSearchProducts } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

type SearchPageProps = {
	searchParams: {
		query: string;
	};
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const query = searchParams.query;
	const { products } = await getSearchProducts(query);
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

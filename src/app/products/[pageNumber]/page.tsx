import { ProductsPagination } from "@/ui/molecules/ProductsPagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { getAllProducts } from "@/utils/api";

const PRODUCTS_PER_PAGE = 4;

export async function generateStaticParams() {
	const products = await getAllProducts();

	return products.map((product) => ({ productId: product.id }));
}

export default async function PaginatedProductsPage({
	params: { pageNumber },
}: {
	params: { pageNumber: string };
}) {
	const products = await getAllProducts();
	const firstProductPointer = (Number(pageNumber) - 1) * PRODUCTS_PER_PAGE;
	const lastProductPointer = firstProductPointer + PRODUCTS_PER_PAGE;
	const totalNumberOfPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

	return (
		<main>
			<section className="mx-auto max-w-md p-12 sm:max-w-2xl lg:max-w-6xl">
				<ProductList products={products.slice(firstProductPointer, lastProductPointer)} />
				<ProductsPagination totalNumberOfPages={totalNumberOfPages} />
			</section>
		</main>
	);
}

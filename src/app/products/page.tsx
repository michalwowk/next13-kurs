import { ProductList } from "@/ui/organisms/ProductList";
import { type ProductItemType } from "@/ui/types";

export default async function ProductsPage() {
	const res = await fetch("https://naszsklep-api.vercel.app/api/products?take=20");
	const products = (await res.json()) as ProductItemType[];

	return (
		<main>
			<section className="mx-auto max-w-md p-12 sm:max-w-2xl lg:max-w-6xl">
				<ProductList products={products} />
			</section>
		</main>
	);
}

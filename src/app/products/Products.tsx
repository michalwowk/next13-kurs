import { ProductList } from "@/ui/organisms/ProductList";
import { products } from "./page";

export default function Products() {
	return (
		<main>
			<section className="mx-auto max-w-md p-12 sm:max-w-2xl">
				<ProductList products={products} />
			</section>
		</main>
	);
}

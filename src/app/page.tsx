import { notFound } from "next/navigation";
import { getProductsList } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function Home() {
	const { products } = await getProductsList({
		first: 8,
		skip: 0,
	});

	if (!products.length) {
		return notFound();
	}

	return (
		<main className="container mx-auto">
			<ProductList products={products} />
		</main>
	);
}

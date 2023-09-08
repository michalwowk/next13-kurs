import { ProductList } from "@/ui/organisms/ProductList";
import { type ProductItemType } from "@/ui/types";

const products: ProductItemType[] = [
	{
		id: "1",
		category: "Category 1",
		name: "Product 1",
		price: 100,
		coverImage: {
			alt: "Product 1",
			src: "https://picsum.photos/seed/1/320/320",
		},
	},
	{
		id: "2",
		category: "Category 2",
		name: "Product 2",
		price: 200,
		coverImage: {
			alt: "Product 2",
			src: "https://picsum.photos/seed/2/320/320",
		},
	},
	{
		id: "3",
		category: "Category 3",
		name: "Product 3",
		price: 300,
		coverImage: {
			alt: "Product 3",
			src: "https://picsum.photos/seed/3/320/320",
		},
	},
	{
		id: "4",
		category: "Category 4",
		name: "Product 4",
		price: 400,
		coverImage: {
			alt: "Product 4",
			src: "https://picsum.photos/seed/4/320/320",
		},
	},
];

export default function Products() {
	return (
		<main>
			<section className="mx-auto max-w-md p-12 sm:max-w-2xl lg:max-w-6xl">
				<ProductList products={products} />
			</section>
		</main>
	);
}

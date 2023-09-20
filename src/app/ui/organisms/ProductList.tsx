import { type ProductListItemFragment } from "@/gql/graphql";
import { ProductListItem } from "@/ui/molecules/ProductListItem";

type ProductListType = {
	products: ProductListItemFragment[];
};

export const ProductList = ({ products }: ProductListType) => {
	return (
		<ul
			data-testid="products-list"
			className="grid gap-8 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 "
		>
			{products.map((product) => {
				return <ProductListItem key={product.id} product={product} />;
			})}
		</ul>
	);
};

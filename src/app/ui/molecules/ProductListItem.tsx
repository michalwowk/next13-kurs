import Link from "next/link";
import { type ProductListItemFragment } from "@/gql/graphql";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";

type ProductListItemProps = {
	product: ProductListItemFragment;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article>
					<ProductCoverImage src={product.images[0].url} alt={product.name} />
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};

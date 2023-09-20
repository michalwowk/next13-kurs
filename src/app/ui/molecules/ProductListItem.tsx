import { type ProductListItemFragment } from "@/gql/graphql";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";

type ProductListItemProps = {
	product: ProductListItemFragment;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<ActiveLink href={`/product/${product.id}`}>
				<article>
					<ProductCoverImage src={product.images[0].url} alt={product.name} />
					<ProductListItemDescription product={product} />
				</article>
			</ActiveLink>
		</li>
	);
};

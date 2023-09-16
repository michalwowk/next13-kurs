import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { type ProductItemType } from "@/ui/types";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<ActiveLink href={`/product/${product.id}`}>
				<article>
					<ProductCoverImage src={product.image} alt={product.title} />
					<ProductListItemDescription product={product} />
				</article>
			</ActiveLink>
		</li>
	);
};

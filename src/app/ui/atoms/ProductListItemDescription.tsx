import { formatMoney } from "../../../utils";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductListItemDescription = ({
	product: { name, categories, price, averageRating },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-2 flex justify-between">
			<div>
				<h3 className="text-sm font-semibold text-gray-700">{name}</h3>
				{categories.length && (
					<p className="text-sm font-medium text-gray-500">
						<span className="sr-only">Category:</span> {categories[0].name}
					</p>
				)}
			</div>
			<p className="text-sm font-semibold text-gray-900">
				<span className="sr-only" data-testid="product-price">
					Price:{" "}
				</span>{" "}
				{formatMoney(price / 100)}
			</p>
			<p className="text-sm font-semibold text-gray-900 " data-testid="product-rating">
				{averageRating ?? "-"} / 5
			</p>
		</div>
	);
};

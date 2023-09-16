import { ActiveLink } from "@/ui/atoms/ActiveLink";

type ProductsPaginationType = {
	totalNumberOfPages: number;
};

export const ProductsPagination = ({ totalNumberOfPages }: ProductsPaginationType) => {
	return (
		<ul data-testid="products-list" className="center mt-10 flex justify-center gap-2">
			{Array.from({ length: totalNumberOfPages }, (_, i) => i).map((pageNumber) => {
				return (
					<li key={pageNumber}>
						<ActiveLink
							className="bg-slate-100 px-3 py-2 hover:bg-slate-300"
							href={`/products/${pageNumber + 1}`}
							activeClassName="text-red-500"
						>
							{pageNumber + 1}
						</ActiveLink>
					</li>
				);
			})}
		</ul>
	);
};

import { executeGraphql } from "@/api/utils";
import { CategoriesGetListDocument } from "@/gql/graphql";
import { CategoryListItem } from "@/ui/molecules/CategoryListItem";

export default async function PaginatedProductsPage() {
	const { categories } = await executeGraphql(CategoriesGetListDocument);

	return (
		<main className="container mx-auto">
			<section className="mt-5">
				<ul className="flex items-center justify-center gap-3 sm:flex-col lg:flex-row">
					{categories.map((category) => {
						return <CategoryListItem key={category.id} category={category} />;
					})}
				</ul>
			</section>
		</main>
	);
}

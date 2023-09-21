import { executeGraphql } from "@/api/utils";
import { CollectionsGetListDocument } from "@/gql/graphql";
import { CategoryListItem } from "@/ui/molecules/CategoryListItem";

export default async function PaginatedProductsPage() {
	const { collections } = await executeGraphql(CollectionsGetListDocument);

	return (
		<main className="container mx-auto">
			<section className="mt-5">
				<ul className="flex items-center justify-center gap-3 sm:flex-col lg:flex-row">
					{collections.map((collection) => {
						return (
							<CategoryListItem route="/collections" key={collection.id} category={collection} />
						);
					})}
				</ul>
			</section>
		</main>
	);
}

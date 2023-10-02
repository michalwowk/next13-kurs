import { executeGraphQl } from "@/api/utils";
import { CategoriesGetListDocument } from "@/gql/graphql";

export async function getCategoriesList() {
	return executeGraphQl({
		query: CategoriesGetListDocument,
	});
}

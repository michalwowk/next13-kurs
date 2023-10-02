import { executeGraphQl } from "@/api/utils";
import { CollectionsGetListDocument } from "@/gql/graphql";

export async function getAllCollectionList() {
	return executeGraphQl({
		query: CollectionsGetListDocument,
	});
}

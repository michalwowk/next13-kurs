import { executeGraphQl } from "@/api/utils";
import { SingleProductGetItemByIdDocument } from "@/gql/graphql";

export async function getSingleProductById(id: string) {
	return executeGraphQl({
		query: SingleProductGetItemByIdDocument,
		variables: {
			id,
		},
	});
}

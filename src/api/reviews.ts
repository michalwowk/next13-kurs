import { revalidateTag } from "next/cache";
import { ReviewCreateDocument, ReviewPublishDocument } from "@/gql/graphql";
import { executeGraphQl } from "@/api/utils";

export async function publishReview(reviewId: string) {
	if (!reviewId) return;

	await executeGraphQl({
		query: ReviewPublishDocument,
		variables: {
			reviewId,
		},
	});
}

export async function addReview({
	productId,
	formData,
}: {
	productId: string;
	formData: FormData;
}) {
	const { createReview } = await executeGraphQl({
		query: ReviewCreateDocument,
		variables: {
			productId,
			headline: String(formData.get("headline")),
			rating: Number(formData.get("rating")),
			content: String(formData.get("content")),
			name: String(formData.get("name")),
			email: String(formData.get("email")),
		},
	});

	const reviewId = createReview?.id ?? "";

	await publishReview(reviewId);

	revalidateTag("product");
}

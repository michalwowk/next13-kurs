import NextImage from "next/image";
import { type Route } from "next";
import { type CategoryListItemFragment } from "@/gql/graphql";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { Skeleton } from "@/ui/atoms/Skeleton";

type CategoryListItemProps = {
	category: CategoryListItemFragment;
	route: string;
};

export const CategoryListItem = ({ category, route }: CategoryListItemProps) => {
	return (
		<li>
			<ActiveLink href={`${route}/${category.slug}` as Route}>
				<article>
					{category.image?.url ? (
						<NextImage
							src={category.image?.url}
							alt={`Category: ${category.name}`}
							width={300}
							height={300}
						/>
					) : (
						<Skeleton className="h-[300px] w-[300px]" />
					)}

					<h2>{category.name}</h2>
				</article>
			</ActiveLink>
		</li>
	);
};

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeItemFromCartById } from "@/cart/actions";

export function RemoveButton({ productId }: { productId: string }) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<button
			disabled={isPending}
			onClick={() =>
				startTransition(async () => {
					await removeItemFromCartById(productId);
					router.refresh();
				})
			}
			className="text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-wait disabled:text-slate-400"
		>
			Remove
		</button>
	);
}

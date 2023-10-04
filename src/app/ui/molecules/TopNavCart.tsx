import { cookies } from "next/headers";
import { ShoppingCart } from "lucide-react";

import Link from "next/link";
import { getCartById } from "@/api/cart";

export const TopNavCart = async () => {
	const cartId = cookies().get("cartId")?.value;
	const cart = cartId ? await getCartById(cartId) : null;

	const count = cart?.order?.orderItems.length || 0;

	return (
		<Link className="relative flex" href="/cart">
			<ShoppingCart width={30} height={30} />{" "}
			<span className="opacity-85 absolute left-5 top-5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-slate-100">
				{count}
			</span>
		</Link>
	);
};

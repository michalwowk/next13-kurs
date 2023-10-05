import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { formatMoney } from "../../utils";
import { ChangeQuantity } from "@/cart/ChangeQuntity";
import { getCartById } from "@/api/cart";
import { RemoveButton } from "@/cart/RemoveButton";

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		redirect("/");
	}

	const { order } = await getCartById(cartId);

	if (!order) {
		redirect("/");
	}

	return (
		<main className="container mx-auto">
			<section className="mt-5">
				<div>
					<h1>Order #{order.id} summary</h1>
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
							<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="px-6 py-3">
										Product
									</th>
									<th scope="col" className="px-6 py-3">
										Quantity
									</th>
									<th scope="col" className="px-6 py-3">
										Price
									</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{order.orderItems.map((item) => {
									if (!item.product) {
										return null;
									}
									return (
										<tr
											className="dark:bg-slate- border-b bg-white dark:border-gray-700"
											key={item.product.id}
											data-key={item.product.id}
										>
											<td className="px-6 py-4">{item.product.name}</td>
											<td className="px-6 py-4">
												<ChangeQuantity itemId={item.id} quantity={item.quantity} />
											</td>
											<td className="px-6 py-4">{formatMoney(item.product.price / 100)}</td>
											<td className="px-4 py-2">
												<RemoveButton productId={item.id} />
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</main>
	);
}

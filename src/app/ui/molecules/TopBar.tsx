import React from "react";

export const TopBarWrapper = async ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="bg-gray-100">
			<div className="mx-auto max-w-7xl px-8">
				<div className="mx-auto py-8">{children}</div>
			</div>
		</div>
	);
};

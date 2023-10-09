import clsx from "clsx";
import React from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	children: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
	({ className, children, ...props }, ref) => {
		return (
			<label className={clsx("text-md", className)} ref={ref} {...props}>
				{children}
			</label>
		);
	},
);
Label.displayName = "Label";

export { Label };

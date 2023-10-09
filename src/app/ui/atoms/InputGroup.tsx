import clsx from "clsx";
import React from "react";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div className={clsx("flex flex-col", className)} ref={ref} {...props}>
				{children}
			</div>
		);
	},
);

InputGroup.displayName = "InputGroup";

export { InputGroup };

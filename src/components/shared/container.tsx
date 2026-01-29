import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const containerVariants = cva('w-full mx-auto px-4', {
	variants: {
		variant: {
			default: 'max-w-7xl',
			narrow: 'max-w-4xl',
			full: 'max-w-none px-0',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export function Container({
	className,
	variant = 'default',
	asChild = false,
	...props
}: React.ComponentProps<'div'> &
	VariantProps<typeof containerVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'div';

	return (
		<Comp
			data-variant={variant}
			className={cn(containerVariants({ variant, className }))}
			{...props}
		/>
	);
}

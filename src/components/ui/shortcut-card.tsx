import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { H4, Muted } from './typography';

export type ShortcutCardProps = {
	title: string;
	description?: string;
	icon?: React.ElementType;
	href: string;
	shortcut?: string;
	className?: string;
};

export function ShortcutCard({
	title,
	description,
	icon: Icon,
	href,
	shortcut,
	className,
}: ShortcutCardProps) {
	return (
		<Link href={href}>
			<Card className={cn('hover:bg-accent transition cursor-pointer', className)}>
				<CardContent className="px-4 flex flex-col items-start gap-2 min-w-[180px] max-w-[180px]">
					{Icon && (
						<div className="p-2 rounded-md bg-muted">
							<Icon className="h-5 w-5" />
						</div>
					)}

					<div className="flex-1 flex flex-col items-start gap-2">
						<div className="flex flex-row gap-2 items-center justify-between">
							<H4>{title}</H4>
							{shortcut && <kbd className="text-xs bg-muted px-2 py-1 rounded">{shortcut}</kbd>}
						</div>

						{description && <Muted>{description}</Muted>}
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}

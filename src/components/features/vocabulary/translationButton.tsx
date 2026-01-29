import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from '@/components/ui/popover';

interface TranslationButtonProps {
	text: string;
	description?: string;
}
export function TranslationButton({ text, description }: TranslationButtonProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" size="icon">
					<Languages />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start">
				<PopoverHeader>
					<PopoverTitle>{text}</PopoverTitle>
					{description && <PopoverDescription>{description}</PopoverDescription>}
				</PopoverHeader>
			</PopoverContent>
		</Popover>
	);
}

import { AppleIcon, CarrotIcon, DogIcon } from 'lucide-react';

import { Container } from '@/components/shared/container';
import { ShortcutCard, type ShortcutCardProps } from '@/components/ui/shortcut-card';
import { CategoryService } from '@/features/category/category.service';

export default async function VocabularyPage() {
	const categories = await CategoryService.list();

	return (
		<Container variant="narrow" className="py-8 flex flex-col items-start gap-4">
			<p>Select the exercise type</p>
			<div className="flex flex-row gap-4 flex-wrap">
				<ShortcutCard key={'Random'} title={'Aleatorio'} href={'/vocabulary/play'} />
				{categories.map((category) => (
					<ShortcutCard
						key={category.id}
						title={category.name}
						href={`/vocabulary/${category.id}/play`}
					/>
				))}
			</div>
		</Container>
	);
}

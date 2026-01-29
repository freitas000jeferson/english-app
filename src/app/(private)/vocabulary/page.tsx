import { AppleIcon, CarrotIcon, DogIcon } from 'lucide-react';

import { Container } from '@/components/shared/container';
import { ShortcutCard, type ShortcutCardProps } from '@/components/ui/shortcut-card';

const getExercicUrl = (type: string) => {
	return `/vocabulary/play?type=${type}`;
};
export default function VocabularyPage() {
	const exercises: ShortcutCardProps[] = [
		{
			title: 'Animals',
			icon: DogIcon,
			href: getExercicUrl('animals'),
		},
		{
			title: 'Fruits',
			icon: AppleIcon,
			href: getExercicUrl('fruits'),
			shortcut: '4°',
		},
		{
			title: 'Vegetables',
			icon: CarrotIcon,
			href: getExercicUrl('vegetables'),
		},
	];
	return (
		<Container variant="narrow" className="py-8 flex flex-col items-start gap-4">
			<p>Select the exercise type</p>
			<div className="flex flex-row gap-4 flex-wrap">
				{exercises.map((exercise) => (
					<ShortcutCard key={exercise.title} {...exercise} />
				))}
			</div>
		</Container>
	);
}

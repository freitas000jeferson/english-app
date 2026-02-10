import {
	AppleIcon,
	BedIcon,
	CarIcon,
	CookingPot,
	CupSodaIcon,
	DogIcon,
	HospitalIcon,
	HouseIcon,
	PenIcon,
	PersonStandingIcon,
	ShirtIcon,
} from 'lucide-react';

import { Container } from '@/components/shared/container';
import { ShortcutCard } from '@/components/ui/shortcut-card';
import { CategoryService } from '@/features/category/category.service';

const Icons: Record<string, React.ElementType> = {
	animals: DogIcon,
	numbers: PenIcon,
	colors: PenIcon,
	'house-rooms': HouseIcon,
	furniture: BedIcon,
	'kitchen-objects': CookingPot,
	transportation: CarIcon,
	'clothes-accessories': ShirtIcon,
	food: AppleIcon,
	drinks: CupSodaIcon,
	'body-parts': PersonStandingIcon,
	health: HospitalIcon,
};

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
						icon={Icons[category.slug]}
						title={category.name}
						description={category.description ?? undefined}
						shortcut={category.level ?? undefined}
						href={`/vocabulary/${category.id}/play`}
					/>
				))}
			</div>
		</Container>
	);
}

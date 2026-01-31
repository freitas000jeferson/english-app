import { P } from '@/components/ui/typography';
import { SpeechPlayer } from '../../../../components/shared/speech/speech-player';
import { AudioToTextComparisonInput } from './audio-to-text-comparison-input';
import { TranslationButton } from './translationButton';

type AudioExercicesProps = {
	text: string;
	translation: string;
};

export function AudioExercices({ text, translation }: AudioExercicesProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-4 items-center">
				<P>{text}</P>
				<TranslationButton text={translation} />
				<SpeechPlayer text={text} variant="ghost" />
			</div>
			<AudioToTextComparisonInput text={text} />
			<AudioToTextComparisonInput label="Interrogative" icon="question" text="Do I love dogs?" />
			<AudioToTextComparisonInput label="Negative" icon="minus" text="I don't love dogs." />
		</div>
	);
}

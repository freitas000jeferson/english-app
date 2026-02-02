import { P } from '@/components/ui/typography';
import { SpeechPlayer } from '../../../../components/shared/speech/speech-player';
import { AudioToTextComparisonInput } from './audio-to-text-comparison-input';
import { TranslationButton } from './translationButton';

type AudioExercicesProps = {
	affirmativeEn: string;
	affirmativePt: string;
	negativeEn: string;
	negativePt: string;
	interrogativeEn: string;
	interrogativePt: string;
};

export function AudioExercices({
	affirmativeEn,
	affirmativePt,
	negativeEn,
	negativePt,
	interrogativeEn,
	interrogativePt,
}: AudioExercicesProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-4 items-center">
				<P>{affirmativeEn}</P>
				<TranslationButton text={affirmativePt} />
				<SpeechPlayer text={affirmativeEn} variant="ghost" />
			</div>
			<AudioToTextComparisonInput textEn={affirmativeEn} textPt={affirmativePt} />
			<AudioToTextComparisonInput
				label="Interrogative"
				icon="question"
				textEn={interrogativeEn}
				textPt={interrogativePt}
			/>
			<AudioToTextComparisonInput
				label="Negative"
				icon="minus"
				textEn={negativeEn}
				textPt={negativePt}
			/>
		</div>
	);
}

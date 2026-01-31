'use client';

import { normalize } from 'node:path';
import { CircleMinus, CircleQuestionMark } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupText,
	InputGroupTextarea,
} from '@/components/ui/input-group';
import { similarity } from '@/utils/similarity';
import { SpeechRecorder } from '../../../../components/shared/speech/speech-recorder';

const ICONS = {
	question: CircleQuestionMark,
	minus: CircleMinus,
};

type AudioToTextComparisonInputProps = {
	label?: string;
	icon?: keyof typeof ICONS;
	text: string;
};
export function AudioToTextComparisonInput({ text, label, icon }: AudioToTextComparisonInputProps) {
	const [spoken, setSpoken] = useState('');
	const Icon = icon ? ICONS[icon] : null;

	const handleResult = (received: string) => {
		setSpoken(received);
		verify(received);
	};
	const verify = (received: string) => {
		const targetNomalized = normalize(text);
		const receivedNomalized = normalize(received);

		const score = similarity(targetNomalized, receivedNomalized);
		if (score >= 0.8) {
			toast.success(`Congratulations, you got it right! Score: ${(score! * 100).toFixed(0)}%`, {
				position: 'bottom-center',
				style: { color: 'var(--success)' },
			});
		} else {
			toast.error(`You got it wrong! Score: ${(score! * 100).toFixed(0)}%`, {
				position: 'bottom-center',
				style: { color: 'var(--destructive)' },
			});
		}
	};

	return (
		<InputGroup className="w-full w-md gap-2">
			<InputGroupTextarea
				id="audio-textarea"
				placeholder="Type here."
				className=" w-md font-mono text-sm"
				value={spoken}
				onChange={(event) => setSpoken(event.target.value)}
			/>
			<InputGroupAddon align="block-end">
				<div className="w-full flex flex-row gap-4 justify-end">
					<SpeechRecorder variant="outline" size="sm" onResult={handleResult} />

					<InputGroupButton size="sm" className="" variant="default" onClick={() => verify(spoken)}>
						Verify
					</InputGroupButton>
				</div>
			</InputGroupAddon>
			{label && (
				<InputGroupAddon align="block-start">
					{Icon && <Icon className="text-muted-foreground" />}
					<InputGroupText className="font-mono">{label}</InputGroupText>
				</InputGroupAddon>
			)}
		</InputGroup>
	);
}

'use client';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SpeechPlayerProps = {
	text: string;
} & React.ComponentProps<typeof Button>;

export function SpeechPlayer({
	text,
	variant = 'secondary',
	size = 'icon',
	...props
}: SpeechPlayerProps) {
	const speak = () => {
		if (!('speechSynthesis' in window)) {
			alert('Seu navegador não suporta TTS');
			return;
		}
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = 'en-US';
		utterance.rate = 0.9;
		utterance.pitch = 1;

		window.speechSynthesis.cancel();
		window.speechSynthesis.speak(utterance);
	};
	return (
		<Button variant={variant} size={size} {...props} onClick={speak}>
			<Volume2 />
		</Button>
	);
}

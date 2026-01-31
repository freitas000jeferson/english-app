'use client';
import { Loader2, Mic } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

type SpeechRecorderProps = {
	onResult: (result: string) => void;
} & React.ComponentProps<typeof Button>;

export function SpeechRecorder({
	onResult,
	variant = 'secondary',
	size = 'icon',
	...props
}: SpeechRecorderProps) {
	const recognitionRef = useRef<any>(null);
	const [listening, setListening] = useState(false);

	const startRecording = () => {
		const SpeechRecognition =
			(window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

		if (!SpeechRecognition) {
			alert('Speech Recognition não suportado');
			return;
		}

		const recognition = new SpeechRecognition();
		recognition.lang = 'en-US';
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		recognition.onstart = () => setListening(true);
		recognition.onend = () => setListening(false);

		recognition.onresult = (event: any) => {
			const transcript = event.results[0][0].transcript;
			onResult(transcript);
		};

		recognitionRef.current = recognition;
		recognition.start();
	};

	return (
		<Button variant={variant} size={size} {...props} onClick={startRecording} disabled={listening}>
			{listening ? <Loader2 className="animate-spin" /> : <Mic />}
		</Button>
	);
}

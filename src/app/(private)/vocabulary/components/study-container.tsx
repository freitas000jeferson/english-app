'use client';
import type { Example, Word } from '@prisma/client';
import { Annoyed, Smile, ThumbsDown, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { AudioExercices } from '@/app/(private)/vocabulary/components/audio-exercices';
import { Container } from '@/components/shared/container';
import { SpeechPlayer } from '@/components/shared/speech/speech-player';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { H2, H3, Muted, P } from '@/components/ui/typography';
import { answerWordAction, getStudyQueueAction } from '../actions';

type WordDTO = Word & { examples: Example[] };

type StudyContainerProps = {
	initialQueue: WordDTO[];
};

export function StudyContainer({ initialQueue }: StudyContainerProps) {
	const params = useParams();
	const categoryId = params?.id ? Number(params.id) : undefined;

	const [queue, setQueue] = useState(initialQueue);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	const current = queue[index];
	async function answer(grade: 0 | 1 | 2 | 3) {
		if (!current) return;

		setIndex((i) => i + 1);

		await answerWordAction({
			wordId: current.id,
			grade,
		});
	}
	async function refreshSession() {
		setLoading(true);

		const newQueue = await getStudyQueueAction(categoryId);

		setQueue(newQueue);
		setIndex(0);

		setLoading(false);
	}

	if (loading) {
		return (
			<Container variant="narrow" className="py-8 flex flex-col items-start gap-4">
				<Spinner />
				<p>Carregando mais palavras...</p>
			</Container>
		);
	}

	if (!current) {
		return (
			<Container variant="narrow" className="py-8 flex flex-col items-start gap-4">
				<H2>🎉 Sessão concluída</H2>
				<div className="flex flex-row gap-4">
					<Button onClick={() => refreshSession()}>Reiniciar</Button>

					<Link href="/vocabulary">
						<Button variant="secondary"> Voltar</Button>
					</Link>
				</div>
			</Container>
		);
	}

	return (
		<Container variant="narrow" className="py-8 flex flex-col items-start gap-4">
			<Tabs defaultValue="original" className="w-full">
				<TabsList>
					<TabsTrigger value="original">original</TabsTrigger>
					<TabsTrigger value="translate">Tradução</TabsTrigger>
				</TabsList>
				<TabsContent value="original">
					<Card>
						<CardContent className="">
							<div className="flex flex-row gap-4 justify-between">
								<H3>{current.en}</H3>
								<SpeechPlayer text={current.en} variant="secondary" />
							</div>
							<P className="text-muted-foreground text-sm">{current.partOfSpeech}</P>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="translate">
					<Card>
						<CardHeader>
							<CardTitle>Tradução</CardTitle>
							<CardDescription>{current.pt}</CardDescription>
							<CardContent>{current.description}</CardContent>
						</CardHeader>
						<CardContent className="text-muted-foreground text-sm" />
					</Card>
				</TabsContent>
			</Tabs>

			<div className="flex flex-row gap-4 ">
				<Button variant="secondary" size="icon" onClick={() => answer(0)}>
					<ThumbsDown />
				</Button>
				<Button variant="secondary" size="icon" onClick={() => answer(1)}>
					<Annoyed />
				</Button>
				<Button variant="secondary" size="icon" onClick={() => answer(2)}>
					<Smile />
				</Button>
				<Button variant="secondary" size="icon" onClick={() => answer(3)}>
					<ThumbsUp />
				</Button>
			</div>

			<Muted> Exercices</Muted>
			{current.examples.map((example) => (
				<AudioExercices key={example.id} {...example} />
			))}
		</Container>
	);
}

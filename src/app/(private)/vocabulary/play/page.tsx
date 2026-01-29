import { Annoyed, Frown, Mic, Repeat, Smile, ThumbsDown, ThumbsUp, Volume2 } from 'lucide-react';
import { SpeechPlayer } from '@/components/features/speech/speech-player';
import { AudioExercices } from '@/components/features/vocabulary/audio-exercices';
import { TranslationButton } from '@/components/features/vocabulary/translationButton';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { H1, H3, Muted, P } from '@/components/ui/typography';

export default function VocabularyPlayPage() {
	return (
		<Container variant="narrow" className="py-8 flex flex-col items-start gap-4">
			<Muted> 1/10 </Muted>
			<Tabs defaultValue="original" className="w-full">
				<TabsList>
					<TabsTrigger value="original">original</TabsTrigger>
					<TabsTrigger value="translate">Tradução</TabsTrigger>
				</TabsList>
				<TabsContent value="original">
					<Card>
						<CardContent className="">
							<div className="flex flex-row gap-4 justify-between">
								<H3>Dog</H3>
								<SpeechPlayer text="Dog" variant="secondary" />
							</div>
							<P className="text-muted-foreground text-sm">dôg</P>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="translate">
					<Card>
						<CardHeader>
							<CardTitle>Tradução</CardTitle>
							<CardDescription>Cachorro</CardDescription>
						</CardHeader>
						<CardContent className="text-muted-foreground text-sm"></CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{/*       
<div className="flex flex-row gap-4 justify-between">
        <H3>Dog</H3>

        <TranslationButton text={'Cachorro'} />
        
        <Button variant="secondary" size="icon">
          <Volume2 />
        </Button>
      
      </div> */}

			<div className="flex flex-row gap-4 ">
				<Button variant="secondary" size="icon">
					<ThumbsUp />
				</Button>
				<Button variant="secondary" size="icon">
					<Smile />
				</Button>
				<Button variant="secondary" size="icon">
					<Annoyed />
				</Button>
				<Button variant="secondary" size="icon">
					<ThumbsDown />
				</Button>
			</div>
			<div className="flex flex-row justify-end">
				<Button>Next</Button>
			</div>
			<Muted> Exercices</Muted>
			<AudioExercices text="I love dogs" translation="Eu amo cachorro" />
		</Container>
	);
}

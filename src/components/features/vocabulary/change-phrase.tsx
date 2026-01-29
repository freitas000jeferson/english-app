'use client';
import { CheckCircle2Icon, Mic, Volume2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { P } from '@/components/ui/typography';

export function ChangePhrase({ className, ...props }: React.ComponentProps<'h1'>) {
	function verifyStrings() {
		// toast.success('Congratulations, you got it right!', { position: 'bottom-center', style: { color: "var(--success)"} });
		toast.error('You got it wrong!', {
			position: 'bottom-center',
			style: { color: 'var(--destructive)' },
		});
	}
	return (
		<div className="flex flex-col gap-4">
			<div>
				<P>I love dogs</P>
				<Button variant="secondary" size="icon">
					<Volume2 />
				</Button>
			</div>
			<Textarea placeholder="Type your message here." className="w-md max-h-16" />
			<div className="flex flex-row gap-4 ">
				<Button variant="outline" size="icon">
					<Mic />
				</Button>

				<Button onClick={verifyStrings}>Verify</Button>
			</div>
		</div>
	);
}

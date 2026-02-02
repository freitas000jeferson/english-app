import { notFound } from 'next/navigation';
import { getStudyQueueAction } from '../../actions';
import { StudyContainer } from '../../components/study-container';

export default async function PlayPage({ params }: { params: { id: string } }) {
	const categoryId = Number(params.id);
	if (Number.isNaN(categoryId)) notFound();

	const queue = await getStudyQueueAction(categoryId);

	return <StudyContainer initialQueue={queue} />;
}

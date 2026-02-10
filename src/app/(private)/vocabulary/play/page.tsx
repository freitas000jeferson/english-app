import { getStudyQueueAction } from '../actions';
import { StudyContainer } from '../components/study-container';

export default async function RandomPlayPage() {
	const queue = await getStudyQueueAction();

	return <StudyContainer initialQueue={queue} />;
}

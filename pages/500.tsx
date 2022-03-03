import Container from '$components/Container';
import ErrorMessage from '$components/ErrorMessage';
import Spacer from '$components/Spacer';
import { NextPage } from 'next';

const InternalServerError: NextPage = () => {
	return (
		<Container>
			<Spacer height={32} />
			<ErrorMessage
				title="500: Internal server error"
				contents="Oops! Something happened, sorry about that."
			/>
		</Container>
	);
};

export default InternalServerError;

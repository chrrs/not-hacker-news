import Container from '$components/Container';
import ErrorMessage from '$components/ErrorMessage';
import Spacer from '$components/Spacer';
import { NextPage } from 'next';

const NotFound: NextPage = () => {
	return (
		<Container>
			<Spacer height={32} />
			<ErrorMessage title="404: Not found" contents="This page does not exist." />
		</Container>
	);
};

export default NotFound;

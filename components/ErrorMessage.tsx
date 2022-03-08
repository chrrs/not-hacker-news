import { styled } from 'stitches.config';

const Wrapper = styled('div', {
	padding: '8px 16px',

	color: '$red11',
	background: '$red3',
	border: '2px solid $red9',
	borderRadius: 4,
});

const Title = styled('h1', {
	fontWeight: '600',
	fontSize: '16px',
	margin: 0,
});

const Contents = styled('p', {
	margin: 0,
});

const ErrorMessage: React.VFC<{ title: string; contents: string }> = ({ title, contents }) => {
	return (
		<Wrapper>
			<Title>{title}</Title>
			<Contents>{contents}</Contents>
		</Wrapper>
	);
};

export default ErrorMessage;

import { styled } from 'stitches.config';

const Square = styled('div', {
	display: 'inline-block',
	width: 32,
	height: 32,
	background: '$accent',
});

const LogoText = styled('p', {
	margin: 0,
	fontWeight: '600',
});

const Underlined = styled('span', {
	borderBottom: '2px solid currentColor',
});

const Wrapper = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: 8,
});

const Logo: React.VFC = () => {
	return (
		<Wrapper>
			<Square />
			<LogoText>
				<Underlined>Not</Underlined> Hacker News
			</LogoText>
		</Wrapper>
	);
};

export default Logo;

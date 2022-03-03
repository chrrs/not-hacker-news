import Link from 'next/link';
import { styled } from 'stitches.config';
import Container from '$components/Container';
import Logo from '$components/Logo';
import Spacer from '$components/Spacer';

const Background = styled('header', {
	background: 'white',
});

const Wrapper = styled(Container, {
	display: 'flex',
	justifyContent: 'space-between',
	paddingY: 8,
});

const NavigationWrapper = styled('div', {
	display: 'flex',
});

const HeaderButton = styled('a', {
	paddingY: 4,
	borderRadius: 4,

	transition: 'background',

	variants: {
		color: {
			transparent: {
				'&:hover': {
					background: '$gray3',
				},

				'&:active': {
					background: '$gray4',
				},
			},
			blue: {
				color: 'white',
				background: '$blue9',

				'&:hover': {
					background: '$blue10',
				},

				'&:active': {
					background: '$blue11',
				},
			},
		},
		width: {
			normal: {
				paddingX: 8,
			},
			wide: {
				paddingX: 16,
			},
		},
	},
	defaultVariants: {
		color: 'transparent',
		width: 'normal',
	},
});

const Header: React.FC = () => {
	return (
		<Background>
			<Wrapper>
				<NavigationWrapper>
					<Link href="/">
						<a>
							<Logo />
						</a>
					</Link>
					<Spacer width={8} />
					<Link href="/" passHref>
						<HeaderButton>New</HeaderButton>
					</Link>
					<Link href="/" passHref>
						<HeaderButton>Past</HeaderButton>
					</Link>
					<Link href="/" passHref>
						<HeaderButton>Comments</HeaderButton>
					</Link>
					<Link href="/" passHref>
						<HeaderButton>Ask</HeaderButton>
					</Link>
					<Link href="/" passHref>
						<HeaderButton>Show</HeaderButton>
					</Link>
					<Link href="/" passHref>
						<HeaderButton>Jobs</HeaderButton>
					</Link>
				</NavigationWrapper>
				<NavigationWrapper>
					<Link href="/sign-in" passHref>
						<HeaderButton>Sign in</HeaderButton>
					</Link>
					<Spacer width={8} />
					<Link href="/create" passHref>
						<HeaderButton color="blue" width="wide">
							Create post
						</HeaderButton>
					</Link>
				</NavigationWrapper>
			</Wrapper>
		</Background>
	);
};

export default Header;

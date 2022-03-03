import type { AppProps } from 'next/app';
import Header from '$components/Header';
import { globalCss, styled } from 'stitches.config';
import { opinionated } from 'stitches-normalize-css';

const globalStyles = globalCss(...opinionated, {
	body: {
		fontFamily: '$ui',
		lineHeight: 1.5,
	},
	a: {
		color: 'inherit',
		textDecoration: 'inherit',
	},
});

const AppWrapper = styled('div', {
	minHeight: '100vh',
	background: '$gray2',
});

function App({ Component, pageProps }: AppProps) {
	globalStyles();

	return (
		<AppWrapper>
			<Header />
			<Component {...pageProps} />
		</AppWrapper>
	);
}

export default App;

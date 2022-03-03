import type { AppProps } from 'next/app';
import { globalCss, styled } from 'stitches.config';

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
	globalStyles();
}

export default App;

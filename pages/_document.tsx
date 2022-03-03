import { Head, Html, Main, NextScript } from 'next/document';
import { getCssText } from 'stitches.config';

const _Document: React.FC = () => {
	return (
		<Html>
			<Head>
				<style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default _Document;

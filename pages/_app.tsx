import '../styles/global.css';
import 'windi.css';

function App({ Component, pageProps: { session, ...pageProps } }) {
    return <Component {...pageProps} />;
}

export default App;

import { NextPage } from 'next';
import Header from '../components/Header';

const NotFound: NextPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <div className="flex-1 flex flex-col gap-2 items-center justify-center">
                <h1 className="text-6xl font-semibold">Well shit.</h1>
                <p>
                    <b>404:</b> Not Found
                </p>
            </div>
        </div>
    );
};

export default NotFound;

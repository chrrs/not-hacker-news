import { NextPage } from 'next';
import Header from '../components/Header';
import Message from '../components/Message';

const ServerError: NextPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-5xl m-auto mt-8">
                <Message
                    type="error"
                    title="500: Internal server error"
                    content="Something happened. Sorry about that!"
                />
            </div>
        </div>
    );
};

export default ServerError;

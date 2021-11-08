import { NextPage } from 'next';
import Header from '../components/Header';
import Message from '../components/Message';

const NotFound: NextPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-5xl m-auto mt-8">
                <Message
                    type="error"
                    title="404: Not found"
                    content="This page does not exist."
                />
            </div>
        </div>
    );
};

export default NotFound;

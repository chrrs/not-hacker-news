import { NextPage } from 'next';
import Header from '../components/Header';

const Home: NextPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
        </div>
    );
};

export default Home;

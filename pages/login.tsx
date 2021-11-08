import { NextPage } from 'next';
import Header from '../components/Header';
import Input from '../components/Input';

const Login: NextPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <div className="flex flex-col gap-4 max-w-md w-full m-auto mt-8">
                <h1 className="font-semibold text-2xl text-center">Log in</h1>
                <div className="flex flex-col gap-2">
                    <Input label="Username" />
                    <Input label="Password" type="password" />

                    <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded focus:outline-none">
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;

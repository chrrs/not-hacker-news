import { NextPage } from 'next';
import Button from '../components/Button';
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
                    <Button type="primary">Log in</Button>
                </div>
            </div>
        </div>
    );
};

export default Login;

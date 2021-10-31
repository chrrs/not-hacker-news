import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
} from 'next';
import { getSession, signIn } from 'next-auth/react';
import Image from 'next/image';
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

                    <div className="flex items-center gap-2 text-gray-400 text-xs my-2">
                        <div className="flex-grow border-t border-gray-300" />
                        <span>OR</span>
                        <div className="flex-grow border-t border-gray-300" />
                    </div>

                    <button
                        className="login-button bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                        onClick={() => signIn('google', { callbackUrl: '/' })}
                    >
                        <Image
                            src="/icons/google.svg"
                            alt="Google Logo"
                            width={24}
                            height={24}
                        />
                        Continue with Google
                    </button>
                    <button className="login-button disabled bg-black">
                        <Image
                            src="/icons/github.svg"
                            alt="GitHub Logo"
                            width={24}
                            height={24}
                        />
                        Continue with GitHub
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;

export async function getServerSideProps({
    req,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<unknown>> {
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    } else {
        return {
            props: {},
        };
    }
}

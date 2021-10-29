import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
} from 'next';
import { getSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import Header from '../components/Header';

const Login: NextPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <div className="flex flex-col gap-4 max-w-md w-full m-auto mt-8">
                <h1 className="font-semibold text-2xl text-center">Log in</h1>
                <div className="flex flex-col gap-2">
                    <button
                        className="login-button bg-blue-600 hover:bg-blue-500 active:bg-blue-700"
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

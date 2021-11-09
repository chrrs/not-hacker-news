import { gql } from 'urql';
import { GetServerSideProps, NextPage } from 'next';
import Header from '../components/Header';
import Message from '../components/Message';
import Post from '../components/Post';
import { query } from '../lib/graphql/client';
import { Post as ApiPost } from '../lib/types';

const Home: NextPage<{
    data: { posts: Array<ApiPost> };
    error?: string;
}> = ({ data, error }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-5xl m-auto mt-8">
                {error ? (
                    <Message
                        type="error"
                        title="Failed to load posts."
                        content={error}
                    />
                ) : (
                    <div className="flex flex-col gap-4">
                        {data.posts.map((post, index) => (
                            <Post key={index} number={index + 1} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (_ctx) => {
    const result = await query(gql`
        {
            posts {
                title
                url
            }
        }
    `);

    return {
        props: {
            data: result.data || null,
            error: result.error || null,
        },
    };
};

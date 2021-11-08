import { gql } from 'urql';
import { GetServerSideProps, NextPage } from 'next';
import Header from '../components/Header';
import Message from '../components/Message';
import { query } from '../lib/graphql/client';
import { Post } from '../lib/types';

const Home: NextPage<{
    data: { posts: Array<Post> };
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
                    <div>{data.posts.map((post) => post.title)}</div>
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

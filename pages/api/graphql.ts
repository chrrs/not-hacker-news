import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer, gql } from 'apollo-server-micro';
import { IResolvers } from '@graphql-tools/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../lib/mongo';
import { Db } from 'mongodb';

const typeDefs = gql`
    type Post {
        title: String!
        url: String
    }

    type Query {
        posts: [Post]
    }
`;

const resolvers: IResolvers = {
    Query: {
        posts: async (_parent, _args, _context: { db: Db }, _info) =>
            (await _context.db.collection('posts').find().toArray()).map(
                (post) => ({ title: post.title, url: post.url })
            ),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    debug: false,
    context: async () => {
        try {
            return { db: await getDb() };
        } catch (e) {
            console.error('Failed to create GraphQL context:', e);
            throw new Error('Failed to connect to database.');
        }
    },
});

const startServer = server.start();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await startServer;
    await server.createHandler({
        path: '/api/graphql',
    })(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};

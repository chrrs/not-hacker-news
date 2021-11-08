import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer, gql } from 'apollo-server-micro';
import { IResolvers } from '@graphql-tools/utils';
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

export const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    debug: false,
    introspection: true,
    context: async () => {
        try {
            return { db: await getDb() };
        } catch (e) {
            console.error('Failed to create GraphQL context:', e);
            throw new Error('Failed to connect to database.');
        }
    },
});

export const startServer = server.start();

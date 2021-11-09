import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer, gql } from 'apollo-server-micro';
import { IResolvers } from '@graphql-tools/utils';
import { getDb } from '../../lib/mongo';
import { Db } from 'mongodb';
import { GraphQLScalarType, Kind } from 'graphql';

const typeDefs = gql`
    scalar Date

    type Post {
        title: String!
        url: String
        posted: Date!
    }

    type Query {
        posts: [Post!]
    }
`;

const resolvers: IResolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        parseValue(value: string) {
            return new Date(value);
        },
        serialize(value: Date) {
            return value.toISOString();
        },
    }),
    Query: {
        posts: async (_parent, _args, _context: { db: Db }, _info) =>
            (await _context.db.collection('posts').find().toArray()).map(
                (post) => ({
                    title: post.title,
                    url: post.url,
                    posted: post.posted,
                })
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

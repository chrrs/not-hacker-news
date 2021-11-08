import { DocumentNode } from 'graphql';
import { createClient } from 'urql';
import { server } from './server';

const isServer = typeof window === 'undefined';

const client = createClient({
    url: '/api/graphql',
    maskTypename: true,
    fetch: fetch,
    suspense: isServer,
});

interface GraphQLQueryResponse {
    data?: any;
    error?: string;
}

export async function query(
    query: string | DocumentNode
): Promise<GraphQLQueryResponse> {
    if (isServer) {
        const result = await server.executeOperation({ query });
        return {
            data: result.data,
            error: result.errors?.[0]?.message,
        };
    } else {
        const result = await client.query(query).toPromise();
        return {
            data: result.data,
            error: result.error?.message,
        };
    }
}

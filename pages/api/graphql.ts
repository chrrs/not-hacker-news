import { NextApiRequest, NextApiResponse } from 'next';
import { server, startServer } from '../../lib/graphql/server';

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

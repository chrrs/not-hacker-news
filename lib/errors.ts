import { NextApiHandler } from 'next';
import { ApiError } from '$lib/api';

export function withoutErrors<T>(handler: NextApiHandler<T>): NextApiHandler<T | ApiError> {
	return async (req, res) => {
		try {
			await handler(req, res);
		} catch (e: any) {
			res.status(500).json({ error: 'internal_server_error', message: e.toString() });
			console.error(e);
		}
	};
}

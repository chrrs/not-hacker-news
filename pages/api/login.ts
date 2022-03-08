import { NextApiRequest, NextApiResponse } from 'next';

import { setAuthCookie } from '$lib/auth';
import { randomBytes } from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await setAuthCookie(res, {
		id: req.query.name?.toString() ?? 'no name',
		csrf: randomBytes(100).toString('base64url'),
	});

	res.end();
}

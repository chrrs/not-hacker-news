import { NextApiRequest, NextApiResponse } from 'next';
import { clearAuthCookie } from '$lib/auth';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
	await clearAuthCookie(res);
	res.end();
}

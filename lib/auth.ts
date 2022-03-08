import { NextApiRequest, NextApiResponse } from 'next';

import Iron from '@hapi/iron';
import { serialize } from 'cookie';

export type Token = {
	id: string;
	csrf: string;
};

export async function getAuthCookie(req: NextApiRequest): Promise<Token | undefined> {
	const auth = req.cookies['token'];
	if (auth) {
		return await Iron.unseal(auth, process.env.SECRET as string, {
			...Iron.defaults,
			// TODO: Set ttl to something small.
		});
	} else {
		return undefined;
	}
}

export async function setAuthCookie(res: NextApiResponse, token: Token) {
	res.setHeader('Set-Cookie', [
		serialize(
			'token',
			await Iron.seal(token, process.env.SECRET as string, {
				...Iron.defaults,
				// TODO: Set ttl to something small.
			}),
			{
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				sameSite: 'lax',
				path: '/',
				// TODO: Set expiry to something small
			}
		),
		serialize('csrf', token.csrf, {
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'lax',
			path: '/',
		}),
	]);
}

export async function clearAuthCookie(res: NextApiResponse) {
	res.setHeader('Set-Cookie', [
		serialize('token', '', { maxAge: 0, path: '/' }),
		serialize('csrf', '', { maxAge: 0, path: '/' }),
	]);
}

export type AuthenticatedApiHandler<T> = (
	req: NextApiRequest & { token?: Token },
	res: NextApiResponse<T>
) => void | Promise<void>;

export function withAuth<T>(handler: AuthenticatedApiHandler<T>): AuthenticatedApiHandler<T> {
	return async (req, res) => {
		try {
			req.token = await getAuthCookie(req);
		} catch (e) {
			console.warn('failed to get the authentication token: ' + e);
			await clearAuthCookie(res);
		}

		if (req.token) {
			const csrf = req.token.csrf;
			if (csrf !== req.cookies.csrf || csrf !== req.headers.csrf) {
				console.log(csrf, req.cookies.csrf, req.headers.csrf);
				res.status(401).end();
				return;
			}
		}

		handler(req, res);
	};
}

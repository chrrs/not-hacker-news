import { NextApiRequest, NextApiResponse } from 'next';

import Iron from '@hapi/iron';
import { serialize } from 'cookie';
import Tokens from 'csrf';
import { DbUser, UserModel } from '$lib/model/user';
import { ensureDbConnection } from '$lib/db';
import { ApiError } from './api';

const SECRET = process.env.SECRET as string;
const TOKEN_LIFETIME = 60 * 60 * 24 * 30;

if (!SECRET) {
	throw new Error('No SECRET specified in environment.');
}

const csrf = new Tokens();

export type Token = {
	id: string;
	csrf: string;
};

export async function generateCsrfPair(): Promise<[string, string]> {
	const secret = await csrf.secret();
	return [secret, csrf.create(secret)];
}

export async function getAuthCookie(req: NextApiRequest): Promise<Token | undefined> {
	const auth = req.cookies['token'];
	if (auth) {
		return await Iron.unseal(auth, SECRET, {
			...Iron.defaults,
			// TODO: Set ttl to something small.
		});
	} else {
		return undefined;
	}
}

export async function setAuthCookie(res: NextApiResponse, token: Omit<Token, 'csrf'>) {
	const csrfPair = await generateCsrfPair();

	// TODO: Hide this behind a layer of refresh tokens, make expiry shorter.
	res.setHeader('Set-Cookie', [
		serialize(
			'token',
			await Iron.seal({ ...token, csrf: csrfPair[0] }, SECRET, {
				...Iron.defaults,
				ttl: 1000 * TOKEN_LIFETIME,
			}),
			{
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				sameSite: 'lax',
				path: '/',
				maxAge: TOKEN_LIFETIME,
			}
		),
		serialize('csrf', csrfPair[1], {
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'lax',
			path: '/',
			maxAge: TOKEN_LIFETIME,
		}),
	]);
}

export async function clearAuthCookie(res: NextApiResponse) {
	res.setHeader('Set-Cookie', [
		serialize('token', '', { maxAge: 0, path: '/' }),
		serialize('csrf', '', { maxAge: 0, path: '/' }),
	]);
}

export type TokenApiHandler<T> = (
	req: NextApiRequest & { token?: Token },
	res: NextApiResponse<T>
) => void | Promise<void>;

export function withToken<T>(handler: TokenApiHandler<T>): TokenApiHandler<T | ApiError> {
	return async (req, res) => {
		try {
			req.token = await getAuthCookie(req);
		} catch (e) {
			console.warn('failed to get the authentication token: ' + e);
			await clearAuthCookie(res);
		}

		if (req.token) {
			if (!csrf.verify(req.token.csrf, req.headers.csrf as string)) {
				res.status(401).json({
					error: 'invalid_csrf_token',
					message: 'CSRF token validation failed.',
				});
				return;
			}
		}

		await handler(req, res);
	};
}

export type UserApiHandler<T> = (
	req: NextApiRequest & { user?: DbUser },
	res: NextApiResponse<T>
) => void | Promise<void>;

export function withUser<T>(handler: UserApiHandler<T>): TokenApiHandler<T | ApiError> {
	return withToken(async (req, res) => {
		if (req.token) {
			await ensureDbConnection();

			const user = await UserModel.findById(req.token.id);
			if (!user) {
				console.warn(`failed to get user for id ${req.token.id}`);
				await clearAuthCookie(res);
			} else {
				// @ts-ignore
				req.user = {
					_id: user._id,
					name: user.name,
					password: user.password,
					created: user.created,
				};
			}
		}

		await handler(req, res);
	});
}

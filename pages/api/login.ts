import { NextApiRequest, NextApiResponse } from 'next';

import { setAuthCookie } from '$lib/auth';
import { UserModel } from '$lib/model/user';
import bcrypt from 'bcrypt';
import { ensureDbConnection } from '$lib/db';
import { ApiError, extractApiUserFields, User } from '$lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse<User | ApiError>) {
	await ensureDbConnection();

	const { name, password }: { name: string; password: string } = req.body;
	if (!name || !password) {
		res.status(400).json({ error: 'no name or password given' });
		return;
	}

	const user = await UserModel.findOne({ name }).collation({
		locale: 'en',
		strength: 2,
	});

	if (!user) {
		res.status(400).json({ error: 'incorrect username or password' });
		return;
	}

	if (!(await bcrypt.compare(password, user.password))) {
		res.status(400).json({ error: 'incorrect username or password' });
		return;
	}

	await setAuthCookie(res, { id: user._id.toString() });

	res.status(200).json(extractApiUserFields(user));
}

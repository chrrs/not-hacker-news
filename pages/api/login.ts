import { setAuthCookie } from '$lib/auth';
import { UserModel } from '$lib/model/user';
import bcrypt from 'bcrypt';
import { ensureDbConnection } from '$lib/db';
import { ApiError, extractApiUserFields, User } from '$lib/api';
import { withoutErrors } from '$lib/errors';

export default withoutErrors<User | ApiError>(async (req, res) => {
	await ensureDbConnection();

	const { name, password }: { name: string; password: string } = req.body;
	if (!name || !password) {
		res.status(400).json({
			error: 'missing_credentials',
			message: 'Incomplete request, name or password not given.',
		});
		return;
	}

	const user = await UserModel.findOne({ name }).collation({
		locale: 'en',
		strength: 2,
	});

	if (!user) {
		res.status(400).json({
			error: 'invalid_credentials',
			message: 'Username or password incorrect.',
		});
		return;
	}

	if (!(await bcrypt.compare(password, user.password))) {
		res.status(400).json({
			error: 'invalid_credentials',
			message: 'Username or password incorrect.',
		});
		return;
	}

	await setAuthCookie(res, { id: user._id.toString() });

	res.status(200).json(extractApiUserFields(user));
});

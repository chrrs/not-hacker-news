import { ensureDbConnection } from '$lib/db';
import { UserModel } from '$lib/model/user';
import bcrypt from 'bcrypt';
import { setAuthCookie } from '$lib/auth';
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

	if (
		await UserModel.findOne({ name }).collation({
			locale: 'en',
			strength: 2,
		})
	) {
		res.status(400).json({
			error: 'name_unavailable',
			message: `The name '${name}' is already taken.`,
		});
		return;
	}

	const user = await UserModel.create({
		name,
		password: await bcrypt.hash(password, 4),
	});

	await setAuthCookie(res, { id: user._id.toString() });

	res.status(201).json(extractApiUserFields(user));
});

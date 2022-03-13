import { ApiError, extractApiUserFields, User } from '$lib/api';
import { withUser } from '$lib/auth';
import { withoutErrors } from '$lib/errors';

export default withoutErrors(
	withUser<User | ApiError>((req, res) => {
		if (!req.user) {
			res.status(401).json({ error: 'unauthorized', message: 'Not logged in.' });
			return;
		}

		res.json(extractApiUserFields(req.user));
	})
);

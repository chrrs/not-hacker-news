import { ApiError, extractApiUserFields, User } from '$lib/api';
import { withUser } from '$lib/auth';

export default withUser<User | ApiError>((req, res) => {
	if (!req.user) {
		res.status(401).json({ error: 'not logged in' });
		return;
	}

	res.json(extractApiUserFields(req.user));
});

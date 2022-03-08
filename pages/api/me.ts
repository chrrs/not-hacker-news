import { withAuth } from '$lib/auth';

export default withAuth((req, res) => {
	if (!req.token) {
		res.status(401).end();
		return;
	}

	res.json({ token: req.token });
});

import { clearAuthCookie } from '$lib/auth';
import { withoutErrors } from '$lib/errors';

export default withoutErrors(async (_, res) => {
	await clearAuthCookie(res);
	res.end();
});

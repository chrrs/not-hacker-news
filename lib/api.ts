export interface User {
	name: string;
	created: Date;
}

export interface ApiError {
	error: string;
}

export function extractApiUserFields<T extends User>(user: T): User {
	return {
		name: user.name,
		created: user.created,
	};
}

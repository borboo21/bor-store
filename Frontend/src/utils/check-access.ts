export const checkAccess = (access: number[], userRole: number): boolean =>
	access.includes(userRole);

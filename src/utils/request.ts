export function request<TResponse = any>(
	url: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
	data?: Record<string, any>,
): Promise<TResponse> {
	return fetch(url, {
		headers: {
			'content-type': 'application/json;charset=utf-8',
		},
		method,
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
}

type requestType<T> = {
	data: T;
	error?: string;
};

export function request<T>(
	url: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
	data?: unknown,
): Promise<requestType<T>> {
	console.log(JSON.stringify(data));
	return fetch(url, {
		headers: {
			'content-type': 'application/json;charset=utf-8',
		},
		method,
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
}

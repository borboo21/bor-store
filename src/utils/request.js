export function request(url, method, data) {
	console.log(url, method, data);
	return fetch(url, {
		headers: {
			'content-type': 'application/json;charset=utf-8',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
}

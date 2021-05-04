

let instance: ServerService;

export class ServerService {

	static baseURL = '';

	static get instance(): ServerService {
		if (!instance) {
			instance = new ServerService();
		}
		return instance;
	}

	private async postJson(serverURL: string, requestData: any): Promise<any> {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open("POST", serverURL, true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					switch (xhr.status) {
						case 200:
							try {
								let jsonData = JSON.parse(xhr.responseText);
								resolve(jsonData);
							}
							catch (e) {
								reject();
							}
							break;
						default:
							reject();
							break;
					}
				}
			};
			xhr.send(JSON.stringify(requestData));
		});
	}

	// async getJson(path: string, useAuth?: boolean): Promise<any> {
	// 	let url = ServerService.host + path;
	// 	// send their oauth token too?
	// 	let options: RequestInit = {
	// 		method: "GET",
	// 	};
	// 	const response = await fetch(url, options);
	// 	return await response.json();
	// }
}

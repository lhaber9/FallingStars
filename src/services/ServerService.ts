let instance: ServerService;

export enum Direction {
	Add = "add",
	Minus = "minus",
}

export enum LeaderBoardWindow {
	Week = "1w",
	Day = "1d",
}

export default class ServerService {
	host = "https://hl5rzfung9.execute-api.us-east-1.amazonaws.com";

	static get instance(): ServerService {
		if (!instance) {
			instance = new ServerService();
		}
		return instance;
	}

	postData = async (token: string, path: string, body: any) => {
		let url = this.host;
		let options = {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
				token: token,
			},
			body: JSON.stringify(body),
		};
		let response = await fetch(url + path, options);
		let json = await response.json();
		return json;
	};

	createUser = (username: string) => {
		return this.postData("", "/new/user", {
			id: username,
		});
	};

	getUser = (username: string) => {
		return this.postData("", "/user", {
			id: username,
		});
	};

	updateStar = (
		from: string,
		to: string,
		direction: Direction,
		amount: number
	) => {
		return this.postData("", "/stars", {
			for: to,
			amount: amount,
			type: direction,
			by: from,
		});
	};

	getLeaderBoard = (window: LeaderBoardWindow) => {
		return this.postData("", "/leaderboard", {
			window: window,
		});
	};
}

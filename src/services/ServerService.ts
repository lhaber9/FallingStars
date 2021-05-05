let instance: ServerService;

export enum Direction {
	Add = "add",
	Minus = "minus",
}

export enum LeaderBoardWindow {
	Week = "1w",
	Day = "1d",
}

export enum Routes {
	New = "/new/user",
	User = "/user",
	Listusers = "/listusers",
	Stars = "/stars",
	Leaderboard = "/leaderboard",
}

export default class ServerService {
	host = "https://hl5rzfung9.execute-api.us-east-1.amazonaws.com";
	token = "";

	static get instance(): ServerService {
		if (!instance) {
			instance = new ServerService();
		}
		return instance;
	}

	setToken = (token: string) => {
		this.token = token;
	};

	postData = async (path: string, body: any) => {
		let url = this.host;
		let options = {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
				token: this.token,
			},
			body: JSON.stringify(body),
		};
		let response = await fetch(url + path, options);
		let json = await response.json();
		return json;
	};

	createUser = (username: string) => {
		return this.postData(Routes.New, {
			id: username,
		});
	};

	getUser = (username: string) => {
		return this.postData(Routes.User, {
			id: username,
		});
	};

	getAllUsers = () => {
		return this.postData(Routes.Listusers, {});
	};

	updateStar = (
		from: string,
		to: string,
		direction: Direction,
		amount: number
	) => {
		return this.postData(Routes.Stars, {
			for: to,
			amount: amount,
			type: direction,
			by: from,
		});
	};

	getLeaderBoard = (window: LeaderBoardWindow) => {
		return this.postData(Routes.Leaderboard, {
			window: window,
		});
	};
}


import jss from 'jss';
let preset = require('jss-preset-default');

let instance: StyleService;

export class StyleService {

	didSetup = false;

	static get instance(): StyleService {
		if (!instance) {
			instance = new StyleService();
		}
		return instance;
	}

	setup() {
		jss.setup(preset.default());
		this.didSetup = true;
	}

	createStyleSheet(rules: any) {
		if (!this.didSetup) {
			this.setup();
		}
		return jss.createStyleSheet(rules).attach().classes;
	}
}

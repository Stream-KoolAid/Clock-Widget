/*╔══════════════╗*/
/*║  PARAMETERS  ║*/
/*╚══════════════╝*/

// Constants and Configuration
const CONFIG = {
	DEFAULTS: {
		dateFormat: 'ddd DD MMM yyyy hh:mm:ss A',
		fontFamily: 'Roboto, sans-serif',
	},
	FONT: {
		LOAD_REFERENCE_SIZE: '16px',
	},
};

// URL Parameters Handler
class URLParamsHandler {
	constructor() {
		this.params = new URLSearchParams(window.location.search);
	}

	getString(key, defaultValue) {
		return this.params.get(key) || defaultValue;
	}
}

const params = new URLParamsHandler();

// Settings
const settings = {
	dateFormat: params.getString('dateFormat', CONFIG.DEFAULTS.dateFormat),
	fontFamily: params.getString('fontFamily', CONFIG.DEFAULTS.fontFamily),
};

// Font Loader
class FontLoader {
	static async load(fontFamily) {
		if (!fontFamily) return;

		const link = document.createElement('link');
		link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
			fontFamily.split(',')[0].trim()
		)}:100,300,400,500,700,900`;
		link.rel = 'stylesheet';
		document.head.appendChild(link);

		try {
			await document.fonts.load(
				`${CONFIG.FONT.LOAD_REFERENCE_SIZE} ${fontFamily}`
			);
		} catch (error) {
			console.warn(`Failed to load font: ${fontFamily}`, error);
		}
	}
}

// Clock Manager
class ClockManager {
	constructor(settings) {
		this.settings = settings;
		this.clockLabel = document.getElementById('clockLabel');
		if (!this.clockLabel) throw new Error('Clock element not found');

		this.applyStyles();
	}

	applyStyles() {
		this.clockLabel.style.fontFamily = this.settings.fontFamily;
	}

	updateClock() {
		const now = moment();
		this.clockLabel.textContent = now.format(this.settings.dateFormat);
	}

	start() {
		this.updateClock();
		setInterval(() => this.updateClock(), 1000);
	}
}

// Initialize
async function init() {
	try {
		await FontLoader.load(settings.fontFamily);
		const clockManager = new ClockManager(settings);
		clockManager.start();
	} catch (error) {
		console.error('Failed to initialize clock:', error);
		document.getElementById('clockLabel').innerText = 'Error loading clock';
	}
}

init();

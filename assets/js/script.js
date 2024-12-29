// Constants
const FONT_API_URL =
	'https://gist.githubusercontent.com/blushell/cf1e432b65f5c3a3eb1e30508fb584a4/raw/59f99da9d53aac79da742ebca7aab7121dca66cf/fonts.json';

// Utility Functions
const debounce = (fn, delay = 300) => {
	let timeoutId;
	return (...args) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), delay);
	};
};

const showNotification = (message, type = 'success') => {
	const notification = document.createElement('div');
	notification.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
	notification.textContent = message;
	document.body.appendChild(notification);
	setTimeout(() => notification.remove(), 3000);
};

// Font Loading
async function loadFonts() {
	try {
		const response = await fetch(FONT_API_URL);
		if (!response.ok) throw new Error('Failed to fetch fonts');

		const data = await response.json();
		const fontFamily = document.getElementById('fontFamily');

		data.fonts.forEach((fontName) => {
			const option = document.createElement('option');
			option.value = fontName;
			option.textContent = fontName;
			fontFamily.appendChild(option);
		});
	} catch (error) {
		console.error('Error loading fonts:', error);
		showNotification('Failed to load fonts. Please try again later.', 'danger');
	}
}

// Settings Visibility Manager
class SettingsManager {
	constructor() {
		this.settingsMap = [
			{ checkbox: 'customStyling', section: 'stylingSettings' },
		];

		this.init();
		this.initDateFormatPreset();
	}

	init() {
		this.settingsMap.forEach(({ checkbox, section }) => {
			const checkboxElement = document.querySelector(
				`input[name="${checkbox}"]`
			);
			const sectionElement = document.getElementById(section);

			if (!checkboxElement || !sectionElement) return;

			this.toggleVisibility(checkboxElement, sectionElement);
			checkboxElement.addEventListener('change', () => {
				this.toggleVisibility(checkboxElement, sectionElement);
				sectionElement.setAttribute('aria-expanded', checkboxElement.checked);
			});
		});
	}

	initDateFormatPreset() {
		const presetSelect = document.getElementById('dateFormatPreset');
		const customSection = document.getElementById('customFormatSection');
		const customInput = document.getElementById('dateFormat');

		if (!presetSelect || !customSection || !customInput) return;

		// Set initial state
		presetSelect.value = 'ddd DD MMM yyyy hh:mm:ss A';
		customInput.value = presetSelect.value;

		// Handle preset changes
		presetSelect.addEventListener('change', () => {
			const isCustom = presetSelect.value === 'custom';
			customSection.style.display = isCustom ? 'block' : 'none';

			if (!isCustom) {
				customInput.value = presetSelect.value;
			}
		});
	}

	toggleVisibility(checkbox, section) {
		section.style.display = checkbox.checked ? 'block' : 'none';
	}
}

// Widget URL Generator
class WidgetURLGenerator {
	constructor(form) {
		this.form = form;
		this.baseUrl = new URL(
			'widget/clock.html',
			window.location.origin + window.location.pathname
		).href;
	}

	generateParams() {
		const params = new URLSearchParams();

		// Add date format (handle both preset and custom)
		const preset = this.form.elements['dateFormatPreset']?.value;
		const customFormat = this.form.elements['dateFormat']?.value;
		const dateFormat = preset === 'custom' ? customFormat : preset;
		if (dateFormat) params.append('dateFormat', dateFormat);

		// Add fontFamily
		const fontFamily = this.form.elements['fontFamily']?.value;
		if (fontFamily) params.append('fontFamily', fontFamily);

		return params;
	}

	generateURL() {
		const params = this.generateParams();
		return `${this.baseUrl}?${params.toString()}`;
	}
}

// CSS Generator
class CSSGenerator {
	constructor(form) {
		this.form = form;
	}

	generateCSS() {
		if (!this.form.elements['customStyling'].checked) return '';

		const cssProperties = {
			'font-size': this.form.elements['fontSize']?.value,
			'font-weight': this.form.elements['fontWeight']?.value,
			'text-color': this.form.elements['color']?.value,
			'letter-spacing': this.form.elements['letterSpacing']?.value,
			'text-transform': this.form.elements['textTransform']?.value,
			'text-shadow': this.form.elements['textShadow']?.value,
		};

		const cssLines = Object.entries(cssProperties)
			.filter(([prop, value]) => {
				if (!value) return false;
				if (prop === 'text-color' && value === '#ffffff') return false;
				if (prop === 'font-weight' && value === 'Select Weight') return false;
				if (prop === 'text-transform' && value === 'none') return false;
				return true;
			})
			.map(([prop, value]) => `  --${prop}: ${value};`);

		return cssLines.length ? `:root {\n${cssLines.join('\n')}\n}` : '';
	}
}

// Widget Display Manager
class WidgetDisplayManager {
	constructor(form) {
		this.form = form;
		this.urlGenerator = new WidgetURLGenerator(form);
		this.cssGenerator = new CSSGenerator(form);
		this.previewFrame = document.getElementById('previewFrame');
		this.resultSection = document.querySelector('.result-section');

		this.updateDisplay = debounce(this.updateDisplay.bind(this));
	}

	updateDisplay() {
		try {
			// Generate URL and update preview
			const finalUrl = this.urlGenerator.generateURL();
			this.previewFrame.src = finalUrl;

			// Update URL display
			document.getElementById('generatedUrl').textContent = finalUrl;

			// Update CSS display
			const css = this.cssGenerator.generateCSS();
			document.getElementById('generatedCSS').textContent = css;

			// Show results section
			this.resultSection.style.display = 'block';

			// Inject CSS into iframe
			this.previewFrame.addEventListener('load', () => this.injectCSS(css));
		} catch (error) {
			console.error('Error updating widget display:', error);
			showNotification('Failed to update widget display', 'danger');
		}
	}

	injectCSS(css) {
		if (!this.form.elements['customStyling']?.checked) return;

		try {
			const iframeDocument =
				this.previewFrame.contentDocument ||
				this.previewFrame.contentWindow.document;
			let styleElement = iframeDocument.querySelector('#injectedStyles');

			if (!styleElement) {
				styleElement = iframeDocument.createElement('style');
				styleElement.id = 'injectedStyles';
				iframeDocument.head.appendChild(styleElement);
			}

			styleElement.textContent = css;
		} catch (error) {
			console.error('Error injecting CSS:', error);
			showNotification('Failed to apply custom styles', 'warning');
		}
	}
}

// Clipboard Manager
class ClipboardManager {
	static async copyToClipboard(elementId) {
		const element = document.getElementById(elementId);
		const text = element.textContent;
		const button = element.nextElementSibling;
		const originalText = button.textContent;

		try {
			await navigator.clipboard.writeText(text);
			button.textContent = 'Copied!';
			setTimeout(() => (button.textContent = originalText), 2000);
			showNotification('Copied to clipboard!');
		} catch (error) {
			console.error('Failed to copy:', error);
			showNotification('Failed to copy to clipboard', 'danger');
		}
	}
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
	loadFonts();

	const form = document.getElementById('widgetForm');
	new SettingsManager();
	const displayManager = new WidgetDisplayManager(form);

	// Add form event listeners
	form.addEventListener('input', () => displayManager.updateDisplay());
	form.addEventListener('change', () => displayManager.updateDisplay());

	// Initialize display
	displayManager.updateDisplay();

	// Add clipboard functionality
	window.copyToClipboard = ClipboardManager.copyToClipboard;
});

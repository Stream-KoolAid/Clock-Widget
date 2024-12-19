const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const dateFormat = urlParams.get('dateFormat') || 'ddd DD MMM yyyy hh:mm:ss A';
const fontSize = urlParams.get('fontSize') || '40px';
const fontFamily = urlParams.get('fontFamily') || 'Roboto, sans-serif';
const fontWeight = urlParams.get('fontWeight') || '600';
const textTransform = urlParams.get('textTransform') || 'uppercase';
const color = urlParams.get('color') || '#fff';
const textShadow =
	urlParams.get('textShadow') || '2px 2px 2px rgba(0, 0, 0, 0.5)';
const letterSpacing = urlParams.get('letterSpacing') || '0px';

const clockLabel = document.getElementById('clockLabel');
clockLabel.style.fontSize = fontSize;
clockLabel.style.fontFamily = fontFamily;
clockLabel.style.fontWeight = fontWeight;
clockLabel.style.textTransform = textTransform;
clockLabel.style.color = color;
clockLabel.style.textShadow = textShadow;
clockLabel.style.letterSpacing = letterSpacing;

function loadFont(fontFamily) {
	const link = document.createElement('link');
	link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
		/ /g,
		'+'
	)}&display=swap`;
	link.rel = 'stylesheet';
	document.head.appendChild(link);
}
loadFont(fontFamily);

function updateClock() {
	const now = moment();
	const formattedDate = now.format(dateFormat);
	clockLabel.textContent = formattedDate;
}
setInterval(updateClock, 1000);

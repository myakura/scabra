function isDarkMode() {
	if (typeof window === 'undefined' || !('matchMedia' in window)) {
		return false;
	}
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function updateIcon() {
	const icon = isDarkMode() ? 'icons/icon_white.png' : 'icons/icon_black.png';
	chrome.action.setIcon({ path: icon });
}

chrome.windows.onFocusChanged.addListener(() => {
	updateIcon();
});

chrome.tabs.onActivated.addListener(() => {
	updateIcon();
});

chrome.tabs.onHighlighted.addListener(() => {
	updateIcon();
});

updateIcon();

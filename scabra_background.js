function updateIcon({ isDarkMode = false }) {
	const icon = isDarkMode ? 'icons/icon_white.png' : 'icons/icon_black.png';
	chrome.browserAction.setIcon({ path: icon });
}

chrome.runtime.onMessage.addListener((message) => {
	if (message.type === 'light-dark-mode-update') {
		updateIcon({ isDarkMode: message.isDarkMode });
	}
});

function pingColorModeUpdate() {
	chrome.runtime.sendMessage({ type: 'get-light-dark-mode' });
}

chrome.windows.onFocusChanged.addListener(() => {
	pingColorModeUpdate();
});

chrome.tabs.onActivated.addListener(() => {
	pingColorModeUpdate();
});

chrome.tabs.onHighlighted.addListener(() => {
	pingColorModeUpdate();
});

pingColorModeUpdate();

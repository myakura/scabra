const form = document.querySelector('form');
const textarea = document.querySelector('textarea');
const button = document.querySelector('button');
const outputRaw = document.querySelector('#raw');
const outputUrls = document.querySelector('#urls');

function startsWithMarkdownLink(string) {
	return /\[(?:.+)\]\((?<url>https?\:\/\/.+)\)/.test(string);
}

function startsWithUrl(string) {
	return /(?<url>https?\:\/\/.+)/.test(string);
}

function grabUrlFromMarkdownLink(string) {
	const match = /\[(?:.+)\]\((?<url>https?\:\/\/.+)\)/.exec(string);
	return match.groups?.url;
}

function grabUrlFromPlaintext(string) {
	const match = /(?<url>https?\:\/\/.+)/.exec(string);
	return match.groups?.url;
}

function getUrls(input) {
	const lines = input
		.split('\n')
		.filter((line) => /\S*/.test(line))
		.filter((line) => {
			return startsWithMarkdownLink(line) || startsWithUrl(line);
		});

	const urls = lines
		.map((line) => {
			if (startsWithMarkdownLink(line)) {
				return grabUrlFromMarkdownLink(line);
			}
			else if (startsWithUrl(line)) {
				return grabUrlFromPlaintext(line);
			}
			else {
				return '';
			}
		})
		.filter((item) => !!item);

	return urls;
}

function openTabs(urls) {
	for (const url of urls) {
		chrome.tabs.create({ url: url, active: false });
	}
}

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const content = textarea.value.trim();
	const parsedUrls = getUrls(content);
	outputRaw.textContent = content;
	outputUrls.textContent = parsedUrls.join('\n');
	openTabs(parsedUrls);
	textarea.value = '';
});

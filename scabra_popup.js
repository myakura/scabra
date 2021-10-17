const form = document.querySelector(`form`);
const textarea = document.querySelector(`textarea`);
const button = document.querySelector(`button`);
const output = document.querySelector(`output`);

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

form.addEventListener(`submit`, (event) => {
	event.preventDefault();
	const content = textarea.value.trim();
	output.textContent = content;
	textarea.value = ``;
});

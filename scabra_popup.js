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

form.addEventListener(`submit`, (event) => {
	event.preventDefault();
	const content = textarea.value.trim();
	output.textContent = content;
	textarea.value = ``;
});

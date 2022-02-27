function CopyToClipboard() {
	var copyText = document.getElementById("lblResultado").textContent;
	navigator.clipboard.writeText(copyText);
}

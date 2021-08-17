// @ts-nocheck

hosts["vivo"] = async (url, movieInfo, config, callback)  => {


	const decodeUrl = (a, b) => {
		return ++b ? String.fromCharCode((a=a.charCodeAt()+47,a>126?a-94:a)) : decodeURIComponent(a).replace(/[^ ]/g, decodeUrl)
	}

	let html = await libs.request_get(url);

	let source = html.match(/source *\: *\'([^\']+)/i)
	source = source ? source[1] : '';
	if (!source) {
		return;
	}
	source = source.trim();
	const file = decodeUrl(source);

	const fileSize = await libs.request_getFileSize(file)	
	if (fileSize > 0) {
		callback({
			file: file,
			size: fileSize,
			host: "Vivo",
			provider: config.provider
		})
	}	
}
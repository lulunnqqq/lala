// @ts-nocheck

hosts["videobin"] = async (url, movieInfo, config, callback)  => {

	const html = await libs.request_get(url, {
		"user-agent": libs.request_getRandomUserAgent()
	}, "html")
	let source = html.match(/sources *\: *([^\]]+)/i);
	source = source ? source[1] + "]" : "[]"
	source = JSON.parse(source)

	for (const item of source) {
		const file = item;

		const fileSize = await libs.request_getFileSize(file)	
		if (fileSize > 0) {
			callback({
				file: file,
				size: fileSize,
				host: "VideoBin",
				provider: config.provider
			})
		}	
	}
}
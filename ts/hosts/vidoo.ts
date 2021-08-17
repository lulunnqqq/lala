// @ts-nocheck

hosts["vidoo"] = async (url, movieInfo, config, callback)  => {

	const html = await libs.request_get(url, {
		"user-agent": libs.request_getRandomUserAgent()
	}, "html")
	let source = html.match(/sources *\: *([^\]]+)/i);
	source = source ? source[1] + "]" : "[]"
	source = JSON.parse(source)

	for (const item of source) {

		callback({
			file: item.file,
			host: "Vidoo",
			provider: config.provider,
			label: item.label ? item.label : ""
		})
	}
}
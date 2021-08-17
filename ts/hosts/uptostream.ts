// @ts-nocheck

hosts["uptostream"] = async (url, movieInfo, config, callback)  => {


	let token = url.match(/\/iframe\/(.*)/i)
	token = token ? token[1] : ""
	const urlApi = `https://uptostream.com/api/streaming/source/get?token=null&file_code=${token}`
	const parse = await libs.request_get(urlApi, {
		"user-agent": libs.request_getRandomUserAgent()
	}, "json")

	console.log(token, config, "------------ TOKEN uptostream -----------")
	let data = parse.data
	data = data.sources ? data.sources : ""
	let sources = [];
	data = data.replace(/var *sources *\= *\[ *\] *\;*\;*/im, "")
	eval(data)

	console.log(sources, "------------ DIRECT uptostream -----------")
	let arrMap = sources.map(async (file) => {
		const fileSize = await libs.request_getFileSize(file.src)	
		if (fileSize > 0) {
			callback({
				file: file.src,
				size: fileSize,
				host: "UpToStream",
				quality: `${file.res}`,
				provider: config.provider
			})
		}	
	})
	await Promise.all(arrMap)
}
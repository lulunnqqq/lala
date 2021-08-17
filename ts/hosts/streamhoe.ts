// @ts-nocheck

hosts["streamhoe"] = async (url, movieInfo, config, callback)  => {

	let id = url.match(/\/v\/([A-z0-9-_+]+)/i)
	id = id ? id[1] : ""
	let urlAPI = `https://streamhoe.online/api/source/${id}`
	let headers = {
		"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	}
	let body = `r=&d=streamhoe.online`
	let parse = await libs.request_post(urlAPI, headers, body, 'json')
	let sources = parse.data ? parse.data : []
	let arrMap = sources.map(async (embed) => {
		const fileSize = await libs.request_getFileSize(embed.file)	
		if (fileSize > 0) {
			callback({
				file: embed.file,
				size: fileSize,
				host: "StreamHoe",
				quality: embed.label,
				provider: config.provider
			})
		}	
	})
	await Promise.all(arrMap)
}
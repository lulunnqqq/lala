// @ts-nocheck

hosts["gcloud"] = async (url, movieInfo, config, callback)  => {

	let id = url.match(/\/v\/([A-z0-9-_+]+)/i)
	id = id ? id[1] : ""
	let urlAPI = `https://gcloud.live/api/source/${id}`
	let headers = {
		"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	}
	let body = `r=&d=gcloud.live`
	let parse = await libs.request_post(urlAPI, headers, body, 'json')
	let sources = parse.data ? parse.data : []
	sources = parse.success == false ? [] : sources;

	console.log(sources, parse, urlAPI, "---------- GCLOUD DATA ----------")
	let arrMap = sources.map(async (embed) => {
		const fileSize = await libs.request_getFileSize(embed.file)	
		if (fileSize > 0) {
			callback({
				file: embed.file,
				size: fileSize,
				host: "GCloud",
				quality: embed.label,
				provider: config.provider
			})
		}	
	})
	await Promise.all(arrMap)
}
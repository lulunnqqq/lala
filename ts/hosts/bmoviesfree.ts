// @ts-nocheck

//https://bmoviesfree.io/v/y2lwgfee3ky31g-
hosts["bmoviesfree"] = async (url, movieInfo, config, callback)  => {

	console.log(url, "--------- MOVCLOUD URL -----------")
	let id = url.match(/v\/([A-z0-9-+]+)/i)
	id = id ? id[1] : ""
	let urlApi = "https://bmoviesfree.io/api/source/" + id
	let body = `r=&d=bmoviesfree.io`
	let headers = {
		"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	}
	let parse = await libs.request_post(urlApi, headers, body, 'json');
	let sources = parse.data ? parse.data : []

	console.log(sources, parse, urlApi, "----------- BMOVIESTREE DATA -----------")
	let arrMap = sources.map(async (embed) => {
		const fileSize = await libs.request_getFileSize(embed.file)	
		if (fileSize > 0) {
			callback({
				file: embed.file,
				size: fileSize,
				host: "BMovieFree",
				quality: config.label,
				provider: config.provider
			})
		}	
	})
	await Promise.all(arrMap)
}
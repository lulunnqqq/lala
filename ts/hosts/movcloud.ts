// @ts-nocheck

hosts["movcloud"] = async (url, movieInfo, config, callback)  => {

	console.log(url, "--------- MOVCLOUD URL -----------")
	let id = url.match(/embed\/([A-z0-9-+]+)/i)
	id = id ? id[1] : ""
	let urlApi = "https://api.movcloud.net/stream/" + id

	let parse = await libs.request_get(urlApi, {}, 'json');
	let sources = parse.data ? parse.data ? parse.data.sources : [] : []

	console.log(sources, parse, urlApi, "----------- MOVCLOUD DATA -----------")
	let arrMap = sources.map(async (embed) => {
		// const fileSize = await libs.request_getFileSize(embed.file)	
		// if (fileSize > 0) {
			callback({
				file: embed.file,
				// size: fileSize,
				host: "MovCloud",
				quality: embed.height + 'p',
				provider: config.provider
			})
		// }	
	})
	await Promise.all(arrMap)
}
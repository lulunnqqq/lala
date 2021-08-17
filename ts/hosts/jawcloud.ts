// @ts-nocheck

hosts["jawcloud"] = async (url, movieInfo, config, callback)  => {

	let htmlSource = await libs.request_get(url)
	let parseSource = cheerio.load(htmlSource)

	let file = parseSource("source").attr("src")
	const fileSize = await libs.request_getFileSize(file)	

	console.log(file, fileSize, "----------- JAWCLOUD DATA -----------")
	// if (fileSize > 0) {
		callback({
			file: file,
			size: fileSize,
			host: "JawCloud",
			provider: config.provider,
			quality: "HD"
		})
	// }	
}
// @ts-nocheck

hosts["fembed"] = async (url, movieInfo, config, callback)  => {

	const vidCloudAjax = "https://feurl.com/api/source/";
	let urlMatch = url.replace("https://www.fembed.com/v/", vidCloudAjax);
	urlMatch = urlMatch.replace(/\#.*/i, "")
	var headers = {
		"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	}
	const body = qs.stringify({
		r: "",
		d: "feurl.com"
	})
	const json = await libs.request_post(urlMatch, headers, body, "json")
	for (var item in json.data) {
		const file = json.data[item].file;

		const fileSize = await libs.request_getFileSize(file)	
		if (fileSize > 0) {
			callback({
				file: file,
				size: fileSize,
				host: "Fembed",
				provider: config.provider
			})
		}
	}
}
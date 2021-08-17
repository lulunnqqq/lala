// @ts-nocheck

hosts["streamtape"] = async (url, movieInfo, config, callback)  => {

	const urlEmbed = url.replace('/v/', '/e/');
	const htmlEmbed = await libs.request_get(urlEmbed);
	const parseEmbed = cheerio.load(htmlEmbed);


	console.log(htmlEmbed, '----------------- STREAMTAPE HTML ------------');

	let urlDirect = parseEmbed('#videolink').text();
	if (_.startsWith(urlDirect, "/")) {
		urlDirect = 'https:' + urlDirect;
	}

	console.log(urlDirect, url, '--------- STREAMTAPE URL DIRECT ---------');

	if (!urlDirect) {
		return;
	}

	let resultHead = await libs.request_head(urlDirect, {}, false);
	const file = resultHead.url;

	console.log(resultHead, file, '--------- STREAMTAPE URL ---------');

	const fileSize = await libs.request_getFileSize(file)	
	if (fileSize > 0) {
		callback({
			file: file,
			size: fileSize,
			host: "StreamTape",
			provider: config.provider
		})
	}	
}
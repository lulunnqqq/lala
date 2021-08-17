// @ts-nocheck

hosts["ronemo"] = async (url, movieInfo, config, callback)  => {

	let urlMatchId = url.match(/embed\/([A-z0-9-.]+)/i)
	let id = urlMatchId ? urlMatchId[1] : '';
	if (!id) {
		return;
	}

	let urlAjaxEmbed = `https://ronemo.com/api/video/get-link?idVid=${id}`;
	const resultRonemo = await libs.request_get(urlAjaxEmbed, {
		"user-agent": libs.request_getRandomUserAgent()
	}, "json");


	console.log(resultRonemo, "------- result Ronemo")
	
	if (!resultRonemo || !resultRonemo.success || !resultRonemo.link) {
		return;
	}

	const embed = `https://hls.ronemo.com/${resultRonemo.link}`;

	console.log(embed, "---------- EMBED RONEMO -------")

	callback({
		file: embed,
		host: "VidLink",
		provider: config.provider,
		quality: "HLS"
	})
}
// @ts-nocheck

hosts["vidlink"] = async (url, movieInfo, config, callback)  => {

	let urlMatchId = url.match(/embed\/([A-z0-9-.]+)/i)
	let id = urlMatchId ? urlMatchId[1] : '';
	if (!id) {
		return;
	}

	let urlAjaxEmbed = `https://vidlink.org/embed/info?postID=${id}`;
	const resultVidLink = await libs.request_get(urlAjaxEmbed, {
		"user-agent": libs.request_getRandomUserAgent()
	}, "json");
	
	console.log(id, urlAjaxEmbed, resultVidLink, "------- RESULT VIDLINK --------")	
	if (!resultVidLink || !resultVidLink.embed_urls) {
		return;
	}

	const embed = resultVidLink.embed_urls;

	console.log(embed, `------------- EMBED VIDLINK ---------`)

	const headerFile = await libs.request_head(embed)	
	const fileSize =  headerFile["Content-Length"] || headerFile["content-length"];
	const host = libs.string_getHost(embed)

	console.log(embed, fileSize, host, "embed size vidlink--------------------")
	if (!fileSize) {
	
		if (hosts[host]) {
			hosts[host](embed, movieInfo, config, callback)
		}
	} else {
		callback({
			file: embed,
			size: fileSize,
			host: "VidLink",
			provider: config.provider
		})
	}
}
// @ts-nocheck

hosts["docs.google"] = async (url, movieInfo, config, callback)  => {
	let id      = url.match(/\/d\/([^\/]+)/i);
    id          = id ? id[1] : '';
	const urlEmbed = `https://docs.google.com/get_video_info?docid=${id}&authuser=0`;
	const html = await libs.request_get(urlEmbed, {
		"User-Agent": libs.request_getRandomUserAgent(),
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'docs.google.com',
        'Upgrade-Insecure-Requests': 1,
	}, "html")
	const parse = qs.parse(html)

	let { fmt_stream_map, status } = parse;
	console.log(urlEmbed, fmt_stream_map, status, parse, "-------- GOOGLE DOCS STREAM --------")
	if (!fmt_stream_map) {
		return;
	}
	let listLink = fmt_stream_map.split(",");
	for (let i = 0; i < listLink.length; i++) {
		let file = decodeURIComponent(listLink[i].substring(3))
		if (listLink[i].indexOf("18|") == 0) {
			callback({
				file: file,
				size: "",
				quality: "360p",
				host: "GOOGLE.VIDEO",
				provider: config.provider
			})
            
        }
        if (listLink[i].indexOf("22|") == 0) {
        	callback({
				file: file,
				size: "",
				quality: "720p",
				host: "Google Video",
				provider: config.provider
			})
        }

        if (listLink[i].indexOf("59|") == 0) {
        	callback({
				file: file,
				size: "",
				quality: "480p",
				host: "Google Video",
				provider: config.provider
			})
        }
        if (listLink[i].indexOf("37|") == 0) {
        	callback({
				file: file,
				size: "",
				quality: "1080p",
				host: "Google Video",
				provider: config.provider
			})
        }
		
		
	}
}
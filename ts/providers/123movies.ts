// @ts-nocheck

source.getResource = async (movieInfo, config, callback) => {
	const url = `https://123movieshub.vip/search.php?keyword=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`;
	let parse = await libs.request_getcaptcha(url, {}, "cheerio");


	let link = "";
	console.log(parse(".wrapper .col2 ul li").length, '------- LENGTH SEARCH 123movies ------')
	parse(".wrapper .col2 ul li").each((key, item) => {
		let title = parse(item).find("figure a").first().find("h3").text();
		
		let season = title.toLowerCase().match(/\- *season *([0-9]+)/i)
		let season = season ? season[1] : 0;
		title = title.replace(/\- *season *[0-9]+/i, "").trim()
		const href = parse(item).find("a").first().attr("href");
		const quanlity = parse(item).find(".quanlity").text();

		
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {


			if (quanlity && movieInfo.type == "movie") {
				link = href
			} else if(!quanlity && movieInfo.type == "tv") {
				const episode = parse(item).find(".eps div").text()

				console.log(title, href, season, episode, "------------ 123MOVIES SEASON EPISODE ------------")
				if (season == movieInfo.season && episode == movieInfo.episode) {
					link = href;
				}
			}
		}
	})

	if (link != "") {
		link = "https://123movieshub.vip" + link;
		const parseDetail = await libs.request_getcaptcha(link, {}, 'html');

		const matchUrl = parseDetail.match(/link_server_[A-z0-9_-]+ *\= *\"([^\"]+)/ig);
		console.log(matchUrl, "mathc--------------------")
		if (!matchUrl) {
			return
		}
		for(const item of matchUrl) {
			try {
				let embed = item.replace(/link_server_[A-z0-9_-]+ *\= *\"/i, "").trim();
				console.log(embed, "embed--------------------")
				
				if (embed.indexOf("https://") == -1 && embed.indexOf("http://") == -1) {
					embed = embed.replace("//", "https://");
				}

				const fileSize = await libs.request_getFileSize(embed)
				const host = libs.string_getHost(embed)

				
				if (fileSize == 0) {
				
					if (hosts[host]) {
						hosts[host](embed, movieInfo, _.merge(config, {provider: "123MOVIES"}), callback)
						
					}
					continue
				}
				
				callback({
					file: embed,
					size: fileSize,
					host: host.toUpperCase(),
					provider: "123Movies"
				})
			} catch(e) {
				console.log(e, "error 123movies")
			}
			
		}

	}
}
// @ts-nocheck

hosts["vidsrc"] = async (url, movieInfo, config, callback)  => {

	let urlReal = url.replace('vidsrc', 'v2.vidsrc');
	let htmlDetail = await libs.request_get(urlReal);
	let parseDetail = cheerio.load(htmlDetail);

	let tokens = [];
	parseDetail(".source").each((key, item) => {
		let token = parseDetail(item).attr("data-hash");

		if (token) {
			tokens.push(token)
		}
	})

	let headers = {
		'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
	}
	let arrMap = tokens.map(async (token) => {
		let urlToken = `https://v2.vidsrc.me/src/${token}`;
		let body = qs.stringify({
			r: urlToken,
			d: 'vidsrc.xyz'
		});

		const headerEmbed = {
			Host: 'v2.vidsrc.me',
			'upgrade-insecure-requests': 1,
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36',
			accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'sec-fetch-site': 'same-origin',
			'sec-fetch-mode': 'navigate',
			'sec-fetch-dest': 'iframe',
			'accept-language': 'vi-VN,vi;q=0.9',
		}

		const urlSource = `https://v2.vidsrc.me/source/${token}`;
		headerEmbed.referer = urlSource;

		// const headerData = await libs.request_head(urlToken, headerEmbed, false);
		// console.log(headerData, urlToken, '------------ HEADER EMBED VIDSRC -----------');
		// let urlEmbed = headerData.url;

		// headerEmbed.referer = urlEmbed;
		// const sourceRequestData = await libs.request_get(urlEmbed, headerEmbed, 'html');
		// let urlLoc = locRequestData.match(/src *\: *\'([^\']+)/i)
		// urlLoc = urlLoc ? urlLoc[1] : '';
		// if (!urlLoc) {
		// 	return;
		// }

		// if (_.startsWith(urlLoc, '/')) {
		// 	urlLoc = `https://v2.vidsrc.me${urlLoc}`
		// }

		const sourceData = await libs.request_get(urlSource, headerEmbed);
		let urlLoc = sourceData.match(/src *\: *\'([^\']+)/i);
		urlLoc = urlLoc ? urlLoc[1] : '';
		if (!urlLoc) {
			return;
		}

		if (_.startsWith(urlLoc, '/')) {
			urlLoc = `https://v2.vidsrc.me${urlLoc}`
		}
		console.log(urlLoc, `------- VIDSRC URL LOC ------`);


		const sourceLoc = await libs.request_get(urlLoc, headerEmbed);
		let urlSrc = sourceLoc.match(/src *\: *\'([^\']+)/i);
		urlSrc = urlSrc ? urlSrc[1] : '';
		if (!urlSrc) {
			return;
		}

		if (_.startsWith(urlSrc, '/')) {
			urlSrc = `https://v2.vidsrc.me${urlSrc}`
		}
		console.log(urlSrc, `------- VIDSRC URL urlSrc ------`);


		const headerData = await libs.request_head(urlSrc, headerEmbed, false);
		let urlEmbed = headerData.url;
		console.log(headerData, urlEmbed, urlSrc, '------------ HEADER EMBED VIDSRC -----------');

		if (urlEmbed) {

			if (urlEmbed.indexOf("vidsrc.xyz/v") != -1) {
				urlEmbed = urlEmbed.replace("vidsrc.xyz/v", 'vidsrc.xyz/api/source');

				console.log(urlEmbed, '----------- urlEmbed VidSRC.xyz');
				let result = await libs.request_post(urlEmbed, headers, body, 'json');
				let embeds = result && result.data ? result.data : [];

				for (let embed of embeds) {

					console.log(embed, '---------- DIRECT VIDSRC -------');
					callback({
						file: embed.file,
						size: 0,
						host: "VidDirect",
						quality: embed.label,
						provider: config.provider
					})
				}
			} else if (urlEmbed.indexOf("vidsrc.stream") != -1) {
				headerEmbed.referer = 'https://v2.vidsrc.me/';
				const dataVidStream = await libs.request_get(urlEmbed, {
					referer: 'https://v2.vidsrc.me/'
				});
				let source = dataVidStream.match(/sources *\: *([^\]]+)/i);
				source = source ? source[1] + "]" : "[]"
				let parse = []
				source = `parse = ${source}`
				eval(source)

				console.log(parse, "------------ SOURCES VidStream -------------")
				let length = parse.length;
				for (let i = 0; i < length; i++) {
					const file = parse[i].file;

					console.log(parse[i], "------------ SOURCE DETAIL VidStream -------------")

					// const fileSize = await libs.request_getFileSize(file)	
					// if (fileSize > 0) {
						callback({
							file: file,
							quality: 'HLS',
							host: "VidStream",
							provider: config.provider
						})
					// }	
				}

			} else {
				console.log(urlEmbed, '---------- urlEmbed VIDSRC ---------');
				const host = libs.string_getHost(urlEmbed)
				if (hosts[host]) {
					hosts[host](urlEmbed, movieInfo, _.merge(config, {provider: config.provider}), callback)
				}
			}
			
		}

		
	})	
	await Promise.all(arrMap)
}
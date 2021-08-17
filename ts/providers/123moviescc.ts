// @ts-nocheck



source.getResource =  async (movieInfo, config, callback) => {

	const domain = `https://w8.123movie.cc`;
	const urlSearch = `${domain}/search?keyword=${slugify(movieInfo.title, {lower: true, replacement:'+'})}`;
	const htmlSearch = await libs.request_get(urlSearch);
	const parseSearch = cheerio.load(htmlSearch);

	let link = '';
	parseSearch('.filmlist .item').each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find('.poster').attr('title');
		const href =  parseSearch(itemSearch).find('.poster').attr('href');

		if (slugify(movieInfo.title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g}) == slugify(title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g})) {

			link = `${domain}${href}`;
		}
	});

	if (!link) {
		return;
	}

	let embeds = [];
	let htmlDetail = await libs.request_get(link);
	let ajaxUrl = `${domain}/ajax/`;
	let playerUrl = `${domain}/players/`;
	let headers = {
		'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'referer': link
	}

	if (movieInfo.type == 'movie') {
		let a1984 = htmlDetail.match(/A1984 *\: *\"([^\"]+)/i);
		a1984 = a1984 ? a1984[1] : '';
		let di = htmlDetail.match(/di *\: *\"([^\"]+)/i);
		di = di ? di[1] : '';

		let body = {
			A1984: a1984,
			di,
		};
		let htmlAjax = await libs.request_post(ajaxUrl, headers, qs.stringify(body));
		let parseAjax = cheerio.load(htmlAjax);

		let dataIds = [];

		console.log(parseAjax('.episodes a').length, ajaxUrl, headers, body, htmlAjax, '------ 123moviescc EMBEDS ------');
		parseAjax('.episodes a').each((keyAjax, itemAjax) => {
			let dataId = parseAjax(itemAjax).attr('data-id');
			if (dataId) {
				dataIds.push(dataId);
			}
		});

		console.log(dataIds, '--------- 123moviescc dataids');

		let arrMapDataId = dataIds.map(async (dataIdItem) => {
			let bodyDataId = {
				ep: dataIdItem,
				img: ''
			};

			let htmlDataId = await libs.request_post('https://w8.123movie.cc/player/', headers, `ep=${dataIdItem}&img=`);
			let parseDataId = cheerio.load(htmlDataId);

			console.log(parseDataId('iframe').length, playerUrl, headers, qs.stringify(bodyDataId), htmlDataId, ' -------- moviescc iframe');
			parseDataId('iframe').each((keyDataId, itemDataId) => {
				const urlIframe = parseDataId(itemDataId).attr('src');

				if (urlIframe) {
					embeds.push(urlIframe);
				}
			})
		});
		await Promise.all(arrMapDataId);
	}

	// if (movieInfo.type == 'tv') {
	// 	let a1984 = htmlDetail.match(/A1984 *\: *\"([^\"]+)/i);
	// 	a1984 = a1984 ? a1984[1] : '';
	// 	let id = htmlDetail.match(/id *\: *\"([^\"]+)/i);
	// 	id = id ? id[1] : '';
	// 	let A14stcls = htmlDetail.match(/A14stcls *\: *\"([^\"]+)/i);
	// 	A14stcls = A14stcls ? A14stcls[1] : '';
	// 	let s = htmlDetail.match(/s *\: *\"([^\"]+)/i);
	// 	s = s ? s[1] : '';
	// 	let img = htmlDetail.match(/img *\: *\"([^\"]+)/i);
	// 	img = img ? img[1] : '';

	// 	let body = {
	// 		A1984: a1984,
	// 		id,
	// 		s,
	// 		A14stcls,
	// 		img
	// 	};
	// 	let htmlAjax = await libs.request_post(ajaxUrl, headers, qs.stringify(body));
	// 	let parseAjax = cheerio.load(htmlAjax);	


	// }


	console.log(embeds, '--------- 123moviescc EMVBEDS ------------')
	let arrMap = embeds.map(async (urlDetail) => {

		console.log(urlDetail, "-------- LOOP 123moviescc -------")
		let embed = urlDetail;

		console.log(embed, "------------ 123moviescc  DIRECT EMBED")
		if (embed) {
			
			const fileSize = await libs.request_getFileSize(embed)
			const host = libs.string_getHost(embed)

			console.log(embed, fileSize, host, "embed--------------------")
			if (!fileSize) {
			
				if (hosts[host]) {
					hosts[host](embed, movieInfo, _.merge(config, {provider: "123Movies"}), callback)
				}
			} else {
				callback({
					file: embed,
					size: fileSize,
					host: host.toUpperCase(),
					provider: "123Movies"
				})
			}
		}
	});
	await Promise.all(arrMap); 
}
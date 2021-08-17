// @ts-nocheck

//https://xmovies8.si/

source.getResource = async (movieInfo, config, callback) => {

	const domain = `https://xmovies8.pw`

	const htmlHome = await libs.request_get(domain);

	let siteHash = htmlHome.match(/siteHash *\" *\: *\"([^\"]+)/i)
	siteHash = siteHash ? siteHash[1] : '';

	console.log(siteHash, '--------------- XMOVIES8 Sitehash')

	if (!siteHash) {
		return;
	}

	const domainSearch = `https://api-v2.xmovies8.pw/search-suggest?keyword=${slugify(movieInfo.title, {lower: true, replacement: '%20', remove: /[*+~.()'"!:@]/g})}&site=${siteHash}`;
	let resultSearch = await libs.request_get(domainSearch, {}, 'json');


	console.log(domainSearch, resultSearch, '--------------- XMOVIES8 Search Info')
	
	if (!resultSearch || resultSearch.status != 'ok' || !resultSearch.contents) {
		return;
	}

	
	let link = "";
	let hash = "";
	for (const searchItem of resultSearch.contents) {
		const title = searchItem.name;
		let season = title.match(/\- *season *([0-9]+)/i)
		season = season ? season[1] : 0;
		title = title.replace(/\- *season *[0-9]+/i, '')
		let year = searchItem.released;
		year = year.match(/([0-9]+)/i);
		year = year ? year[1] : 0;
		let hashMovie = searchItem.hash;
		let href = `${domain}/watch/${hashMovie}/${searchItem.slug}/watch-free.html`;

		console.log(title, season, title, year, hashMovie, href, '--------------- XMOVIES8 MovieInfo')

		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			if (!season && movieInfo.type == 'movie' && year == movieInfo.year) {
				link = href;
				hash = hashMovie;
				break;
			} else if(season && movieInfo.type == 'tv' && season == movieInfo.season) {
				link = href;
				hash = hashMovie;
				break;
			}
		}
	}


	console.log(link, '--------------- XMOVIES8 link')

	if (!link) {
		return;
	}

	if (movieInfo.type == 'tv') {


		let detailTv = await libs.request_get(link);
		let parseDetail = cheerio.load(detailTv);

		console.log(parseDetail(".MuiButtonBase-root.MuiButton-root.MuiButton-outlined").length, `------------ XMOVIES8 TV LENGTH`)
		parseDetail(".MuiButtonBase-root.MuiButton-root.MuiButton-outlined").each((keyItem, valueItem) => {
			let titleTv = parseDetail(valueItem).attr("title");

			if (titleTv) {
				let episode = titleTv.match(/episode *([0-9]+)/i);
				let linkTv = parseDetail(valueItem).attr("href");


				console.log(titleTv, episode, linkTv, '--------------- XMOVIES8 TvInfo')
				if (episode == movieInfo.episode && linkTv) {
					link = `${domain}${linkTv}`;
				}
			}
			
		})
	}


	console.log(link, '--------------- XMOVIES8 linkEnd')

	let detailHtml = await libs.request_get(link);
	let episodeHash = detailHtml.match(/episode_hash *\" *\: *\"([^\"]+)/i);
	episodeHash = episodeHash ? episodeHash[1] : '';


	console.log(episodeHash, '--------------- XMOVIES8 episodeHash')

	if (!episodeHash) {
		return;
	}

	let embeds = [];
	let urlEmbed = `https://api-v2.xmovies8.pw/contents/${hash}/episodes/${episodeHash}/embeds?site=${siteHash}`;
	let resultEmbeds = await libs.request_get(urlEmbed, {}, 'json');


	console.log(urlEmbed, resultEmbeds, '--------------- XMOVIES8 ResultEmbed')

	if (!resultEmbeds || resultEmbeds.status != 'ok' || !resultEmbeds.embeds) {
		return;
	}


	let arrMap = resultEmbeds.embeds.map(async (embedItem) => {
		const hashEmbed = embedItem.hash;
		let urlDetailEmbed = `https://api-v2.xmovies8.pw/contents/${hash}/episodes/${episodeHash}/embeds/${hashEmbed}?site=${siteHash}`
		let resultDetailEmbed = await libs.request_get(urlDetailEmbed, {}, 'json');

		console.log(urlDetailEmbed, resultDetailEmbed, '--------------- XMOVIES8 EmbedFilm')

		if (resultDetailEmbed.url) {
			embeds.push(resultDetailEmbed.url);
		}
	})
	await Promise.all(arrMap);


	console.log(embeds, '--------------- XMOVIES8 Embeds')
	

	let arrMapEmbed = embeds.map(async (embed) => {
		const fileSize = await libs.request_getFileSize(embed)
		const host = libs.string_getHost(embed)

		console.log(embed, fileSize, host, "embed--------------------")
		if (!fileSize) {
		
			if (hosts[host]) {
				hosts[host](embed, movieInfo, _.merge(config, {provider: "XMovies"}), callback)
			}
		} else {
			callback({
				file: embed,
				size: fileSize,
				host: host.toUpperCase(),
				provider: "XMovies"
			})
		}
	});
	await Promise.all(arrMapEmbed);
}

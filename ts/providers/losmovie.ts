// @ts-nocheck




source.getResource =  async (movieInfo, config, callback) => {

    const domain = `https://losmovies.life`;
	const urlSearch = `${domain}/movies-search?q=${slugify(movieInfo.title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g})}`;
	const htmlSearch = await libs.request_get(urlSearch);
	const parseSearch = cheerio.load(htmlSearch);
	
    let link = '';

    console.log(parseSearch('.showEntityMovie').length, urlSearch, '--------- LOSMOVIE SEARCH -----------');
    parseSearch('.showEntityMovie').each((keySearch, itemSearch) => {
        const title = parseSearch(itemSearch).find('.showRowText').text();
        const href = parseSearch(itemSearch).find('.showRowImage a').attr('href');


        console.log(title, slugify(movieInfo.title, {lower: true}), slugify(title.trim(), {lower: true}), '--------- LOSMOVIE MATCHING -----------');
        if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {

            link = href
		}
    })


    console.log(link, '---------- LOSMOVIE LINK ');
    if (!link) {
        return;
    }

    link = `${domain}${link}`;

    const detailHtml = await libs.request_get(link);
    const parseDetail = cheerio.load(detailHtml);

    const year = parseDetail('.showValueRelease').text();

    console.log(year, '---------- LOSMOVIE YEAR ');
    if (movieInfo.type == 'movie' && year != movieInfo.year) {
        return;
    }

    let embeds = [];


    if (movieInfo.type == 'tv') {

        console.log(`td[data-season=${movieInfo.season}][data-serie=${movieInfo.episode}]`,  parseDetail(`td[data-season=${movieInfo.season}][data-serie=${movieInfo.episode}]`).length, '---------- LOSMOVIE TV SEASON ');
        parseDetail(`td[data-season=${movieInfo.season}][data-serie=${movieInfo.episode}]`).each((keyTv, itemTv) => {
            const embed = parseDetail(itemTv).text();

            console.log(embed, '------ LOSMOVIE EMBED');
            if (embed) {
                embeds.push(embed);
            }
        })
    } else {
        console.log(parseDetail('.linkHiddenUrl').length, '------ LOSMOVIE MOVIE');

        parseDetail('.linkHiddenUrl').each((keyMovie, itemMovie) => {
            const embed = parseDetail(itemMovie).text();

            if (embed) {
                embeds.push(embed);
            }
        })
    }


    console.log(embeds, '------ LOSMOVIE EMBEDS');


    let arrMapSource = embeds.map(async (embed) => {

        if (embed) {
            const fileSize = await libs.request_getFileSize(embed)
            const host = libs.string_getHost(embed)

            console.log(embed, fileSize, host, "embed--------------------")
            if (fileSize == 0) {
            
                if (hosts[host]) {
                    hosts[host](embed, movieInfo, _.merge(config, {provider: "LOSMOVIES"}), callback)
                }
            } else {
                callback({
                    file: embed,
                    size: fileSize,
                    host: host.toUpperCase(),
                    provider: "LOSMOVIES"
                })
            }
        }
        
    }) 
    await Promise.all(arrMapSource)
}

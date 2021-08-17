// @ts-nocheck




source.getResource =  async (movieInfo, config, callback) => {

    const domain = `https://vumoo.to`
	let urlSearch = `https://embed.meomeo.pw/fastmedia/${movieInfo.imdb_id}`;
    if (movieInfo.type == 'tv') {
        urlSearch += `-${movieInfo.season}-${movieInfo.episode}`
    }

    console.log(urlSearch, 'haah', `URL SEARCH VUMOO`)
    
    const htmlSearch = await libs.request_get(urlSearch, {
        referer: domain
    });

    console.log(htmlSearch, 'HTML VUMOO')
    
    let hlsLink = htmlSearch.match(/file *\" *\: *\"([^\"]+)/i);
    if (hlsLink) {
        hlsLink = _.startsWith(hlsLink[1], "/") ?  `https:${hlsLink[1]}` : hlsLink[1];
        callback({
            file: hlsLink,
            quality: 'HLS',
            host: "Vumoo",
            provider: 'Vumoo'
        })
    }

	
}	

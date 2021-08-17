// @ts-nocheck




source.getResource =  async (movieInfo, config, callback) => {

	const urlSearch = `https://lightdlmovies.blogspot.com/search?q=${slugify(movieInfo.title, {lower: true, replacement: '-', remove: /[*+~.()'"!:@]/g})}`;
	const htmlSearch = await libs.request_get(urlSearch);
	const parseSearch = cheerio.load(htmlSearch);
	
	

}

// @ts-nocheck




source.getResource =  async (movieInfo, config, callback) => {

	let urlSearch = `https://ww3.123movies.la/search/${slugify(movieInfo.title, {lower: true, replacement: '+'})}`
	
}

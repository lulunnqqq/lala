// @ts-nocheck

hosts["streamsb"] = async (url, movieInfo, config, callback)  => {

	const decode = (p, a, c, k, e, d) => {
	    while (c--) {
	    	if (k[c]) {
	        	p = p.replace(new RegExp('\\b' + c.toString(a) + '\\b', 'g'), k[c]);	
	        }
	    }
	   
	    return p;
	}
	let html = await libs.request_get(url)
	let parseHtml = cheerio.load(html)

	let scripts = ""
	parseHtml("script").each((key, item) => {
		let script = parseHtml(item).text();
		if (_.startsWith(script.trim(), "eval")) {
			scripts = script;
		}
	})

	console.log(scripts, "--------------- streamsb SCRIPTs ---------")

	if (scripts != "") {
		let matching = scripts.match(/return *p *\} *(.*)/i)
		matching = matching ? matching[1].replace(/.$/, "") : "";

		console.log(matching, "--------------- streamsb MATCHING ---------")
		if (matching != "") {
			let decodeScript = "";
			eval(`decodeScript = decode${matching}`)

			console.log(decodeScript, "--------------- streamsb decodeScript ---------")

			if (decodeScript != "") {
				let source = decodeScript.match(/sources *\: *([^\]]+)/i);
				source = source ? source[1] + "]" : "[]"
				let parse = [];
				source = `parse = ${source}`
				eval(source);


				console.log(parse, "--------------- streamsb parse ---------")
				let length = parse.length;
				for (let i = 0; i < length; i++) {
					const file = parse[i].file;

					console.log(parse[i], "------------ SOURCE DETAIL streamsb -------------")

					const fileSize = await libs.request_getFileSize(file)	
					if (fileSize > 0) {
						callback({
							file: file,
							size: fileSize,
							host: "Streamsb",
							provider: config.provider
						})
					}	
				}
			}
		}
	}
	
}
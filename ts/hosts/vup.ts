// @ts-nocheck

hosts["vup"] = async (url, movieInfo, config, callback)  => {

	let html = await libs.request_get(url);
	let parseDetail = cheerio.load(html);

	function decode(p,a,c,k,e,d){while(c--)if(k[c])p=p.replace(new RegExp('\\b'+c.toString(a)+'\\b','g'),k[c]);return p}

	let script = "";

	console.log(parseDetail("script").length, `------------------ vup LENGTH SCRIPT ----------`)
	parseDetail("script").each((key, item) => {
		const text = parseDetail(item).text();

		if (text.indexOf("eval") != -1) {
			script = text;
		}
	})

	script = script.match(/\; *return *p *\} *(.*)/i)
	script = script ? script[1].replace(/.$/, "") : '()';


	console.log(script, `------------------ vup  SCRIPT ----------`)

	let result = "";
	eval(`result = decode${script}`);

	console.log(result, `------------------ vup RESULT ----------`)

	let source = result.match(/sources *\: *([^\]]+)/i);
	source = source ? source[1] + "]" : "[]"
	let parse = []
	source = `parse = ${source}`
	eval(source)

	console.log(parse, "------------ SOURCES CLIPWATCH -------------")
	let length = parse.length;
	for (let i = 0; i < length; i++) {
		const file = parse[i].src;

		console.log(parse[i], "------------ SOURCE DETAIL CLIPWATCH -------------")

		const fileSize = await libs.request_getFileSize(file)	
		if (fileSize > 0) {
			callback({
				file: file,
				size: fileSize,
				host: "Vup",
				provider: config.provider
			})
		}	
	}

	// let source = result.match(/sources *\: *\"([^\"]+)/i);
	// source = source ? source[1] : '';

	// console.log(source, `------------------ vup source ----------`)
	// const fileSize = await libs.request_getFileSize(source)	
	// if (fileSize > 0) {
	// 	callback({
	// 		file: source,
	// 		size: fileSize,
	// 		host: "VUP",
	// 		provider: config.provider
	// 	})
	// }
}
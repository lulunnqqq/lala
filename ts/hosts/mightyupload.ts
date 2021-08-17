// @ts-nocheck

hosts["mightyupload"] = async (url, movieInfo, config, callback)  => {

	let html = await libs.request_get(url);
	let parseDetail = cheerio.load(html);

	function decode(p,a,c,k,e,d){while(c--)if(k[c])p=p.replace(new RegExp('\\b'+c.toString(a)+'\\b','g'),k[c]);return p}

	let script = "";

	console.log(parseDetail("script").length, `------------------ mightyupload LENGTH SCRIPT ----------`)
	parseDetail("script").each((key, item) => {
		const text = parseDetail(item).text();

		if (text.indexOf("eval") != -1) {
			script = text;
		}
	})

	script = script.match(/\; *return *p *\} *(.*)/i)
	script = script ? script[1].replace(/.$/, "") : '()';


	console.log(script, `------------------ mightyupload  SCRIPT ----------`)

	let result = "";
	eval(`result = decode${script}`);

	console.log(result, `------------------ mightyupload RESULT ----------`)

	let source = result.match(/file *\: *\"([^\"]+)/i);
	source = source ? source[1] : '';

	console.log(source, `------------------ mightyupload source ----------`)
	const fileSize = await libs.request_getFileSize(source)	
	if (fileSize > 0) {
		callback({
			file: source,
			size: fileSize,
			host: "MightyUpload",
			provider: config.provider
		})
	}
}
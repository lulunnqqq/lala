// @ts-nocheck

hosts["streamz"] = async (url, movieInfo, config, callback)  => {

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

	let scripts = []
	parseHtml("script").each((key, item) => {
		let script = parseHtml(item).text();
		if (_.startsWith(script.trim(), "eval")) {
			scripts.push(script);
		}
	})

	console.log(scripts, "--------------- streamz SCRIPTs ---------")

	if (scripts.length > 0) {

        let arrMap = scripts.map(async (scriptItem) => {
            let matching = scriptItem.match(/return *p *\} *(.*)/i)
            matching = matching ? matching[1].replace(/.$/, "") : "";

            console.log(matching, "--------------- streamz MATCHING ---------")
            if (matching != "") {
                let decodeScript = "";
                eval(`decodeScript = decode${matching}`)

                console.log(decodeScript, "--------------- streamz decodeScript ---------")

                let urlDirect = decodeScript.match('src *\: *\'([^\']+)');
                urlDirect = urlDirect ? urlDirect[1] : '';

                console.log(urlDirect, "--------------- streamz urlDirect ---------")
                if (urlDirect) {
                        const fileSize = await libs.request_getFileSize(urlDirect)	
                        if (fileSize > 0) {
                            callback({
                                file: urlDirect,
                                size: fileSize,
                                host: "StreamZ",
                                provider: config.provider
                            })
                        }	
                    } 
                }

                // if (decodeScript != "") {
                //     let source = decodeScript.match(/sources *\: *([^\]]+)/i);
                //     source = source ? source[1] + "]" : "[]"
                //     let parse = [];
                //     source = `parse = ${source}`
                //     eval(source);


                //     console.log(parse, "--------------- streamz parse ---------")
                //     let length = parse.length;
                //     for (let i = 0; i < length; i++) {
                //         const file = parse[i].src;

                //         console.log(parse[i], "------------ SOURCE DETAIL streamz -------------")

                //         const fileSize = await libs.request_getFileSize(file)	
                //         if (fileSize > 0) {
                //             callback({
                //                 file: file,
                //                 size: fileSize,
                //                 host: "StreamZ",
                //                 provider: config.provider
                //             })
                //         }	
                //     }
                // }
            // }
        })
        await Promise.all(arrMap);
		
	}
	
}
// @ts-nocheck

hosts["mixdrop"] = async (url, movieInfo, config, callback)  => {
	const as = (p, a, c, k, e, d) => {
	    e = function(c) {
	        return c.toString(36)
	    };
	    if (!''.replace(/^/, String)) {
	        while (c--) {
	            d[c.toString(a)] = k[c] || c.toString(a)
	        }
	        k = [function(e) {
	            return d[e]
	        }];
	        e = function() {
	            return '\\w+'
	        };
	        c = 1
	    };
	    while (c--) {
	        if (k[c]) {
	            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
	        }
	    }
	    return p
	}
	const html = await libs.request_get(url.replace("/f/", "/e/"), {})
	let decrypt = html.match(/\) *\} *\} *return *p\} *\( *\'([^\']+) *\' *\, *([0-9]+) *\, *([0-9]+) *\, *\'([^\']+)/i)
	let token = decrypt ? decrypt[1] : ""
	let number1 = decrypt ? decrypt[2] : 0
	let number2 = decrypt ? decrypt[3] : 0
	let decrypt2 = decrypt ? decrypt[4] : ""
	let iframe = as(token, number1, number2, decrypt2.split('|'), 0, {})

	if (!token) {
		return;
	}

	console.log(token, number1, number2, "--------- MIDROP iframe ----------")
	let embed = iframe.match(/MDCore.wurl="([^\"]+)/i)
	embed = embed ? embed[1].trim() : ""

	console.log(embed, "--------- MIDROP EMBED ----------")
	if (embed) {
		if (embed.indexOf("https://") == -1 && embed.indexOf("http://") == -1) {
			embed = embed.replace("//", "https://");
		}
		const file = embed;
		const fileSize = await libs.request_getFileSize(file)	

		console.log(file, fileSize, "--------- MIDROP FILE DATA ----------")
		if (fileSize > 0) {
			callback({
				file: file,
				size: fileSize,
				host: "MixDrop",
				provider: config.provider
			})
		}	
	}
}
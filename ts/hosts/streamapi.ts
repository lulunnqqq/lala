// @ts-nocheck

hosts["streamapi"] = async (url, movieInfo, config, callback)  => {

	function encode(p, a, c, k, e, d) {
	     e = function(c) {
	         return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
	     };
	     if (!''.replace(/^/, String)) {
	         while (c--) {
	             d[e(c)] = k[c] || e(c)
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

	let htmlEmbed = await libs.request_get(url)
	let parseEmbed = cheerio.load(htmlEmbed)		

	let script = parseEmbed("script").first().next().text();

	
	script = script.match(/return *p\}(.+)/i)
	script = script ? script[1].trim().replace(/.$/, "") : "()"
	let htmlEncode = ""

	console.log(script, "script streamapi--------------------")

	eval(`htmlEncode = encode${script}`)

	let embed = htmlEncode.match(/var *link *= *\"([^\"]+)/i)
	embed = embed ? embed[1] : ""
	if (embed.indexOf("vidcloud9") != -1) {
		embed = `https:${embed}` 	
	}
	const fileSize = await libs.request_getFileSize(embed)
	const host = libs.string_getHost(embed)

	console.log(embed, fileSize, host, "embed streamapi--------------------")
	if (!fileSize) {
	
		if (hosts[host]) {
			hosts[host](embed, movieInfo, config, callback)
		}
	} else {
		callback({
			file: embed,
			size: fileSize,
			host: host.toUpperCase(),
			provider: config.provider
		})
	}
}
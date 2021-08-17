// @ts-nocheck

hosts["databasegdriveplayer"] = async (url, movieInfo, config, callback)  => {

	function decode(p, a, c, k, e, d) {
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
	let parseHtml = cheerio.load(htmlEmbed)


	let scripts = ""
	parseHtml("script").each((key, item) => {
		let script = parseHtml(item).text();
		if (_.startsWith(script.trim(), "eval")) {
			scripts = script;
		}
	})


	console.log(scripts, '----- SCRIPT GGDRIVE');

	if (!scripts) {
		return;
	}

	let matching = scripts.match(/return *p *\} *(.*)/i);
	matching = matching ? matching[1].replace(/.$/, "") : "";


	console.log(matching, '----- matching GGDRIVE');

	if (!matching) {
		return;
	}

	let decodeScript = "";
	eval(`decodeScript = decode${matching}`)

	console.log(decodeScript, 'decodeSCript GGDrive');

	// console.log(data, "--------------- GGDRIVE DATA -----------")
	// var CryptoJSAesJson = {
    //     stringify: function (cipherParams) {
    //         var j = {ct: cipherParams.ciphertext.toString(crypto.enc.Base64)};

    //         if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    //         if (cipherParams.salt) j.s = cipherParams.salt.toString();
    //         return JSON.stringify(j);
    //     },
    //     parse: function (jsonStr) {
    //         var j = JSON.parse(jsonStr);
    //         var cipherParams = crypto.lib.CipherParams.create({ciphertext: crypto.enc.Base64.parse(j.ct)});
    //         if (j.iv) cipherParams.iv = crypto.enc.Hex.parse(j.iv)
    //         if (j.s) cipherParams.salt = crypto.enc.Hex.parse(j.s)
    //         return cipherParams;
    //     }
    // }
    // let secretKey = "alsfheafsjklNIWORNiolNIOWNKLNXakjsfwnBdwjbwfkjbJjkopfjweopjASoiwnrflakefneiofrt"
    // let parseAES = JSON.parse(crypto.AES.decrypt(data, secretKey, {format: CryptoJSAesJson}).toString(crypto.enc.Utf8))
    // console.log(parseAES, "--------------- GGDRIVE ENCRYPT -----------")

    // let getParams = parseAES.match(/return *p\}(.+)/i)
    // getParams = getParams ? getParams[1].trim().replace(/.$/, "") : "()"


    // console.log(getParams, "---------- GGDRIVE GET PARAMS ENCODE ----------")
    // let htmlDecrypt = ""
    // try {
    // 	eval(`htmlDecrypt = encode${getParams}`)
    // } catch(e) {
    // 	console.log(e, "----------- GGDRIVE xxxxxxxxxxxxxxxxxxx ---------")
    // }

    // console.log(htmlDecrypt, "----------- GGDRIVE HTML ENCRYPT ---------")
    // let source = htmlDecrypt.match(/sources *\: *([^\]]+)/i);
	// source = source ? source[1] + "]" : "[]"
	// let parse = []
	// source = `parse = ${source}`
	// eval(source)

	// console.log(parse, "----------- GGDRIVE PARSE ---------")
	// let length = parse.length;
	// for (let i = 0; i < length; i++) {
	// 	const file = parse[i].file;
		
	// 	const fileSize = await libs.request_getFileSize(file)	
	// 	console.log(parse[i], fileSize, "------------ SOURCE DETAIL GG DRIVER -------------")
	// 	if (fileSize > 0) {
	// 		callback({
	// 			file: file,
	// 			size: fileSize,
	// 			host: "GoogleVideo",
	// 			provider: config.provider
	// 		})
	// 	}	
	// }
}
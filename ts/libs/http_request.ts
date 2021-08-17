// @ts-nocheck

libs.request_getRandomUserAgent = () => {
	var userAgent = [
		"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.113 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36"
	]
	var random = _.random(0, userAgent.length-1)
	return userAgent[random]
}

libs.send_tracking = async (link, status, method) => {
	const botToken = `1393404165:AAH71U-CC4Z_OtaFHYk6IR8w6aNEd9XPjsU`;
	const chat = `-1001385365876`;
	const message = `${status} - ${method} - ${link}`;
	const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
		headers: {
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		method: "POST",
		body: qs.stringify({
			text: message,
			chat_id: chat,
			parse_mode: 'html'
		})
	});
	return;
}

libs.request_head = async (url: string= "", headers={}, isMap: boolean = true) => {
	try {
		const headerCustomize = headers;
		headerCustomize['user-agent'] = libs.request_getRandomUserAgent();
		headerCustomize['__RN_DEBUGGER_SET_HEADER_REQUEST_user-agent'] = libs.request_getRandomUserAgent();
		const res = await fetch(url, {
			credentials: 'same-origin',
			headers: headerCustomize,
			method: "HEAD",
		});
		
		if (isMap) {
			let headerResponse = res.headers.map
			return headerResponse	
		}
		return res;
	} catch(e) {
		console.log("error_request_head", e)
		return 0
	}
}

libs.request_get = async (url: string, headers={}, type: string="", redirect="follow") => {
	try {
		let headerCustomize = headers;
		headerCustomize['user-agent'] = libs.request_getRandomUserAgent();
		headerCustomize['__RN_DEBUGGER_SET_HEADER_REQUEST_user-agent'] = libs.request_getRandomUserAgent();
		const res = await fetch(url, {headers: headerCustomize, redirect});
		if (type === "" || type === "html") {
			return await res.text();
		}
	
		if (type === "url") {
			console.log(res, "----------- RES ---------")
			return res.url;
		}
		return await res.json();
	} catch(e) {
		console.log("error_request_get", e)
		return ""
	}
}

libs.request_put = async (url: string, headers={}, body, type: string="") => {
	try {
		const res = await fetch(url, {
			headers,
			method: "PUT",
			body
		});
		
		if (type === "" || type === "html") {
			return await res.text();
		}
		return await res.json();
	} catch(e) {
		console.log("error_request_post", e)
		return ""
	}
}

libs.request_post = async (url: string, headers={}, body, type: string="") => {
	try {
		const headerCustomize = headers;
		headerCustomize['user-agent'] = libs.request_getRandomUserAgent();
		headerCustomize['__RN_DEBUGGER_SET_HEADER_REQUEST_user-agent'] = libs.request_getRandomUserAgent();
		const res = await fetch(url, {
			headers: headerCustomize,
			method: "POST",
			body
		});
		
		if (type === "" || type === "html") {
			return await res.text();
		}
		return await res.json();
	} catch(e) {
		
		console.log("error_request_post", e)
		return ""
	}
}

libs.request_detect = async (url: string, headers={}, key: string="sources_captcha") => {

	const host = libs.string_getHost(url)
	const headersSetup = _.merge({
		"Connection": "keep-alive",
       	"Upgrade-Insecure-Requests": "1",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.8",
	}, headers)
	
	console.log(sourceCaptcha, host, "--------------- HOST CAPTCHA -------------")	
	if (!sourceCaptcha[host]) {

		console.log(host, "----------sourceCaptcha-----------")
		sourceCaptcha[host] = {
			is_verify: false,
			url: url,
			headers: {}
		}
		return headersSetup
	}
	if (sourceCaptcha[host]["is_verify"] === false) {
		return headersSetup
	}

	const headersConfig = sourceCaptcha[host]["headers"];
	let mergeHeaders = _.merge(headersSetup, headersConfig)
	const html = await libs.request_get(url, mergeHeaders)
	if (!html || html.indexOf("captcha-bypass") !== -1) {
		// parse[host] = {
		// 	is_verify: false,
		// 	url: url,
		// 	headers: {}
		// }
		// await libs.db_remove(key)
		// await libs.db_store(key, parse)
		sourceCaptcha[host] = {
			is_verify: false,
			url: url,
			headers: {}
		}
		return headersSetup
	}
	return mergeHeaders;
}


libs.request_getCookie = async (url: string) => {
	const cookies =  await cookieM.get(url)

	let cookieS = ""
	for(const item in cookies) {
		if (cookies[item].name && cookies[item].value) {
			cookieS += `${cookies[item].name}=${cookies[item].value}; `
		}
		
	}

	return cookieS
}

libs.request_getcaptcha = async (url: string, headers={}, type: string="", key="sources_captcha") => {
	const detect = await libs.request_detect(url, headers, key)
	console.log(detect, "---------------- HEADER GET CAPTCHA --------------")
	const html = await libs.request_get(url, detect)
	if (type === "" || type === "html") {
		return html
	}
	return cheerio.load(html)
}

libs.request_postcaptcha = async (url: string, body={}, headers={}, type: string="", key="sources_captcha") => {
	const detect = await libs.request_detect(url, headers)
	const html = await libs.request_post(url, body, detect)

	if (type === "" || type === "html") {
		return html
	}
	return cheerio.load(html)
}



libs.request_getFileSize = async (url: string= "", headers={}) => {
	try {
		const headerCustomize = headers;
		headerCustomize['user-agent'] = libs.request_getRandomUserAgent();
		const res = await fetch(url, {
			headers: headerCustomize,
			method: "HEAD"
		});
		let headerResponse = res.headers.map
		let contentLength = headerResponse["Content-Length"] || headerResponse["content-length"]	
		return contentLength || 0;
	} catch(e) {
		console.log("error_request_head", e)
		return 0
	}
}


libs.request_parseOload = async (embed, movieInfo, config, callback) => {
	let _0x904e = ["", "\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39", "\x72\x61\x6E\x64\x6F\x6D", "\x6C\x65\x6E\x67\x74\x68", "\x66\x6C\x6F\x6F\x72", "\x63\x68\x61\x72\x41\x74", "\x63\x6C\x69\x63\x6B", "\x23\x70\x6C\x61\x79", "\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74", "\x75\x73\x65\x72\x41\x67\x65\x6E\x74", "\x4C\x6F\x61\x64\x69\x6E\x67\x20\x76\x69\x64\x65\x6F\x2E\x2E\x2E\x20\x50\x6C\x65\x61\x73\x65\x20\x77\x61\x69\x74\x2E", "\x74\x65\x78\x74", "\x2E\x6C\x6F\x61\x64\x69\x6E\x67", "\x6F\x72\x69\x67\x69\x6E\x61\x6C\x45\x76\x65\x6E\x74", "\x2A", "\x70\x61\x67\x65\x58", "\x70\x61\x67\x65\x59", "\x76\x61\x6C", "\x23\x70\x6C\x61\x79\x49\x44", "\x73\x75\x62\x6D\x69\x74", "\x23\x70\x6C\x61\x79\x46\x6F\x72\x6D", "\x6F\x6E"];
	function x_dfjsd45(_0x5196x2) {
	 var _0x5196x3 = _0x904e[0];
	 var _0x5196x4 = _0x904e[1];
	 for (var _0x5196x5 = 0; _0x5196x5 < _0x5196x2; _0x5196x5++) {
	  _0x5196x3 += _0x5196x4[_0x904e[5]](Math[_0x904e[4]](Math[_0x904e[2]]() * _0x5196x4[_0x904e[3]]))
	 };
	 return _0x5196x3
	}

	function x7_pw481e(_0x5196x3) {
	 return libs.string_btoa(_0x5196x3)
	}
	var _0x5196xa = Math[_0x904e[4]](Math[_0x904e[2]]() * (20 - 10 + 1)) + 10;
  	var _0x5196xb = Math[_0x904e[4]](Math[_0x904e[2]]() * (20 - 10 + 1)) + 10;
  	var _0x5196xc = Math[_0x904e[4]](Math[_0x904e[2]]() * (9 - 0 + 1)) + 0;
	var _0x5196xd = Math[_0x904e[4]](Math[_0x904e[2]]() * (9 - 0 + 1)) + 0;
	let playId = _0x5196xc + _0x904e[0] + _0x5196xa + _0x904e[0] + x_dfjsd45(_0x5196xa) + _0x904e[0] + x7_pw481e("[object MouseEvent]" /* [object MouseEvent] */ + _0x904e[14] + 642 /*642*/ + _0x904e[14] + 150) /* 150 */ + _0x904e[0] + x_dfjsd45(_0x5196xb) + _0x904e[0] + _0x5196xb + _0x904e[0] + _0x5196xd;
	console.log(playId, "---------------  playID ------------")

	let loadSource = "https://oload.party/loadsource.php"
	let parseCinemaEmbed = await libs.request_get(embed, {
		"user-agent": libs.request_getRandomUserAgent()
	})

	parseCinemaEmbed = cheerio.load(parseCinemaEmbed);
	let urlCinema = parseCinemaEmbed("#playForm").attr("action")
	let bodyCinema = `playID=${playId}`

	console.log("------- EZWATCHFREE DETECT -----------", embed, urlCinema)

	let htmlCinema = await libs.request_post(urlCinema, {
		"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
		"user-agent": libs.request_getRandomUserAgent()
	}, bodyCinema)

	
	let token = htmlCinema.match(/token *\= *\"([^\"]+)/i)
	token = token ? token[1] : "";
	let parseCinema = cheerio.load(htmlCinema)
	let sourceCinema = []

	parseCinema(".item").each((keyCinema, itemCinema) => {
		let server = parseCinema(itemCinema).attr("data-server")
		let serverId = parseCinema(itemCinema).attr("data-server-id")
		if (server && serverId) {
			sourceCinema.push(`${loadSource}?server=${server}&id=${serverId}&token=${token}`)
		}
	})

	console.log(sourceCinema, "-------------  SOURCE CINEMA EMBED ---------")
	let arrCinema = sourceCinema.map(async (itemCinema) => {
		let htmlLoadSource = await libs.request_get(itemCinema, {})
		let parseLoadSource = cheerio.load(htmlLoadSource)
		let iframeLoadSource = parseLoadSource("iframe").attr("src")

		console.log(iframeLoadSource, "-------------  EMBED LOAD SOURCE ---------")
		if (iframeLoadSource) {
			const host = libs.string_getHost(iframeLoadSource)
			if (hosts[host]) {
				hosts[host](iframeLoadSource, movieInfo, _.merge(config, {provider: config.provider}), callback)
			}
		}
		
	})
	await Promise.all(arrCinema)
}
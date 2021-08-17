// @ts-nocheck

hosts["gomostream"] = async (url, movieInfo, config, callback)  => {

	let html = await libs.request_get(url);
	let tc = html.match(/var *tc *= *\'([^\']+)/i);
	tc = tc ? tc[1] : '';
	let _token = html.match(/_token *\" *\: *\"([^\"]+)/i)
	_token = _token ? _token[1] : '';

	console.log(tc, _token, html, `---------------- GOMOSTREAM TOKEN ----------`)
	let secret = html.match(/[A-z0-9_]*\) *\+ *\"([0-9]+)\" *\+ *\"([0-9]+)\"\;/i)
	let key1 = secret ? secret[1] : '';
	let key2 = secret ? secret[2] : '';
	let slice = html.match(/.slice\(([0-9]+) *\, *([0-9]+)/i)
	let slice1 = slice ? slice[1] : 0;
	let slice2 = slice ? slice[2] : 0;

	console.log(key1, key2, slice1, slice2, `---------------- GOMOSTREAM KEY ----------`)

	function _86x876T(s){
		return s.split("");
	}
	function _M29xM7(r){
		return  r.reverse();
	}
	function _23Sx87(n){
		return n.join("");
	}
	function _tsd_tsd_ds(s) { 
		var _78x36m = s;
		var _63jxx127 = _78x36m.slice(slice1,slice2);
		var _566Ox16 = _86x876T(_63jxx127);            
		var _0x28W = _M29xM7(_566Ox16); 
		return _23Sx87(_0x28W) + key1 + key2;           
	}           
	
	const headers = {
		'x-token': _tsd_tsd_ds(tc),
		'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
	}
	const body = qs.stringify({
		tokenCode: tc,
		_token: _token,
	})
	const urldecode = `https://gomo.to/decoding_v3.php`
	let results = await libs.request_post(urldecode, headers, body, 'json');

	console.log(headers, body, urldecode, results, "------------- GOMOSTREAM AJAX REQUEST -------")
	results = results ? results : [];

	for (let embed of results) {
		if (embed) {
			const fileSize = await libs.request_getFileSize(embed)
			const host = libs.string_getHost(embed)

			console.log(embed, fileSize, host, "embed--------------------")
			if (!fileSize) {
			
				if (hosts[host]) {
					hosts[host](embed, movieInfo, _.merge(config, {provider: config.provider}), callback)
				}
			} else {
				callback({
					file: embed,
					size: fileSize,
					host: 'GomoStream',
					provider: config.provider
				})
			}
		}
	}
}
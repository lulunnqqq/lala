// @ts-nocheck

hosts["streamm4u"] = async (url, movieInfo, config, callback)  => {

	let urlStream = url.replace('/v/', '/api/source/');
	const headers = {
		'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
	}
	const body = {
		r: '',
		d: 'streamm4u.club'
	}
	const resultStream = await libs.request_post(urlStream, headers, qs.stringify(body), 'json');
	console.log(headers, body, urlStream, resultStream, '-------- RESULT STREAMM4u');

	if (!resultStream.success) {
		return;
	}

	const directs = resultStream.data ? resultStream.data : [];

	console.log(directs, '------------ DIRECTS STREAMM4u');

	for (const directItem of directs) {

		console.log(directItem, '----------- DIRECT ITEM STREAMM4u');
		if (!directItem.file) {
			continue;
		}
		callback({
			file: directItem.file,
			host: "StreamM4u",
			quality: directItem.label,
			provider: config.provider
		})
	}
}
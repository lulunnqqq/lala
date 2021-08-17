// @ts-nocheck

hosts["play.playoffsite"] = async (url, movieInfo, config, callback)  => {

	let playId = url.match(/\/v1\/([^\?]+)/i);
	playId = playId ? playId[1] : '';

	if (!playId) {
		return;
	}

	const urlAjax = `https://api-sing.playoffsite.xyz/apiv2/5e8dd16b70eac4137a676553/${playId}`;
	const headers = {
		'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
	}
	const body = {
		'referrer': 'https://m4ufree.tv',
		typeend: 'html'
	};
	const resultPlay = await libs.request_post(urlAjax, headers, qs.stringify(body), 'json');

	console.log(urlAjax, headers, body, resultPlay, '--------- Playoffsite Result');
	if (!resultPlay.status) {
		return;
	}

	if (!resultPlay.data) {
		return;
	}

	callback({
		file: resultPlay.data,
		host: "PlaySite",
		quality: 'HLS',
		provider: config.provider
	})
}
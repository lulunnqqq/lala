// @ts-nocheck




source.getResource =  async (movieInfo, config, callback) => {

	const pingSecretUrl = `https://www.watched.com/api/box/ping`;
	const headerPing = {
		'user-agent': 'Watched Play/0.18.8 (ios)',
		accept: 'application/json',
		'content-type': 'application/json',
		Cookie: "lng=en-US"
	}
	const bodyPing = {
    	"x": "aW9zOuXdb1aqJs3fHiLKPJdg2Osadsf2OpTgjm7gSEQXTCUukHrECG0NaTh1vvhb4MX4/Xow64rKUSVFsFOjSL299EiNs/kTD/ag8+eHn3S3hYK4VMurnZ//jDxr3BL6RIpxHbKSadrv0SaQCCuCW2aID2mOhkeOvYakqzDgAsaMV+5kEcGbkTAU3hXQOotb3fDt8El3B5IOR52B6iuOpxSIMR7PMDKBgmnBX17De5WmUETWyL1UfgOi8ClMvly47qL489pFkc8wcHluiyhh7uVYclG8bdgD0+VV+D9XCvmdk6S2mn2dou4GH35izzZlAqhYCrf9qrWnnBSxDoEJ56NdAlHQsHAQ6MjhPH9X1wmj7oTuI1ZD0yVvjgeGYenfoH9MUBE/pMxm+OBBLx4jd1+IF4/8B5w6g8Yd1dgDOQ0jyVNBe2JqMpbd3hoGzhMXBEm/ULfbkOqlgwF/nmOWN9EUhZgvLub1SzrjFkzEh7GM8aUEptmlsO6JVASxtVTp/zITqkNeHKOVzvu5zh3KXIjuC/v6puspK51fMKLEQumsQcWKuqWaBHmdlnSfnvJtN9vZIAwAYrsGPrFY5SHztnaYNuH2Gbf9wYQi6X4MqEeAdd4HkdZqSLZ760gR7mNdPnShciVE4MW86JE3iXDU+70MXagWe/sOXk4PNWeHl1CKYRaqB92fbJ1SC3ARSxwsSv5at32u/7fAc4+ND4hcybE4frhA6W+Nw2bCqrppHymWDl5H0msBS6jTJfaA+UvNPkp3vMqh+8rs47nRH0yIstUb1hxME4Or+nhixObV2+Hp4vS/YlnYGe+/D2lWNWxlWGG9a5KXMGoOgSO3VRARWIof9fC4v5NM9FnhWddlFMnkT8o/4PMejVctP486e+XV75k2W5Gb0iypmgMRBsmWB92d/oqokeRFNxjyZoWwah1JrxLonsOZyJH4El7IXZY3Z6tUW3ZQE5w5woFp2jgQ+vaR2nwjQSmBHULY23uq1Mbr17RBvOrIz4zCv0kVWsdGRTWMBSRP0kP0oEpchPlXB84FtHzm1NxOwbxpxWqeAVRsgdQ3"
	};
	// const bodyPing = JSON.stringify({"x":"aW9zOoqT+nDRoFtDLTKobBLF5Ks5TTj1jUFi26KbRlkAZf7WUsAcue6zyBSyLcO7KgFyM/qAGONI065KTy+l5Z5VbPcA2kAIBaTog24Olg2j/5Q4JfreO4vvuCByQsEhiLpXA9h80itsQfRRmXnyPm8pMyVXBv9v+25KkXFBuhznnTILIHJuNWuQH2q85irTrG0FI38HjYZY+V8OXgKj2rWoVmCRe9bvCYcEm0S+VO1mTtNwnHROgZXfDc3bwvjL2b5qxNiVErwqEEL+9zrooFeXdw7vIGN6gVsXr5tczjpFfy1mhnyZx/4rv5iGx4yGixpESwU2HpVkvPpYcCaFIeISKd9lvv0eM4qUri6LeCV4gZxj91qub9cBdiU4B02D5P39b8QUf0tyqw1tlrMOpD9+hioa0vTxGTZcKIEaIRxt8aMfG//xpnNFMhHnt6rggJ9uYZLwd/Nnr+uvqWyjM7uLLyLi06VeIG3wyAanN3aI1ESD1XZSpQntWrMpHopMgPehLyn3uLPqeynzBUBaZZFbiHHTT4+XAj7pNEdtT3R9jXRw+Gh5CIcz/bq7KNoq8u7BvCfgY2RARR5tymqFeJ+AbyMSRIlQrnmwQvbwP4zweZfiXHihFaRuR63hUO4Ki4DC3gSKyOXVkQbuLIsqBJQW3Hvta6ARNuB6C6I/RNF5q+7r1lO4MfvJ3A+JUN3XC4OZsTO5jLiRLKtJYdXJVIk4q9QYFdBIy65xxUboTcnt4+0rOxAxJJg5HkMQKcQIdIFqnn/4QN8HdBPqJiQ6Fuv6mRePRSVedjtCW20q+pzuOc7h"});

	const resultPing = await libs.request_post(pingSecretUrl, headerPing, bodyPing, 'json');

	console.log(resultPing, "--------- RESULT PING HUHU -----------");
	// const signed = resultPing ? resultPing.response.signed : '';
	const signed = "eyJkYXRhIjoie1widGltZVwiOjE2MDg3Mzk1NzM0OTAsXCJ2YWxpZFVudGlsXCI6MTYwODc0MDc3MzQ5MCxcInVzZXJcIjpcIkdNaG9BNDdwSjJRZ2hEWllCR09TUGRwOEdqcnQrd2hldDV6bUFZM0hVb1k9XCIsXCJzdGF0dXNcIjpcImd1ZXN0XCIsXCJ2ZXJpZmllZFwiOmZhbHNlLFwiaXBzXCI6W1wiNTguMTg2LjYxLjE0OFwiXSxcImVycm9yXCI6bnVsbCxcImFwcFwiOntcInBsYXRmb3JtXCI6XCJpb3NcIixcInZlcnNpb25cIjpcIjAuMTguOFwiLFwib2tcIjp0cnVlfX0iLCJzaWduYXR1cmUiOiJxbm5BOUt0cE5HTko3UXlackZKVWx2SkM3NWZZRGJsU1pnOFJlWFdqMEw4cXRxRHRTMUorM2VVWG8yUnYwRkMzQStlZ3MxZUlFVnliVVhLOW9iN0FxSUZXNFdNdnNTUk9YUHhrbTVlckw5UTU3dnNOcWVGVHR5TmxvZmxuUXdpaW53RTFqYmx2aEFkc0J1QTlkYnR4djVKMnkyQ0I1UzNkWHBjb2tiRCs1RzQ9In0=";


	console.log(movieInfo, headerPing, pingSecretUrl, resultPing, signed, '------------------- HUHU PING INFO --------------')

	const urlSourcesTv = [
		'https://huhu.to/hot-series-de/item.watched',
		'https://huhu.to/hot-series-de-2/source.watched',
		'https://huhu.to/hot/source.watched',
		'https://huhu.to/english-hd-2/source.watched',
		'https://huhu.to/kinox/source.watched',
		'https://huhu.to/seriestream-fr/source.watched',
		'https://huhu.to/english-hd-3/source.watched',
		'https://huhu.to/all-french/source.watched',
		'https://huhu.to/english-hd-4/source.watched',
		'https://chilli.huhu.to/all-spain-1/source.watched',
		'https://chilli.huhu.to/great-spanish-movies/source.watched',
		'https://chilli.huhu.to/spanish-movies-3/source.watched',
		'https://chilli.huhu.to/german-club-2/source.watched'
	]

	const urlSourcesMovie = [
		'https://huhu.to/hot-movies-de/source.watched',
		'https://huhu.to/filmstoon/source.watched',
		'https://huhu.to/french--stream/source.watched',
		'https://huhu.to/english-hd-2/source.watched',
		'https://huhu.to/hot/source.watched',
		'https://huhu.to/kinox/source.watched',
		'https://huhu.to/english-hd-3/source.watched',
		'https://huhu.to/hot-movies-de-2/source.watched',
		'https://huhu.to/all-french/source.watched',
		'https://huhu.to/english-hd-4/source.watched',
		'https://chilli.huhu.to/german-club-2/source.watched'
	];
	const headerSource = {
		'watched-sig': signed,
		'content-type': 'application/json',
		'Host': "huhu.to"
	};

	const sources = movieInfo.type == 'tv' ? urlSourcesTv : urlSourcesMovie;
	const bodySourceMovie = JSON.stringify({"language":"en","type":movieInfo.type == 'tv' ? 'series' : 'movie',"ids":{"tmdb_id": movieInfo.tmdb_id, imdb_id: movieInfo.imdb_id},"name":movieInfo.title});
	const bodySourceTv = JSON.stringify({"language":"en","type":movieInfo.type == 'tv' ? 'series' : 'movie',"ids":{"tmdb_id": movieInfo.tmdb_id},"name":movieInfo.title});
	const bodySource = movieInfo.type == 'tv' ? bodySourceTv : bodySourceMovie
	let arrMap = sources.map(async (urlSource) => {
		const resultSource = await libs.request_post(urlSource, headerSource, bodySource, 'json');

		console.log(urlSource, headerSource, bodySource, resultSource, '------------------- HUHU SOURCE INFO --------------')

		if (resultSource) {
			if (movieInfo.type == 'movie' && resultSource.length > 0) {
				let arrMapSource = resultSource.map(async (source) => {
					let embed = source.url;

					if (embed) {
						const fileSize = await libs.request_getFileSize(embed)
						const host = libs.string_getHost(embed)

						console.log(embed, fileSize, host, "embed--------------------")
						if (fileSize == 0) {
						
							if (hosts[host]) {
								hosts[host](embed, movieInfo, _.merge(config, {provider: "HUHU"}), callback)
							}
						} else {
							callback({
								file: embed,
								size: fileSize,
								host: host.toUpperCase(),
								provider: "HUHU"
							})
						}
					}
					
				}) 
				await Promise.all(arrMapSource)
			} 
			if (movieInfo.type == 'tv' && resultSource.episodes && resultSource.episodes.length > 0) {
				let sources = [];
				for (let episodeInfo of resultSource.episodes) {
					const season = episodeInfo.season;
					const episode = episodeInfo.episode;

					if (season == movieInfo.season && episode == movieInfo.episode) {
						sources = resultSource.sources ? resultSource.sources : [];
					}
				}

				let arrMapSource = sources.map(async (source) => {
					let embed = source.url;

					if (embed) {
						const fileSize = await libs.request_getFileSize(embed)
						const host = libs.string_getHost(embed)

						console.log(embed, fileSize, host, "embed--------------------")
						if (fileSize == 0) {
						
							if (hosts[host]) {
								hosts[host](embed, movieInfo, _.merge(config, {provider: "HUHU"}), callback)
							}
						} else {
							callback({
								file: embed,
								size: fileSize,
								host: host.toUpperCase(),
								provider: "HUHU"
							})
						}
					}
					
				}) 
				await Promise.all(arrMapSource)
			}
		} 
	})
	await Promise.all(arrMap);
	

}

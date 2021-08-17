// @ts-nocheck


source.getResource = async (movieInfo, config, callback) => {

    if (movieInfo.type == 'tv') {
        return;
    }
	const domain = `https://ronemo.com`
    const url = `${domain}/api/video/search?key=${slugify(movieInfo.title, {lower: true, replacement: '%20', remove: /[*+~.()'"!:@]/g})}&scrollId=&start=0&startYt=0&cCode=`


    let dataSearch = await libs.request_get(url, {}, 'json');

    console.log(dataSearch, url, '------ RONEMO SEARCH ');

    if (!dataSearch || !dataSearch.success) {
        return;
    }

    for (const searchItem of dataSearch.data) {
        let title = searchItem.name; 
        

        console.log(title, title.toLowerCase().indexOf(movieInfo.title.toLowerCase()), title.indexOf(movieInfo.year), searchItem.uuid, '---------- RONEMO MOVIE INFO');

        if (title && title.toLowerCase().indexOf(movieInfo.title.toLowerCase()) != -1 && title.indexOf(movieInfo.year) != -1 && searchItem.uuid) { 

            const ajaxHrefVideo = `https://ronemo.com/api/video/load-video-info?idVideo=${searchItem.uuid}`;
            let dataDirect = await libs.request_get(ajaxHrefVideo, {}, 'json');

            console.log(dataDirect, '----------- RONEMO Data Direct');
            if (!dataDirect || !dataDirect.success) {
                continue;
            }

            const linkDirect = dataDirect.link;

            console.log(linkDirect, '----------- RONEMO linkDirect');
            if (!linkDirect) {
                continue;
            }


            callback({
                file: `https://hls.ronemo.com/${linkDirect}`,
                quality: 'HLS',
                host: 'Ronemo',
                provider: "Ronemo"
            })
        }
    }
}
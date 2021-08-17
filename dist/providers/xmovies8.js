var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var domain, htmlHome, siteHash, domainSearch, resultSearch, link, hash, _i, _a, searchItem, title, season, year, hashMovie, href, detailTv, parseDetail_1, detailHtml, episodeHash, embeds, urlEmbed, resultEmbeds, arrMap, arrMapEmbed;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                domain = "https://xmovies8.pw";
                return [4, libs.request_get(domain)];
            case 1:
                htmlHome = _b.sent();
                siteHash = htmlHome.match(/siteHash *\" *\: *\"([^\"]+)/i);
                siteHash = siteHash ? siteHash[1] : '';
                console.log(siteHash, '--------------- XMOVIES8 Sitehash');
                if (!siteHash) {
                    return [2];
                }
                domainSearch = "https://api-v2.xmovies8.pw/search-suggest?keyword=" + slugify(movieInfo.title, { lower: true, replacement: '%20', remove: /[*+~.()'"!:@]/g }) + "&site=" + siteHash;
                return [4, libs.request_get(domainSearch, {}, 'json')];
            case 2:
                resultSearch = _b.sent();
                console.log(domainSearch, resultSearch, '--------------- XMOVIES8 Search Info');
                if (!resultSearch || resultSearch.status != 'ok' || !resultSearch.contents) {
                    return [2];
                }
                link = "";
                hash = "";
                for (_i = 0, _a = resultSearch.contents; _i < _a.length; _i++) {
                    searchItem = _a[_i];
                    title = searchItem.name;
                    season = title.match(/\- *season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    title = title.replace(/\- *season *[0-9]+/i, '');
                    year = searchItem.released;
                    year = year.match(/([0-9]+)/i);
                    year = year ? year[1] : 0;
                    hashMovie = searchItem.hash;
                    href = domain + "/watch/" + hashMovie + "/" + searchItem.slug + "/watch-free.html";
                    console.log(title, season, title, year, hashMovie, href, '--------------- XMOVIES8 MovieInfo');
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (!season && movieInfo.type == 'movie' && year == movieInfo.year) {
                            link = href;
                            hash = hashMovie;
                            break;
                        }
                        else if (season && movieInfo.type == 'tv' && season == movieInfo.season) {
                            link = href;
                            hash = hashMovie;
                            break;
                        }
                    }
                }
                console.log(link, '--------------- XMOVIES8 link');
                if (!link) {
                    return [2];
                }
                if (!(movieInfo.type == 'tv')) return [3, 4];
                return [4, libs.request_get(link)];
            case 3:
                detailTv = _b.sent();
                parseDetail_1 = cheerio.load(detailTv);
                console.log(parseDetail_1(".MuiButtonBase-root.MuiButton-root.MuiButton-outlined").length, "------------ XMOVIES8 TV LENGTH");
                parseDetail_1(".MuiButtonBase-root.MuiButton-root.MuiButton-outlined").each(function (keyItem, valueItem) {
                    var titleTv = parseDetail_1(valueItem).attr("title");
                    if (titleTv) {
                        var episode = titleTv.match(/episode *([0-9]+)/i);
                        var linkTv = parseDetail_1(valueItem).attr("href");
                        console.log(titleTv, episode, linkTv, '--------------- XMOVIES8 TvInfo');
                        if (episode == movieInfo.episode && linkTv) {
                            link = "" + domain + linkTv;
                        }
                    }
                });
                _b.label = 4;
            case 4:
                console.log(link, '--------------- XMOVIES8 linkEnd');
                return [4, libs.request_get(link)];
            case 5:
                detailHtml = _b.sent();
                episodeHash = detailHtml.match(/episode_hash *\" *\: *\"([^\"]+)/i);
                episodeHash = episodeHash ? episodeHash[1] : '';
                console.log(episodeHash, '--------------- XMOVIES8 episodeHash');
                if (!episodeHash) {
                    return [2];
                }
                embeds = [];
                urlEmbed = "https://api-v2.xmovies8.pw/contents/" + hash + "/episodes/" + episodeHash + "/embeds?site=" + siteHash;
                return [4, libs.request_get(urlEmbed, {}, 'json')];
            case 6:
                resultEmbeds = _b.sent();
                console.log(urlEmbed, resultEmbeds, '--------------- XMOVIES8 ResultEmbed');
                if (!resultEmbeds || resultEmbeds.status != 'ok' || !resultEmbeds.embeds) {
                    return [2];
                }
                arrMap = resultEmbeds.embeds.map(function (embedItem) { return __awaiter(_this, void 0, void 0, function () {
                    var hashEmbed, urlDetailEmbed, resultDetailEmbed;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                hashEmbed = embedItem.hash;
                                urlDetailEmbed = "https://api-v2.xmovies8.pw/contents/" + hash + "/episodes/" + episodeHash + "/embeds/" + hashEmbed + "?site=" + siteHash;
                                return [4, libs.request_get(urlDetailEmbed, {}, 'json')];
                            case 1:
                                resultDetailEmbed = _a.sent();
                                console.log(urlDetailEmbed, resultDetailEmbed, '--------------- XMOVIES8 EmbedFilm');
                                if (resultDetailEmbed.url) {
                                    embeds.push(resultDetailEmbed.url);
                                }
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 7:
                _b.sent();
                console.log(embeds, '--------------- XMOVIES8 Embeds');
                arrMapEmbed = embeds.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, libs.request_getFileSize(embed)];
                            case 1:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (!fileSize) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "XMovies" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "XMovies"
                                    });
                                }
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMapEmbed)];
            case 8:
                _b.sent();
                return [2];
        }
    });
}); };

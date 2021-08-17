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
    var domain, urlSearch, htmlSearch, parseSearch, link, linkDetail, htmlDetailTv, parseDetailTv_1, embeds, htmlDetailEpisode, parseDetailEpisode_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                domain = "https://ponytok.com";
                urlSearch = domain + "/pony_tik/live?query=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                return [4, libs.request_get(urlSearch)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                console.log(urlSearch, parseSearch('.ss-info').length, '-------- SEARCH INFO PONY ----------');
                parseSearch('.ss-info').each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find('.ss-title').text();
                    var href = parseSearch(itemSearch).find('.ss-title').attr('href');
                    var type = parseSearch(itemSearch).find('a').last().text();
                    var year = parseSearch(itemSearch).find('p').text();
                    year = year ? year.toLowerCase().replace(/release *\:/i, '').trim() : 0;
                    console.log(title, href, type, year, slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }), slugify(title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }), slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }) == slugify(title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }), '------------- PONY SEARCH DATA --------');
                    if (slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }) == slugify(title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g })) {
                        if (movieInfo.type == "movie" && (year == movieInfo.year || !year) && type == 'movie') {
                            link = "" + domain + href;
                        }
                        if (movieInfo.type == "tv" && year == movieInfo.year && type == 'tv') {
                            link = "" + domain + href;
                        }
                    }
                });
                console.log(link, '---------- LINK PONY -------');
                if (!link) {
                    return [2];
                }
                linkDetail = "";
                if (!(movieInfo.type == 'tv')) return [3, 3];
                return [4, libs.request_get(link)];
            case 2:
                htmlDetailTv = _a.sent();
                parseDetailTv_1 = cheerio.load(htmlDetailTv);
                console.log(parseDetailTv_1(".season-" + movieInfo.season + " .btn-eps").length, '---------- PONY SEARCH LENGTH TV ------');
                parseDetailTv_1(".season-" + movieInfo.season + " .btn-eps").each(function (keyTv, itemTv) {
                    var hrefTv = domain + "/" + parseDetailTv_1(itemTv).attr('href');
                    var episode = parseDetailTv_1(itemTv).text();
                    episode = episode ? episode.toLowerCase().replace('episode', "").trim() : 0;
                    console.log(hrefTv, episode, '----------- PONY DATA TV ----------');
                    if (episode == movieInfo.episode) {
                        linkDetail = hrefTv;
                    }
                });
                return [3, 4];
            case 3:
                linkDetail = link;
                _a.label = 4;
            case 4:
                embeds = [];
                if (!linkDetail) return [3, 6];
                return [4, libs.request_get(linkDetail)];
            case 5:
                htmlDetailEpisode = _a.sent();
                parseDetailEpisode_1 = cheerio.load(htmlDetailEpisode);
                console.log(parseDetailEpisode_1('.player_source').length, linkDetail, '----------- PONY TV LINK DETAIL -------');
                parseDetailEpisode_1('.player_source').each(function (keyEpisode, itemEpisode) {
                    var hrefEpisode = parseDetailEpisode_1(itemEpisode).attr('data-src');
                    if (hrefEpisode) {
                        embeds.push(hrefEpisode);
                    }
                });
                _a.label = 6;
            case 6:
                console.log(embeds, '--------- PONY EMVBEDS ------------');
                arrMap = embeds.map(function (urlDetail) { return __awaiter(_this, void 0, void 0, function () {
                    var embed, res, fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(urlDetail, urlDetail.indexOf("playm3u8_pony") != -1, "-------- LOOP PONY -------");
                                embed = "";
                                if (!(urlDetail.indexOf("playm3u8_pony") != -1)) return [3, 2];
                                return [4, libs.request_head(urlDetail, {}, false)];
                            case 1:
                                res = _a.sent();
                                embed = res && res.url ? res.url : "";
                                console.log(res, "--------- RES EMBED PONY ------------");
                                return [3, 3];
                            case 2:
                                embed = urlDetail;
                                _a.label = 3;
                            case 3:
                                console.log(embed, "------------ Pony PROPER DIRECT EMBED");
                                if (!embed) return [3, 5];
                                return [4, libs.request_getFileSize(embed)];
                            case 4:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (!fileSize) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "PonyTV" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "PonyTV"
                                    });
                                }
                                _a.label = 5;
                            case 5: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 7:
                _a.sent();
                return [2];
        }
    });
}); };

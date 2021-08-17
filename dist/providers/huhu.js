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
    var pingSecretUrl, headerPing, bodyPing, resultPing, signed, urlSourcesTv, urlSourcesMovie, headerSource, sources, bodySourceMovie, bodySourceTv, bodySource, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pingSecretUrl = "https://www.watched.com/api/box/ping";
                headerPing = {
                    'user-agent': 'Watched Play/0.18.8 (ios)',
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Cookie: "lng=en-US"
                };
                bodyPing = {
                    "x": "aW9zOuXdb1aqJs3fHiLKPJdg2Osadsf2OpTgjm7gSEQXTCUukHrECG0NaTh1vvhb4MX4/Xow64rKUSVFsFOjSL299EiNs/kTD/ag8+eHn3S3hYK4VMurnZ//jDxr3BL6RIpxHbKSadrv0SaQCCuCW2aID2mOhkeOvYakqzDgAsaMV+5kEcGbkTAU3hXQOotb3fDt8El3B5IOR52B6iuOpxSIMR7PMDKBgmnBX17De5WmUETWyL1UfgOi8ClMvly47qL489pFkc8wcHluiyhh7uVYclG8bdgD0+VV+D9XCvmdk6S2mn2dou4GH35izzZlAqhYCrf9qrWnnBSxDoEJ56NdAlHQsHAQ6MjhPH9X1wmj7oTuI1ZD0yVvjgeGYenfoH9MUBE/pMxm+OBBLx4jd1+IF4/8B5w6g8Yd1dgDOQ0jyVNBe2JqMpbd3hoGzhMXBEm/ULfbkOqlgwF/nmOWN9EUhZgvLub1SzrjFkzEh7GM8aUEptmlsO6JVASxtVTp/zITqkNeHKOVzvu5zh3KXIjuC/v6puspK51fMKLEQumsQcWKuqWaBHmdlnSfnvJtN9vZIAwAYrsGPrFY5SHztnaYNuH2Gbf9wYQi6X4MqEeAdd4HkdZqSLZ760gR7mNdPnShciVE4MW86JE3iXDU+70MXagWe/sOXk4PNWeHl1CKYRaqB92fbJ1SC3ARSxwsSv5at32u/7fAc4+ND4hcybE4frhA6W+Nw2bCqrppHymWDl5H0msBS6jTJfaA+UvNPkp3vMqh+8rs47nRH0yIstUb1hxME4Or+nhixObV2+Hp4vS/YlnYGe+/D2lWNWxlWGG9a5KXMGoOgSO3VRARWIof9fC4v5NM9FnhWddlFMnkT8o/4PMejVctP486e+XV75k2W5Gb0iypmgMRBsmWB92d/oqokeRFNxjyZoWwah1JrxLonsOZyJH4El7IXZY3Z6tUW3ZQE5w5woFp2jgQ+vaR2nwjQSmBHULY23uq1Mbr17RBvOrIz4zCv0kVWsdGRTWMBSRP0kP0oEpchPlXB84FtHzm1NxOwbxpxWqeAVRsgdQ3"
                };
                return [4, libs.request_post(pingSecretUrl, headerPing, bodyPing, 'json')];
            case 1:
                resultPing = _a.sent();
                console.log(resultPing, "--------- RESULT PING HUHU -----------");
                signed = "eyJkYXRhIjoie1widGltZVwiOjE2MDg3Mzk1NzM0OTAsXCJ2YWxpZFVudGlsXCI6MTYwODc0MDc3MzQ5MCxcInVzZXJcIjpcIkdNaG9BNDdwSjJRZ2hEWllCR09TUGRwOEdqcnQrd2hldDV6bUFZM0hVb1k9XCIsXCJzdGF0dXNcIjpcImd1ZXN0XCIsXCJ2ZXJpZmllZFwiOmZhbHNlLFwiaXBzXCI6W1wiNTguMTg2LjYxLjE0OFwiXSxcImVycm9yXCI6bnVsbCxcImFwcFwiOntcInBsYXRmb3JtXCI6XCJpb3NcIixcInZlcnNpb25cIjpcIjAuMTguOFwiLFwib2tcIjp0cnVlfX0iLCJzaWduYXR1cmUiOiJxbm5BOUt0cE5HTko3UXlackZKVWx2SkM3NWZZRGJsU1pnOFJlWFdqMEw4cXRxRHRTMUorM2VVWG8yUnYwRkMzQStlZ3MxZUlFVnliVVhLOW9iN0FxSUZXNFdNdnNTUk9YUHhrbTVlckw5UTU3dnNOcWVGVHR5TmxvZmxuUXdpaW53RTFqYmx2aEFkc0J1QTlkYnR4djVKMnkyQ0I1UzNkWHBjb2tiRCs1RzQ9In0=";
                console.log(movieInfo, headerPing, pingSecretUrl, resultPing, signed, '------------------- HUHU PING INFO --------------');
                urlSourcesTv = [
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
                ];
                urlSourcesMovie = [
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
                headerSource = {
                    'watched-sig': signed,
                    'content-type': 'application/json',
                    'Host': "huhu.to"
                };
                sources = movieInfo.type == 'tv' ? urlSourcesTv : urlSourcesMovie;
                bodySourceMovie = JSON.stringify({ "language": "en", "type": movieInfo.type == 'tv' ? 'series' : 'movie', "ids": { "tmdb_id": movieInfo.tmdb_id, imdb_id: movieInfo.imdb_id }, "name": movieInfo.title });
                bodySourceTv = JSON.stringify({ "language": "en", "type": movieInfo.type == 'tv' ? 'series' : 'movie', "ids": { "tmdb_id": movieInfo.tmdb_id }, "name": movieInfo.title });
                bodySource = movieInfo.type == 'tv' ? bodySourceTv : bodySourceMovie;
                arrMap = sources.map(function (urlSource) { return __awaiter(_this, void 0, void 0, function () {
                    var resultSource, arrMapSource, sources_1, _i, _a, episodeInfo, season, episode, arrMapSource;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, libs.request_post(urlSource, headerSource, bodySource, 'json')];
                            case 1:
                                resultSource = _b.sent();
                                console.log(urlSource, headerSource, bodySource, resultSource, '------------------- HUHU SOURCE INFO --------------');
                                if (!resultSource) return [3, 5];
                                if (!(movieInfo.type == 'movie' && resultSource.length > 0)) return [3, 3];
                                arrMapSource = resultSource.map(function (source) { return __awaiter(_this, void 0, void 0, function () {
                                    var embed, fileSize, host;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                embed = source.url;
                                                if (!embed) return [3, 2];
                                                return [4, libs.request_getFileSize(embed)];
                                            case 1:
                                                fileSize = _a.sent();
                                                host = libs.string_getHost(embed);
                                                console.log(embed, fileSize, host, "embed--------------------");
                                                if (fileSize == 0) {
                                                    if (hosts[host]) {
                                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "HUHU" }), callback);
                                                    }
                                                }
                                                else {
                                                    callback({
                                                        file: embed,
                                                        size: fileSize,
                                                        host: host.toUpperCase(),
                                                        provider: "HUHU"
                                                    });
                                                }
                                                _a.label = 2;
                                            case 2: return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrMapSource)];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                if (!(movieInfo.type == 'tv' && resultSource.episodes && resultSource.episodes.length > 0)) return [3, 5];
                                sources_1 = [];
                                for (_i = 0, _a = resultSource.episodes; _i < _a.length; _i++) {
                                    episodeInfo = _a[_i];
                                    season = episodeInfo.season;
                                    episode = episodeInfo.episode;
                                    if (season == movieInfo.season && episode == movieInfo.episode) {
                                        sources_1 = resultSource.sources ? resultSource.sources : [];
                                    }
                                }
                                arrMapSource = sources_1.map(function (source) { return __awaiter(_this, void 0, void 0, function () {
                                    var embed, fileSize, host;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                embed = source.url;
                                                if (!embed) return [3, 2];
                                                return [4, libs.request_getFileSize(embed)];
                                            case 1:
                                                fileSize = _a.sent();
                                                host = libs.string_getHost(embed);
                                                console.log(embed, fileSize, host, "embed--------------------");
                                                if (fileSize == 0) {
                                                    if (hosts[host]) {
                                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "HUHU" }), callback);
                                                    }
                                                }
                                                else {
                                                    callback({
                                                        file: embed,
                                                        size: fileSize,
                                                        host: host.toUpperCase(),
                                                        provider: "HUHU"
                                                    });
                                                }
                                                _a.label = 2;
                                            case 2: return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrMapSource)];
                            case 4:
                                _b.sent();
                                _b.label = 5;
                            case 5: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 2:
                _a.sent();
                return [2];
        }
    });
}); };

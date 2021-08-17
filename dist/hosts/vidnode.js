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
hosts["vidnode"] = function (url, movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var htmlVidcloud, parseVidcloud, source, parse, length, i, file, headerFile, fileSize, typeFile, sourcesEmbed, arrMap, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, libs.request_get(url)];
            case 1:
                htmlVidcloud = _a.sent();
                parseVidcloud = cheerio.load(htmlVidcloud);
                source = htmlVidcloud.match(/sources *\: *([^\]]+)/i);
                source = source ? source[1] + "]" : "[]";
                parse = [];
                source = "parse = " + source;
                eval(source);
                console.log(parse, "------------ SOURCES VIDNODE -------------");
                length = parse.length;
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < length)) return [3, 5];
                file = parse[i].file;
                console.log(parse[i], "------------ SOURCE DETAIL VIDNODE -------------");
                return [4, libs.request_head(file)];
            case 3:
                headerFile = _a.sent();
                fileSize = headerFile["Content-Length"] || headerFile["content-length"];
                typeFile = headerFile["x-goog-storage-class"] || "";
                if (fileSize > 0) {
                    callback({
                        file: file,
                        size: fileSize,
                        host: typeFile ? "Google Video" : "Vidnode",
                        provider: config.provider
                    });
                }
                _a.label = 4;
            case 4:
                i++;
                return [3, 2];
            case 5:
                console.log(parseVidcloud(".linkserver").length, "----------- VIDNODE SEARCH EMBED ----------");
                sourcesEmbed = [];
                parseVidcloud(".linkserver").each(function (keyLink, itemLink) {
                    var embed = parseVidcloud(itemLink).attr("data-video");
                    if (_.startsWith(embed, '/')) {
                        embed = "https:" + embed;
                    }
                    if (embed) {
                        sourcesEmbed.push(embed);
                    }
                });
                console.log(sourcesEmbed, "----------- VIDNODE SOURCES EMBED ----------");
                arrMap = sourcesEmbed.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var host, headerFile, fileSize, typeFile;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                host = libs.string_getHost(embed);
                                return [4, libs.request_head(file)];
                            case 1:
                                headerFile = _a.sent();
                                fileSize = headerFile["Content-Length"] || headerFile["content-length"];
                                typeFile = headerFile["x-goog-storage-class"] || "";
                                console.log(embed, fileSize, host, "vidnode embed--------------------");
                                if (!fileSize || hosts[host]) {
                                    hosts[host](embed, movieInfo, config, callback);
                                }
                                else if (fileSize > 0 && !hosts[host]) {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: typeFile ? "Google Video" : host.toUpperCase(),
                                        provider: config.provider
                                    });
                                }
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 6:
                _a.sent();
                console.log(parseVidcloud(".linkserver").length, "----------- VIDNODE SEARCH EMBED ----------");
                parseVidcloud(".linkserver").each(function (keyLink, itemLink) {
                    var embed = parseVidcloud(itemLink).attr("data-video");
                    if (embed && embed.indexOf("vidcloud9") == -1) {
                        sourcesEmbed.push(embed);
                    }
                });
                console.log(sourcesEmbed, "----------- VIDNODE SOURCES EMBED ----------");
                arrMap = sourcesEmbed.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, libs.request_getFileSize(embed)];
                            case 1:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                if (!fileSize || hosts[host]) {
                                    console.log(embed, fileSize, host, "embed vidnode--------------------");
                                    hosts[host](embed, movieInfo, config, callback);
                                }
                                else if (fileSize > 0 && !hosts[host]) {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: config.provider
                                    });
                                }
                                return [2];
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

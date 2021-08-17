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
hosts["vidnext"] = function (url, movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var htmlVidcloud, parseVidcloud, sources, arrMap, sources, sourceItem, source, parse, length_1, i, file, headerFile, fileSize, typeFile;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, libs.request_get(url)];
            case 1:
                htmlVidcloud = _a.sent();
                parseVidcloud = cheerio.load(htmlVidcloud);
                sources = [];
                console.log(parseVidcloud(".linkserver").length, "----------- vidnext SEARCH EMBED ----------");
                parseVidcloud(".linkserver").each(function (keyLink, itemLink) {
                    var embed = parseVidcloud(itemLink).attr("data-video");
                    if (embed) {
                        if (_.startsWith(embed, "/")) {
                            embed = "https:" + embed;
                        }
                        sources.push(embed);
                    }
                });
                console.log(sources, "----------- vidnext SOURCES EMBED ----------");
                arrMap = sources.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var headerFile, fileSize, typeFile, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, libs.request_head(file)];
                            case 1:
                                headerFile = _a.sent();
                                fileSize = headerFile["Content-Length"] || headerFile["content-length"];
                                typeFile = headerFile["x-goog-storage-class"] || "";
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "vidnext embed--------------------");
                                if (!fileSize || hosts[host]) {
                                    hosts[host](embed, movieInfo, config, callback);
                                }
                                else {
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
            case 2:
                _a.sent();
                sources = htmlVidcloud.match(/sources *\: *([^\]]+)/im);
                sources = sources ? sources : [];
                sourceItem = 1;
                _a.label = 3;
            case 3:
                if (!(sourceItem < sources.length)) return [3, 8];
                source = sources[sourceItem] ? sources[sourceItem] + "]" : "[]";
                parse = [];
                source = "parse = " + source;
                eval(source);
                console.log(parse, "------------ SOURCES vidnext -------------");
                length_1 = parse.length;
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < length_1)) return [3, 7];
                file = parse[i].file;
                console.log(parse[i], "------------ SOURCE DETAIL vidnext -------------");
                return [4, libs.request_head(file)];
            case 5:
                headerFile = _a.sent();
                fileSize = headerFile["Content-Length"] || headerFile["content-length"];
                typeFile = headerFile["x-goog-storage-class"] || "";
                if (fileSize > 0) {
                    callback({
                        file: file,
                        size: fileSize,
                        host: typeFile ? "Google Video" : "Vidnext" + ("" + (parse[i].type == 'hls' ? ' Hls' : '')),
                        provider: config.provider,
                    });
                }
                _a.label = 6;
            case 6:
                i++;
                return [3, 4];
            case 7:
                sourceItem++;
                return [3, 3];
            case 8: return [2];
        }
    });
}); };

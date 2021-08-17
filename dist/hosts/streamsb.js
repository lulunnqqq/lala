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
hosts["streamsb"] = function (url, movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var decode, html, parseHtml, scripts, matching, decodeScript, source, parse, length_1, i, file, fileSize;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                decode = function (p, a, c, k, e, d) {
                    while (c--) {
                        if (k[c]) {
                            p = p.replace(new RegExp('\\b' + c.toString(a) + '\\b', 'g'), k[c]);
                        }
                    }
                    return p;
                };
                return [4, libs.request_get(url)];
            case 1:
                html = _a.sent();
                parseHtml = cheerio.load(html);
                scripts = "";
                parseHtml("script").each(function (key, item) {
                    var script = parseHtml(item).text();
                    if (_.startsWith(script.trim(), "eval")) {
                        scripts = script;
                    }
                });
                console.log(scripts, "--------------- streamsb SCRIPTs ---------");
                if (!(scripts != "")) return [3, 5];
                matching = scripts.match(/return *p *\} *(.*)/i);
                matching = matching ? matching[1].replace(/.$/, "") : "";
                console.log(matching, "--------------- streamsb MATCHING ---------");
                if (!(matching != "")) return [3, 5];
                decodeScript = "";
                eval("decodeScript = decode" + matching);
                console.log(decodeScript, "--------------- streamsb decodeScript ---------");
                if (!(decodeScript != "")) return [3, 5];
                source = decodeScript.match(/sources *\: *([^\]]+)/i);
                source = source ? source[1] + "]" : "[]";
                parse = [];
                source = "parse = " + source;
                eval(source);
                console.log(parse, "--------------- streamsb parse ---------");
                length_1 = parse.length;
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < length_1)) return [3, 5];
                file = parse[i].file;
                console.log(parse[i], "------------ SOURCE DETAIL streamsb -------------");
                return [4, libs.request_getFileSize(file)];
            case 3:
                fileSize = _a.sent();
                if (fileSize > 0) {
                    callback({
                        file: file,
                        size: fileSize,
                        host: "Streamsb",
                        provider: config.provider
                    });
                }
                _a.label = 4;
            case 4:
                i++;
                return [3, 2];
            case 5: return [2];
        }
    });
}); };
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
hosts["mixdrop"] = function (url, movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var as, html, decrypt, token, number1, number2, decrypt2, iframe, embed, file, fileSize;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                as = function (p, a, c, k, e, d) {
                    e = function (c) {
                        return c.toString(36);
                    };
                    if (!''.replace(/^/, String)) {
                        while (c--) {
                            d[c.toString(a)] = k[c] || c.toString(a);
                        }
                        k = [function (e) {
                                return d[e];
                            }];
                        e = function () {
                            return '\\w+';
                        };
                        c = 1;
                    }
                    ;
                    while (c--) {
                        if (k[c]) {
                            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
                        }
                    }
                    return p;
                };
                return [4, libs.request_get(url.replace("/f/", "/e/"), {})];
            case 1:
                html = _a.sent();
                decrypt = html.match(/\) *\} *\} *return *p\} *\( *\'([^\']+) *\' *\, *([0-9]+) *\, *([0-9]+) *\, *\'([^\']+)/i);
                token = decrypt ? decrypt[1] : "";
                number1 = decrypt ? decrypt[2] : 0;
                number2 = decrypt ? decrypt[3] : 0;
                decrypt2 = decrypt ? decrypt[4] : "";
                iframe = as(token, number1, number2, decrypt2.split('|'), 0, {});
                if (!token) {
                    return [2];
                }
                console.log(token, number1, number2, "--------- MIDROP iframe ----------");
                embed = iframe.match(/MDCore.wurl="([^\"]+)/i);
                embed = embed ? embed[1].trim() : "";
                console.log(embed, "--------- MIDROP EMBED ----------");
                if (!embed) return [3, 3];
                if (embed.indexOf("https://") == -1 && embed.indexOf("http://") == -1) {
                    embed = embed.replace("//", "https://");
                }
                file = embed;
                return [4, libs.request_getFileSize(file)];
            case 2:
                fileSize = _a.sent();
                console.log(file, fileSize, "--------- MIDROP FILE DATA ----------");
                if (fileSize > 0) {
                    callback({
                        file: file,
                        size: fileSize,
                        host: "MixDrop",
                        provider: config.provider
                    });
                }
                _a.label = 3;
            case 3: return [2];
        }
    });
}); };

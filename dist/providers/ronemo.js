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
    var domain, url, dataSearch, _i, _a, searchItem, title, ajaxHrefVideo, dataDirect, linkDirect;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (movieInfo.type == 'tv') {
                    return [2];
                }
                domain = "https://ronemo.com";
                url = domain + "/api/video/search?key=" + slugify(movieInfo.title, { lower: true, replacement: '%20', remove: /[*+~.()'"!:@]/g }) + "&scrollId=&start=0&startYt=0&cCode=";
                return [4, libs.request_get(url, {}, 'json')];
            case 1:
                dataSearch = _b.sent();
                console.log(dataSearch, url, '------ RONEMO SEARCH ');
                if (!dataSearch || !dataSearch.success) {
                    return [2];
                }
                _i = 0, _a = dataSearch.data;
                _b.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3, 5];
                searchItem = _a[_i];
                title = searchItem.name;
                console.log(title, title.toLowerCase().indexOf(movieInfo.title.toLowerCase()), title.indexOf(movieInfo.year), searchItem.uuid, '---------- RONEMO MOVIE INFO');
                if (!(title && title.toLowerCase().indexOf(movieInfo.title.toLowerCase()) != -1 && title.indexOf(movieInfo.year) != -1 && searchItem.uuid)) return [3, 4];
                ajaxHrefVideo = "https://ronemo.com/api/video/load-video-info?idVideo=" + searchItem.uuid;
                return [4, libs.request_get(ajaxHrefVideo, {}, 'json')];
            case 3:
                dataDirect = _b.sent();
                console.log(dataDirect, '----------- RONEMO Data Direct');
                if (!dataDirect || !dataDirect.success) {
                    return [3, 4];
                }
                linkDirect = dataDirect.link;
                console.log(linkDirect, '----------- RONEMO linkDirect');
                if (!linkDirect) {
                    return [3, 4];
                }
                callback({
                    file: "https://hls.ronemo.com/" + linkDirect,
                    quality: 'HLS',
                    host: 'Ronemo',
                    provider: "Ronemo"
                });
                _b.label = 4;
            case 4:
                _i++;
                return [3, 2];
            case 5: return [2];
        }
    });
}); };

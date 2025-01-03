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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var operations = [];
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var resolveStartIndex = function (url, nextSetStartIndex) {
    var startIndex = url.indexOf("&startIndex=");
    if (startIndex === -1) {
        return "".concat(url, "&startIndex=").concat(encodeURI(nextSetStartIndex));
    }
    else {
        return url.replace(/&startIndex=[^&]+/, "&startIndex=".concat(encodeURI(nextSetStartIndex)));
    }
};
var getData = function (resolve, reject, session, url) { return __awaiter(void 0, void 0, void 0, function () {
    var response, operationsJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "*/*",
                        Cookie: session.cookie,
                    },
                })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                operationsJson = _a.sent();
                operations = __spreadArray(__spreadArray([], operations, true), operationsJson.listeOperations, true);
                return [4 /*yield*/, sleep(2000)];
            case 3:
                _a.sent();
                console.log(url);
                if (operationsJson.hasNext) {
                    getData(resolve, reject, session, resolveStartIndex(url, operationsJson.nextSetStartIndex));
                }
                else {
                    return [2 /*return*/, resolve()];
                }
                return [2 /*return*/];
        }
    });
}); };
export var getOperations = function (session, account, dateDebut, // "2024-12-20"
dateFin // "2024-12-26"
) { return __awaiter(void 0, void 0, void 0, function () {
    var ts_date_debut, ts_date_fin, limit, url;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ts_date_debut = new Date(dateDebut).getTime();
                ts_date_fin = new Date(dateFin).getTime();
                limit = 90;
                url = "".concat(session.baseUrl, "/").concat(session.regionBankUrl, "/particulier/operations/synthese/detail-comptes/");
                url += "jcr:content.n3.operations.json";
                url += "?grandeFamilleCode=".concat(account.grandeFamilleProduitCode, "&compteIdx=").concat(account.index);
                url += "&idDevise=EUR";
                url += "&dateDebut=".concat(ts_date_debut);
                url += "&dateFin=".concat(ts_date_fin);
                url += "&count=".concat(limit);
                // while (true) {
                //     const response = await fetch(url, {
                //         method: "GET",
                //         headers: {
                //             Accept: "*/*",
                //             Cookie: session.cookie,
                //         },
                //     });
                //     const operationsJson = await response.json();
                //     operations = [...operations, ...operationsJson.listeOperations];
                //     if (operationsJson.hasNext) {
                //         url = `&startIndex=${encodeURI(operationsJson.nextSetStartIndex)}`;
                //     } else {
                //         break;
                //     }
                // }
                return [4 /*yield*/, new Promise(function (r, j) { return getData(r, j, session, url); })];
            case 1:
                // while (true) {
                //     const response = await fetch(url, {
                //         method: "GET",
                //         headers: {
                //             Accept: "*/*",
                //             Cookie: session.cookie,
                //         },
                //     });
                //     const operationsJson = await response.json();
                //     operations = [...operations, ...operationsJson.listeOperations];
                //     if (operationsJson.hasNext) {
                //         url = `&startIndex=${encodeURI(operationsJson.nextSetStartIndex)}`;
                //     } else {
                //         break;
                //     }
                // }
                _a.sent();
                return [2 /*return*/, operations];
        }
    });
}); };

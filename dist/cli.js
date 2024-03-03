"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const waitForTwoSeconds_1 = require("./utils/waitForTwoSeconds");
const task_1 = require("./task");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const getAccessToken = () => {
    return new Promise((resolve) => {
        rl.question("what is your Meta access token", (answer) => {
            resolve(answer);
        });
    });
};
const runCli = () => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield getAccessToken();
    console.log(`Your accessToken is, ${accessToken}!`);
    //requesting for 10 times at a inverval of 2s for demonstration
    //I did not want a forever running app
    for (let i = 0; i < 10; i++) {
        console.log(`request ${i + 1}`);
        yield (0, task_1.makeAPICallAndLogResponse)(accessToken);
        yield (0, waitForTwoSeconds_1.waitTwoSeconds)();
    }
    rl.close();
});
exports.default = runCli;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitTwoSeconds = void 0;
const waitTwoSeconds = () => new Promise(resolve => setTimeout(resolve, 2000));
exports.waitTwoSeconds = waitTwoSeconds;

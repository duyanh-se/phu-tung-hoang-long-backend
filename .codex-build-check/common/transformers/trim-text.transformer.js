"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimText = trimText;
exports.nullableTrimmedText = nullableTrimmedText;
function trimText({ value }) {
    return typeof value === 'string' ? value.trim() : value;
}
function nullableTrimmedText({ value }) {
    return typeof value === 'string' ? value.trim() || null : value;
}
//# sourceMappingURL=trim-text.transformer.js.map
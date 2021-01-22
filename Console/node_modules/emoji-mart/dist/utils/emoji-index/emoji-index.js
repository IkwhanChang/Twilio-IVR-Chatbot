'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _all = require('../../../data/all.json');

var _all2 = _interopRequireDefault(_all);

var _nimbleEmojiIndex = require('./nimble-emoji-index');

var _nimbleEmojiIndex2 = _interopRequireDefault(_nimbleEmojiIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emojiIndex = new _nimbleEmojiIndex2.default(_all2.default);
const { emojis, emoticons } = emojiIndex;

function search() {
  return emojiIndex.search(...arguments);
}

exports.default = { search, emojis, emoticons };
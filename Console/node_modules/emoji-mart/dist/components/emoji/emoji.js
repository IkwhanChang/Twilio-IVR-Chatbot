'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('../../polyfills/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _all = require('../../../data/all.json');

var _all2 = _interopRequireDefault(_all);

var _nimbleEmoji = require('./nimble-emoji');

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

var _sharedProps = require('../../utils/shared-props');

var _sharedDefaultProps = require('../../utils/shared-default-props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Emoji = props => {
  for (let k in Emoji.defaultProps) {
    if (props[k] == undefined && Emoji.defaultProps[k] != undefined) {
      props[k] = Emoji.defaultProps[k];
    }
  }

  return (0, _nimbleEmoji2.default)((0, _extends3.default)({}, props));
};

Emoji.propTypes /* remove-proptypes */ = _sharedProps.EmojiPropTypes;
Emoji.defaultProps = (0, _extends3.default)({}, _sharedDefaultProps.EmojiDefaultProps, { data: _all2.default });

exports.default = Emoji;
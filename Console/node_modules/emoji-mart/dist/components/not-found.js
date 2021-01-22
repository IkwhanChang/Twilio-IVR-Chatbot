'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('../polyfills/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nimbleEmoji = require('./emoji/nimble-emoji');

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotFound extends _react2.default.PureComponent {
  render() {
    const { data, emojiProps, i18n, notFound, notFoundEmoji } = this.props;

    const component = notFound && notFound() || _react2.default.createElement(
      'div',
      { className: 'emoji-mart-no-results' },
      (0, _nimbleEmoji2.default)((0, _extends3.default)({
        data: data
      }, emojiProps, {
        size: 38,
        emoji: notFoundEmoji,
        onOver: null,
        onLeave: null,
        onClick: null
      })),
      _react2.default.createElement(
        'div',
        { className: 'emoji-mart-no-results-label' },
        i18n.notfound
      )
    );

    return component;
  }
}

exports.default = NotFound;
NotFound.propTypes /* remove-proptypes */ = {
  notFound: _propTypes2.default.func.isRequired,
  emojiProps: _propTypes2.default.object.isRequired
};
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

var _utils = require('../utils');

var _nimbleEmoji = require('./emoji/nimble-emoji');

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

var _skinsEmoji = require('./skins-emoji');

var _skinsEmoji2 = _interopRequireDefault(_skinsEmoji);

var _skinsDot = require('./skins-dot');

var _skinsDot2 = _interopRequireDefault(_skinsDot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Preview extends _react2.default.PureComponent {
  constructor(props) {
    super(props);

    this.data = props.data;
    this.state = { emoji: null };
  }

  render() {
    var { emoji } = this.state,
        {
      emojiProps,
      skinsProps,
      showSkinTones,
      title,
      emoji: idleEmoji,
      i18n,
      showPreview
    } = this.props;

    if (emoji && showPreview) {
      var emojiData = (0, _utils.getData)(emoji, null, null, this.data),
          { emoticons = [] } = emojiData,
          knownEmoticons = [],
          listedEmoticons = [];

      emoticons.forEach(emoticon => {
        if (knownEmoticons.indexOf(emoticon.toLowerCase()) >= 0) {
          return;
        }

        knownEmoticons.push(emoticon.toLowerCase());
        listedEmoticons.push(emoticon);
      });

      return _react2.default.createElement(
        'div',
        { className: 'emoji-mart-preview' },
        _react2.default.createElement(
          'div',
          { className: 'emoji-mart-preview-emoji', 'aria-hidden': 'true' },
          (0, _nimbleEmoji2.default)((0, _extends3.default)({
            key: emoji.id,
            emoji: emoji,
            data: this.data
          }, emojiProps))
        ),
        _react2.default.createElement(
          'div',
          { className: 'emoji-mart-preview-data', 'aria-hidden': 'true' },
          _react2.default.createElement(
            'div',
            { className: 'emoji-mart-preview-name' },
            emoji.name
          ),
          _react2.default.createElement(
            'div',
            { className: 'emoji-mart-preview-shortnames' },
            emojiData.short_names.map(short_name => _react2.default.createElement(
              'span',
              { key: short_name, className: 'emoji-mart-preview-shortname' },
              ':',
              short_name,
              ':'
            ))
          ),
          _react2.default.createElement(
            'div',
            { className: 'emoji-mart-preview-emoticons' },
            listedEmoticons.map(emoticon => _react2.default.createElement(
              'span',
              { key: emoticon, className: 'emoji-mart-preview-emoticon' },
              emoticon
            ))
          )
        )
      );
    } else {
      return _react2.default.createElement(
        'div',
        { className: 'emoji-mart-preview' },
        _react2.default.createElement(
          'div',
          { className: 'emoji-mart-preview-emoji', 'aria-hidden': 'true' },
          idleEmoji && idleEmoji.length && (0, _nimbleEmoji2.default)((0, _extends3.default)({ emoji: idleEmoji, data: this.data }, emojiProps))
        ),
        _react2.default.createElement(
          'div',
          { className: 'emoji-mart-preview-data', 'aria-hidden': 'true' },
          _react2.default.createElement(
            'span',
            { className: 'emoji-mart-title-label' },
            title
          )
        ),
        showSkinTones && _react2.default.createElement(
          'div',
          {
            className: `emoji-mart-preview-skins${skinsProps.skinEmoji ? ' custom' : ''}`
          },
          skinsProps.skinEmoji ? _react2.default.createElement(_skinsEmoji2.default, {
            skin: skinsProps.skin,
            emojiProps: emojiProps,
            data: this.data,
            skinEmoji: skinsProps.skinEmoji,
            i18n: i18n,
            onChange: skinsProps.onChange
          }) : _react2.default.createElement(_skinsDot2.default, {
            skin: skinsProps.skin,
            i18n: i18n,
            onChange: skinsProps.onChange
          })
        )
      );
    }
  }
}

exports.default = Preview;
Preview.propTypes /* remove-proptypes */ = {
  showSkinTones: _propTypes2.default.bool,
  title: _propTypes2.default.string.isRequired,
  emoji: _propTypes2.default.string.isRequired,
  emojiProps: _propTypes2.default.object.isRequired,
  skinsProps: _propTypes2.default.object.isRequired
};

Preview.defaultProps = {
  showSkinTones: true,
  onChange: () => {}
};
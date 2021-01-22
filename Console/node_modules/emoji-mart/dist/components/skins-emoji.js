'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nimbleEmoji = require('./emoji/nimble-emoji');

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

var _skins = require('./skins');

var _skins2 = _interopRequireDefault(_skins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SkinsEmoji extends _skins2.default {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { skin, emojiProps, data, skinEmoji, i18n } = this.props;
    const { opened } = this.state;
    const skinToneNodes = [];

    for (let skinTone = 1; skinTone <= 6; skinTone++) {
      const selected = skinTone === skin;
      skinToneNodes.push(_react2.default.createElement(
        'span',
        {
          key: `skin-tone-${skinTone}`,
          className: `emoji-mart-skin-swatch custom${selected ? ' selected' : ''}`
        },
        _react2.default.createElement(
          'span',
          {
            onClick: this.handleClick,
            'data-skin': skinTone,
            className: `emoji-mart-skin-tone-${skinTone}`
          },
          (0, _nimbleEmoji2.default)({
            emoji: skinEmoji,
            data: data,
            skin: skinTone,
            backgroundImageFn: emojiProps.backgroundImageFn,
            native: emojiProps.native,
            set: emojiProps.set,
            sheetSize: emojiProps.sheetSize,
            size: 23
          })
        )
      ));
    }

    return _react2.default.createElement(
      'div',
      {
        className: `emoji-mart-skin-swatches custom${opened ? ' opened' : ''}`
      },
      _react2.default.createElement(
        'div',
        { className: `emoji-mart-skin-text${opened ? ' opened' : ''}` },
        i18n.skintext
      ),
      skinToneNodes
    );
  }
}

exports.default = SkinsEmoji;
SkinsEmoji.propTypes /* remove-proptypes */ = {
  onChange: _propTypes2.default.func,
  skin: _propTypes2.default.number.isRequired,
  emojiProps: _propTypes2.default.object.isRequired,
  skinTone: _propTypes2.default.number,
  skinEmoji: _propTypes2.default.string.isRequired,
  i18n: _propTypes2.default.object
};

SkinsEmoji.defaultProps = {
  onChange: () => {},
  skinTone: null
};
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

var _skins = require('./skins');

var _skins2 = _interopRequireDefault(_skins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SkinsDot extends _skins2.default {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    // if either enter or space is pressed, then execute
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.handleClick(event);
    }
  }

  render() {
    const { skin, i18n } = this.props;
    const { opened } = this.state;
    const skinToneNodes = [];

    for (let skinTone = 1; skinTone <= 6; skinTone++) {
      const selected = skinTone === skin;
      const visible = opened || selected;
      skinToneNodes.push(_react2.default.createElement(
        'span',
        (0, _extends3.default)({
          key: `skin-tone-${skinTone}`,
          className: `emoji-mart-skin-swatch${selected ? ' selected' : ''}`,
          'aria-label': i18n.skintones[skinTone],
          'aria-hidden': !visible
        }, opened ? { role: 'menuitem' } : {}),
        _react2.default.createElement('span', (0, _extends3.default)({
          onClick: this.handleClick,
          onKeyDown: this.handleKeyDown,
          role: 'button'
        }, selected ? {
          'aria-haspopup': true,
          'aria-expanded': !!opened
        } : {}, opened ? { 'aria-pressed': !!selected } : {}, {
          tabIndex: visible ? '0' : '',
          'aria-label': i18n.skintones[skinTone],
          title: i18n.skintones[skinTone],
          'data-skin': skinTone,
          className: `emoji-mart-skin emoji-mart-skin-tone-${skinTone}`
        }))
      ));
    }

    return _react2.default.createElement(
      'section',
      {
        className: `emoji-mart-skin-swatches${opened ? ' opened' : ''}`,
        'aria-label': i18n.skintext
      },
      _react2.default.createElement(
        'div',
        opened ? { role: 'menubar' } : {},
        skinToneNodes
      )
    );
  }
}

exports.default = SkinsDot;
SkinsDot.propTypes /* remove-proptypes */ = {
  onChange: _propTypes2.default.func,
  skin: _propTypes2.default.number.isRequired,
  i18n: _propTypes2.default.object
};

SkinsDot.defaultProps = {
  onChange: () => {}
};
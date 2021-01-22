import _extends from '../polyfills/extends';
import _Object$getPrototypeOf from '../polyfills/objectGetPrototypeOf';
import _classCallCheck from '../polyfills/classCallCheck';
import _createClass from '../polyfills/createClass';
import _possibleConstructorReturn from '../polyfills/possibleConstructorReturn';
import _inherits from '../polyfills/inherits';
import React from 'react';
import PropTypes from 'prop-types';

import Skins from './skins';

var SkinsDot = function (_Skins) {
  _inherits(SkinsDot, _Skins);

  function SkinsDot(props) {
    _classCallCheck(this, SkinsDot);

    var _this = _possibleConstructorReturn(this, (SkinsDot.__proto__ || _Object$getPrototypeOf(SkinsDot)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    return _this;
  }

  _createClass(SkinsDot, [{
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      // if either enter or space is pressed, then execute
      if (event.keyCode === 13 || event.keyCode === 32) {
        this.handleClick(event);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var skin = _props.skin;
      var i18n = _props.i18n;
      var opened = this.state.opened;

      var skinToneNodes = [];

      for (var skinTone = 1; skinTone <= 6; skinTone++) {
        var selected = skinTone === skin;
        var visible = opened || selected;
        skinToneNodes.push(React.createElement(
          'span',
          _extends({
            key: 'skin-tone-' + skinTone,
            className: 'emoji-mart-skin-swatch' + (selected ? ' selected' : ''),
            'aria-label': i18n.skintones[skinTone],
            'aria-hidden': !visible
          }, opened ? { role: 'menuitem' } : {}),
          React.createElement('span', _extends({
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
            className: 'emoji-mart-skin emoji-mart-skin-tone-' + skinTone
          }))
        ));
      }

      return React.createElement(
        'section',
        {
          className: 'emoji-mart-skin-swatches' + (opened ? ' opened' : ''),
          'aria-label': i18n.skintext
        },
        React.createElement(
          'div',
          opened ? { role: 'menubar' } : {},
          skinToneNodes
        )
      );
    }
  }]);

  return SkinsDot;
}(Skins);

export default SkinsDot;


SkinsDot.propTypes /* remove-proptypes */ = {
  onChange: PropTypes.func,
  skin: PropTypes.number.isRequired,
  i18n: PropTypes.object
};

SkinsDot.defaultProps = {
  onChange: function onChange() {}
};
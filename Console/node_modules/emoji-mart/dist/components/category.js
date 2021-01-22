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

var _frequently = require('../utils/frequently');

var _frequently2 = _interopRequireDefault(_frequently);

var _utils = require('../utils');

var _nimbleEmoji = require('./emoji/nimble-emoji');

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

var _notFound = require('./not-found');

var _notFound2 = _interopRequireDefault(_notFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Category extends _react2.default.Component {
  constructor(props) {
    super(props);

    this.data = props.data;
    this.setContainerRef = this.setContainerRef.bind(this);
    this.setLabelRef = this.setLabelRef.bind(this);
  }

  componentDidMount() {
    this.margin = 0;
    this.minMargin = 0;

    this.memoizeSize();
  }

  shouldComponentUpdate(nextProps, nextState) {
    var {
      name,
      perLine,
      native,
      hasStickyPosition,
      emojis,
      emojiProps
    } = this.props,
        { skin, size, set } = emojiProps,
        {
      perLine: nextPerLine,
      native: nextNative,
      hasStickyPosition: nextHasStickyPosition,
      emojis: nextEmojis,
      emojiProps: nextEmojiProps
    } = nextProps,
        { skin: nextSkin, size: nextSize, set: nextSet } = nextEmojiProps,
        shouldUpdate = false;

    if (name == 'Recent' && perLine != nextPerLine) {
      shouldUpdate = true;
    }

    if (name == 'Search') {
      shouldUpdate = !(emojis == nextEmojis);
    }

    if (skin != nextSkin || size != nextSize || native != nextNative || set != nextSet || hasStickyPosition != nextHasStickyPosition) {
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  memoizeSize() {
    if (!this.container) {
      // probably this is a test environment, e.g. jest
      this.top = 0;
      this.maxMargin = 0;
      return;
    }
    var parent = this.container.parentElement;
    var { top, height } = this.container.getBoundingClientRect();
    var { top: parentTop } = parent.getBoundingClientRect();
    var { height: labelHeight } = this.label.getBoundingClientRect();

    this.top = top - parentTop + parent.scrollTop;

    if (height == 0) {
      this.maxMargin = 0;
    } else {
      this.maxMargin = height - labelHeight;
    }
  }

  handleScroll(scrollTop) {
    var margin = scrollTop - this.top;
    margin = margin < this.minMargin ? this.minMargin : margin;
    margin = margin > this.maxMargin ? this.maxMargin : margin;

    if (margin == this.margin) return;

    if (!this.props.hasStickyPosition) {
      this.label.style.top = `${margin}px`;
    }

    this.margin = margin;
    return true;
  }

  getEmojis() {
    var { name, emojis, recent, perLine } = this.props;

    if (name == 'Recent') {
      let { custom } = this.props;
      let frequentlyUsed = recent || _frequently2.default.get(perLine);

      if (frequentlyUsed.length) {
        emojis = frequentlyUsed.map(id => {
          const emoji = custom.filter(e => e.id === id)[0];
          if (emoji) {
            return emoji;
          }

          return id;
        }).filter(id => !!(0, _utils.getData)(id, null, null, this.data));
      }

      if (emojis.length === 0 && frequentlyUsed.length > 0) {
        return null;
      }
    }

    if (emojis) {
      emojis = emojis.slice(0);
    }

    return emojis;
  }

  updateDisplay(display) {
    var emojis = this.getEmojis();

    if (!emojis || !this.container) {
      return;
    }

    this.container.style.display = display;
  }

  setContainerRef(c) {
    this.container = c;
  }

  setLabelRef(c) {
    this.label = c;
  }

  render() {
    var {
      id,
      name,
      hasStickyPosition,
      emojiProps,
      i18n,
      notFound,
      notFoundEmoji
    } = this.props,
        emojis = this.getEmojis(),
        labelStyles = {},
        labelSpanStyles = {},
        containerStyles = {};

    if (!emojis) {
      containerStyles = {
        display: 'none'
      };
    }

    if (!hasStickyPosition) {
      labelStyles = {
        height: 28
      };

      labelSpanStyles = {
        position: 'absolute'
      };
    }

    const label = i18n.categories[id] || name;

    return _react2.default.createElement(
      'section',
      {
        ref: this.setContainerRef,
        className: 'emoji-mart-category',
        'aria-label': label,
        style: containerStyles
      },
      _react2.default.createElement(
        'div',
        {
          style: labelStyles,
          'data-name': name,
          className: 'emoji-mart-category-label'
        },
        _react2.default.createElement(
          'span',
          {
            style: labelSpanStyles,
            ref: this.setLabelRef,
            'aria-hidden': true /* already labeled by the section aria-label */
          },
          label
        )
      ),
      _react2.default.createElement(
        'ul',
        { className: 'emoji-mart-category-list' },
        emojis && emojis.map(emoji => _react2.default.createElement(
          'li',
          {
            key: emoji.short_names && emoji.short_names.join('_') || emoji
          },
          (0, _nimbleEmoji2.default)((0, _extends3.default)({ emoji: emoji, data: this.data }, emojiProps))
        ))
      ),
      emojis && !emojis.length && _react2.default.createElement(_notFound2.default, {
        i18n: i18n,
        notFound: notFound,
        notFoundEmoji: notFoundEmoji,
        data: this.data,
        emojiProps: emojiProps
      })
    );
  }
}

exports.default = Category;
Category.propTypes /* remove-proptypes */ = {
  emojis: _propTypes2.default.array,
  hasStickyPosition: _propTypes2.default.bool,
  name: _propTypes2.default.string.isRequired,
  native: _propTypes2.default.bool.isRequired,
  perLine: _propTypes2.default.number.isRequired,
  emojiProps: _propTypes2.default.object.isRequired,
  recent: _propTypes2.default.arrayOf(_propTypes2.default.string),
  notFound: _propTypes2.default.func,
  notFoundEmoji: _propTypes2.default.string.isRequired
};

Category.defaultProps = {
  emojis: [],
  hasStickyPosition: true
};
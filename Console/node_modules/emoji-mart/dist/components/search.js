'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _svgs = require('../svgs');

var _nimbleEmojiIndex = require('../utils/emoji-index/nimble-emoji-index');

var _nimbleEmojiIndex2 = _interopRequireDefault(_nimbleEmojiIndex);

var _index = require('../utils/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let id = 0;

class Search extends _react2.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      icon: _svgs.search.search,
      isSearching: false,
      id: ++id
    };

    this.data = props.data;
    this.emojiIndex = new _nimbleEmojiIndex2.default(this.data);
    this.setRef = this.setRef.bind(this);
    this.clear = this.clear.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    // throttle keyboard input so that typing isn't delayed
    this.handleChange = (0, _index.throttleIdleTask)(this.handleChange.bind(this));
  }

  componentDidMount() {
    // in some cases (e.g. preact) the input may already be pre-populated
    // this.input is undefined in Jest tests
    if (this.input && this.input.value) {
      this.search(this.input.value);
    }
  }

  search(value) {
    if (value == '') this.setState({
      icon: _svgs.search.search,
      isSearching: false
    });else this.setState({
      icon: _svgs.search.delete,
      isSearching: true
    });

    this.props.onSearch(this.emojiIndex.search(value, {
      emojisToShowFilter: this.props.emojisToShowFilter,
      maxResults: this.props.maxResults,
      include: this.props.include,
      exclude: this.props.exclude,
      custom: this.props.custom
    }));
  }

  clear() {
    if (this.input.value == '') return;
    this.input.value = '';
    this.input.focus();
    this.search('');
  }

  handleChange() {
    this.search(this.input.value);
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.clear();
    }
  }

  setRef(c) {
    this.input = c;
  }

  render() {
    const { i18n, autoFocus } = this.props;
    const { icon, isSearching, id } = this.state;
    const inputId = `emoji-mart-search-${id}`;

    return _react2.default.createElement(
      'section',
      { className: 'emoji-mart-search', 'aria-label': i18n.search },
      _react2.default.createElement('input', {
        id: inputId,
        ref: this.setRef,
        type: 'search',
        onChange: this.handleChange,
        placeholder: i18n.search,
        autoFocus: autoFocus
      }),
      _react2.default.createElement(
        'label',
        { className: 'emoji-mart-sr-only', htmlFor: inputId },
        i18n.search
      ),
      _react2.default.createElement(
        'button',
        {
          className: 'emoji-mart-search-icon',
          onClick: this.clear,
          onKeyUp: this.handleKeyUp,
          'aria-label': i18n.clear,
          disabled: !isSearching
        },
        icon()
      )
    );
  }
}

exports.default = Search;
Search.propTypes /* remove-proptypes */ = {
  onSearch: _propTypes2.default.func,
  maxResults: _propTypes2.default.number,
  emojisToShowFilter: _propTypes2.default.func,
  autoFocus: _propTypes2.default.bool
};

Search.defaultProps = {
  onSearch: () => {},
  maxResults: 75,
  emojisToShowFilter: null,
  autoFocus: false
};
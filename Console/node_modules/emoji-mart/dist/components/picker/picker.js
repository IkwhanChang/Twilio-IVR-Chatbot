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

var _nimblePicker = require('./nimble-picker');

var _nimblePicker2 = _interopRequireDefault(_nimblePicker);

var _sharedProps = require('../../utils/shared-props');

var _sharedDefaultProps = require('../../utils/shared-default-props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Picker extends _react2.default.PureComponent {
  render() {
    return _react2.default.createElement(_nimblePicker2.default, (0, _extends3.default)({}, this.props, this.state));
  }
}

exports.default = Picker;
Picker.propTypes /* remove-proptypes */ = _sharedProps.PickerPropTypes;
Picker.defaultProps = (0, _extends3.default)({}, _sharedDefaultProps.PickerDefaultProps, { data: _all2.default });
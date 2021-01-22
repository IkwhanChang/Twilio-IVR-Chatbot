'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _skinsDot = require('../skins-dot');

var _skinsDot2 = _interopRequireDefault(_skinsDot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

test('click dot to expand the menu', () => {
  let currentSkin;
  const onChange = skin => {
    currentSkin = skin;
  };
  const i18n = {
    skintones: {
      1: 'Default Skin Tone',
      2: 'Light Skin Tone',
      3: 'Medium-Light Skin Tone',
      4: 'Medium Skin Tone',
      5: 'Medium-Dark Skin Tone',
      6: 'Dark Skin Tone'
    }
  };

  const skins = (0, _enzyme.shallow)(_react2.default.createElement(_skinsDot2.default, { skin: 1, onChange: onChange, i18n: i18n }));

  // component should be un-expanded by default
  expect(skins.find('[aria-haspopup]').prop('aria-label')).toEqual('Default Skin Tone');
  expect(skins.find('[aria-haspopup]').prop('aria-expanded')).toEqual(false);

  // simulate click
  skins.find('[aria-haspopup]').simulate('click', {
    currentTarget: {
      getAttribute(name) {
        if (name === 'data-skin') {
          return 1;
        }
      }
    }
  });

  // component should now be expanded
  expect(skins.find('[aria-haspopup]').prop('aria-expanded')).toEqual(true);
  expect(skins.find('[data-skin=1]').prop('aria-pressed')).toEqual(true);
  expect(skins.find('[data-skin=2]').prop('aria-pressed')).toEqual(false);
});
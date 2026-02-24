"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useIsCaptured = void 0;

var _react = require("react");

var _reactNative = require("react-native");

const {
  IsScreenCapturedIos
} = _reactNative.NativeModules;
const emitter = new _reactNative.NativeEventEmitter(IsScreenCapturedIos);

const useIsCaptured = () => {
  const [isCaptured, setIsCaptured] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    async function setInitialState() {
      const isScreenCaptured = await IsScreenCapturedIos.getIsCaptured();
      setIsCaptured(isScreenCaptured);
    }

    setInitialState();
    const subscription = emitter.addListener('isScreenCaptured', data => {
      setIsCaptured(data);
    });
    return () => {
      subscription.remove();
    };
  }, []);
  return isCaptured;
};

exports.useIsCaptured = useIsCaptured;
var _default = IsScreenCapturedIos;
exports.default = _default;
//# sourceMappingURL=index.js.map
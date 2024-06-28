module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts'],
  dependencies: {
    '@jesster2k10/react-native-range-slider': {
      platforms: {
        android: {
          packageImportPath:
            'import com.jesster2k10reactnativerangeslider.ReactNativeRangeSliderPackage;',
        },
      },
    },
  },
};

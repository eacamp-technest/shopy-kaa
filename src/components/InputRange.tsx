import React from 'react';
import {Dimensions, StyleSheet, View, TextInput} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import {colors} from 'theme/colors';

interface IInputRange {
  min: number;
  max: number;
  steps: number;
  title: string;
  onChange: (value: {min: number; max: number}) => void;
}

interface GestureContext {
  startX: number;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const KONBSIZE = 20;
const WIDTH = Dimensions.get('window').width - 40;

export const InputRange: React.FC<IInputRange> = ({
  min,
  max,
  steps,
  title,
  onChange,
}) => {
  const MAXWIDTH = WIDTH - KONBSIZE / 2 + 6;
  const xKnob1 = useSharedValue(0);
  const scaleKnob1 = useSharedValue(1);
  const xKnob2 = useSharedValue(MAXWIDTH);
  const scaleKnob2 = useSharedValue(1);

  const gestureHandler1 = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (_, ctx) => {
      ctx.startX = xKnob1.value;
    },
    onActive: (event, ctx) => {
      scaleKnob1.value = 1.3;
      xKnob1.value =
        ctx.startX + event.translationX < 0
          ? 0
          : ctx.startX + event.translationX > MAXWIDTH
          ? MAXWIDTH
          : ctx.startX + event.translationX;
      runOnJS(onChange)({
        min:
          Math.round((min + (xKnob1.value / MAXWIDTH) * (max - min)) / steps) *
          steps,
        max:
          Math.round((min + (xKnob2.value / MAXWIDTH) * (max - min)) / steps) *
          steps,
      });
    },
    onEnd: () => {
      scaleKnob1.value = 1;
      runOnJS(onChange)({
        min:
          Math.round((min + (xKnob1.value / MAXWIDTH) * (max - min)) / steps) *
          steps,
        max:
          Math.round((min + (xKnob2.value / MAXWIDTH) * (max - min)) / steps) *
          steps,
      });
    },
  });

  const gestureHandler2 = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (_, ctx) => {
      ctx.startX = xKnob2.value;
    },
    onActive: (event, ctx) => {
      scaleKnob2.value = 1.3;
      xKnob2.value =
        ctx.startX + event.translationX < xKnob1.value
          ? xKnob1.value
          : ctx.startX + event.translationX > MAXWIDTH
          ? MAXWIDTH
          : ctx.startX + event.translationX;
      runOnJS(onChange)({
        min:
          Math.round((min + (xKnob1.value / MAXWIDTH) * (max - min)) / steps) *
          steps,
        max:
          Math.round((min + (xKnob2.value / MAXWIDTH) * (max - min)) / steps) *
          steps,
      });
    },
    onEnd: () => {
      scaleKnob2.value = 1;
      runOnJS(onChange)({
        min:
          Math.round((min + (xKnob1.value / MAXWIDTH) * (max - min)) / steps) *
          steps,
        max:
          Math.round((min + (xKnob2.value / MAXWIDTH) * (max - min)) / steps) *
          steps,
      });
    },
  });

  const styleLine = useAnimatedStyle(() => {
    return {
      backgroundColor: 'orange',
      height: 3,
      marginTop: -3,
      borderRadius: 3,
      width: xKnob2.value - xKnob1.value,
      transform: [{translateX: xKnob1.value}],
    };
  });

  const styleKnob1 = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: xKnob1.value},
        {
          scale: scaleKnob1.value,
        },
      ],
    };
  });

  const styleKnob2 = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: xKnob2.value},
        {
          scale: scaleKnob2.value,
        },
      ],
    };
  });

  const propsLabel1 = useAnimatedProps(() => {
    return {
      value: `${
        Math.round((min + (xKnob1.value / MAXWIDTH) * (max - min)) / steps) *
        steps
      }`,
    };
  });

  const propsLabel2 = useAnimatedProps(() => {
    return {
      value: `${
        Math.round((min + (xKnob2.value / MAXWIDTH) * (max - min)) / steps) *
        steps
      }`,
    };
  });

  return (
    <View style={styles.rangeContainer}>
      <View style={styles.labelsContainer}>
        <AnimatedTextInput
          editable={false}
          style={styles.label}
          animatedProps={propsLabel1}
        />
        <AnimatedTextInput
          editable={false}
          style={styles.label}
          animatedProps={propsLabel2}
        />
      </View>

      <View style={styles.track} />
      <Animated.View style={styleLine} />
      <View>
        <PanGestureHandler onGestureEvent={gestureHandler1}>
          <Animated.View style={[styles.knob, styleKnob1]} />
        </PanGestureHandler>
        <PanGestureHandler onGestureEvent={gestureHandler2}>
          <Animated.View style={[styles.knob, styleKnob2]} />
        </PanGestureHandler>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#333',
    fontSize: 12,
  },
  track: {
    height: 2,
    backgroundColor: '#cccdb2',
    borderRadius: 3,
  },
  knob: {
    position: 'absolute',
    height: KONBSIZE,
    width: KONBSIZE,
    borderRadius: KONBSIZE / 2,
    backgroundColor: colors.primary.base,
    borderColor: colors.primary.base,
    borderWidth: 2,
    marginTop: -KONBSIZE + 8,
    marginLeft: -8,
  },
  rangeContainer: {
    backgroundColor: '#fff',
    borderColor: colors.sky.light,
    borderBottomWidth: 1,
  },
  labelsContainer: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
});

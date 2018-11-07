import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Screen } from 'react-native-screens';
import { BlurView } from 'react-native-blur';
import createPointerEventsContainer from './createPointerEventsContainer';

const EPS = 1e-5;

function getAccessibilityProps(isActive) {
  if (Platform.OS === 'ios') {
    return {
      accessibilityElementsHidden: !isActive,
    };
  } else if (Platform.OS === 'android') {
    return {
      importantForAccessibility: isActive ? 'yes' : 'no-hide-descendants',
    };
  } else {
    return null;
  }
}

/**
 * Component that renders the scene as card for the <StackView />.
 */
class Card extends React.Component {
  render() {
    const {
      children,
      pointerEvents,
      style,
      position,
      transparent,
      scene: { index, isActive },
      scenes,
    } = this.props;

    const active =
      transparent || isActive
        ? 1
        : position.interpolate({
            inputRange: [index, index + 1 - EPS, index + 1],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
          });

    return (
      <Screen
        pointerEvents={pointerEvents}
        onComponentRef={this.props.onComponentRef}
        style={[transparent ? styles.transparent : styles.main, style]}
        active={active}
        {...getAccessibilityProps(isActive)}
      >
        {children}
        {this.renderBlur()}
      </Screen>
    );
  }

  renderBlur() {
    const { hasBlurView, scene, scenes } = this.props;

    if (hasBlurView && hasBlurView({ scene, scenes })) {
      return <BlurView blurType="dark" blurAmount={5} style={styles.shade} />;
    }

    return null;
  }
}

const styles = StyleSheet.create({
  main: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E9E9EF',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  transparent: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  shade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
});

export default createPointerEventsContainer(Card);

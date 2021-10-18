import React, { useRef, useState } from "react";
import { PanResponder, View } from 'react-native';
import PropTypes from 'prop-types';

const SwipeTicker = ({ style, step, children, onValueChange, onMove, isHorizontal, isInverted, onRelease }) => {

    let value = 0;
    let startTime = 0;

    const handleSwipe = (event, gestureState) => {
        let currentValue = 0;

        if(isHorizontal){
            currentValue = Math.round(gestureState.dx/step);
        }
        else {
            currentValue = Math.round(gestureState.dy/step);
        }

        if(!isInverted) currentValue = -currentValue
        if(currentValue===-0) currentValue = 0;

        const onMoveParams = {
            x: gestureState.moveX,
            y: gestureState.moveY,
            value: currentValue,
            dx: gestureState.dx,
            dy: gestureState.dy,
            tounchID: gestureState.stateID
        };

        if(onMove) onMove(onMoveParams);
                
        if(currentValue!==value){
            if(onValueChange) onValueChange(currentValue-value);
            value = currentValue;
        }
    }

    const handleRelease = () => {
        const duration = Date.now() - startTime;
        if(onRelease) onRelease(value, duration);
        value = 0;
        startTime = 0;
    }

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: () => {
            return true;
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderMove: (...args) => handleSwipe(...args),
        onPanResponderRelease: handleRelease,
        onPanResponderGrant: () => {startTime = Date.now()}
    })).current;

    return (
        <View {...panResponder.panHandlers} style={style}>
            {children}
        </View>
    )
}

SwipeTicker.propTypes={
    step: PropTypes.number,
    onValueChange: PropTypes.func,
    onMove: PropTypes.func,
    onRelease: PropTypes.func,
    isHorizontal: PropTypes.bool,
    isInverted: PropTypes.bool,
    style: PropTypes.any
}

SwipeTicker.defaultProps={
    step: 20,
    isHorizontal: false,
    isInverted: false
}

export default SwipeTicker;
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  Dimensions
} from 'react-native';
import SwipeTicker from './react-native-swipe-ticker';

const Example = () => {

const [playerCount, setPlayerCount] = React.useState(2);
const midBarAnim = React.useRef(new Animated.Value(Dimensions.get('window').width*0.5)).current;

const PlayerElement = props => {

  const [number, setNumber] = React.useState(30);
  
  let rotation = '0deg';
  if(props.pos == 'top') rotation = '180deg';
  if(props.pos == 'left') rotation = '90deg';
  if(props.pos == 'right') rotation = '270deg';

  return(
    <View trans style={[styles.playerContainer, {transform: [{ rotate: rotation }]}]}>
      <Pressable onPress={()=>setNumber(prevVal => prevVal-1)} style={styles.buttonStyle}>
        <Text style={{fontSize: 20, color: 'white'}}> - </Text>      
      </Pressable>
      <SwipeTicker step={8} isHorizontal={props.isHorizontal} isInverted={props.isInverted} onRelease={(data, duration) => console.log(duration)} onValueChange={(val => setNumber(prevVal =>  prevVal+val))} style={styles.playerValueContainer}>
        <Text style={{fontSize: 20, color: 'white'}}>{number}</Text>
      </SwipeTicker>
      <Pressable onPress={()=>setNumber(prevVal => prevVal+1)} style={styles.buttonStyle}>
        <Text style={{fontSize:20, color: 'white'}}> + </Text>
      </Pressable>
    </View>
    )
  }



  let topElement = 
  <View style={styles.backgroundStyle}>
    <PlayerElement isInverted={true} pos={'top'}></PlayerElement>
  </View>;
  let bottomElement = 
  <View style={styles.backgroundStyle}>
    <PlayerElement pos={'bottom'}></PlayerElement>
  </View>

  if(playerCount>2){
    topElement = 
    <View style={[styles.backgroundStyle,{flexDirection: 'row'}]}>
      <View style={styles.playerElementStyle}>
        <PlayerElement isHorizontal={true} isInverted={true} pos={'left'}></PlayerElement>
      </View>
        <View style={styles.playerElementStyle}>
          <PlayerElement isHorizontal={true} pos={'right'}></PlayerElement>
        </View>      
    </View>
  }
  if(playerCount>3){
    bottomElement = 
    <View style={[styles.backgroundStyle,{flexDirection: 'row'}]}>
      <View style={styles.playerElementStyle}>
        <PlayerElement isHorizontal={true} isInverted={true} pos={'left'}></PlayerElement>
      </View>
        <View style={styles.playerElementStyle}>
          <PlayerElement isHorizontal={true} pos={'right'}></PlayerElement>
        </View>      
    </View>
  }


  const moveLeft = () => {
    Animated.timing(midBarAnim, {
      toValue: -Dimensions.get('window').width*0.5,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  const moveBack = () => {
    console.log('moveback')
    Animated.timing(midBarAnim, {
      toValue: Dimensions.get('window').width*0.5,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  const onMidBarSwipe = (data, time, isOpening) => {
    if (time>400) return;
    if (data<2) return;
    if (isOpening){
      moveLeft();
    }
    else{
      moveBack();
    }
  }

  const onMidBarPress = (number) => {
    setPlayerCount(number)
  }

  const midBar = 
  <Animated.View style={[styles.midBarStyle, {transform: [{ translateX: midBarAnim }]}]}>
    <View style={[styles.midBarStyle, {width: '50%'}]}>
      <SwipeTicker style={styles.midBarContent} onRelease={(data, time) => onMidBarSwipe(data, time, true)} isHorizontal={true}>
        <Text style={{fontSize: 12}}>Swipe left to adjust number of players</Text>
      </SwipeTicker>    
    </View>
    <View style={[styles.midBarStyle, {width: '50%'}]}>
      <SwipeTicker style={[styles.midBarContent, {flexDirection: 'row', justifyContent: 'space-around'}]} onRelease={(data, time) => onMidBarSwipe(data, time, false)} isInverted={true} isHorizontal={true}>
        <Pressable style={styles.midBarButtonStyle} onPress={()=>onMidBarPress(2)}>
          <Text style={{fontSize: 14}}>2</Text>
        </Pressable>
        <Pressable style={styles.midBarButtonStyle} onPress={()=>onMidBarPress(3)}>
          <Text style={{fontSize: 14}}>3</Text>
        </Pressable>
        <Pressable style={styles.midBarButtonStyle} onPress={()=>onMidBarPress(4)}>
          <Text style={{fontSize: 14}}>4</Text>
        </Pressable>
      </SwipeTicker>    
    </View>
  </Animated.View>

  return (
    <View style={styles.backgroundStyle}>
        {topElement}
        {midBar}
        {bottomElement}
    </View>
    );
  };

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    width: "100%",
    alignItems:'center',
    justifyContent: 'center'
  },
  midBarContent: {
    height: '100%',
    width: "100%",
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray'
  },
  playerElementStyle: {
    flex: 1,
    width: "50%",
    alignItems:'center',
    justifyContent: 'center'
  },
  playerContainer: {
    alignItems:'center',
    justifyContent: 'center',
    flexDirection:'row'
  },
  playerValueContainer:{
    width: 80,
    height: 80,
    backgroundColor: 'green',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2
  },
  buttonStyle:{
    width: 60,
    height: 60,
    backgroundColor: 'green',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  midBarStyle: {
    width: '200%',
    height: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  midBarButtonStyle: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20
  }
});

export default Example;

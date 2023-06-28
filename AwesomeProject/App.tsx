/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import axios from 'axios';
import AxisPad from 'react-native-axis-pad';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  Alert
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function processArm(){
  fetch('http://127.0.0.1:5000/arm', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'ArmDrone'
      }),
    })
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
}

// function checkArm(){
//   fetch('http://127.0.0.1:5000/checkArm')
//   .then(response => response.json())
//   .then(data => {
   
//   })
//   .catch(error => {
//     console.error(error);
//   });
// }

const processThrottle = async (throttleCommand, ThrottleSS) => {
  console.log(typeof(throttleCommand));
  await axios.post('http://127.0.0.1:5000/throttle', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: throttleCommand,
    stepSize: ThrottleSS
    })
    // console.log("exited processThrottle")
      // .then(response => response.json())
      // .catch(error => {
      //   console.error(error);
      // });
}

const processRudder = async (rudderCommand, RudderSS) => {
  console.log(typeof(rudderCommand));
  await axios.post('http://127.0.0.1:5000/rudder', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: rudderCommand,
    stepSize: RudderSS
    })
    // console.log("exited processThrottle")
      // .then(response => response.json())
      // .catch(error => {
      //   console.error(error);
      // });
}

const processElevation = async (pitchCommand, ElevatorSS) => {
  console.log(typeof(pitchCommand));
  await axios.post('http://127.0.0.1:5000/elevator', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: pitchCommand,
    stepSize: ElevatorSS
    })
    // console.log("exited processThrottle")
      // .then(response => response.json())
      // .catch(error => {
      //   console.error(error);
      // });
}

const processAileron = async (aileronCommand, AileronSS) => {
  console.log(typeof(aileronCommand));
  await axios.post('http://127.0.0.1:5000/aileron', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: aileronCommand,
    stepSize: AileronSS
    })
    // console.log("exited processThrottle")
      // .then(response => response.json())
      // .catch(error => {
      //   console.error(error);
      // });
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [ThStepSize, setThStepSize] = useState('');
  const [ThrottleSS, setThrottleSS] = useState('1');

  const [ElStepSize, setElStepSize] = useState('');
  const [ElevatorSS, setElevatorSS] = useState('1');

  const [RuStepSize, setRuStepSize] = useState('');
  const [RudderSS, setRudderSS] = useState('1');
  
  const [AiStepSize, setAiStepSize] = useState('');
  const [AileronSS, setAileronSS] = useState('1');

  const setThrottleInput = (throttleSS) =>{
    const newValue = parseInt(throttleSS);
      setThStepSize(throttleSS);
      if(!isNaN(parseFloat(throttleSS)) && parseFloat(throttleSS)>=1 && parseFloat(throttleSS)<=10){
        setThrottleSS(throttleSS);
      }
      else{
        setThrottleSS('1');
      }
    }

    const setElevatorInput = (elevatorSS) =>{
      const newValue = parseInt(elevatorSS);
        setElStepSize(elevatorSS);
        if(!isNaN(parseFloat(elevatorSS)) && parseFloat(elevatorSS)>=1 && parseFloat(elevatorSS)<=5){
          setElevatorSS(elevatorSS);
        }
        else{
          setElevatorSS('1');
        }
      }

      const setRudderInput = (rudderSS) =>{
        const newValue = parseInt(rudderSS);
          setRuStepSize(rudderSS);
          if(!isNaN(parseFloat(rudderSS)) && parseFloat(rudderSS)>=1 && parseFloat(rudderSS)<=5){
            setRudderSS(rudderSS);
          }
          else{
            setRudderSS('1');
          }
        }
    
        const setAileronInput = (aileronSS) =>{
          const newValue = parseInt(aileronSS);
            setAiStepSize(aileronSS);
            if(!isNaN(parseFloat(aileronSS)) && parseFloat(aileronSS)>=1 && parseFloat(aileronSS)<=5){
              setAileronSS(aileronSS);
            }
            else{
              setAileronSS('1');
            }
          }
  

  console.log(ThrottleSS);
  console.log(ElevatorSS);
  console.log(RudderSS);
  console.log(AileronSS);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView>
      <Text style={styles.labels}>Throttle Step Size</Text>
      <TextInput style={styles.input} placeholder="Valid Input: [1,10]" keyboardType='numeric' value={ThStepSize} onChangeText={(text)=>setThrottleInput(text)}/>
      <Text style={styles.labels}>Elevator Step Size</Text>
      <TextInput style={styles.input} placeholder="Valid Input: [1,5]" keyboardType='numeric' value={ElStepSize} onChangeText={(text)=>setElevatorInput(text)}/>
      <Text style={styles.labels}>Rudder Step Size</Text>
      <TextInput style={styles.input} placeholder="Valid Input: [1,5]" keyboardType='numeric' value={RuStepSize} onChangeText={(text)=>setRudderInput(text)}/>
      <Text style={styles.labels}>Aileron Step Size</Text>
      <TextInput style={styles.input} placeholder="Valid Input: [1,5]" keyboardType='numeric' value={AiStepSize} onChangeText={(text)=>setAileronInput(text)}/>
      <Button title='Arm Drone' onPress={processArm}/>
      <View style={{flexDirection:'row',justifyContent: 'space-around', alignItems: 'center', marginTop:30}}>
    <AxisPad
        resetOnRelease={true}
        autoCenter={true}
        onValue={({ x, y }) => {
            // values are between -1 and 1
            // var throttleCommand;
            console.log(x, y);
            if (Math.abs(y)>Math.abs(x) && y<0){
                let throttleCommand = "IncThrottle";
                processThrottle(throttleCommand, ThrottleSS)
            }
            else if(Math.abs(y)>Math.abs(x) && y>0){
                let throttleCommand = "DecThrottle";
                processThrottle(throttleCommand, ThrottleSS)
            }
            else if (Math.abs(x)>=Math.abs(y)){
              let rudderCommand = x;
              processRudder(rudderCommand, RudderSS)
          }
            // processThrottle(throttleCommand);
        }} />
    <AxisPad
        resetOnRelease={true}
        autoCenter={true}
        onValue={({ x, y }) => {
            // values are between -1 and 1
            console.log(x,y);
            console.log(typeof(y));
            if (Math.abs(y)>Math.abs(x)){
              let pitchCommand = y;
              processElevation(pitchCommand, ElevatorSS)
          }
          else if(Math.abs(x)>=Math.abs(y)){
              var aileronCommand = x;
              processAileron(aileronCommand, AileronSS)
          }
        }} />
      </View>
      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    borderColor: "black",
    width: "30%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 2,
    marginBottom: 14,
    textAlign: "center",
    alignSelf: "center"
  },
  labels: {
    alignSelf: "center",
    fontSize:20,
    marginTop:15
  }
});


export default App;

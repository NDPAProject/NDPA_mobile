import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// Import Screens
import Fpage from './src/pages/fpage';
import Signin from './src/pages/auth/signin';
import Signup from './src/pages/auth/signup';
import Main from './src/pages/main/index';
import Cprofile from './src/pages/auth/completeProfile';
import Profiledone from './src/pages/auth/profileDone';
import Resetpwd from './src/pages/auth/resetPassword';
import Verifyemail from './src/pages/auth/verifyEmail';
import Createpwd from './src/pages/auth/createNewpass';
import Pwddone from './src/pages/auth/pwdDone';
import LearnSection from './src/pages/learn/index';
import TutorSection from './src/pages/learn/tutor';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

type RootStackParamList = {
  Fpage: undefined;
  Signin: undefined;
  Signup: undefined;
  Main: undefined;
  Cprofile: undefined;
  Profiledone: undefined;
  Resetpwd: undefined;
  Verifyemail: undefined;
  Createpwd: undefined;
  Pwddone: undefined;
  LearnSection: undefined;
  TutorSection: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Fpage">
        <Stack.Screen
          name="Fpage"
          component={Fpage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cprofile"
          component={Cprofile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profiledone"
          component={Profiledone}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Resetpwd"
          component={Resetpwd}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Verifyemail"
          component={Verifyemail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Createpwd"
          component={Createpwd}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pwddone"
          component={Pwddone}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LearnSection"
          component={LearnSection}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TutorSection"
          component={TutorSection}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

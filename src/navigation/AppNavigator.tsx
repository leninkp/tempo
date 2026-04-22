import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { S01_Welcome } from '../screens/onboarding/S01_Welcome';
import { S02_Goals } from '../screens/onboarding/S02_Goals';
import { S03_Experience } from '../screens/onboarding/S03_Experience';
import { S04_Schedule } from '../screens/onboarding/S04_Schedule';
import { S05_Metrics } from '../screens/onboarding/S05_Metrics';
import { S06_Account } from '../screens/onboarding/S06_Account';
import { S07_Building } from '../screens/onboarding/S07_Building';
import { S08_Ready } from '../screens/onboarding/S08_Ready';
import { S09_StartTraining } from '../screens/app/S09_StartTraining';
import { S10_LogSet } from '../screens/app/S10_LogSet';
import { S11_Library } from '../screens/app/S11_Library';
import { S12_Progress } from '../screens/app/S12_Progress';
import { S13_Rewards } from '../screens/app/S13_Rewards';
import { S14_Profile } from '../screens/app/S14_Profile';

export type RootStackParamList = {
  Welcome: undefined;
  Goals: undefined;
  Experience: undefined;
  Schedule: undefined;
  Metrics: undefined;
  Account: undefined;
  Building: undefined;
  Ready: undefined;
  StartTraining: undefined;
  LogSet: undefined;
  Library: undefined;
  Progress: undefined;
  Rewards: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right', contentStyle: { backgroundColor: '#000' } }}>
        <Stack.Screen name="Welcome">
          {({ navigation }) => (
            <S01_Welcome onCreateAccount={() => navigation.navigate('Goals')} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Goals">
          {({ navigation }) => (
            <S02_Goals onNext={() => navigation.navigate('Experience')} onBack={() => navigation.goBack()} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Experience">
          {({ navigation }) => (
            <S03_Experience onNext={() => navigation.navigate('Schedule')} onBack={() => navigation.goBack()} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Schedule">
          {({ navigation }) => (
            <S04_Schedule onNext={() => navigation.navigate('Metrics')} onBack={() => navigation.goBack()} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Metrics">
          {({ navigation }) => (
            <S05_Metrics onNext={() => navigation.navigate('Account')} onBack={() => navigation.goBack()} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Account">
          {({ navigation }) => (
            <S06_Account onNext={() => navigation.navigate('Building')} onBack={() => navigation.goBack()} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Building">
          {({ navigation }) => (
            <S07_Building onDone={() => navigation.navigate('Ready')} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Ready">
          {({ navigation }) => (
            <S08_Ready onStart={() => navigation.navigate('StartTraining')} />
          )}
        </Stack.Screen>
        <Stack.Screen name="StartTraining">
          {({ navigation }) => (
            <S09_StartTraining onStart={() => navigation.navigate('LogSet')} />
          )}
        </Stack.Screen>
        <Stack.Screen name="LogSet" component={S10_LogSet} />
        <Stack.Screen name="Library" component={S11_Library} />
        <Stack.Screen name="Progress" component={S12_Progress} />
        <Stack.Screen name="Rewards" component={S13_Rewards} />
        <Stack.Screen name="Profile" component={S14_Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'TRenderEngineProvider: Support for defaultProps', 
]);


import React from 'react';
import Main from './main';


export default function App() {
  return <Main />;
}

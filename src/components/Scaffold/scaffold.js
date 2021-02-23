import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

function Scaffold({children}) {
  return <SafeAreaView>{children}</SafeAreaView>;
}

export default Scaffold;

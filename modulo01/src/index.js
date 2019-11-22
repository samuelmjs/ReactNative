import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';

import './config/ReactotronConfig';

function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Hello World</Text>
      </SafeAreaView>
    </>
  );
}

export default App;

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './components/store/store';
import SwitchNavigator from './components/navigation/navigators';
import MainHeader from './components/screens/MainHeader';
import NavigationService from './components/navigation/NavigatorService';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainHeader/>
          <SwitchNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

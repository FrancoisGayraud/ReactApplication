import React from 'react';
import {StackNavigator, SwitchNavigator, TabNavigator} from 'react-navigation';
import Login from '../screens/Login';
import uiTheme from '../ui/materialVariable';
import Home from '../screens/Home/Home';
import PreLogin from '../screens/PreLogin';
import Inspection from '../screens/Inspection/Inspection';
import Settings from '../screens/Settings';
import Client from '../screens/Client/Client';
import ClientInfoModal from '../screens/Client/ClientInfoModal';
import RatingModal from '../screens/Inspection/RatingModal';
import {TabBarBottom} from 'react-navigation';
import {Icon} from 'react-native-elements';

const StackNavigatorOptions = {
  navigationOptions: {
    header: null
  }
};

const ModalNavigationOptions = {
  tabBarVisible: false,
  swipeEnabled: false
}

const ClientStack = StackNavigator({
    Client: {
      screen: Client
    },
    ClientInfoModal: {
      screen: ClientInfoModal,
      navigationOptions: ModalNavigationOptions
    },
  },
  StackNavigatorOptions
);

const HomeStack = StackNavigator({
    Home: {
      screen: Home
    },
    ClientInfoModal: {
      screen: ClientInfoModal,
      navigationOptions: ModalNavigationOptions
    },
  },
  StackNavigatorOptions
);

const InspectionStack = StackNavigator({
    Inspection: {
      screen: Inspection
    },
    RatingModal: {
      screen: RatingModal,
      navigationOptions: ModalNavigationOptions
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
  StackNavigatorOptions
);

const AppStack = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />
    },
  },
  Inspection: {
    screen: InspectionStack,
    navigationOptions: {
      tabBarLabel: 'Inspection',
      tabBarIcon: ({ tintColor }) => <Icon name="content-paste" color={tintColor} />
    },
  },
  Client: {
    screen: ClientStack,
    navigationOptions: {
      tabBarLabel: 'Client',
      tabBarIcon: ({tintColor}) => <Icon name="person" color={tintColor}/>
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Mon compte',
      tabBarIcon: ({tintColor}) => <Icon name="build" color={tintColor}/>
    }
  }
}, {
  tabBarPosition: 'bottom',
  tabBarComponent: TabBarBottom,
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: uiTheme.palette.accentColor,
    style: {
      backgroundColor: uiTheme.palette.primaryColor
    }
  }
});

const AuthStack = StackNavigator({Login: Login}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: true
  }
});

export default SwitchNavigator(
  {
    PreLogin: PreLogin,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'PreLogin'
  }
);

import React, {Component} from 'react';
import {View, Platform, NetInfo, AsyncStorage, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import uiTheme from '../ui/materialVariable';
import {Header} from 'react-native-elements';
import BackArrow from './Common/BackArrow';
import {isConnected} from '../action/connectionCheck';

const mapStateToProps = (state) => {
  return {
    loginData: state.loginReducer,
    tokenData: state.tokenReducer,
    modalState: state.modalReducer,
    connectionState: state.connectionCheckReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isConnected: (bool) => dispatch(isConnected(bool)),
  };
};


class MainHeader extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      connection: true,
      firstname: null
    }
  }

  getLeftComponent() {
    if (this.props.modalState.isVisible)
      return (<BackArrow/>);
  }

  //save some data in the AsyncStore which can be retrieve when restarting the app
  saveData(value) {
    AsyncStorage.setItem("firstname", value);
    this.setState({"firstname": value});
  }

  componentDidMount() {
    //listner on the connection status
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done(
      (isConnected) => {
        this.props.isConnected(isConnected);
        this.setState({connection: isConnected});
      }
    );
    AsyncStorage.getItem("firstname").then((value) => {
      this.setState({"firstname": value});
    }).done();
  }

  componentWillUnmount() {
    //remove the listner on connection
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  //triggered when the status of the connection change
  handleConnectionChange = (isConnected) => {

    this.props.isConnected(isConnected);
    this.setState({connection: isConnected});
  };

  render() {
    //set the header in white for IOS
    StatusBar.setBarStyle('light-content', true);
    //save the name of the user in the AsyncStore to have it even when the app auto login with a stored token
    if (this.props.loginData.loginData && this.props.loginData.loginData.data &&
      this.state.firstname !== this.props.loginData.loginData.data.user.firstname) {
      this.saveData(this.props.loginData.loginData.data.user.firstname);
    }
    //height of the header must be higher on IOS because of the status bar being include in the app header
    let height = Platform.select({
      ios: 70,
      android: 50
    });
    return (
      <View>
        {(this.props.tokenData.token && this.props.tokenData.token.apiToken !== 'noToken') &&
        <Header
          leftComponent={this.getLeftComponent()}
          rightComponent={{uri: 'nobo-logo-black.png'}}
          centerComponent={{text: 'Bienvenue ' + this.state.firstname, style: {color: uiTheme.palette.accentColor, fontWeight: 'bold', fontFamily: 'Montserrat-Medium'}}}
          outerContainerStyles={{
            backgroundColor: uiTheme.palette.primaryColor,
            borderBottomWidth: 2,
            borderBottomColor: uiTheme.palette.accentColor,
            height: height
          }}
        />
        }
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);

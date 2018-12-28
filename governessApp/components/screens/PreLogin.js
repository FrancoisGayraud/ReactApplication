import React, {Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {tokenGet, tokenSave, tokenVerify} from '../action/token';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    tokenData: state.tokenReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getToken: () => dispatch(tokenGet()),
    verifyToken: (token) => dispatch(tokenVerify(token)),
    saveToken: (token) => dispatch(tokenSave(token))
  };
};

class PreLogin extends Component<Props> {
  constructor(props) {
    super(props);
    this.isCallMade = false;
  }

  componentDidMount() {
    this.props.getToken();
  }

  componentDidUpdate() {
    console.log(this.props.tokenData)
    if (this.isCallMade === true) {
      //If the token from the cache is still valid go to home
      if (this.props.tokenData.verifySuccess)
        this.props.navigation.push('Home');
      else
        this.props.navigation.navigate('Login');
    }
    //If we got a token and we dont have verified it yet
    else if (this.props.tokenData.token !== null &&
      this.props.tokenData.token.apiToken !== 'noToken' &&
      this.props.tokenData.error === null) {
      this.isCallMade = true;
      this.props.verifyToken(this.props.tokenData.token.apiToken);
    }
    //If we got no token from the cache go to login page
    else if (this.props.tokenData.token !== null &&
      this.props.tokenData.token.apiToken === 'noToken')
      this.props.navigation.navigate('Login');
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator/>
        <StatusBar barStyle="default"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PreLogin);

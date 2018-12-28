import React, {Component} from 'react';
import {View, Image, StatusBar, ActivityIndicator, StyleSheet, Keyboard, Platform} from 'react-native';
import {connect} from 'react-redux';
import {loginAuthenticate, loginReset} from '../action/login';
import {tokenSave} from '../action/token';
import uiTheme from '../ui/materialVariable';
import {Button, Card} from 'react-native-elements'
import {FormValidationMessage, FormLabel, FormInput} from 'react-native-elements'

const mapStateToProps = (state) => {
    return {
        loginData: state.loginReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (username, password) =>
            dispatch(loginAuthenticate(username, password)),
        loginReset: () => dispatch(loginReset()),
        saveToken: (token) => dispatch(tokenSave(token))
    };
};

class Login extends Component<Props> {
    constructor(props) {
        super(props);
        this.username = "";
        this.password = "";
        this.pressed = false;
        this.state = {keyboard: false};
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow, this);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide, this);
  }

  componentDidUpdate() {
    //If login succeed save token to cache and go to home
    if (this.props.loginData.error == "" &&
      this.props.loginData.loginData) {
      this.props.saveToken(this.props.loginData.loginData.apiToken);
      this.props.navigation.navigate('Home');
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow() {
    this.setState({keyboard: true})
  };

  keyboardDidHide() {
    this.setState({keyboard: false})
  };

  handleAuthentication() {
    this.pressed = true;
    this.props.loginReset();
    this.props.authenticate(this.username,
      this.password);
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <View style={styles.container}>
        <Card containerStyle={{height: 500, borderRadius: 30, borderColor: uiTheme.palette.accentColor, borderWidth: 10}} title={""}>
          {!this.state.keyboard && <View style={[styles.subContainer, styles.logoContainer]}>
            <Image style={styles.logo} source={require('governessApp/assets/nobo-logo-black-small.png')}/>
          </View>}
          <View style={styles.subContainer}>
            <FormLabel>E-mail</FormLabel>
            <FormInput underlineColorAndroid={uiTheme.palette.primaryColor}
                       keyboardType="email-address"
                       placeholder={(this.pressed && this.username === "") ? "Email manquant" : "Entrez votre addresse email"}
                       placeholderTextColor={(this.pressed && this.password === "") ? "#f47676" : "#d7d7d7"}
                       onChangeText={(text) => {
                         this.username = text;
                       }}/>
            <FormLabel>Mot de passe</FormLabel>
            <FormInput underlineColorAndroid={uiTheme.palette.primaryColor}
                       secureTextEntry={true}
                       containerStyle={styles.formInput}
                       placeholder={(this.pressed && this.password === "") ? "Mot de passe manquant" : "Entrez votre mot de passe"}
                       placeholderTextColor={(this.pressed && this.password === "") ? "#f47676" : "#d7d7d7"}
                       onChangeText={(text) => {
                         this.password = text;
                       }}/>
            <Button
              raised
              onPress={this.handleAuthentication.bind(this)}
              title={this.props.loginData.isLoading ? '...' : 'connection'}
              backgroundColor={uiTheme.palette.accentColor}
            />
            {(this.props.loginData.error === "Mauvais email ou mot de passe." || this.props.loginData.error === "L'email est invalide.") &&
            <View style={{alignItems: 'center'}}>
              <FormValidationMessage labelStyle={{color: "#f47676"}}>{this.props.loginData.error}</FormValidationMessage>
            </View>}
              <View style={styles.subContainer}/>
          </View>
        </Card>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    width: 280,
  },
  subContainerAndroid: {
    height: 30,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 250,
    height: 250,
  },
  formInput: {
    marginBottom: 30
  },
  logoContainer: {
    alignItems: 'center'
  },
  container: {
    backgroundColor: uiTheme.palette.primaryColor,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

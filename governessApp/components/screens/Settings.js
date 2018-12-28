import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import uiTheme from '../ui/materialVariable';
import {Card, Button} from 'react-native-elements';
import {tokenReset} from '../action/token';
import {loginAuthenticationSuccess} from '../action/login';
import commonStyles from '../ui/commonStyles';

const mapDispatchToProps = (dispatch) => {
  return {
    tokenReset: () => dispatch(tokenReset()),
    setLoginData: () => dispatch(loginAuthenticationSuccess(null))
  };
};


class Settings extends Component<Props> {
  constructor(props) {
    super(props);
  }

  handleDisconnect() {
    this.props.tokenReset();
    this.props.setLoginData();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <Card title="OPTIONS">
          <Button raised
                  icon={{name: 'beach-access'}}
                  onPress={this.handleDisconnect.bind(this)}
                  title='Se déconnecter'
                  backgroundColor={uiTheme.palette.accentColor}
          />
        </Card>
      </View>
    );
  }
}

export default connect(null, mapDispatchToProps)(Settings);

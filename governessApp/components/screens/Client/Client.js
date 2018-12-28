import React, {Component} from 'react';
import {View, Text} from 'react-native';
import commonStyles from '../../ui/commonStyles';
import ClientList from './ClientList';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    connected: state.connectionCheckReducer
  };
};

class Client extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={commonStyles.container}>
        {this.props.connected.connected &&
        <ClientList/>}
        { !this.props.connected.connected &&
        <Text>Vous n'êtes pas connecté à internet</Text>
        }
      </View>
    );
  }
}

export default connect(mapStateToProps, null)(Client);
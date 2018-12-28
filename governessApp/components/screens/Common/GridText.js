import React, {Component} from 'react';
import {View, Text} from 'react-native';
import clientStyles from '../../ui/clientStyles';

export default class GridText extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={clientStyles.buildingAccessSubContainer}>
        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontFamily: 'Montserrat-Medium'}}>{this.props.left}</Text>
        <Text style={{alignSelf: 'center', color: '#4c4c4c', fontFamily: 'Montserrat-Medium'}}>{this.props.right}</Text>
      </View>
    );
  }
}

import React, {Component} from 'react';
import {View} from 'react-native';
import ItemLine from '../Common/ItemLine';

export default class ClientDetails extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <ItemLine
          description={this.props.item.address + ' ' + this.props.item.zipcode}
          iconName="location-on"/>
      </View>
    );
  }
}
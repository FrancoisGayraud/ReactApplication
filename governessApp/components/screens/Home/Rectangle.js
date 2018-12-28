import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import uiTheme from '../../ui/materialVariable';
import NavigationService from '../../navigation/NavigatorService';

export default class Rectangle extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={
          {
            width: this.props.width,
            backgroundColor: (this.props.isNow) ?
              uiTheme.palette.lighterPrimaryColor : uiTheme.palette.primaryColor,
            borderTopWidth: this.props.missionCurr >= 3 ? 0: 2,
            borderTopColor: '#bb2a2e',
            height: this.props.height - 1, left: this.props.position}
        }
        onPress={() => NavigationService.navigate('ClientInfoModal', {addressId: this.props.addressId, clientName: this.props.firstname + ' ' + this.props.lastname})}>
        {!this.props.customer && <Text style={{color: uiTheme.palette.accentColor, fontWeight: 'bold',
          textAlign: 'center', paddingTop: 5, fontSize: 12}}>
          {this.props.start + "\n" + this.props.end}
        </Text>}
        {this.props.customer && this.props.firstname && this.props.lastname && <Text style={{color: uiTheme.palette.accentColor, fontWeight: 'bold',
          textAlign: 'center', paddingTop: 5, fontSize: 10}}>
          {(this.props.firstname.length >= 10 ? (this.props.firstname.substr(0, 9) + '..' ): this.props.firstname)
          + '\n' +
          (this.props.lastname.length >= 10 ? (this.props.lastname.substr(0, 9) + '..') : this.props.lastname)}
        </Text>}
      </TouchableOpacity>
    );
  }
}
import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import NavigationService from '../../navigation/NavigatorService';
import ItemLine from '../Common/ItemLine';
import {formatDate} from '../../utils/utilsFunction'

// This component represent the contents of a card in the customList
export default class MissionDetails extends Component<Props> {
  constructor(props) {
    super(props);
    this.currentTime = new Date();
    this.remainingTime;
    this.finish = false;
    this.endDate;
  }

  getTruncatedProviderName() {
    let truncatedName = "";
    if (this.props.item && this.props.item.provider.user.firstname) {
      if (this.props.item.provider.user.firstname.length > 10) {
        truncatedName = this.props.item.provider.user.firstname.substring(0, 7) + "...";
      }
      else
        truncatedName = this.props.item.provider.user.firstname;
      truncatedName += " " + this.props.item.provider.user.lastname.charAt(0).toUpperCase() + ".";
    }
    return truncatedName;
  }

  render() {
    return (
      <TouchableOpacity onPress={(this.props.item.real_start) ? () => {} : () => NavigationService.navigate('RatingModal', {item: this.props.item}) }>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <ItemLine description={this.getTruncatedProviderName()} iconName="person"/>
          {this.props.item.end &&
          <ItemLine
            description={(this.props.finish ? "Terminé depuis " : "Fin prévue dans ") + this.props.remainingTime}
            iconName="watch-later"/>}
          {this.props.date &&
          <ItemLine description={formatDate(this.props.date)} iconName="date-range"/>}
          {this.props.average_rate &&
          <ItemLine description={this.props.average_rate + " %"} iconName="grade"/>}
        </View>
      </TouchableOpacity>
    );
  }
}

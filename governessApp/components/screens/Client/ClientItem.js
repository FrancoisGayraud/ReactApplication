import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import ClientDetails from './ClientDetails';
import NavigationService from '../../navigation/NavigatorService';

export default class ClientItem extends Component<Props> {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View>
        <ListItem
          key={this.props.item.missionId}
          hideChevron={this.props.notShowChevron}
          onPress={() => NavigationService.navigate('ClientInfoModal', {addressId: this.props.item.id, clientName: this.props.item.user.firstname + ' ' + this.props.item.user.lastname})}
          title=
            {
              <View style={{flexGrow: 1, justifyContent: 'center', flexDirection: 'row'}}>
                <Text
                  style={{fontWeight: 'bold', fontFamily: 'Montserrat-Medium', color: 'black'}}>{this.props.item.user.firstname} {this.props.item.user.lastname}
                </Text>
              </View>
            }
          subtitle={<ClientDetails item={this.props.item}/>}
        />
      </View>
    );
  }
}

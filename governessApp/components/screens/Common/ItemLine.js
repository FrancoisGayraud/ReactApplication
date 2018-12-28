import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import uiTheme from '../../ui/materialVariable';
import {Icon} from 'react-native-elements';

//Component for one line in an item
export default class ItemLine extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={styles.listSubContainer}>
          <Icon
            name={this.props.iconName}
            color={uiTheme.palette.accentColor}/>
          <Text style={{alignSelf: 'center', color: '#4c4c4c', paddingLeft: 5, paddingRight: 5, fontFamily: "Montserrat-Light"}}
                ellipsizeMode='tail'
                numberOfLines={!this.props.truncate ? 0 : 1}
          >{this.props.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listSubContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
});

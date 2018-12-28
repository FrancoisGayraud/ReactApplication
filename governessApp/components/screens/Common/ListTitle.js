import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import uiTheme from '../../ui/materialVariable';

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    backgroundColor: uiTheme.palette.primaryColor,
  },
  title: {
    fontFamily: 'Montserrat-Medium',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    textAlign: 'center',
    color: uiTheme.palette.accentColor
  }
});

//Title above list in inspection page
export default class ListTitle extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{this.props.listTitle}</Text>
      </View>
    );
  }
}

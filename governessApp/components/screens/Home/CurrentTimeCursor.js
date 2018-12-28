import React, {Component} from 'react';
import {View, Text} from 'react-native';
import uiTheme from '../../ui/materialVariable';
import { Icon } from 'react-native-elements';
import {getRelativePosition, formatMinutes} from "../../utils/utilsFunction";

export default class CurrentTimeCursor extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {mainViewWidth: 0};
    this.minutesRange = (this.props.scheduleEnd - this.props.scheduleStart) * 60;
  }

  getMainViewWidth(event) {
    this.setState({mainViewWidth: event.nativeEvent.layout.width});
  }

  render() {
    let cursorPos = 0;
    let curDate = new Date();
    if (this.state.mainViewWidth)
      cursorPos = getRelativePosition(curDate, this.minutesRange, this.state.mainViewWidth, this.props.scheduleStart);
    //Offset of 19 is half the cursor width minus half the line width
    return (
      <View onLayout={event => this.getMainViewWidth(event)} style={{flex: 1, flexDirection: 'column'}}>
        <Text style={{width: 40, textAlign: 'center', color: uiTheme.palette.accentColor,
          left: cursorPos - 19, position: 'absolute', bottom: 0, top: 0, zIndex: 10}}>
          { curDate.getHours() + ":" + formatMinutes(curDate.getMinutes()) }
        </Text>
        <Icon name="triangle-down"
              type="entypo"
              color={uiTheme.palette.accentColor}
              containerStyle={{width: 40, left: cursorPos - 19,
                bottom: 0, top: 25, position: 'absolute', zIndex: 10}}/>
      </View>
    );
  }
}
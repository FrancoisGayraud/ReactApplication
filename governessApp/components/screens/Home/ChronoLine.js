import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Rectangle from './Rectangle';
import { getRelativeWidth, getRelativePosition, getTodayDateAtTime, formatMinutes} from "../../utils/utilsFunction";

export default class ChronoLine extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {viewWidth: null};
    this.minutesRange = (this.props.scheduleEnd - this.props.scheduleStart) * 60;
  }

  createChronoLine() {
    let rectangles = [];
    if (!this.state.viewWidth)
      return (rectangles);
    let widthSum = 0;
    this.props.data.forEach(
      item => {
        let dateStart = getTodayDateAtTime(item.start);
        let dateEnd = getTodayDateAtTime(item.end);
        let now = new Date();
        let isNow = (now > dateStart && now < dateEnd);
        rectangles.push(
          <Rectangle
            key={item.id} start={dateStart.getHours() + ':' + formatMinutes(dateStart.getMinutes())}
            end={dateEnd.getHours() + ':' + formatMinutes(dateEnd.getMinutes())} height={this.props.height}
            width={getRelativeWidth(dateStart, dateEnd, this.minutesRange, this.state.viewWidth, this.props.scheduleStart)}
            position={getRelativePosition(dateStart, this.minutesRange, this.state.viewWidth, this.props.scheduleStart) - widthSum}
            isNow={isNow} addressId={item.addressId} firstname={item.firstname} lastname={item.lastname} customer={this.props.customer}
            missionCurr={item.missionCurr}
          />);
        widthSum += getRelativeWidth(dateStart, dateEnd, this.minutesRange, this.state.viewWidth, this.props.scheduleStart);
      });
    return (rectangles);
  }

  getViewWidth(event) {
    this.setState({viewWidth: event.nativeEvent.layout.width})
  }

  render() {
    return (
      <View onLayout={event => this.getViewWidth(event)}
            style={[{height: this.props.height}, styles.mainContainer, this.props.chronoLineStyle]}>
        {this.createChronoLine()}
      </View>);
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white'
  }
});
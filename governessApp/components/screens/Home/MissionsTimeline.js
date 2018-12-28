import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import ChronoLine from './ChronoLine';
import {getProviderTDMInfo} from "../../action/getProviderTodayMissions";
import {connect} from 'react-redux';
import uiTheme from "../../ui/materialVariable";
import {getRelativePosition} from "../../utils/utilsFunction";
import commonStyles from '../../ui/commonStyles';

const mapStateToProps = (state) => {
  return {
    tokenData: state.tokenReducer,
    TDMData: state.getProviderTDMReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProvidersTDM: (apiToken) =>
      dispatch(getProviderTDMInfo(apiToken)),
  };
};

class MissionsTimeline extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {mainViewWidth: 0};
    this.minutesRange = (this.props.scheduleEnd - this.props.scheduleStart) * 60;
  }

  componentDidMount() {
    this.props.getProvidersTDM(this.props.tokenData.token.apiToken)
  }

  createNames() {
    //Filtering duplicate object from array
    let names = this.props.TDMData.TDMData.data.filter((val, index, array) => {
      return array.map(obj => obj.provider.user.firstname).indexOf(val.provider.user.firstname) === index
    });
    let namesDisplay = [];
    let count = 0;
    names.forEach(name => {
      let fullName = (name.provider.user.firstname.length > 11 ? (name.provider.user.firstname.substring(0, 11) + '...') : name.provider.user.firstname) +
        '\n' + (name.provider.user.lastname.length > 9 ? (name.provider.user.lastname.substring(0, 9) + '...') : name.provider.user.lastname);
      namesDisplay.push(<View style={{borderBottomWidth: 1, borderBottomColor: uiTheme.palette.underlineColor,
        backgroundColor: 'white'}} key={name.id}>
        <View style={{flexGrow: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
          backgroundColor: count % 2 === 1 ? uiTheme.palette.missionsBackgroundColor : 'white'}}>
          <Text
            style={{height: this.props.lineHeight - 1, fontSize: 14, fontFamily: 'Montserrat-Medium', paddingTop: 2, color: '#4c4c4c', paddingLeft: 3}}>{fullName}</Text>
        </View>
      </View>);
      count++;
    });
    return (namesDisplay);
  }

  createChronoLines() {
    let chronoLines = [];
    let dataArray = [];
    let count = 0;
    this.props.TDMData.TDMData.data.forEach((mission, index) => {
      dataArray.push({id: mission.id, start: mission.start, end: mission.end, addressId: mission.addressId,
        firstname: mission.customer.firstname,
        lastname: mission.customer.lastname, missionCurr: mission. address.mission_cur});
      if (index + 1 === this.props.TDMData.TDMData.data.length ||
        mission.provider.id !== this.props.TDMData.TDMData.data[index + 1].provider.id)
      {
        chronoLines.push(
          <ChronoLine
            key={mission.id} data={dataArray} height={this.props.lineHeight}
            customer={this.props.customer}
            scheduleStart={this.props.scheduleStart}
            scheduleEnd={this.props.scheduleEnd}
            chronoLineStyle={{borderBottomWidth: 1, borderBottomColor: uiTheme.palette.underlineColor,
              backgroundColor: count % 2 === 1 ? uiTheme.palette.missionsBackgroundColor : 'white'}}/>);
        dataArray = [];
        count++;
      }
    });
    return (chronoLines);
  }

  getMainViewWidth(event) {
    this.setState({mainViewWidth: event.nativeEvent.layout.width});
  }

  getNameViewWidth(event) {
    this.setState({nameViewWidth: event.nativeEvent.layout.width});
  }

  render() {
    let linePos = 0;
    if (this.state.mainViewWidth)
      linePos = getRelativePosition(this.props.date, this.minutesRange, this.state.mainViewWidth, this.props.scheduleStart);
    if (this.props.TDMData.TDMData === null)
      return(
        <View style={commonStyles.EmptyListInfo}>
          <Text style={commonStyles.textInfo}>
            Aucune mission prévue aujourd'hui
          </Text>
        </View>
      );
    else
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 0, borderRightWidth: 2, borderRightColor: uiTheme.palette.accentColor,
            left: linePos + this.state.nameViewWidth, bottom: 0, top: 0, zIndex: 10, position: 'absolute'}}/>
          <View onLayout={event => this.getNameViewWidth(event)} style={{flex: 2, flexDirection: 'column', borderRightWidth: 1, borderRightColor: uiTheme.palette.underlineColor}}>
            {this.createNames()}
          </View>
          <View onLayout={event => this.getMainViewWidth(event)} style={{flex: 5, flexDirection: 'column'}}>
            {this.createChronoLines()}
          </View>
        </View>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MissionsTimeline);

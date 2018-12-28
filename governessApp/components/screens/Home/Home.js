import React, {Component} from 'react';
import {TouchableOpacity, View, Text, ScrollView} from 'react-native';
import commonStyles from '../../ui/commonStyles';
import MissionsTimeline from './MissionsTimeline';
import CurrentTimeCursor from './CurrentTimeCursor';
import uiTheme from '../../ui/materialVariable';
import { Icon } from 'react-native-elements'

const scheduleStart = 8;//Home timeline hour start 0-24
const scheduleEnd = 21;//Home timeline hour end 0-24

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      customer: false
    }
  }

  componentWillMount() {
    let interval = setInterval(()=> this.setState({}), 1000);
    this.setState({timer: interval});
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    let curHour = new Date().getHours();
    if (curHour < scheduleStart || curHour > scheduleEnd)
      return (
        <View style={{flex: 1, alignItems: 'center', alignContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>Les missions s'effectuent entre 8h et 20h, revenez plus tard</Text>
        </View>);
    else
      return (
      <ScrollView style={{backgroundColor: uiTheme.palette.backgroundColor}}>
        <View style={commonStyles.container}>
          <View style={{height: 40, backgroundColor: uiTheme.palette.primaryColor}}>
            <View style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: uiTheme.palette.underlineColor}}>
              <View style={{flex: 2, flexDirection: 'row', borderRightWidth: 1, borderRightColor: uiTheme.palette.underlineColor, justifyContent: 'center'}}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.state.customer === false ? this.setState({customer: true}) : this.setState({customer: false})}>
                  <Icon color={uiTheme.palette.accentColor} name='autorenew' />
                  <Text style={{fontSize: 12, textAlign: 'center', fontFamily: 'Montserrat-Medium', color: uiTheme.palette.accentColor, alignSelf: 'center'}}>
                    {this.state.customer === false ? 'Voir clients' : 'Voir horaires'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 5, flexDirection: 'row'}}>
                <CurrentTimeCursor scheduleStart={scheduleStart} scheduleEnd={scheduleEnd}/>
              </View>
            </View>
          </View>
          <MissionsTimeline scheduleStart={scheduleStart} scheduleEnd={scheduleEnd} lineHeight={40} date={new Date()} customer={this.state.customer}/>
        </View>
      </ScrollView>
      );
  }
}

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ListItem} from 'react-native-elements'
import {msToTime} from '../../utils/utilsFunction';
import RatingModal from './RatingModal';
import {connect} from 'react-redux';
import MissionDetails from './MissionDetails';

const mapStateToProps = (state) => {
  return {
    inspectionData: state.getInspectionReducer,
    onGoingMissionsData: state.getOnGoingMissionsReducer,
    tokenData: state.tokenReducer
  };
};

//Custom Item for CustomList
class Item extends Component<Props> {
  constructor(props) {
    super(props);
    this.currentTime = new Date();
    this.remainingTime = 0;
    this.finish = false;
    this.endDate = null;
    this.state = {
      timer: null
    };
  }

  tick() {
    if (this.props.item.end)
      this.getRemainingTime();
  }

  componentDidMount() {
    if (this.props.item.end) {
      let timer = setInterval(this.tick.bind(this), 30000);
      this.setState({timer});
    }
    if (this.props.item.end)
      this.getRemainingTime();
  }

  shouldComponentUpdate() {
    if (!this.props.item.end) {
      return (false);
    }
    return (true);
  }

  getRemainingTime() {
    this.currentTime = new Date();
    this.finish = false;
    this.endDate = new Date(this.props.item.end);
    if (this.endDate.getTime() > this.currentTime.getTime()) {
      this.remainingTime = this.endDate.getTime() - this.currentTime.getTime();
      this.remainingTime = msToTime(this.remainingTime);
    }
    else {
      this.remainingTime = this.currentTime.getTime() - this.endDate.getTime();
      this.remainingTime = msToTime(this.remainingTime);
      this.finish = true;
    }
  }

  render() {
    return (
      <View>
        <ListItem
          key={this.props.item.missionId}
          hideChevron={this.props.notShowChevron}
          title=
            {
              <View style={{flexGrow: 1, justifyContent: 'center', flexDirection: 'row'}}>
                <Text
                  style={{fontWeight: 'bold', fontFamily: 'Montserrat-Medium', paddingBottom: 2, color: 'black'}}>{this.props.item.customer.firstname} {this.props.item.customer.lastname}</Text>
              </View>
            }
          subtitle={<MissionDetails finish={this.finish} remainingTime={this.remainingTime}
                                    item={this.props.item} average_rate={this.props.average_rate} date={this.props.date} />}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, null)(Item);

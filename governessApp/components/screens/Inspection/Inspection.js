import React, {Component} from 'react';
import {View, Text} from 'react-native';
import commonStyles from '../../ui/commonStyles';
import inspectionStyles from '../../ui/inspectionStyles';
import InspectionList from './InspectionList';
import MissionList from './MissionList';
import {connect} from 'react-redux';
import ListTitle from '../Common/ListTitle';

const mapStateToProps = (state) => {
  return {
    connected: state.connectionCheckReducer
  };
};

class Inspection extends Component<Props> {
  constructor(props) {
    super(props);
    this.currentTime = new Date();
  }

  render() {
    return (
      <View style={commonStyles.container}>
        { this.props.connected.connected &&
        <View style={inspectionStyles.ListContainer}>
          <InspectionList
            listTitle="Inspections passées"
          />
        </View> }
        { !this.props.connected.connected &&
          <Text>Vous n'êtes pas connecté à internet</Text>
        }
        { this.props.connected.connected &&
        <View style={inspectionStyles.ListContainer}>
          <MissionList
            listTitle="Inspections possibles"
          />
        </View> }
      </View>
    );
  }
}

export default connect(mapStateToProps, null)(Inspection)
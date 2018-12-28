import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import inspectionStyles from '../../ui/inspectionStyles';
import uiTheme from '../../ui/materialVariable';

export default class ButtonsRatingModal extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={inspectionStyles.buttonContainer}>
        <View style={{flex: 1, height: 50}}>
          <Button buttonStyle={inspectionStyles.buttonStyle} title="Confirmer" backgroundColor={uiTheme.palette.accentColor}
                  onPress={() => Alert.alert(
                    'Confirmer l\'inspection ?',
                    '',
                    [
                      {text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'Oui', onPress: () => this.props.postInspection()},
                    ],
                    {cancelable: false}
                  )}/>
        </View>
      </View>
    );
  }
}

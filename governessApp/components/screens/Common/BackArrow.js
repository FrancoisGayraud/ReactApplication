import React, {Component} from 'react';
import {Icon} from 'react-native-elements';
import uiTheme from '../../ui/materialVariable';
import NavigationService from '../../navigation/NavigatorService';

export default class BackArrow extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Icon name="arrow-back"
            onPress={() => NavigationService.goBack()}
            color={uiTheme.palette.accentColor}/>
    );
  }
}

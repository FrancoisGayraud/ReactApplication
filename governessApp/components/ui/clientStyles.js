import {StyleSheet} from 'react-native';
import uiTheme from './materialVariable';

//Client stylesheet used in client page and clientInfoModal
export default clientStyles = StyleSheet.create({
  buildingAccessSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: uiTheme.palette.underlineColor,
    borderBottomWidth: 1,
    height: 25
  }
})

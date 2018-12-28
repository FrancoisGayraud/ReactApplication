import {StyleSheet} from 'react-native';
import uiTheme from './materialVariable';

//Common stylesheet to use in all application
export default commonStyles = StyleSheet.create({
  container: {
    backgroundColor: uiTheme.palette.backgroundColor,
    flex: 1
  },
  EmptyListInfo: {
    backgroundColor: uiTheme.palette.backgroundColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInfo: {
    color: 'black'
  }
});

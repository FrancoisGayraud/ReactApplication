import {StyleSheet} from 'react-native';
import uiTheme from './materialVariable';

//Inspection stylesheet used in inspection page
export default inspectionStyles = StyleSheet.create({
  ListContainer: {
    backgroundColor: uiTheme.palette.backgroundColor,
    flex: 1
  },
  buttonContainer: {
    backgroundColor: uiTheme.palette.primaryColor,
    paddingTop: 35,
    paddingBottom: 30,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: uiTheme.palette.accentColor,
    borderTopWidth: 2,
    justifyContent: 'center'
  },
  buttonStyle: {
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10
  }
});

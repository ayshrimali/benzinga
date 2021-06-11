import { StyleSheet, TextStyle, ImageStyle, ViewStyle } from 'react-native';
import Colors from '../../../utils/colors';

type Style = {
  llContainer: ViewStyle;
  tTitle: TextStyle;
  tTypeOfStock: TextStyle;
  vStockDetailContainer: ViewStyle;
};
const styles = StyleSheet.create<Style>({
  llContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderRadius: 16,
    marginHorizontal: 8,
    marginBottom: 8,
    paddingVertical: 8,
  },
  vStockDetailContainer: {
    paddingHorizontal: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tTitle: {
    fontSize: 18,
    textAlign: 'left',
    color: 'white',
    marginRight: 8,
  },
  tTypeOfStock: {
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 4,
    color: Colors.yellow,
  },
});

export default styles;

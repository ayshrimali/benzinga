import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  vContainer: {
    flex: 1
  },
  svContainer: {
    flexGrow: 1,
  },
  loadingContainer: { 
    position: 'absolute', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100%', 
    width: '100%', 
    backgroundColor: 'black', 
    opacity: 0.5 
  },
  volumeChartContainer: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "baseline", 
    paddingHorizontal: 16
  },
  priceChartContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "baseline",
    paddingHorizontal: 16,
    overflow: 'hidden'
  },
  toolbarContainer: {
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8
  },
  intervalPicker: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
  },
  map: {
    // width: '100%',
    height: '100%',
  },
  


  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
    position: 'absolute',
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: 0.5,
    // marginBottom: -15
  },
  // Character name
  name: {fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
  overlayView: {
    position: 'absolute',
    bottom: 600, // Adjust the position as needed
    left: 150, // Adjust the position as needed
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

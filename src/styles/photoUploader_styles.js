import { StyleSheet } from 'react-native';
import { colors } from './colors';

const PhotoUploader_style = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: colors.title,
    paddingVertical: 10,
  },
  preview: {
    marginTop: 10,
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  uploadButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 0.4,
    marginTop: 10,
  },
  uploadButtonText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  uploadButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PhotoUploader_style;

import { StyleSheet } from 'react-native';

const Header_styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  headerLabel: {
    backgroundColor: '#5e3b7f',
    color: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    fontWeight: 'bold',
    fontSize: 19,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, 
  },
});

export default Header_styles;
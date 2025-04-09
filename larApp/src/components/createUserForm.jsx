import * as React from 'react';
import { TextInput } from 'react-native-paper';

const createUserForm = () => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      mode="outlined"
      label="Outlined input"
      placeholder="Insira o nome"
      right={<TextInput.Affix text="/100" />
      }
    />

  );
};

export default createUserForm;
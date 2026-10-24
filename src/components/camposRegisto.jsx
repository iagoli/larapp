import React from 'react';
import Label from './label';
import TextInputField from './textInputField';
import DateTimeInput from './dateTimeInput';

// Campos de um formulário de registo, gerados a partir de REGISTOS[tipo].campos
const CamposRegisto = ({ campos, valores, onChange }) =>
  campos.map(({ campo, label, tipo, multiline, teclado, placeholder }) => (
    <React.Fragment key={campo}>
      <Label>{label}</Label>
      {tipo === 'dataHora' ? (
        <DateTimeInput value={valores[campo]} onChange={(v) => onChange(campo, v)} />
      ) : (
        <TextInputField
          value={valores[campo]}
          onChangeText={(v) => onChange(campo, v)}
          placeholder={placeholder}
          keyboardType={teclado}
          multiline={multiline}
          style={multiline && { height: 80, textAlignVertical: 'top' }}
        />
      )}
    </React.Fragment>
  ));

export default CamposRegisto;

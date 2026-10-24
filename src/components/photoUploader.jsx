import React, { useState } from 'react';
import { View, Image, Alert, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import PhotoUploader_style from '../styles/photoUploader_styles';

const PhotoUploader = ({ onImageSelected }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de acesso à galeria para selecionar imagens.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImage(selectedUri);
      if (onImageSelected) {
        onImageSelected(selectedUri);
      }
    }
  };

  return (
    <View style={PhotoUploader_style.container}>
      <TouchableOpacity style={PhotoUploader_style.uploadButton} onPress={pickImage}>
        <View style={PhotoUploader_style.uploadButtonContent}>
          <MaterialIcons name="file-upload" size={20} color="#007BFF" style={{ marginRight: 8 }} />
          <Text style={PhotoUploader_style.uploadButtonText}>Carregar fotografia</Text>
        </View>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={PhotoUploader_style.preview} />}
    </View>
  );
};

export default PhotoUploader;

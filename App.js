import { Button, Image, StatusBar, View, Text, Share } from "react-native";
import { useState, useEffect } from "react";

/* Importando recursos da API nativa/móvel */
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const [foto, setFoto] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    async function verificaPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }
    verificaPermissoes();
  }, []);

  const escolherFoto = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const acessarCamera = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!imagem.canceled) {
      await MediaLibrary.saveToLibraryAsync(imagem.assets[0].uri);
      setFoto(imagem.assets[0].uri);
    }
  };

  const compartilharFoto = async () => {
    if (foto) {
      try {
        await Share.share({ message: "Confira minha foto!", url: foto });
      } catch (error) {
        console.error("Erro ao compartilhar a foto:", error.message);
      }
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Escolher foto" onPress={escolherFoto} />
        <Button title="Tirar uma nova foto" onPress={acessarCamera} />
        {foto && (
          <Button title="Compartilhar foto" onPress={compartilharFoto} />
        )}
        {foto ? (
          <Image style={{ width: 300, height: 300 }} source={{ uri: foto }} />
        ) : (
          <Text>Sem foto!</Text>
        )}
      </View>
    </>
  );
}

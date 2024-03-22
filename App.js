import { Button, Image, StatusBar, View } from "react-native";
import { useState, useEffect } from "react";

/* IMportando so recursos da API nativa/móvel */
import * as ImagePicker from "expo-image-picker";

export default function App() {
  /* State tradicional para armazenar a referência da foto (quando existir) */
  const [foto, setFoto] = useState(null);
  /* State de checagem de permissões de uso (através do hook useCameraPermissions) */
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  console.log(status);

  return (
    <>
      <StatusBar style="auto" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Escolher foto" />
        <Image style={{ width: 300, height: 300 }} />
      </View>
    </>
  );
}

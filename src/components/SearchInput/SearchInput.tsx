import React from "react";
import { TextInput, View, Keyboard } from "react-native";
import { getStyles } from "./styles";
import { useTheme } from "@/src/context/ThemeContext";

interface Props {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

export const SearchInput: React.FC<Props> = ({ value, onChange, onSubmit }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar usuario"
        value={value}
        onChangeText={onChange}
        onSubmitEditing={() => {
          onSubmit();
          Keyboard.dismiss();
        }}
        returnKeyType="search"
        clearButtonMode="while-editing"
        style={styles.input}
      />
    </View>
  );
};

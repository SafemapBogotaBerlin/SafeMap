import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./style";

type RegisterInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  valid: boolean;
  errorMessage: string;
  secret?: boolean;
};

const RegisterInput: React.FC<RegisterInputProps> = ({
  value,
  onChangeText,
  placeholder,
  valid,
  errorMessage,
  secret = false,
}) => {
  const showError = !valid && value !== "";
  return (
    <View style={styles.inputContainer}>
      {showError && <Text style={styles.errorText}>{errorMessage}</Text>}
      <TextInput
        style={[styles.input, showError ? styles.invalid : {}]}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={showError ? "red" : "gray"}
        secureTextEntry={secret}
        value={value}
      />
    </View>
  );
};

export default RegisterInput;

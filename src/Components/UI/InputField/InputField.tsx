import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './InputField.styles';

type Props = {
  icon: 'user' | 'lock';
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  error?: string;
};

export default function InputField({
  icon,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
}: Props) {
  const Icon = () => (
    <Ionicons
      name={icon === 'user' ? 'person-outline' : 'lock-closed-outline'}
      size={22}
      color="#999"
      style={styles.icon}
    />
  );

  return (
    <View>
      <View style={styles.inputWrapper}>
        <Icon />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={icon === 'lock'}
          textAlign="right"
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

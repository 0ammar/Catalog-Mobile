import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { styles } from '@/Theme/ItemStyles/entryScreen';
import { InputField } from '@/Components/UI';
import { useAuth } from '@/Hooks';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('اسم المستخدم مطلوب'),
  password: Yup.string().min(4, 'كلمة المرور قصيرة جداً').required('كلمة المرور مطلوبة'),
});

export default function EntryScreen() {
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleAdminLogin, handleGuestAccess } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('@/Assets/images/header.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.description}>مرحبًا بك في كتالوج المتسوّق</Text>
      <View style={styles.lineUnderTitle} />

      {!showLogin ? (
        <Animated.View entering={FadeInDown.delay(300)} style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={() => setShowLogin(true)}>
            <Text style={styles.buttonText}>تسجيل دخول</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={handleGuestAccess}>
            <Text style={styles.backButtonText}>الدخول كزائر</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => handleAdminLogin(values.username, values.password, setLoading)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
              <InputField
                icon="user"
                placeholder="اسم المستخدم"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={touched.username ? errors.username : ''}
              />

              <InputField
                icon="lock"
                placeholder="كلمة المرور"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password ? errors.password : ''}
              />

              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.7 }]}
                onPress={handleSubmit as any}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>تسجيل الدخول</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setShowLogin(false)}
              >
                <Text style={styles.backButtonText}>عودة للخلف</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Formik>
      )}
    </SafeAreaView>
  );
}

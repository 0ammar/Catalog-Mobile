import React from 'react';
import { styles } from './Footer.styles';
import { View, Text, Image  } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <View style={styles.left}>
                <Image
                    source={require('@/Assets/images/app-icon.png')} 
                    style={styles.icon}
                />
                <Text style={styles.text}>Almutasaweq Catalog v1.0</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.text}>© 2025 All rights reserved</Text>
            </View>
        </View>
    );
};

export default Footer;

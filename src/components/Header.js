import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = ({ backBtn, navigation, pageName  }) => {
        return (
            <View style={styles.container}>
                {backBtn ?
                    <TouchableOpacity
                        onPress={() => { navigation.goBack() }}
                        style={styles.iconPadding}
                    >
                        <Text style={styles.textStyle}>{'<'}</Text>
                    </TouchableOpacity>
                    : null}
                <Text style={styles.textStyle}>{pageName}</Text>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#2e4033',
        height: 60,
        flexDirection: 'row',
        padding : 20,
    },
    iconPadding: {
        paddingRight : 20
    },
    textStyle: {
        fontSize:25,
        color:'#fff',
    }
});

export default Header;
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children,style }) => {
    const { buttonStyle, textStyle } = styles;
    return (

        <TouchableOpacity onPress={onPress} style={[style,buttonStyle]}>
                <Text style={textStyle}>
                    {children}
                </Text>
        </TouchableOpacity>

    );
};

const styles = {
    buttonStyle: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#2e4033',
        borderRadius: 5,
        width:135,
        height:50,
        margin:20,
    },
    textStyle: {
        color: '#fff',
        fontSize:15,
        fontWeight: 'bold'
    }
};

export default Button;
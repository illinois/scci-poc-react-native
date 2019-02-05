import React from 'react';
import {
    Text,
    TextInput,
    View,
} from 'react-native';
import layoutConstants from '../constants/Layout';

export default class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
        };
    }

    render() {
        return (
                <View style={layoutConstants.styles.container}>
                <Text>Name</Text>
                <TextInput
            onChangeText={(text)=> this.setState({name: text})}
            value={this.state.text}
                />
                </View>

        );
    }

}

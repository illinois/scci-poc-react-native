import React from 'react';

import { Button, ThemeProvider, FormLabel, FormInput, Input } from 'react-native-elements';

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
            <ThemeProvider>
              <Button title="hey" />
              <Input
                placeholder="Name"
                onChangeText={(text)=>this.setState({name: text})}
                value={this.state.name}
              />
            </ThemeProvider>
        );
    }

}

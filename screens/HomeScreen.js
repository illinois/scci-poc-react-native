import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Button,
    Linking,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import Immutable from 'immutable';

import layoutConstants from '../constants/Layout';

const IMAGES_DIR = '../assets/images';
const BUTTON_IMAGES = {
    'images/campus.jpg': require(`${IMAGES_DIR}/campus.jpg`),
    'images/Bardeen-Quad2.jpg': require(`${IMAGES_DIR}/Bardeen-Quad2.jpg`),
    'images/athletics.jpg': require(`${IMAGES_DIR}/athletics.jpg`),
    'images/krannert.jpg': require(`${IMAGES_DIR}/krannert.jpg`),
    'images/Altgeld.jpg': require(`${IMAGES_DIR}/Altgeld.jpg`),
};

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            uiConfig: null,
        };
    }

    async componentDidMount() {
        let config = await apiTest();
        // console.log("testing", config);
        this.setState({uiConfig: Immutable.fromJS(config)});
    }

    render() {

        const {navigate} = this.props.navigation;

        let dynoButtons = null;
        let dynoImageButtons = null;
        if (this.state.uiConfig) {
            console.log("have uiConfig");
            let dynoWidgetsSeq = this.state.uiConfig.getIn(['panels', 'home', 'widgets']).toSeq();
            let ImageBtn = (props)=>{
                return (
                  <TouchableOpacity
                    onPress={props.onPress}
                  >
                    <Image
                      source={props.source}
                      resizeMode='contain'
                      style={{
                          width: props.width,
                          height: props.width / props.aspectRatio,
                      }}
                    />
                  </TouchableOpacity>
                );
            };

            dynoButtons = dynoWidgetsSeq
                // .filter((widget)=>{
                //     console.log("widget", widget);
                //     let title = widget.get('title');
                //     console.log("title", title);
                //     return title !== undefined;
                // })
                .filter((widget)=>{
                    let destination = widget.get('destination');
                    let hasDestination = destination !== undefined;
                    let isWebDest = destination.get('type') === 'web';
                    return hasDestination && isWebDest;
                })
                .map((widget, idx)=>{
                    let destination = widget.get('destination');
                    let title = destination.get('title');
                    // console.log('widget', widget);
                    // return (
                    //     <Button
                    //         key={"dyno-button-" + idx}
                    //         title={title}
                    //         onPress={()=>{
                    //             console.log(title + " was pressed");
                    //             // this.setState({webViewUri: 'http://google.com'});
                    //             Linking.openURL(destination.get('value'));
                    //         }}
                    //     />
                    // );
                    return (
                        <ImageBtn
                          key={`dyno-button-${idx}`}
                          source={BUTTON_IMAGES[widget.getIn(['image', 'path'])]}
                          width={layoutConstants.window.width * 0.9}
                          aspectRatio={2.666667}
                          onPress={()=>{
                              console.log(`${title} was pressed`);
                              // this.setState({webViewUri: 'http://google.com'});
                              Linking.openURL(destination.get('value'));
                          }}
                        />
                    );
                });
        } else {
            console.log("no uiConfig");
        }

        return (
          <View style={layoutConstants.styles.container}>
            <ScrollView style={layoutConstants.styles.container} contentContainerStyle={styles.contentContainer}>
                {/*<View style={styles.welcomeContainer}>
                <Image
                  source={
                      __DEV__
                      ? require('../assets/images/robot-dev.png')
                      : require('../assets/images/robot-prod.png')
                  }
                  style={styles.welcomeImage}
                />
                </View>*/}

              <View style={styles.getStartedContainer}>
                {/*this._maybeRenderDevelopmentModeWarning()*/}

                { dynoButtons }

                <Button
                  title="Profile"
                  onPress={() => navigate('Profile', {})}
                />

              </View>

            </ScrollView>

            {/* <View style={styles.tabBarInfoContainer}>
                <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

              <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
                <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
              </View>
              </View> */}
          </View>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                    <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                    Learn more
                </Text>
            );

            return (
                    <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will be slower but you can use useful development
                tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                    <Text style={styles.developmentModeText}>
                    You are not in development mode, your app will run at full speed.
                    </Text>
            );
        }
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
        );
    };
}

async function apiTest() {
    try {
        let response = await fetch('https://profile.inabyte.com/ui/config');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    // },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});

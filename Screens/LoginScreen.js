import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image,
    Animated,
    Dimensions,
    Keyboard,
    Platform
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Icon } from 'native-base';

const SCREEN_HEIGHT = Dimensions.get('window').height
class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()

        this.state = {
            placeholderText: 'Enter your mobile number'
        }
    }
    componentWillMount() {
        this.loginHeight = new Animated.Value(150)
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)

        this.keyboardHeight = new Animated.Value(0)
        this.forwardArrowOpacity = new Animated.Value(0)
        this.borderBottomWidth = new Animated.Value(0)
    }

    keyboardWillShow = (event) => {

        if (Platform.OS == 'android') {
            duration = 100
        } else {
            duration = event.duration
        }

        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: duration + 100,
                toValue: event.endCoordinates.height + 10
            }),
            Animated.timing(this.forwardArrowOpacity, {
                duration: duration,
                toValue: 1
            }),
            Animated.timing(this.borderBottomWidth, {
                duration: duration,
                toValue: 1
            })
        ]).start()
    }

    keyboardWillHide = (event) => {

        if (Platform.OS == 'android') {
            duration = 100
        } else {
            duration = event.duration
        }

        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: duration + 100,
                toValue: 0
            }),
            Animated.timing(this.forwardArrowOpacity, {
                duration: duration,
                toValue: 0
            }),
            Animated.timing(this.borderBottomWidth, {
                duration: duration,
                toValue: 0
            })
        ]).start()
    }

    increaseHeightOfLogin = () => {

        this.setState({ placeholderText: '0912345678' })

        Animated.timing(this.loginHeight, {
            toValue: SCREEN_HEIGHT,
            duration: 500
        }).start(() => {
            this.refs.textInputMobile.focus()
        })
    }

    decreaseHeightOfLogin = () => {
        Keyboard.dismiss()
        Animated.timing(this.loginHeight, { toValue: 150, duration: 500 }).start()
    }



    render() {
        const headerTextOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [1, 0]
        })

        const marginTop = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [25, 100]
        })

        const headerBackArrowOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [0, 1]
        })

        const titleTextBottom = this.loginHeight.interpolate({
            inputRange: [150, 400, SCREEN_HEIGHT],
            outputRange: [0, 0, 100]
        })

        const titleTextLeft = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [100, 25]
        })

        const titleTextOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [0, 1]
        })

        return (
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={{
                        position: 'absolute', height: 60, width: 60, top: 60, left: 25, zIndex: 100,
                        opacity: headerBackArrowOpacity
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.decreaseHeightOfLogin()}
                    >
                        <Icon name="md-arrow-back" style={{ color: 'black' }} />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    style={{
                        position: 'absolute', height: 60, width: 60,
                        right: 10,
                        bottom: this.keyboardHeight,//animated
                        opacity: this.forwardArrowOpacity,//animated
                        zIndex: 100,
                        backgroundColor: '#54575e',
                        borderRadius: 30,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Icon name="md-arrow-forward" style={{ color: 'white' }} />
                </Animated.View>

                <ImageBackground
                    source={require('../assets/login_bg.jpg')}
                    style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Animatable.View
                            animation="zoomIn" iterationCount={1}
                            style={{ backgroundColor: 'white', height: 100, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 26 }}>Viral</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 26 }}>ONE</Text>
                        </Animatable.View>
                    </View>

                    {/** Bottom half **/}
                    <Animatable.View animation="slideInUp" iterationCount={1}>
                        <Animated.View style={{ height: this.loginHeight, backgroundColor: 'white' }}>
                            <Animated.View
                                style={{
                                    opacity: headerTextOpacity,//animated
                                    alignItems: 'flex-start',
                                    paddingHorizontal: 25,
                                    marginTop: marginTop//animated
                                }}>
                                <Text style={{ fontSize: 24 }}>
                                    Get moving with ViralONE
                            </Text>
                            </Animated.View>
                            <TouchableOpacity
                                onPress={() => this.increaseHeightOfLogin()}
                            >
                                <Animated.View
                                    style={{
                                        marginTop: marginTop,//animated
                                        paddingHorizontal: 25,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <Animated.Text
                                        style={{
                                            fontSize: 24,
                                            color: 'gray',
                                            position: 'absolute',
                                            bottom: titleTextBottom,
                                            left: titleTextLeft,
                                            opacity: titleTextOpacity
                                        }}
                                    >
                                        Enter your mobile number
                                    </Animated.Text>
                                    <Image style={{ width: 24, height: 24, resizeMode: 'contain' }}
                                        source={require('../assets/vietnam.png')} />
                                    <Animated.View
                                        pointerEvents="none"
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            borderBottomWidth: this.borderBottomWidth
                                        }}>
                                        <Text style={{ fontSize: 20, paddingHorizontal: 10 }} >+84</Text>
                                        <TextInput
                                            ref="textInputMobile"
                                            keyboardType="numeric"
                                            style={{ flex: 1, fontSize: 20, }}
                                            placeholder={this.state.placeholderText}
                                            underlineColorAndroid="transparent"
                                        />
                                    </Animated.View>
                                </Animated.View>
                            </TouchableOpacity>
                        </Animated.View>
                        <View
                            style={{
                                height: 70,
                                backgroundColor: 'white',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                borderTopColor: '#e8e8ec',
                                borderTopWidth: 1,
                                paddingHorizontal: 25
                            }}>
                            <Text style={{ color: '#5a7fdf', fontWeight: 'bold' }}>
                                Or connect using a social account</Text>
                        </View>
                    </Animatable.View>
                </ImageBackground>
            </View>
        );
    }
}

export default LoginScreen;


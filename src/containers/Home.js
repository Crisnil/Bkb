import React, { Component } from "react";
import {Image,ImageBackground, StatusBar, StyleSheet} from "react-native";
import {Container, Button, H3, Text, Content,View} from "native-base";
import styles from "./styles";
import * as DeviceRatio from "../layout/DeviceRatio";

const launchscreenBg = require("../assets/launchscreen-bg.png");
const launchscreenLogo = require("../assets/logo-kitchen-sink.png");
const redlogo = require("../assets/bkblogo.png");

class Home extends Component {
    render() {
        const resizeMode = 'center';
        return (
            <Container>
                    <StatusBar barStyle="light-content" />
                        {/*<ImageBackground source={launchscreenBg} style={styles.imageContainer}>*/}
                            <View style={styles.logoContainer}>
                                {/*<ImageBackground source={redlogo} style={styles.logo} resizeMode/>*/}
                                <Image
                                    style={{
                                        flex: 1,
                                        width: DeviceRatio.computeWidthRatio(800),
                                        resizeMode,
                                    }}
                                    source={redlogo}
                                />

                            </View>
                            <View
                                style={{
                                    alignItems: "center",
                                    marginBottom: 50,
                                    backgroundColor: "transparent"
                                }}
                            >
                                {/*<H3 style={styles.text}>Welcome</H3>*/}
                                {/*<View style={{ marginTop: 8 }} />*/}
                                <H3 style={{color:'#B23121'}}>Welcome message here!</H3>
                                <View style={{ marginTop: 8 }} />
                            </View>
                            <View style={{ marginBottom: 80 }}>
                                <Button primary
                                    style={{ backgroundColor: "#B23121", alignSelf: "center" }}
                                    onPress={() => this.props.navigation.navigate("Login")}
                                >
                                    <Text>Lets Go!</Text>
                                </Button>
                            </View>
                        {/*</ImageBackground>*/}
            </Container>
        );
    }
}

export default Home;

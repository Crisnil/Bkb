import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body
} from "native-base";

// import { NavigationActions } from '../utils'
import  { NavigationActions } from 'react-navigation'

//@connect()
class Terms extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Detail',
    }

    goBack = () => {
        this.props.dispatch(NavigationActions.back({ routeName: 'Account' }))
    }

    render() {
        console.log("props",this.props)
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Terms and Condition</Title>
                    </Body>
                    <Right />
                </Header>

                <Content padder>
                    <Text>Content goes here (internal)</Text>
                </Content>

                <Footer>
                    <FooterTab>
                        <Button active full onPress={() => this.props.navigation.navigate("SRList")}>
                            <Text>Accept</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
})

export default Terms

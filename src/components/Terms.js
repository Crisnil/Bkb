import React from 'react';
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
    Body,
    Form,
    Label,
    Input,
    Item, View,CheckBox,ListItem
} from "native-base";

import { StyleSheet} from 'react-native'
const TermsOfService = (props) => {
    return (
        <Container style={styles.container}>
            <Header style={{textAlign:'center'}}>
                <Left/>
                <Body>
                <Title>Terms of Service</Title>
                </Body>
            </Header>
            <Content padder>
                <Text>Content goes here (internal)</Text>

                <Button block style={{ margin: 15, marginTop: 50 }}
                        onPress={props.onAccept}
                >
                    <Text>Accept</Text>
                </Button>
                <Button block style={{ margin: 15, marginTop: 50,backgroundColor: '#808080' }}
                        onPress={props.onDecline}
                >
                    <Text>Decline</Text>
                </Button>
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
})
export default TermsOfService;

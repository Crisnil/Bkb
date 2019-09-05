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
    Item, View,CheckBox,ListItem,
    H3
} from "native-base";

import { StyleSheet,BackHandler} from 'react-native'
const TermsOfService = (props) => {
    //console.log("modalprops",props);
    return (
        <Container style={styles.container}>
            <Header style={{textAlign:'center'}}>
                <Left/>
                <Body>
                <Title>Terms of Service</Title>
                </Body>
            </Header>
            <Content padder>
                <Text style={{justifyContent:'center'}}>
                    <H3>{props.problem.description}</H3>
                </Text>

                <Text>Eng: </Text>
                <Text style={{justifyContent:'space-around'}}>{props.problem.desc_content_eng}</Text>

                <Text>Ind: </Text>
                <Text style={{justifyContent:'space-around'}}>{props.problem.desc_content_indo}</Text>

                <Button block style={{ margin: 15, marginTop: 50 }} onPress={props.onAccept}>
                    <Text>Accept</Text>
                </Button>
                <Button block style={{ margin: 15, marginTop: 10,backgroundColor: '#808080' }} onPress={props.onDecline}>
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

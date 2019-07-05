import React, { Component } from "react";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    List,
    ListItem,
    Text,
    Thumbnail,
    Left,
    Body,
    Right
} from "native-base";

import {FlatList, StyleSheet} from "react-native";


const datas = [
    {

        text: "Sankhadeep",
        note: "Its time to build a difference . ."
    },
    {

        text: "Supriya",
        note: "One needs courage to be happy and smiling all time . . "
    },
    {

        text: "Shivraj",
        note: "Time changes everything . ."
    },
    {

        text: "Shruti",
        note: "The biggest risk is a missed opportunity !!"
    },
    {

        text: "Himanshu",
        note: "Live a life style that matchs your vision"
    },
    {

        text: "Shweta",
        note: "Failure is temporary, giving up makes it permanent"
    }
];

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    text: {
        alignSelf: "center",
        marginBottom: 7
    },
    mb: {
        marginBottom: 15
    }
})


class SrList extends Component {
    constructor(props) {
        super(props);
    }

    renderItems =({item})=>{
        return(
            <ListItem thumbnail>
                <Left>
                    <Icon name ="speedometer" />
                </Left>
                <Body>
                <Text>
                    {item.text}
                </Text>
                <Text numberOfLines={1} note>
                    {item.note}
                </Text>
                </Body>
                <Right>
                    <Button transparent
                            onPress={() => this.props.navigation.navigate("SrInformation")}
                    >
                        <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }
    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>SR History </Title>
                    </Body>
                    <Right />
                </Header>

                <Content>
                    <FlatList
                        data={datas}
                        keyExtractor={item => item.text}
                        renderItem={this.renderItems}
                    />
                </Content>
            </Container>
        );
    }
}

export default SrList;

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
    Right, FooterTab, Footer
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
                    <Icon name='checkmark-circle' />
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
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.container}>
                <Header>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()}
                    >
                        <Icon name="ios-menu" />
                    </Button>
                    <Body>
                    <Title>SR History </Title>
                    </Body>
                    <Right />
                </Header>

                <Content padder>
                    <FlatList
                        data={datas}
                        keyExtractor={item => item.text}
                        renderItem={this.renderItems}
                    />
                </Content>
                <Footer>
                    <FooterTab>
                        <Button >
                            <Icon type="MaterialIcons" name="check" />
                            <Text>Active</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="close" />
                            <Text>Archive</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default SrList;

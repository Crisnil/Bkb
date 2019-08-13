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

import {FlatList, StyleSheet,Modal} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SrDetailsView from "../components/SrDetailsView";
import CustomActivityIndicator from "../layout/CustomActivityIndicator";

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


export default  class Srlisting extends Component {
    constructor(props) {
        super(props);
        this.state= {
            modalVisible:false,
            fetching:false,
            activity:true
        }
    }

    onClickDetails =()=>{
        this.setState({ fetching: true,activity:true });
        setTimeout(() => {
            this.setState({modalVisible:true,
                fetching: false,activity:false
            })
        }, 500);
    }

    onClose = ()=>{
        this.setState({modalVisible:!this.state.modalVisible})
    }


    renderItems =({item})=>{

        return(
            <ListItem thumbnail>
                <Left>
                    <MaterialCommunityIcons name='calendar-clock' style={{fontSize:35,color:'#45D56E'}}/>
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
                            onPress={this.onClickDetails}
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

                <Content padder>
                    {this.state.fetching ?
                        <CustomActivityIndicator
                            animating={true}
                            text="Loggin in..."
                            color="#D44638"
                        />
                        : null
                    }
                        <FlatList
                            data={datas}
                            keyExtractor={item => item.text}
                            renderItem={this.renderItems}
                        />


                    {this.state.modalVisible?
                        <SrDetailsView
                            modalVisible={this.state.modalVisible}
                            onClose={this.onClose}
                        /> :
                        null
                    }
                </Content>
            </Container>
        );
    }
}

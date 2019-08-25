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
import LazyLoadList from "../layout/LazyLoadList";


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
            modalVisible: false,
            fetching: false,
            activity: true,
            item: null,
            isFetching:false
        }
    }

    onClickDetails =(item)=>{
        return(e)=> {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
                modalVisible: true,
                item: item
            });
            // setTimeout(() => {
            //     this.setState({modalVisible:true,
            //         fetching: false,activity:false
            //     })
            // }, 500);
        }
    }

    onClose = ()=>{
        this.setState({modalVisible:false,item:null})
    }


    renderItems =(item,x)=>{
        return(
            <ListItem icon key={x} onPress={this.onClickDetails(item)}>
                <Left>
                    <Button style={{ backgroundColor: "#007AFF" }}>
                        <Icon active name="build" />
                    </Button>
                </Left>
                <Body>
                    <Text>{item.item.srid}</Text>
                </Body>
                <Right>
                    <Text>{item.item.servicerequeststatus.description}</Text>
                    <Icon active name="update" />
                    </Right>
            </ListItem>

        )
    }

    reFreshing =()=>{
        this.setState({ isFetching: true },()=>this.props.fetchSrHistory());
        setTimeout(() => {
            this.setState({ isFetching: false });
            console.log("after refresh")
        }, 500);
    }

    render() {
        const{srs}=this.props.service;
        return (
            <Container style={styles.container}>

                <Content padder>
                    {/*{this.state.fetching ?*/}
                        {/*<CustomActivityIndicator*/}
                            {/*animating={true}*/}
                            {/*text="Loggin in..."*/}
                            {/*color="#D44638"*/}
                        {/*/>*/}
                        {/*: null*/}
                    {/*}*/}

                    <LazyLoadList
                        data={srs}
                        renderItem={this.renderItems}
                        onRefresh={this.reFreshing}
                        refreshing={this.state.isFetching}

                    />
                        {/*<FlatList*/}
                            {/*data={srs}*/}
                            {/*keyExtractor={(item,x) => x.toString()}*/}
                            {/*renderItem={this.renderItems}*/}
                        {/*/>*/}


                    {this.state.modalVisible?
                        <SrDetailsView
                            modalVisible={this.state.modalVisible}
                            itemDetails={this.state.item}
                            onClose={this.onClose}
                        /> :
                        null
                    }
                </Content>
            </Container>
        );
    }
}

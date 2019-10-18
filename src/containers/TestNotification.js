import React ,{Component}from 'react';
import {
    Text,
    View,
    Button,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {Body, Container, Content, Header, Left, Title} from "native-base";

class TestNotification extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.intervalId();
    }
     intervalId = () => {
        BackgroundTimer.setInterval(() => {
             // this will be executed every 200 ms
             // even when app is the the background
             console.log(`tic ${new Date()}`);
         }, 10000);
     }

    render(){

         return(
             <Container >

                 <Header style={{textAlign:'center'}}>
                     <Left/>
                     <Body>
                     <Title>Terms and Condition</Title>
                     </Body>
                 </Header>

                 <Content padder>
                     <Text>Content goes here (internal)</Text>
                 </Content>
             </Container>
         )
    }

}

export default TestNotification;
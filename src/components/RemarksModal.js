import React, {Component} from "react";
import {Dimensions, Image, Modal, TextInput, View} from "react-native";
import {

    Body,
    Button,
    Container,
    Content,
    Footer,
    FooterTab,
    Form,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Title,
    Textarea
} from "native-base";


class RemarksModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,

        };
    }
    render() {

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.remarksVisible}
                onRequestClose={ this.props.onClose}>
                <Container>
                    <Header>
                        <Left/>
                        <Body>
                        <Title>{this.props.selectedRemarks} Remarks</Title>
                        </Body>
                        {/*<Right>*/}
                        {/*<MaterialCommunityIcons name="account-outline" style={{marginRight:10,color:'#fff',fontSize:27}}*/}
                        {/*onPress={this.props.onClose}*/}
                        {/*/>*/}
                        {/*</Right>*/}
                    </Header>
                    <Content padder>
                        <Form>
                            <Text>Remarks:</Text>
                            <Textarea rowSpan={5} bordered placeholder="Describe you problem here"
                                      onChangeText={this.props.onChangeText}
                                      value={(this.props.selectedRemarks =='Pickup')?this.props.pickupRemarks : this.props.destinationRemarks}
                            />
                            <View style={{marginTop:10}}>
                                <Button full primary onPress={this.props.onClose}>
                                    <Text>OK</Text>
                                </Button>
                            </View>
                        </Form>
                    </Content>
                </Container>
            </Modal>
        );
    }
}

export default RemarksModal;

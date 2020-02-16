import React from "react";
import {Paragraph, Title} from "react-native-paper";
import {StatusBar, StyleSheet, Text, View} from "react-native";
import A from "../../partials/A";
import Br from "../../partials/Br";
import {HIGHLIGHT_COLOR} from "../../Theme";

class DisclaimerPage extends React.Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <StatusBar backgroundColor={HIGHLIGHT_COLOR} animated={true}/>
                <Title style={styles.title}>This application is provided by:</Title>
                <Paragraph style={styles.paragraph}>
                    David Schwarz<Br/>
                    Herzogenburger Straße 34/1/9<Br/>
                    3100 St. Pölten
                </Paragraph>
                <Paragraph style={styles.paragraph}>
                    Tel: +43 (0) 678 1240330<Br/>
                    E-Mail: schwarz.david10@gmail.com
                </Paragraph>
                <Title style={styles.title}>Used API:</Title>
                <Paragraph style={styles.paragraph}>
                    <Text>Forex API (<A href="https://fcsapi.com/">https://fcsapi.com/</A>)</Text>
                </Paragraph>
                <Title style={styles.title}>Graphics:</Title>
                <Paragraph style={styles.paragraph}>
                    <Text>Icon from <A href="http://clipart-library.com/">http://clipart-library.com</A> - Not for
                        commercial use</Text>
                </Paragraph>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    paragraph: {
        marginTop: 20
    },
    title: {
        marginTop: 30
    },
    wrapper: {
        paddingHorizontal: 15
    }
});

export default DisclaimerPage

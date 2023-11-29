import React from "react";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet } from "react-native";

import OrphanageParams from "../../interfaces/OrphanageParams";

    export default function OrphanageData() {
        const route = useRoute();
        const params = route.params as OrphanageParams;

            return (
                <ScrollView style={ styles.container }>
                    <View style={ styles.containerWrapper }>
                        <Text style={ styles.title }>Dados</Text>
                                    <View style={ styles.separator }/>
                        <Text style={ styles.label }>Nome</Text>
                            <TextInput style={ styles.input }/>
                                    <View style={ styles.labelContainer }>
                                        <Text style={ styles.label }>Sobre</Text>
                                        <Text style={ styles.comment }>Máximo de 300 caracteres</Text>
                                    </View>
                            <TextInput style={[ styles.input, { height: 110 } ]} multiline/>
                        <Text style={ styles.label }>WhatsApp</Text>
                            <TextInput style={ styles.input }/>
                        <Text style={ styles.label }>Fotos</Text>
                                <TouchableOpacity style={ styles.imagesInput } onPress={ () => {} }>
                                    <Feather name="plus" size={ 24 } color="#15B6D6"/>
                                </TouchableOpacity>
                        <Text style={[ styles.title, styles.secondInputContainer ]}>Visitação</Text>
                                    <View style={ styles.separator }/>
                        <Text style={ styles.label }>Instruções</Text>
                            <TextInput style={[ styles.input, { height: 110 } ]} multiline/>
                        <Text style={ styles.label }>Horário de funcionamento</Text>
                            <TextInput style={ styles.input }/>
                                    <View style={ styles.switchContainer }>
                                        <Text style={ styles.label }>Atende final de semana?</Text>
                                            <Switch thumbColor="#FFFFFF" trackColor={{ false: "#CCCCCC", true: "#39CC83" }}/>
                                    </View>
                                        <RectButton style={ styles.nextButton } onPress={ () => {} }>
                                            <Feather name="save" size={ 24 } color="#FFFFFF"/>
                                                <Text style={ styles.nextButtonText }>Cadastrar</Text>
                                        </RectButton>
                    </View>
                </ScrollView>
            );
    };

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                padding: 20
            },
            containerWrapper: {
                borderRadius: 20,
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: "#D3E2E5",
                marginBottom: 40,
                overflow: "hidden",
                padding: 24
            },
            title: {
                color: "#5c8599",
                fontSize: 27,
                fontFamily: "Nunito_700Bold",
                paddingBottom: 24,
                borderBottomWidth: 1,
                borderBottomColor: "#D3E2E6"
            },
            separator: {
                height: 1,
                width: "100%",
                backgroundColor: "#D3E2E6",
                marginBottom: 40
            },
            label: {
                color: "#8FA7B3",
                fontFamily: "Nunito_600SemiBold",
                marginBottom: 8,
                fontSize: 18
            },
            input: {
                backgroundColor: "#F5F8FA",
                borderWidth: 1.5,
                borderColor: "#D3E2E5",
                borderRadius: 20,
                height: 60,
                paddingVertical: 18,
                paddingHorizontal: 24,
                marginBottom: 24,
                textAlignVertical: "top"
            },
            labelContainer: {
                flexDirection: "row",
                alignItems: "center"
            },
            comment: {
                marginLeft: 24,
                marginBottom: 8,
                fontSize: 14,
                color: "#8FA7B3"
            },
            imagesInput: {
                backgroundColor: "#FFFFFF",
                borderStyle: "dashed",
                borderColor: '#96D2F0',
                borderWidth: 1.5,
                borderRadius: 20,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24
            },
            switchContainer: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            },
            nextButton: {
                backgroundColor: "#3CDC8C",
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: 60,
                marginTop: 40,
            },
            nextButtonText: {
                fontFamily: "Nunito_800ExtraBold",
                fontSize: 18,
                color: "#FFFFFF",
                marginLeft: 10
            },
            secondInputContainer: {
                marginTop: 40
            }
        });
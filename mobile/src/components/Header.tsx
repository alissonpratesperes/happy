import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";

import HeaderProps from "../interfaces/HeaderProps";

    export default function Header({ title, showCancel = true }: HeaderProps) {
        const navigation = useNavigation<any>();

            function handleGoBackToAppInitialScreen() {
                navigation.navigate (
                    "OrphanagesMap"
                );
            };

                return (
                    <View style={ styles.container }>
                        <BorderlessButton onPress={ navigation.goBack }>
                            <Feather name="arrow-left" size={ 24 } color="#15B6D6"/>
                        </BorderlessButton>
                            <Text style={ styles.title }>{ title }</Text>
                                { showCancel ? (
                                    <BorderlessButton onPress={ handleGoBackToAppInitialScreen }>
                                        <Feather name="x" size={ 24 } color="#FF669D"/>
                                    </BorderlessButton>
                                ) : (
                                    <View/>
                                ) }
                    </View>
                );
    };

        const styles = StyleSheet.create({
            container: {
                paddingHorizontal: 24,
                paddingVertical: 12,
                backgroundColor: "#F9FAFC",
                borderBottomWidth: 1,
                borderColor: "#DDE3F0",
                paddingTop: 44,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            },
            title: {
                fontFamily: "Nunito_600SemiBold",
                color: "#8FA7B3",
                fontSize: 18
            }
        });
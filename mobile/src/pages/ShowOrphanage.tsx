import React from "react";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

import mapMarkerImg from "../images/map-marker.png";

    export default function ShowOrphanage() {
        return (
            <ScrollView style={ styles.container }>
                <View style={ styles.containerWrapper }>
                    <View style={ styles.imagesContainer }>
                        <ScrollView horizontal pagingEnabled>
                            <Image style={ styles.image } source={{ uri: "https://fmnova.com.br/images/noticias/safe_image.jpg" }}/>
                            <Image style={ styles.image } source={{ uri: "https://fmnova.com.br/images/noticias/safe_image.jpg" }}/>
                            <Image style={ styles.image } source={{ uri: "https://fmnova.com.br/images/noticias/safe_image.jpg" }}/>
                        </ScrollView>
                    </View>
                    <View style={ styles.detailsContainer }>
                        <Text style={ styles.title }>Orf. Esperança</Text>
                        <Text style={ styles.description }>Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.</Text>
                            <View style={styles.mapContainer}>
                                <MapView style={ styles.mapStyle } initialRegion={{ latitude: -27.2092052, longitude: -49.6401092, latitudeDelta: 0.008, longitudeDelta: 0.008 }} zoomEnabled={ false } pitchEnabled={ false } scrollEnabled={ false } rotateEnabled={ false }>
                                    <Marker icon={ mapMarkerImg } coordinate={{ latitude: -27.2092052, longitude: -49.6401092 }}/>
                                </MapView>
                                    <View style={ styles.routesContainer }>
                                        <Feather name="navigation" size={ 24 } color="#0089A5"/>
                                            <Text style={ styles.routesText }>Ver rotas no Google Maps</Text>
                                    </View>
                            </View>
                            <View style={ styles.separator }/>
                        <Text style={ styles.title }>Instruções para visita</Text>
                        <Text style={ styles.description }>Venha como se sentir a vontade e traga muito amor e paciência para dar.</Text>
                            <View style={ styles.scheduleContainer }>
                                <View style={[ styles.scheduleItem, styles.scheduleItemBlue ]}>
                                    <Feather name="clock" size={ 32 } color="#2AB5D1"/>
                                        <Text style={[ styles.scheduleText, styles.scheduleTextBlue ]}>Segunda a Sexta {"\n"}Das 8h às 18h</Text>
                                </View>
                                <View style={[ styles.scheduleItem, styles.scheduleItemGreen ]}>
                                    <Feather name="info" size={ 32 } color="#39CC83"/>
                                        <Text style={[ styles.scheduleText, styles.scheduleTextGreen ]}>Atendemos {"\n"}fim de semana</Text>
                                </View>
                            </View>
                    </View>
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
                overflow: "hidden"
            },
            imagesContainer: {
                height: 300,
                flexDirection: "row"
            },
            image: {
                width: Dimensions.get("window").width - 42,
                height: 300,
                resizeMode: "cover"
            },
            detailsContainer: {
                padding: 24
            },
            title: {
                fontFamily: "Nunito_700Bold",
                fontSize: 27,
                color: "#4D6F80"
            },
            description: {
                fontFamily: "Nunito_600SemiBold",
                color: "#5C8599",
                lineHeight: 24,
                marginTop: 16
            },
            mapContainer: {
                borderRadius: 20,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#B3DAE2",
                marginTop: 40,
                backgroundColor: "#E6F7FB"
            },
            mapStyle: {
                width: "100%",
                height: 180
            },
            routesContainer: {
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            },
            routesText: {
                fontFamily: "Nunito_700Bold",
                fontSize: 15,
                color: "#0089A5",
                marginLeft: 10
            },
            separator: {
                height: 1,
                width: "100%",
                backgroundColor: "#D3E2E6",
                marginVertical: 40
            },
            scheduleContainer: {
                marginTop: 24,
                flexDirection: "row",
                justifyContent: "space-between"
            },
            scheduleItem: {
                width: "48%",
                paddingVertical: 21,
                paddingHorizontal: 13
            },
            scheduleItemBlue: {
                backgroundColor: "#E6F7FB",
                borderWidth: 1,
                borderColor: "#B3DAE2",
                borderRadius: 20
            },
            scheduleItemGreen: {
                backgroundColor: "#EDFFF6",
                borderWidth: 1,
                borderColor: "#A1E9C5",
                borderRadius: 20
            },
            scheduleText: {
                fontFamily: "Nunito_600SemiBold",
                fontSize: 14,
                lineHeight: 24,
                marginTop: 20
            },
            scheduleTextBlue: {
                color: "#2AB5D1"
            },
            scheduleTextGreen: {
                color: "#37C77F"
            }
        });
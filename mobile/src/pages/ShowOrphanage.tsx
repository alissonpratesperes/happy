import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Linking } from "react-native";

import api from "../services/api";
import Orphanage from "../interfaces/Orphanage";
import mapMarkerImg from "../images/map-marker.png";
import OrphanageParams from "../interfaces/OrphanageParams";

    export default function ShowOrphanage() {
        const route = useRoute();
        const params = route.params as OrphanageParams;
        const [ orphanage, setOrphanage ] = useState<Orphanage>();

            useEffect(() => { api.get(`orphanages/${ params.id }`).then(response => { setOrphanage(response.data); }); }, [ params.id ]);

                function handleOpenGoogleMapsRoutes() {
                    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${ orphanage?.latitude },${ orphanage?.longitude }`);
                };

                    if(!orphanage) {
                        return (
                            <View style={ styles.container }>
                                <Text style={ styles.description }> Carregando... </Text>
                            </View>
                        );
                    };

                        return (
                            <ScrollView style={ styles.container }>
                                <View style={ styles.containerWrapper }>
                                    <View style={ styles.imagesContainer }>
                                        <ScrollView horizontal pagingEnabled>
                                            { orphanage.images.map(image => {
                                                return (
                                                    <Image style={ styles.image } key={ image.id } source={{ uri: image.url }}/>
                                                );
                                            }) }
                                        </ScrollView>
                                    </View>
                                    <View style={ styles.detailsContainer }>
                                        <Text style={ styles.title }>{ orphanage.name }</Text>
                                        <Text style={ styles.description }>{ orphanage.about }</Text>
                                            <View style={styles.mapContainer}>
                                                <MapView style={ styles.mapStyle } initialRegion={{ latitude: orphanage.latitude, longitude: orphanage.longitude, latitudeDelta: 0.008, longitudeDelta: 0.008 }} zoomEnabled={ false } pitchEnabled={ false } scrollEnabled={ false } rotateEnabled={ false } provider={ PROVIDER_GOOGLE }>
                                                    <Marker icon={ mapMarkerImg } coordinate={{ latitude: orphanage.latitude, longitude: orphanage.longitude }}/>
                                                </MapView>
                                                    <TouchableOpacity style={ styles.routesContainer } onPress={ handleOpenGoogleMapsRoutes }>
                                                        <Feather name="navigation" size={ 24 } color="#0089A5"/>
                                                            <Text style={ styles.routesText }>Ver rotas no Google Maps</Text>
                                                    </TouchableOpacity>
                                            </View>
                                            <View style={ styles.separator }/>
                                        <Text style={ styles.title }>Instruções para visita</Text>
                                        <Text style={ styles.description }>{ orphanage.instructions }</Text>
                                            <View style={ styles.scheduleContainer }>
                                                <View style={[ styles.scheduleItem, styles.scheduleItemBlue ]}>
                                                    <Feather name="clock" size={ 32 } color="#2AB5D1"/>
                                                        <Text style={[ styles.scheduleText, styles.scheduleTextBlue ]}>Segunda a Sexta {"\n"}{ orphanage.opening_hours }</Text>
                                                </View>
                                                    { orphanage.open_on_weekends ? (
                                                        <View style={[ styles.scheduleItem, styles.scheduleItemGreen ]}>
                                                            <Feather name="info" size={ 32 } color="#39CC83"/>
                                                                <Text style={[ styles.scheduleText, styles.scheduleTextGreen ]}>Atendemos {"\n"}fim de semana</Text>
                                                        </View>
                                                    ) : (
                                                        <View style={[ styles.scheduleItem, styles.scheduleItemRed ]}>
                                                            <Feather name="info" size={ 32 } color="#FF669D"/>
                                                                <Text style={[ styles.scheduleText, styles.scheduleTextRed ]}>Não atendemos {"\n"}fim de semana</Text>
                                                        </View>
                                                    ) }
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
                height: 200,
                flexDirection: "row"
            },
            image: {
                width: Dimensions.get("window").width - 42,
                height: 200,
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
                height: 125
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
            scheduleItemRed: {
                backgroundColor: "#FEF6F9",
                borderWidth: 1,
                borderColor: "#FFBCD4",
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
            },
            scheduleTextRed: {
                color: "#FF669D"
            }
        });
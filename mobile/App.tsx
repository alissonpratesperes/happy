import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Alert, ActivityIndicator, StatusBar, TouchableOpacity } from "react-native";

import mapMarker from "./src/images/map-marker.png";

    export default function App() {
        const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0, 0]);

            useEffect(() => {
                async function loadPosition() {
                    const { status } = await Location.requestForegroundPermissionsAsync();
                        if(status != "granted") {
                            Alert.alert("Ooops...", "Precisamos da sua permissão para obtermos a localização.");
                                return;
                        } else {
                            const location = await Location.getCurrentPositionAsync();
                            const { latitude, longitude } = location.coords;
                                setInitialPosition([ latitude, longitude ]);
                        };
                };
                    loadPosition();
            }, []);

                return (
                    <View style={ styles.container }>
                        { initialPosition[0] === 0 && initialPosition[1] === 0 ? (
                            <View style={ styles.loadingMapContainer }>
                                <ActivityIndicator size="large" color="#000000"/>
                                    <Text style={ styles.loadingMapText }> Carregando... </Text>
                            </View>
                        ) : (
                            <>
                                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
                                    <MapView style={ styles.map } initialRegion={{ latitude: initialPosition[0], longitude: initialPosition[1], latitudeDelta: 0.014, longitudeDelta: 0.014 }} provider={ PROVIDER_GOOGLE }>
                                        <Marker icon={ mapMarker } coordinate={{ latitude: initialPosition[0], longitude: initialPosition[1] }} calloutAnchor={{ x: 2.8, y: 0.85 }}>
                                            <Callout tooltip onPress={ () => {} }>
                                                <View style={ styles.calloutContainer }>
                                                    <Text style={ styles.calloutText }> São Marquinhos </Text>
                                                </View>
                                            </Callout>
                                        </Marker>
                                    </MapView>
                                        <View style={ styles.footerContainer }>
                                            <Text style={ styles.footerText }> 2 orfanatos encontrados </Text>
                                                <TouchableOpacity style={ styles.createOrphanageButton } onPress={ () => {} }>
                                                    <Feather name="plus" size={ 32 } color="#FFFFFF"/>
                                                </TouchableOpacity>
                                        </View>
                            </>
                        ) } 
                    </View>
                );
    };

        const styles = StyleSheet.create({
            container: {
                flex: 1
            },
            map: {
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height
            },
            loadingMapContainer: {
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
                alignItems: "center",
                justifyContent: "center"
            },
            loadingMapText: {
                marginTop: 16
            },
            calloutContainer: {
                width: 160,
                height: 46,
                paddingHorizontal: 16,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: 16,
                justifyContent: "center"
            },
            calloutText: {
                color: "#0089A5",
                fontSize: 15
            },
            footerContainer: {
                position: "absolute",
                left: 30,
                right: 30,
                bottom: 30,
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                height: 60,
                paddingLeft: 20,
                paddingRight: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            },
            footerText: {
                color: "#8FA7B3",
                fontSize: 15
            },
            createOrphanageButton: {
                width: 50,
                height: 50,
                backgroundColor: "#15C3D6",
                borderRadius: 17,
                alignItems: "center",
                justifyContent: "center"
            }
        });
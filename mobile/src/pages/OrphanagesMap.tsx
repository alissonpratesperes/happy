import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Alert, ActivityIndicator } from "react-native";

import mapMarker from "../images/map-marker.png";

    export default function OrphanagesMap() {
        const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0, 0]);
        const navigation = useNavigation();

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

                function handleNavigateToShowOrphanage() {
                    navigation.navigate("ShowOrphanage" as never);
                };
                function handeNavigateToCreateOrphanage() {
                    navigation.navigate("SelectMapPosition" as never);
                };

                    return (
                        <View style={ styles.container }>
                            { initialPosition[0] === 0 && initialPosition[1] === 0 ? (
                                <View style={ styles.loadingMapContainer }>
                                    <ActivityIndicator size="large" color="#000000"/>
                                        <Text style={ styles.loadingMapText }> Carregando... </Text>
                                </View>
                            ) : (
                                <>
                                    <MapView style={ styles.map } initialRegion={{ latitude: initialPosition[0], longitude: initialPosition[1], latitudeDelta: 0.014, longitudeDelta: 0.014 }} provider={ PROVIDER_GOOGLE }>
                                        <Marker icon={ mapMarker } coordinate={{ latitude: initialPosition[0], longitude: initialPosition[1] }} calloutAnchor={{ x: 3.1, y: 0.85 }}>
                                            <Callout tooltip onPress={ handleNavigateToShowOrphanage }>
                                                <View style={ styles.calloutContainer }>
                                                    <Text style={ styles.calloutText }> São Marquinhos </Text>
                                                        <View style={ styles.calloutBadge }>
                                                            <Feather name="arrow-right" size={ 24 } color="#FFFFFF"/>
                                                        </View>
                                                </View>
                                            </Callout>
                                        </Marker>
                                    </MapView>
                                        <View style={ styles.footerContainer }>
                                            <Text style={ styles.footerText }> 2 orfanatos encontrados </Text>
                                                <RectButton style={ styles.createOrphanageButton } onPress={ handeNavigateToCreateOrphanage }>
                                                    <Feather name="plus" size={ 32 } color="#FFFFFF"/>
                                                </RectButton>
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
                width: 190,
                height: 46,
                paddingHorizontal: 6,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            },
            calloutText: {
                color: "#0089A5",
                fontSize: 15,
                fontFamily: "Nunito_700Bold"
            },
            calloutBadge: {
                width: 35,
                height: 35,
                backgroundColor: "#15C3D6",
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center"
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
                fontSize: 15,
                fontFamily: "Nunito_700Bold"
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
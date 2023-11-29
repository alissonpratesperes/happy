import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Alert, ActivityIndicator } from "react-native";

import api from "../services/api";
import mapIcon from "../images/map-marker.png";
import Orphanage from "../interfaces/Orphanage";

    export default function OrphanagesMap() {
        const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0, 0]);
        const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);
        const navigation = useNavigation<any>();

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
            useFocusEffect(() => {
                api.get("/orphanages").then(response => {
                    setOrphanages(response.data);
                });
            });

                function handleNavigateToShowOrphanage(id: number) {
                    navigation.navigate(
                        "ShowOrphanage", {
                            id
                        }
                    );
                };
                function handeNavigateToCreateOrphanage() {
                    navigation.navigate("SelectMapPosition");
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
                                        { orphanages.map(orphanage => {
                                            return (
                                                <Marker icon={ mapIcon } coordinate={{ latitude: orphanage.latitude, longitude: orphanage.longitude }} calloutAnchor={{ x: 3.1, y: 0.85 }} key={ orphanage.id }>
                                                    <Callout tooltip onPress={ () => handleNavigateToShowOrphanage(orphanage.id) }>
                                                        <View style={ styles.calloutContainer }>
                                                            <Text style={ styles.calloutText }> { orphanage.name } </Text>
                                                                <View style={ styles.calloutBadge }>
                                                                    <Feather name="arrow-right" size={ 24 } color="#FFFFFF"/>
                                                                </View>
                                                        </View>
                                                    </Callout>
                                                </Marker>
                                            );
                                        }) }
                                    </MapView>
                                        <View style={ styles.footerContainer }>
                                            <Text style={ styles.footerText }> { orphanages.length } orfanatos encontrados </Text>
                                                <RectButton style={ styles.createOrphanageButton } onPress={ handeNavigateToCreateOrphanage }>
                                                    <Feather name="plus" size={ 24 } color="#FFFFFF"/>
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
                backgroundColor: "#FFFFFF",
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
                paddingRight: 7,
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
                width: 47,
                height: 47,
                backgroundColor: "#15C3D6",
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center"
            }
        });
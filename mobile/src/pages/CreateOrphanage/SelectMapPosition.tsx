import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from "react-native";

import mapIcon from "../../images/map-marker.png";

    export default function SelectMapPosition() {
        const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0, 0]);
        const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 });
        const navigation = useNavigation<any>();

            useEffect(() => {
                async function loadPosition() {
                    const location = await Location.getCurrentPositionAsync();
                    const { latitude, longitude } = location.coords;
                        setInitialPosition([ latitude, longitude ]);
                };
                    loadPosition();
            }, []);

                function handleNextStep() {
                    navigation.navigate(
                        "OrphanageData", {
                            position
                        }
                    );
                };
                function handleSelectMapPosition(event: any) {
                    setPosition(event.nativeEvent.coordinate);
                };

                    return (
                        <View style={ styles.container }>
                            { initialPosition[0] === 0 && initialPosition[1] === 0 ? (
                                <View style={ styles.loadingMapContainer }>
                                    <ActivityIndicator size="large" color="#000000"/>
                                        <Text style={ styles.loadingMapText }>Carregando...</Text>
                                </View>
                            ) : (
                                <>
                                    <MapView style={ styles.map } initialRegion={{ latitude: initialPosition[0], longitude: initialPosition[1], latitudeDelta: 0.014, longitudeDelta: 0.014 }} provider={ PROVIDER_GOOGLE } onPress={ handleSelectMapPosition }>
                                        { position.latitude !== 0 && position.longitude !== 0 && (
                                            <Marker icon={ mapIcon } coordinate={{ latitude: position.latitude, longitude: position.longitude }}/>
                                        ) }
                                    </MapView>
                                        { position.latitude !== 0 && position.longitude !== 0 && (
                                            <RectButton style={ styles.nextButton } onPress={ handleNextStep }>
                                                <Feather name="log-in" size={ 24 } color="#FFFFFF"/>
                                                    <Text style={ styles.nextButtonText }>Próximo</Text>
                                            </RectButton>
                                        ) }
                                </>
                            ) }
                        </View>
                    );
    };

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                position: "relative"
            },
            loadingMapContainer: {
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height - 82,
                alignItems: "center",
                justifyContent: "center"
            },
            loadingMapText: {
                marginTop: 16
            },
            map: {
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height - 82
            },
            nextButton: {
                backgroundColor: "#15C3D6",
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: 60,
                position: "absolute",
                left: 30,
                right: 30,
                bottom: 30
            },
            nextButtonText: {
                fontFamily: "Nunito_800ExtraBold",
                fontSize: 15,
                color: "#FFFFFF",
                marginLeft: 10
            }
        });
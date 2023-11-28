import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";

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
                        <MapView style={ styles.map } initialRegion={{ latitude: initialPosition[0], longitude: initialPosition[1], latitudeDelta: 0.014, longitudeDelta: 0.014 }} provider={ PROVIDER_GOOGLE }/>
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
            }
        });
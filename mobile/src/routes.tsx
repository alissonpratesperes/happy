import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OrphanagesMap from "./pages/OrphanagesMap";
import ShowOrphanage from "./pages/ShowOrphanage";

    const { Navigator, Screen } = createStackNavigator();

        export default function Routes() {
            return (
                <NavigationContainer>
                    <Navigator screenOptions={{ headerShown: false }}>
                        <Screen name="OrphanagesMap" component={ OrphanagesMap }/>
                        <Screen name="ShowOrphanage" component={ ShowOrphanage }/>
                    </Navigator>
                </NavigationContainer>
            );
        };
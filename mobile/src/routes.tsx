import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "./components/Header";
import OrphanagesMap from "./pages/OrphanagesMap";
import ShowOrphanage from "./pages/ShowOrphanage";
import OrphanageData from "./pages/CreateOrphanage/OrphanageData";
import SelectMapPosition from "./pages/CreateOrphanage/SelectMapPosition";

    const { Navigator, Screen } = createStackNavigator();

        export default function Routes() {
            return (
                <NavigationContainer>
                    <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: "#F2F3F5" } }}>
                        <Screen name="OrphanagesMap" component={ OrphanagesMap }/>
                        <Screen name="ShowOrphanage" component={ ShowOrphanage } options={{ headerShown: true, header: () => <Header title="Orfanato" showCancel={ false }/> }}/>
                        <Screen name="OrphanageData" component={ OrphanageData } options={{ headerShown: true, header: () => <Header title="Informe os dados"/> }}/>
                        <Screen name="SelectMapPosition" component={ SelectMapPosition } options={{ headerShown: true, header: () => <Header title="Selecione no mapa"/> }}/>
                    </Navigator>
                </NavigationContainer>
            );
        };
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import OrphanagesMap from "./pages/OrphanagesMap";

    function Router() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={ Landing }/>
                    <Route path="/app" Component={ OrphanagesMap }/>
                </Routes>
            </BrowserRouter>
        );
    };

        export default Router;
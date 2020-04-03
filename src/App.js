import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./assets/style/style.scss";
import Layout from "./Containers/Layout";

function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

export default App;

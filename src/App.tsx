import { APITester } from "./APITester";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import {useState} from "react";

export function App() {

    return (
        <div className="app">
            <h1>Login</h1>
            <APITester />
        </div>
    );
}
export default App;

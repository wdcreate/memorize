import React from 'react';
import AppBody from "./components/AppBody";
import { AuthContextProvider} from "./context/AuthContext";
import "./App.scss";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <div className="container">
       <AppBody /> 
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default App;

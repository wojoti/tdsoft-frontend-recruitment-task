import React from "react";
import { AppDataContextProvider } from "./contexts/AppData.context";
import { AppContainer } from "./App.styled";
import CharacterWidget from "./components/CharacterWidget";
import NavigationSection from "./components/NavigationSection";

const App: React.FC = () => {
  return (
    <AppDataContextProvider>
      <AppContainer>
        <CharacterWidget />
        <NavigationSection />
      </AppContainer>
    </AppDataContextProvider>
  );
};

export default App;

import { useContext } from "react";
import { AppDataContext } from "../../contexts/AppData.context";

const NavigationSection = () => {
  const { getNextCharacter, getPrevCharacter } = useContext(AppDataContext);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <button onClick={getPrevCharacter}>prev</button>
      <button onClick={getNextCharacter}>next</button>
    </div>
  );
};

export default NavigationSection;

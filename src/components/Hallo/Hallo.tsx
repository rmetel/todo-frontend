import { useState } from "react";

const Hallo = () => {
  const [name, setName] = useState("");

  return (
    <div>
      <h1>Hallo dear {name || "Gast"}</h1>
      <input
        type="text"
        placeholder="Geben Sie Ihren Namen ein"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default Hallo;

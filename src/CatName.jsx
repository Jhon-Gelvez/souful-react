import { useState } from "react";
import "./CatName.css";

function CatName() {
    const [gato, setGato] = useState("gojo");
    const handleIn = (e) => {
        e.target.value === "" ? setGato("gojo") : setGato(e.target.value);
    };
    return (
        <div className="hero-container">
            <h1>Hello Cat</h1>
            <span>
                El nombre de mi gato es <strong>{gato}</strong>
            </span>
            <br />
            <span>Do you want change his name?</span>
            <br />
            <input placeholder="write it here!" type="text" onChange={handleIn} />
        </div>
    );
}
export default CatName;

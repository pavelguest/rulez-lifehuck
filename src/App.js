import * as React from "react";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import { useClipboard } from "use-clipboard-copy";
import "./App.css";

const ItemComponent = ({ str }) => {
  return (
    <div>
      <p>{str}</p>
    </div>
  );
};

function App() {
  const folderNumRef = React.useRef();
  const productNameRef = React.useRef();
  const countPhotoRef = React.useRef();
  const [str, setStr] = React.useState("");
  const clipboard = useClipboard();

  const handleSubmit = (event) => {
    const cyrillicToTranslit = new CyrillicToTranslit();
    event.preventDefault();
    const folderNumValue = folderNumRef.current.value;
    const productNameValue = productNameRef.current.value;
    const countPhotoValue = countPhotoRef.current.value;

    const replaceProductName = productNameValue.replace(/[\.\/\(\)]/g, "-");

    const getPath = (pathNumber, str, count) =>
      `${pathNumber}/${str}-${count}.jpg|`;

    let result = "";
    for (let i = 1; i <= countPhotoValue; i++) {
      result += getPath(
        folderNumValue,
        cyrillicToTranslit.transform(replaceProductName, "-").toLowerCase(),
        i
      );
    }
    setStr(result.slice(0, -1));
    productNameRef.current.value = "";
    countPhotoRef.current.value = "";
  };

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <p>Folder number:</p>
          <input type="text" ref={folderNumRef} />
        </div>
        <div className="input-container">
          <p>Product Name:</p>
          <input type="text" ref={productNameRef} />
        </div>
        <div className="input-container">
          <p>Number of photos:</p>
          <input type="text" ref={countPhotoRef} />
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      <button onClick={() => clipboard.copy(str)} className="button">
        Copy Text
      </button>
      <ItemComponent str={str} />
    </div>
  );
}

export default App;

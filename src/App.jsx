import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [range, setRange] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumber] = useState(false);
  const [symbolsAllowed, setSymbol] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const passwordGenerator = () => {
      let availableChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwqxyz";
      const numbers = "1234567890";
      const symbols = "][~!@#$%^&*()";
      if (numberAllowed) {
        availableChars += numbers;
      }
      if (symbolsAllowed) {
        availableChars += symbols;
      }
      let pass = "";

      for (let i = 0; i < range; i++) {
        const index = Math.floor(Math.random() * availableChars.length);
        pass += availableChars.charAt(index);
      }
      setPassword(pass);
    };
    passwordGenerator();
  }, [range, symbolsAllowed, numberAllowed, setPassword]);

  const handleRangeChange = useCallback(
    (event) => {
      setRange(event.target.value);
    },
    [range, numberAllowed, symbolsAllowed]
  );

  const copyPassword = () => {
    inputRef.current.select();
    inputRef.current.setSelectionRange(0, 20);
    navigator.clipboard.writeText(inputRef.current.value);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <div className="text-2xl font-bold text-gray-800 text-center mb-6">
            Password Generator
          </div>
          <div className="flex items-center justify-between space-x-2 mb-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Generated password"
              readOnly={true}
              value={password}
              className="flex-1 p-2 border rounded-md bg-gray-50 text-gray-700"
            />
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>
          <div className="flex items-center justify-between mb-6">
            <label htmlFor="range" className="text-gray-600 font-medium">
              Password Length:
            </label>
            <input
              type="range"
              name="range"
              id="range"
              min={8}
              max={100}
              value={range}
              onChange={handleRangeChange}
              className="flex-1 mx-3 accent-blue-500"
            />
            <span className="text-gray-800 font-semibold">{range}</span>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-600 font-medium">
              <input
                type="checkbox"
                name="Number"
                id="number"
                onChange={() => setNumber((prev) => !prev)}
                className="mr-2 accent-blue-500"
              />
              Include Numbers
            </label>
            <label className="flex items-center text-gray-600 font-medium">
              <input
                type="checkbox"
                name="symbol"
                id="symbol"
                onChange={() => setSymbol((prev) => !prev)}
                className="mr-2 accent-blue-500"
              />
              Include Symbols
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

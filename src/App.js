import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Input from "./components/Input";
import List from "./components/List";

import api from "./services/api";
import debounce from "lodash.debounce";
const MIN_THRESHOLD = 3;
const WAIT_TIME = 2;

function App() {
  const [inputValue, setInput] = useState("");
  const [list, setList] = useState([]);
  const [fetching, setLoad] = useState(false);

  const callAPI = useCallback(async (value) => {
    try {
      const list = await api.get({ query: { q: value } });
      setList(list);
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  }, []);

  useEffect(() => {
    if (inputValue.length === "0") {
      setList([]);
    }
  }, [inputValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFn = useCallback(
    debounce(function (value) {
      callAPI(value);
    }, WAIT_TIME * 1000),
    [callAPI]
  );

  const handleInput = useCallback(
    ({ target: { value } }) => {
      setInput(value);
      if (value.length > MIN_THRESHOLD) {
        setLoad(true);
        debouncedFn(value);
      }
    },
    [debouncedFn]
  );

  return (
    <div className="App">
      <header className="App-header">Github Users</header>
      <main className="main-body centered p-absolute d-flex col">
        <Input
          fetching={fetching}
          inputValue={inputValue}
          handleInput={handleInput}
        />
        <List list={list} />
      </main>
    </div>
  );
}

export default App;

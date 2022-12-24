import { FormInput } from "./components/form";
import { useForms } from "./contexts/formContext";

function App() {
  const { input, text } = useForms();

  function ShowResponse({ text, input }) {
    return (
      <h2 className="text-center mt-4">
        Sentiment of "{text}" is {input}
      </h2>
    );
  }

  // const [response, setResponse] = useState([{}]);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => setResponse(data));
  // }, []);

  // console.log(response);

  return (
    <>
      <h1 className="mt-5 text-center">Sentiment Analyzer</h1>
      <FormInput />

      {input && <ShowResponse text={text} input={input} />}
    </>
  );
}

export default App;

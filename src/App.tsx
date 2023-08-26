import Header from "./components/Header";
import Messenger from "./components/Messenger";

function App() {


  return (
    <div className="bg-white h-screen p-8 opacity-95 [&>*]:opacity-100 text-opacity-100">
      <Header></Header>
      <Messenger/>
    </div>
  )
}

export default App

import "./App.css";
import Form from "./components/Form";
import ListReminders from "./components/ListReminders";

function App() {
  return (
    <div className="app">
      <div className="appMain">
        <h1 style={{color: 'Red'}}>NHẮC NHỞ NGÀY QUAN TRỌNG</h1>
        <div className="container">
          <div className="row">
            <Form />
            <ListReminders />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

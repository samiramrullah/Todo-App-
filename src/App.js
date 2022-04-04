import "./App.css";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
function App() {
  const [value, setvalue] = useState("");
  const [todos, settodos] = useState([]);
  const [editId, setEditId] = useState("");

  const fromSubmitHandler = (event) => {
    event.preventDefault();
    const newItem = {
      id: new Date().getTime(),
      title: value,
      status: false,
    };
    settodos([...todos].concat(newItem));
    setvalue("");
  };
  const deleteHandler = (id) => {
    // console.log('envoked');
    const updatedTodo = [...todos].filter((i) => i.id !== id);
    settodos(updatedTodo);
  };
  const statusChangeHandler = (id) => {
    console.log("Envoked");
    const updatedTodo = [...todos].map((i) => {
      if (i.id === id) {
        i.status = !i.status;
        if (i.status === true) {
          document.querySelector(`#title_text-${id}`).style.textDecoration =
            "line-through";
        } else {
          document.querySelector(`#title_text-${id}`).style.textDecoration =
            "none";
        }
      }
      return i;
    });
    settodos(updatedTodo);
  };

  const handleEditInputChange = (val, idx) => {
    const data = [...todos];
    data[idx].title = val;
    settodos(data);
  };
  return (
    <div className="App">
      <div className="heading">
        <h1>Todo App</h1>
      </div>
      <div className="form_main">
        <form onSubmit={fromSubmitHandler}>
          <div className="input_add">
            <div>
              <input
                className="input_box"
                onChange={(e) => setvalue(e.target.value)}
                type={"text"}
                value={value}
              ></input>
            </div>
            <div className="btn_add">
              <button type="submit">
                <AddIcon className="btn_icon_add" />
              </button>
            </div>
          </div>
        </form>
        <div className="todolist">
          {todos.map((i, idx) => (
            <div key={i.id}>
              {editId && editId === i.id ? (
                <input
                  value={i.title}
                  onChange={(e) => handleEditInputChange(e.target.value, idx)}
                />
              ) : (
                <div className={`title_text`} id={`title_text-${i.id}`}>
                  {i.title}
                </div>
              )}
              <div className="input_todolist">
                <button onClick={() => deleteHandler(i.id)}>
                  <span className="span_dlt">Delete</span>
                </button>
                <input
                  onChange={() => statusChangeHandler(i.id)}
                  type={"checkbox"}
                  checked={i.status}
                />
                {editId ? (
                  <button onClick={() => setEditId("")}>
                    <span className="span">Save</span>
                  </button>
                ) : (
                  <button onClick={() => setEditId(i.id)}>
                    <span className="span">Edit</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

// import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./MyComponents/Header";
import Todos from "./MyComponents/Todos";
import Todo from "./MyComponents/TodoItem";
import Footer from "./MyComponents/Footer";
import AddTodo from "./MyComponents/AddTodo";
import About from "./MyComponents/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    // console.log("I am on delete of todo", todo)
    // let newTodosList = [...todos]
    // let index = newTodosList.indexOf(todo)
    // newTodosList.splice(index, 1)
    // setTodos(newTodosList)

    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );

    // localStorage.getItem("todos")

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    // console.log("I am adding to this Todo.", title, desc)
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    // let newTodosList = [...todos]
    // newTodosList.push(myTodo)
    // setTodos(newTodosList)

    setTodos([...todos, myTodo]);
  };

  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={true} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            }
          />
          <Route exact path="/about" element={<About />} />
        </Routes>
        {/* <AddTodo addTodo={addTodo} />
        <Todos todos={todos} onDelete={onDelete} /> */}

        <Footer />
      </Router>
    </>
  );
}

export default App;

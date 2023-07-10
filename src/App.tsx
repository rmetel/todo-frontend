import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { Badge } from "react-bootstrap";
import "izitoast/dist/js/iziToast.min";
import { Tasks } from 'components';
import { useApi } from "hooks";
import { TaskView } from 'views';

const App = () => {
  const api = useApi();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Tasks/>}/>
          <Route path="/tasks/:taskId" element={<TaskView/>}/>
        </Routes>
      </Router>
      <h6 id={"apiVersion"}>
        <Badge bg="secondary">v{api.version}</Badge>
      </h6>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import { Badge } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tasks from './components/Tasks';
import "izitoast/dist/js/iziToast.min";
import { TaskView } from './views';

const App = () => {
  const [api, setApi] = useState({ version: "" });

  useEffect(() => {
    getApiVersion();
  }, []);

  const getApiUrl = () => {
    let isLocal = window.location.href.indexOf("localhost") > -1;
    let localHost = "http://localhost:5000";
    let apiEndpoint = "/api";
    return isLocal ? localHost + apiEndpoint : apiEndpoint;
  }

  const getApiVersion = () => {
    fetch(getApiUrl() + "/version")
      .then(response => response.json())
      .then(api => setApi(api));
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Tasks apiUrl={getApiUrl()}/>}/>
          <Route path="/tasks/:taskId" element={<TaskView apiUrl={getApiUrl()}/>}/>
        </Routes>
      </Router>
      <h6 id={"apiVersion"}>
        <Badge bg="secondary">v{api.version}</Badge>
      </h6>
    </div>
  );
}

export default App;

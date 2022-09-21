import React from 'react';
import './App.css';
import {Badge} from "react-bootstrap";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Tasks from './components/Tasks';
import TaskDetails from './components/TaskDetails';
import "izitoast/dist/js/iziToast.min";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.getApiUrl = this.getApiUrl.bind(this);
        this.getApiVersion = this.getApiVersion.bind(this);
        this.apiUrl = this.getApiUrl();
        this.state = {api: {}};
    }

    componentDidMount() {
        this.getApiVersion();
    }

    getApiUrl() {
        let isLocal = window.location.href.indexOf("localhost") > -1;
        let localHost = "http://localhost:8080";
        let apiEndpoint = "/api";
        return isLocal ? localHost + apiEndpoint : apiEndpoint;
    }

    getApiVersion() {
        fetch(this.apiUrl + "/version")
            .then(response => response.json())
            .then(data => this.setState({api: data}));
    }

    render() {
        const {api} = this.state;
        return (
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Tasks getApiUrl={this.getApiUrl}/>}/>
                        <Route path="/tasks/:taskId" element={<TaskDetails getApiUrl={this.getApiUrl}/>}/>
                    </Routes>
                </Router>
                <h6 id={"apiVersion"}>
                    <Badge bg="secondary">v{api.version}</Badge>
                </h6>
            </div>
        );
    }
}

export default App;

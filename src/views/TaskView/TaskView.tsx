import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import { TaskDetails } from "components";
import { getApiUrl, showToast } from "helpers";
import { Task } from 'models/Task';

export const TaskView: React.FC = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({ id: "", description: "", done: false });
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = getApiUrl();

  const saveTask = (task: Task) => {
    let params = {
      id: task.id,
      description: task.description,
      done: task.done
    };

    axios.put(apiUrl + "/tasks/" + task.id, params)
      .then(function (response) {
        showToast(`Task "${task.description}" wurde aktualisiert!`, 'success');
      })
      .catch(function (error) {
        showToast(`${error.name}: ${error.message}`, 'error');
      });
  }

  useEffect(() => {
    setIsLoading(true);

    fetch(apiUrl + "/tasks/" + taskId)
      .then(response => response.json())
      .then((task) => {
        setIsLoading(false);
        setTask(task);
      });
  }, [apiUrl, taskId])

  return (
    <Container className="mt-5">
      <div className="row d-flex justify-content-center">
        {isLoading ?
          <div className="col-md-10 mb-3">
            Lädt...
          </div>
          :
          <TaskDetails
            task={task}
            saveTask={saveTask}
          />
        }
      </div>
    </Container>
  );
}

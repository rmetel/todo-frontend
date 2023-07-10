import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Task } from '../../models/Task';
import { TaskDetails } from "../../components/TaskDetails/TaskDetails";
import { showToast } from "helpers";

interface TaskViewProps {
  apiUrl: string;
}

export const TaskView: React.FC<TaskViewProps> = ({ apiUrl }) => {
  const { taskId } = useParams();
  const [task, setTask] = useState({ id: "", description: "", done: false });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, description: e.target.value });
  }

  const onSave: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateTask(task);
  }

  const updateTask = (task: Task) => {
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
    fetch(apiUrl + "/tasks/" + taskId)
      .then(response => response.json())
      .then((task) => {
        setIsLoading(true);
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
            onChange={onChange}
            onSave={onSave}
          />
        }
      </div>
    </Container>
  );
}

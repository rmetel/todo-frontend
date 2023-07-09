import React from 'react';
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Task } from '../../models/Task';

interface TaskDetailsProps {
    task: Task;
    onChangeHandler: () => void;
    onSaveHandler: () => void;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onChangeHandler, onSaveHandler }) => {
    return (
        <Container className="mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8 mb-3">
                    {/*<NavLink to="/" className="text-dark">
                        <i className="bi-arrow-left"></i>&nbsp;Zurück</NavLink>*/}
                </div>
                <div className="col-md-8">
                    <div className="card mb-10">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="product p-4">
                                    <form>
                                        <div className="form-group mb-4">
                                            <input type="text"
                                                   className="form-control"
                                                   placeholder="Enter task name"
                                                   value={task.description}
                                                   onChange={onChangeHandler}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary" onClick={onSaveHandler}>Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

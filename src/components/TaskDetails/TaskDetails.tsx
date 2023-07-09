import React from 'react';
import { NavLink } from "react-router-dom";
import { Task } from '../../models/Task';

interface TaskDetailsProps {
    task: Task;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onChange, onSave }) => {
    return (
        <>
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
                                               onChange={onChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={onSave}>
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

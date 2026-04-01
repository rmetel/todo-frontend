import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute, Tasks } from "./components";
import { TaskView } from "./views";

export const router = createBrowserRouter([
  { path: "/", element: <Tasks /> },
  {
    path: "/secure",
    element: (
      <PrivateRoute>
        <h2>Secured Page</h2>
      </PrivateRoute>
    ),
  },
  { path: "/tasks/:taskId", element: <TaskView /> },
]);

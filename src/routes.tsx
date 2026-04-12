import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute, Tasks } from "./components";
import { TaskView } from "./views";
import { Hallo } from "./components/Hallo";

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
  { path: "/hello", element: <Hallo /> },
  { path: "/tasks/:taskId", element: <TaskView /> },
]);

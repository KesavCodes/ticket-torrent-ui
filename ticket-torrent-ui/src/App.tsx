import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Events from "./components/Events/Events.tsx";
import EventDetails from "./components/Events/EventDetails/EventDetails.tsx";
import NewEvent from "./components/Events/NewEvent.tsx";
import EditEvent from "./components/Events/EditEvent.tsx";

import { queryClient } from "./utils/https.ts";
import Home from "./components/Home.tsx";
import NewTicket from "./components/Tickets/NewTicket.tsx";
import Auth from "./components/Auth/Auth.tsx";
import Profile from "./components/Profile/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "events",
    element: <Events />,
    children: [
      {
        path: "new",
        element: <NewEvent />,
      },
      {
        path: ":id",
        element: <EventDetails />,
      },
      {
        path: ":id/edit",
        element: <EditEvent />,
      },
      {
        path: ":id/ticket/new",
        element: <NewTicket />, //NEED TO CREATE NEW ADD TICKET COMPONENT
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

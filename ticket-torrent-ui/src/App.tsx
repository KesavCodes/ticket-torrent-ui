import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Events from "./pages/Events.tsx";
import EventsRoot from "./pages/EventsRoot.tsx";
import EventDetails from "./components/Events/EventDetails/EventDetails.tsx";
import NewEvent from "./components/Events/NewEvent.tsx";
import EditEvent from "./components/Events/EditEvent.tsx";

import { queryClient } from "./utils/https.ts";
import Home from "./pages/Home.tsx";
import NewTicket from "./components/Tickets/NewTicket.tsx";
import Auth from "./components/Auth/Auth.tsx";
import Profile from "./components/Profile/Profile.tsx";
import Root from "./pages/Root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          { index: true, element: <Events /> },
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
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/profile",
        element: <Profile />,
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

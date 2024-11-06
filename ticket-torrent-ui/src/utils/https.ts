import { QueryClient } from "@tanstack/react-query";
import { EventRequest } from "../types/events.types";
import { TicketRequest } from "../types/tickets.types";

export const queryClient = new QueryClient();

export async function fetchEvents({
  signal,
  search,
  max,
}: {
  signal: AbortSignal;
  search?: string;
  max?: number;
}) {
  let url = "http://localhost:8080/events";

  if (search && max) {
    url += "/search?name=" + search + "&max=" + max;
  } else if (search) {
    url += "/search?name=" + search;
  } else if (max) {
    url += "/search?max=" + max;
  }

  const response = await fetch(url, { credentials: "include", signal });

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message);
    throw error;
  }

  const { data } = await response.json();

  return data;
}

export async function fetchEventById({
  signal,
  id,
}: {
  signal: AbortSignal;
  id: string;
}) {
  const url = `http://localhost:8080/events/id/${id}`;

  const response = await fetch(url, {
    signal,
    credentials: "include",
  });

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message);
    throw error;
  }

  const { data } = await response.json();

  return data;
}

export async function createNewEvent(eventData: EventRequest) {
  const response = await fetch(`http://localhost:8080/events`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message);
    throw error;
  }

  const { data } = await response.json();

  return data;
}

export async function updateEvent({
  id,
  event,
}: {
  id: string;
  event: EventRequest;
}) {
  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message);
    throw error;
  }

  return response.json();
}

export async function deleteEvent({ id }: { id: string }) {
  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message);
    throw error;
  }

  return null;
}

export async function createNewTicket(ticketData: TicketRequest) {
  const response = await fetch(`http://localhost:8080/ticket`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(ticketData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message);
    throw error;
  }

  const { data } = await response.json();

  return data;
}

export const AuthenticateUserLocal = async (userInput: {
  username?: string;
  password: string;
  email: string;
  mode: "login" | "register";
}) => {
  let userData;

  if (userInput.mode === "login") {
    userData = {
      username: userInput.email,
      password: userInput.password,
    };
  } else {
    userData = {
      username: userInput.username,
      password: userInput.password,
      email: userInput.email,
    };
  }

  const response = await fetch(
    `http://localhost:8080/auth/local/${
      userInput.mode === "login" ? "login" : "register"
    }`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message);
    throw error;
  }
  const data = await response.json();
  return data;
};

export async function fetchAllCities({ signal }: { signal: AbortSignal }) {
  const url = `http://localhost:8080/city`;

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message);
    throw error;
  }

  const { data } = await response.json();

  return data;
}

export async function fetchMyDetails({ signal }: { signal?: AbortSignal }) {
  const url = `http://localhost:8080/user/me`;

  const response = await fetch(url, {
    credentials: "include",
    signal,
  });

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message);
    throw error;
  }

  const { data } = await response.json();

  return data;
}

export async function updateLikeStatus({ eventId }: { eventId: string }) {
  const url = `http://localhost:8080/like/${eventId}`;

  const response = await fetch(url, {
    credentials: "include",
    method: "PUT",
  });

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(
      JSON.stringify({ message: info?.message, code: response.status })
    );
    throw error;
  }

  const { data } = await response.json();

  return data;
}

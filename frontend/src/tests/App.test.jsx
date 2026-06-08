import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import SignupForm from "../forms/SignupForm";
import SignInForm from "../forms/SignInForm";
import AddTrip from "../pages/AddTrip/AddTrip";
import Trip from "../components/Trip/Trip";
import Profile from "../pages/Profile/Profile";

const mockTrip = {
  _id: "0",
  destination: "Tokyo, Japan",
  start: "6/8/2026",
  end: "6/10/2026",
  flight: "Japan Airlines 127",
  hotel: "Ryokan",
  num_travelers: 2,
  is_shared: false,
  emails: "",
  activities: "Fishing, shopping",
};

// sign up tests
describe("Sign Up", () => {
  it("renders", () => {
    render(<MemoryRouter><SignupForm /></MemoryRouter>);
    // expect all the text in sign up form to be there
    expect(screen.getByRole("heading", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/youremail@email.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("shows an error if email is invalid", async () => {
    render(<MemoryRouter><SignupForm /></MemoryRouter>);
    // enter an invalid email and try signing up
    fireEvent.change(screen.getByPlaceholderText(/youremail@email.com/i), { target: { value: "test" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "secret123" } });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "secret123" } });
    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));
    // make sure error appears
    await waitFor(() => expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument());
  });

  it("shows an error if passwords do not match", async () => {
    render(<MemoryRouter><SignupForm /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText(/youremail@email.com/i), { target: { value: "test@test.com" } });
    // enter passwords that don't match
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "secret123" } });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "wrong" } });
    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));
    // make sure error appears
    await waitFor(() => expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument());
  });

  it("signs up successfully", async () => {
    // mock fetch api call and returned json data
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ user: { email: "test@test.com" }, token: "mock-token" }),
    }));
    render(<MemoryRouter><SignupForm /></MemoryRouter>);
    // enter in user info
    fireEvent.change(screen.getByPlaceholderText(/youremail@email.com/i), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "secret123" } });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "secret123" } });
    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));
    // make sure sign up is successful using token
    await waitFor(() => expect(localStorage.getItem("token")).toBe("mock-token"));
  });
});

// sign in tests
describe("Sign In", () => {
  it("renders", () => {
    render(<MemoryRouter><SignInForm /></MemoryRouter>);
    // expect all the text in sign in form to be there
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/youremail@email.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows an error if fields are empty", async () => {
    render(<MemoryRouter><SignInForm /></MemoryRouter>);
    // submit without entering anything
    fireEvent.submit(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => expect(screen.getByText(/email and password are required/i)).toBeInTheDocument());
  });

  it("signs in successfully", async () => {
    // mock fetch api call and returned json data
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ user: { email: "test@test.com" }, token: "mock-token" }),
    }));
    render(<MemoryRouter><SignInForm /></MemoryRouter>);
    // enter in user info
    fireEvent.change(screen.getByPlaceholderText(/youremail@email.com/i), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "secret123" } });
    fireEvent.submit(screen.getByRole("button", { name: /sign in/i }));
    // make sure sign in is successful using token
    await waitFor(() => expect(localStorage.getItem("token")).toBe("mock-token"));
  });
});

// log out tests
describe("Log Out", () => {
  it("renders the logout button", () => {
    // get user info to simulate being logged in
    localStorage.setItem("User", JSON.stringify({ email: "test@test.com" }));
    localStorage.setItem("token", "mock-token");
    render(<MemoryRouter><Profile /></MemoryRouter>);
    // make sure button is rendered
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("clears localStorage on logout", async () => {
    // simulate being logged in
    localStorage.setItem("User", JSON.stringify({ email: "test@test.com" }));
    localStorage.setItem("token", "mock-token");
    // mock fetch api call and returned json data
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({})
    }));
    render(<MemoryRouter><Profile /></MemoryRouter>);
    // try logging out and check that token is null
    fireEvent.click(screen.getByRole("button", { name: /logout/i }));
    await waitFor(() => expect(localStorage.getItem("token")).toBeNull());
  });
});

// add trip tests
describe("Add Trip", () => {
  it("renders", () => {
    render(<MemoryRouter><AddTrip /></MemoryRouter>);
    // expect all the text in add trip form to be there
    expect(screen.getByRole("heading", { name: /add trip/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/alaska, usa/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/alaska airlines/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/holiday inn/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add trip/i })).toBeInTheDocument();
  });

  it("shows an error if destination is missing", async () => {
    render(<MemoryRouter><AddTrip /></MemoryRouter>);
    // try submitting without entering anything
    fireEvent.submit(screen.getByRole("button", { name: /add trip/i }));
    await waitFor(() => expect(screen.getByText(/please enter a valid destination/i)).toBeInTheDocument());
  });

  it("adds a trip successfully", async () => {
    // simulate being logged in
    localStorage.setItem("User", JSON.stringify({ email: "test@test.com" }));
    localStorage.setItem("token", "mock-token");
    // mock fetch api call and returned json data
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ trip: { _id: "new-trip" } }),
    }));
    render(<MemoryRouter><AddTrip /></MemoryRouter>);
    // enter in trip info
    fireEvent.change(screen.getByPlaceholderText(/alaska, usa/i), { target: { value: "Tokyo, Japan" } });
    const dateInputs = document.querySelectorAll("input[type='date']");
    fireEvent.change(dateInputs[0], { target: { value: "2026-06-08" } });
    fireEvent.change(dateInputs[1], { target: { value: "2026-06-10" } });
    fireEvent.change(document.querySelector("input[type='number']"), { target: { value: "2" } });
    fireEvent.submit(screen.getByRole("button", { name: /add trip/i }));
    // make sure fetch did post call
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/add-trip"),
      expect.objectContaining({ method: "POST" })
    ));
  });
});

// update trip info tests
describe("Update Trip", () => {
  it("renders with trip data", () => {
    // simulate being logged in
    localStorage.setItem("User", JSON.stringify({ email: "test@test.com" }));
    render(<MemoryRouter><Trip trip={mockTrip} onDelete={() => {}} /></MemoryRouter>);
    // expect all the text in trip to be there
    expect(screen.getByText(/going to: tokyo, japan/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("Japan Airlines 127")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ryokan")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("updates a trip successfully", async () => {
    // simulate being logged in
    localStorage.setItem("User", JSON.stringify({ email: "test@test.com" }));
    localStorage.setItem("token", "mock-token");
    // mock fetch api call and returned json data
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Trip update successful." }),
    }));
    render(<MemoryRouter><Trip trip={mockTrip} onDelete={() => {}} /></MemoryRouter>);
    // change the flight information and save
    fireEvent.change(screen.getByDisplayValue("Japan Airlines 127"), { target: { value: "Japan Airlines 227" } });
    fireEvent.submit(screen.getByRole("button", { name: /save/i }));
    // make sure fetch did put call
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/profile/my-trips"),
      expect.objectContaining({ method: "PUT" })
    ));
  });
});

// share trip tests
describe("Share Trip", () => {
  it("renders the share checkbox", () => {
    // simulate being logged in
    localStorage.setItem("User", JSON.stringify({ email: "test@test.com" }));
    render(<MemoryRouter><Trip trip={mockTrip} onDelete={() => {}} /></MemoryRouter>);
    // make sure the checkbox is rendered
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByLabelText(/shared\?/i)).toBeInTheDocument();
  });

  it("shows the travelers field when the share checkbox is checked", async () => {
    // simulate being logged in
    localStorage.setItem("User", JSON.stringify({ email: "test@test.com" }));
    render(<MemoryRouter><Trip trip={mockTrip} onDelete={() => {}} /></MemoryRouter>);
    // check the checkbox to make sure that "other travelers" textbox shows up
    fireEvent.click(screen.getByRole("checkbox"));
    await waitFor(() => expect(screen.getByLabelText(/other travelers/i)).toBeInTheDocument());
  });

  it("shares a trip successfully", async () => {
    // simulate being logged in
    localStorage.setItem("User", JSON.stringify({ email: "test@test.com" }));
    localStorage.setItem("token", "mock-token");
    // mock fetch api call and returned json data
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Trip update successful." }),
    }));
    render(<MemoryRouter><Trip trip={mockTrip} onDelete={() => {}} /></MemoryRouter>);
    // get checkbox
    fireEvent.click(screen.getByRole("checkbox"));
    await waitFor(() => screen.getByLabelText(/other travelers/i));
    // add an email to trip and save
    fireEvent.change(screen.getByLabelText(/other travelers/i), { target: { value: "test2@test.com" } });
    fireEvent.submit(screen.getByRole("button", { name: /save/i }));
    // expect another fetch call updated the travelers to include the new email
    await waitFor(() => {
      const body = JSON.parse(fetch.mock.calls[0][1].body);
      expect(body.travelers).toContain("test2@test.com");
    });
  });
});
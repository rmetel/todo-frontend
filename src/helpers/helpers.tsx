import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IziToastSettings } from "izitoast";

export const debug = () => screen.debug(undefined, Infinity);

export const renderWithProviders = (children: React.ReactNode) => {
  render(<MemoryRouter>{children}</MemoryRouter>);
};

export const toastSettings: IziToastSettings = {
  theme: "dark",
  icon: "icon-person",
  position: "bottomCenter",
  backgroundColor: "#4f4d4d",
  color: "rgb(255, 255, 255)",
  progressBarColor: "rgb(0, 255, 184)",
  timeout: 3000
};

export const getApiUrl = () => {
  const isLocal = window.location.href.indexOf("localhost") > -1;
  const localHost = "http://localhost:5000";
  const apiEndpoint = "/api";
  return isLocal ? localHost + apiEndpoint : apiEndpoint;
};

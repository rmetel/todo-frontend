import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import iziToast from "izitoast";

export const debug = () => screen.debug(undefined, Infinity);

export const renderWithProviders = (children: React.ReactNode) => {
  render(
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );
}

export const showToast = (message: string, type: 'success' | 'error') => {
  iziToast.show({
    theme: 'dark',
    icon: 'icon-person',
    title: message,
    position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
    progressBarColor: type === 'error' ? 'rgb(241,81,86)' : 'rgb(0, 255, 184)',
    timeout: 3000
  });
}

export const getApiUrl = () => {
  let isLocal = window.location.href.indexOf("localhost") > -1;
  let localHost = "http://localhost:5000";
  let apiEndpoint = "/api";
  return isLocal ? localHost + apiEndpoint : apiEndpoint;
}

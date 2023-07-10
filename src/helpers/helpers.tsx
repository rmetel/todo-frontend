import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

export const debug = () => screen.debug(undefined, Infinity);

export const renderWithProviders = (children: React.ReactNode) => {
  render(
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );
}
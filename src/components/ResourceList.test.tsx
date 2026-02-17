import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ResourceList } from "./ResourceList";
import { MemoryRouter, useLocation } from "react-router-dom";
import { vi, describe, it, expect, beforeEach, type Mock } from "vitest";

const mockFetch = vi.fn() as Mock;
vi.stubGlobal("fetch", mockFetch);

const UrlDisplay = () => {
  const location = useLocation();
  return <div data-testid="url">{location.search}</div>;
};

describe("Search", () => {
  beforeEach(() => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    });
  });

  it("changes the URL when searching", async () => {
    render(
      <MemoryRouter initialEntries={["/people"]}>
        <ResourceList
          resourceName="people"
          title="Persons"
          renderItem={() => null}
        />
        <UrlDisplay />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText(/Search persons/i);

    fireEvent.change(input, { target: { value: "Han" } });

    await waitFor(
      () => {
        expect(screen.getByTestId("url")).toHaveTextContent("search=Han");
      },
      { timeout: 1000 },
    );
  });
});

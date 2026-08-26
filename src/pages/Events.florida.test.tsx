import { describe, it, expect, vi } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Events from "./Events";

// Prevent canvas/animation side effects in jsdom
vi.mock("@/components/WavesCanvas", () => ({
  default: () => <div data-testid="waves-canvas" />,
}));

const renderEvents = () =>
  render(
    <MemoryRouter initialEntries={["/eventy"]}>
      <Events />
    </MemoryRouter>
  );

describe("Events – Florida PGA Swing 2027 (obsadené)", () => {
  it("zobrazí OBSADENÉ ribbon na karte Florida PGA Swing", () => {
    renderEvents();
    const heading = screen.getByRole("heading", { name: /Florida PGA Swing/i });
    const card = heading.closest("div.relative") as HTMLElement;
    expect(card).not.toBeNull();
    expect(within(card).getByText("OBSADENÉ")).toBeInTheDocument();
  });

  it("má vypnutú registráciu (disabled 'Vypredané' namiesto buttonu Prihlásiť sa)", () => {
    renderEvents();
    const heading = screen.getByRole("heading", { name: /Florida PGA Swing/i });
    const card = heading.closest("div.relative") as HTMLElement;

    const vypredane = within(card).getByText("Vypredané");
    expect(vypredane).toHaveAttribute("aria-disabled", "true");
    expect(vypredane.tagName).toBe("SPAN");

    // Nesmie existovať klikateľný odkaz/tlačidlo na prihlásenie v tejto karte
    const signupLinks = within(card)
      .queryAllByRole("link")
      .filter((el) => /prihlásiť sa/i.test(el.textContent ?? ""));
    expect(signupLinks).toHaveLength(0);
  });

  it("zobrazí vysvetlenie s kontaktom na waitlist", () => {
    renderEvents();
    const note = screen.getByTestId("florida-soldout-note");
    expect(note).toHaveTextContent(/obsaden/i);
    expect(note).toHaveTextContent(/waitlist/i);

    const mail = within(note).getByRole("link", { name: /peter@doni-travel\.sk/i });
    expect(mail).toHaveAttribute("href", "mailto:peter@doni-travel.sk");

    const phone = within(note).getByRole("link", { name: /\+421 905 335 501/i });
    expect(phone).toHaveAttribute("href", "tel:+421905335501");
  });

  it("v dialógu s informáciami je registrácia vypnutá a waitlist poznámka zobrazená", async () => {
    renderEvents();
    const heading = screen.getByRole("heading", { name: /Florida PGA Swing/i });
    const card = heading.closest("div.relative") as HTMLElement;

    fireEvent.click(within(card).getByRole("button", { name: /Informácie/i }));

    const dialog = await screen.findByRole("dialog");
    const vypredane = within(dialog).getByText("Vypredané");
    expect(vypredane).toHaveAttribute("aria-disabled", "true");

    const note = within(dialog).getByTestId("florida-soldout-note-dialog");
    expect(note).toHaveTextContent(/obsaden/i);
    expect(within(note).getByRole("link", { name: /peter@doni-travel\.sk/i })).toHaveAttribute(
      "href",
      "mailto:peter@doni-travel.sk"
    );

    const signupLinks = within(dialog)
      .queryAllByRole("link")
      .filter((el) => /prihlásiť sa/i.test(el.textContent ?? ""));
    expect(signupLinks).toHaveLength(0);
  });
});

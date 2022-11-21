import { ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Page } from "./Page";

export default {
  title: "Example/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Page>;

export const LoggedOut = {};

export const LoggedIn = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole("button", {
      name: /Log in/i,
    });

    await userEvent.click(loginButton);

    expect(await canvas.getByText("Jane Doe"));
  },
};

export const LoggedInThenLoggedOut = {
  play: async (context) => {
    await LoggedIn.play(context);

    const canvas = within(context.canvasElement);
    const logoutButton = await canvas.getByRole("button", {
      name: /Log out/i,
    });

    await userEvent.click(logoutButton);

    expect(
      await canvas.getByRole("button", {
        name: /Log in/i,
      })
    );
  },
};

export const SignUp = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const signUpButton = await canvas.getByRole("button", {
      name: /Sign up/i,
    });

    await userEvent.click(signUpButton);

    expect(await canvas.getByText("Jane Doe"));
  },
};

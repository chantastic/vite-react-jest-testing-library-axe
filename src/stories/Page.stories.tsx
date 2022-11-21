import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { Page } from './Page';

export default {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const LoggedOut = Template.bind({});

export const LoggedIn = Template.bind({});

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
LoggedIn.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const loginButton = await canvas.getByRole('button', { name: /Log in/i });
  await userEvent.click(loginButton);
};

export const LoggedInThenLoggedOut = Template.bind({});
LoggedInThenLoggedOut.play = async (context) => {
  await LoggedIn.play(context);
  const canvas = within(context.canvasElement);
  const logoutButton = await canvas.getByRole('button', { name: /Log out/i });
  await userEvent.click(logoutButton);
};

export const SignUp = Template.bind({});
// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
SignUp.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const signUpButton = await canvas.getByRole('button', { name: /Sign up/i });
  await userEvent.click(signUpButton);
};

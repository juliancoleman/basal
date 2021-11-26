import React from 'react';

import { Button, ButtonProps } from '.';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args: ButtonProps) => <Button {...args} />;

export const DemoButton = Template.bind({});
DemoButton.args = {
  children: 'Hello, World!',
};

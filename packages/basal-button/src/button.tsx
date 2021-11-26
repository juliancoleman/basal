import React from 'react';
import type { ReactNode, HTMLProps } from 'react';
import { createForwardComponent, Tag } from '@basal/base';
import type { ComponentType } from '@basal/base';

import './tailwind.css';

const element = 'button';

export interface ButtonProps {
  children?: ReactNode;
  label?: ReactNode;
}

export type ButtonHTMLProps = HTMLProps<HTMLButtonElement>;

export const Button: ComponentType<
  ButtonProps,
  ButtonHTMLProps,
  typeof element
> = createForwardComponent<ButtonProps, ButtonHTMLProps>(function Button(
  props,
  ref,
) {
  const { children, label, ...rest } = props;

  return (
    <Tag
      as={element}
      {...rest}
      ref={ref}
      className="py-2 px-3 rounded bg-blue-300 hover:bg-blue-500 active:bg-blue-700 transition-colors"
    >
      <span>
        {label}
        {children}
      </span>
    </Tag>
  );
});

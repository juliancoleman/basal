import React, { forwardRef } from 'react';
import type {
  ElementType,
  HTMLProps,
  ForwardRefRenderFunction,
  ComponentPropsWithRef,
} from 'react';

export type ComponentProps<
  Props extends {},
  ElementProps extends {},
  Tag extends React.ElementType,
> = Props &
  (
    | ElementProps
    | (ComponentPropsWithRef<Tag> & {
        tag?: Tag;
      })
  );

export type ComponentType<
  Props,
  ElementProps,
  Element extends ElementType<any>,
> = {
  <Tag extends ElementType<any> = Element>(
    props: ComponentProps<Props, ElementProps, Tag>,
    ref: any,
  ): JSX.Element;
  displayName?: string;
};

/**
 * A lightweight HOC for creating forwardRef components
 * @see https://reactjs.org/docs/forwarding-refs.html
 *
 * @param Component {ForwardRefRenderFunction}
 */
export function createForwardComponent<
  Props extends {},
  ElementProps extends {} = HTMLProps<HTMLElement>,
>(Component: ForwardRefRenderFunction<any, Props & ElementProps>) {
  const ForwardComponent = forwardRef<
    any,
    ComponentProps<Props, ElementProps, any>
  >(Component);

  const WrappedComponent = <Tag extends ElementType = 'div'>(
    // 'props' is declared but its value is never read.ts(6133)
    // @ts-ignore
    props: ComponentProps<Props, ElementProps, Tag>,
    // 'ref' is declared but its value is never read.ts(6133)
    // @ts-ignore
    ref: any,
  ) => {
    return <></>;
  };

  WrappedComponent.displayName = Component.constructor.name || 'Element';
  ForwardComponent.displayName = WrappedComponent.displayName;

  return ForwardComponent as typeof WrappedComponent;
}

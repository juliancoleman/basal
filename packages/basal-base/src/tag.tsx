import React, { forwardRef } from 'react';
import type { HTMLProps, Ref } from 'react';
import cx from 'classnames';

import { eventsMap, toCamel } from './utils';

// Copied from @rmwx/base. I'm not going to rewrite this
// from scratch right now. At some point, I will, but I saw
// that the Dialog component uses this, which is a huge
// deal. Other components that use FoundationElement I
// probably won't implement
export type EventType = keyof GlobalEventHandlersEventMap;
export type SpecificEventListener<K extends EventType> = (
  evt: GlobalEventHandlersEventMap[K],
) => void;

const reactPropFromEventName = (evtName: string) =>
  (eventsMap as { [key: string]: string })[evtName] || evtName;

export class FoundationElement<Props extends {}, ElementType = HTMLElement> {
  private _classes = new Set<string>();
  private _events: { [key: string]: (evt: Event) => void } = {};
  private _style: { [key: string]: string | number | null } = {};
  private _props: Partial<Props> = {};
  private _ref = null;
  _onChange: (() => void) | null = null;

  constructor(onChange: () => void) {
    this._onChange = onChange;
    this.onChange = this.onChange.bind(this);
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.hasClass = this.hasClass.bind(this);
    this.setProp = this.setProp.bind(this);
    this.getProp = this.getProp.bind(this);
    this.removeProp = this.removeProp.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  onChange() {
    this._onChange && this._onChange();
  }

  destroy() {
    this._onChange = null;
    this._events = {};
    this._style = {};
    this._props = {};
    this._classes = new Set();

    setTimeout(() => {
      this._ref = null;
    });
  }

  /**************************************************
   * Classes
   **************************************************/
  addClass(className: string) {
    if (!this._classes.has(className)) {
      this._classes.add(className);
      this.onChange();
    }
  }

  removeClass(className: string) {
    if (this._classes.has(className)) {
      this._classes.delete(className);
      this.onChange();
    }
  }

  hasClass(className: string) {
    return this._classes.has(className);
  }

  /**************************************************
   * Props
   **************************************************/
  setProp(propName: keyof Props, value: any, silent: boolean = false) {
    if (this._props[propName] !== value) {
      this._props[propName] = value;
      !silent && this.onChange();
    }
  }

  getProp(propName: keyof Props) {
    return this._props[propName];
  }

  removeProp(propName: keyof Props) {
    if (this._props[propName] !== undefined) {
      delete this._props[propName];
      this.onChange();
    }
  }

  props(propsToMerge: { [key: string]: any }) {
    const { className = '', style = {} } = propsToMerge;

    // handle merging events
    // the foundation should be able to pass something onClick as well as a user
    // This wraps them in a function that calls both
    const mergedEvents = Object.entries(propsToMerge).reduce(
      (acc: any, [key, possibleCallback]) => {
        const existingCallback = this._events[key];
        if (
          typeof possibleCallback === 'function' &&
          typeof existingCallback === 'function'
        ) {
          const wrappedCallback = (evt: any) => {
            existingCallback(evt);
            return possibleCallback(evt);
          };

          acc[key] = wrappedCallback;
        }
        return acc;
      },
      { ...this._events },
    );

    // handle className
    const mergedClasses = cx(className, [...this._classes]);

    // handle styles
    const mergedStyles = {
      ...this._style,
      ...style,
    };

    return {
      ...propsToMerge,
      ...this._props,
      ...mergedEvents,
      style: mergedStyles,
      className: mergedClasses,
    };
  }

  /**************************************************
   * Styles
   **************************************************/
  setStyle(propertyName: string, value: number | string | null) {
    propertyName = propertyName.startsWith('--')
      ? propertyName
      : toCamel(propertyName);

    if (this._style[propertyName] !== value) {
      this._style[propertyName] = value;
      this.onChange();
    }
  }

  /**************************************************
   * Events
   **************************************************/
  addEventListener(evtName: string, callback: SpecificEventListener<any>) {
    const propName = reactPropFromEventName(evtName);
    if (this._events[propName] !== callback) {
      this._events[propName] = callback;
      this.onChange();
    }
  }

  removeEventListener(evtName: string, _callback: SpecificEventListener<any>) {
    const propName = reactPropFromEventName(evtName);
    if (this._events[propName]) {
      delete this._events[propName];
      this.onChange();
    }
  }

  /**************************************************
   * Refs
   **************************************************/
  setRef(el: any) {
    if (el) {
      this._ref = el;
    }
  }

  get ref(): ElementType | null {
    return this._ref;
  }
}

export const mergeRefs =
  (...refs: Array<Ref<any> | undefined | null>) =>
  (el: any) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref && 'current' in ref) {
        // Cannot assign to 'current' because it is a read-only property.ts(2540)
        // @ts-ignore
        ref.current = el;
      }
    }
  };

export const Tag = forwardRef<
  any,
  { element?: FoundationElement<any, any>; as: string } & HTMLProps<any>
>(function Tag({ as: TagEl = 'div', element, ...rest }, ref) {
  const finalProps = element ? element.props(rest) : rest;
  const finalRef = element ? mergeRefs(ref, element.setRef) : ref;

  return <TagEl {...finalProps} ref={finalRef} />;
});

import type { ReactNode } from 'react';

/**
 * Extends a props type with a **required** `children` prop.
 *
 * Unlike React's built-in `PropsWithChildren`, this makes `children` mandatory.
 * Perfect for layout components, wrappers, and modals.
 *
 * @example
 *   type CardProps = PropsWithRequiredChildren<{
 *     title: string;
 *     variant?: "default" | "outlined";
 *   }>;
 *   // Result: { title: string; variant?: 'default' | 'outlined'; children: ReactNode }
 *
 * @template P - Base props type
 */
export type PropsWithRequiredChildren<P = unknown> = P & {
  children: ReactNode;
};

/**
 * Removes all standard HTML attributes from a props type.
 *
 * Useful when you want clean, custom-only props for your component (e.g. when
 * forwarding props to a primitive element manually).
 *
 * @example
 *   interface ButtonProps {
 *     variant: "primary" | "secondary";
 *     size?: "sm" | "md";
 *     onClick?: () => void;
 *     className?: string;
 *   }
 *
 *   type CleanButtonProps = WithoutHTMLProps<ButtonProps>;
 *   // Result: { variant: 'primary' | 'secondary'; size?: 'sm' | 'md' }
 *
 * @template T - Props type that may contain HTML attributes
 */
export type WithoutHTMLProps<T> = Omit<T, keyof React.HTMLAttributes<HTMLElement>>;

/**
 * Type alias for the setter returned by `useState`. Supports both direct value
 * and functional updates.
 *
 * @example
 *   const [count, setCount] = useState(0);
 *
 *   const increment: SetState<number> = setCount;
 *   increment(5); // Direct value
 *   increment((prev) => prev + 1); // Functional update
 *
 * @template T - Type of the state value
 */
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Common click event handler (works with buttons, divs, spans, etc.).
 *
 * @example
 *   const handleClick: ClickHandler = (e) => {
 *     console.log("Clicked:", e.currentTarget);
 *   };
 */
export type ClickHandler = React.MouseEventHandler<HTMLElement>;

/**
 * Input change event handler for text inputs and textareas.
 *
 * @example
 *   const handleChange: InputChangeHandler = (e) => {
 *     setValue(e.target.value);
 *   };
 */
export type InputChangeHandler = React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

/**
 * Form submit event handler.
 *
 * Uses `SubmitEventHandler` (recommended since React 19). The old
 * `FormEventHandler` is now deprecated.
 *
 * @example
 *   const handleSubmit: SubmitHandler = (e) => {
 *     e.preventDefault();
 *     // Process form data
 *   };
 */
export type SubmitHandler = React.SubmitEventHandler<HTMLFormElement>;

import { createContext as createReactContext, useContext as useReactContext } from 'react';

/**
 * A helper function to create a Type-safe React Context and a corresponding
 * hook. This eliminates the need to constantly check for `null` values when
 * consuming the context.
 *
 * @example
 *   const [useUser, UserProvider] = createContext<User>("UserContext");
 *
 * @template T The type of the value that the Context will hold.
 * @param - A descriptive name for the context, used for React DevTools and
 *   error messages. Default is `"UnnamedContext"`
 * @returns A tuple containing:
 *
 *   - `[0]`: A custom hook to safely consume the context. Throws an error if used
 *     outside its Provider.
 *   - `[1]`: The React Context Provider component.
 */
export function createContext<T>(name = 'UnnamedContext') {
  const Context = createReactContext<T | null>(null);
  Context.displayName = name;

  const useContext = () => {
    const context = useReactContext(Context);
    if (context === null) {
      throw new Error(`\`${name}\` must be used within a Provider`);
    }
    return context;
  };

  return [useContext, Context.Provider] as const;
}

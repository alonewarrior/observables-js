export type NonVoid = object | number | boolean | string | any[] | undefined | null;

export type EmptyAction = () => void;

export type Action<T extends any[] = []> = (...args: T) => void;

// EXAMPLE: const testing: Action<[string]> = (arg1: string): void => console.log(arg1);
// EXAMPLE: const testing: Action<[string, number]> = (arg1: string, arg2: number): void => console.log(arg1, arg2);

export type Func<T extends any[] = [], R = unknown> = (...args: T) => R;
// EXAMPLE: const testing: Func<[string], boolean> = (arg1: string): boolean => true;
// EXAMPLE: const testing: Func<[string, number], boolean> = (arg1: string, arg2: number): boolean => true;

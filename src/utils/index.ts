import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => value === 0 ? false : !value;

export const isVoid = (value:unknown) => value === undefined || value === null || value === '';

// let a:object
// a={name:'jack'};
// a=() => {};
// 在一个函数里，该表传入的对象本身是不好的
// object: {[key:string]:unknown} 可以限制住限制对
export const cleanObject = (object: {[key:string]:unknown}) => {
  const result = {
    ...object
  }

   Object.keys(result).forEach(key => {
    const value = result[key];

    if(isVoid(value)) {
      delete result[key];
    }
  })

  return result
}

// custom hook请使用 use
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上callback会造成无线循环，这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout)
  }, [value, delay]);

  return debouncedValue;
}
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

export function useMountedRef() {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });
  return mounted;
}

export function useFetch(uri) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const mounted = useMountedRef();

  useEffect(() => {
    if (!uri) return;
    fetch(uri)  
      .then(data => {
        if (!mounted.current) throw new Error("component is not mounted");
        return data;
      })
      .then((data) => data.json())
      .then(setData) // (res) => setData(res), taking the result from the previous .then()
      .then(() => setLoading(false)) // setLoading(false) has to be put in a callback function so that it'll be executed AFTER the re-render triggered by setData
      // .then(setLoading): why tf this works, how does it know that we need to pass in {false} ?? -> it doesn't. It will pass the result of setData to the argument of setLoading. Which is very likely undefined. So loading will be set to undefined, which is FALSY (calling Boolean(undefined) === false)
      // .then(setLoading(false)): why tf this DOESN'T work ??? -> .then() needs a FUNCTION. You are passing a statement here.

      .catch(error => {
        if (!mounted.current) return;
        setError(error);
      })
  }, [uri, mounted]);
  return {
    // hook's return values as an object doesn't have to be strict in order when invoked
    // but their syntax is required to be exactly the same as how they're returned
    // otherwise you have to alias them
    loading,
    data,
    error
  };
}

export const useIterator = (items = [], initialValue = 0) => {
  const [i, setIndex] = useState(initialValue);

  const prev = useCallback(() => {
    if (i === 0) return setIndex(items.length - 1);
    setIndex(i - 1);
  }, [i, items.length]);

  const next = useCallback(() => {
    if (i === items.length - 1) return setIndex(0);
    setIndex(i + 1);
  }, [i, items.length]);

  const item = useMemo(() => items[i], [i, items]);

  return [item || items[0], prev, next];
};

export default function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below). 
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value, delay] 
  );

  return debouncedValue;
}
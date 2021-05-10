import {useCallback, useState} from 'react'
export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[],
    present: T,
    future: T[]
  }>({
    past: [],
    present: initialPresent,
    future: []
  })

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  
  const undo = useCallback(() => {
    setState(currentState => {
      const {past, present, future} = currentState;
      if(past.length === 0) return currentState;
  
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    })
  }, []);

  const redo = useCallback(() => {
    setState(currentState => {
      const {past, present, future} = currentState;
      if(!canRedo) return currentState;
      
      const next = future[0];
      const newFutrue = future.slice(1);
      
      // setPast([...past, present]);
      // setPresent(next);
      // setFuture(newFutrue);
      return {
        past: [...past, present],
        present: next,
        future: newFutrue
      }
    })
  }, [])

  const set = useCallback((newPresent: T) => {
    setState(currentState => {
      const {past, present, future} = currentState;
      if(newPresent === present) return currentState;
  
      // setPast([...past, present]);
      // setPresent(newPresent);
      // setFuture([]);
      return {
        past: [...past, present],
        present:newPresent,
        future: []
      }
    })
  }, [])

  const reset = useCallback((preset: T) => {
    setState(currentState => {
      const {present} = currentState;
      return {
        past: [],
        present:present,
        future: []
      }
      // setPast([]);
      // setPresent(preset);
      // setFuture([]);
    })
  }, [])

  return [
    state,
    {set, reset, undo, redo, canUndo, canRedo}
  ] as const
}
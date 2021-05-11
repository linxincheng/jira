import { useCallback, useReducer, useState } from "react"
import { useMountedRef } from "./index"

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState:State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args): void 0), [dispatch, mountedRef])
}

// TODO 用reducer改造
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = {...defaultConfig, ...initialConfig};
  const [state, dispatch] = useReducer(
    (
      state: State<D>,
      action: Partial<State<D>>) => ({...state, ...action}
    ), 
    {
      ...defaultInitialState,
      ...initialState
    }
  )

  const safeDispatch = useSafeDispatch(dispatch);

  // 或者使用useRef
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback((data: D) => safeDispatch({
    data, 
    stat: 'success',
    error: null
  }), [safeDispatch]);

  const setError = useCallback((error: Error) => safeDispatch({
    error,
    stat: 'error',
    data: null
  }), [safeDispatch])

  const run = useCallback((
    promise: Promise<D>,
    runConfig?: {retry: () => Promise<D>}
  ) => {
    if(!promise || !promise.then) {
      throw new Error('请传入Promise类型数据')
    }
    if(runConfig?.retry) {
      setRetry(() => () => run(runConfig.retry(), runConfig))
    }
    safeDispatch({stat: 'loading'});
    return promise.then(data => {
      setData(data)
      return data;
    }).catch(error => {
      // catch 会消化异常，如果不主动抛出，外面是接收不到异常的
      setError(error);
      if(config.throwOnError) return Promise.reject(error)
      return error;
    })
  }, [config.throwOnError, setData, setError, safeDispatch])

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run, 
    setData,
    setError,
    ...state,
    // retry 被调用时，重新跑一遍run
    retry,
  }
}
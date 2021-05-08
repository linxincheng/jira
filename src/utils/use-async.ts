import { useState } from "react"
import { useMountedRef } from "."

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

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const mountedRef = useMountedRef();

  // 或者使用useRef
  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) => setState({
    data, 
    stat: 'success',
    error: null
  });

  const setError = (error: Error) => setState({
    error,
    stat: 'error',
    data: null
  })

  const run = (promise: Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
    if(!promise || !promise.then) {
      throw new Error('请传入Promise类型数据')
    }
    if(runConfig?.retry) {
      setRetry(() => () => run(runConfig.retry(), runConfig))
    }
    setState({...state, stat: 'loading'});
    return promise.then(data => {
      if(mountedRef.current) {
        setData(data)
        return data;
      }
    }).catch(error => {
      // catch 会消化异常，如果不主动抛出，外面是接收不到异常的
      setError(error);
      return Promise.reject(error);
    })
  }

  // const retry = () => {
  //   run(oldPromise);
  // }

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
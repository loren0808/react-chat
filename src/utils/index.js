import { useEffect, useRef } from 'react';


//自定义hook
export function useDidMountEffect(callback, deps) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      callback();
    } else {
      didMount.current = true;
    }
  }, deps);
}


export function getRedirectTo(type, header) {
    let path
    if (type === 'boss') {
        path = '/boss'
    } else {
        path = '/expert'
    }
    if (!header) {
        path += 'info'
    }
    return path
}
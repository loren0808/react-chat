import { useEffect, useRef, createContext } from 'react';


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

export const MainContext = createContext()

// 头像资源
const imageContext = require.context('../assets/images', true, /\.(jpg|png)$/)
export const images = {}
imageContext.keys().forEach((key) => {
  console.log('first')
  const str = '头像' + key.match(/\d+/)
  images[str] = imageContext(key)
})


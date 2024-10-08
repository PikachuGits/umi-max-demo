import { useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function useAnimatedText(target: any, transition: any) {
  const ref = useRef(null);
  const value = useSpring(target, transition);

  useEffect(() => {
    // @ts-ignore
    ref.current.innerText = target.toFixed(2);

    return value.onChange((v) => {
      // @ts-ignore
      ref.current.innerText = v.toFixed(2);
    });
  });
  useEffect(() => value.set(target), [target]);

  return ref;
}

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `false` durante o render no servidor e durante a hidratação, `true` depois.
 *
 * Use para ler valores que só existem no browser (localStorage, matchMedia,
 * WebGL) sem gerar mismatch de hidratação. Ao contrário de um guard com
 * `useEffect` + `setState`, não dispara um render em cascata.
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
}

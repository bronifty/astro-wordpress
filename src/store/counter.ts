import { atom } from "nanostores";

export const counter = atom(0);
export const increment = (count) => counter.set(count + 1);

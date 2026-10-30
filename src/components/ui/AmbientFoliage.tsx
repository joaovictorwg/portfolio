import { TreeCanopy } from "./TreeCanopy";

/** Low-opacity, layered leaf clusters behind the content on every route. */
export function AmbientFoliage() {
  return (
    <div aria-hidden="true" className="ambient-foliage absolute inset-0 -z-10 overflow-hidden">
      <TreeCanopy mode="ambient" seed={20261107} />
    </div>
  );
}

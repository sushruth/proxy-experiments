import { updater, forceUpdateMap } from "./globals";

export function getHandler<T extends object>(
  prevPath: string = "",
  first = true
): ProxyHandler<T> {
  function getNewPath(prop: string | symbol) {
    return prevPath ? `${prevPath}.${prop.toString()}` : prop.toString();
  }

  return {
    get: function getter(target, prop, rec) {
      const newPath = getNewPath(prop);

      if (first) {
        updater.count++;
      }

      updater.traces[updater.count] = newPath;

      const value = Reflect.get(target, prop, rec); // deep getters invoked

      return proxify(value, newPath);
    },
    set: function (target, prop, value, rec) {
      const newPath = getNewPath(prop);

      Reflect.set(target, prop, proxify(value, newPath), rec);

      const updaters = forceUpdateMap.get(newPath);
      if (updaters) {
        updaters.forEach((updater) => updater());
      }

      return true;
    },
  };
}

function proxify<T extends unknown>(value: T, path = ""): T {
  if (value !== null && typeof value === "object") {
    if (Array.isArray(value)) {
      return value.map((item, index) => {
        const newPath = `${path}[${index}]`;
        return new Proxy(item, getHandler(newPath, false));
      }) as T;
    }

    return new Proxy(value as object, getHandler(path, false)) as T;
  }

  return value;
}

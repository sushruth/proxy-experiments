export const forceUpdateMap = new Map<string, Set<() => void>>();

export let updater = {
  traces: [] as string[],
  count: -1,
};

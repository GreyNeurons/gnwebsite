import { instanceGroups } from './instanceGroups.js';

export function getAvailableRegions(instances) {
  return [...new Set(instances.map(i => i.region))].sort();
}

export function filterInstances(instances, region, size) {
  return instances.filter(inst => {
    const inRegion = region === 'all' || inst.region === region;
    const inSize = size === 'all' || instanceGroups[size]?.includes(inst.type);
    return inRegion && inSize;
  });
}

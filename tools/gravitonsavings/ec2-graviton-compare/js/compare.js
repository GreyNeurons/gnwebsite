import { getGroupForInstance } from './instanceGroups.js';

export function compareInstances(instances) {
  const grouped = {};

  instances.forEach(inst => {
    const group = getGroupForInstance(inst.type);
    if (!grouped[group]) grouped[group] = {};
    if (inst.architecture === 'arm') {
      grouped[group].graviton = inst;
    } else {
      grouped[group].x86 = inst;
    }
  });

  return Object.entries(grouped).map(([group, pair]) => {
    if (pair.graviton && pair.x86) {
      const savings = ((pair.x86.price - pair.graviton.price) / pair.x86.price) * 100;
      return {
        group,
        x86: pair.x86,
        graviton: pair.graviton,
        savings: savings.toFixed(2)
      };
    }
    return null;
  }).filter(Boolean);
}

export const instanceGroups = {
  small: ["t3.micro", "t4g.micro", "t3.small", "t4g.small"],
  medium: ["t3.medium", "t4g.medium", "m5.large", "m6g.medium"],
  large: ["m5.xlarge", "m6g.large", "c5.xlarge", "c6g.large", "m5.large", "m6g.large"]
};

export function getGroupForInstance(type) {
  for (const group in instanceGroups) {
    if (instanceGroups[group].includes(type)) return group;
  }
  return "unclassified";
}

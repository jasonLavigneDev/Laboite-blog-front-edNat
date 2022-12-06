export const getGroupName = (group) => {
  if (group.type !== 15) return group.name;

  return `[STRUC] ${group.name.slice(group.name.indexOf('_') + 1, group.name.length)}`;
};

export const getGroupAvatar = (group) => {
  if (group.type !== 15) return group.name;

  return group.name.slice(group.name.indexOf('_') + 1, group.name.length);
}

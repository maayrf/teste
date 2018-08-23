import { ADMIN_ROLE, USER_ROLE } from '../../utils/constants';
// FORMAT BRANCHES
export const formatBranchesToForm = (branches) => {
  if (!branches) return branches;
  return branches.map((branch) => ({
    key: branch.id,
    label: branch.tradename,
  }));
};
export const revertFormattedBranchesOfForm = (branches) =>
  branches.map((branch) => ({
    id: branch.key,
  }));
// END FORMAT BRANCHES
// FORMAT ROLE
export const formatRoleToForm = (role) => {
  const labelRole = (role) => {
    switch (role) {
      case USER_ROLE:
        return 'Usuário';
      case ADMIN_ROLE:
        return 'Administrador';
      default:
        return '';
    }
  };
  return {
    key: role,
    label: labelRole(role),
  };
};
export const revertFormattedRoleOfForm = (role) => role.key;
// END FORMAT ROLE

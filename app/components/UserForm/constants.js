import { ADMIN_ROLE, ROOT_ROLE, USER_ROLE } from '../../utils/constants';

export const DEFAULT_ROLES = [
  {
    key: ADMIN_ROLE,
    value: 'Administrador',
  },
  {
    key: USER_ROLE,
    value: 'Usuário',
  },
];

export const ROLES_BY_ROLE = {
  [ROOT_ROLE]: [
    {
      key: ROOT_ROLE,
      value: 'Administrador Cubi',
    },
    ...DEFAULT_ROLES,
  ],
  [ADMIN_ROLE]: DEFAULT_ROLES,
  [USER_ROLE]: [],
};

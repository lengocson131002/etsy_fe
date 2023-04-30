export type RoleStatus = 'enabled' | 'disabled';

export type RoleCode = "ROLE_ADMIN" | "ROLE_LEADER" | "ROLE_SELLER" | "ROLE_CS";

export interface Role {
  name: {
    zh_CN: string;
    en_US: string;
  };
  code: string;
  id: number;
  status: RoleStatus;
}

export type GetRoleResult = Role[];

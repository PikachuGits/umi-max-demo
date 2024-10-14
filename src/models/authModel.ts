import {
  getUserPlatformRelationsByPlatform,
  getUserPlatformRelationsByUser,
  setRelations,
  setRoleRelationAll,
  setRoleRelations,
} from '@/services/auth/AuthController';
import { getProjectListWithCompany } from '@/services/project/ProjectController';
import { getAdminList } from '@/services/user/UserController';
import { useRequest } from 'ahooks';

export default function AuthModel() {
  /** 获取拥有相应绑定关系的用户列表**/
  const getRelationUserListReq = useRequest(getUserPlatformRelationsByUser, {
    manual: true,
  });
  /**获取用户列表*/
  const getAdminListReq = useRequest(getAdminList, {
    manual: true,
  });
  /** 绑定用户和平台实例 ( 公司/项目 )*/
  const setRelationsApi = useRequest(setRelations, {
    manual: true,
  });
  /** 将绑定关系与角色关联 (用户与 [公司/项目]的绑定关系) */
  const setRoleRelationsReq = useRequest(setRoleRelations, {
    manual: true,
  });
  const setRoleRelationAllReq = useRequest(setRoleRelationAll, {
    manual: true,
  });

  /** 获取和平台实体有绑定关系的用户id列表 ( 不分页 ) */
  const getAdminIds = useRequest(getUserPlatformRelationsByUser, {
    manual: true,
  });

  /** 获取项目列表 */
  const getProjectListWithCompanyReq = useRequest(getProjectListWithCompany, {
    manual: true,
  });

  /** 获取与用户关联的项目列表 */
  const getUserPlatformRelationsByPlatformReq = useRequest(getUserPlatformRelationsByPlatform, {
    manual: true,
  });

  return {
    setRelationsApi,
    setRoleRelationsReq,
    setRoleRelationAllReq,
    getAdminIds,
    getRelationUserListReq,
    getAdminListReq,
    getProjectListWithCompanyReq,
    getUserPlatformRelationsByPlatformReq,
  };
}

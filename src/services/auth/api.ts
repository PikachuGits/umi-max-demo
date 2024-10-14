export default {
  getUserPlatformRelationsByUser: '/authorize/getUserPlatformRelationsByUser', // 获取与平台绑定关系的用户列表
  getUserPlatformRelationsByPlatform: '/authorize/getUserPlatformRelationsByPlatform', //获取绑定关系的平台列表 ( 公司或项目 )
  getRoleList: '/authorize/getRoleList', // 获取角色列表
  setRelations: '/authorize/setRelations', // 写入绑定关系
  setRoleRelations: '/authorize/setRoleRelations', // 将绑定关系与角色关联 (用户与 [公司/项目]的绑定关系)
  setRoleRelationAll: '/authorize/setRoleRelationAll', // 批量将绑定关系与角色关联 (用户与 [公司/项目]的绑定关系)
};

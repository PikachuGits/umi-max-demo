/**
 * 平台命名规范
 */
enum PlatformEnum {
  NAME = 'platform',
  /**
   * 当前位置-平台类型id
   * ( 1:总平台 | 2:公司平台 | 3:项目平台  )
   */
  TYPE = 'platform_type',
  // 总平台详情
  SUBJECT = 'platform_subject',
  // 公司平台详情
  COMPANY = 'platform_company',
  // 项目平台详情
  PROJECT = 'platform_project',
}

export default PlatformEnum;

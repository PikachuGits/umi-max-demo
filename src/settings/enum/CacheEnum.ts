import PlatformEnum from '@/settings/enum/PlatformEnum';
import UserEnum from '@/settings/enum/UserEnum';
import { AuthorizeEnum } from '@/settings/enum/index';
/**
 * 缓存命名规范
 */
enum CacheEnum {
  /**
   *  缓存应用组名称
   */
  APPLICATION = 'application',
  // 缓存平台组名称
  PLATFORM_NAME = PlatformEnum.NAME,
  // 缓存用户组名称
  USER_NAME = UserEnum.NAME,

  AUTHORIZE_NAME = AuthorizeEnum.NAME,
  /**
   * 当前位置-平台类型id
   * ( 1:总平台 | 2:公司平台 | 3:项目平台  )
   */
  PLATFORM_TYPE = PlatformEnum.TYPE,
  // 总平台详情
  PLATFORM_SUBJECT = PlatformEnum.SUBJECT,
  // 公司平台详情
  PLATFORM_COMPANY = PlatformEnum.COMPANY,
  // 项目平台详情
  PLATFORM_PROJECT = PlatformEnum.PROJECT,

  /**  用户缓存信息 */
  // 用户详情
  USER_INFO = UserEnum.USER_INFO,
  // 用户token
  TOKEN = UserEnum.TOKEN,
}

export default CacheEnum;

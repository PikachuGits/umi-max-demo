import React, { useEffect, useState } from 'react';

import { ForgotPassword, SignIn } from '@/pages/System/Login/component';
import user from '@/services/user';
import { classes_module } from '@/utils/class-module';
import { encodeWebPassword } from '@/utils/format';
import { useNavigate } from '@@/exports';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style/index.module.less';

const LoginPage: React.FC = () => {
  let navigate = useNavigate();
  // 用一个状态管理表单切换逻辑
  const [isSwitched, setIsSwitched] = useState(true);
  const [isGx, setIsGx] = useState(false);
  const userState = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userState.user_info);
  }, [userState]);

  const changeForm = () => {
    setIsGx(true); // 添加过渡动画
    setTimeout(() => setIsGx(false), 1500); // 1.5 秒后移除动画
    setIsSwitched(!isSwitched); // 切换表单
  };

  // 表单提交处理函数
  const handleSubmit = async (params: any) => {
    // 修改参数，加密密码
    params['password'] = encodeWebPassword(params['password']);
    const data = await user.login(params);
    dispatch({ type: 'user/setUserInfo', payload: data });
    const urlParams = new URL(window.location.href).searchParams;
    window.location.href = urlParams.get('redirect') || '/';

    // localStorage.setItem(CacheEnum.USER_INFO, JSON.stringify(data));
    // console.log('data', data);
    // 通过 run 函数触发请求
    // run(params);
    // console.log('handleSubmit', loading);
  };

  return (
    <div>
      <div className={styles.main}>
        <SignIn isSwitched={isSwitched} isGx={isGx} onSubmit={handleSubmit}></SignIn>
        <ForgotPassword isSwitched={isSwitched} isGx={isGx} onSubmit={handleSubmit}></ForgotPassword>
        <div id="switch-cnt" className={classes_module(styles, 'switch', isGx && 'is-gx', isSwitched && 'is-txr')}>
          {/* 圆圈样式 */}
          <div className={classes_module(styles, 'switch__circle', isSwitched && 'is-txl')}></div>
          <div className={classes_module(styles, 'switch__circle', 'switch__circle--t', isSwitched && 'is-txr')}></div>

          {/* 切换输入 */}
          <div className={styles['switch__container']}>
            <h2 className={classes_module(styles, 'switch__title', 'title')}>{isSwitched ? '密码管理' : '建业管理'}</h2>
            <p className={classes_module(styles, 'switch__description', 'description')}>
              {isSwitched ? '密码丢失可以通过身份证重新设置您的密码' : '前往建业管理平台,使用账号密码登录'}
            </p>
            <Button
              className={classes_module(styles, 'switch__button', 'button', 'switch-btn', 'linearGradientButton')}
              onClick={changeForm}
              type="primary"
            >
              {isSwitched ? '找回密码' : '前往登录'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

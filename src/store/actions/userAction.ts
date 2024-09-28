import { AppDispatch } from '@/store';
import { history } from '@umijs/max'; // Assuming you're using Umi.js for routing
import { stringify } from 'querystring'; // You may need to import the correct method for your environment
import { loginOut } from '../slices/userSlice';

/**
 * 退出登录，并且将当前的 url 保存
 */
export const handleLogout = () => (dispatch: AppDispatch) => {
  // Dispatch the loginOut action to update the Redux state
  dispatch(loginOut());
  // Handle redirection logic after logout
  const { search, pathname } = window.location;
  const urlParams = new URL(window.location.href).searchParams;
  const redirect = urlParams.get('redirect');
  // Redirect the user to the login page with the current page as the redirect parameter
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

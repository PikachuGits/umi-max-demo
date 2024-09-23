declare namespace User {
  interface UserInfo {
    application_id?: 0;
    is_join_circle?: 0;
    is_super_admin?: 1;
    login_ip?: string;
    login_time?: string;
    realname?: string;
    store_id?: number;
    token: string;
    username: string;
  }
}

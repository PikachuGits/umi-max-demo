// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

/**
 * 加密铭文密码
 * @param password
 */
export function encodeWebPassword(password: string) {
  let encodedPassword = '';
  for (let i = 0; i < password.length; i++) {
    let charCode = password.charCodeAt(i);
    encodedPassword += String.fromCharCode(charCode ^ 127);
  }
  return btoa(encodedPassword);
}

/**
 * 判断 undefined 和 null 判断空字符串 判断空数组 判断空对象
 * @param value 为空返回true 不为空返回false
 */
export function isEmpty(
  value: string | object | undefined | object[] | null | boolean,
): value is undefined | null | '' {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)
  );
}

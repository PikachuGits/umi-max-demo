/**
 * 判断一个字符串是否为有效的 JSON 格式
 *
 * @param str - 需要检查的字符串
 * @returns 返回 true 如果是有效的 JSON 格式，否则返回 false
 */
function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 将数据存储到 localStorage 中，并自动处理序列化和错误。
 *
 * @param name - localStorage 键名。
 * @param value - 需要存储的值，可以是对象、数组、字符串等。
 */
export function localStorageSet(name: string, value: any): void {
  try {
    // 如果 value 是 undefined，则将其转换为 null
    const valueToStore = value === undefined ? null : value;

    // 判断 value 是否为字符串，如果是字符串则直接存储，否则序列化为 JSON 字符串
    const storedValue = typeof valueToStore === 'string' ? valueToStore : JSON.stringify(valueToStore);

    // 尝试将数据存入 localStorage
    localStorage.setItem(name, storedValue);
  } catch (error) {
    // 如果序列化失败或 localStorage 达到存储限制，捕获异常并输出错误信息
    console.error(`Failed to store item "${name}" in localStorage:`, error);
  }
}

/**
 * 从 localStorage 中读取数据，并自动处理反序列化。
 *
 * @param name - localStorage 键名。
 * @returns 返回存储的数据，如果数据不存在或反序列化失败，返回 null。
 */
export function localStorageGet(name: string): any {
  try {
    const storedValue = localStorage.getItem(name);

    // 如果 storedValue 为空，直接返回 null
    if (storedValue === null) {
      return null;
    }

    // 尝试将数据反序列化为对象或原始值
    // 仅当数据以对象的形式存储时，才会进行解析
    // 否则直接返回存储的字符串
    if (isJsonString(storedValue)) {
      return JSON.parse(storedValue);
    }

    return storedValue;
  } catch (error) {
    // 如果反序列化失败，捕获异常并返回原始字符串
    console.error(`Failed to parse item "${name}" from localStorage:`, error);
    return null;
  }
}

/**
 * 从 localStorage 中移除数据。
 *
 * @param name - localStorage 键名。
 */
export function localStorageRemove(name: string): void {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.error(`Failed to remove item "${name}" from localStorage:`, error);
  }
}

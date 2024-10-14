interface Company {
  id?: number;
  logo?: string;
  logoBase64?: string;
  company?: string;
  tin?: string;
  legalPerson?: string;
  legalPerson_id?: string;
  mobile?: string;
  code?: string;
  address?: string;
  created_time?: string; // 可以考虑使用 Date 类型
  updated_time?: string; // 可以考虑使用 Date 类型
  delete_time?: string | null; // 如果删除时间可以为 null
  storage_location?: number;
  endpoint?: string;
  bucket?: string;
  access_key_id?: string;
  access_key_secret?: string;
  invoice_limit?: string; // 如果需要精确计算，考虑使用 number
  residue_invoice_limit?: string; // 同上
  sort?: string;
  company_type?: string; // 如果有特定的类型，可以考虑使用枚举类型
  short?: string;
  admin_id?: number;
}

export default interface AuthRepository {
  login(payload: { email: string; password: string }): Promise<null | string>;

  logout(): Promise<void>;
}

// https://6ro4cvq3sc.execute-api.eu-central-1.amazonaws.com/default/get_daily_alert
// '../../infrastructure/repositories/itemCategoryApi' in 'C:\Users\delco\Documents\deloop\wfp\fe\src\domain\services'
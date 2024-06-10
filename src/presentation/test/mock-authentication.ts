import { AccountModel } from "@/domain/model/account-model";
import { mockAccountModel } from "@/domain/test/mock-account";
import { AuthenticationParams, IAuthentication } from "@/domain/usecases/authentication";

export class AuthenticationSpy implements IAuthentication {
    account: AccountModel = mockAccountModel();
    params: AuthenticationParams;
  
    async auth(params: AuthenticationParams): Promise<AccountModel> {
      this.params = params;
      return Promise.resolve(this.account);
    }
  }
import {Status} from "../enums/Status";
import {PaymentMethodProps} from "../props/PaymentMethodProps";

interface PaymentMethodRepository {
  getItems(status: Status): Promise<[PaymentMethodProps]>
}

export default PaymentMethodRepository;

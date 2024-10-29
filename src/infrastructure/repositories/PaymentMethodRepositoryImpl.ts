import {Status} from "../../domain/enums/Status";
import apiClient from "../utils/ApiClient";
import {PaymentMethodProps} from "../../domain/props/PaymentMethodProps";
import PaymentMethodRepository from "../../domain/repositories/PaymentMethodRepository";

const itemRootSegment = 'payment/method';

class PaymentMethodRepositoryImpl implements PaymentMethodRepository {
  async getItems(status: Status): Promise<[PaymentMethodProps]> {
    const itemData = await apiClient.get(`/${itemRootSegment}/fetchAll`, {params: {status}});
    return itemData.data;
  }
}

export default PaymentMethodRepositoryImpl;

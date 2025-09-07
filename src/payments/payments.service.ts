import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  async createPayment(dto: any, user: any) {
    const dummyTransactionId = `tx_${Math.random().toString(36).substring(2, 12)}`;
    const dummyPaymentUrl = `https://dummy-payment-gateway.com/pay/${dummyTransactionId}`;

    return {
      transactionId: dummyTransactionId,
      paymentUrl: dummyPaymentUrl,
      message: 'Dummy payment created successfully',
      userId: user.userId,
      inputData: dto,
    };
  }
}

import Flutterwave from "flutterwave-node-v3";
import {
  generateTransactionReference,
  getCurrencyFromCountryCode,
} from "./payment";
import { FlutterWaveResponse } from "../models/payment.model";
/**
 * Initialize the FlutterWave SDK,
 * NB: The PUBLIC_TEST_KEY and SECRET_TEST_KEY should be gotten the FlutterWave dashboard
 */
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_TEST_KEY,
  process.env.FLW_SECRET_TEST_KEY
);

interface FrancoMobileMoneyParams {
  phone_number: string;
  amount: number;
  currency: string;
  country: string;
  email: string;
  tx_ref: string;
}

export function requestFrancoMobileMoneyPayment(
  payload: FrancoMobileMoneyParams
): Promise<FlutterWaveResponse> {
  return flw.MobileMoney.franco_phone(payload);
}

export function requestFrancoMobileMoneyTransfer(payload) {
  return flw.Transfer.initiate(payload);
}

export function requestMobileMoneyRefund(payload) {
  return flw.Transaction.refund(payload);
}

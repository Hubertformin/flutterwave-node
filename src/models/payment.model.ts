import {model, Schema} from "mongoose";

export enum FlutterEvenStatus {
    PENDING = 'pending',
    SUCCESSFUL = 'successful',
    FAILED = 'failed'
}

export enum FlutterWaveEvent {
    CHARGE_COMPLETED = 'charge.completed',
    TRANSFER_COMPLETED = 'transfer.completed',
    SUBSCRIPTION_CANCELLED = 'subscription.cancelled'
}

export interface FlutterWavePaymentData {
    id: number;
    tx_ref: string;
    flw_ref: string;
    device_fingerprint: string;
    amount: number;
    charged_amount: number;
    app_fee: number;
    merchant_fee: number;
    processor_response: string;
    auth_model: string;
    currency: string;
    ip: string;
    narration: string;
    status: FlutterEvenStatus;
    payment_type: string;
    fraud_status: string;
    charge_type: string;
    created_at: string;
    account_id: number;
    customer: {
        id: number;
        phone_number: string;
        name: string;
        email: string;
        created_at: string
    }
};

export interface PaymentModel extends FlutterWavePaymentData {
    user_id?: string;
}

export interface FlutterWaveResponse {
    status: string;
    message: string;
    data: FlutterWavePaymentData;
    meta: {
        authorization: {
            mode: string;
            redirect_url: string
        }
    }
}

export interface FlutterWaveWebHookResponse {
    event: FlutterWaveEvent,
    data: FlutterWavePaymentData;
}

const paymentSchema = new Schema<PaymentModel>({
    id: Number,
    tx_ref: String,
    flw_ref: String,
    user_id: String,
    device_fingerprint: String,
    amount: Number,
    charged_amount: Number,
    app_fee: Number,
    merchant_fee: Number,
    processor_response: String,
    auth_model: String,
    currency: String,
    ip: String,
    narration: String,
    status: {
        type: String,
        enum: FlutterEvenStatus
    },
    payment_type: String,
    fraud_status: String,
    charge_type: String,
    created_at: String,
    account_id: Number,
    customer: {
        id: Number,
        phone_number: String,
        name: String,
        email: String,
        created_at: String
    }
}, {
    timestamps: true
});

// 3. Create a Model.
const Payment = model<PaymentModel>('payments', paymentSchema);
export default Payment;

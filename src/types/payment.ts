// types/payment.ts
export interface ManualPaymentConfig {
    isActive: boolean;
    note: string;
}

export interface StripeConfig {
    isActive: boolean;
    secret: string;
}

export interface PayPalConfig {
    isActive: boolean;
    mode: "sandbox" | "live";
    clientId: string;
    clientSecret: string;
}

export interface PaystackConfig {
    isActive: boolean;
    merchantEmail: string;
    publicKey: string;
    secretKey: string;
}

export interface RazorpayConfig {
    isActive: boolean;
    keyId: string;
    keySecret: string;
}

export interface CurrencyExchangeConfig {
    isActive: boolean;
    apiKey: string;
}

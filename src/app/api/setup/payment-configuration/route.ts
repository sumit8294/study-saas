import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper function to safely access JSON properties
function getJsonValue<T>(json: any, key: string, defaultValue: T): T {
    if (json && typeof json === "object" && key in json) {
        return json[key] as T;
    }
    return defaultValue;
}

// GET - Get payment configuration
export async function GET() {
    try {
        let paymentConfig = await prisma.tech_payment_settings.findFirst();

        // If no configuration exists, create default configuration
        if (!paymentConfig) {
            paymentConfig = await prisma.tech_payment_settings.create({
                data: {
                    manualPayment: {
                        isActive: false,
                        note: "",
                    },
                    stripe: {
                        isActive: false,
                        secret: "",
                    },
                    paypal: {
                        isActive: false,
                        mode: "sandbox",
                        clientId: "",
                        clientSecret: "",
                    },
                    paystack: {
                        isActive: false,
                        merchantEmail: "",
                        publicKey: "",
                        secretKey: "",
                    },
                    razorpay: {
                        isActive: false,
                        keyId: "",
                        keySecret: "",
                    },
                    currencyExchange: {
                        isActive: false,
                        apiKey: "",
                    },
                },
            });
        }

        // Return the configuration with safe data handling
        const safeConfig = {
            id: paymentConfig.id,
            manualPayment: paymentConfig.manualPayment,
            stripe: paymentConfig.stripe
                ? {
                      isActive: getJsonValue(
                          paymentConfig.stripe,
                          "isActive",
                          false
                      ),
                      secret: "", // Don't return the secret
                  }
                : null,
            paypal: paymentConfig.paypal
                ? {
                      isActive: getJsonValue(
                          paymentConfig.paypal,
                          "isActive",
                          false
                      ),
                      mode: getJsonValue(
                          paymentConfig.paypal,
                          "mode",
                          "sandbox"
                      ),
                      clientId: getJsonValue(
                          paymentConfig.paypal,
                          "clientId",
                          ""
                      ),
                      clientSecret: "", // Don't return the secret
                  }
                : null,
            paystack: paymentConfig.paystack
                ? {
                      isActive: getJsonValue(
                          paymentConfig.paystack,
                          "isActive",
                          false
                      ),
                      merchantEmail: getJsonValue(
                          paymentConfig.paystack,
                          "merchantEmail",
                          ""
                      ),
                      publicKey: getJsonValue(
                          paymentConfig.paystack,
                          "publicKey",
                          ""
                      ),
                      secretKey: "", // Don't return the secret
                  }
                : null,
            razorpay: paymentConfig.razorpay
                ? {
                      isActive: getJsonValue(
                          paymentConfig.razorpay,
                          "isActive",
                          false
                      ),
                      keyId: getJsonValue(paymentConfig.razorpay, "keyId", ""),
                      keySecret: "", // Don't return the secret
                  }
                : null,
            currencyExchange: paymentConfig.currencyExchange
                ? {
                      isActive: getJsonValue(
                          paymentConfig.currencyExchange,
                          "isActive",
                          false
                      ),
                      apiKey: "", // Don't return the API key
                  }
                : null,
            createdAt: paymentConfig.createdAt,
            updatedAt: paymentConfig.updatedAt,
        };

        return NextResponse.json(safeConfig);
    } catch (error) {
        console.error("Error fetching payment configuration:", error);
        return NextResponse.json(
            { error: "Failed to fetch payment configuration" },
            { status: 500 }
        );
    }
}

// PUT - Update payment configuration
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        const data = {
            manualPayment: {
                isActive: body.manualEnabled,
                note: body.manualNote,
            },
            stripe: {
                isActive: body.stripeEnabled,
                secret: body.stripeSecret,
            },
            paypal: {
                isActive: body.paypalEnabled,
                mode: body.paypalMode,
                clientId: body.paypalClientId,
                clientSecret: body.paypalClientSecret,
            },
            paystack: {
                isActive: body.paystackEnabled,
                merchantEmail: body.merchantEmail,
                publicKey: body.paystackPublicKey,
                secretKey: body.paystackSecretKey,
            },
            razorpay: {
                isActive: body.razorpayEnabled,
                keyId: body.razorpayKeyId,
                keySecret: body.razorpaySecretKey,
            },
            currencyExchange: {
                isActive: body.liveCurrencyEnabled,
                apiKey: body.exchangeApiKey,
            },
        };

        const paymentConfig = await prisma.tech_payment_settings.upsert({
            where: { id: body.id || "" },
            update: data,
            create: {
                ...data,
                id: undefined, // Let Prisma generate the ID
            },
        });

        // Return safe configuration without sensitive data
        const safeConfig = {
            id: paymentConfig.id,
            manualPayment: paymentConfig.manualPayment,
            stripe: paymentConfig.stripe
                ? {
                      isActive: getJsonValue(
                          paymentConfig.stripe,
                          "isActive",
                          false
                      ),
                      secret: "",
                  }
                : null,
            paypal: paymentConfig.paypal
                ? {
                      isActive: getJsonValue(
                          paymentConfig.paypal,
                          "isActive",
                          false
                      ),
                      mode: getJsonValue(
                          paymentConfig.paypal,
                          "mode",
                          "sandbox"
                      ),
                      clientId: getJsonValue(
                          paymentConfig.paypal,
                          "clientId",
                          ""
                      ),
                      clientSecret: "",
                  }
                : null,
            paystack: paymentConfig.paystack
                ? {
                      isActive: getJsonValue(
                          paymentConfig.paystack,
                          "isActive",
                          false
                      ),
                      merchantEmail: getJsonValue(
                          paymentConfig.paystack,
                          "merchantEmail",
                          ""
                      ),
                      publicKey: getJsonValue(
                          paymentConfig.paystack,
                          "publicKey",
                          ""
                      ),
                      secretKey: "",
                  }
                : null,
            razorpay: paymentConfig.razorpay
                ? {
                      isActive: getJsonValue(
                          paymentConfig.razorpay,
                          "isActive",
                          false
                      ),
                      keyId: getJsonValue(paymentConfig.razorpay, "keyId", ""),
                      keySecret: "",
                  }
                : null,
            currencyExchange: paymentConfig.currencyExchange
                ? {
                      isActive: getJsonValue(
                          paymentConfig.currencyExchange,
                          "isActive",
                          false
                      ),
                      apiKey: "",
                  }
                : null,
            createdAt: paymentConfig.createdAt,
            updatedAt: paymentConfig.updatedAt,
        };

        return NextResponse.json(safeConfig);
    } catch (error) {
        console.error("Error updating payment configuration:", error);
        return NextResponse.json(
            { error: "Failed to update payment configuration" },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            mailHost,
            mailPort,
            mailUsername,
            mailPassword,
            mailEncryption,
        } = body;

        // Validate required fields
        if (!mailHost || !mailPort || !mailUsername || !mailPassword) {
            return NextResponse.json(
                { error: "All fields are required for testing connection" },
                { status: 400 }
            );
        }

        // Create transporter configuration
        const transporterConfig: any = {
            host: mailHost,
            port: parseInt(mailPort),
            secure: mailEncryption === "ssl" || parseInt(mailPort) === 465,
            auth: {
                user: mailUsername,
                pass: mailPassword,
            },
        };

        // Add TLS options for self-signed certificates
        if (mailEncryption === "tls") {
            transporterConfig.tls = {
                rejectUnauthorized: false,
            };
        }

        // Create transporter
        const transporter = nodemailer.createTransport(transporterConfig);

        // Test connection
        await transporter.verify();

        return NextResponse.json({
            success: true,
            message:
                "Mail connection test successful! Configuration is working properly.",
        });
    } catch (error: any) {
        console.error("Mail connection test failed:", error);

        let errorMessage = "Connection test failed. ";

        if (error.code === "EAUTH") {
            errorMessage +=
                "Authentication failed. Please check your username and password.";
        } else if (error.code === "ECONNECTION") {
            errorMessage +=
                "Unable to connect to the mail server. Please check your host and port.";
        } else if (error.code === "ENOTFOUND") {
            errorMessage +=
                "Mail host not found. Please check your host address.";
        } else if (error.code === "ETIMEDOUT") {
            errorMessage +=
                "Connection timed out. Please check your network connection and try again.";
        } else {
            errorMessage +=
                error.message ||
                "Please check your configuration and try again.";
        }

        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}

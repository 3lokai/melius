"use server";

import { MailtrapClient } from "mailtrap";
import { contactFormSchema } from "@/lib/schemas/contact";

const TOKEN = process.env.MAILTRAP_TOKEN;
const SENDER_EMAIL = process.env.MAILTRAP_SENDER_EMAIL || "hello@melius-ajnahal.com";
const RECIPIENT_EMAIL = process.env.MAILTRAP_RECIPIENT_EMAIL || "melius.ajnahal@gmail.com";

export async function sendContactEmail(formData: unknown) {
  // Validate form data with Zod
  const validationResult = contactFormSchema.safeParse(formData);
  
  if (!validationResult.success) {
    return {
      success: false,
      error: "Invalid form data",
      details: validationResult.error.issues,
    };
  }

  const { name, email, message } = validationResult.data;

  // Escape HTML to prevent XSS
  const escapeHtml = (text: string) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br>");

  // Check if Mailtrap token is configured
  if (!TOKEN) {
    console.error("MAILTRAP_TOKEN is not configured");
    return {
      success: false,
      error: "Email service is not configured. Please contact support directly.",
    };
  }

  try {
    const client = new MailtrapClient({ token: TOKEN });

    const sender = {
      email: SENDER_EMAIL,
      name: "Melius Contact Form",
    };

    // Email 1: Send notification to service owner
    const recipients = [
      {
        email: RECIPIENT_EMAIL,
      },
    ];

    const bcc = [
      {
        email: "gta3lok.ai@gmail.com",
      },
    ];

    const ownerEmailResponse = await client.send({
      from: sender,
      to: recipients,
      bcc: bcc,
      reply_to: { email },
      subject: `[MELIUS LEAD] - Contact form fill by ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <style>
              body { font-family: sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #1a1a2e; color: #d4af37; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #1a1a2e; }
              .message { background-color: white; padding: 15px; border-left: 4px solid #d4af37; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Name:</span> ${escapedName}
                </div>
                <div class="field">
                  <span class="label">Email:</span> <a href="mailto:${escapedEmail}">${escapedEmail}</a>
                </div>
                <div class="field">
                  <span class="label">Message:</span>
                  <div class="message">${escapedMessage}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      category: "contact_form",
    });

    // Email 2: Send thank you email to form submitter
    const thankYouSender = {
      email: SENDER_EMAIL,
      name: "Melius - Mayura Kataria",
    };

    const submitterRecipients = [
      {
        email: email,
        name: name,
      },
    ];

    const thankYouResponse = await client.send({
      from: thankYouSender,
      to: submitterRecipients,
      reply_to: { email: RECIPIENT_EMAIL },
      subject: "Thank you for reaching out to Melius",
      text: `Dear ${name},\n\nThank you for contacting Melius. We have received your message and will get back to you soon.\n\nBest regards,\nMayura Kataria`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <style>
              body { font-family: sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #1a1a2e; color: #d4af37; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .message { background-color: white; padding: 20px; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">Thank You for Reaching Out</h1>
              </div>
              <div class="content">
                <div class="message">
                  <p>Dear ${escapedName},</p>
                  <p>Thank you for contacting Melius. We have received your message and will get back to you soon.</p>
                  <p>Best regards,<br>Mayura Kataria</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      category: "thank_you",
    });

    return {
      success: true,
      messageIds: [
        ...(ownerEmailResponse.message_ids || []),
        ...(thankYouResponse.message_ids || []),
      ],
    };
  } catch (error) {
    console.error("Error sending email via Mailtrap:", error);
    
    // Handle Mailtrap API errors - check both direct error and cause property
    let responseData: { status?: number; data?: unknown; statusText?: string } | undefined;
    
    if (error && typeof error === 'object') {
      // Check for error in cause property (common with newer error structures)
      if ('cause' in error && error.cause && typeof error.cause === 'object' && 'response' in error.cause) {
        responseData = (error.cause as { response?: { status?: number; data?: unknown; statusText?: string } }).response;
      }
      // Check for direct response property
      else if ('response' in error) {
        responseData = (error as { response?: { status?: number; data?: unknown; statusText?: string } }).response;
      }
    }
    
    if (responseData) {
      const status = responseData.status;
      const errorData = responseData.data;
      const statusText = responseData.statusText;
      
      // Log detailed error for debugging - extract all possible error info
      console.error("=== Mailtrap API Error Details ===");
      console.error("Status:", status, statusText);
      console.error("Error Data:", JSON.stringify(errorData, null, 2));
      console.error("Sender Email:", SENDER_EMAIL);
      console.error("Token Configured:", !!TOKEN);
      console.error("Token Length:", TOKEN?.length || 0);
      console.error("Token Preview:", TOKEN ? `${TOKEN.substring(0, 8)}...${TOKEN.substring(TOKEN.length - 4)}` : "N/A");
      console.error("=================================");
      
      // Extract error message from various possible structures
      let errorMessage = "Authentication failed";
      if (errorData && typeof errorData === 'object') {
        const data = errorData as Record<string, unknown>;
        if (data.message && typeof data.message === 'string') {
          errorMessage = data.message;
        } else if (data.errors) {
          errorMessage = JSON.stringify(data.errors);
        } else if (data.error && typeof data.error === 'string') {
          errorMessage = data.error;
        } else {
          errorMessage = JSON.stringify(data);
        }
      }
      
      if (status === 401) {
        return {
          success: false,
          error: `Authentication failed (401): ${errorMessage}. Please verify: 1) Your MAILTRAP_TOKEN is a Sending API token (not Testing), 2) Your domain is fully verified in Mailtrap, 3) The sender email (${SENDER_EMAIL}) matches your verified domain exactly.`,
        };
      }
      if (status === 422) {
        return {
          success: false,
          error: `Invalid email configuration (422). Please verify your sender email domain in Mailtrap and ensure the sender email (${SENDER_EMAIL}) matches your verified domain exactly.`,
        };
      }
      if (status === 400) {
        const errorMsg = errorData && typeof errorData === 'object' && 'message' in errorData && typeof errorData.message === 'string'
          ? errorData.message
          : "Please check your email configuration.";
        return {
          success: false,
          error: `Invalid request (400). ${errorMsg}`,
        };
      }
    }
    
    // Check for Mailtrap SDK specific error structure
    if (error && typeof error === 'object' && 'status' in error && typeof (error as { status: number }).status === 'number') {
      const status = (error as { status: number }).status;
      if (status === 401 || status === 422) {
        return {
          success: false,
          error: "Mailtrap authentication or configuration error. Please verify your API token and domain settings.",
        };
      }
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email. Please check your Mailtrap configuration.",
    };
  }
}


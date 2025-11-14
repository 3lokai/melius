"use server";

import { MailtrapClient } from "mailtrap";
import { contactFormSchema } from "@/lib/schemas/contact";

const TOKEN = process.env.MAILTRAP_TOKEN;
const SENDER_EMAIL = process.env.MAILTRAP_SENDER_EMAIL || "noreply@melius.com";
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

    const response = await client.send({
      from: { name: "Melius Contact Form", email: SENDER_EMAIL },
      to: [{ email: RECIPIENT_EMAIL }],
      reply_to: { email },
      subject: `Contact Form Submission from ${name}`,
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

    return {
      success: true,
      messageIds: response.message_ids || [],
    };
  } catch (error) {
    console.error("Error sending email via Mailtrap:", error);
    
    // Provide more helpful error messages
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: unknown } };
      if (axiosError.response?.status === 401) {
        return {
          success: false,
          error: "Authentication failed. Please check your Mailtrap API token and ensure your sender email domain is verified in Mailtrap.",
        };
      }
      if (axiosError.response?.status === 422) {
        return {
          success: false,
          error: "Invalid email configuration. Please verify your sender email domain in Mailtrap.",
        };
      }
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email. Please check your Mailtrap configuration.",
    };
  }
}


import type { ConsultationRequest } from "@shared/schema";

// Email service configuration
// In production, this would use nodemailer with real SMTP credentials
// For now, we'll create a simple logger that can be easily replaced

export interface EmailService {
  sendConsultationNotification(request: ConsultationRequest): Promise<boolean>;
}

class ConsoleEmailService implements EmailService {
  async sendConsultationNotification(request: ConsultationRequest): Promise<boolean> {
    console.log("\n📧 EMAIL NOTIFICATION");
    console.log("====================");
    console.log(`To: kkfinancial2016@gmail.com, kkfinancial2016@yahoo.com`);
    console.log(`Subject: New Loan Consultation Request - ${request.fullName}`);
    console.log("\nMessage Body:");
    console.log(`
Dear KK Financial Team,

You have received a new consultation request:

Client Details:
---------------
Name: ${request.fullName}
Phone: ${request.phone}
Email: ${request.email}
City: ${request.city}

Loan Information:
-----------------
Loan Type: ${request.loanType}
Loan Amount: ${request.loanAmount || "To be discussed"}
Monthly Income: ${request.income || "To be discussed"}

Message: ${request.message || "No additional message"}

Please contact the client at your earliest convenience.

This is an automated notification from your website consultation form.
    `);
    console.log("====================\n");
    
    // Simulate email sending success
    return true;
  }
}

// Real SMTP email service (to be configured with actual credentials)
class SMTPEmailService implements EmailService {
  async sendConsultationNotification(request: ConsultationRequest): Promise<boolean> {
    // TODO: Implement with nodemailer when SMTP credentials are available
    // Example:
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || '587'),
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });
    //
    // await transporter.sendMail({
    //   from: process.env.SMTP_FROM,
    //   to: 'kkfinancial2016@gmail.com,kkfinancial2016@yahoo.com',
    //   subject: `New Loan Consultation Request - ${request.fullName}`,
    //   html: emailTemplate(request),
    // });
    
    console.log("SMTP email service not configured. Please set SMTP environment variables.");
    return false;
  }
}

// Email template generator
function emailTemplate(request: ConsultationRequest): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%); color: white; padding: 20px; border-radius: 8px; }
        .content { background: #f9fafb; padding: 20px; margin-top: 20px; border-radius: 8px; }
        .detail-row { margin: 10px 0; padding: 10px; background: white; border-left: 3px solid #0d9488; }
        .label { font-weight: 600; color: #1e3a8a; }
        .cta { display: inline-block; background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🔔 New Consultation Request</h2>
          <p>A potential client has requested your services</p>
        </div>
        <div class="content">
          <h3>Client Information</h3>
          <div class="detail-row">
            <span class="label">Name:</span> ${request.fullName}
          </div>
          <div class="detail-row">
            <span class="label">Phone:</span> <a href="tel:${request.phone}">${request.phone}</a>
          </div>
          <div class="detail-row">
            <span class="label">Email:</span> <a href="mailto:${request.email}">${request.email}</a>
          </div>
          <div class="detail-row">
            <span class="label">City:</span> ${request.city}
          </div>
          
          <h3 style="margin-top: 20px;">Loan Requirements</h3>
          <div class="detail-row">
            <span class="label">Loan Type:</span> ${request.loanType.toUpperCase()}
          </div>
          ${request.loanAmount ? `
          <div class="detail-row">
            <span class="label">Loan Amount:</span> ₹${request.loanAmount}
          </div>
          ` : ''}
          ${request.income ? `
          <div class="detail-row">
            <span class="label">Monthly Income:</span> ₹${request.income}
          </div>
          ` : ''}
          ${request.message ? `
          <div class="detail-row">
            <span class="label">Message:</span><br/>
            ${request.message}
          </div>
          ` : ''}
          
          <a href="tel:${request.phone}" class="cta">📞 Call ${request.fullName}</a>
        </div>
        <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
          This is an automated notification from your KK Financial 2016 website.
        </p>
      </div>
    </body>
    </html>
  `;
}

// Factory to create the appropriate email service
export function createEmailService(): EmailService {
  // In development or when SMTP is not configured, use console logger
  if (process.env.NODE_ENV === "development" || !process.env.SMTP_HOST) {
    return new ConsoleEmailService();
  }
  
  // In production with SMTP configured, use real email service
  return new SMTPEmailService();
}

export const emailService = createEmailService();

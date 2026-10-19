import { transporter } from "../config/nodemailer.js";

export const sendVerificationEmail = async (email, verificationCode) => {
  await transporter.sendMail({
    from: `"AuthFlow" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: "Verify Your Email for AuthFlow",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Verify Your Email</h2>
        <p>Use the code below to verify your account:</p>
        <h1 style="letter-spacing: 6px; background: #2563eb; color: white; padding: 16px; text-align: center;">
          ${verificationCode}
        </h1>
        <p>This code will expire in 24 hours.</p>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  await transporter.sendMail({
    from: `"AuthFlow" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: "Reset your AuthFlow password",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Reset Your Password</h2>
        <p>Click the button below to reset your password:</p>
        <a 
          href="${resetUrl}" 
          style="display: inline-block; background: #2563eb; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px;"
        >
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, you can ignore this email.</p>
      </div>
    `,
  });
};

export const sendResetSuccessEmail = async (email) => {
  await transporter.sendMail({
    from: `"AuthFlow" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: "Password reset successful",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Password Reset Successful</h2>
        <p>Your password has been changed successfully.</p>
        <p>If this was not you, please contact support immediately.</p>
      </div>
    `,
  });
};



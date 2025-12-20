const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (email, token) => {
  const link = `${process.env.CLIENT_URL}/verify-email/${token}`;
  console.log("📧 [DEV] Verification Link:", link);

  await transporter.sendMail({
    to: email,
    subject: "Verify your BookXchange account",
    html: `
      <h2>Welcome to BookXchange 📚</h2>
      <p>Please verify your email to activate your account.</p>
      <a href="${link}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `,
  });
};


exports.sendResetPasswordEmail = async (email, token) => {
  const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
  console.log("📧 [DEV] Reset Password Link:", link);

  await transporter.sendMail({
    to: email,
    subject: "Reset your BookXchange password",
    html: `
      <h2>Password Reset</h2>
      <p>You requested to reset your password.</p>
      <a href="${link}">Reset Password</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });
};

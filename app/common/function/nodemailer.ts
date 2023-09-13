import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, userId, type }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId, 10);
    if (type === "VERIFY") {
      await prisma?.user.update({
        where: {
          id: userId,
        },
        data: {
          verify_token: hashedToken,
          verify_token_expired: new Date(Date.now() + 3600000),
        },
      });
    } else if (type === "RESETPASSWORD") {
      await prisma?.user.update({
        where: {
          id: userId,
        },
        data: {
          reset_password_token: hashedToken,
          reset_password_token_expired: new Date(Date.now() + 3600000),
        },
      });
    }
    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "dangdev0402@gmail.com",
        pass: "tzuywhsvcraypflp",
      },
    });
    const mailOption = {
      from: "dangdev0402@gmail.com",
      to: email,
      subject: type === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
      <p>Hello,</p>
    <p>Please click the following link to ${
      type === "VERIFY" ? "verify your email" : "reset your password"
    }:</p>
    <a href="${process.env.MY_URL}/${
        type === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}">Click here</a>
    <p>If you didn't request this ${
      type === "VERIFY" ? "verification" : "password reset"
    }, you can safely ignore this email.</p>
    <p>Thank you!</p>
      `,
    };
    const res = await transport.sendMail(mailOption);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

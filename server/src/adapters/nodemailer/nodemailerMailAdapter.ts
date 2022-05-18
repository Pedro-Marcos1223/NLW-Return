import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "65a8e648e4d5ef",
    pass: "e7c555942d27d9"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Pedro Marcos <pedromarcospdm@gmail.com>",
      subject,
      html: body,
    })
  };
}
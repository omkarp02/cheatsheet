import { MailSlurp } from 'mailslurp-client';
const mailslurp = new MailSlurp({ apiKey: "sk_Lm2ShcmNHLbRi3Dk_5Sd9suXqfwPZxXdFsd44xR1up3ZaV1BOcUCuz9S0fxILZfqRREOTs3vWDrpVwklh" });
const inbox = await mailslurp.inboxController.createInboxWithDefaults();
const emailPagination = await mailslurp.emailController.getEmailsPaginated({
  inboxId: [inbox.id]
})

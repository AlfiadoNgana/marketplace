const Mail = require('../services/Mail')

class PurchaseMail {
  get key() {
    return 'PurchaseMail'
  }

  async handle(job, done) {
    const { purchaseAd, user, content } = job.data

    await Mail.sendMail({
      from: '"Alfiado Constantino" <alfiadomaterialescolar@gmail.com>',
      to: purchaseAd.author.email,
      subject: `Solicitacao de Compra: ${purchaseAd.title}`,
      html: `
      <html>

      <head>
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
          }
        </style>
      </head>

      <body>
        <strong>Ola, ${purchaseAd.author.name}</strong>
        <p>Voce tem uma solicitacao de compra para o anuncio ${purchaseAd.title}</p>\
        <br />
        <strong>${user.name} (${user.email}):</strong>
        ${content}
      </body>

      </html>
      `,
    })

    return done()
  }
}

module.exports = new PurchaseMail()

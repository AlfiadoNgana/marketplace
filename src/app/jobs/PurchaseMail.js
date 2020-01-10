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
      template: 'purchase',
      context: {
        ad: purchaseAd,
        user,
        content,
      },
    })

    return done()
  }
}

module.exports = new PurchaseMail()

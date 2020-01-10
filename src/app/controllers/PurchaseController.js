const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store(req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

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

    return res.send()
  }
}

module.exports = new PurchaseController()

const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store(req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    if (purchaseAd.purchasedBy) {
      return res.status(400).json({ error: 'Ad not Available' })
    }
    const user = await User.findById(req.userId)
    const purchase = await Purchase.create({
      ad,
      content,
      userId: req.userId,
    })

    Queue.create(PurchaseMail.key, {
      purchaseAd,
      user,
      content,
    }).save()

    return res.json(purchase)
  }

  async purchase(req, res) {
    const { purchase: purchaseId } = req.params

    const purchase = await Purchase.findById(purchaseId).populate([
      'ad',
      'userId',
    ])
    if (purchase.ad.author === req.userId) {
      return res
        .status(401)
        .json({ error: 'Nao pode comprar seu prorio anuncio' })
    }
    const ad = await Ad.findByIdAndUpdate(
      purchase.ad._id,
      { purchasedBy: purchase.userId._id },
      {
        new: true,
      }
    )
    return res.json(ad)
  }
}

module.exports = new PurchaseController()

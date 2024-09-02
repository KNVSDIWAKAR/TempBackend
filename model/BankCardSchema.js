const mongoose = require("mongoose");

const BankCardSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  cardType: { type: String, required: true, enum: ["DebitCard", "CreditCard"] },
  cardSubType: {
    type: String,
    required: function () {
      return this.cardType === "DebitCard";
    },
    enum: ["MasterCard", "Visa", "Rupay"],
  },
  cvv: { type: String, required: true },
  cardHolder: { type: String, required: true },
  expiryDate: { type: String, required: true },
});

module.exports = mongoose.model("BankCard", BankCardSchema);

import db from "../../repository/models/index.js";

class BillingPayment{

    async calculatepricing(){

    }

    async processpayment(userID,paymentData){

        const payment = await db.Payment.create({
            UserID: userID,
            BookingID:paymentData.BookingID,
            SessionID:paymentData.SessionID,
            Amount:paymentData.Amount,
            PaymentMethod:paymentData.PaymentMethod,
            PaymentStatus:paymentData.PaymentStatus,
            Timestamp:paymentData.Timestamp,
        });

        return payment;
        
    }

    async paymentDetails(userID){

        const paymentDetails = await db.ChargingSession.findAll({
            where: { UserID: userID },
            include: [
                {
                  model: db.Payment,
                  as: "Payments",
                  attributes: ["PaymentID","BookingID","Amount","PaymentMethod","PaymentStatus","Timestamp",]
                }
              ],
        });

        return paymentDetails;
        
    }
}

export default new BillingPayment();
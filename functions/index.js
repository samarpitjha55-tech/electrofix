// functions/index.js (updated with post-completion wallet credit)
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.schedulePayout = functions.firestore
  .document("bookings/{bookingId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.status !== "completed" && after.status === "completed") {
      const techId = after.assignedTo;
      const amount = after.amountINR - 50;

      // Add payout schedule
      const bookingTime = new Date();
      const techRef = admin.firestore().collection("bookings")
        .where("assignedTo", "==", techId)
        .where("status", "==", "completed");

      const snapshot = await techRef.get();
      const bookingCount = snapshot.size;

      const payoutTime = new Date();
      if (bookingCount < 5) {
        payoutTime.setHours(19, 0, 0, 0); // today at 7 PM
      } else {
        payoutTime.setDate(payoutTime.getDate() + 1);
        payoutTime.setHours(10, 0, 0, 0); // next day at 10 AM
      }

      return admin.firestore().collection("payouts").add({
        technicianId: techId,
        amount,
        bookingId: context.params.bookingId,
        scheduledFor: payoutTime.toISOString(),
        status: "pending"
      });
    }
    return null;
  });

exports.runScheduledPayouts = functions.pubsub
  .schedule("every 5 minutes").onRun(async (context) => {
    const now = new Date();
    const pendingPayouts = await admin.firestore().collection("payouts")
      .where("status", "==", "pending").get();

    const batch = admin.firestore().batch();
    for (const doc of pendingPayouts.docs) {
      const data = doc.data();
      const scheduledFor = new Date(data.scheduledFor);
      if (now >= scheduledFor) {
        const walletRef = admin.firestore().doc(`wallets/${data.technicianId}`);
        batch.set(walletRef, {
          balanceINR: admin.firestore.FieldValue.increment(data.amount)
        }, { merge: true });
        batch.update(doc.ref, { status: "completed" });
      }
    }
    return batch.commit();
  });

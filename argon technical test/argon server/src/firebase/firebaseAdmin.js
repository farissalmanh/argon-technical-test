const admin = require("firebase-admin");
const serviceAccount = require("../config/argon-test-2730c-firebase-adminsdk-y6jl5-0c4d699da4.json");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const sendPushNotification = async (devicePushToken, title, body) => {
  await firebaseAdmin.messaging().send({
    token: devicePushToken,
    notification: {
      title,
      body
    }
  })
}

module.exports = { sendPushNotification };
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("../app");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

exports.createCustomToken = functions.https.onRequest(
    async (req, res) => {
        try {
            const userId = req.body.userId;
            const customToken = await admin.auth().createCustomToken(userId);
            console.log(customToken);
            res.status(200).json({ customToken });
        } catch (error) {
            console.log("Error creating custom token", error);
        }
    },
);

exports.myFunction = functions.https.onRequest(app);

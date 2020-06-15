export default {
    MONGODB_URL: process.env.MONGODB_URL  || 'mongodb://localhost/escompras',
    JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "AYnGbqPyvYWJN8KxQ6evAKD0MALAAxA1Oxd3u7-bYUhquIrHxOn0xBTPtW-aFdy9ILrpBGb9QZyAPahr"
}
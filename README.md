# FlutterWave Implementation
This is a sample FlutterWave Implementations built with `Node.js`, `Typescript` and `MongoDB`.

## Installation
```bash
$ yarn install
```

## Structure
This application was written assuming it being a standalone payment server. Ideally, you will copy parts
of the code that you desire to user. The main payment logic is found in the `src/routes` path. 
You will see the logic for requesting Mobile money payments in Francophone Africa as this project
entails.

### Requesting Payments 
See the file `src/routes/payment.routes.ts:48`

When the user wants to issue a payment,
The Frontend app will request this route.
This route will:
1. Validate the `req.body` to make sure the payload sent was valid
2. FlutterWave SDk will send the payment request to the corresponding network operator.
   2.1 This request can fail at this stage maybe because the user has insufficient funds or the account is blocked
   2.2 If the request succeeds,this doesn't mean the payment has been processed.
   this means the network operator handle the payment and transfer funds to our account and when
   that is done the network will send a reply back to our server indicating weather the payment
   was completed or not accordingly. So we use the webhook to listen to these events.
3. Save the payment data in the database
4. Send a success or error response back to the user

You can read more on the [Docs](https://developer.flutterwave.com/docs/direct-charge/francophone-mobile-money)

### Listening to Payments
See the file `src/routes/payment.routes.ts:119`

FlutterWave will send a response to this payment hook, make sure to add this user to the flutter dashboard
for example if the live server url is https://api.wishme.com, on the Flutter dashboard add this:
https://api.wishme.com/payment/webhook
For more documentation
@see {https://developer.flutterwave.com/docs/integration-guides/webhooks/}

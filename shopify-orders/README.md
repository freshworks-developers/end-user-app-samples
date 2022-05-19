# Shopify orders app for customer portal placeholders

This app fetches the recent orders of the user from Shopify and shows in the New Ticket Page on Freshdesk

## Functionality

If the user is logged in to the requester portal, this app fetches the user's recent orders from Shopify and shows them with the essential order details.

## Screenshot
![](/shopify-orders/Screenshots/Shopify_Orders_sample_app.png)


### Steps to run app

1. Follow the steps in the documentation [here](https://developer.freshdesk.com/v2/docs/quick-start) to get started with the platform.
2. Execute the command, `fdk run` to run the app.
3. Go to the Apps page in the Admin settings to setup the app configurations by simulating the installation flow.

### Platform features used

1. End-user app placeholder - The app placeholder that render apps for the customer portal is used to run apps for every user visits
2. Data Method - To get the user information
3. Installation Parameters - To configure the shopify store and API credentials
4. OAuth - To authorize the app to Shopify store dynamically

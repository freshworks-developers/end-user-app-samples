# Conditional field app for customer portal placeholders

This app modifies the ticket properties in the New Ticket Page for End-users on Freshdesk based on the configurations.

## Functionality

If the current customer portal matches the configured portal, the description field is hidden and configured field is set with the configured value. For example, Ticket Type field can be automatically set as "Problem" for its value.

## Screenshots
![](/conditional-fields/Screenshots/Conditional_Fields_app.png)

### Steps to run app

1. Follow the steps in the documentation [here](https://developer.freshdesk.com/v2/docs/quick-start) to get started with the platform.
2. Execute the command, `fdk run` to run the app.
3. Go to the Apps page in the Admin settings to setup the app configurations by simulating the installation flow.

### Platform features used

1. End-user app placeholder - The app placeholder that render apps for the customer portal is used to run apps for every user visits
2. Data Method - To get the portal information
3. Installation Parameters - To configure the portal and fields to be modified

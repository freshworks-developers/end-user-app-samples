/**
 * Renders a table for each order entry
 * 
 * @param {Array} order - Order from Shopify
 * @returns {String} A HTML string for the table element to show an order properties
 */
function addTable(order){
  return `<table class="table">
    <tr>
      <th>Order Number</th>
      <td>${order.order_number}</td>
    </tr>
    <tr>
      <th>Price</th>
      <td>${order.total_price}</td>
    </tr>
    <tr>
      <th>Currency</th>
      <td>${order.presentment_currency}</td>
    </tr>
    <tr>
      <th>Items</th>
      <td>${order.line_items.map(lineItem => lineItem.name).join(', ')}</td>
    </tr>
    <tr>
      <th>More</th>
      <td><a href="${order.order_status_url}">Check Status</a></td>
    </tr>
  </table>`
}

/**
 * Renders the Shopify Orders
 * 
 * @param {Array} orders - Orders from Shopify
 */
function showOrders(orders){
  let ordersTable = '';
  orders.map(order => {
    ordersTable = ordersTable + addTable(order);
  });

  document.getElementById('orders').innerHTML = ordersTable;
}

/**
 * Fetches and renders the orders from Shopify
 * 
 * @param {String} email - Logged in user's email and undefined otherwise
 */
async function fillOrders(email) {
  if(email){
    try {
      const customerData = await client.request.invoke('getShopifyCustomer', { email });
      const customerId = customerData.response[0].id;
      try {
        const ordersData = await client.request.invoke('getShopifyCustomerOrders', { customerId });
        showOrders(ordersData.response);
      } catch (error) {
        console.error('Error: Failed to get orders from Shopify');
        console.error(error);
      }
    } catch (error) {
      console.error('Error: Failed to fetch customer from shopify');
      console.error(error);
    };
  } else {
    console.error('Error: User is not logged in');
    client.interface.trigger("showNotify", { title:'Want to check orders?', type: 'info', message:'Log in to the portal to check your order details' });
  }
}

/**
 * Executed when the app is moved to activated lifecycle event
 */
async function onAppActivate() {
  try {
  const userData = await client.data.get('user');
  await fillOrders(userData.user ? userData.user.email : userData.user);
  } catch (error) {
    console.error('Error: Failed ot get user data');
    console.error(error);
  }
}

/**
 * This function is triggered when the Document is ready
 */
document.onreadystatechange = async function () {
  if (document.readyState === 'interactive') renderApp();

  async function renderApp() {
    try{
    window.client = await app.initialized();
    client.events.on('app.activated', onAppActivate);
    } catch (error) {
      console.error('Error: Failed to initialize the app');
      console.error(error);
    }
  }
};

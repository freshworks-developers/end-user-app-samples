exports = {
  getShopifyCustomer: async function(args) {
    try {
      const response = await $request.invokeTemplate("shopifyCustomerSearch", { context: { email: args.email } });
      renderData(null, JSON.parse(response.response).customers);
    } catch (error) {
      console.error('Error: Failed to fetch customer info from Shopify');
      console.error(error);
      renderData({message: 'Error: Failed to fetch customer info from Shopify', status: error.status}, null);
    }
  },
  
  getShopifyCustomerOrders: async function(args) {
    console.log('getting shopify orders for', args.customerId);
    try {
      const response = await $request.invokeTemplate("getShopifyCustomerOrders", { context: { customerId: args.customerId } });
      renderData(null, JSON.parse(response.response).orders);
    } catch (error) {
      console.error('Error: Failed to fetch customer orders from Shopify');
      console.error(error);
      renderData({message: 'Error: Failed to fetch customer orders from Shopify'}, null);
    }
  }
}

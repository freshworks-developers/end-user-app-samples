exports = {
  getShopifyCustomer: async function(args) {
    console.log('getting shopify customer info for', args.emailId);
    console.log(args);
    const options = {
      headers: {
        'X-Shopify-Access-Token': '<%= access_token %>'
      },
      isOAuth: true
    }
    try {
      const url = `https://<%= oauth_iparams.shopify_store_name %>.myshopify.com/admin/customers/search.json?query=email:${args.email}&fields=email,id`;
      const data = await $request.get(url, options);
      renderData(null, JSON.parse(data.response).customers);
    } catch (error) {
      console.error('Error: Failed to fetch customer info from Shopify');
      console.error(error);
      renderData({message: 'Error: Failed to fetch customer info from Shopify'}, null);
    }
  },
  
  getShopifyCustomerOrders: async function(args) {
    console.log('getting shopify orders for', args.customerId);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': '<%= access_token %>'
      },
      isOAuth: true
    }
    try {
      const data = await $request.get(`https://<%= oauth_iparams.shopify_store_name %>.myshopify.com/admin/api/2021-10/customers/${args.customerId}/orders.json?status=any&fields=created_at,id,order_number,total_price,presentment_currency,line_items,order_status_url`, options);
      renderData(null, JSON.parse(data.response).orders);
    } catch (error) {
      console.error('Error: Failed to fetch customer orders from Shopify');
      console.error(error);
      renderData({message: 'Error: Failed to fetch customer orders from Shopify'}, null);
    }
  }
}

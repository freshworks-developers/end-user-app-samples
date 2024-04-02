function getIparams(){
  return client.iparams.get();
}

function hideTicketField(ticketField){
  return client.interface.trigger ("hide", {id: ticketField});
}

function getPortalType(){
  return client.data.get("portal")
}

async function onAppActivate() {
  
  try {
    const iparams = await getIparams();
        try {
      const portalData = await getPortalType();
              if (portalData.portal.host === `${iparams.domain}.freshdesk.com`){
          console.info(`The current portal is ${iparams.domain}.freshdesk.com`);
          try {
            await hideTicketField("description_html");
            console.info("The Description field is hidden");
            try {
            await client.interface.trigger("setValue", {id: iparams.custom_field_to_set, value: iparams.custom_field_to_set_value});
              console.info("The configured field is set with the configured value");
            } catch (error) {
              console.error("Error: Failed to set value");
              console.error(error);
            }
          } catch(error){
            console.error("Error: Failed to hide ticket field in new ticket form");
            console.error(error);
          }
        } else{
          console.info("Skipped customizations for portal other than the configured portal");
        }
    } catch (error) {
        console.error("Error: Failed to get portal type");
        console.error(error);
    }
  } catch (error) {
    console.error("Error: Failed to get iparams");
    console.error(error);
  }
}

document.onreadystatechange = function () {
  if (document.readyState === 'interactive') renderApp();

  async function renderApp() {
    try {
      window.client = await app.initialized();
      client.events.on('app.activated', onAppActivate);
    } catch (error) {
      console.error("Error: Failed to initialize app");
      console.error(error);
    }
  }
};

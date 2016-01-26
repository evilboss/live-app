let globals  = () => {
  let stripeProcessing = new ReactiveVar(false);
  return {
    stripeProcessing: stripeProcessing
  }
};

Modules.client.globals = globals();

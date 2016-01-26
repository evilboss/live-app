ProductsTable = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let subscription = Meteor.subscribe('products');

    let total = function () {

      return Modules.both.totalOrder(Cart.find().fetch());

    };

    return {
      isLoading: !subscription.ready() && total(),
      cartTotal: total(),
      isInCart: function (productId) {
        return !!Cart.findOne({product: productId});
      },
      isProcessing: !!Modules.client.globals.stripeProcessing.get(),
      stripeCheckout: StripeCheckout.configure({
          key: Meteor.settings.public.stripe,
          image: Meteor.settings.public.logo,
          locale: 'auto',
          allowRememberMe: false,
          token(token) {
            // Pass token and purchase info to the server here.

            let description = 'Order #' + Session.get("orderId");

            charge = {
              amount: token.amount || Modules.both.totalOrder(Cart.find().fetch()).orderTotal,
              currency: token.currency || 'usd',
              source: token.id,
              description: token.description || description,
              receipt_email: token.email
            };

            Modules.client.globals.stripeProcessing.set('attemptingCharge');
            Meteor.call('processPayment', charge, Session.get("orderId"), Cart.find().fetch(), (error, response) => {
              if (error) {
                Meteor.call('orderFailed', Session.get("orderId"), token.id, error.reason);
                Session.set('orderId', undefined);
                delete Session.keys['orderId'];
                Modules.client.globals.stripeProcessing.set(false);
                Bert.alert(error.reason, 'danger');
              } else {
                Meteor.call('approveOrder', Session.get("orderId"), token.id);
                Cart.remove({});
                Session.set('orderId', undefined);
                delete Session.keys['orderId'];
                Bert.alert('Thanks! Keep an eye on your email inbox for your product details!', 'success');
                Modules.client.globals.stripeProcessing.set(false);
              }
            });
          },
          closed() {
            if (Modules.client.globals.stripeProcessing !== 'attemptingCharge') {
              Modules.client.globals.stripeProcessing.set(false);
            }
          }
        }
      )
    }
  },
  componentDidMount() {
  },
  showTotals() {
    if (this.data.cartTotal.count === 0) {
      return <tfoot className="hidden">
      <tr ></tr>
      </tfoot>;
    }
    return (
      <tfoot>
      {this.showSubTotal()}
      {this.showOrderDiscount()}
      {this.showOrderSavings()}
      {this.showOrderTotal()}
      </tfoot>
    );
  },
  showSubTotal() {
    return (
      <tr>
        <td colSpan="2"></td>
        <td className="text-right"><h5>Sub-Total</h5></td>
        <td className="text-right"><s>${(this.data.cartTotal.original)}</s><br/>
          <span className="text-success">${Modules.both.prettyNumbers(this.data.cartTotal.subtotal)}</span>
        </td>
      </tr>
    );
  },
  showOrderDiscount() {
    if (this.data.cartTotal.orderDiscount > 0) {
      return (
        <tr>
          <td colSpan="2"></td>
          <td className="text-right">
            <h5>You ordered more than 3 products -
              <mark>BONUS:</mark>
            </h5>
          </td>

          <td className="text-right">${Modules.both.prettyNumbers(this.data.cartTotal.orderDiscountAmount)}
            <br/>
            <mark>Discount: {(this.data.cartTotal.orderDiscount)}%</mark>
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td colSpan="2"></td>
          <td className="text-right">
            <h5>BONUS:
              <mark>Order <strong>{3 - this.data.cartTotal.productCount}</strong> more
                product{(3 - this.data.cartTotal.productCount > 1) ? "s" : ""} for an additional 10% off your order
              </mark>
            </h5>
          </td>
          <td className="text-right">$0.00</td>
        </tr>
      );
    }
  },
  showOrderSavings() {
    return (
      <tr className="info">
        <td colSpan="2"></td>
        <td className="text-right"><h5>Your Total Savings</h5></td>

        <td className="text-right">${Modules.both.prettyNumbers(this.data.cartTotal.orderTotalSavings)}<br/>
          <mark>Saved: {(this.data.cartTotal.totalDiscount).toFixed(0)}%</mark>
        </td>
      </tr>
    );
  },
  showOrderTotal() {
    return (
      <tr>
        <td colSpan="2"></td>
        <td className="text-right"><h5>Total</h5></td>

        <td className="text-right">${Modules.both.prettyNumbers(this.data.cartTotal.orderTotal)}
        </td>
      </tr>
    );
  },
  showFreeGiftHeading() {
    if (this.data.cartTotal.productCount === 0) {
      return <tr className="hidden"></tr>;
    }
    return <tr>
      <td colSpan="4"><h2 className="text-center">Your Bonus Rewards (FREE)</h2></td>
    </tr>
  },
  showBonusProductHeading() {
    if (this.data.cartTotal.productCount === 0) {
      return <tr className="hidden"></tr>;
    }
    return <tr>
      <td colSpan="4"><h2 className="text-center">PLUS: Choose Any One Of These As Your Free Gift</h2></td>
    </tr>
  },
  showCheckout() {
    if (this.data.cartTotal.count === 0) {
      return "";
    }
    if (!Cart.findOne({isBonus:true})) {
      return (
        <div>
          <div className="col-xs-8 col-xs-offset-2">
            <h3 className="text-center text-warning">
              Remember To Choose Your Free Bonus Gift!
            </h3>
          </div>
          <div className="col-xs-6 col-xs-offset-3">
            <h3 className="text-center">Your Order Total:
              ${Modules.both.prettyNumbers(this.data.cartTotal.orderTotal)}</h3>
            <button onClick={this.doCheckout} className="btn btn-success btn-lg btn-block">Checkout &raquo;</button>
            <br/>
            <br/>
          </div>
        </div>
      )
    }
    return (
      <div className="col-xs-6 col-xs-offset-3">
        <h4 className="text-center">
          <mark>Your Savings:
            ${Modules.both.prettyNumbers(this.data.cartTotal.orderTotalSavings)}</mark>
        </h4>
        <h3 className="text-center">Your Order Total:
          ${Modules.both.prettyNumbers(this.data.cartTotal.orderTotal)}</h3>
        <button onClick={this.doCheckout} className="btn btn-success btn-lg btn-block">Checkout &raquo;</button>
        <br/>
        <br/>
      </div>
    );
  },
  doCheckout() {
    Modules.client.globals.stripeProcessing.set(true);

    let _orderId = OrderIds.insert({});

    Session.set("orderId", _orderId);

    this.data.stripeCheckout.open({
      name: 'JC Live Event Specials',
      description: 'Order #' + _orderId,
      amount: this.data.cartTotal.orderTotal,
      bitcoin: false
    });
  },
  render() {
    if (this.data.isLoading) {
      return <Loading />;
    } else if (this.data.isProcessing) {
      return <Processing />;
    } else {
      return (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
            <tr>
              <th>Qty</th>
              <th colSpan="2">Product</th>
              <th>Price</th>
            </tr>
            </thead>
            {this.showTotals()}
            <tbody>
            {this.props.saleProducts.map((product, index) => {
              return <Product key={index} product={product} isFreeGift={false} isBonusGift={false}/>;
            })}
            {this.showFreeGiftHeading()}
            {(this.data.cartTotal.productCount > 0) ? this.props.giftProducts.map((product, index) => {
              return <Product key={index+this.props.saleProducts.length} product={product} isFreeGift={true}
                              isBonusGift={false} />;
            }) : <tr className="hidden"></tr>}
            {this.showBonusProductHeading()}
            {(this.data.cartTotal.productCount > 0) ? this.props.bonusProducts.map((product, index) => {
              return <Product key={(index+this.props.saleProducts.length+this.props.giftProducts.length)}
                              product={product} isFreeGift={false} isBonusGift={true}/>;
            }) : <tr className="hidden"></tr>}
            </tbody>
          </table>
          {this.showCheckout()}
        </div>
      );
    }
  }
});

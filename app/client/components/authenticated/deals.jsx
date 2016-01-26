Deals = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let productsHandle = Meteor.subscribe('products');

    return {
      isLoading: !productsHandle.ready(),
      products: Products.find({}, {sort: {order: 1}}).fetch(),
      saleProducts: Products.find({"price.free": false}, {sort: {order: 1}}).fetch(),
      freeProducts: Products.find({"price.free": true, pick_one: true}, {sort: {order: 1}}).fetch(),
      giftProducts: Products.find({"price.free": true, pick_one: false}, {sort: {order: 1}}).fetch(),

    };
  },
  render() {
    if (this.data.isLoading) {
      return <Loading />;
    } else {
      return (
        <div>
          <h1 className="text-center">Exclusive Live Event Deals</h1>
          <ProductsTable products={this.data.products}
                         saleProducts={this.data.saleProducts}
                         giftProducts={this.data.giftProducts}
                         bonusProducts={this.data.freeProducts} />
        </div>
      );
    }
  }
});

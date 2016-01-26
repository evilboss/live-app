Product = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let productsInCart = Cart.find().fetch();
    let handle = Meteor.subscribe('products');

    return {
      loading: !handle.ready(),
      cart: productsInCart,
      isInCart: function (productId) {
        return !!Cart.findOne({product: productId});
      },
      isProductCodeInCart: function (productCode) {
        let product = Products.findOne({code: `${productCode}`});
        return product && !!Cart.findOne({product: product._id});
      },
      getDisplayClassForProduct: function (productId) {
        let isInCart = this.isInCart(productId);
        let product = Products.findOne({_id: productId});
        let isVisible = this.isProductVisible(product);
        let isPremium = !!product.premium;
        return ((isInCart ? "success" : "") + (isVisible ? "" : " hidden") + (isPremium ? " premium" : ""));
      },
      removeIncludedProducts: function (productId) {
        let product = Products.findOne({_id: productId});
        let cartProduct = Cart.findOne({product: productId});

        if (!!product.includes) {
          let removedFromCart = [];
          product.includes.forEach((cartCheckProductCode) => {
            let checkProduct = Products.findOne({code: `${cartCheckProductCode}`});
            let isInCart = Cart.findOne({product: checkProduct._id});
            if (!!isInCart) {
              removedFromCart.push(isInCart);
              Cart.remove({_id: isInCart._id});
            }
          });
          Cart.update({_id: cartProduct._id}, {$set: {removed: removedFromCart}});
        }

      },
      isProductVisible: function (product) {
        // First check if cart contains any product that contains this product
        let isVisible = true;
        this.cart.forEach((cartItem) => {
          let cartProduct = Products.findOne({_id: cartItem.product});
          if (!!cartProduct.includes && _.indexOf(cartProduct.includes, product.code) !== -1) {
            isVisible = false;
          }
        });
        if (!isVisible) return false;

        // Now check any pre-requisite products
        if (!product.requires) {
          return true;
        }
        let requiredProductsInCart = true;
        product.requires.forEach((requiredProduct) => {
          requiredProductsInCart = requiredProductsInCart && this.isProductCodeInCart(requiredProduct);
        });
        if (requiredProductsInCart) {
          return true;
        }
        return false;
      }
    }
  },
  componentDidMount() {
    // If this is a free gift product - make sure it is in the cart
    if (this.props.isFreeGift) {
      Cart.upsert({product: this.props.product._id}, {product: this.props.product._id, qty: 1, isFree: true});
    }
  },
  addToCart(e) {
    let node = e.target;
    if (node.className == "qtyPicker") return;

    while (node && node.parentNode && node.parentNode.nodeName !== "TR") {
      node = node.parentNode;
    }
    let productId = node.parentNode.id;
    let cartProduct = Cart.findOne({product: productId});
    if (cartProduct) {
      Cart.remove({product: productId});
      //Also remove any products from cart that this product is a pre-requisite for
      let product = Products.findOne({_id: productId});
      let dependentProducts = Products.find({requires: {$in: [product.code]}}, {fields: {_id: 1}}).fetch();
      let dependentProductIds = dependentProducts.map((dependentProduct) => {
        return dependentProduct._id;
      });
      Cart.remove({product: {$in: dependentProductIds}});

      // Finally - put back any products that were previously removed by adding this product - i.e. this is a bundle product
      if (cartProduct.removed) {
        cartProduct.removed.forEach((addItem) => {
          Cart.insert({
            product: addItem.product,
            qty: addItem.qty,
            isProduct: addItem.isProduct,
            isFree: addItem.isFree,
            isBonus: addItem.isBonus
          });
        });
      }
    } else {
      if (this.props.isBonusGift) {
        // Remove any other bonus products already in the cart - can only pick one!
        Cart.remove({isBonus: true});
      }
      let qty = $('tr#' + productId + ' .qtyPicker').val();
      if (!qty) qty = 1;
      qty = parseInt(qty);

      // A "product" is anything that is not a bonus gift product or a ticket
      let isProduct = !this.props.isBonusGift && (_.indexOf(["ticket-badass-retreat-may-2016",
          "friend-ticket-badass-retreat-may-2016"], this.props.product.code) === -1);

      Cart.insert({product: productId, qty: qty, isBonus: this.props.isBonusGift, isProduct: isProduct});
      this.data.removeIncludedProducts(productId);
    }

    // Make sure we don't leave "bonus" or "free" products in the cart if there are no actual "products" in there
    if (!Cart.findOne({isProduct: true})) {
      Cart.remove({isBonus: true});
      Cart.remove({isFree: true});
    }

  },
  changeQty(e) {
    e.stopPropagation();
    let node = e.target;

    let qty = parseInt(node.value);
    while (node && node.parentNode && node.parentNode.nodeName !== "TR") {
      node = node.parentNode;
    }
    let productId = node.parentNode.id;
    let cartProduct = Cart.findOne({product: productId});
    if (cartProduct) {
      Cart.update({product: productId}, {$set: {qty: qty}});
    }
  },
  showQtyPicker(product) {
    if (product.limit_quantity) {
      return (<select defaultValue="1" className="qtyPicker" onClick={this.changeQty}
                      onChange={this.changeQty}>{this.showOptions(product.limit_quantity)}</select>);
    } else {
      return (
        <span>1</span>
      );

    }
  },
  showDiscountedPrice(product) {
    let qty = $('tr#' + product._id + ' .qtyPicker').val();
    if (!!qty) {
      return Modules.both.prettyNumbers(qty * product.price.discounted);
    }
    return Modules.both.prettyNumbers(product.price.discounted);
  },
  showOptions(limit) {
    var options = [];
    for (let i = 1; i <= limit; i++) {
      options[i] = i;
    }
    return options.map((option) => {
      return <option key={option} value={option}>{option}</option>;
    });
  },
  render() {
    if (this.data.loading) {
      return (<tr>
        <td><Loading /></td>
        <td><Loading /></td>
        <td><Loading /></td>
        <td><Loading /></td>
      </tr>);
    }
    if (this.props.isFreeGift) {
      return (
        <tr key={this.props.product._id} id={this.props.product._id}
            className="success">
          <td className="text-center">
            {this.showQtyPicker(this.props.product)}
          </td>
          <td className="text-center">
            <img style={{maxWidth: '85px', maxHeight: '85px'}} className="img-thumbnail"
                 src={this.props.product.image} alt={this.props.product.name}/>
          </td>
          <td><h5>{this.props.product.name}</h5></td>
          <td className="text-right"><span
            className="text-success">FREE</span>
          </td>
        </tr>
      )
    }
    if (this.props.isBonusGift) {
      return (
        <tr onClick={this.addToCart} key={this.props.product._id} id={this.props.product._id}
            className={this.data.getDisplayClassForProduct(this.props.product._id)}>
          <td className="text-center">
            {this.showQtyPicker(this.props.product)}
          </td>
          <td className="text-center">
            <img style={{maxWidth: '85px', maxHeight: '85px'}} className="img-thumbnail"
                 src={this.props.product.image} alt={this.props.product.name}/>
          </td>
          <td><h5>{this.props.product.name}</h5></td>
          <td className="text-right"><span
            className="text-success">FREE</span>
          </td>
        </tr>
      );
    }
    if (!this.props.product.requires ||
      ( !!this.props.product.requires && this.data.isProductCodeInCart(this.props.product.requires))) {
      return (
        <tr onClick={this.addToCart} key={this.props.product._id} id={this.props.product._id}
            className={this.data.getDisplayClassForProduct(this.props.product._id)}>
          <td className="text-center">
            {this.showQtyPicker(this.props.product)}
          </td>
          <td className="text-center">
            <img style={{maxWidth: '85px', maxHeight: '85px'}} className="img-thumbnail"
                 src={this.props.product.image} alt={this.props.product.name}/>
          </td>
          <td><h5>{this.props.product.name}</h5></td>
          <td className="text-right">
            <s>${this.props.product.price.original} {(this.props.product.limit_quantity ? "each" : "")}</s><br/><span
            className="text-success">{this.showDiscountedPrice(this.props.product)}</span><br/>
            <mark>You Save: {this.props.product.price.discount}%</mark>
          </td>
        </tr>
      );
    } else {
      return (<tr className="hidden"></tr>);
    }
  }
});

LeaderboardProduct = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let productsHandle = Meteor.subscribe('products');
    let productsTeamHandle = Meteor.subscribe('salesByProductTeamMember');

    return {
      isLoading: !productsTeamHandle.ready() && !productsHandle.ready(),
      product: function(code) {
        return Products.findOne({code: code});
      },
      topSales: function (code) {
        return SalesByProductTeamMember.findOne({code: code}, {sort: {totalSales: -1}});
      }
    }
  },
  showProduct(code) {
    let product = this.data.product(code);
    if (product) {
      return (
        <td className="text-center">
          <h5>{product.name}</h5>
          <img style={{maxWidth: '85px', maxHeight: '85px'}} className="img-thumbnail"
               src={product.image} alt={product.name}/>
        </td>);
    } else {
      return <td className="hidden"><p>{code} (not found)</p></td>
    }
  },
  showTopSeller(code) {
    let product = this.data.product(code);
    if (product) {
      return (
        <td className="text-center">
          <h5 className="text-right"><mark>{this.data.topSales(code).displayName}</mark></h5>
          <h5 className="text-right"># Sold: {this.data.topSales(code).qty}</h5>
          <h5 className="text-right">Sales: ${Modules.both.prettyNumbers(this.data.topSales(code).totalSales)}</h5>
        </td>);
    } else {
      return <td><p>{code} (not found)</p></td>
    }
  },
  render() {
    if (this.data.isLoading) {
      return <tr><td colSpan="4"><Loading /></td></tr>;
    } else {
      return (
        <tr>
          {this.showProduct(this.props.product.code)}
          {this.showTopSeller(this.props.product.code)}
          <td className="text-center">{this.props.product.qty}</td>
          <td className="text-right">${Modules.both.prettyNumbers(this.props.product.totalSales)}</td>
          <td className="text-right">${Modules.both.prettyNumbers(this.props.product.totalCommission)}</td>
        </tr>
      );
    }
  }
});

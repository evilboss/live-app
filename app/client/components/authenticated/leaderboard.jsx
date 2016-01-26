Leaderboard = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let totalSales = 0,
        totalCommission = 0;

    for (let product of this.props.productSales) {
      totalSales += product.totalSales;
      totalCommission += product.totalCommission;
    }

    return {
      totals: {
        sales: totalSales,
        commission: totalCommission
      }
    };
  },
  showProductTotals() {
    return <tfoot>
    <tr>
      <td colSpan="3" className="text-right"><h5>Totals</h5></td>
      <td className="text-right"><h5>${Modules.both.prettyNumbers(this.data.totals.sales)}</h5></td>
      <td className="text-right"><h5>${Modules.both.prettyNumbers(this.data.totals.commission)}</h5></td>
    </tr>

    </tfoot>

  },
  showTotals(){
    if (this.props.teamSalesStats.count === 0) {
      return (
        <tfoot className="hidden">
        <tr ></tr>
        </tfoot>
      );
    }
    let totalSales = 0;
    let totalCommission = 0;
    _.forEach(this.props.teamSalesStats, function (member) {
      totalSales += member.totalSales;
      totalCommission += member.totalCommission;
    });

    return (
      <tfoot>
      <tr>
        <td className="text-right"><strong>Total</strong></td>
        <td className="text-right">${Modules.both.prettyNumbers(totalSales)}</td>
        <td className="text-right">${Modules.both.prettyNumbers(totalCommission)}</td>
      </tr>
      </tfoot>);
  },
  render() {
    return (
      <div className="row">
        <div className="col-xs-8 pull-left">
          <h2 className="text-center">Sales By Product</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
              <tr>
                <th>Product</th>
                <th>Leader</th>
                <th># Sales</th>
                <th>$ Sales</th>
                <th>Commission</th>
              </tr>
              </thead>
              {this.showProductTotals()}
              <tbody>
              {this.props.productSales.map((product, index) => {
                return <LeaderboardProduct key={index} product={product}/>;
              })}
              </tbody>

            </table>
          </div>
        </div>
        <div className="col-xs-4 pull-right">
          <h1 className="text-center">Leaderboard</h1>

          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
              <tr>
                <th>Sales Person</th>
                <th>Sales</th>
                <th>Commission</th>
              </tr>
              </thead>
              {this.showTotals()}
              <tbody>
              {this.props.teamSalesStats.map((player, index) => {
                return <LeaderboardPlayer key={index} player={player}/>;
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

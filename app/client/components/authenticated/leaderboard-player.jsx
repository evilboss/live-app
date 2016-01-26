LeaderboardPlayer = React.createClass({
    render() {
        return (
                <tr>
                    <td>{this.props.player.displayName}</td>
                    <td className="text-right">${Modules.both.prettyNumbers(this.props.player.totalSales)}</td>
                    <td className="text-right">${Modules.both.prettyNumbers(this.props.player.totalCommission)}</td>
                </tr>
        );
    }
});
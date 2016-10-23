function Heading(props) {
    return (<h1>{props.text}</h1>);
}

function Status(props) {
    return (
        <div className="extra-left-margin">
            API Status: {props.text}
        </div>
    );
}

function DataTable(props) {
    let rows = props.data.map(d => {
        return (<tr>{d.name}</tr>);
    });
    return (
        <table>
            <tr>Device Names</tr>
            {rows}
        </table>
    );
}

const AppComponent = React.createClass({
    getInitialState: function() {
        return {
            status: 'unknown',
            devices: []
        };
    },
    componentWillMount: function() {
        const self = this;
        particleService.getStatus().then(status => {
            self.setState({
                status: status.apiStatus
            });
        });

        particleService.getDevices().then(devices => {
            self.setState({
                devices: devices
            });
        });
    },
    render: function() {
        return (
            <div>
                <Heading text="Ohio State Workshop" />
                <Status text={this.state.status} />
                <DataTable data={this.state.devices} />
            </div>
        );
    }
});

ReactDOM.render(
    <AppComponent />,
    document.getElementById('react-root')
);

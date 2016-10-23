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
        return (
            <tr>
                <td>{d.name}</td>
                <td>{d.variables.length}</td>
            </tr>
        );
    });
    return (
        <table>
            <tr>
                <th>Device Name</th>
                <th>Sensor Count</th>
            </tr>
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
            return Promise.all(devices.map(d => particleService.getDeviceDetails(d.id)));
        }).then(devDetails => {
            self.setState({
                devices: devDetails
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

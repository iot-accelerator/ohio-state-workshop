const sensorsList = [
    'temperature',
    'humidity',
    'lightSensor'
];

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
                <td>{props.data[0].result}</td>
                <td>{props.data[1].result}</td>
                <td>{props.data[2].result}</td>
            </tr>
        );
    });
    return (
        <table>
            <tr>
                <th>Temperature</th>
                <th>Humidity</th>
                <th>Ambient Light</th>
            </tr>
            {rows}
        </table>
    );
}

const AppComponent = React.createClass({
    getInitialState: function() {
        return {
            status: 'unknown',
            sensorData: []
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
            return devices.map(d => d.id);
        }).then(ids => {
            return Promise.all(ids.map(id => particleService.getDeviceDetails(id)));
        }).then(details => {
            return details.map(d => {
                return {
                    id: d.id,
                    name: d.name
                };
            });
        }).then(devObjs => {
            return Promise.all(devObjs.map(
                d => Promise.all(sensorNameList.map(s => particleService.getDeviceVariable(d.id, s)))
            ));
        }).then(rawData => {
            self.setState({
                sensorData: rawData
            });
        });
    },
    render: function() {
        return (
            <div>
                <Heading text="Ohio State Workshop" />
                <Status text={this.state.status} />
                <DataTable data={this.state.sensorData} />
            </div>
        );
    }
});

ReactDOM.render(
    <AppComponent />,
    document.getElementById('react-root')
);

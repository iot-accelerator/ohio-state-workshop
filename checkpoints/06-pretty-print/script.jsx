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

function DataHeader() {
    return (
        <tr>
            <th>Name</th>
            <th>Temperature (&deg;F)</th>
            <th>Humidity (&#37;)</th>
            <th>Ambient Light</th>
        </tr>
    );
}

function LoadingRow() {
    return (
        <tr>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
        </tr>
    );
}

function DataRow(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.data[0].result}</td>
            <td>{props.data[1].result}</td>
            <td>{props.data[2].result}</td>
        </tr>
    );
}

function DataTable(props) {
    let rows = props.data.map(d => {
        return (<DataRow name={d.name} data={d.sensors} />);
    });

    if (rows.length === 0) {
        rows = [<LoadingRow />];
    }

    return (
        <table>
            <DataHeader />
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

        particleService.getSensorData(sensorsList).then(data => {
            self.setState({
                sensorData: data
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

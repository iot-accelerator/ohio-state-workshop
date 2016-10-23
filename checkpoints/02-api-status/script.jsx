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

const AppComponent = React.createClass({
    getInitialState: function() {
        return {
            status: 'unknown'
        };
    },
    componentWillMount: function() {
        const self = this;
        particleService.getStatus().then(status => {
            self.setState({
                status: status.apiStatus
            });
        });
    },
    render: function() {
        return (
            <div>
                <Heading text="Ohio State Workshop" />
                <Status text={this.state.status} />
            </div>
        );
    }
});

ReactDOM.render(
    <AppComponent />,
    document.getElementById('react-root')
);

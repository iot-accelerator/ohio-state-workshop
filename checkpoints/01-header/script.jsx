function Heading(props) {
    return (<h1>{props.text}</h1>);
}

ReactDOM.render(
    <Heading text="Ohio State Workshop" />,
    document.getElementById('example')
);

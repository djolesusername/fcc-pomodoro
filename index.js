

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            break: 5,
            session: 1,
            left: 1,
            bleft: 5,
            active: false,
            activeb: false,
            action: "Session",
            then: 0,
            secondsLeft: 1,

        };
    }

    breakDown = () => {
        if (this.state.break > 0) {
            this.setState({
                break: this.state.break - 1,

            });
        }
    }


    breakUp = () => {
        if (this.state.break < 60) {
            this.setState({
                break: this.state.break + 1,

            });
        }
    }
    sessionDown = () => {

        this.setState({
            session: this.state.session - 1,

        });
    }

    sessionUp = () => {

        this.setState({
            session: this.state.session + 1,

        });
    }

    componentDidMount = () => {
        var intervalId = setInterval(this.checkTime, 1000);
        // store intervalId in the state so it can be accessed later:
        this.setState({ intervalId: intervalId });
    }
    componentWillUnmount = () => {
        clearInterval(this.state.intervalId)
    }

    startTimer = () => {

        this.checkTime();

        this.setState({
            then: Date.now() + this.state.left * 60 * 1000,
            active: !this.state.active,
            left: this.state.secondsLeft / 60
        });



    }

    checkTime = () => {
        if (this.state.active) {
            if (this.state.secondsLeft > 0) {
                console.log("checkTime")
                this.setState({
                    secondsLeft: Math.round((this.state.then - Date.now()) / 1000),

                });
            }
        }
    }




    resetTimer = () => {
        clearInterval(this.state.intervalId)

        this.setState({
            left: this.state.session,
            bleft: this.state.break,
            active: false,
            activeb: false,
            action: "Session",
        })

    }




    render() {

        return (<div className="grid-container">
            <div className="item1"><h1> Pomodoro clock </h1></div>
            <div className="item2" id="break-label"> <h4>Break Length </h4> </div>
            <div className="item3" id="session-label">Session Length</div>
            <div className="item4"> <button id="break-decrement" onClick={this.breakDown}>-</button> <p id="break-length"> {this.state.break} </p>
                <button id="break-increment" onClick={this.breakUp}>+</button> </div>
            <div className="item5"> <button id="session-decrement" onClick={this.sessionDown}>-</button> <p id="session-length"> {this.state.session} </p>
                <button id="session-increment" onClick={this.sessionUp}>+</button> </div>
            <div className="item6"> <p id="timer-label"> {this.state.action} {this.state.left} {this.state.secondsLeft} </p> <p id="time-left"> </p> </div>
            <div className="item7"> <button id="start_stop" onClick={this.startTimer}> Start </button>  <button id="reset" onClick={this.resetTimer} > Reset </button></div>
        </div>);
    }





}
ReactDOM.render(<App />, document.querySelector("#timer"));
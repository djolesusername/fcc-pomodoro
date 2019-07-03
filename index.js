const audio = document.getElementById("Q");


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            break: 5,
            session: 25,
            left: 25,
            active: false,
            ended: true,
            action: "Session",
            then: 0,
            secondsLeft: 1500,
            display: "25:00",
            transfer: false,



        };
    }

    // This function switches between session and break. It will run similar code to one of startTimer. 
    // It runs startTimer on property transfer which controls whether handleTransfer could be called 


    handleTransfer = () => {
        console.log("handleout")

        if (this.state.action == "Session") {
            this.setState({
                action: "Break",
                secondsLeft: this.state.break * 60,
                left: this.state.break,
                then: Date.now() + this.state.break * 60 * 1000,
                transfer: true,

            })
        } else if (this.state.action == "Break") {
            this.setState({
                action: "Session",
                secondsLeft: this.state.session * 60,
                left: this.state.session,
                then: Date.now() + this.state.session * 60 * 1000,
                transfer: true,
            })
        }

        setTimeout(() => (this.setState({
            transfer: false,
        }), 3000))

    }
    breakDown = () => {
        if (this.state.break >= 2) {
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

    // Adjusts the length of the session. Buttons are allowed to edit session length as 
    // long as current session remains unchenged. In case that timer is not active changes are applied to other properties
    sessionDown = () => {
        if (this.state.session >= 2) {
            this.setState({
                session: this.state.session - 1,




            });

            if (!this.state.active && this.state.ended) {
                this.setState({
                    secondsLeft: this.state.secondsLeft - 60,
                    left: this.state.left - 1,
                    display: `${this.state.session - 1 < 10 ? "0" : ""}${this.state.session - 1}:00`


                });
            }
        }
    }



    sessionUp = () => {
        if (this.state.session < 60) {

            this.setState({
                session: this.state.session + 1,

            });

            if (!this.state.active && this.state.ended) {
                console.log("Session up not active")
                this.setState({
                    secondsLeft: this.state.secondsLeft + 60,
                    left: this.state.left + 1,
                    display: `${this.state.session + 1 < 10 ? "0" : ""}${this.state.session + 1}:00`

                });
            }

        }
    }
    // Running checkTime function which checks remaining time and updates the display 

    componentDidMount = () => {
        var intervalId = setInterval(this.checkTime, 30);
        // store intervalId in the state so it can be accessed later:
        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount = () => {
        console.log("clearI")
        clearInterval(this.state.intervalId)
    }

    // Start timer will calculate time from now and use it as target time. Any time start/pause button is hit these values are updated. 


    startTimer = () => {

        this.setState({
            active: !this.state.active,
            left: this.state.secondsLeft / 60,
            // then: Date.now() + this.state.left * 60 * 1000,
            then: Date.now() + this.state.secondsLeft * 1000,
            ended: false,


        })
        this.checkTime()
    }
    // This function is called every 30ms
    // Minutes and remseconds are used for display only. secondsLeft is the timer of the application and it updates
    // using difference between current and target time. Once timer reaches 00:00 handleTransfer function is called 

    checkTime = () => {

        let minutes = Math.floor(this.state.secondsLeft / 60);
        let remseconds = this.state.secondsLeft % 60;
        if (this.state.active) {
            if (this.state.secondsLeft > 0) {

                this.setState({
                    secondsLeft: Math.round((this.state.then - Date.now()) / 1000),
                    display: `${minutes < 10 ? "0" : ""}${minutes}:${remseconds < 10 ? "0" : ""}${remseconds}`,

                })

            }


            else if (this.state.secondsLeft == 0) {

                this.setState({
                    display: `${minutes < 10 ? "0" : ""}${minutes}:${remseconds < 10 ? "0" : ""}${remseconds}`,

                })
                if (!this.state.transfer) {

                    this.setState({
                        transfer: true,
                    })
                    setTimeout(() => { this.handleTransfer() }, 980)
                }
            }

            /* else if (this.state.secondsLeft == 0 || this.state.display == "00:00") {
                this.handleTransfer, 1000
            } */

        }
    }




    //In order to pass the tests, reset button should return values to original state.


    resetTimer = () => {

        this.setState({
            left: this.state.session,
            bleft: this.state.break,
            active: false,
            activeb: false,
            action: "Session",
            secondsLeft: this.state.session * 60,
            display: `${this.state.session < 10 ? "0" : ""}${this.state.session + 1}:00`,
            ended: true,
            break: 5,
            session: 25,
            transfer: false,
            left: 25,

        })

    }




    render() {

        return (<div className="grid-container">
            <div className="item1"><h1> Pomodoro clock </h1></div>
            <div className="item2" id="break-label"> <h4>Break Length </h4> </div>
            <div className="item3" id="session-label">Session Length</div>
            <div className="item4"> <button id="break-decrement" onClick={this.breakDown}>-</button>
                <p id="break-length"> {this.state.break} </p>
                <button id="break-increment" onClick={this.breakUp}>+</button> </div>
            <div className="item5"> <button id="session-decrement" onClick={this.sessionDown}>-</button>
                <p id="session-length"> {this.state.session} </p>
                <button id="session-increment" onClick={this.sessionUp}>+</button> </div>
            <div className="item6">
                <p id="timer-label"> {this.state.action} </p>
                <p id="time-left"> {this.state.display} </p> </div>
            <div className="item7"> <button id="start_stop" onClick={this.startTimer}> Start </button>
                <button id="reset" onClick={this.resetTimer} > Reset </button></div>

        </div>);
    }





}
ReactDOM.render(<App />, document.querySelector("#timer"));

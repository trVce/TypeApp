import React, { Component } from 'react'
import './App.css';
class Api extends Component {
    constructor(props) {

        super(props);
        this.state = { text: "", author: "", json: {}};
    }

    
    componentDidMount() {
        const url = "https://www.abbreviations.com/services/v2/quotes.php?uid=" + this.props.userID +
        "&tokenid=" + this.props.token + "&searchtype=RANDOM&format=json";

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    json: res,
                    text: res.result.quote,
                    author: res.result.author
                })
                this.props.quote(this.state.text)
            });
    }

    render() {
        return (
            <div className="TextCard">
                <h2>{this.state.author}</h2>
                <p>{this.state.text}</p>
            </div>
        )
    }
   
}
export default Api;
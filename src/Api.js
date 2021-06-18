import React, { useState, useEffect } from 'react';
import './App.css';

const Api = (props) => {
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    useEffect(() =>  {
        if(props.ready === true){
            const url = "https://www.abbreviations.com/services/v2/quotes.php?uid=" + props.usr +
                "&tokenid=" + props.tkn + "&searchtype=RANDOM&format=json";
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    try {
                        setText(res.result.quote);
                        setAuthor(res.result.author);
                        props.quotefunction(res.result.quote);
                    }
                    catch (e) {
                        setText("Please check UserID and Token");
                        setAuthor("Error");
                    }
                });
        }

        if(props.isDone === true){
            let words = text;
            words = words.replace(/(^\s*)|(\s*$)/gi, "");
            words = words.replace(/[ ]{2,}/gi, " ");
            words = words.replace(/\n /, "\n");
            let wpm = words.split(' ').length;
            setAuthor(wpm + " words " + " in " + (props.time + 1) + " seconds.");
            setText(words);
        }
    }, [props, props.ready, props.isDone, text]);

    

    return(
        <div className="TextCard">
            <h2>{author}</h2>
            <p>{text}</p>
        </div>
    );
   
};
export default Api;
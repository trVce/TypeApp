import React, { useState, useEffect } from 'react';
import './App.css';

const Api = (props) => {
    const [text, setText] = useState("Welcome to Typing Race");
    const [author, setAuthor] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [wpm, setWPM] = useState("");
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
                        setWordCount(0);

                    }
                    catch (e) {
                        setText("Please check UserID and Token");
                        setAuthor("Error");
                    }
                });
        }

        if(text !== "" && wordCount === 0){
            let words = text;
            words = words.replace(/(^\s*)|(\s*$)/gi, "");
            words = words.replace(/[ ]{2,}/gi, " ");
            words = words.replace(/\n /, "\n");
            setWordCount(words.split(' ').length);
        }

        if(props.isDone === true){
            //setAuthor(wordCount + " words " + " in " + (props.time + 1) + " seconds.");
            setWPM("WPM: " + Math.round((wordCount / (props.time + 1) * 60)));
            setAuthor(wpm);
            setText("");
        }
    }, [props, props.ready, props.isDone, text, wordCount, wpm]);

    

    return(
        <div className="TextCard">
            <h2>{author}</h2>
            <p>{text}</p>
            
        </div>
    );
   
};
export default Api;
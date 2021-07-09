import React, { useState, useEffect } from 'react';
import './App.css';

const Api = (props) => {
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const [wordCount, setWordCount] = useState("empty");
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

        if(text !== ""){
            let word = text;
            word = word.replace(/(^\s*)|(\s*$)/gi, "");
            word = word.replace(/[ ]{2,}/gi, " ");
            word = word.replace(/\n /, "\n");
            setWordCount(word.split(' ').length);
        }

        if(props.isDone === true){
            setAuthor(wordCount + " words " + " in " + (props.time + 1) + " seconds.");
            setText("");
        }
    }, [props, props.ready, props.isDone, text, wordCount]);

    

    return(
        <div className="TextCard">
            <h2>{author}</h2>
            <p>{text}</p>
        </div>
    );
   
};
export default Api;
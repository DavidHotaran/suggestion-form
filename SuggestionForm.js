import { useState, useRef } from 'react';
import './suggestion.css';

export default function SuggestionForm({ initialData }) {
    const [suggestion, setSuggestion] = useState([]); // list of suggestions under the input
    const [inputData, setInputData] = useState(""); // value of input data
    const [keyIndex, setKeyIndex] = useState(0); // index of items in initial datat
    const [error, setError] = useState(false); // if we did not find something in the list
    const ref = useRef(); // used to scroll list when user pushes up/down arrow

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted");
        setSuggestion([]);
        setInputData("");
    };

    const handleClick = () => {
        console.log("Click me");
    };

    const handleChange = (e) => {
        let userInput = e.target.value;
        setInputData(userInput);

        let suggest = initialData.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        ).sort();

        setSuggestion(suggest);

        if (suggest.length === 0) {
            setSuggestion([]);
            setError(true);
        } else {
            setSuggestion(suggest);
            setError(false);
        };
    };

    const handleKey = (e) => {

        if (e.keyCode === 8) { //backspace reset index
            setKeyIndex(0);
        };

        if (e.keyCode === 13) { //enter, set inputData, reset index
            setInputData(suggestion[keyIndex]);
            setKeyIndex(0);
        };

        if (e.keyCode === 38) { //up arrow
            if (keyIndex === 0) return;

            ref.current.scrollBy(0, -24); //controll scrolling of list results back up
            setKeyIndex(keyIndex - 1);
            setInputData(suggestion[keyIndex - 1]);
        };

        if (e.keyCode === 40) { //down arrow
            if (keyIndex === suggestion.length - 1) return;

            ref.current.scrollBy(0, 24); //controll scrolling of list results back up
            setKeyIndex(keyIndex + 1);
            setInputData(suggestion[keyIndex + 1]);
        };
    };

    return (
        <div style={{ position: "relative" }}>
            <form className="form" onSubmit={handleSubmit}>
                <input className='input'
                    type={'search'}
                    value={inputData}
                    onChange={handleChange}
                    placeholder="Search"
                    onKeyDown={handleKey} />
                {inputData.length >= 1 && !error &&
                    <ul className='suggestions' ref={ref}>
                        {suggestion.map((item, index) => (
                            <li key={index}
                                className={index === keyIndex ? "suggestion-active" : ""}
                                onClick={() => handleClick(item)}>
                                {item}
                            </li>
                        ))}
                    </ul>}
            </form>
        </div>
    );
};
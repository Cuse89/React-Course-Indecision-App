import React from 'react';
import Option from './Option';


// ES6 classes do not bind 'this' by default. What that means is I can override the 'this' binding for any class if I wanted to.
// Instead of using bind in the handleDeleteOptions event handler itself (which would be inefficient as it would bind EACHTIME it renders),
// we can use it once in the constructor function - only binding it once when it gets initialised (efficient)


const Options = (props) => (
    <div>
        <div className="widget-header">
            <h3 className="widget-header__title">Your Options</h3>
            <button 
            className="button button--link"
            onClick={props.handleDeleteOptions}
            >
            Remove All
            </button>
        </div>    
            {props.options.length === 0 && <p className="widget__message">Please add an option to get started</p> }
            {
            /*OptionText below is a Prop (similar to subtitle etc above), allowing Option component to access it*/
            props.options.map((optionFromArr, index) => (
                <Option 
                    key={optionFromArr} 
                    optionText={optionFromArr}
                    count={index + 1}
                    handleDeleteOption={props.handleDeleteOption}
                />
            ))            
        }
    </div>
);

export default Options;
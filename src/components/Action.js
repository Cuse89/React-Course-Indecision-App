import React from 'react';

// Stateless Functional Components are faster than classes - used for simple components
// without state changes - We dont use 'this' keyword because we pass props in as an
// argument. Doesnt need the render function.

const Action = (props) => (
    <div>
        <button className="big-button" 
        onClick={props.handlePick}
        disabled = {!props.hasOptions}
        >What should I do?</button>
    </div>
);

export default Action;
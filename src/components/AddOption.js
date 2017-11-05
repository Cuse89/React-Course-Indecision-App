import React from 'react';

export default class AddOption extends React.Component {
    state = {
        error: undefined
    };
    
    handleAddOption = (e) => {
        //prevents default form submission - full page refresh
        e.preventDefault();
        // the string typed into input box (trimmed - and spaces before and after if there are any)
        const option = e.target.elements.option.value.trim();
        // If input option exist, we'll pass it up to its parent
        const error = this.props.handleAddOption(option);
        // If form is submitted with an error, we want to update error state
        this.setState(() => ({error}));
        // if no error, clear input text
        if (!error) {
            e.target.elements.option.value = '';
        }
    }

        
    render() {
        return (
            <div>  
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit = {this.handleAddOption}>
                    <input className="add-option__input" type="text" name="option"/>
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
}
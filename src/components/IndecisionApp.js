import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal'

// Important that class name for component is Uppercase- its how React differentiates from a component and HTML element

class IndecisionApp extends React.Component {
    // state (an object) is used when we know its values are going to get changed and can be changed by a components children
    state = {
        options: [],
        selectedOption: undefined
    };

    handleClearSelectedOption = () => {
        this.setState(() => ({selectedOption: undefined }))
    }
    
    handleDeleteOptions = () => {
        // when using the es6 arrow function instead of using 'return', the object needs to be wrapped in () so it knows its not a jsx expression
        this.setState(() => ({options: [] }))
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            // only delete the single argument option by filtering out everything except itself
            options: prevState.options.filter((optionsInArr) => optionToRemove !== optionsInArr)
        }));
    };

    handlePick = () => {
       const randomNum = Math.floor(Math.random() * this.state.options.length)
       const option = this.state.options[randomNum]
       this.setState(() => ({
           selectedOption: option
       }))
    };

    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }
        this.setState((prevState) => ({
            options: [...prevState.options, option] 
        }));
    };

    // Lifecycle Methods (only available in Class based components)- methods that get called during reacts inbuilt lifecycle - we can go inside them and adjust what happens when they get called.
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json)
            if (options) {
                this.setState(() => ({ options }));
            }
        }   catch (e) {
            // Do nothing at all
        }
    };

    componentDidUpdate(prevProps, prevState) {
        // so were not including empty options (clicking add option when theres nothing)
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    };

    componentWillUnmount() {
        console.log('componentWillUnmount');
    };

    render() {
        const subtitle = 'Put your life in the hands of a computer';

        return (
            //Here is the JSX - what will get shown on the UI (basically a list of components)
            <div>
            {/*subtitle etc below is a PROP, passing down information to the components */}
                <Header 
                    subtitle = {subtitle}
                />
                <div className="container">
                    <Action 
                        hasOptions = {this.state.options.length > 0}
                        handlePick = {this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                            options = {this.state.options} 
                        // If we want the children components to affect the State - we can pass a function down as a prop. 
                            handleDeleteOptions = {this.handleDeleteOptions}
                            handleDeleteOption = {this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption = {this.handleAddOption}
                        />
                    </div>
                    
                </div>
                <OptionModal
                    selectedOption = {this.state.selectedOption}
                    handleClearSelectedOption = {this.handleClearSelectedOption}    
                />
            </div>
        );
    }
};

export default IndecisionApp;
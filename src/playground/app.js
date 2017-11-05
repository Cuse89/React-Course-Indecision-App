// Important that class name for component is Uppercase- its how React differentiates from a component and HTML element

class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        // state (an object) is used when we know its values are going to get changed and can be changed by a components children
        this.state = {
            options: []
        };
    }
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
    }
    componentDidUpdate(prevProps, prevState) {
        // so were not including empty options (clicking add option when theres nothing)
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
// If we want the children components to affect the State - we can pass a function down as a prop.

    handleDeleteOptions() {
        // when using the es6 arrow function instead of using 'return', the object needs to be wrapped in () so it knows its not a jsx expression
        this.setState(() => ({options: [] }))
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            // only delete the single argument option by filtering out everything except itself
            options: prevState.options.filter((optionfromArr) => optionToRemove !== optionfromArr)
        }));
    }

    handlePick() {
       const randomNum = Math.floor(Math.random() * this.state.options.length)
       alert(this.state.options[randomNum])
    }

    handleAddOption(option) {

        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }
        this.setState((prevState) => ({
            options: [...prevState.options, option] 
        }));
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';

        return (
            //Here is the JSX - what will get shown on the UI (basically a list of components)
            <div>
            {/*subtitle etc below is a PROP, passing down information to the components */}
                <Header 
                    subtitle = {subtitle}/>
                <Action 
                    hasOptions = {this.state.options.length > 0}
                    handlePick = {this.handlePick}
                    />
                <Options 
                    options = {this.state.options}
                    handleDeleteOptions = {this.handleDeleteOptions}
                    handleDeleteOption = {this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption = {this.handleAddOption}/>
            </div>
        );
    }
}

// Stateless Functional Components are faster than classes - used for simple components
// without state changes - We dont use 'this' keyword because we pass props in as an
// argument. Doesnt need the render function.

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};

Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) => {
    return (
        <div>
            <button onClick={props.handlePick}
            disabled = {!props.hasOptions}
            >What should I do?</button>
        </div>
    );
}
    

// ES6 classes do not bind 'this' by default. What that means is I can override the 'this' binding for any class if I wanted to.
// Instead of using bind in the handleRemoveAll event handler itself (which would be inefficient as it would bind EACHTIME it renders),
// we can use it once in the constructor function - only binding it once when it gets initialised (efficient)


const Options = (props) => {
    return (
        <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {props.options.length === 0 && <p>Please add an option to get started</p> }
            {
                /*OptionText below is a Prop (similar to subtitle etc above), allowing Option component to access it*/
                props.options.map((optionFromArr) => (
                    <Option 
                        key={optionFromArr} 
                        OptionText={optionFromArr}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))            
            }
        </div>
    );
}


const Option = (props) => {
    return (
        <div>
            {props.OptionText}
            <button
             onClick={(e) => {
                props.handleDeleteOption(props.OptionText);
             }}
             >
             remove
             </button>
        </div>
    )
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
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
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit = {this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
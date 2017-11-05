console.log('App.js is running!')

// JSX - Javascript XML

const app = {
    title: 'Indecision App',
    subtitle: 'bla bla bla',
    options: []
};

// Adjacent JSX elements must be wrapped in an enclosing tag - we can only
// have a single root element e.g the h1, p, ol etc are all wrapped in a div

//Javascript expressions go inside { }

const onFormSubmit = (e) => {
    e.preventDefault();

    const option = e.target.elements.option.value // the string typed into input box

    if (option) {
        app.options.push(option);
        e.target.elements.option.value = '';
    }
    renderApp();
};

const onRemoveAll = () => {
    app.options = [];
    renderApp();
};

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);
};

const renderApp = () => {
    const template = (
    <div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        <p>{app.options.length > 0 ? 'Here are your options' : 'No Options'}</p>
        <button disabled = {app.options.length === 0} onClick = {onMakeDecision}>What Should I Do?</button>
        <button onClick = {onRemoveAll}>Remove All</button>
        <ol>
            {app.options.map((option) => <li key={option}>{option}</li>)}
        </ol>
        <form onSubmit = {onFormSubmit}>
            <input type="text" name="option"/>
            <button>Add Option</button>
        </form>
    </div>
);
ReactDOM.render(template, appRoot);
};


const appRoot = document.getElementById('app');
renderApp();

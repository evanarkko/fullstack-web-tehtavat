import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            blogs: [],
            message: null,
            title: "",
            author: "",
            url: ""
        }
    }

    componentDidMount() {
        console.log(window.localStorage.getItem('loggedUser'))
        blogService.getAll().then(blogs =>
            this.setState({blogs})
        )
        try {
            this.setState({user: JSON.parse(window.localStorage.getItem('loggedUser'))})
        } catch (e) {
            console.log(e)
        }

    }

    login = () => async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            this.setState({username: '', password: '', user})
            this.setState({ message: "logged in!" })
            setTimeout(() => {
                this.setState({ message: null })
            }, 5000)
        } catch (error) {
            console.log(error)
            console.log("eroor wtf")
        }

    }

    handlePasswordChange = () => (event) => {
        this.setState({password: event.target.value})
    }

    handleUsernameChange = () => (event) => {
        this.setState({username: event.target.value})
    }

    logout = (event) => {
        this.setState({user: []})
        this.setState({username: '', password: '', user: []})
        window.localStorage.setItem('loggedUser', JSON.stringify([]))
    }

    handleFieldChange = () => (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    addNewBlog = () => (event) => {
        event.preventDefault()
        const blog = {
            title: this.state.title,
            author: this.state.author,
            url: this.state.url
        }
        blogService.createNew(blog, this.state.user.token).then(res => {
            console.log(res)
        })
    }


    render() {
        let addBlogForm = ""
        let logoutButton = ""
        let notification = <div className="Notification">{this.state.message}</div>
        let login = <Login loginFunction={this.login()}
                           nameFunction={this.handleUsernameChange()}
                           pswFunction={this.handlePasswordChange()}
        />
        if (this.state.user !== null && this.state.user.username) {//if user logged in
            login =
                <div>
                    <h1>Logged in as {this.state.user.username}</h1>
                </div>
            logoutButton = <button onClick={this.logout}>logout</button>
            addBlogForm = <AddBlog addBlog={this.addNewBlog()}
                                   fieldChange={this.handleFieldChange()}/>
        }

        return (
            <div>
                {notification}
                <h2>blogs</h2>
                {login} <p>{logoutButton}</p>
                <div>{addBlogForm}</div>
                {this.state.blogs.map(blog =>
                    <Blog key={blog._id} blog={blog}/>
                )}
            </div>
        );
    }
}

export default App;

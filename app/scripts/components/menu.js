/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import Result from './result.js';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            query: '',
            data: [],
            isLoaded: false,
            error: null,
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        if (this.state.showingSearch) {
            this.inputTitle.value = '';
            this.state.data = [];
        }
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        // Start Here
        this.setState({
            query: event.target.value,
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.search();
            } else {
                this.state.data = [];
            }
        })
    }

    search() {
        this.setState({ isLoaded: false });
        fetch(`http://localhost:3035/search?query=${this.state.query}`, { method: 'GET' })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input id="search"
                        placeholder="Seatch"
                        type="text"
                        onChange={(e) => this.onSearch(e)}
                        ref={el => this.inputTitle = el} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                </div>
                <div className={(this.state.data.length ? "show " : "hide") + "search-result"}>
                    {this.state.data.map(function (res) {
                        return <Result key={res._id} data={res} />;
                    })}
                </div>
            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;
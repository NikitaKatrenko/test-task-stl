import React from 'react';

class Result extends React.Component {

    /**
     * Result constructor for the Result Class
     * @memberof Result
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <article className="search-result">
                <div className="item-image"><img src={this.props.data.picture} /></div>
                <div className="description">
                    <h2>{this.props.data.name}</h2>
                    <div className="group">
                        <span className="price">price: {this.props.data.price}$</span>
                        <div className="tags">
                            {this.props.data.tags.map(function (tag) {
                                return <p className="tag" key={tag}>{tag}</p>;
                            })}
                        </div>
                    </div>
                    <p>{this.props.data.about}</p>
                </div>
            </article>
        );
    }

}

module.exports = Result;
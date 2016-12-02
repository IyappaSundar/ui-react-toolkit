/**
 * Created by Iyappa Sundar Natarajan on 8/4/2016.
 */

require('./PaginationBar.less');

var React = require('react');
var classnames = require('classnames');

let getTotalPages = (totalCount, pageCount) => {
    return Math.ceil(totalCount / pageCount);
};

var PaginationBar = React.createClass({

    propTypes: {
        totalCount: React.PropTypes.number.isRequired,
        pageCount: React.PropTypes.number.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps(){
        return {
            onChange: function () {
            }
        };
    },

    getInitialState() {
        return {
            __currentPageNumber: 1,
            pageNumber: 1,
            totalPages: 1
        };
    },

    componentWillMount() {
        this.setState({
            totalPages: getTotalPages(this.props.totalCount, this.props.pageCount)
        });
    },

    componentWillReceiveProps(nextProps, nextState) {
        this.setState({
            totalPages: getTotalPages(nextProps.totalCount, nextProps.pageCount)
        });
    },

    isFirstPage() {
        return (this.state.__currentPageNumber == 1);
    },

    isLastPage() {
        return (this.state.__currentPageNumber == this.state.totalPages);
    },

    __changePageNumber(newPageNumber) {
        this.setState({
            __currentPageNumber: newPageNumber,
            pageNumber: newPageNumber
        });
    },

    goToFirstPage() {
        if (this.isFirstPage()) return;
        var newPageNumber = 1;
        this.__changePageNumber(newPageNumber);
        this.onPageChange(newPageNumber);
    },

    goToLastPage() {
        if (this.isLastPage()) return;
        var newPageNumber = this.state.totalPages;
        this.__changePageNumber(newPageNumber);
        this.onPageChange(newPageNumber);
    },

    goToNextPage() {
        if (this.isLastPage()) return;
        var newPageNumber = this.state.pageNumber + 1;
        this.__changePageNumber(newPageNumber);
        this.onPageChange(newPageNumber);
    },

    goToPreviousPage() {
        if (this.isFirstPage()) return;
        var newPageNumber = this.state.pageNumber - 1;
        this.__changePageNumber(newPageNumber);
        this.onPageChange(newPageNumber);
    },

    onInputChange(e) {
        let val = e.target.value;
        let parsedVal = parseInt(e.target.value);
        if (val == "") {
            this.setState({
                pageNumber: val
            });
        }
        else if (isNaN(parsedVal)) {
            return;
        }
        else {
            this.setState({
                pageNumber: parsedVal
            });
        }

    },

    onInputKeyPress(e) {
        if (e.key === 'Enter') {
            let val = parseInt(e.target.value);
            if (val < 1
                || val > this.state.totalPages
                || val == this.state.__currentPageNumber) {
                this.setState({
                    pageNumber: this.state.__currentPageNumber
                });
            }
            else {
                this.__changePageNumber(val);
                this.onPageChange(val);
            }
        }
    },

    onPageChange(newPageNumber) {
        this.props.onChange.call(this, newPageNumber, this.state.totalPages, this.props.totalCount, this.props.pageCount);
    },

    render() {

        var c1 = classnames("glyphicon glyphicon-fast-backward", {
            disabled: this.isFirstPage()
        });
        var c2 = classnames("glyphicon glyphicon-backward", {
            disabled: this.isFirstPage()
        });
        var c3 = classnames("glyphicon glyphicon-forward", {
            disabled: this.isLastPage()
        });
        var c4 = classnames("glyphicon glyphicon-fast-forward", {
            disabled: this.isLastPage()
        });

        return (<div className="pagination-bar dsfaasdf">

            <table>
                <tr>

                    <td className="navigation-bar">
                        <ul>
                            <li>
                                <span className={c1} onClick={this.goToFirstPage}></span>
                            </li>
                            <li>
                                <span className={c2} onClick={this.goToPreviousPage}></span>
                            </li>
                            <li>
                                <span>Page</span>
                            </li>
                            <li>
                                <span>
                                    <input type="text" value={this.state.pageNumber} onChange={this.onInputChange} onKeyPress={this.onInputKeyPress}/>
                                </span>
                            </li>
                            <li>
                                <span>of</span>
                            </li>
                            <li>
                                <span>{this.state.totalPages}</span>
                            </li>
                            <li>
                                <span className={c3} onClick={this.goToNextPage}></span>
                            </li>
                            <li>
                                <span className={c4} onClick={this.goToLastPage}></span>
                            </li>
                        </ul>
                    </td>

                    <td className="display-bar">
                        <div className="holder">
                            <span>
                                <span>View </span>
                                <span>{((this.state.__currentPageNumber - 1) * this.props.pageCount) + 1}</span>
                                <span>-</span>
                                <span>{this.state.__currentPageNumber * this.props.pageCount}</span>
                                <span> of </span>
                                <span>{this.props.totalCount}</span>
                            </span>
                        </div>
                    </td>

                </tr>
            </table>

        </div>)
    }

});

module.exports = PaginationBar;
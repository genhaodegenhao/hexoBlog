import React, {Component} from 'react';
import $ from 'jquery';

var Success = React.createClass({
    getInitialState: function() {
        return {
            message:"成功"
        };
    },
    render: function() {
        return (
            <div className="resource-inf-wrapper">
                <h3>{this.state.message}</h3>
            </div>
        );
    }
});
export default Success;
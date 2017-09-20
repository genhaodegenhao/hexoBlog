/**
 * description:新增资源信息组件;
 */
import React, {Component} from 'react';
import $ from 'jquery';
import '../../assets/Style/home/add-resource-inf.css';
import utils from '../../assets/js/common/common.js';

var AddResourceInf = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken: window.sessionStorage.getItem('loginToken'),
            resourceName:'',
            resourceUrl:'',
            mockdata:false //是否使用mock数据
        };
    },
    /**
     * [resourceNameChange 资源名称change事件]
     */
    resourceNameChange:function(event) {
        this.setState({resourceName: event.target.value});
    },
    /**
     * [resourceNameChange 资源URLchange事件]
     */
    resourceUrlChange:function(event) {
        this.setState({resourceUrl: event.target.value});
    },
    /**
     * [submitEvent 提交事件]
     */
    submitEvent:function(event) {
        var parmes = {
            'name': this.state.resourceName,
            'resourceUrl': this.state.resourceUrl
        };
        if(parmes.name === '') {
            alert('请输入资源名称');
            return;
        };
        if(parmes.resourceUrl === '') {
            alert('请输入资源url地址');
            return;
        };
        if(!this.state.mockdata){
            $.ajax({
                type: 'get',
                url: utils.baseUrl + '/intra/resourceManage/addResourceInfo',
                data: parmes,
                dataType: 'json',
                headers: {
                    'Authorization': this.state.loginToken
                },
                success: function(data) {
                    alert("提交" + data.errMsg);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.source, status, err.toString());
                }.bind(this)
            });
        } else {
            var successData = require('../../json/success.json');
            if(successData.flag) { 
                alert('提交成功！');
                // 提交成功值清空
                this.setState({resourceName:''});
                this.setState({resourceUrl:''});
            }
        }
    },
    render: function() {
        return ( 
            <div className="resource-inf-wrapper">
                <h3>新增资源信息</h3>
                <div className="resource-inf-form">
                    <div className="resource-name">
                        <label>
                            <span style={{color: 'red'}}>*</span>资源名称:
                        </label>
                        <input type="text" value={this.state.resourceName} onChange={this.resourceNameChange} />
                    </div>
                    <div className="resource-url clearfix">
                        <label className="fl">
                            <span style={{color: 'red'}}>*</span>资源url地址(以|分割):
                        </label>
                        <textarea className="fl" value={this.state.resourceUrl} onChange={this.resourceUrlChange}></textarea>
                    </div>
                </div>
                <div className="btn-box">
                    <a href="javascript:void(null)" onClick={this.submitEvent}>提交</a>
                </div>
            </div>
        );
    }
});

export default AddResourceInf;
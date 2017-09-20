/**
 * description:修改资源信息组件;
 */
import React from 'react';
import $ from 'jquery';
import utils from '../../assets/js/common/common.js';
import '../../assets/Style/home/add-resource-inf.css';

var ModifyResource = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken: window.sessionStorage.getItem('loginToken'),
            name: '',
            resourceUrl:'',
            resourceId: this.props.location.state.data,
            createDate: '',
            updateDate: ''
        };
    },
    // 有实际请求使用ajax请求数据
    componentWillMount: function() {
        // 把点击后对应的资源ID的名称和url显示出来
        var parmes = {
            "resourceId": this.state.resourceId
        };
        $.ajax({
            type: "GET",
            url: utils.baseUrl + '/intra/resourceManage/toUpdateResourceInfo',
            data: parmes,
            dataType: 'json',
            headers: {
                'Authorization': this.state.loginToken
            },
            success: function(result) {
                if (result.errCode === "00") {
                    this.timer = setTimeout(() => {
                        this.setState({
                            "name": result.resourceInfo.name,
                            "resourceUrl": result.resourceInfo.resourceUrl,
                            "resourceId": result.resourceInfo.resourceId,
                            "createDate": result.resourceInfo.createDate,
                            "updateDate": result.resourceInfo.updateDate
                        });
                    },10);
                }else {
                    var msg = "处理结果："+result.errMsg;
                    var returnVal = window.confirm(msg);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.source, status, err.toString());
            }.bind(this)
        });
    },
    componentWillUnmount: function(){
        clearTimeout(this.timer);
    },
    /**
     * [resourceNameChange 资源名称change事件]
     */
    resourceNameChange:function(event) {
        this.setState({name: event.target.value});
    },
    /**
     * [resourceUrlChange 资源url change事件]
     */
    resourceUrlChange:function(event) {
        this.setState({resourceUrl: event.target.value});
    },
    createDateChange:function(event) {
        this.setState({createDate: event.target.value});
    },
    updateDateChange:function(event) {
        this.setState({updateDate: event.target.value});
    },
    /**
     * [submitEvent 修改提交]
     */
    submitEvent:function(event) {
        var parmes = {
            "name": this.state.name,
            "resourceUrl": this.state.resourceUrl,
            "resourceId": this.state.resourceId,
            "createDate": this.state.createDate,
            "updateDate": this.state.updateDate
        };
        if(parmes.name === '') {
            alert('资源名称不能为空');
            return;
        }else if(parmes.resourceUrl === '') {
            alert('资源url地址不能为空');
            return;
        }else{
            $.ajax({
                type: "GET",
                url: utils.baseUrl + '/intra/resourceManage/updateResourceInfo',
                data: parmes,
                dataType: 'json',
                headers: {
                    'Authorization': this.state.loginToken
                },
                success: function(result) {
                    if (result.errCode == "00") {
                        alert("修改"+result.errMsg);
                    }else {
                        var msg = "处理结果："+result.errMsg;
                        var returnVal = window.confirm(msg);
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.source, status, err.toString());
                }.bind(this)
            });
        }
    },
    render: function() {
        return (
            <div className="resource-inf-wrapper">
                <h3>修改资源信息</h3>
                <div className="resource-inf-form">
                    <div className="resource-name">
                        <label>
                            <span style={{color: 'red'}}>*</span>资源名称:
                        </label>
                        <input type="text" value={this.state.name} onChange={this.resourceNameChange} />
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

export default ModifyResource;
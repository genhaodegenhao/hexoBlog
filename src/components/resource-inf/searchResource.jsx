/**
 * description:查询资源信息组件;
 */
import React, {Component} from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import PageComponent from '../page/pageComponent.jsx';
import '../../assets/Style/home/add-resource-inf.css';
import utils from '../../assets/js/common/common.js';

var SearchResource = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken:window.sessionStorage.getItem("loginToken"),
            resourceName: '',
            totalNum:'',//总记录数
            pageNo:1,  //当前页
            pageSize:10, //每页显示的条数5条
            totalPage:'',//总页数
            girdSource:[], //json文件数据，后期从接口获取
        };
    },
    // 有实际请求使用ajax请求数据
    componentWillMount: function() {
        this.searchEvent();//初始化请求数据
    },
    componentWillUnmount: function(){
        clearTimeout(this.timer);
    },
    resourceNameChange:function(event) {
        this.setState({resourceName: event.target.value});
    },
    /**
     * [searchEvent 查询事件]
     */
    searchEvent:function(event) {
        var parmes = {
            "name":this.state.resourceName,
            "pageNo": this.state.pageNo,
            "pageSize": this.state.pageSize
        };
        $.ajax({
            type: "GET",
            url: utils.baseUrl + '/intra/resourceManage/queryResourceInfo',
            data: parmes,
            dataType: 'json',
            headers: {
                'Authorization': this.state.loginToken
            },
            success: function(result) {
                //数据请求成功后将值放到state
                if (result.errCode == "00") {
                    this.timer = setTimeout(() => {
                        this.setState({girdSource: result.resourceInfoList.elements});
                        this.setState({totalNum: result.pageBean.totalNum});
                        this.setState({totalPage: result.pageBean.totalPages});
                    },10);
                } else {
                    var msg = "处理结果："+result.errMsg;
                    var returnVal = window.confirm(msg);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                // console.error(this.props.source, status, err.toString());
            }.bind(this)
        });
    },
    // 删除资源
    deleteEvent: function(e,resource){
        var resId = e.target.getAttribute('data-id');
        var parmes = {
            "resourceId": resId
        };
        $.ajax({
            type: "GET",
            url: utils.baseUrl + '/intra/resourceManage/deleteResourceInfo',
            data: parmes,
            dataType: 'json',
            headers: {
                'Authorization': this.state.loginToken
            },
            success: function(result) {
                if (result.errCode == "00") {
                    alert('删除成功');
                    this.searchEvent();
                } else {
                    var msg = "处理结果："+result.errMsg;
                    var returnVal = window.confirm(msg);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                // console.error(this.props.source, status, err.toString());
            }.bind(this)
        });
    },
    //点击翻页
    pageClick:function(pageNum) {
        var _this = this;
        if(pageNum != this.state.pageNo){
            _this.setState({pageNo:pageNum});
        };
        setTimeout(function(){
            _this.searchEvent();
        },300);

    },
    //上一步
    goPrevClick:function(){
        var _this = this;
        let cur = this.state.pageNo;
        if(cur > 1){
            _this.pageClick( cur - 1);
        }
    },
    //下一步
    goNext:function(){
        var _this = this;
        let cur = _this.state.pageNo;
        //alert(cur+"==="+_this.state.totalPage)
        if(cur < _this.state.totalPage){
            _this.pageClick(cur + 1);
        }
    },
    render: function() {
        return (
            <div className="resource-inf-wrapper">
                <h3>查询资源信息</h3>
                <div className="user-message clearfix">
                    <div className="user-code fl">
                        <label>资源名称:</label>
                        <input type="text" value={this.state.resourceName} onChange={this.resourceNameChange} />
                    </div>
                    <div className="search-box fl">
                        <a href="javascript:void(null)" onClick={this.searchEvent}>查询</a>
                    </div>
                </div>
                <div className="user-table">
                    <table cellSpacing="0">
                        <thead>
                        <tr>
                            <th>资源id</th>
                            <th>资源名称</th>
                            <th>资源url地址</th>
                            <th>更新时间</th>
                            <th width="100">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.girdSource.map((item, rowIndex) => {
                                return (
                                    <tr key={rowIndex}>
                                        <td className="ell" title={item.resourceId}>{item.resourceId}</td>
                                        <td className="ell" title={item.name}>{item.name}</td>
                                        <td className="ell" title={item.resourceUrl}>{item.resourceUrl}</td>
                                        <td className="ell" title={utils.formatCSTDate(item.updateDate,"yyyy-MM-dd hh:mm:ss")}>{utils.formatCSTDate(item.updateDate,"yyyy-MM-dd hh:mm:ss")}</td>
                                        <td className="operating">
                                            <Link to={{pathname:"/html/modifyResource", state:{data:item.resourceId}  }}><button className="btn-modify" data-id={item.resourceId}>修改</button></Link>
                                            <button className="btn-delete" data-id={item.resourceId} onClick={this.deleteEvent}>删除</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                    <PageComponent total={this.state.totalNum}
                                   current={this.state.pageNo}
                                   totalPage={this.state.totalPage}
                                   pageClick={this.pageClick}
                                   goPrev={this.goPrevClick}
                                   goNext={this.goNext}/>
                </div>
            </div>
        );
    }
});
export default SearchResource;
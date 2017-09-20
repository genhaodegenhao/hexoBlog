/**
 * author:shimin.chen.wb;
 * time:2017/7/31;
 * description:查询字典信息组件组件;
 */
import React, {Component} from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import PageComponent from '../page/pageComponent.jsx';
import '../../assets/Style/home/add-resource-inf.css';
import utils from '../../assets/js/common/common.js';

var SearchDitMsg = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            classCode:'',
            code:'',
            girdSource:[], //json文件数据，后期从接口获取
            totalNum:'',//总记录数
            pageNo:1,  //当前页
            pageSize:10, //每页显示的条数5条
            totalPage:'',//总页数
            mockdata:false //是否从mock取数据
        };
    },
    // 有实际请求使用ajax请求数据
    componentDidMount: function() {
        this.searchEvent();//初始化请求数据
    },
    /**
     * [resourceNameChange 用户编码change事件]
     */
    classCodeChange:function(event) {
        this.setState({classCode: event.target.value});
    },
    /**
     * [resourceNameChange 用户名称change事件]
     */
    codeChange:function(event) {
        this.setState({code: event.target.value});
    },
    /**
     * [searchEvent 查询事件]
     */
    searchEvent:function(event) {
        var loginToken =  window.sessionStorage.getItem('loginToken'),
            parmes = {
            classCode:this.state.classCode,
            code:this.state.code,
            pageSize:this.state.pageSize,
            pageNo:this.state.pageNo
        };
        if(!this.state.mockdata) {
            $.ajax({
                type:'get',
                url: utils.baseUrl + '/intra/dict/queryDictCodeMap',
                data:parmes,
                headers: {
                    'Authorization': loginToken
                },
                dataType: 'json',
                success: function(data) {
                    //数据请求成功后将值放到state
                    if (data.errCode == '00') {
                        this.setState({girdSource:data.dictCodeMapList.elements});
                        //pageInfo = result.pageBean;
                        // this.setState({totalData:data.userInfoList})
                        this.setState({totalNum:data.pageBean.totalNum});
                        this.setState({totalPage:data.pageBean.totalPages});
                        // this.pageClick(1);
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    // console.error(this.props.source, status, err.toString());
                }.bind(this)
            });
        }else {
            var data = require('../../json/search-user.json');
            if(data.flag) {
                if(data.result.length) {
                    console.log('查询成功！');
                    this.setState({girdSource:data.result});
                }
            }
        }
    },
    /**
     * [deleteEvent 删除事件]
     */
    deleteEvent:function(event) {
        var loginToken =  window.sessionStorage.getItem('loginToken'),
            classCode = event.target.getAttribute('data-class-code'),
            code = event.target.getAttribute('data-code'),
            parmes = {
                classCode:classCode,
                code:code
            };
        if(!this.state.mockdata) {
            $.ajax({
                url: utils.baseUrl + '/intra/dict/deleteDictCodeMap',
                type:'get',
                data:parmes,
                headers: {
                    'Authorization': loginToken
                },
                dataType: 'json',
                success: function(data) {
                    //删除成功，重新刷新列表
                    if(data.errCode === '00') {
                        alert('删除成功！');
                        this.searchEvent();
                    }else {
                        alert(data.errMsg);
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    // console.error(this.props.source, status, err.toString());
                }.bind(this)
            });
        } else {
            var successData = require('../../json/success.json');
            if(successData.flag) { 
                alert('删除成功！');
            }
        }
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
                <h3>查询字典信息</h3>
                <div className="user-message clearfix">
                    <div className="user-code fl">
                        <label>字典分类代码:</label>
                        <input type="text" value={this.state.classCode} onChange={this.classCodeChange} />
                    </div>
                    <div className="user-name fl">
                        <label>代码code:</label>
                        <input type="text" value={this.state.code} onChange={this.codeChange} />
                    </div>
                    <div className="search-box fl">
                        <a href="javascript:void(null)" onClick={this.searchEvent}>查询</a>
                    </div>
                </div>
                <div className="user-table">
                    <table cellSpacing="0">
                        <thead>
                            <tr>
                                <th>字典分类代码</th>
                                <th>字典分类代码排序号</th>
                                <th>代码code</th>
                                <th>字典分类名称</th>
                                <th>助记代码quickCode</th>
                                <th>层次类型字典下的scopeId</th>
                                <th>更新时间</th>
                                <th width="100">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.girdSource.map((item, rowIndex) => {
                                    item.uptTime = utils.formatCSTDate(item.uptTime,'yyyy-MM-dd hh:mm:ss');
                                    return (
                                        <tr key={rowIndex}>
                                            <td className="ell" title={item.classCode}>{item.classCode}</td>
                                            <td className="ell" title={item.ordNum}>{item.ordNum}</td>
                                            <td className="ell" title={item.code}>{item.code}</td>
                                            <td className="ell" title={item.name}>{item.name}</td>
                                            <td className="ell" title={item.quickCode}>{item.quickCode}</td>
                                            <td className="ell" title={item.scopeId}>{item.scopeId}</td>
                                            <td className="ell" title={item.uptTime}>{item.uptTime}</td>
                                            <td className="operating">
                                                <Link to={{pathname:"/html/modifyDictMsg", state:{classCode:item.classCode,code:item.code}  }}><button className="btn-modify">修改</button></Link>
                                                <button className="btn-delete" data-class-code={item.classCode} data-code={item.code} onClick={this.deleteEvent}>删除</button>
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


export default SearchDitMsg;
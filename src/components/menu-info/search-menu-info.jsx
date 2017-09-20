/**
 * author:zishuai.xu;
 * time:2017/8/1;
 * description:新查询菜单信息组件;
 */
import React, {Component} from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import PageComponent from '../page/pageComponent.jsx';
import '../../assets/Style/home/menu-info.css';
import utils from '../../assets/js/common/common.js';

var SearchMenuInfo = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            name: '',
            menuItem: '',
            parentId: '',
            girdSource: [], //json文件数据，后期从接口获取
            totalNum: '',//总记录数
            pageNo: 1,  //当前页
            pageSize: 10, //每页显示的条数10条
            totalPage: '',//总页数
            mockdata: false, //是否从mock取数据,
            tag: ''
        };
    },
    
    componentDidMount: function() {
        this.searchEvent();//初始化请求数据
    },

    componentWillUpdate: function() {
        let tag = window.location.hash.match(/\?_k=(\w*)/)[1];
        if(this.state.tag != tag) {

            let obj = {
                state: {
                    tag: tag,
                    name: '',
                    menuItem: '',
                    parentId: '',
                    girdSource: [], 
                    totalNum: '',
                    pageNo: 1,  
                    pageSize: 10, 
                    totalPage: '',
                }
            }
            this.setState({
                tag: obj.state.tag
            })
            this.searchEventO(obj);
        }


    },
    /**
     * [handleNameChange 菜单名change事件]
     */
    handleNameChange:function(event) {
        this.setState({name: event.target.value});
    },
    /**
     * [handleMenuItemChange 菜单级别change事件]
     */
    handleMenuItemChange:function(event) {
        this.setState({menuItem: event.target.value});
    },

    /**
     * [handleParentIdChange 父级菜单id change事件]
     */
    handleParentIdChange: function (event) {
        this.setState({parentId: event.target.value})
    },
    /**
     * [searchEvent 查询事件]
     */
    searchEvent:function(event) {
        console.log(this)
        var loginToken =  window.sessionStorage.getItem('loginToken'),
            parmes = {
            name:this.state.name,
            menuItem:this.state.menuItem,
            parentId: this.state.parentId,
            pageSize:this.state.pageSize,
            pageNo:this.state.pageNo
        };
        if(!this.state.mockdata) {
            $.ajax({
                url: utils.baseUrl + '/intra/menu/queryMenuInfo',
                data:parmes,
                headers: {
                    'Authorization': loginToken
                },
                dataType: 'json',
                success: function(data) {
                    //数据请求成功后将值放到state
                    if (data.errCode == '00') {
                        console.log(data);
                        this.setState({
                            girdSource: data.menuInfoList.elements,
                            totalNum: data.pageBean.totalNum,
                            totalPage: data.pageBean.totalPages,
                            pageNo: data.pageBean.pageNo,

                        })
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    // console.error(this.props.source, status, err.toString());
                }.bind(this)
            });
        }else {
            // var data = require('../json/search-user.json');
            // if(data.flag) {
            //     if(data.result.length) {
            //         console.log('查询成功！');
            //         this.setState({girdSource:data.result});
            //     }
            // }
        }
    },
    searchEventO:function(obj) {
        var loginToken =  window.sessionStorage.getItem('loginToken'),
            parmes = {
            name:obj.state.name,
            menuItem:obj.state.menuItem,
            parentId: obj.state.parentId,
            pageSize:obj.state.pageSize,
            pageNo:obj.state.pageNo
        };
        if(!this.state.mockdata) {
            $.ajax({
                url: utils.baseUrl + '/intra/menu/queryMenuInfo',
                data:parmes,
                headers: {
                    'Authorization': loginToken
                },
                dataType: 'json',
                success: function(data) {
                    //数据请求成功后将值放到state
                    if (data.errCode == '00') {
                        console.log(data);
                        this.setState({
                            girdSource: data.menuInfoList.elements,
                            totalNum: data.pageBean.totalNum,
                            totalPage: data.pageBean.totalPages,
                            pageNo: data.pageBean.pageNo,
                            name: '',
                            menuItem: '',
                            parentId: '',
                            pageSize: 10, 

                        })
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    // console.error(this.props.source, status, err.toString());
                }.bind(this)
            });
        }else {
            // var data = require('../json/search-user.json');
            // if(data.flag) {
            //     if(data.result.length) {
            //         console.log('查询成功！');
            //         this.setState({girdSource:data.result});
            //     }
            // }
        }
    },
    /**
     * [deleteEvent 删除事件]
     */
    deleteEvent:function(event) {
        var loginToken =  window.sessionStorage.getItem('loginToken'),
            id = event.target.getAttribute('data-id'),
            parmes = {
                menuId:id
            };
        if(!this.state.mockdata) {
            $.ajax({
                url: utils.baseUrl + '/intra/menu/deleteMenuInfo',
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
            //var successData = require('../json/success.json');
            // if(successData.flag) { 
            //     alert('删除成功！');
            // }
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
                <h3>查询菜单信息</h3>
                <div className="user-message clearfix">
                    <div className="menu-name fl">
                        <label>菜单名称:</label>
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    </div>
                    <div className="menu-item fl">
                        <label>菜单级别:</label>
                        <input type="text" placeholder="1或2" value={this.state.menuItem} onChange={this.handleMenuItemChange} />
                    </div>
                    <div className="menu-parentid fl">
                        <label>父级菜单id:</label>
                        <input type="text" value={this.state.parentId} onChange={this.handleParentIdChange} />
                    </div>
                    <div className="search-box fl">
                        <a href="javascript:void(null)" onClick={this.searchEvent}>查询</a>
                    </div>
                </div>
                <div className="user-table">
                    <table cellSpacing="0">
                        <thead>
                            <tr>
                                <th>菜单id</th>
                                <th>菜单名称</th>
                                <th>菜单url地址</th>
                                <th>父级菜单id</th>
                                <th>菜单级别</th>
                                <th>菜单序号</th>
                                <th>更新时间</th>
                                <th width="100">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.girdSource.map((item, rowIndex) => {
                                    item.updateDate = utils.formatCSTDate(item.updateDate,'yyyy-MM-dd hh:mm:ss');
                                    return (
                                        <tr key={rowIndex}>
                                            <td className="ell" title={item.menuId}>{item.menuId}</td>
                                            <td className="ell" title={item.name}>{item.name}</td>
                                            <td className="ell" title={item.menuUrl}>{item.menuUrl}</td>
                                            <td className="ell" title={item.parentId}>{item.parentId}</td>
                                            <td className="ell" title={item.menuItem}>{item.menuItem}</td>
                                            <td className="ell" title={item.menuOrder}>{item.menuOrder}</td>
                                            <td className="ell" title={item.updateDate}>{item.updateDate}</td>
                                            <td className="operating">
                                                <Link to={{pathname:"/html/updateMenuInfo", state:{...item,isUpdate: true}  }}><button className="btn-modify" data-id={item.menuId}>修改</button></Link>
                                                <button className="btn-delete" data-id={item.menuId} onClick={this.deleteEvent}>删除</button>
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


export default SearchMenuInfo;
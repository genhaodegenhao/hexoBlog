/**
 * author:shimin.chen.wb;
 * time:2017/7/26;
 * description:侧边栏组件;
 */
import React from 'react';
import '../../assets/Style/Management/management.css';
import $ from 'jquery';
import ItemNav from './item-nav.jsx';
import utils from '../../assets/js/common/common.js';

var Management = React.createClass({
     /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken: window.sessionStorage.getItem('loginToken'),
            listSource:[]
        };
    },
    // 有实际请求使用ajax请求数据
    componentDidMount: function() {
        $.ajax({
            type:'post',
            url: utils.baseUrl + '/intra/login/menuInfo',
            headers: {
                   'Authorization': this.state.loginToken
            },
            data:JSON.stringify({}),
            dataType: 'json',
            success: function(data) {
                if(data.errCode === '00') {
                    var result = this.handelData(data.menuInfoList)
                    this.setState({listSource:result});
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.source, status, err.toString());
            }.bind(this)
        });
    },
    /**[handelData 处理数据]
     * @param  {[array]} data [数据]
     * @return {[array]}      [处理结果]
     */
    handelData:function(data) {
        var result = [];
        for(var i=0;i<data.length;i++) {
            if(data[i].parentId === null) {
                var obj = data[i];
                obj.content = [];
                result.push(obj);
            }
        }

        for(var i=0;i<result.length;i++) {
            for(var j=0;j<data.length;j++) {
                if(result[i].menuId === data[j].parentId) {
                    result[i].content.push(data[j]);
                }
            }
        }

        return result;
    },
    render: function() {
        return(
            <div className="listInfo">
                {
                    this.state.listSource.map((item, rowIndex) => {
                        if(rowIndex === 0) {
                            return (
                                <ItemNav key={rowIndex} data={item} isSelected = "false" isOpen = "false"/>
                            )
                        }else {
                            return (
                                <ItemNav key={rowIndex} data={item} />
                            )
                        }
                    })

                }       
            </div>
        );
    }
});
export default Management;
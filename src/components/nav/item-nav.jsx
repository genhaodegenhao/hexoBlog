/**
 * author:shimin.chen.wb;
 * time:2017/7/26;
 * description:侧边栏小模块组件;
 */
import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

const ItemNav = React.createClass({
    /**
     * [navClick 侧边栏点击事件]
     * @param  {[type]} e [description]
     */
    navClick:function(e) {
        var $this = $(e.target);
        $this.closest('.nav-tab').find('.content').slideToggle();
        $this.closest('.nav-tab').siblings('.nav-tab').find('.content').slideUp();
    },
    navItemClick:function(e) {
        var $this = $(e.target);
        $this.addClass('selected').parent().siblings().find('div').removeClass('selected');
    },
    render() {
        if(this.props.isOpen === 'true') {
            var obj = {
                display:'block'
            }
        }else {
            var obj = {
                display:'none'
            }
        }
        return (
            <div className="nav-tab">
                <div className="title" onClick={this.navClick}>{this.props.data.name}</div>
                <div className="content" style={obj}>
                    {

                        this.props.data.content.map((item, rowIndex) => {
                            if(this.props.isSelected === 'true' && rowIndex === 0) {
                                return (
                                <Link to={{pathname:item.menuUrl}} key={rowIndex} className="item-nav"><div className="selected" onClick={this.navItemClick}>{item.name}</div></Link>
                                )
                            }else {
                                return (
                                    <Link to={{pathname:item.menuUrl}} key={rowIndex}><div onClick={this.navItemClick}>{item.name}</div></Link>
                                )
                            }
                        })
                    }
                </div>
            </div>
        );
    }
});

export default ItemNav;

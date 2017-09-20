import React, { Component } from 'react';
import '../../assets/Style/common/page.css';
class PageComponent extends  Component{
    render(){
        let _this = this;
        //当前页码
        let cur = this.props.current;
        //显示分页按钮
        let pageNum = [];
        let begin;
        let len;
        if(_this.props.totalPage > 5){
            len = 5;
            if(cur >= (_this.props.totalPage-2)){
                begin = _this.props.totalPage - 4;
            }else if(cur <= 3){
                begin = 1;
            }else{
                begin = cur - 2;
            }
        }else{
            len = _this.props.totalPage;
            begin = 1;
        }
        //根据返回的总记录数计算当前页显示的数据
        for(let i = 0; i < len; i ++){
            let cur = this.props.current;
            let showI = begin + i;
            if(cur == showI){
                pageNum.push({num : showI, cur : true});
            }else{
                pageNum.push({num : showI, cur : false});
            }
         }
        return(
          <div>
              <div className="paginationDiv">
                  <a className={this.props.current == 1? 'prev disable' : 'prev'} onClick={this.props.goPrev}></a>
                    <span>
                        {
                             pageNum.map(function(curPageNum,index){
                                return(
                                    <a key={index} onClick = {_this.props.pageClick.bind(null,curPageNum.num)} className={curPageNum.cur ? 'num current' : 'num'}>{curPageNum.num}</a>
                                )
                            })
                        }
                    </span>
                  <a className={this.props.current == this.props.total? 'next disable' : 'next'} onClick={this.props.goNext}></a>
                  <div className="rightDiv">
                      总共<span className="num-total">{_this.props.totalPage}</span>页，
                      第
                      <span className="num-total">{_this.props.current}</span>
                      页
                  </div>
              </div>
          </div>
        )
    }
}
export default PageComponent
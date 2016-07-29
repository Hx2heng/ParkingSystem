var React = require('react');

module.exports = React.createClass({
	getInitialState:function(){
		var $this = this;
	    return {
	          getDay:function(){
	          	//console.log($this.getDateStr(1));
	          	return $this.getDateStr(1);
	          }
	    };
	},
	getDateStr:function(str){
		 var dd = new Date();
		 dd.setDate(dd.getDate()+str);//获取AddDayCount天后的日期
		 var y = dd.getFullYear();
		 var m = dd.getMonth()+1;//获取当前月份的日期
		 var d = dd.getDate();
		 m = m < 10? '0'+m:m;
		 d = d < 10? '0'+d:d;
		 return y+"-"+m+"-"+d;

	},
	render:function(){
		return (
			<div className = "row">
				<div className="col-md-4 col-sm-4">
					<div className="form-group">
						<label htmlFor="carNum">车牌号</label>
						<input ref="carNum" type="text" className="form-control" id="carNum" placeholder="车牌号" />
						<label htmlFor="linkMan">联系人</label>
						<input ref="linkMan" type="text" className="form-control" id="linkMan" placeholder="联系人姓名" />
					</div>
				</div>
				<div className="col-md-4 col-sm-4">
					<div className="form-group">
						<label htmlFor="carType">车类型</label>
						<select className="form-control" id="carType" ref="carType" onChange={this.props.carTypeChange}>
						  <option value=''></option>
						  {
						  	//console.log(this.props.carTypeList);
						  	this.props.carTypeList.map(function(item,i){
						  		return <option value={item.value} data-sId={item.id} key={i}>{item.txt}</option>
						  	},this)
						  }
						</select>
						<label htmlFor="linkNum">联系电话</label>
						<input ref="linkNum" type="text" className="form-control" id="linkNum" placeholder="联系人电话" />

					</div>
				</div>
				<div className="col-md-4 col-sm-4">
					<div className="form-group">
						<label htmlFor="date">预约日期</label>
						<input  ref="date" type="date" className="form-control" min={this.state.getDay()} id="carDate" onChange={this.props.dateChange}/>
					</div>
					<button type="button" onClick={this.props.destineBtnClick} className="btn btn-danger btn-lg btn-block">查看车位</button>
				</div>
			</div>

			)
	}
})
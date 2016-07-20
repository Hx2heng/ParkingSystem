var React = require('react');
var InputArea = require('./InputArea.js');
var ParkingTable = require('./ParkingTable.js');
module.exports = React.createClass({
	getInitialState:function(){
		return {
			isTableShow:false,
			carType:1,
			nowOrder:{},//当前选择日期（天）的车位预定数据
		}
	},
	componentDidMount:function(){
		var $this = this;
		var initNowOrder={
			date:'2016/1/31',
			parked:[
				{carId:1,parkTimes:[1,2,6,7,8,12],banTimes:[9,10]},
				{carId:2,parkTimes:[]},
				{carId:3,parkTimes:[1,2]},
				{carId:4,parkTimes:[3,4,8,12,13,14]},
				{carId:5,parkTimes:[2,6,12,13,17,18]},
				]
		};
		setTimeout(function(){ 
			$this.setState({
				nowOrder:initNowOrder
			})
		},200);
	},
	destineBtnClick:function(){
		var isOk = this.checkInputForm();
		var $this = this ;
		if(isOk){
			var date = this.refs.inputArea.refs.date.value,
				carId = this.refs.inputArea.refs.carId.value,
				carType = this.refs.inputArea.refs.carType.selectedIndex+1 ;
				console.log('comp',date,carType);
			var initNowOrder={
				date:date,
				carType:carType,
				parked:[
					{carId:1,parkTimes:[1,2,6,7,8,12],banTimes:[9,10]},
					{carId:2,parkTimes:[]},
					{carId:3,parkTimes:[1,2]}
				]
			};
			console.log('加载中');
			setTimeout(function(){
				if(!$this.state.isTableShow){
					$this.setState({
						isTableShow:true,
						carType:carType,
						nowOrder:initNowOrder
					});
				}
				else{
					$this.setState({
						carType:carType,
						nowOrder:initNowOrder
					});
				}
				
			},200);
		}
		else{
			console.log('请完善表单');
		}
	},
	checkInputForm:function(){
		var carId = this.refs.inputArea.refs.carId.value,
			date = this.refs.inputArea.refs.date.value,
			carType = this.refs.inputArea.refs.carType.selectedIndex ;
		if(!carId||!carType||!date){
			return false
		}
		else{
			return true
		}
	},
	render:function(){
		return (
			<div id="parking" className="">
				<div className="row">
					<div className="col-md-12">
						<form className="car-form">
							<InputArea ref="inputArea" destineBtnClick={this.destineBtnClick}/>

							<ParkingTable isShow={this.state.isTableShow} nowOrder={this.state.nowOrder} carType={this.state.carType}/>
						</form>
					</div>
				</div>
			</div>

			)
	}
});
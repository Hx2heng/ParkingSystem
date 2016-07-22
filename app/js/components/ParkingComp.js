var React = require('react');
var InputArea = require('./InputArea.js');
var ParkingTable = require('./ParkingTable.js');
module.exports = React.createClass({
	getInitialState:function(){
		return {
			isTableShow:false,
			nowOrder:{},//当前选择日期（天）的车位预定数据
		}
	},
	componentDidMount:function(){
		// var $this = this;
		// var initNowOrder={
		// 	date:'2016/1/31',
		// 	parkingSpaces:[
		// 		{parkingSpaceId:1,parkedTimes:[1,2,6,7,8,12],banTimes:[9,10]},
		// 		{parkingSpaceId:2,parkedTimes:[]},
		// 		{parkingSpaceId:3,parkedTimes:[1,2]},
		// 		{parkingSpaceId:4,parkedTimes:[3,4,8,12,13,14]},
		// 		{parkingSpaceId:5,parkedTimes:[2,6,12,13,17,18]},
		// 		]
		// };
		// setTimeout(function(){ 
		// 	$this.setState({
		// 		nowOrder:initNowOrder
		// 	})
		// },200);
	},
	destineBtnClick:function(){
		var isOk = this.checkInputForm();
		var $this = this ;
		if(isOk){
			console.log('加载中');
			var date = this.refs.inputArea.refs.date.value,
				parkingSpaceId = this.refs.inputArea.refs.parkingSpaceId.value,
				carType = this.refs.inputArea.refs.carType.selectedIndex ;
				console.log('comp',date,carType);
				var data ={
					date:date,
					parkingSpaceId:parkingSpaceId,
					carType:carType;
				};
			 // $.ajax({
			  // 	url:'',
			  // 	type:'post',
			  // 	data:JSON.stringify(data),
			  // 	success:function(res){
			  // 		alert('成功');
			  // 	}
			  // })
			var newOrder={
				date:date,
				carType:carType,
				parkingSpaces:[
					{parkingSpaceId:1,parkedTimes:[2,2,6,7,8,12],banTimes:[9,10]},
					{parkingSpaceId:2,parkedTimes:[]},
					{parkingSpaceId:3,parkedTimes:[1,2]},
		 			{parkingSpaceId:4,parkedTimes:[3,4,8,12,13,14]},
		 			{parkingSpaceId:5,parkedTimes:[2,6,12,13,17,18]},
				]
			};

			setTimeout(function(){
				if(!$this.state.isTableShow){
					$this.setState({
						isTableShow:true,
						carType:carType,
						nowOrder:newOrder
					});
				}
				else{
					$this.setState({
						carType:carType,
						nowOrder:newOrder
					});
				}
				console.log('加载完成');
			},200);
		}
		else{
			console.log('请完善表单');
			$this.setState({
				isTableShow:false,
				carType:0,
				nowOrder:{}
			});
		}
	},
	checkInputForm:function(){
		var parkingSpaceId = this.refs.inputArea.refs.parkingSpaceId.value,
			date = this.refs.inputArea.refs.date.value,
			carType = this.refs.inputArea.refs.carType.selectedIndex ;
		if(!parkingSpaceId||!carType||!date){
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

							<ParkingTable isShow={this.state.isTableShow} nowOrder={this.state.nowOrder} />
						</form>
					</div>
				</div>
			</div>

			)
	}
});
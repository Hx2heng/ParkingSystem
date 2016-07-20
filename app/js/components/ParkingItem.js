var React = require('react');
var ParkingCell = require('./ParkingCell');
module.exports = React.createClass({
	getInitialState:function() {
	    return {
	          isSelecteds:[],
	          carType:1,
	    };
	},
	componentWillReceiveProps :function(nextProps){
		var isSelecteds = nextProps.parkTimes;
		var carType = nextProps.carType;
		this.setState({
			isSelecteds:isSelecteds,
			carType:carType
		});
	},
	setIsSelected:function(cells){
		for(var i=0;i<cells.length;i++){
			$(this.refs.items).find('td').eq(cells[i]-1).addClass('isSelected');
		} 
	},
	mouseMove:function(e){
		this.setSelectingCell(e,this.state.carType);
	},
	setSelectingCell:function(e,carType){
		var $this = this;
		var td = e.target;
		var id = $(td).attr('data-id')-0;
		var cells = $(this.refs.items).find('td');

		cells.removeClass('isSelecting');
		if((id+carType-1)>18){//超过第二天2小时
			selectState(false);
		}else if(((id+carType-1)>5)&&(id<=5)){//中午跨时
			selectState(false);
		}
		else if(this.isOccupy(id,carType)){//占用已预约时间
			selectState(false);
		}
		else{//可以
			selectState(true);
		}
		function selectState(canSelect){
			if(canSelect){
				for(var i=0;i<carType;i++){
					cells.eq(id+i-1).addClass('isSelecting');
				}
			}
			else{
				for(var i=0;i<carType;i++){
					cells.eq(id+i-1).addClass('isBanSelect');
				}
			}
		}
	},
	isOccupy:function(id,carType){
		for(var i=0;i<carType;i++){
			var newId = i+id;
			if(this.isOneOfArray(newId,this.state.isSelecteds)){
				return true;
				break;
			}
		}
	},
	mouseLeave:function(e){
		var td = e.target;
		$(this.refs.items).find('td').removeClass('isSelecting isBanSelect');
	},
	mouseClick:function(e){
		e.stopPropagation();
		var td = e.target;
		var id = $(td).attr('data-id')-0;
		var carType = this.state.carType;
		if((id+carType-1)>18){//超过第二天2小时
			alert('超过第二天2小时');
		}else if(((id+carType-1)>5)&&(id<=5)){//中午跨时
			alert('中午跨时');
		}
		else if(this.isOccupy(id,carType)){//占用已预约时间
			alert('该时段已经被预约。');
		}
		else{//可以
			var newOrder={};
			newOrder.date = this.props.nowOrder.date;
			newOrder.carId = this.props.carId;
			newOrder.parkTimes = [];
			for(var i=0;i<carType;i++){
				newOrder.parkTimes.push(id+i);
			}
			var r=confirm("确定预约此段时间吗？(时间："+newOrder.date+"车位："+newOrder.carId+"时间段："+newOrder.parkTimes);
			if (r==true)
			{
			  console.log("You pressed OK!")
			}
			else
			{
			 console.log("You pressed Cancel!")
			}
			
		}

	},
	isOneOfArray:function(i,array){
		for(var x=0;x<array.length;x++){
			if(array[x]==i){
				return true;
				break;
			}
		}
	},
	render:function(){
		var cells = [];
		for(var i=1;i<19;i++){
			if(this.isOneOfArray(i,this.state.isSelecteds)){
				cells.push(<ParkingCell key={i} cellId={i} mouseClick={this.mouseClick} isSelected={true}/>);
			}
			else{
				cells.push(<ParkingCell key={i} cellId={i} mouseClick={this.mouseClick} mouseMove={this.mouseMove} mouseLeave={this.mouseLeave} isSelected={false}/>);
			}
		}
		this.setIsSelected(this.state.isSelecteds);

		return (
			<tr ref="items">
				<th>车位{this.props.carId}</th>
				{cells}
			</tr>
			)
	}
})
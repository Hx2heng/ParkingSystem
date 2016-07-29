var React = require('react');
var ParkingItem = require('./ParkingItem');

module.exports = React.createClass({

	render:function(){
		//申请单
		var nowOrder=this.props.nowOrder;

		//是否显示
		var styleObj ={
			display:this.props.isShow?'block':'none',
		}
		//日期显示
		function addDate(date,days){ 
		      var d=new Date(date); 
		      d.setDate(d.getDate()+days); 
		      var m=d.getMonth()+1; 
		      return d.getFullYear()+'/'+m+'/'+d.getDate(); 
		    } 
		var nextDay = addDate(nowOrder.date,1);


		
		var carList = [];
		if(nowOrder.parkingSpaces){
			for(var i=0;i<nowOrder.parkingSpaces.length;i++){
				var item = <ParkingItem key={i} submit={this.props.submit} parkingType={nowOrder.parkingSpaces[i].parkingType} parkingSpaceId={nowOrder.parkingSpaces[i].parkingSpaceId} parkedTimes={nowOrder.parkingSpaces[i].parkedTimes} carType={this.props.carType} nowOrder={nowOrder}/>
				carList.push(item);
			}
		}

		//console.log(styleObj.display);
		return (
			<div className = "row"  style={styleObj}>
				<div className="col-md-12 col-sm-12 parking-table">
					<div className="table-responsive" >
					  <table className="table table-bordered" id="parkingTable">
					  	<thead>
					  		<tr>
					    		<th colSpan="42">预约日期：{nowOrder.date}</th>
					    	</tr>
				    	</thead>
					  	<tbody>
					  		<tr ref="firstRow">
								<th></th>
								<th>1:00</th>
								<th>1:30</th>
								<th>2:00</th>
								<th>2:30</th>
								<th>3:00</th>
								<th>3:30</th>
								<th>4:00</th>
								<th>4:30</th>
								<th>5:00</th>
								<th>5:30</th>
								<th>6:30</th>
								<th>7:00</th>
								<th>7:30</th>
								<th>8:30</th>
								<th>9:00</th>
								<th>9:30</th>
								<th>10:00</th>
								<th>10:30</th>
								<th>11:00</th>
								<th>11:30</th>
								<th>13:00</th>
								<th>13:30</th>
								<th>14:00</th>
								<th>14:30</th>
								<th>15:00</th>
								<th>15:30</th>
								<th>16:00</th>
								<th>16:30</th>
								<th>17:00</th>
								<th>18:00</th>
								<th>18:30</th>
								<th>19:00</th>
								<th>19:30</th>
								<th>20:00</th>
								<th>20:30</th>
								<th>21:00</th>
								<th>21:30</th>
								<th>22:00</th>
								<th>22:30</th>
								<th>23:00</th>
								<th>23:30</th>
					  		</tr>

					    	{carList}
				    	</tbody>
					  </table>
					</div>
				</div>
			</div>

			)
	}
})
var React = require('react');

module.exports = React.createClass({
	render:function(){
		return (
			<div className = "row">
				<div className="col-md-4 col-sm-4">
					<div className="form-group">
						<label htmlFor="parkingSpaceId">车牌号</label>
						<input onChange={this.props.destineBtnClick} ref="parkingSpaceId" type="text" className="form-control" id="parkingSpaceId" placeholder="车牌号" />
					</div>
				</div>
				<div className="col-md-4 col-sm-4">
					<div className="form-group">
						<label htmlFor="carType">车类型</label>
						<select className="form-control" id="carType" ref="carType" onChange={this.props.destineBtnClick}>
						  <option value=''></option>
						  <option value='1'>1</option>
						  <option value='2'>2</option>
						  <option value='3'>3</option>
						</select>
					</div>
				</div>
				<div className="col-md-4 col-sm-4">
					<div className="form-group">
						<label htmlFor="date">预约日期</label>
						<input onChange={this.props.destineBtnClick}  ref="date" type="date" className="form-control" id="carDate" />
					</div>
					<button type="button" onClick={this.props.destineBtnClick} className="btn btn-primary btn-lg btn-block">查看车位</button>
				</div>
			</div>

			)
	}
})
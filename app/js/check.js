var React = require('react');
var ReactDom = require('react-dom');
var Parking = require('./components/ParkingComp.js');

var mainCom = ReactDom.render(<Parking/>,document.getElementById('app')) 
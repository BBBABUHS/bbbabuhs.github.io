(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{964:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),a=i(4),o=d(a),r=d(i(27)),s=d(i(23)),l=d(i(937)),u=d(i(11)),m=d(i(401)),c=d(i(18)),p=i(10),f=d(i(403));function d(t){return t&&t.__esModule?t:{default:t}}var g=(0,a.lazy)((function(){return Promise.all([i.e(25),i.e(31)]).then(i.t.bind(null,982,7))})),h=0,y=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return i.startTimer=i.startTimer.bind(i),i.updateOnlineStatus=i.updateOnlineStatus.bind(i),i.enterWaitingRoomAnalytics=i.enterWaitingRoomAnalytics.bind(i),i.exitWaitingRoomAnalytics=i.exitWaitingRoomAnalytics.bind(i),i.state={timerValue:-1,isAppOffline:!1,showNetworkErrorPopup:!1},i.totalWaitingTime=0,i.numOfRetries=0,i.waitingRoomEntryTimestamp=0,i.waitingRoomExitTimestamp=0,i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),n(e,[{key:"componentWillUnmount",value:function(){this.waitingRoomExitTimestamp=(new Date).getTime(),this.totalWaitingTime=Math.round((this.waitingRoomExitTimestamp-this.waitingRoomEntryTimestamp)/1e3),this._isMounted=!1,this.exitWaitingRoomAnalytics()}},{key:"componentDidUpdate",value:function(){this.state.isAppOffline&&!this.state.showNetworkErrorPopup&&(this.setState({showNetworkErrorPopup:!0}),this.updateOnlineStatus())}},{key:"componentDidMount",value:function(){this.waitingRoomEntryTimestamp=(new Date).getTime(),window.addEventListener("online",this.updateOnlineStatus),window.addEventListener("offline",this.updateOnlineStatus),this.updateOnlineStatus(),this._isMounted=!0;var t=this.props.waitingRoomObj,e=t&&t.response&&t.response.retryInSeconds?t.response.retryInSeconds:-1;this.enterWaitingRoomAnalytics(e),this.setState({timerValue:e}),this.startTimer()}},{key:"enterWaitingRoomAnalytics",value:function(t){var e={};e.msgType=p.AnalyticsConstants.msgType.INFO,e.category=p.AnalyticsConstants.categories.BOOT,e.event=p.AnalyticsConstants.events.WAITING_ROOM_ENTRY,e.msg="App has entered waiting room",e.waitingTime=t,f.default.eventTriggered(e)}},{key:"exitWaitingRoomAnalytics",value:function(){var t={};t.msgType=p.AnalyticsConstants.msgType.INFO,t.category=p.AnalyticsConstants.categories.BOOT,t.event=p.AnalyticsConstants.events.WAITING_ROOM_EXIT,t.msg="App has exited waiting room",t.timeSpentInWaitingRoom=this.totalWaitingTime,t.waitingRoomExitRetryCount=this.numOfRetries,f.default.eventTriggered(t)}},{key:"updateOnlineStatus",value:function(){navigator.onLine?(this.setState({isAppOffline:!1}),!this.state.isAppOffline&&this.state.showNetworkErrorPopup&&(this.setState({showNetworkErrorPopup:!1}),this.callWaitingRoomAPI()),c.default.removeOfflineMessage()):(this.setState({isAppOffline:!0}),c.default.displayOfflineMessage())}},{key:"callWaitingRoomAPI",value:function(){var t=this;this.numOfRetries++;var e=this.props.waitingRoomObj&&this.props.waitingRoomObj.actionType;0===this.state.timerValue&&(clearInterval(this.myInterval),m.default.reinitiateServerConnection(this.numOfRetries,e,(function(e){e&&e.retryInSeconds&&(t.setState({timerValue:e.retryInSeconds}),t.startTimer())})))}},{key:"startTimer",value:function(){var t=this,e=this;clearInterval(this.myInterval),this.myInterval=setInterval((function(){t.state.timerValue>0?t.setState((function(t){return{timerValue:t.timerValue-1}})):0===t.state.timerValue&&!0!==t.state.isAppOffline&&e.callWaitingRoomAPI()}),1e3)}},{key:"renderBrandingLogo",value:function(t){var e=s.default.CUSTOM_CONFIG.logo,i=e&&""!=e.url?e.url:null,n=e&&"right"==e.position?"RIGHT":"LEFT";if(!i||n!=t)return"";h=e&&!isNaN(parseInt(e.width,10))?parseInt(e.width,10):0;var a=e&&!isNaN(parseInt(e.height,10))?parseInt(e.height,10):0,r="RIGHT"===t?"brandingLogoRightImageContainer":"brandingLogoLeftImageContainer";return o.default.createElement(l.default,{id:"brandingLogo",containerId:r,width:h,height:a,url:i})}},{key:"render",value:function(){var t=null,e=this.props.waitingRoomObj,i=e&&e.errorCode>=0?e.errorCode:"",n=null,r="",s="";return this.state.timerValue>0?(r=u.default.getLabelByDictionaryId("DIC_WAITING_ROOM_TITLE")?u.default.getLabelByDictionaryId("DIC_WAITING_ROOM_TITLE"):"",s=u.default.getLabelByDictionaryId("DIC_WAITING_ROOM_SERVER_ERROR").replace("%d",i),n=u.default.getLabelByDictionaryId("DIC_WAITING_ROOM_TIMER").replace("%d",this.state.timerValue)):n=u.default.getLabelByDictionaryId("DIC_WAITING_ROOM_RETRY"),this.state.showNetworkErrorPopup&&(t=o.default.createElement(a.Suspense,{fallback:null},o.default.createElement(g,null))),o.default.createElement("div",{className:"waitingRoomPopup"},this.renderBrandingLogo("LEFT"),o.default.createElement("div",{className:"waitingRoomTitle"},r),o.default.createElement("div",{className:"waitingRoomBody"},o.default.createElement("div",{className:"waitingRoomServerError"},s),o.default.createElement("div",{className:"waitingRoomTimer"},n)),t)}}]),e}(a.Component);e.default=y,y.propTypes={waitingRoomObj:r.default.object}}}]);
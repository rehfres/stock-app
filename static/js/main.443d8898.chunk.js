(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{123:function(e,t){},126:function(e,t,n){},187:function(e,t,n){},190:function(e,t,n){"use strict";n.r(t);var i,s,a,r=n(1),o=n.n(r),c=n(60),l=n.n(c),u=(n(92),n(5)),h=n.n(u),d=n(20),v=n(3),p=n(36),f=n(37),g=n(39),m=n(38),b=n(40),y=n(2),C=(n(96),23400);function S(e,t,n,r){!function(e,t){e.beginPath(),e.moveTo(0,s-t),e.lineTo(i,s-t),e.lineWidth=1,e.strokeStyle="#0000001a",e.stroke()}(e,n);for(var o,c=["positive","negative"],l=0;l<c.length;l++){var u=c[l],h={index:null,time:null};e.beginPath(),e.moveTo(0,s-n);var d=!0,v=!1,p=void 0;try{for(var f,g=t[u][Symbol.iterator]();!(d=(f=g.next()).done);d=!0){var m=f.value,b=m.index,y=m.timeInSeconds,C=m.price;e[b-h.index>1?"moveTo":"lineTo"](y*a,s-C),h.time=y,h.index=b}}catch(S){v=!0,p=S}finally{try{d||null==g.return||g.return()}finally{if(v)throw p}}e.lineWidth=1,e.strokeStyle="positive"===u?"green":"red",e.stroke(),e.lineTo(h.time*a,s-n),k(u,e,n)}(o=r)&&(console.log("%c\u29ed","color: #16a9c7",o),e.beginPath(),e.arc(o.timeInSeconds,s-o.price,1.5,0,2*Math.PI),e.strokeStyle="positive"===o.sign?"green":"red",e.fillStyle=e.strokeStyle,e.fill(),e.stroke())}function k(e,t,n){t.save(),t.clip(),"positive"===e?(t.fillStyle="#ccebd6",t.fillRect(0,0,i,s-n)):(t.fillStyle="#ffd6d8",t.fillRect(0,s-n,i,s)),t.restore()}function A(e){"string"===typeof(e=e.toString())&&e.includes(":")||(e-=18e6,e=new Date(+e).toISOString().split("T")[1].slice(0,-1));var t=3600,n=null,i=!0,s=!1,a=void 0;try{for(var r,o=e.split(".")[0].split(":")[Symbol.iterator]();!(i=(r=o.next()).done);i=!0){n+=r.value*t,t/=60}}catch(c){s=!0,a=c}finally{try{i||null==o.return||o.return()}finally{if(s)throw a}}return n}var M=n(41),O=n.n(M),w=n(85),x=n.n(w)()("https://ws-api.iextrading.com/1.0/last");console.log("%c\u29ed","color: #16a9c7",x),x.on("connect",function(){console.log("%c%s","color: #c76f16","connect")});var I=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(g.a)(this,Object(m.a)(t).call(this,e))).state={prices:[],lastPriceModifiedForCanvasIfMarketIsOpen:null,pricesModifiedForCanvas:[],counter:0,previousClose:null,previousCloseModifiedForCanvas:null,priceMin:null,priceMax:null,coefPricesToCanvas:null,webSocketsMessagesCounter:0},n._isMounted=!1,n.canvas=o.a.createRef(),n.getDataAndMakeChart=n.getDataAndMakeChart.bind(Object(y.a)(Object(y.a)(n))),n.makeChart=n.makeChart.bind(Object(y.a)(Object(y.a)(n))),n.draw=n.draw.bind(Object(y.a)(Object(y.a)(n))),n.setPreviousClose=n.setPreviousClose.bind(Object(y.a)(Object(y.a)(n))),n.modifyEverythingForCanvas=n.modifyEverythingForCanvas.bind(Object(y.a)(Object(y.a)(n))),n.getPricesMaxMinAndCanvasCoef=n.getPricesMaxMinAndCanvasCoef.bind(Object(y.a)(Object(y.a)(n))),n}return Object(b.a)(t,e),Object(f.a)(t,[{key:"getDataAndMakeChart",value:function(){var e=Object(d.a)(h.a.mark(function e(){var t;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.iextrading.com/1.0/stock/"+this.props.symbol+"/chart/1d").then(function(e){return e.json()});case 2:return t=e.sent,e.abrupt("return",t.length?this.makeChart(t):null);case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"makeChart",value:function(){var e=Object(d.a)(h.a.mark(function e(t){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setPreviousClose(t);case 2:return this.getPricesMaxMinAndCanvasCoef(t),this.modifyEverythingForCanvas(),e.abrupt("return",this.draw());case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"setPreviousClose",value:function(){var e=Object(d.a)(h.a.mark(function e(t){var n,i,s,a,r;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.iextrading.com/1.0/stock/"+this.props.symbol+"/chart/1m").then(function(e){return e.json()});case 2:n=e.sent,i=this.props.dateYesterday,s=i===t[t.length-1].date,a=n[n.length-(s?2:1)],r=a.close,this.setState(function(e){return Object(v.a)({},e,{previousClose:r})});case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getPricesMaxMinAndCanvasCoef",value:function(e){var t=[],n=[],i=!0,s=!1,a=void 0;try{for(var r,o=e[Symbol.iterator]();!(i=(r=o.next()).done);i=!0){var c=r.value,l=c.close||c.marketClose;l&&(t.push({price:l,timeInSeconds:A(c.minute)}),n.push(l))}}catch(p){s=!0,a=p}finally{try{i||null==o.return||o.return()}finally{if(s)throw a}}var u=Math.max.apply(Math,n.concat([this.state.previousClose])),h=Math.min.apply(Math,n.concat([this.state.previousClose])),d=this.props.canvasSize.height/(u-h);this.setState(function(e){return Object(v.a)({},e,{prices:t,priceMax:u,priceMin:h,coefPricesToCanvas:d})})}},{key:"modifyEverythingForCanvas",value:function(){var e=this;this.setState(function(t){return Object(v.a)({},t,{previousCloseModifiedForCanvas:(t.previousClose-e.state.priceMin)*e.state.coefPricesToCanvas})});var t={positive:[],negative:[]},n={sign:null,time:null},i=0,s=!0,a=!1,r=void 0;try{for(var o,c=this.state.prices[Symbol.iterator]();!(s=(o=c.next()).done);s=!0){var l=o.value,u=l.price,h=this.modifyTimeForCanvas(l.timeInSeconds),d=u>=this.state.previousClose?"positive":"negative";if(n.sign!==d&&null!==n.sign)for(var p=[n.sign,d],f=0;f<p.length;f++){t[p[f]].push({timeInSeconds:(h+n.time)/2,price:this.state.previousCloseModifiedForCanvas,index:i}),i++}t[d].push({timeInSeconds:h,price:(u-this.state.priceMin)*this.state.coefPricesToCanvas,index:i}),n.sign=d,n.time=h,i++}}catch(g){a=!0,r=g}finally{try{s||null==c.return||c.return()}finally{if(a)throw r}}this.setState(function(e){return Object(v.a)({},e,{pricesModifiedForCanvas:t})})}},{key:"draw",value:function(){var e=this.canvas.current;if(e){var t=e.getContext("2d");t.clearRect(0,0,e.width,e.height),S(t,this.state.pricesModifiedForCanvas,this.state.previousCloseModifiedForCanvas,this.state.lastPriceModifiedForCanvasIfMarketIsOpen)}}},{key:"onSocketMessage",value:function(){var e=this;x.on("message",function(t){(t=JSON.parse(t)).symbol===e.props.symbol&&(e.mergeSocketDataToPrices(t),e.draw())})}},{key:"mergeSocketDataToPrices",value:function(e){console.log("%c\u29ed","color: #16c72e",this._isMounted),this._isMounted&&this.setState(function(e){return Object(v.a)({},e,{webSocketsMessagesCounter:e.webSocketsMessagesCounter+1})});var t=this.state.prices[this.state.prices.length-1].timeInSeconds,n=this.state.prices[this.state.prices.length-1].price,i={price:e.price,timeInSeconds:A(e.time)},s=this.state.prices.concat([i]);this._isMounted&&this.setState(function(e){return Object(v.a)({},e,{prices:s})});var a=Math.max(this.state.priceMax,i.price),r=Math.min(this.state.priceMin,i.price),o=this.props.canvasSize.height/(a-r);this._isMounted&&this.setState(function(e){return Object(v.a)({},e,{priceMax:a,priceMin:r,coefPricesToCanvas:o})});var c=JSON.parse(JSON.stringify(this.state.pricesModifiedForCanvas)),l=i.price>=this.state.previousClose?"positive":"negative",u=n>=this.state.previousClose?"positive":"negative",h=this.state.pricesModifiedForCanvas[u][this.state.pricesModifiedForCanvas[u].length-1].index+1;if(u!==l)for(var d=[u,l],p=0;p<d.length;p++){c[d[p]].push({timeInSeconds:this.modifyTimeForCanvas((i.timeInSeconds+t)/2),price:this.state.previousCloseModifiedForCanvas,index:h}),h++}var f={timeInSeconds:this.modifyTimeForCanvas(i.timeInSeconds),price:(i.price-this.state.priceMin)*this.state.coefPricesToCanvas,index:h};c[l].push(f);var g=new Date(e.time).getDate()===this.props.dateToday;console.log("messageDateIsToday",g,new Date(e.time).getDate(),this.props.dateToday),this._isMounted&&this.setState(function(e){return Object(v.a)({},e,{pricesModifiedForCanvas:c,lastPriceModifiedForCanvasIfMarketIsOpen:g?Object(v.a)({},f,{sign:f.price>=e.previousCloseModifiedForCanvas?"positive":"negative"}):null})})}},{key:"modifyTimeForCanvas",value:function(e){return e-34200}},{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0,O.a.DP=2,this.getDataAndMakeChart().then(function(){var t;t=e.props.symbol,x.emit("subscribe",t),console.log("%c%s","color: #c716a1",t+" subbed"),e.onSocketMessage()})}},{key:"componentWillUnmount",value:function(){var e;e=this.props.symbol,x.emit("unsubscribe",e),console.log("%c%s","color: #bd8fb3",e+" unsubbed"),this._isMounted=!1}},{key:"render",value:function(){if(!this.state.prices.length)return null;var e=this.state.prices[this.state.prices.length-1].price,t=O()(e).minus(this.state.previousClose).toString(),n=O()(e).times(100).div(this.state.previousClose).minus(100).toString();return o.a.createElement("div",{className:"chart"},o.a.createElement("div",{className:"text"},o.a.createElement("p",{className:"symbol non-draggable"},this.props.symbol),o.a.createElement("p",{className:"price non-draggable"},e),o.a.createElement("p",{className:"change non-draggable "+(t>=0?"positive":"negative")},t," (",n,"%)")),o.a.createElement("canvas",{ref:this.canvas,width:this.props.canvasSize.width,height:this.props.canvasSize.height}))}}]),t}(r.Component),j=(n(126),n(8));j.initializeApp({apiKey:"AIzaSyDVs10hAUStxGmb_TxSEIR7iW78NyqwVKE",authDomain:"stock-app-b7556.firebaseapp.com",databaseURL:"https://stock-app-b7556.firebaseio.com",projectId:"stock-app-b7556",storageBucket:"stock-app-b7556.appspot.com",messagingSenderId:"174869200663"});var L=j.firestore();L.settings({timestampsInSnapshots:!0});var P,T=new j.auth.GoogleAuthProvider;var E=n(61),D=(n(187),n(86)),z=n.n(D);var W=function(e){return o.a.createElement("div",{onClick:e.atClick,className:"button "+(e.signedIn?"signed-in":"not-signed-in")},!e.signedIn&&o.a.createElement("div",{className:"button__logo"},o.a.createElement("img",{src:z.a,alt:"Logo"})),o.a.createElement("p",{className:"button__text"},e.signedIn?"Sign out":"Sign in with Google"))},B=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(g.a)(this,Object(m.a)(t).call(this,e))).state={search:"",symbolsListActive:[],symbolsList:[],searchList:[],canvasSize:{height:35,width:100},counter:0,signedIn:null,appHeight:null,dateYesterday:null,dateToday:null},n.search=n.search.bind(Object(y.a)(Object(y.a)(n))),n.reorderCharts=n.reorderCharts.bind(Object(y.a)(Object(y.a)(n))),n.initCanvasSizes=n.initCanvasSizes.bind(Object(y.a)(Object(y.a)(n))),n.signInOut=n.signInOut.bind(Object(y.a)(Object(y.a)(n))),n}return Object(b.a)(t,e),Object(f.a)(t,[{key:"handleClick",value:function(){console.log(1,this.state.counter),this.setState(function(e){return{counter:e.counter+1}})}},{key:"getSymbolsList",value:function(){var e=this;return fetch("https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol").then(function(e){return e.json()}).then(function(t){var n=t.map(function(e){return e.symbol});e.setState(function(e){return Object(v.a)({},e,{symbolsList:n,searchList:e.symbolsList})})})}},{key:"getSymbolsListActive",value:function(){var e=Object(d.a)(h.a.mark(function e(){var t;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L.collection("users").doc(P).get().then(function(e){var t=e.data();return t?t.symbols:L.collection("users").doc(P).set({symbols:[]},{merge:!0}).then(function(){return[]})});case 2:t=e.sent,console.log("%c\u29ed","color: #2516c7",t),this.setState(function(e){return Object(v.a)({},e,{symbolsListActive:t})}),console.log("%c\u29ed","color: #c76f16",this.state.symbolsListActive);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"search",value:function(e){var t=(e.target?e.target.value:e).toUpperCase(),n=this.state.symbolsList.filter(function(e){return e.startsWith(t)})||[];this.setState(function(e){return Object(v.a)({},e,{searchList:n,search:t})})}},{key:"tryToAddSymbolChart",value:function(e){if(!this.state.symbolsListActive.some(function(t){return t===e}))return this.setState(function(t){return Object(v.a)({},t,{symbolsListActive:t.symbolsListActive.concat([e])})}),this.state.signedIn?function(e){return L.collection("users").doc(P).update({symbols:j.firestore.FieldValue.arrayUnion(e)})}(e):null}},{key:"reorderCharts",value:function(e){console.log("%c\u29ed","color: #6c16c7",e),console.log("%c\u29ed","color: #c76f16",this.state.symbolsListActive);var t=e.removedIndex,n=e.addedIndex;if(t!==n){var i,s=this.state.symbolsListActive.slice(),a=s.splice(t,1)[0];null!==n&&s.splice(n,0,a),console.log("%c\u29ed","color: #1663c7",s),this.setState(function(e){return Object(v.a)({},e,{symbolsListActive:s})}),this.state.signedIn&&(i=s,L.collection("users").doc(P).update({symbols:i}))}}},{key:"initCanvasSizes",value:function(){var e=this;this.setState(function(e){return Object(v.a)({},e,{canvasSize:{height:35*window.devicePixelRatio,width:100*window.devicePixelRatio}})},function(){return t=e.state.canvasSize,console.log("%c\u29ed","color: #c74b16",t),i=t.width,s=t.height,void(a=i/C);var t})}},{key:"signInOut",value:function(){var e=this;this.state.signedIn?j.auth().signOut().then(function(){}).catch(function(e){console.log(e),alert(e.message)}).then(function(){e.setState(function(e){return Object(v.a)({},e,{signedIn:!1,symbolsListActive:[]})})}):j.auth().signInWithRedirect(T).then(function(e){P=e.user.uid}).catch(function(e){console.log(e),alert(e.message)}).then(function(){e.setState(function(e){return Object(v.a)({},e,{signedIn:!0})}),e.getSymbolsListActive()})}},{key:"initAppHeight",value:function(){window.innerWidth<650&&this.setState(function(e){return Object(v.a)({},e,{appHeight:window.innerHeight})})}},{key:"componentDidMount",value:function(){var e=this;this.initAppHeight(),this.initCanvasSizes(),this.setState(function(e){return Object(v.a)({},e,{dateYesterday:new Date(Date.now()-864e5).toISOString().split("T")[0].replace(/-/g,""),dateToday:(new Date).getDate()})}),new Promise(function(e){j.auth().onAuthStateChanged(function(t){t?(P=t.uid,e(!0)):e(!1)})}).then(function(t){console.log("%c\u29eds","color: #16c7a1",t),e.setState(function(e){return Object(v.a)({},e,{signedIn:t})}),t&&e.getSymbolsListActive()}),this.getSymbolsList().then(function(){return e.search(e.state.search)})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"App",style:{minHeight:this.state.appHeight}},o.a.createElement("input",{className:"search-bar",type:"text",placeholder:"Search",value:this.state.search,onChange:this.search}),o.a.createElement("ul",{className:"search-options"},this.state.searchList.map(function(t){return o.a.createElement("li",{key:t},o.a.createElement("button",{onMouseDown:function(){return e.tryToAddSymbolChart(t)}},t))}).slice(0,28)),o.a.createElement("div",{className:"charts-container"},o.a.createElement(E.Container,{onDrop:this.reorderCharts,nonDragAreaSelector:".non-draggable",removeOnDropOut:!0},this.state.symbolsListActive.map(function(t){return o.a.createElement(E.Draggable,{key:t},o.a.createElement(I,{symbol:t,dateToday:e.state.dateToday,dateYesterday:e.state.dateYesterday,canvasSize:e.state.canvasSize}))}))),null!==this.state.signedIn&&o.a.createElement(W,{atClick:this.signInOut,signedIn:this.state.signedIn}))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},86:function(e,t){e.exports="data:image/png;base64,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"},87:function(e,t,n){e.exports=n(190)},92:function(e,t,n){},96:function(e,t,n){}},[[87,2,1]]]);
//# sourceMappingURL=main.443d8898.chunk.js.map
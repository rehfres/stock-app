(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{122:function(e,t){},125:function(e,t,n){},186:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),i=n(60),r=n.n(i),o=(n(91),n(5)),c=n.n(o),l=n(20),u=n(2),h=n(36),p=n(37),v=n(39),f=n(38),d=n(40),m=n(3),b=(n(95),100),y=35,g=b/23400;function C(e,t,n){t.save(),t.clip(),"positive"===e?(t.fillStyle="#ccebd6",t.fillRect(0,0,b,y-n)):(t.fillStyle="#ffd6d8",t.fillRect(0,y-n,b,y)),t.restore()}function S(e){"string"===typeof(e=e.toString())&&e.includes(":")||(e-=18e6,e=new Date(+e).toISOString().split("T")[1].slice(0,-1));var t=3600,n=null,s=!0,a=!1,i=void 0;try{for(var r,o=e.split(".")[0].split(":")[Symbol.iterator]();!(s=(r=o.next()).done);s=!0){n+=r.value*t,t/=60}}catch(c){a=!0,i=c}finally{try{s||null==o.return||o.return()}finally{if(a)throw i}}return n}var k=n(41),O=n.n(k),j=n(85),M=n.n(j)()("https://ws-api.iextrading.com/1.0/last");console.log("%c\u29ed","color: #16a9c7",M),M.on("connect",function(){console.log("%c%s","color: #c76f16","connect")});var x=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(v.a)(this,Object(f.a)(t).call(this,e))).state={prices:[],pricesModifiedForCanvas:[],counter:0,previousClose:null,previousCloseModifiedForCanvas:null,priceMin:null,priceMax:null,coefPricesToCanvas:null,webSocketsMessagesCounter:0},n.canvas=a.a.createRef(),n.getDataAndMakeChart=n.getDataAndMakeChart.bind(Object(m.a)(Object(m.a)(n))),n.makeChart=n.makeChart.bind(Object(m.a)(Object(m.a)(n))),n.draw=n.draw.bind(Object(m.a)(Object(m.a)(n))),n.setPreviousClose=n.setPreviousClose.bind(Object(m.a)(Object(m.a)(n))),n.modifyEverythingForCanvas=n.modifyEverythingForCanvas.bind(Object(m.a)(Object(m.a)(n))),n.getPricesMaxMinAndCanvasCoef=n.getPricesMaxMinAndCanvasCoef.bind(Object(m.a)(Object(m.a)(n))),n}return Object(d.a)(t,e),Object(p.a)(t,[{key:"getDataAndMakeChart",value:function(){var e=Object(l.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.iextrading.com/1.0/stock/"+this.props.symbol+"/chart/1d").then(function(e){return e.json()});case 2:return t=e.sent,e.abrupt("return",this.makeChart(t));case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"makeChart",value:function(){var e=Object(l.a)(c.a.mark(function e(t){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setPreviousClose(t);case 2:return this.getPricesMaxMinAndCanvasCoef(t),this.modifyEverythingForCanvas(),e.abrupt("return",this.draw());case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"setPreviousClose",value:function(){var e=Object(l.a)(c.a.mark(function e(t){var n,s,a,i,r;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.iextrading.com/1.0/stock/"+this.props.symbol+"/chart/1m").then(function(e){return e.json()});case 2:n=e.sent,s=new Date(Date.now()-864e5).toISOString().split("T")[0].replace(/-/g,""),a=s===t[t.length-1].date,i=n[n.length-(a?2:1)],r=i.close,this.setState(function(e){return Object(u.a)({},e,{previousClose:r})});case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getPricesMaxMinAndCanvasCoef",value:function(e){var t=[],n=[],s=!0,a=!1,i=void 0;try{for(var r,o=e[Symbol.iterator]();!(s=(r=o.next()).done);s=!0){var c=r.value,l=c.close||c.marketClose;l&&(t.push({price:l,timeInSeconds:S(c.minute)}),n.push(l))}}catch(f){a=!0,i=f}finally{try{s||null==o.return||o.return()}finally{if(a)throw i}}this.setState(function(e){return Object(u.a)({},e,{prices:t})});var h=Math.max.apply(Math,n.concat([this.state.previousClose])),p=Math.min.apply(Math,n.concat([this.state.previousClose]));this.setState(function(e){return Object(u.a)({},e,{priceMax:h})}),this.setState(function(e){return Object(u.a)({},e,{priceMin:p})});var v=35/(h-p);this.setState(function(e){return Object(u.a)({},e,{coefPricesToCanvas:v})})}},{key:"modifyEverythingForCanvas",value:function(){var e=this;this.setState(function(t){return Object(u.a)({},t,{previousCloseModifiedForCanvas:(t.previousClose-e.state.priceMin)*e.state.coefPricesToCanvas})});var t={positive:[],negative:[]},n={sign:null,time:null},s=0,a=!0,i=!1,r=void 0;try{for(var o,c=this.state.prices[Symbol.iterator]();!(a=(o=c.next()).done);a=!0){var l=o.value,h=l.price,p=this.modifyTimeForCanvas(l.timeInSeconds),v=h>=this.state.previousClose?"positive":"negative";if(n.sign!==v&&null!==n.sign)for(var f=[n.sign,v],d=0;d<f.length;d++){t[f[d]].push({timeInSeconds:(p+n.time)/2,price:this.state.previousCloseModifiedForCanvas,index:s}),s++}t[v].push({timeInSeconds:p,price:(h-this.state.priceMin)*this.state.coefPricesToCanvas,index:s}),n.sign=v,n.time=p,s++}}catch(m){i=!0,r=m}finally{try{a||null==c.return||c.return()}finally{if(i)throw r}}this.setState(function(e){return Object(u.a)({},e,{pricesModifiedForCanvas:t})})}},{key:"draw",value:function(){var e=this.canvas.current,t=e.getContext("2d");t.clearRect(0,0,e.width,e.height),function(e,t){e.beginPath(),e.moveTo(0,y-t),e.lineTo(b,y-t),e.lineWidth=1,e.strokeStyle="#0000001a",e.stroke()}(t,this.state.previousCloseModifiedForCanvas),function(e,t,n){for(var s=["positive","negative"],a=0;a<s.length;a++){var i=s[a],r={index:null,time:null};e.beginPath(),e.moveTo(0,y-n);var o=!0,c=!1,l=void 0;try{for(var u,h=t[i][Symbol.iterator]();!(o=(u=h.next()).done);o=!0){var p=u.value,v=p.index,f=p.timeInSeconds,d=p.price;e[v-r.index>1?"moveTo":"lineTo"](f*g,y-d),r.time=f,r.index=v}}catch(m){c=!0,l=m}finally{try{o||null==h.return||h.return()}finally{if(c)throw l}}e.lineWidth=1,e.strokeStyle="positive"===i?"green":"red",e.stroke(),e.lineTo(r.time*g,y-n),C(i,e,n)}}(t,this.state.pricesModifiedForCanvas,this.state.previousCloseModifiedForCanvas)}},{key:"onSocketMessage",value:function(){var e=this;M.on("message",function(t){(t=JSON.parse(t)).symbol===e.props.symbol&&(e.mergeSocketDataToPrices(t),e.draw())})}},{key:"mergeSocketDataToPrices",value:function(e){this.setState(function(e){return Object(u.a)({},e,{webSocketsMessagesCounter:e.webSocketsMessagesCounter+1})});var t=this.state.prices[this.state.prices.length-1].timeInSeconds,n=this.state.prices[this.state.prices.length-1].price,s=S(e.time);if(console.time(1),s<t||this.state.webSocketsMessagesCounter<2)console.timeEnd(1);else{console.timeEnd(1);var a=this.state.prices.concat([{price:e.price,timeInSeconds:s}]);this.setState(function(e){return Object(u.a)({},e,{prices:a})}),this.setState(function(t){return Object(u.a)({},t,{priceMax:Math.max(t.priceMax,e.price)})}),this.setState(function(t){return Object(u.a)({},t,{priceMin:Math.min(t.priceMin,e.price)})}),this.setState(function(e){return Object(u.a)({},e,{coefPricesToCanvas:35/(e.priceMax-e.priceMin)})});var i=JSON.parse(JSON.stringify(this.state.pricesModifiedForCanvas)),r=e.price>=this.state.previousClose?"positive":"negative",o=n>=this.state.previousClose?"positive":"negative",c=this.state.pricesModifiedForCanvas[o][this.state.pricesModifiedForCanvas[o].length-1].index+1;if(o!==r)for(var l=[o,r],h=0;h<l.length;h++){i[l[h]].push({timeInSeconds:this.modifyTimeForCanvas((s+t)/2),price:this.state.previousCloseModifiedForCanvas,index:c}),c++}i[r].push({timeInSeconds:this.modifyTimeForCanvas(s),price:(e.price-this.state.priceMin)*this.state.coefPricesToCanvas,index:c}),this.setState(function(e){return Object(u.a)({},e,{pricesModifiedForCanvas:i})})}}},{key:"modifyTimeForCanvas",value:function(e){return e-34200}},{key:"componentDidMount",value:function(){var e=this;O.a.DP=2,this.getDataAndMakeChart().then(function(){var t;t=e.props.symbol,M.emit("subscribe",t),console.log("%c%s","color: #c716a1",t+" subbed"),e.onSocketMessage()})}},{key:"render",value:function(){if(!this.state.prices.length)return null;var e=this.state.prices[this.state.prices.length-1].price,t=O()(e).minus(this.state.previousClose).toString(),n=O()(e).times(100).div(this.state.previousClose).minus(100).toString();return a.a.createElement("div",{className:"chart"},a.a.createElement("div",{className:"text"},a.a.createElement("p",{className:"symbol"},this.props.symbol),a.a.createElement("p",{className:"price"},e),a.a.createElement("p",{className:"change "+(t>=0?"positive":"negative")},t," (",n,"%)")),a.a.createElement("canvas",{ref:this.canvas,width:"100",height:"35"}))}}]),t}(s.Component),w=(n(125),n(14));w.initializeApp({apiKey:"AIzaSyDVs10hAUStxGmb_TxSEIR7iW78NyqwVKE",authDomain:"stock-app-b7556.firebaseapp.com",databaseURL:"https://stock-app-b7556.firebaseio.com",projectId:"stock-app-b7556",storageBucket:"stock-app-b7556.appspot.com",messagingSenderId:"174869200663"});var A=w.firestore();A.settings({timestampsInSnapshots:!0});var E,L=new w.auth.GoogleAuthProvider;var T=n(61),F=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(v.a)(this,Object(f.a)(t).call(this,e))).state={search:"SNAP",symbolsListActive:[],symbolsList:[],searchList:[]},n.search=n.search.bind(Object(m.a)(Object(m.a)(n))),n.reorderCharts=n.reorderCharts.bind(Object(m.a)(Object(m.a)(n))),n}return Object(d.a)(t,e),Object(p.a)(t,[{key:"handleClick",value:function(){console.log(this.state.counter),this.setState(function(e){return{counter:e.counter+1}})}},{key:"getSymbolsList",value:function(){var e=this;return fetch("https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol").then(function(e){return e.json()}).then(function(t){e.setState(function(e){return Object(u.a)({},e,{symbolsList:t.map(function(e){return e.symbol})})}),e.setState(function(e){return Object(u.a)({},e,{searchList:e.symbolsList})})})}},{key:"getSymbolsListActive",value:function(){var e=Object(l.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.collection("users").doc(E).get().then(function(e){var t=e.data();return t?t.symbols:A.collection("users").doc(E).set({symbols:[]},{merge:!0}).then(function(){return[]})});case 2:t=e.sent,console.log("%c\u29ed","color: #2516c7",t),this.setState(function(e){return Object(u.a)({},e,{symbolsListActive:t})}),console.log("%c\u29ed","color: #c76f16",this.state.symbolsListActive);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"search",value:function(e){var t=(e.target?e.target.value:e).toUpperCase();this.setState(function(e){return Object(u.a)({},e,{search:t})});var n=this.state.symbolsList.filter(function(e){return e.startsWith(t)})||[];this.setState(function(e){return Object(u.a)({},e,{searchList:n})})}},{key:"tryToAddSymbolChart",value:function(e){if(!this.state.symbolsListActive.some(function(t){return t===e}))return this.setState(function(t){return Object(u.a)({},t,{symbolsListActive:t.symbolsListActive.concat([e])})}),function(e){return A.collection("users").doc(E).update({symbols:w.firestore.FieldValue.arrayUnion(e)})}(e)}},{key:"reorderCharts",value:function(e){console.log("%c\u29ed","color: #6c16c7",e),console.log("%c\u29ed","color: #c76f16",this.state.symbolsListActive);var t=e.removedIndex,n=e.addedIndex;if(t!==n){var s,a=this.state.symbolsListActive.slice(),i=a.splice(t,1)[0];a.splice(n,0,i),console.log("%c\u29ed","color: #1663c7",a),this.setState(function(e){return Object(u.a)({},e,{symbolsListActive:a})}),s=a,A.collection("users").doc(E).update({symbols:s})}}},{key:"componentDidMount",value:function(){var e=this;w.auth().signInWithPopup(L).then(function(e){E=e.user.uid}).catch(function(e){console.log(e),alert(e.message)}).then(function(){return e.getSymbolsListActive()}),this.getSymbolsList().then(function(){return e.search(e.state.search)})}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement("input",{className:"search-bar",type:"text",placeholder:"Search",value:this.state.search,onChange:this.search}),a.a.createElement("ul",{className:"search-options"},this.state.searchList.map(function(t){return a.a.createElement("li",{key:t},a.a.createElement("button",{onMouseDown:function(){return e.tryToAddSymbolChart(t)}},t))}).slice(0,28))),a.a.createElement("div",{className:"charts-container"},a.a.createElement(T.Container,{onDrop:this.reorderCharts},this.state.symbolsListActive.map(function(e){return a.a.createElement(T.Draggable,{key:e},a.a.createElement(x,{symbol:e}))}))))}}]),t}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},86:function(e,t,n){e.exports=n(186)},91:function(e,t,n){},95:function(e,t,n){}},[[86,2,1]]]);
//# sourceMappingURL=main.b5f81252.chunk.js.map
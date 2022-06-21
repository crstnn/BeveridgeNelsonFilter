(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{113:function(e,t,a){e.exports=a(133)},118:function(e,t,a){},133:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(42),i=a.n(l),o=(a(118),a(58),a(55)),c=a.n(o),s=a(64),d=a(65),u=a(10),m=a(20),p=a(21),h=a(27),g=a(23),f=a(28),v=a(199),y=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),a.props.nextStep()},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement("p",null,"We will guide you through the steps to perform trend-cycle decomposition on either (i) a time series of your choosing to be pasted into a field or (ii) a time series from the Federal Reserve Economic Database (FRED) using its mnemonic. Note that there is additional information provided when hovering over the options in the subsequent pages. The cycle is reported and can be downloaded as a CSV.")),r.a.createElement(v.a,{variant:"contained",style:b.button,onClick:this.continue},"Continue"),r.a.createElement("br",null))}}]),t}(n.Component),b={button:{margin:20}},C=y,E=a(177),x=a(194),S=a(204),k=a(205),w=a(192),D=a(200),j=a(195),I=a(190),O=a(196),N=a(197),B=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){var t=a.props,n=t.getResults,r=t.cancelLoad,l=t.errors;0===Object.keys(l).length?n():r(),e.preventDefault(),a.props.nextStep()},a.back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.handleChange,n=e.handleNumberFieldChange,l=e.handleIntegerNumberFieldChange,i=e.handleCheckboxChange,o=e.errors,c=t.isAutomaticWindow||"sm"===t.demean,s=0!==t.deltaSelect;return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement(E.a,{light:!0},r.a.createElement(x.a,{variant:"standard"},r.a.createElement(S.a,{label:r.a.createElement(k.a,{style:{fontSize:"x-large"}},"Pre-Analysis Transformations"),title:"Transformations are applied in the order below and are done prior to the BN Filter run",control:r.a.createElement(w.a,{onChange:i("transform"),checked:t.transform})})))),r.a.createElement(D.a,{container:!0,direction:"column",justifyContent:"space-evenly",spacing:4,alignItems:"center"},r.a.createElement(D.a,{item:!0,xs:4},r.a.createElement(x.a,{variant:"standard"},r.a.createElement(S.a,{label:"Natural Logarithm",title:"Logarithm to the base of Euler's number",control:r.a.createElement(w.a,{size:"small",onChange:i("takeLog"),checked:t.takeLog,disabled:!t.transform})}))),r.a.createElement(D.a,{item:!0,xs:3},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:350}},r.a.createElement(j.a,null,"Differencing Method"),r.a.createElement(I.a,{title:"Differencing method applied",onChange:a("dCode"),defaultValue:t.dCode,disabled:!t.transform},r.a.createElement(O.a,{value:"nd"},"No Differencing (Levels)"),r.a.createElement(O.a,{value:"d1"},"1 Period Difference"),r.a.createElement(O.a,{value:"d4"},"4 Period Difference (for Quarterly Data)"),r.a.createElement(O.a,{value:"d12"},"12 Period Difference (for Monthly Data)")))),r.a.createElement(D.a,{item:!0,xs:4},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:350}},r.a.createElement(j.a,null,"Computed Percentages"),r.a.createElement(I.a,{title:"Percentage multiple applied",onChange:a("pCode"),defaultValue:t.pCode,disabled:!t.transform},r.a.createElement(O.a,{value:"np"},"No Change"),r.a.createElement(O.a,{value:"p1"},"Multiply by 100"),r.a.createElement(O.a,{value:"p4"},"Multiply by 400 (Annualized Quarterly Rate)"),r.a.createElement(O.a,{value:"p12"},"Multiply by 1200 (Annualized Monthly Rate)"))))),r.a.createElement("div",{className:"information"},r.a.createElement(E.a,{style:{fontSize:"x-large"}},"BN Filter Parameters")),r.a.createElement("div",{style:{width:"450px",alignItems:"center",display:"inline-block",paddingBottom:"50px"}},r.a.createElement(D.a,{container:!0,alignItems:"flex-start",justifyContent:"space-evenly",spacing:4},r.a.createElement(D.a,{item:!0,xs:8},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:300}},r.a.createElement(j.a,null,"Signal-to-Noise Ratio (Delta)"),r.a.createElement(I.a,{label:"Signal-to-Noise Ratio (Delta)",title:"Signal-to-Noise Ratio according to benchmark KMW approach",onChange:a("deltaSelect"),defaultValue:t.deltaSelect},r.a.createElement(O.a,{value:0},"Fixed Delta"),r.a.createElement(O.a,{value:1},"Maximize Amplitude-to-Noise Ratio"),r.a.createElement(O.a,{value:2},"Minimize Stochastic Trend Volatility")))),r.a.createElement(D.a,{item:!0,xs:4},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:50}},r.a.createElement(N.a,{label:"Fixed Delta",title:"Only necessary when Signal-to-noise ratio is set to 'Fixed Delta'",onChange:n("fixedDelta"),defaultValue:t.fixedDelta,disabled:s,error:void 0!==o.fixedDelta&&!s,helperText:void 0===o.fixedDelta||s?"":o.fixedDelta}))),r.a.createElement(D.a,{item:!0,xs:7},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:250}},r.a.createElement(j.a,null,"Demeaning"),r.a.createElement(I.a,{label:"Iterative Dynamic Demeaning",onChange:a("demean"),defaultValue:t.demean},r.a.createElement(O.a,{value:"sm"},"Constant (Static Demeaning)"),r.a.createElement(O.a,{value:"dm"},"Dynamic Demeaning"),r.a.createElement(O.a,{value:"idm"},"Iterative Dynamic Demeaning")))),r.a.createElement(D.a,{item:!0,xs:5},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:100}},r.a.createElement(N.a,{label:"Rolling Window",title:"Only necessary when the demeaning method is dynamic. Must be an integer",onChange:l("rollingWindow"),defaultValue:t.rollingWindow,disabled:c,error:void 0!==o.rollingWindow&&!c,helperText:void 0===o.rollingWindow||c?"":o.rollingWindow}))))),r.a.createElement("br",null),r.a.createElement(v.a,{variant:"outlined",style:F.button,onClick:this.back},"Back"),r.a.createElement(v.a,{variant:"contained",style:F.button,onClick:this.continue},"Get Trend Decomposition"),r.a.createElement("br",null))}}]),t}(n.Component),F={button:{margin:20}},L=B,W=a(12),M=a(186),T=a(188),A=a(189);var P=function(e){var t=r.a.useState(new Date("2014-08-18T21:11:54")),a=Object(W.a)(t,2),n=a[0],l=a[1];return r.a.createElement("div",null,r.a.createElement(M.b,{dateAdapter:A.a},r.a.createElement(T.a,{label:"Time Series Start Date",inputFormat:"dd/MM/yyyy",value:n,InputProps:{style:{width:220}},onChange:function(e){l(e)},disabled:e.isDisabled,renderInput:function(e){return r.a.createElement(N.a,e)}})))},V=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),a.props.nextStep()},a.back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.handleChange,n=e.handleCheckboxChange,l=e.getState;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"information"},r.a.createElement(E.a,{style:{fontSize:"x-large"}},"Data and Transformations"),r.a.createElement("p",null,"Enter or paste in your chosen time series below.",r.a.createElement("br",null),"Each line must contain a numerical value. The next observation must start on the next line (and so on). For example, pasting a time series from a CSV will achieve the appropriate formatting.")),r.a.createElement("div",null,r.a.createElement(x.a,{variant:"standard",sx:{m:1,minWidth:300,paddingRight:2}},r.a.createElement(N.a,{multiline:!0,rows:20,label:"Time Series (y)",title:"Paste your chosen time series here",onChange:a("unprocessedY"),InputLabelProps:{shrink:!0},placeholder:"e.g."+new Array(100).join(" ")+"101.2"+new Array(100).join(" ")+"104.8"+new Array(100).join(" ")+"102.4"+new Array(100).join(" ")+"...",defaultValue:t.unprocessedY})),r.a.createElement("div",{style:{width:"450px",alignItems:"center",display:"inline-block"}},r.a.createElement(E.a,{light:!0,title:"This option does not make alterations to the data but changes the display of the graph output",style:{fontSize:"large"}},"Display Options"),r.a.createElement(D.a,{container:!0,direction:"column",sx:{minHeight:250,paddingTop:4},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(D.a,{item:!0,xs:4},r.a.createElement(P,{isDisabled:0===l("periodicity")})),r.a.createElement(D.a,{item:!0,xs:4},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:220}},r.a.createElement(j.a,null,"Data Frequency"),r.a.createElement(I.a,{title:"Time-series frequency",onChange:a("periodicity"),defaultValue:t.periodicity},r.a.createElement(O.a,{value:"y"},"Yearly"),r.a.createElement(O.a,{value:"q"},"Quarterly"),r.a.createElement(O.a,{value:"m"},"Monthly"),r.a.createElement(O.a,{value:"w"},"Weekly"),r.a.createElement(O.a,{value:0},"Undated/Unspecified")))),r.a.createElement(D.a,{item:!0,xs:4},r.a.createElement(x.a,{sx:{marginBottom:3,marginTop:2},variant:"standard"},r.a.createElement(S.a,{label:"95% Confidence Intervals",title:"Choose to display 95% confidence intervals in graph output",control:r.a.createElement(w.a,{size:"small",onChange:n("dispCycleCI"),checked:t.dispCycleCI})})))),r.a.createElement(D.a,{container:!0,direction:"column",sx:{minHeight:340},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(D.a,{item:!0,xs:3},r.a.createElement(v.a,{variant:"outlined",style:R.button,onClick:this.back},"Back"),r.a.createElement(v.a,{variant:"contained",style:R.button,onClick:this.continue},"Continue"))))))}}]),t}(n.Component),R={button:{margin:30},headingFormControlLabel:{fontSize:"large"}},_=V,z=a(94),U=a.n(z),Y=a(95),q=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"getCSVData",value:function(){var e=this.props.plotPageValues;return ee.colsToRows(["cycle"].concat(e.cycle),e.dispCycleCI?["conf_int_lower_bound"].concat(e.cycleCILB):void 0,e.dispCycleCI?["conf_int_upper_bound"].concat(e.cycleCIUB):void 0)}},{key:"getPlot",value:function(){var e=this.props.plotPageValues,t=Array.from({length:e.cycle.length},function(e,t){return t+1});return r.a.createElement(U.a,{layout:{autosize:!0,margin:{b:20}},data:[{x:t,y:e.cycle,type:"scatter",mode:"lines+markers",marker:{color:"blue"},name:"cycle",showlegend:!1},e.dispCycleCI?{x:t,y:e.cycleCILB,fill:"tonexty",fillcolor:"rgba(0, 0, 0, 0)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"}:{},e.dispCycleCI?{x:t,y:e.cycleCIUB,fill:"tonexty",fillcolor:"rgba(0,100,80,0.2)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"}:{}]})}},{key:"render",value:function(){var e=this.props.plotPageValues;return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("div",null,this.getPlot(),r.a.createElement("p",null," Delta: ",e.deltaCalc," ")),r.a.createElement(Y.CSVLink,{filename:"BNF_cycle.csv",data:this.getCSVData()},"Download as CSV")),r.a.createElement(v.a,{variant:"outlined",style:H.button,onClick:this.back},"Back"))}}]),t}(n.Component),H={button:{margin:40}},Q=q,Z=a(98);var J=function(){return r.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",paddingTop:"30vh"}},r.a.createElement(Z.a,{height:75,width:75,color:"grey"}))},K=a(193),G=function(e){function t(){return Object(m.a)(this,t),Object(h.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{margin:"2px 20%"}},r.a.createElement(K.a,{variant:"filled",severity:"error",onClose:this.props.close},"During the running of the BN filter a problem occurred. Please check that the inputs are appropriate."))}}]),t}(n.Component),X=a(79),$=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).state={step:1,unprocessedY:"",y:[],fixedDelta:.1,deltaSelect:2,demean:"sm",iterativeBackcasting:!0,isAutomaticWindow:!1,rollingWindow:40,periodicity:"q",dateObj:Object(),transform:!1,dCode:"nd",pCode:"np",takeLog:!1,cycle:[],dispCycleCI:!1,cycleCI:[],deltaCalc:void 0,cycleCILB:[],cycleCIUB:[],loading:!0,errorMessage:{}},a.loading=!0,a.baseBackendURL="https://bn-filtering.herokuapp.com",a.bnfUserSpecifiedDataSlug="/bnf/user-specified-time-series",a.bnfFredDataSlug="/bnf/fred-time-series",a.fredDataSlug="/fred-time-series",a.nextStep=function(){var e=a.state.step;a.setState({step:e+1})},a.prevStep=function(){var e=a.state.step;a.setState({step:e-1})},a.cancelLoad=function(){a.setState({loading:null})},a.handleChange=function(e){return function(t){a.setState(Object(u.a)({},e,t.target.value))}},a.setErrorMessage=function(e,t){a.setState(Object(u.a)({},"errorMessage",Object(d.a)({},a.state.errorMessage,Object(u.a)({},e,t))))},a.handleNumberFieldChange=function(e){return function(t){if(console.log(t.target.value),isNaN(t.target.value))a.setErrorMessage(e,"must be numeric");else if(t.target.value<X[e].min)a.setErrorMessage(e,"too small. must be \u2265 ".concat(X[e].min));else if(t.target.value>X[e].max)a.setErrorMessage(e,"too large. must be \u2264 ".concat(X[e].max));else{var n=Object(d.a)({},a.state);delete n.errorMessage[e],a.setState(n)}a.handleChange(e)(t)}},a.handleIntegerNumberFieldChange=function(e){return function(t){t.target.value%1!==0&&a.setErrorMessage(e,"must be an integer"),a.handleNumberFieldChange(e)(t)}},a.handleCheckboxChange=function(e){return function(t){a.setState(Object(u.a)({},e,t.target.checked))}},a.getState=function(e){return a.state[e]},a.getResults=Object(s.a)(c.a.mark(function e(){var n,r,l,i;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a.state.unprocessedY.replace(/(,?(\r\n|\n|\r))|(,\s)/gm,",").split(",").filter(function(e){return""!==e}),console.log(n),r=function(e,t){return e+t[0].toString()+"="+t[1].toString()+"&"},l=[["window",a.state.rollingWindow],["delta_select",a.state.deltaSelect],["fixed_delta",a.state.fixedDelta],["ib",a.state.iterativeBackcasting],["demean",a.state.demean],["processed_y",n]].concat([["transform",a.state.transform]].concat(a.state.transform?[["p_code",a.state.pCode],["d_code",a.state.dCode],["take_log",a.state.takeLog]]:[])).reduce(r,"?"),i=a.baseBackendURL+a.bnfUserSpecifiedDataSlug+l,console.log(i),a.setState({loading:!0},Object(s.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:fetch(i).then(function(e){if(200!==e.status)throw a.cancelLoad(),new Error("bad status");return e}).then(function(e){return e.json()}).then(function(e){console.log("Success:",e);var n=e.cycle.map(function(e){return Number(e)}),r=e.ci.map(function(e){return Number(e)}),l=Number(e.delta);a.setState({cycle:n,cycleCI:r,deltaCalc:l,cycleCILB:t.confIntZip(n,r,"lb"),cycleCIUB:t.confIntZip(n,r,"ub"),loading:!1})}).catch(function(e){console.log(e)});case 1:case"end":return e.stop()}},e)})));case 7:case"end":return e.stop()}},e)})),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=this.state.step,a=this.state,n=a.y,l=a.unprocessedY,i=a.fixedDelta,o=a.deltaSelect,c=a.demean,s=a.iterativeBackcasting,d=a.isAutomaticWindow,u=a.rollingWindow,m=a.periodicity,p=a.dateObj,h=a.transform,g=a.dCode,f=a.pCode,v=a.takeLog,y=a.cycle,b=a.deltaCalc,E=a.dispCycleCI,x=a.cycleCILB,S=a.cycleCIUB,k=a.errorMessage,w={y:n,unprocessedY:l,periodicity:m,fixedDelta:i,deltaSelect:o,demean:c,iterativeBackcasting:s,isAutomaticWindow:d,rollingWindow:u,transform:h,dCode:g,pCode:f,takeLog:v,dispCycleCI:E},D={y:n,cycle:y,deltaCalc:b,dispCycleCI:E,cycleCILB:x,cycleCIUB:S,periodicity:m,dateObj:p};return r.a.createElement(r.a.Fragment,null,function(){switch(t){case 2:return r.a.createElement(_,{nextStep:e.nextStep,prevStep:e.prevStep,handleChange:e.handleChange,handleCheckboxChange:e.handleCheckboxChange,getState:e.getState,values:w});case 3:return r.a.createElement(r.a.Fragment,null,null===e.state.loading?r.a.createElement(G,{close:function(){e.setState({loading:!1})}}):null,r.a.createElement(L,{nextStep:e.nextStep,prevStep:e.prevStep,cancelLoad:e.cancelLoad,handleChange:e.handleChange,handleNumberFieldChange:e.handleNumberFieldChange,handleIntegerNumberFieldChange:e.handleIntegerNumberFieldChange,handleCheckboxChange:e.handleCheckboxChange,getResults:e.getResults,values:w,errors:k}));case 4:return r.a.createElement(r.a.Fragment,null,!0===e.state.loading?J():!1===e.state.loading?r.a.createElement(Q,{prevStep:e.prevStep,handleChange:e.handleChange,plotPageValues:D}):void e.prevStep());default:return r.a.createElement(C,{nextStep:e.nextStep,handleChange:e.handleChange})}}())}}]),t}(n.Component);$.confIntZip=function(e,t,a){return e.map(function(e,n){return"lb"===a?e-t[n]:e+t[n]})},$.colsToRows=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];for(var n=(t=t.filter(function(e){return void 0!==e})).length,r=t[0].length,l=[],i=0;i<r;i++){for(var o=[],c=0;c<n;c++)o.push(t[c][i]);l.push(o)}return l};var ee=$;var te=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"appHeader"},"BN Filter Trend-Cycle Decomposition"),r.a.createElement("div",{className:"information welcomeInformation"},r.a.createElement("p",null,"This tool performs trend-cycle decomposition. It is implemented using the Beveridge-Nelson filter method described in ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3434174"},"Kamber, Morley, and Wong"),". Please note that this website is still in development so some features are yet to be implemented/completed.")),r.a.createElement(ee,null))},ae=function(e){e&&e instanceof Function&&a.e(1).then(a.bind(null,187)).then(function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,l=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),l(e),i(e)})};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(te,null)),document.getElementById("root")),ae()},58:function(e,t,a){},79:function(e){e.exports={fixedDelta:{min:.05,max:1},rollingWindow:{min:26,max:500}}}},[[113,3,2]]]);
//# sourceMappingURL=main.d04319a3.chunk.js.map
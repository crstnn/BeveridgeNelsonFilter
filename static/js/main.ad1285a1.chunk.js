(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{116:function(e,t,a){e.exports=a(136)},121:function(e,t,a){},136:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(44),i=a.n(l),o=(a(121),a(62),a(58)),c=a.n(o),s=a(71),u=a(72),d=a(10),m=a(14),p=a(23),h=a(25),g=a(15),f=a(22),b=a(202),y=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),a.props.nextStep()},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement("p",null,"You will be guided through the steps to perform trend-cycle decomposition on either (1) a time series of your choosing to be pasted into a field or (2) a time series from the Federal Reserve Economic Database (FRED) using its mnemonic. Note that there is additional information provided when hovering over the options in the subsequent pages. The cycle is reported and can be downloaded as a CSV.")),r.a.createElement(b.a,{variant:"contained",style:v.button,onClick:this.continue},"Continue"),r.a.createElement("br",null))}}]),t}(n.Component),v={button:{margin:20}},C=y,x=a(180),E=a(198),w=a(207),j=a(208),D=a(195),O=a(203),S=a(199),k=a(193),I=a(200),F=a(39),N=a(197),M=function(e){return e.map(function(e){return r.a.createElement(N.a,{value:e.value},e.text)})},T=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(l)))).continue=function(e){var t=a.props,n=t.getResults,r=t.cancelLoad,l=t.errors;0===Object.keys(l).length?n():r(),e.preventDefault(),a.props.nextStep()},a.back=function(e){e.preventDefault(),a.props.prevStep()},a.preAnalysisTransformations=function(){var e=a.props,t=e.values,n=e.handleChange,l=e.handleCheckboxChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"information"},r.a.createElement(x.a,{light:!0},r.a.createElement(E.a,{variant:"standard"},r.a.createElement(w.a,{label:r.a.createElement(j.a,{style:{fontSize:"x-large"}},"Transformations"),title:"Transformations are applied in the order below and are done prior to estimation. Uncheck this box to apply them.",control:r.a.createElement(D.a,{onChange:l("transform"),checked:t.transform})})))),r.a.createElement(O.a,{container:!0,direction:"column",justifyContent:"space-evenly",spacing:4,alignItems:"center"},r.a.createElement(O.a,{item:!0,xs:4},r.a.createElement(E.a,{variant:"standard"},r.a.createElement(w.a,{label:"Natural Logarithm",title:"Logarithm to the base of Euler's number",control:r.a.createElement(D.a,{size:"small",onChange:l("takeLog"),checked:t.takeLog,disabled:!t.transform})}))),r.a.createElement(O.a,{item:!0,xs:3},r.a.createElement(E.a,{variant:"standard",sx:{minWidth:350}},r.a.createElement(S.a,null,"Differencing Method"),r.a.createElement(k.a,{title:"Differencing method applied",onChange:n("dCode"),defaultValue:t.dCode,disabled:!t.transform},M(F.a.dCode)))),r.a.createElement(O.a,{item:!0,xs:4},r.a.createElement(E.a,{variant:"standard",sx:{minWidth:350}},r.a.createElement(S.a,null,"Computed Percentages"),r.a.createElement(k.a,{title:"Multiple applied",onChange:n("pCode"),defaultValue:t.pCode,disabled:!t.transform},M(F.a.pCode))))))},a.bnFilterParameters=function(){var e=a.props,t=e.values,n=e.handleChange,l=e.handleNumberFieldChange,i=e.handleIntegerNumberFieldChange,o=e.errors,c=t.isAutomaticWindow||"sm"===t.demean,s=0!==t.deltaSelect;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"information"},r.a.createElement(x.a,{style:{fontSize:"x-large"}},"Filter Parameters")),r.a.createElement("div",{style:{width:"450px",alignItems:"center",display:"inline-block",paddingBottom:"50px"}},r.a.createElement(O.a,{container:!0,alignItems:"flex-start",justifyContent:"space-evenly",spacing:4},r.a.createElement(O.a,{item:!0,xs:8},r.a.createElement(E.a,{variant:"standard",sx:{minWidth:300}},r.a.createElement(S.a,null,"Signal-to-Noise Ratio (Delta)"),r.a.createElement(k.a,{label:"Signal-to-Noise Ratio (Delta)",title:"Signal-to-Noise Ratio according to benchmark KMW approach",onChange:n("deltaSelect"),defaultValue:t.deltaSelect},M(F.a.deltaSelect)))),r.a.createElement(O.a,{item:!0,xs:4},r.a.createElement(E.a,{variant:"standard",sx:{minWidth:50}},r.a.createElement(I.a,{label:"Fixed Delta",title:"Only necessary when Signal-to-noise ratio is set to 'Fixed Delta'",onChange:l("fixedDelta"),defaultValue:t.fixedDelta,disabled:s,error:void 0!==o.fixedDelta&&!s,helperText:void 0===o.fixedDelta||s?"":o.fixedDelta}))),r.a.createElement(O.a,{item:!0,xs:7},r.a.createElement(E.a,{variant:"standard",sx:{minWidth:250}},r.a.createElement(S.a,null,"Demeaning"),r.a.createElement(k.a,{label:"Iterative Dynamic Demeaning",onChange:n("demean"),defaultValue:t.demean},M(F.a.iterativeDynamicDemeaning)))),r.a.createElement(O.a,{item:!0,xs:5},r.a.createElement(E.a,{variant:"standard",sx:{minWidth:100}},r.a.createElement(I.a,{label:"Rolling Window",title:"Only necessary when the demeaning method is dynamic. Must be an integer.",onChange:i("rollingWindow"),defaultValue:t.rollingWindow,disabled:c,error:void 0!==o.rollingWindow&&!c,helperText:void 0===o.rollingWindow||c?"":o.rollingWindow}))))))},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,this.preAnalysisTransformations(),this.bnFilterParameters(),r.a.createElement("br",null),r.a.createElement(b.a,{variant:"outlined",style:A.button,onClick:this.back},"Back"),r.a.createElement(b.a,{variant:"contained",style:A.button,onClick:this.continue},"Get Trend Decomposition"),r.a.createElement("br",null))}}]),t}(n.Component),A={button:{margin:20}},B=T,L=a(189),P=a(191),W=a(192);var V=function(e){var t=e.date;return r.a.createElement("div",null,r.a.createElement(L.b,{dateAdapter:W.a},r.a.createElement(P.a,{label:"Time Series Start Date",inputFormat:"dd/MM/yyyy",value:t,InputProps:{style:{width:220}},onChange:function(t){e.updateDate({target:{value:t}})},disabled:e.isDisabled,renderInput:function(e){return r.a.createElement(I.a,e)}})))},R=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),a.props.nextStep()},a.back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.handleChange,n=e.handleCheckboxChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"information"},r.a.createElement(x.a,{style:{fontSize:"x-large"}},"Data"),r.a.createElement("p",null,"Enter or paste in your chosen time series below.",r.a.createElement("br",null),"Each line must contain a numerical value. The next observation must start on the next line (and so on). For example, pasting a time series from a CSV will achieve the appropriate formatting.")),r.a.createElement("div",null,r.a.createElement(E.a,{variant:"standard",sx:{m:1,minWidth:300,paddingRight:2}},r.a.createElement(I.a,{multiline:!0,rows:20,label:"Time Series (y)",title:"Paste your chosen time series here",onChange:a("unprocessedY"),InputLabelProps:{shrink:!0},placeholder:"e.g."+new Array(100).join(" ")+"101.2"+new Array(100).join(" ")+"104.8"+new Array(100).join(" ")+"102.4"+new Array(100).join(" ")+"...",defaultValue:t.unprocessedY})),r.a.createElement("div",{style:{width:"450px",alignItems:"center",display:"inline-block"}},r.a.createElement(x.a,{light:!0,title:"This option does not make alterations to the data but changes the display of the graph output",style:{fontSize:"large"}},"Display Options"),r.a.createElement(O.a,{container:!0,direction:"column",sx:{minHeight:250,paddingTop:4},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(O.a,{item:!0,xs:4},r.a.createElement(V,{date:t.startDate,periodicity:t.periodicity,updateDate:a("startDate"),isDisabled:"n"===t.periodicity})),r.a.createElement(O.a,{item:!0,xs:4},r.a.createElement(E.a,{variant:"standard",sx:{minWidth:220}},r.a.createElement(S.a,null,"Data Frequency"),r.a.createElement(k.a,{title:"Time-series frequency",onChange:a("periodicity"),defaultValue:t.periodicity},M(F.a.periodicityManual)))),r.a.createElement(O.a,{item:!0,xs:4},r.a.createElement(E.a,{sx:{marginBottom:3,marginTop:2},variant:"standard"},r.a.createElement(w.a,{label:"95% Confidence Intervals",title:"Choose to display 95% confidence intervals in graph output",control:r.a.createElement(D.a,{size:"small",onChange:n("dispCycleCI"),checked:t.dispCycleCI})})))),r.a.createElement(O.a,{container:!0,direction:"column",sx:{minHeight:340},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(O.a,{item:!0,xs:3},r.a.createElement(b.a,{variant:"outlined",style:_.button,onClick:this.back},"Back"),r.a.createElement(b.a,{variant:"contained",style:_.button,onClick:this.continue},"Continue"))))))}}]),t}(n.Component),_={button:{margin:30},headingFormControlLabel:{fontSize:"large"}},U=R,z=a(97),Y=a.n(z),q=a(98),H=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"getCSVData",value:function(){var e=this.props.plotPageValues;return oe.colsToRows(["date"].concat(e.x),["cycle"].concat(e.cycle),e.dispCycleCI?["conf_int_lower_bound"].concat(e.cycleCILB):void 0,e.dispCycleCI?["conf_int_upper_bound"].concat(e.cycleCIUB):void 0)}},{key:"getPlot",value:function(){var e=this.props.plotPageValues;return console.log(e.x),console.log(e.y),r.a.createElement(Y.a,{layout:{autosize:!0,xaxis:{automargin:!0},yaxis:{automargin:!0,tickangle:"auto"}},data:[{x:e.x,y:e.cycle,type:"scatter",mode:"lines+markers",marker:{color:"blue"},name:"cycle",showlegend:!1},e.dispCycleCI?{x:e.x,y:e.cycleCILB,fill:"tonexty",fillcolor:"rgba(0, 0, 0, 0)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"}:{},e.dispCycleCI?{x:e.x,y:e.cycleCIUB,fill:"tonexty",fillcolor:"rgba(0,100,80,0.2)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"}:{}]})}},{key:"render",value:function(){var e=this.props.plotPageValues;return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("div",null,this.getPlot(),r.a.createElement("p",null," Delta: ",e.deltaCalc," ")),r.a.createElement(q.CSVLink,{filename:"BNF_cycle.csv",data:this.getCSVData()},"Download as CSV")),r.a.createElement(b.a,{variant:"outlined",style:Q.button,onClick:this.back},"Back"))}}]),t}(n.Component),Q={button:{margin:40}},Z=H,J=a(101);var K=function(){return r.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",paddingTop:"30vh"}},r.a.createElement(J.a,{height:75,width:75,color:"grey"}))},G=a(196),X=function(e){function t(){return Object(m.a)(this,t),Object(h.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{margin:"2px 20%"}},r.a.createElement(G.a,{variant:"filled",severity:"error",onClose:this.props.close},this.props.tagName))}}]),t}(n.Component),$=a(29),ee=a(77),te=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){throw new Error("Child class must implement this method")},a.getDateArray=function(e){var t=Object($.a)(Object($.a)(a)),n=Object($.a)(Object($.a)(a));return Array.from({length:e}).map(function(){return n=t,t=t.nextTimePeriod(),n})},a}return Object(f.a)(t,e),t}(Object(ee.a)(Date));te.createDate=function(e,t){switch(e){case"y":return new le(t);case"q":return new re(t);case"m":return new ne(t);case"w":return new ae(t);default:throw new Error("Non-existent key")}},te.getTruncatedDate=function(e){return"".concat(e.getDate(),"-").concat(e.getMonth()+1,"-").concat(e.getFullYear())};var ae=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){var e=new t(Object($.a)(Object($.a)(a)));return new t(e.setDate(a.getDate()+7))},a}return Object(f.a)(t,e),t}(te),ne=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){var e=new t(Object($.a)(Object($.a)(a)));return new t(e.setMonth(a.getMonth()+1))},a}return Object(f.a)(t,e),t}(te),re=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){var e=new t(Object($.a)(Object($.a)(a)));return new t(e.setMonth(a.getMonth()+3))},a}return Object(f.a)(t,e),t}(te),le=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){var e=new t(Object($.a)(Object($.a)(a)));return new t(e.setFullYear(a.getFullYear()+1))},a}return Object(f.a)(t,e),t}(te),ie=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).state={step:1,unprocessedY:"",x:[],y:[],fixedDelta:.1,deltaSelect:2,demean:"sm",iterativeBackcasting:!0,isAutomaticWindow:!1,rollingWindow:40,periodicity:"q",startDate:null,transform:!1,dCode:"nd",pCode:"np",takeLog:!1,cycle:[],dispCycleCI:!1,cycleCI:[],deltaCalc:void 0,cycleCILB:[],cycleCIUB:[],loading:!0,errorMessage:{}},a.loading=!0,a.baseBackendURL="https://bn-filtering.herokuapp.com",a.bnfUserSpecifiedDataSlug="/bnf/user-specified-time-series",a.bnfFredDataSlug="/bnf/fred-time-series",a.fredDataSlug="/fred-time-series",a.nextStep=function(){var e=a.state.step;a.setState({step:e+1})},a.prevStep=function(){var e=a.state.step;a.setState({step:e-1})},a.cancelLoad=function(){a.setState({loading:null})},a.handleChange=function(e){return function(t){a.setState(Object(d.a)({},e,t.target.value))}},a.handleCheckboxChange=function(e){return function(t){a.setState(Object(d.a)({},e,t.target.checked))}},a.setErrorMessage=function(e,t){a.setState(Object(d.a)({},"errorMessage",Object(u.a)({},a.state.errorMessage,Object(d.a)({},e,t))))},a.handleNumberFieldChange=function(e){return function(t){if(console.log(t.target.value),isNaN(t.target.value))a.setErrorMessage(e,"must be numeric");else if(t.target.value<F.b[e].min)a.setErrorMessage(e,"too small. must be \u2265 ".concat(F.b[e].min));else if(t.target.value>F.b[e].max)a.setErrorMessage(e,"too large. must be \u2264 ".concat(F.b[e].max));else{var n=Object(u.a)({},a.state);delete n.errorMessage[e],a.setState(n)}a.handleChange(e)(t)}},a.handleIntegerNumberFieldChange=function(e){return function(t){t.target.value%1!==0&&a.setErrorMessage(e,"must be an integer"),a.handleNumberFieldChange(e)(t)}},a.getResults=Object(s.a)(c.a.mark(function e(){var n,r,l;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.state.y=a.state.unprocessedY.replace(/(,?(\r\n|\n|\r))|(,\s)/gm,",").split(",").filter(function(e){return""!==e}),n=function(e,t){return e+t[0].toString()+"="+t[1].toString()+"&"},r=[["window",a.state.rollingWindow],["delta_select",a.state.deltaSelect],["fixed_delta",a.state.fixedDelta],["ib",a.state.iterativeBackcasting],["demean",a.state.demean],["processed_y",a.state.y]].concat([["transform",a.state.transform]].concat(a.state.transform?[["p_code",a.state.pCode],["d_code",a.state.dCode],["take_log",a.state.takeLog]]:[])).reduce(n,"?"),l=a.baseBackendURL+a.bnfUserSpecifiedDataSlug+r,console.log(l),a.setState({loading:!0},Object(s.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:fetch(l).then(function(e){if(200!==e.status)throw a.cancelLoad(),new X("bad status");return e}).then(function(e){return e.json()}).then(function(e){console.log("Success:",e);var n=e.cycle.map(function(e){return Number(e)}),r=e.ci.map(function(e){return Number(e)}),l=Number(e.delta);a.setState({x:"n"!==a.state.periodicity?te.createDate(a.state.periodicity,a.state.startDate).getDateArray(n.length).map(te.getTruncatedDate):Array.from({length:n.length},function(e,t){return t+1}),cycle:n,cycleCI:r,deltaCalc:l,cycleCILB:t.confIntZip(n,r,"lb"),cycleCIUB:t.confIntZip(n,r,"ub"),loading:!1})}).catch(function(e){console.log(e)});case 1:case"end":return e.stop()}},e)})));case 6:case"end":return e.stop()}},e)})),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=this.state.step,a=this.state,n=a.x,l=a.y,i=a.unprocessedY,o=a.fixedDelta,c=a.deltaSelect,s=a.demean,u=a.iterativeBackcasting,d=a.isAutomaticWindow,m=a.rollingWindow,p=a.periodicity,h=a.startDate,g=a.transform,f=a.dCode,b=a.pCode,y=a.takeLog,v=a.cycle,x=a.deltaCalc,E=a.dispCycleCI,w=a.cycleCILB,j=a.cycleCIUB,D=a.errorMessage,O={y:l,unprocessedY:i,startDate:h,periodicity:p,fixedDelta:o,deltaSelect:c,demean:s,iterativeBackcasting:u,isAutomaticWindow:d,rollingWindow:m,transform:g,dCode:f,pCode:b,takeLog:y,dispCycleCI:E},S={x:n,y:l,cycle:v,deltaCalc:x,dispCycleCI:E,cycleCILB:w,cycleCIUB:j,periodicity:p,startDate:h};return r.a.createElement(r.a.Fragment,null,function(){switch(t){case 2:return r.a.createElement(U,{nextStep:e.nextStep,prevStep:e.prevStep,handleChange:e.handleChange,handleCheckboxChange:e.handleCheckboxChange,values:O});case 3:return r.a.createElement(r.a.Fragment,null,null===e.state.loading?r.a.createElement(X,{tagName:"During the running of the BN filter a problem occurred. Please check that the inputs are appropriate.",close:function(){e.setState({loading:!1})}}):null,r.a.createElement(B,{nextStep:e.nextStep,prevStep:e.prevStep,cancelLoad:e.cancelLoad,handleChange:e.handleChange,handleNumberFieldChange:e.handleNumberFieldChange,handleIntegerNumberFieldChange:e.handleIntegerNumberFieldChange,handleCheckboxChange:e.handleCheckboxChange,getResults:e.getResults,values:O,errors:D}));case 4:return r.a.createElement(r.a.Fragment,null,!0===e.state.loading?K():!1===e.state.loading?r.a.createElement(Z,{prevStep:e.prevStep,plotPageValues:S}):void e.prevStep());default:return r.a.createElement(C,{nextStep:e.nextStep,handleChange:e.handleChange})}}())}}]),t}(n.Component);ie.confIntZip=function(e,t,a){return e.map(function(e,n){return"lb"===a?e-t[n]:e+t[n]})},ie.colsToRows=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];for(var n=(t=t.filter(function(e){return void 0!==e})).length,r=t[0].length,l=[],i=0;i<r;i++){for(var o=[],c=0;c<n;c++)o.push(t[c][i]);l.push(o)}return l};var oe=ie;var ce=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"appHeader"},"BN Filter Trend-Cycle Decomposition"),r.a.createElement("div",{className:"information welcomeInformation"},r.a.createElement("p",null,"This tool performs trend-cycle decomposition. It is implemented using the Beveridge-Nelson filter method described in ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3434174"},"Kamber, Morley, and Wong"),". Please note that this website is still in development so some features are yet to be implemented/completed.")),r.a.createElement(oe,null))},se=function(e){e&&e instanceof Function&&a.e(1).then(a.bind(null,190)).then(function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,l=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),l(e),i(e)})};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ce,null)),document.getElementById("root")),se()},39:function(e){e.exports={b:{fixedDelta:{min:.05,max:1},rollingWindow:{min:26,max:500}},a:{periodicityManual:[{value:"y",text:"Yearly"},{value:"q",text:"Quarterly"},{value:"m",text:"Monthly"},{value:"w",text:"Weekly"},{value:"n",text:"Undated/Unspecified"}],iterativeDynamicDemeaning:[{value:"sm",text:"Constant (Static Demeaning)"},{value:"dm",text:"Dynamic Demeaning"},{value:"idm",text:"Iterative Dynamic Demeaning"}],deltaSelect:[{value:0,text:"Fixed Delta"},{value:1,text:"Maximize Amplitude-to-Noise Ratio"},{value:2,text:"Minimize Stochastic Trend Volatility"}],dCode:[{value:"nd",text:"No Differencing (Levels)"},{value:"d1",text:"1 Period Difference"},{value:"d4",text:"4 Period Difference (for Quarterly Data)"},{value:"d12",text:"12 Period Difference (for Monthly Data)"}],pCode:[{value:"np",text:"No Change"},{value:"p1",text:"Multiply by 100"},{value:"p4",text:"Multiply by 400 (Annualized Quarterly Rate)"},{value:"p12",text:"Multiply by 1200 (Annualized Monthly Rate)"}]}}},62:function(e,t,a){}},[[116,3,2]]]);
//# sourceMappingURL=main.ad1285a1.chunk.js.map
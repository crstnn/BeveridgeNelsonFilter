(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{120:function(e,t,a){e.exports=a(141)},125:function(e,t,a){},141:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(44),l=a.n(i),o=(a(125),a(69),a(28)),c=a.n(o),s=a(37),u=a(60),d=a(4),m=a(17),p=a(23),h=a(20),g=a(18),f=a(19),v=a(213),y=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),a.props.nextStep()},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement("p",null,"You will be guided through the steps to perform trend-cycle decomposition on either:"),r.a.createElement("ol",null,r.a.createElement("li",null,"A time series from the Federal Reserve Economic Database (FRED) using its mnemonic, or"),r.a.createElement("li",null,"A time series of your choosing, to be pasted into a field")),r.a.createElement("p",null,"Note that there is additional information provided when hovering over the options in the subsequent pages. The cycle is reported and can be downloaded as a CSV.")),r.a.createElement(v.a,{variant:"contained",style:E.button,onClick:this.continue},"Continue"),r.a.createElement("br",null))}}]),t}(n.Component),E={button:{minHeight:"45px",minWidth:"100px",margin:"30px 0 100px"}},b=y,D=a(194),x=a(214),C=a(211),w=a(219),F=a(209),S=a(212),j=a(206),k=a(223),T=a(15),R=a(210),O=function(e){return e.map(function(e){return r.a.createElement(R.a,{value:e.value},e.text)})},I=function(e){var t={};return e.forEach(function(e){return t[e.value]=e.hoverText}),function(e){return t[e]}},M=a(208),N=function(e){function t(){return Object(m.a)(this,t),Object(h.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{margin:"2px 20%"}},r.a.createElement(M.a,{variant:"filled",severity:"error",onClose:this.props.close},this.props.tagName))}}]),t}(n.Component),A=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(i)))).isDisabled={rollingWindow:function(){return"sm"===a.props.values.demean},delta:function(){return!1}},a.isError=function(e){return void 0!==a.props.errors[e]},a.isErrorDisplaying=function(e){return a.isError(e)&&(void 0===a.isDisabled[e]||!a.isDisabled[e]())},a.errorsDisplayedCount=function(){return Object.keys(a.props.errors).map(function(e){return a.isErrorDisplaying(e)}).filter(function(e){return e}).length},a.continue=function(e){e.preventDefault();var t=a.props,n=t.getResults,r=t.getFREDResults,i=t.handlers,l=t.values,o=t.errors,c=t.cancelLoad;"FRED"===l.dataInputType&&void 0!==o.mnemonic?(i.handleChange("alertErrorType")({target:{value:"INPUT_USER_M"}}),c()):"USER"===l.dataInputType&&void 0!==o.unprocessedY?(i.handleChange("alertErrorType")({target:{value:"INPUT_USER_S"}}),c()):0===a.errorsDisplayedCount()?("FRED"===l.dataInputType?r():"USER"===l.dataInputType&&n(),a.props.nextStep()):(i.handleChange("alertErrorType")({target:{value:"INPUT_PARAM"}}),c())},a.back=function(e){e.preventDefault(),a.props.prevStep()},a.preAnalysisTransformations=function(){var e=a.props,t=e.values,n=e.handlers,i=n.handleChange,l=n.handleCheckboxChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"information"},r.a.createElement(D.a,{style:{fontSize:"x-large"}},"Transformations")),r.a.createElement(x.a,{container:!0,direction:"column",justifyContent:"space-evenly",alignItems:"center",spacing:3},r.a.createElement(x.a,{item:!0,xs:4},r.a.createElement(C.a,{variant:"standard"},r.a.createElement(w.a,{label:"Natural Logarithm",title:"Logarithm to the base of Euler's number",control:r.a.createElement(F.a,{size:"small",onChange:l("takeLog"),checked:t.takeLog,disabled:!t.transform})}))),r.a.createElement(x.a,{item:!0,xs:4},r.a.createElement(C.a,{variant:"standard",sx:{minWidth:350}},r.a.createElement(S.a,null,"Differencing Method"),r.a.createElement(j.a,{title:"Differencing method applied",onChange:i("dCode"),value:t.dCode,disabled:!t.transform},O(T.c.optionField.dCode.option)))),r.a.createElement(x.a,{item:!0,xs:4},r.a.createElement(C.a,{variant:"standard",sx:{minWidth:350}},r.a.createElement(S.a,null,"Computed Percentages"),r.a.createElement(j.a,{title:"Multiple applied",onChange:i("pCode"),value:t.pCode,disabled:!t.transform},O(T.c.optionField.pCode.option))))))},a.bnFilterParameters=function(){var e=a.props,t=e.values,n=e.handlers,i=n.handleChange,l=n.handleNumberFieldChange,o=n.handleIntegerNumberFieldChange,c=a.props.errors;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"information",style:{marginTop:"35px"}},r.a.createElement(D.a,{style:{fontSize:"x-large"}},"Filter Parameters")),r.a.createElement("div",{style:{width:"420px",alignItems:"center",display:"inline-block"}},r.a.createElement(x.a,{container:!0,alignItems:"flex-start",justifyContent:"space-evenly",spacing:3},r.a.createElement(x.a,{item:!0,xs:7.75},r.a.createElement(C.a,{variant:"standard",sx:{width:280}},r.a.createElement(S.a,null,"Signal-to-Noise Ratio (Delta)"),r.a.createElement(j.a,{label:"Signal-to-Noise Ratio (Delta)",title:I(T.c.optionField.deltaSelect.option)(t.deltaSelect),onChange:i("deltaSelect"),value:t.deltaSelect},O(T.c.optionField.deltaSelect.option)))),r.a.createElement(x.a,{item:!0,xs:4.25},r.a.createElement(C.a,{variant:"standard",sx:{width:140}},r.a.createElement(k.a,{label:0===t.deltaSelect?"Fixed Delta":"Minimum Delta",title:0===t.deltaSelect?"Fixed delta for estimation":"Minimum threshold start point for grid search (with grid increments of 0.0005)",onChange:l("delta"),value:t.delta,disabled:a.isDisabled.delta(),error:a.isErrorDisplaying("delta"),helperText:a.isErrorDisplaying("delta")?c.delta:"\u200b"}))),r.a.createElement(x.a,{item:!0,xs:7.75},r.a.createElement(C.a,{variant:"standard",sx:{minWidth:280}},r.a.createElement(S.a,null,"Demeaning"),r.a.createElement(j.a,{label:"Demeaning",title:I(T.c.optionField.iterativeDynamicDemeaning.option)(t.demean),onChange:i("demean"),value:t.demean},O(T.c.optionField.iterativeDynamicDemeaning.option)))),r.a.createElement(x.a,{item:!0,xs:4.25},r.a.createElement(C.a,{variant:"standard",sx:{minWidth:140}},r.a.createElement(k.a,{label:"Rolling Window",title:"Only active when using dynamic demeaning. Upper bound is two less than the number of observations",onChange:o("rollingWindow"),value:t.rollingWindow,disabled:a.isDisabled.rollingWindow(),error:a.isErrorDisplaying("rollingWindow"),helperText:a.isErrorDisplaying("rollingWindow")?c.rollingWindow:"\u200b"}))))))},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{minHeight:600}},null===this.props.values.loading?r.a.createElement(N,{tagName:T.b[this.props.values.alertErrorType],close:function(){e.props.handlers.handleChange("loading")({target:{value:!1}})}}):null,this.preAnalysisTransformations(),this.bnFilterParameters()),r.a.createElement(v.a,{variant:"outlined",style:q.button,onClick:this.back},"Back"),r.a.createElement(v.a,{variant:"contained",style:q.button,onClick:this.continue},"Get Trend Decomposition"))}}]),t}(n.Component),q={button:{minHeight:"45px",minWidth:"100px",margin:"0 20px 100px"}},P=A,U=a(216),_=a(226),B=a(225),W=a(224),L=a(205),Y=a(102),z=a(203),V=a(204);var H=function(e){var t=e.date;return r.a.createElement("div",null,r.a.createElement(Y.a,{dateAdapter:V.a},r.a.createElement(z.a,{label:e.label,inputFormat:"dd/MM/yyyy",value:t,minDate:e.minDate,maxDate:e.maxDate,InputProps:{style:{width:220}},onChange:function(t){console.log("pre-handleDateChange: ",t),e.updateDate({target:{value:t}})},disabled:e.isDisabled,renderInput:function(t){return r.a.createElement(k.a,Object.assign({},t,{title:e.title,InputLabelProps:{shrink:!0},inputProps:Object(u.a)({},t.inputProps,{placeholder:"DD/MM/YYYY"})}))}})))},K=function(e,t,a){return e.map(function(e,n){return"lb"===a?e-t[n]:e+t[n]})},Q=function(e,t){return e+t[0].toString()+"="+t[1].toString()+"&"},G=function(e){return e.reduce(Q,"?")};function J(e){return $.apply(this,arguments)}function $(){return($=Object(s.a)(c.a.mark(function e(t){var a,n,r;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=new AbortController,n=setTimeout(function(){return a.abort()},2e4),e.next=4,fetch(t,{signal:a.signal});case 4:return r=e.sent,clearTimeout(n),e.abrupt("return",r);case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}var X=a(73),Z=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(i)))).state={mnemonic:a.props.values.mnemonic,loading:!1,timeoutError:!1},a.createFilteredFrequencies=function(){var e=T.c.optionField.frequencyFRED.option.filter(function(e){return a.props.values.availableFrequencies.includes(e.value)});return O(e)},a.checkAvailability=function(){var e=G([["fred_abbr",a.state.mnemonic]]),t=T.a.baseBackendURL+T.a.fredDataSlug+e;a.setState({loading:!0},Object(s.a)(c.a.mark(function e(){var n,r,i,l,o;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a.props,r=n.handleChange,i=n.setErrorMessage,l=n.deleteErrorMessage,o=function(){a.setState({timeoutError:!1,loading:!1})},J(t).catch(function(e){throw a.setState({timeoutError:!0,loading:!1}),i("mnemonic","Internal error: Come back later"),e}).then(function(e){if(200!==e.status)throw o(),i("mnemonic","mnemonic is not available"),new N("bad status");return e}).then(function(e){return e.json()}).then(function(e){console.log("Success:",e);var t=e.start_date.split("-").map(function(e){return Number(e)}),n=e.end_date.split("-").map(function(e){return Number(e)}),i=new Date(t[0],t[1]-1,t[2]),c=new Date(n[0],n[1]-1,n[2]);console.log("response: startDate: ",i),console.log("response: endDate: ",c),l("mnemonic"),r("availableFrequencies")({target:{value:e.available_frequencies}}),r("frequencyFRED")({target:{value:e.available_frequencies[0]}}),r("mnemonic")({target:{value:a.state.mnemonic}}),r("startDateFRED")({target:{value:i}}),r("endDateFRED")({target:{value:c}}),r("minDate")({target:{value:i}}),r("maxDate")({target:{value:c}}),o()}).catch(function(e){console.log(e)});case 3:case"end":return e.stop()}},e)})))},a.mnemonicInput=function(){var e=a.props,t=e.values,n=e.errors;return r.a.createElement(x.a,{container:!0,direction:"column",sx:{minHeight:80,marginBottom:1},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(x.a,{item:!0},r.a.createElement(B.a,{row:!0},r.a.createElement(ee,{variant:"outlined",label:"FRED mnemonic",title:"Press enter or click 'check' to check the availability of the mnemonic",color:void 0===n.mnemonic&&""!==t.mnemonic?"success":null,placeholder:"e.g. GDPC1",sx:{width:250},error:void 0!==n.mnemonic,onChange:function(e){return a.setState({mnemonic:e.target.value})},onKeyDown:function(e){return 13===e.keyCode?a.checkAvailability(e):null},value:a.state.mnemonic,InputProps:{endAdornment:a.state.loading?r.a.createElement(X.b,{height:30,width:30,color:"grey"}):null}}),r.a.createElement(te,{onClick:a.checkAvailability,variant:"outlined"},"Check")),r.a.createElement(W.a,null,void 0===n.mnemonic&&""===t.mnemonic&&!0!==a.state.timeoutError?"\u200b":void 0!==n.mnemonic?n.mnemonic:"mnemonic is available")))},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.handleChange,n=e.handleCheckboxChange;return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement("p",null,"Choose a ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://fred.stlouisfed.org/tags/series"},"FRED mnemonic")," and check its availability before continuing.")),r.a.createElement("div",{style:{width:"420px",alignItems:"center",display:"inline-block"}},this.mnemonicInput(),r.a.createElement("div",{className:"dataInformation"},r.a.createElement(D.a,{title:"This option does not make alterations to the data but changes the display of the graph output",style:{fontSize:"large"}},"Options")),r.a.createElement(x.a,{container:!0,direction:"column",sx:{minHeight:340},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(x.a,{item:!0,xs:3},r.a.createElement(H,{label:"Start Date",title:"Series' start date (inclusive). Determined by FRED",date:t.startDateFRED,minDate:t.minDate,maxDate:t.maxDate,updateDate:a("startDateFRED")})),r.a.createElement(x.a,{item:!0,xs:3},r.a.createElement(H,{label:"End Date",title:"Series' end date (inclusive). Determined by FRED",date:t.endDateFRED,minDate:t.minDate,maxDate:t.maxDate,updateDate:a("endDateFRED")})),r.a.createElement(x.a,{item:!0,xs:3},r.a.createElement(C.a,{variant:"standard",sx:{minWidth:220}},r.a.createElement(S.a,null,"Frequency"),r.a.createElement(j.a,{title:"Time-series frequency (default aggregation method: averaging)",onChange:a("frequencyFRED"),value:t.frequencyFRED},this.createFilteredFrequencies()))),r.a.createElement(x.a,{item:!0,xs:3},r.a.createElement(C.a,{sx:{marginBottom:3,marginTop:2},variant:"standard"},r.a.createElement(w.a,{label:"95% Confidence Intervals",title:"Choose to report 95% confidence intervals in graph and CSV",control:r.a.createElement(F.a,{size:"small",onChange:n("dispCycleCI"),checked:t.dispCycleCI})}))))))}}]),t}(n.Component),ee=Object(L.a)({root:{"& fieldset":{borderTopRightRadius:0,borderBottomRightRadius:0,borderRight:0}}})(k.a),te=Object(L.a)({root:{borderTopLeftRadius:0,borderBottomLeftRadius:0,backgroundColor:"#ede8e8",borderColor:"#454545",color:"black"}})(v.a),ae=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).handleTimeSeriesChange=function(e){e.preventDefault();var t=e.target.value,n=a.props,r=n.setErrorMessage,i=n.deleteErrorMessage,l=n.handleChange,o=new RegExp(/[^\d.,\s]+/),c=new RegExp(/^((\d*(.\d+)?),\s*)+(\d*(.\d+)?)\s*$/),s=new RegExp(/^((\d*(.\d+)?)(\r\n|\n|\r))*((\d*(.\d+)?)(\r\n|\n|\r)?)$/),u=o.test(t),d=c.test(t),m=s.test(t),p=null;""===t||d||m?i("unprocessedY"):u?p="only accepts numbers, commas, and periods":d||m||(p="bad input format"),null!==p&&r("unprocessedY",p),l("unprocessedY")(e)},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.errors,n=e.handleChange,i=e.handleCheckboxChange;return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement("p",null,"Enter or paste in your chosen time series below. Pasting a time series from a CSV or array will achieve the appropriate formatting.")),r.a.createElement(C.a,{variant:"standard",sx:{m:1,minWidth:300,paddingRight:2}},r.a.createElement(k.a,{multiline:!0,rows:16,label:"Time Series (y)",title:"Paste your chosen time series here",onChange:this.handleTimeSeriesChange,InputLabelProps:{shrink:!0},placeholder:"e.g. "+new Array(100).join(" ")+"101.2, 104.8, 102.4, ..."+new Array(100).join(" ")+"e.g."+new Array(100).join(" ")+"101.2"+new Array(100).join(" ")+"104.8"+new Array(100).join(" ")+"102.4"+new Array(100).join(" ")+"...",value:t.unprocessedY,error:void 0!==a.unprocessedY,helperText:void 0!==a.unprocessedY?a.unprocessedY:"\u200b"})),r.a.createElement("div",{style:{width:"420px",alignItems:"center",display:"inline-block"}},r.a.createElement("div",{className:"dataInformation"},r.a.createElement(D.a,{title:"This option does not make alterations to the data but changes the display of the graph output",style:{fontSize:"large"}},"Display Options")),r.a.createElement(x.a,{container:!0,direction:"column",sx:{minHeight:400,paddingTop:2},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(x.a,{item:!0,xs:4},r.a.createElement(H,{label:"Start Date",title:"Series' start date (inclusive). The end date is determined based on frequency",date:t.startDate,updateDate:this.props.handleChange("startDate"),isDisabled:"n"===t.frequency})),r.a.createElement(x.a,{item:!0,xs:4},r.a.createElement(C.a,{variant:"standard",sx:{minWidth:220}},r.a.createElement(S.a,null,"Frequency"),r.a.createElement(j.a,{title:"Time-series frequency",onChange:n("frequency"),value:t.frequency},O(T.c.optionField.frequencyManual.option)))),r.a.createElement(x.a,{item:!0,xs:4},r.a.createElement(C.a,{sx:{marginBottom:3,marginTop:2},variant:"standard"},r.a.createElement(w.a,{label:"95% Confidence Intervals",title:"Choose to display 95% confidence intervals in graph output",control:r.a.createElement(F.a,{size:"small",onChange:i("dispCycleCI"),checked:t.dispCycleCI})}))))))}}]),t}(n.Component),ne=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).toggleDataInputType=function(e){var t=a.props,n=t.errors,r=t.valuesUserData,i=t.valuesFREDData,l=t.handleChange,o=t.deleteErrorMessage;void 0!==n.mnemonic&&"FRED"===i.dataInputType&&o("mnemonic"),void 0!==n.unprocessedY&&"USER"===r.dataInputType&&o("unprocessedY"),l("dataInputType")(e)},a.continue=function(e){e.preventDefault();var t=a.props,n=t.valuesUserData,r=t.valuesFREDData,i=t.setErrorMessage;(0,t.nextStep)(),"FRED"===r.dataInputType&&""===r.mnemonic&&i("mnemonic","mnemonic cannot be empty"),"USER"===n.dataInputType&&""===n.unprocessedY&&i("unprocessedY","time series field cannot be empty"),console.log(n)},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.valuesUserData,a=e.errors,n=e.valuesFREDData,i=e.setErrorMessage,l=e.deleteErrorMessage,o=e.handleChange,c=e.handleCheckboxChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{minHeight:600}},r.a.createElement("div",{className:"information"},r.a.createElement(D.a,{style:{fontSize:"x-large"}},r.a.createElement(U.a,{color:"primary",value:t.dataInputType,exclusive:!0,onChange:this.toggleDataInputType},r.a.createElement(_.a,{value:"FRED"},"FRED Series"),r.a.createElement(_.a,{value:"USER"},"User Series")))),"USER"===t.dataInputType?r.a.createElement(ae,{setErrorMessage:i,deleteErrorMessage:l,handleChange:o,handleCheckboxChange:c,values:t,errors:a}):"FRED"===t.dataInputType?r.a.createElement(Z,{setErrorMessage:i,deleteErrorMessage:l,handleChange:o,handleCheckboxChange:c,values:n,errors:a}):void 0),r.a.createElement(x.a,{container:!0,direction:"column",justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(x.a,{item:!0,xs:3},r.a.createElement(v.a,{variant:"outlined",style:re.button,onClick:this.props.prevStep},"Back"),r.a.createElement(v.a,{variant:"contained",style:re.button,onClick:this.continue},"Continue"))))}}]),t}(n.Component),re={button:{minHeight:"45px",minWidth:"100px",margin:"0 20px 100px"},headingFormControlLabel:{fontSize:"large"}},ie=a(99),le=a.n(ie),oe=a(100),ce=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).fileName="BNF_cycle.csv",a.back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"getCSVData",value:function(){var e=this.props.plotPageValues;return function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];for(var n=(t=t.filter(function(e){return void 0!==e})).length,r=t[0].length,i=[],l=0;l<r;l++){for(var o=[],c=0;c<n;c++)o.push(t[c][l]);i.push(o)}return i}(["date"].concat(e.x),[("FRED"===e.dataInputType?"".concat(e.mnemonic,"_"):"")+"original_y"].concat(e.y),["cycle"].concat(e.cycle),e.dispCycleCI?["conf_int_lower_bound"].concat(e.cycleCILB):void 0,e.dispCycleCI?["conf_int_upper_bound"].concat(e.cycleCIUB):void 0)}},{key:"getPlot",value:function(){var e=this.props.plotPageValues;return console.log(e.x),console.log(e.y),r.a.createElement(le.a,{layout:{autosize:!0,xaxis:{automargin:!0},yaxis:{automargin:!0,tickangle:"auto"},width:window.screen.width<=700?450:700,margin:{l:20,r:20,b:20,t:20,pad:5}},data:[{x:e.x,y:e.cycle,type:"scatter",mode:"lines+markers",marker:{color:"blue"},name:"cycle",showlegend:!1},e.dispCycleCI?{x:e.x,y:e.cycleCILB,fill:"tonexty",fillcolor:"rgba(0, 0, 0, 0)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"}:{},e.dispCycleCI?{x:e.x,y:e.cycleCIUB,fill:"tonexty",fillcolor:"rgba(0,100,80,0.2)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"}:{}]})}},{key:"render",value:function(){var e=this.props.plotPageValues;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{minHeight:600}},r.a.createElement("div",null,this.getPlot(),r.a.createElement("p",null," Delta: ",e.deltaCalc.toFixed(4)," ")),r.a.createElement(oe.CSVLink,{style:{textDecoration:"underline"},filename:this.fileName,data:this.getCSVData()},"Download as CSV")),r.a.createElement(v.a,{variant:"outlined",style:se.button,onClick:this.back},"Back"))}}]),t}(n.Component),se={button:{minHeight:"45px",minWidth:"100px",margin:"0 20px 100px"}},ue=ce;var de=function(){return r.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",paddingTop:"30vh"}},r.a.createElement(X.a,{height:75,width:75,color:"grey"}))},me=a(33),pe=a(101),he=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){throw new Error("Child class must implement this method")},a.getDateArray=function(e){var t=Object(me.a)(Object(me.a)(a)),n=Object(me.a)(Object(me.a)(a));return Array.from({length:e}).map(function(){return n=t,t=t.nextTimePeriod(),n})},a}return Object(f.a)(t,e),t}(Object(pe.a)(Date));he.createDate=function(e,t){switch(e){case"a":return new ye(t);case"q":return new ve(t);case"m":return new fe(t);case"w":return new ge(t);default:throw new Error("Non-existent key")}},he.toFixedTwoDigits=function(e){return 1===e.toString().length?"0"+e:e},he.getTruncatedDate=function(e){return"".concat(e.getFullYear(),"-").concat(he.toFixedTwoDigits(e.getMonth()+1),"-").concat(he.toFixedTwoDigits(e.getDate()))};var ge=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){var e=new t(Object(me.a)(Object(me.a)(a)));return new t(e.setDate(a.getDate()+7))},a}return Object(f.a)(t,e),t}(he),fe=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){var e=new t(Object(me.a)(Object(me.a)(a)));return new t(e.setMonth(a.getMonth()+1))},a}return Object(f.a)(t,e),t}(he),ve=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){var e=new t(Object(me.a)(Object(me.a)(a)));return new t(e.setMonth(a.getMonth()+3))},a}return Object(f.a)(t,e),t}(he),ye=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){var e=new t(Object(me.a)(Object(me.a)(a)));return new t(e.setFullYear(a.getFullYear()+1))},a}return Object(f.a)(t,e),t}(he),Ee=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).state={step:1,dataInputType:"FRED",mnemonic:"",unprocessedY:"",x:[],y:[],delta:T.c.freeText.delta.default,deltaSelect:2,demean:T.c.optionField.iterativeDynamicDemeaning.default,iterativeBackcasting:!0,rollingWindow:T.c.freeText.rollingWindow.default,frequency:T.c.optionField.frequencyManual.default,startDate:null,endDate:null,startDateFRED:null,minDate:null,maxDate:null,endDateFRED:null,availableFrequencies:[],frequencyFRED:T.c.optionField.frequencyFRED.default,transform:!0,dCode:T.c.optionField.dCode.default,pCode:T.c.optionField.pCode.default,takeLog:!1,cycle:[],dispCycleCI:!1,cycleCI:[],deltaCalc:void 0,cycleCILB:[],cycleCIUB:[],loading:!0,alertErrorType:null,fieldErrorMessages:{}},a.nextStep=function(){var e=a.state.step;a.setState({step:e+1})},a.prevStep=function(){var e=a.state.step;a.setState({step:e-1})},a.cancelLoading=function(){a.setState({loading:null})},a.handleChange=function(e){return function(t){a.setState(Object(d.a)({},e,t.target.value))}},a.handleCheckboxChange=function(e){return function(t){a.setState(Object(d.a)({},e,t.target.checked))}},a.setErrorMessage=function(e,t){a.setState({fieldErrorMessages:Object(u.a)({},a.state.fieldErrorMessages,Object(d.a)({},e,t))})},a.deleteErrorMessage=function(e){var t=Object(u.a)({},a.state.fieldErrorMessages);delete t[e],a.setState({fieldErrorMessages:t})},a.isEmptyString=function(e,t){return""===e&&(a.setErrorMessage(t,"must not be empty"),!0)},a.isNotANum=function(e,t){return!!isNaN(e)&&(a.setErrorMessage(t,"must be numeric"),!0)},a.isNotAnInt=function(e,t){return e%1!==0&&(a.setErrorMessage(t,"must be an integer"),!0)},a.isExceedsMinMax=function(e,t){return null!==T.c.freeText[t].min&&e<T.c.freeText[t].min?(a.setErrorMessage(t,"must be \u2265 ".concat(T.c.freeText[t].min)),!0):null!==T.c.freeText[t].max&&e>T.c.freeText[t].max&&(a.setErrorMessage(t,"must be \u2264 ".concat(T.c.freeText[t].max)),!0)},a.handleErrorField=function(e){return function(t,n){e&&a.deleteErrorMessage(t),a.setState(Object(d.a)({},t,n))}},a.validateField=function(e,t,n){var r=n.target.value,i=e.reduce(function(e,a){return!!e||(a(r,t)||e)},!1);a.handleErrorField(!i)(t,r)},a.handleNumberFieldChange=function(e){return function(t){a.validateField([a.isEmptyString,a.isNotANum,a.isExceedsMinMax],e,t)}},a.handleIntegerNumberFieldChange=function(e){return function(t){a.validateField([a.isEmptyString,a.isNotAnInt,a.isNotANum,a.isExceedsMinMax],e,t)}},a.handleChangeValidation=function(e){return function(t){return function(n){a.validateField(n,e,t)}}},a.bnfParamArr=function(){return[["window",a.state.rollingWindow],["delta_select",a.state.deltaSelect],["delta",a.state.delta],["ib",a.state.iterativeBackcasting],["demean",a.state.demean]].concat([["transform",a.state.transform]].concat(a.state.transform?[["p_code",a.state.pCode],["d_code",a.state.dCode],["take_log",a.state.takeLog]]:[]))},a.fetchResultWithErrorHandling=function(){var e=Object(s.a)(c.a.mark(function e(t){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",J(t).catch(function(e){throw a.setState({alertErrorType:"TIMEOUT"}),a.prevStep(),a.cancelLoading(),e}).then(function(e){if(200!==e.status)throw a.setState({alertErrorType:"SERVER"}),a.prevStep(),a.cancelLoading(),new N("bad status");return e.json()}));case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.getResultsForFREDData=Object(s.a)(c.a.mark(function e(){var t,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=G([["fred_abbr",a.state.mnemonic],["freq",a.state.frequencyFRED],["obs_start",he.getTruncatedDate(a.state.startDateFRED)],["obs_end",he.getTruncatedDate(a.state.endDateFRED)]].concat(a.bnfParamArr())),n=T.a.baseBackendURL+T.a.bnfFredDataSlug+t,console.log(n),a.setState({loading:!0},Object(s.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.fetchResultWithErrorHandling(n).then(function(e){console.log("Success:",e);var t=e.cycle.map(function(e){return Number(e)}),n=e.ci.map(function(e){return Number(e)}),r=Number(e.delta);a.setState({x:e.dates,y:e.y,cycle:t,cycleCI:n,deltaCalc:r,cycleCILB:K(t,n,"lb"),cycleCIUB:K(t,n,"ub"),loading:!1})}).catch(function(e){console.log(e)});case 1:case"end":return e.stop()}},e)})));case 4:case"end":return e.stop()}},e)})),a.getResultsForUserSpecifiedData=Object(s.a)(c.a.mark(function e(){var t,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.state.y=a.state.unprocessedY.replace(/(,?(\r\n|\n|\r))|(,\s)/gm,",").split(",").filter(function(e){return""!==e}),t=G([["processed_y",a.state.y]].concat(a.bnfParamArr())),n=T.a.baseBackendURL+T.a.bnfUserSpecifiedDataSlug+t,console.log(n),a.setState({loading:!0},Object(s.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.fetchResultWithErrorHandling(n).then(function(e){console.log("Success:",e);var t=e.cycle.map(function(e){return Number(e)}),n=e.ci.map(function(e){return Number(e)}),r=Number(e.delta);a.setState({x:"n"!==a.state.frequency?he.createDate(a.state.frequency,a.state.startDate).getDateArray(t.length).map(he.getTruncatedDate):Array.from({length:t.length},function(e,t){return t+1}),cycle:t,cycleCI:n,deltaCalc:r,cycleCILB:K(t,n,"lb"),cycleCIUB:K(t,n,"ub"),loading:!1})}).catch(function(e){console.log(e)});case 1:case"end":return e.stop()}},e)})));case 5:case"end":return e.stop()}},e)})),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.unprocessedY,n=t.startDate,i=t.endDate,l=t.frequency,o=t.dataInputType,c=t.dispCycleCI,s=this.state,u=s.startDateFRED,d=s.endDateFRED,m=s.minDate,p=s.maxDate,h=s.mnemonic,g=s.frequencyFRED,f=s.availableFrequencies,v={unprocessedY:a,startDate:n,endDate:i,frequency:l,dataInputType:o,dispCycleCI:c},y={startDateFRED:u,endDateFRED:d,minDate:m,maxDate:p,mnemonic:h,frequencyFRED:g,dataInputType:o,availableFrequencies:f,dispCycleCI:c},E=this.state,D=E.step,x=E.delta,C=E.deltaSelect,w=E.demean,F=E.iterativeBackcasting,S=E.rollingWindow,j=E.transform,k=E.dCode,T=E.pCode,R=E.takeLog,O=E.cycle,I=E.deltaCalc,M=E.fieldErrorMessages,N={unprocessedY:a,delta:x,deltaSelect:C,demean:w,iterativeBackcasting:F,rollingWindow:S,transform:j,dCode:k,pCode:T,takeLog:R,loading:E.loading,serverError:E.serverError,dataInputType:o,alertErrorType:E.alertErrorType},A={handleChange:this.handleChange,handleNumberFieldChange:this.handleNumberFieldChange,handleIntegerNumberFieldChange:this.handleIntegerNumberFieldChange,handleCheckboxChange:this.handleCheckboxChange,handleErrorField:this.handleErrorField},q=this.state,U={x:q.x,y:q.y,cycle:O,deltaCalc:I,dispCycleCI:c,cycleCILB:q.cycleCILB,cycleCIUB:q.cycleCIUB,frequency:l,startDate:n,dataInputType:o,mnemonic:h};return r.a.createElement(r.a.Fragment,null,function(){switch(D){case 2:return r.a.createElement(ne,{nextStep:e.nextStep,prevStep:e.prevStep,setErrorMessage:e.setErrorMessage,deleteErrorMessage:e.deleteErrorMessage,handleChange:e.handleChange,handleCheckboxChange:e.handleCheckboxChange,valuesUserData:v,valuesFREDData:y,errors:M});case 3:return r.a.createElement(r.a.Fragment,null,r.a.createElement(P,{nextStep:e.nextStep,prevStep:e.prevStep,cancelLoad:e.cancelLoading,handlers:A,getResults:e.getResultsForUserSpecifiedData,getFREDResults:e.getResultsForFREDData,values:N,errors:M}));case 4:return r.a.createElement(r.a.Fragment,null,e.state.loading?de():r.a.createElement(ue,{prevStep:e.prevStep,plotPageValues:U}));default:return r.a.createElement(b,{nextStep:e.nextStep,handleChange:e.handleChange})}}())}}]),t}(n.Component);var be={footer:{fontSize:"small",backgroundColor:"#F7F7F7",borderTop:"1px solid #E7E7E7",textAlign:"center",padding:"10px",marginTop:"10px",position:"fixed",overflowX:"hidden",left:"0",bottom:"0",width:"100%",zIndex:1},feature:{marginTop:"5px",fontSize:"x-small"}},De=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"appHeader"},"BN Filter Trend-Cycle Decomposition"),r.a.createElement("div",{className:"information welcomeInformation"},r.a.createElement("p",null,"This tool performs trend-cycle decomposition. It is implemented using the Beveridge-Nelson filter method described in ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3434174"},"Kamber, Morley, and Wong"),".")),r.a.createElement(Ee,null)),r.a.createElement("div",{style:be.footer},r.a.createElement("a",{href:"https://sites.google.com/site/guneskamber",rel:"noopener noreferrer",target:"_blank"},"Gunes Kamber"),"\xa0\xa0\xa0\xa0",r.a.createElement("a",{href:"https://sites.google.com/site/jamescmorley",rel:"noopener noreferrer",target:"_blank"},"James Morley"),"\xa0\xa0\xa0\xa0",r.a.createElement("a",{href:"https://sites.google.com/site/benjaminwongshijie",rel:"noopener noreferrer",target:"_blank"},"Benjamin Wong"),r.a.createElement("br",null),r.a.createElement("div",{style:be.feature},r.a.createElement("a",{href:"https://crstnn.github.io/",rel:"noopener noreferrer",target:"_blank"},"@cristian"))))},xe=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,228)).then(function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,l=t.getTTFB;a(e),n(e),r(e),i(e),l(e)})};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(De,null)),document.getElementById("root")),xe()},15:function(e){e.exports={c:{optionField:{frequencyManual:{option:[{value:"w",text:"Weekly"},{value:"m",text:"Monthly"},{value:"q",text:"Quarterly"},{value:"a",text:"Annual"},{value:"n",text:"Undated/Unspecified"}],default:"q"},frequencyFRED:{option:[{value:"d",text:"Daily"},{value:"w",text:"Weekly"},{value:"b",text:"Bi-Weekly"},{value:"m",text:"Monthly"},{value:"q",text:"Quarterly"},{value:"sa",text:"Semiannual"},{value:"a",text:"Annual"}],default:""},iterativeDynamicDemeaning:{option:[{value:"sm",text:"Constant (Static Demeaning)",hoverText:"Estimate constant drift"},{value:"dm",text:"Dynamic Demeaning",hoverText:"Estimate time-varying drift using rolling window"},{value:"idm",text:"Iterative Dynamic Demeaning",hoverText:"Iteratively estimate time-varying drift removing cycle and using rolling window according to KMW refinement"}],default:"sm"},deltaSelect:{option:[{value:0,text:"Fixed Delta",hoverText:"Signal-to-Noise Ratio according to user input"},{value:1,text:"Maximize Amplitude-to-Noise Ratio",hoverText:"Signal-to-Noise Ratio according to benchmark KMW approach"},{value:2,text:"Minimize Stochastic Trend Volatility",hoverText:"Signal-to-Noise Ratio according to KMW refinement"}],default:0},dCode:{option:[{value:"nd",text:"No Differencing (Levels)"},{value:"d1",text:"1 Period Difference"},{value:"d4",text:"4 Period Difference (for Quarterly Data)"},{value:"d12",text:"12 Period Difference (for Monthly Data)"}],default:"nd"},pCode:{option:[{value:"np",text:"No Change"},{value:"p1",text:"Multiply by 100"},{value:"p4",text:"Multiply by 400 (Annualized Quarterly Rate)"},{value:"p12",text:"Multiply by 1200 (Annualized Monthly Rate)"}],default:"np"}},freeText:{delta:{default:.01,min:5e-4,max:null},rollingWindow:{default:40,min:26,max:500}}},b:{INPUT_USER_M:"The FRED mnemonic input is either empty or incorrect. Check the mnemonic.",INPUT_USER_S:"The user inputted series is either empty or incorrect. Check the data for the series.",INPUT_PARAM:"At least one of the parameters does not meet the requirements. Check that the parameters are appropriate.",SERVER:"During the running of the BN filter a problem occurred. Check that the parameters are appropriate (e.g. if delta is too large).",TIMEOUT:"Request has taken too long. Consider reducing the computational cost by adjusting the inputs or coming back later."},a:{baseBackendURL:"https://bn-filtering.herokuapp.com",bnfUserSpecifiedDataSlug:"/bnf/user-specified-time-series",bnfFredDataSlug:"/bnf/fred-time-series",fredDataSlug:"/fred-time-series"}}},69:function(e,t,a){}},[[120,1,2]]]);
//# sourceMappingURL=main.c2bc141f.chunk.js.map
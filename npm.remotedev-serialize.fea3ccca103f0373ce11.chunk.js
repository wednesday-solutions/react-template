(self.webpackChunkreact_template=self.webpackChunkreact_template||[]).push([[2079],{64159:e=>{e.exports={refs:!1,date:!0,function:!0,regex:!0,undefined:!0,error:!0,symbol:!0,map:!0,set:!0,nan:!0,infinity:!0}},80823:e=>{function t(e,t,r){return{data:r?e[r]():e,__serializedType__:t}}e.exports={mark:t,extract:function(e,t){return{data:Object.assign({},e),__serializedType__:t}},refer:function(e,r,a,n){var u=t(e,r,a);if(!n)return u;for(var i=0;i<n.length;i++){var s=n[i];if("function"===typeof s&&e instanceof s)return u.__serializedRef__=i,u}return u}}},41984:(e,t,r)=>{var a=r(5151),n=r(85301),u=r(64159);e.exports=function(e,t,r,i){return{stringify:function(s){return a.stringify(s,n(e,t,r,i).replacer,null,u)},parse:function(u){return a.parse(u,n(e,t,r,i).reviver)},serialize:n}}},85301:(e,t,r)=>{var a=r(80823),n=a.mark,u=a.extract,i=a.refer,s=r(64159);e.exports=function(e,t,r,a){function c(r,a){return a instanceof e.Record?i(a,"ImmutableRecord","toObject",t):a instanceof e.Range?u(a,"ImmutableRange"):a instanceof e.Repeat?u(a,"ImmutableRepeat"):e.OrderedMap.isOrderedMap(a)?n(a,"ImmutableOrderedMap","toObject"):e.Map.isMap(a)?n(a,"ImmutableMap","toObject"):e.List.isList(a)?n(a,"ImmutableList","toArray"):e.OrderedSet.isOrderedSet(a)?n(a,"ImmutableOrderedSet","toArray"):e.Set.isSet(a)?n(a,"ImmutableSet","toArray"):e.Seq.isSeq(a)?n(a,"ImmutableSeq","toArray"):e.Stack.isStack(a)?n(a,"ImmutableStack","toArray"):a}function m(r,a){if("object"===typeof a&&null!==a&&"__serializedType__"in a){var n=a.data;switch(a.__serializedType__){case"ImmutableMap":return e.Map(n);case"ImmutableOrderedMap":return e.OrderedMap(n);case"ImmutableList":return e.List(n);case"ImmutableRange":return e.Range(n._start,n._end,n._step);case"ImmutableRepeat":return e.Repeat(n._value,n.size);case"ImmutableSet":return e.Set(n);case"ImmutableOrderedSet":return e.OrderedSet(n);case"ImmutableSeq":return e.Seq(n);case"ImmutableStack":return e.Stack(n);case"ImmutableRecord":return t&&t[a.__serializedRef__]?new t[a.__serializedRef__](n):e.Map(n);default:return n}}return a}return{replacer:r?function(e,t){return r(e,t,c)}:c,reviver:a?function(e,t){return a(e,t,m)}:m,options:s}}},6556:(e,t,r)=>{var a=r(41984);e.exports={immutable:a}}}]);
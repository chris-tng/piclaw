var F8=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,Z)=>(typeof require<"u"?require:$)[Z]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var a2,T_,n1,y8,G2,x1,l1,o1,r1,I3,S3,x3,D8,r2={},d2=[],C8=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,t2=Array.isArray;function Z2(_,$){for(var Z in $)_[Z]=$[Z];return _}function u3(_){_&&_.parentNode&&_.parentNode.removeChild(_)}function d1(_,$,Z){var N,K,J,j={};for(J in $)J=="key"?N=$[J]:J=="ref"?K=$[J]:j[J]=$[J];if(arguments.length>2&&(j.children=arguments.length>3?a2.call(arguments,2):Z),typeof _=="function"&&_.defaultProps!=null)for(J in _.defaultProps)j[J]===void 0&&(j[J]=_.defaultProps[J]);return n2(_,j,N,K,null)}function n2(_,$,Z,N,K){var J={type:_,props:$,key:Z,ref:N,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:K==null?++n1:K,__i:-1,__u:0};return K==null&&T_.vnode!=null&&T_.vnode(J),J}function e2(_){return _.children}function l2(_,$){this.props=_,this.context=$}function D2(_,$){if($==null)return _.__?D2(_.__,_.__i+1):null;for(var Z;$<_.__k.length;$++)if((Z=_.__k[$])!=null&&Z.__e!=null)return Z.__e;return typeof _.type=="function"?D2(_):null}function k8(_){if(_.__P&&_.__d){var $=_.__v,Z=$.__e,N=[],K=[],J=Z2({},$);J.__v=$.__v+1,T_.vnode&&T_.vnode(J),c3(_.__P,J,$,_.__n,_.__P.namespaceURI,32&$.__u?[Z]:null,N,Z==null?D2($):Z,!!(32&$.__u),K),J.__v=$.__v,J.__.__k[J.__i]=J,e1(N,J,K),$.__e=$.__=null,J.__e!=Z&&s1(J)}}function s1(_){if((_=_.__)!=null&&_.__c!=null)return _.__e=_.__c.base=null,_.__k.some(function($){if($!=null&&$.__e!=null)return _.__e=_.__c.base=$.__e}),s1(_)}function f1(_){(!_.__d&&(_.__d=!0)&&G2.push(_)&&!s2.__r++||x1!=T_.debounceRendering)&&((x1=T_.debounceRendering)||l1)(s2)}function s2(){try{for(var _,$=1;G2.length;)G2.length>$&&G2.sort(o1),_=G2.shift(),$=G2.length,k8(_)}finally{G2.length=s2.__r=0}}function a1(_,$,Z,N,K,J,j,Y,O,z,W){var q,D,y,b,E,R,w,Q=N&&N.__k||d2,P=$.length;for(O=E8(Z,$,Q,O,P),q=0;q<P;q++)(y=Z.__k[q])!=null&&(D=y.__i!=-1&&Q[y.__i]||r2,y.__i=q,R=c3(_,y,D,K,J,j,Y,O,z,W),b=y.__e,y.ref&&D.ref!=y.ref&&(D.ref&&m3(D.ref,null,y),W.push(y.ref,y.__c||b,y)),E==null&&b!=null&&(E=b),(w=!!(4&y.__u))||D.__k===y.__k?O=t1(y,O,_,w):typeof y.type=="function"&&R!==void 0?O=R:b&&(O=b.nextSibling),y.__u&=-7);return Z.__e=E,O}function E8(_,$,Z,N,K){var J,j,Y,O,z,W=Z.length,q=W,D=0;for(_.__k=Array(K),J=0;J<K;J++)(j=$[J])!=null&&typeof j!="boolean"&&typeof j!="function"?(typeof j=="string"||typeof j=="number"||typeof j=="bigint"||j.constructor==String?j=_.__k[J]=n2(null,j,null,null,null):t2(j)?j=_.__k[J]=n2(e2,{children:j},null,null,null):j.constructor===void 0&&j.__b>0?j=_.__k[J]=n2(j.type,j.props,j.key,j.ref?j.ref:null,j.__v):_.__k[J]=j,O=J+D,j.__=_,j.__b=_.__b+1,Y=null,(z=j.__i=b8(j,Z,O,q))!=-1&&(q--,(Y=Z[z])&&(Y.__u|=2)),Y==null||Y.__v==null?(z==-1&&(K>W?D--:K<W&&D++),typeof j.type!="function"&&(j.__u|=4)):z!=O&&(z==O-1?D--:z==O+1?D++:(z>O?D--:D++,j.__u|=4))):_.__k[J]=null;if(q)for(J=0;J<W;J++)(Y=Z[J])!=null&&(2&Y.__u)==0&&(Y.__e==N&&(N=D2(Y)),$4(Y,Y));return N}function t1(_,$,Z,N){var K,J;if(typeof _.type=="function"){for(K=_.__k,J=0;K&&J<K.length;J++)K[J]&&(K[J].__=_,$=t1(K[J],$,Z,N));return $}_.__e!=$&&(N&&($&&_.type&&!$.parentNode&&($=D2(_)),Z.insertBefore(_.__e,$||null)),$=_.__e);do $=$&&$.nextSibling;while($!=null&&$.nodeType==8);return $}function b8(_,$,Z,N){var K,J,j,Y=_.key,O=_.type,z=$[Z],W=z!=null&&(2&z.__u)==0;if(z===null&&Y==null||W&&Y==z.key&&O==z.type)return Z;if(N>(W?1:0)){for(K=Z-1,J=Z+1;K>=0||J<$.length;)if((z=$[j=K>=0?K--:J++])!=null&&(2&z.__u)==0&&Y==z.key&&O==z.type)return j}return-1}function T1(_,$,Z){$[0]=="-"?_.setProperty($,Z==null?"":Z):_[$]=Z==null?"":typeof Z!="number"||C8.test($)?Z:Z+"px"}function i2(_,$,Z,N,K){var J,j;_:if($=="style")if(typeof Z=="string")_.style.cssText=Z;else{if(typeof N=="string"&&(_.style.cssText=N=""),N)for($ in N)Z&&$ in Z||T1(_.style,$,"");if(Z)for($ in Z)N&&Z[$]==N[$]||T1(_.style,$,Z[$])}else if($[0]=="o"&&$[1]=="n")J=$!=($=$.replace(r1,"$1")),j=$.toLowerCase(),$=j in _||$=="onFocusOut"||$=="onFocusIn"?j.slice(2):$.slice(2),_.l||(_.l={}),_.l[$+J]=Z,Z?N?Z.u=N.u:(Z.u=I3,_.addEventListener($,J?x3:S3,J)):_.removeEventListener($,J?x3:S3,J);else{if(K=="http://www.w3.org/2000/svg")$=$.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if($!="width"&&$!="height"&&$!="href"&&$!="list"&&$!="form"&&$!="tabIndex"&&$!="download"&&$!="rowSpan"&&$!="colSpan"&&$!="role"&&$!="popover"&&$ in _)try{_[$]=Z==null?"":Z;break _}catch(Y){}typeof Z=="function"||(Z==null||Z===!1&&$[4]!="-"?_.removeAttribute($):_.setAttribute($,$=="popover"&&Z==1?"":Z))}}function I1(_){return function($){if(this.l){var Z=this.l[$.type+_];if($.t==null)$.t=I3++;else if($.t<Z.u)return;return Z(T_.event?T_.event($):$)}}}function c3(_,$,Z,N,K,J,j,Y,O,z){var W,q,D,y,b,E,R,w,Q,P,M,u,n,l,J_,z_=$.type;if($.constructor!==void 0)return null;128&Z.__u&&(O=!!(32&Z.__u),J=[Y=$.__e=Z.__e]),(W=T_.__b)&&W($);_:if(typeof z_=="function")try{if(w=$.props,Q=z_.prototype&&z_.prototype.render,P=(W=z_.contextType)&&N[W.__c],M=W?P?P.props.value:W.__:N,Z.__c?R=(q=$.__c=Z.__c).__=q.__E:(Q?$.__c=q=new z_(w,M):($.__c=q=new l2(w,M),q.constructor=z_,q.render=w8),P&&P.sub(q),q.state||(q.state={}),q.__n=N,D=q.__d=!0,q.__h=[],q._sb=[]),Q&&q.__s==null&&(q.__s=q.state),Q&&z_.getDerivedStateFromProps!=null&&(q.__s==q.state&&(q.__s=Z2({},q.__s)),Z2(q.__s,z_.getDerivedStateFromProps(w,q.__s))),y=q.props,b=q.state,q.__v=$,D)Q&&z_.getDerivedStateFromProps==null&&q.componentWillMount!=null&&q.componentWillMount(),Q&&q.componentDidMount!=null&&q.__h.push(q.componentDidMount);else{if(Q&&z_.getDerivedStateFromProps==null&&w!==y&&q.componentWillReceiveProps!=null&&q.componentWillReceiveProps(w,M),$.__v==Z.__v||!q.__e&&q.shouldComponentUpdate!=null&&q.shouldComponentUpdate(w,q.__s,M)===!1){$.__v!=Z.__v&&(q.props=w,q.state=q.__s,q.__d=!1),$.__e=Z.__e,$.__k=Z.__k,$.__k.some(function(s){s&&(s.__=$)}),d2.push.apply(q.__h,q._sb),q._sb=[],q.__h.length&&j.push(q);break _}q.componentWillUpdate!=null&&q.componentWillUpdate(w,q.__s,M),Q&&q.componentDidUpdate!=null&&q.__h.push(function(){q.componentDidUpdate(y,b,E)})}if(q.context=M,q.props=w,q.__P=_,q.__e=!1,u=T_.__r,n=0,Q)q.state=q.__s,q.__d=!1,u&&u($),W=q.render(q.props,q.state,q.context),d2.push.apply(q.__h,q._sb),q._sb=[];else do q.__d=!1,u&&u($),W=q.render(q.props,q.state,q.context),q.state=q.__s;while(q.__d&&++n<25);q.state=q.__s,q.getChildContext!=null&&(N=Z2(Z2({},N),q.getChildContext())),Q&&!D&&q.getSnapshotBeforeUpdate!=null&&(E=q.getSnapshotBeforeUpdate(y,b)),l=W!=null&&W.type===e2&&W.key==null?_4(W.props.children):W,Y=a1(_,t2(l)?l:[l],$,Z,N,K,J,j,Y,O,z),q.base=$.__e,$.__u&=-161,q.__h.length&&j.push(q),R&&(q.__E=q.__=null)}catch(s){if($.__v=null,O||J!=null)if(s.then){for($.__u|=O?160:128;Y&&Y.nodeType==8&&Y.nextSibling;)Y=Y.nextSibling;J[J.indexOf(Y)]=null,$.__e=Y}else{for(J_=J.length;J_--;)u3(J[J_]);f3($)}else $.__e=Z.__e,$.__k=Z.__k,s.then||f3($);T_.__e(s,$,Z)}else J==null&&$.__v==Z.__v?($.__k=Z.__k,$.__e=Z.__e):Y=$.__e=A8(Z.__e,$,Z,N,K,J,j,O,z);return(W=T_.diffed)&&W($),128&$.__u?void 0:Y}function f3(_){_&&(_.__c&&(_.__c.__e=!0),_.__k&&_.__k.some(f3))}function e1(_,$,Z){for(var N=0;N<Z.length;N++)m3(Z[N],Z[++N],Z[++N]);T_.__c&&T_.__c($,_),_.some(function(K){try{_=K.__h,K.__h=[],_.some(function(J){J.call(K)})}catch(J){T_.__e(J,K.__v)}})}function _4(_){return typeof _!="object"||_==null||_.__b>0?_:t2(_)?_.map(_4):Z2({},_)}function A8(_,$,Z,N,K,J,j,Y,O){var z,W,q,D,y,b,E,R=Z.props||r2,w=$.props,Q=$.type;if(Q=="svg"?K="http://www.w3.org/2000/svg":Q=="math"?K="http://www.w3.org/1998/Math/MathML":K||(K="http://www.w3.org/1999/xhtml"),J!=null){for(z=0;z<J.length;z++)if((y=J[z])&&"setAttribute"in y==!!Q&&(Q?y.localName==Q:y.nodeType==3)){_=y,J[z]=null;break}}if(_==null){if(Q==null)return document.createTextNode(w);_=document.createElementNS(K,Q,w.is&&w),Y&&(T_.__m&&T_.__m($,J),Y=!1),J=null}if(Q==null)R===w||Y&&_.data==w||(_.data=w);else{if(J=J&&a2.call(_.childNodes),!Y&&J!=null)for(R={},z=0;z<_.attributes.length;z++)R[(y=_.attributes[z]).name]=y.value;for(z in R)y=R[z],z=="dangerouslySetInnerHTML"?q=y:z=="children"||(z in w)||z=="value"&&("defaultValue"in w)||z=="checked"&&("defaultChecked"in w)||i2(_,z,null,y,K);for(z in w)y=w[z],z=="children"?D=y:z=="dangerouslySetInnerHTML"?W=y:z=="value"?b=y:z=="checked"?E=y:Y&&typeof y!="function"||R[z]===y||i2(_,z,y,R[z],K);if(W)Y||q&&(W.__html==q.__html||W.__html==_.innerHTML)||(_.innerHTML=W.__html),$.__k=[];else if(q&&(_.innerHTML=""),a1($.type=="template"?_.content:_,t2(D)?D:[D],$,Z,N,Q=="foreignObject"?"http://www.w3.org/1999/xhtml":K,J,j,J?J[0]:Z.__k&&D2(Z,0),Y,O),J!=null)for(z=J.length;z--;)u3(J[z]);Y||(z="value",Q=="progress"&&b==null?_.removeAttribute("value"):b!=null&&(b!==_[z]||Q=="progress"&&!b||Q=="option"&&b!=R[z])&&i2(_,z,b,R[z],K),z="checked",E!=null&&E!=_[z]&&i2(_,z,E,R[z],K))}return _}function m3(_,$,Z){try{if(typeof _=="function"){var N=typeof _.__u=="function";N&&_.__u(),N&&$==null||(_.__u=_($))}else _.current=$}catch(K){T_.__e(K,Z)}}function $4(_,$,Z){var N,K;if(T_.unmount&&T_.unmount(_),(N=_.ref)&&(N.current&&N.current!=_.__e||m3(N,null,$)),(N=_.__c)!=null){if(N.componentWillUnmount)try{N.componentWillUnmount()}catch(J){T_.__e(J,$)}N.base=N.__P=null}if(N=_.__k)for(K=0;K<N.length;K++)N[K]&&$4(N[K],$,Z||typeof _.type!="function");Z||u3(_.__e),_.__c=_.__=_.__e=void 0}function w8(_,$,Z){return this.constructor(_,Z)}function Z4(_,$,Z){var N,K,J,j;$==document&&($=document.documentElement),T_.__&&T_.__(_,$),K=(N=typeof Z=="function")?null:Z&&Z.__k||$.__k,J=[],j=[],c3($,_=(!N&&Z||$).__k=d1(e2,null,[_]),K||r2,r2,$.namespaceURI,!N&&Z?[Z]:K?null:$.firstChild?a2.call($.childNodes):null,J,!N&&Z?Z:K?K.__e:$.firstChild,N,j),e1(J,_,j)}a2=d2.slice,T_={__e:function(_,$,Z,N){for(var K,J,j;$=$.__;)if((K=$.__c)&&!K.__)try{if((J=K.constructor)&&J.getDerivedStateFromError!=null&&(K.setState(J.getDerivedStateFromError(_)),j=K.__d),K.componentDidCatch!=null&&(K.componentDidCatch(_,N||{}),j=K.__d),j)return K.__E=K}catch(Y){_=Y}throw _}},n1=0,y8=function(_){return _!=null&&_.constructor===void 0},l2.prototype.setState=function(_,$){var Z;Z=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=Z2({},this.state),typeof _=="function"&&(_=_(Z2({},Z),this.props)),_&&Z2(Z,_),_!=null&&this.__v&&($&&this._sb.push($),f1(this))},l2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),f1(this))},l2.prototype.render=e2,G2=[],l1=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,o1=function(_,$){return _.__v.__b-$.__v.__b},s2.__r=0,r1=/(PointerCapture)$|Capture$/i,I3=0,S3=I1(!1),x3=I1(!0),D8=0;var S2,o_,P3,u1,x2=0,N4=[],l_=T_,c1=l_.__b,m1=l_.__r,v1=l_.diffed,R1=l_.__c,g1=l_.unmount,h1=l_.__;function v3(_,$){l_.__h&&l_.__h(o_,_,x2||$),x2=0;var Z=o_.__H||(o_.__H={__:[],__h:[]});return _>=Z.__.length&&Z.__.push({}),Z.__[_]}function c(_){return x2=1,M8(K4,_)}function M8(_,$,Z){var N=v3(S2++,2);if(N.t=_,!N.__c&&(N.__=[Z?Z($):K4(void 0,$),function(Y){var O=N.__N?N.__N[0]:N.__[0],z=N.t(O,Y);O!==z&&(N.__N=[z,N.__[1]],N.__c.setState({}))}],N.__c=o_,!o_.__f)){var K=function(Y,O,z){if(!N.__c.__H)return!0;var W=N.__c.__H.__.filter(function(D){return D.__c});if(W.every(function(D){return!D.__N}))return!J||J.call(this,Y,O,z);var q=N.__c.props!==Y;return W.some(function(D){if(D.__N){var y=D.__[0];D.__=D.__N,D.__N=void 0,y!==D.__[0]&&(q=!0)}}),J&&J.call(this,Y,O,z)||q};o_.__f=!0;var{shouldComponentUpdate:J,componentWillUpdate:j}=o_;o_.componentWillUpdate=function(Y,O,z){if(this.__e){var W=J;J=void 0,K(Y,O,z),J=W}j&&j.call(this,Y,O,z)},o_.shouldComponentUpdate=K}return N.__N||N.__}function v(_,$){var Z=v3(S2++,3);!l_.__s&&J4(Z.__H,$)&&(Z.__=_,Z.u=$,o_.__H.__h.push(Z))}function H(_){return x2=5,Z0(function(){return{current:_}},[])}function Z0(_,$){var Z=v3(S2++,7);return J4(Z.__H,$)&&(Z.__=_(),Z.__H=$,Z.__h=_),Z.__}function S(_,$){return x2=8,Z0(function(){return _},$)}function P8(){for(var _;_=N4.shift();){var $=_.__H;if(_.__P&&$)try{$.__h.some(o2),$.__h.some(T3),$.__h=[]}catch(Z){$.__h=[],l_.__e(Z,_.__v)}}}l_.__b=function(_){o_=null,c1&&c1(_)},l_.__=function(_,$){_&&$.__k&&$.__k.__m&&(_.__m=$.__k.__m),h1&&h1(_,$)},l_.__r=function(_){m1&&m1(_),S2=0;var $=(o_=_.__c).__H;$&&(P3===o_?($.__h=[],o_.__h=[],$.__.some(function(Z){Z.__N&&(Z.__=Z.__N),Z.u=Z.__N=void 0})):($.__h.some(o2),$.__h.some(T3),$.__h=[],S2=0)),P3=o_},l_.diffed=function(_){v1&&v1(_);var $=_.__c;$&&$.__H&&($.__H.__h.length&&(N4.push($)!==1&&u1===l_.requestAnimationFrame||((u1=l_.requestAnimationFrame)||S8)(P8)),$.__H.__.some(function(Z){Z.u&&(Z.__H=Z.u),Z.u=void 0})),P3=o_=null},l_.__c=function(_,$){$.some(function(Z){try{Z.__h.some(o2),Z.__h=Z.__h.filter(function(N){return!N.__||T3(N)})}catch(N){$.some(function(K){K.__h&&(K.__h=[])}),$=[],l_.__e(N,Z.__v)}}),R1&&R1(_,$)},l_.unmount=function(_){g1&&g1(_);var $,Z=_.__c;Z&&Z.__H&&(Z.__H.__.some(function(N){try{o2(N)}catch(K){$=K}}),Z.__H=void 0,$&&l_.__e($,Z.__v))};var p1=typeof requestAnimationFrame=="function";function S8(_){var $,Z=function(){clearTimeout(N),p1&&cancelAnimationFrame($),setTimeout(_)},N=setTimeout(Z,35);p1&&($=requestAnimationFrame(Z))}function o2(_){var $=o_,Z=_.__c;typeof Z=="function"&&(_.__c=void 0,Z()),o_=$}function T3(_){var $=o_;_.__c=_.__(),o_=$}function J4(_,$){return!_||_.length!==$.length||$.some(function(Z,N){return Z!==_[N]})}function K4(_,$){return typeof $=="function"?$(_):$}var j4=function(_,$,Z,N){var K;$[0]=0;for(var J=1;J<$.length;J++){var j=$[J++],Y=$[J]?($[0]|=j?1:2,Z[$[J++]]):$[++J];j===3?N[0]=Y:j===4?N[1]=Object.assign(N[1]||{},Y):j===5?(N[1]=N[1]||{})[$[++J]]=Y:j===6?N[1][$[++J]]+=Y+"":j?(K=_.apply(Y,j4(_,Y,Z,["",null])),N.push(K),Y[0]?$[0]|=2:($[J-2]=0,$[J]=K)):N.push(Y)}return N},i1=new Map;function x8(_){var $=i1.get(this);return $||($=new Map,i1.set(this,$)),($=j4(this,$.get(_)||($.set(_,$=function(Z){for(var N,K,J=1,j="",Y="",O=[0],z=function(D){J===1&&(D||(j=j.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?O.push(0,D,j):J===3&&(D||j)?(O.push(3,D,j),J=2):J===2&&j==="..."&&D?O.push(4,D,0):J===2&&j&&!D?O.push(5,0,!0,j):J>=5&&((j||!D&&J===5)&&(O.push(J,0,j,K),J=6),D&&(O.push(J,D,0,K),J=6)),j=""},W=0;W<Z.length;W++){W&&(J===1&&z(),z(W));for(var q=0;q<Z[W].length;q++)N=Z[W][q],J===1?N==="<"?(z(),O=[O],J=3):j+=N:J===4?j==="--"&&N===">"?(J=1,j=""):j=N+j[0]:Y?N===Y?Y="":j+=N:N==='"'||N==="'"?Y=N:N===">"?(z(),J=1):J&&(N==="="?(J=5,K=j,j=""):N==="/"&&(J<5||Z[W][q+1]===">")?(z(),J===3&&(O=O[0]),J=O,(O=O[0]).push(2,0,J),J=0):N===" "||N==="\t"||N===`
`||N==="\r"?(z(),J=2):j+=N),J===3&&j==="!--"&&(J=4,O=O[0])}return z(),O}(_)),$),arguments,[])).length>1?$:$[0]}var V=x8.bind(d1);async function N0(_,$={}){let Z=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Unknown error"}));throw Error(N.error||`HTTP ${Z.status}`)}return Z.json()}function z4(_){let $=String(_||"").split(`
`),Z="message",N=[];for(let J of $)if(J.startsWith("event:"))Z=J.slice(6).trim()||"message";else if(J.startsWith("data:"))N.push(J.slice(5).trim());let K=N.join(`
`);if(!K)return null;try{return{event:Z,data:JSON.parse(K)}}catch{return{event:Z,data:K}}}async function f8(_,$){if(!_.body)throw Error("Missing event stream body");let Z=_.body.getReader(),N=new TextDecoder,K="";while(!0){let{value:j,done:Y}=await Z.read();if(Y)break;K+=N.decode(j,{stream:!0});let O=K.split(`

`);K=O.pop()||"";for(let z of O){let W=z4(z);if(W)$(W.event,W.data)}}K+=N.decode();let J=z4(K);if(J)$(J.event,J.data)}async function _3(_=10,$=null){let Z=`/timeline?limit=${_}`;if($)Z+=`&before=${$}`;return N0(Z)}async function Y4(_,$=50,Z=0){return N0(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${Z}`)}async function O4(_,$=50,Z=0){return N0(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${Z}`)}async function G4(_){return N0(`/thread/${_}`)}async function L4(_,$=!1){let Z=`/post/${_}?cascade=${$?"true":"false"}`;return N0(Z,{method:"DELETE"})}async function f2(_,$,Z=null,N=[],K=null){return N0(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:Z,media_ids:N,mode:K})})}async function q4(){return N0("/agents")}async function B4(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return N0(`/agent/status${$}`)}async function R3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return N0(`/agent/context${$}`)}async function g3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return N0(`/agent/queue-state${$}`)}async function h3(_,$=null){let Z=await fetch("/agent/queue-remove",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Failed to remove queued item"}));throw Error(N.error||`HTTP ${Z.status}`)}return Z.json()}async function p3(_,$=null){let Z=await fetch("/agent/queue-steer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Failed to steer queued item"}));throw Error(N.error||`HTTP ${Z.status}`)}return Z.json()}async function Q2(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return N0(`/agent/models${$}`)}async function W4(_){let $=new FormData;$.append("file",_);let Z=await fetch("/media/upload",{method:"POST",body:$});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Upload failed"}));throw Error(N.error||`HTTP ${Z.status}`)}return Z.json()}async function i3(_,$){let Z=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Failed to respond"}));throw Error(N.error||`HTTP ${Z.status}`)}return Z.json()}async function V4(_){let $=await fetch("/agent/card-action",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(_)});if(!$.ok){let Z=await $.json().catch(()=>({error:"Adaptive Card action failed"}));throw Error(Z.error||`HTTP ${$.status}`)}return $.json()}async function n3(_,$={}){let Z=await fetch("/agent/side-prompt/stream",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:_,system_prompt:$.systemPrompt||void 0,chat_jid:$.chatJid||void 0}),signal:$.signal});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Side prompt failed"}));throw Error(J.error||`HTTP ${Z.status}`)}let N=null,K=null;if(await f8(Z,(J,j)=>{if($.onEvent?.(J,j),J==="side_prompt_thinking_delta")$.onThinkingDelta?.(j?.delta||"");else if(J==="side_prompt_text_delta")$.onTextDelta?.(j?.delta||"");else if(J==="side_prompt_done")N=j;else if(J==="side_prompt_error")K=j}),K){let J=Error(K?.error||"Side prompt failed");throw J.payload=K,J}return N}async function X4(_,$){let Z=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(N.error||`HTTP ${Z.status}`)}return Z.json()}async function Q4(_,$="thought"){let Z=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return N0(Z)}async function U4(_,$,Z){return N0("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(Z)})})}function s0(_){return`/media/${_}`}function H4(_){return`/media/${_}/thumbnail`}async function T2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function F4(_){let $=await fetch(`/media/${_}`);if(!$.ok)throw Error("Failed to load media text");return $.text()}async function y4(_){let $=await fetch(`/media/${_}`);if(!$.ok)throw Error("Failed to load media blob");return $.blob()}async function $3(_="",$=2,Z=!1){let N=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${Z?"1":"0"}`;return N0(N)}async function D4(_,$=20000,Z=null){let N=Z?`&mode=${encodeURIComponent(Z)}`:"",K=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${N}`;return N0(K)}async function C4(_){return N0("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function l3(_,$="",Z={}){let N=new FormData;N.append("file",_);let K=new URLSearchParams;if($)K.set("path",$);if(Z.overwrite)K.set("overwrite","1");let J=K.toString(),j=J?`/workspace/upload?${J}`:"/workspace/upload",Y=await fetch(""+j,{method:"POST",body:N});if(!Y.ok){let O=await Y.json().catch(()=>({error:"Upload failed"})),z=Error(O.error||`HTTP ${Y.status}`);throw z.status=Y.status,z.code=O.code,z}return Y.json()}async function k4(_,$,Z=""){let N=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:Z})});if(!N.ok){let K=await N.json().catch(()=>({error:"Create failed"})),J=Error(K.error||`HTTP ${N.status}`);throw J.status=N.status,J.code=K.code,J}return N.json()}async function E4(_,$){let Z=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Rename failed"})),K=Error(N.error||`HTTP ${Z.status}`);throw K.status=Z.status,K.code=N.code,K}return Z.json()}async function b4(_,$){let Z=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Move failed"})),K=Error(N.error||`HTTP ${Z.status}`);throw K.status=Z.status,K.code=N.code,K}return Z.json()}async function A4(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return N0($,{method:"DELETE"})}async function Z3(_,$=!1){return N0("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function o3(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function w4(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class r3{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_queued",(_)=>{this.onEvent("agent_followup_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_consumed",(_)=>{this.onEvent("agent_followup_consumed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_removed",(_)=>{this.onEvent("agent_followup_removed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,Z=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,Z+$),this.reconnectAttempts=0;let N=Math.max(this.cooldownUntil-Z,0),K=Math.max(this.reconnectDelay,N);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},K),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function w0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function c_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function C2(_,$=!1){let Z=w0(_);if(Z===null)return $;return Z==="true"}function k2(_,$=null){let Z=w0(_);if(Z===null)return $;let N=parseInt(Z,10);return Number.isFinite(N)?N:$}function N2({prefix:_="file",label:$,title:Z,onRemove:N,onClick:K,removeTitle:J="Remove",icon:j="file"}){let Y=`${_}-file-pill`,O=`${_}-file-name`,z=`${_}-file-remove`,W=j==="message"?V`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:V`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return V`
    <span class=${Y} title=${Z||$} onClick=${K}>
      ${W}
      <span class=${O}>${$}</span>
      ${N&&V`
        <button
          class=${z}
          onClick=${(q)=>{q.preventDefault(),q.stopPropagation(),N()}}
          title=${J}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var I8=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/test-card",description:"Emit a built-in Adaptive Card test message (/test-card list for variants)"},{name:"/btw",description:"Open a side conversation panel without interrupting the main chat"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steer",description:"Steer the current response"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function u8({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),Z=_.tokens,N=_.contextWindow,K=Z!=null?`Context: ${M4(Z)} / ${M4(N)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,J=7,j=2*Math.PI*7,Y=$/100*j,O=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return V`
        <span class="compose-context-pie icon-btn" title=${K}>
            <svg width="16" height="16" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke="var(--context-track, rgba(128,128,128,0.2))"
                    stroke-width="2.5" />
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke=${O}
                    stroke-width="2.5"
                    stroke-dasharray=${`${Y} ${j}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `}function M4(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function P4({onPost:_,onFocus:$,searchMode:Z,onSearch:N,onEnterSearch:K,onExitSearch:J,fileRefs:j=[],onRemoveFileRef:Y,onClearFileRefs:O,messageRefs:z=[],onRemoveMessageRef:W,onClearMessageRefs:q,activeModel:D=null,modelUsage:y=null,thinkingLevel:b=null,supportsThinking:E=!1,contextUsage:R=null,notificationsEnabled:w=!1,notificationPermission:Q="default",onToggleNotifications:P,onModelChange:M,onModelStateChange:u,activeEditorPath:n=null,onAttachEditorFile:l,onOpenFilePill:J_,followupQueueItems:z_=[],onInjectQueuedFollowup:s,onRemoveQueuedFollowup:G_,onSubmitIntercept:b_,onMessageResponse:r,isAgentActive:K_=!1}){let[o,__]=c(""),[$_,X_]=c(""),[Z_,L_]=c([]),[y_,M_]=c(!1),[v_,I_]=c([]),[H0,P_]=c(0),[p_,N_]=c(!1),[B_,D_]=c(!1),[Q_,W_]=c(!1),[i_,m_]=c([]),[U_,Y_]=c(!1),C_=H(null),a_=H(null),A_=H(null),r_=H(null),g_=H(0),u_=200,L0=(U)=>{let I=new Set,a=[];for(let O_ of U||[]){if(typeof O_!=="string")continue;let E_=O_.trim();if(!E_||I.has(E_))continue;I.add(E_),a.push(E_)}return a},t_=()=>{let U=w0("piclaw_compose_history");if(!U)return[];try{let I=JSON.parse(U);if(!Array.isArray(I))return[];return L0(I)}catch{return[]}},q0=(U)=>{c_("piclaw_compose_history",JSON.stringify(U))},y0=H(t_()),e_=H(-1),B0=H(""),D0=o.trim()||Z_.length>0||j.length>0||z.length>0,P0=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),C0=typeof window<"u"&&typeof Notification<"u",h_=typeof window<"u"?Boolean(window.isSecureContext):!1,e=C0&&h_&&Q!=="denied",V_=Q==="granted"&&w,k_=V_?"Disable notifications":"Enable notifications",H_=D||"",k0=E&&b?` (${b})`:"",S0=k0.trim()?`${b}`:"",E0=typeof y?.hint_short==="string"?y.hint_short.trim():"",t0=[S0||null,E0||null].filter(Boolean).join(" • "),x0=[H_?`Current model: ${H_}${k0}`:null,y?.plan?`Plan: ${y.plan}`:null,E0||null,y?.primary?.reset_description||null,y?.secondary?.reset_description||null].filter(Boolean),F0=B_?"Switching model…":x0.join(" • ")||`Current model: ${H_}${k0} (tap to open model picker)`,J0=(U)=>{if(!U||typeof U!=="object")return;let I=U.model??U.current;if(typeof u==="function")u({model:I??null,thinking_level:U.thinking_level??null,supports_thinking:U.supports_thinking,provider_usage:U.provider_usage??null});if(I&&typeof M==="function")M(I)},_0=(U)=>{let I=U||C_.current;if(!I)return;I.style.height="auto",I.style.height=`${I.scrollHeight}px`,I.style.overflowY="hidden"},g0=(U)=>{if(!U.startsWith("/")||U.includes(`
`)){N_(!1),I_([]);return}let I=U.toLowerCase().split(" ")[0];if(I.length<1){N_(!1),I_([]);return}let a=I8.filter((O_)=>O_.name.startsWith(I)||O_.name.replace(/-/g,"").startsWith(I.replace(/-/g,"")));if(a.length>0&&!(a.length===1&&a[0].name===I))I_(a),P_(0),N_(!0);else N_(!1),I_([])},f0=(U)=>{let I=o,a=I.indexOf(" "),O_=a>=0?I.slice(a):"",E_=U.name+O_;__(E_),N_(!1),I_([]),requestAnimationFrame(()=>{let q_=C_.current;if(!q_)return;let S_=E_.length;q_.selectionStart=S_,q_.selectionEnd=S_,q_.focus()})},T0=(U)=>{if(Z)X_(U);else __(U),g0(U);requestAnimationFrame(()=>_0())},I0=(U)=>{let I=Z?$_:o,a=I&&!I.endsWith(`
`)?`
`:"",O_=`${I}${a}${U}`.trimStart();T0(O_)},H2=(U)=>{let I=U?.command?.model_label;if(I)return I;let a=U?.command?.message;if(typeof a==="string"){let O_=a.match(/•\s+([^\n]+?)\s+\(current\)/);if(O_?.[1])return O_[1].trim()}return null},u0=async(U)=>{if(Z||B_)return;D_(!0);try{let I=await f2("default",U,null,[]),a=H2(I);J0({model:a??D??null,thinking_level:I?.command?.thinking_level,supports_thinking:I?.command?.supports_thinking});try{let O_=await Q2();if(O_)J0(O_)}catch{}return _?.(),!0}catch(I){return console.error("Failed to switch model:",I),alert("Failed to switch model: "+I.message),!1}finally{D_(!1)}},f_=async()=>{await u0("/cycle-model")},z0=async(U)=>{if(!U||B_)return;if(await u0(`/model ${U}`))W_(!1)},h0=(U)=>{U.preventDefault(),U.stopPropagation(),W_((I)=>!I)},n_=(U)=>{if(U==="queue"||U==="steer"||U==="auto")return U;return K_?"queue":null},d_=async(U,I,a={})=>{let{includeMedia:O_=!0,includeFileRefs:E_=!0,includeMessageRefs:q_=!0,clearAfterSubmit:S_=!0,recordHistory:X0=!0}=a||{},j0=typeof U==="string"?U:U&&typeof U?.target?.value==="string"?U.target.value:o,n0=typeof j0==="string"?j0:"";if(!n0.trim()&&(O_?Z_.length===0:!0)&&(E_?j.length===0:!0)&&(q_?z.length===0:!0))return;N_(!1),I_([]);let l0=O_?[...Z_]:[],o0=E_?[...j]:[],e0=q_?[...z]:[],Q0=n0.trim();if(X0&&Q0){let j2=y0.current,w_=L0(j2.filter((b0)=>b0!==Q0));if(w_.push(Q0),w_.length>200)w_.splice(0,w_.length-200);y0.current=w_,q0(w_),e_.current=-1,B0.current=""}if(S_)__(""),L_([]),O?.(),q?.();(async()=>{try{if(await b_?.({content:Q0,submitMode:I,fileRefs:o0,messageRefs:e0,mediaFiles:l0})){_?.();return}let w_=[];for(let U0 of l0){let K0=await W4(U0);w_.push(K0.id)}let b0=o0.length?`Files:
${o0.map((U0)=>`- ${U0}`).join(`
`)}`:"",W2=e0.length?`Referenced messages:
${e0.map((U0)=>`- message:${U0}`).join(`
`)}`:"",w2=w_.length?`Images:
${w_.map((U0,K0)=>{let z2=l0[K0]?.name||`image-${K0+1}`;return`- attachment:${U0} (${z2})`}).join(`
`)}`:"",V2=[Q0,b0,W2,w2].filter(Boolean).join(`

`),r0=await f2("default",V2,null,w_,n_(I));if(r?.(r0),r0?.command){J0({model:r0.command.model_label??D??null,thinking_level:r0.command.thinking_level,supports_thinking:r0.command.supports_thinking});try{let U0=await Q2();if(U0)J0(U0)}catch{}}_?.()}catch(j2){console.error("Failed to post:",j2)}})()},W0=(U)=>{s?.(U)},p0=(U)=>{if(U.isComposing)return;if(Z&&U.key==="Escape"){U.preventDefault(),X_(""),J?.();return}if(p_&&v_.length>0){let I=C_.current?.value??(Z?$_:o);if(!String(I||"").startsWith("/"))N_(!1),I_([]);else{if(U.key==="ArrowDown"){U.preventDefault(),P_((a)=>(a+1)%v_.length);return}if(U.key==="ArrowUp"){U.preventDefault(),P_((a)=>(a-1+v_.length)%v_.length);return}if(U.key==="Tab"){U.preventDefault(),f0(v_[H0]);return}if(U.key==="Enter"&&!U.shiftKey){if(!(C_.current?.value??(Z?$_:o)).includes(" ")){U.preventDefault();let E_=v_[H0];N_(!1),I_([]),d_(E_.name);return}}if(U.key==="Escape"){U.preventDefault(),N_(!1),I_([]);return}}}if(!Z&&(U.key==="ArrowUp"||U.key==="ArrowDown")&&!U.metaKey&&!U.ctrlKey&&!U.altKey&&!U.shiftKey){let I=C_.current;if(!I)return;let a=I.value||"",O_=I.selectionStart===0&&I.selectionEnd===0,E_=I.selectionStart===a.length&&I.selectionEnd===a.length;if(U.key==="ArrowUp"&&O_||U.key==="ArrowDown"&&E_){let q_=y0.current;if(!q_.length)return;U.preventDefault();let S_=e_.current;if(U.key==="ArrowUp"){if(S_===-1)B0.current=a,S_=q_.length-1;else if(S_>0)S_-=1;e_.current=S_,T0(q_[S_]||"")}else{if(S_===-1)return;if(S_<q_.length-1)S_+=1,e_.current=S_,T0(q_[S_]||"");else e_.current=-1,T0(B0.current||""),B0.current=""}requestAnimationFrame(()=>{let X0=C_.current;if(!X0)return;let j0=X0.value.length;X0.selectionStart=j0,X0.selectionEnd=j0});return}}if(U.key==="Enter"&&!U.shiftKey&&(U.ctrlKey||U.metaKey)){U.preventDefault();let I=C_.current?.value??(Z?$_:o);if(Z){if(I.trim())N?.(I.trim())}else d_(I,"steer");return}if(U.key==="Enter"&&!U.shiftKey){U.preventDefault();let I=C_.current?.value??(Z?$_:o);if(Z){if(I.trim())N?.(I.trim())}else d_(I)}},c0=(U)=>{let I=Array.from(U||[]).filter((a)=>a&&a.type&&a.type.startsWith("image/"));if(!I.length)return;L_((a)=>[...a,...I])},m0=(U)=>{c0(U.target.files),U.target.value=""},i0=(U)=>{if(Z)return;U.preventDefault(),U.stopPropagation(),g_.current+=1,M_(!0)},V0=(U)=>{if(Z)return;if(U.preventDefault(),U.stopPropagation(),g_.current=Math.max(0,g_.current-1),g_.current===0)M_(!1)},q2=(U)=>{if(Z)return;if(U.preventDefault(),U.stopPropagation(),U.dataTransfer)U.dataTransfer.dropEffect="copy";M_(!0)},B2=(U)=>{if(Z)return;U.preventDefault(),U.stopPropagation(),g_.current=0,M_(!1),c0(U.dataTransfer?.files||[])},F2=(U)=>{if(Z)return;let I=U.clipboardData?.items;if(!I||!I.length)return;let a=[];for(let O_ of I){if(O_.kind!=="file")continue;let E_=O_.getAsFile?.();if(E_)a.push(E_)}if(a.length>0)U.preventDefault(),c0(a)},Y0=(U)=>{L_((I)=>I.filter((a,O_)=>O_!==U))},v0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((U)=>{let{latitude:I,longitude:a,accuracy:O_}=U.coords,E_=`${I.toFixed(5)}, ${a.toFixed(5)}`,q_=Number.isFinite(O_)?` ±${Math.round(O_)}m`:"",S_=`https://maps.google.com/?q=${I},${a}`,X0=`Location: ${E_}${q_} ${S_}`;I0(X0)},(U)=>{let I=U?.message||"Unable to retrieve location.";alert(`Location error: ${I}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};v(()=>{if(!Q_)return;Y_(!0),Q2().then((U)=>{let I=Array.isArray(U?.models)?U.models.filter((a)=>typeof a==="string"&&a.trim().length>0):[];m_(I),J0(U)}).catch((U)=>{console.warn("Failed to load model list:",U),m_([])}).finally(()=>{Y_(!1)})},[Q_,D]),v(()=>{if(Z)W_(!1)},[Z]),v(()=>{if(!Q_)return;let U=(I)=>{let a=A_.current,O_=r_.current,E_=I.target;if(a&&a.contains(E_))return;if(O_&&O_.contains(E_))return;W_(!1)};return document.addEventListener("pointerdown",U),()=>document.removeEventListener("pointerdown",U)},[Q_]);let O0=(U)=>{let I=U.target.value;_0(U.target),T0(I)};return v(()=>{requestAnimationFrame(()=>_0())},[o,$_,Z]),V`
        <div class="compose-box">
            ${!Z&&z_.length>0&&V`
                <div class="compose-queue-stack">
                    ${z_.map((U)=>{let I=typeof U?.content==="string"?U.content:"";if(!I.trim())return null;return V`
                            <div class="compose-queue-stack-item" role="listitem">
                                <span class="compose-queue-stack-content" title=${I}>
                                    ${I}
                                </span>
                                <button
                                    class="compose-queue-stack-steer-btn"
                                    type="button"
                                    title="Inject queued follow-up as steer"
                                    onClick=${()=>W0(U)}
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M4 20h12a2 2 0 0 0 2-2V8" />
                                        <polyline points="14 12 18 8 22 12" />
                                    </svg>
                                    <span>Steer</span>
                                </button>
                                <button
                                    class="compose-queue-stack-close-btn"
                                    type="button"
                                    title="Cancel queued message"
                                    onClick=${()=>G_?.(U)}
                                >
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        `})}
                </div>
            `}
            <div
                class=${`compose-input-wrapper${y_?" drag-active":""}`}
                onDragEnter=${i0}
                onDragOver=${q2}
                onDragLeave=${V0}
                onDrop=${B2}
            >
                <div class="compose-input-main">
                    ${(j.length>0||Z_.length>0||z.length>0)&&V`
                        <div class="compose-file-refs">
                            ${z.map((U)=>{return V`
                                    <${N2}
                                        key=${"msg-"+U}
                                        prefix="compose"
                                        label=${"msg:"+U}
                                        title=${"Message reference: "+U}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>W?.(U)}
                                    />
                                `})}
                            ${j.map((U)=>{let I=U.split("/").pop()||U;return V`
                                    <${N2}
                                        prefix="compose"
                                        label=${I}
                                        title=${U}
                                        onClick=${()=>J_?.(U)}
                                        removeTitle="Remove file"
                                        onRemove=${()=>Y?.(U)}
                                    />
                                `})}
                            ${Z_.map((U,I)=>{let a=U?.name||`image-${I+1}`;return V`
                                    <${N2}
                                        key=${a+I}
                                        prefix="compose"
                                        label=${a}
                                        title=${a}
                                        removeTitle="Remove image"
                                        onRemove=${()=>Y0(I)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${C_}
                        placeholder=${Z?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${Z?$_:o}
                        onInput=${O0}
                        onKeyDown=${p0}
                        onPaste=${F2}
                        onFocus=${$}
                        onClick=${$}
                        rows="1"
                    />
                    ${p_&&v_.length>0&&V`
                        <div class="slash-autocomplete" ref=${a_}>
                            ${v_.map((U,I)=>V`
                                <div
                                    key=${U.name}
                                    class=${`slash-item${I===H0?" active":""}`}
                                    onMouseDown=${(a)=>{a.preventDefault(),f0(U)}}
                                    onMouseEnter=${()=>P_(I)}
                                >
                                    <span class="slash-name">${U.name}</span>
                                    <span class="slash-desc">${U.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${Q_&&!Z&&V`
                        <div class="compose-model-popup" ref=${A_}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${U_&&V`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!U_&&i_.length===0&&V`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!U_&&i_.map((U)=>V`
                                    <button
                                        key=${U}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${D===U?" active":""}`}
                                        onClick=${()=>{z0(U)}}
                                        disabled=${B_}
                                    >
                                        ${U}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{f_()}}
                                    disabled=${B_}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!Z&&D&&V`
                    <div class="compose-meta-row">
                        ${!Z&&D&&V`
                            <div class="compose-model-meta">
                                <button
                                    ref=${r_}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${F0}
                                    aria-label="Open model picker"
                                    onClick=${h0}
                                    disabled=${B_}
                                >
                                    ${B_?"Switching…":H_}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!B_&&t0&&V`
                                        <span class="compose-model-usage-hint" title=${F0}>
                                            ${t0}
                                        </span>
                                    `}
                                </div>
                            </div>
                        `}
                    </div>
                    `}
                    <div class="compose-actions ${Z?"search-mode":""}">
                    ${!Z&&R&&R.percent!=null&&V`
                        <${u8} usage=${R} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${Z?J:K}
                        title=${Z?"Close search":"Search"}
                    >
                        ${Z?V`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        `:V`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        `}
                    </button>
                    ${P0&&!Z&&V`
                        <button
                            class="icon-btn location-btn"
                            onClick=${v0}
                            title="Share location"
                            type="button"
                            disabled=${!1}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14 14 0 0 1 0 20a14 14 0 0 1 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                        </button>
                    `}
                    ${e&&!Z&&V`
                        <button
                            class=${`icon-btn notification-btn${V_?" active":""}`}
                            onClick=${P}
                            title=${k_}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!Z&&V`
                        ${n&&l&&V`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${l}
                                title=${`Attach open file: ${n}`}
                                type="button"
                                disabled=${j.includes(n)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${m0} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{d_()}}
                            disabled=${!D0}
                            title="Send (Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var x4="piclaw_theme",a3="piclaw_tint",K3={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},c8={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},S4={default:{label:"Default",mode:"auto",light:K3,dark:c8},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},m8=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],j3={theme:"default",tint:null},f4="light",d3=!1;function T4(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function E2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let Z=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(Z)&&!/^[0-9a-fA-F]{6}$/.test(Z))return null;let N=Z.length===3?Z.split("").map((J)=>J+J).join(""):Z,K=parseInt(N,16);return{r:K>>16&255,g:K>>8&255,b:K&255,hex:`#${N.toLowerCase()}`}}function v8(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let Z=document.createElement("div");if(Z.style.color="",Z.style.color=$,!Z.style.color)return null;let N=Z.style.color;try{if(document.body)Z.style.display="none",document.body.appendChild(Z),N=getComputedStyle(Z).color||Z.style.color,document.body.removeChild(Z)}catch{}let K=N.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!K)return null;let J=parseInt(K[1],10),j=parseInt(K[2],10),Y=parseInt(K[3],10);if(![J,j,Y].every((z)=>Number.isFinite(z)))return null;let O=`#${[J,j,Y].map((z)=>z.toString(16).padStart(2,"0")).join("")}`;return{r:J,g:j,b:Y,hex:O}}function I4(_){return E2(_)||v8(_)}function I2(_,$,Z){let N=Math.round(_.r+($.r-_.r)*Z),K=Math.round(_.g+($.g-_.g)*Z),J=Math.round(_.b+($.b-_.b)*Z);return`rgb(${N} ${K} ${J})`}function s3(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function u4(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function t3(_){return S4[_]||S4.default}function R8(_){return _.mode==="auto"?u4():_.mode}function g8(_,$){let Z=t3(_);if($==="dark"&&Z.dark)return Z.dark;if($==="light"&&Z.light)return Z.light;return Z.dark||Z.light||K3}function h8(_,$,Z){let N=I4($);if(!N)return _;let K=E2(_.bgPrimary),J=E2(_.bgSecondary),j=E2(_.bgHover),Y=E2(_.borderColor);if(!K||!J||!j||!Y)return _;let z=E2(Z==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:I2(K,N,0.08),bgSecondary:I2(J,N,0.12),bgHover:I2(j,N,0.16),borderColor:I2(Y,N,0.08),accent:N.hex,accentHover:z?I2(N,z,0.18):N.hex}}function p8(_,$){if(typeof document>"u")return;let Z=document.documentElement,N=_.accent,K=I4(N),J=K?s3(K,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,j=K?s3(K,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",Y=K?s3(K,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",O={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":N,"--accent-hover":_.accentHover||N,"--accent-soft":j,"--accent-soft-strong":Y,"--danger-color":_.danger||K3.danger,"--success-color":_.success||K3.success,"--search-highlight-color":J||"rgba(29, 155, 240, 0.2)"};Object.entries(O).forEach(([z,W])=>{if(W)Z.style.setProperty(z,W)})}function i8(){if(typeof document>"u")return;let _=document.documentElement;m8.forEach(($)=>_.style.removeProperty($))}function N3(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function n8(_,$){if(typeof document>"u")return;let Z=N3("theme-color");if(Z&&_)Z.setAttribute("content",_);let N=N3("msapplication-TileColor");if(N&&_)N.setAttribute("content",_);let K=N3("msapplication-navbutton-color");if(K&&_)K.setAttribute("content",_);let J=N3("apple-mobile-web-app-status-bar-style");if(J)J.setAttribute("content",$==="dark"?"black-translucent":"default")}function l8(){if(typeof window>"u")return;let _={...j3,mode:f4};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function e3(_,$={}){if(typeof window>"u"||typeof document>"u")return;let Z=T4(_?.theme||"default"),N=_?.tint?String(_.tint).trim():null,K=t3(Z),J=R8(K),j=g8(Z,J);j3={theme:Z,tint:N},f4=J;let Y=document.documentElement;Y.dataset.theme=J,Y.dataset.colorTheme=Z,Y.dataset.tint=N?String(N):"",Y.style.colorScheme=J;let O=j;if(Z==="default"&&N)O=h8(j,N,J);if(Z==="default"&&!N)i8();else p8(O,J);if(n8(O.bgPrimary,J),l8(),$.persist!==!1)if(c_(x4,Z),N)c_(a3,N);else c_(a3,"")}function J3(){if(t3(j3.theme).mode!=="auto")return;e3(j3,{persist:!1})}function c4(){if(typeof window>"u")return()=>{};let _=T4(w0(x4)||"default"),$=w0(a3),Z=$?$.trim():null;if(e3({theme:_,tint:Z},{persist:!1}),window.matchMedia&&!d3){let N=window.matchMedia("(prefers-color-scheme: dark)");if(N.addEventListener)N.addEventListener("change",J3);else if(N.addListener)N.addListener(J3);return d3=!0,()=>{if(N.removeEventListener)N.removeEventListener("change",J3);else if(N.removeListener)N.removeListener(J3);d3=!1}}return()=>{}}function m4(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let Z=_.theme??_.name??_.colorTheme,N=_.tint??null;e3({theme:Z||"default",tint:N},{persist:!0})}function v4(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return u4()}var z3=/#(\w+)/g,o8=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),r8=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),d8=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),s8={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},a8=new Set(["http:","https:","mailto:",""]);function R4(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function U2(_,$={}){if(!_)return null;let Z=String(_).trim();if(!Z)return null;if(Z.startsWith("#")||Z.startsWith("/"))return Z;if(Z.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(Z))return Z;return null}if(Z.startsWith("blob:"))return Z;try{let N=new URL(Z,typeof window<"u"?window.location.origin:"http://localhost");if(!a8.has(N.protocol))return null;return N.href}catch{return null}}function g4(_,$={}){if(!_)return"";let Z=new DOMParser().parseFromString(_,"text/html"),N=[],K=Z.createTreeWalker(Z.body,NodeFilter.SHOW_ELEMENT),J;while(J=K.nextNode())N.push(J);for(let j of N){let Y=j.tagName.toLowerCase();if(!r8.has(Y)){let z=j.parentNode;if(!z)continue;while(j.firstChild)z.insertBefore(j.firstChild,j);z.removeChild(j);continue}let O=s8[Y]||new Set;for(let z of Array.from(j.attributes)){let W=z.name.toLowerCase(),q=z.value;if(W.startsWith("on")){j.removeAttribute(z.name);continue}if(W.startsWith("data-")||W.startsWith("aria-"))continue;if(O.has(W)||d8.has(W)){if(W==="href"){let D=U2(q);if(!D)j.removeAttribute(z.name);else if(j.setAttribute(z.name,D),Y==="a"&&!j.getAttribute("rel"))j.setAttribute("rel","noopener noreferrer")}else if(W==="src"){let D=Y==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(q):q,y=U2(D,{allowDataImage:Y==="img"});if(!y)j.removeAttribute(z.name);else j.setAttribute(z.name,y)}continue}j.removeAttribute(z.name)}}return Z.body.innerHTML}function h4(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function Y3(_,$=2){if(!_)return _;let Z=_;for(let N=0;N<$;N+=1){let K=h4(Z);if(K===Z)break;Z=K}return Z}function t8(_){if(!_)return{text:"",blocks:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),N=[],K=[],J=!1,j=[];for(let Y of Z){if(!J&&Y.trim().match(/^```mermaid\s*$/i)){J=!0,j=[];continue}if(J&&Y.trim().match(/^```\s*$/)){let O=N.length;N.push(j.join(`
`)),K.push(`@@MERMAID_BLOCK_${O}@@`),J=!1,j=[];continue}if(J)j.push(Y);else K.push(Y)}if(J)K.push("```mermaid"),K.push(...j);return{text:K.join(`
`),blocks:N}}function e8(_){if(!_)return _;return Y3(_,5)}function _6(_){let $=new TextEncoder().encode(String(_||"")),Z="";for(let N of $)Z+=String.fromCharCode(N);return btoa(Z)}function $6(_){let $=atob(String(_||"")),Z=new Uint8Array($.length);for(let N=0;N<$.length;N+=1)Z[N]=$.charCodeAt(N);return new TextDecoder().decode(Z)}function Z6(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(Z,N)=>{let K=Number(N),J=$[K]??"",j=e8(J);return`<div class="mermaid-container" data-mermaid="${_6(j)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function p4(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,Z)=>{if(Z.includes(`
`))return`
\`\`\`
${Z}
\`\`\`
`;return`\`${Z}\``})}function i4(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,Z)=>{let N=Z.trim(),K=N.startsWith("/"),J=K?N.slice(1).trim():N,O=(J.endsWith("/")?J.slice(0,-1).trim():J).split(/\s+/)[0]?.toLowerCase();if(!O||!o8.has(O))return $;if(O==="br")return K?"":"<br>";if(K)return`</${O}>`;return`<${O}>`})}function n4(_){if(!_)return _;let $=(Z)=>Z.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(Z,N)=>`<pre><code>${$(N)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(Z,N)=>`<code>${$(N)}</code>`)}function l4(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),Z=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),N=(J)=>J.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),K;while(K=Z.nextNode()){if(!K.nodeValue)continue;let J=N(K.nodeValue);if(J!==K.nodeValue)K.nodeValue=J}return $.body.innerHTML}function N6(_){if(!window.katex)return _;let $=(j)=>h4(j).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),Z=(j)=>{let Y=[],O=j.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(z)=>{let W=Y.length;return Y.push(z),`@@CODE_BLOCK_${W}@@`});return O=O.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(z)=>{let W=Y.length;return Y.push(z),`@@CODE_INLINE_${W}@@`}),{html:O,blocks:Y}},N=(j,Y)=>{if(!Y.length)return j;return j.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(O,z)=>{let W=Number(z);return Y[W]??""})},K=Z(_),J=K.html;return J=J.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(j,Y,O)=>{try{let z=katex.renderToString($(O.trim()),{displayMode:!0,throwOnError:!1});return`${Y}${z}`}catch(z){return`<span class="math-error" title="${R4(z.message)}">${j}</span>`}}),J=J.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(j,Y,O)=>{if(/\s$/.test(O))return j;try{let z=katex.renderToString($(O),{displayMode:!1,throwOnError:!1});return`${Y}${z}`}catch(z){return`${Y}<span class="math-error" title="${R4(z.message)}">$${O}$</span>`}}),N(J,K.blocks)}function J6(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),Z=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),N=[],K;while(K=Z.nextNode())N.push(K);for(let J of N){let j=J.nodeValue;if(!j)continue;if(z3.lastIndex=0,!z3.test(j))continue;z3.lastIndex=0;let Y=J.parentElement;if(Y&&(Y.closest("a")||Y.closest("code")||Y.closest("pre")))continue;let O=j.split(z3);if(O.length<=1)continue;let z=$.createDocumentFragment();O.forEach((W,q)=>{if(q%2===1){let D=$.createElement("a");D.setAttribute("href","#"),D.className="hashtag",D.setAttribute("data-hashtag",W),D.textContent=`#${W}`,z.appendChild(D)}else z.appendChild($.createTextNode(W))}),J.parentNode?.replaceChild(z,J)}return $.body.innerHTML}function K6(_){if(!_)return _;let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),N=[],K=!1;for(let J of Z){if(!K&&J.trim().match(/^```(?:math|katex|latex)\s*$/i)){K=!0,N.push("$$");continue}if(K&&J.trim().match(/^```\s*$/)){K=!1,N.push("$$");continue}N.push(J)}return N.join(`
`)}function a0(_,$,Z={}){if(!_)return"";let N=K6(_),{text:K,blocks:J}=t8(N),j=Y3(K,2),O=p4(j).replace(/</g,"&lt;").replace(/>/g,"&gt;"),z=i4(O),W=window.marked?marked.parse(z,{headerIds:!1,mangle:!1}):z.replace(/\n/g,"<br>");return W=n4(W),W=l4(W),W=N6(W),W=J6(W),W=Z6(W,J),W=g4(W,Z),W}function O3(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),Z=Y3($,2),K=p4(Z).replace(/</g,"&lt;").replace(/>/g,"&gt;"),J=i4(K),j=window.marked?marked.parse(J):J.replace(/\n/g,"<br>");return j=n4(j),j=l4(j),j=g4(j),j}async function J2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:Z}=window.beautifulMermaid,K=v4()==="dark"?Z["tokyo-night"]:Z["github-light"],J=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let j of J)try{let Y=j.dataset.mermaid,O=$6(Y||""),z=Y3(O,2),W=await $(z,{...K,transparent:!0});j.innerHTML=W,j.removeAttribute("data-mermaid")}catch(Y){console.error("Mermaid render error:",Y);let O=document.createElement("pre");O.className="mermaid-error",O.textContent=`Diagram error: ${Y.message}`,j.innerHTML="",j.appendChild(O),j.removeAttribute("data-mermaid")}}function o4(_){let $=String(_||"").trim();if(!$.startsWith("/btw"))return null;let Z=$.slice(4).trim();if(!Z)return{type:"help"};if(Z==="clear"||Z==="close")return{type:"clear"};return{type:"ask",question:Z}}function r4(_){if(!_)return!1;let $=String(_.answer||"").trim();return _.status!=="running"&&Boolean($)}function d4(_){if(!_)return!1;return _.status!=="running"}function s4(_){let $=String(_?.question||"").trim(),Z=String(_?.answer||"").trim();if(!$&&!Z)return"";return["BTW side conversation",$?`Question: ${$}`:null,Z?`Answer:
${Z}`:null].filter(Boolean).join(`

`)}function a4({session:_,onClose:$,onInject:Z,onRetry:N}){let K=H(null),J=H(null),j=_?.thinking?O3(_.thinking):"",Y=_?.answer?a0(_.answer,null,{sanitize:!1}):"";if(v(()=>{if(K.current&&j)J2(K.current).catch(()=>{})},[j]),v(()=>{if(J.current&&Y)J2(J.current).catch(()=>{})},[Y]),!_)return null;let O=_.status==="running",z=Boolean(String(_.answer||"").trim()),W=Boolean(String(_.thinking||"").trim()),q=r4(_),D=d4(_),y=!O&&z,b=O?"Thinking…":_.status==="error"?"Error":"Done";return V`
        <section class="btw-panel" aria-label="BTW side conversation">
            <div class="btw-panel-header">
                <div class="btw-panel-title-wrap">
                    <span class="btw-panel-title">BTW</span>
                    <span class=${`btw-panel-status btw-panel-status-${_.status||"idle"}`}>${b}</span>
                </div>
                <button class="btw-panel-close" onClick=${()=>$?.()} title="Close BTW" aria-label="Close BTW">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                        <line x1="4" y1="4" x2="12" y2="12"/>
                        <line x1="12" y1="4" x2="4" y2="12"/>
                    </svg>
                </button>
            </div>

            ${_.question&&V`<div class="btw-block btw-question"><strong>Question:</strong> ${_.question}</div>`}
            ${_.error&&V`<div class="btw-block btw-error">${_.error}</div>`}
            ${W&&V`
                <details class="btw-block btw-thinking" open=${O?!0:void 0}>
                    <summary>Thinking</summary>
                    <div
                        class="btw-thinking-body post-content"
                        ref=${K}
                        dangerouslySetInnerHTML=${{__html:j}}
                    ></div>
                </details>
            `}
            ${q&&V`
                <div class="btw-block btw-answer">
                    <div class="btw-answer-label">Answer</div>
                    <div
                        class="btw-answer-body post-content"
                        ref=${J}
                        dangerouslySetInnerHTML=${{__html:Y}}
                    ></div>
                </div>
            `}

            ${D&&V`
                <div class="btw-panel-footer">
                    <div class="btw-panel-footer-left">
                        ${_.question&&V`
                            <button class="btw-btn btw-btn-secondary" onClick=${()=>N?.()}>
                                Retry
                            </button>
                        `}
                    </div>
                    <div class="btw-panel-footer-right">
                        <button class="btw-btn btw-btn-primary" onClick=${()=>Z?.()} disabled=${!y}>
                            Inject into chat
                        </button>
                    </div>
                </div>
            `}
        </section>
    `}var t4="PiClaw";function _1(_,$){let Z=_||"PiClaw",N=Z.charAt(0).toUpperCase(),K=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],J=N.charCodeAt(0)%K.length,j=K[J],Y=Z.trim().toLowerCase(),O=typeof $==="string"?$.trim():"",W=(O?O:null)||(Y==="PiClaw".toLowerCase()||Y==="pi"?"/static/icon-192.png":null);return{letter:N,color:j,image:W}}function e4(_,$){if(!_)return"PiClaw";let Z=$[_]?.name||_;return Z?Z.charAt(0).toUpperCase()+Z.slice(1):"PiClaw"}function _$(_,$){if(!_)return null;let Z=$[_]||{};return Z.avatar_url||Z.avatarUrl||Z.avatar||null}function $$(_){if(!_)return null;if(typeof document<"u"){let J=document.documentElement,j=J?.dataset?.colorTheme||"",Y=J?.dataset?.tint||"",O=getComputedStyle(J).getPropertyValue("--accent-color")?.trim();if(O&&(Y||j&&j!=="default"))return O}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],Z=String(_),N=0;for(let J=0;J<Z.length;J+=1)N=(N*31+Z.charCodeAt(J))%2147483647;let K=Math.abs(N)%$.length;return $[K]}function j6(_){if(!_||typeof _!=="object")return null;let $=_.started_at??_.startedAt;if(typeof $!=="string"||!$)return null;let Z=Date.parse($);return Number.isFinite(Z)?Z:null}function G3(_){if(!_||typeof _!=="object")return!1;let $=_.intent_key??_.intentKey;return _.type==="intent"&&$==="compaction"}function z6(_){let $=Math.max(0,Math.floor(_/1000)),Z=$%60,N=Math.floor($/60)%60,K=Math.floor($/3600);if(K>0)return`${K}:${String(N).padStart(2,"0")}:${String(Z).padStart(2,"0")}`;return`${N}:${String(Z).padStart(2,"0")}`}function Z$(_,$=Date.now()){let Z=j6(_);if(Z===null)return null;return z6(Math.max(0,$-Z))}function N$({status:_,draft:$,plan:Z,thought:N,pendingRequest:K,intent:J,turnId:j,steerQueued:Y,onPanelToggle:O}){let q=(N_)=>{if(!N_)return{text:"",totalLines:0,fullText:""};if(typeof N_==="string"){let W_=N_,i_=W_?W_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:W_,totalLines:i_,fullText:W_}}let B_=N_.text||"",D_=N_.fullText||N_.full_text||B_,Q_=Number.isFinite(N_.totalLines)?N_.totalLines:D_?D_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:B_,totalLines:Q_,fullText:D_}},D=160,y=(N_)=>{if(!N_)return 1;return Math.max(1,Math.ceil(N_.length/160))},b=(N_,B_,D_)=>{let Q_=(N_||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!Q_)return{text:"",omitted:0,totalLines:Number.isFinite(D_)?D_:0,visibleLines:0};let W_=Q_.split(`
`),i_=W_.length>B_?W_.slice(0,B_).join(`
`):Q_,m_=Number.isFinite(D_)?D_:W_.reduce((C_,a_)=>C_+y(a_),0),U_=i_?i_.split(`
`).reduce((C_,a_)=>C_+y(a_),0):0,Y_=Math.max(m_-U_,0);return{text:i_,omitted:Y_,totalLines:m_,visibleLines:U_}},E=q(Z),R=q(N),w=q($),Q=Boolean(E.text)||E.totalLines>0,P=Boolean(R.text)||R.totalLines>0,M=Boolean(w.fullText?.trim()||w.text?.trim());if(!_&&!M&&!Q&&!P&&!K&&!J)return null;let[u,n]=c(new Set),[l,J_]=c(()=>Date.now()),z_=(N_)=>n((B_)=>{let D_=new Set(B_),Q_=!D_.has(N_);if(Q_)D_.add(N_);else D_.delete(N_);if(typeof O==="function")O(N_,Q_);return D_});v(()=>{n(new Set)},[j]);let s=G3(_);v(()=>{if(!s)return;J_(Date.now());let N_=setInterval(()=>J_(Date.now()),1000);return()=>clearInterval(N_)},[s,_?.started_at,_?.startedAt]);let G_=_?.turn_id||j,b_=$$(G_),r=Y?"turn-dot turn-dot-queued":"turn-dot",K_=(N_)=>N_,o=Boolean(_?.last_activity||_?.lastActivity),__=(N_)=>N_==="warning"?"#f59e0b":N_==="error"?"var(--danger-color)":N_==="success"?"var(--success-color)":b_,$_=J?.kind||"info",X_=__($_),Z_=__(_?.kind||(s?"warning":"info")),L_="",y_=_?.title,M_=_?.status;if(_?.type==="plan")L_=y_?`Planning: ${y_}`:"Planning...";else if(_?.type==="tool_call")L_=y_?`Running: ${y_}`:"Running tool...";else if(_?.type==="tool_status")L_=y_?`${y_}: ${M_||"Working..."}`:M_||"Working...";else if(_?.type==="error")L_=y_||"Agent error";else L_=y_||M_||"Working...";if(o)L_="Last activity just now";let v_=({panelTitle:N_,text:B_,fullText:D_,totalLines:Q_,maxLines:W_,titleClass:i_,panelKey:m_})=>{let U_=u.has(m_),Y_=D_||B_||"",C_=typeof W_==="number",a_=U_&&C_,A_=C_?b(Y_,W_,Q_):{text:Y_||"",omitted:0,totalLines:Number.isFinite(Q_)?Q_:0};if(!Y_&&!(Number.isFinite(A_.totalLines)&&A_.totalLines>0))return null;let r_=`agent-thinking-body${C_?" agent-thinking-body-collapsible":""}`,g_=C_?`--agent-thinking-collapsed-lines: ${W_};`:"";return V`
            <div
                class="agent-thinking"
                data-expanded=${U_?"true":"false"}
                data-collapsible=${C_?"true":"false"}
                style=${b_?`--turn-color: ${b_};`:""}
            >
                <div class="agent-thinking-title ${i_||""}">
                    ${b_&&V`<span class=${r} aria-hidden="true"></span>`}
                    ${N_}
                    ${a_&&V`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${N_} panel`}
                            onClick=${()=>z_(m_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${r_}
                    style=${g_}
                    dangerouslySetInnerHTML=${{__html:O3(Y_)}}
                />
                ${!U_&&A_.omitted>0&&V`
                    <button class="agent-thinking-truncation" onClick=${()=>z_(m_)}>
                        ▸ ${A_.omitted} more lines
                    </button>
                `}
                ${U_&&A_.omitted>0&&V`
                    <button class="agent-thinking-truncation" onClick=${()=>z_(m_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},I_=K?.tool_call?.title,H0=I_?`Awaiting approval: ${I_}`:"Awaiting approval",P_=s?Z$(_,l):null,p_=(N_,B_,D_=null)=>V`
        <div
            class="agent-thinking agent-thinking-intent"
            aria-live="polite"
            style=${B_?`--turn-color: ${B_};`:""}
            title=${N_?.detail||""}
        >
            <div class="agent-thinking-title intent">
                ${B_&&V`<span class=${r} aria-hidden="true"></span>`}
                <span class="agent-thinking-title-text">${N_.title}</span>
                ${D_&&V`<span class="agent-status-elapsed">${D_}</span>`}
            </div>
            ${N_.detail&&V`<div class="agent-thinking-body">${N_.detail}</div>`}
        </div>
    `;return V`
        <div class="agent-status-panel">
            ${J&&p_(J,X_)}
            ${_?.type==="intent"&&p_(_,Z_,P_)}
            ${K&&V`
                <div class="agent-status agent-status-request" aria-live="polite" style=${b_?`--turn-color: ${b_};`:""}>
                    <span class=${r} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${H0}</span>
                </div>
            `}
            ${Q&&v_({panelTitle:K_("Planning"),text:E.text,fullText:E.fullText,totalLines:E.totalLines,panelKey:"plan"})}
            ${P&&v_({panelTitle:K_("Thoughts"),text:R.text,fullText:R.fullText,totalLines:R.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${M&&v_({panelTitle:K_("Draft"),text:w.text,fullText:w.fullText,totalLines:w.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&_?.type!=="intent"&&V`
                <div class=${`agent-status${o?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${b_?`--turn-color: ${b_};`:""}>
                    ${b_&&V`<span class=${r} aria-hidden="true"></span>`}
                    ${_?.type==="error"?V`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!o&&V`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${L_}</span>
                </div>
            `}
        </div>
    `}function J$({request:_,onRespond:$}){if(!_)return null;let{request_id:Z,tool_call:N,options:K}=_,J=N?.title||"Agent Request",j=N?.kind||"other",Y=N?.rawInput||{},O=Y.command||Y.commands&&Y.commands[0]||null,z=Y.diff||null,W=Y.fileName||Y.path||null,q=N?.description||Y.description||Y.explanation||null,y=(Array.isArray(N?.locations)?N.locations:[]).map((Q)=>Q?.path).filter((Q)=>Boolean(Q)),b=Array.from(new Set([W,...y].filter(Boolean)));console.log("AgentRequestModal:",{request_id:Z,tool_call:N,options:K});let E=async(Q)=>{try{await i3(Z,Q),$()}catch(P){console.error("Failed to respond to agent request:",P)}},R=async()=>{try{await X4(J,`Auto-approved: ${J}`),await i3(Z,"approved"),$()}catch(Q){console.error("Failed to add to whitelist:",Q)}},w=K&&K.length>0;return V`
        <div class="agent-request-modal">
            <div class="agent-request-content">
                <div class="agent-request-header">
                    <div class="agent-request-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                    </div>
                    <div class="agent-request-title">${J}</div>
                </div>
                ${(q||O||z||b.length>0)&&V`
                    <div class="agent-request-body">
                        ${q&&V`
                            <div class="agent-request-description">${q}</div>
                        `}
                        ${b.length>0&&V`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${b.map((Q,P)=>V`<li key=${P}>${Q}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${O&&V`
                            <pre class="agent-request-command">${O}</pre>
                        `}
                        ${z&&V`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${z}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${w?K.map((Q)=>V`
                            <button 
                                key=${Q.optionId||Q.id||String(Q)}
                                class="agent-request-btn ${Q.kind==="allow_once"||Q.kind==="allow_always"?"primary":""}"
                                onClick=${()=>E(Q.optionId||Q.id||Q)}
                            >
                                ${Q.name||Q.label||Q.optionId||Q.id||String(Q)}
                            </button>
                        `):V`
                        <button class="agent-request-btn primary" onClick=${()=>E("approved")}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${()=>E("denied")}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${R}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function K$({status:_}){if(_==="connected")return null;return V`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function j$(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let N=new Date-$,K=N/1000,J=86400000;if(N<J){if(K<60)return"just now";if(K<3600)return`${Math.floor(K/60)}m`;return`${Math.floor(K/3600)}h`}if(N<5*J){let O=$.toLocaleDateString(void 0,{weekday:"short"}),z=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${O} ${z}`}let j=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),Y=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${j} ${Y}`}function u2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function M0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function b2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}var Y6=new Set(["application/json","application/xml","text/csv","text/html","text/markdown","text/plain","text/xml"]),O6=new Set(["text/markdown"]);function c2(_){let $=typeof _==="string"?_.trim().toLowerCase():"";if(!$)return"unsupported";if($.startsWith("image/"))return"image";if($==="application/pdf")return"pdf";if(Y6.has($)||$.startsWith("text/"))return"text";return"unsupported"}function z$(_){let $=typeof _==="string"?_.trim().toLowerCase():"";return O6.has($)}function Y$(_){switch(_){case"image":return"Image preview";case"pdf":return"PDF preview";case"text":return"Text preview";default:return"Preview unavailable"}}function O$(){let _=getComputedStyle(document.documentElement),$=(D,y)=>{for(let b of D){let E=_.getPropertyValue(b).trim();if(E)return E}return y},Z=$(["--text-primary","--color-text"],"#0f1419"),N=$(["--text-secondary","--color-text-muted"],"#536471"),K=$(["--bg-secondary","--color-bg-secondary"],"#f7f9fa"),J=$(["--bg-hover","--bg-tertiary","--color-bg-tertiary"],"#e8ebed"),j=$(["--accent-color","--color-accent"],"#1d9bf0"),Y=$(["--success-color","--color-success"],"#00ba7c"),O=$(["--warning-color","--color-warning","--accent-color"],"#f0b429"),z=$(["--danger-color","--color-error"],"#f4212e"),W=$(["--border-color","--color-border"],"#eff3f4");return{fontFamily:$(["--font-family"],"system-ui, sans-serif"),containerStyles:{default:{backgroundColor:K,foregroundColors:{default:{default:Z,subtle:N},accent:{default:j,subtle:j},good:{default:Y,subtle:Y},warning:{default:O,subtle:O},attention:{default:z,subtle:z}}},emphasis:{backgroundColor:J,foregroundColors:{default:{default:Z,subtle:N},accent:{default:j,subtle:j},good:{default:Y,subtle:Y},warning:{default:O,subtle:O},attention:{default:z,subtle:z}}}},actions:{actionsOrientation:"horizontal",actionAlignment:"left",buttonSpacing:8,maxActions:5,showCard:{actionMode:"inline"},spacing:"default"},adaptiveCard:{allowCustomStyle:!1},spacing:{small:4,default:8,medium:12,large:16,extraLarge:24,padding:12},separator:{lineThickness:1,lineColor:W},fontSizes:{small:12,default:14,medium:16,large:18,extraLarge:22},fontWeights:{lighter:300,default:400,bolder:600},imageSizes:{small:40,medium:80,large:120},textBlock:{headingLevel:2}}}var G6=new Set(["1.0","1.1","1.2","1.3","1.4","1.5","1.6"]),G$=!1,L3=null;function $1(_){_.querySelector(".adaptive-card-notice")?.remove()}function L6(_,$,Z="error"){$1(_);let N=document.createElement("div");N.className=`adaptive-card-notice adaptive-card-notice-${Z}`,N.textContent=$,_.appendChild(N)}async function q6(){if(G$)return;if(L3)return L3;return L3=new Promise((_,$)=>{let Z=document.createElement("script");Z.src="/static/js/vendor/adaptivecards.min.js",Z.onload=()=>{G$=!0,_()},Z.onerror=()=>$(Error("Failed to load adaptivecards SDK")),document.head.appendChild(Z)}),L3}function B6(){return globalThis.AdaptiveCards}function W6(_){if(!_||typeof _!=="object")return!1;let $=_;return $.type==="adaptive_card"&&typeof $.card_id==="string"&&typeof $.schema_version==="string"&&typeof $.payload==="object"&&$.payload!==null}function V6(_){return G6.has(_)}function N1(_){if(!Array.isArray(_))return[];return _.filter(W6)}function X6(_){let $=typeof _?.toJSON==="function"?_.toJSON():null,Z=(typeof _?.getJsonTypeName==="function"?_.getJsonTypeName():"")||_?.constructor?.name||$?.type||"Unknown",N=(typeof _?.title==="string"?_.title:"")||(typeof $?.title==="string"?$.title:"")||"",K=(typeof _?.url==="string"?_.url:"")||(typeof $?.url==="string"?$.url:"")||void 0,J=_?.data??$?.data;return{type:Z,title:N,data:J,url:K,raw:_}}function Z1(_){if(_==null)return"";if(typeof _==="string")return _.trim();if(typeof _==="number")return String(_);if(typeof _==="boolean")return _?"yes":"no";if(Array.isArray(_))return _.map(($)=>Z1($)).filter(Boolean).join(", ");if(typeof _==="object")return Object.entries(_).map(([Z,N])=>`${Z}: ${Z1(N)}`).filter((Z)=>!Z.endsWith(": ")).join(", ");return String(_).trim()}function Q6(_){if(typeof _!=="string"||!_.trim())return"";let $=new Date(_);if(Number.isNaN($.getTime()))return"";return new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format($)}function U6(_){if(_.state==="active")return null;let $=_.state==="completed"?"Submitted":_.state==="cancelled"?"Cancelled":"Failed",Z=_.last_submission&&typeof _.last_submission==="object"?_.last_submission:null,N=Z&&typeof Z.title==="string"?Z.title.trim():"",K=Z?Z1(Z.data):"",J=Q6(_.completed_at||Z?.submitted_at),j=[N||null,K||null,J||null].filter(Boolean).join(" · ")||null;return{label:$,detail:j}}async function L$(_,$,Z){if(!V6($.schema_version))return console.warn(`[adaptive-card] Unsupported schema version ${$.schema_version} for card ${$.card_id}`),!1;try{await q6()}catch(N){return console.error("[adaptive-card] Failed to load SDK:",N),!1}try{let N=B6(),K=new N.AdaptiveCard;K.hostConfig=new N.HostConfig(O$()),K.parse($.payload),K.onExecuteAction=(Y)=>{let O=X6(Y);if(Z?.onAction)$1(_),_.classList.add("adaptive-card-busy"),Promise.resolve(Z.onAction(O)).catch((z)=>{console.error("[adaptive-card] Action failed:",z);let W=z instanceof Error?z.message:String(z||"Action failed.");L6(_,W||"Action failed.","error")}).finally(()=>{_.classList.remove("adaptive-card-busy")});else console.log("[adaptive-card] Action executed (not wired yet):",O)};let J=K.render();if(!J)return console.warn(`[adaptive-card] Card ${$.card_id} rendered to null`),!1;_.classList.add("adaptive-card-container");let j=U6($);if(j){_.classList.add("adaptive-card-finished");let Y=document.createElement("div");Y.className=`adaptive-card-status adaptive-card-status-${$.state}`;let O=document.createElement("span");if(O.className="adaptive-card-status-label",O.textContent=j.label,Y.appendChild(O),j.detail){let z=document.createElement("span");z.className="adaptive-card-status-detail",z.textContent=j.detail,Y.appendChild(z)}_.appendChild(Y)}return $1(_),_.appendChild(J),!0}catch(N){return console.error(`[adaptive-card] Failed to render card ${$.card_id}:`,N),!1}}function H6(_){let $=_?.metadata?.size;return[{label:"Type",value:_?.content_type||"application/octet-stream"},{label:"Size",value:typeof $==="number"?M0($):null},{label:"Added",value:_?.created_at?b2(_.created_at):null}].filter((N)=>N.value)}function q$({mediaId:_,info:$,onClose:Z}){let N=$?.filename||`attachment-${_}`,K=Z0(()=>c2($?.content_type),[$?.content_type]),J=Y$(K),j=Z0(()=>z$($?.content_type),[$?.content_type]),[Y,O]=c(K==="text"||K==="pdf"),[z,W]=c(""),[q,D]=c(null),[y,b]=c(null),E=H(null),R=Z0(()=>H6($),[$]),w=Z0(()=>{if(!j||!z)return"";return a0(z)},[j,z]);return v(()=>{let Q=(P)=>{if(P.key==="Escape")Z()};return document.addEventListener("keydown",Q),()=>document.removeEventListener("keydown",Q)},[Z]),v(()=>{if(!E.current||!w)return;J2(E.current);return},[w]),v(()=>{let Q=!1,P=null;async function M(){if(K==="text"){O(!0),b(null);try{let u=await F4(_);if(!Q)W(u)}catch{if(!Q)b("Failed to load text preview.")}finally{if(!Q)O(!1)}return}if(K==="pdf"){O(!0),b(null);try{let u=await y4(_);if(P=URL.createObjectURL(u),!Q)D(P)}catch{if(!Q)b("Failed to load PDF preview.")}finally{if(!Q)O(!1)}return}O(!1)}return M(),()=>{if(Q=!0,P)URL.revokeObjectURL(P)}},[_,K]),V`
        <div class="image-modal attachment-preview-modal" onClick=${Z}>
            <div class="attachment-preview-shell" onClick=${(Q)=>{Q.stopPropagation()}}>
                <div class="attachment-preview-header">
                    <div class="attachment-preview-heading">
                        <div class="attachment-preview-title">${N}</div>
                        <div class="attachment-preview-subtitle">${J}</div>
                    </div>
                    <div class="attachment-preview-header-actions">
                        <a
                            href=${s0(_)}
                            download=${N}
                            class="attachment-preview-download"
                            onClick=${(Q)=>Q.stopPropagation()}
                        >
                            Download
                        </a>
                        <button class="attachment-preview-close" type="button" onClick=${Z}>Close</button>
                    </div>
                </div>
                <div class="attachment-preview-body">
                    ${Y&&V`<div class="attachment-preview-state">Loading preview…</div>`}
                    ${!Y&&y&&V`<div class="attachment-preview-state">${y}</div>`}
                    ${!Y&&!y&&K==="image"&&V`
                        <img class="attachment-preview-image" src=${s0(_)} alt=${N} />
                    `}
                    ${!Y&&!y&&K==="pdf"&&q&&V`
                        <iframe class="attachment-preview-frame" src=${q} title=${N}></iframe>
                    `}
                    ${!Y&&!y&&K==="text"&&j&&V`
                        <div
                            ref=${E}
                            class="attachment-preview-markdown post-content"
                            dangerouslySetInnerHTML=${{__html:w}}
                        />
                    `}
                    ${!Y&&!y&&K==="text"&&!j&&V`
                        <pre class="attachment-preview-text">${z}</pre>
                    `}
                    ${!Y&&!y&&K==="unsupported"&&V`
                        <div class="attachment-preview-state">
                            Preview is not available for this file type yet. You can still download it directly.
                        </div>
                    `}
                </div>
                <div class="attachment-preview-meta">
                    ${R.map((Q)=>V`
                        <div class="attachment-preview-meta-item" key=${Q.label}>
                            <span class="attachment-preview-meta-label">${Q.label}</span>
                            <span class="attachment-preview-meta-value">${Q.value}</span>
                        </div>
                    `)}
                </div>
            </div>
        </div>
    `}function B$({src:_,onClose:$}){return v(()=>{let Z=(N)=>{if(N.key==="Escape")$()};return document.addEventListener("keydown",Z),()=>document.removeEventListener("keydown",Z)},[$]),V`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function F6({mediaId:_,onPreview:$}){let[Z,N]=c(null);if(v(()=>{T2(_).then(N).catch(()=>{})},[_]),!Z)return null;let K=Z.filename||"file",J=Z.metadata?.size,j=J?M0(J):"",O=c2(Z.content_type)==="unsupported"?"Details":"Preview";return V`
        <div class="file-attachment" onClick=${(z)=>z.stopPropagation()}>
            <a href=${s0(_)} download=${K} class="file-attachment-main">
                <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                </svg>
                <div class="file-info">
                    <span class="file-name">${K}</span>
                    <span class="file-meta-row">
                        ${j&&V`<span class="file-size">${j}</span>`}
                        ${Z.content_type&&V`<span class="file-size">${Z.content_type}</span>`}
                    </span>
                </div>
                <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
            </a>
            <button
                class="file-attachment-preview"
                type="button"
                onClick=${(z)=>{z.preventDefault(),z.stopPropagation(),$?.({mediaId:_,info:Z})}}
            >
                ${O}
            </button>
        </div>
    `}function y6({attachment:_,onPreview:$}){let Z=Number(_?.id),[N,K]=c(null);v(()=>{if(!Number.isFinite(Z))return;T2(Z).then(K).catch(()=>{});return},[Z]);let J=N?.filename||_.label||`attachment-${_.id}`,j=Number.isFinite(Z)?s0(Z):null,O=c2(N?.content_type)==="unsupported"?"Details":"Preview";return V`
        <span class="attachment-pill" title=${J}>
            ${j?V`
                    <a href=${j} download=${J} class="attachment-pill-main" onClick=${(z)=>z.stopPropagation()}>
                        <${N2}
                            prefix="post"
                            label=${_.label}
                            title=${J}
                        />
                    </a>
                `:V`
                    <${N2}
                        prefix="post"
                        label=${_.label}
                        title=${J}
                    />
                `}
            ${Number.isFinite(Z)&&N&&V`
                <button
                    class="attachment-pill-preview"
                    type="button"
                    title=${O}
                    onClick=${(z)=>{z.preventDefault(),z.stopPropagation(),$?.({mediaId:Z,info:N})}}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            `}
        </span>
    `}function q3({annotations:_}){if(!_)return null;let{audience:$,priority:Z,lastModified:N}=_,K=N?b2(N):null;return V`
        <div class="content-annotations">
            ${$&&$.length>0&&V`
                <span class="content-annotation">Audience: ${$.join(", ")}</span>
            `}
            ${typeof Z==="number"&&V`
                <span class="content-annotation">Priority: ${Z}</span>
            `}
            ${K&&V`
                <span class="content-annotation">Updated: ${K}</span>
            `}
        </div>
    `}function D6({block:_}){let $=_.title||_.name||_.uri,Z=_.description,N=_.size?M0(_.size):"",K=_.mime_type||"",J=k6(K),j=U2(_.uri);return V`
        <a
            href=${j||"#"}
            class="resource-link"
            target=${j?"_blank":void 0}
            rel=${j?"noopener noreferrer":void 0}
            onClick=${(Y)=>Y.stopPropagation()}>
            <div class="resource-link-main">
                <div class="resource-link-header">
                    <span class="resource-link-icon-inline">${J}</span>
                    <div class="resource-link-title">${$}</div>
                </div>
                ${Z&&V`<div class="resource-link-description">${Z}</div>`}
                <div class="resource-link-meta">
                    ${K&&V`<span>${K}</span>`}
                    ${N&&V`<span>${N}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `}function C6({block:_}){let[$,Z]=c(!1),N=_.uri||"Embedded resource",K=_.text||"",J=Boolean(_.data),j=_.mime_type||"";return V`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(Y)=>{Y.preventDefault(),Y.stopPropagation(),Z(!$)}}>
                ${$?"▼":"▶"} ${N}
            </button>
            ${$&&V`
                ${K&&V`<pre class="resource-embed-content">${K}</pre>`}
                ${J&&V`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${j&&V`<span class="resource-embed-blob-meta">${j}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(Y)=>{Y.preventDefault(),Y.stopPropagation();let O=new Blob([Uint8Array.from(atob(_.data),(q)=>q.charCodeAt(0))],{type:j||"application/octet-stream"}),z=URL.createObjectURL(O),W=document.createElement("a");W.href=z,W.download=N.split("/").pop()||"resource",W.click(),URL.revokeObjectURL(z)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function k6(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function E6({preview:_}){let $=U2(_.url),Z=U2(_.image,{allowDataImage:!0}),N=Z?`background-image: url('${Z}')`:"",K=_.site_name;if(!K&&$)try{K=new URL($).hostname}catch{K=$}return V`
        <a
            href=${$||"#"}
            class="link-preview ${Z?"has-image":""}"
            target=${$?"_blank":void 0}
            rel=${$?"noopener noreferrer":void 0}
            onClick=${(J)=>J.stopPropagation()}
            style=${N}>
            <div class="link-preview-overlay">
                <div class="link-preview-site">${K||""}</div>
                <div class="link-preview-title">${_.title}</div>
                ${_.description&&V`
                    <div class="link-preview-description">${_.description}</div>
                `}
            </div>
        </a>
    `}function b6(_,$){return typeof _==="string"?_:""}var A6=1800,w6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
    </svg>`,M6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>`,P6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;async function S6(_){let $=typeof _==="string"?_:"";if(!$)return!1;if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText($),!0}catch{}try{let Z=document.createElement("textarea");Z.value=$,Z.setAttribute("readonly",""),Z.style.position="fixed",Z.style.opacity="0",Z.style.pointerEvents="none",document.body.appendChild(Z),Z.select(),Z.setSelectionRange(0,Z.value.length);let N=document.execCommand("copy");return document.body.removeChild(Z),N}catch{return!1}}function x6(_){if(!_)return()=>{};let $=Array.from(_.querySelectorAll("pre")).filter((J)=>J.querySelector("code"));if($.length===0)return()=>{};let Z=new Map,N=[],K=(J,j)=>{let Y=j||"idle";if(J.dataset.copyState=Y,Y==="success")J.innerHTML=M6,J.setAttribute("aria-label","Copied"),J.setAttribute("title","Copied"),J.classList.add("is-success"),J.classList.remove("is-error");else if(Y==="error")J.innerHTML=P6,J.setAttribute("aria-label","Copy failed"),J.setAttribute("title","Copy failed"),J.classList.add("is-error"),J.classList.remove("is-success");else J.innerHTML=w6,J.setAttribute("aria-label","Copy code"),J.setAttribute("title","Copy code"),J.classList.remove("is-success","is-error")};return $.forEach((J)=>{let j=document.createElement("div");j.className="post-code-block",J.parentNode?.insertBefore(j,J),j.appendChild(J);let Y=document.createElement("button");Y.type="button",Y.className="post-code-copy-btn",K(Y,"idle"),j.appendChild(Y);let O=async(z)=>{z.preventDefault(),z.stopPropagation();let q=J.querySelector("code")?.textContent||"",D=await S6(q);K(Y,D?"success":"error");let y=Z.get(Y);if(y)clearTimeout(y);let b=setTimeout(()=>{K(Y,"idle"),Z.delete(Y)},A6);Z.set(Y,b)};Y.addEventListener("click",O),N.push(()=>{Y.removeEventListener("click",O);let z=Z.get(Y);if(z)clearTimeout(z);if(j.parentNode)j.parentNode.insertBefore(J,j),j.remove()})}),()=>{N.forEach((J)=>J())}}function f6(_){if(!_)return{content:_,fileRefs:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),N=-1;for(let z=0;z<Z.length;z+=1)if(Z[z].trim()==="Files:"&&Z[z+1]&&/^\s*-\s+/.test(Z[z+1])){N=z;break}if(N===-1)return{content:_,fileRefs:[]};let K=[],J=N+1;for(;J<Z.length;J+=1){let z=Z[J];if(/^\s*-\s+/.test(z))K.push(z.replace(/^\s*-\s+/,"").trim());else if(!z.trim())break;else break}if(K.length===0)return{content:_,fileRefs:[]};let j=Z.slice(0,N),Y=Z.slice(J),O=[...j,...Y].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,fileRefs:K}}function T6(_){if(!_)return{content:_,messageRefs:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),N=-1;for(let z=0;z<Z.length;z+=1)if(Z[z].trim()==="Referenced messages:"&&Z[z+1]&&/^\s*-\s+/.test(Z[z+1])){N=z;break}if(N===-1)return{content:_,messageRefs:[]};let K=[],J=N+1;for(;J<Z.length;J+=1){let z=Z[J];if(/^\s*-\s+/.test(z)){let q=z.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(q)K.push(q[1])}else if(!z.trim())break;else break}if(K.length===0)return{content:_,messageRefs:[]};let j=Z.slice(0,N),Y=Z.slice(J),O=[...j,...Y].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,messageRefs:K}}function I6(_){if(!_)return{content:_,attachments:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),N=-1;for(let z=0;z<Z.length;z+=1)if(Z[z].trim()==="Images:"&&Z[z+1]&&/^\s*-\s+/.test(Z[z+1])){N=z;break}if(N===-1)return{content:_,attachments:[]};let K=[],J=N+1;for(;J<Z.length;J+=1){let z=Z[J];if(/^\s*-\s+/.test(z)){let W=z.replace(/^\s*-\s+/,"").trim(),q=W.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||W.match(/^attachment:([^\s]+)\s+(.+)$/i);if(q){let D=q[1],y=(q[2]||"").trim()||D;K.push({id:D,label:y,raw:W})}else K.push({id:null,label:W,raw:W})}else if(!z.trim())break;else break}if(K.length===0)return{content:_,attachments:[]};let j=Z.slice(0,N),Y=Z.slice(J),O=[...j,...Y].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,attachments:K}}function u6(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function c6(_,$){if(!_||!$)return _;let Z=String($).trim().split(/\s+/).filter(Boolean);if(Z.length===0)return _;let N=Z.map(u6).sort((W,q)=>q.length-W.length),K=new RegExp(`(${N.join("|")})`,"gi"),J=new RegExp(`^(${N.join("|")})$`,"i"),j=new DOMParser().parseFromString(_,"text/html"),Y=j.createTreeWalker(j.body,NodeFilter.SHOW_TEXT),O=[],z;while(z=Y.nextNode())O.push(z);for(let W of O){let q=W.nodeValue;if(!q||!K.test(q)){K.lastIndex=0;continue}K.lastIndex=0;let D=W.parentElement;if(D&&D.closest("code, pre, script, style"))continue;let y=q.split(K).filter((E)=>E!=="");if(y.length===0)continue;let b=j.createDocumentFragment();for(let E of y)if(J.test(E)){let R=j.createElement("mark");R.className="search-highlight-term",R.textContent=E,b.appendChild(R)}else b.appendChild(j.createTextNode(E));W.parentNode.replaceChild(b,W)}return j.body.innerHTML}function W$({post:_,onClick:$,onHashtagClick:Z,onMessageRef:N,onScrollToMessage:K,agentName:J,agentAvatarUrl:j,userName:Y,userAvatarUrl:O,userAvatarBackground:z,onDelete:W,isThreadReply:q,isThreadPrev:D,isThreadNext:y,isRemoving:b,highlightQuery:E,onFileRef:R}){let[w,Q]=c(null),P=H(null),M=_.data,u=M.type==="agent_response",n=Y||"You",l=u?J||t4:n,J_=u?_1(J,j):_1(n,O),z_=typeof z==="string"?z.trim().toLowerCase():"",s=!u&&J_.image&&(z_==="clear"||z_==="transparent"),G_=u&&Boolean(J_.image),b_=`background-color: ${s||G_?"transparent":J_.color}`,r=M.content_meta,K_=Boolean(r?.truncated),o=Boolean(r?.preview),__=K_&&!o,$_=K_?{originalLength:Number.isFinite(r?.original_length)?r.original_length:M.content?M.content.length:0,maxLength:Number.isFinite(r?.max_length)?r.max_length:0}:null,X_=M.content_blocks||[],Z_=M.media_ids||[],L_=b6(M.content,M.link_previews),{content:y_,fileRefs:M_}=f6(L_),{content:v_,messageRefs:I_}=T6(y_),{content:H0,attachments:P_}=I6(v_);L_=H0;let p_=N1(X_),N_=p_.length===1&&typeof p_[0]?.fallback_text==="string"?p_[0].fallback_text.trim():"",B_=Boolean(N_)&&L_?.trim()===N_,D_=Boolean(L_)&&!__&&!B_,Q_=typeof E==="string"?E.trim():"",W_=Z0(()=>{if(!L_||B_)return"";let f=a0(L_,Z);return Q_?c6(f,Q_):f},[L_,B_,Q_]),i_=(f,e)=>{f.stopPropagation(),Q(s0(e))},[m_,U_]=c(null),Y_=(f)=>{U_(f)},C_=(f)=>{f.stopPropagation(),W?.(_)},a_=(f,e)=>{let V_=new Set;if(!f||e.length===0)return{content:f,usedIds:V_};return{content:f.replace(/attachment:([^\s)"']+)/g,(H_,k0,S0,E0)=>{let t0=k0.replace(/^\/+/,""),F0=e.find((_0)=>_0.name&&_0.name.toLowerCase()===t0.toLowerCase()&&!V_.has(_0.id))||e.find((_0)=>!V_.has(_0.id));if(!F0)return H_;if(V_.add(F0.id),E0.slice(Math.max(0,S0-2),S0)==="](")return`/media/${F0.id}`;return F0.name||"attachment"}),usedIds:V_}},A_=[],r_=[],g_=[],u_=[],L0=[],t_=[],q0=0;if(X_.length>0)X_.forEach((f)=>{if(f?.type==="text"&&f.annotations)t_.push(f.annotations);if(f?.type==="resource_link")u_.push(f);else if(f?.type==="resource")L0.push(f);else if(f?.type==="file"){let e=Z_[q0++];if(e)r_.push(e),g_.push({id:e,name:f?.name||f?.filename||f?.title})}else if(f?.type==="image"||!f?.type){let e=Z_[q0++];if(e){let V_=typeof f?.mime_type==="string"?f.mime_type:void 0;A_.push({id:e,annotations:f?.annotations,mimeType:V_}),g_.push({id:e,name:f?.name||f?.filename||f?.title})}}});else if(Z_.length>0)Z_.forEach((f)=>{A_.push({id:f,annotations:null}),g_.push({id:f,name:null})});if(P_.length>0)P_.forEach((f)=>{if(!f?.id)return;let e=g_.find((V_)=>String(V_.id)===String(f.id));if(e&&!e.name)e.name=f.label});let{content:y0,usedIds:e_}=a_(L_,g_);L_=y0;let B0=A_.filter(({id:f})=>!e_.has(f)),D0=r_.filter((f)=>!e_.has(f)),P0=P_.length>0?P_.map((f,e)=>({id:f.id||`attachment-${e+1}`,label:f.label||`attachment-${e+1}`})):g_.map((f,e)=>({id:f.id,label:f.name||`attachment-${e+1}`})),C0=Z0(()=>N1(X_),[X_]);v(()=>{if(!P.current)return;return J2(P.current),x6(P.current)},[W_]);let h_=H(null);return v(()=>{if(!h_.current||C0.length===0)return;let f=h_.current;f.innerHTML="";for(let e of C0){let V_=document.createElement("div");f.appendChild(V_),L$(V_,e,{onAction:async(k_)=>{if(k_.type==="Action.OpenUrl"){let H_=U2(k_.url||"");if(!H_)throw Error("Invalid URL");window.open(H_,"_blank","noopener,noreferrer");return}if(k_.type==="Action.Submit"){await V4({post_id:_.id,thread_id:M.thread_id||_.id,card_id:e.card_id,action:{type:k_.type,title:k_.title||"",data:k_.data}});return}console.warn("[post] unsupported adaptive card action:",k_.type,k_)}}).catch((k_)=>{console.error("[post] adaptive card render error:",k_),V_.textContent=e.fallback_text||"Card failed to render."})}},[C0,M.thread_id,_.id]),V`
        <div id=${`post-${_.id}`} class="post ${u?"agent-post":""} ${q?"thread-reply":""} ${D?"thread-prev":""} ${y?"thread-next":""} ${b?"removing":""}" onClick=${$}>
            <div class="post-avatar ${u?"agent-avatar":""} ${J_.image?"has-image":""}" style=${b_}>
                ${J_.image?V`<img src=${J_.image} alt=${l} />`:J_.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${C_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${l}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(f)=>{if(f.preventDefault(),f.stopPropagation(),N)N(_.id)}}>${j$(_.timestamp)}</a>
                </div>
                ${__&&$_&&V`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${u2($_.originalLength)} chars
                            ${$_.maxLength?V` • Display limit: ${u2($_.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${o&&$_&&V`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${u2($_.maxLength)} of ${u2($_.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(M_.length>0||I_.length>0||P0.length>0)&&V`
                    <div class="post-file-refs">
                        ${I_.map((f)=>{let e=(V_)=>{if(V_.preventDefault(),V_.stopPropagation(),K)K(f);else{let k_=document.getElementById("post-"+f);if(k_)k_.scrollIntoView({behavior:"smooth",block:"center"}),k_.classList.add("post-highlight"),setTimeout(()=>k_.classList.remove("post-highlight"),2000)}};return V`
                                <a href=${`#msg-${f}`} class="post-msg-pill-link" onClick=${e}>
                                    <${N2}
                                        prefix="post"
                                        label=${"msg:"+f}
                                        title=${"Message "+f}
                                        icon="message"
                                        onClick=${e}
                                    />
                                </a>
                            `})}
                        ${M_.map((f)=>{let e=f.split("/").pop()||f;return V`
                                <${N2}
                                    prefix="post"
                                    label=${e}
                                    title=${f}
                                    onClick=${()=>R?.(f)}
                                />
                            `})}
                        ${P0.map((f)=>V`
                            <${y6}
                                key=${f.id}
                                attachment=${f}
                                onPreview=${Y_}
                            />
                        `)}
                    </div>
                `}
                ${D_&&V`
                    <div 
                        ref=${P}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:W_}}
                        onClick=${(f)=>{if(f.target.classList.contains("hashtag")){f.preventDefault(),f.stopPropagation();let e=f.target.dataset.hashtag;if(e)Z?.(e)}else if(f.target.tagName==="IMG")f.preventDefault(),f.stopPropagation(),Q(f.target.src)}}
                    />
                `}
                ${C0.length>0&&V`
                    <div ref=${h_} class="post-adaptive-cards" />
                `}
                ${t_.length>0&&V`
                    ${t_.map((f,e)=>V`
                        <${q3} key=${e} annotations=${f} />
                    `)}
                `}
                ${B0.length>0&&V`
                    <div class="media-preview">
                        ${B0.map(({id:f,mimeType:e})=>{let k_=typeof e==="string"&&e.toLowerCase().startsWith("image/svg")?s0(f):H4(f);return V`
                                <img 
                                    key=${f} 
                                    src=${k_} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(H_)=>i_(H_,f)}
                                />
                            `})}
                    </div>
                `}
                ${B0.length>0&&V`
                    ${B0.map(({annotations:f},e)=>V`
                        ${f&&V`<${q3} key=${e} annotations=${f} />`}
                    `)}
                `}
                ${D0.length>0&&V`
                    <div class="file-attachments">
                        ${D0.map((f)=>V`
                            <${F6} key=${f} mediaId=${f} onPreview=${Y_} />
                        `)}
                    </div>
                `}
                ${u_.length>0&&V`
                    <div class="resource-links">
                        ${u_.map((f,e)=>V`
                            <div key=${e}>
                                <${D6} block=${f} />
                                <${q3} annotations=${f.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${L0.length>0&&V`
                    <div class="resource-embeds">
                        ${L0.map((f,e)=>V`
                            <div key=${e}>
                                <${C6} block=${f} />
                                <${q3} annotations=${f.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${M.link_previews?.length>0&&V`
                    <div class="link-previews">
                        ${M.link_previews.map((f,e)=>V`
                            <${E6} key=${e} preview=${f} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${w&&V`<${B$} src=${w} onClose=${()=>Q(null)} />`}
        ${m_&&V`
            <${q$}
                mediaId=${m_.mediaId}
                info=${m_.info}
                onClose=${()=>U_(null)}
            />
        `}
    `}function V$({posts:_,hasMore:$,onLoadMore:Z,onPostClick:N,onHashtagClick:K,onMessageRef:J,onScrollToMessage:j,onFileRef:Y,emptyMessage:O,timelineRef:z,agents:W,user:q,onDeletePost:D,reverse:y=!0,removingPostIds:b,searchQuery:E}){let[R,w]=c(!1),Q=H(null),P=typeof IntersectionObserver<"u",M=S(async()=>{if(!Z||!$||R)return;w(!0);try{await Z({preserveScroll:!0,preserveMode:"top"})}finally{w(!1)}},[$,R,Z]),u=S((r)=>{let{scrollTop:K_,scrollHeight:o,clientHeight:__}=r.target,$_=y?o-__-K_:K_,X_=Math.max(300,__);if($_<X_)M()},[y,M]);v(()=>{if(!P)return;let r=Q.current,K_=z?.current;if(!r||!K_)return;let o=300,__=new IntersectionObserver(($_)=>{for(let X_ of $_){if(!X_.isIntersecting)continue;M()}},{root:K_,rootMargin:`${o}px 0px ${o}px 0px`,threshold:0});return __.observe(r),()=>__.disconnect()},[P,$,Z,z,M]);let n=H(M);if(n.current=M,v(()=>{if(P)return;if(!z?.current)return;let{scrollTop:r,scrollHeight:K_,clientHeight:o}=z.current,__=y?K_-o-r:r,$_=Math.max(300,o);if(__<$_)n.current?.()},[P,_,$,y,z]),v(()=>{if(!z?.current)return;if(!$||R)return;let{scrollTop:r,scrollHeight:K_,clientHeight:o}=z.current,__=y?K_-o-r:r,$_=Math.max(300,o);if(K_<=o+1||__<$_)n.current?.()},[_,$,R,y,z]),!_)return V`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return V`
            <div class="timeline" ref=${z}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${O||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let l=_.slice().sort((r,K_)=>r.id-K_.id),J_=(r)=>{let K_=r?.data?.thread_id;if(K_===null||K_===void 0||K_==="")return null;let o=Number(K_);return Number.isFinite(o)?o:null},z_=new Map;for(let r=0;r<l.length;r+=1){let K_=l[r],o=Number(K_?.id),__=J_(K_);if(__!==null){let $_=z_.get(__)||{anchorIndex:-1,replyIndexes:[]};$_.replyIndexes.push(r),z_.set(__,$_)}else if(Number.isFinite(o)){let $_=z_.get(o)||{anchorIndex:-1,replyIndexes:[]};$_.anchorIndex=r,z_.set(o,$_)}}let s=new Map;for(let[r,K_]of z_.entries()){let o=new Set;if(K_.anchorIndex>=0)o.add(K_.anchorIndex);for(let __ of K_.replyIndexes)o.add(__);s.set(r,Array.from(o).sort((__,$_)=>__-$_))}let G_=l.map((r,K_)=>{let o=J_(r);if(o===null)return{hasThreadPrev:!1,hasThreadNext:!1};let __=s.get(o);if(!__||__.length===0)return{hasThreadPrev:!1,hasThreadNext:!1};let $_=__.indexOf(K_);if($_<0)return{hasThreadPrev:!1,hasThreadNext:!1};return{hasThreadPrev:$_>0,hasThreadNext:$_<__.length-1}}),b_=V`<div class="timeline-sentinel" ref=${Q}></div>`;return V`
        <div class="timeline ${y?"reverse":"normal"}" ref=${z} onScroll=${u}>
            <div class="timeline-content">
                ${y?b_:null}
                ${l.map((r,K_)=>{let o=Boolean(r.data?.thread_id&&r.data.thread_id!==r.id),__=b?.has?.(r.id),$_=G_[K_]||{};return V`
                    <${W$}
                        key=${r.id}
                        post=${r}
                        isThreadReply=${o}
                        isThreadPrev=${$_.hasThreadPrev}
                        isThreadNext=${$_.hasThreadNext}
                        isRemoving=${__}
                        highlightQuery=${E}
                        agentName=${e4(r.data?.agent_id,W||{})}
                        agentAvatarUrl=${_$(r.data?.agent_id,W||{})}
                        userName=${q?.name||q?.user_name}
                        userAvatarUrl=${q?.avatar_url||q?.avatarUrl||q?.avatar}
                        userAvatarBackground=${q?.avatar_background||q?.avatarBackground}
                        onClick=${()=>N?.(r)}
                        onHashtagClick=${K}
                        onMessageRef=${J}
                        onScrollToMessage=${j}
                        onFileRef=${Y}
                        onDelete=${D}
                    />
                `})}
                ${y?null:b_}
            </div>
        </div>
    `}class X${extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,Z=-1/0;for(let N of this.extensions.values()){if(N.placement!=="tabs")continue;if(!N.canHandle)continue;try{let K=N.canHandle(_);if(K===!1||K===0)continue;let J=K===!0?0:typeof K==="number"?K:0;if(J>Z)Z=J,$=N}catch(K){console.warn(`[PaneRegistry] canHandle() error for "${N.id}":`,K)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var s_=new X$;var B3=null,J1=null;function Q$(){if(J1)return Promise.resolve(J1);if(!B3)B3=import("/static/dist/editor.bundle.js").then((_)=>{return J1=_,_}).catch((_)=>{throw B3=null,_});return B3}class U${container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await Q$();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){this.queuedViewStateCb=_,this.real?.onViewStateChange?.(_)}restoreViewState(_){this.queuedViewState=_,this.real?.restoreViewState?.(_)}getPath(){return this.real?.getPath?.()??this.context.path??""}setPath(_){this.real?.setPath?.(_)}}var K1={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;if(_.mode!=="edit")return!1;return 1},mount(_,$){return new U$(_,$)}};function j1(){Q$().catch(()=>{})}var m6={yellow:"#9a6700",magenta:"#8250df",cyan:"#1b7c83",brightBlack:"#57606a",brightRed:"#cf222e",brightGreen:"#1a7f37",brightYellow:"#bf8700",brightBlue:"#0550ae",brightMagenta:"#6f42c1",brightCyan:"#0a7b83"},v6={yellow:"#d29922",magenta:"#bc8cff",cyan:"#39c5cf",brightBlack:"#8b949e",brightRed:"#ff7b72",brightGreen:"#7ee787",brightYellow:"#e3b341",brightBlue:"#79c0ff",brightMagenta:"#d2a8ff",brightCyan:"#56d4dd"},W3=null,z1=null;function R6(_){if(!_)return!1;return _.startsWith("data:application/wasm")||/(^|\/)ghostty-vt\.wasm(?:[?#].*)?$/.test(_)}async function g6(_){let $=globalThis.fetch?.bind(globalThis);if(!$)return await _();let Z=new URL("/static/js/vendor/ghostty-vt.wasm",window.location.origin).href,N=(K,J)=>{let j=K instanceof Request?K.url:K instanceof URL?K.href:String(K);if(!R6(j))return $(K,J);if(K instanceof Request)return $(new Request(Z,K));return $(Z,J)};globalThis.fetch=N;try{return await _()}finally{globalThis.fetch=$}}async function h6(){let $=await import(new URL("/static/js/vendor/ghostty-web.js",window.location.origin).href);if(!W3)W3=g6(()=>Promise.resolve($.init?.())).catch((Z)=>{throw W3=null,Z});return await W3,$}async function p6(){if(typeof document>"u"||!("fonts"in document)||!document.fonts)return;if(!z1)z1=Promise.allSettled([document.fonts.load('400 13px "FiraCode Nerd Font Mono"'),document.fonts.load('700 13px "FiraCode Nerd Font Mono"'),document.fonts.ready]).then(()=>{return}).catch(()=>{return});await z1}async function i6(){let _=await fetch("/terminal/session",{method:"GET",credentials:"same-origin"}),$=await _.json().catch(()=>({}));if(!_.ok)throw Error($?.error||`HTTP ${_.status}`);return $}function n6(_){return`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}${_}`}function l6(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,Z=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(Z==="dark")return!0;if(Z==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function K2(_,$=""){if(typeof document>"u")return $;return getComputedStyle(document.documentElement).getPropertyValue(_)?.trim()||$}function o6(_,$){if(!_||!_.startsWith("#"))return _;let Z=_.slice(1);if(Z.length===3)return`#${Z[0]}${Z[0]}${Z[1]}${Z[1]}${Z[2]}${Z[2]}${$}`;if(Z.length===6)return`#${Z}${$}`;return _}function H$(){let _=l6(),$=_?v6:m6,Z=K2("--bg-primary",_?"#000000":"#ffffff"),N=K2("--text-primary",_?"#e7e9ea":"#0f1419"),K=K2("--text-secondary",_?"#71767b":"#536471"),J=K2("--accent-color","#1d9bf0"),j=K2("--danger-color",_?"#ff7b72":"#cf222e"),Y=K2("--success-color",_?"#7ee787":"#1a7f37"),O=K2("--bg-hover",_?"#1d1f23":"#e8ebed"),z=K2("--border-color",_?"#2f3336":"#eff3f4"),W=K2("--accent-soft-strong",o6(J,_?"47":"33"));return{background:Z,foreground:N,cursor:J,cursorAccent:Z,selectionBackground:W,selectionForeground:N,black:O,red:j,green:Y,yellow:$.yellow,blue:J,magenta:$.magenta,cyan:$.cyan,white:N,brightBlack:$.brightBlack,brightRed:$.brightRed,brightGreen:$.brightGreen,brightYellow:$.brightYellow,brightBlue:$.brightBlue,brightMagenta:$.brightMagenta,brightCyan:$.brightCyan,brightWhite:z}}class F${container;disposed=!1;termEl;bodyEl;statusEl;terminal=null;fitAddon=null;socket=null;themeObserver=null;themeChangeListener=null;mediaQuery=null;mediaQueryListener=null;resizeObserver=null;dockResizeListener=null;windowResizeListener=null;resizeFrame=0;lastAppliedThemeSignature=null;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0"),this.statusEl=document.createElement("span"),this.statusEl.className="terminal-pane-status",this.statusEl.textContent="Loading terminal…",this.bodyEl=document.createElement("div"),this.bodyEl.className="terminal-pane-body",this.bodyEl.innerHTML='<div class="terminal-placeholder">Bootstrapping ghostty-web…</div>',this.termEl.append(this.bodyEl),_.appendChild(this.termEl),this.bootstrapGhostty()}setStatus(_){this.statusEl.textContent=_,this.termEl.dataset.connectionStatus=_,this.termEl.setAttribute("aria-label",`Terminal ${_}`)}syncHostLayout(){let _=this.bodyEl.querySelector(".terminal-live-host");if(!(_ instanceof HTMLElement))return;let $=_.firstElementChild;if($ instanceof HTMLElement)$.style.width="100%",$.style.height="100%",$.style.maxWidth="100%",$.style.minWidth="0",$.style.display="block";let Z=_.querySelector("canvas");if(Z instanceof HTMLElement)Z.style.display="block",Z.style.maxWidth="none"}scheduleResize(){if(this.disposed)return;if(this.resizeFrame)cancelAnimationFrame(this.resizeFrame);this.resizeFrame=requestAnimationFrame(()=>{this.resizeFrame=0,this.resize()})}async bootstrapGhostty(){try{let _=await h6();if(await p6(),this.disposed)return;this.bodyEl.innerHTML="";let $=document.createElement("div");$.className="terminal-live-host",this.bodyEl.appendChild($);let Z=new _.Terminal({cols:120,rows:30,cursorBlink:!0,fontFamily:'FiraCode Nerd Font Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',fontSize:13,theme:H$()}),N=null;if(typeof _.FitAddon==="function")N=new _.FitAddon,Z.loadAddon?.(N);await Z.open($),this.syncHostLayout(),Z.loadFonts?.(),N?.observeResize?.(),this.terminal=Z,this.fitAddon=N,this.installThemeSync(),this.installResizeSync(),this.scheduleResize(),await this.connectBackend()}catch(_){if(console.error("[terminal-pane] Failed to bootstrap ghostty-web:",_),this.disposed)return;this.bodyEl.innerHTML='<div class="terminal-placeholder">Terminal failed to load. Check vendored assets and backend wiring.</div>',this.setStatus("Load failed")}}applyTheme(){if(!this.terminal)return;let _=H$(),$=JSON.stringify(_),Z=this.lastAppliedThemeSignature!==null&&this.lastAppliedThemeSignature!==$;try{this.termEl.style.backgroundColor=_.background,this.bodyEl.style.backgroundColor=_.background;let N=this.bodyEl.querySelector(".terminal-live-host");if(N instanceof HTMLElement)N.style.backgroundColor=_.background,N.style.color=_.foreground;let K=this.bodyEl.querySelector("canvas");if(K instanceof HTMLElement)K.style.backgroundColor=_.background,K.style.color=_.foreground}catch{}try{if(this.terminal.options)this.terminal.options.theme=_}catch{}try{if(Z&&this.terminal.reset)this.terminal.reset()}catch{}try{this.terminal.renderer?.setTheme?.(_),this.terminal.renderer?.clear?.()}catch{}try{this.terminal.loadFonts?.()}catch{}try{this.terminal.renderer?.remeasureFont?.()}catch{}try{if(this.terminal.wasmTerm&&this.terminal.renderer?.render)this.terminal.renderer.render(this.terminal.wasmTerm,!0,this.terminal.viewportY||0,this.terminal),this.terminal.renderer.render(this.terminal.wasmTerm,!1,this.terminal.viewportY||0,this.terminal)}catch{}try{this.resize()}catch{}try{if(Z&&this.socket?.readyState===WebSocket.OPEN)this.socket.send(JSON.stringify({type:"input",data:"\f"}))}catch{}try{this.terminal.refresh?.()}catch{}this.lastAppliedThemeSignature=$}installThemeSync(){if(typeof window>"u"||typeof document>"u")return;let _=()=>requestAnimationFrame(()=>this.applyTheme());_();let $=()=>_();window.addEventListener("piclaw-theme-change",$),this.themeChangeListener=$;let Z=window.matchMedia?.("(prefers-color-scheme: dark)"),N=()=>_();if(Z?.addEventListener)Z.addEventListener("change",N);else if(Z?.addListener)Z.addListener(N);this.mediaQuery=Z,this.mediaQueryListener=N;let K=typeof MutationObserver<"u"?new MutationObserver(()=>_()):null;if(K?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","style"]}),document.body)K?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});this.themeObserver=K}installResizeSync(){if(typeof window>"u")return;let _=()=>this.scheduleResize(),$=()=>this.scheduleResize();if(window.addEventListener("dock-resize",_),window.addEventListener("resize",$),this.dockResizeListener=_,this.windowResizeListener=$,typeof ResizeObserver<"u"){let Z=new ResizeObserver(()=>this.scheduleResize());Z.observe(this.container),Z.observe(this.bodyEl),this.resizeObserver=Z}}async connectBackend(){let _=this.terminal;if(!_)return;try{let $=await i6();if(this.disposed)return;if(!$?.enabled){_.write?.(`Terminal backend unavailable: ${$?.error||"disabled"}\r
`),this.setStatus("Unavailable");return}let Z=new WebSocket(n6($.ws_path||"/terminal/ws"));this.socket=Z,this.setStatus("Connecting…"),_.onData?.((N)=>{if(Z.readyState===WebSocket.OPEN)Z.send(JSON.stringify({type:"input",data:N}))}),_.onResize?.(({cols:N,rows:K})=>{if(Z.readyState===WebSocket.OPEN)Z.send(JSON.stringify({type:"resize",cols:N,rows:K}))}),Z.addEventListener("open",()=>{if(this.disposed)return;this.setStatus("Connected"),this.scheduleResize()}),Z.addEventListener("message",(N)=>{if(this.disposed)return;let K=null;try{K=JSON.parse(String(N.data))}catch{K={type:"output",data:String(N.data)}}if(K?.type==="output"&&typeof K.data==="string"){_.write?.(K.data);return}if(K?.type==="exit")_.write?.(`\r
[terminal exited]\r
`),this.setStatus("Exited")}),Z.addEventListener("close",()=>{if(this.disposed)return;this.setStatus("Disconnected")}),Z.addEventListener("error",()=>{if(this.disposed)return;this.setStatus("Connection error")})}catch($){_.write?.(`Terminal backend unavailable: ${$ instanceof Error?$.message:String($)}\r
`),this.setStatus("Unavailable")}}sendResize(){if(!this.socket||this.socket.readyState!==WebSocket.OPEN||!this.fitAddon?.proposeDimensions)return;let _=this.fitAddon.proposeDimensions();if(!_)return;this.socket.send(JSON.stringify({type:"resize",cols:_.cols,rows:_.rows}))}getContent(){return}isDirty(){return!1}focus(){if(this.terminal?.focus){this.terminal.focus();return}this.termEl?.focus()}resize(){this.syncHostLayout();try{this.terminal?.renderer?.remeasureFont?.()}catch{}try{this.fitAddon?.fit?.()}catch{}try{this.terminal?.refresh?.()}catch{}this.syncHostLayout(),this.sendResize()}dispose(){if(this.disposed)return;this.disposed=!0;try{if(this.resizeFrame)cancelAnimationFrame(this.resizeFrame),this.resizeFrame=0}catch{}try{if(this.themeChangeListener)window.removeEventListener("piclaw-theme-change",this.themeChangeListener)}catch{}try{if(this.mediaQuery&&this.mediaQueryListener){if(this.mediaQuery.removeEventListener)this.mediaQuery.removeEventListener("change",this.mediaQueryListener);else if(this.mediaQuery.removeListener)this.mediaQuery.removeListener(this.mediaQueryListener)}}catch{}try{if(this.dockResizeListener)window.removeEventListener("dock-resize",this.dockResizeListener);if(this.windowResizeListener)window.removeEventListener("resize",this.windowResizeListener)}catch{}try{this.themeObserver?.disconnect?.()}catch{}try{this.resizeObserver?.disconnect?.()}catch{}try{this.socket?.close?.()}catch{}try{this.fitAddon?.dispose?.()}catch{}try{this.terminal?.dispose?.()}catch{}this.termEl?.remove()}}var Y1={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new F$(_,$)}};function L2(_){return String(_||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function r6(_,$){let Z=String(_||"").trim();if(!Z)return Z;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(Z)||Z.startsWith("#")||Z.startsWith("data:")||Z.startsWith("blob:"))return Z;let N=Z.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),K=N?.[1]||Z,J=N?.[2]||"",j=N?.[3]||"",Y=String($||"").split("/").slice(0,-1).join("/"),z=K.startsWith("/")?K:`${Y?`${Y}/`:""}${K}`,W=[];for(let D of z.split("/")){if(!D||D===".")continue;if(D===".."){if(W.length>0)W.pop();continue}W.push(D)}let q=W.join("/");return`${o3(q)}${J}${j}`}function m2(_){return _?.preview||null}function d6(_){let $=String(_||""),Z=Math.max($.lastIndexOf("/"),$.lastIndexOf("\\")),N=Z>=0?$.slice(Z+1):$,K=N.lastIndexOf(".");if(K<=0||K===N.length-1)return"none";return N.slice(K+1)}function s6(_){if(!_)return"unknown";if(_.kind==="image")return"image";if(_.kind==="text")return _.content_type==="text/markdown"?"markdown":"text";if(_.kind==="binary")return"binary";return String(_.kind||"unknown")}function a6(_,$){let Z=$?.path||_?.path||"",N=[];if($?.content_type)N.push(`<span><strong>type:</strong> ${L2($.content_type)}</span>`);if(typeof $?.size==="number")N.push(`<span><strong>size:</strong> ${L2(M0($.size))}</span>`);if($?.mtime)N.push(`<span><strong>modified:</strong> ${L2(b2($.mtime))}</span>`);if(N.push(`<span><strong>kind:</strong> ${L2(s6($))}</span>`),N.push(`<span><strong>extension:</strong> ${L2(d6(Z))}</span>`),Z)N.push(`<span><strong>path:</strong> ${L2(Z)}</span>`);if($?.truncated)N.push("<span><strong>content:</strong> truncated</span>");return`<div class="workspace-preview-meta workspace-preview-meta-inline">${N.join("")}</div>`}function t6(_){let $=m2(_);if(!$)return'<div class="workspace-preview-text">No preview available.</div>';let Z=a6(_,$);if($.kind==="image"){let N=$.url||($.path?o3($.path):"");return`${Z}
            <div class="workspace-preview-image">
                <img src="${L2(N)}" alt="preview" />
            </div>
        `}if($.kind==="text"){if($.content_type==="text/markdown"){let N=a0($.text||"",null,{rewriteImageSrc:(K)=>r6(K,$.path||_?.path)});return`${Z}<div class="workspace-preview-text">${N}</div>`}return`${Z}<pre class="workspace-preview-text"><code>${L2($.text||"")}</code></pre>`}if($.kind==="binary")return`${Z}<div class="workspace-preview-text">Binary file — download to view.</div>`;return`${Z}<div class="workspace-preview-text">No preview available.</div>`}class O1{constructor(_,$){this.container=_,this.context=$,this.disposed=!1,this.host=document.createElement("div"),this.host.className="workspace-preview-render-host",this.host.tabIndex=0,this.container.appendChild(this.host),this.render()}render(){if(this.disposed)return;this.host.innerHTML=t6(this.context)}getContent(){let _=m2(this.context);return typeof _?.text==="string"?_.text:void 0}isDirty(){return!1}setContent(_,$){let Z=m2(this.context);if(Z&&Z.kind==="text"){if(Z.text=_,$!==void 0)Z.mtime=$}if(this.context.content=_,$!==void 0)this.context.mtime=$;this.render()}focus(){this.host?.focus?.()}dispose(){if(this.disposed)return;this.disposed=!0,this.host?.remove(),this.container.innerHTML=""}}var G1={id:"workspace-markdown-preview",label:"Workspace Markdown Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){let $=m2(_);if(_?.mode!=="view")return!1;if(!$||$.kind!=="text")return!1;return $.content_type==="text/markdown"?20:!1},mount(_,$){return new O1(_,$)}},L1={id:"workspace-preview-default",label:"Workspace Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){if(_?.mode!=="view")return!1;return m2(_)||_?.path?1:!1},mount(_,$){return new O1(_,$)}};class y${tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let Z of this.listeners)try{Z(_,$)}catch{}}open(_,$){let Z=this.tabs.get(_);if(!Z)Z={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,Z);return this.activate(_),Z}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((Z)=>Z!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,Z]of this.tabs)if($!==_&&!Z.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((N)=>N!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((Z)=>Z!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let Z=this.tabs.get(_);if(!Z||Z.dirty===$)return;Z.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let Z=this.tabs.get(_);if(Z)Z.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,Z){let N=this.tabs.get(_);if(!N)return;if(this.tabs.delete(_),N.id=$,N.path=$,N.label=Z||$.split("/").pop()||$,this.tabs.set($,N),this.mruOrder=this.mruOrder.map((K)=>K===_?$:K),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((N)=>N.id===this.activeId),Z=_[($+1)%_.length];this.activate(Z.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((N)=>N.id===this.activeId),Z=_[($-1+_.length)%_.length];this.activate(Z.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var x_=new y$;var V3="workspaceExplorerScale",e6=["compact","default","comfortable"],_5=new Set(e6),$5={compact:{indentPx:14},default:{indentPx:16},comfortable:{indentPx:18}};function D$(_,$="default"){if(typeof _!=="string")return $;let Z=_.trim().toLowerCase();return _5.has(Z)?Z:$}function q1(){if(typeof window>"u")return{width:0,isTouch:!1};let _=Number(window.innerWidth)||0,$=Boolean(window.matchMedia?.("(pointer: coarse)")?.matches),Z=Boolean(window.matchMedia?.("(hover: none)")?.matches),N=Number(globalThis.navigator?.maxTouchPoints||0)>0;return{width:_,isTouch:$||N&&Z}}function Z5(_={}){let $=Math.max(0,Number(_.width)||0);if(Boolean(_.isTouch))return"comfortable";if($>0&&$<1180)return"comfortable";return"default"}function N5(_,$={}){if(Boolean($.isTouch)&&_==="compact")return"default";return _}function B1(_={}){let $=Z5(_),Z=_.stored?D$(_.stored,$):$;return N5(Z,_)}function C$(_){return $5[D$(_)]}var J5=60000,A$=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function w$(_,$,Z,N=0,K=[]){if(!Z&&A$(_))return K;if(!_)return K;if(K.push({node:_,depth:N}),_.type==="dir"&&_.children&&$.has(_.path))for(let J of _.children)w$(J,$,Z,N+1,K);return K}function k$(_,$,Z){if(!_)return"";let N=[],K=(J)=>{if(!Z&&A$(J))return;if(N.push(J.type==="dir"?`d:${J.path}`:`f:${J.path}`),J.children&&$?.has(J.path))for(let j of J.children)K(j)};return K(_),N.join("|")}function Q1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let Z=Array.isArray(_.children)?_.children:null,N=Array.isArray($.children)?$.children:null;if(!N)return _;let K=Z?new Map(Z.map((Y)=>[Y?.path,Y])):new Map,J=!Z||Z.length!==N.length,j=N.map((Y)=>{let O=Q1(K.get(Y.path),Y);if(O!==K.get(Y.path))J=!0;return O});return J?{...$,children:j}:_}function V1(_,$,Z){if(!_)return _;if(_.path===$)return Q1(_,Z);if(!Array.isArray(_.children))return _;let N=!1,K=_.children.map((J)=>{let j=V1(J,$,Z);if(j!==J)N=!0;return j});return N?{..._,children:K}:_}var M$=4,W1=14,K5=8,j5=16;function P$(_){if(!_)return 0;if(_.type==="file"){let N=Math.max(0,Number(_.size)||0);return _.__bytes=N,N}let $=Array.isArray(_.children)?_.children:[],Z=0;for(let N of $)Z+=P$(N);return _.__bytes=Z,Z}function S$(_,$=0){let Z=Math.max(0,Number(_?.__bytes??_?.size??0)),N={name:_?.name||_?.path||".",path:_?.path||".",size:Z,children:[]};if(!_||_.type!=="dir"||$>=M$)return N;let K=Array.isArray(_.children)?_.children:[],J=[];for(let Y of K){let O=Math.max(0,Number(Y?.__bytes??Y?.size??0));if(O<=0)continue;if(Y.type==="dir")J.push({kind:"dir",node:Y,size:O});else J.push({kind:"file",name:Y.name,path:Y.path,size:O})}J.sort((Y,O)=>O.size-Y.size);let j=J;if(J.length>W1){let Y=J.slice(0,W1-1),O=J.slice(W1-1),z=O.reduce((W,q)=>W+q.size,0);Y.push({kind:"other",name:`+${O.length} more`,path:`${N.path}/[other]`,size:z}),j=Y}return N.children=j.map((Y)=>{if(Y.kind==="dir")return S$(Y.node,$+1);return{name:Y.name,path:Y.path,size:Y.size,children:[]}}),N}function E$(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,Z=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(Z==="dark")return!0;if(Z==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function x$(_,$,Z){let N=((_+Math.PI/2)*180/Math.PI+360)%360,K=Z?Math.max(30,70-$*10):Math.max(34,66-$*8),J=Z?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${N.toFixed(1)} ${K}% ${J}%)`}function X3(_,$,Z,N){return{x:_+Z*Math.cos(N),y:$+Z*Math.sin(N)}}function U1(_,$,Z,N,K,J){let j=Math.PI*2-0.0001,Y=J-K>j?K+j:J,O=X3(_,$,N,K),z=X3(_,$,N,Y),W=X3(_,$,Z,Y),q=X3(_,$,Z,K),D=Y-K>Math.PI?1:0;return[`M ${O.x.toFixed(3)} ${O.y.toFixed(3)}`,`A ${N} ${N} 0 ${D} 1 ${z.x.toFixed(3)} ${z.y.toFixed(3)}`,`L ${W.x.toFixed(3)} ${W.y.toFixed(3)}`,`A ${Z} ${Z} 0 ${D} 0 ${q.x.toFixed(3)} ${q.y.toFixed(3)}`,"Z"].join(" ")}var f$={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function T$(_,$,Z){let N=[],K=[],J=Math.max(0,Number($)||0),j=(Y,O,z,W)=>{let q=Array.isArray(Y?.children)?Y.children:[];if(!q.length)return;let D=Math.max(0,Number(Y.size)||0);if(D<=0)return;let y=z-O,b=O;q.forEach((E,R)=>{let w=Math.max(0,Number(E.size)||0);if(w<=0)return;let Q=w/D,P=b,M=R===q.length-1?z:b+y*Q;if(b=M,M-P<0.003)return;let u=f$[W];if(u){let n=x$(P,W,Z);if(N.push({key:E.path,path:E.path,label:E.name,size:w,color:n,depth:W,startAngle:P,endAngle:M,innerRadius:u[0],outerRadius:u[1],d:U1(120,120,u[0],u[1],P,M)}),W===1)K.push({key:E.path,name:E.name,size:w,pct:J>0?w/J*100:0,color:n})}if(W<M$)j(E,P,M,W+1)})};return j(_,-Math.PI/2,Math.PI*3/2,1),{segments:N,legend:K}}function X1(_,$){if(!_||!$)return null;if(_.path===$)return _;let Z=Array.isArray(_.children)?_.children:[];for(let N of Z){let K=X1(N,$);if(K)return K}return null}function I$(_,$,Z,N){if(!Z||Z<=0)return{segments:[],legend:[]};let K=f$[1];if(!K)return{segments:[],legend:[]};let J=-Math.PI/2,j=Math.PI*3/2,Y=x$(J,1,N),z=`${$||"."}/[files]`;return{segments:[{key:z,path:z,label:_,size:Z,color:Y,depth:1,startAngle:J,endAngle:j,innerRadius:K[0],outerRadius:K[1],d:U1(120,120,K[0],K[1],J,j)}],legend:[{key:z,name:_,size:Z,pct:100,color:Y}]}}function b$(_,$=!1,Z=!1){if(!_)return null;let N=P$(_),K=S$(_,0),J=K.size||N,{segments:j,legend:Y}=T$(K,J,Z);if(!j.length&&J>0){let O=I$("[files]",K.path,J,Z);j=O.segments,Y=O.legend}return{root:K,totalSize:J,segments:j,legend:Y,truncated:$,isDarkTheme:Z}}function z5({payload:_}){if(!_)return null;let[$,Z]=c(null),[N,K]=c(_?.root?.path||"."),[J,j]=c(()=>[_?.root?.path||"."]),[Y,O]=c(!1);v(()=>{let s=_?.root?.path||".";K(s),j([s]),Z(null)},[_?.root?.path,_?.totalSize]),v(()=>{if(!N)return;O(!0);let s=setTimeout(()=>O(!1),180);return()=>clearTimeout(s)},[N]);let z=Z0(()=>{return X1(_.root,N)||_.root},[_?.root,N]),W=z?.size||_.totalSize||0,{segments:q,legend:D}=Z0(()=>{let s=T$(z,W,_.isDarkTheme);if(s.segments.length>0)return s;if(W<=0)return s;let G_=z?.children?.length?"Total":"[files]";return I$(G_,z?.path||_?.root?.path||".",W,_.isDarkTheme)},[z,W,_.isDarkTheme,_?.root?.path]),[y,b]=c(q),E=H(new Map),R=H(0);v(()=>{let s=E.current,G_=new Map(q.map((o)=>[o.key,o])),b_=performance.now(),r=220,K_=(o)=>{let __=Math.min(1,(o-b_)/220),$_=__*(2-__),X_=q.map((Z_)=>{let y_=s.get(Z_.key)||{startAngle:Z_.startAngle,endAngle:Z_.startAngle,innerRadius:Z_.innerRadius,outerRadius:Z_.innerRadius},M_=(p_,N_)=>p_+(N_-p_)*$_,v_=M_(y_.startAngle,Z_.startAngle),I_=M_(y_.endAngle,Z_.endAngle),H0=M_(y_.innerRadius,Z_.innerRadius),P_=M_(y_.outerRadius,Z_.outerRadius);return{...Z_,d:U1(120,120,H0,P_,v_,I_)}});if(b(X_),__<1)R.current=requestAnimationFrame(K_)};if(R.current)cancelAnimationFrame(R.current);return R.current=requestAnimationFrame(K_),E.current=G_,()=>{if(R.current)cancelAnimationFrame(R.current)}},[q]);let w=y.length?y:q,Q=W>0?M0(W):"0 B",P=z?.name||"",u=(P&&P!=="."?P:"Total")||"Total",n=Q,l=J.length>1,J_=(s)=>{if(!s?.path)return;let G_=X1(_.root,s.path);if(!G_||!Array.isArray(G_.children)||G_.children.length===0)return;j((b_)=>[...b_,G_.path]),K(G_.path),Z(null)},z_=()=>{if(!l)return;j((s)=>{let G_=s.slice(0,-1);return K(G_[G_.length-1]||_?.root?.path||"."),G_}),Z(null)};return V`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${Y?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${z?.path||_?.root?.path||"."}`}
                data-segments=${w.length}
                data-base-size=${W}>
                ${w.map((s)=>V`
                    <path
                        key=${s.key}
                        d=${s.d}
                        fill=${s.color}
                        stroke="var(--bg-primary)"
                        stroke-width="1"
                        class=${`workspace-folder-starburst-segment${$?.key===s.key?" is-hovered":""}`}
                        onMouseEnter=${()=>Z(s)}
                        onMouseLeave=${()=>Z(null)}
                        onTouchStart=${()=>Z(s)}
                        onTouchEnd=${()=>Z(null)}
                        onClick=${()=>J_(s)}
                    >
                        <title>${s.label} — ${M0(s.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${l?" is-drill":""}`}
                    onClick=${z_}
                    role="button"
                    aria-label="Zoom out"
                >
                    <circle
                        cx="120"
                        cy="120"
                        r="24"
                        fill="var(--bg-secondary)"
                        stroke="var(--border-color)"
                        stroke-width="1"
                        class="workspace-folder-starburst-center"
                    />
                    <text x="120" y="114" text-anchor="middle" class="workspace-folder-starburst-total-label">${u}</text>
                    <text x="120" y="130" text-anchor="middle" class="workspace-folder-starburst-total-value">${n}</text>
                </g>
            </svg>
            ${D.length>0&&V`
                <div class="workspace-folder-starburst-legend">
                    ${D.slice(0,8).map((s)=>V`
                        <div key=${s.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${s.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${s.name}>${s.name}</span>
                            <span class="workspace-folder-starburst-size">${M0(s.size)}</span>
                            <span class="workspace-folder-starburst-pct">${s.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&V`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function Y5({mediaId:_}){let[$,Z]=c(null);if(v(()=>{if(!_)return;T2(_).then(Z).catch(()=>{})},[_]),!$)return null;let N=$.filename||"file",K=$.metadata?.size?M0($.metadata.size):"";return V`
        <a href=${s0(_)} download=${N} class="file-attachment"
            onClick=${(J)=>J.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${N}</span>
                ${K&&V`<span class="file-size">${K}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function u$({onFileSelect:_,visible:$=!0,active:Z=void 0,onOpenEditor:N}){let[K,J]=c(null),[j,Y]=c(new Set(["."])),[O,z]=c(null),[W,q]=c(null),[D,y]=c(""),[b,E]=c(null),[R,w]=c(null),[Q,P]=c(!0),[M,u]=c(!1),[n,l]=c(null),[J_,z_]=c(()=>C2("workspaceShowHidden",!1)),[s,G_]=c(!1),[b_,r]=c(null),[K_,o]=c(null),[__,$_]=c(null),[X_,Z_]=c(!1),[L_,y_]=c(null),[M_,v_]=c(()=>E$()),[I_,H0]=c(()=>B1({stored:w0(V3),...q1()})),P_=H(j),p_=H(""),N_=H(null),B_=H(0),D_=H(new Set),Q_=H(null),W_=H(new Map),i_=H(_),m_=H(N),U_=H(null),Y_=H(null),C_=H(null),a_=H(null),A_=H(null),r_=H(null),g_=H("."),u_=H(null),L0=H({path:null,dragging:!1,startX:0,startY:0}),t_=H({path:null,dragging:!1,startX:0,startY:0}),q0=H({path:null,timer:0}),y0=H(!1),e_=H(0),B0=H(new Map),D0=H(null),P0=H(null),C0=H(null),h_=H(null),f=H(J_),e=H($),V_=H(Z??$),k_=H(0),H_=H(__),k0=H(s),S0=H(b_),E0=H(null),t0=H({x:0,y:0}),x0=H(0),F0=H(null),J0=H(O),_0=H(W),g0=H(null),f0=H(null),T0=H(b);i_.current=_,m_.current=N,v(()=>{P_.current=j},[j]),v(()=>{f.current=J_},[J_]),v(()=>{e.current=$},[$]),v(()=>{V_.current=Z??$},[Z,$]),v(()=>{H_.current=__},[__]),v(()=>{if(typeof window>"u")return;let L=()=>{H0(B1({stored:w0(V3),...q1()}))};L();let X=()=>L(),C=()=>L(),k=(g)=>{if(!g||g.key===null||g.key===V3)L()};window.addEventListener("resize",X),window.addEventListener("focus",C),window.addEventListener("storage",k);let m=window.matchMedia?.("(pointer: coarse)"),i=window.matchMedia?.("(hover: none)"),p=(g,j_)=>{if(!g)return;if(g.addEventListener)g.addEventListener("change",j_);else if(g.addListener)g.addListener(j_)},d=(g,j_)=>{if(!g)return;if(g.removeEventListener)g.removeEventListener("change",j_);else if(g.removeListener)g.removeListener(j_)};return p(m,X),p(i,X),()=>{window.removeEventListener("resize",X),window.removeEventListener("focus",C),window.removeEventListener("storage",k),d(m,X),d(i,X)}},[]),v(()=>{let L=(X)=>{let C=X?.detail?.path;if(!C)return;let k=C.split("/"),m=[];for(let i=1;i<k.length;i++)m.push(k.slice(0,i).join("/"));if(m.length)Y((i)=>{let p=new Set(i);p.add(".");for(let d of m)p.add(d);return p});z(C),requestAnimationFrame(()=>{let i=document.querySelector(`[data-path="${CSS.escape(C)}"]`);if(i)i.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",L),()=>window.removeEventListener("workspace-reveal-path",L)},[]),v(()=>{k0.current=s},[s]),v(()=>{S0.current=b_},[b_]),v(()=>{J0.current=O},[O]),v(()=>{_0.current=W},[W]),v(()=>{T0.current=b},[b]),v(()=>{if(typeof window>"u"||typeof document>"u")return;let L=()=>v_(E$());L();let X=window.matchMedia?.("(prefers-color-scheme: dark)"),C=()=>L();if(X?.addEventListener)X.addEventListener("change",C);else if(X?.addListener)X.addListener(C);let k=typeof MutationObserver<"u"?new MutationObserver(()=>L()):null;if(k?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)k?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(X?.removeEventListener)X.removeEventListener("change",C);else if(X?.removeListener)X.removeListener(C);k?.disconnect()}},[]),v(()=>{if(!W)return;let L=A_.current;if(!L)return;let X=requestAnimationFrame(()=>{try{L.focus(),L.select()}catch{}});return()=>cancelAnimationFrame(X)},[W]);let I0=async(L)=>{u(!0),E(null),w(null);try{let X=await D4(L,20000);E(X)}catch(X){E({error:X.message||"Failed to load preview"})}finally{u(!1)}};U_.current=I0;let H2=async()=>{if(!e.current)return;try{let L=await $3("",1,f.current),X=k$(L.root,P_.current,f.current);if(X===p_.current){P(!1);return}if(p_.current=X,N_.current=L.root,!B_.current)B_.current=requestAnimationFrame(()=>{B_.current=0,J((C)=>Q1(C,N_.current)),P(!1)})}catch(L){l(L.message||"Failed to load workspace"),P(!1)}},u0=async(L)=>{if(!L)return;if(D_.current.has(L))return;D_.current.add(L);try{let X=await $3(L,1,f.current);J((C)=>V1(C,L,X.root))}catch(X){l(X.message||"Failed to load workspace")}finally{D_.current.delete(L)}};Y_.current=u0;let f_=S(()=>{let L=O;if(!L)return".";let X=W_.current?.get(L);if(X&&X.type==="dir")return X.path;if(L==="."||!L.includes("/"))return".";let C=L.split("/");return C.pop(),C.join("/")||"."},[O]),z0=S((L)=>{let X=L?.closest?.(".workspace-row");if(!X)return null;let C=X.dataset.path,k=X.dataset.type;if(!C)return null;if(k==="dir")return C;if(C.includes("/")){let m=C.split("/");return m.pop(),m.join("/")||"."}return"."},[]),h0=S((L)=>{return z0(L?.target||null)},[z0]),n_=S((L)=>{H_.current=L,$_(L)},[]),d_=S(()=>{let L=q0.current;if(L?.timer)clearTimeout(L.timer);q0.current={path:null,timer:0}},[]),W0=S((L)=>{if(!L||L==="."){d_();return}let X=W_.current?.get(L);if(!X||X.type!=="dir"){d_();return}if(P_.current?.has(L)){d_();return}if(q0.current?.path===L)return;d_();let C=setTimeout(()=>{q0.current={path:null,timer:0},Y_.current?.(L),Y((k)=>{let m=new Set(k);return m.add(L),m})},600);q0.current={path:L,timer:C}},[d_]),p0=S((L,X)=>{if(t0.current={x:L,y:X},x0.current)return;x0.current=requestAnimationFrame(()=>{x0.current=0;let C=E0.current;if(!C)return;let k=t0.current;C.style.transform=`translate(${k.x+12}px, ${k.y+12}px)`})},[]),c0=S((L)=>{if(!L)return;let C=(W_.current?.get(L)?.name||L.split("/").pop()||L).trim();if(!C)return;o({path:L,label:C})},[]),m0=S(()=>{if(o(null),x0.current)cancelAnimationFrame(x0.current),x0.current=0;if(E0.current)E0.current.style.transform="translate(-9999px, -9999px)"},[]),i0=S((L)=>{if(!L)return".";let X=W_.current?.get(L);if(X&&X.type==="dir")return X.path;if(L==="."||!L.includes("/"))return".";let C=L.split("/");return C.pop(),C.join("/")||"."},[]),V0=S(()=>{q(null),y("")},[]),q2=S((L)=>{if(!L)return;let C=(W_.current?.get(L)?.name||L.split("/").pop()||L).trim();if(!C||L===".")return;q(L),y(C)},[]),B2=S(async()=>{let L=_0.current;if(!L)return;let X=(D||"").trim();if(!X){V0();return}let C=W_.current?.get(L),k=(C?.name||L.split("/").pop()||L).trim();if(X===k){V0();return}try{let i=(await E4(L,X))?.path||L,p=L.includes("/")?L.split("/").slice(0,-1).join("/")||".":".";if(V0(),l(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:L,newPath:i,type:C?.type||"file"}})),C?.type==="dir")Y((d)=>{let g=new Set;for(let j_ of d)if(j_===L)g.add(i);else if(j_.startsWith(`${L}/`))g.add(`${i}${j_.slice(L.length)}`);else g.add(j_);return g});if(z(i),C?.type==="dir")E(null),u(!1),w(null);else U_.current?.(i);Y_.current?.(p)}catch(m){l(m?.message||"Failed to rename file")}},[V0,D]),F2=S(async(L)=>{let k=L||".";for(let m=0;m<50;m+=1){let p=`untitled${m===0?"":`-${m}`}.md`;try{let g=(await k4(k,p,""))?.path||(k==="."?p:`${k}/${p}`);if(k&&k!==".")Y((j_)=>new Set([...j_,k]));z(g),l(null),Y_.current?.(k),U_.current?.(g);return}catch(d){if(d?.status===409||d?.code==="file_exists")continue;l(d?.message||"Failed to create file");return}}l("Failed to create file (untitled name already in use).")},[]),Y0=S((L)=>{if(L?.stopPropagation?.(),X_)return;let X=i0(J0.current);F2(X)},[X_,i0,F2]);v(()=>{if(typeof window>"u")return;let L=(X)=>{let C=X?.detail?.updates||[];if(!Array.isArray(C)||C.length===0)return;J((d)=>{let g=d;for(let j_ of C){if(!j_?.root)continue;if(!g||j_.path==="."||!j_.path)g=j_.root;else g=V1(g,j_.path,j_.root)}if(g)p_.current=k$(g,P_.current,f.current);return P(!1),g});let k=J0.current;if(Boolean(k)&&C.some((d)=>{let g=d?.path||"";if(!g||g===".")return!0;return k===g||k.startsWith(`${g}/`)||g.startsWith(`${k}/`)}))B0.current.clear();if(!k||!T0.current)return;let i=W_.current?.get(k);if(i&&i.type==="dir")return;if(C.some((d)=>{let g=d?.path||"";if(!g||g===".")return!0;return k===g||k.startsWith(`${g}/`)}))U_.current?.(k)};return window.addEventListener("workspace-update",L),()=>window.removeEventListener("workspace-update",L)},[]),Q_.current=H2;let v0=H(()=>{if(typeof window>"u")return;let L=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),X=V_.current??e.current,C=document.visibilityState!=="hidden"&&(X||L.matches&&e.current);Z3(C,f.current).catch(()=>{})}).current,O0=H(0),U=H(()=>{if(O0.current)clearTimeout(O0.current);O0.current=setTimeout(()=>{O0.current=0,v0()},250)}).current;v(()=>{if(e.current)Q_.current?.();U()},[$,Z]),v(()=>{Q_.current(),v0();let L=setInterval(()=>Q_.current(),J5),X=k2("previewHeight",null),C=Number.isFinite(X)?Math.min(Math.max(X,80),600):280;if(e_.current=C,C_.current)C_.current.style.setProperty("--preview-height",`${C}px`);let k=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),m=()=>U();if(k.addEventListener)k.addEventListener("change",m);else if(k.addListener)k.addListener(m);return document.addEventListener("visibilitychange",m),()=>{if(clearInterval(L),B_.current)cancelAnimationFrame(B_.current),B_.current=0;if(k.removeEventListener)k.removeEventListener("change",m);else if(k.removeListener)k.removeListener(m);if(document.removeEventListener("visibilitychange",m),O0.current)clearTimeout(O0.current),O0.current=0;if(u_.current)clearTimeout(u_.current),u_.current=null;Z3(!1,f.current).catch(()=>{})}},[]);let I=Z0(()=>w$(K,j,J_),[K,j,J_]),a=Z0(()=>new Map(I.map((L)=>[L.node.path,L.node])),[I]),O_=Z0(()=>C$(I_),[I_]);W_.current=a;let q_=(O?W_.current.get(O):null)?.type==="dir";v(()=>{if(!O||!q_){y_(null),D0.current=null,P0.current=null;return}let L=O,X=`${J_?"hidden":"visible"}:${O}`,C=B0.current,k=C.get(X);if(k?.root){C.delete(X),C.set(X,k);let p=b$(k.root,Boolean(k.truncated),M_);if(p)D0.current=p,P0.current=O,y_({loading:!1,error:null,payload:p});return}let m=D0.current,i=P0.current;y_({loading:!0,error:null,payload:i===O?m:null}),$3(O,K5,J_).then((p)=>{if(J0.current!==L)return;let d={root:p?.root,truncated:Boolean(p?.truncated)};C.delete(X),C.set(X,d);while(C.size>j5){let j_=C.keys().next().value;if(!j_)break;C.delete(j_)}let g=b$(d.root,d.truncated,M_);D0.current=g,P0.current=O,y_({loading:!1,error:null,payload:g})}).catch((p)=>{if(J0.current!==L)return;y_({loading:!1,error:p?.message||"Failed to load folder size chart",payload:i===O?m:null})})},[O,q_,J_,M_]);let S_=Boolean(b&&b.kind==="text"&&!q_&&(!b.size||b.size<=262144)),X0=S_?"Open in editor":b?.size>262144?"File too large to edit":"File is not editable";v(()=>{let L=C0.current;if(h_.current)h_.current.dispose(),h_.current=null;if(!L)return;if(L.innerHTML="",!O||q_||!b||b.error)return;let X={path:O,content:typeof b.text==="string"?b.text:void 0,mtime:b.mtime,size:b.size,preview:b,mode:"view"},C=s_.resolve(X)||s_.get("workspace-preview-default");if(!C)return;let k=C.mount(L,X);return h_.current=k,()=>{if(h_.current===k)k.dispose(),h_.current=null;L.innerHTML=""}},[O,q_,b]);let j0=(L)=>{let X=L?.target;if(X instanceof Element)return X;return X?.parentElement||null},n0=(L)=>{return Boolean(L?.closest?.(".workspace-node-icon, .workspace-label-text"))},l0=H((L)=>{if(f0.current)clearTimeout(f0.current),f0.current=null;let C=j0(L)?.closest?.("[data-path]");if(!C)return;let k=C.dataset.path;if(C.dataset.type==="dir"||!k)return;if(_0.current===k)V0();m_.current?.(k)}).current,o0=H((L)=>{if(y0.current){y0.current=!1;return}let X=j0(L),C=X?.closest?.("[data-path]");if(a_.current?.focus?.(),!C)return;let k=C.dataset.path,m=C.dataset.type,i=Boolean(X?.closest?.(".workspace-caret")),p=Boolean(X?.closest?.("button"))||Boolean(X?.closest?.("a"))||Boolean(X?.closest?.("input")),d=J0.current===k,g=_0.current;if(g){if(g===k)return;V0()}let j_=m==="file"&&g0.current===k&&!i&&!p;if(d&&!i&&!p&&k!=="."&&!j_){if(f0.current)clearTimeout(f0.current);f0.current=setTimeout(()=>{f0.current=null,q2(k)},350);return}if(m==="dir"){if(g0.current=null,z(k),E(null),w(null),u(!1),!P_.current.has(k))Y_.current?.(k);if(d&&!i)return;Y((_2)=>{let d0=new Set(_2);if(d0.has(k))d0.delete(k);else d0.add(k);return d0})}else{g0.current=null,z(k);let $0=W_.current.get(k);if($0)i_.current?.($0.path,$0);U_.current?.(k)}}).current,e0=H(()=>{p_.current="",Q_.current(),Array.from(P_.current||[]).filter((X)=>X&&X!==".").forEach((X)=>Y_.current?.(X))}).current,Q0=H(()=>{g0.current=null,z(null),E(null),w(null),u(!1)}).current,j2=H(()=>{z_((L)=>{let X=!L;if(typeof window<"u")c_("workspaceShowHidden",String(X));return f.current=X,Z3(!0,X).catch(()=>{}),p_.current="",Q_.current?.(),Array.from(P_.current||[]).filter((k)=>k&&k!==".").forEach((k)=>Y_.current?.(k)),X})}).current,w_=H((L)=>{if(j0(L)?.closest?.("[data-path]"))return;Q0()}).current,b0=S(async(L)=>{if(!L)return;let X=L.split("/").pop()||L;if(!window.confirm(`Delete "${X}"? This cannot be undone.`))return;try{await A4(L);let k=L.includes("/")?L.split("/").slice(0,-1).join("/")||".":".";if(J0.current===L)Q0();Y_.current?.(k),l(null)}catch(k){E((m)=>({...m||{},error:k.message||"Failed to delete file"}))}},[Q0]),W2=S((L)=>{let X=a_.current;if(!X||!L||typeof CSS>"u"||typeof CSS.escape!=="function")return;X.querySelector(`[data-path="${CSS.escape(L)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),w2=S((L)=>{let X=I;if(!X||X.length===0)return;let C=O?X.findIndex((k)=>k.node.path===O):-1;if(L.key==="ArrowDown"){L.preventDefault();let k=Math.min(C+1,X.length-1),m=X[k];if(!m)return;if(z(m.node.path),m.node.type!=="dir")i_.current?.(m.node.path,m.node),U_.current?.(m.node.path);else E(null),u(!1),w(null);W2(m.node.path);return}if(L.key==="ArrowUp"){L.preventDefault();let k=C<=0?0:C-1,m=X[k];if(!m)return;if(z(m.node.path),m.node.type!=="dir")i_.current?.(m.node.path,m.node),U_.current?.(m.node.path);else E(null),u(!1),w(null);W2(m.node.path);return}if(L.key==="ArrowRight"&&C>=0){let k=X[C];if(k?.node?.type==="dir"&&!j.has(k.node.path))L.preventDefault(),Y_.current?.(k.node.path),Y((m)=>new Set([...m,k.node.path]));return}if(L.key==="ArrowLeft"&&C>=0){let k=X[C];if(k?.node?.type==="dir"&&j.has(k.node.path))L.preventDefault(),Y((m)=>{let i=new Set(m);return i.delete(k.node.path),i});return}if(L.key==="Enter"&&C>=0){L.preventDefault();let k=X[C];if(!k)return;let m=k.node.path;if(k.node.type==="dir"){if(!P_.current.has(m))Y_.current?.(m);Y((p)=>{let d=new Set(p);if(d.has(m))d.delete(m);else d.add(m);return d}),E(null),w(null),u(!1)}else i_.current?.(m,k.node),U_.current?.(m);return}if((L.key==="Delete"||L.key==="Backspace")&&C>=0){let k=X[C];if(!k||k.node.type==="dir")return;L.preventDefault(),b0(k.node.path);return}if(L.key==="Escape")L.preventDefault(),Q0()},[Q0,b0,j,I,W2,O]),V2=S((L)=>{let X=j0(L),C=X?.closest?.(".workspace-row");if(!C)return;let k=C.dataset.type,m=C.dataset.path;if(!m||m===".")return;if(_0.current===m)return;let i=L?.touches?.[0];if(!i)return;if(L0.current={path:n0(X)?m:null,dragging:!1,startX:i.clientX,startY:i.clientY},k!=="file")return;if(u_.current)clearTimeout(u_.current);u_.current=setTimeout(()=>{if(u_.current=null,L0.current?.dragging)return;b0(m)},600)},[b0]),r0=S(()=>{if(u_.current)clearTimeout(u_.current),u_.current=null;let L=L0.current;if(L?.dragging&&L.path){let X=H_.current||f_(),C=F0.current;if(typeof C==="function")C(L.path,X)}L0.current={path:null,dragging:!1,startX:0,startY:0},k_.current=0,G_(!1),r(null),n_(null),d_(),m0()},[f_,m0,n_,d_]),U0=S((L)=>{let X=L0.current,C=L?.touches?.[0];if(!C||!X?.path){if(u_.current)clearTimeout(u_.current),u_.current=null;return}let k=Math.abs(C.clientX-X.startX),m=Math.abs(C.clientY-X.startY),i=k>8||m>8;if(i&&u_.current)clearTimeout(u_.current),u_.current=null;if(!X.dragging&&i)X.dragging=!0,G_(!0),r("move"),c0(X.path);if(X.dragging){L.preventDefault(),p0(C.clientX,C.clientY);let p=document.elementFromPoint(C.clientX,C.clientY),d=z0(p)||f_();if(H_.current!==d)n_(d);W0(d)}},[z0,f_,c0,p0,n_,W0]),K0=H((L)=>{L.preventDefault();let X=C_.current;if(!X)return;let C=L.clientY,k=e_.current||280,m=L.currentTarget;m.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let i=C,p=(g)=>{i=g.clientY;let j_=X.clientHeight-80,$0=Math.min(Math.max(k-(g.clientY-C),80),j_);X.style.setProperty("--preview-height",`${$0}px`),e_.current=$0},d=()=>{let g=X.clientHeight-80,j_=Math.min(Math.max(k-(i-C),80),g);e_.current=j_,m.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",c_("previewHeight",String(Math.round(j_))),document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",d)};document.addEventListener("mousemove",p),document.addEventListener("mouseup",d)}).current,R0=H((L)=>{L.preventDefault();let X=C_.current;if(!X)return;let C=L.touches[0];if(!C)return;let k=C.clientY,m=e_.current||280,i=L.currentTarget;i.classList.add("dragging"),document.body.style.userSelect="none";let p=(g)=>{let j_=g.touches[0];if(!j_)return;g.preventDefault();let $0=X.clientHeight-80,_2=Math.min(Math.max(m-(j_.clientY-k),80),$0);X.style.setProperty("--preview-height",`${_2}px`),e_.current=_2},d=()=>{i.classList.remove("dragging"),document.body.style.userSelect="",c_("previewHeight",String(Math.round(e_.current||m))),document.removeEventListener("touchmove",p),document.removeEventListener("touchend",d),document.removeEventListener("touchcancel",d)};document.addEventListener("touchmove",p,{passive:!1}),document.addEventListener("touchend",d),document.addEventListener("touchcancel",d)}).current,z2=async()=>{if(!O)return;try{let L=await C4(O);if(L.media_id)w(L.media_id)}catch(L){E((X)=>({...X||{},error:L.message||"Failed to attach"}))}},R2=async()=>{if(!O||q_)return;await b0(O)},G0=(L)=>{return Array.from(L?.dataTransfer?.types||[]).includes("Files")},A0=S((L)=>{if(!G0(L))return;if(L.preventDefault(),k_.current+=1,!k0.current)G_(!0);r("upload");let X=h0(L)||f_();n_(X),W0(X)},[f_,h0,n_,W0]),g2=S((L)=>{if(!G0(L))return;if(L.preventDefault(),L.dataTransfer)L.dataTransfer.dropEffect="copy";if(!k0.current)G_(!0);if(S0.current!=="upload")r("upload");let X=h0(L)||f_();if(H_.current!==X)n_(X);W0(X)},[f_,h0,n_,W0]),Q3=S((L)=>{if(!G0(L))return;if(L.preventDefault(),k_.current=Math.max(0,k_.current-1),k_.current===0)G_(!1),r(null),n_(null),d_()},[n_,d_]),Y2=S(async(L,X=".")=>{let C=Array.from(L||[]);if(C.length===0)return;let k=X&&X!==""?X:".",m=k!=="."?k:"workspace root";Z_(!0);try{let i=null;for(let p of C)try{i=await l3(p,k)}catch(d){let g=d?.status,j_=d?.code;if(g===409||j_==="file_exists"){let $0=p?.name||"file";if(!window.confirm(`"${$0}" already exists in ${m}. Overwrite?`))continue;i=await l3(p,k,{overwrite:!0})}else throw d}if(i?.path)g0.current=i.path,z(i.path),U_.current?.(i.path);Y_.current?.(k)}catch(i){l(i.message||"Failed to upload file")}finally{Z_(!1)}},[]),M2=S(async(L,X)=>{if(!L)return;let C=W_.current?.get(L);if(!C)return;let k=X&&X!==""?X:".",m=L.includes("/")?L.split("/").slice(0,-1).join("/")||".":".";if(k===m)return;try{let p=(await b4(L,k))?.path||L;if(C.type==="dir")Y((d)=>{let g=new Set;for(let j_ of d)if(j_===L)g.add(p);else if(j_.startsWith(`${L}/`))g.add(`${p}${j_.slice(L.length)}`);else g.add(j_);return g});if(z(p),C.type==="dir")E(null),u(!1),w(null);else U_.current?.(p);Y_.current?.(m),Y_.current?.(k)}catch(i){l(i?.message||"Failed to move entry")}},[]);F0.current=M2;let U3=S(async(L)=>{if(!G0(L))return;L.preventDefault(),k_.current=0,G_(!1),r(null),$_(null),d_();let X=Array.from(L?.dataTransfer?.files||[]);if(X.length===0)return;let C=H_.current||h0(L)||f_();await Y2(X,C)},[f_,h0,Y2]),X2=S((L)=>{if(L?.stopPropagation?.(),X_)return;let X=L?.currentTarget?.dataset?.uploadTarget||".";g_.current=X,r_.current?.click()},[X_]),H3=S(()=>{if(X_)return;let L=J0.current,X=L?W_.current?.get(L):null;g_.current=X?.type==="dir"?X.path:".",r_.current?.click()},[X_]),F3=S((L)=>{if(!L||L.button!==0)return;let X=L.currentTarget;if(!X||!X.dataset)return;let C=X.dataset.path;if(!C||C===".")return;if(_0.current===C)return;let k=j0(L);if(k?.closest?.("button, a, input, .workspace-caret"))return;if(!n0(k))return;L.preventDefault(),t_.current={path:C,dragging:!1,startX:L.clientX,startY:L.clientY};let m=(p)=>{let d=t_.current;if(!d?.path)return;let g=Math.abs(p.clientX-d.startX),j_=Math.abs(p.clientY-d.startY),$0=g>4||j_>4;if(!d.dragging&&$0)d.dragging=!0,y0.current=!0,G_(!0),r("move"),c0(d.path),p0(p.clientX,p.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(d.dragging){p.preventDefault(),p0(p.clientX,p.clientY);let _2=document.elementFromPoint(p.clientX,p.clientY),d0=z0(_2)||f_();if(H_.current!==d0)n_(d0);W0(d0)}},i=()=>{document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",i);let p=t_.current;if(p?.dragging&&p.path){let d=H_.current||f_(),g=F0.current;if(typeof g==="function")g(p.path,d)}t_.current={path:null,dragging:!1,startX:0,startY:0},k_.current=0,G_(!1),r(null),n_(null),d_(),m0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{y0.current=!1},0)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",i)},[z0,f_,c0,p0,m0,n_,W0,d_]),h2=S(async(L)=>{let X=Array.from(L?.target?.files||[]);if(X.length===0)return;let C=g_.current||".";if(await Y2(X,C),g_.current=".",L?.target)L.target.value=""},[Y2]);return V`
        <aside
            class=${`workspace-sidebar${s?" workspace-drop-active":""}`}
            data-workspace-scale=${I_}
            ref=${C_}
            onDragEnter=${A0}
            onDragOver=${g2}
            onDragLeave=${Q3}
            onDrop=${U3}
        >
            <input type="file" multiple style="display:none" ref=${r_} onChange=${h2} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${Y0} title="New file" disabled=${X_}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${e0} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${J_?" active":""}`}
                        onClick=${j2}
                        title=${J_?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!J_&&V`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${w_}>
                ${X_&&V`<div class="workspace-drop-hint">Uploading…</div>`}
                ${Q&&V`<div class="workspace-loading">Loading…</div>`}
                ${n&&V`<div class="workspace-error">${n}</div>`}
                ${K&&V`
                    <div
                        class="workspace-tree-list"
                        ref=${a_}
                        tabIndex="0"
                        onClick=${o0}
                        onDblClick=${l0}
                        onKeyDown=${w2}
                        onTouchStart=${V2}
                        onTouchEnd=${r0}
                        onTouchMove=${U0}
                        onTouchCancel=${r0}
                    >
                        ${I.map(({node:L,depth:X})=>{let C=L.type==="dir",k=L.path===O,m=L.path===W,i=C&&j.has(L.path),p=__&&L.path===__,d=Array.isArray(L.children)&&L.children.length>0?L.children.length:Number(L.child_count)||0;return V`
                                <div
                                    key=${L.path}
                                    class=${`workspace-row${k?" selected":""}${p?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+X*O_.indentPx}px`}}
                                    data-path=${L.path}
                                    data-type=${L.type}
                                    onMouseDown=${F3}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${C?i?V`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:V`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${C?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${C?V`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:V`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${m?V`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${A_}
                                                value=${D}
                                                onInput=${(g)=>y(g?.target?.value||"")}
                                                onKeyDown=${(g)=>{if(g.key==="Enter")g.preventDefault(),B2();else if(g.key==="Escape")g.preventDefault(),V0()}}
                                                onBlur=${V0}
                                                onClick=${(g)=>g.stopPropagation()}
                                            />
                                        `:V`<span class="workspace-label"><span class="workspace-label-text">${L.name}</span></span>`}
                                    ${C&&!i&&d>0&&V`
                                        <span class="workspace-count">${d}</span>
                                    `}
                                    ${C&&V`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${L.path}
                                            title="Upload files to this folder"
                                            onClick=${X2}
                                            disabled=${X_}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                                <polyline points="7 8 12 3 17 8"/>
                                                <line x1="12" y1="3" x2="12" y2="15"/>
                                            </svg>
                                        </button>
                                    `}
                                </div>
                            `})}
                    </div>
                `}
            </div>
            ${O&&V`
                <div class="workspace-preview-splitter-h" onMouseDown=${K0} onTouchStart=${R0}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${O}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${Y0} title="New file" disabled=${X_}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!q_&&V`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>S_&&m_.current?.(O,b)}
                                    title=${X0}
                                    disabled=${!S_}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${R2}
                                    title="Delete file"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                </button>
                            `}
                            ${q_?V`
                                    <button class="workspace-download" onClick=${H3}
                                        title="Upload files to this folder" disabled=${X_}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${w4(O,J_)}
                                        title="Download folder as zip" onClick=${(L)=>L.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:V`<button class="workspace-download" onClick=${z2} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${M&&V`<div class="workspace-loading">Loading preview…</div>`}
                    ${b?.error&&V`<div class="workspace-error">${b.error}</div>`}
                    ${q_&&V`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${L_?.loading&&V`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${L_?.error&&V`<div class="workspace-error">${L_.error}</div>`}
                        ${L_?.payload&&L_.payload.segments?.length>0&&V`
                            <${z5} payload=${L_.payload} />
                        `}
                        ${L_?.payload&&(!L_.payload.segments||L_.payload.segments.length===0)&&V`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${b&&!b.error&&!q_&&V`
                        <div class="workspace-preview-body" ref=${C0}></div>
                    `}
                    ${R&&V`
                        <div class="workspace-download-card">
                            <${Y5} mediaId=${R} />
                        </div>
                    `}
                </div>
            `}
            ${K_&&V`
                <div class="workspace-drag-ghost" ref=${E0}>${K_.label}</div>
            `}
        </aside>
    `}function c$({tabs:_,activeId:$,onActivate:Z,onClose:N,onCloseOthers:K,onCloseAll:J,onTogglePin:j,onTogglePreview:Y,previewTabs:O,onToggleDock:z,dockVisible:W}){let[q,D]=c(null),y=H(null);v(()=>{if(!q)return;let Q=(P)=>{if(P.type==="keydown"&&P.key!=="Escape")return;D(null)};return document.addEventListener("click",Q),document.addEventListener("keydown",Q),()=>{document.removeEventListener("click",Q),document.removeEventListener("keydown",Q)}},[q]),v(()=>{let Q=(P)=>{if(P.ctrlKey&&P.key==="Tab"){if(P.preventDefault(),!_.length)return;let M=_.findIndex((u)=>u.id===$);if(P.shiftKey){let u=_[(M-1+_.length)%_.length];Z?.(u.id)}else{let u=_[(M+1)%_.length];Z?.(u.id)}return}if((P.ctrlKey||P.metaKey)&&P.key==="w"){let M=document.querySelector(".editor-pane");if(M&&M.contains(document.activeElement)){if(P.preventDefault(),$)N?.($)}}};return document.addEventListener("keydown",Q),()=>document.removeEventListener("keydown",Q)},[_,$,Z,N]);let b=S((Q,P)=>{if(Q.button===1){Q.preventDefault(),N?.(P);return}if(Q.button===0)Z?.(P)},[Z,N]),E=S((Q,P)=>{Q.preventDefault(),D({id:P,x:Q.clientX,y:Q.clientY})},[]),R=S((Q)=>{Q.preventDefault(),Q.stopPropagation()},[]),w=S((Q,P)=>{Q.preventDefault(),Q.stopPropagation(),N?.(P)},[N]);if(v(()=>{if(!$||!y.current)return;let Q=y.current.querySelector(".tab-item.active");if(Q)Q.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return V`
        <div class="tab-strip" ref=${y} role="tablist">
            ${_.map((Q)=>V`
                <div
                    key=${Q.id}
                    class=${`tab-item${Q.id===$?" active":""}${Q.dirty?" dirty":""}${Q.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${Q.id===$}
                    title=${Q.path}
                    onMouseDown=${(P)=>b(P,Q.id)}
                    onContextMenu=${(P)=>E(P,Q.id)}
                >
                    ${Q.pinned&&V`
                        <span class="tab-pin-icon" aria-label="Pinned">
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                <path d="M4.456.734a1.75 1.75 0 0 1 2.826.504l.613 1.327a3.1 3.1 0 0 0 2.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.1 3.1 0 0 0-1.707-2.084l-1.327-.613a1.75 1.75 0 0 1-.504-2.826z"/>
                            </svg>
                        </span>
                    `}
                    <span class="tab-label">${Q.label}</span>
                    <button
                        type="button"
                        class="tab-close"
                        onMouseDown=${R}
                        onClick=${(P)=>w(P,Q.id)}
                        title=${Q.dirty?"Unsaved changes":"Close"}
                        aria-label=${Q.dirty?"Unsaved changes":`Close ${Q.label}`}
                    >
                        ${Q.dirty?V`<span class="tab-dirty-dot" aria-hidden="true"></span>`:V`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                <line x1="4" y1="4" x2="12" y2="12"/>
                                <line x1="12" y1="4" x2="4" y2="12"/>
                            </svg>`}
                    </button>
                </div>
            `)}
            ${z&&V`
                <div class="tab-strip-spacer"></div>
                <button
                    class=${`tab-strip-dock-toggle${W?" active":""}`}
                    onClick=${z}
                    title=${`${W?"Hide":"Show"} terminal (Ctrl+\`)`}
                    aria-label=${`${W?"Hide":"Show"} terminal`}
                    aria-pressed=${W?"true":"false"}
                >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1.75" y="2.25" width="12.5" height="11.5" rx="2"/>
                        <polyline points="4.5 5.25 7 7.75 4.5 10.25"/>
                        <line x1="8.5" y1="10.25" x2="11.5" y2="10.25"/>
                    </svg>
                </button>
            `}
        </div>
        ${q&&V`
            <div class="tab-context-menu" style=${{left:q.x+"px",top:q.y+"px"}}>
                <button onClick=${()=>{N?.(q.id),D(null)}}>Close</button>
                <button onClick=${()=>{K?.(q.id),D(null)}}>Close Others</button>
                <button onClick=${()=>{J?.(),D(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{j?.(q.id),D(null)}}>
                    ${_.find((Q)=>Q.id===q.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${Y&&/\.(md|mdx|markdown)$/i.test(q.id)&&V`
                    <hr />
                    <button onClick=${()=>{Y(q.id),D(null)}}>
                        ${O?.has(q.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var O5=400,H1=60,m$=220,F1="mdPreviewHeight";function G5(){try{let _=localStorage.getItem(F1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=H1?$:m$}catch{return m$}}function v$({getContent:_,path:$,onClose:Z}){let[N,K]=c(""),[J,j]=c(G5),Y=H(null),O=H(null),z=H(""),W=H(_);return W.current=_,v(()=>{let y=()=>{let E=W.current?.()||"";if(E===z.current)return;z.current=E;try{let R=a0(E,null,{sanitize:!1});K(R)}catch{K('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};y();let b=setInterval(y,O5);return()=>clearInterval(b)},[]),v(()=>{if(Y.current&&N)J2(Y.current).catch(()=>{})},[N]),V`
        <div
            class="md-preview-splitter"
            onMouseDown=${(y)=>{y.preventDefault();let b=y.clientY,E=O.current?.offsetHeight||J,R=O.current?.parentElement,w=R?R.offsetHeight*0.7:500,Q=y.currentTarget;Q.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let P=(u)=>{let n=Math.min(Math.max(E-(u.clientY-b),H1),w);j(n)},M=()=>{Q.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(F1,String(Math.round(O.current?.offsetHeight||J)))}catch{}document.removeEventListener("mousemove",P),document.removeEventListener("mouseup",M)};document.addEventListener("mousemove",P),document.addEventListener("mouseup",M)}}
            onTouchStart=${(y)=>{y.preventDefault();let b=y.touches[0];if(!b)return;let E=b.clientY,R=O.current?.offsetHeight||J,w=O.current?.parentElement,Q=w?w.offsetHeight*0.7:500,P=y.currentTarget;P.classList.add("dragging"),document.body.style.userSelect="none";let M=(n)=>{let l=n.touches[0];if(!l)return;n.preventDefault();let J_=Math.min(Math.max(R-(l.clientY-E),H1),Q);j(J_)},u=()=>{P.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(F1,String(Math.round(O.current?.offsetHeight||J)))}catch{}document.removeEventListener("touchmove",M),document.removeEventListener("touchend",u),document.removeEventListener("touchcancel",u)};document.addEventListener("touchmove",M,{passive:!1}),document.addEventListener("touchend",u),document.addEventListener("touchcancel",u)}}
        ></div>
        <div class="md-preview-panel" ref=${O} style=${{height:J+"px"}}>
            <div class="md-preview-header">
                <span class="md-preview-title">Preview</span>
                <button class="md-preview-close" onClick=${Z} title="Close preview" aria-label="Close preview">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                        <line x1="4" y1="4" x2="12" y2="12"/>
                        <line x1="12" y1="4" x2="4" y2="12"/>
                    </svg>
                </button>
            </div>
            <div
                class="md-preview-body post-content"
                ref=${Y}
                dangerouslySetInnerHTML=${{__html:N}}
            />
        </div>
    `}function R$({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:Z}){let N=H(_);N.current=_;let K=H($);K.current=$;let J=H(Z);J.current=Z,v(()=>{J.current();let j=new r3((O,z)=>N.current(O,z),(O)=>K.current(O));j.connect();let Y=()=>{j.reconnectIfNeeded()};return window.addEventListener("focus",Y),document.addEventListener("visibilitychange",Y),()=>{window.removeEventListener("focus",Y),document.removeEventListener("visibilitychange",Y),j.disconnect()}},[])}function g$(){let[_,$]=c(!1),[Z,N]=c("default"),K=H(!1);v(()=>{let O=C2("notificationsEnabled",!1);if(K.current=O,$(O),typeof Notification<"u")N(Notification.permission)},[]),v(()=>{K.current=_},[_]);let J=S(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let O=Notification.requestPermission();if(O&&typeof O.then==="function")return O;return Promise.resolve(O)}catch{return Promise.resolve("default")}},[]),j=S(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){N("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let z=await J();if(N(z||"default"),z!=="granted"){K.current=!1,$(!1),c_("notificationsEnabled","false");return}}let O=!K.current;K.current=O,$(O),c_("notificationsEnabled",String(O))},[J]),Y=S((O,z)=>{if(!K.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let W=new Notification(O,{body:z});return W.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:Z,toggleNotifications:j,notify:Y}}var v2=(_)=>{let $=new Set;return(_||[]).filter((Z)=>{if(!Z||$.has(Z.id))return!1;return $.add(Z.id),!0})};function h$({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[Z,N]=c(null),[K,J]=c(!1),j=H(!1),Y=H(null),O=H(!1),z=H(null),W=H(null);v(()=>{j.current=K},[K]),v(()=>{W.current=Z},[Z]);let q=S(async(b=null)=>{try{if(b){let E=await Y4(b);N(E.posts),J(!1)}else{let E=await _3(10);N(E.posts),J(E.has_more)}}catch(E){console.error("Failed to load posts:",E)}},[]),D=S(async()=>{try{let b=await _3(10);N((E)=>{if(!E||E.length===0)return b.posts;return v2([...b.posts,...E])}),J((E)=>E||b.has_more)}catch(b){console.error("Failed to refresh timeline:",b)}},[]),y=S(async(b={})=>{let E=W.current;if(!E||E.length===0)return;if(O.current)return;let{preserveScroll:R=!0,preserveMode:w="top",allowRepeat:Q=!1}=b,P=(n)=>{if(!R){n();return}if(w==="top")$(n);else _(n)},u=E.slice().sort((n,l)=>n.id-l.id)[0]?.id;if(!Number.isFinite(u))return;if(!Q&&z.current===u)return;O.current=!0,z.current=u;try{let n=await _3(10,u);if(n.posts.length>0)P(()=>{N((l)=>v2([...n.posts,...l||[]])),J(n.has_more)});else J(!1)}catch(n){console.error("Failed to load more posts:",n)}finally{O.current=!1}},[_,$]);return v(()=>{Y.current=y},[y]),{posts:Z,setPosts:N,hasMore:K,setHasMore:J,hasMoreRef:j,loadPosts:q,refreshTimeline:D,loadMore:y,loadMoreRef:Y,loadingMoreRef:O,lastBeforeIdRef:z}}function p$(){let[_,$]=c(null),[Z,N]=c({text:"",totalLines:0}),[K,J]=c(""),[j,Y]=c({text:"",totalLines:0}),[O,z]=c(null),[W,q]=c(null),[D,y]=c(null),b=H(null),E=H(0),R=H(!1),w=H(""),Q=H(""),P=H(null),M=H(null),u=H(null),n=H(null),l=H(!1),J_=H(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:Z,setAgentDraft:N,agentPlan:K,setAgentPlan:J,agentThought:j,setAgentThought:Y,pendingRequest:O,setPendingRequest:z,currentTurnId:W,setCurrentTurnId:q,steerQueuedTurnId:D,setSteerQueuedTurnId:y,lastAgentEventRef:b,lastSilenceNoticeRef:E,isAgentRunningRef:R,draftBufferRef:w,thoughtBufferRef:Q,pendingRequestRef:P,stalledPostIdRef:M,currentTurnIdRef:u,steerQueuedTurnIdRef:n,thoughtExpandedRef:l,draftExpandedRef:J_}}function i$({appShellRef:_,sidebarWidthRef:$,editorWidthRef:Z,dockHeightRef:N}){let K=H((W)=>{W.preventDefault();let q=_.current;if(!q)return;let D=W.clientX,y=$.current||280,b=W.currentTarget;b.classList.add("dragging"),q.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let E=D,R=(Q)=>{E=Q.clientX;let P=Math.min(Math.max(y+(Q.clientX-D),160),600);q.style.setProperty("--sidebar-width",`${P}px`),$.current=P},w=()=>{let Q=Math.min(Math.max(y+(E-D),160),600);$.current=Q,b.classList.remove("dragging"),q.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",c_("sidebarWidth",String(Math.round(Q))),document.removeEventListener("mousemove",R),document.removeEventListener("mouseup",w)};document.addEventListener("mousemove",R),document.addEventListener("mouseup",w)}).current,J=H((W)=>{W.preventDefault();let q=_.current;if(!q)return;let D=W.touches[0];if(!D)return;let y=D.clientX,b=$.current||280,E=W.currentTarget;E.classList.add("dragging"),q.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let R=(Q)=>{let P=Q.touches[0];if(!P)return;Q.preventDefault();let M=Math.min(Math.max(b+(P.clientX-y),160),600);q.style.setProperty("--sidebar-width",`${M}px`),$.current=M},w=()=>{E.classList.remove("dragging"),q.classList.remove("sidebar-resizing"),document.body.style.userSelect="",c_("sidebarWidth",String(Math.round($.current||b))),document.removeEventListener("touchmove",R),document.removeEventListener("touchend",w),document.removeEventListener("touchcancel",w)};document.addEventListener("touchmove",R,{passive:!1}),document.addEventListener("touchend",w),document.addEventListener("touchcancel",w)}).current,j=H((W)=>{W.preventDefault();let q=_.current;if(!q)return;let D=W.clientX,y=Z.current||$.current||280,b=W.currentTarget;b.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let E=D,R=(Q)=>{E=Q.clientX;let P=Math.min(Math.max(y+(Q.clientX-D),200),800);q.style.setProperty("--editor-width",`${P}px`),Z.current=P},w=()=>{let Q=Math.min(Math.max(y+(E-D),200),800);Z.current=Q,b.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",c_("editorWidth",String(Math.round(Q))),document.removeEventListener("mousemove",R),document.removeEventListener("mouseup",w)};document.addEventListener("mousemove",R),document.addEventListener("mouseup",w)}).current,Y=H((W)=>{W.preventDefault();let q=_.current;if(!q)return;let D=W.touches[0];if(!D)return;let y=D.clientX,b=Z.current||$.current||280,E=W.currentTarget;E.classList.add("dragging"),document.body.style.userSelect="none";let R=(Q)=>{let P=Q.touches[0];if(!P)return;Q.preventDefault();let M=Math.min(Math.max(b+(P.clientX-y),200),800);q.style.setProperty("--editor-width",`${M}px`),Z.current=M},w=()=>{E.classList.remove("dragging"),document.body.style.userSelect="",c_("editorWidth",String(Math.round(Z.current||b))),document.removeEventListener("touchmove",R),document.removeEventListener("touchend",w),document.removeEventListener("touchcancel",w)};document.addEventListener("touchmove",R,{passive:!1}),document.addEventListener("touchend",w),document.addEventListener("touchcancel",w)}).current,O=H((W)=>{W.preventDefault();let q=_.current;if(!q)return;let D=W.clientY,y=N?.current||200,b=W.currentTarget;b.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let E=D,R=(Q)=>{E=Q.clientY;let P=Math.min(Math.max(y-(Q.clientY-D),100),window.innerHeight*0.5);if(q.style.setProperty("--dock-height",`${P}px`),N)N.current=P;window.dispatchEvent(new CustomEvent("dock-resize"))},w=()=>{let Q=Math.min(Math.max(y-(E-D),100),window.innerHeight*0.5);if(N)N.current=Q;b.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",c_("dockHeight",String(Math.round(Q))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",R),document.removeEventListener("mouseup",w)};document.addEventListener("mousemove",R),document.addEventListener("mouseup",w)}).current,z=H((W)=>{W.preventDefault();let q=_.current;if(!q)return;let D=W.touches[0];if(!D)return;let y=D.clientY,b=N?.current||200,E=W.currentTarget;E.classList.add("dragging"),document.body.style.userSelect="none";let R=(Q)=>{let P=Q.touches[0];if(!P)return;Q.preventDefault();let M=Math.min(Math.max(b-(P.clientY-y),100),window.innerHeight*0.5);if(q.style.setProperty("--dock-height",`${M}px`),N)N.current=M;window.dispatchEvent(new CustomEvent("dock-resize"))},w=()=>{E.classList.remove("dragging"),document.body.style.userSelect="",c_("dockHeight",String(Math.round(N?.current||b))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",R),document.removeEventListener("touchend",w),document.removeEventListener("touchcancel",w)};document.addEventListener("touchmove",R,{passive:!1}),document.addEventListener("touchend",w),document.addEventListener("touchcancel",w)}).current;return{handleSplitterMouseDown:K,handleSplitterTouchStart:J,handleEditorSplitterMouseDown:j,handleEditorSplitterTouchStart:Y,handleDockSplitterMouseDown:O,handleDockSplitterTouchStart:z}}function n$({onTabClosed:_}={}){let $=H(_);$.current=_;let[Z,N]=c(()=>x_.getTabs()),[K,J]=c(()=>x_.getActiveId()),[j,Y]=c(()=>x_.getTabs().length>0);v(()=>{return x_.onChange((M,u)=>{N(M),J(u),Y(M.length>0)})},[]);let[O,z]=c(()=>new Set),W=S((M)=>{z((u)=>{let n=new Set(u);if(n.has(M))n.delete(M);else n.add(M);return n})},[]),q=S((M)=>{z((u)=>{if(!u.has(M))return u;let n=new Set(u);return n.delete(M),n})},[]),D=S((M)=>{if(!M)return;let u={path:M,mode:"edit"};try{if(!s_.resolve(u)){if(!s_.get("editor")){console.warn(`[openEditor] No pane handler for: ${M}`);return}}}catch(n){console.warn(`[openEditor] paneRegistry.resolve() error for "${M}":`,n)}x_.open(M)},[]),y=S(()=>{let M=x_.getActiveId();if(M){let u=x_.get(M);if(u?.dirty){if(!window.confirm(`"${u.label}" has unsaved changes. Close anyway?`))return}x_.close(M),q(M),$.current?.(M)}},[q]),b=S((M)=>{let u=x_.get(M);if(u?.dirty){if(!window.confirm(`"${u.label}" has unsaved changes. Close anyway?`))return}x_.close(M),q(M),$.current?.(M)},[q]),E=S((M)=>{x_.activate(M)},[]),R=S((M)=>{let u=x_.getTabs().filter((J_)=>J_.id!==M&&!J_.pinned),n=u.filter((J_)=>J_.dirty).length;if(n>0){if(!window.confirm(`${n} unsaved tab${n>1?"s":""} will be closed. Continue?`))return}let l=u.map((J_)=>J_.id);x_.closeOthers(M),l.forEach((J_)=>{q(J_),$.current?.(J_)})},[q]),w=S(()=>{let M=x_.getTabs().filter((l)=>!l.pinned),u=M.filter((l)=>l.dirty).length;if(u>0){if(!window.confirm(`${u} unsaved tab${u>1?"s":""} will be closed. Continue?`))return}let n=M.map((l)=>l.id);x_.closeAll(),n.forEach((l)=>{q(l),$.current?.(l)})},[q]),Q=S((M)=>{x_.togglePin(M)},[]),P=S(()=>{let M=x_.getActiveId();if(M)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:M}}))},[]);return v(()=>{let M=(u)=>{let{oldPath:n,newPath:l,type:J_}=u.detail||{};if(!n||!l)return;if(J_==="dir"){for(let z_ of x_.getTabs())if(z_.path===n||z_.path.startsWith(`${n}/`)){let s=`${l}${z_.path.slice(n.length)}`;x_.rename(z_.id,s)}}else x_.rename(n,l)};return window.addEventListener("workspace-file-renamed",M),()=>window.removeEventListener("workspace-file-renamed",M)},[]),v(()=>{let M=(u)=>{if(x_.hasUnsaved())u.preventDefault(),u.returnValue=""};return window.addEventListener("beforeunload",M),()=>window.removeEventListener("beforeunload",M)},[]),{editorOpen:j,tabStripTabs:Z,tabStripActiveId:K,previewTabs:O,openEditor:D,closeEditor:y,handleTabClose:b,handleTabActivate:E,handleTabCloseOthers:R,handleTabCloseAll:w,handleTabTogglePin:Q,handleTabTogglePreview:W,revealInExplorer:P}}function y1(_,$){try{if(typeof window>"u")return $;let Z=window.__PICLAW_SILENCE||{},N=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,K=Z[_]??window[N],J=Number(K);return Number.isFinite(J)?J:$}catch{return $}}var D1=y1("warning",30000),l$=y1("finalize",120000),C1=y1("refresh",30000),o$=30000;function r$(_){let $={};return(_?.agents||[]).forEach((Z)=>{$[Z.id]=Z}),$}function d$(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function s$(_=30000){let[,$]=c(0);v(()=>{let Z=setInterval(()=>$((N)=>N+1),_);return()=>clearInterval(Z)},[_])}function k1(_,$=160){let Z=String(_||"").replace(/\r\n/g,`
`);if(!Z)return 0;return Z.split(`
`).reduce((N,K)=>N+Math.max(1,Math.ceil(K.length/$)),0)}function a$(_,$){if(typeof _!=="string")return{kind:"ignore"};let Z=_.trim();if(!Z)return{kind:"toast",title:"No file selected",detail:"Use a valid file path from a file pill.",level:"warning"};if(!$.editorOpen)return{kind:"toast",title:"Editor pane is not open",detail:"Open the editor pane to open files from pills.",level:"warning"};if(/^[a-z][a-z0-9+.-]*:/i.test(Z))return{kind:"toast",title:"Cannot open external path from file pill",detail:"Use an in-workspace file path.",level:"warning"};try{if(!$.resolvePane({path:Z,mode:"edit"}))return{kind:"toast",title:"No editor available",detail:`No editor can open: ${Z}`,level:"warning"}}catch{return{kind:"toast",title:"No editor available",detail:`No editor can open: ${Z}`,level:"warning"}}return{kind:"open",path:Z}}function A2(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var b1="piclaw_btw_session";function L5(){let _=w0(b1);if(!_)return null;try{let $=JSON.parse(_);if(!$||typeof $!=="object")return null;let Z=typeof $.question==="string"?$.question:"",N=typeof $.answer==="string"?$.answer:"",K=typeof $.thinking==="string"?$.thinking:"",J=typeof $.error==="string"&&$.error.trim()?$.error:null,j=$.status==="running"?"error":$.status==="success"||$.status==="error"?$.status:"success";return{question:Z,answer:N,thinking:K,error:j==="error"?J||"BTW stream interrupted. You can retry.":J,model:null,status:j}}catch{return null}}var q5=O4,t$=L4,B5=q4,e$=Q4,_8=U4,$8=B4,E1=typeof R3==="function"?R3:A2("getAgentContext",null),W5=typeof Q2==="function"?Q2:A2("getAgentModels",{current:null,models:[]}),V5=typeof g3==="function"?g3:A2("getAgentQueueState",{count:0}),X5=typeof p3==="function"?p3:A2("steerAgentQueueItem",{removed:!1,queued:"steer"}),Q5=typeof h3==="function"?h3:A2("removeAgentQueueItem",{removed:!1}),U5=typeof n3==="function"?n3:A2("streamSidePrompt",null);if(window.marked)marked.setOptions({breaks:!0,gfm:!0});s_.register(K1);s_.register(L1);s_.register(G1);j1();s_.register(Y1);function H5(){let[_,$]=c("disconnected"),[Z,N]=c(null),[K,J]=c(null),[j,Y]=c(!1),[O,z]=c([]),[W,q]=c([]),[D,y]=c(null),{agentStatus:b,setAgentStatus:E,agentDraft:R,setAgentDraft:w,agentPlan:Q,setAgentPlan:P,agentThought:M,setAgentThought:u,pendingRequest:n,setPendingRequest:l,currentTurnId:J_,setCurrentTurnId:z_,steerQueuedTurnId:s,setSteerQueuedTurnId:G_,lastAgentEventRef:b_,lastSilenceNoticeRef:r,isAgentRunningRef:K_,draftBufferRef:o,thoughtBufferRef:__,pendingRequestRef:$_,stalledPostIdRef:X_,currentTurnIdRef:Z_,steerQueuedTurnIdRef:L_,thoughtExpandedRef:y_,draftExpandedRef:M_}=p$(),[v_,I_]=c({}),[H0,P_]=c(null),[p_,N_]=c(null),[B_,D_]=c(!1),[Q_,W_]=c(null),[i_,m_]=c(null),[U_,Y_]=c([]),[C_,a_]=c(!1),[A_,r_]=c(()=>L5()),g_=U_.length,u_=H(new Set),L0=H([]),t_=H(new Set),q0=H({inFlight:!1,lastAttemptAt:0,turnId:null});u_.current=new Set(U_.map((G)=>G.row_id)),L0.current=U_;let{notificationsEnabled:y0,notificationPermission:e_,toggleNotifications:B0,notify:D0}=g$(),[P0,C0]=c(()=>new Set),[h_,f]=c(()=>C2("workspaceOpen",!0)),e=H(null),{editorOpen:V_,tabStripTabs:k_,tabStripActiveId:H_,previewTabs:k0,openEditor:S0,closeEditor:E0,handleTabClose:t0,handleTabActivate:x0,handleTabCloseOthers:F0,handleTabCloseAll:J0,handleTabTogglePin:_0,handleTabTogglePreview:g0,revealInExplorer:f0}=n$({onTabClosed:(G)=>e.current?.(G)}),T0=H(null),I0=H(null),H2=H(null),u0=H(null),f_=s_.getDockPanes().length>0,[z0,h0]=c(!1),n_=S(()=>h0((G)=>!G),[]),d_=V_||f_&&z0;v(()=>{let G=T0.current;if(!G)return;if(I0.current)I0.current.dispose(),I0.current=null;let B=H_;if(!B)return;let F={path:B,mode:"edit"},A=s_.resolve(F)||s_.get("editor");if(!A){G.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let T=A.mount(G,F);I0.current=T,T.onDirtyChange?.((h)=>{x_.setDirty(B,h)}),T.onSaveRequest?.(()=>{}),T.onClose?.(()=>{E0()});let x=x_.getViewState(B);if(x&&typeof T.restoreViewState==="function")requestAnimationFrame(()=>T.restoreViewState(x));if(typeof T.onViewStateChange==="function")T.onViewStateChange((h)=>{x_.saveViewState(B,h)});return requestAnimationFrame(()=>T.focus()),()=>{if(I0.current===T)T.dispose(),I0.current=null}},[H_,E0]),v(()=>{let G=H2.current;if(u0.current)u0.current.dispose(),u0.current=null;if(!G||!f_||!z0)return;let B=s_.getDockPanes()[0];if(!B){G.innerHTML='<div class="terminal-placeholder">No dock pane available.</div>';return}let F=B.mount(G,{mode:"view"});return u0.current=F,requestAnimationFrame(()=>F.focus?.()),()=>{if(u0.current===F)F.dispose(),u0.current=null}},[f_,z0]);let[W0,p0]=c({name:"You",avatar_url:null,avatar_background:null}),c0=H(!1),m0=H(!1),i0=H(null),V0=H(0),q2=H(0),B2=H({}),F2=H({name:null,avatar_url:null}),Y0=H({currentHashtag:null,searchQuery:null}),v0=H(null),O0=H(null),U=H(0),I=H(0),a=H(0),O_=H(null),E_=H(null),q_=H(null),S_=H(null),X0=H(0),j0=H({title:null,avatarBase:null}),n0=H(null),l0=S(()=>{if(n0.current)clearTimeout(n0.current),n0.current=null;y(null)},[]);s$(30000),v(()=>{return c4()},[]),v(()=>{c_("workspaceOpen",String(h_))},[h_]),v(()=>{return()=>{l0()}},[l0]),v(()=>{if(!A_){c_(b1,"");return}c_(b1,JSON.stringify({question:A_.question||"",answer:A_.answer||"",thinking:A_.thinking||"",error:A_.error||null,status:A_.status||"success"}))},[A_]),v(()=>{B2.current=v_||{}},[v_]),v(()=>{F2.current=W0||{name:"You",avatar_url:null,avatar_background:null}},[W0]);let o0=S((G,B,F=null)=>{if(typeof document>"u")return;let A=(G||"").trim()||"PiClaw";if(j0.current.title!==A){document.title=A;let F_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(F_&&F_.getAttribute("content")!==A)F_.setAttribute("content",A);j0.current.title=A}let T=document.getElementById("dynamic-favicon");if(!T)return;let x=T.getAttribute("data-default")||T.getAttribute("href")||"/favicon.ico",h=B||x,t=B?`${h}|${F||""}`:h;if(j0.current.avatarBase!==t){let F_=B?`${h}${h.includes("?")?"&":"?"}v=${F||Date.now()}`:h;T.setAttribute("href",F_),j0.current.avatarBase=t}},[]),e0=S((G)=>{if(!G)return;z((B)=>B.includes(G)?B:[...B,G])},[]),Q0=S((G)=>{z((B)=>B.filter((F)=>F!==G))},[]);e.current=Q0;let j2=S(()=>{z([])},[]),w_=S((G,B=null,F="info",A=3000)=>{l0(),y({title:G,detail:B||null,kind:F||"info"}),n0.current=setTimeout(()=>{y((T)=>T?.title===G?null:T)},A)},[l0]),b0=S((G)=>{let B=a$(G,{editorOpen:V_,resolvePane:(F)=>s_.resolve(F)});if(B.kind==="open"){S0(B.path);return}if(B.kind==="toast")w_(B.title,B.detail,B.level)},[V_,S0,w_]),W2=S(()=>{let G=H_;if(G)e0(G)},[H_,e0]),w2=S((G)=>{if(!G)return;q((B)=>B.includes(G)?B:[...B,G])},[]),V2=S(async(G)=>{let B=(A)=>{A.scrollIntoView({behavior:"smooth",block:"center"}),A.classList.add("post-highlight"),setTimeout(()=>A.classList.remove("post-highlight"),2000)},F=document.getElementById("post-"+G);if(F){B(F);return}try{let T=(await G4(G))?.thread?.[0];if(!T)return;X((x)=>{if(!x)return[T];if(x.some((h)=>h.id===T.id))return x;return[...x,T]}),requestAnimationFrame(()=>{setTimeout(()=>{let x=document.getElementById("post-"+G);if(x)B(x)},50)})}catch(A){console.error("[scrollToMessage] Failed to fetch message",G,A)}},[]),r0=S((G)=>{q((B)=>B.filter((F)=>F!==G))},[]),U0=S(()=>{q([])},[]),K0=S((G={})=>{let B=Date.now();if(b_.current=B,G.running)K_.current=!0,a_((F)=>F?F:!0);if(G.clearSilence)r.current=0},[a_]),R0=S(()=>{if(S_.current)clearTimeout(S_.current),S_.current=null;X0.current=0},[]);v(()=>()=>{R0()},[R0]);let z2=S(()=>{R0(),E((G)=>{if(!G)return G;if(!(G.last_activity||G.lastActivity))return G;let{last_activity:B,lastActivity:F,...A}=G;return A})},[R0]),R2=S((G)=>{if(!G)return;R0();let B=Date.now();X0.current=B,E({type:G.type||"active",last_activity:!0}),S_.current=setTimeout(()=>{if(X0.current!==B)return;E((F)=>{if(!F||!(F.last_activity||F.lastActivity))return F;return null})},o$)},[R0]),G0=S(()=>{K_.current=!1,a_(!1),b_.current=null,r.current=0,o.current="",__.current="",$_.current=null,E_.current=null,Z_.current=null,L_.current=null,i0.current=null,q0.current={inFlight:!1,lastAttemptAt:0,turnId:null},R0(),z_(null),G_(null),y_.current=!1,M_.current=!1},[R0,z_,G_,a_]),A0=S((G)=>{if(!G)return;if(Z_.current===G)return;Z_.current=G,q0.current={inFlight:!1,lastAttemptAt:0,turnId:G},z_(G),L_.current=null,G_(null),o.current="",__.current="",w({text:"",totalLines:0}),P(""),u({text:"",totalLines:0}),l(null),$_.current=null,E_.current=null,y_.current=!1,M_.current=!1},[z_,G_]),g2=S((G)=>{if(typeof document<"u"){let F_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&F_)return}let B=E_.current;if(!B||!B.post)return;if(G&&B.turnId&&B.turnId!==G)return;let F=B.post;if(F.id&&O_.current===F.id)return;let A=String(F?.data?.content||"").trim();if(!A)return;O_.current=F.id||O_.current,E_.current=null;let T=A.replace(/\s+/g," ").slice(0,200),x=B2.current||{},t=(F?.data?.agent_id?x[F.data.agent_id]:null)?.name||"Pi";D0(t,T)},[D0]),Q3=S(async(G,B)=>{if(G!=="thought"&&G!=="draft")return;let F=Z_.current;if(G==="thought"){if(y_.current=B,F)try{await _8(F,"thought",B)}catch(A){console.warn("Failed to update thought visibility:",A)}if(!B)return;try{let A=F?await e$(F,"thought"):null;if(A?.text)__.current=A.text;u((T)=>({...T||{text:"",totalLines:0},fullText:__.current||T?.fullText||"",totalLines:Number.isFinite(A?.total_lines)?A.total_lines:T?.totalLines||0}))}catch(A){console.warn("Failed to fetch full thought:",A)}return}if(M_.current=B,F)try{await _8(F,"draft",B)}catch(A){console.warn("Failed to update draft visibility:",A)}if(!B)return;try{let A=F?await e$(F,"draft"):null;if(A?.text)o.current=A.text;w((T)=>({...T||{text:"",totalLines:0},fullText:o.current||T?.fullText||"",totalLines:Number.isFinite(A?.total_lines)?A.total_lines:T?.totalLines||0}))}catch(A){console.warn("Failed to fetch full draft:",A)}},[]),Y2=H(null),M2=S(()=>{let G=v0.current;if(!G)return;if(!(Math.abs(G.scrollTop)>150))G.scrollTop=0},[]);Y2.current=M2;let U3=S((G)=>{let B=v0.current;if(!B||typeof G!=="function"){G?.();return}let{currentHashtag:F,searchQuery:A}=Y0.current||{},T=!(A&&!F),x=T?B.scrollHeight-B.scrollTop:B.scrollTop;G(),requestAnimationFrame(()=>{let h=v0.current;if(!h)return;if(T){let t=Math.max(h.scrollHeight-x,0);h.scrollTop=t}else{let t=Math.max(h.scrollHeight-h.clientHeight,0),F_=Math.min(x,t);h.scrollTop=F_}})},[]),X2=S((G)=>{let B=v0.current;if(!B||typeof G!=="function"){G?.();return}let F=B.scrollTop;G(),requestAnimationFrame(()=>{let A=v0.current;if(!A)return;let T=Math.max(A.scrollHeight-A.clientHeight,0);A.scrollTop=Math.min(F,T)})},[]),H3="Queued as a follow-up (one-at-a-time).",F3="⁣",h2=S((G)=>{if(!G||!Array.isArray(G))return G;let B=u_.current,F=new Set(B),A=G.filter((T)=>{if(F.has(T?.id))return!1;if(T?.data?.is_bot_message){let x=T?.data?.content;if(x===H3||x===F3)return!1}return!0});return A.length===G.length?G:A},[]),{posts:L,setPosts:X,hasMore:C,setHasMore:k,hasMoreRef:m,loadPosts:i,refreshTimeline:p,loadMore:d,loadMoreRef:g}=h$({preserveTimelineScroll:U3,preserveTimelineScrollTop:X2}),j_=Z0(()=>h2(L),[L,U_,h2]),$0=S(()=>{let G=X_.current;if(!G)return;X((B)=>B?B.filter((F)=>F.id!==G):B),X_.current=null},[X]),{handleSplitterMouseDown:_2,handleSplitterTouchStart:d0,handleEditorSplitterMouseDown:Z8,handleEditorSplitterTouchStart:N8,handleDockSplitterMouseDown:J8,handleDockSplitterTouchStart:K8}=i$({appShellRef:O0,sidebarWidthRef:U,editorWidthRef:I,dockHeightRef:a}),A1=S(()=>{if(!K_.current)return;K_.current=!1,r.current=0,b_.current=null,Z_.current=null,z_(null),y_.current=!1,M_.current=!1;let G=(o.current||"").trim();if(o.current="",__.current="",w({text:"",totalLines:0}),P(""),u({text:"",totalLines:0}),l(null),$_.current=null,E_.current=null,!G){E({type:"error",title:"Response stalled - No content received"});return}let F=`${G}${`

⚠️ Response may be incomplete - the model stopped responding`}`,A=Date.now(),T=new Date().toISOString(),x={id:A,timestamp:T,data:{type:"agent_response",content:F,agent_id:"default",is_local_stall:!0}};X_.current=A,X((h)=>h?v2([...h,x]):[x]),Y2.current?.(),E(null)},[z_]);v(()=>{Y0.current={currentHashtag:Z,searchQuery:K}},[Z,K]);let R_=S(()=>{V5().then((G)=>{let B=t_.current,F=Array.isArray(G?.items)?G.items.map((A)=>({...A})).filter((A)=>!B.has(A.row_id)):[];if(F.length){Y_((A)=>{if(A.length===F.length&&A.every((T,x)=>T.row_id===F[x].row_id))return A;return F});return}B.clear(),Y_((A)=>A.length===0?A:[])}).catch(()=>{Y_((G)=>G.length===0?G:[])})},[Y_]),y3=S(async()=>{try{let G=await E1();if(G)m_(G)}catch(G){console.warn("Failed to fetch agent context:",G)}},[]),O2=S(async()=>{try{let G=await $8("web:default");if(!G||G.status!=="active"||!G.data){if(m0.current){let{currentHashtag:A,searchQuery:T}=Y0.current||{};if(!A&&!T)p()}return m0.current=!1,G0(),i0.current=null,E(null),w({text:"",totalLines:0}),P(""),u({text:"",totalLines:0}),l(null),$_.current=null,G??null}m0.current=!0;let B=G.data;i0.current=B;let F=B.turn_id||B.turnId;if(F)A0(F);if(K0({running:!0,clearSilence:!0}),z2(),E(B),G.thought&&G.thought.text)u((A)=>{if(A&&A.text&&A.text.length>=G.thought.text.length)return A;return __.current=G.thought.text,{text:G.thought.text,totalLines:G.thought.totalLines||0}});if(G.draft&&G.draft.text)w((A)=>{if(A&&A.text&&A.text.length>=G.draft.text.length)return A;return o.current=G.draft.text,{text:G.draft.text,totalLines:G.draft.totalLines||0}});return G}catch(G){return console.warn("Failed to fetch agent status:",G),null}},[G0,z2,K0,p,A0]),D3=S(async()=>{if(!K_.current)return null;if($_.current)return null;let G=Z_.current||null,B=q0.current,F=Date.now();if(B.inFlight)return null;if(B.turnId===G&&F-B.lastAttemptAt<C1)return null;B.inFlight=!0,B.lastAttemptAt=F,B.turnId=G;try{let{currentHashtag:A,searchQuery:T}=Y0.current||{};if(!A&&!T)await p();return await R_(),await O2()}finally{B.inFlight=!1}},[O2,R_,p]);v(()=>{let G=Math.min(1000,Math.max(100,Math.floor(D1/2))),B=setInterval(()=>{if(!K_.current)return;if($_.current)return;let F=b_.current;if(!F)return;let A=Date.now(),T=A-F,x=G3(i0.current);if(T>=l$){if(!x)E({type:"waiting",title:"Re-syncing after a quiet period…"});D3();return}if(T>=D1){if(A-r.current>=C1){if(!x){let h=Math.floor(T/1000);E({type:"waiting",title:`Waiting for model… No events for ${h}s`})}r.current=A,D3()}}},G);return()=>clearInterval(B)},[D3]);let j8=S((G)=>{if($(G),G!=="connected"){E(null),w({text:"",totalLines:0}),P(""),u({text:"",totalLines:0}),l(null),$_.current=null,G0();return}if(!c0.current){c0.current=!0,O2();return}let{currentHashtag:B,searchQuery:F}=Y0.current;if(!B&&!F)p();O2()},[G0,p,O2]),z8=S(async(G)=>{N(G),X(null),await i(G)},[i]),Y8=S(async()=>{N(null),J(null),X(null),await i()},[i]),O8=S(async(G)=>{if(!G||!G.trim())return;J(G.trim()),N(null),X(null);try{let B=await q5(G.trim());X(B.results),k(!1)}catch(B){console.error("Failed to search:",B),X([])}},[]),G8=S(()=>{Y(!0),J(null),N(null),X([])},[]),L8=S(()=>{Y(!1),J(null),i()},[i]),F5=S(()=>{},[]),q8=S(async(G)=>{if(!G)return;let B=G.id,F=j_?.filter((T)=>T?.data?.thread_id===B&&T?.id!==B).length||0;if(F>0){if(!window.confirm(`Delete this message and its ${F} replies?`))return}let A=(T)=>{if(!T.length)return;C0((h)=>{let t=new Set(h);return T.forEach((F_)=>t.add(F_)),t}),setTimeout(()=>{if(X2(()=>{X((h)=>h?h.filter((t)=>!T.includes(t.id)):h)}),C0((h)=>{let t=new Set(h);return T.forEach((F_)=>t.delete(F_)),t}),m.current)g.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let T=await t$(B,F>0);if(T?.ids?.length)A(T.ids)}catch(T){let x=T?.message||"";if(F===0&&x.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let t=await t$(B,!0);if(t?.ids?.length)A(t.ids);return}console.error("Failed to delete post:",T),alert(`Failed to delete message: ${x}`)}},[j_,X2]),w1=S(async()=>{try{let G=await B5();I_(r$(G));let B=G?.user||{};p0((A)=>{let T=typeof B.name==="string"&&B.name.trim()?B.name.trim():"You",x=typeof B.avatar_url==="string"?B.avatar_url.trim():null,h=typeof B.avatar_background==="string"&&B.avatar_background.trim()?B.avatar_background.trim():null;if(A.name===T&&A.avatar_url===x&&A.avatar_background===h)return A;return{name:T,avatar_url:x,avatar_background:h}});let F=(G?.agents||[]).find((A)=>A.id==="default");if(F?.model)P_(F.model);o0(F?.name,F?.avatar_url)}catch(G){console.warn("Failed to load agents:",G)}try{let G=await E1();if(G)m_(G)}catch{}},[o0]);v(()=>{w1();let G=k2("sidebarWidth",null),B=Number.isFinite(G)?Math.min(Math.max(G,160),600):280;if(U.current=B,O0.current)O0.current.style.setProperty("--sidebar-width",`${B}px`)},[w1]);let C3=C_||b!==null,M1=S((G)=>{if(!G||typeof G!=="object")return;let B=G.agent_id;if(!B)return;let{agent_name:F,agent_avatar:A}=G;if(!F&&A===void 0)return;let T=B2.current?.[B]||{id:B},x=T.name||null,h=T.avatar_url??T.avatarUrl??T.avatar??null,t=!1,F_=!1;if(F&&F!==T.name)x=F,F_=!0;if(A!==void 0){let $2=typeof A==="string"?A.trim():null,S1=typeof h==="string"?h.trim():null,y2=$2||null;if(y2!==(S1||null))h=y2,t=!0}if(!F_&&!t)return;if(I_(($2)=>{let y2={...$2[B]||{id:B}};if(F_)y2.name=x;if(t)y2.avatar_url=h;return{...$2,[B]:y2}}),B==="default")o0(x,h,t?Date.now():null)},[o0]),P1=S((G)=>{if(!G||typeof G!=="object")return;let B=G.user_name??G.userName,F=G.user_avatar??G.userAvatar,A=G.user_avatar_background??G.userAvatarBackground;if(B===void 0&&F===void 0&&A===void 0)return;p0((T)=>{let x=typeof B==="string"&&B.trim()?B.trim():T.name||"You",h=F===void 0?T.avatar_url:typeof F==="string"&&F.trim()?F.trim():null,t=A===void 0?T.avatar_background:typeof A==="string"&&A.trim()?A.trim():null;if(T.name===x&&T.avatar_url===h&&T.avatar_background===t)return T;return{name:x,avatar_url:h,avatar_background:t}})},[]),k3=S((G)=>{if(!G||typeof G!=="object")return;let B=G.model??G.current;if(B!==void 0)P_(B);if(G.thinking_level!==void 0)N_(G.thinking_level??null);if(G.supports_thinking!==void 0)D_(Boolean(G.supports_thinking));if(G.provider_usage!==void 0)W_(G.provider_usage??null)},[]),P2=S(()=>{W5().then((G)=>{if(G)k3(G)}).catch(()=>{})},[k3]),B8=S((G)=>{let B=G?.row_id;if(B==null)return;t_.current.add(B),Y_((F)=>F.filter((A)=>A?.row_id!==B)),X5(B).then(()=>{R_()}).catch((F)=>{console.warn("[queue] Failed to steer queued item:",F),w_("Failed to steer message","The queued message could not be sent as steering.","warning"),t_.current.delete(B),R_()})},[R_,Y_,w_]),W8=S((G)=>{let B=G?.row_id;if(B==null)return;t_.current.add(B),Y_((F)=>F.filter((A)=>A?.row_id!==B)),Q5(B).then(()=>{R_()}).catch((F)=>{console.warn("[queue] Failed to remove queued item:",F),w_("Failed to remove message","The queued message could not be removed.","warning"),t_.current.delete(B),R_()})},[R_,Y_,w_]),E3=S((G)=>{if(!G||typeof G!=="object")return;if(G?.queued==="followup"||G?.queued==="steer"){R_();return}let B=G?.command;if(B&&typeof B==="object"&&(B?.queued_followup||B?.queued_steer))R_()},[R_]),b3=S(()=>{if(q_.current)q_.current.abort(),q_.current=null;r_(null)},[]),p2=S(async(G)=>{let B=String(G||"").trim();if(!B)return w_("BTW needs a question","Usage: /btw <question>","warning"),!0;if(q_.current)q_.current.abort();let F=new AbortController;q_.current=F,r_({question:B,answer:"",thinking:"",error:null,model:null,status:"running"});try{let A=await U5(B,{signal:F.signal,systemPrompt:"Answer the user briefly and directly. This is a side conversation that should not affect the main chat until explicitly injected.",onEvent:(T,x)=>{if(T==="side_prompt_start")r_((h)=>h?{...h,status:"running"}:h)},onThinkingDelta:(T)=>{r_((x)=>x?{...x,thinking:`${x.thinking||""}${T||""}`}:x)},onTextDelta:(T)=>{r_((x)=>x?{...x,answer:`${x.answer||""}${T||""}`}:x)}});if(q_.current!==F)return!0;r_((T)=>T?{...T,answer:A?.result||T.answer||"",thinking:A?.thinking||T.thinking||"",model:A?.model||null,status:"success",error:null}:T)}catch(A){if(F.signal.aborted)return!0;r_((T)=>T?{...T,status:"error",error:A?.payload?.error||A?.message||"BTW request failed."}:T)}finally{if(q_.current===F)q_.current=null}return!0},[w_]),V8=S(async({content:G})=>{let B=o4(G);if(!B)return!1;if(B.type==="help")return w_("BTW usage","Use /btw <question> to open a side conversation.","info",4000),!0;if(B.type==="clear")return b3(),w_("BTW cleared","Closed the side conversation panel.","info"),!0;if(B.type==="ask")return await p2(B.question),!0;return!1},[b3,p2,w_]),X8=S(()=>{if(A_?.question)p2(A_.question)},[A_,p2]),Q8=S(async()=>{let G=s4(A_);if(!G)return;try{let B=await f2("default",G,null,[],C3?"queue":null);E3(B),w_(B?.queued==="followup"?"BTW queued":"BTW injected",B?.queued==="followup"?"The BTW summary was queued as a follow-up because the agent is busy.":"The BTW summary was sent to the main chat.","info",3500)}catch(B){w_("BTW inject failed",B?.message||"Could not inject BTW answer into chat.","warning")}},[A_,E3,C3,w_]),A3=S(()=>{P2(),R_()},[P2,R_]);v(()=>{A3();let G=setInterval(()=>{P2(),R_()},60000);return()=>clearInterval(G)},[A3,P2,R_]);let w3=S((G,B)=>{let F=B?.turn_id;if(M1(B),P1(B),G==="ui_theme"){m4(B);return}if(G?.startsWith("agent_")){if(!(G==="agent_draft_delta"||G==="agent_thought_delta"||G==="agent_draft"||G==="agent_thought"))z2()}if(G==="connected"){E(null),w({text:"",totalLines:0}),P(""),u({text:"",totalLines:0}),l(null),$_.current=null,G0(),$8("web:default").then((t)=>{if(!t||t.status!=="active"||!t.data)return;let F_=t.data,$2=F_.turn_id||F_.turnId;if($2)A0($2);if(K0({clearSilence:!0}),R2(F_),t.thought&&t.thought.text)__.current=t.thought.text,u({text:t.thought.text,totalLines:t.thought.totalLines||0});if(t.draft&&t.draft.text)o.current=t.draft.text,w({text:t.draft.text,totalLines:t.draft.totalLines||0})}).catch((t)=>{console.warn("Failed to fetch agent status:",t)});let{currentHashtag:x,searchQuery:h}=Y0.current||{};if(!x&&!h)p();A3();return}if(G==="agent_status"){if(B.type==="done"||B.type==="error"){if(F&&Z_.current&&F!==Z_.current)return;if(B.type==="done"){g2(F||Z_.current);let{currentHashtag:x,searchQuery:h}=Y0.current||{};if(!x&&!h)p();if(B.context_usage)m_(B.context_usage)}if(m0.current=!1,G0(),t_.current.clear(),R_(),w({text:"",totalLines:0}),P(""),u({text:"",totalLines:0}),l(null),B.type==="error")E({type:"error",title:B.title||"Agent error"}),setTimeout(()=>E(null),8000);else E(null)}else{if(F)A0(F);if(K0({running:!0,clearSilence:!0}),B.type==="thinking")o.current="",__.current="",w({text:"",totalLines:0}),P(""),u({text:"",totalLines:0});i0.current=B,E((x)=>{if(x&&x.type===B.type&&x.title===B.title)return x;return B})}return}if(G==="agent_steer_queued"){if(F&&Z_.current&&F!==Z_.current)return;let x=F||Z_.current;if(!x)return;L_.current=x,G_(x);return}if(G==="agent_followup_queued"){let x=B?.row_id,h=B?.content;if(x!=null&&typeof h==="string"&&h.trim())Y_((t)=>{if(t.some((F_)=>F_?.row_id===x))return t;return[...t,{row_id:x,content:h,timestamp:B?.timestamp||null,thread_id:B?.thread_id??null}]});R_();return}if(G==="agent_followup_consumed"){let x=B?.row_id;if(x!=null)Y_((h)=>h.filter((t)=>t.row_id!==x));R_(),p();return}if(G==="agent_followup_removed"){let x=B?.row_id;if(x!=null)t_.current.add(x),Y_((h)=>h.filter((t)=>t.row_id!==x));R_();return}if(G==="agent_draft_delta"){if(F&&Z_.current&&F!==Z_.current)return;if(F&&!Z_.current)A0(F);if(K0({running:!0,clearSilence:!0}),B?.reset)o.current="";if(B?.delta)o.current+=B.delta;let x=Date.now();if(!V0.current||x-V0.current>=100){V0.current=x;let h=o.current,t=k1(h);if(M_.current)w((F_)=>({text:F_?.text||"",totalLines:t,fullText:h}));else w({text:h,totalLines:t})}return}if(G==="agent_draft"){if(F&&Z_.current&&F!==Z_.current)return;if(F&&!Z_.current)A0(F);K0({running:!0,clearSilence:!0});let x=B.text||"",h=B.mode||(B.kind==="plan"?"replace":"append"),t=Number.isFinite(B.total_lines)?B.total_lines:x?x.replace(/\r\n/g,`
`).split(`
`).length:0;if(B.kind==="plan")if(h==="replace")P(x);else P((F_)=>(F_||"")+x);else if(!M_.current)o.current=x,w({text:x,totalLines:t});return}if(G==="agent_thought_delta"){if(F&&Z_.current&&F!==Z_.current)return;if(F&&!Z_.current)A0(F);if(K0({running:!0,clearSilence:!0}),B?.reset)__.current="";if(typeof B?.delta==="string")__.current+=B.delta;let x=Date.now();if(y_.current&&(!q2.current||x-q2.current>=100)){q2.current=x;let h=__.current;u((t)=>({text:t?.text||"",totalLines:k1(h),fullText:h}))}return}if(G==="agent_thought"){if(F&&Z_.current&&F!==Z_.current)return;if(F&&!Z_.current)A0(F);K0({running:!0,clearSilence:!0});let x=B.text||"",h=Number.isFinite(B.total_lines)?B.total_lines:x?x.replace(/\r\n/g,`
`).split(`
`).length:0;if(!y_.current)__.current=x,u({text:x,totalLines:h});return}if(G==="agent_request"){if(console.log("Agent request:",B),F&&Z_.current&&F!==Z_.current)return;if(F)A0(F);K0({running:!0,clearSilence:!0}),l(B),$_.current=B;return}if(G==="agent_request_timeout"){if(console.log("Agent request timeout:",B),F&&Z_.current&&F!==Z_.current)return;l(null),$_.current=null,G0(),E({type:"error",title:"Permission request timed out"});return}if(G==="model_changed"){if(B?.model!==void 0)P_(B.model);if(B?.thinking_level!==void 0)N_(B.thinking_level??null);if(B?.supports_thinking!==void 0)D_(Boolean(B.supports_thinking));E1().then((x)=>{if(x)m_(x)}).catch(()=>{});return}if(G==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:B}));return}let{currentHashtag:A,searchQuery:T}=Y0.current;if(G==="agent_response")$0(),E_.current={post:B,turnId:Z_.current};if(!A&&!T&&(G==="new_post"||G==="agent_response"))X((x)=>{if(!x)return[B];if(x.some((h)=>h.id===B.id))return x;return[...x,B]}),Y2.current?.();if(G==="interaction_updated")X((x)=>{if(!x)return x;if(!x.some((h)=>h.id===B.id))return x;return x.map((h)=>h.id===B.id?B:h)});if(G==="interaction_deleted"){let x=B?.ids||[];if(x.length){X2(()=>{X((F_)=>F_?F_.filter(($2)=>!x.includes($2.id)):F_)});let{currentHashtag:h,searchQuery:t}=Y0.current;if(m.current&&!h&&!t)g.current?.({preserveScroll:!0,preserveMode:"top"})}}},[G0,z2,g,K0,g2,X2,p,$0,A0,R2,M1,P1,P2,R_,Y_]);v(()=>{if(typeof window>"u")return;let G=window.__PICLAW_TEST_API||{};return G.emit=w3,G.reset=()=>{$0(),G0(),E(null),w({text:"",totalLines:0}),P(""),u({text:"",totalLines:0}),l(null)},G.finalize=()=>A1(),window.__PICLAW_TEST_API=G,()=>{if(window.__PICLAW_TEST_API===G)window.__PICLAW_TEST_API=void 0}},[G0,A1,w3,$0]),R$({handleSseEvent:w3,handleConnectionStatusChange:j8,loadPosts:i}),v(()=>{if(!j_||j_.length===0)return;let G=location.hash;if(!G||!G.startsWith("#msg-"))return;let B=G.slice(5);V2(B),history.replaceState(null,"",location.pathname+location.search)},[j_,V2]);let M3=b!==null;v(()=>{if(_!=="connected")return;let B=setInterval(()=>{let{currentHashtag:F,searchQuery:A}=Y0.current||{},T=!F&&!A;if(M3){if(T)p();R_(),O2(),y3()}else{if(T)p();O2(),y3()}},M3?15000:60000);return()=>clearInterval(B)},[_,M3,O2,y3,R_,p]);let U8=S(()=>{f((G)=>!G)},[]);v(()=>{if(!V_)return;if(typeof window>"u")return;let G=O0.current;if(!G)return;if(!I.current){let B=k2("editorWidth",null),F=U.current||280;I.current=Number.isFinite(B)?B:F}if(G.style.setProperty("--editor-width",`${I.current}px`),!a.current){let B=k2("dockHeight",null);a.current=Number.isFinite(B)?B:200}G.style.setProperty("--dock-height",`${a.current}px`)},[V_]),v(()=>{if(!f_)return;let G=(B)=>{if(B.ctrlKey&&B.key==="`")B.preventDefault(),n_()};return document.addEventListener("keydown",G),()=>document.removeEventListener("keydown",G)},[n_,f_]);let H8=Boolean(s&&s===(b?.turn_id||J_));return V`
        <div class=${`app-shell${h_?"":" workspace-collapsed"}${V_?" editor-open":""}`} ref=${O0}>
            <${u$}
                onFileSelect=${e0}
                visible=${h_}
                active=${h_||V_}
                onOpenEditor=${S0}
            />
            <button
                class=${`workspace-toggle-tab${h_?" open":" closed"}`}
                onClick=${U8}
                title=${h_?"Hide workspace":"Show workspace"}
                aria-label=${h_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${_2} onTouchStart=${d0}></div>
            ${d_&&V`
                <div class="editor-pane-container">
                    ${V_&&V`
                        <${c$}
                            tabs=${k_}
                            activeId=${H_}
                            onActivate=${x0}
                            onClose=${t0}
                            onCloseOthers=${F0}
                            onCloseAll=${J0}
                            onTogglePin=${_0}
                            onTogglePreview=${g0}
                            previewTabs=${k0}
                            onToggleDock=${f_?n_:void 0}
                            dockVisible=${f_&&z0}
                        />
                    `}
                    ${V_&&V`<div class="editor-pane-host" ref=${T0}></div>`}
                    ${V_&&H_&&k0.has(H_)&&V`
                        <${v$}
                            getContent=${()=>I0.current?.getContent?.()}
                            path=${H_}
                            onClose=${()=>g0(H_)}
                        />
                    `}
                    ${f_&&z0&&V`<div class="dock-splitter" onMouseDown=${J8} onTouchStart=${K8}></div>`}
                    ${f_&&V`<div class=${`dock-panel${z0?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${n_} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
                                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                    <line x1="4" y1="4" x2="12" y2="12"/>
                                    <line x1="12" y1="4" x2="4" y2="12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="dock-panel-body" ref=${H2}></div>
                    </div>`}
                </div>
                <div class="editor-splitter" onMouseDown=${Z8} onTouchStart=${N8}></div>
            `}
            <div class="container">
                ${K&&d$()&&V`<div class="search-results-spacer"></div>`}
                ${(Z||K)&&V`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${Y8}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${Z?`#${Z}`:`Search: ${K}`}</span>
                    </div>
                `}
                <${V$}
                    posts=${j_}
                    hasMore=${C}
                    onLoadMore=${d}
                    timelineRef=${v0}
                    onHashtagClick=${z8}
                    onMessageRef=${w2}
                    onScrollToMessage=${V2}
                    onFileRef=${b0}
                    onPostClick=${void 0}
                    onDeletePost=${q8}
                    emptyMessage=${Z?`No posts with #${Z}`:K?`No results for "${K}"`:void 0}
                    agents=${v_}
                    user=${W0}
                    reverse=${!(K&&!Z)}
                    removingPostIds=${P0}
                    searchQuery=${K}
                />
                <${N$}
                    status=${b}
                    draft=${R}
                    plan=${Q}
                    thought=${M}
                    pendingRequest=${n}
                    intent=${D}
                    turnId=${J_}
                    steerQueued=${H8}
                    onPanelToggle=${Q3}
                />
                <${a4}
                    session=${A_}
                    onClose=${b3}
                    onRetry=${X8}
                    onInject=${Q8}
                />
                <${P4}
                    onPost=${()=>{i(),M2()}}
                    onFocus=${M2}
                    searchMode=${j}
                    onSearch=${O8}
                    onEnterSearch=${G8}
                    onExitSearch=${L8}
                    fileRefs=${O}
                    onRemoveFileRef=${Q0}
                    onClearFileRefs=${j2}
                    messageRefs=${W}
                    onRemoveMessageRef=${r0}
                    onClearMessageRefs=${U0}
                    activeEditorPath=${H_}
                    onAttachEditorFile=${W2}
                    onOpenFilePill=${b0}
                    followupQueueCount=${g_}
                    followupQueueItems=${U_}
                    onInjectQueuedFollowup=${B8}
                    onRemoveQueuedFollowup=${W8}
                    onSubmitIntercept=${V8}
                    onMessageResponse=${E3}
                    isAgentActive=${C3}
                    activeModel=${H0}
                    modelUsage=${Q_}
                    thinkingLevel=${p_}
                    supportsThinking=${B_}
                    contextUsage=${i_}
                    notificationsEnabled=${y0}
                    notificationPermission=${e_}
                    onToggleNotifications=${B0}
                    onModelChange=${P_}
                    onModelStateChange=${k3}
                />
                <${K$} status=${_} />
                <${J$}
                    request=${n}
                    onRespond=${()=>{l(null),$_.current=null}}
                />
            </div>
        </div>
    `}Z4(V`<${H5} />`,document.getElementById("app"));

//# debugId=C2AB23C2211DCA8464756E2164756E21
//# sourceMappingURL=app.bundle.js.map

var s1=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,N)=>(typeof require<"u"?require:$)[N]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var d2,w_,I4,a1,j2,y4,f4,u4,c4,w3,C3,b3,t1,l2={},o2=[],e1=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,s2=Array.isArray;function t0(_,$){for(var N in $)_[N]=$[N];return _}function M3(_){_&&_.parentNode&&_.parentNode.removeChild(_)}function v4(_,$,N){var Z,j,J,K={};for(J in $)J=="key"?Z=$[J]:J=="ref"?j=$[J]:K[J]=$[J];if(arguments.length>2&&(K.children=arguments.length>3?d2.call(arguments,2):N),typeof _=="function"&&_.defaultProps!=null)for(J in _.defaultProps)K[J]===void 0&&(K[J]=_.defaultProps[J]);return p2(_,K,Z,j,null)}function p2(_,$,N,Z,j){var J={type:_,props:$,key:N,ref:Z,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:j==null?++I4:j,__i:-1,__u:0};return j==null&&w_.vnode!=null&&w_.vnode(J),J}function a2(_){return _.children}function i2(_,$){this.props=_,this.context=$}function F2(_,$){if($==null)return _.__?F2(_.__,_.__i+1):null;for(var N;$<_.__k.length;$++)if((N=_.__k[$])!=null&&N.__e!=null)return N.__e;return typeof _.type=="function"?F2(_):null}function _6(_){if(_.__P&&_.__d){var $=_.__v,N=$.__e,Z=[],j=[],J=t0({},$);J.__v=$.__v+1,w_.vnode&&w_.vnode(J),P3(_.__P,J,$,_.__n,_.__P.namespaceURI,32&$.__u?[N]:null,Z,N==null?F2($):N,!!(32&$.__u),j),J.__v=$.__v,J.__.__k[J.__i]=J,h4(Z,J,j),$.__e=$.__=null,J.__e!=N&&m4(J)}}function m4(_){if((_=_.__)!=null&&_.__c!=null)return _.__e=_.__c.base=null,_.__k.some(function($){if($!=null&&$.__e!=null)return _.__e=_.__c.base=$.__e}),m4(_)}function D4(_){(!_.__d&&(_.__d=!0)&&j2.push(_)&&!r2.__r++||y4!=w_.debounceRendering)&&((y4=w_.debounceRendering)||f4)(r2)}function r2(){try{for(var _,$=1;j2.length;)j2.length>$&&j2.sort(u4),_=j2.shift(),$=j2.length,_6(_)}finally{j2.length=r2.__r=0}}function R4(_,$,N,Z,j,J,K,Y,O,z,V){var L,k,D,E,b,m,A,W=Z&&Z.__k||o2,w=$.length;for(O=$6(N,$,W,O,w),L=0;L<w;L++)(D=N.__k[L])!=null&&(k=D.__i!=-1&&W[D.__i]||l2,D.__i=L,m=P3(_,D,k,j,J,K,Y,O,z,V),E=D.__e,D.ref&&k.ref!=D.ref&&(k.ref&&S3(k.ref,null,D),V.push(D.ref,D.__c||E,D)),b==null&&E!=null&&(b=E),(A=!!(4&D.__u))||k.__k===D.__k?O=g4(D,O,_,A):typeof D.type=="function"&&m!==void 0?O=m:E&&(O=E.nextSibling),D.__u&=-7);return N.__e=b,O}function $6(_,$,N,Z,j){var J,K,Y,O,z,V=N.length,L=V,k=0;for(_.__k=Array(j),J=0;J<j;J++)(K=$[J])!=null&&typeof K!="boolean"&&typeof K!="function"?(typeof K=="string"||typeof K=="number"||typeof K=="bigint"||K.constructor==String?K=_.__k[J]=p2(null,K,null,null,null):s2(K)?K=_.__k[J]=p2(a2,{children:K},null,null,null):K.constructor===void 0&&K.__b>0?K=_.__k[J]=p2(K.type,K.props,K.key,K.ref?K.ref:null,K.__v):_.__k[J]=K,O=J+k,K.__=_,K.__b=_.__b+1,Y=null,(z=K.__i=N6(K,N,O,L))!=-1&&(L--,(Y=N[z])&&(Y.__u|=2)),Y==null||Y.__v==null?(z==-1&&(j>V?k--:j<V&&k++),typeof K.type!="function"&&(K.__u|=4)):z!=O&&(z==O-1?k--:z==O+1?k++:(z>O?k--:k++,K.__u|=4))):_.__k[J]=null;if(L)for(J=0;J<V;J++)(Y=N[J])!=null&&(2&Y.__u)==0&&(Y.__e==Z&&(Z=F2(Y)),i4(Y,Y));return Z}function g4(_,$,N,Z){var j,J;if(typeof _.type=="function"){for(j=_.__k,J=0;j&&J<j.length;J++)j[J]&&(j[J].__=_,$=g4(j[J],$,N,Z));return $}_.__e!=$&&(Z&&($&&_.type&&!$.parentNode&&($=F2(_)),N.insertBefore(_.__e,$||null)),$=_.__e);do $=$&&$.nextSibling;while($!=null&&$.nodeType==8);return $}function N6(_,$,N,Z){var j,J,K,Y=_.key,O=_.type,z=$[N],V=z!=null&&(2&z.__u)==0;if(z===null&&Y==null||V&&Y==z.key&&O==z.type)return N;if(Z>(V?1:0)){for(j=N-1,J=N+1;j>=0||J<$.length;)if((z=$[K=j>=0?j--:J++])!=null&&(2&z.__u)==0&&Y==z.key&&O==z.type)return K}return-1}function k4(_,$,N){$[0]=="-"?_.setProperty($,N==null?"":N):_[$]=N==null?"":typeof N!="number"||e1.test($)?N:N+"px"}function h2(_,$,N,Z,j){var J,K;_:if($=="style")if(typeof N=="string")_.style.cssText=N;else{if(typeof Z=="string"&&(_.style.cssText=Z=""),Z)for($ in Z)N&&$ in N||k4(_.style,$,"");if(N)for($ in N)Z&&N[$]==Z[$]||k4(_.style,$,N[$])}else if($[0]=="o"&&$[1]=="n")J=$!=($=$.replace(c4,"$1")),K=$.toLowerCase(),$=K in _||$=="onFocusOut"||$=="onFocusIn"?K.slice(2):$.slice(2),_.l||(_.l={}),_.l[$+J]=N,N?Z?N.u=Z.u:(N.u=w3,_.addEventListener($,J?b3:C3,J)):_.removeEventListener($,J?b3:C3,J);else{if(j=="http://www.w3.org/2000/svg")$=$.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if($!="width"&&$!="height"&&$!="href"&&$!="list"&&$!="form"&&$!="tabIndex"&&$!="download"&&$!="rowSpan"&&$!="colSpan"&&$!="role"&&$!="popover"&&$ in _)try{_[$]=N==null?"":N;break _}catch(Y){}typeof N=="function"||(N==null||N===!1&&$[4]!="-"?_.removeAttribute($):_.setAttribute($,$=="popover"&&N==1?"":N))}}function C4(_){return function($){if(this.l){var N=this.l[$.type+_];if($.t==null)$.t=w3++;else if($.t<N.u)return;return N(w_.event?w_.event($):$)}}}function P3(_,$,N,Z,j,J,K,Y,O,z){var V,L,k,D,E,b,m,A,W,w,M,x,p,i,$_,Y_=$.type;if($.constructor!==void 0)return null;128&N.__u&&(O=!!(32&N.__u),J=[Y=$.__e=N.__e]),(V=w_.__b)&&V($);_:if(typeof Y_=="function")try{if(A=$.props,W=Y_.prototype&&Y_.prototype.render,w=(V=Y_.contextType)&&Z[V.__c],M=V?w?w.props.value:V.__:Z,N.__c?m=(L=$.__c=N.__c).__=L.__E:(W?$.__c=L=new Y_(A,M):($.__c=L=new i2(A,M),L.constructor=Y_,L.render=J6),w&&w.sub(L),L.state||(L.state={}),L.__n=Z,k=L.__d=!0,L.__h=[],L._sb=[]),W&&L.__s==null&&(L.__s=L.state),W&&Y_.getDerivedStateFromProps!=null&&(L.__s==L.state&&(L.__s=t0({},L.__s)),t0(L.__s,Y_.getDerivedStateFromProps(A,L.__s))),D=L.props,E=L.state,L.__v=$,k)W&&Y_.getDerivedStateFromProps==null&&L.componentWillMount!=null&&L.componentWillMount(),W&&L.componentDidMount!=null&&L.__h.push(L.componentDidMount);else{if(W&&Y_.getDerivedStateFromProps==null&&A!==D&&L.componentWillReceiveProps!=null&&L.componentWillReceiveProps(A,M),$.__v==N.__v||!L.__e&&L.shouldComponentUpdate!=null&&L.shouldComponentUpdate(A,L.__s,M)===!1){$.__v!=N.__v&&(L.props=A,L.state=L.__s,L.__d=!1),$.__e=N.__e,$.__k=N.__k,$.__k.some(function(s){s&&(s.__=$)}),o2.push.apply(L.__h,L._sb),L._sb=[],L.__h.length&&K.push(L);break _}L.componentWillUpdate!=null&&L.componentWillUpdate(A,L.__s,M),W&&L.componentDidUpdate!=null&&L.__h.push(function(){L.componentDidUpdate(D,E,b)})}if(L.context=M,L.props=A,L.__P=_,L.__e=!1,x=w_.__r,p=0,W)L.state=L.__s,L.__d=!1,x&&x($),V=L.render(L.props,L.state,L.context),o2.push.apply(L.__h,L._sb),L._sb=[];else do L.__d=!1,x&&x($),V=L.render(L.props,L.state,L.context),L.state=L.__s;while(L.__d&&++p<25);L.state=L.__s,L.getChildContext!=null&&(Z=t0(t0({},Z),L.getChildContext())),W&&!k&&L.getSnapshotBeforeUpdate!=null&&(b=L.getSnapshotBeforeUpdate(D,E)),i=V!=null&&V.type===a2&&V.key==null?p4(V.props.children):V,Y=R4(_,s2(i)?i:[i],$,N,Z,j,J,K,Y,O,z),L.base=$.__e,$.__u&=-161,L.__h.length&&K.push(L),m&&(L.__E=L.__=null)}catch(s){if($.__v=null,O||J!=null)if(s.then){for($.__u|=O?160:128;Y&&Y.nodeType==8&&Y.nextSibling;)Y=Y.nextSibling;J[J.indexOf(Y)]=null,$.__e=Y}else{for($_=J.length;$_--;)M3(J[$_]);E3($)}else $.__e=N.__e,$.__k=N.__k,s.then||E3($);w_.__e(s,$,N)}else J==null&&$.__v==N.__v?($.__k=N.__k,$.__e=N.__e):Y=$.__e=Z6(N.__e,$,N,Z,j,J,K,O,z);return(V=w_.diffed)&&V($),128&$.__u?void 0:Y}function E3(_){_&&(_.__c&&(_.__c.__e=!0),_.__k&&_.__k.some(E3))}function h4(_,$,N){for(var Z=0;Z<N.length;Z++)S3(N[Z],N[++Z],N[++Z]);w_.__c&&w_.__c($,_),_.some(function(j){try{_=j.__h,j.__h=[],_.some(function(J){J.call(j)})}catch(J){w_.__e(J,j.__v)}})}function p4(_){return typeof _!="object"||_==null||_.__b>0?_:s2(_)?_.map(p4):t0({},_)}function Z6(_,$,N,Z,j,J,K,Y,O){var z,V,L,k,D,E,b,m=N.props||l2,A=$.props,W=$.type;if(W=="svg"?j="http://www.w3.org/2000/svg":W=="math"?j="http://www.w3.org/1998/Math/MathML":j||(j="http://www.w3.org/1999/xhtml"),J!=null){for(z=0;z<J.length;z++)if((D=J[z])&&"setAttribute"in D==!!W&&(W?D.localName==W:D.nodeType==3)){_=D,J[z]=null;break}}if(_==null){if(W==null)return document.createTextNode(A);_=document.createElementNS(j,W,A.is&&A),Y&&(w_.__m&&w_.__m($,J),Y=!1),J=null}if(W==null)m===A||Y&&_.data==A||(_.data=A);else{if(J=J&&d2.call(_.childNodes),!Y&&J!=null)for(m={},z=0;z<_.attributes.length;z++)m[(D=_.attributes[z]).name]=D.value;for(z in m)D=m[z],z=="dangerouslySetInnerHTML"?L=D:z=="children"||(z in A)||z=="value"&&("defaultValue"in A)||z=="checked"&&("defaultChecked"in A)||h2(_,z,null,D,j);for(z in A)D=A[z],z=="children"?k=D:z=="dangerouslySetInnerHTML"?V=D:z=="value"?E=D:z=="checked"?b=D:Y&&typeof D!="function"||m[z]===D||h2(_,z,D,m[z],j);if(V)Y||L&&(V.__html==L.__html||V.__html==_.innerHTML)||(_.innerHTML=V.__html),$.__k=[];else if(L&&(_.innerHTML=""),R4($.type=="template"?_.content:_,s2(k)?k:[k],$,N,Z,W=="foreignObject"?"http://www.w3.org/1999/xhtml":j,J,K,J?J[0]:N.__k&&F2(N,0),Y,O),J!=null)for(z=J.length;z--;)M3(J[z]);Y||(z="value",W=="progress"&&E==null?_.removeAttribute("value"):E!=null&&(E!==_[z]||W=="progress"&&!E||W=="option"&&E!=m[z])&&h2(_,z,E,m[z],j),z="checked",b!=null&&b!=_[z]&&h2(_,z,b,m[z],j))}return _}function S3(_,$,N){try{if(typeof _=="function"){var Z=typeof _.__u=="function";Z&&_.__u(),Z&&$==null||(_.__u=_($))}else _.current=$}catch(j){w_.__e(j,N)}}function i4(_,$,N){var Z,j;if(w_.unmount&&w_.unmount(_),(Z=_.ref)&&(Z.current&&Z.current!=_.__e||S3(Z,null,$)),(Z=_.__c)!=null){if(Z.componentWillUnmount)try{Z.componentWillUnmount()}catch(J){w_.__e(J,$)}Z.base=Z.__P=null}if(Z=_.__k)for(j=0;j<Z.length;j++)Z[j]&&i4(Z[j],$,N||typeof _.type!="function");N||M3(_.__e),_.__c=_.__=_.__e=void 0}function J6(_,$,N){return this.constructor(_,N)}function n4(_,$,N){var Z,j,J,K;$==document&&($=document.documentElement),w_.__&&w_.__(_,$),j=(Z=typeof N=="function")?null:N&&N.__k||$.__k,J=[],K=[],P3($,_=(!Z&&N||$).__k=v4(a2,null,[_]),j||l2,l2,$.namespaceURI,!Z&&N?[N]:j?null:$.firstChild?d2.call($.childNodes):null,J,!Z&&N?N:j?j.__e:$.firstChild,Z,K),h4(J,_,K)}d2=o2.slice,w_={__e:function(_,$,N,Z){for(var j,J,K;$=$.__;)if((j=$.__c)&&!j.__)try{if((J=j.constructor)&&J.getDerivedStateFromError!=null&&(j.setState(J.getDerivedStateFromError(_)),K=j.__d),j.componentDidCatch!=null&&(j.componentDidCatch(_,Z||{}),K=j.__d),K)return j.__E=j}catch(Y){_=Y}throw _}},I4=0,a1=function(_){return _!=null&&_.constructor===void 0},i2.prototype.setState=function(_,$){var N;N=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=t0({},this.state),typeof _=="function"&&(_=_(t0({},N),this.props)),_&&t0(N,_),_!=null&&this.__v&&($&&this._sb.push($),D4(this))},i2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),D4(this))},i2.prototype.render=a2,j2=[],f4=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,u4=function(_,$){return _.__v.__b-$.__v.__b},r2.__r=0,c4=/(PointerCapture)$|Capture$/i,w3=0,C3=C4(!1),b3=C4(!0),t1=0;var P2,i_,k3,b4,S2=0,l4=[],p_=w_,E4=p_.__b,A4=p_.__r,w4=p_.diffed,M4=p_.__c,P4=p_.unmount,S4=p_.__;function x3(_,$){p_.__h&&p_.__h(i_,_,S2||$),S2=0;var N=i_.__H||(i_.__H={__:[],__h:[]});return _>=N.__.length&&N.__.push({}),N.__[_]}function u(_){return S2=1,j6(r4,_)}function j6(_,$,N){var Z=x3(P2++,2);if(Z.t=_,!Z.__c&&(Z.__=[N?N($):r4(void 0,$),function(Y){var O=Z.__N?Z.__N[0]:Z.__[0],z=Z.t(O,Y);O!==z&&(Z.__N=[z,Z.__[1]],Z.__c.setState({}))}],Z.__c=i_,!i_.__f)){var j=function(Y,O,z){if(!Z.__c.__H)return!0;var V=Z.__c.__H.__.filter(function(k){return k.__c});if(V.every(function(k){return!k.__N}))return!J||J.call(this,Y,O,z);var L=Z.__c.props!==Y;return V.some(function(k){if(k.__N){var D=k.__[0];k.__=k.__N,k.__N=void 0,D!==k.__[0]&&(L=!0)}}),J&&J.call(this,Y,O,z)||L};i_.__f=!0;var{shouldComponentUpdate:J,componentWillUpdate:K}=i_;i_.componentWillUpdate=function(Y,O,z){if(this.__e){var V=J;J=void 0,j(Y,O,z),J=V}K&&K.call(this,Y,O,z)},i_.shouldComponentUpdate=j}return Z.__N||Z.__}function R(_,$){var N=x3(P2++,3);!p_.__s&&o4(N.__H,$)&&(N.__=_,N.u=$,i_.__H.__h.push(N))}function y(_){return S2=5,Z0(function(){return{current:_}},[])}function Z0(_,$){var N=x3(P2++,7);return o4(N.__H,$)&&(N.__=_(),N.__H=$,N.__h=_),N.__}function S(_,$){return S2=8,Z0(function(){return _},$)}function K6(){for(var _;_=l4.shift();){var $=_.__H;if(_.__P&&$)try{$.__h.some(n2),$.__h.some(A3),$.__h=[]}catch(N){$.__h=[],p_.__e(N,_.__v)}}}p_.__b=function(_){i_=null,E4&&E4(_)},p_.__=function(_,$){_&&$.__k&&$.__k.__m&&(_.__m=$.__k.__m),S4&&S4(_,$)},p_.__r=function(_){A4&&A4(_),P2=0;var $=(i_=_.__c).__H;$&&(k3===i_?($.__h=[],i_.__h=[],$.__.some(function(N){N.__N&&(N.__=N.__N),N.u=N.__N=void 0})):($.__h.some(n2),$.__h.some(A3),$.__h=[],P2=0)),k3=i_},p_.diffed=function(_){w4&&w4(_);var $=_.__c;$&&$.__H&&($.__H.__h.length&&(l4.push($)!==1&&b4===p_.requestAnimationFrame||((b4=p_.requestAnimationFrame)||z6)(K6)),$.__H.__.some(function(N){N.u&&(N.__H=N.u),N.u=void 0})),k3=i_=null},p_.__c=function(_,$){$.some(function(N){try{N.__h.some(n2),N.__h=N.__h.filter(function(Z){return!Z.__||A3(Z)})}catch(Z){$.some(function(j){j.__h&&(j.__h=[])}),$=[],p_.__e(Z,N.__v)}}),M4&&M4(_,$)},p_.unmount=function(_){P4&&P4(_);var $,N=_.__c;N&&N.__H&&(N.__H.__.some(function(Z){try{n2(Z)}catch(j){$=j}}),N.__H=void 0,$&&p_.__e($,N.__v))};var x4=typeof requestAnimationFrame=="function";function z6(_){var $,N=function(){clearTimeout(Z),x4&&cancelAnimationFrame($),setTimeout(_)},Z=setTimeout(N,35);x4&&($=requestAnimationFrame(N))}function n2(_){var $=i_,N=_.__c;typeof N=="function"&&(_.__c=void 0,N()),i_=$}function A3(_){var $=i_;_.__c=_.__(),i_=$}function o4(_,$){return!_||_.length!==$.length||$.some(function(N,Z){return N!==_[Z]})}function r4(_,$){return typeof $=="function"?$(_):$}var d4=function(_,$,N,Z){var j;$[0]=0;for(var J=1;J<$.length;J++){var K=$[J++],Y=$[J]?($[0]|=K?1:2,N[$[J++]]):$[++J];K===3?Z[0]=Y:K===4?Z[1]=Object.assign(Z[1]||{},Y):K===5?(Z[1]=Z[1]||{})[$[++J]]=Y:K===6?Z[1][$[++J]]+=Y+"":K?(j=_.apply(Y,d4(_,Y,N,["",null])),Z.push(j),Y[0]?$[0]|=2:($[J-2]=0,$[J]=j)):Z.push(Y)}return Z},T4=new Map;function Y6(_){var $=T4.get(this);return $||($=new Map,T4.set(this,$)),($=d4(this,$.get(_)||($.set(_,$=function(N){for(var Z,j,J=1,K="",Y="",O=[0],z=function(k){J===1&&(k||(K=K.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?O.push(0,k,K):J===3&&(k||K)?(O.push(3,k,K),J=2):J===2&&K==="..."&&k?O.push(4,k,0):J===2&&K&&!k?O.push(5,0,!0,K):J>=5&&((K||!k&&J===5)&&(O.push(J,0,K,j),J=6),k&&(O.push(J,k,0,j),J=6)),K=""},V=0;V<N.length;V++){V&&(J===1&&z(),z(V));for(var L=0;L<N[V].length;L++)Z=N[V][L],J===1?Z==="<"?(z(),O=[O],J=3):K+=Z:J===4?K==="--"&&Z===">"?(J=1,K=""):K=Z+K[0]:Y?Z===Y?Y="":K+=Z:Z==='"'||Z==="'"?Y=Z:Z===">"?(z(),J=1):J&&(Z==="="?(J=5,j=K,K=""):Z==="/"&&(J<5||N[V][L+1]===">")?(z(),J===3&&(O=O[0]),J=O,(O=O[0]).push(2,0,J),J=0):Z===" "||Z==="\t"||Z===`
`||Z==="\r"?(z(),J=2):K+=Z),J===3&&K==="!--"&&(J=4,O=O[0])}return z(),O}(_)),$),arguments,[])).length>1?$:$[0]}var X=Y6.bind(v4);async function o_(_,$={}){let N=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!N.ok){let Z=await N.json().catch(()=>({error:"Unknown error"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function t2(_=10,$=null){let N=`/timeline?limit=${_}`;if($)N+=`&before=${$}`;return o_(N)}async function s4(_,$=50,N=0){return o_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${N}`)}async function a4(_,$=50,N=0){return o_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${N}`)}async function t4(_){return o_(`/thread/${_}`)}async function e4(_,$=!1){let N=`/post/${_}?cascade=${$?"true":"false"}`;return o_(N,{method:"DELETE"})}async function T3(_,$,N=null,Z=[],j=null){return o_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:N,media_ids:Z,mode:j})})}async function _8(){return o_("/agents")}async function $8(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/status${$}`)}async function I3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/context${$}`)}async function f3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/queue-state${$}`)}async function u3(_,$=null){let N=await fetch("/agent/queue-remove",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Failed to remove queued item"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function c3(_,$=null){let N=await fetch("/agent/queue-steer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Failed to steer queued item"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function q2(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/models${$}`)}async function N8(_){let $=new FormData;$.append("file",_);let N=await fetch("/media/upload",{method:"POST",body:$});if(!N.ok){let Z=await N.json().catch(()=>({error:"Upload failed"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function v3(_,$){let N=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Failed to respond"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function Z8(_,$){let N=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function J8(_,$="thought"){let N=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return o_(N)}async function j8(_,$,N){return o_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(N)})})}function n0(_){return`/media/${_}`}function K8(_){return`/media/${_}/thumbnail`}async function x2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function z8(_){let $=await fetch(`/media/${_}`);if(!$.ok)throw Error("Failed to load media text");return $.text()}async function Y8(_){let $=await fetch(`/media/${_}`);if(!$.ok)throw Error("Failed to load media blob");return $.blob()}async function e2(_="",$=2,N=!1){let Z=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${N?"1":"0"}`;return o_(Z)}async function O8(_,$=20000,N=null){let Z=N?`&mode=${encodeURIComponent(N)}`:"",j=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${Z}`;return o_(j)}async function G8(_){return o_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function m3(_,$="",N={}){let Z=new FormData;Z.append("file",_);let j=new URLSearchParams;if($)j.set("path",$);if(N.overwrite)j.set("overwrite","1");let J=j.toString(),K=J?`/workspace/upload?${J}`:"/workspace/upload",Y=await fetch(""+K,{method:"POST",body:Z});if(!Y.ok){let O=await Y.json().catch(()=>({error:"Upload failed"})),z=Error(O.error||`HTTP ${Y.status}`);throw z.status=Y.status,z.code=O.code,z}return Y.json()}async function B8(_,$,N=""){let Z=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:N})});if(!Z.ok){let j=await Z.json().catch(()=>({error:"Create failed"})),J=Error(j.error||`HTTP ${Z.status}`);throw J.status=Z.status,J.code=j.code,J}return Z.json()}async function L8(_,$){let N=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Rename failed"})),j=Error(Z.error||`HTTP ${N.status}`);throw j.status=N.status,j.code=Z.code,j}return N.json()}async function q8(_,$){let N=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Move failed"})),j=Error(Z.error||`HTTP ${N.status}`);throw j.status=N.status,j.code=Z.code,j}return N.json()}async function V8(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return o_($,{method:"DELETE"})}async function _3(_,$=!1){return o_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function R3(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function X8(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class g3{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_queued",(_)=>{this.onEvent("agent_followup_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_consumed",(_)=>{this.onEvent("agent_followup_consumed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_removed",(_)=>{this.onEvent("agent_followup_removed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,N=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,N+$),this.reconnectAttempts=0;let Z=Math.max(this.cooldownUntil-N,0),j=Math.max(this.reconnectDelay,Z);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},j),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function l0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function c_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function H2(_,$=!1){let N=l0(_);if(N===null)return $;return N==="true"}function y2(_,$=null){let N=l0(_);if(N===null)return $;let Z=parseInt(N,10);return Number.isFinite(Z)?Z:$}function e0({prefix:_="file",label:$,title:N,onRemove:Z,onClick:j,removeTitle:J="Remove",icon:K="file"}){let Y=`${_}-file-pill`,O=`${_}-file-name`,z=`${_}-file-remove`,V=K==="message"?X`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:X`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return X`
    <span class=${Y} title=${N||$} onClick=${j}>
      ${V}
      <span class=${O}>${$}</span>
      ${Z&&X`
        <button
          class=${z}
          onClick=${(L)=>{L.preventDefault(),L.stopPropagation(),Z()}}
          title=${J}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var G6=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steer",description:"Steer the current response"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function B6({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),N=_.tokens,Z=_.contextWindow,j=N!=null?`Context: ${W8(N)} / ${W8(Z)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,J=7,K=2*Math.PI*7,Y=$/100*K,O=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return X`
        <span class="compose-context-pie icon-btn" title=${j}>
            <svg width="16" height="16" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke="var(--context-track, rgba(128,128,128,0.2))"
                    stroke-width="2.5" />
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke=${O}
                    stroke-width="2.5"
                    stroke-dasharray=${`${Y} ${K}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `}function W8(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function Q8({onPost:_,onFocus:$,searchMode:N,onSearch:Z,onEnterSearch:j,onExitSearch:J,fileRefs:K=[],onRemoveFileRef:Y,onClearFileRefs:O,messageRefs:z=[],onRemoveMessageRef:V,onClearMessageRefs:L,activeModel:k=null,modelUsage:D=null,thinkingLevel:E=null,supportsThinking:b=!1,contextUsage:m=null,notificationsEnabled:A=!1,notificationPermission:W="default",onToggleNotifications:w,onModelChange:M,onModelStateChange:x,activeEditorPath:p=null,onAttachEditorFile:i,onOpenFilePill:$_,followupQueueItems:Y_=[],onInjectQueuedFollowup:s,onRemoveQueuedFollowup:B_,onMessageResponse:H_,isAgentActive:r=!1}){let[__,e]=u(""),[a,J_]=u(""),[G_,j_]=u([]),[b_,V_]=u(!1),[W_,x_]=u([]),[R_,B0]=u(0),[M_,A_]=u(!1),[N_,y_]=u(!1),[L_,D_]=u(!1),[X_,g_]=u([]),[P_,U_]=u(!1),K_=y(null),S_=y(null),v_=y(null),r_=y(null),d_=y(0),L0=200,F_=(U)=>{let f=new Set,d=[];for(let O_ of U||[]){if(typeof O_!=="string")continue;let C_=O_.trim();if(!C_||f.has(C_))continue;f.add(C_),d.push(C_)}return d},F0=()=>{let U=l0("piclaw_compose_history");if(!U)return[];try{let f=JSON.parse(U);if(!Array.isArray(f))return[];return F_(f)}catch{return[]}},x0=(U)=>{c_("piclaw_compose_history",JSON.stringify(U))},J0=y(F0()),z0=y(-1),l_=y(""),T=__.trim()||G_.length>0||K.length>0||z.length>0,Z_=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),k_=typeof window<"u"&&typeof Notification<"u",q0=typeof window<"u"?Boolean(window.isSecureContext):!1,T_=k_&&q0&&W!=="denied",H0=W==="granted"&&A,s_=H0?"Disable notifications":"Enable notifications",a_=k||"",t_=b&&E?` (${E})`:"",y0=t_.trim()?`${E}`:"",$2=typeof D?.hint_short==="string"?D.hint_short.trim():"",Y0=[y0||null,$2||null].filter(Boolean).join(" • "),V2=[a_?`Current model: ${a_}${t_}`:null,D?.plan?`Plan: ${D.plan}`:null,$2||null,D?.primary?.reset_description||null,D?.secondary?.reset_description||null].filter(Boolean),T0=N_?"Switching model…":V2.join(" • ")||`Current model: ${a_}${t_} (tap to open model picker)`,I0=(U)=>{if(!U||typeof U!=="object")return;let f=U.model??U.current;if(typeof x==="function")x({model:f??null,thinking_level:U.thinking_level??null,supports_thinking:U.supports_thinking,provider_usage:U.provider_usage??null});if(f&&typeof M==="function")M(f)},O0=(U)=>{let f=U||K_.current;if(!f)return;f.style.height="auto",f.style.height=`${f.scrollHeight}px`,f.style.overflowY="hidden"},o0=(U)=>{if(!U.startsWith("/")||U.includes(`
`)){A_(!1),x_([]);return}let f=U.toLowerCase().split(" ")[0];if(f.length<1){A_(!1),x_([]);return}let d=G6.filter((O_)=>O_.name.startsWith(f)||O_.name.replace(/-/g,"").startsWith(f.replace(/-/g,"")));if(d.length>0&&!(d.length===1&&d[0].name===f))x_(d),B0(0),A_(!0);else A_(!1),x_([])},f0=(U)=>{let f=__,d=f.indexOf(" "),O_=d>=0?f.slice(d):"",C_=U.name+O_;e(C_),A_(!1),x_([]),requestAnimationFrame(()=>{let h_=K_.current;if(!h_)return;let q_=C_.length;h_.selectionStart=q_,h_.selectionEnd=q_,h_.focus()})},m_=(U)=>{if(N)J_(U);else e(U),o0(U);requestAnimationFrame(()=>O0())},Y2=(U)=>{let f=N?a:__,d=f&&!f.endsWith(`
`)?`
`:"",O_=`${f}${d}${U}`.trimStart();m_(O_)},v0=(U)=>{let f=U?.command?.model_label;if(f)return f;let d=U?.command?.message;if(typeof d==="string"){let O_=d.match(/•\s+([^\n]+?)\s+\(current\)/);if(O_?.[1])return O_[1].trim()}return null},X0=async(U)=>{if(N||N_)return;y_(!0);try{let f=await T3("default",U,null,[]),d=v0(f);I0({model:d??k??null,thinking_level:f?.command?.thinking_level,supports_thinking:f?.command?.supports_thinking});try{let O_=await q2();if(O_)I0(O_)}catch{}return _?.(),!0}catch(f){return console.error("Failed to switch model:",f),alert("Failed to switch model: "+f.message),!1}finally{y_(!1)}},m0=async()=>{await X0("/cycle-model")},e_=async(U)=>{if(!U||N_)return;if(await X0(`/model ${U}`))D_(!1)},D0=(U)=>{U.preventDefault(),U.stopPropagation(),D_((f)=>!f)},R0=(U)=>{if(U==="queue"||U==="steer"||U==="auto")return U;return r?"queue":null},f_=async(U,f,d={})=>{let{includeMedia:O_=!0,includeFileRefs:C_=!0,includeMessageRefs:h_=!0,clearAfterSubmit:q_=!0,recordHistory:$0=!0}=d||{},A0=typeof U==="string"?U:U&&typeof U?.target?.value==="string"?U.target.value:__,C0=typeof A0==="string"?A0:"";if(!C0.trim()&&(O_?G_.length===0:!0)&&(C_?K.length===0:!0)&&(h_?z.length===0:!0))return;A_(!1),x_([]);let r0=O_?[...G_]:[],O2=C_?[...K]:[],X2=h_?[...z]:[],b0=C0.trim();if($0&&b0){let N0=J0.current,w0=F_(N0.filter((G2)=>G2!==b0));if(w0.push(b0),w0.length>200)w0.splice(0,w0.length-200);J0.current=w0,x0(w0),z0.current=-1,l_.current=""}if(q_)e(""),j_([]),O?.(),L?.();(async()=>{try{let N0=[];for(let I_ of r0){let j0=await N8(I_);N0.push(j0.id)}let w0=O2.length?`Files:
${O2.map((I_)=>`- ${I_}`).join(`
`)}`:"",G2=X2.length?`Referenced messages:
${X2.map((I_)=>`- message:${I_}`).join(`
`)}`:"",c0=N0.length?`Images:
${N0.map((I_,j0)=>{let W2=r0[j0]?.name||`image-${j0+1}`;return`- attachment:${I_} (${W2})`}).join(`
`)}`:"",B2=[b0,w0,G2,c0].filter(Boolean).join(`

`),d0=await T3("default",B2,null,N0,R0(f));if(H_?.(d0),d0?.command){I0({model:d0.command.model_label??k??null,thinking_level:d0.command.thinking_level,supports_thinking:d0.command.supports_thinking});try{let I_=await q2();if(I_)I0(I_)}catch{}}_?.()}catch(N0){console.error("Failed to post:",N0)}})()},_0=(U)=>{s?.(U)},k0=(U)=>{if(U.isComposing)return;if(N&&U.key==="Escape"){U.preventDefault(),J_(""),J?.();return}if(M_&&W_.length>0){let f=K_.current?.value??(N?a:__);if(!String(f||"").startsWith("/"))A_(!1),x_([]);else{if(U.key==="ArrowDown"){U.preventDefault(),B0((d)=>(d+1)%W_.length);return}if(U.key==="ArrowUp"){U.preventDefault(),B0((d)=>(d-1+W_.length)%W_.length);return}if(U.key==="Tab"){U.preventDefault(),f0(W_[R_]);return}if(U.key==="Enter"&&!U.shiftKey){if(!(K_.current?.value??(N?a:__)).includes(" ")){U.preventDefault();let C_=W_[R_];A_(!1),x_([]),f_(C_.name);return}}if(U.key==="Escape"){U.preventDefault(),A_(!1),x_([]);return}}}if(!N&&(U.key==="ArrowUp"||U.key==="ArrowDown")&&!U.metaKey&&!U.ctrlKey&&!U.altKey&&!U.shiftKey){let f=K_.current;if(!f)return;let d=f.value||"",O_=f.selectionStart===0&&f.selectionEnd===0,C_=f.selectionStart===d.length&&f.selectionEnd===d.length;if(U.key==="ArrowUp"&&O_||U.key==="ArrowDown"&&C_){let h_=J0.current;if(!h_.length)return;U.preventDefault();let q_=z0.current;if(U.key==="ArrowUp"){if(q_===-1)l_.current=d,q_=h_.length-1;else if(q_>0)q_-=1;z0.current=q_,m_(h_[q_]||"")}else{if(q_===-1)return;if(q_<h_.length-1)q_+=1,z0.current=q_,m_(h_[q_]||"");else z0.current=-1,m_(l_.current||""),l_.current=""}requestAnimationFrame(()=>{let $0=K_.current;if(!$0)return;let A0=$0.value.length;$0.selectionStart=A0,$0.selectionEnd=A0});return}}if(U.key==="Enter"&&!U.shiftKey&&(U.ctrlKey||U.metaKey)){U.preventDefault();let f=K_.current?.value??(N?a:__);if(N){if(f.trim())Z?.(f.trim())}else f_(f,"steer");return}if(U.key==="Enter"&&!U.shiftKey){U.preventDefault();let f=K_.current?.value??(N?a:__);if(N){if(f.trim())Z?.(f.trim())}else f_(f)}},W0=(U)=>{let f=Array.from(U||[]).filter((d)=>d&&d.type&&d.type.startsWith("image/"));if(!f.length)return;j_((d)=>[...d,...f])},E0=(U)=>{W0(U.target.files),U.target.value=""},g0=(U)=>{if(N)return;U.preventDefault(),U.stopPropagation(),d_.current+=1,V_(!0)},N2=(U)=>{if(N)return;if(U.preventDefault(),U.stopPropagation(),d_.current=Math.max(0,d_.current-1),d_.current===0)V_(!1)},Q0=(U)=>{if(N)return;if(U.preventDefault(),U.stopPropagation(),U.dataTransfer)U.dataTransfer.dropEffect="copy";V_(!0)},E2=(U)=>{if(N)return;U.preventDefault(),U.stopPropagation(),d_.current=0,V_(!1),W0(U.dataTransfer?.files||[])},U0=(U)=>{if(N)return;let f=U.clipboardData?.items;if(!f||!f.length)return;let d=[];for(let O_ of f){if(O_.kind!=="file")continue;let C_=O_.getAsFile?.();if(C_)d.push(C_)}if(d.length>0)U.preventDefault(),W0(d)},u0=(U)=>{j_((f)=>f.filter((d,O_)=>O_!==U))},h0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((U)=>{let{latitude:f,longitude:d,accuracy:O_}=U.coords,C_=`${f.toFixed(5)}, ${d.toFixed(5)}`,h_=Number.isFinite(O_)?` ±${Math.round(O_)}m`:"",q_=`https://maps.google.com/?q=${f},${d}`,$0=`Location: ${C_}${h_} ${q_}`;Y2($0)},(U)=>{let f=U?.message||"Unable to retrieve location.";alert(`Location error: ${f}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};R(()=>{if(!L_)return;U_(!0),q2().then((U)=>{let f=Array.isArray(U?.models)?U.models.filter((d)=>typeof d==="string"&&d.trim().length>0):[];g_(f),I0(U)}).catch((U)=>{console.warn("Failed to load model list:",U),g_([])}).finally(()=>{U_(!1)})},[L_,k]),R(()=>{if(N)D_(!1)},[N]),R(()=>{if(!L_)return;let U=(f)=>{let d=v_.current,O_=r_.current,C_=f.target;if(d&&d.contains(C_))return;if(O_&&O_.contains(C_))return;D_(!1)};return document.addEventListener("pointerdown",U),()=>document.removeEventListener("pointerdown",U)},[L_]);let Z2=(U)=>{let f=U.target.value;O0(U.target),m_(f)};return R(()=>{requestAnimationFrame(()=>O0())},[__,a,N]),X`
        <div class="compose-box">
            ${!N&&Y_.length>0&&X`
                <div class="compose-queue-stack">
                    ${Y_.map((U)=>{let f=typeof U?.content==="string"?U.content:"";if(!f.trim())return null;return X`
                            <div class="compose-queue-stack-item" role="listitem">
                                <span class="compose-queue-stack-content" title=${f}>
                                    ${f}
                                </span>
                                <button
                                    class="compose-queue-stack-steer-btn"
                                    type="button"
                                    title="Inject queued follow-up as steer"
                                    onClick=${()=>_0(U)}
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
                                    onClick=${()=>B_?.(U)}
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
                class=${`compose-input-wrapper${b_?" drag-active":""}`}
                onDragEnter=${g0}
                onDragOver=${Q0}
                onDragLeave=${N2}
                onDrop=${E2}
            >
                <div class="compose-input-main">
                    ${(K.length>0||G_.length>0||z.length>0)&&X`
                        <div class="compose-file-refs">
                            ${z.map((U)=>{return X`
                                    <${e0}
                                        key=${"msg-"+U}
                                        prefix="compose"
                                        label=${"msg:"+U}
                                        title=${"Message reference: "+U}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>V?.(U)}
                                    />
                                `})}
                            ${K.map((U)=>{let f=U.split("/").pop()||U;return X`
                                    <${e0}
                                        prefix="compose"
                                        label=${f}
                                        title=${U}
                                        onClick=${()=>$_?.(U)}
                                        removeTitle="Remove file"
                                        onRemove=${()=>Y?.(U)}
                                    />
                                `})}
                            ${G_.map((U,f)=>{let d=U?.name||`image-${f+1}`;return X`
                                    <${e0}
                                        key=${d+f}
                                        prefix="compose"
                                        label=${d}
                                        title=${d}
                                        removeTitle="Remove image"
                                        onRemove=${()=>u0(f)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${K_}
                        placeholder=${N?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${N?a:__}
                        onInput=${Z2}
                        onKeyDown=${k0}
                        onPaste=${U0}
                        onFocus=${$}
                        onClick=${$}
                        rows="1"
                    />
                    ${M_&&W_.length>0&&X`
                        <div class="slash-autocomplete" ref=${S_}>
                            ${W_.map((U,f)=>X`
                                <div
                                    key=${U.name}
                                    class=${`slash-item${f===R_?" active":""}`}
                                    onMouseDown=${(d)=>{d.preventDefault(),f0(U)}}
                                    onMouseEnter=${()=>B0(f)}
                                >
                                    <span class="slash-name">${U.name}</span>
                                    <span class="slash-desc">${U.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${L_&&!N&&X`
                        <div class="compose-model-popup" ref=${v_}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${P_&&X`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!P_&&X_.length===0&&X`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!P_&&X_.map((U)=>X`
                                    <button
                                        key=${U}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${k===U?" active":""}`}
                                        onClick=${()=>{e_(U)}}
                                        disabled=${N_}
                                    >
                                        ${U}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{m0()}}
                                    disabled=${N_}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!N&&k&&X`
                    <div class="compose-meta-row">
                        ${!N&&k&&X`
                            <div class="compose-model-meta">
                                <button
                                    ref=${r_}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${T0}
                                    aria-label="Open model picker"
                                    onClick=${D0}
                                    disabled=${N_}
                                >
                                    ${N_?"Switching…":a_}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!N_&&Y0&&X`
                                        <span class="compose-model-usage-hint" title=${T0}>
                                            ${Y0}
                                        </span>
                                    `}
                                </div>
                            </div>
                        `}
                    </div>
                    `}
                    <div class="compose-actions ${N?"search-mode":""}">
                    ${!N&&m&&m.percent!=null&&X`
                        <${B6} usage=${m} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${N?J:j}
                        title=${N?"Close search":"Search"}
                    >
                        ${N?X`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        `:X`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        `}
                    </button>
                    ${Z_&&!N&&X`
                        <button
                            class="icon-btn location-btn"
                            onClick=${h0}
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
                    ${T_&&!N&&X`
                        <button
                            class=${`icon-btn notification-btn${H0?" active":""}`}
                            onClick=${w}
                            title=${s_}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!N&&X`
                        ${p&&i&&X`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${i}
                                title=${`Attach open file: ${p}`}
                                type="button"
                                disabled=${K.includes(p)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${E0} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{f_()}}
                            disabled=${!T}
                            title="Send (Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var F8="piclaw_theme",i3="piclaw_tint",Z3={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},L6={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},U8={default:{label:"Default",mode:"auto",light:Z3,dark:L6},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},q6=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],J3={theme:"default",tint:null},H8="light",h3=!1;function y8(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function D2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let N=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(N)&&!/^[0-9a-fA-F]{6}$/.test(N))return null;let Z=N.length===3?N.split("").map((J)=>J+J).join(""):N,j=parseInt(Z,16);return{r:j>>16&255,g:j>>8&255,b:j&255,hex:`#${Z.toLowerCase()}`}}function V6(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let N=document.createElement("div");if(N.style.color="",N.style.color=$,!N.style.color)return null;let Z=N.style.color;try{if(document.body)N.style.display="none",document.body.appendChild(N),Z=getComputedStyle(N).color||N.style.color,document.body.removeChild(N)}catch{}let j=Z.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!j)return null;let J=parseInt(j[1],10),K=parseInt(j[2],10),Y=parseInt(j[3],10);if(![J,K,Y].every((z)=>Number.isFinite(z)))return null;let O=`#${[J,K,Y].map((z)=>z.toString(16).padStart(2,"0")).join("")}`;return{r:J,g:K,b:Y,hex:O}}function D8(_){return D2(_)||V6(_)}function T2(_,$,N){let Z=Math.round(_.r+($.r-_.r)*N),j=Math.round(_.g+($.g-_.g)*N),J=Math.round(_.b+($.b-_.b)*N);return`rgb(${Z} ${j} ${J})`}function p3(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function k8(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function n3(_){return U8[_]||U8.default}function X6(_){return _.mode==="auto"?k8():_.mode}function W6(_,$){let N=n3(_);if($==="dark"&&N.dark)return N.dark;if($==="light"&&N.light)return N.light;return N.dark||N.light||Z3}function Q6(_,$,N){let Z=D8($);if(!Z)return _;let j=D2(_.bgPrimary),J=D2(_.bgSecondary),K=D2(_.bgHover),Y=D2(_.borderColor);if(!j||!J||!K||!Y)return _;let z=D2(N==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:T2(j,Z,0.08),bgSecondary:T2(J,Z,0.12),bgHover:T2(K,Z,0.16),borderColor:T2(Y,Z,0.08),accent:Z.hex,accentHover:z?T2(Z,z,0.18):Z.hex}}function U6(_,$){if(typeof document>"u")return;let N=document.documentElement,Z=_.accent,j=D8(Z),J=j?p3(j,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,K=j?p3(j,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",Y=j?p3(j,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",O={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":Z,"--accent-hover":_.accentHover||Z,"--accent-soft":K,"--accent-soft-strong":Y,"--danger-color":_.danger||Z3.danger,"--success-color":_.success||Z3.success,"--search-highlight-color":J||"rgba(29, 155, 240, 0.2)"};Object.entries(O).forEach(([z,V])=>{if(V)N.style.setProperty(z,V)})}function F6(){if(typeof document>"u")return;let _=document.documentElement;q6.forEach(($)=>_.style.removeProperty($))}function $3(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function H6(_,$){if(typeof document>"u")return;let N=$3("theme-color");if(N&&_)N.setAttribute("content",_);let Z=$3("msapplication-TileColor");if(Z&&_)Z.setAttribute("content",_);let j=$3("msapplication-navbutton-color");if(j&&_)j.setAttribute("content",_);let J=$3("apple-mobile-web-app-status-bar-style");if(J)J.setAttribute("content",$==="dark"?"black-translucent":"default")}function y6(){if(typeof window>"u")return;let _={...J3,mode:H8};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function l3(_,$={}){if(typeof window>"u"||typeof document>"u")return;let N=y8(_?.theme||"default"),Z=_?.tint?String(_.tint).trim():null,j=n3(N),J=X6(j),K=W6(N,J);J3={theme:N,tint:Z},H8=J;let Y=document.documentElement;Y.dataset.theme=J,Y.dataset.colorTheme=N,Y.dataset.tint=Z?String(Z):"",Y.style.colorScheme=J;let O=K;if(N==="default"&&Z)O=Q6(K,Z,J);if(N==="default"&&!Z)F6();else U6(O,J);if(H6(O.bgPrimary,J),y6(),$.persist!==!1)if(c_(F8,N),Z)c_(i3,Z);else c_(i3,"")}function N3(){if(n3(J3.theme).mode!=="auto")return;l3(J3,{persist:!1})}function C8(){if(typeof window>"u")return()=>{};let _=y8(l0(F8)||"default"),$=l0(i3),N=$?$.trim():null;if(l3({theme:_,tint:N},{persist:!1}),window.matchMedia&&!h3){let Z=window.matchMedia("(prefers-color-scheme: dark)");if(Z.addEventListener)Z.addEventListener("change",N3);else if(Z.addListener)Z.addListener(N3);return h3=!0,()=>{if(Z.removeEventListener)Z.removeEventListener("change",N3);else if(Z.removeListener)Z.removeListener(N3);h3=!1}}return()=>{}}function b8(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let N=_.theme??_.name??_.colorTheme,Z=_.tint??null;l3({theme:N||"default",tint:Z},{persist:!0})}function E8(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return k8()}var j3=/#(\w+)/g,D6=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),k6=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),C6=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),b6={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},E6=new Set(["http:","https:","mailto:",""]);function A8(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function k2(_,$={}){if(!_)return null;let N=String(_).trim();if(!N)return null;if(N.startsWith("#")||N.startsWith("/"))return N;if(N.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(N))return N;return null}if(N.startsWith("blob:"))return N;try{let Z=new URL(N,typeof window<"u"?window.location.origin:"http://localhost");if(!E6.has(Z.protocol))return null;return Z.href}catch{return null}}function w8(_,$={}){if(!_)return"";let N=new DOMParser().parseFromString(_,"text/html"),Z=[],j=N.createTreeWalker(N.body,NodeFilter.SHOW_ELEMENT),J;while(J=j.nextNode())Z.push(J);for(let K of Z){let Y=K.tagName.toLowerCase();if(!k6.has(Y)){let z=K.parentNode;if(!z)continue;while(K.firstChild)z.insertBefore(K.firstChild,K);z.removeChild(K);continue}let O=b6[Y]||new Set;for(let z of Array.from(K.attributes)){let V=z.name.toLowerCase(),L=z.value;if(V.startsWith("on")){K.removeAttribute(z.name);continue}if(V.startsWith("data-")||V.startsWith("aria-"))continue;if(O.has(V)||C6.has(V)){if(V==="href"){let k=k2(L);if(!k)K.removeAttribute(z.name);else if(K.setAttribute(z.name,k),Y==="a"&&!K.getAttribute("rel"))K.setAttribute("rel","noopener noreferrer")}else if(V==="src"){let k=Y==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(L):L,D=k2(k,{allowDataImage:Y==="img"});if(!D)K.removeAttribute(z.name);else K.setAttribute(z.name,D)}continue}K.removeAttribute(z.name)}}return N.body.innerHTML}function M8(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function K3(_,$=2){if(!_)return _;let N=_;for(let Z=0;Z<$;Z+=1){let j=M8(N);if(j===N)break;N=j}return N}function A6(_){if(!_)return{text:"",blocks:[]};let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],j=[],J=!1,K=[];for(let Y of N){if(!J&&Y.trim().match(/^```mermaid\s*$/i)){J=!0,K=[];continue}if(J&&Y.trim().match(/^```\s*$/)){let O=Z.length;Z.push(K.join(`
`)),j.push(`@@MERMAID_BLOCK_${O}@@`),J=!1,K=[];continue}if(J)K.push(Y);else j.push(Y)}if(J)j.push("```mermaid"),j.push(...K);return{text:j.join(`
`),blocks:Z}}function w6(_){if(!_)return _;return K3(_,5)}function M6(_){let $=new TextEncoder().encode(String(_||"")),N="";for(let Z of $)N+=String.fromCharCode(Z);return btoa(N)}function P6(_){let $=atob(String(_||"")),N=new Uint8Array($.length);for(let Z=0;Z<$.length;Z+=1)N[Z]=$.charCodeAt(Z);return new TextDecoder().decode(N)}function S6(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(N,Z)=>{let j=Number(Z),J=$[j]??"",K=w6(J);return`<div class="mermaid-container" data-mermaid="${M6(K)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function P8(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,N)=>{if(N.includes(`
`))return`
\`\`\`
${N}
\`\`\`
`;return`\`${N}\``})}function S8(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,N)=>{let Z=N.trim(),j=Z.startsWith("/"),J=j?Z.slice(1).trim():Z,O=(J.endsWith("/")?J.slice(0,-1).trim():J).split(/\s+/)[0]?.toLowerCase();if(!O||!D6.has(O))return $;if(O==="br")return j?"":"<br>";if(j)return`</${O}>`;return`<${O}>`})}function x8(_){if(!_)return _;let $=(N)=>N.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(N,Z)=>`<pre><code>${$(Z)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(N,Z)=>`<code>${$(Z)}</code>`)}function T8(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),N=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=(J)=>J.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),j;while(j=N.nextNode()){if(!j.nodeValue)continue;let J=Z(j.nodeValue);if(J!==j.nodeValue)j.nodeValue=J}return $.body.innerHTML}function x6(_){if(!window.katex)return _;let $=(K)=>M8(K).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),N=(K)=>{let Y=[],O=K.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(z)=>{let V=Y.length;return Y.push(z),`@@CODE_BLOCK_${V}@@`});return O=O.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(z)=>{let V=Y.length;return Y.push(z),`@@CODE_INLINE_${V}@@`}),{html:O,blocks:Y}},Z=(K,Y)=>{if(!Y.length)return K;return K.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(O,z)=>{let V=Number(z);return Y[V]??""})},j=N(_),J=j.html;return J=J.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(K,Y,O)=>{try{let z=katex.renderToString($(O.trim()),{displayMode:!0,throwOnError:!1});return`${Y}${z}`}catch(z){return`<span class="math-error" title="${A8(z.message)}">${K}</span>`}}),J=J.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(K,Y,O)=>{if(/\s$/.test(O))return K;try{let z=katex.renderToString($(O),{displayMode:!1,throwOnError:!1});return`${Y}${z}`}catch(z){return`${Y}<span class="math-error" title="${A8(z.message)}">$${O}$</span>`}}),Z(J,j.blocks)}function T6(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),N=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=[],j;while(j=N.nextNode())Z.push(j);for(let J of Z){let K=J.nodeValue;if(!K)continue;if(j3.lastIndex=0,!j3.test(K))continue;j3.lastIndex=0;let Y=J.parentElement;if(Y&&(Y.closest("a")||Y.closest("code")||Y.closest("pre")))continue;let O=K.split(j3);if(O.length<=1)continue;let z=$.createDocumentFragment();O.forEach((V,L)=>{if(L%2===1){let k=$.createElement("a");k.setAttribute("href","#"),k.className="hashtag",k.setAttribute("data-hashtag",V),k.textContent=`#${V}`,z.appendChild(k)}else z.appendChild($.createTextNode(V))}),J.parentNode?.replaceChild(z,J)}return $.body.innerHTML}function I6(_){if(!_)return _;let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],j=!1;for(let J of N){if(!j&&J.trim().match(/^```(?:math|katex|latex)\s*$/i)){j=!0,Z.push("$$");continue}if(j&&J.trim().match(/^```\s*$/)){j=!1,Z.push("$$");continue}Z.push(J)}return Z.join(`
`)}function K2(_,$,N={}){if(!_)return"";let Z=I6(_),{text:j,blocks:J}=A6(Z),K=K3(j,2),O=P8(K).replace(/</g,"&lt;").replace(/>/g,"&gt;"),z=S8(O),V=window.marked?marked.parse(z,{headerIds:!1,mangle:!1}):z.replace(/\n/g,"<br>");return V=x8(V),V=T8(V),V=x6(V),V=T6(V),V=S6(V,J),V=w8(V,N),V}function I8(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),N=K3($,2),j=P8(N).replace(/</g,"&lt;").replace(/>/g,"&gt;"),J=S8(j),K=window.marked?marked.parse(J):J.replace(/\n/g,"<br>");return K=x8(K),K=T8(K),K=w8(K),K}async function C2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:N}=window.beautifulMermaid,j=E8()==="dark"?N["tokyo-night"]:N["github-light"],J=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let K of J)try{let Y=K.dataset.mermaid,O=P6(Y||""),z=K3(O,2),V=await $(z,{...j,transparent:!0});K.innerHTML=V,K.removeAttribute("data-mermaid")}catch(Y){console.error("Mermaid render error:",Y);let O=document.createElement("pre");O.className="mermaid-error",O.textContent=`Diagram error: ${Y.message}`,K.innerHTML="",K.appendChild(O),K.removeAttribute("data-mermaid")}}var f8="PiClaw";function o3(_,$){let N=_||"PiClaw",Z=N.charAt(0).toUpperCase(),j=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],J=Z.charCodeAt(0)%j.length,K=j[J],Y=N.trim().toLowerCase(),O=typeof $==="string"?$.trim():"",V=(O?O:null)||(Y==="PiClaw".toLowerCase()||Y==="pi"?"/static/icon-192.png":null);return{letter:Z,color:K,image:V}}function u8(_,$){if(!_)return"PiClaw";let N=$[_]?.name||_;return N?N.charAt(0).toUpperCase()+N.slice(1):"PiClaw"}function c8(_,$){if(!_)return null;let N=$[_]||{};return N.avatar_url||N.avatarUrl||N.avatar||null}function v8(_){if(!_)return null;if(typeof document<"u"){let J=document.documentElement,K=J?.dataset?.colorTheme||"",Y=J?.dataset?.tint||"",O=getComputedStyle(J).getPropertyValue("--accent-color")?.trim();if(O&&(Y||K&&K!=="default"))return O}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],N=String(_),Z=0;for(let J=0;J<N.length;J+=1)Z=(Z*31+N.charCodeAt(J))%2147483647;let j=Math.abs(Z)%$.length;return $[j]}function f6(_){if(!_||typeof _!=="object")return null;let $=_.started_at??_.startedAt;if(typeof $!=="string"||!$)return null;let N=Date.parse($);return Number.isFinite(N)?N:null}function z3(_){if(!_||typeof _!=="object")return!1;let $=_.intent_key??_.intentKey;return _.type==="intent"&&$==="compaction"}function u6(_){let $=Math.max(0,Math.floor(_/1000)),N=$%60,Z=Math.floor($/60)%60,j=Math.floor($/3600);if(j>0)return`${j}:${String(Z).padStart(2,"0")}:${String(N).padStart(2,"0")}`;return`${Z}:${String(N).padStart(2,"0")}`}function m8(_,$=Date.now()){let N=f6(_);if(N===null)return null;return u6(Math.max(0,$-N))}function R8({status:_,draft:$,plan:N,thought:Z,pendingRequest:j,intent:J,turnId:K,steerQueued:Y,onPanelToggle:O}){let L=(N_)=>{if(!N_)return{text:"",totalLines:0,fullText:""};if(typeof N_==="string"){let X_=N_,g_=X_?X_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:X_,totalLines:g_,fullText:X_}}let y_=N_.text||"",L_=N_.fullText||N_.full_text||y_,D_=Number.isFinite(N_.totalLines)?N_.totalLines:L_?L_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:y_,totalLines:D_,fullText:L_}},k=160,D=(N_)=>{if(!N_)return 1;return Math.max(1,Math.ceil(N_.length/160))},E=(N_,y_,L_)=>{let D_=(N_||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!D_)return{text:"",omitted:0,totalLines:Number.isFinite(L_)?L_:0,visibleLines:0};let X_=D_.split(`
`),g_=X_.length>y_?X_.slice(0,y_).join(`
`):D_,P_=Number.isFinite(L_)?L_:X_.reduce((S_,v_)=>S_+D(v_),0),U_=g_?g_.split(`
`).reduce((S_,v_)=>S_+D(v_),0):0,K_=Math.max(P_-U_,0);return{text:g_,omitted:K_,totalLines:P_,visibleLines:U_}},b=L(N),m=L(Z),A=L($),W=Boolean(b.text)||b.totalLines>0,w=Boolean(m.text)||m.totalLines>0,M=Boolean(A.fullText?.trim()||A.text?.trim());if(!_&&!M&&!W&&!w&&!j&&!J)return null;let[x,p]=u(new Set),[i,$_]=u(()=>Date.now()),Y_=(N_)=>p((y_)=>{let L_=new Set(y_),D_=!L_.has(N_);if(D_)L_.add(N_);else L_.delete(N_);if(typeof O==="function")O(N_,D_);return L_});R(()=>{p(new Set)},[K]);let s=z3(_);R(()=>{if(!s)return;$_(Date.now());let N_=setInterval(()=>$_(Date.now()),1000);return()=>clearInterval(N_)},[s,_?.started_at,_?.startedAt]);let B_=_?.turn_id||K,H_=v8(B_),r=Y?"turn-dot turn-dot-queued":"turn-dot",__=(N_)=>N_,e=Boolean(_?.last_activity||_?.lastActivity),a=(N_)=>N_==="warning"?"#f59e0b":N_==="error"?"var(--danger-color)":N_==="success"?"var(--success-color)":H_,J_=J?.kind||"info",G_=a(J_),j_=a(_?.kind||(s?"warning":"info")),b_="",V_=_?.title,W_=_?.status;if(_?.type==="plan")b_=V_?`Planning: ${V_}`:"Planning...";else if(_?.type==="tool_call")b_=V_?`Running: ${V_}`:"Running tool...";else if(_?.type==="tool_status")b_=V_?`${V_}: ${W_||"Working..."}`:W_||"Working...";else if(_?.type==="error")b_=V_||"Agent error";else b_=V_||W_||"Working...";if(e)b_="Last activity just now";let x_=({panelTitle:N_,text:y_,fullText:L_,totalLines:D_,maxLines:X_,titleClass:g_,panelKey:P_})=>{let U_=x.has(P_),K_=L_||y_||"",S_=typeof X_==="number",v_=U_&&S_,r_=S_?E(K_,X_,D_):{text:K_||"",omitted:0,totalLines:Number.isFinite(D_)?D_:0};if(!K_&&!(Number.isFinite(r_.totalLines)&&r_.totalLines>0))return null;let d_=`agent-thinking-body${S_?" agent-thinking-body-collapsible":""}`,L0=S_?`--agent-thinking-collapsed-lines: ${X_};`:"";return X`
            <div
                class="agent-thinking"
                data-expanded=${U_?"true":"false"}
                data-collapsible=${S_?"true":"false"}
                style=${H_?`--turn-color: ${H_};`:""}
            >
                <div class="agent-thinking-title ${g_||""}">
                    ${H_&&X`<span class=${r} aria-hidden="true"></span>`}
                    ${N_}
                    ${v_&&X`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${N_} panel`}
                            onClick=${()=>Y_(P_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${d_}
                    style=${L0}
                    dangerouslySetInnerHTML=${{__html:I8(K_)}}
                />
                ${!U_&&r_.omitted>0&&X`
                    <button class="agent-thinking-truncation" onClick=${()=>Y_(P_)}>
                        ▸ ${r_.omitted} more lines
                    </button>
                `}
                ${U_&&r_.omitted>0&&X`
                    <button class="agent-thinking-truncation" onClick=${()=>Y_(P_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},R_=j?.tool_call?.title,B0=R_?`Awaiting approval: ${R_}`:"Awaiting approval",M_=s?m8(_,i):null,A_=(N_,y_,L_=null)=>X`
        <div
            class="agent-thinking agent-thinking-intent"
            aria-live="polite"
            style=${y_?`--turn-color: ${y_};`:""}
            title=${N_?.detail||""}
        >
            <div class="agent-thinking-title intent">
                ${y_&&X`<span class=${r} aria-hidden="true"></span>`}
                <span class="agent-thinking-title-text">${N_.title}</span>
                ${L_&&X`<span class="agent-status-elapsed">${L_}</span>`}
            </div>
            ${N_.detail&&X`<div class="agent-thinking-body">${N_.detail}</div>`}
        </div>
    `;return X`
        <div class="agent-status-panel">
            ${J&&A_(J,G_)}
            ${_?.type==="intent"&&A_(_,j_,M_)}
            ${j&&X`
                <div class="agent-status agent-status-request" aria-live="polite" style=${H_?`--turn-color: ${H_};`:""}>
                    <span class=${r} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${B0}</span>
                </div>
            `}
            ${W&&x_({panelTitle:__("Planning"),text:b.text,fullText:b.fullText,totalLines:b.totalLines,panelKey:"plan"})}
            ${w&&x_({panelTitle:__("Thoughts"),text:m.text,fullText:m.fullText,totalLines:m.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${M&&x_({panelTitle:__("Draft"),text:A.text,fullText:A.fullText,totalLines:A.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&_?.type!=="intent"&&X`
                <div class=${`agent-status${e?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${H_?`--turn-color: ${H_};`:""}>
                    ${H_&&X`<span class=${r} aria-hidden="true"></span>`}
                    ${_?.type==="error"?X`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!e&&X`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${b_}</span>
                </div>
            `}
        </div>
    `}function g8({request:_,onRespond:$}){if(!_)return null;let{request_id:N,tool_call:Z,options:j}=_,J=Z?.title||"Agent Request",K=Z?.kind||"other",Y=Z?.rawInput||{},O=Y.command||Y.commands&&Y.commands[0]||null,z=Y.diff||null,V=Y.fileName||Y.path||null,L=Z?.description||Y.description||Y.explanation||null,D=(Array.isArray(Z?.locations)?Z.locations:[]).map((W)=>W?.path).filter((W)=>Boolean(W)),E=Array.from(new Set([V,...D].filter(Boolean)));console.log("AgentRequestModal:",{request_id:N,tool_call:Z,options:j});let b=async(W)=>{try{await v3(N,W),$()}catch(w){console.error("Failed to respond to agent request:",w)}},m=async()=>{try{await Z8(J,`Auto-approved: ${J}`),await v3(N,"approved"),$()}catch(W){console.error("Failed to add to whitelist:",W)}},A=j&&j.length>0;return X`
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
                ${(L||O||z||E.length>0)&&X`
                    <div class="agent-request-body">
                        ${L&&X`
                            <div class="agent-request-description">${L}</div>
                        `}
                        ${E.length>0&&X`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${E.map((W,w)=>X`<li key=${w}>${W}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${O&&X`
                            <pre class="agent-request-command">${O}</pre>
                        `}
                        ${z&&X`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${z}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${A?j.map((W)=>X`
                            <button 
                                key=${W.optionId||W.id||String(W)}
                                class="agent-request-btn ${W.kind==="allow_once"||W.kind==="allow_always"?"primary":""}"
                                onClick=${()=>b(W.optionId||W.id||W)}
                            >
                                ${W.name||W.label||W.optionId||W.id||String(W)}
                            </button>
                        `):X`
                        <button class="agent-request-btn primary" onClick=${()=>b("approved")}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${()=>b("denied")}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${m}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function h8({status:_}){if(_==="connected")return null;return X`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function p8(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let Z=new Date-$,j=Z/1000,J=86400000;if(Z<J){if(j<60)return"just now";if(j<3600)return`${Math.floor(j/60)}m`;return`${Math.floor(j/3600)}h`}if(Z<5*J){let O=$.toLocaleDateString(void 0,{weekday:"short"}),z=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${O} ${z}`}let K=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),Y=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${K} ${Y}`}function I2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function S0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function b2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}var c6=new Set(["application/json","application/xml","text/csv","text/html","text/markdown","text/plain","text/xml"]),v6=new Set(["text/markdown"]);function f2(_){let $=typeof _==="string"?_.trim().toLowerCase():"";if(!$)return"unsupported";if($.startsWith("image/"))return"image";if($==="application/pdf")return"pdf";if(c6.has($)||$.startsWith("text/"))return"text";return"unsupported"}function i8(_){let $=typeof _==="string"?_.trim().toLowerCase():"";return v6.has($)}function n8(_){switch(_){case"image":return"Image preview";case"pdf":return"PDF preview";case"text":return"Text preview";default:return"Preview unavailable"}}function m6(_){let $=_?.metadata?.size;return[{label:"Type",value:_?.content_type||"application/octet-stream"},{label:"Size",value:typeof $==="number"?S0($):null},{label:"Added",value:_?.created_at?b2(_.created_at):null}].filter((Z)=>Z.value)}function l8({mediaId:_,info:$,onClose:N}){let Z=$?.filename||`attachment-${_}`,j=Z0(()=>f2($?.content_type),[$?.content_type]),J=n8(j),K=Z0(()=>i8($?.content_type),[$?.content_type]),[Y,O]=u(j==="text"||j==="pdf"),[z,V]=u(""),[L,k]=u(null),[D,E]=u(null),b=y(null),m=Z0(()=>m6($),[$]),A=Z0(()=>{if(!K||!z)return"";return K2(z)},[K,z]);return R(()=>{let W=(w)=>{if(w.key==="Escape")N()};return document.addEventListener("keydown",W),()=>document.removeEventListener("keydown",W)},[N]),R(()=>{if(!b.current||!A)return;C2(b.current);return},[A]),R(()=>{let W=!1,w=null;async function M(){if(j==="text"){O(!0),E(null);try{let x=await z8(_);if(!W)V(x)}catch{if(!W)E("Failed to load text preview.")}finally{if(!W)O(!1)}return}if(j==="pdf"){O(!0),E(null);try{let x=await Y8(_);if(w=URL.createObjectURL(x),!W)k(w)}catch{if(!W)E("Failed to load PDF preview.")}finally{if(!W)O(!1)}return}O(!1)}return M(),()=>{if(W=!0,w)URL.revokeObjectURL(w)}},[_,j]),X`
        <div class="image-modal attachment-preview-modal" onClick=${N}>
            <div class="attachment-preview-shell" onClick=${(W)=>{W.stopPropagation()}}>
                <div class="attachment-preview-header">
                    <div class="attachment-preview-heading">
                        <div class="attachment-preview-title">${Z}</div>
                        <div class="attachment-preview-subtitle">${J}</div>
                    </div>
                    <div class="attachment-preview-header-actions">
                        <a
                            href=${n0(_)}
                            download=${Z}
                            class="attachment-preview-download"
                            onClick=${(W)=>W.stopPropagation()}
                        >
                            Download
                        </a>
                        <button class="attachment-preview-close" type="button" onClick=${N}>Close</button>
                    </div>
                </div>
                <div class="attachment-preview-body">
                    ${Y&&X`<div class="attachment-preview-state">Loading preview…</div>`}
                    ${!Y&&D&&X`<div class="attachment-preview-state">${D}</div>`}
                    ${!Y&&!D&&j==="image"&&X`
                        <img class="attachment-preview-image" src=${n0(_)} alt=${Z} />
                    `}
                    ${!Y&&!D&&j==="pdf"&&L&&X`
                        <iframe class="attachment-preview-frame" src=${L} title=${Z}></iframe>
                    `}
                    ${!Y&&!D&&j==="text"&&K&&X`
                        <div
                            ref=${b}
                            class="attachment-preview-markdown post-content"
                            dangerouslySetInnerHTML=${{__html:A}}
                        />
                    `}
                    ${!Y&&!D&&j==="text"&&!K&&X`
                        <pre class="attachment-preview-text">${z}</pre>
                    `}
                    ${!Y&&!D&&j==="unsupported"&&X`
                        <div class="attachment-preview-state">
                            Preview is not available for this file type yet. You can still download it directly.
                        </div>
                    `}
                </div>
                <div class="attachment-preview-meta">
                    ${m.map((W)=>X`
                        <div class="attachment-preview-meta-item" key=${W.label}>
                            <span class="attachment-preview-meta-label">${W.label}</span>
                            <span class="attachment-preview-meta-value">${W.value}</span>
                        </div>
                    `)}
                </div>
            </div>
        </div>
    `}function o8({src:_,onClose:$}){return R(()=>{let N=(Z)=>{if(Z.key==="Escape")$()};return document.addEventListener("keydown",N),()=>document.removeEventListener("keydown",N)},[$]),X`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function R6({mediaId:_,onPreview:$}){let[N,Z]=u(null);if(R(()=>{x2(_).then(Z).catch(()=>{})},[_]),!N)return null;let j=N.filename||"file",J=N.metadata?.size,K=J?S0(J):"",O=f2(N.content_type)==="unsupported"?"Details":"Preview";return X`
        <div class="file-attachment" onClick=${(z)=>z.stopPropagation()}>
            <a href=${n0(_)} download=${j} class="file-attachment-main">
                <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                </svg>
                <div class="file-info">
                    <span class="file-name">${j}</span>
                    <span class="file-meta-row">
                        ${K&&X`<span class="file-size">${K}</span>`}
                        ${N.content_type&&X`<span class="file-size">${N.content_type}</span>`}
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
                onClick=${(z)=>{z.preventDefault(),z.stopPropagation(),$?.({mediaId:_,info:N})}}
            >
                ${O}
            </button>
        </div>
    `}function g6({attachment:_,onPreview:$}){let N=Number(_?.id),[Z,j]=u(null);R(()=>{if(!Number.isFinite(N))return;x2(N).then(j).catch(()=>{});return},[N]);let J=Z?.filename||_.label||`attachment-${_.id}`,K=Number.isFinite(N)?n0(N):null,O=f2(Z?.content_type)==="unsupported"?"Details":"Preview";return X`
        <span class="attachment-pill" title=${J}>
            ${K?X`
                    <a href=${K} download=${J} class="attachment-pill-main" onClick=${(z)=>z.stopPropagation()}>
                        <${e0}
                            prefix="post"
                            label=${_.label}
                            title=${J}
                        />
                    </a>
                `:X`
                    <${e0}
                        prefix="post"
                        label=${_.label}
                        title=${J}
                    />
                `}
            ${Number.isFinite(N)&&Z&&X`
                <button
                    class="attachment-pill-preview"
                    type="button"
                    title=${O}
                    onClick=${(z)=>{z.preventDefault(),z.stopPropagation(),$?.({mediaId:N,info:Z})}}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            `}
        </span>
    `}function Y3({annotations:_}){if(!_)return null;let{audience:$,priority:N,lastModified:Z}=_,j=Z?b2(Z):null;return X`
        <div class="content-annotations">
            ${$&&$.length>0&&X`
                <span class="content-annotation">Audience: ${$.join(", ")}</span>
            `}
            ${typeof N==="number"&&X`
                <span class="content-annotation">Priority: ${N}</span>
            `}
            ${j&&X`
                <span class="content-annotation">Updated: ${j}</span>
            `}
        </div>
    `}function h6({block:_}){let $=_.title||_.name||_.uri,N=_.description,Z=_.size?S0(_.size):"",j=_.mime_type||"",J=i6(j),K=k2(_.uri);return X`
        <a
            href=${K||"#"}
            class="resource-link"
            target=${K?"_blank":void 0}
            rel=${K?"noopener noreferrer":void 0}
            onClick=${(Y)=>Y.stopPropagation()}>
            <div class="resource-link-main">
                <div class="resource-link-header">
                    <span class="resource-link-icon-inline">${J}</span>
                    <div class="resource-link-title">${$}</div>
                </div>
                ${N&&X`<div class="resource-link-description">${N}</div>`}
                <div class="resource-link-meta">
                    ${j&&X`<span>${j}</span>`}
                    ${Z&&X`<span>${Z}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `}function p6({block:_}){let[$,N]=u(!1),Z=_.uri||"Embedded resource",j=_.text||"",J=Boolean(_.data),K=_.mime_type||"";return X`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(Y)=>{Y.preventDefault(),Y.stopPropagation(),N(!$)}}>
                ${$?"▼":"▶"} ${Z}
            </button>
            ${$&&X`
                ${j&&X`<pre class="resource-embed-content">${j}</pre>`}
                ${J&&X`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${K&&X`<span class="resource-embed-blob-meta">${K}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(Y)=>{Y.preventDefault(),Y.stopPropagation();let O=new Blob([Uint8Array.from(atob(_.data),(L)=>L.charCodeAt(0))],{type:K||"application/octet-stream"}),z=URL.createObjectURL(O),V=document.createElement("a");V.href=z,V.download=Z.split("/").pop()||"resource",V.click(),URL.revokeObjectURL(z)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function i6(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function n6({preview:_}){let $=k2(_.url),N=k2(_.image,{allowDataImage:!0}),Z=N?`background-image: url('${N}')`:"",j=_.site_name;if(!j&&$)try{j=new URL($).hostname}catch{j=$}return X`
        <a
            href=${$||"#"}
            class="link-preview ${N?"has-image":""}"
            target=${$?"_blank":void 0}
            rel=${$?"noopener noreferrer":void 0}
            onClick=${(J)=>J.stopPropagation()}
            style=${Z}>
            <div class="link-preview-overlay">
                <div class="link-preview-site">${j||""}</div>
                <div class="link-preview-title">${_.title}</div>
                ${_.description&&X`
                    <div class="link-preview-description">${_.description}</div>
                `}
            </div>
        </a>
    `}function l6(_,$){return typeof _==="string"?_:""}var o6=1800,r6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
    </svg>`,d6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>`,s6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;async function a6(_){let $=typeof _==="string"?_:"";if(!$)return!1;if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText($),!0}catch{}try{let N=document.createElement("textarea");N.value=$,N.setAttribute("readonly",""),N.style.position="fixed",N.style.opacity="0",N.style.pointerEvents="none",document.body.appendChild(N),N.select(),N.setSelectionRange(0,N.value.length);let Z=document.execCommand("copy");return document.body.removeChild(N),Z}catch{return!1}}function t6(_){if(!_)return()=>{};let $=Array.from(_.querySelectorAll("pre")).filter((J)=>J.querySelector("code"));if($.length===0)return()=>{};let N=new Map,Z=[],j=(J,K)=>{let Y=K||"idle";if(J.dataset.copyState=Y,Y==="success")J.innerHTML=d6,J.setAttribute("aria-label","Copied"),J.setAttribute("title","Copied"),J.classList.add("is-success"),J.classList.remove("is-error");else if(Y==="error")J.innerHTML=s6,J.setAttribute("aria-label","Copy failed"),J.setAttribute("title","Copy failed"),J.classList.add("is-error"),J.classList.remove("is-success");else J.innerHTML=r6,J.setAttribute("aria-label","Copy code"),J.setAttribute("title","Copy code"),J.classList.remove("is-success","is-error")};return $.forEach((J)=>{let K=document.createElement("div");K.className="post-code-block",J.parentNode?.insertBefore(K,J),K.appendChild(J);let Y=document.createElement("button");Y.type="button",Y.className="post-code-copy-btn",j(Y,"idle"),K.appendChild(Y);let O=async(z)=>{z.preventDefault(),z.stopPropagation();let L=J.querySelector("code")?.textContent||"",k=await a6(L);j(Y,k?"success":"error");let D=N.get(Y);if(D)clearTimeout(D);let E=setTimeout(()=>{j(Y,"idle"),N.delete(Y)},o6);N.set(Y,E)};Y.addEventListener("click",O),Z.push(()=>{Y.removeEventListener("click",O);let z=N.get(Y);if(z)clearTimeout(z);if(K.parentNode)K.parentNode.insertBefore(J,K),K.remove()})}),()=>{Z.forEach((J)=>J())}}function e6(_){if(!_)return{content:_,fileRefs:[]};let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let z=0;z<N.length;z+=1)if(N[z].trim()==="Files:"&&N[z+1]&&/^\s*-\s+/.test(N[z+1])){Z=z;break}if(Z===-1)return{content:_,fileRefs:[]};let j=[],J=Z+1;for(;J<N.length;J+=1){let z=N[J];if(/^\s*-\s+/.test(z))j.push(z.replace(/^\s*-\s+/,"").trim());else if(!z.trim())break;else break}if(j.length===0)return{content:_,fileRefs:[]};let K=N.slice(0,Z),Y=N.slice(J),O=[...K,...Y].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,fileRefs:j}}function _$(_){if(!_)return{content:_,messageRefs:[]};let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let z=0;z<N.length;z+=1)if(N[z].trim()==="Referenced messages:"&&N[z+1]&&/^\s*-\s+/.test(N[z+1])){Z=z;break}if(Z===-1)return{content:_,messageRefs:[]};let j=[],J=Z+1;for(;J<N.length;J+=1){let z=N[J];if(/^\s*-\s+/.test(z)){let L=z.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(L)j.push(L[1])}else if(!z.trim())break;else break}if(j.length===0)return{content:_,messageRefs:[]};let K=N.slice(0,Z),Y=N.slice(J),O=[...K,...Y].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,messageRefs:j}}function $$(_){if(!_)return{content:_,attachments:[]};let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let z=0;z<N.length;z+=1)if(N[z].trim()==="Images:"&&N[z+1]&&/^\s*-\s+/.test(N[z+1])){Z=z;break}if(Z===-1)return{content:_,attachments:[]};let j=[],J=Z+1;for(;J<N.length;J+=1){let z=N[J];if(/^\s*-\s+/.test(z)){let V=z.replace(/^\s*-\s+/,"").trim(),L=V.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||V.match(/^attachment:([^\s]+)\s+(.+)$/i);if(L){let k=L[1],D=(L[2]||"").trim()||k;j.push({id:k,label:D,raw:V})}else j.push({id:null,label:V,raw:V})}else if(!z.trim())break;else break}if(j.length===0)return{content:_,attachments:[]};let K=N.slice(0,Z),Y=N.slice(J),O=[...K,...Y].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,attachments:j}}function N$(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Z$(_,$){if(!_||!$)return _;let N=String($).trim().split(/\s+/).filter(Boolean);if(N.length===0)return _;let Z=N.map(N$).sort((V,L)=>L.length-V.length),j=new RegExp(`(${Z.join("|")})`,"gi"),J=new RegExp(`^(${Z.join("|")})$`,"i"),K=new DOMParser().parseFromString(_,"text/html"),Y=K.createTreeWalker(K.body,NodeFilter.SHOW_TEXT),O=[],z;while(z=Y.nextNode())O.push(z);for(let V of O){let L=V.nodeValue;if(!L||!j.test(L)){j.lastIndex=0;continue}j.lastIndex=0;let k=V.parentElement;if(k&&k.closest("code, pre, script, style"))continue;let D=L.split(j).filter((b)=>b!=="");if(D.length===0)continue;let E=K.createDocumentFragment();for(let b of D)if(J.test(b)){let m=K.createElement("mark");m.className="search-highlight-term",m.textContent=b,E.appendChild(m)}else E.appendChild(K.createTextNode(b));V.parentNode.replaceChild(E,V)}return K.body.innerHTML}function r8({post:_,onClick:$,onHashtagClick:N,onMessageRef:Z,onScrollToMessage:j,agentName:J,agentAvatarUrl:K,userName:Y,userAvatarUrl:O,userAvatarBackground:z,onDelete:V,isThreadReply:L,isThreadPrev:k,isThreadNext:D,isRemoving:E,highlightQuery:b,onFileRef:m}){let[A,W]=u(null),w=y(null),M=_.data,x=M.type==="agent_response",p=Y||"You",i=x?J||f8:p,$_=x?o3(J,K):o3(p,O),Y_=typeof z==="string"?z.trim().toLowerCase():"",s=!x&&$_.image&&(Y_==="clear"||Y_==="transparent"),B_=x&&Boolean($_.image),H_=`background-color: ${s||B_?"transparent":$_.color}`,r=M.content_meta,__=Boolean(r?.truncated),e=Boolean(r?.preview),a=__&&!e,J_=__?{originalLength:Number.isFinite(r?.original_length)?r.original_length:M.content?M.content.length:0,maxLength:Number.isFinite(r?.max_length)?r.max_length:0}:null,G_=l6(M.content,M.link_previews),{content:j_,fileRefs:b_}=e6(G_),{content:V_,messageRefs:W_}=_$(j_),{content:x_,attachments:R_}=$$(V_);G_=x_;let B0=Boolean(G_)&&!a,M_=typeof b==="string"?b.trim():"",A_=Z0(()=>{if(!G_)return"";let T=K2(G_,N);return M_?Z$(T,M_):T},[G_,M_]),N_=(T,Z_)=>{T.stopPropagation(),W(n0(Z_))},[y_,L_]=u(null),D_=(T)=>{L_(T)},X_=(T)=>{T.stopPropagation(),V?.(_)},g_=(T,Z_)=>{let k_=new Set;if(!T||Z_.length===0)return{content:T,usedIds:k_};return{content:T.replace(/attachment:([^\s)"']+)/g,(V0,T_,H0,s_)=>{let a_=T_.replace(/^\/+/,""),y0=Z_.find((Y0)=>Y0.name&&Y0.name.toLowerCase()===a_.toLowerCase()&&!k_.has(Y0.id))||Z_.find((Y0)=>!k_.has(Y0.id));if(!y0)return V0;if(k_.add(y0.id),s_.slice(Math.max(0,H0-2),H0)==="](")return`/media/${y0.id}`;return y0.name||"attachment"}),usedIds:k_}},P_=[],U_=[],K_=[],S_=[],v_=[],r_=[],d_=M.content_blocks||[],L0=M.media_ids||[],F_=0;if(d_.length>0)d_.forEach((T)=>{if(T?.type==="text"&&T.annotations)r_.push(T.annotations);if(T?.type==="resource_link")S_.push(T);else if(T?.type==="resource")v_.push(T);else if(T?.type==="file"){let Z_=L0[F_++];if(Z_)U_.push(Z_),K_.push({id:Z_,name:T?.name||T?.filename||T?.title})}else if(T?.type==="image"||!T?.type){let Z_=L0[F_++];if(Z_){let k_=typeof T?.mime_type==="string"?T.mime_type:void 0;P_.push({id:Z_,annotations:T?.annotations,mimeType:k_}),K_.push({id:Z_,name:T?.name||T?.filename||T?.title})}}});else if(L0.length>0)L0.forEach((T)=>{P_.push({id:T,annotations:null}),K_.push({id:T,name:null})});if(R_.length>0)R_.forEach((T)=>{if(!T?.id)return;let Z_=K_.find((k_)=>String(k_.id)===String(T.id));if(Z_&&!Z_.name)Z_.name=T.label});let{content:F0,usedIds:x0}=g_(G_,K_);G_=F0;let J0=P_.filter(({id:T})=>!x0.has(T)),z0=U_.filter((T)=>!x0.has(T)),l_=R_.length>0?R_.map((T,Z_)=>({id:T.id||`attachment-${Z_+1}`,label:T.label||`attachment-${Z_+1}`})):K_.map((T,Z_)=>({id:T.id,label:T.name||`attachment-${Z_+1}`}));return R(()=>{if(!w.current)return;return C2(w.current),t6(w.current)},[A_]),X`
        <div id=${`post-${_.id}`} class="post ${x?"agent-post":""} ${L?"thread-reply":""} ${k?"thread-prev":""} ${D?"thread-next":""} ${E?"removing":""}" onClick=${$}>
            <div class="post-avatar ${x?"agent-avatar":""} ${$_.image?"has-image":""}" style=${H_}>
                ${$_.image?X`<img src=${$_.image} alt=${i} />`:$_.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${X_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${i}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(T)=>{if(T.preventDefault(),T.stopPropagation(),Z)Z(_.id)}}>${p8(_.timestamp)}</a>
                </div>
                ${a&&J_&&X`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${I2(J_.originalLength)} chars
                            ${J_.maxLength?X` • Display limit: ${I2(J_.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${e&&J_&&X`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${I2(J_.maxLength)} of ${I2(J_.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(b_.length>0||W_.length>0||l_.length>0)&&X`
                    <div class="post-file-refs">
                        ${W_.map((T)=>{let Z_=(k_)=>{if(k_.preventDefault(),k_.stopPropagation(),j)j(T);else{let q0=document.getElementById("post-"+T);if(q0)q0.scrollIntoView({behavior:"smooth",block:"center"}),q0.classList.add("post-highlight"),setTimeout(()=>q0.classList.remove("post-highlight"),2000)}};return X`
                                <a href=${`#msg-${T}`} class="post-msg-pill-link" onClick=${Z_}>
                                    <${e0}
                                        prefix="post"
                                        label=${"msg:"+T}
                                        title=${"Message "+T}
                                        icon="message"
                                        onClick=${Z_}
                                    />
                                </a>
                            `})}
                        ${b_.map((T)=>{let Z_=T.split("/").pop()||T;return X`
                                <${e0}
                                    prefix="post"
                                    label=${Z_}
                                    title=${T}
                                    onClick=${()=>m?.(T)}
                                />
                            `})}
                        ${l_.map((T)=>X`
                            <${g6}
                                key=${T.id}
                                attachment=${T}
                                onPreview=${D_}
                            />
                        `)}
                    </div>
                `}
                ${B0&&X`
                    <div 
                        ref=${w}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:A_}}
                        onClick=${(T)=>{if(T.target.classList.contains("hashtag")){T.preventDefault(),T.stopPropagation();let Z_=T.target.dataset.hashtag;if(Z_)N?.(Z_)}else if(T.target.tagName==="IMG")T.preventDefault(),T.stopPropagation(),W(T.target.src)}}
                    />
                `}
                ${r_.length>0&&X`
                    ${r_.map((T,Z_)=>X`
                        <${Y3} key=${Z_} annotations=${T} />
                    `)}
                `}
                ${J0.length>0&&X`
                    <div class="media-preview">
                        ${J0.map(({id:T,mimeType:Z_})=>{let q0=typeof Z_==="string"&&Z_.toLowerCase().startsWith("image/svg")?n0(T):K8(T);return X`
                                <img 
                                    key=${T} 
                                    src=${q0} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(V0)=>N_(V0,T)}
                                />
                            `})}
                    </div>
                `}
                ${J0.length>0&&X`
                    ${J0.map(({annotations:T},Z_)=>X`
                        ${T&&X`<${Y3} key=${Z_} annotations=${T} />`}
                    `)}
                `}
                ${z0.length>0&&X`
                    <div class="file-attachments">
                        ${z0.map((T)=>X`
                            <${R6} key=${T} mediaId=${T} onPreview=${D_} />
                        `)}
                    </div>
                `}
                ${S_.length>0&&X`
                    <div class="resource-links">
                        ${S_.map((T,Z_)=>X`
                            <div key=${Z_}>
                                <${h6} block=${T} />
                                <${Y3} annotations=${T.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${v_.length>0&&X`
                    <div class="resource-embeds">
                        ${v_.map((T,Z_)=>X`
                            <div key=${Z_}>
                                <${p6} block=${T} />
                                <${Y3} annotations=${T.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${M.link_previews?.length>0&&X`
                    <div class="link-previews">
                        ${M.link_previews.map((T,Z_)=>X`
                            <${n6} key=${Z_} preview=${T} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${A&&X`<${o8} src=${A} onClose=${()=>W(null)} />`}
        ${y_&&X`
            <${l8}
                mediaId=${y_.mediaId}
                info=${y_.info}
                onClose=${()=>L_(null)}
            />
        `}
    `}function d8({posts:_,hasMore:$,onLoadMore:N,onPostClick:Z,onHashtagClick:j,onMessageRef:J,onScrollToMessage:K,onFileRef:Y,emptyMessage:O,timelineRef:z,agents:V,user:L,onDeletePost:k,reverse:D=!0,removingPostIds:E,searchQuery:b}){let[m,A]=u(!1),W=y(null),w=typeof IntersectionObserver<"u",M=S(async()=>{if(!N||!$||m)return;A(!0);try{await N({preserveScroll:!0,preserveMode:"top"})}finally{A(!1)}},[$,m,N]),x=S((r)=>{let{scrollTop:__,scrollHeight:e,clientHeight:a}=r.target,J_=D?e-a-__:__,G_=Math.max(300,a);if(J_<G_)M()},[D,M]);R(()=>{if(!w)return;let r=W.current,__=z?.current;if(!r||!__)return;let e=300,a=new IntersectionObserver((J_)=>{for(let G_ of J_){if(!G_.isIntersecting)continue;M()}},{root:__,rootMargin:`${e}px 0px ${e}px 0px`,threshold:0});return a.observe(r),()=>a.disconnect()},[w,$,N,z,M]);let p=y(M);if(p.current=M,R(()=>{if(w)return;if(!z?.current)return;let{scrollTop:r,scrollHeight:__,clientHeight:e}=z.current,a=D?__-e-r:r,J_=Math.max(300,e);if(a<J_)p.current?.()},[w,_,$,D,z]),R(()=>{if(!z?.current)return;if(!$||m)return;let{scrollTop:r,scrollHeight:__,clientHeight:e}=z.current,a=D?__-e-r:r,J_=Math.max(300,e);if(__<=e+1||a<J_)p.current?.()},[_,$,m,D,z]),!_)return X`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return X`
            <div class="timeline" ref=${z}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${O||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let i=_.slice().sort((r,__)=>r.id-__.id),$_=(r)=>{let __=r?.data?.thread_id;if(__===null||__===void 0||__==="")return null;let e=Number(__);return Number.isFinite(e)?e:null},Y_=new Map;for(let r=0;r<i.length;r+=1){let __=i[r],e=Number(__?.id),a=$_(__);if(a!==null){let J_=Y_.get(a)||{anchorIndex:-1,replyIndexes:[]};J_.replyIndexes.push(r),Y_.set(a,J_)}else if(Number.isFinite(e)){let J_=Y_.get(e)||{anchorIndex:-1,replyIndexes:[]};J_.anchorIndex=r,Y_.set(e,J_)}}let s=new Map;for(let[r,__]of Y_.entries()){let e=new Set;if(__.anchorIndex>=0)e.add(__.anchorIndex);for(let a of __.replyIndexes)e.add(a);s.set(r,Array.from(e).sort((a,J_)=>a-J_))}let B_=i.map((r,__)=>{let e=$_(r);if(e===null)return{hasThreadPrev:!1,hasThreadNext:!1};let a=s.get(e);if(!a||a.length===0)return{hasThreadPrev:!1,hasThreadNext:!1};let J_=a.indexOf(__);if(J_<0)return{hasThreadPrev:!1,hasThreadNext:!1};return{hasThreadPrev:J_>0,hasThreadNext:J_<a.length-1}}),H_=X`<div class="timeline-sentinel" ref=${W}></div>`;return X`
        <div class="timeline ${D?"reverse":"normal"}" ref=${z} onScroll=${x}>
            <div class="timeline-content">
                ${D?H_:null}
                ${i.map((r,__)=>{let e=Boolean(r.data?.thread_id&&r.data.thread_id!==r.id),a=E?.has?.(r.id),J_=B_[__]||{};return X`
                    <${r8}
                        key=${r.id}
                        post=${r}
                        isThreadReply=${e}
                        isThreadPrev=${J_.hasThreadPrev}
                        isThreadNext=${J_.hasThreadNext}
                        isRemoving=${a}
                        highlightQuery=${b}
                        agentName=${u8(r.data?.agent_id,V||{})}
                        agentAvatarUrl=${c8(r.data?.agent_id,V||{})}
                        userName=${L?.name||L?.user_name}
                        userAvatarUrl=${L?.avatar_url||L?.avatarUrl||L?.avatar}
                        userAvatarBackground=${L?.avatar_background||L?.avatarBackground}
                        onClick=${()=>Z?.(r)}
                        onHashtagClick=${j}
                        onMessageRef=${J}
                        onScrollToMessage=${K}
                        onFileRef=${Y}
                        onDelete=${k}
                    />
                `})}
                ${D?null:H_}
            </div>
        </div>
    `}class s8{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,N=-1/0;for(let Z of this.extensions.values()){if(Z.placement!=="tabs")continue;if(!Z.canHandle)continue;try{let j=Z.canHandle(_);if(j===!1||j===0)continue;let J=j===!0?0:typeof j==="number"?j:0;if(J>N)N=J,$=Z}catch(j){console.warn(`[PaneRegistry] canHandle() error for "${Z.id}":`,j)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var n_=new s8;var O3=null,r3=null;function a8(){if(r3)return Promise.resolve(r3);if(!O3)O3=import("/static/dist/editor.bundle.js").then((_)=>{return r3=_,_}).catch((_)=>{throw O3=null,_});return O3}class t8{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await a8();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){this.queuedViewStateCb=_,this.real?.onViewStateChange?.(_)}restoreViewState(_){this.queuedViewState=_,this.real?.restoreViewState?.(_)}getPath(){return this.real?.getPath?.()??this.context.path??""}setPath(_){this.real?.setPath?.(_)}}var d3={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;if(_.mode!=="edit")return!1;return 1},mount(_,$){return new t8(_,$)}};function s3(){a8().catch(()=>{})}var J$={yellow:"#9a6700",magenta:"#8250df",cyan:"#1b7c83",brightBlack:"#57606a",brightRed:"#cf222e",brightGreen:"#1a7f37",brightYellow:"#bf8700",brightBlue:"#0550ae",brightMagenta:"#6f42c1",brightCyan:"#0a7b83"},j$={yellow:"#d29922",magenta:"#bc8cff",cyan:"#39c5cf",brightBlack:"#8b949e",brightRed:"#ff7b72",brightGreen:"#7ee787",brightYellow:"#e3b341",brightBlue:"#79c0ff",brightMagenta:"#d2a8ff",brightCyan:"#56d4dd"},G3=null,a3=null;function K$(_){if(!_)return!1;return _.startsWith("data:application/wasm")||/(^|\/)ghostty-vt\.wasm(?:[?#].*)?$/.test(_)}async function z$(_){let $=globalThis.fetch?.bind(globalThis);if(!$)return await _();let N=new URL("/static/js/vendor/ghostty-vt.wasm",window.location.origin).href,Z=(j,J)=>{let K=j instanceof Request?j.url:j instanceof URL?j.href:String(j);if(!K$(K))return $(j,J);if(j instanceof Request)return $(new Request(N,j));return $(N,J)};globalThis.fetch=Z;try{return await _()}finally{globalThis.fetch=$}}async function Y$(){let $=await import(new URL("/static/js/vendor/ghostty-web.js",window.location.origin).href);if(!G3)G3=z$(()=>Promise.resolve($.init?.())).catch((N)=>{throw G3=null,N});return await G3,$}async function O$(){if(typeof document>"u"||!("fonts"in document)||!document.fonts)return;if(!a3)a3=Promise.allSettled([document.fonts.load('400 13px "FiraCode Nerd Font Mono"'),document.fonts.load('700 13px "FiraCode Nerd Font Mono"'),document.fonts.ready]).then(()=>{return}).catch(()=>{return});await a3}async function G$(){let _=await fetch("/terminal/session",{method:"GET",credentials:"same-origin"}),$=await _.json().catch(()=>({}));if(!_.ok)throw Error($?.error||`HTTP ${_.status}`);return $}function B$(_){return`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}${_}`}function L$(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,N=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(N==="dark")return!0;if(N==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function _2(_,$=""){if(typeof document>"u")return $;return getComputedStyle(document.documentElement).getPropertyValue(_)?.trim()||$}function q$(_,$){if(!_||!_.startsWith("#"))return _;let N=_.slice(1);if(N.length===3)return`#${N[0]}${N[0]}${N[1]}${N[1]}${N[2]}${N[2]}${$}`;if(N.length===6)return`#${N}${$}`;return _}function e8(){let _=L$(),$=_?j$:J$,N=_2("--bg-primary",_?"#000000":"#ffffff"),Z=_2("--text-primary",_?"#e7e9ea":"#0f1419"),j=_2("--text-secondary",_?"#71767b":"#536471"),J=_2("--accent-color","#1d9bf0"),K=_2("--danger-color",_?"#ff7b72":"#cf222e"),Y=_2("--success-color",_?"#7ee787":"#1a7f37"),O=_2("--bg-hover",_?"#1d1f23":"#e8ebed"),z=_2("--border-color",_?"#2f3336":"#eff3f4"),V=_2("--accent-soft-strong",q$(J,_?"47":"33"));return{background:N,foreground:Z,cursor:J,cursorAccent:N,selectionBackground:V,selectionForeground:Z,black:O,red:K,green:Y,yellow:$.yellow,blue:J,magenta:$.magenta,cyan:$.cyan,white:Z,brightBlack:$.brightBlack,brightRed:$.brightRed,brightGreen:$.brightGreen,brightYellow:$.brightYellow,brightBlue:$.brightBlue,brightMagenta:$.brightMagenta,brightCyan:$.brightCyan,brightWhite:z}}class _1{container;disposed=!1;termEl;bodyEl;statusEl;terminal=null;fitAddon=null;socket=null;themeObserver=null;themeChangeListener=null;mediaQuery=null;mediaQueryListener=null;resizeObserver=null;dockResizeListener=null;windowResizeListener=null;resizeFrame=0;lastAppliedThemeSignature=null;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0"),this.statusEl=document.createElement("span"),this.statusEl.className="terminal-pane-status",this.statusEl.textContent="Loading terminal…",this.bodyEl=document.createElement("div"),this.bodyEl.className="terminal-pane-body",this.bodyEl.innerHTML='<div class="terminal-placeholder">Bootstrapping ghostty-web…</div>',this.termEl.append(this.bodyEl),_.appendChild(this.termEl),this.bootstrapGhostty()}setStatus(_){this.statusEl.textContent=_,this.termEl.dataset.connectionStatus=_,this.termEl.setAttribute("aria-label",`Terminal ${_}`)}scheduleResize(){if(this.disposed)return;if(this.resizeFrame)cancelAnimationFrame(this.resizeFrame);this.resizeFrame=requestAnimationFrame(()=>{this.resizeFrame=0,this.resize()})}async bootstrapGhostty(){try{let _=await Y$();if(await O$(),this.disposed)return;this.bodyEl.innerHTML="";let $=document.createElement("div");$.className="terminal-live-host",this.bodyEl.appendChild($);let N=new _.Terminal({cols:120,rows:30,cursorBlink:!0,fontFamily:'FiraCode Nerd Font Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',fontSize:13,theme:e8()}),Z=null;if(typeof _.FitAddon==="function")Z=new _.FitAddon,N.loadAddon?.(Z);await N.open($),N.loadFonts?.(),Z?.observeResize?.(),this.terminal=N,this.fitAddon=Z,this.installThemeSync(),this.installResizeSync(),this.scheduleResize(),await this.connectBackend()}catch(_){if(console.error("[terminal-pane] Failed to bootstrap ghostty-web:",_),this.disposed)return;this.bodyEl.innerHTML='<div class="terminal-placeholder">Terminal failed to load. Check vendored assets and backend wiring.</div>',this.setStatus("Load failed")}}applyTheme(){if(!this.terminal)return;let _=e8(),$=JSON.stringify(_),N=this.lastAppliedThemeSignature!==null&&this.lastAppliedThemeSignature!==$;try{this.termEl.style.backgroundColor=_.background,this.bodyEl.style.backgroundColor=_.background;let Z=this.bodyEl.querySelector(".terminal-live-host");if(Z instanceof HTMLElement)Z.style.backgroundColor=_.background,Z.style.color=_.foreground;let j=this.bodyEl.querySelector("canvas");if(j instanceof HTMLElement)j.style.backgroundColor=_.background,j.style.color=_.foreground}catch{}try{if(this.terminal.options)this.terminal.options.theme=_}catch{}try{if(N&&this.terminal.reset)this.terminal.reset()}catch{}try{this.terminal.renderer?.setTheme?.(_),this.terminal.renderer?.clear?.()}catch{}try{this.terminal.loadFonts?.()}catch{}try{this.terminal.renderer?.remeasureFont?.()}catch{}try{if(this.terminal.wasmTerm&&this.terminal.renderer?.render)this.terminal.renderer.render(this.terminal.wasmTerm,!0,this.terminal.viewportY||0,this.terminal),this.terminal.renderer.render(this.terminal.wasmTerm,!1,this.terminal.viewportY||0,this.terminal)}catch{}try{this.resize()}catch{}try{if(N&&this.socket?.readyState===WebSocket.OPEN)this.socket.send(JSON.stringify({type:"input",data:"\f"}))}catch{}try{this.terminal.refresh?.()}catch{}this.lastAppliedThemeSignature=$}installThemeSync(){if(typeof window>"u"||typeof document>"u")return;let _=()=>requestAnimationFrame(()=>this.applyTheme());_();let $=()=>_();window.addEventListener("piclaw-theme-change",$),this.themeChangeListener=$;let N=window.matchMedia?.("(prefers-color-scheme: dark)"),Z=()=>_();if(N?.addEventListener)N.addEventListener("change",Z);else if(N?.addListener)N.addListener(Z);this.mediaQuery=N,this.mediaQueryListener=Z;let j=typeof MutationObserver<"u"?new MutationObserver(()=>_()):null;if(j?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","style"]}),document.body)j?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});this.themeObserver=j}installResizeSync(){if(typeof window>"u")return;let _=()=>this.scheduleResize(),$=()=>this.scheduleResize();if(window.addEventListener("dock-resize",_),window.addEventListener("resize",$),this.dockResizeListener=_,this.windowResizeListener=$,typeof ResizeObserver<"u"){let N=new ResizeObserver(()=>this.scheduleResize());N.observe(this.container),N.observe(this.bodyEl),this.resizeObserver=N}}async connectBackend(){let _=this.terminal;if(!_)return;try{let $=await G$();if(this.disposed)return;if(!$?.enabled){_.write?.(`Terminal backend unavailable: ${$?.error||"disabled"}\r
`),this.setStatus("Unavailable");return}let N=new WebSocket(B$($.ws_path||"/terminal/ws"));this.socket=N,this.setStatus("Connecting…"),_.onData?.((Z)=>{if(N.readyState===WebSocket.OPEN)N.send(JSON.stringify({type:"input",data:Z}))}),_.onResize?.(({cols:Z,rows:j})=>{if(N.readyState===WebSocket.OPEN)N.send(JSON.stringify({type:"resize",cols:Z,rows:j}))}),N.addEventListener("open",()=>{if(this.disposed)return;this.setStatus("Connected"),this.scheduleResize()}),N.addEventListener("message",(Z)=>{if(this.disposed)return;let j=null;try{j=JSON.parse(String(Z.data))}catch{j={type:"output",data:String(Z.data)}}if(j?.type==="output"&&typeof j.data==="string"){_.write?.(j.data);return}if(j?.type==="exit")_.write?.(`\r
[terminal exited]\r
`),this.setStatus("Exited")}),N.addEventListener("close",()=>{if(this.disposed)return;this.setStatus("Disconnected")}),N.addEventListener("error",()=>{if(this.disposed)return;this.setStatus("Connection error")})}catch($){_.write?.(`Terminal backend unavailable: ${$ instanceof Error?$.message:String($)}\r
`),this.setStatus("Unavailable")}}sendResize(){if(!this.socket||this.socket.readyState!==WebSocket.OPEN||!this.fitAddon?.proposeDimensions)return;let _=this.fitAddon.proposeDimensions();if(!_)return;this.socket.send(JSON.stringify({type:"resize",cols:_.cols,rows:_.rows}))}getContent(){return}isDirty(){return!1}focus(){if(this.terminal?.focus){this.terminal.focus();return}this.termEl?.focus()}resize(){try{this.terminal?.renderer?.remeasureFont?.()}catch{}try{this.fitAddon?.fit?.()}catch{}try{this.terminal?.refresh?.()}catch{}this.sendResize()}dispose(){if(this.disposed)return;this.disposed=!0;try{if(this.resizeFrame)cancelAnimationFrame(this.resizeFrame),this.resizeFrame=0}catch{}try{if(this.themeChangeListener)window.removeEventListener("piclaw-theme-change",this.themeChangeListener)}catch{}try{if(this.mediaQuery&&this.mediaQueryListener){if(this.mediaQuery.removeEventListener)this.mediaQuery.removeEventListener("change",this.mediaQueryListener);else if(this.mediaQuery.removeListener)this.mediaQuery.removeListener(this.mediaQueryListener)}}catch{}try{if(this.dockResizeListener)window.removeEventListener("dock-resize",this.dockResizeListener);if(this.windowResizeListener)window.removeEventListener("resize",this.windowResizeListener)}catch{}try{this.themeObserver?.disconnect?.()}catch{}try{this.resizeObserver?.disconnect?.()}catch{}try{this.socket?.close?.()}catch{}try{this.fitAddon?.dispose?.()}catch{}try{this.terminal?.dispose?.()}catch{}this.termEl?.remove()}}var t3={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new _1(_,$)}};function z2(_){return String(_||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function V$(_,$){let N=String(_||"").trim();if(!N)return N;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(N)||N.startsWith("#")||N.startsWith("data:")||N.startsWith("blob:"))return N;let Z=N.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),j=Z?.[1]||N,J=Z?.[2]||"",K=Z?.[3]||"",Y=String($||"").split("/").slice(0,-1).join("/"),z=j.startsWith("/")?j:`${Y?`${Y}/`:""}${j}`,V=[];for(let k of z.split("/")){if(!k||k===".")continue;if(k===".."){if(V.length>0)V.pop();continue}V.push(k)}let L=V.join("/");return`${R3(L)}${J}${K}`}function u2(_){return _?.preview||null}function X$(_){let $=String(_||""),N=Math.max($.lastIndexOf("/"),$.lastIndexOf("\\")),Z=N>=0?$.slice(N+1):$,j=Z.lastIndexOf(".");if(j<=0||j===Z.length-1)return"none";return Z.slice(j+1)}function W$(_){if(!_)return"unknown";if(_.kind==="image")return"image";if(_.kind==="text")return _.content_type==="text/markdown"?"markdown":"text";if(_.kind==="binary")return"binary";return String(_.kind||"unknown")}function Q$(_,$){let N=$?.path||_?.path||"",Z=[];if($?.content_type)Z.push(`<span><strong>type:</strong> ${z2($.content_type)}</span>`);if(typeof $?.size==="number")Z.push(`<span><strong>size:</strong> ${z2(S0($.size))}</span>`);if($?.mtime)Z.push(`<span><strong>modified:</strong> ${z2(b2($.mtime))}</span>`);if(Z.push(`<span><strong>kind:</strong> ${z2(W$($))}</span>`),Z.push(`<span><strong>extension:</strong> ${z2(X$(N))}</span>`),N)Z.push(`<span><strong>path:</strong> ${z2(N)}</span>`);if($?.truncated)Z.push("<span><strong>content:</strong> truncated</span>");return`<div class="workspace-preview-meta workspace-preview-meta-inline">${Z.join("")}</div>`}function U$(_){let $=u2(_);if(!$)return'<div class="workspace-preview-text">No preview available.</div>';let N=Q$(_,$);if($.kind==="image"){let Z=$.url||($.path?R3($.path):"");return`${N}
            <div class="workspace-preview-image">
                <img src="${z2(Z)}" alt="preview" />
            </div>
        `}if($.kind==="text"){if($.content_type==="text/markdown"){let Z=K2($.text||"",null,{rewriteImageSrc:(j)=>V$(j,$.path||_?.path)});return`${N}<div class="workspace-preview-text">${Z}</div>`}return`${N}<pre class="workspace-preview-text"><code>${z2($.text||"")}</code></pre>`}if($.kind==="binary")return`${N}<div class="workspace-preview-text">Binary file — download to view.</div>`;return`${N}<div class="workspace-preview-text">No preview available.</div>`}class e3{constructor(_,$){this.container=_,this.context=$,this.disposed=!1,this.host=document.createElement("div"),this.host.className="workspace-preview-render-host",this.host.tabIndex=0,this.container.appendChild(this.host),this.render()}render(){if(this.disposed)return;this.host.innerHTML=U$(this.context)}getContent(){let _=u2(this.context);return typeof _?.text==="string"?_.text:void 0}isDirty(){return!1}setContent(_,$){let N=u2(this.context);if(N&&N.kind==="text"){if(N.text=_,$!==void 0)N.mtime=$}if(this.context.content=_,$!==void 0)this.context.mtime=$;this.render()}focus(){this.host?.focus?.()}dispose(){if(this.disposed)return;this.disposed=!0,this.host?.remove(),this.container.innerHTML=""}}var _4={id:"workspace-markdown-preview",label:"Workspace Markdown Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){let $=u2(_);if(_?.mode!=="view")return!1;if(!$||$.kind!=="text")return!1;return $.content_type==="text/markdown"?20:!1},mount(_,$){return new e3(_,$)}},$4={id:"workspace-preview-default",label:"Workspace Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){if(_?.mode!=="view")return!1;return u2(_)||_?.path?1:!1},mount(_,$){return new e3(_,$)}};class $1{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let N of this.listeners)try{N(_,$)}catch{}}open(_,$){let N=this.tabs.get(_);if(!N)N={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,N);return this.activate(_),N}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((N)=>N!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,N]of this.tabs)if($!==_&&!N.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((Z)=>Z!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((N)=>N!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let N=this.tabs.get(_);if(!N||N.dirty===$)return;N.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let N=this.tabs.get(_);if(N)N.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,N){let Z=this.tabs.get(_);if(!Z)return;if(this.tabs.delete(_),Z.id=$,Z.path=$,Z.label=N||$.split("/").pop()||$,this.tabs.set($,Z),this.mruOrder=this.mruOrder.map((j)=>j===_?$:j),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),N=_[($+1)%_.length];this.activate(N.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),N=_[($-1+_.length)%_.length];this.activate(N.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var E_=new $1;var B3="workspaceExplorerScale",F$=["compact","default","comfortable"],H$=new Set(F$),y$={compact:{indentPx:14},default:{indentPx:16},comfortable:{indentPx:18}};function N1(_,$="default"){if(typeof _!=="string")return $;let N=_.trim().toLowerCase();return H$.has(N)?N:$}function N4(){if(typeof window>"u")return{width:0,isTouch:!1};let _=Number(window.innerWidth)||0,$=Boolean(window.matchMedia?.("(pointer: coarse)")?.matches),N=Boolean(window.matchMedia?.("(hover: none)")?.matches),Z=Number(globalThis.navigator?.maxTouchPoints||0)>0;return{width:_,isTouch:$||Z&&N}}function D$(_={}){let $=Math.max(0,Number(_.width)||0);if(Boolean(_.isTouch))return"comfortable";if($>0&&$<1180)return"comfortable";return"default"}function k$(_,$={}){if(Boolean($.isTouch)&&_==="compact")return"default";return _}function Z4(_={}){let $=D$(_),N=_.stored?N1(_.stored,$):$;return k$(N,_)}function Z1(_){return y$[N1(_)]}var C$=60000,z1=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function Y1(_,$,N,Z=0,j=[]){if(!N&&z1(_))return j;if(!_)return j;if(j.push({node:_,depth:Z}),_.type==="dir"&&_.children&&$.has(_.path))for(let J of _.children)Y1(J,$,N,Z+1,j);return j}function J1(_,$,N){if(!_)return"";let Z=[],j=(J)=>{if(!N&&z1(J))return;if(Z.push(J.type==="dir"?`d:${J.path}`:`f:${J.path}`),J.children&&$?.has(J.path))for(let K of J.children)j(K)};return j(_),Z.join("|")}function z4(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let N=Array.isArray(_.children)?_.children:null,Z=Array.isArray($.children)?$.children:null;if(!Z)return _;let j=N?new Map(N.map((Y)=>[Y?.path,Y])):new Map,J=!N||N.length!==Z.length,K=Z.map((Y)=>{let O=z4(j.get(Y.path),Y);if(O!==j.get(Y.path))J=!0;return O});return J?{...$,children:K}:_}function j4(_,$,N){if(!_)return _;if(_.path===$)return z4(_,N);if(!Array.isArray(_.children))return _;let Z=!1,j=_.children.map((J)=>{let K=j4(J,$,N);if(K!==J)Z=!0;return K});return Z?{..._,children:j}:_}var O1=4,J4=14,b$=8,E$=16;function G1(_){if(!_)return 0;if(_.type==="file"){let Z=Math.max(0,Number(_.size)||0);return _.__bytes=Z,Z}let $=Array.isArray(_.children)?_.children:[],N=0;for(let Z of $)N+=G1(Z);return _.__bytes=N,N}function B1(_,$=0){let N=Math.max(0,Number(_?.__bytes??_?.size??0)),Z={name:_?.name||_?.path||".",path:_?.path||".",size:N,children:[]};if(!_||_.type!=="dir"||$>=O1)return Z;let j=Array.isArray(_.children)?_.children:[],J=[];for(let Y of j){let O=Math.max(0,Number(Y?.__bytes??Y?.size??0));if(O<=0)continue;if(Y.type==="dir")J.push({kind:"dir",node:Y,size:O});else J.push({kind:"file",name:Y.name,path:Y.path,size:O})}J.sort((Y,O)=>O.size-Y.size);let K=J;if(J.length>J4){let Y=J.slice(0,J4-1),O=J.slice(J4-1),z=O.reduce((V,L)=>V+L.size,0);Y.push({kind:"other",name:`+${O.length} more`,path:`${Z.path}/[other]`,size:z}),K=Y}return Z.children=K.map((Y)=>{if(Y.kind==="dir")return B1(Y.node,$+1);return{name:Y.name,path:Y.path,size:Y.size,children:[]}}),Z}function j1(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,N=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(N==="dark")return!0;if(N==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function L1(_,$,N){let Z=((_+Math.PI/2)*180/Math.PI+360)%360,j=N?Math.max(30,70-$*10):Math.max(34,66-$*8),J=N?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${Z.toFixed(1)} ${j}% ${J}%)`}function L3(_,$,N,Z){return{x:_+N*Math.cos(Z),y:$+N*Math.sin(Z)}}function Y4(_,$,N,Z,j,J){let K=Math.PI*2-0.0001,Y=J-j>K?j+K:J,O=L3(_,$,Z,j),z=L3(_,$,Z,Y),V=L3(_,$,N,Y),L=L3(_,$,N,j),k=Y-j>Math.PI?1:0;return[`M ${O.x.toFixed(3)} ${O.y.toFixed(3)}`,`A ${Z} ${Z} 0 ${k} 1 ${z.x.toFixed(3)} ${z.y.toFixed(3)}`,`L ${V.x.toFixed(3)} ${V.y.toFixed(3)}`,`A ${N} ${N} 0 ${k} 0 ${L.x.toFixed(3)} ${L.y.toFixed(3)}`,"Z"].join(" ")}var q1={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function V1(_,$,N){let Z=[],j=[],J=Math.max(0,Number($)||0),K=(Y,O,z,V)=>{let L=Array.isArray(Y?.children)?Y.children:[];if(!L.length)return;let k=Math.max(0,Number(Y.size)||0);if(k<=0)return;let D=z-O,E=O;L.forEach((b,m)=>{let A=Math.max(0,Number(b.size)||0);if(A<=0)return;let W=A/k,w=E,M=m===L.length-1?z:E+D*W;if(E=M,M-w<0.003)return;let x=q1[V];if(x){let p=L1(w,V,N);if(Z.push({key:b.path,path:b.path,label:b.name,size:A,color:p,depth:V,startAngle:w,endAngle:M,innerRadius:x[0],outerRadius:x[1],d:Y4(120,120,x[0],x[1],w,M)}),V===1)j.push({key:b.path,name:b.name,size:A,pct:J>0?A/J*100:0,color:p})}if(V<O1)K(b,w,M,V+1)})};return K(_,-Math.PI/2,Math.PI*3/2,1),{segments:Z,legend:j}}function K4(_,$){if(!_||!$)return null;if(_.path===$)return _;let N=Array.isArray(_.children)?_.children:[];for(let Z of N){let j=K4(Z,$);if(j)return j}return null}function X1(_,$,N,Z){if(!N||N<=0)return{segments:[],legend:[]};let j=q1[1];if(!j)return{segments:[],legend:[]};let J=-Math.PI/2,K=Math.PI*3/2,Y=L1(J,1,Z),z=`${$||"."}/[files]`;return{segments:[{key:z,path:z,label:_,size:N,color:Y,depth:1,startAngle:J,endAngle:K,innerRadius:j[0],outerRadius:j[1],d:Y4(120,120,j[0],j[1],J,K)}],legend:[{key:z,name:_,size:N,pct:100,color:Y}]}}function K1(_,$=!1,N=!1){if(!_)return null;let Z=G1(_),j=B1(_,0),J=j.size||Z,{segments:K,legend:Y}=V1(j,J,N);if(!K.length&&J>0){let O=X1("[files]",j.path,J,N);K=O.segments,Y=O.legend}return{root:j,totalSize:J,segments:K,legend:Y,truncated:$,isDarkTheme:N}}function A$({payload:_}){if(!_)return null;let[$,N]=u(null),[Z,j]=u(_?.root?.path||"."),[J,K]=u(()=>[_?.root?.path||"."]),[Y,O]=u(!1);R(()=>{let s=_?.root?.path||".";j(s),K([s]),N(null)},[_?.root?.path,_?.totalSize]),R(()=>{if(!Z)return;O(!0);let s=setTimeout(()=>O(!1),180);return()=>clearTimeout(s)},[Z]);let z=Z0(()=>{return K4(_.root,Z)||_.root},[_?.root,Z]),V=z?.size||_.totalSize||0,{segments:L,legend:k}=Z0(()=>{let s=V1(z,V,_.isDarkTheme);if(s.segments.length>0)return s;if(V<=0)return s;let B_=z?.children?.length?"Total":"[files]";return X1(B_,z?.path||_?.root?.path||".",V,_.isDarkTheme)},[z,V,_.isDarkTheme,_?.root?.path]),[D,E]=u(L),b=y(new Map),m=y(0);R(()=>{let s=b.current,B_=new Map(L.map((e)=>[e.key,e])),H_=performance.now(),r=220,__=(e)=>{let a=Math.min(1,(e-H_)/220),J_=a*(2-a),G_=L.map((j_)=>{let V_=s.get(j_.key)||{startAngle:j_.startAngle,endAngle:j_.startAngle,innerRadius:j_.innerRadius,outerRadius:j_.innerRadius},W_=(A_,N_)=>A_+(N_-A_)*J_,x_=W_(V_.startAngle,j_.startAngle),R_=W_(V_.endAngle,j_.endAngle),B0=W_(V_.innerRadius,j_.innerRadius),M_=W_(V_.outerRadius,j_.outerRadius);return{...j_,d:Y4(120,120,B0,M_,x_,R_)}});if(E(G_),a<1)m.current=requestAnimationFrame(__)};if(m.current)cancelAnimationFrame(m.current);return m.current=requestAnimationFrame(__),b.current=B_,()=>{if(m.current)cancelAnimationFrame(m.current)}},[L]);let A=D.length?D:L,W=V>0?S0(V):"0 B",w=z?.name||"",x=(w&&w!=="."?w:"Total")||"Total",p=W,i=J.length>1,$_=(s)=>{if(!s?.path)return;let B_=K4(_.root,s.path);if(!B_||!Array.isArray(B_.children)||B_.children.length===0)return;K((H_)=>[...H_,B_.path]),j(B_.path),N(null)},Y_=()=>{if(!i)return;K((s)=>{let B_=s.slice(0,-1);return j(B_[B_.length-1]||_?.root?.path||"."),B_}),N(null)};return X`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${Y?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${z?.path||_?.root?.path||"."}`}
                data-segments=${A.length}
                data-base-size=${V}>
                ${A.map((s)=>X`
                    <path
                        key=${s.key}
                        d=${s.d}
                        fill=${s.color}
                        stroke="var(--bg-primary)"
                        stroke-width="1"
                        class=${`workspace-folder-starburst-segment${$?.key===s.key?" is-hovered":""}`}
                        onMouseEnter=${()=>N(s)}
                        onMouseLeave=${()=>N(null)}
                        onTouchStart=${()=>N(s)}
                        onTouchEnd=${()=>N(null)}
                        onClick=${()=>$_(s)}
                    >
                        <title>${s.label} — ${S0(s.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${i?" is-drill":""}`}
                    onClick=${Y_}
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
                    <text x="120" y="114" text-anchor="middle" class="workspace-folder-starburst-total-label">${x}</text>
                    <text x="120" y="130" text-anchor="middle" class="workspace-folder-starburst-total-value">${p}</text>
                </g>
            </svg>
            ${k.length>0&&X`
                <div class="workspace-folder-starburst-legend">
                    ${k.slice(0,8).map((s)=>X`
                        <div key=${s.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${s.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${s.name}>${s.name}</span>
                            <span class="workspace-folder-starburst-size">${S0(s.size)}</span>
                            <span class="workspace-folder-starburst-pct">${s.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&X`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function w$({mediaId:_}){let[$,N]=u(null);if(R(()=>{if(!_)return;x2(_).then(N).catch(()=>{})},[_]),!$)return null;let Z=$.filename||"file",j=$.metadata?.size?S0($.metadata.size):"";return X`
        <a href=${n0(_)} download=${Z} class="file-attachment"
            onClick=${(J)=>J.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${Z}</span>
                ${j&&X`<span class="file-size">${j}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function W1({onFileSelect:_,visible:$=!0,active:N=void 0,onOpenEditor:Z}){let[j,J]=u(null),[K,Y]=u(new Set(["."])),[O,z]=u(null),[V,L]=u(null),[k,D]=u(""),[E,b]=u(null),[m,A]=u(null),[W,w]=u(!0),[M,x]=u(!1),[p,i]=u(null),[$_,Y_]=u(()=>H2("workspaceShowHidden",!1)),[s,B_]=u(!1),[H_,r]=u(null),[__,e]=u(null),[a,J_]=u(null),[G_,j_]=u(!1),[b_,V_]=u(null),[W_,x_]=u(()=>j1()),[R_,B0]=u(()=>Z4({stored:l0(B3),...N4()})),M_=y(K),A_=y(""),N_=y(null),y_=y(0),L_=y(new Set),D_=y(null),X_=y(new Map),g_=y(_),P_=y(Z),U_=y(null),K_=y(null),S_=y(null),v_=y(null),r_=y(null),d_=y(null),L0=y("."),F_=y(null),F0=y({path:null,dragging:!1,startX:0,startY:0}),x0=y({path:null,dragging:!1,startX:0,startY:0}),J0=y({path:null,timer:0}),z0=y(!1),l_=y(0),T=y(new Map),Z_=y(null),k_=y(null),q0=y(null),V0=y(null),T_=y($_),H0=y($),s_=y(N??$),a_=y(0),t_=y(a),y0=y(s),$2=y(H_),Y0=y(null),V2=y({x:0,y:0}),T0=y(0),I0=y(null),O0=y(O),o0=y(V),f0=y(null),m_=y(null),Y2=y(E);g_.current=_,P_.current=Z,R(()=>{M_.current=K},[K]),R(()=>{T_.current=$_},[$_]),R(()=>{H0.current=$},[$]),R(()=>{s_.current=N??$},[N,$]),R(()=>{t_.current=a},[a]),R(()=>{if(typeof window>"u")return;let G=()=>{B0(Z4({stored:l0(B3),...N4()}))};G();let Q=()=>G(),H=()=>G(),F=(g)=>{if(!g||g.key===null||g.key===B3)G()};window.addEventListener("resize",Q),window.addEventListener("focus",H),window.addEventListener("storage",F);let v=window.matchMedia?.("(pointer: coarse)"),n=window.matchMedia?.("(hover: none)"),l=(g,z_)=>{if(!g)return;if(g.addEventListener)g.addEventListener("change",z_);else if(g.addListener)g.addListener(z_)},o=(g,z_)=>{if(!g)return;if(g.removeEventListener)g.removeEventListener("change",z_);else if(g.removeListener)g.removeListener(z_)};return l(v,Q),l(n,Q),()=>{window.removeEventListener("resize",Q),window.removeEventListener("focus",H),window.removeEventListener("storage",F),o(v,Q),o(n,Q)}},[]),R(()=>{let G=(Q)=>{let H=Q?.detail?.path;if(!H)return;let F=H.split("/"),v=[];for(let n=1;n<F.length;n++)v.push(F.slice(0,n).join("/"));if(v.length)Y((n)=>{let l=new Set(n);l.add(".");for(let o of v)l.add(o);return l});z(H),requestAnimationFrame(()=>{let n=document.querySelector(`[data-path="${CSS.escape(H)}"]`);if(n)n.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",G),()=>window.removeEventListener("workspace-reveal-path",G)},[]),R(()=>{y0.current=s},[s]),R(()=>{$2.current=H_},[H_]),R(()=>{O0.current=O},[O]),R(()=>{o0.current=V},[V]),R(()=>{Y2.current=E},[E]),R(()=>{if(typeof window>"u"||typeof document>"u")return;let G=()=>x_(j1());G();let Q=window.matchMedia?.("(prefers-color-scheme: dark)"),H=()=>G();if(Q?.addEventListener)Q.addEventListener("change",H);else if(Q?.addListener)Q.addListener(H);let F=typeof MutationObserver<"u"?new MutationObserver(()=>G()):null;if(F?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)F?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(Q?.removeEventListener)Q.removeEventListener("change",H);else if(Q?.removeListener)Q.removeListener(H);F?.disconnect()}},[]),R(()=>{if(!V)return;let G=r_.current;if(!G)return;let Q=requestAnimationFrame(()=>{try{G.focus(),G.select()}catch{}});return()=>cancelAnimationFrame(Q)},[V]);let v0=async(G)=>{x(!0),b(null),A(null);try{let Q=await O8(G,20000);b(Q)}catch(Q){b({error:Q.message||"Failed to load preview"})}finally{x(!1)}};U_.current=v0;let X0=async()=>{if(!H0.current)return;try{let G=await e2("",1,T_.current),Q=J1(G.root,M_.current,T_.current);if(Q===A_.current){w(!1);return}if(A_.current=Q,N_.current=G.root,!y_.current)y_.current=requestAnimationFrame(()=>{y_.current=0,J((H)=>z4(H,N_.current)),w(!1)})}catch(G){i(G.message||"Failed to load workspace"),w(!1)}},m0=async(G)=>{if(!G)return;if(L_.current.has(G))return;L_.current.add(G);try{let Q=await e2(G,1,T_.current);J((H)=>j4(H,G,Q.root))}catch(Q){i(Q.message||"Failed to load workspace")}finally{L_.current.delete(G)}};K_.current=m0;let e_=S(()=>{let G=O;if(!G)return".";let Q=X_.current?.get(G);if(Q&&Q.type==="dir")return Q.path;if(G==="."||!G.includes("/"))return".";let H=G.split("/");return H.pop(),H.join("/")||"."},[O]),D0=S((G)=>{let Q=G?.closest?.(".workspace-row");if(!Q)return null;let H=Q.dataset.path,F=Q.dataset.type;if(!H)return null;if(F==="dir")return H;if(H.includes("/")){let v=H.split("/");return v.pop(),v.join("/")||"."}return"."},[]),R0=S((G)=>{return D0(G?.target||null)},[D0]),f_=S((G)=>{t_.current=G,J_(G)},[]),_0=S(()=>{let G=J0.current;if(G?.timer)clearTimeout(G.timer);J0.current={path:null,timer:0}},[]),k0=S((G)=>{if(!G||G==="."){_0();return}let Q=X_.current?.get(G);if(!Q||Q.type!=="dir"){_0();return}if(M_.current?.has(G)){_0();return}if(J0.current?.path===G)return;_0();let H=setTimeout(()=>{J0.current={path:null,timer:0},K_.current?.(G),Y((F)=>{let v=new Set(F);return v.add(G),v})},600);J0.current={path:G,timer:H}},[_0]),W0=S((G,Q)=>{if(V2.current={x:G,y:Q},T0.current)return;T0.current=requestAnimationFrame(()=>{T0.current=0;let H=Y0.current;if(!H)return;let F=V2.current;H.style.transform=`translate(${F.x+12}px, ${F.y+12}px)`})},[]),E0=S((G)=>{if(!G)return;let H=(X_.current?.get(G)?.name||G.split("/").pop()||G).trim();if(!H)return;e({path:G,label:H})},[]),g0=S(()=>{if(e(null),T0.current)cancelAnimationFrame(T0.current),T0.current=0;if(Y0.current)Y0.current.style.transform="translate(-9999px, -9999px)"},[]),N2=S((G)=>{if(!G)return".";let Q=X_.current?.get(G);if(Q&&Q.type==="dir")return Q.path;if(G==="."||!G.includes("/"))return".";let H=G.split("/");return H.pop(),H.join("/")||"."},[]),Q0=S(()=>{L(null),D("")},[]),E2=S((G)=>{if(!G)return;let H=(X_.current?.get(G)?.name||G.split("/").pop()||G).trim();if(!H||G===".")return;L(G),D(H)},[]),U0=S(async()=>{let G=o0.current;if(!G)return;let Q=(k||"").trim();if(!Q){Q0();return}let H=X_.current?.get(G),F=(H?.name||G.split("/").pop()||G).trim();if(Q===F){Q0();return}try{let n=(await L8(G,Q))?.path||G,l=G.includes("/")?G.split("/").slice(0,-1).join("/")||".":".";if(Q0(),i(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:G,newPath:n,type:H?.type||"file"}})),H?.type==="dir")Y((o)=>{let g=new Set;for(let z_ of o)if(z_===G)g.add(n);else if(z_.startsWith(`${G}/`))g.add(`${n}${z_.slice(G.length)}`);else g.add(z_);return g});if(z(n),H?.type==="dir")b(null),x(!1),A(null);else U_.current?.(n);K_.current?.(l)}catch(v){i(v?.message||"Failed to rename file")}},[Q0,k]),u0=S(async(G)=>{let F=G||".";for(let v=0;v<50;v+=1){let l=`untitled${v===0?"":`-${v}`}.md`;try{let g=(await B8(F,l,""))?.path||(F==="."?l:`${F}/${l}`);if(F&&F!==".")Y((z_)=>new Set([...z_,F]));z(g),i(null),K_.current?.(F),U_.current?.(g);return}catch(o){if(o?.status===409||o?.code==="file_exists")continue;i(o?.message||"Failed to create file");return}}i("Failed to create file (untitled name already in use).")},[]),h0=S((G)=>{if(G?.stopPropagation?.(),G_)return;let Q=N2(O0.current);u0(Q)},[G_,N2,u0]);R(()=>{if(typeof window>"u")return;let G=(Q)=>{let H=Q?.detail?.updates||[];if(!Array.isArray(H)||H.length===0)return;J((o)=>{let g=o;for(let z_ of H){if(!z_?.root)continue;if(!g||z_.path==="."||!z_.path)g=z_.root;else g=j4(g,z_.path,z_.root)}if(g)A_.current=J1(g,M_.current,T_.current);return w(!1),g});let F=O0.current;if(Boolean(F)&&H.some((o)=>{let g=o?.path||"";if(!g||g===".")return!0;return F===g||F.startsWith(`${g}/`)||g.startsWith(`${F}/`)}))T.current.clear();if(!F||!Y2.current)return;let n=X_.current?.get(F);if(n&&n.type==="dir")return;if(H.some((o)=>{let g=o?.path||"";if(!g||g===".")return!0;return F===g||F.startsWith(`${g}/`)}))U_.current?.(F)};return window.addEventListener("workspace-update",G),()=>window.removeEventListener("workspace-update",G)},[]),D_.current=X0;let Z2=y(()=>{if(typeof window>"u")return;let G=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),Q=s_.current??H0.current,H=document.visibilityState!=="hidden"&&(Q||G.matches&&H0.current);_3(H,T_.current).catch(()=>{})}).current,U=y(0),f=y(()=>{if(U.current)clearTimeout(U.current);U.current=setTimeout(()=>{U.current=0,Z2()},250)}).current;R(()=>{if(H0.current)D_.current?.();f()},[$,N]),R(()=>{D_.current(),Z2();let G=setInterval(()=>D_.current(),C$),Q=y2("previewHeight",null),H=Number.isFinite(Q)?Math.min(Math.max(Q,80),600):280;if(l_.current=H,S_.current)S_.current.style.setProperty("--preview-height",`${H}px`);let F=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),v=()=>f();if(F.addEventListener)F.addEventListener("change",v);else if(F.addListener)F.addListener(v);return document.addEventListener("visibilitychange",v),()=>{if(clearInterval(G),y_.current)cancelAnimationFrame(y_.current),y_.current=0;if(F.removeEventListener)F.removeEventListener("change",v);else if(F.removeListener)F.removeListener(v);if(document.removeEventListener("visibilitychange",v),U.current)clearTimeout(U.current),U.current=0;if(F_.current)clearTimeout(F_.current),F_.current=null;_3(!1,T_.current).catch(()=>{})}},[]);let d=Z0(()=>Y1(j,K,$_),[j,K,$_]),O_=Z0(()=>new Map(d.map((G)=>[G.node.path,G.node])),[d]),C_=Z0(()=>Z1(R_),[R_]);X_.current=O_;let q_=(O?X_.current.get(O):null)?.type==="dir";R(()=>{if(!O||!q_){V_(null),Z_.current=null,k_.current=null;return}let G=O,Q=`${$_?"hidden":"visible"}:${O}`,H=T.current,F=H.get(Q);if(F?.root){H.delete(Q),H.set(Q,F);let l=K1(F.root,Boolean(F.truncated),W_);if(l)Z_.current=l,k_.current=O,V_({loading:!1,error:null,payload:l});return}let v=Z_.current,n=k_.current;V_({loading:!0,error:null,payload:n===O?v:null}),e2(O,b$,$_).then((l)=>{if(O0.current!==G)return;let o={root:l?.root,truncated:Boolean(l?.truncated)};H.delete(Q),H.set(Q,o);while(H.size>E$){let z_=H.keys().next().value;if(!z_)break;H.delete(z_)}let g=K1(o.root,o.truncated,W_);Z_.current=g,k_.current=O,V_({loading:!1,error:null,payload:g})}).catch((l)=>{if(O0.current!==G)return;V_({loading:!1,error:l?.message||"Failed to load folder size chart",payload:n===O?v:null})})},[O,q_,$_,W_]);let $0=Boolean(E&&E.kind==="text"&&!q_&&(!E.size||E.size<=262144)),A0=$0?"Open in editor":E?.size>262144?"File too large to edit":"File is not editable";R(()=>{let G=q0.current;if(V0.current)V0.current.dispose(),V0.current=null;if(!G)return;if(G.innerHTML="",!O||q_||!E||E.error)return;let Q={path:O,content:typeof E.text==="string"?E.text:void 0,mtime:E.mtime,size:E.size,preview:E,mode:"view"},H=n_.resolve(Q)||n_.get("workspace-preview-default");if(!H)return;let F=H.mount(G,Q);return V0.current=F,()=>{if(V0.current===F)F.dispose(),V0.current=null;G.innerHTML=""}},[O,q_,E]);let C0=(G)=>{let Q=G?.target;if(Q instanceof Element)return Q;return Q?.parentElement||null},r0=(G)=>{return Boolean(G?.closest?.(".workspace-node-icon, .workspace-label-text"))},O2=y((G)=>{if(m_.current)clearTimeout(m_.current),m_.current=null;let H=C0(G)?.closest?.("[data-path]");if(!H)return;let F=H.dataset.path;if(H.dataset.type==="dir"||!F)return;if(o0.current===F)Q0();P_.current?.(F)}).current,X2=y((G)=>{if(z0.current){z0.current=!1;return}let Q=C0(G),H=Q?.closest?.("[data-path]");if(v_.current?.focus?.(),!H)return;let F=H.dataset.path,v=H.dataset.type,n=Boolean(Q?.closest?.(".workspace-caret")),l=Boolean(Q?.closest?.("button"))||Boolean(Q?.closest?.("a"))||Boolean(Q?.closest?.("input")),o=O0.current===F,g=o0.current;if(g){if(g===F)return;Q0()}let z_=v==="file"&&f0.current===F&&!n&&!l;if(o&&!n&&!l&&F!=="."&&!z_){if(m_.current)clearTimeout(m_.current);m_.current=setTimeout(()=>{m_.current=null,E2(F)},350);return}if(v==="dir"){if(f0.current=null,z(F),b(null),A(null),x(!1),!M_.current.has(F))K_.current?.(F);if(o&&!n)return;Y((s0)=>{let i0=new Set(s0);if(i0.has(F))i0.delete(F);else i0.add(F);return i0})}else{f0.current=null,z(F);let G0=X_.current.get(F);if(G0)g_.current?.(G0.path,G0);U_.current?.(F)}}).current,b0=y(()=>{A_.current="",D_.current(),Array.from(M_.current||[]).filter((Q)=>Q&&Q!==".").forEach((Q)=>K_.current?.(Q))}).current,N0=y(()=>{f0.current=null,z(null),b(null),A(null),x(!1)}).current,w0=y(()=>{Y_((G)=>{let Q=!G;if(typeof window<"u")c_("workspaceShowHidden",String(Q));return T_.current=Q,_3(!0,Q).catch(()=>{}),A_.current="",D_.current?.(),Array.from(M_.current||[]).filter((F)=>F&&F!==".").forEach((F)=>K_.current?.(F)),Q})}).current,G2=y((G)=>{if(C0(G)?.closest?.("[data-path]"))return;N0()}).current,c0=S(async(G)=>{if(!G)return;let Q=G.split("/").pop()||G;if(!window.confirm(`Delete "${Q}"? This cannot be undone.`))return;try{await V8(G);let F=G.includes("/")?G.split("/").slice(0,-1).join("/")||".":".";if(O0.current===G)N0();K_.current?.(F),i(null)}catch(F){b((v)=>({...v||{},error:F.message||"Failed to delete file"}))}},[N0]),B2=S((G)=>{let Q=v_.current;if(!Q||!G||typeof CSS>"u"||typeof CSS.escape!=="function")return;Q.querySelector(`[data-path="${CSS.escape(G)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),d0=S((G)=>{let Q=d;if(!Q||Q.length===0)return;let H=O?Q.findIndex((F)=>F.node.path===O):-1;if(G.key==="ArrowDown"){G.preventDefault();let F=Math.min(H+1,Q.length-1),v=Q[F];if(!v)return;if(z(v.node.path),v.node.type!=="dir")g_.current?.(v.node.path,v.node),U_.current?.(v.node.path);else b(null),x(!1),A(null);B2(v.node.path);return}if(G.key==="ArrowUp"){G.preventDefault();let F=H<=0?0:H-1,v=Q[F];if(!v)return;if(z(v.node.path),v.node.type!=="dir")g_.current?.(v.node.path,v.node),U_.current?.(v.node.path);else b(null),x(!1),A(null);B2(v.node.path);return}if(G.key==="ArrowRight"&&H>=0){let F=Q[H];if(F?.node?.type==="dir"&&!K.has(F.node.path))G.preventDefault(),K_.current?.(F.node.path),Y((v)=>new Set([...v,F.node.path]));return}if(G.key==="ArrowLeft"&&H>=0){let F=Q[H];if(F?.node?.type==="dir"&&K.has(F.node.path))G.preventDefault(),Y((v)=>{let n=new Set(v);return n.delete(F.node.path),n});return}if(G.key==="Enter"&&H>=0){G.preventDefault();let F=Q[H];if(!F)return;let v=F.node.path;if(F.node.type==="dir"){if(!M_.current.has(v))K_.current?.(v);Y((l)=>{let o=new Set(l);if(o.has(v))o.delete(v);else o.add(v);return o}),b(null),A(null),x(!1)}else g_.current?.(v,F.node),U_.current?.(v);return}if((G.key==="Delete"||G.key==="Backspace")&&H>=0){let F=Q[H];if(!F||F.node.type==="dir")return;G.preventDefault(),c0(F.node.path);return}if(G.key==="Escape")G.preventDefault(),N0()},[N0,c0,K,d,B2,O]),I_=S((G)=>{let Q=C0(G),H=Q?.closest?.(".workspace-row");if(!H)return;let F=H.dataset.type,v=H.dataset.path;if(!v||v===".")return;if(o0.current===v)return;let n=G?.touches?.[0];if(!n)return;if(F0.current={path:r0(Q)?v:null,dragging:!1,startX:n.clientX,startY:n.clientY},F!=="file")return;if(F_.current)clearTimeout(F_.current);F_.current=setTimeout(()=>{if(F_.current=null,F0.current?.dragging)return;c0(v)},600)},[c0]),j0=S(()=>{if(F_.current)clearTimeout(F_.current),F_.current=null;let G=F0.current;if(G?.dragging&&G.path){let Q=t_.current||e_(),H=I0.current;if(typeof H==="function")H(G.path,Q)}F0.current={path:null,dragging:!1,startX:0,startY:0},a_.current=0,B_(!1),r(null),f_(null),_0(),g0()},[e_,g0,f_,_0]),L2=S((G)=>{let Q=F0.current,H=G?.touches?.[0];if(!H||!Q?.path){if(F_.current)clearTimeout(F_.current),F_.current=null;return}let F=Math.abs(H.clientX-Q.startX),v=Math.abs(H.clientY-Q.startY),n=F>8||v>8;if(n&&F_.current)clearTimeout(F_.current),F_.current=null;if(!Q.dragging&&n)Q.dragging=!0,B_(!0),r("move"),E0(Q.path);if(Q.dragging){G.preventDefault(),W0(H.clientX,H.clientY);let l=document.elementFromPoint(H.clientX,H.clientY),o=D0(l)||e_();if(t_.current!==o)f_(o);k0(o)}},[D0,e_,E0,W0,f_,k0]),W2=y((G)=>{G.preventDefault();let Q=S_.current;if(!Q)return;let H=G.clientY,F=l_.current||280,v=G.currentTarget;v.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let n=H,l=(g)=>{n=g.clientY;let z_=Q.clientHeight-80,G0=Math.min(Math.max(F-(g.clientY-H),80),z_);Q.style.setProperty("--preview-height",`${G0}px`),l_.current=G0},o=()=>{let g=Q.clientHeight-80,z_=Math.min(Math.max(F-(n-H),80),g);l_.current=z_,v.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",c_("previewHeight",String(Math.round(z_))),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",o)};document.addEventListener("mousemove",l),document.addEventListener("mouseup",o)}).current,M0=y((G)=>{G.preventDefault();let Q=S_.current;if(!Q)return;let H=G.touches[0];if(!H)return;let F=H.clientY,v=l_.current||280,n=G.currentTarget;n.classList.add("dragging"),document.body.style.userSelect="none";let l=(g)=>{let z_=g.touches[0];if(!z_)return;g.preventDefault();let G0=Q.clientHeight-80,s0=Math.min(Math.max(v-(z_.clientY-F),80),G0);Q.style.setProperty("--preview-height",`${s0}px`),l_.current=s0},o=()=>{n.classList.remove("dragging"),document.body.style.userSelect="",c_("previewHeight",String(Math.round(l_.current||v))),document.removeEventListener("touchmove",l),document.removeEventListener("touchend",o),document.removeEventListener("touchcancel",o)};document.addEventListener("touchmove",l,{passive:!1}),document.addEventListener("touchend",o),document.addEventListener("touchcancel",o)}).current,P0=async()=>{if(!O)return;try{let G=await G8(O);if(G.media_id)A(G.media_id)}catch(G){b((Q)=>({...Q||{},error:G.message||"Failed to attach"}))}},m2=async()=>{if(!O||q_)return;await c0(O)},Q2=(G)=>{return Array.from(G?.dataTransfer?.types||[]).includes("Files")},A2=S((G)=>{if(!Q2(G))return;if(G.preventDefault(),a_.current+=1,!y0.current)B_(!0);r("upload");let Q=R0(G)||e_();f_(Q),k0(Q)},[e_,R0,f_,k0]),w2=S((G)=>{if(!Q2(G))return;if(G.preventDefault(),G.dataTransfer)G.dataTransfer.dropEffect="copy";if(!y0.current)B_(!0);if($2.current!=="upload")r("upload");let Q=R0(G)||e_();if(t_.current!==Q)f_(Q);k0(Q)},[e_,R0,f_,k0]),q3=S((G)=>{if(!Q2(G))return;if(G.preventDefault(),a_.current=Math.max(0,a_.current-1),a_.current===0)B_(!1),r(null),f_(null),_0()},[f_,_0]),p0=S(async(G,Q=".")=>{let H=Array.from(G||[]);if(H.length===0)return;let F=Q&&Q!==""?Q:".",v=F!=="."?F:"workspace root";j_(!0);try{let n=null;for(let l of H)try{n=await m3(l,F)}catch(o){let g=o?.status,z_=o?.code;if(g===409||z_==="file_exists"){let G0=l?.name||"file";if(!window.confirm(`"${G0}" already exists in ${v}. Overwrite?`))continue;n=await m3(l,F,{overwrite:!0})}else throw o}if(n?.path)f0.current=n.path,z(n.path),U_.current?.(n.path);K_.current?.(F)}catch(n){i(n.message||"Failed to upload file")}finally{j_(!1)}},[]),V3=S(async(G,Q)=>{if(!G)return;let H=X_.current?.get(G);if(!H)return;let F=Q&&Q!==""?Q:".",v=G.includes("/")?G.split("/").slice(0,-1).join("/")||".":".";if(F===v)return;try{let l=(await q8(G,F))?.path||G;if(H.type==="dir")Y((o)=>{let g=new Set;for(let z_ of o)if(z_===G)g.add(l);else if(z_.startsWith(`${G}/`))g.add(`${l}${z_.slice(G.length)}`);else g.add(z_);return g});if(z(l),H.type==="dir")b(null),x(!1),A(null);else U_.current?.(l);K_.current?.(v),K_.current?.(F)}catch(n){i(n?.message||"Failed to move entry")}},[]);I0.current=V3;let X3=S(async(G)=>{if(!Q2(G))return;G.preventDefault(),a_.current=0,B_(!1),r(null),J_(null),_0();let Q=Array.from(G?.dataTransfer?.files||[]);if(Q.length===0)return;let H=t_.current||R0(G)||e_();await p0(Q,H)},[e_,R0,p0]),R2=S((G)=>{if(G?.stopPropagation?.(),G_)return;let Q=G?.currentTarget?.dataset?.uploadTarget||".";L0.current=Q,d_.current?.click()},[G_]),g2=S(()=>{if(G_)return;let G=O0.current,Q=G?X_.current?.get(G):null;L0.current=Q?.type==="dir"?Q.path:".",d_.current?.click()},[G_]),K0=S((G)=>{if(!G||G.button!==0)return;let Q=G.currentTarget;if(!Q||!Q.dataset)return;let H=Q.dataset.path;if(!H||H===".")return;if(o0.current===H)return;let F=C0(G);if(F?.closest?.("button, a, input, .workspace-caret"))return;if(!r0(F))return;G.preventDefault(),x0.current={path:H,dragging:!1,startX:G.clientX,startY:G.clientY};let v=(l)=>{let o=x0.current;if(!o?.path)return;let g=Math.abs(l.clientX-o.startX),z_=Math.abs(l.clientY-o.startY),G0=g>4||z_>4;if(!o.dragging&&G0)o.dragging=!0,z0.current=!0,B_(!0),r("move"),E0(o.path),W0(l.clientX,l.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(o.dragging){l.preventDefault(),W0(l.clientX,l.clientY);let s0=document.elementFromPoint(l.clientX,l.clientY),i0=D0(s0)||e_();if(t_.current!==i0)f_(i0);k0(i0)}},n=()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",n);let l=x0.current;if(l?.dragging&&l.path){let o=t_.current||e_(),g=I0.current;if(typeof g==="function")g(l.path,o)}x0.current={path:null,dragging:!1,startX:0,startY:0},a_.current=0,B_(!1),r(null),f_(null),_0(),g0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{z0.current=!1},0)};document.addEventListener("mousemove",v),document.addEventListener("mouseup",n)},[D0,e_,E0,W0,g0,f_,k0,_0]),W3=S(async(G)=>{let Q=Array.from(G?.target?.files||[]);if(Q.length===0)return;let H=L0.current||".";if(await p0(Q,H),L0.current=".",G?.target)G.target.value=""},[p0]);return X`
        <aside
            class=${`workspace-sidebar${s?" workspace-drop-active":""}`}
            data-workspace-scale=${R_}
            ref=${S_}
            onDragEnter=${A2}
            onDragOver=${w2}
            onDragLeave=${q3}
            onDrop=${X3}
        >
            <input type="file" multiple style="display:none" ref=${d_} onChange=${W3} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${h0} title="New file" disabled=${G_}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${b0} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${$_?" active":""}`}
                        onClick=${w0}
                        title=${$_?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!$_&&X`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${G2}>
                ${G_&&X`<div class="workspace-drop-hint">Uploading…</div>`}
                ${W&&X`<div class="workspace-loading">Loading…</div>`}
                ${p&&X`<div class="workspace-error">${p}</div>`}
                ${j&&X`
                    <div
                        class="workspace-tree-list"
                        ref=${v_}
                        tabIndex="0"
                        onClick=${X2}
                        onDblClick=${O2}
                        onKeyDown=${d0}
                        onTouchStart=${I_}
                        onTouchEnd=${j0}
                        onTouchMove=${L2}
                        onTouchCancel=${j0}
                    >
                        ${d.map(({node:G,depth:Q})=>{let H=G.type==="dir",F=G.path===O,v=G.path===V,n=H&&K.has(G.path),l=a&&G.path===a,o=Array.isArray(G.children)&&G.children.length>0?G.children.length:Number(G.child_count)||0;return X`
                                <div
                                    key=${G.path}
                                    class=${`workspace-row${F?" selected":""}${l?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+Q*C_.indentPx}px`}}
                                    data-path=${G.path}
                                    data-type=${G.type}
                                    onMouseDown=${K0}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${H?n?X`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:X`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${H?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${H?X`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:X`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${v?X`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${r_}
                                                value=${k}
                                                onInput=${(g)=>D(g?.target?.value||"")}
                                                onKeyDown=${(g)=>{if(g.key==="Enter")g.preventDefault(),U0();else if(g.key==="Escape")g.preventDefault(),Q0()}}
                                                onBlur=${Q0}
                                                onClick=${(g)=>g.stopPropagation()}
                                            />
                                        `:X`<span class="workspace-label"><span class="workspace-label-text">${G.name}</span></span>`}
                                    ${H&&!n&&o>0&&X`
                                        <span class="workspace-count">${o}</span>
                                    `}
                                    ${H&&X`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${G.path}
                                            title="Upload files to this folder"
                                            onClick=${R2}
                                            disabled=${G_}
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
            ${O&&X`
                <div class="workspace-preview-splitter-h" onMouseDown=${W2} onTouchStart=${M0}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${O}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${h0} title="New file" disabled=${G_}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!q_&&X`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>$0&&P_.current?.(O,E)}
                                    title=${A0}
                                    disabled=${!$0}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${m2}
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
                            ${q_?X`
                                    <button class="workspace-download" onClick=${g2}
                                        title="Upload files to this folder" disabled=${G_}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${X8(O,$_)}
                                        title="Download folder as zip" onClick=${(G)=>G.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:X`<button class="workspace-download" onClick=${P0} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${M&&X`<div class="workspace-loading">Loading preview…</div>`}
                    ${E?.error&&X`<div class="workspace-error">${E.error}</div>`}
                    ${q_&&X`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${b_?.loading&&X`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${b_?.error&&X`<div class="workspace-error">${b_.error}</div>`}
                        ${b_?.payload&&b_.payload.segments?.length>0&&X`
                            <${A$} payload=${b_.payload} />
                        `}
                        ${b_?.payload&&(!b_.payload.segments||b_.payload.segments.length===0)&&X`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${E&&!E.error&&!q_&&X`
                        <div class="workspace-preview-body" ref=${q0}></div>
                    `}
                    ${m&&X`
                        <div class="workspace-download-card">
                            <${w$} mediaId=${m} />
                        </div>
                    `}
                </div>
            `}
            ${__&&X`
                <div class="workspace-drag-ghost" ref=${Y0}>${__.label}</div>
            `}
        </aside>
    `}function Q1({tabs:_,activeId:$,onActivate:N,onClose:Z,onCloseOthers:j,onCloseAll:J,onTogglePin:K,onTogglePreview:Y,previewTabs:O,onToggleDock:z,dockVisible:V}){let[L,k]=u(null),D=y(null);R(()=>{if(!L)return;let W=(w)=>{if(w.type==="keydown"&&w.key!=="Escape")return;k(null)};return document.addEventListener("click",W),document.addEventListener("keydown",W),()=>{document.removeEventListener("click",W),document.removeEventListener("keydown",W)}},[L]),R(()=>{let W=(w)=>{if(w.ctrlKey&&w.key==="Tab"){if(w.preventDefault(),!_.length)return;let M=_.findIndex((x)=>x.id===$);if(w.shiftKey){let x=_[(M-1+_.length)%_.length];N?.(x.id)}else{let x=_[(M+1)%_.length];N?.(x.id)}return}if((w.ctrlKey||w.metaKey)&&w.key==="w"){let M=document.querySelector(".editor-pane");if(M&&M.contains(document.activeElement)){if(w.preventDefault(),$)Z?.($)}}};return document.addEventListener("keydown",W),()=>document.removeEventListener("keydown",W)},[_,$,N,Z]);let E=S((W,w)=>{if(W.button===1){W.preventDefault(),Z?.(w);return}if(W.button===0)N?.(w)},[N,Z]),b=S((W,w)=>{W.preventDefault(),k({id:w,x:W.clientX,y:W.clientY})},[]),m=S((W)=>{W.preventDefault(),W.stopPropagation()},[]),A=S((W,w)=>{W.preventDefault(),W.stopPropagation(),Z?.(w)},[Z]);if(R(()=>{if(!$||!D.current)return;let W=D.current.querySelector(".tab-item.active");if(W)W.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return X`
        <div class="tab-strip" ref=${D} role="tablist">
            ${_.map((W)=>X`
                <div
                    key=${W.id}
                    class=${`tab-item${W.id===$?" active":""}${W.dirty?" dirty":""}${W.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${W.id===$}
                    title=${W.path}
                    onMouseDown=${(w)=>E(w,W.id)}
                    onContextMenu=${(w)=>b(w,W.id)}
                >
                    ${W.pinned&&X`
                        <span class="tab-pin-icon" aria-label="Pinned">
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                <path d="M4.456.734a1.75 1.75 0 0 1 2.826.504l.613 1.327a3.1 3.1 0 0 0 2.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.1 3.1 0 0 0-1.707-2.084l-1.327-.613a1.75 1.75 0 0 1-.504-2.826z"/>
                            </svg>
                        </span>
                    `}
                    <span class="tab-label">${W.label}</span>
                    <button
                        type="button"
                        class="tab-close"
                        onMouseDown=${m}
                        onClick=${(w)=>A(w,W.id)}
                        title=${W.dirty?"Unsaved changes":"Close"}
                        aria-label=${W.dirty?"Unsaved changes":`Close ${W.label}`}
                    >
                        ${W.dirty?X`<span class="tab-dirty-dot" aria-hidden="true"></span>`:X`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                <line x1="4" y1="4" x2="12" y2="12"/>
                                <line x1="12" y1="4" x2="4" y2="12"/>
                            </svg>`}
                    </button>
                </div>
            `)}
            ${z&&X`
                <div class="tab-strip-spacer"></div>
                <button
                    class=${`tab-strip-dock-toggle${V?" active":""}`}
                    onClick=${z}
                    title=${`${V?"Hide":"Show"} terminal (Ctrl+\`)`}
                    aria-label=${`${V?"Hide":"Show"} terminal`}
                    aria-pressed=${V?"true":"false"}
                >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1.75" y="2.25" width="12.5" height="11.5" rx="2"/>
                        <polyline points="4.5 5.25 7 7.75 4.5 10.25"/>
                        <line x1="8.5" y1="10.25" x2="11.5" y2="10.25"/>
                    </svg>
                </button>
            `}
        </div>
        ${L&&X`
            <div class="tab-context-menu" style=${{left:L.x+"px",top:L.y+"px"}}>
                <button onClick=${()=>{Z?.(L.id),k(null)}}>Close</button>
                <button onClick=${()=>{j?.(L.id),k(null)}}>Close Others</button>
                <button onClick=${()=>{J?.(),k(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{K?.(L.id),k(null)}}>
                    ${_.find((W)=>W.id===L.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${Y&&/\.(md|mdx|markdown)$/i.test(L.id)&&X`
                    <hr />
                    <button onClick=${()=>{Y(L.id),k(null)}}>
                        ${O?.has(L.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var M$=400,O4=60,U1=220,G4="mdPreviewHeight";function P$(){try{let _=localStorage.getItem(G4),$=_?Number(_):NaN;return Number.isFinite($)&&$>=O4?$:U1}catch{return U1}}function F1({getContent:_,path:$,onClose:N}){let[Z,j]=u(""),[J,K]=u(P$),Y=y(null),O=y(null),z=y(""),V=y(_);return V.current=_,R(()=>{let D=()=>{let b=V.current?.()||"";if(b===z.current)return;z.current=b;try{let m=K2(b,null,{sanitize:!1});j(m)}catch{j('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};D();let E=setInterval(D,M$);return()=>clearInterval(E)},[]),R(()=>{if(Y.current&&Z)C2(Y.current).catch(()=>{})},[Z]),X`
        <div
            class="md-preview-splitter"
            onMouseDown=${(D)=>{D.preventDefault();let E=D.clientY,b=O.current?.offsetHeight||J,m=O.current?.parentElement,A=m?m.offsetHeight*0.7:500,W=D.currentTarget;W.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let w=(x)=>{let p=Math.min(Math.max(b-(x.clientY-E),O4),A);K(p)},M=()=>{W.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(G4,String(Math.round(O.current?.offsetHeight||J)))}catch{}document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",M)};document.addEventListener("mousemove",w),document.addEventListener("mouseup",M)}}
            onTouchStart=${(D)=>{D.preventDefault();let E=D.touches[0];if(!E)return;let b=E.clientY,m=O.current?.offsetHeight||J,A=O.current?.parentElement,W=A?A.offsetHeight*0.7:500,w=D.currentTarget;w.classList.add("dragging"),document.body.style.userSelect="none";let M=(p)=>{let i=p.touches[0];if(!i)return;p.preventDefault();let $_=Math.min(Math.max(m-(i.clientY-b),O4),W);K($_)},x=()=>{w.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(G4,String(Math.round(O.current?.offsetHeight||J)))}catch{}document.removeEventListener("touchmove",M),document.removeEventListener("touchend",x),document.removeEventListener("touchcancel",x)};document.addEventListener("touchmove",M,{passive:!1}),document.addEventListener("touchend",x),document.addEventListener("touchcancel",x)}}
        ></div>
        <div class="md-preview-panel" ref=${O} style=${{height:J+"px"}}>
            <div class="md-preview-header">
                <span class="md-preview-title">Preview</span>
                <button class="md-preview-close" onClick=${N} title="Close preview" aria-label="Close preview">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                        <line x1="4" y1="4" x2="12" y2="12"/>
                        <line x1="12" y1="4" x2="4" y2="12"/>
                    </svg>
                </button>
            </div>
            <div
                class="md-preview-body post-content"
                ref=${Y}
                dangerouslySetInnerHTML=${{__html:Z}}
            />
        </div>
    `}function H1({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:N}){let Z=y(_);Z.current=_;let j=y($);j.current=$;let J=y(N);J.current=N,R(()=>{J.current();let K=new g3((O,z)=>Z.current(O,z),(O)=>j.current(O));K.connect();let Y=()=>{K.reconnectIfNeeded()};return window.addEventListener("focus",Y),document.addEventListener("visibilitychange",Y),()=>{window.removeEventListener("focus",Y),document.removeEventListener("visibilitychange",Y),K.disconnect()}},[])}function y1(){let[_,$]=u(!1),[N,Z]=u("default"),j=y(!1);R(()=>{let O=H2("notificationsEnabled",!1);if(j.current=O,$(O),typeof Notification<"u")Z(Notification.permission)},[]),R(()=>{j.current=_},[_]);let J=S(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let O=Notification.requestPermission();if(O&&typeof O.then==="function")return O;return Promise.resolve(O)}catch{return Promise.resolve("default")}},[]),K=S(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){Z("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let z=await J();if(Z(z||"default"),z!=="granted"){j.current=!1,$(!1),c_("notificationsEnabled","false");return}}let O=!j.current;j.current=O,$(O),c_("notificationsEnabled",String(O))},[J]),Y=S((O,z)=>{if(!j.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let V=new Notification(O,{body:z});return V.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:N,toggleNotifications:K,notify:Y}}var c2=(_)=>{let $=new Set;return(_||[]).filter((N)=>{if(!N||$.has(N.id))return!1;return $.add(N.id),!0})};function D1({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[N,Z]=u(null),[j,J]=u(!1),K=y(!1),Y=y(null),O=y(!1),z=y(null),V=y(null);R(()=>{K.current=j},[j]),R(()=>{V.current=N},[N]);let L=S(async(E=null)=>{try{if(E){let b=await s4(E);Z(b.posts),J(!1)}else{let b=await t2(10);Z(b.posts),J(b.has_more)}}catch(b){console.error("Failed to load posts:",b)}},[]),k=S(async()=>{try{let E=await t2(10);Z((b)=>{if(!b||b.length===0)return E.posts;return c2([...E.posts,...b])}),J((b)=>b||E.has_more)}catch(E){console.error("Failed to refresh timeline:",E)}},[]),D=S(async(E={})=>{let b=V.current;if(!b||b.length===0)return;if(O.current)return;let{preserveScroll:m=!0,preserveMode:A="top",allowRepeat:W=!1}=E,w=(p)=>{if(!m){p();return}if(A==="top")$(p);else _(p)},x=b.slice().sort((p,i)=>p.id-i.id)[0]?.id;if(!Number.isFinite(x))return;if(!W&&z.current===x)return;O.current=!0,z.current=x;try{let p=await t2(10,x);if(p.posts.length>0)w(()=>{Z((i)=>c2([...p.posts,...i||[]])),J(p.has_more)});else J(!1)}catch(p){console.error("Failed to load more posts:",p)}finally{O.current=!1}},[_,$]);return R(()=>{Y.current=D},[D]),{posts:N,setPosts:Z,hasMore:j,setHasMore:J,hasMoreRef:K,loadPosts:L,refreshTimeline:k,loadMore:D,loadMoreRef:Y,loadingMoreRef:O,lastBeforeIdRef:z}}function k1(){let[_,$]=u(null),[N,Z]=u({text:"",totalLines:0}),[j,J]=u(""),[K,Y]=u({text:"",totalLines:0}),[O,z]=u(null),[V,L]=u(null),[k,D]=u(null),E=y(null),b=y(0),m=y(!1),A=y(""),W=y(""),w=y(null),M=y(null),x=y(null),p=y(null),i=y(!1),$_=y(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:N,setAgentDraft:Z,agentPlan:j,setAgentPlan:J,agentThought:K,setAgentThought:Y,pendingRequest:O,setPendingRequest:z,currentTurnId:V,setCurrentTurnId:L,steerQueuedTurnId:k,setSteerQueuedTurnId:D,lastAgentEventRef:E,lastSilenceNoticeRef:b,isAgentRunningRef:m,draftBufferRef:A,thoughtBufferRef:W,pendingRequestRef:w,stalledPostIdRef:M,currentTurnIdRef:x,steerQueuedTurnIdRef:p,thoughtExpandedRef:i,draftExpandedRef:$_}}function C1({appShellRef:_,sidebarWidthRef:$,editorWidthRef:N,dockHeightRef:Z}){let j=y((V)=>{V.preventDefault();let L=_.current;if(!L)return;let k=V.clientX,D=$.current||280,E=V.currentTarget;E.classList.add("dragging"),L.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let b=k,m=(W)=>{b=W.clientX;let w=Math.min(Math.max(D+(W.clientX-k),160),600);L.style.setProperty("--sidebar-width",`${w}px`),$.current=w},A=()=>{let W=Math.min(Math.max(D+(b-k),160),600);$.current=W,E.classList.remove("dragging"),L.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",c_("sidebarWidth",String(Math.round(W))),document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",A)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",A)}).current,J=y((V)=>{V.preventDefault();let L=_.current;if(!L)return;let k=V.touches[0];if(!k)return;let D=k.clientX,E=$.current||280,b=V.currentTarget;b.classList.add("dragging"),L.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let m=(W)=>{let w=W.touches[0];if(!w)return;W.preventDefault();let M=Math.min(Math.max(E+(w.clientX-D),160),600);L.style.setProperty("--sidebar-width",`${M}px`),$.current=M},A=()=>{b.classList.remove("dragging"),L.classList.remove("sidebar-resizing"),document.body.style.userSelect="",c_("sidebarWidth",String(Math.round($.current||E))),document.removeEventListener("touchmove",m),document.removeEventListener("touchend",A),document.removeEventListener("touchcancel",A)};document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("touchend",A),document.addEventListener("touchcancel",A)}).current,K=y((V)=>{V.preventDefault();let L=_.current;if(!L)return;let k=V.clientX,D=N.current||$.current||280,E=V.currentTarget;E.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let b=k,m=(W)=>{b=W.clientX;let w=Math.min(Math.max(D+(W.clientX-k),200),800);L.style.setProperty("--editor-width",`${w}px`),N.current=w},A=()=>{let W=Math.min(Math.max(D+(b-k),200),800);N.current=W,E.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",c_("editorWidth",String(Math.round(W))),document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",A)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",A)}).current,Y=y((V)=>{V.preventDefault();let L=_.current;if(!L)return;let k=V.touches[0];if(!k)return;let D=k.clientX,E=N.current||$.current||280,b=V.currentTarget;b.classList.add("dragging"),document.body.style.userSelect="none";let m=(W)=>{let w=W.touches[0];if(!w)return;W.preventDefault();let M=Math.min(Math.max(E+(w.clientX-D),200),800);L.style.setProperty("--editor-width",`${M}px`),N.current=M},A=()=>{b.classList.remove("dragging"),document.body.style.userSelect="",c_("editorWidth",String(Math.round(N.current||E))),document.removeEventListener("touchmove",m),document.removeEventListener("touchend",A),document.removeEventListener("touchcancel",A)};document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("touchend",A),document.addEventListener("touchcancel",A)}).current,O=y((V)=>{V.preventDefault();let L=_.current;if(!L)return;let k=V.clientY,D=Z?.current||200,E=V.currentTarget;E.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let b=k,m=(W)=>{b=W.clientY;let w=Math.min(Math.max(D-(W.clientY-k),100),window.innerHeight*0.5);if(L.style.setProperty("--dock-height",`${w}px`),Z)Z.current=w;window.dispatchEvent(new CustomEvent("dock-resize"))},A=()=>{let W=Math.min(Math.max(D-(b-k),100),window.innerHeight*0.5);if(Z)Z.current=W;E.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",c_("dockHeight",String(Math.round(W))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",A)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",A)}).current,z=y((V)=>{V.preventDefault();let L=_.current;if(!L)return;let k=V.touches[0];if(!k)return;let D=k.clientY,E=Z?.current||200,b=V.currentTarget;b.classList.add("dragging"),document.body.style.userSelect="none";let m=(W)=>{let w=W.touches[0];if(!w)return;W.preventDefault();let M=Math.min(Math.max(E-(w.clientY-D),100),window.innerHeight*0.5);if(L.style.setProperty("--dock-height",`${M}px`),Z)Z.current=M;window.dispatchEvent(new CustomEvent("dock-resize"))},A=()=>{b.classList.remove("dragging"),document.body.style.userSelect="",c_("dockHeight",String(Math.round(Z?.current||E))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",m),document.removeEventListener("touchend",A),document.removeEventListener("touchcancel",A)};document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("touchend",A),document.addEventListener("touchcancel",A)}).current;return{handleSplitterMouseDown:j,handleSplitterTouchStart:J,handleEditorSplitterMouseDown:K,handleEditorSplitterTouchStart:Y,handleDockSplitterMouseDown:O,handleDockSplitterTouchStart:z}}function b1({onTabClosed:_}={}){let $=y(_);$.current=_;let[N,Z]=u(()=>E_.getTabs()),[j,J]=u(()=>E_.getActiveId()),[K,Y]=u(()=>E_.getTabs().length>0);R(()=>{return E_.onChange((M,x)=>{Z(M),J(x),Y(M.length>0)})},[]);let[O,z]=u(()=>new Set),V=S((M)=>{z((x)=>{let p=new Set(x);if(p.has(M))p.delete(M);else p.add(M);return p})},[]),L=S((M)=>{z((x)=>{if(!x.has(M))return x;let p=new Set(x);return p.delete(M),p})},[]),k=S((M)=>{if(!M)return;let x={path:M,mode:"edit"};try{if(!n_.resolve(x)){if(!n_.get("editor")){console.warn(`[openEditor] No pane handler for: ${M}`);return}}}catch(p){console.warn(`[openEditor] paneRegistry.resolve() error for "${M}":`,p)}E_.open(M)},[]),D=S(()=>{let M=E_.getActiveId();if(M){let x=E_.get(M);if(x?.dirty){if(!window.confirm(`"${x.label}" has unsaved changes. Close anyway?`))return}E_.close(M),L(M),$.current?.(M)}},[L]),E=S((M)=>{let x=E_.get(M);if(x?.dirty){if(!window.confirm(`"${x.label}" has unsaved changes. Close anyway?`))return}E_.close(M),L(M),$.current?.(M)},[L]),b=S((M)=>{E_.activate(M)},[]),m=S((M)=>{let x=E_.getTabs().filter(($_)=>$_.id!==M&&!$_.pinned),p=x.filter(($_)=>$_.dirty).length;if(p>0){if(!window.confirm(`${p} unsaved tab${p>1?"s":""} will be closed. Continue?`))return}let i=x.map(($_)=>$_.id);E_.closeOthers(M),i.forEach(($_)=>{L($_),$.current?.($_)})},[L]),A=S(()=>{let M=E_.getTabs().filter((i)=>!i.pinned),x=M.filter((i)=>i.dirty).length;if(x>0){if(!window.confirm(`${x} unsaved tab${x>1?"s":""} will be closed. Continue?`))return}let p=M.map((i)=>i.id);E_.closeAll(),p.forEach((i)=>{L(i),$.current?.(i)})},[L]),W=S((M)=>{E_.togglePin(M)},[]),w=S(()=>{let M=E_.getActiveId();if(M)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:M}}))},[]);return R(()=>{let M=(x)=>{let{oldPath:p,newPath:i,type:$_}=x.detail||{};if(!p||!i)return;if($_==="dir"){for(let Y_ of E_.getTabs())if(Y_.path===p||Y_.path.startsWith(`${p}/`)){let s=`${i}${Y_.path.slice(p.length)}`;E_.rename(Y_.id,s)}}else E_.rename(p,i)};return window.addEventListener("workspace-file-renamed",M),()=>window.removeEventListener("workspace-file-renamed",M)},[]),R(()=>{let M=(x)=>{if(E_.hasUnsaved())x.preventDefault(),x.returnValue=""};return window.addEventListener("beforeunload",M),()=>window.removeEventListener("beforeunload",M)},[]),{editorOpen:K,tabStripTabs:N,tabStripActiveId:j,previewTabs:O,openEditor:k,closeEditor:D,handleTabClose:E,handleTabActivate:b,handleTabCloseOthers:m,handleTabCloseAll:A,handleTabTogglePin:W,handleTabTogglePreview:V,revealInExplorer:w}}function B4(_,$){try{if(typeof window>"u")return $;let N=window.__PICLAW_SILENCE||{},Z=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,j=N[_]??window[Z],J=Number(j);return Number.isFinite(J)?J:$}catch{return $}}var L4=B4("warning",30000),E1=B4("finalize",120000),q4=B4("refresh",30000),A1=30000;function w1(_){let $={};return(_?.agents||[]).forEach((N)=>{$[N.id]=N}),$}function M1(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function P1(_=30000){let[,$]=u(0);R(()=>{let N=setInterval(()=>$((Z)=>Z+1),_);return()=>clearInterval(N)},[_])}function V4(_,$=160){let N=String(_||"").replace(/\r\n/g,`
`);if(!N)return 0;return N.split(`
`).reduce((Z,j)=>Z+Math.max(1,Math.ceil(j.length/$)),0)}function S1(_,$){if(typeof _!=="string")return{kind:"ignore"};let N=_.trim();if(!N)return{kind:"toast",title:"No file selected",detail:"Use a valid file path from a file pill.",level:"warning"};if(!$.editorOpen)return{kind:"toast",title:"Editor pane is not open",detail:"Open the editor pane to open files from pills.",level:"warning"};if(/^[a-z][a-z0-9+.-]*:/i.test(N))return{kind:"toast",title:"Cannot open external path from file pill",detail:"Use an in-workspace file path.",level:"warning"};try{if(!$.resolvePane({path:N,mode:"edit"}))return{kind:"toast",title:"No editor available",detail:`No editor can open: ${N}`,level:"warning"}}catch{return{kind:"toast",title:"No editor available",detail:`No editor can open: ${N}`,level:"warning"}}return{kind:"open",path:N}}function v2(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var S$=a4,x1=e4,x$=_8,T1=J8,I1=j8,f1=$8,X4=typeof I3==="function"?I3:v2("getAgentContext",null),T$=typeof q2==="function"?q2:v2("getAgentModels",{current:null,models:[]}),I$=typeof f3==="function"?f3:v2("getAgentQueueState",{count:0}),f$=typeof c3==="function"?c3:v2("steerAgentQueueItem",{removed:!1,queued:"steer"}),u$=typeof u3==="function"?u3:v2("removeAgentQueueItem",{removed:!1});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});n_.register(d3);n_.register($4);n_.register(_4);s3();n_.register(t3);function c$(){let[_,$]=u("disconnected"),[N,Z]=u(null),[j,J]=u(null),[K,Y]=u(!1),[O,z]=u([]),[V,L]=u([]),[k,D]=u(null),{agentStatus:E,setAgentStatus:b,agentDraft:m,setAgentDraft:A,agentPlan:W,setAgentPlan:w,agentThought:M,setAgentThought:x,pendingRequest:p,setPendingRequest:i,currentTurnId:$_,setCurrentTurnId:Y_,steerQueuedTurnId:s,setSteerQueuedTurnId:B_,lastAgentEventRef:H_,lastSilenceNoticeRef:r,isAgentRunningRef:__,draftBufferRef:e,thoughtBufferRef:a,pendingRequestRef:J_,stalledPostIdRef:G_,currentTurnIdRef:j_,steerQueuedTurnIdRef:b_,thoughtExpandedRef:V_,draftExpandedRef:W_}=k1(),[x_,R_]=u({}),[B0,M_]=u(null),[A_,N_]=u(null),[y_,L_]=u(!1),[D_,X_]=u(null),[g_,P_]=u(null),[U_,K_]=u([]),[S_,v_]=u(!1),r_=U_.length,d_=y(new Set),L0=y([]),F_=y(new Set),F0=y({inFlight:!1,lastAttemptAt:0,turnId:null});d_.current=new Set(U_.map((B)=>B.row_id)),L0.current=U_;let{notificationsEnabled:x0,notificationPermission:J0,toggleNotifications:z0,notify:l_}=y1(),[T,Z_]=u(()=>new Set),[k_,q0]=u(()=>H2("workspaceOpen",!0)),V0=y(null),{editorOpen:T_,tabStripTabs:H0,tabStripActiveId:s_,previewTabs:a_,openEditor:t_,closeEditor:y0,handleTabClose:$2,handleTabActivate:Y0,handleTabCloseOthers:V2,handleTabCloseAll:T0,handleTabTogglePin:I0,handleTabTogglePreview:O0,revealInExplorer:o0}=b1({onTabClosed:(B)=>V0.current?.(B)}),f0=y(null),m_=y(null),Y2=y(null),v0=y(null),X0=n_.getDockPanes().length>0,[m0,e_]=u(!1),D0=S(()=>e_((B)=>!B),[]),R0=T_||X0&&m0;R(()=>{let B=f0.current;if(!B)return;if(m_.current)m_.current.dispose(),m_.current=null;let q=s_;if(!q)return;let C={path:q,mode:"edit"},P=n_.resolve(C)||n_.get("editor");if(!P){B.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let c=P.mount(B,C);m_.current=c,c.onDirtyChange?.((h)=>{E_.setDirty(q,h)}),c.onSaveRequest?.(()=>{}),c.onClose?.(()=>{y0()});let I=E_.getViewState(q);if(I&&typeof c.restoreViewState==="function")requestAnimationFrame(()=>c.restoreViewState(I));if(typeof c.onViewStateChange==="function")c.onViewStateChange((h)=>{E_.saveViewState(q,h)});return requestAnimationFrame(()=>c.focus()),()=>{if(m_.current===c)c.dispose(),m_.current=null}},[s_,y0]),R(()=>{let B=Y2.current;if(v0.current)v0.current.dispose(),v0.current=null;if(!B||!X0||!m0)return;let q=n_.getDockPanes()[0];if(!q){B.innerHTML='<div class="terminal-placeholder">No dock pane available.</div>';return}let C=q.mount(B,{mode:"view"});return v0.current=C,requestAnimationFrame(()=>C.focus?.()),()=>{if(v0.current===C)C.dispose(),v0.current=null}},[X0,m0]);let[f_,_0]=u({name:"You",avatar_url:null,avatar_background:null}),k0=y(!1),W0=y(!1),E0=y(null),g0=y(0),N2=y(0),Q0=y({}),E2=y({name:null,avatar_url:null}),U0=y({currentHashtag:null,searchQuery:null}),u0=y(null),h0=y(null),Z2=y(0),U=y(0),f=y(0),d=y(null),O_=y(null),C_=y(null),h_=y(0),q_=y({title:null,avatarBase:null}),$0=y(null),A0=S(()=>{if($0.current)clearTimeout($0.current),$0.current=null;D(null)},[]);P1(30000),R(()=>{return C8()},[]),R(()=>{c_("workspaceOpen",String(k_))},[k_]),R(()=>{return()=>{A0()}},[A0]),R(()=>{Q0.current=x_||{}},[x_]),R(()=>{E2.current=f_||{name:"You",avatar_url:null,avatar_background:null}},[f_]);let C0=S((B,q,C=null)=>{if(typeof document>"u")return;let P=(B||"").trim()||"PiClaw";if(q_.current.title!==P){document.title=P;let Q_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(Q_&&Q_.getAttribute("content")!==P)Q_.setAttribute("content",P);q_.current.title=P}let c=document.getElementById("dynamic-favicon");if(!c)return;let I=c.getAttribute("data-default")||c.getAttribute("href")||"/favicon.ico",h=q||I,t=q?`${h}|${C||""}`:h;if(q_.current.avatarBase!==t){let Q_=q?`${h}${h.includes("?")?"&":"?"}v=${C||Date.now()}`:h;c.setAttribute("href",Q_),q_.current.avatarBase=t}},[]),r0=S((B)=>{if(!B)return;z((q)=>q.includes(B)?q:[...q,B])},[]),O2=S((B)=>{z((q)=>q.filter((C)=>C!==B))},[]);V0.current=O2;let X2=S(()=>{z([])},[]),b0=S((B,q=null,C="info",P=3000)=>{A0(),D({title:B,detail:q||null,kind:C||"info"}),$0.current=setTimeout(()=>{D((c)=>c?.title===B?null:c)},P)},[A0]),N0=S((B)=>{let q=S1(B,{editorOpen:T_,resolvePane:(C)=>n_.resolve(C)});if(q.kind==="open"){t_(q.path);return}if(q.kind==="toast")b0(q.title,q.detail,q.level)},[T_,t_,b0]),w0=S(()=>{let B=s_;if(B)r0(B)},[s_,r0]),G2=S((B)=>{if(!B)return;L((q)=>q.includes(B)?q:[...q,B])},[]),c0=S(async(B)=>{let q=(P)=>{P.scrollIntoView({behavior:"smooth",block:"center"}),P.classList.add("post-highlight"),setTimeout(()=>P.classList.remove("post-highlight"),2000)},C=document.getElementById("post-"+B);if(C){q(C);return}try{let c=(await t4(B))?.thread?.[0];if(!c)return;K0((I)=>{if(!I)return[c];if(I.some((h)=>h.id===c.id))return I;return[...I,c]}),requestAnimationFrame(()=>{setTimeout(()=>{let I=document.getElementById("post-"+B);if(I)q(I)},50)})}catch(P){console.error("[scrollToMessage] Failed to fetch message",B,P)}},[]),B2=S((B)=>{L((q)=>q.filter((C)=>C!==B))},[]),d0=S(()=>{L([])},[]),I_=S((B={})=>{let q=Date.now();if(H_.current=q,B.running)__.current=!0,v_((C)=>C?C:!0);if(B.clearSilence)r.current=0},[v_]),j0=S(()=>{if(C_.current)clearTimeout(C_.current),C_.current=null;h_.current=0},[]);R(()=>()=>{j0()},[j0]);let L2=S(()=>{j0(),b((B)=>{if(!B)return B;if(!(B.last_activity||B.lastActivity))return B;let{last_activity:q,lastActivity:C,...P}=B;return P})},[j0]),W2=S((B)=>{if(!B)return;j0();let q=Date.now();h_.current=q,b({type:B.type||"active",last_activity:!0}),C_.current=setTimeout(()=>{if(h_.current!==q)return;b((C)=>{if(!C||!(C.last_activity||C.lastActivity))return C;return null})},A1)},[j0]),M0=S(()=>{__.current=!1,v_(!1),H_.current=null,r.current=0,e.current="",a.current="",J_.current=null,O_.current=null,j_.current=null,b_.current=null,E0.current=null,F0.current={inFlight:!1,lastAttemptAt:0,turnId:null},j0(),Y_(null),B_(null),V_.current=!1,W_.current=!1},[j0,Y_,B_,v_]),P0=S((B)=>{if(!B)return;if(j_.current===B)return;j_.current=B,F0.current={inFlight:!1,lastAttemptAt:0,turnId:B},Y_(B),b_.current=null,B_(null),e.current="",a.current="",A({text:"",totalLines:0}),w(""),x({text:"",totalLines:0}),i(null),J_.current=null,O_.current=null,V_.current=!1,W_.current=!1},[Y_,B_]),m2=S((B)=>{if(typeof document<"u"){let Q_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&Q_)return}let q=O_.current;if(!q||!q.post)return;if(B&&q.turnId&&q.turnId!==B)return;let C=q.post;if(C.id&&d.current===C.id)return;let P=String(C?.data?.content||"").trim();if(!P)return;d.current=C.id||d.current,O_.current=null;let c=P.replace(/\s+/g," ").slice(0,200),I=Q0.current||{},t=(C?.data?.agent_id?I[C.data.agent_id]:null)?.name||"Pi";l_(t,c)},[l_]),Q2=S(async(B,q)=>{if(B!=="thought"&&B!=="draft")return;let C=j_.current;if(B==="thought"){if(V_.current=q,C)try{await I1(C,"thought",q)}catch(P){console.warn("Failed to update thought visibility:",P)}if(!q)return;try{let P=C?await T1(C,"thought"):null;if(P?.text)a.current=P.text;x((c)=>({...c||{text:"",totalLines:0},fullText:a.current||c?.fullText||"",totalLines:Number.isFinite(P?.total_lines)?P.total_lines:c?.totalLines||0}))}catch(P){console.warn("Failed to fetch full thought:",P)}return}if(W_.current=q,C)try{await I1(C,"draft",q)}catch(P){console.warn("Failed to update draft visibility:",P)}if(!q)return;try{let P=C?await T1(C,"draft"):null;if(P?.text)e.current=P.text;A((c)=>({...c||{text:"",totalLines:0},fullText:e.current||c?.fullText||"",totalLines:Number.isFinite(P?.total_lines)?P.total_lines:c?.totalLines||0}))}catch(P){console.warn("Failed to fetch full draft:",P)}},[]),A2=y(null),w2=S(()=>{let B=u0.current;if(!B)return;if(!(Math.abs(B.scrollTop)>150))B.scrollTop=0},[]);A2.current=w2;let q3=S((B)=>{let q=u0.current;if(!q||typeof B!=="function"){B?.();return}let{currentHashtag:C,searchQuery:P}=U0.current||{},c=!(P&&!C),I=c?q.scrollHeight-q.scrollTop:q.scrollTop;B(),requestAnimationFrame(()=>{let h=u0.current;if(!h)return;if(c){let t=Math.max(h.scrollHeight-I,0);h.scrollTop=t}else{let t=Math.max(h.scrollHeight-h.clientHeight,0),Q_=Math.min(I,t);h.scrollTop=Q_}})},[]),p0=S((B)=>{let q=u0.current;if(!q||typeof B!=="function"){B?.();return}let C=q.scrollTop;B(),requestAnimationFrame(()=>{let P=u0.current;if(!P)return;let c=Math.max(P.scrollHeight-P.clientHeight,0);P.scrollTop=Math.min(C,c)})},[]),V3="Queued as a follow-up (one-at-a-time).",X3="⁣",R2=S((B)=>{if(!B||!Array.isArray(B))return B;let q=d_.current,C=new Set(q),P=B.filter((c)=>{if(C.has(c?.id))return!1;if(c?.data?.is_bot_message){let I=c?.data?.content;if(I===V3||I===X3)return!1}return!0});return P.length===B.length?B:P},[]),{posts:g2,setPosts:K0,hasMore:W3,setHasMore:G,hasMoreRef:Q,loadPosts:H,refreshTimeline:F,loadMore:v,loadMoreRef:n}=D1({preserveTimelineScroll:q3,preserveTimelineScrollTop:p0}),l=Z0(()=>R2(g2),[g2,U_,R2]),o=S(()=>{let B=G_.current;if(!B)return;K0((q)=>q?q.filter((C)=>C.id!==B):q),G_.current=null},[K0]),{handleSplitterMouseDown:g,handleSplitterTouchStart:z_,handleEditorSplitterMouseDown:G0,handleEditorSplitterTouchStart:s0,handleDockSplitterMouseDown:i0,handleDockSplitterTouchStart:u1}=C1({appShellRef:h0,sidebarWidthRef:Z2,editorWidthRef:U,dockHeightRef:f}),W4=S(()=>{if(!__.current)return;__.current=!1,r.current=0,H_.current=null,j_.current=null,Y_(null),V_.current=!1,W_.current=!1;let B=(e.current||"").trim();if(e.current="",a.current="",A({text:"",totalLines:0}),w(""),x({text:"",totalLines:0}),i(null),J_.current=null,O_.current=null,!B){b({type:"error",title:"Response stalled - No content received"});return}let C=`${B}${`

⚠️ Response may be incomplete - the model stopped responding`}`,P=Date.now(),c=new Date().toISOString(),I={id:P,timestamp:c,data:{type:"agent_response",content:C,agent_id:"default",is_local_stall:!0}};G_.current=P,K0((h)=>h?c2([...h,I]):[I]),A2.current?.(),b(null)},[Y_]);R(()=>{U0.current={currentHashtag:N,searchQuery:j}},[N,j]);let u_=S(()=>{I$().then((B)=>{let q=F_.current,C=Array.isArray(B?.items)?B.items.map((P)=>({...P})).filter((P)=>!q.has(P.row_id)):[];if(C.length){K_((P)=>{if(P.length===C.length&&P.every((c,I)=>c.row_id===C[I].row_id))return P;return C});return}q.clear(),K_((P)=>P.length===0?P:[])}).catch(()=>{K_((B)=>B.length===0?B:[])})},[K_]),Q3=S(async()=>{try{let B=await X4();if(B)P_(B)}catch(B){console.warn("Failed to fetch agent context:",B)}},[]),J2=S(async()=>{try{let B=await f1("web:default");if(!B||B.status!=="active"||!B.data){if(W0.current){let{currentHashtag:P,searchQuery:c}=U0.current||{};if(!P&&!c)F()}return W0.current=!1,M0(),E0.current=null,b(null),A({text:"",totalLines:0}),w(""),x({text:"",totalLines:0}),i(null),J_.current=null,B??null}W0.current=!0;let q=B.data;E0.current=q;let C=q.turn_id||q.turnId;if(C)P0(C);if(I_({running:!0,clearSilence:!0}),L2(),b(q),B.thought&&B.thought.text)x((P)=>{if(P&&P.text&&P.text.length>=B.thought.text.length)return P;return a.current=B.thought.text,{text:B.thought.text,totalLines:B.thought.totalLines||0}});if(B.draft&&B.draft.text)A((P)=>{if(P&&P.text&&P.text.length>=B.draft.text.length)return P;return e.current=B.draft.text,{text:B.draft.text,totalLines:B.draft.totalLines||0}});return B}catch(B){return console.warn("Failed to fetch agent status:",B),null}},[M0,L2,I_,F,P0]),U3=S(async()=>{if(!__.current)return null;if(J_.current)return null;let B=j_.current||null,q=F0.current,C=Date.now();if(q.inFlight)return null;if(q.turnId===B&&C-q.lastAttemptAt<q4)return null;q.inFlight=!0,q.lastAttemptAt=C,q.turnId=B;try{let{currentHashtag:P,searchQuery:c}=U0.current||{};if(!P&&!c)await F();return await u_(),await J2()}finally{q.inFlight=!1}},[J2,u_,F]);R(()=>{let B=Math.min(1000,Math.max(100,Math.floor(L4/2))),q=setInterval(()=>{if(!__.current)return;if(J_.current)return;let C=H_.current;if(!C)return;let P=Date.now(),c=P-C,I=z3(E0.current);if(c>=E1){if(!I)b({type:"waiting",title:"Re-syncing after a quiet period…"});U3();return}if(c>=L4){if(P-r.current>=q4){if(!I){let h=Math.floor(c/1000);b({type:"waiting",title:`Waiting for model… No events for ${h}s`})}r.current=P,U3()}}},B);return()=>clearInterval(q)},[U3]);let c1=S((B)=>{if($(B),B!=="connected"){b(null),A({text:"",totalLines:0}),w(""),x({text:"",totalLines:0}),i(null),J_.current=null,M0();return}if(!k0.current){k0.current=!0,J2();return}let{currentHashtag:q,searchQuery:C}=U0.current;if(!q&&!C)F();J2()},[M0,F,J2]),v1=S(async(B)=>{Z(B),K0(null),await H(B)},[H]),m1=S(async()=>{Z(null),J(null),K0(null),await H()},[H]),R1=S(async(B)=>{if(!B||!B.trim())return;J(B.trim()),Z(null),K0(null);try{let q=await S$(B.trim());K0(q.results),G(!1)}catch(q){console.error("Failed to search:",q),K0([])}},[]),g1=S(()=>{Y(!0),J(null),Z(null),K0([])},[]),h1=S(()=>{Y(!1),J(null),H()},[H]),v$=S(()=>{},[]),p1=S(async(B)=>{if(!B)return;let q=B.id,C=l?.filter((c)=>c?.data?.thread_id===q&&c?.id!==q).length||0;if(C>0){if(!window.confirm(`Delete this message and its ${C} replies?`))return}let P=(c)=>{if(!c.length)return;Z_((h)=>{let t=new Set(h);return c.forEach((Q_)=>t.add(Q_)),t}),setTimeout(()=>{if(p0(()=>{K0((h)=>h?h.filter((t)=>!c.includes(t.id)):h)}),Z_((h)=>{let t=new Set(h);return c.forEach((Q_)=>t.delete(Q_)),t}),Q.current)n.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let c=await x1(q,C>0);if(c?.ids?.length)P(c.ids)}catch(c){let I=c?.message||"";if(C===0&&I.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let t=await x1(q,!0);if(t?.ids?.length)P(t.ids);return}console.error("Failed to delete post:",c),alert(`Failed to delete message: ${I}`)}},[l,p0]),Q4=S(async()=>{try{let B=await x$();R_(w1(B));let q=B?.user||{};_0((P)=>{let c=typeof q.name==="string"&&q.name.trim()?q.name.trim():"You",I=typeof q.avatar_url==="string"?q.avatar_url.trim():null,h=typeof q.avatar_background==="string"&&q.avatar_background.trim()?q.avatar_background.trim():null;if(P.name===c&&P.avatar_url===I&&P.avatar_background===h)return P;return{name:c,avatar_url:I,avatar_background:h}});let C=(B?.agents||[]).find((P)=>P.id==="default");if(C?.model)M_(C.model);C0(C?.name,C?.avatar_url)}catch(B){console.warn("Failed to load agents:",B)}try{let B=await X4();if(B)P_(B)}catch{}},[C0]);R(()=>{Q4();let B=y2("sidebarWidth",null),q=Number.isFinite(B)?Math.min(Math.max(B,160),600):280;if(Z2.current=q,h0.current)h0.current.style.setProperty("--sidebar-width",`${q}px`)},[Q4]);let i1=S_||E!==null,U4=S((B)=>{if(!B||typeof B!=="object")return;let q=B.agent_id;if(!q)return;let{agent_name:C,agent_avatar:P}=B;if(!C&&P===void 0)return;let c=Q0.current?.[q]||{id:q},I=c.name||null,h=c.avatar_url??c.avatarUrl??c.avatar??null,t=!1,Q_=!1;if(C&&C!==c.name)I=C,Q_=!0;if(P!==void 0){let a0=typeof P==="string"?P.trim():null,H4=typeof h==="string"?h.trim():null,U2=a0||null;if(U2!==(H4||null))h=U2,t=!0}if(!Q_&&!t)return;if(R_((a0)=>{let U2={...a0[q]||{id:q}};if(Q_)U2.name=I;if(t)U2.avatar_url=h;return{...a0,[q]:U2}}),q==="default")C0(I,h,t?Date.now():null)},[C0]),F4=S((B)=>{if(!B||typeof B!=="object")return;let q=B.user_name??B.userName,C=B.user_avatar??B.userAvatar,P=B.user_avatar_background??B.userAvatarBackground;if(q===void 0&&C===void 0&&P===void 0)return;_0((c)=>{let I=typeof q==="string"&&q.trim()?q.trim():c.name||"You",h=C===void 0?c.avatar_url:typeof C==="string"&&C.trim()?C.trim():null,t=P===void 0?c.avatar_background:typeof P==="string"&&P.trim()?P.trim():null;if(c.name===I&&c.avatar_url===h&&c.avatar_background===t)return c;return{name:I,avatar_url:h,avatar_background:t}})},[]),F3=S((B)=>{if(!B||typeof B!=="object")return;let q=B.model??B.current;if(q!==void 0)M_(q);if(B.thinking_level!==void 0)N_(B.thinking_level??null);if(B.supports_thinking!==void 0)L_(Boolean(B.supports_thinking));if(B.provider_usage!==void 0)X_(B.provider_usage??null)},[]),M2=S(()=>{T$().then((B)=>{if(B)F3(B)}).catch(()=>{})},[F3]),n1=S((B)=>{let q=B?.row_id;if(q==null)return;F_.current.add(q),K_((C)=>C.filter((P)=>P?.row_id!==q)),f$(q).then(()=>{u_()}).catch((C)=>{console.warn("[queue] Failed to steer queued item:",C),b0("Failed to steer message","The queued message could not be sent as steering.","warning"),F_.current.delete(q),u_()})},[u_,K_,b0]),l1=S((B)=>{let q=B?.row_id;if(q==null)return;F_.current.add(q),K_((C)=>C.filter((P)=>P?.row_id!==q)),u$(q).then(()=>{u_()}).catch((C)=>{console.warn("[queue] Failed to remove queued item:",C),b0("Failed to remove message","The queued message could not be removed.","warning"),F_.current.delete(q),u_()})},[u_,K_,b0]),o1=S((B)=>{if(!B||typeof B!=="object")return;if(B?.queued==="followup"||B?.queued==="steer"){u_();return}let q=B?.command;if(q&&typeof q==="object"&&(q?.queued_followup||q?.queued_steer))u_()},[u_]),H3=S(()=>{M2(),u_()},[M2,u_]);R(()=>{H3();let B=setInterval(()=>{M2(),u_()},60000);return()=>clearInterval(B)},[H3,M2,u_]);let y3=S((B,q)=>{let C=q?.turn_id;if(U4(q),F4(q),B==="ui_theme"){b8(q);return}if(B?.startsWith("agent_")){if(!(B==="agent_draft_delta"||B==="agent_thought_delta"||B==="agent_draft"||B==="agent_thought"))L2()}if(B==="connected"){b(null),A({text:"",totalLines:0}),w(""),x({text:"",totalLines:0}),i(null),J_.current=null,M0(),f1("web:default").then((t)=>{if(!t||t.status!=="active"||!t.data)return;let Q_=t.data,a0=Q_.turn_id||Q_.turnId;if(a0)P0(a0);if(I_({clearSilence:!0}),W2(Q_),t.thought&&t.thought.text)a.current=t.thought.text,x({text:t.thought.text,totalLines:t.thought.totalLines||0});if(t.draft&&t.draft.text)e.current=t.draft.text,A({text:t.draft.text,totalLines:t.draft.totalLines||0})}).catch((t)=>{console.warn("Failed to fetch agent status:",t)});let{currentHashtag:I,searchQuery:h}=U0.current||{};if(!I&&!h)F();H3();return}if(B==="agent_status"){if(q.type==="done"||q.type==="error"){if(C&&j_.current&&C!==j_.current)return;if(q.type==="done"){m2(C||j_.current);let{currentHashtag:I,searchQuery:h}=U0.current||{};if(!I&&!h)F();if(q.context_usage)P_(q.context_usage)}if(W0.current=!1,M0(),F_.current.clear(),u_(),A({text:"",totalLines:0}),w(""),x({text:"",totalLines:0}),i(null),q.type==="error")b({type:"error",title:q.title||"Agent error"}),setTimeout(()=>b(null),8000);else b(null)}else{if(C)P0(C);if(I_({running:!0,clearSilence:!0}),q.type==="thinking")e.current="",a.current="",A({text:"",totalLines:0}),w(""),x({text:"",totalLines:0});E0.current=q,b((I)=>{if(I&&I.type===q.type&&I.title===q.title)return I;return q})}return}if(B==="agent_steer_queued"){if(C&&j_.current&&C!==j_.current)return;let I=C||j_.current;if(!I)return;b_.current=I,B_(I);return}if(B==="agent_followup_queued"){let I=q?.row_id,h=q?.content;if(I!=null&&typeof h==="string"&&h.trim())K_((t)=>{if(t.some((Q_)=>Q_?.row_id===I))return t;return[...t,{row_id:I,content:h,timestamp:q?.timestamp||null,thread_id:q?.thread_id??null}]});u_();return}if(B==="agent_followup_consumed"){let I=q?.row_id;if(I!=null)K_((h)=>h.filter((t)=>t.row_id!==I));u_(),F();return}if(B==="agent_followup_removed"){let I=q?.row_id;if(I!=null)F_.current.add(I),K_((h)=>h.filter((t)=>t.row_id!==I));u_();return}if(B==="agent_draft_delta"){if(C&&j_.current&&C!==j_.current)return;if(C&&!j_.current)P0(C);if(I_({running:!0,clearSilence:!0}),q?.reset)e.current="";if(q?.delta)e.current+=q.delta;let I=Date.now();if(!g0.current||I-g0.current>=100){g0.current=I;let h=e.current,t=V4(h);if(W_.current)A((Q_)=>({text:Q_?.text||"",totalLines:t,fullText:h}));else A({text:h,totalLines:t})}return}if(B==="agent_draft"){if(C&&j_.current&&C!==j_.current)return;if(C&&!j_.current)P0(C);I_({running:!0,clearSilence:!0});let I=q.text||"",h=q.mode||(q.kind==="plan"?"replace":"append"),t=Number.isFinite(q.total_lines)?q.total_lines:I?I.replace(/\r\n/g,`
`).split(`
`).length:0;if(q.kind==="plan")if(h==="replace")w(I);else w((Q_)=>(Q_||"")+I);else if(!W_.current)e.current=I,A({text:I,totalLines:t});return}if(B==="agent_thought_delta"){if(C&&j_.current&&C!==j_.current)return;if(C&&!j_.current)P0(C);if(I_({running:!0,clearSilence:!0}),q?.reset)a.current="";if(typeof q?.delta==="string")a.current+=q.delta;let I=Date.now();if(V_.current&&(!N2.current||I-N2.current>=100)){N2.current=I;let h=a.current;x((t)=>({text:t?.text||"",totalLines:V4(h),fullText:h}))}return}if(B==="agent_thought"){if(C&&j_.current&&C!==j_.current)return;if(C&&!j_.current)P0(C);I_({running:!0,clearSilence:!0});let I=q.text||"",h=Number.isFinite(q.total_lines)?q.total_lines:I?I.replace(/\r\n/g,`
`).split(`
`).length:0;if(!V_.current)a.current=I,x({text:I,totalLines:h});return}if(B==="agent_request"){if(console.log("Agent request:",q),C&&j_.current&&C!==j_.current)return;if(C)P0(C);I_({running:!0,clearSilence:!0}),i(q),J_.current=q;return}if(B==="agent_request_timeout"){if(console.log("Agent request timeout:",q),C&&j_.current&&C!==j_.current)return;i(null),J_.current=null,M0(),b({type:"error",title:"Permission request timed out"});return}if(B==="model_changed"){if(q?.model!==void 0)M_(q.model);if(q?.thinking_level!==void 0)N_(q.thinking_level??null);if(q?.supports_thinking!==void 0)L_(Boolean(q.supports_thinking));X4().then((I)=>{if(I)P_(I)}).catch(()=>{});return}if(B==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:q}));return}let{currentHashtag:P,searchQuery:c}=U0.current;if(B==="agent_response")o(),O_.current={post:q,turnId:j_.current};if(!P&&!c&&(B==="new_post"||B==="agent_response"))K0((I)=>{if(!I)return[q];if(I.some((h)=>h.id===q.id))return I;return[...I,q]}),A2.current?.();if(B==="interaction_updated")K0((I)=>{if(!I)return I;if(!I.some((h)=>h.id===q.id))return I;return I.map((h)=>h.id===q.id?q:h)});if(B==="interaction_deleted"){let I=q?.ids||[];if(I.length){p0(()=>{K0((Q_)=>Q_?Q_.filter((a0)=>!I.includes(a0.id)):Q_)});let{currentHashtag:h,searchQuery:t}=U0.current;if(Q.current&&!h&&!t)n.current?.({preserveScroll:!0,preserveMode:"top"})}}},[M0,L2,n,I_,m2,p0,F,o,P0,W2,U4,F4,M2,u_,K_]);R(()=>{if(typeof window>"u")return;let B=window.__PICLAW_TEST_API||{};return B.emit=y3,B.reset=()=>{o(),M0(),b(null),A({text:"",totalLines:0}),w(""),x({text:"",totalLines:0}),i(null)},B.finalize=()=>W4(),window.__PICLAW_TEST_API=B,()=>{if(window.__PICLAW_TEST_API===B)window.__PICLAW_TEST_API=void 0}},[M0,W4,y3,o]),H1({handleSseEvent:y3,handleConnectionStatusChange:c1,loadPosts:H}),R(()=>{if(!l||l.length===0)return;let B=location.hash;if(!B||!B.startsWith("#msg-"))return;let q=B.slice(5);c0(q),history.replaceState(null,"",location.pathname+location.search)},[l,c0]);let D3=E!==null;R(()=>{if(_!=="connected")return;let q=setInterval(()=>{let{currentHashtag:C,searchQuery:P}=U0.current||{},c=!C&&!P;if(D3){if(c)F();u_(),J2(),Q3()}else{if(c)F();J2(),Q3()}},D3?15000:60000);return()=>clearInterval(q)},[_,D3,J2,Q3,u_,F]);let r1=S(()=>{q0((B)=>!B)},[]);R(()=>{if(!T_)return;if(typeof window>"u")return;let B=h0.current;if(!B)return;if(!U.current){let q=y2("editorWidth",null),C=Z2.current||280;U.current=Number.isFinite(q)?q:C}if(B.style.setProperty("--editor-width",`${U.current}px`),!f.current){let q=y2("dockHeight",null);f.current=Number.isFinite(q)?q:200}B.style.setProperty("--dock-height",`${f.current}px`)},[T_]),R(()=>{if(!X0)return;let B=(q)=>{if(q.ctrlKey&&q.key==="`")q.preventDefault(),D0()};return document.addEventListener("keydown",B),()=>document.removeEventListener("keydown",B)},[D0,X0]);let d1=Boolean(s&&s===(E?.turn_id||$_));return X`
        <div class=${`app-shell${k_?"":" workspace-collapsed"}${T_?" editor-open":""}`} ref=${h0}>
            <${W1}
                onFileSelect=${r0}
                visible=${k_}
                active=${k_||T_}
                onOpenEditor=${t_}
            />
            <button
                class=${`workspace-toggle-tab${k_?" open":" closed"}`}
                onClick=${r1}
                title=${k_?"Hide workspace":"Show workspace"}
                aria-label=${k_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${g} onTouchStart=${z_}></div>
            ${R0&&X`
                <div class="editor-pane-container">
                    ${T_&&X`
                        <${Q1}
                            tabs=${H0}
                            activeId=${s_}
                            onActivate=${Y0}
                            onClose=${$2}
                            onCloseOthers=${V2}
                            onCloseAll=${T0}
                            onTogglePin=${I0}
                            onTogglePreview=${O0}
                            previewTabs=${a_}
                            onToggleDock=${X0?D0:void 0}
                            dockVisible=${X0&&m0}
                        />
                    `}
                    ${T_&&X`<div class="editor-pane-host" ref=${f0}></div>`}
                    ${T_&&s_&&a_.has(s_)&&X`
                        <${F1}
                            getContent=${()=>m_.current?.getContent?.()}
                            path=${s_}
                            onClose=${()=>O0(s_)}
                        />
                    `}
                    ${X0&&m0&&X`<div class="dock-splitter" onMouseDown=${i0} onTouchStart=${u1}></div>`}
                    ${X0&&X`<div class=${`dock-panel${m0?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${D0} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
                                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                    <line x1="4" y1="12" x2="12" y2="4"/>
                                    <polyline points="4 4 12 4 12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="dock-panel-body" ref=${Y2}></div>
                    </div>`}
                </div>
                <div class="editor-splitter" onMouseDown=${G0} onTouchStart=${s0}></div>
            `}
            <div class="container">
                ${j&&M1()&&X`<div class="search-results-spacer"></div>`}
                ${(N||j)&&X`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${m1}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${N?`#${N}`:`Search: ${j}`}</span>
                    </div>
                `}
                <${d8}
                    posts=${l}
                    hasMore=${W3}
                    onLoadMore=${v}
                    timelineRef=${u0}
                    onHashtagClick=${v1}
                    onMessageRef=${G2}
                    onScrollToMessage=${c0}
                    onFileRef=${N0}
                    onPostClick=${void 0}
                    onDeletePost=${p1}
                    emptyMessage=${N?`No posts with #${N}`:j?`No results for "${j}"`:void 0}
                    agents=${x_}
                    user=${f_}
                    reverse=${!(j&&!N)}
                    removingPostIds=${T}
                    searchQuery=${j}
                />
                <${R8}
                    status=${E}
                    draft=${m}
                    plan=${W}
                    thought=${M}
                    pendingRequest=${p}
                    intent=${k}
                    turnId=${$_}
                    steerQueued=${d1}
                    onPanelToggle=${Q2}
                />
                <${Q8}
                    onPost=${()=>{H(),w2()}}
                    onFocus=${w2}
                    searchMode=${K}
                    onSearch=${R1}
                    onEnterSearch=${g1}
                    onExitSearch=${h1}
                    fileRefs=${O}
                    onRemoveFileRef=${O2}
                    onClearFileRefs=${X2}
                    messageRefs=${V}
                    onRemoveMessageRef=${B2}
                    onClearMessageRefs=${d0}
                    activeEditorPath=${s_}
                    onAttachEditorFile=${w0}
                    onOpenFilePill=${N0}
                    followupQueueCount=${r_}
                    followupQueueItems=${U_}
                    onInjectQueuedFollowup=${n1}
                    onRemoveQueuedFollowup=${l1}
                    onMessageResponse=${o1}
                    isAgentActive=${i1}
                    activeModel=${B0}
                    modelUsage=${D_}
                    thinkingLevel=${A_}
                    supportsThinking=${y_}
                    contextUsage=${g_}
                    notificationsEnabled=${x0}
                    notificationPermission=${J0}
                    onToggleNotifications=${z0}
                    onModelChange=${M_}
                    onModelStateChange=${F3}
                />
                <${h8} status=${_} />
                <${g8}
                    request=${p}
                    onRespond=${()=>{i(null),J_.current=null}}
                />
            </div>
        </div>
    `}n4(X`<${c$} />`,document.getElementById("app"));

//# debugId=719716F7515FC7CC64756E2164756E21
//# sourceMappingURL=app.bundle.js.map

var $6=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,N)=>(typeof require<"u"?require:$)[N]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var d2,M_,I1,N6,K2,D1,u1,c1,v1,M3,b3,E3,Z6,l2={},o2=[],J6=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,s2=Array.isArray;function t0(_,$){for(var N in $)_[N]=$[N];return _}function P3(_){_&&_.parentNode&&_.parentNode.removeChild(_)}function m1(_,$,N){var Z,K,J,j={};for(J in $)J=="key"?Z=$[J]:J=="ref"?K=$[J]:j[J]=$[J];if(arguments.length>2&&(j.children=arguments.length>3?d2.call(arguments,2):N),typeof _=="function"&&_.defaultProps!=null)for(J in _.defaultProps)j[J]===void 0&&(j[J]=_.defaultProps[J]);return p2(_,j,Z,K,null)}function p2(_,$,N,Z,K){var J={type:_,props:$,key:N,ref:Z,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:K==null?++I1:K,__i:-1,__u:0};return K==null&&M_.vnode!=null&&M_.vnode(J),J}function a2(_){return _.children}function i2(_,$){this.props=_,this.context=$}function H2(_,$){if($==null)return _.__?H2(_.__,_.__i+1):null;for(var N;$<_.__k.length;$++)if((N=_.__k[$])!=null&&N.__e!=null)return N.__e;return typeof _.type=="function"?H2(_):null}function K6(_){if(_.__P&&_.__d){var $=_.__v,N=$.__e,Z=[],K=[],J=t0({},$);J.__v=$.__v+1,M_.vnode&&M_.vnode(J),S3(_.__P,J,$,_.__n,_.__P.namespaceURI,32&$.__u?[N]:null,Z,N==null?H2($):N,!!(32&$.__u),K),J.__v=$.__v,J.__.__k[J.__i]=J,p1(Z,J,K),$.__e=$.__=null,J.__e!=N&&R1(J)}}function R1(_){if((_=_.__)!=null&&_.__c!=null)return _.__e=_.__c.base=null,_.__k.some(function($){if($!=null&&$.__e!=null)return _.__e=_.__c.base=$.__e}),R1(_)}function C1(_){(!_.__d&&(_.__d=!0)&&K2.push(_)&&!r2.__r++||D1!=M_.debounceRendering)&&((D1=M_.debounceRendering)||u1)(r2)}function r2(){try{for(var _,$=1;K2.length;)K2.length>$&&K2.sort(c1),_=K2.shift(),$=K2.length,K6(_)}finally{K2.length=r2.__r=0}}function g1(_,$,N,Z,K,J,j,z,O,Y,V){var B,C,D,E,b,m,A,X=Z&&Z.__k||o2,w=$.length;for(O=j6(N,$,X,O,w),B=0;B<w;B++)(D=N.__k[B])!=null&&(C=D.__i!=-1&&X[D.__i]||l2,D.__i=B,m=S3(_,D,C,K,J,j,z,O,Y,V),E=D.__e,D.ref&&C.ref!=D.ref&&(C.ref&&x3(C.ref,null,D),V.push(D.ref,D.__c||E,D)),b==null&&E!=null&&(b=E),(A=!!(4&D.__u))||C.__k===D.__k?O=h1(D,O,_,A):typeof D.type=="function"&&m!==void 0?O=m:E&&(O=E.nextSibling),D.__u&=-7);return N.__e=b,O}function j6(_,$,N,Z,K){var J,j,z,O,Y,V=N.length,B=V,C=0;for(_.__k=Array(K),J=0;J<K;J++)(j=$[J])!=null&&typeof j!="boolean"&&typeof j!="function"?(typeof j=="string"||typeof j=="number"||typeof j=="bigint"||j.constructor==String?j=_.__k[J]=p2(null,j,null,null,null):s2(j)?j=_.__k[J]=p2(a2,{children:j},null,null,null):j.constructor===void 0&&j.__b>0?j=_.__k[J]=p2(j.type,j.props,j.key,j.ref?j.ref:null,j.__v):_.__k[J]=j,O=J+C,j.__=_,j.__b=_.__b+1,z=null,(Y=j.__i=z6(j,N,O,B))!=-1&&(B--,(z=N[Y])&&(z.__u|=2)),z==null||z.__v==null?(Y==-1&&(K>V?C--:K<V&&C++),typeof j.type!="function"&&(j.__u|=4)):Y!=O&&(Y==O-1?C--:Y==O+1?C++:(Y>O?C--:C++,j.__u|=4))):_.__k[J]=null;if(B)for(J=0;J<V;J++)(z=N[J])!=null&&(2&z.__u)==0&&(z.__e==Z&&(Z=H2(z)),n1(z,z));return Z}function h1(_,$,N,Z){var K,J;if(typeof _.type=="function"){for(K=_.__k,J=0;K&&J<K.length;J++)K[J]&&(K[J].__=_,$=h1(K[J],$,N,Z));return $}_.__e!=$&&(Z&&($&&_.type&&!$.parentNode&&($=H2(_)),N.insertBefore(_.__e,$||null)),$=_.__e);do $=$&&$.nextSibling;while($!=null&&$.nodeType==8);return $}function z6(_,$,N,Z){var K,J,j,z=_.key,O=_.type,Y=$[N],V=Y!=null&&(2&Y.__u)==0;if(Y===null&&z==null||V&&z==Y.key&&O==Y.type)return N;if(Z>(V?1:0)){for(K=N-1,J=N+1;K>=0||J<$.length;)if((Y=$[j=K>=0?K--:J++])!=null&&(2&Y.__u)==0&&z==Y.key&&O==Y.type)return j}return-1}function k1(_,$,N){$[0]=="-"?_.setProperty($,N==null?"":N):_[$]=N==null?"":typeof N!="number"||J6.test($)?N:N+"px"}function h2(_,$,N,Z,K){var J,j;_:if($=="style")if(typeof N=="string")_.style.cssText=N;else{if(typeof Z=="string"&&(_.style.cssText=Z=""),Z)for($ in Z)N&&$ in N||k1(_.style,$,"");if(N)for($ in N)Z&&N[$]==Z[$]||k1(_.style,$,N[$])}else if($[0]=="o"&&$[1]=="n")J=$!=($=$.replace(v1,"$1")),j=$.toLowerCase(),$=j in _||$=="onFocusOut"||$=="onFocusIn"?j.slice(2):$.slice(2),_.l||(_.l={}),_.l[$+J]=N,N?Z?N.u=Z.u:(N.u=M3,_.addEventListener($,J?E3:b3,J)):_.removeEventListener($,J?E3:b3,J);else{if(K=="http://www.w3.org/2000/svg")$=$.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if($!="width"&&$!="height"&&$!="href"&&$!="list"&&$!="form"&&$!="tabIndex"&&$!="download"&&$!="rowSpan"&&$!="colSpan"&&$!="role"&&$!="popover"&&$ in _)try{_[$]=N==null?"":N;break _}catch(z){}typeof N=="function"||(N==null||N===!1&&$[4]!="-"?_.removeAttribute($):_.setAttribute($,$=="popover"&&N==1?"":N))}}function b1(_){return function($){if(this.l){var N=this.l[$.type+_];if($.t==null)$.t=M3++;else if($.t<N.u)return;return N(M_.event?M_.event($):$)}}}function S3(_,$,N,Z,K,J,j,z,O,Y){var V,B,C,D,E,b,m,A,X,w,P,f,p,i,$_,Y_=$.type;if($.constructor!==void 0)return null;128&N.__u&&(O=!!(32&N.__u),J=[z=$.__e=N.__e]),(V=M_.__b)&&V($);_:if(typeof Y_=="function")try{if(A=$.props,X=Y_.prototype&&Y_.prototype.render,w=(V=Y_.contextType)&&Z[V.__c],P=V?w?w.props.value:V.__:Z,N.__c?m=(B=$.__c=N.__c).__=B.__E:(X?$.__c=B=new Y_(A,P):($.__c=B=new i2(A,P),B.constructor=Y_,B.render=O6),w&&w.sub(B),B.state||(B.state={}),B.__n=Z,C=B.__d=!0,B.__h=[],B._sb=[]),X&&B.__s==null&&(B.__s=B.state),X&&Y_.getDerivedStateFromProps!=null&&(B.__s==B.state&&(B.__s=t0({},B.__s)),t0(B.__s,Y_.getDerivedStateFromProps(A,B.__s))),D=B.props,E=B.state,B.__v=$,C)X&&Y_.getDerivedStateFromProps==null&&B.componentWillMount!=null&&B.componentWillMount(),X&&B.componentDidMount!=null&&B.__h.push(B.componentDidMount);else{if(X&&Y_.getDerivedStateFromProps==null&&A!==D&&B.componentWillReceiveProps!=null&&B.componentWillReceiveProps(A,P),$.__v==N.__v||!B.__e&&B.shouldComponentUpdate!=null&&B.shouldComponentUpdate(A,B.__s,P)===!1){$.__v!=N.__v&&(B.props=A,B.state=B.__s,B.__d=!1),$.__e=N.__e,$.__k=N.__k,$.__k.some(function(s){s&&(s.__=$)}),o2.push.apply(B.__h,B._sb),B._sb=[],B.__h.length&&j.push(B);break _}B.componentWillUpdate!=null&&B.componentWillUpdate(A,B.__s,P),X&&B.componentDidUpdate!=null&&B.__h.push(function(){B.componentDidUpdate(D,E,b)})}if(B.context=P,B.props=A,B.__P=_,B.__e=!1,f=M_.__r,p=0,X)B.state=B.__s,B.__d=!1,f&&f($),V=B.render(B.props,B.state,B.context),o2.push.apply(B.__h,B._sb),B._sb=[];else do B.__d=!1,f&&f($),V=B.render(B.props,B.state,B.context),B.state=B.__s;while(B.__d&&++p<25);B.state=B.__s,B.getChildContext!=null&&(Z=t0(t0({},Z),B.getChildContext())),X&&!C&&B.getSnapshotBeforeUpdate!=null&&(b=B.getSnapshotBeforeUpdate(D,E)),i=V!=null&&V.type===a2&&V.key==null?i1(V.props.children):V,z=g1(_,s2(i)?i:[i],$,N,Z,K,J,j,z,O,Y),B.base=$.__e,$.__u&=-161,B.__h.length&&j.push(B),m&&(B.__E=B.__=null)}catch(s){if($.__v=null,O||J!=null)if(s.then){for($.__u|=O?160:128;z&&z.nodeType==8&&z.nextSibling;)z=z.nextSibling;J[J.indexOf(z)]=null,$.__e=z}else{for($_=J.length;$_--;)P3(J[$_]);A3($)}else $.__e=N.__e,$.__k=N.__k,s.then||A3($);M_.__e(s,$,N)}else J==null&&$.__v==N.__v?($.__k=N.__k,$.__e=N.__e):z=$.__e=Y6(N.__e,$,N,Z,K,J,j,O,Y);return(V=M_.diffed)&&V($),128&$.__u?void 0:z}function A3(_){_&&(_.__c&&(_.__c.__e=!0),_.__k&&_.__k.some(A3))}function p1(_,$,N){for(var Z=0;Z<N.length;Z++)x3(N[Z],N[++Z],N[++Z]);M_.__c&&M_.__c($,_),_.some(function(K){try{_=K.__h,K.__h=[],_.some(function(J){J.call(K)})}catch(J){M_.__e(J,K.__v)}})}function i1(_){return typeof _!="object"||_==null||_.__b>0?_:s2(_)?_.map(i1):t0({},_)}function Y6(_,$,N,Z,K,J,j,z,O){var Y,V,B,C,D,E,b,m=N.props||l2,A=$.props,X=$.type;if(X=="svg"?K="http://www.w3.org/2000/svg":X=="math"?K="http://www.w3.org/1998/Math/MathML":K||(K="http://www.w3.org/1999/xhtml"),J!=null){for(Y=0;Y<J.length;Y++)if((D=J[Y])&&"setAttribute"in D==!!X&&(X?D.localName==X:D.nodeType==3)){_=D,J[Y]=null;break}}if(_==null){if(X==null)return document.createTextNode(A);_=document.createElementNS(K,X,A.is&&A),z&&(M_.__m&&M_.__m($,J),z=!1),J=null}if(X==null)m===A||z&&_.data==A||(_.data=A);else{if(J=J&&d2.call(_.childNodes),!z&&J!=null)for(m={},Y=0;Y<_.attributes.length;Y++)m[(D=_.attributes[Y]).name]=D.value;for(Y in m)D=m[Y],Y=="dangerouslySetInnerHTML"?B=D:Y=="children"||(Y in A)||Y=="value"&&("defaultValue"in A)||Y=="checked"&&("defaultChecked"in A)||h2(_,Y,null,D,K);for(Y in A)D=A[Y],Y=="children"?C=D:Y=="dangerouslySetInnerHTML"?V=D:Y=="value"?E=D:Y=="checked"?b=D:z&&typeof D!="function"||m[Y]===D||h2(_,Y,D,m[Y],K);if(V)z||B&&(V.__html==B.__html||V.__html==_.innerHTML)||(_.innerHTML=V.__html),$.__k=[];else if(B&&(_.innerHTML=""),g1($.type=="template"?_.content:_,s2(C)?C:[C],$,N,Z,X=="foreignObject"?"http://www.w3.org/1999/xhtml":K,J,j,J?J[0]:N.__k&&H2(N,0),z,O),J!=null)for(Y=J.length;Y--;)P3(J[Y]);z||(Y="value",X=="progress"&&E==null?_.removeAttribute("value"):E!=null&&(E!==_[Y]||X=="progress"&&!E||X=="option"&&E!=m[Y])&&h2(_,Y,E,m[Y],K),Y="checked",b!=null&&b!=_[Y]&&h2(_,Y,b,m[Y],K))}return _}function x3(_,$,N){try{if(typeof _=="function"){var Z=typeof _.__u=="function";Z&&_.__u(),Z&&$==null||(_.__u=_($))}else _.current=$}catch(K){M_.__e(K,N)}}function n1(_,$,N){var Z,K;if(M_.unmount&&M_.unmount(_),(Z=_.ref)&&(Z.current&&Z.current!=_.__e||x3(Z,null,$)),(Z=_.__c)!=null){if(Z.componentWillUnmount)try{Z.componentWillUnmount()}catch(J){M_.__e(J,$)}Z.base=Z.__P=null}if(Z=_.__k)for(K=0;K<Z.length;K++)Z[K]&&n1(Z[K],$,N||typeof _.type!="function");N||P3(_.__e),_.__c=_.__=_.__e=void 0}function O6(_,$,N){return this.constructor(_,N)}function l1(_,$,N){var Z,K,J,j;$==document&&($=document.documentElement),M_.__&&M_.__(_,$),K=(Z=typeof N=="function")?null:N&&N.__k||$.__k,J=[],j=[],S3($,_=(!Z&&N||$).__k=m1(a2,null,[_]),K||l2,l2,$.namespaceURI,!Z&&N?[N]:K?null:$.firstChild?d2.call($.childNodes):null,J,!Z&&N?N:K?K.__e:$.firstChild,Z,j),p1(J,_,j)}d2=o2.slice,M_={__e:function(_,$,N,Z){for(var K,J,j;$=$.__;)if((K=$.__c)&&!K.__)try{if((J=K.constructor)&&J.getDerivedStateFromError!=null&&(K.setState(J.getDerivedStateFromError(_)),j=K.__d),K.componentDidCatch!=null&&(K.componentDidCatch(_,Z||{}),j=K.__d),j)return K.__E=K}catch(z){_=z}throw _}},I1=0,N6=function(_){return _!=null&&_.constructor===void 0},i2.prototype.setState=function(_,$){var N;N=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=t0({},this.state),typeof _=="function"&&(_=_(t0({},N),this.props)),_&&t0(N,_),_!=null&&this.__v&&($&&this._sb.push($),C1(this))},i2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),C1(this))},i2.prototype.render=a2,K2=[],u1=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,c1=function(_,$){return _.__v.__b-$.__v.__b},r2.__r=0,v1=/(PointerCapture)$|Capture$/i,M3=0,b3=b1(!1),E3=b1(!0),Z6=0;var P2,i_,k3,E1,S2=0,o1=[],p_=M_,A1=p_.__b,w1=p_.__r,M1=p_.diffed,P1=p_.__c,S1=p_.unmount,x1=p_.__;function f3(_,$){p_.__h&&p_.__h(i_,_,S2||$),S2=0;var N=i_.__H||(i_.__H={__:[],__h:[]});return _>=N.__.length&&N.__.push({}),N.__[_]}function u(_){return S2=1,G6(d1,_)}function G6(_,$,N){var Z=f3(P2++,2);if(Z.t=_,!Z.__c&&(Z.__=[N?N($):d1(void 0,$),function(z){var O=Z.__N?Z.__N[0]:Z.__[0],Y=Z.t(O,z);O!==Y&&(Z.__N=[Y,Z.__[1]],Z.__c.setState({}))}],Z.__c=i_,!i_.__f)){var K=function(z,O,Y){if(!Z.__c.__H)return!0;var V=Z.__c.__H.__.filter(function(C){return C.__c});if(V.every(function(C){return!C.__N}))return!J||J.call(this,z,O,Y);var B=Z.__c.props!==z;return V.some(function(C){if(C.__N){var D=C.__[0];C.__=C.__N,C.__N=void 0,D!==C.__[0]&&(B=!0)}}),J&&J.call(this,z,O,Y)||B};i_.__f=!0;var{shouldComponentUpdate:J,componentWillUpdate:j}=i_;i_.componentWillUpdate=function(z,O,Y){if(this.__e){var V=J;J=void 0,K(z,O,Y),J=V}j&&j.call(this,z,O,Y)},i_.shouldComponentUpdate=K}return Z.__N||Z.__}function R(_,$){var N=f3(P2++,3);!p_.__s&&r1(N.__H,$)&&(N.__=_,N.u=$,i_.__H.__h.push(N))}function y(_){return S2=5,s_(function(){return{current:_}},[])}function s_(_,$){var N=f3(P2++,7);return r1(N.__H,$)&&(N.__=_(),N.__H=$,N.__h=_),N.__}function x(_,$){return S2=8,s_(function(){return _},$)}function L6(){for(var _;_=o1.shift();){var $=_.__H;if(_.__P&&$)try{$.__h.some(n2),$.__h.some(w3),$.__h=[]}catch(N){$.__h=[],p_.__e(N,_.__v)}}}p_.__b=function(_){i_=null,A1&&A1(_)},p_.__=function(_,$){_&&$.__k&&$.__k.__m&&(_.__m=$.__k.__m),x1&&x1(_,$)},p_.__r=function(_){w1&&w1(_),P2=0;var $=(i_=_.__c).__H;$&&(k3===i_?($.__h=[],i_.__h=[],$.__.some(function(N){N.__N&&(N.__=N.__N),N.u=N.__N=void 0})):($.__h.some(n2),$.__h.some(w3),$.__h=[],P2=0)),k3=i_},p_.diffed=function(_){M1&&M1(_);var $=_.__c;$&&$.__H&&($.__H.__h.length&&(o1.push($)!==1&&E1===p_.requestAnimationFrame||((E1=p_.requestAnimationFrame)||B6)(L6)),$.__H.__.some(function(N){N.u&&(N.__H=N.u),N.u=void 0})),k3=i_=null},p_.__c=function(_,$){$.some(function(N){try{N.__h.some(n2),N.__h=N.__h.filter(function(Z){return!Z.__||w3(Z)})}catch(Z){$.some(function(K){K.__h&&(K.__h=[])}),$=[],p_.__e(Z,N.__v)}}),P1&&P1(_,$)},p_.unmount=function(_){S1&&S1(_);var $,N=_.__c;N&&N.__H&&(N.__H.__.some(function(Z){try{n2(Z)}catch(K){$=K}}),N.__H=void 0,$&&p_.__e($,N.__v))};var f1=typeof requestAnimationFrame=="function";function B6(_){var $,N=function(){clearTimeout(Z),f1&&cancelAnimationFrame($),setTimeout(_)},Z=setTimeout(N,35);f1&&($=requestAnimationFrame(N))}function n2(_){var $=i_,N=_.__c;typeof N=="function"&&(_.__c=void 0,N()),i_=$}function w3(_){var $=i_;_.__c=_.__(),i_=$}function r1(_,$){return!_||_.length!==$.length||$.some(function(N,Z){return N!==_[Z]})}function d1(_,$){return typeof $=="function"?$(_):$}var s1=function(_,$,N,Z){var K;$[0]=0;for(var J=1;J<$.length;J++){var j=$[J++],z=$[J]?($[0]|=j?1:2,N[$[J++]]):$[++J];j===3?Z[0]=z:j===4?Z[1]=Object.assign(Z[1]||{},z):j===5?(Z[1]=Z[1]||{})[$[++J]]=z:j===6?Z[1][$[++J]]+=z+"":j?(K=_.apply(z,s1(_,z,N,["",null])),Z.push(K),z[0]?$[0]|=2:($[J-2]=0,$[J]=K)):Z.push(z)}return Z},T1=new Map;function q6(_){var $=T1.get(this);return $||($=new Map,T1.set(this,$)),($=s1(this,$.get(_)||($.set(_,$=function(N){for(var Z,K,J=1,j="",z="",O=[0],Y=function(C){J===1&&(C||(j=j.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?O.push(0,C,j):J===3&&(C||j)?(O.push(3,C,j),J=2):J===2&&j==="..."&&C?O.push(4,C,0):J===2&&j&&!C?O.push(5,0,!0,j):J>=5&&((j||!C&&J===5)&&(O.push(J,0,j,K),J=6),C&&(O.push(J,C,0,K),J=6)),j=""},V=0;V<N.length;V++){V&&(J===1&&Y(),Y(V));for(var B=0;B<N[V].length;B++)Z=N[V][B],J===1?Z==="<"?(Y(),O=[O],J=3):j+=Z:J===4?j==="--"&&Z===">"?(J=1,j=""):j=Z+j[0]:z?Z===z?z="":j+=Z:Z==='"'||Z==="'"?z=Z:Z===">"?(Y(),J=1):J&&(Z==="="?(J=5,K=j,j=""):Z==="/"&&(J<5||N[V][B+1]===">")?(Y(),J===3&&(O=O[0]),J=O,(O=O[0]).push(2,0,J),J=0):Z===" "||Z==="\t"||Z===`
`||Z==="\r"?(Y(),J=2):j+=Z),J===3&&j==="!--"&&(J=4,O=O[0])}return Y(),O}(_)),$),arguments,[])).length>1?$:$[0]}var W=q6.bind(m1);async function a_(_,$={}){let N=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!N.ok){let Z=await N.json().catch(()=>({error:"Unknown error"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function t2(_=10,$=null){let N=`/timeline?limit=${_}`;if($)N+=`&before=${$}`;return a_(N)}async function a1(_,$=50,N=0){return a_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${N}`)}async function t1(_,$=50,N=0){return a_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${N}`)}async function e1(_){return a_(`/thread/${_}`)}async function _4(_,$=!1){let N=`/post/${_}?cascade=${$?"true":"false"}`;return a_(N,{method:"DELETE"})}async function T3(_,$,N=null,Z=[],K=null){return a_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:N,media_ids:Z,mode:K})})}async function $4(){return a_("/agents")}async function N4(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return a_(`/agent/status${$}`)}async function I3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return a_(`/agent/context${$}`)}async function u3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return a_(`/agent/queue-state${$}`)}async function c3(_,$=null){let N=await fetch("/agent/queue-remove",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Failed to remove queued item"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function v3(_,$=null){let N=await fetch("/agent/queue-steer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Failed to steer queued item"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function V2(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return a_(`/agent/models${$}`)}async function Z4(_){let $=new FormData;$.append("file",_);let N=await fetch("/media/upload",{method:"POST",body:$});if(!N.ok){let Z=await N.json().catch(()=>({error:"Upload failed"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function m3(_,$){let N=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Failed to respond"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function J4(_,$){let N=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function K4(_,$="thought"){let N=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return a_(N)}async function j4(_,$,N){return a_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(N)})})}function n0(_){return`/media/${_}`}function z4(_){return`/media/${_}/thumbnail`}async function x2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function Y4(_){let $=await fetch(`/media/${_}`);if(!$.ok)throw Error("Failed to load media text");return $.text()}async function O4(_){let $=await fetch(`/media/${_}`);if(!$.ok)throw Error("Failed to load media blob");return $.blob()}async function e2(_="",$=2,N=!1){let Z=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${N?"1":"0"}`;return a_(Z)}async function G4(_,$=20000,N=null){let Z=N?`&mode=${encodeURIComponent(N)}`:"",K=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${Z}`;return a_(K)}async function L4(_){return a_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function R3(_,$="",N={}){let Z=new FormData;Z.append("file",_);let K=new URLSearchParams;if($)K.set("path",$);if(N.overwrite)K.set("overwrite","1");let J=K.toString(),j=J?`/workspace/upload?${J}`:"/workspace/upload",z=await fetch(""+j,{method:"POST",body:Z});if(!z.ok){let O=await z.json().catch(()=>({error:"Upload failed"})),Y=Error(O.error||`HTTP ${z.status}`);throw Y.status=z.status,Y.code=O.code,Y}return z.json()}async function B4(_,$,N=""){let Z=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:N})});if(!Z.ok){let K=await Z.json().catch(()=>({error:"Create failed"})),J=Error(K.error||`HTTP ${Z.status}`);throw J.status=Z.status,J.code=K.code,J}return Z.json()}async function q4(_,$){let N=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Rename failed"})),K=Error(Z.error||`HTTP ${N.status}`);throw K.status=N.status,K.code=Z.code,K}return N.json()}async function V4(_,$){let N=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Move failed"})),K=Error(Z.error||`HTTP ${N.status}`);throw K.status=N.status,K.code=Z.code,K}return N.json()}async function W4(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return a_($,{method:"DELETE"})}async function _3(_,$=!1){return a_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function g3(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function X4(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class h3{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_queued",(_)=>{this.onEvent("agent_followup_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_consumed",(_)=>{this.onEvent("agent_followup_consumed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_removed",(_)=>{this.onEvent("agent_followup_removed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,N=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,N+$),this.reconnectAttempts=0;let Z=Math.max(this.cooldownUntil-N,0),K=Math.max(this.reconnectDelay,Z);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},K),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function l0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function c_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function F2(_,$=!1){let N=l0(_);if(N===null)return $;return N==="true"}function y2(_,$=null){let N=l0(_);if(N===null)return $;let Z=parseInt(N,10);return Number.isFinite(Z)?Z:$}function e0({prefix:_="file",label:$,title:N,onRemove:Z,onClick:K,removeTitle:J="Remove",icon:j="file"}){let z=`${_}-file-pill`,O=`${_}-file-name`,Y=`${_}-file-remove`,V=j==="message"?W`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:W`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return W`
    <span class=${z} title=${N||$} onClick=${K}>
      ${V}
      <span class=${O}>${$}</span>
      ${Z&&W`
        <button
          class=${Y}
          onClick=${(B)=>{B.preventDefault(),B.stopPropagation(),Z()}}
          title=${J}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var W6=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steer",description:"Steer the current response"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function X6({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),N=_.tokens,Z=_.contextWindow,K=N!=null?`Context: ${Q4(N)} / ${Q4(Z)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,J=7,j=2*Math.PI*7,z=$/100*j,O=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return W`
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
                    stroke-dasharray=${`${z} ${j}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `}function Q4(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function U4({onPost:_,onFocus:$,searchMode:N,onSearch:Z,onEnterSearch:K,onExitSearch:J,fileRefs:j=[],onRemoveFileRef:z,onClearFileRefs:O,messageRefs:Y=[],onRemoveMessageRef:V,onClearMessageRefs:B,activeModel:C=null,modelUsage:D=null,thinkingLevel:E=null,supportsThinking:b=!1,contextUsage:m=null,notificationsEnabled:A=!1,notificationPermission:X="default",onToggleNotifications:w,onModelChange:P,onModelStateChange:f,activeEditorPath:p=null,onAttachEditorFile:i,onOpenFilePill:$_,followupQueueItems:Y_=[],onInjectQueuedFollowup:s,onRemoveQueuedFollowup:L_,onMessageResponse:y_,isAgentActive:r=!1}){let[__,e]=u(""),[a,J_]=u(""),[G_,K_]=u([]),[E_,V_]=u(!1),[X_,f_]=u([]),[R_,L0]=u(0),[P_,w_]=u(!1),[N_,D_]=u(!1),[B_,C_]=u(!1),[W_,g_]=u([]),[S_,H_]=u(!1),j_=y(null),x_=y(null),v_=y(null),t_=y(null),n_=y(0),B0=200,F_=(U)=>{let I=new Set,d=[];for(let O_ of U||[]){if(typeof O_!=="string")continue;let k_=O_.trim();if(!k_||I.has(k_))continue;I.add(k_),d.push(k_)}return d},H0=()=>{let U=l0("piclaw_compose_history");if(!U)return[];try{let I=JSON.parse(U);if(!Array.isArray(I))return[];return F_(I)}catch{return[]}},S0=(U)=>{c_("piclaw_compose_history",JSON.stringify(U))},K0=y(H0()),Y0=y(-1),o_=y(""),x0=__.trim()||G_.length>0||j.length>0||Y.length>0,F0=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),M=typeof window<"u"&&typeof Notification<"u",Z_=typeof window<"u"?Boolean(window.isSecureContext):!1,Q_=M&&Z_&&X!=="denied",q0=X==="granted"&&A,e_=q0?"Disable notifications":"Enable notifications",r_=C||"",d_=b&&E?` (${E})`:"",c0=d_.trim()?`${E}`:"",$2=typeof D?.hint_short==="string"?D.hint_short.trim():"",V0=[c0||null,$2||null].filter(Boolean).join(" • "),Y2=[r_?`Current model: ${r_}${d_}`:null,D?.plan?`Plan: ${D.plan}`:null,$2||null,D?.primary?.reset_description||null,D?.secondary?.reset_description||null].filter(Boolean),_0=N_?"Switching model…":Y2.join(" • ")||`Current model: ${r_}${d_} (tap to open model picker)`,f0=(U)=>{if(!U||typeof U!=="object")return;let I=U.model??U.current;if(typeof f==="function")f({model:I??null,thinking_level:U.thinking_level??null,supports_thinking:U.supports_thinking,provider_usage:U.provider_usage??null});if(I&&typeof P==="function")P(I)},O0=(U)=>{let I=U||j_.current;if(!I)return;I.style.height="auto",I.style.height=`${I.scrollHeight}px`,I.style.overflowY="hidden"},o0=(U)=>{if(!U.startsWith("/")||U.includes(`
`)){w_(!1),f_([]);return}let I=U.toLowerCase().split(" ")[0];if(I.length<1){w_(!1),f_([]);return}let d=W6.filter((O_)=>O_.name.startsWith(I)||O_.name.replace(/-/g,"").startsWith(I.replace(/-/g,"")));if(d.length>0&&!(d.length===1&&d[0].name===I))f_(d),L0(0),w_(!0);else w_(!1),f_([])},T0=(U)=>{let I=__,d=I.indexOf(" "),O_=d>=0?I.slice(d):"",k_=U.name+O_;e(k_),w_(!1),f_([]),requestAnimationFrame(()=>{let h_=j_.current;if(!h_)return;let q_=k_.length;h_.selectionStart=q_,h_.selectionEnd=q_,h_.focus()})},m_=(U)=>{if(N)J_(U);else e(U),o0(U);requestAnimationFrame(()=>O0())},O2=(U)=>{let I=N?a:__,d=I&&!I.endsWith(`
`)?`
`:"",O_=`${I}${d}${U}`.trimStart();m_(O_)},v0=(U)=>{let I=U?.command?.model_label;if(I)return I;let d=U?.command?.message;if(typeof d==="string"){let O_=d.match(/•\s+([^\n]+?)\s+\(current\)/);if(O_?.[1])return O_[1].trim()}return null},W0=async(U)=>{if(N||N_)return;D_(!0);try{let I=await T3("default",U,null,[]),d=v0(I);f0({model:d??C??null,thinking_level:I?.command?.thinking_level,supports_thinking:I?.command?.supports_thinking});try{let O_=await V2();if(O_)f0(O_)}catch{}return _?.(),!0}catch(I){return console.error("Failed to switch model:",I),alert("Failed to switch model: "+I.message),!1}finally{D_(!1)}},m0=async()=>{await W0("/cycle-model")},$0=async(U)=>{if(!U||N_)return;if(await W0(`/model ${U}`))C_(!1)},y0=(U)=>{U.preventDefault(),U.stopPropagation(),C_((I)=>!I)},R0=(U)=>{if(U==="queue"||U==="steer"||U==="auto")return U;return r?"queue":null},I_=async(U,I,d={})=>{let{includeMedia:O_=!0,includeFileRefs:k_=!0,includeMessageRefs:h_=!0,clearAfterSubmit:q_=!0,recordHistory:Z0=!0}=d||{},E0=typeof U==="string"?U:U&&typeof U?.target?.value==="string"?U.target.value:__,C0=typeof E0==="string"?E0:"";if(!C0.trim()&&(O_?G_.length===0:!0)&&(k_?j.length===0:!0)&&(h_?Y.length===0:!0))return;w_(!1),f_([]);let r0=O_?[...G_]:[],G2=k_?[...j]:[],W2=h_?[...Y]:[],k0=C0.trim();if(Z0&&k0){let J0=K0.current,A0=F_(J0.filter((L2)=>L2!==k0));if(A0.push(k0),A0.length>200)A0.splice(0,A0.length-200);K0.current=A0,S0(A0),Y0.current=-1,o_.current=""}if(q_)e(""),K_([]),O?.(),B?.();(async()=>{try{let J0=[];for(let T_ of r0){let j0=await Z4(T_);J0.push(j0.id)}let A0=G2.length?`Files:
${G2.map((T_)=>`- ${T_}`).join(`
`)}`:"",L2=W2.length?`Referenced messages:
${W2.map((T_)=>`- message:${T_}`).join(`
`)}`:"",u0=J0.length?`Images:
${J0.map((T_,j0)=>{let X2=r0[j0]?.name||`image-${j0+1}`;return`- attachment:${T_} (${X2})`}).join(`
`)}`:"",B2=[k0,A0,L2,u0].filter(Boolean).join(`

`),d0=await T3("default",B2,null,J0,R0(I));if(y_?.(d0),d0?.command){f0({model:d0.command.model_label??C??null,thinking_level:d0.command.thinking_level,supports_thinking:d0.command.supports_thinking});try{let T_=await V2();if(T_)f0(T_)}catch{}}_?.()}catch(J0){console.error("Failed to post:",J0)}})()},N0=(U)=>{s?.(U)},D0=(U)=>{if(U.isComposing)return;if(N&&U.key==="Escape"){U.preventDefault(),J_(""),J?.();return}if(P_&&X_.length>0){let I=j_.current?.value??(N?a:__);if(!String(I||"").startsWith("/"))w_(!1),f_([]);else{if(U.key==="ArrowDown"){U.preventDefault(),L0((d)=>(d+1)%X_.length);return}if(U.key==="ArrowUp"){U.preventDefault(),L0((d)=>(d-1+X_.length)%X_.length);return}if(U.key==="Tab"){U.preventDefault(),T0(X_[R_]);return}if(U.key==="Enter"&&!U.shiftKey){if(!(j_.current?.value??(N?a:__)).includes(" ")){U.preventDefault();let k_=X_[R_];w_(!1),f_([]),I_(k_.name);return}}if(U.key==="Escape"){U.preventDefault(),w_(!1),f_([]);return}}}if(!N&&(U.key==="ArrowUp"||U.key==="ArrowDown")&&!U.metaKey&&!U.ctrlKey&&!U.altKey&&!U.shiftKey){let I=j_.current;if(!I)return;let d=I.value||"",O_=I.selectionStart===0&&I.selectionEnd===0,k_=I.selectionStart===d.length&&I.selectionEnd===d.length;if(U.key==="ArrowUp"&&O_||U.key==="ArrowDown"&&k_){let h_=K0.current;if(!h_.length)return;U.preventDefault();let q_=Y0.current;if(U.key==="ArrowUp"){if(q_===-1)o_.current=d,q_=h_.length-1;else if(q_>0)q_-=1;Y0.current=q_,m_(h_[q_]||"")}else{if(q_===-1)return;if(q_<h_.length-1)q_+=1,Y0.current=q_,m_(h_[q_]||"");else Y0.current=-1,m_(o_.current||""),o_.current=""}requestAnimationFrame(()=>{let Z0=j_.current;if(!Z0)return;let E0=Z0.value.length;Z0.selectionStart=E0,Z0.selectionEnd=E0});return}}if(U.key==="Enter"&&!U.shiftKey&&(U.ctrlKey||U.metaKey)){U.preventDefault();let I=j_.current?.value??(N?a:__);if(N){if(I.trim())Z?.(I.trim())}else I_(I,"steer");return}if(U.key==="Enter"&&!U.shiftKey){U.preventDefault();let I=j_.current?.value??(N?a:__);if(N){if(I.trim())Z?.(I.trim())}else I_(I)}},X0=(U)=>{let I=Array.from(U||[]).filter((d)=>d&&d.type&&d.type.startsWith("image/"));if(!I.length)return;K_((d)=>[...d,...I])},b0=(U)=>{X0(U.target.files),U.target.value=""},g0=(U)=>{if(N)return;U.preventDefault(),U.stopPropagation(),n_.current+=1,V_(!0)},N2=(U)=>{if(N)return;if(U.preventDefault(),U.stopPropagation(),n_.current=Math.max(0,n_.current-1),n_.current===0)V_(!1)},Q0=(U)=>{if(N)return;if(U.preventDefault(),U.stopPropagation(),U.dataTransfer)U.dataTransfer.dropEffect="copy";V_(!0)},E2=(U)=>{if(N)return;U.preventDefault(),U.stopPropagation(),n_.current=0,V_(!1),X0(U.dataTransfer?.files||[])},U0=(U)=>{if(N)return;let I=U.clipboardData?.items;if(!I||!I.length)return;let d=[];for(let O_ of I){if(O_.kind!=="file")continue;let k_=O_.getAsFile?.();if(k_)d.push(k_)}if(d.length>0)U.preventDefault(),X0(d)},I0=(U)=>{K_((I)=>I.filter((d,O_)=>O_!==U))},h0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((U)=>{let{latitude:I,longitude:d,accuracy:O_}=U.coords,k_=`${I.toFixed(5)}, ${d.toFixed(5)}`,h_=Number.isFinite(O_)?` ±${Math.round(O_)}m`:"",q_=`https://maps.google.com/?q=${I},${d}`,Z0=`Location: ${k_}${h_} ${q_}`;O2(Z0)},(U)=>{let I=U?.message||"Unable to retrieve location.";alert(`Location error: ${I}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};R(()=>{if(!B_)return;H_(!0),V2().then((U)=>{let I=Array.isArray(U?.models)?U.models.filter((d)=>typeof d==="string"&&d.trim().length>0):[];g_(I),f0(U)}).catch((U)=>{console.warn("Failed to load model list:",U),g_([])}).finally(()=>{H_(!1)})},[B_,C]),R(()=>{if(N)C_(!1)},[N]),R(()=>{if(!B_)return;let U=(I)=>{let d=v_.current,O_=t_.current,k_=I.target;if(d&&d.contains(k_))return;if(O_&&O_.contains(k_))return;C_(!1)};return document.addEventListener("pointerdown",U),()=>document.removeEventListener("pointerdown",U)},[B_]);let Z2=(U)=>{let I=U.target.value;O0(U.target),m_(I)};return R(()=>{requestAnimationFrame(()=>O0())},[__,a,N]),W`
        <div class="compose-box">
            ${!N&&Y_.length>0&&W`
                <div class="compose-queue-stack">
                    ${Y_.map((U)=>{let I=typeof U?.content==="string"?U.content:"";if(!I.trim())return null;return W`
                            <div class="compose-queue-stack-item" role="listitem">
                                <span class="compose-queue-stack-content" title=${I}>
                                    ${I}
                                </span>
                                <button
                                    class="compose-queue-stack-steer-btn"
                                    type="button"
                                    title="Inject queued follow-up as steer"
                                    onClick=${()=>N0(U)}
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
                                    onClick=${()=>L_?.(U)}
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
                class=${`compose-input-wrapper${E_?" drag-active":""}`}
                onDragEnter=${g0}
                onDragOver=${Q0}
                onDragLeave=${N2}
                onDrop=${E2}
            >
                <div class="compose-input-main">
                    ${(j.length>0||G_.length>0||Y.length>0)&&W`
                        <div class="compose-file-refs">
                            ${Y.map((U)=>{return W`
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
                            ${j.map((U)=>{let I=U.split("/").pop()||U;return W`
                                    <${e0}
                                        prefix="compose"
                                        label=${I}
                                        title=${U}
                                        onClick=${()=>$_?.(U)}
                                        removeTitle="Remove file"
                                        onRemove=${()=>z?.(U)}
                                    />
                                `})}
                            ${G_.map((U,I)=>{let d=U?.name||`image-${I+1}`;return W`
                                    <${e0}
                                        key=${d+I}
                                        prefix="compose"
                                        label=${d}
                                        title=${d}
                                        removeTitle="Remove image"
                                        onRemove=${()=>I0(I)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${j_}
                        placeholder=${N?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${N?a:__}
                        onInput=${Z2}
                        onKeyDown=${D0}
                        onPaste=${U0}
                        onFocus=${$}
                        onClick=${$}
                        rows="1"
                    />
                    ${P_&&X_.length>0&&W`
                        <div class="slash-autocomplete" ref=${x_}>
                            ${X_.map((U,I)=>W`
                                <div
                                    key=${U.name}
                                    class=${`slash-item${I===R_?" active":""}`}
                                    onMouseDown=${(d)=>{d.preventDefault(),T0(U)}}
                                    onMouseEnter=${()=>L0(I)}
                                >
                                    <span class="slash-name">${U.name}</span>
                                    <span class="slash-desc">${U.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${B_&&!N&&W`
                        <div class="compose-model-popup" ref=${v_}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${S_&&W`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!S_&&W_.length===0&&W`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!S_&&W_.map((U)=>W`
                                    <button
                                        key=${U}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${C===U?" active":""}`}
                                        onClick=${()=>{$0(U)}}
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
                    ${!N&&C&&W`
                    <div class="compose-meta-row">
                        ${!N&&C&&W`
                            <div class="compose-model-meta">
                                <button
                                    ref=${t_}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${_0}
                                    aria-label="Open model picker"
                                    onClick=${y0}
                                    disabled=${N_}
                                >
                                    ${N_?"Switching…":r_}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!N_&&V0&&W`
                                        <span class="compose-model-usage-hint" title=${_0}>
                                            ${V0}
                                        </span>
                                    `}
                                </div>
                            </div>
                        `}
                    </div>
                    `}
                    <div class="compose-actions ${N?"search-mode":""}">
                    ${!N&&m&&m.percent!=null&&W`
                        <${X6} usage=${m} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${N?J:K}
                        title=${N?"Close search":"Search"}
                    >
                        ${N?W`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        `:W`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        `}
                    </button>
                    ${F0&&!N&&W`
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
                    ${Q_&&!N&&W`
                        <button
                            class=${`icon-btn notification-btn${q0?" active":""}`}
                            onClick=${w}
                            title=${e_}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!N&&W`
                        ${p&&i&&W`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${i}
                                title=${`Attach open file: ${p}`}
                                type="button"
                                disabled=${j.includes(p)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${b0} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{I_()}}
                            disabled=${!x0}
                            title="Send (Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var F4="piclaw_theme",n3="piclaw_tint",Z3={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},Q6={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},H4={default:{label:"Default",mode:"auto",light:Z3,dark:Q6},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},U6=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],J3={theme:"default",tint:null},y4="light",p3=!1;function D4(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function D2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let N=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(N)&&!/^[0-9a-fA-F]{6}$/.test(N))return null;let Z=N.length===3?N.split("").map((J)=>J+J).join(""):N,K=parseInt(Z,16);return{r:K>>16&255,g:K>>8&255,b:K&255,hex:`#${Z.toLowerCase()}`}}function H6(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let N=document.createElement("div");if(N.style.color="",N.style.color=$,!N.style.color)return null;let Z=N.style.color;try{if(document.body)N.style.display="none",document.body.appendChild(N),Z=getComputedStyle(N).color||N.style.color,document.body.removeChild(N)}catch{}let K=Z.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!K)return null;let J=parseInt(K[1],10),j=parseInt(K[2],10),z=parseInt(K[3],10);if(![J,j,z].every((Y)=>Number.isFinite(Y)))return null;let O=`#${[J,j,z].map((Y)=>Y.toString(16).padStart(2,"0")).join("")}`;return{r:J,g:j,b:z,hex:O}}function C4(_){return D2(_)||H6(_)}function f2(_,$,N){let Z=Math.round(_.r+($.r-_.r)*N),K=Math.round(_.g+($.g-_.g)*N),J=Math.round(_.b+($.b-_.b)*N);return`rgb(${Z} ${K} ${J})`}function i3(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function k4(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function l3(_){return H4[_]||H4.default}function F6(_){return _.mode==="auto"?k4():_.mode}function y6(_,$){let N=l3(_);if($==="dark"&&N.dark)return N.dark;if($==="light"&&N.light)return N.light;return N.dark||N.light||Z3}function D6(_,$,N){let Z=C4($);if(!Z)return _;let K=D2(_.bgPrimary),J=D2(_.bgSecondary),j=D2(_.bgHover),z=D2(_.borderColor);if(!K||!J||!j||!z)return _;let Y=D2(N==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:f2(K,Z,0.08),bgSecondary:f2(J,Z,0.12),bgHover:f2(j,Z,0.16),borderColor:f2(z,Z,0.08),accent:Z.hex,accentHover:Y?f2(Z,Y,0.18):Z.hex}}function C6(_,$){if(typeof document>"u")return;let N=document.documentElement,Z=_.accent,K=C4(Z),J=K?i3(K,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,j=K?i3(K,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",z=K?i3(K,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",O={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":Z,"--accent-hover":_.accentHover||Z,"--accent-soft":j,"--accent-soft-strong":z,"--danger-color":_.danger||Z3.danger,"--success-color":_.success||Z3.success,"--search-highlight-color":J||"rgba(29, 155, 240, 0.2)"};Object.entries(O).forEach(([Y,V])=>{if(V)N.style.setProperty(Y,V)})}function k6(){if(typeof document>"u")return;let _=document.documentElement;U6.forEach(($)=>_.style.removeProperty($))}function $3(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function b6(_,$){if(typeof document>"u")return;let N=$3("theme-color");if(N&&_)N.setAttribute("content",_);let Z=$3("msapplication-TileColor");if(Z&&_)Z.setAttribute("content",_);let K=$3("msapplication-navbutton-color");if(K&&_)K.setAttribute("content",_);let J=$3("apple-mobile-web-app-status-bar-style");if(J)J.setAttribute("content",$==="dark"?"black-translucent":"default")}function E6(){if(typeof window>"u")return;let _={...J3,mode:y4};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function o3(_,$={}){if(typeof window>"u"||typeof document>"u")return;let N=D4(_?.theme||"default"),Z=_?.tint?String(_.tint).trim():null,K=l3(N),J=F6(K),j=y6(N,J);J3={theme:N,tint:Z},y4=J;let z=document.documentElement;z.dataset.theme=J,z.dataset.colorTheme=N,z.dataset.tint=Z?String(Z):"",z.style.colorScheme=J;let O=j;if(N==="default"&&Z)O=D6(j,Z,J);if(N==="default"&&!Z)k6();else C6(O,J);if(b6(O.bgPrimary,J),E6(),$.persist!==!1)if(c_(F4,N),Z)c_(n3,Z);else c_(n3,"")}function N3(){if(l3(J3.theme).mode!=="auto")return;o3(J3,{persist:!1})}function b4(){if(typeof window>"u")return()=>{};let _=D4(l0(F4)||"default"),$=l0(n3),N=$?$.trim():null;if(o3({theme:_,tint:N},{persist:!1}),window.matchMedia&&!p3){let Z=window.matchMedia("(prefers-color-scheme: dark)");if(Z.addEventListener)Z.addEventListener("change",N3);else if(Z.addListener)Z.addListener(N3);return p3=!0,()=>{if(Z.removeEventListener)Z.removeEventListener("change",N3);else if(Z.removeListener)Z.removeListener(N3);p3=!1}}return()=>{}}function E4(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let N=_.theme??_.name??_.colorTheme,Z=_.tint??null;o3({theme:N||"default",tint:Z},{persist:!0})}function A4(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return k4()}var K3=/#(\w+)/g,A6=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),w6=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),M6=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),P6={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},S6=new Set(["http:","https:","mailto:",""]);function w4(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function C2(_,$={}){if(!_)return null;let N=String(_).trim();if(!N)return null;if(N.startsWith("#")||N.startsWith("/"))return N;if(N.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(N))return N;return null}if(N.startsWith("blob:"))return N;try{let Z=new URL(N,typeof window<"u"?window.location.origin:"http://localhost");if(!S6.has(Z.protocol))return null;return Z.href}catch{return null}}function M4(_,$={}){if(!_)return"";let N=new DOMParser().parseFromString(_,"text/html"),Z=[],K=N.createTreeWalker(N.body,NodeFilter.SHOW_ELEMENT),J;while(J=K.nextNode())Z.push(J);for(let j of Z){let z=j.tagName.toLowerCase();if(!w6.has(z)){let Y=j.parentNode;if(!Y)continue;while(j.firstChild)Y.insertBefore(j.firstChild,j);Y.removeChild(j);continue}let O=P6[z]||new Set;for(let Y of Array.from(j.attributes)){let V=Y.name.toLowerCase(),B=Y.value;if(V.startsWith("on")){j.removeAttribute(Y.name);continue}if(V.startsWith("data-")||V.startsWith("aria-"))continue;if(O.has(V)||M6.has(V)){if(V==="href"){let C=C2(B);if(!C)j.removeAttribute(Y.name);else if(j.setAttribute(Y.name,C),z==="a"&&!j.getAttribute("rel"))j.setAttribute("rel","noopener noreferrer")}else if(V==="src"){let C=z==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(B):B,D=C2(C,{allowDataImage:z==="img"});if(!D)j.removeAttribute(Y.name);else j.setAttribute(Y.name,D)}continue}j.removeAttribute(Y.name)}}return N.body.innerHTML}function P4(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function j3(_,$=2){if(!_)return _;let N=_;for(let Z=0;Z<$;Z+=1){let K=P4(N);if(K===N)break;N=K}return N}function x6(_){if(!_)return{text:"",blocks:[]};let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],K=[],J=!1,j=[];for(let z of N){if(!J&&z.trim().match(/^```mermaid\s*$/i)){J=!0,j=[];continue}if(J&&z.trim().match(/^```\s*$/)){let O=Z.length;Z.push(j.join(`
`)),K.push(`@@MERMAID_BLOCK_${O}@@`),J=!1,j=[];continue}if(J)j.push(z);else K.push(z)}if(J)K.push("```mermaid"),K.push(...j);return{text:K.join(`
`),blocks:Z}}function f6(_){if(!_)return _;return j3(_,5)}function T6(_){let $=new TextEncoder().encode(String(_||"")),N="";for(let Z of $)N+=String.fromCharCode(Z);return btoa(N)}function I6(_){let $=atob(String(_||"")),N=new Uint8Array($.length);for(let Z=0;Z<$.length;Z+=1)N[Z]=$.charCodeAt(Z);return new TextDecoder().decode(N)}function u6(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(N,Z)=>{let K=Number(Z),J=$[K]??"",j=f6(J);return`<div class="mermaid-container" data-mermaid="${T6(j)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function S4(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,N)=>{if(N.includes(`
`))return`
\`\`\`
${N}
\`\`\`
`;return`\`${N}\``})}function x4(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,N)=>{let Z=N.trim(),K=Z.startsWith("/"),J=K?Z.slice(1).trim():Z,O=(J.endsWith("/")?J.slice(0,-1).trim():J).split(/\s+/)[0]?.toLowerCase();if(!O||!A6.has(O))return $;if(O==="br")return K?"":"<br>";if(K)return`</${O}>`;return`<${O}>`})}function f4(_){if(!_)return _;let $=(N)=>N.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(N,Z)=>`<pre><code>${$(Z)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(N,Z)=>`<code>${$(Z)}</code>`)}function T4(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),N=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=(J)=>J.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),K;while(K=N.nextNode()){if(!K.nodeValue)continue;let J=Z(K.nodeValue);if(J!==K.nodeValue)K.nodeValue=J}return $.body.innerHTML}function c6(_){if(!window.katex)return _;let $=(j)=>P4(j).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),N=(j)=>{let z=[],O=j.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(Y)=>{let V=z.length;return z.push(Y),`@@CODE_BLOCK_${V}@@`});return O=O.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(Y)=>{let V=z.length;return z.push(Y),`@@CODE_INLINE_${V}@@`}),{html:O,blocks:z}},Z=(j,z)=>{if(!z.length)return j;return j.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(O,Y)=>{let V=Number(Y);return z[V]??""})},K=N(_),J=K.html;return J=J.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(j,z,O)=>{try{let Y=katex.renderToString($(O.trim()),{displayMode:!0,throwOnError:!1});return`${z}${Y}`}catch(Y){return`<span class="math-error" title="${w4(Y.message)}">${j}</span>`}}),J=J.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(j,z,O)=>{if(/\s$/.test(O))return j;try{let Y=katex.renderToString($(O),{displayMode:!1,throwOnError:!1});return`${z}${Y}`}catch(Y){return`${z}<span class="math-error" title="${w4(Y.message)}">$${O}$</span>`}}),Z(J,K.blocks)}function v6(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),N=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=[],K;while(K=N.nextNode())Z.push(K);for(let J of Z){let j=J.nodeValue;if(!j)continue;if(K3.lastIndex=0,!K3.test(j))continue;K3.lastIndex=0;let z=J.parentElement;if(z&&(z.closest("a")||z.closest("code")||z.closest("pre")))continue;let O=j.split(K3);if(O.length<=1)continue;let Y=$.createDocumentFragment();O.forEach((V,B)=>{if(B%2===1){let C=$.createElement("a");C.setAttribute("href","#"),C.className="hashtag",C.setAttribute("data-hashtag",V),C.textContent=`#${V}`,Y.appendChild(C)}else Y.appendChild($.createTextNode(V))}),J.parentNode?.replaceChild(Y,J)}return $.body.innerHTML}function m6(_){if(!_)return _;let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],K=!1;for(let J of N){if(!K&&J.trim().match(/^```(?:math|katex|latex)\s*$/i)){K=!0,Z.push("$$");continue}if(K&&J.trim().match(/^```\s*$/)){K=!1,Z.push("$$");continue}Z.push(J)}return Z.join(`
`)}function j2(_,$,N={}){if(!_)return"";let Z=m6(_),{text:K,blocks:J}=x6(Z),j=j3(K,2),O=S4(j).replace(/</g,"&lt;").replace(/>/g,"&gt;"),Y=x4(O),V=window.marked?marked.parse(Y,{headerIds:!1,mangle:!1}):Y.replace(/\n/g,"<br>");return V=f4(V),V=T4(V),V=c6(V),V=v6(V),V=u6(V,J),V=M4(V,N),V}function I4(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),N=j3($,2),K=S4(N).replace(/</g,"&lt;").replace(/>/g,"&gt;"),J=x4(K),j=window.marked?marked.parse(J):J.replace(/\n/g,"<br>");return j=f4(j),j=T4(j),j=M4(j),j}async function k2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:N}=window.beautifulMermaid,K=A4()==="dark"?N["tokyo-night"]:N["github-light"],J=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let j of J)try{let z=j.dataset.mermaid,O=I6(z||""),Y=j3(O,2),V=await $(Y,{...K,transparent:!0});j.innerHTML=V,j.removeAttribute("data-mermaid")}catch(z){console.error("Mermaid render error:",z);let O=document.createElement("pre");O.className="mermaid-error",O.textContent=`Diagram error: ${z.message}`,j.innerHTML="",j.appendChild(O),j.removeAttribute("data-mermaid")}}var u4="PiClaw";function r3(_,$){let N=_||"PiClaw",Z=N.charAt(0).toUpperCase(),K=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],J=Z.charCodeAt(0)%K.length,j=K[J],z=N.trim().toLowerCase(),O=typeof $==="string"?$.trim():"",V=(O?O:null)||(z==="PiClaw".toLowerCase()||z==="pi"?"/static/icon-192.png":null);return{letter:Z,color:j,image:V}}function c4(_,$){if(!_)return"PiClaw";let N=$[_]?.name||_;return N?N.charAt(0).toUpperCase()+N.slice(1):"PiClaw"}function v4(_,$){if(!_)return null;let N=$[_]||{};return N.avatar_url||N.avatarUrl||N.avatar||null}function m4(_){if(!_)return null;if(typeof document<"u"){let J=document.documentElement,j=J?.dataset?.colorTheme||"",z=J?.dataset?.tint||"",O=getComputedStyle(J).getPropertyValue("--accent-color")?.trim();if(O&&(z||j&&j!=="default"))return O}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],N=String(_),Z=0;for(let J=0;J<N.length;J+=1)Z=(Z*31+N.charCodeAt(J))%2147483647;let K=Math.abs(Z)%$.length;return $[K]}function R6(_){if(!_||typeof _!=="object")return null;let $=_.started_at??_.startedAt;if(typeof $!=="string"||!$)return null;let N=Date.parse($);return Number.isFinite(N)?N:null}function z3(_){if(!_||typeof _!=="object")return!1;let $=_.intent_key??_.intentKey;return _.type==="intent"&&$==="compaction"}function g6(_){let $=Math.max(0,Math.floor(_/1000)),N=$%60,Z=Math.floor($/60)%60,K=Math.floor($/3600);if(K>0)return`${K}:${String(Z).padStart(2,"0")}:${String(N).padStart(2,"0")}`;return`${Z}:${String(N).padStart(2,"0")}`}function R4(_,$=Date.now()){let N=R6(_);if(N===null)return null;return g6(Math.max(0,$-N))}function g4({status:_,draft:$,plan:N,thought:Z,pendingRequest:K,intent:J,turnId:j,steerQueued:z,onPanelToggle:O}){let B=(N_)=>{if(!N_)return{text:"",totalLines:0,fullText:""};if(typeof N_==="string"){let W_=N_,g_=W_?W_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:W_,totalLines:g_,fullText:W_}}let D_=N_.text||"",B_=N_.fullText||N_.full_text||D_,C_=Number.isFinite(N_.totalLines)?N_.totalLines:B_?B_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:D_,totalLines:C_,fullText:B_}},C=160,D=(N_)=>{if(!N_)return 1;return Math.max(1,Math.ceil(N_.length/160))},E=(N_,D_,B_)=>{let C_=(N_||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!C_)return{text:"",omitted:0,totalLines:Number.isFinite(B_)?B_:0,visibleLines:0};let W_=C_.split(`
`),g_=W_.length>D_?W_.slice(0,D_).join(`
`):C_,S_=Number.isFinite(B_)?B_:W_.reduce((x_,v_)=>x_+D(v_),0),H_=g_?g_.split(`
`).reduce((x_,v_)=>x_+D(v_),0):0,j_=Math.max(S_-H_,0);return{text:g_,omitted:j_,totalLines:S_,visibleLines:H_}},b=B(N),m=B(Z),A=B($),X=Boolean(b.text)||b.totalLines>0,w=Boolean(m.text)||m.totalLines>0,P=Boolean(A.fullText?.trim()||A.text?.trim());if(!_&&!P&&!X&&!w&&!K&&!J)return null;let[f,p]=u(new Set),[i,$_]=u(()=>Date.now()),Y_=(N_)=>p((D_)=>{let B_=new Set(D_),C_=!B_.has(N_);if(C_)B_.add(N_);else B_.delete(N_);if(typeof O==="function")O(N_,C_);return B_});R(()=>{p(new Set)},[j]);let s=z3(_);R(()=>{if(!s)return;$_(Date.now());let N_=setInterval(()=>$_(Date.now()),1000);return()=>clearInterval(N_)},[s,_?.started_at,_?.startedAt]);let L_=_?.turn_id||j,y_=m4(L_),r=z?"turn-dot turn-dot-queued":"turn-dot",__=(N_)=>N_,e=Boolean(_?.last_activity||_?.lastActivity),a=(N_)=>N_==="warning"?"#f59e0b":N_==="error"?"var(--danger-color)":N_==="success"?"var(--success-color)":y_,J_=J?.kind||"info",G_=a(J_),K_=a(_?.kind||(s?"warning":"info")),E_="",V_=_?.title,X_=_?.status;if(_?.type==="plan")E_=V_?`Planning: ${V_}`:"Planning...";else if(_?.type==="tool_call")E_=V_?`Running: ${V_}`:"Running tool...";else if(_?.type==="tool_status")E_=V_?`${V_}: ${X_||"Working..."}`:X_||"Working...";else if(_?.type==="error")E_=V_||"Agent error";else E_=V_||X_||"Working...";if(e)E_="Last activity just now";let f_=({panelTitle:N_,text:D_,fullText:B_,totalLines:C_,maxLines:W_,titleClass:g_,panelKey:S_})=>{let H_=f.has(S_),j_=B_||D_||"",x_=typeof W_==="number",v_=H_&&x_,t_=x_?E(j_,W_,C_):{text:j_||"",omitted:0,totalLines:Number.isFinite(C_)?C_:0};if(!j_&&!(Number.isFinite(t_.totalLines)&&t_.totalLines>0))return null;let n_=`agent-thinking-body${x_?" agent-thinking-body-collapsible":""}`,B0=x_?`--agent-thinking-collapsed-lines: ${W_};`:"";return W`
            <div
                class="agent-thinking"
                data-expanded=${H_?"true":"false"}
                data-collapsible=${x_?"true":"false"}
                style=${y_?`--turn-color: ${y_};`:""}
            >
                <div class="agent-thinking-title ${g_||""}">
                    ${y_&&W`<span class=${r} aria-hidden="true"></span>`}
                    ${N_}
                    ${v_&&W`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${N_} panel`}
                            onClick=${()=>Y_(S_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${n_}
                    style=${B0}
                    dangerouslySetInnerHTML=${{__html:I4(j_)}}
                />
                ${!H_&&t_.omitted>0&&W`
                    <button class="agent-thinking-truncation" onClick=${()=>Y_(S_)}>
                        ▸ ${t_.omitted} more lines
                    </button>
                `}
                ${H_&&t_.omitted>0&&W`
                    <button class="agent-thinking-truncation" onClick=${()=>Y_(S_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},R_=K?.tool_call?.title,L0=R_?`Awaiting approval: ${R_}`:"Awaiting approval",P_=s?R4(_,i):null,w_=(N_,D_,B_=null)=>W`
        <div
            class="agent-thinking agent-thinking-intent"
            aria-live="polite"
            style=${D_?`--turn-color: ${D_};`:""}
            title=${N_?.detail||""}
        >
            <div class="agent-thinking-title intent">
                ${D_&&W`<span class=${r} aria-hidden="true"></span>`}
                <span class="agent-thinking-title-text">${N_.title}</span>
                ${B_&&W`<span class="agent-status-elapsed">${B_}</span>`}
            </div>
            ${N_.detail&&W`<div class="agent-thinking-body">${N_.detail}</div>`}
        </div>
    `;return W`
        <div class="agent-status-panel">
            ${J&&w_(J,G_)}
            ${_?.type==="intent"&&w_(_,K_,P_)}
            ${K&&W`
                <div class="agent-status agent-status-request" aria-live="polite" style=${y_?`--turn-color: ${y_};`:""}>
                    <span class=${r} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${L0}</span>
                </div>
            `}
            ${X&&f_({panelTitle:__("Planning"),text:b.text,fullText:b.fullText,totalLines:b.totalLines,panelKey:"plan"})}
            ${w&&f_({panelTitle:__("Thoughts"),text:m.text,fullText:m.fullText,totalLines:m.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${P&&f_({panelTitle:__("Draft"),text:A.text,fullText:A.fullText,totalLines:A.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&_?.type!=="intent"&&W`
                <div class=${`agent-status${e?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${y_?`--turn-color: ${y_};`:""}>
                    ${y_&&W`<span class=${r} aria-hidden="true"></span>`}
                    ${_?.type==="error"?W`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!e&&W`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${E_}</span>
                </div>
            `}
        </div>
    `}function h4({request:_,onRespond:$}){if(!_)return null;let{request_id:N,tool_call:Z,options:K}=_,J=Z?.title||"Agent Request",j=Z?.kind||"other",z=Z?.rawInput||{},O=z.command||z.commands&&z.commands[0]||null,Y=z.diff||null,V=z.fileName||z.path||null,B=Z?.description||z.description||z.explanation||null,D=(Array.isArray(Z?.locations)?Z.locations:[]).map((X)=>X?.path).filter((X)=>Boolean(X)),E=Array.from(new Set([V,...D].filter(Boolean)));console.log("AgentRequestModal:",{request_id:N,tool_call:Z,options:K});let b=async(X)=>{try{await m3(N,X),$()}catch(w){console.error("Failed to respond to agent request:",w)}},m=async()=>{try{await J4(J,`Auto-approved: ${J}`),await m3(N,"approved"),$()}catch(X){console.error("Failed to add to whitelist:",X)}},A=K&&K.length>0;return W`
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
                ${(B||O||Y||E.length>0)&&W`
                    <div class="agent-request-body">
                        ${B&&W`
                            <div class="agent-request-description">${B}</div>
                        `}
                        ${E.length>0&&W`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${E.map((X,w)=>W`<li key=${w}>${X}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${O&&W`
                            <pre class="agent-request-command">${O}</pre>
                        `}
                        ${Y&&W`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${Y}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${A?K.map((X)=>W`
                            <button 
                                key=${X.optionId||X.id||String(X)}
                                class="agent-request-btn ${X.kind==="allow_once"||X.kind==="allow_always"?"primary":""}"
                                onClick=${()=>b(X.optionId||X.id||X)}
                            >
                                ${X.name||X.label||X.optionId||X.id||String(X)}
                            </button>
                        `):W`
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
    `}function p4({status:_}){if(_==="connected")return null;return W`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function i4(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let Z=new Date-$,K=Z/1000,J=86400000;if(Z<J){if(K<60)return"just now";if(K<3600)return`${Math.floor(K/60)}m`;return`${Math.floor(K/3600)}h`}if(Z<5*J){let O=$.toLocaleDateString(void 0,{weekday:"short"}),Y=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${O} ${Y}`}let j=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),z=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${j} ${z}`}function T2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function P0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function b2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}var h6=new Set(["application/json","application/xml","text/csv","text/html","text/markdown","text/plain","text/xml"]),p6=new Set(["text/markdown"]);function I2(_){let $=typeof _==="string"?_.trim().toLowerCase():"";if(!$)return"unsupported";if($.startsWith("image/"))return"image";if($==="application/pdf")return"pdf";if(h6.has($)||$.startsWith("text/"))return"text";return"unsupported"}function n4(_){let $=typeof _==="string"?_.trim().toLowerCase():"";return p6.has($)}function l4(_){switch(_){case"image":return"Image preview";case"pdf":return"PDF preview";case"text":return"Text preview";default:return"Preview unavailable"}}function o4(){let _=getComputedStyle(document.documentElement),$=(V,B)=>_.getPropertyValue(V).trim()||B,N=$("--color-text","#e0e0e0"),Z=$("--color-text-muted","#999"),K=$("--color-bg-secondary","#1e1e2e"),J=$("--color-accent","#89b4fa"),j=$("--color-success","#a6e3a1"),z=$("--color-warning","#f9e2af"),O=$("--color-error","#f38ba8");return{fontFamily:$("--font-family","system-ui, sans-serif"),containerStyles:{default:{backgroundColor:K,foregroundColors:{default:{default:N,subtle:Z},accent:{default:J,subtle:J},good:{default:j,subtle:j},warning:{default:z,subtle:z},attention:{default:O,subtle:O}}},emphasis:{backgroundColor:$("--color-bg-tertiary","#2a2a3e"),foregroundColors:{default:{default:N,subtle:Z},accent:{default:J,subtle:J},good:{default:j,subtle:j},warning:{default:z,subtle:z},attention:{default:O,subtle:O}}}},actions:{actionsOrientation:"horizontal",actionAlignment:"left",buttonSpacing:8,maxActions:5,showCard:{actionMode:"inline"},spacing:"default"},adaptiveCard:{allowCustomStyle:!1},spacing:{small:4,default:8,medium:12,large:16,extraLarge:24,padding:12},separator:{lineThickness:1,lineColor:Z},fontSizes:{small:12,default:14,medium:16,large:18,extraLarge:22},fontWeights:{lighter:300,default:400,bolder:600},imageSizes:{small:40,medium:80,large:120},textBlock:{headingLevel:2}}}var i6=new Set(["1.0","1.1","1.2","1.3","1.4","1.5","1.6"]),r4=!1,Y3=null;async function n6(){if(r4)return;if(Y3)return Y3;return Y3=new Promise((_,$)=>{let N=document.createElement("script");N.src="/static/js/vendor/adaptivecards.min.js",N.onload=()=>{r4=!0,_()},N.onerror=()=>$(Error("Failed to load adaptivecards SDK")),document.head.appendChild(N)}),Y3}function l6(){return globalThis.AdaptiveCards}function o6(_){if(!_||typeof _!=="object")return!1;let $=_;return $.type==="adaptive_card"&&typeof $.card_id==="string"&&typeof $.schema_version==="string"&&typeof $.payload==="object"&&$.payload!==null}function r6(_){return i6.has(_)}function d4(_){if(!Array.isArray(_))return[];return _.filter(o6)}async function s4(_,$,N){if(!r6($.schema_version))return console.warn(`[adaptive-card] Unsupported schema version ${$.schema_version} for card ${$.card_id}`),!1;try{await n6()}catch(Z){return console.error("[adaptive-card] Failed to load SDK:",Z),!1}try{let Z=l6(),K=new Z.AdaptiveCard;K.hostConfig=new Z.HostConfig(o4()),K.parse($.payload),K.onExecuteAction=(j)=>{if(N?.onAction)N.onAction(j);else console.log("[adaptive-card] Action executed (not wired yet):",j)};let J=K.render();if(!J)return console.warn(`[adaptive-card] Card ${$.card_id} rendered to null`),!1;if(_.classList.add("adaptive-card-container"),$.state!=="active")_.classList.add("adaptive-card-finished");return _.appendChild(J),!0}catch(Z){return console.error(`[adaptive-card] Failed to render card ${$.card_id}:`,Z),!1}}function d6(_){let $=_?.metadata?.size;return[{label:"Type",value:_?.content_type||"application/octet-stream"},{label:"Size",value:typeof $==="number"?P0($):null},{label:"Added",value:_?.created_at?b2(_.created_at):null}].filter((Z)=>Z.value)}function a4({mediaId:_,info:$,onClose:N}){let Z=$?.filename||`attachment-${_}`,K=s_(()=>I2($?.content_type),[$?.content_type]),J=l4(K),j=s_(()=>n4($?.content_type),[$?.content_type]),[z,O]=u(K==="text"||K==="pdf"),[Y,V]=u(""),[B,C]=u(null),[D,E]=u(null),b=y(null),m=s_(()=>d6($),[$]),A=s_(()=>{if(!j||!Y)return"";return j2(Y)},[j,Y]);return R(()=>{let X=(w)=>{if(w.key==="Escape")N()};return document.addEventListener("keydown",X),()=>document.removeEventListener("keydown",X)},[N]),R(()=>{if(!b.current||!A)return;k2(b.current);return},[A]),R(()=>{let X=!1,w=null;async function P(){if(K==="text"){O(!0),E(null);try{let f=await Y4(_);if(!X)V(f)}catch{if(!X)E("Failed to load text preview.")}finally{if(!X)O(!1)}return}if(K==="pdf"){O(!0),E(null);try{let f=await O4(_);if(w=URL.createObjectURL(f),!X)C(w)}catch{if(!X)E("Failed to load PDF preview.")}finally{if(!X)O(!1)}return}O(!1)}return P(),()=>{if(X=!0,w)URL.revokeObjectURL(w)}},[_,K]),W`
        <div class="image-modal attachment-preview-modal" onClick=${N}>
            <div class="attachment-preview-shell" onClick=${(X)=>{X.stopPropagation()}}>
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
                            onClick=${(X)=>X.stopPropagation()}
                        >
                            Download
                        </a>
                        <button class="attachment-preview-close" type="button" onClick=${N}>Close</button>
                    </div>
                </div>
                <div class="attachment-preview-body">
                    ${z&&W`<div class="attachment-preview-state">Loading preview…</div>`}
                    ${!z&&D&&W`<div class="attachment-preview-state">${D}</div>`}
                    ${!z&&!D&&K==="image"&&W`
                        <img class="attachment-preview-image" src=${n0(_)} alt=${Z} />
                    `}
                    ${!z&&!D&&K==="pdf"&&B&&W`
                        <iframe class="attachment-preview-frame" src=${B} title=${Z}></iframe>
                    `}
                    ${!z&&!D&&K==="text"&&j&&W`
                        <div
                            ref=${b}
                            class="attachment-preview-markdown post-content"
                            dangerouslySetInnerHTML=${{__html:A}}
                        />
                    `}
                    ${!z&&!D&&K==="text"&&!j&&W`
                        <pre class="attachment-preview-text">${Y}</pre>
                    `}
                    ${!z&&!D&&K==="unsupported"&&W`
                        <div class="attachment-preview-state">
                            Preview is not available for this file type yet. You can still download it directly.
                        </div>
                    `}
                </div>
                <div class="attachment-preview-meta">
                    ${m.map((X)=>W`
                        <div class="attachment-preview-meta-item" key=${X.label}>
                            <span class="attachment-preview-meta-label">${X.label}</span>
                            <span class="attachment-preview-meta-value">${X.value}</span>
                        </div>
                    `)}
                </div>
            </div>
        </div>
    `}function t4({src:_,onClose:$}){return R(()=>{let N=(Z)=>{if(Z.key==="Escape")$()};return document.addEventListener("keydown",N),()=>document.removeEventListener("keydown",N)},[$]),W`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function s6({mediaId:_,onPreview:$}){let[N,Z]=u(null);if(R(()=>{x2(_).then(Z).catch(()=>{})},[_]),!N)return null;let K=N.filename||"file",J=N.metadata?.size,j=J?P0(J):"",O=I2(N.content_type)==="unsupported"?"Details":"Preview";return W`
        <div class="file-attachment" onClick=${(Y)=>Y.stopPropagation()}>
            <a href=${n0(_)} download=${K} class="file-attachment-main">
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
                        ${j&&W`<span class="file-size">${j}</span>`}
                        ${N.content_type&&W`<span class="file-size">${N.content_type}</span>`}
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
                onClick=${(Y)=>{Y.preventDefault(),Y.stopPropagation(),$?.({mediaId:_,info:N})}}
            >
                ${O}
            </button>
        </div>
    `}function a6({attachment:_,onPreview:$}){let N=Number(_?.id),[Z,K]=u(null);R(()=>{if(!Number.isFinite(N))return;x2(N).then(K).catch(()=>{});return},[N]);let J=Z?.filename||_.label||`attachment-${_.id}`,j=Number.isFinite(N)?n0(N):null,O=I2(Z?.content_type)==="unsupported"?"Details":"Preview";return W`
        <span class="attachment-pill" title=${J}>
            ${j?W`
                    <a href=${j} download=${J} class="attachment-pill-main" onClick=${(Y)=>Y.stopPropagation()}>
                        <${e0}
                            prefix="post"
                            label=${_.label}
                            title=${J}
                        />
                    </a>
                `:W`
                    <${e0}
                        prefix="post"
                        label=${_.label}
                        title=${J}
                    />
                `}
            ${Number.isFinite(N)&&Z&&W`
                <button
                    class="attachment-pill-preview"
                    type="button"
                    title=${O}
                    onClick=${(Y)=>{Y.preventDefault(),Y.stopPropagation(),$?.({mediaId:N,info:Z})}}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            `}
        </span>
    `}function O3({annotations:_}){if(!_)return null;let{audience:$,priority:N,lastModified:Z}=_,K=Z?b2(Z):null;return W`
        <div class="content-annotations">
            ${$&&$.length>0&&W`
                <span class="content-annotation">Audience: ${$.join(", ")}</span>
            `}
            ${typeof N==="number"&&W`
                <span class="content-annotation">Priority: ${N}</span>
            `}
            ${K&&W`
                <span class="content-annotation">Updated: ${K}</span>
            `}
        </div>
    `}function t6({block:_}){let $=_.title||_.name||_.uri,N=_.description,Z=_.size?P0(_.size):"",K=_.mime_type||"",J=_$(K),j=C2(_.uri);return W`
        <a
            href=${j||"#"}
            class="resource-link"
            target=${j?"_blank":void 0}
            rel=${j?"noopener noreferrer":void 0}
            onClick=${(z)=>z.stopPropagation()}>
            <div class="resource-link-main">
                <div class="resource-link-header">
                    <span class="resource-link-icon-inline">${J}</span>
                    <div class="resource-link-title">${$}</div>
                </div>
                ${N&&W`<div class="resource-link-description">${N}</div>`}
                <div class="resource-link-meta">
                    ${K&&W`<span>${K}</span>`}
                    ${Z&&W`<span>${Z}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `}function e6({block:_}){let[$,N]=u(!1),Z=_.uri||"Embedded resource",K=_.text||"",J=Boolean(_.data),j=_.mime_type||"";return W`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(z)=>{z.preventDefault(),z.stopPropagation(),N(!$)}}>
                ${$?"▼":"▶"} ${Z}
            </button>
            ${$&&W`
                ${K&&W`<pre class="resource-embed-content">${K}</pre>`}
                ${J&&W`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${j&&W`<span class="resource-embed-blob-meta">${j}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(z)=>{z.preventDefault(),z.stopPropagation();let O=new Blob([Uint8Array.from(atob(_.data),(B)=>B.charCodeAt(0))],{type:j||"application/octet-stream"}),Y=URL.createObjectURL(O),V=document.createElement("a");V.href=Y,V.download=Z.split("/").pop()||"resource",V.click(),URL.revokeObjectURL(Y)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function _$(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function $$({preview:_}){let $=C2(_.url),N=C2(_.image,{allowDataImage:!0}),Z=N?`background-image: url('${N}')`:"",K=_.site_name;if(!K&&$)try{K=new URL($).hostname}catch{K=$}return W`
        <a
            href=${$||"#"}
            class="link-preview ${N?"has-image":""}"
            target=${$?"_blank":void 0}
            rel=${$?"noopener noreferrer":void 0}
            onClick=${(J)=>J.stopPropagation()}
            style=${Z}>
            <div class="link-preview-overlay">
                <div class="link-preview-site">${K||""}</div>
                <div class="link-preview-title">${_.title}</div>
                ${_.description&&W`
                    <div class="link-preview-description">${_.description}</div>
                `}
            </div>
        </a>
    `}function N$(_,$){return typeof _==="string"?_:""}var Z$=1800,J$=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
    </svg>`,K$=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>`,j$=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;async function z$(_){let $=typeof _==="string"?_:"";if(!$)return!1;if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText($),!0}catch{}try{let N=document.createElement("textarea");N.value=$,N.setAttribute("readonly",""),N.style.position="fixed",N.style.opacity="0",N.style.pointerEvents="none",document.body.appendChild(N),N.select(),N.setSelectionRange(0,N.value.length);let Z=document.execCommand("copy");return document.body.removeChild(N),Z}catch{return!1}}function Y$(_){if(!_)return()=>{};let $=Array.from(_.querySelectorAll("pre")).filter((J)=>J.querySelector("code"));if($.length===0)return()=>{};let N=new Map,Z=[],K=(J,j)=>{let z=j||"idle";if(J.dataset.copyState=z,z==="success")J.innerHTML=K$,J.setAttribute("aria-label","Copied"),J.setAttribute("title","Copied"),J.classList.add("is-success"),J.classList.remove("is-error");else if(z==="error")J.innerHTML=j$,J.setAttribute("aria-label","Copy failed"),J.setAttribute("title","Copy failed"),J.classList.add("is-error"),J.classList.remove("is-success");else J.innerHTML=J$,J.setAttribute("aria-label","Copy code"),J.setAttribute("title","Copy code"),J.classList.remove("is-success","is-error")};return $.forEach((J)=>{let j=document.createElement("div");j.className="post-code-block",J.parentNode?.insertBefore(j,J),j.appendChild(J);let z=document.createElement("button");z.type="button",z.className="post-code-copy-btn",K(z,"idle"),j.appendChild(z);let O=async(Y)=>{Y.preventDefault(),Y.stopPropagation();let B=J.querySelector("code")?.textContent||"",C=await z$(B);K(z,C?"success":"error");let D=N.get(z);if(D)clearTimeout(D);let E=setTimeout(()=>{K(z,"idle"),N.delete(z)},Z$);N.set(z,E)};z.addEventListener("click",O),Z.push(()=>{z.removeEventListener("click",O);let Y=N.get(z);if(Y)clearTimeout(Y);if(j.parentNode)j.parentNode.insertBefore(J,j),j.remove()})}),()=>{Z.forEach((J)=>J())}}function O$(_){if(!_)return{content:_,fileRefs:[]};let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let Y=0;Y<N.length;Y+=1)if(N[Y].trim()==="Files:"&&N[Y+1]&&/^\s*-\s+/.test(N[Y+1])){Z=Y;break}if(Z===-1)return{content:_,fileRefs:[]};let K=[],J=Z+1;for(;J<N.length;J+=1){let Y=N[J];if(/^\s*-\s+/.test(Y))K.push(Y.replace(/^\s*-\s+/,"").trim());else if(!Y.trim())break;else break}if(K.length===0)return{content:_,fileRefs:[]};let j=N.slice(0,Z),z=N.slice(J),O=[...j,...z].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,fileRefs:K}}function G$(_){if(!_)return{content:_,messageRefs:[]};let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let Y=0;Y<N.length;Y+=1)if(N[Y].trim()==="Referenced messages:"&&N[Y+1]&&/^\s*-\s+/.test(N[Y+1])){Z=Y;break}if(Z===-1)return{content:_,messageRefs:[]};let K=[],J=Z+1;for(;J<N.length;J+=1){let Y=N[J];if(/^\s*-\s+/.test(Y)){let B=Y.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(B)K.push(B[1])}else if(!Y.trim())break;else break}if(K.length===0)return{content:_,messageRefs:[]};let j=N.slice(0,Z),z=N.slice(J),O=[...j,...z].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,messageRefs:K}}function L$(_){if(!_)return{content:_,attachments:[]};let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let Y=0;Y<N.length;Y+=1)if(N[Y].trim()==="Images:"&&N[Y+1]&&/^\s*-\s+/.test(N[Y+1])){Z=Y;break}if(Z===-1)return{content:_,attachments:[]};let K=[],J=Z+1;for(;J<N.length;J+=1){let Y=N[J];if(/^\s*-\s+/.test(Y)){let V=Y.replace(/^\s*-\s+/,"").trim(),B=V.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||V.match(/^attachment:([^\s]+)\s+(.+)$/i);if(B){let C=B[1],D=(B[2]||"").trim()||C;K.push({id:C,label:D,raw:V})}else K.push({id:null,label:V,raw:V})}else if(!Y.trim())break;else break}if(K.length===0)return{content:_,attachments:[]};let j=N.slice(0,Z),z=N.slice(J),O=[...j,...z].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,attachments:K}}function B$(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function q$(_,$){if(!_||!$)return _;let N=String($).trim().split(/\s+/).filter(Boolean);if(N.length===0)return _;let Z=N.map(B$).sort((V,B)=>B.length-V.length),K=new RegExp(`(${Z.join("|")})`,"gi"),J=new RegExp(`^(${Z.join("|")})$`,"i"),j=new DOMParser().parseFromString(_,"text/html"),z=j.createTreeWalker(j.body,NodeFilter.SHOW_TEXT),O=[],Y;while(Y=z.nextNode())O.push(Y);for(let V of O){let B=V.nodeValue;if(!B||!K.test(B)){K.lastIndex=0;continue}K.lastIndex=0;let C=V.parentElement;if(C&&C.closest("code, pre, script, style"))continue;let D=B.split(K).filter((b)=>b!=="");if(D.length===0)continue;let E=j.createDocumentFragment();for(let b of D)if(J.test(b)){let m=j.createElement("mark");m.className="search-highlight-term",m.textContent=b,E.appendChild(m)}else E.appendChild(j.createTextNode(b));V.parentNode.replaceChild(E,V)}return j.body.innerHTML}function e4({post:_,onClick:$,onHashtagClick:N,onMessageRef:Z,onScrollToMessage:K,agentName:J,agentAvatarUrl:j,userName:z,userAvatarUrl:O,userAvatarBackground:Y,onDelete:V,isThreadReply:B,isThreadPrev:C,isThreadNext:D,isRemoving:E,highlightQuery:b,onFileRef:m}){let[A,X]=u(null),w=y(null),P=_.data,f=P.type==="agent_response",p=z||"You",i=f?J||u4:p,$_=f?r3(J,j):r3(p,O),Y_=typeof Y==="string"?Y.trim().toLowerCase():"",s=!f&&$_.image&&(Y_==="clear"||Y_==="transparent"),L_=f&&Boolean($_.image),y_=`background-color: ${s||L_?"transparent":$_.color}`,r=P.content_meta,__=Boolean(r?.truncated),e=Boolean(r?.preview),a=__&&!e,J_=__?{originalLength:Number.isFinite(r?.original_length)?r.original_length:P.content?P.content.length:0,maxLength:Number.isFinite(r?.max_length)?r.max_length:0}:null,G_=N$(P.content,P.link_previews),{content:K_,fileRefs:E_}=O$(G_),{content:V_,messageRefs:X_}=G$(K_),{content:f_,attachments:R_}=L$(V_);G_=f_;let L0=Boolean(G_)&&!a,P_=typeof b==="string"?b.trim():"",w_=s_(()=>{if(!G_)return"";let M=j2(G_,N);return P_?q$(M,P_):M},[G_,P_]),N_=(M,Z_)=>{M.stopPropagation(),X(n0(Z_))},[D_,B_]=u(null),C_=(M)=>{B_(M)},W_=(M)=>{M.stopPropagation(),V?.(_)},g_=(M,Z_)=>{let b_=new Set;if(!M||Z_.length===0)return{content:M,usedIds:b_};return{content:M.replace(/attachment:([^\s)"']+)/g,(q0,e_,r_,d_)=>{let c0=e_.replace(/^\/+/,""),V0=Z_.find((_0)=>_0.name&&_0.name.toLowerCase()===c0.toLowerCase()&&!b_.has(_0.id))||Z_.find((_0)=>!b_.has(_0.id));if(!V0)return q0;if(b_.add(V0.id),d_.slice(Math.max(0,r_-2),r_)==="](")return`/media/${V0.id}`;return V0.name||"attachment"}),usedIds:b_}},S_=[],H_=[],j_=[],x_=[],v_=[],t_=[],n_=P.content_blocks||[],B0=P.media_ids||[],F_=0;if(n_.length>0)n_.forEach((M)=>{if(M?.type==="text"&&M.annotations)t_.push(M.annotations);if(M?.type==="resource_link")x_.push(M);else if(M?.type==="resource")v_.push(M);else if(M?.type==="file"){let Z_=B0[F_++];if(Z_)H_.push(Z_),j_.push({id:Z_,name:M?.name||M?.filename||M?.title})}else if(M?.type==="image"||!M?.type){let Z_=B0[F_++];if(Z_){let b_=typeof M?.mime_type==="string"?M.mime_type:void 0;S_.push({id:Z_,annotations:M?.annotations,mimeType:b_}),j_.push({id:Z_,name:M?.name||M?.filename||M?.title})}}});else if(B0.length>0)B0.forEach((M)=>{S_.push({id:M,annotations:null}),j_.push({id:M,name:null})});if(R_.length>0)R_.forEach((M)=>{if(!M?.id)return;let Z_=j_.find((b_)=>String(b_.id)===String(M.id));if(Z_&&!Z_.name)Z_.name=M.label});let{content:H0,usedIds:S0}=g_(G_,j_);G_=H0;let K0=S_.filter(({id:M})=>!S0.has(M)),Y0=H_.filter((M)=>!S0.has(M)),o_=R_.length>0?R_.map((M,Z_)=>({id:M.id||`attachment-${Z_+1}`,label:M.label||`attachment-${Z_+1}`})):j_.map((M,Z_)=>({id:M.id,label:M.name||`attachment-${Z_+1}`})),x0=s_(()=>d4(n_),[n_]);R(()=>{if(!w.current)return;return k2(w.current),Y$(w.current)},[w_]);let F0=y(null);return R(()=>{if(!F0.current||x0.length===0)return;let M=F0.current;M.innerHTML="";for(let Z_ of x0){let b_=document.createElement("div");M.appendChild(b_),s4(b_,Z_).catch((Q_)=>{console.error("[post] adaptive card render error:",Q_),b_.textContent=Z_.fallback_text||"Card failed to render."})}},[x0]),W`
        <div id=${`post-${_.id}`} class="post ${f?"agent-post":""} ${B?"thread-reply":""} ${C?"thread-prev":""} ${D?"thread-next":""} ${E?"removing":""}" onClick=${$}>
            <div class="post-avatar ${f?"agent-avatar":""} ${$_.image?"has-image":""}" style=${y_}>
                ${$_.image?W`<img src=${$_.image} alt=${i} />`:$_.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${W_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${i}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(M)=>{if(M.preventDefault(),M.stopPropagation(),Z)Z(_.id)}}>${i4(_.timestamp)}</a>
                </div>
                ${a&&J_&&W`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${T2(J_.originalLength)} chars
                            ${J_.maxLength?W` • Display limit: ${T2(J_.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${e&&J_&&W`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${T2(J_.maxLength)} of ${T2(J_.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(E_.length>0||X_.length>0||o_.length>0)&&W`
                    <div class="post-file-refs">
                        ${X_.map((M)=>{let Z_=(b_)=>{if(b_.preventDefault(),b_.stopPropagation(),K)K(M);else{let Q_=document.getElementById("post-"+M);if(Q_)Q_.scrollIntoView({behavior:"smooth",block:"center"}),Q_.classList.add("post-highlight"),setTimeout(()=>Q_.classList.remove("post-highlight"),2000)}};return W`
                                <a href=${`#msg-${M}`} class="post-msg-pill-link" onClick=${Z_}>
                                    <${e0}
                                        prefix="post"
                                        label=${"msg:"+M}
                                        title=${"Message "+M}
                                        icon="message"
                                        onClick=${Z_}
                                    />
                                </a>
                            `})}
                        ${E_.map((M)=>{let Z_=M.split("/").pop()||M;return W`
                                <${e0}
                                    prefix="post"
                                    label=${Z_}
                                    title=${M}
                                    onClick=${()=>m?.(M)}
                                />
                            `})}
                        ${o_.map((M)=>W`
                            <${a6}
                                key=${M.id}
                                attachment=${M}
                                onPreview=${C_}
                            />
                        `)}
                    </div>
                `}
                ${L0&&W`
                    <div 
                        ref=${w}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:w_}}
                        onClick=${(M)=>{if(M.target.classList.contains("hashtag")){M.preventDefault(),M.stopPropagation();let Z_=M.target.dataset.hashtag;if(Z_)N?.(Z_)}else if(M.target.tagName==="IMG")M.preventDefault(),M.stopPropagation(),X(M.target.src)}}
                    />
                `}
                ${x0.length>0&&W`
                    <div ref=${F0} class="post-adaptive-cards" />
                `}
                ${t_.length>0&&W`
                    ${t_.map((M,Z_)=>W`
                        <${O3} key=${Z_} annotations=${M} />
                    `)}
                `}
                ${K0.length>0&&W`
                    <div class="media-preview">
                        ${K0.map(({id:M,mimeType:Z_})=>{let Q_=typeof Z_==="string"&&Z_.toLowerCase().startsWith("image/svg")?n0(M):z4(M);return W`
                                <img 
                                    key=${M} 
                                    src=${Q_} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(q0)=>N_(q0,M)}
                                />
                            `})}
                    </div>
                `}
                ${K0.length>0&&W`
                    ${K0.map(({annotations:M},Z_)=>W`
                        ${M&&W`<${O3} key=${Z_} annotations=${M} />`}
                    `)}
                `}
                ${Y0.length>0&&W`
                    <div class="file-attachments">
                        ${Y0.map((M)=>W`
                            <${s6} key=${M} mediaId=${M} onPreview=${C_} />
                        `)}
                    </div>
                `}
                ${x_.length>0&&W`
                    <div class="resource-links">
                        ${x_.map((M,Z_)=>W`
                            <div key=${Z_}>
                                <${t6} block=${M} />
                                <${O3} annotations=${M.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${v_.length>0&&W`
                    <div class="resource-embeds">
                        ${v_.map((M,Z_)=>W`
                            <div key=${Z_}>
                                <${e6} block=${M} />
                                <${O3} annotations=${M.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${P.link_previews?.length>0&&W`
                    <div class="link-previews">
                        ${P.link_previews.map((M,Z_)=>W`
                            <${$$} key=${Z_} preview=${M} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${A&&W`<${t4} src=${A} onClose=${()=>X(null)} />`}
        ${D_&&W`
            <${a4}
                mediaId=${D_.mediaId}
                info=${D_.info}
                onClose=${()=>B_(null)}
            />
        `}
    `}function _8({posts:_,hasMore:$,onLoadMore:N,onPostClick:Z,onHashtagClick:K,onMessageRef:J,onScrollToMessage:j,onFileRef:z,emptyMessage:O,timelineRef:Y,agents:V,user:B,onDeletePost:C,reverse:D=!0,removingPostIds:E,searchQuery:b}){let[m,A]=u(!1),X=y(null),w=typeof IntersectionObserver<"u",P=x(async()=>{if(!N||!$||m)return;A(!0);try{await N({preserveScroll:!0,preserveMode:"top"})}finally{A(!1)}},[$,m,N]),f=x((r)=>{let{scrollTop:__,scrollHeight:e,clientHeight:a}=r.target,J_=D?e-a-__:__,G_=Math.max(300,a);if(J_<G_)P()},[D,P]);R(()=>{if(!w)return;let r=X.current,__=Y?.current;if(!r||!__)return;let e=300,a=new IntersectionObserver((J_)=>{for(let G_ of J_){if(!G_.isIntersecting)continue;P()}},{root:__,rootMargin:`${e}px 0px ${e}px 0px`,threshold:0});return a.observe(r),()=>a.disconnect()},[w,$,N,Y,P]);let p=y(P);if(p.current=P,R(()=>{if(w)return;if(!Y?.current)return;let{scrollTop:r,scrollHeight:__,clientHeight:e}=Y.current,a=D?__-e-r:r,J_=Math.max(300,e);if(a<J_)p.current?.()},[w,_,$,D,Y]),R(()=>{if(!Y?.current)return;if(!$||m)return;let{scrollTop:r,scrollHeight:__,clientHeight:e}=Y.current,a=D?__-e-r:r,J_=Math.max(300,e);if(__<=e+1||a<J_)p.current?.()},[_,$,m,D,Y]),!_)return W`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return W`
            <div class="timeline" ref=${Y}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${O||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let i=_.slice().sort((r,__)=>r.id-__.id),$_=(r)=>{let __=r?.data?.thread_id;if(__===null||__===void 0||__==="")return null;let e=Number(__);return Number.isFinite(e)?e:null},Y_=new Map;for(let r=0;r<i.length;r+=1){let __=i[r],e=Number(__?.id),a=$_(__);if(a!==null){let J_=Y_.get(a)||{anchorIndex:-1,replyIndexes:[]};J_.replyIndexes.push(r),Y_.set(a,J_)}else if(Number.isFinite(e)){let J_=Y_.get(e)||{anchorIndex:-1,replyIndexes:[]};J_.anchorIndex=r,Y_.set(e,J_)}}let s=new Map;for(let[r,__]of Y_.entries()){let e=new Set;if(__.anchorIndex>=0)e.add(__.anchorIndex);for(let a of __.replyIndexes)e.add(a);s.set(r,Array.from(e).sort((a,J_)=>a-J_))}let L_=i.map((r,__)=>{let e=$_(r);if(e===null)return{hasThreadPrev:!1,hasThreadNext:!1};let a=s.get(e);if(!a||a.length===0)return{hasThreadPrev:!1,hasThreadNext:!1};let J_=a.indexOf(__);if(J_<0)return{hasThreadPrev:!1,hasThreadNext:!1};return{hasThreadPrev:J_>0,hasThreadNext:J_<a.length-1}}),y_=W`<div class="timeline-sentinel" ref=${X}></div>`;return W`
        <div class="timeline ${D?"reverse":"normal"}" ref=${Y} onScroll=${f}>
            <div class="timeline-content">
                ${D?y_:null}
                ${i.map((r,__)=>{let e=Boolean(r.data?.thread_id&&r.data.thread_id!==r.id),a=E?.has?.(r.id),J_=L_[__]||{};return W`
                    <${e4}
                        key=${r.id}
                        post=${r}
                        isThreadReply=${e}
                        isThreadPrev=${J_.hasThreadPrev}
                        isThreadNext=${J_.hasThreadNext}
                        isRemoving=${a}
                        highlightQuery=${b}
                        agentName=${c4(r.data?.agent_id,V||{})}
                        agentAvatarUrl=${v4(r.data?.agent_id,V||{})}
                        userName=${B?.name||B?.user_name}
                        userAvatarUrl=${B?.avatar_url||B?.avatarUrl||B?.avatar}
                        userAvatarBackground=${B?.avatar_background||B?.avatarBackground}
                        onClick=${()=>Z?.(r)}
                        onHashtagClick=${K}
                        onMessageRef=${J}
                        onScrollToMessage=${j}
                        onFileRef=${z}
                        onDelete=${C}
                    />
                `})}
                ${D?null:y_}
            </div>
        </div>
    `}class $8{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,N=-1/0;for(let Z of this.extensions.values()){if(Z.placement!=="tabs")continue;if(!Z.canHandle)continue;try{let K=Z.canHandle(_);if(K===!1||K===0)continue;let J=K===!0?0:typeof K==="number"?K:0;if(J>N)N=J,$=Z}catch(K){console.warn(`[PaneRegistry] canHandle() error for "${Z.id}":`,K)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var l_=new $8;var G3=null,d3=null;function N8(){if(d3)return Promise.resolve(d3);if(!G3)G3=import("/static/dist/editor.bundle.js").then((_)=>{return d3=_,_}).catch((_)=>{throw G3=null,_});return G3}class Z8{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await N8();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){this.queuedViewStateCb=_,this.real?.onViewStateChange?.(_)}restoreViewState(_){this.queuedViewState=_,this.real?.restoreViewState?.(_)}getPath(){return this.real?.getPath?.()??this.context.path??""}setPath(_){this.real?.setPath?.(_)}}var s3={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;if(_.mode!=="edit")return!1;return 1},mount(_,$){return new Z8(_,$)}};function a3(){N8().catch(()=>{})}var V$={yellow:"#9a6700",magenta:"#8250df",cyan:"#1b7c83",brightBlack:"#57606a",brightRed:"#cf222e",brightGreen:"#1a7f37",brightYellow:"#bf8700",brightBlue:"#0550ae",brightMagenta:"#6f42c1",brightCyan:"#0a7b83"},W$={yellow:"#d29922",magenta:"#bc8cff",cyan:"#39c5cf",brightBlack:"#8b949e",brightRed:"#ff7b72",brightGreen:"#7ee787",brightYellow:"#e3b341",brightBlue:"#79c0ff",brightMagenta:"#d2a8ff",brightCyan:"#56d4dd"},L3=null,t3=null;function X$(_){if(!_)return!1;return _.startsWith("data:application/wasm")||/(^|\/)ghostty-vt\.wasm(?:[?#].*)?$/.test(_)}async function Q$(_){let $=globalThis.fetch?.bind(globalThis);if(!$)return await _();let N=new URL("/static/js/vendor/ghostty-vt.wasm",window.location.origin).href,Z=(K,J)=>{let j=K instanceof Request?K.url:K instanceof URL?K.href:String(K);if(!X$(j))return $(K,J);if(K instanceof Request)return $(new Request(N,K));return $(N,J)};globalThis.fetch=Z;try{return await _()}finally{globalThis.fetch=$}}async function U$(){let $=await import(new URL("/static/js/vendor/ghostty-web.js",window.location.origin).href);if(!L3)L3=Q$(()=>Promise.resolve($.init?.())).catch((N)=>{throw L3=null,N});return await L3,$}async function H$(){if(typeof document>"u"||!("fonts"in document)||!document.fonts)return;if(!t3)t3=Promise.allSettled([document.fonts.load('400 13px "FiraCode Nerd Font Mono"'),document.fonts.load('700 13px "FiraCode Nerd Font Mono"'),document.fonts.ready]).then(()=>{return}).catch(()=>{return});await t3}async function F$(){let _=await fetch("/terminal/session",{method:"GET",credentials:"same-origin"}),$=await _.json().catch(()=>({}));if(!_.ok)throw Error($?.error||`HTTP ${_.status}`);return $}function y$(_){return`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}${_}`}function D$(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,N=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(N==="dark")return!0;if(N==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function _2(_,$=""){if(typeof document>"u")return $;return getComputedStyle(document.documentElement).getPropertyValue(_)?.trim()||$}function C$(_,$){if(!_||!_.startsWith("#"))return _;let N=_.slice(1);if(N.length===3)return`#${N[0]}${N[0]}${N[1]}${N[1]}${N[2]}${N[2]}${$}`;if(N.length===6)return`#${N}${$}`;return _}function J8(){let _=D$(),$=_?W$:V$,N=_2("--bg-primary",_?"#000000":"#ffffff"),Z=_2("--text-primary",_?"#e7e9ea":"#0f1419"),K=_2("--text-secondary",_?"#71767b":"#536471"),J=_2("--accent-color","#1d9bf0"),j=_2("--danger-color",_?"#ff7b72":"#cf222e"),z=_2("--success-color",_?"#7ee787":"#1a7f37"),O=_2("--bg-hover",_?"#1d1f23":"#e8ebed"),Y=_2("--border-color",_?"#2f3336":"#eff3f4"),V=_2("--accent-soft-strong",C$(J,_?"47":"33"));return{background:N,foreground:Z,cursor:J,cursorAccent:N,selectionBackground:V,selectionForeground:Z,black:O,red:j,green:z,yellow:$.yellow,blue:J,magenta:$.magenta,cyan:$.cyan,white:Z,brightBlack:$.brightBlack,brightRed:$.brightRed,brightGreen:$.brightGreen,brightYellow:$.brightYellow,brightBlue:$.brightBlue,brightMagenta:$.brightMagenta,brightCyan:$.brightCyan,brightWhite:Y}}class K8{container;disposed=!1;termEl;bodyEl;statusEl;terminal=null;fitAddon=null;socket=null;themeObserver=null;themeChangeListener=null;mediaQuery=null;mediaQueryListener=null;resizeObserver=null;dockResizeListener=null;windowResizeListener=null;resizeFrame=0;lastAppliedThemeSignature=null;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0"),this.statusEl=document.createElement("span"),this.statusEl.className="terminal-pane-status",this.statusEl.textContent="Loading terminal…",this.bodyEl=document.createElement("div"),this.bodyEl.className="terminal-pane-body",this.bodyEl.innerHTML='<div class="terminal-placeholder">Bootstrapping ghostty-web…</div>',this.termEl.append(this.bodyEl),_.appendChild(this.termEl),this.bootstrapGhostty()}setStatus(_){this.statusEl.textContent=_,this.termEl.dataset.connectionStatus=_,this.termEl.setAttribute("aria-label",`Terminal ${_}`)}syncHostLayout(){let _=this.bodyEl.querySelector(".terminal-live-host");if(!(_ instanceof HTMLElement))return;let $=_.firstElementChild;if($ instanceof HTMLElement)$.style.width="100%",$.style.height="100%",$.style.maxWidth="100%",$.style.minWidth="0",$.style.display="block";let N=_.querySelector("canvas");if(N instanceof HTMLElement)N.style.display="block",N.style.maxWidth="none"}scheduleResize(){if(this.disposed)return;if(this.resizeFrame)cancelAnimationFrame(this.resizeFrame);this.resizeFrame=requestAnimationFrame(()=>{this.resizeFrame=0,this.resize()})}async bootstrapGhostty(){try{let _=await U$();if(await H$(),this.disposed)return;this.bodyEl.innerHTML="";let $=document.createElement("div");$.className="terminal-live-host",this.bodyEl.appendChild($);let N=new _.Terminal({cols:120,rows:30,cursorBlink:!0,fontFamily:'FiraCode Nerd Font Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',fontSize:13,theme:J8()}),Z=null;if(typeof _.FitAddon==="function")Z=new _.FitAddon,N.loadAddon?.(Z);await N.open($),this.syncHostLayout(),N.loadFonts?.(),Z?.observeResize?.(),this.terminal=N,this.fitAddon=Z,this.installThemeSync(),this.installResizeSync(),this.scheduleResize(),await this.connectBackend()}catch(_){if(console.error("[terminal-pane] Failed to bootstrap ghostty-web:",_),this.disposed)return;this.bodyEl.innerHTML='<div class="terminal-placeholder">Terminal failed to load. Check vendored assets and backend wiring.</div>',this.setStatus("Load failed")}}applyTheme(){if(!this.terminal)return;let _=J8(),$=JSON.stringify(_),N=this.lastAppliedThemeSignature!==null&&this.lastAppliedThemeSignature!==$;try{this.termEl.style.backgroundColor=_.background,this.bodyEl.style.backgroundColor=_.background;let Z=this.bodyEl.querySelector(".terminal-live-host");if(Z instanceof HTMLElement)Z.style.backgroundColor=_.background,Z.style.color=_.foreground;let K=this.bodyEl.querySelector("canvas");if(K instanceof HTMLElement)K.style.backgroundColor=_.background,K.style.color=_.foreground}catch{}try{if(this.terminal.options)this.terminal.options.theme=_}catch{}try{if(N&&this.terminal.reset)this.terminal.reset()}catch{}try{this.terminal.renderer?.setTheme?.(_),this.terminal.renderer?.clear?.()}catch{}try{this.terminal.loadFonts?.()}catch{}try{this.terminal.renderer?.remeasureFont?.()}catch{}try{if(this.terminal.wasmTerm&&this.terminal.renderer?.render)this.terminal.renderer.render(this.terminal.wasmTerm,!0,this.terminal.viewportY||0,this.terminal),this.terminal.renderer.render(this.terminal.wasmTerm,!1,this.terminal.viewportY||0,this.terminal)}catch{}try{this.resize()}catch{}try{if(N&&this.socket?.readyState===WebSocket.OPEN)this.socket.send(JSON.stringify({type:"input",data:"\f"}))}catch{}try{this.terminal.refresh?.()}catch{}this.lastAppliedThemeSignature=$}installThemeSync(){if(typeof window>"u"||typeof document>"u")return;let _=()=>requestAnimationFrame(()=>this.applyTheme());_();let $=()=>_();window.addEventListener("piclaw-theme-change",$),this.themeChangeListener=$;let N=window.matchMedia?.("(prefers-color-scheme: dark)"),Z=()=>_();if(N?.addEventListener)N.addEventListener("change",Z);else if(N?.addListener)N.addListener(Z);this.mediaQuery=N,this.mediaQueryListener=Z;let K=typeof MutationObserver<"u"?new MutationObserver(()=>_()):null;if(K?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","style"]}),document.body)K?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});this.themeObserver=K}installResizeSync(){if(typeof window>"u")return;let _=()=>this.scheduleResize(),$=()=>this.scheduleResize();if(window.addEventListener("dock-resize",_),window.addEventListener("resize",$),this.dockResizeListener=_,this.windowResizeListener=$,typeof ResizeObserver<"u"){let N=new ResizeObserver(()=>this.scheduleResize());N.observe(this.container),N.observe(this.bodyEl),this.resizeObserver=N}}async connectBackend(){let _=this.terminal;if(!_)return;try{let $=await F$();if(this.disposed)return;if(!$?.enabled){_.write?.(`Terminal backend unavailable: ${$?.error||"disabled"}\r
`),this.setStatus("Unavailable");return}let N=new WebSocket(y$($.ws_path||"/terminal/ws"));this.socket=N,this.setStatus("Connecting…"),_.onData?.((Z)=>{if(N.readyState===WebSocket.OPEN)N.send(JSON.stringify({type:"input",data:Z}))}),_.onResize?.(({cols:Z,rows:K})=>{if(N.readyState===WebSocket.OPEN)N.send(JSON.stringify({type:"resize",cols:Z,rows:K}))}),N.addEventListener("open",()=>{if(this.disposed)return;this.setStatus("Connected"),this.scheduleResize()}),N.addEventListener("message",(Z)=>{if(this.disposed)return;let K=null;try{K=JSON.parse(String(Z.data))}catch{K={type:"output",data:String(Z.data)}}if(K?.type==="output"&&typeof K.data==="string"){_.write?.(K.data);return}if(K?.type==="exit")_.write?.(`\r
[terminal exited]\r
`),this.setStatus("Exited")}),N.addEventListener("close",()=>{if(this.disposed)return;this.setStatus("Disconnected")}),N.addEventListener("error",()=>{if(this.disposed)return;this.setStatus("Connection error")})}catch($){_.write?.(`Terminal backend unavailable: ${$ instanceof Error?$.message:String($)}\r
`),this.setStatus("Unavailable")}}sendResize(){if(!this.socket||this.socket.readyState!==WebSocket.OPEN||!this.fitAddon?.proposeDimensions)return;let _=this.fitAddon.proposeDimensions();if(!_)return;this.socket.send(JSON.stringify({type:"resize",cols:_.cols,rows:_.rows}))}getContent(){return}isDirty(){return!1}focus(){if(this.terminal?.focus){this.terminal.focus();return}this.termEl?.focus()}resize(){this.syncHostLayout();try{this.terminal?.renderer?.remeasureFont?.()}catch{}try{this.fitAddon?.fit?.()}catch{}try{this.terminal?.refresh?.()}catch{}this.syncHostLayout(),this.sendResize()}dispose(){if(this.disposed)return;this.disposed=!0;try{if(this.resizeFrame)cancelAnimationFrame(this.resizeFrame),this.resizeFrame=0}catch{}try{if(this.themeChangeListener)window.removeEventListener("piclaw-theme-change",this.themeChangeListener)}catch{}try{if(this.mediaQuery&&this.mediaQueryListener){if(this.mediaQuery.removeEventListener)this.mediaQuery.removeEventListener("change",this.mediaQueryListener);else if(this.mediaQuery.removeListener)this.mediaQuery.removeListener(this.mediaQueryListener)}}catch{}try{if(this.dockResizeListener)window.removeEventListener("dock-resize",this.dockResizeListener);if(this.windowResizeListener)window.removeEventListener("resize",this.windowResizeListener)}catch{}try{this.themeObserver?.disconnect?.()}catch{}try{this.resizeObserver?.disconnect?.()}catch{}try{this.socket?.close?.()}catch{}try{this.fitAddon?.dispose?.()}catch{}try{this.terminal?.dispose?.()}catch{}this.termEl?.remove()}}var e3={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new K8(_,$)}};function z2(_){return String(_||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function k$(_,$){let N=String(_||"").trim();if(!N)return N;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(N)||N.startsWith("#")||N.startsWith("data:")||N.startsWith("blob:"))return N;let Z=N.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),K=Z?.[1]||N,J=Z?.[2]||"",j=Z?.[3]||"",z=String($||"").split("/").slice(0,-1).join("/"),Y=K.startsWith("/")?K:`${z?`${z}/`:""}${K}`,V=[];for(let C of Y.split("/")){if(!C||C===".")continue;if(C===".."){if(V.length>0)V.pop();continue}V.push(C)}let B=V.join("/");return`${g3(B)}${J}${j}`}function u2(_){return _?.preview||null}function b$(_){let $=String(_||""),N=Math.max($.lastIndexOf("/"),$.lastIndexOf("\\")),Z=N>=0?$.slice(N+1):$,K=Z.lastIndexOf(".");if(K<=0||K===Z.length-1)return"none";return Z.slice(K+1)}function E$(_){if(!_)return"unknown";if(_.kind==="image")return"image";if(_.kind==="text")return _.content_type==="text/markdown"?"markdown":"text";if(_.kind==="binary")return"binary";return String(_.kind||"unknown")}function A$(_,$){let N=$?.path||_?.path||"",Z=[];if($?.content_type)Z.push(`<span><strong>type:</strong> ${z2($.content_type)}</span>`);if(typeof $?.size==="number")Z.push(`<span><strong>size:</strong> ${z2(P0($.size))}</span>`);if($?.mtime)Z.push(`<span><strong>modified:</strong> ${z2(b2($.mtime))}</span>`);if(Z.push(`<span><strong>kind:</strong> ${z2(E$($))}</span>`),Z.push(`<span><strong>extension:</strong> ${z2(b$(N))}</span>`),N)Z.push(`<span><strong>path:</strong> ${z2(N)}</span>`);if($?.truncated)Z.push("<span><strong>content:</strong> truncated</span>");return`<div class="workspace-preview-meta workspace-preview-meta-inline">${Z.join("")}</div>`}function w$(_){let $=u2(_);if(!$)return'<div class="workspace-preview-text">No preview available.</div>';let N=A$(_,$);if($.kind==="image"){let Z=$.url||($.path?g3($.path):"");return`${N}
            <div class="workspace-preview-image">
                <img src="${z2(Z)}" alt="preview" />
            </div>
        `}if($.kind==="text"){if($.content_type==="text/markdown"){let Z=j2($.text||"",null,{rewriteImageSrc:(K)=>k$(K,$.path||_?.path)});return`${N}<div class="workspace-preview-text">${Z}</div>`}return`${N}<pre class="workspace-preview-text"><code>${z2($.text||"")}</code></pre>`}if($.kind==="binary")return`${N}<div class="workspace-preview-text">Binary file — download to view.</div>`;return`${N}<div class="workspace-preview-text">No preview available.</div>`}class _1{constructor(_,$){this.container=_,this.context=$,this.disposed=!1,this.host=document.createElement("div"),this.host.className="workspace-preview-render-host",this.host.tabIndex=0,this.container.appendChild(this.host),this.render()}render(){if(this.disposed)return;this.host.innerHTML=w$(this.context)}getContent(){let _=u2(this.context);return typeof _?.text==="string"?_.text:void 0}isDirty(){return!1}setContent(_,$){let N=u2(this.context);if(N&&N.kind==="text"){if(N.text=_,$!==void 0)N.mtime=$}if(this.context.content=_,$!==void 0)this.context.mtime=$;this.render()}focus(){this.host?.focus?.()}dispose(){if(this.disposed)return;this.disposed=!0,this.host?.remove(),this.container.innerHTML=""}}var $1={id:"workspace-markdown-preview",label:"Workspace Markdown Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){let $=u2(_);if(_?.mode!=="view")return!1;if(!$||$.kind!=="text")return!1;return $.content_type==="text/markdown"?20:!1},mount(_,$){return new _1(_,$)}},N1={id:"workspace-preview-default",label:"Workspace Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){if(_?.mode!=="view")return!1;return u2(_)||_?.path?1:!1},mount(_,$){return new _1(_,$)}};class j8{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let N of this.listeners)try{N(_,$)}catch{}}open(_,$){let N=this.tabs.get(_);if(!N)N={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,N);return this.activate(_),N}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((N)=>N!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,N]of this.tabs)if($!==_&&!N.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((Z)=>Z!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((N)=>N!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let N=this.tabs.get(_);if(!N||N.dirty===$)return;N.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let N=this.tabs.get(_);if(N)N.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,N){let Z=this.tabs.get(_);if(!Z)return;if(this.tabs.delete(_),Z.id=$,Z.path=$,Z.label=N||$.split("/").pop()||$,this.tabs.set($,Z),this.mruOrder=this.mruOrder.map((K)=>K===_?$:K),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),N=_[($+1)%_.length];this.activate(N.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),N=_[($-1+_.length)%_.length];this.activate(N.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var A_=new j8;var B3="workspaceExplorerScale",M$=["compact","default","comfortable"],P$=new Set(M$),S$={compact:{indentPx:14},default:{indentPx:16},comfortable:{indentPx:18}};function z8(_,$="default"){if(typeof _!=="string")return $;let N=_.trim().toLowerCase();return P$.has(N)?N:$}function Z1(){if(typeof window>"u")return{width:0,isTouch:!1};let _=Number(window.innerWidth)||0,$=Boolean(window.matchMedia?.("(pointer: coarse)")?.matches),N=Boolean(window.matchMedia?.("(hover: none)")?.matches),Z=Number(globalThis.navigator?.maxTouchPoints||0)>0;return{width:_,isTouch:$||Z&&N}}function x$(_={}){let $=Math.max(0,Number(_.width)||0);if(Boolean(_.isTouch))return"comfortable";if($>0&&$<1180)return"comfortable";return"default"}function f$(_,$={}){if(Boolean($.isTouch)&&_==="compact")return"default";return _}function J1(_={}){let $=x$(_),N=_.stored?z8(_.stored,$):$;return f$(N,_)}function Y8(_){return S$[z8(_)]}var T$=60000,B8=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function q8(_,$,N,Z=0,K=[]){if(!N&&B8(_))return K;if(!_)return K;if(K.push({node:_,depth:Z}),_.type==="dir"&&_.children&&$.has(_.path))for(let J of _.children)q8(J,$,N,Z+1,K);return K}function O8(_,$,N){if(!_)return"";let Z=[],K=(J)=>{if(!N&&B8(J))return;if(Z.push(J.type==="dir"?`d:${J.path}`:`f:${J.path}`),J.children&&$?.has(J.path))for(let j of J.children)K(j)};return K(_),Z.join("|")}function Y1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let N=Array.isArray(_.children)?_.children:null,Z=Array.isArray($.children)?$.children:null;if(!Z)return _;let K=N?new Map(N.map((z)=>[z?.path,z])):new Map,J=!N||N.length!==Z.length,j=Z.map((z)=>{let O=Y1(K.get(z.path),z);if(O!==K.get(z.path))J=!0;return O});return J?{...$,children:j}:_}function j1(_,$,N){if(!_)return _;if(_.path===$)return Y1(_,N);if(!Array.isArray(_.children))return _;let Z=!1,K=_.children.map((J)=>{let j=j1(J,$,N);if(j!==J)Z=!0;return j});return Z?{..._,children:K}:_}var V8=4,K1=14,I$=8,u$=16;function W8(_){if(!_)return 0;if(_.type==="file"){let Z=Math.max(0,Number(_.size)||0);return _.__bytes=Z,Z}let $=Array.isArray(_.children)?_.children:[],N=0;for(let Z of $)N+=W8(Z);return _.__bytes=N,N}function X8(_,$=0){let N=Math.max(0,Number(_?.__bytes??_?.size??0)),Z={name:_?.name||_?.path||".",path:_?.path||".",size:N,children:[]};if(!_||_.type!=="dir"||$>=V8)return Z;let K=Array.isArray(_.children)?_.children:[],J=[];for(let z of K){let O=Math.max(0,Number(z?.__bytes??z?.size??0));if(O<=0)continue;if(z.type==="dir")J.push({kind:"dir",node:z,size:O});else J.push({kind:"file",name:z.name,path:z.path,size:O})}J.sort((z,O)=>O.size-z.size);let j=J;if(J.length>K1){let z=J.slice(0,K1-1),O=J.slice(K1-1),Y=O.reduce((V,B)=>V+B.size,0);z.push({kind:"other",name:`+${O.length} more`,path:`${Z.path}/[other]`,size:Y}),j=z}return Z.children=j.map((z)=>{if(z.kind==="dir")return X8(z.node,$+1);return{name:z.name,path:z.path,size:z.size,children:[]}}),Z}function G8(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,N=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(N==="dark")return!0;if(N==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function Q8(_,$,N){let Z=((_+Math.PI/2)*180/Math.PI+360)%360,K=N?Math.max(30,70-$*10):Math.max(34,66-$*8),J=N?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${Z.toFixed(1)} ${K}% ${J}%)`}function q3(_,$,N,Z){return{x:_+N*Math.cos(Z),y:$+N*Math.sin(Z)}}function O1(_,$,N,Z,K,J){let j=Math.PI*2-0.0001,z=J-K>j?K+j:J,O=q3(_,$,Z,K),Y=q3(_,$,Z,z),V=q3(_,$,N,z),B=q3(_,$,N,K),C=z-K>Math.PI?1:0;return[`M ${O.x.toFixed(3)} ${O.y.toFixed(3)}`,`A ${Z} ${Z} 0 ${C} 1 ${Y.x.toFixed(3)} ${Y.y.toFixed(3)}`,`L ${V.x.toFixed(3)} ${V.y.toFixed(3)}`,`A ${N} ${N} 0 ${C} 0 ${B.x.toFixed(3)} ${B.y.toFixed(3)}`,"Z"].join(" ")}var U8={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function H8(_,$,N){let Z=[],K=[],J=Math.max(0,Number($)||0),j=(z,O,Y,V)=>{let B=Array.isArray(z?.children)?z.children:[];if(!B.length)return;let C=Math.max(0,Number(z.size)||0);if(C<=0)return;let D=Y-O,E=O;B.forEach((b,m)=>{let A=Math.max(0,Number(b.size)||0);if(A<=0)return;let X=A/C,w=E,P=m===B.length-1?Y:E+D*X;if(E=P,P-w<0.003)return;let f=U8[V];if(f){let p=Q8(w,V,N);if(Z.push({key:b.path,path:b.path,label:b.name,size:A,color:p,depth:V,startAngle:w,endAngle:P,innerRadius:f[0],outerRadius:f[1],d:O1(120,120,f[0],f[1],w,P)}),V===1)K.push({key:b.path,name:b.name,size:A,pct:J>0?A/J*100:0,color:p})}if(V<V8)j(b,w,P,V+1)})};return j(_,-Math.PI/2,Math.PI*3/2,1),{segments:Z,legend:K}}function z1(_,$){if(!_||!$)return null;if(_.path===$)return _;let N=Array.isArray(_.children)?_.children:[];for(let Z of N){let K=z1(Z,$);if(K)return K}return null}function F8(_,$,N,Z){if(!N||N<=0)return{segments:[],legend:[]};let K=U8[1];if(!K)return{segments:[],legend:[]};let J=-Math.PI/2,j=Math.PI*3/2,z=Q8(J,1,Z),Y=`${$||"."}/[files]`;return{segments:[{key:Y,path:Y,label:_,size:N,color:z,depth:1,startAngle:J,endAngle:j,innerRadius:K[0],outerRadius:K[1],d:O1(120,120,K[0],K[1],J,j)}],legend:[{key:Y,name:_,size:N,pct:100,color:z}]}}function L8(_,$=!1,N=!1){if(!_)return null;let Z=W8(_),K=X8(_,0),J=K.size||Z,{segments:j,legend:z}=H8(K,J,N);if(!j.length&&J>0){let O=F8("[files]",K.path,J,N);j=O.segments,z=O.legend}return{root:K,totalSize:J,segments:j,legend:z,truncated:$,isDarkTheme:N}}function c$({payload:_}){if(!_)return null;let[$,N]=u(null),[Z,K]=u(_?.root?.path||"."),[J,j]=u(()=>[_?.root?.path||"."]),[z,O]=u(!1);R(()=>{let s=_?.root?.path||".";K(s),j([s]),N(null)},[_?.root?.path,_?.totalSize]),R(()=>{if(!Z)return;O(!0);let s=setTimeout(()=>O(!1),180);return()=>clearTimeout(s)},[Z]);let Y=s_(()=>{return z1(_.root,Z)||_.root},[_?.root,Z]),V=Y?.size||_.totalSize||0,{segments:B,legend:C}=s_(()=>{let s=H8(Y,V,_.isDarkTheme);if(s.segments.length>0)return s;if(V<=0)return s;let L_=Y?.children?.length?"Total":"[files]";return F8(L_,Y?.path||_?.root?.path||".",V,_.isDarkTheme)},[Y,V,_.isDarkTheme,_?.root?.path]),[D,E]=u(B),b=y(new Map),m=y(0);R(()=>{let s=b.current,L_=new Map(B.map((e)=>[e.key,e])),y_=performance.now(),r=220,__=(e)=>{let a=Math.min(1,(e-y_)/220),J_=a*(2-a),G_=B.map((K_)=>{let V_=s.get(K_.key)||{startAngle:K_.startAngle,endAngle:K_.startAngle,innerRadius:K_.innerRadius,outerRadius:K_.innerRadius},X_=(w_,N_)=>w_+(N_-w_)*J_,f_=X_(V_.startAngle,K_.startAngle),R_=X_(V_.endAngle,K_.endAngle),L0=X_(V_.innerRadius,K_.innerRadius),P_=X_(V_.outerRadius,K_.outerRadius);return{...K_,d:O1(120,120,L0,P_,f_,R_)}});if(E(G_),a<1)m.current=requestAnimationFrame(__)};if(m.current)cancelAnimationFrame(m.current);return m.current=requestAnimationFrame(__),b.current=L_,()=>{if(m.current)cancelAnimationFrame(m.current)}},[B]);let A=D.length?D:B,X=V>0?P0(V):"0 B",w=Y?.name||"",f=(w&&w!=="."?w:"Total")||"Total",p=X,i=J.length>1,$_=(s)=>{if(!s?.path)return;let L_=z1(_.root,s.path);if(!L_||!Array.isArray(L_.children)||L_.children.length===0)return;j((y_)=>[...y_,L_.path]),K(L_.path),N(null)},Y_=()=>{if(!i)return;j((s)=>{let L_=s.slice(0,-1);return K(L_[L_.length-1]||_?.root?.path||"."),L_}),N(null)};return W`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${z?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${Y?.path||_?.root?.path||"."}`}
                data-segments=${A.length}
                data-base-size=${V}>
                ${A.map((s)=>W`
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
                        <title>${s.label} — ${P0(s.size)}</title>
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
                    <text x="120" y="114" text-anchor="middle" class="workspace-folder-starburst-total-label">${f}</text>
                    <text x="120" y="130" text-anchor="middle" class="workspace-folder-starburst-total-value">${p}</text>
                </g>
            </svg>
            ${C.length>0&&W`
                <div class="workspace-folder-starburst-legend">
                    ${C.slice(0,8).map((s)=>W`
                        <div key=${s.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${s.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${s.name}>${s.name}</span>
                            <span class="workspace-folder-starburst-size">${P0(s.size)}</span>
                            <span class="workspace-folder-starburst-pct">${s.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&W`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function v$({mediaId:_}){let[$,N]=u(null);if(R(()=>{if(!_)return;x2(_).then(N).catch(()=>{})},[_]),!$)return null;let Z=$.filename||"file",K=$.metadata?.size?P0($.metadata.size):"";return W`
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
                ${K&&W`<span class="file-size">${K}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function y8({onFileSelect:_,visible:$=!0,active:N=void 0,onOpenEditor:Z}){let[K,J]=u(null),[j,z]=u(new Set(["."])),[O,Y]=u(null),[V,B]=u(null),[C,D]=u(""),[E,b]=u(null),[m,A]=u(null),[X,w]=u(!0),[P,f]=u(!1),[p,i]=u(null),[$_,Y_]=u(()=>F2("workspaceShowHidden",!1)),[s,L_]=u(!1),[y_,r]=u(null),[__,e]=u(null),[a,J_]=u(null),[G_,K_]=u(!1),[E_,V_]=u(null),[X_,f_]=u(()=>G8()),[R_,L0]=u(()=>J1({stored:l0(B3),...Z1()})),P_=y(j),w_=y(""),N_=y(null),D_=y(0),B_=y(new Set),C_=y(null),W_=y(new Map),g_=y(_),S_=y(Z),H_=y(null),j_=y(null),x_=y(null),v_=y(null),t_=y(null),n_=y(null),B0=y("."),F_=y(null),H0=y({path:null,dragging:!1,startX:0,startY:0}),S0=y({path:null,dragging:!1,startX:0,startY:0}),K0=y({path:null,timer:0}),Y0=y(!1),o_=y(0),x0=y(new Map),F0=y(null),M=y(null),Z_=y(null),b_=y(null),Q_=y($_),q0=y($),e_=y(N??$),r_=y(0),d_=y(a),c0=y(s),$2=y(y_),V0=y(null),Y2=y({x:0,y:0}),_0=y(0),f0=y(null),O0=y(O),o0=y(V),T0=y(null),m_=y(null),O2=y(E);g_.current=_,S_.current=Z,R(()=>{P_.current=j},[j]),R(()=>{Q_.current=$_},[$_]),R(()=>{q0.current=$},[$]),R(()=>{e_.current=N??$},[N,$]),R(()=>{d_.current=a},[a]),R(()=>{if(typeof window>"u")return;let G=()=>{L0(J1({stored:l0(B3),...Z1()}))};G();let Q=()=>G(),F=()=>G(),H=(g)=>{if(!g||g.key===null||g.key===B3)G()};window.addEventListener("resize",Q),window.addEventListener("focus",F),window.addEventListener("storage",H);let v=window.matchMedia?.("(pointer: coarse)"),n=window.matchMedia?.("(hover: none)"),l=(g,z_)=>{if(!g)return;if(g.addEventListener)g.addEventListener("change",z_);else if(g.addListener)g.addListener(z_)},o=(g,z_)=>{if(!g)return;if(g.removeEventListener)g.removeEventListener("change",z_);else if(g.removeListener)g.removeListener(z_)};return l(v,Q),l(n,Q),()=>{window.removeEventListener("resize",Q),window.removeEventListener("focus",F),window.removeEventListener("storage",H),o(v,Q),o(n,Q)}},[]),R(()=>{let G=(Q)=>{let F=Q?.detail?.path;if(!F)return;let H=F.split("/"),v=[];for(let n=1;n<H.length;n++)v.push(H.slice(0,n).join("/"));if(v.length)z((n)=>{let l=new Set(n);l.add(".");for(let o of v)l.add(o);return l});Y(F),requestAnimationFrame(()=>{let n=document.querySelector(`[data-path="${CSS.escape(F)}"]`);if(n)n.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",G),()=>window.removeEventListener("workspace-reveal-path",G)},[]),R(()=>{c0.current=s},[s]),R(()=>{$2.current=y_},[y_]),R(()=>{O0.current=O},[O]),R(()=>{o0.current=V},[V]),R(()=>{O2.current=E},[E]),R(()=>{if(typeof window>"u"||typeof document>"u")return;let G=()=>f_(G8());G();let Q=window.matchMedia?.("(prefers-color-scheme: dark)"),F=()=>G();if(Q?.addEventListener)Q.addEventListener("change",F);else if(Q?.addListener)Q.addListener(F);let H=typeof MutationObserver<"u"?new MutationObserver(()=>G()):null;if(H?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)H?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(Q?.removeEventListener)Q.removeEventListener("change",F);else if(Q?.removeListener)Q.removeListener(F);H?.disconnect()}},[]),R(()=>{if(!V)return;let G=t_.current;if(!G)return;let Q=requestAnimationFrame(()=>{try{G.focus(),G.select()}catch{}});return()=>cancelAnimationFrame(Q)},[V]);let v0=async(G)=>{f(!0),b(null),A(null);try{let Q=await G4(G,20000);b(Q)}catch(Q){b({error:Q.message||"Failed to load preview"})}finally{f(!1)}};H_.current=v0;let W0=async()=>{if(!q0.current)return;try{let G=await e2("",1,Q_.current),Q=O8(G.root,P_.current,Q_.current);if(Q===w_.current){w(!1);return}if(w_.current=Q,N_.current=G.root,!D_.current)D_.current=requestAnimationFrame(()=>{D_.current=0,J((F)=>Y1(F,N_.current)),w(!1)})}catch(G){i(G.message||"Failed to load workspace"),w(!1)}},m0=async(G)=>{if(!G)return;if(B_.current.has(G))return;B_.current.add(G);try{let Q=await e2(G,1,Q_.current);J((F)=>j1(F,G,Q.root))}catch(Q){i(Q.message||"Failed to load workspace")}finally{B_.current.delete(G)}};j_.current=m0;let $0=x(()=>{let G=O;if(!G)return".";let Q=W_.current?.get(G);if(Q&&Q.type==="dir")return Q.path;if(G==="."||!G.includes("/"))return".";let F=G.split("/");return F.pop(),F.join("/")||"."},[O]),y0=x((G)=>{let Q=G?.closest?.(".workspace-row");if(!Q)return null;let F=Q.dataset.path,H=Q.dataset.type;if(!F)return null;if(H==="dir")return F;if(F.includes("/")){let v=F.split("/");return v.pop(),v.join("/")||"."}return"."},[]),R0=x((G)=>{return y0(G?.target||null)},[y0]),I_=x((G)=>{d_.current=G,J_(G)},[]),N0=x(()=>{let G=K0.current;if(G?.timer)clearTimeout(G.timer);K0.current={path:null,timer:0}},[]),D0=x((G)=>{if(!G||G==="."){N0();return}let Q=W_.current?.get(G);if(!Q||Q.type!=="dir"){N0();return}if(P_.current?.has(G)){N0();return}if(K0.current?.path===G)return;N0();let F=setTimeout(()=>{K0.current={path:null,timer:0},j_.current?.(G),z((H)=>{let v=new Set(H);return v.add(G),v})},600);K0.current={path:G,timer:F}},[N0]),X0=x((G,Q)=>{if(Y2.current={x:G,y:Q},_0.current)return;_0.current=requestAnimationFrame(()=>{_0.current=0;let F=V0.current;if(!F)return;let H=Y2.current;F.style.transform=`translate(${H.x+12}px, ${H.y+12}px)`})},[]),b0=x((G)=>{if(!G)return;let F=(W_.current?.get(G)?.name||G.split("/").pop()||G).trim();if(!F)return;e({path:G,label:F})},[]),g0=x(()=>{if(e(null),_0.current)cancelAnimationFrame(_0.current),_0.current=0;if(V0.current)V0.current.style.transform="translate(-9999px, -9999px)"},[]),N2=x((G)=>{if(!G)return".";let Q=W_.current?.get(G);if(Q&&Q.type==="dir")return Q.path;if(G==="."||!G.includes("/"))return".";let F=G.split("/");return F.pop(),F.join("/")||"."},[]),Q0=x(()=>{B(null),D("")},[]),E2=x((G)=>{if(!G)return;let F=(W_.current?.get(G)?.name||G.split("/").pop()||G).trim();if(!F||G===".")return;B(G),D(F)},[]),U0=x(async()=>{let G=o0.current;if(!G)return;let Q=(C||"").trim();if(!Q){Q0();return}let F=W_.current?.get(G),H=(F?.name||G.split("/").pop()||G).trim();if(Q===H){Q0();return}try{let n=(await q4(G,Q))?.path||G,l=G.includes("/")?G.split("/").slice(0,-1).join("/")||".":".";if(Q0(),i(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:G,newPath:n,type:F?.type||"file"}})),F?.type==="dir")z((o)=>{let g=new Set;for(let z_ of o)if(z_===G)g.add(n);else if(z_.startsWith(`${G}/`))g.add(`${n}${z_.slice(G.length)}`);else g.add(z_);return g});if(Y(n),F?.type==="dir")b(null),f(!1),A(null);else H_.current?.(n);j_.current?.(l)}catch(v){i(v?.message||"Failed to rename file")}},[Q0,C]),I0=x(async(G)=>{let H=G||".";for(let v=0;v<50;v+=1){let l=`untitled${v===0?"":`-${v}`}.md`;try{let g=(await B4(H,l,""))?.path||(H==="."?l:`${H}/${l}`);if(H&&H!==".")z((z_)=>new Set([...z_,H]));Y(g),i(null),j_.current?.(H),H_.current?.(g);return}catch(o){if(o?.status===409||o?.code==="file_exists")continue;i(o?.message||"Failed to create file");return}}i("Failed to create file (untitled name already in use).")},[]),h0=x((G)=>{if(G?.stopPropagation?.(),G_)return;let Q=N2(O0.current);I0(Q)},[G_,N2,I0]);R(()=>{if(typeof window>"u")return;let G=(Q)=>{let F=Q?.detail?.updates||[];if(!Array.isArray(F)||F.length===0)return;J((o)=>{let g=o;for(let z_ of F){if(!z_?.root)continue;if(!g||z_.path==="."||!z_.path)g=z_.root;else g=j1(g,z_.path,z_.root)}if(g)w_.current=O8(g,P_.current,Q_.current);return w(!1),g});let H=O0.current;if(Boolean(H)&&F.some((o)=>{let g=o?.path||"";if(!g||g===".")return!0;return H===g||H.startsWith(`${g}/`)||g.startsWith(`${H}/`)}))x0.current.clear();if(!H||!O2.current)return;let n=W_.current?.get(H);if(n&&n.type==="dir")return;if(F.some((o)=>{let g=o?.path||"";if(!g||g===".")return!0;return H===g||H.startsWith(`${g}/`)}))H_.current?.(H)};return window.addEventListener("workspace-update",G),()=>window.removeEventListener("workspace-update",G)},[]),C_.current=W0;let Z2=y(()=>{if(typeof window>"u")return;let G=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),Q=e_.current??q0.current,F=document.visibilityState!=="hidden"&&(Q||G.matches&&q0.current);_3(F,Q_.current).catch(()=>{})}).current,U=y(0),I=y(()=>{if(U.current)clearTimeout(U.current);U.current=setTimeout(()=>{U.current=0,Z2()},250)}).current;R(()=>{if(q0.current)C_.current?.();I()},[$,N]),R(()=>{C_.current(),Z2();let G=setInterval(()=>C_.current(),T$),Q=y2("previewHeight",null),F=Number.isFinite(Q)?Math.min(Math.max(Q,80),600):280;if(o_.current=F,x_.current)x_.current.style.setProperty("--preview-height",`${F}px`);let H=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),v=()=>I();if(H.addEventListener)H.addEventListener("change",v);else if(H.addListener)H.addListener(v);return document.addEventListener("visibilitychange",v),()=>{if(clearInterval(G),D_.current)cancelAnimationFrame(D_.current),D_.current=0;if(H.removeEventListener)H.removeEventListener("change",v);else if(H.removeListener)H.removeListener(v);if(document.removeEventListener("visibilitychange",v),U.current)clearTimeout(U.current),U.current=0;if(F_.current)clearTimeout(F_.current),F_.current=null;_3(!1,Q_.current).catch(()=>{})}},[]);let d=s_(()=>q8(K,j,$_),[K,j,$_]),O_=s_(()=>new Map(d.map((G)=>[G.node.path,G.node])),[d]),k_=s_(()=>Y8(R_),[R_]);W_.current=O_;let q_=(O?W_.current.get(O):null)?.type==="dir";R(()=>{if(!O||!q_){V_(null),F0.current=null,M.current=null;return}let G=O,Q=`${$_?"hidden":"visible"}:${O}`,F=x0.current,H=F.get(Q);if(H?.root){F.delete(Q),F.set(Q,H);let l=L8(H.root,Boolean(H.truncated),X_);if(l)F0.current=l,M.current=O,V_({loading:!1,error:null,payload:l});return}let v=F0.current,n=M.current;V_({loading:!0,error:null,payload:n===O?v:null}),e2(O,I$,$_).then((l)=>{if(O0.current!==G)return;let o={root:l?.root,truncated:Boolean(l?.truncated)};F.delete(Q),F.set(Q,o);while(F.size>u$){let z_=F.keys().next().value;if(!z_)break;F.delete(z_)}let g=L8(o.root,o.truncated,X_);F0.current=g,M.current=O,V_({loading:!1,error:null,payload:g})}).catch((l)=>{if(O0.current!==G)return;V_({loading:!1,error:l?.message||"Failed to load folder size chart",payload:n===O?v:null})})},[O,q_,$_,X_]);let Z0=Boolean(E&&E.kind==="text"&&!q_&&(!E.size||E.size<=262144)),E0=Z0?"Open in editor":E?.size>262144?"File too large to edit":"File is not editable";R(()=>{let G=Z_.current;if(b_.current)b_.current.dispose(),b_.current=null;if(!G)return;if(G.innerHTML="",!O||q_||!E||E.error)return;let Q={path:O,content:typeof E.text==="string"?E.text:void 0,mtime:E.mtime,size:E.size,preview:E,mode:"view"},F=l_.resolve(Q)||l_.get("workspace-preview-default");if(!F)return;let H=F.mount(G,Q);return b_.current=H,()=>{if(b_.current===H)H.dispose(),b_.current=null;G.innerHTML=""}},[O,q_,E]);let C0=(G)=>{let Q=G?.target;if(Q instanceof Element)return Q;return Q?.parentElement||null},r0=(G)=>{return Boolean(G?.closest?.(".workspace-node-icon, .workspace-label-text"))},G2=y((G)=>{if(m_.current)clearTimeout(m_.current),m_.current=null;let F=C0(G)?.closest?.("[data-path]");if(!F)return;let H=F.dataset.path;if(F.dataset.type==="dir"||!H)return;if(o0.current===H)Q0();S_.current?.(H)}).current,W2=y((G)=>{if(Y0.current){Y0.current=!1;return}let Q=C0(G),F=Q?.closest?.("[data-path]");if(v_.current?.focus?.(),!F)return;let H=F.dataset.path,v=F.dataset.type,n=Boolean(Q?.closest?.(".workspace-caret")),l=Boolean(Q?.closest?.("button"))||Boolean(Q?.closest?.("a"))||Boolean(Q?.closest?.("input")),o=O0.current===H,g=o0.current;if(g){if(g===H)return;Q0()}let z_=v==="file"&&T0.current===H&&!n&&!l;if(o&&!n&&!l&&H!=="."&&!z_){if(m_.current)clearTimeout(m_.current);m_.current=setTimeout(()=>{m_.current=null,E2(H)},350);return}if(v==="dir"){if(T0.current=null,Y(H),b(null),A(null),f(!1),!P_.current.has(H))j_.current?.(H);if(o&&!n)return;z((s0)=>{let i0=new Set(s0);if(i0.has(H))i0.delete(H);else i0.add(H);return i0})}else{T0.current=null,Y(H);let G0=W_.current.get(H);if(G0)g_.current?.(G0.path,G0);H_.current?.(H)}}).current,k0=y(()=>{w_.current="",C_.current(),Array.from(P_.current||[]).filter((Q)=>Q&&Q!==".").forEach((Q)=>j_.current?.(Q))}).current,J0=y(()=>{T0.current=null,Y(null),b(null),A(null),f(!1)}).current,A0=y(()=>{Y_((G)=>{let Q=!G;if(typeof window<"u")c_("workspaceShowHidden",String(Q));return Q_.current=Q,_3(!0,Q).catch(()=>{}),w_.current="",C_.current?.(),Array.from(P_.current||[]).filter((H)=>H&&H!==".").forEach((H)=>j_.current?.(H)),Q})}).current,L2=y((G)=>{if(C0(G)?.closest?.("[data-path]"))return;J0()}).current,u0=x(async(G)=>{if(!G)return;let Q=G.split("/").pop()||G;if(!window.confirm(`Delete "${Q}"? This cannot be undone.`))return;try{await W4(G);let H=G.includes("/")?G.split("/").slice(0,-1).join("/")||".":".";if(O0.current===G)J0();j_.current?.(H),i(null)}catch(H){b((v)=>({...v||{},error:H.message||"Failed to delete file"}))}},[J0]),B2=x((G)=>{let Q=v_.current;if(!Q||!G||typeof CSS>"u"||typeof CSS.escape!=="function")return;Q.querySelector(`[data-path="${CSS.escape(G)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),d0=x((G)=>{let Q=d;if(!Q||Q.length===0)return;let F=O?Q.findIndex((H)=>H.node.path===O):-1;if(G.key==="ArrowDown"){G.preventDefault();let H=Math.min(F+1,Q.length-1),v=Q[H];if(!v)return;if(Y(v.node.path),v.node.type!=="dir")g_.current?.(v.node.path,v.node),H_.current?.(v.node.path);else b(null),f(!1),A(null);B2(v.node.path);return}if(G.key==="ArrowUp"){G.preventDefault();let H=F<=0?0:F-1,v=Q[H];if(!v)return;if(Y(v.node.path),v.node.type!=="dir")g_.current?.(v.node.path,v.node),H_.current?.(v.node.path);else b(null),f(!1),A(null);B2(v.node.path);return}if(G.key==="ArrowRight"&&F>=0){let H=Q[F];if(H?.node?.type==="dir"&&!j.has(H.node.path))G.preventDefault(),j_.current?.(H.node.path),z((v)=>new Set([...v,H.node.path]));return}if(G.key==="ArrowLeft"&&F>=0){let H=Q[F];if(H?.node?.type==="dir"&&j.has(H.node.path))G.preventDefault(),z((v)=>{let n=new Set(v);return n.delete(H.node.path),n});return}if(G.key==="Enter"&&F>=0){G.preventDefault();let H=Q[F];if(!H)return;let v=H.node.path;if(H.node.type==="dir"){if(!P_.current.has(v))j_.current?.(v);z((l)=>{let o=new Set(l);if(o.has(v))o.delete(v);else o.add(v);return o}),b(null),A(null),f(!1)}else g_.current?.(v,H.node),H_.current?.(v);return}if((G.key==="Delete"||G.key==="Backspace")&&F>=0){let H=Q[F];if(!H||H.node.type==="dir")return;G.preventDefault(),u0(H.node.path);return}if(G.key==="Escape")G.preventDefault(),J0()},[J0,u0,j,d,B2,O]),T_=x((G)=>{let Q=C0(G),F=Q?.closest?.(".workspace-row");if(!F)return;let H=F.dataset.type,v=F.dataset.path;if(!v||v===".")return;if(o0.current===v)return;let n=G?.touches?.[0];if(!n)return;if(H0.current={path:r0(Q)?v:null,dragging:!1,startX:n.clientX,startY:n.clientY},H!=="file")return;if(F_.current)clearTimeout(F_.current);F_.current=setTimeout(()=>{if(F_.current=null,H0.current?.dragging)return;u0(v)},600)},[u0]),j0=x(()=>{if(F_.current)clearTimeout(F_.current),F_.current=null;let G=H0.current;if(G?.dragging&&G.path){let Q=d_.current||$0(),F=f0.current;if(typeof F==="function")F(G.path,Q)}H0.current={path:null,dragging:!1,startX:0,startY:0},r_.current=0,L_(!1),r(null),I_(null),N0(),g0()},[$0,g0,I_,N0]),q2=x((G)=>{let Q=H0.current,F=G?.touches?.[0];if(!F||!Q?.path){if(F_.current)clearTimeout(F_.current),F_.current=null;return}let H=Math.abs(F.clientX-Q.startX),v=Math.abs(F.clientY-Q.startY),n=H>8||v>8;if(n&&F_.current)clearTimeout(F_.current),F_.current=null;if(!Q.dragging&&n)Q.dragging=!0,L_(!0),r("move"),b0(Q.path);if(Q.dragging){G.preventDefault(),X0(F.clientX,F.clientY);let l=document.elementFromPoint(F.clientX,F.clientY),o=y0(l)||$0();if(d_.current!==o)I_(o);D0(o)}},[y0,$0,b0,X0,I_,D0]),X2=y((G)=>{G.preventDefault();let Q=x_.current;if(!Q)return;let F=G.clientY,H=o_.current||280,v=G.currentTarget;v.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let n=F,l=(g)=>{n=g.clientY;let z_=Q.clientHeight-80,G0=Math.min(Math.max(H-(g.clientY-F),80),z_);Q.style.setProperty("--preview-height",`${G0}px`),o_.current=G0},o=()=>{let g=Q.clientHeight-80,z_=Math.min(Math.max(H-(n-F),80),g);o_.current=z_,v.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",c_("previewHeight",String(Math.round(z_))),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",o)};document.addEventListener("mousemove",l),document.addEventListener("mouseup",o)}).current,w0=y((G)=>{G.preventDefault();let Q=x_.current;if(!Q)return;let F=G.touches[0];if(!F)return;let H=F.clientY,v=o_.current||280,n=G.currentTarget;n.classList.add("dragging"),document.body.style.userSelect="none";let l=(g)=>{let z_=g.touches[0];if(!z_)return;g.preventDefault();let G0=Q.clientHeight-80,s0=Math.min(Math.max(v-(z_.clientY-H),80),G0);Q.style.setProperty("--preview-height",`${s0}px`),o_.current=s0},o=()=>{n.classList.remove("dragging"),document.body.style.userSelect="",c_("previewHeight",String(Math.round(o_.current||v))),document.removeEventListener("touchmove",l),document.removeEventListener("touchend",o),document.removeEventListener("touchcancel",o)};document.addEventListener("touchmove",l,{passive:!1}),document.addEventListener("touchend",o),document.addEventListener("touchcancel",o)}).current,M0=async()=>{if(!O)return;try{let G=await L4(O);if(G.media_id)A(G.media_id)}catch(G){b((Q)=>({...Q||{},error:G.message||"Failed to attach"}))}},m2=async()=>{if(!O||q_)return;await u0(O)},Q2=(G)=>{return Array.from(G?.dataTransfer?.types||[]).includes("Files")},A2=x((G)=>{if(!Q2(G))return;if(G.preventDefault(),r_.current+=1,!c0.current)L_(!0);r("upload");let Q=R0(G)||$0();I_(Q),D0(Q)},[$0,R0,I_,D0]),w2=x((G)=>{if(!Q2(G))return;if(G.preventDefault(),G.dataTransfer)G.dataTransfer.dropEffect="copy";if(!c0.current)L_(!0);if($2.current!=="upload")r("upload");let Q=R0(G)||$0();if(d_.current!==Q)I_(Q);D0(Q)},[$0,R0,I_,D0]),V3=x((G)=>{if(!Q2(G))return;if(G.preventDefault(),r_.current=Math.max(0,r_.current-1),r_.current===0)L_(!1),r(null),I_(null),N0()},[I_,N0]),p0=x(async(G,Q=".")=>{let F=Array.from(G||[]);if(F.length===0)return;let H=Q&&Q!==""?Q:".",v=H!=="."?H:"workspace root";K_(!0);try{let n=null;for(let l of F)try{n=await R3(l,H)}catch(o){let g=o?.status,z_=o?.code;if(g===409||z_==="file_exists"){let G0=l?.name||"file";if(!window.confirm(`"${G0}" already exists in ${v}. Overwrite?`))continue;n=await R3(l,H,{overwrite:!0})}else throw o}if(n?.path)T0.current=n.path,Y(n.path),H_.current?.(n.path);j_.current?.(H)}catch(n){i(n.message||"Failed to upload file")}finally{K_(!1)}},[]),W3=x(async(G,Q)=>{if(!G)return;let F=W_.current?.get(G);if(!F)return;let H=Q&&Q!==""?Q:".",v=G.includes("/")?G.split("/").slice(0,-1).join("/")||".":".";if(H===v)return;try{let l=(await V4(G,H))?.path||G;if(F.type==="dir")z((o)=>{let g=new Set;for(let z_ of o)if(z_===G)g.add(l);else if(z_.startsWith(`${G}/`))g.add(`${l}${z_.slice(G.length)}`);else g.add(z_);return g});if(Y(l),F.type==="dir")b(null),f(!1),A(null);else H_.current?.(l);j_.current?.(v),j_.current?.(H)}catch(n){i(n?.message||"Failed to move entry")}},[]);f0.current=W3;let X3=x(async(G)=>{if(!Q2(G))return;G.preventDefault(),r_.current=0,L_(!1),r(null),J_(null),N0();let Q=Array.from(G?.dataTransfer?.files||[]);if(Q.length===0)return;let F=d_.current||R0(G)||$0();await p0(Q,F)},[$0,R0,p0]),R2=x((G)=>{if(G?.stopPropagation?.(),G_)return;let Q=G?.currentTarget?.dataset?.uploadTarget||".";B0.current=Q,n_.current?.click()},[G_]),g2=x(()=>{if(G_)return;let G=O0.current,Q=G?W_.current?.get(G):null;B0.current=Q?.type==="dir"?Q.path:".",n_.current?.click()},[G_]),z0=x((G)=>{if(!G||G.button!==0)return;let Q=G.currentTarget;if(!Q||!Q.dataset)return;let F=Q.dataset.path;if(!F||F===".")return;if(o0.current===F)return;let H=C0(G);if(H?.closest?.("button, a, input, .workspace-caret"))return;if(!r0(H))return;G.preventDefault(),S0.current={path:F,dragging:!1,startX:G.clientX,startY:G.clientY};let v=(l)=>{let o=S0.current;if(!o?.path)return;let g=Math.abs(l.clientX-o.startX),z_=Math.abs(l.clientY-o.startY),G0=g>4||z_>4;if(!o.dragging&&G0)o.dragging=!0,Y0.current=!0,L_(!0),r("move"),b0(o.path),X0(l.clientX,l.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(o.dragging){l.preventDefault(),X0(l.clientX,l.clientY);let s0=document.elementFromPoint(l.clientX,l.clientY),i0=y0(s0)||$0();if(d_.current!==i0)I_(i0);D0(i0)}},n=()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",n);let l=S0.current;if(l?.dragging&&l.path){let o=d_.current||$0(),g=f0.current;if(typeof g==="function")g(l.path,o)}S0.current={path:null,dragging:!1,startX:0,startY:0},r_.current=0,L_(!1),r(null),I_(null),N0(),g0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{Y0.current=!1},0)};document.addEventListener("mousemove",v),document.addEventListener("mouseup",n)},[y0,$0,b0,X0,g0,I_,D0,N0]),Q3=x(async(G)=>{let Q=Array.from(G?.target?.files||[]);if(Q.length===0)return;let F=B0.current||".";if(await p0(Q,F),B0.current=".",G?.target)G.target.value=""},[p0]);return W`
        <aside
            class=${`workspace-sidebar${s?" workspace-drop-active":""}`}
            data-workspace-scale=${R_}
            ref=${x_}
            onDragEnter=${A2}
            onDragOver=${w2}
            onDragLeave=${V3}
            onDrop=${X3}
        >
            <input type="file" multiple style="display:none" ref=${n_} onChange=${Q3} />
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
                    <button class="workspace-refresh" onClick=${k0} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${$_?" active":""}`}
                        onClick=${A0}
                        title=${$_?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!$_&&W`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${L2}>
                ${G_&&W`<div class="workspace-drop-hint">Uploading…</div>`}
                ${X&&W`<div class="workspace-loading">Loading…</div>`}
                ${p&&W`<div class="workspace-error">${p}</div>`}
                ${K&&W`
                    <div
                        class="workspace-tree-list"
                        ref=${v_}
                        tabIndex="0"
                        onClick=${W2}
                        onDblClick=${G2}
                        onKeyDown=${d0}
                        onTouchStart=${T_}
                        onTouchEnd=${j0}
                        onTouchMove=${q2}
                        onTouchCancel=${j0}
                    >
                        ${d.map(({node:G,depth:Q})=>{let F=G.type==="dir",H=G.path===O,v=G.path===V,n=F&&j.has(G.path),l=a&&G.path===a,o=Array.isArray(G.children)&&G.children.length>0?G.children.length:Number(G.child_count)||0;return W`
                                <div
                                    key=${G.path}
                                    class=${`workspace-row${H?" selected":""}${l?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+Q*k_.indentPx}px`}}
                                    data-path=${G.path}
                                    data-type=${G.type}
                                    onMouseDown=${z0}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${F?n?W`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:W`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${F?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${F?W`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:W`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${v?W`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${t_}
                                                value=${C}
                                                onInput=${(g)=>D(g?.target?.value||"")}
                                                onKeyDown=${(g)=>{if(g.key==="Enter")g.preventDefault(),U0();else if(g.key==="Escape")g.preventDefault(),Q0()}}
                                                onBlur=${Q0}
                                                onClick=${(g)=>g.stopPropagation()}
                                            />
                                        `:W`<span class="workspace-label"><span class="workspace-label-text">${G.name}</span></span>`}
                                    ${F&&!n&&o>0&&W`
                                        <span class="workspace-count">${o}</span>
                                    `}
                                    ${F&&W`
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
            ${O&&W`
                <div class="workspace-preview-splitter-h" onMouseDown=${X2} onTouchStart=${w0}></div>
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
                            ${!q_&&W`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>Z0&&S_.current?.(O,E)}
                                    title=${E0}
                                    disabled=${!Z0}
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
                            ${q_?W`
                                    <button class="workspace-download" onClick=${g2}
                                        title="Upload files to this folder" disabled=${G_}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${X4(O,$_)}
                                        title="Download folder as zip" onClick=${(G)=>G.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:W`<button class="workspace-download" onClick=${M0} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${P&&W`<div class="workspace-loading">Loading preview…</div>`}
                    ${E?.error&&W`<div class="workspace-error">${E.error}</div>`}
                    ${q_&&W`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${E_?.loading&&W`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${E_?.error&&W`<div class="workspace-error">${E_.error}</div>`}
                        ${E_?.payload&&E_.payload.segments?.length>0&&W`
                            <${c$} payload=${E_.payload} />
                        `}
                        ${E_?.payload&&(!E_.payload.segments||E_.payload.segments.length===0)&&W`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${E&&!E.error&&!q_&&W`
                        <div class="workspace-preview-body" ref=${Z_}></div>
                    `}
                    ${m&&W`
                        <div class="workspace-download-card">
                            <${v$} mediaId=${m} />
                        </div>
                    `}
                </div>
            `}
            ${__&&W`
                <div class="workspace-drag-ghost" ref=${V0}>${__.label}</div>
            `}
        </aside>
    `}function D8({tabs:_,activeId:$,onActivate:N,onClose:Z,onCloseOthers:K,onCloseAll:J,onTogglePin:j,onTogglePreview:z,previewTabs:O,onToggleDock:Y,dockVisible:V}){let[B,C]=u(null),D=y(null);R(()=>{if(!B)return;let X=(w)=>{if(w.type==="keydown"&&w.key!=="Escape")return;C(null)};return document.addEventListener("click",X),document.addEventListener("keydown",X),()=>{document.removeEventListener("click",X),document.removeEventListener("keydown",X)}},[B]),R(()=>{let X=(w)=>{if(w.ctrlKey&&w.key==="Tab"){if(w.preventDefault(),!_.length)return;let P=_.findIndex((f)=>f.id===$);if(w.shiftKey){let f=_[(P-1+_.length)%_.length];N?.(f.id)}else{let f=_[(P+1)%_.length];N?.(f.id)}return}if((w.ctrlKey||w.metaKey)&&w.key==="w"){let P=document.querySelector(".editor-pane");if(P&&P.contains(document.activeElement)){if(w.preventDefault(),$)Z?.($)}}};return document.addEventListener("keydown",X),()=>document.removeEventListener("keydown",X)},[_,$,N,Z]);let E=x((X,w)=>{if(X.button===1){X.preventDefault(),Z?.(w);return}if(X.button===0)N?.(w)},[N,Z]),b=x((X,w)=>{X.preventDefault(),C({id:w,x:X.clientX,y:X.clientY})},[]),m=x((X)=>{X.preventDefault(),X.stopPropagation()},[]),A=x((X,w)=>{X.preventDefault(),X.stopPropagation(),Z?.(w)},[Z]);if(R(()=>{if(!$||!D.current)return;let X=D.current.querySelector(".tab-item.active");if(X)X.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return W`
        <div class="tab-strip" ref=${D} role="tablist">
            ${_.map((X)=>W`
                <div
                    key=${X.id}
                    class=${`tab-item${X.id===$?" active":""}${X.dirty?" dirty":""}${X.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${X.id===$}
                    title=${X.path}
                    onMouseDown=${(w)=>E(w,X.id)}
                    onContextMenu=${(w)=>b(w,X.id)}
                >
                    ${X.pinned&&W`
                        <span class="tab-pin-icon" aria-label="Pinned">
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                <path d="M4.456.734a1.75 1.75 0 0 1 2.826.504l.613 1.327a3.1 3.1 0 0 0 2.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.1 3.1 0 0 0-1.707-2.084l-1.327-.613a1.75 1.75 0 0 1-.504-2.826z"/>
                            </svg>
                        </span>
                    `}
                    <span class="tab-label">${X.label}</span>
                    <button
                        type="button"
                        class="tab-close"
                        onMouseDown=${m}
                        onClick=${(w)=>A(w,X.id)}
                        title=${X.dirty?"Unsaved changes":"Close"}
                        aria-label=${X.dirty?"Unsaved changes":`Close ${X.label}`}
                    >
                        ${X.dirty?W`<span class="tab-dirty-dot" aria-hidden="true"></span>`:W`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                <line x1="4" y1="4" x2="12" y2="12"/>
                                <line x1="12" y1="4" x2="4" y2="12"/>
                            </svg>`}
                    </button>
                </div>
            `)}
            ${Y&&W`
                <div class="tab-strip-spacer"></div>
                <button
                    class=${`tab-strip-dock-toggle${V?" active":""}`}
                    onClick=${Y}
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
        ${B&&W`
            <div class="tab-context-menu" style=${{left:B.x+"px",top:B.y+"px"}}>
                <button onClick=${()=>{Z?.(B.id),C(null)}}>Close</button>
                <button onClick=${()=>{K?.(B.id),C(null)}}>Close Others</button>
                <button onClick=${()=>{J?.(),C(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{j?.(B.id),C(null)}}>
                    ${_.find((X)=>X.id===B.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${z&&/\.(md|mdx|markdown)$/i.test(B.id)&&W`
                    <hr />
                    <button onClick=${()=>{z(B.id),C(null)}}>
                        ${O?.has(B.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var m$=400,G1=60,C8=220,L1="mdPreviewHeight";function R$(){try{let _=localStorage.getItem(L1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=G1?$:C8}catch{return C8}}function k8({getContent:_,path:$,onClose:N}){let[Z,K]=u(""),[J,j]=u(R$),z=y(null),O=y(null),Y=y(""),V=y(_);return V.current=_,R(()=>{let D=()=>{let b=V.current?.()||"";if(b===Y.current)return;Y.current=b;try{let m=j2(b,null,{sanitize:!1});K(m)}catch{K('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};D();let E=setInterval(D,m$);return()=>clearInterval(E)},[]),R(()=>{if(z.current&&Z)k2(z.current).catch(()=>{})},[Z]),W`
        <div
            class="md-preview-splitter"
            onMouseDown=${(D)=>{D.preventDefault();let E=D.clientY,b=O.current?.offsetHeight||J,m=O.current?.parentElement,A=m?m.offsetHeight*0.7:500,X=D.currentTarget;X.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let w=(f)=>{let p=Math.min(Math.max(b-(f.clientY-E),G1),A);j(p)},P=()=>{X.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(L1,String(Math.round(O.current?.offsetHeight||J)))}catch{}document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",P)};document.addEventListener("mousemove",w),document.addEventListener("mouseup",P)}}
            onTouchStart=${(D)=>{D.preventDefault();let E=D.touches[0];if(!E)return;let b=E.clientY,m=O.current?.offsetHeight||J,A=O.current?.parentElement,X=A?A.offsetHeight*0.7:500,w=D.currentTarget;w.classList.add("dragging"),document.body.style.userSelect="none";let P=(p)=>{let i=p.touches[0];if(!i)return;p.preventDefault();let $_=Math.min(Math.max(m-(i.clientY-b),G1),X);j($_)},f=()=>{w.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(L1,String(Math.round(O.current?.offsetHeight||J)))}catch{}document.removeEventListener("touchmove",P),document.removeEventListener("touchend",f),document.removeEventListener("touchcancel",f)};document.addEventListener("touchmove",P,{passive:!1}),document.addEventListener("touchend",f),document.addEventListener("touchcancel",f)}}
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
                ref=${z}
                dangerouslySetInnerHTML=${{__html:Z}}
            />
        </div>
    `}function b8({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:N}){let Z=y(_);Z.current=_;let K=y($);K.current=$;let J=y(N);J.current=N,R(()=>{J.current();let j=new h3((O,Y)=>Z.current(O,Y),(O)=>K.current(O));j.connect();let z=()=>{j.reconnectIfNeeded()};return window.addEventListener("focus",z),document.addEventListener("visibilitychange",z),()=>{window.removeEventListener("focus",z),document.removeEventListener("visibilitychange",z),j.disconnect()}},[])}function E8(){let[_,$]=u(!1),[N,Z]=u("default"),K=y(!1);R(()=>{let O=F2("notificationsEnabled",!1);if(K.current=O,$(O),typeof Notification<"u")Z(Notification.permission)},[]),R(()=>{K.current=_},[_]);let J=x(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let O=Notification.requestPermission();if(O&&typeof O.then==="function")return O;return Promise.resolve(O)}catch{return Promise.resolve("default")}},[]),j=x(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){Z("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let Y=await J();if(Z(Y||"default"),Y!=="granted"){K.current=!1,$(!1),c_("notificationsEnabled","false");return}}let O=!K.current;K.current=O,$(O),c_("notificationsEnabled",String(O))},[J]),z=x((O,Y)=>{if(!K.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let V=new Notification(O,{body:Y});return V.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:N,toggleNotifications:j,notify:z}}var c2=(_)=>{let $=new Set;return(_||[]).filter((N)=>{if(!N||$.has(N.id))return!1;return $.add(N.id),!0})};function A8({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[N,Z]=u(null),[K,J]=u(!1),j=y(!1),z=y(null),O=y(!1),Y=y(null),V=y(null);R(()=>{j.current=K},[K]),R(()=>{V.current=N},[N]);let B=x(async(E=null)=>{try{if(E){let b=await a1(E);Z(b.posts),J(!1)}else{let b=await t2(10);Z(b.posts),J(b.has_more)}}catch(b){console.error("Failed to load posts:",b)}},[]),C=x(async()=>{try{let E=await t2(10);Z((b)=>{if(!b||b.length===0)return E.posts;return c2([...E.posts,...b])}),J((b)=>b||E.has_more)}catch(E){console.error("Failed to refresh timeline:",E)}},[]),D=x(async(E={})=>{let b=V.current;if(!b||b.length===0)return;if(O.current)return;let{preserveScroll:m=!0,preserveMode:A="top",allowRepeat:X=!1}=E,w=(p)=>{if(!m){p();return}if(A==="top")$(p);else _(p)},f=b.slice().sort((p,i)=>p.id-i.id)[0]?.id;if(!Number.isFinite(f))return;if(!X&&Y.current===f)return;O.current=!0,Y.current=f;try{let p=await t2(10,f);if(p.posts.length>0)w(()=>{Z((i)=>c2([...p.posts,...i||[]])),J(p.has_more)});else J(!1)}catch(p){console.error("Failed to load more posts:",p)}finally{O.current=!1}},[_,$]);return R(()=>{z.current=D},[D]),{posts:N,setPosts:Z,hasMore:K,setHasMore:J,hasMoreRef:j,loadPosts:B,refreshTimeline:C,loadMore:D,loadMoreRef:z,loadingMoreRef:O,lastBeforeIdRef:Y}}function w8(){let[_,$]=u(null),[N,Z]=u({text:"",totalLines:0}),[K,J]=u(""),[j,z]=u({text:"",totalLines:0}),[O,Y]=u(null),[V,B]=u(null),[C,D]=u(null),E=y(null),b=y(0),m=y(!1),A=y(""),X=y(""),w=y(null),P=y(null),f=y(null),p=y(null),i=y(!1),$_=y(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:N,setAgentDraft:Z,agentPlan:K,setAgentPlan:J,agentThought:j,setAgentThought:z,pendingRequest:O,setPendingRequest:Y,currentTurnId:V,setCurrentTurnId:B,steerQueuedTurnId:C,setSteerQueuedTurnId:D,lastAgentEventRef:E,lastSilenceNoticeRef:b,isAgentRunningRef:m,draftBufferRef:A,thoughtBufferRef:X,pendingRequestRef:w,stalledPostIdRef:P,currentTurnIdRef:f,steerQueuedTurnIdRef:p,thoughtExpandedRef:i,draftExpandedRef:$_}}function M8({appShellRef:_,sidebarWidthRef:$,editorWidthRef:N,dockHeightRef:Z}){let K=y((V)=>{V.preventDefault();let B=_.current;if(!B)return;let C=V.clientX,D=$.current||280,E=V.currentTarget;E.classList.add("dragging"),B.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let b=C,m=(X)=>{b=X.clientX;let w=Math.min(Math.max(D+(X.clientX-C),160),600);B.style.setProperty("--sidebar-width",`${w}px`),$.current=w},A=()=>{let X=Math.min(Math.max(D+(b-C),160),600);$.current=X,E.classList.remove("dragging"),B.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",c_("sidebarWidth",String(Math.round(X))),document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",A)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",A)}).current,J=y((V)=>{V.preventDefault();let B=_.current;if(!B)return;let C=V.touches[0];if(!C)return;let D=C.clientX,E=$.current||280,b=V.currentTarget;b.classList.add("dragging"),B.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let m=(X)=>{let w=X.touches[0];if(!w)return;X.preventDefault();let P=Math.min(Math.max(E+(w.clientX-D),160),600);B.style.setProperty("--sidebar-width",`${P}px`),$.current=P},A=()=>{b.classList.remove("dragging"),B.classList.remove("sidebar-resizing"),document.body.style.userSelect="",c_("sidebarWidth",String(Math.round($.current||E))),document.removeEventListener("touchmove",m),document.removeEventListener("touchend",A),document.removeEventListener("touchcancel",A)};document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("touchend",A),document.addEventListener("touchcancel",A)}).current,j=y((V)=>{V.preventDefault();let B=_.current;if(!B)return;let C=V.clientX,D=N.current||$.current||280,E=V.currentTarget;E.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let b=C,m=(X)=>{b=X.clientX;let w=Math.min(Math.max(D+(X.clientX-C),200),800);B.style.setProperty("--editor-width",`${w}px`),N.current=w},A=()=>{let X=Math.min(Math.max(D+(b-C),200),800);N.current=X,E.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",c_("editorWidth",String(Math.round(X))),document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",A)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",A)}).current,z=y((V)=>{V.preventDefault();let B=_.current;if(!B)return;let C=V.touches[0];if(!C)return;let D=C.clientX,E=N.current||$.current||280,b=V.currentTarget;b.classList.add("dragging"),document.body.style.userSelect="none";let m=(X)=>{let w=X.touches[0];if(!w)return;X.preventDefault();let P=Math.min(Math.max(E+(w.clientX-D),200),800);B.style.setProperty("--editor-width",`${P}px`),N.current=P},A=()=>{b.classList.remove("dragging"),document.body.style.userSelect="",c_("editorWidth",String(Math.round(N.current||E))),document.removeEventListener("touchmove",m),document.removeEventListener("touchend",A),document.removeEventListener("touchcancel",A)};document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("touchend",A),document.addEventListener("touchcancel",A)}).current,O=y((V)=>{V.preventDefault();let B=_.current;if(!B)return;let C=V.clientY,D=Z?.current||200,E=V.currentTarget;E.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let b=C,m=(X)=>{b=X.clientY;let w=Math.min(Math.max(D-(X.clientY-C),100),window.innerHeight*0.5);if(B.style.setProperty("--dock-height",`${w}px`),Z)Z.current=w;window.dispatchEvent(new CustomEvent("dock-resize"))},A=()=>{let X=Math.min(Math.max(D-(b-C),100),window.innerHeight*0.5);if(Z)Z.current=X;E.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",c_("dockHeight",String(Math.round(X))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",A)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",A)}).current,Y=y((V)=>{V.preventDefault();let B=_.current;if(!B)return;let C=V.touches[0];if(!C)return;let D=C.clientY,E=Z?.current||200,b=V.currentTarget;b.classList.add("dragging"),document.body.style.userSelect="none";let m=(X)=>{let w=X.touches[0];if(!w)return;X.preventDefault();let P=Math.min(Math.max(E-(w.clientY-D),100),window.innerHeight*0.5);if(B.style.setProperty("--dock-height",`${P}px`),Z)Z.current=P;window.dispatchEvent(new CustomEvent("dock-resize"))},A=()=>{b.classList.remove("dragging"),document.body.style.userSelect="",c_("dockHeight",String(Math.round(Z?.current||E))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",m),document.removeEventListener("touchend",A),document.removeEventListener("touchcancel",A)};document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("touchend",A),document.addEventListener("touchcancel",A)}).current;return{handleSplitterMouseDown:K,handleSplitterTouchStart:J,handleEditorSplitterMouseDown:j,handleEditorSplitterTouchStart:z,handleDockSplitterMouseDown:O,handleDockSplitterTouchStart:Y}}function P8({onTabClosed:_}={}){let $=y(_);$.current=_;let[N,Z]=u(()=>A_.getTabs()),[K,J]=u(()=>A_.getActiveId()),[j,z]=u(()=>A_.getTabs().length>0);R(()=>{return A_.onChange((P,f)=>{Z(P),J(f),z(P.length>0)})},[]);let[O,Y]=u(()=>new Set),V=x((P)=>{Y((f)=>{let p=new Set(f);if(p.has(P))p.delete(P);else p.add(P);return p})},[]),B=x((P)=>{Y((f)=>{if(!f.has(P))return f;let p=new Set(f);return p.delete(P),p})},[]),C=x((P)=>{if(!P)return;let f={path:P,mode:"edit"};try{if(!l_.resolve(f)){if(!l_.get("editor")){console.warn(`[openEditor] No pane handler for: ${P}`);return}}}catch(p){console.warn(`[openEditor] paneRegistry.resolve() error for "${P}":`,p)}A_.open(P)},[]),D=x(()=>{let P=A_.getActiveId();if(P){let f=A_.get(P);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}A_.close(P),B(P),$.current?.(P)}},[B]),E=x((P)=>{let f=A_.get(P);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}A_.close(P),B(P),$.current?.(P)},[B]),b=x((P)=>{A_.activate(P)},[]),m=x((P)=>{let f=A_.getTabs().filter(($_)=>$_.id!==P&&!$_.pinned),p=f.filter(($_)=>$_.dirty).length;if(p>0){if(!window.confirm(`${p} unsaved tab${p>1?"s":""} will be closed. Continue?`))return}let i=f.map(($_)=>$_.id);A_.closeOthers(P),i.forEach(($_)=>{B($_),$.current?.($_)})},[B]),A=x(()=>{let P=A_.getTabs().filter((i)=>!i.pinned),f=P.filter((i)=>i.dirty).length;if(f>0){if(!window.confirm(`${f} unsaved tab${f>1?"s":""} will be closed. Continue?`))return}let p=P.map((i)=>i.id);A_.closeAll(),p.forEach((i)=>{B(i),$.current?.(i)})},[B]),X=x((P)=>{A_.togglePin(P)},[]),w=x(()=>{let P=A_.getActiveId();if(P)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:P}}))},[]);return R(()=>{let P=(f)=>{let{oldPath:p,newPath:i,type:$_}=f.detail||{};if(!p||!i)return;if($_==="dir"){for(let Y_ of A_.getTabs())if(Y_.path===p||Y_.path.startsWith(`${p}/`)){let s=`${i}${Y_.path.slice(p.length)}`;A_.rename(Y_.id,s)}}else A_.rename(p,i)};return window.addEventListener("workspace-file-renamed",P),()=>window.removeEventListener("workspace-file-renamed",P)},[]),R(()=>{let P=(f)=>{if(A_.hasUnsaved())f.preventDefault(),f.returnValue=""};return window.addEventListener("beforeunload",P),()=>window.removeEventListener("beforeunload",P)},[]),{editorOpen:j,tabStripTabs:N,tabStripActiveId:K,previewTabs:O,openEditor:C,closeEditor:D,handleTabClose:E,handleTabActivate:b,handleTabCloseOthers:m,handleTabCloseAll:A,handleTabTogglePin:X,handleTabTogglePreview:V,revealInExplorer:w}}function B1(_,$){try{if(typeof window>"u")return $;let N=window.__PICLAW_SILENCE||{},Z=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,K=N[_]??window[Z],J=Number(K);return Number.isFinite(J)?J:$}catch{return $}}var q1=B1("warning",30000),S8=B1("finalize",120000),V1=B1("refresh",30000),x8=30000;function f8(_){let $={};return(_?.agents||[]).forEach((N)=>{$[N.id]=N}),$}function T8(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function I8(_=30000){let[,$]=u(0);R(()=>{let N=setInterval(()=>$((Z)=>Z+1),_);return()=>clearInterval(N)},[_])}function W1(_,$=160){let N=String(_||"").replace(/\r\n/g,`
`);if(!N)return 0;return N.split(`
`).reduce((Z,K)=>Z+Math.max(1,Math.ceil(K.length/$)),0)}function u8(_,$){if(typeof _!=="string")return{kind:"ignore"};let N=_.trim();if(!N)return{kind:"toast",title:"No file selected",detail:"Use a valid file path from a file pill.",level:"warning"};if(!$.editorOpen)return{kind:"toast",title:"Editor pane is not open",detail:"Open the editor pane to open files from pills.",level:"warning"};if(/^[a-z][a-z0-9+.-]*:/i.test(N))return{kind:"toast",title:"Cannot open external path from file pill",detail:"Use an in-workspace file path.",level:"warning"};try{if(!$.resolvePane({path:N,mode:"edit"}))return{kind:"toast",title:"No editor available",detail:`No editor can open: ${N}`,level:"warning"}}catch{return{kind:"toast",title:"No editor available",detail:`No editor can open: ${N}`,level:"warning"}}return{kind:"open",path:N}}function v2(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var g$=t1,c8=_4,h$=$4,v8=K4,m8=j4,R8=N4,X1=typeof I3==="function"?I3:v2("getAgentContext",null),p$=typeof V2==="function"?V2:v2("getAgentModels",{current:null,models:[]}),i$=typeof u3==="function"?u3:v2("getAgentQueueState",{count:0}),n$=typeof v3==="function"?v3:v2("steerAgentQueueItem",{removed:!1,queued:"steer"}),l$=typeof c3==="function"?c3:v2("removeAgentQueueItem",{removed:!1});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});l_.register(s3);l_.register(N1);l_.register($1);a3();l_.register(e3);function o$(){let[_,$]=u("disconnected"),[N,Z]=u(null),[K,J]=u(null),[j,z]=u(!1),[O,Y]=u([]),[V,B]=u([]),[C,D]=u(null),{agentStatus:E,setAgentStatus:b,agentDraft:m,setAgentDraft:A,agentPlan:X,setAgentPlan:w,agentThought:P,setAgentThought:f,pendingRequest:p,setPendingRequest:i,currentTurnId:$_,setCurrentTurnId:Y_,steerQueuedTurnId:s,setSteerQueuedTurnId:L_,lastAgentEventRef:y_,lastSilenceNoticeRef:r,isAgentRunningRef:__,draftBufferRef:e,thoughtBufferRef:a,pendingRequestRef:J_,stalledPostIdRef:G_,currentTurnIdRef:K_,steerQueuedTurnIdRef:E_,thoughtExpandedRef:V_,draftExpandedRef:X_}=w8(),[f_,R_]=u({}),[L0,P_]=u(null),[w_,N_]=u(null),[D_,B_]=u(!1),[C_,W_]=u(null),[g_,S_]=u(null),[H_,j_]=u([]),[x_,v_]=u(!1),t_=H_.length,n_=y(new Set),B0=y([]),F_=y(new Set),H0=y({inFlight:!1,lastAttemptAt:0,turnId:null});n_.current=new Set(H_.map((L)=>L.row_id)),B0.current=H_;let{notificationsEnabled:S0,notificationPermission:K0,toggleNotifications:Y0,notify:o_}=E8(),[x0,F0]=u(()=>new Set),[M,Z_]=u(()=>F2("workspaceOpen",!0)),b_=y(null),{editorOpen:Q_,tabStripTabs:q0,tabStripActiveId:e_,previewTabs:r_,openEditor:d_,closeEditor:c0,handleTabClose:$2,handleTabActivate:V0,handleTabCloseOthers:Y2,handleTabCloseAll:_0,handleTabTogglePin:f0,handleTabTogglePreview:O0,revealInExplorer:o0}=P8({onTabClosed:(L)=>b_.current?.(L)}),T0=y(null),m_=y(null),O2=y(null),v0=y(null),W0=l_.getDockPanes().length>0,[m0,$0]=u(!1),y0=x(()=>$0((L)=>!L),[]),R0=Q_||W0&&m0;R(()=>{let L=T0.current;if(!L)return;if(m_.current)m_.current.dispose(),m_.current=null;let q=e_;if(!q)return;let k={path:q,mode:"edit"},S=l_.resolve(k)||l_.get("editor");if(!S){L.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let c=S.mount(L,k);m_.current=c,c.onDirtyChange?.((h)=>{A_.setDirty(q,h)}),c.onSaveRequest?.(()=>{}),c.onClose?.(()=>{c0()});let T=A_.getViewState(q);if(T&&typeof c.restoreViewState==="function")requestAnimationFrame(()=>c.restoreViewState(T));if(typeof c.onViewStateChange==="function")c.onViewStateChange((h)=>{A_.saveViewState(q,h)});return requestAnimationFrame(()=>c.focus()),()=>{if(m_.current===c)c.dispose(),m_.current=null}},[e_,c0]),R(()=>{let L=O2.current;if(v0.current)v0.current.dispose(),v0.current=null;if(!L||!W0||!m0)return;let q=l_.getDockPanes()[0];if(!q){L.innerHTML='<div class="terminal-placeholder">No dock pane available.</div>';return}let k=q.mount(L,{mode:"view"});return v0.current=k,requestAnimationFrame(()=>k.focus?.()),()=>{if(v0.current===k)k.dispose(),v0.current=null}},[W0,m0]);let[I_,N0]=u({name:"You",avatar_url:null,avatar_background:null}),D0=y(!1),X0=y(!1),b0=y(null),g0=y(0),N2=y(0),Q0=y({}),E2=y({name:null,avatar_url:null}),U0=y({currentHashtag:null,searchQuery:null}),I0=y(null),h0=y(null),Z2=y(0),U=y(0),I=y(0),d=y(null),O_=y(null),k_=y(null),h_=y(0),q_=y({title:null,avatarBase:null}),Z0=y(null),E0=x(()=>{if(Z0.current)clearTimeout(Z0.current),Z0.current=null;D(null)},[]);I8(30000),R(()=>{return b4()},[]),R(()=>{c_("workspaceOpen",String(M))},[M]),R(()=>{return()=>{E0()}},[E0]),R(()=>{Q0.current=f_||{}},[f_]),R(()=>{E2.current=I_||{name:"You",avatar_url:null,avatar_background:null}},[I_]);let C0=x((L,q,k=null)=>{if(typeof document>"u")return;let S=(L||"").trim()||"PiClaw";if(q_.current.title!==S){document.title=S;let U_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(U_&&U_.getAttribute("content")!==S)U_.setAttribute("content",S);q_.current.title=S}let c=document.getElementById("dynamic-favicon");if(!c)return;let T=c.getAttribute("data-default")||c.getAttribute("href")||"/favicon.ico",h=q||T,t=q?`${h}|${k||""}`:h;if(q_.current.avatarBase!==t){let U_=q?`${h}${h.includes("?")?"&":"?"}v=${k||Date.now()}`:h;c.setAttribute("href",U_),q_.current.avatarBase=t}},[]),r0=x((L)=>{if(!L)return;Y((q)=>q.includes(L)?q:[...q,L])},[]),G2=x((L)=>{Y((q)=>q.filter((k)=>k!==L))},[]);b_.current=G2;let W2=x(()=>{Y([])},[]),k0=x((L,q=null,k="info",S=3000)=>{E0(),D({title:L,detail:q||null,kind:k||"info"}),Z0.current=setTimeout(()=>{D((c)=>c?.title===L?null:c)},S)},[E0]),J0=x((L)=>{let q=u8(L,{editorOpen:Q_,resolvePane:(k)=>l_.resolve(k)});if(q.kind==="open"){d_(q.path);return}if(q.kind==="toast")k0(q.title,q.detail,q.level)},[Q_,d_,k0]),A0=x(()=>{let L=e_;if(L)r0(L)},[e_,r0]),L2=x((L)=>{if(!L)return;B((q)=>q.includes(L)?q:[...q,L])},[]),u0=x(async(L)=>{let q=(S)=>{S.scrollIntoView({behavior:"smooth",block:"center"}),S.classList.add("post-highlight"),setTimeout(()=>S.classList.remove("post-highlight"),2000)},k=document.getElementById("post-"+L);if(k){q(k);return}try{let c=(await e1(L))?.thread?.[0];if(!c)return;z0((T)=>{if(!T)return[c];if(T.some((h)=>h.id===c.id))return T;return[...T,c]}),requestAnimationFrame(()=>{setTimeout(()=>{let T=document.getElementById("post-"+L);if(T)q(T)},50)})}catch(S){console.error("[scrollToMessage] Failed to fetch message",L,S)}},[]),B2=x((L)=>{B((q)=>q.filter((k)=>k!==L))},[]),d0=x(()=>{B([])},[]),T_=x((L={})=>{let q=Date.now();if(y_.current=q,L.running)__.current=!0,v_((k)=>k?k:!0);if(L.clearSilence)r.current=0},[v_]),j0=x(()=>{if(k_.current)clearTimeout(k_.current),k_.current=null;h_.current=0},[]);R(()=>()=>{j0()},[j0]);let q2=x(()=>{j0(),b((L)=>{if(!L)return L;if(!(L.last_activity||L.lastActivity))return L;let{last_activity:q,lastActivity:k,...S}=L;return S})},[j0]),X2=x((L)=>{if(!L)return;j0();let q=Date.now();h_.current=q,b({type:L.type||"active",last_activity:!0}),k_.current=setTimeout(()=>{if(h_.current!==q)return;b((k)=>{if(!k||!(k.last_activity||k.lastActivity))return k;return null})},x8)},[j0]),w0=x(()=>{__.current=!1,v_(!1),y_.current=null,r.current=0,e.current="",a.current="",J_.current=null,O_.current=null,K_.current=null,E_.current=null,b0.current=null,H0.current={inFlight:!1,lastAttemptAt:0,turnId:null},j0(),Y_(null),L_(null),V_.current=!1,X_.current=!1},[j0,Y_,L_,v_]),M0=x((L)=>{if(!L)return;if(K_.current===L)return;K_.current=L,H0.current={inFlight:!1,lastAttemptAt:0,turnId:L},Y_(L),E_.current=null,L_(null),e.current="",a.current="",A({text:"",totalLines:0}),w(""),f({text:"",totalLines:0}),i(null),J_.current=null,O_.current=null,V_.current=!1,X_.current=!1},[Y_,L_]),m2=x((L)=>{if(typeof document<"u"){let U_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&U_)return}let q=O_.current;if(!q||!q.post)return;if(L&&q.turnId&&q.turnId!==L)return;let k=q.post;if(k.id&&d.current===k.id)return;let S=String(k?.data?.content||"").trim();if(!S)return;d.current=k.id||d.current,O_.current=null;let c=S.replace(/\s+/g," ").slice(0,200),T=Q0.current||{},t=(k?.data?.agent_id?T[k.data.agent_id]:null)?.name||"Pi";o_(t,c)},[o_]),Q2=x(async(L,q)=>{if(L!=="thought"&&L!=="draft")return;let k=K_.current;if(L==="thought"){if(V_.current=q,k)try{await m8(k,"thought",q)}catch(S){console.warn("Failed to update thought visibility:",S)}if(!q)return;try{let S=k?await v8(k,"thought"):null;if(S?.text)a.current=S.text;f((c)=>({...c||{text:"",totalLines:0},fullText:a.current||c?.fullText||"",totalLines:Number.isFinite(S?.total_lines)?S.total_lines:c?.totalLines||0}))}catch(S){console.warn("Failed to fetch full thought:",S)}return}if(X_.current=q,k)try{await m8(k,"draft",q)}catch(S){console.warn("Failed to update draft visibility:",S)}if(!q)return;try{let S=k?await v8(k,"draft"):null;if(S?.text)e.current=S.text;A((c)=>({...c||{text:"",totalLines:0},fullText:e.current||c?.fullText||"",totalLines:Number.isFinite(S?.total_lines)?S.total_lines:c?.totalLines||0}))}catch(S){console.warn("Failed to fetch full draft:",S)}},[]),A2=y(null),w2=x(()=>{let L=I0.current;if(!L)return;if(!(Math.abs(L.scrollTop)>150))L.scrollTop=0},[]);A2.current=w2;let V3=x((L)=>{let q=I0.current;if(!q||typeof L!=="function"){L?.();return}let{currentHashtag:k,searchQuery:S}=U0.current||{},c=!(S&&!k),T=c?q.scrollHeight-q.scrollTop:q.scrollTop;L(),requestAnimationFrame(()=>{let h=I0.current;if(!h)return;if(c){let t=Math.max(h.scrollHeight-T,0);h.scrollTop=t}else{let t=Math.max(h.scrollHeight-h.clientHeight,0),U_=Math.min(T,t);h.scrollTop=U_}})},[]),p0=x((L)=>{let q=I0.current;if(!q||typeof L!=="function"){L?.();return}let k=q.scrollTop;L(),requestAnimationFrame(()=>{let S=I0.current;if(!S)return;let c=Math.max(S.scrollHeight-S.clientHeight,0);S.scrollTop=Math.min(k,c)})},[]),W3="Queued as a follow-up (one-at-a-time).",X3="⁣",R2=x((L)=>{if(!L||!Array.isArray(L))return L;let q=n_.current,k=new Set(q),S=L.filter((c)=>{if(k.has(c?.id))return!1;if(c?.data?.is_bot_message){let T=c?.data?.content;if(T===W3||T===X3)return!1}return!0});return S.length===L.length?L:S},[]),{posts:g2,setPosts:z0,hasMore:Q3,setHasMore:G,hasMoreRef:Q,loadPosts:F,refreshTimeline:H,loadMore:v,loadMoreRef:n}=A8({preserveTimelineScroll:V3,preserveTimelineScrollTop:p0}),l=s_(()=>R2(g2),[g2,H_,R2]),o=x(()=>{let L=G_.current;if(!L)return;z0((q)=>q?q.filter((k)=>k.id!==L):q),G_.current=null},[z0]),{handleSplitterMouseDown:g,handleSplitterTouchStart:z_,handleEditorSplitterMouseDown:G0,handleEditorSplitterTouchStart:s0,handleDockSplitterMouseDown:i0,handleDockSplitterTouchStart:g8}=M8({appShellRef:h0,sidebarWidthRef:Z2,editorWidthRef:U,dockHeightRef:I}),Q1=x(()=>{if(!__.current)return;__.current=!1,r.current=0,y_.current=null,K_.current=null,Y_(null),V_.current=!1,X_.current=!1;let L=(e.current||"").trim();if(e.current="",a.current="",A({text:"",totalLines:0}),w(""),f({text:"",totalLines:0}),i(null),J_.current=null,O_.current=null,!L){b({type:"error",title:"Response stalled - No content received"});return}let k=`${L}${`

⚠️ Response may be incomplete - the model stopped responding`}`,S=Date.now(),c=new Date().toISOString(),T={id:S,timestamp:c,data:{type:"agent_response",content:k,agent_id:"default",is_local_stall:!0}};G_.current=S,z0((h)=>h?c2([...h,T]):[T]),A2.current?.(),b(null)},[Y_]);R(()=>{U0.current={currentHashtag:N,searchQuery:K}},[N,K]);let u_=x(()=>{i$().then((L)=>{let q=F_.current,k=Array.isArray(L?.items)?L.items.map((S)=>({...S})).filter((S)=>!q.has(S.row_id)):[];if(k.length){j_((S)=>{if(S.length===k.length&&S.every((c,T)=>c.row_id===k[T].row_id))return S;return k});return}q.clear(),j_((S)=>S.length===0?S:[])}).catch(()=>{j_((L)=>L.length===0?L:[])})},[j_]),U3=x(async()=>{try{let L=await X1();if(L)S_(L)}catch(L){console.warn("Failed to fetch agent context:",L)}},[]),J2=x(async()=>{try{let L=await R8("web:default");if(!L||L.status!=="active"||!L.data){if(X0.current){let{currentHashtag:S,searchQuery:c}=U0.current||{};if(!S&&!c)H()}return X0.current=!1,w0(),b0.current=null,b(null),A({text:"",totalLines:0}),w(""),f({text:"",totalLines:0}),i(null),J_.current=null,L??null}X0.current=!0;let q=L.data;b0.current=q;let k=q.turn_id||q.turnId;if(k)M0(k);if(T_({running:!0,clearSilence:!0}),q2(),b(q),L.thought&&L.thought.text)f((S)=>{if(S&&S.text&&S.text.length>=L.thought.text.length)return S;return a.current=L.thought.text,{text:L.thought.text,totalLines:L.thought.totalLines||0}});if(L.draft&&L.draft.text)A((S)=>{if(S&&S.text&&S.text.length>=L.draft.text.length)return S;return e.current=L.draft.text,{text:L.draft.text,totalLines:L.draft.totalLines||0}});return L}catch(L){return console.warn("Failed to fetch agent status:",L),null}},[w0,q2,T_,H,M0]),H3=x(async()=>{if(!__.current)return null;if(J_.current)return null;let L=K_.current||null,q=H0.current,k=Date.now();if(q.inFlight)return null;if(q.turnId===L&&k-q.lastAttemptAt<V1)return null;q.inFlight=!0,q.lastAttemptAt=k,q.turnId=L;try{let{currentHashtag:S,searchQuery:c}=U0.current||{};if(!S&&!c)await H();return await u_(),await J2()}finally{q.inFlight=!1}},[J2,u_,H]);R(()=>{let L=Math.min(1000,Math.max(100,Math.floor(q1/2))),q=setInterval(()=>{if(!__.current)return;if(J_.current)return;let k=y_.current;if(!k)return;let S=Date.now(),c=S-k,T=z3(b0.current);if(c>=S8){if(!T)b({type:"waiting",title:"Re-syncing after a quiet period…"});H3();return}if(c>=q1){if(S-r.current>=V1){if(!T){let h=Math.floor(c/1000);b({type:"waiting",title:`Waiting for model… No events for ${h}s`})}r.current=S,H3()}}},L);return()=>clearInterval(q)},[H3]);let h8=x((L)=>{if($(L),L!=="connected"){b(null),A({text:"",totalLines:0}),w(""),f({text:"",totalLines:0}),i(null),J_.current=null,w0();return}if(!D0.current){D0.current=!0,J2();return}let{currentHashtag:q,searchQuery:k}=U0.current;if(!q&&!k)H();J2()},[w0,H,J2]),p8=x(async(L)=>{Z(L),z0(null),await F(L)},[F]),i8=x(async()=>{Z(null),J(null),z0(null),await F()},[F]),n8=x(async(L)=>{if(!L||!L.trim())return;J(L.trim()),Z(null),z0(null);try{let q=await g$(L.trim());z0(q.results),G(!1)}catch(q){console.error("Failed to search:",q),z0([])}},[]),l8=x(()=>{z(!0),J(null),Z(null),z0([])},[]),o8=x(()=>{z(!1),J(null),F()},[F]),r$=x(()=>{},[]),r8=x(async(L)=>{if(!L)return;let q=L.id,k=l?.filter((c)=>c?.data?.thread_id===q&&c?.id!==q).length||0;if(k>0){if(!window.confirm(`Delete this message and its ${k} replies?`))return}let S=(c)=>{if(!c.length)return;F0((h)=>{let t=new Set(h);return c.forEach((U_)=>t.add(U_)),t}),setTimeout(()=>{if(p0(()=>{z0((h)=>h?h.filter((t)=>!c.includes(t.id)):h)}),F0((h)=>{let t=new Set(h);return c.forEach((U_)=>t.delete(U_)),t}),Q.current)n.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let c=await c8(q,k>0);if(c?.ids?.length)S(c.ids)}catch(c){let T=c?.message||"";if(k===0&&T.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let t=await c8(q,!0);if(t?.ids?.length)S(t.ids);return}console.error("Failed to delete post:",c),alert(`Failed to delete message: ${T}`)}},[l,p0]),U1=x(async()=>{try{let L=await h$();R_(f8(L));let q=L?.user||{};N0((S)=>{let c=typeof q.name==="string"&&q.name.trim()?q.name.trim():"You",T=typeof q.avatar_url==="string"?q.avatar_url.trim():null,h=typeof q.avatar_background==="string"&&q.avatar_background.trim()?q.avatar_background.trim():null;if(S.name===c&&S.avatar_url===T&&S.avatar_background===h)return S;return{name:c,avatar_url:T,avatar_background:h}});let k=(L?.agents||[]).find((S)=>S.id==="default");if(k?.model)P_(k.model);C0(k?.name,k?.avatar_url)}catch(L){console.warn("Failed to load agents:",L)}try{let L=await X1();if(L)S_(L)}catch{}},[C0]);R(()=>{U1();let L=y2("sidebarWidth",null),q=Number.isFinite(L)?Math.min(Math.max(L,160),600):280;if(Z2.current=q,h0.current)h0.current.style.setProperty("--sidebar-width",`${q}px`)},[U1]);let d8=x_||E!==null,H1=x((L)=>{if(!L||typeof L!=="object")return;let q=L.agent_id;if(!q)return;let{agent_name:k,agent_avatar:S}=L;if(!k&&S===void 0)return;let c=Q0.current?.[q]||{id:q},T=c.name||null,h=c.avatar_url??c.avatarUrl??c.avatar??null,t=!1,U_=!1;if(k&&k!==c.name)T=k,U_=!0;if(S!==void 0){let a0=typeof S==="string"?S.trim():null,y1=typeof h==="string"?h.trim():null,U2=a0||null;if(U2!==(y1||null))h=U2,t=!0}if(!U_&&!t)return;if(R_((a0)=>{let U2={...a0[q]||{id:q}};if(U_)U2.name=T;if(t)U2.avatar_url=h;return{...a0,[q]:U2}}),q==="default")C0(T,h,t?Date.now():null)},[C0]),F1=x((L)=>{if(!L||typeof L!=="object")return;let q=L.user_name??L.userName,k=L.user_avatar??L.userAvatar,S=L.user_avatar_background??L.userAvatarBackground;if(q===void 0&&k===void 0&&S===void 0)return;N0((c)=>{let T=typeof q==="string"&&q.trim()?q.trim():c.name||"You",h=k===void 0?c.avatar_url:typeof k==="string"&&k.trim()?k.trim():null,t=S===void 0?c.avatar_background:typeof S==="string"&&S.trim()?S.trim():null;if(c.name===T&&c.avatar_url===h&&c.avatar_background===t)return c;return{name:T,avatar_url:h,avatar_background:t}})},[]),F3=x((L)=>{if(!L||typeof L!=="object")return;let q=L.model??L.current;if(q!==void 0)P_(q);if(L.thinking_level!==void 0)N_(L.thinking_level??null);if(L.supports_thinking!==void 0)B_(Boolean(L.supports_thinking));if(L.provider_usage!==void 0)W_(L.provider_usage??null)},[]),M2=x(()=>{p$().then((L)=>{if(L)F3(L)}).catch(()=>{})},[F3]),s8=x((L)=>{let q=L?.row_id;if(q==null)return;F_.current.add(q),j_((k)=>k.filter((S)=>S?.row_id!==q)),n$(q).then(()=>{u_()}).catch((k)=>{console.warn("[queue] Failed to steer queued item:",k),k0("Failed to steer message","The queued message could not be sent as steering.","warning"),F_.current.delete(q),u_()})},[u_,j_,k0]),a8=x((L)=>{let q=L?.row_id;if(q==null)return;F_.current.add(q),j_((k)=>k.filter((S)=>S?.row_id!==q)),l$(q).then(()=>{u_()}).catch((k)=>{console.warn("[queue] Failed to remove queued item:",k),k0("Failed to remove message","The queued message could not be removed.","warning"),F_.current.delete(q),u_()})},[u_,j_,k0]),t8=x((L)=>{if(!L||typeof L!=="object")return;if(L?.queued==="followup"||L?.queued==="steer"){u_();return}let q=L?.command;if(q&&typeof q==="object"&&(q?.queued_followup||q?.queued_steer))u_()},[u_]),y3=x(()=>{M2(),u_()},[M2,u_]);R(()=>{y3();let L=setInterval(()=>{M2(),u_()},60000);return()=>clearInterval(L)},[y3,M2,u_]);let D3=x((L,q)=>{let k=q?.turn_id;if(H1(q),F1(q),L==="ui_theme"){E4(q);return}if(L?.startsWith("agent_")){if(!(L==="agent_draft_delta"||L==="agent_thought_delta"||L==="agent_draft"||L==="agent_thought"))q2()}if(L==="connected"){b(null),A({text:"",totalLines:0}),w(""),f({text:"",totalLines:0}),i(null),J_.current=null,w0(),R8("web:default").then((t)=>{if(!t||t.status!=="active"||!t.data)return;let U_=t.data,a0=U_.turn_id||U_.turnId;if(a0)M0(a0);if(T_({clearSilence:!0}),X2(U_),t.thought&&t.thought.text)a.current=t.thought.text,f({text:t.thought.text,totalLines:t.thought.totalLines||0});if(t.draft&&t.draft.text)e.current=t.draft.text,A({text:t.draft.text,totalLines:t.draft.totalLines||0})}).catch((t)=>{console.warn("Failed to fetch agent status:",t)});let{currentHashtag:T,searchQuery:h}=U0.current||{};if(!T&&!h)H();y3();return}if(L==="agent_status"){if(q.type==="done"||q.type==="error"){if(k&&K_.current&&k!==K_.current)return;if(q.type==="done"){m2(k||K_.current);let{currentHashtag:T,searchQuery:h}=U0.current||{};if(!T&&!h)H();if(q.context_usage)S_(q.context_usage)}if(X0.current=!1,w0(),F_.current.clear(),u_(),A({text:"",totalLines:0}),w(""),f({text:"",totalLines:0}),i(null),q.type==="error")b({type:"error",title:q.title||"Agent error"}),setTimeout(()=>b(null),8000);else b(null)}else{if(k)M0(k);if(T_({running:!0,clearSilence:!0}),q.type==="thinking")e.current="",a.current="",A({text:"",totalLines:0}),w(""),f({text:"",totalLines:0});b0.current=q,b((T)=>{if(T&&T.type===q.type&&T.title===q.title)return T;return q})}return}if(L==="agent_steer_queued"){if(k&&K_.current&&k!==K_.current)return;let T=k||K_.current;if(!T)return;E_.current=T,L_(T);return}if(L==="agent_followup_queued"){let T=q?.row_id,h=q?.content;if(T!=null&&typeof h==="string"&&h.trim())j_((t)=>{if(t.some((U_)=>U_?.row_id===T))return t;return[...t,{row_id:T,content:h,timestamp:q?.timestamp||null,thread_id:q?.thread_id??null}]});u_();return}if(L==="agent_followup_consumed"){let T=q?.row_id;if(T!=null)j_((h)=>h.filter((t)=>t.row_id!==T));u_(),H();return}if(L==="agent_followup_removed"){let T=q?.row_id;if(T!=null)F_.current.add(T),j_((h)=>h.filter((t)=>t.row_id!==T));u_();return}if(L==="agent_draft_delta"){if(k&&K_.current&&k!==K_.current)return;if(k&&!K_.current)M0(k);if(T_({running:!0,clearSilence:!0}),q?.reset)e.current="";if(q?.delta)e.current+=q.delta;let T=Date.now();if(!g0.current||T-g0.current>=100){g0.current=T;let h=e.current,t=W1(h);if(X_.current)A((U_)=>({text:U_?.text||"",totalLines:t,fullText:h}));else A({text:h,totalLines:t})}return}if(L==="agent_draft"){if(k&&K_.current&&k!==K_.current)return;if(k&&!K_.current)M0(k);T_({running:!0,clearSilence:!0});let T=q.text||"",h=q.mode||(q.kind==="plan"?"replace":"append"),t=Number.isFinite(q.total_lines)?q.total_lines:T?T.replace(/\r\n/g,`
`).split(`
`).length:0;if(q.kind==="plan")if(h==="replace")w(T);else w((U_)=>(U_||"")+T);else if(!X_.current)e.current=T,A({text:T,totalLines:t});return}if(L==="agent_thought_delta"){if(k&&K_.current&&k!==K_.current)return;if(k&&!K_.current)M0(k);if(T_({running:!0,clearSilence:!0}),q?.reset)a.current="";if(typeof q?.delta==="string")a.current+=q.delta;let T=Date.now();if(V_.current&&(!N2.current||T-N2.current>=100)){N2.current=T;let h=a.current;f((t)=>({text:t?.text||"",totalLines:W1(h),fullText:h}))}return}if(L==="agent_thought"){if(k&&K_.current&&k!==K_.current)return;if(k&&!K_.current)M0(k);T_({running:!0,clearSilence:!0});let T=q.text||"",h=Number.isFinite(q.total_lines)?q.total_lines:T?T.replace(/\r\n/g,`
`).split(`
`).length:0;if(!V_.current)a.current=T,f({text:T,totalLines:h});return}if(L==="agent_request"){if(console.log("Agent request:",q),k&&K_.current&&k!==K_.current)return;if(k)M0(k);T_({running:!0,clearSilence:!0}),i(q),J_.current=q;return}if(L==="agent_request_timeout"){if(console.log("Agent request timeout:",q),k&&K_.current&&k!==K_.current)return;i(null),J_.current=null,w0(),b({type:"error",title:"Permission request timed out"});return}if(L==="model_changed"){if(q?.model!==void 0)P_(q.model);if(q?.thinking_level!==void 0)N_(q.thinking_level??null);if(q?.supports_thinking!==void 0)B_(Boolean(q.supports_thinking));X1().then((T)=>{if(T)S_(T)}).catch(()=>{});return}if(L==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:q}));return}let{currentHashtag:S,searchQuery:c}=U0.current;if(L==="agent_response")o(),O_.current={post:q,turnId:K_.current};if(!S&&!c&&(L==="new_post"||L==="agent_response"))z0((T)=>{if(!T)return[q];if(T.some((h)=>h.id===q.id))return T;return[...T,q]}),A2.current?.();if(L==="interaction_updated")z0((T)=>{if(!T)return T;if(!T.some((h)=>h.id===q.id))return T;return T.map((h)=>h.id===q.id?q:h)});if(L==="interaction_deleted"){let T=q?.ids||[];if(T.length){p0(()=>{z0((U_)=>U_?U_.filter((a0)=>!T.includes(a0.id)):U_)});let{currentHashtag:h,searchQuery:t}=U0.current;if(Q.current&&!h&&!t)n.current?.({preserveScroll:!0,preserveMode:"top"})}}},[w0,q2,n,T_,m2,p0,H,o,M0,X2,H1,F1,M2,u_,j_]);R(()=>{if(typeof window>"u")return;let L=window.__PICLAW_TEST_API||{};return L.emit=D3,L.reset=()=>{o(),w0(),b(null),A({text:"",totalLines:0}),w(""),f({text:"",totalLines:0}),i(null)},L.finalize=()=>Q1(),window.__PICLAW_TEST_API=L,()=>{if(window.__PICLAW_TEST_API===L)window.__PICLAW_TEST_API=void 0}},[w0,Q1,D3,o]),b8({handleSseEvent:D3,handleConnectionStatusChange:h8,loadPosts:F}),R(()=>{if(!l||l.length===0)return;let L=location.hash;if(!L||!L.startsWith("#msg-"))return;let q=L.slice(5);u0(q),history.replaceState(null,"",location.pathname+location.search)},[l,u0]);let C3=E!==null;R(()=>{if(_!=="connected")return;let q=setInterval(()=>{let{currentHashtag:k,searchQuery:S}=U0.current||{},c=!k&&!S;if(C3){if(c)H();u_(),J2(),U3()}else{if(c)H();J2(),U3()}},C3?15000:60000);return()=>clearInterval(q)},[_,C3,J2,U3,u_,H]);let e8=x(()=>{Z_((L)=>!L)},[]);R(()=>{if(!Q_)return;if(typeof window>"u")return;let L=h0.current;if(!L)return;if(!U.current){let q=y2("editorWidth",null),k=Z2.current||280;U.current=Number.isFinite(q)?q:k}if(L.style.setProperty("--editor-width",`${U.current}px`),!I.current){let q=y2("dockHeight",null);I.current=Number.isFinite(q)?q:200}L.style.setProperty("--dock-height",`${I.current}px`)},[Q_]),R(()=>{if(!W0)return;let L=(q)=>{if(q.ctrlKey&&q.key==="`")q.preventDefault(),y0()};return document.addEventListener("keydown",L),()=>document.removeEventListener("keydown",L)},[y0,W0]);let _6=Boolean(s&&s===(E?.turn_id||$_));return W`
        <div class=${`app-shell${M?"":" workspace-collapsed"}${Q_?" editor-open":""}`} ref=${h0}>
            <${y8}
                onFileSelect=${r0}
                visible=${M}
                active=${M||Q_}
                onOpenEditor=${d_}
            />
            <button
                class=${`workspace-toggle-tab${M?" open":" closed"}`}
                onClick=${e8}
                title=${M?"Hide workspace":"Show workspace"}
                aria-label=${M?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${g} onTouchStart=${z_}></div>
            ${R0&&W`
                <div class="editor-pane-container">
                    ${Q_&&W`
                        <${D8}
                            tabs=${q0}
                            activeId=${e_}
                            onActivate=${V0}
                            onClose=${$2}
                            onCloseOthers=${Y2}
                            onCloseAll=${_0}
                            onTogglePin=${f0}
                            onTogglePreview=${O0}
                            previewTabs=${r_}
                            onToggleDock=${W0?y0:void 0}
                            dockVisible=${W0&&m0}
                        />
                    `}
                    ${Q_&&W`<div class="editor-pane-host" ref=${T0}></div>`}
                    ${Q_&&e_&&r_.has(e_)&&W`
                        <${k8}
                            getContent=${()=>m_.current?.getContent?.()}
                            path=${e_}
                            onClose=${()=>O0(e_)}
                        />
                    `}
                    ${W0&&m0&&W`<div class="dock-splitter" onMouseDown=${i0} onTouchStart=${g8}></div>`}
                    ${W0&&W`<div class=${`dock-panel${m0?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${y0} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
                                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                    <line x1="4" y1="4" x2="12" y2="12"/>
                                    <line x1="12" y1="4" x2="4" y2="12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="dock-panel-body" ref=${O2}></div>
                    </div>`}
                </div>
                <div class="editor-splitter" onMouseDown=${G0} onTouchStart=${s0}></div>
            `}
            <div class="container">
                ${K&&T8()&&W`<div class="search-results-spacer"></div>`}
                ${(N||K)&&W`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${i8}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${N?`#${N}`:`Search: ${K}`}</span>
                    </div>
                `}
                <${_8}
                    posts=${l}
                    hasMore=${Q3}
                    onLoadMore=${v}
                    timelineRef=${I0}
                    onHashtagClick=${p8}
                    onMessageRef=${L2}
                    onScrollToMessage=${u0}
                    onFileRef=${J0}
                    onPostClick=${void 0}
                    onDeletePost=${r8}
                    emptyMessage=${N?`No posts with #${N}`:K?`No results for "${K}"`:void 0}
                    agents=${f_}
                    user=${I_}
                    reverse=${!(K&&!N)}
                    removingPostIds=${x0}
                    searchQuery=${K}
                />
                <${g4}
                    status=${E}
                    draft=${m}
                    plan=${X}
                    thought=${P}
                    pendingRequest=${p}
                    intent=${C}
                    turnId=${$_}
                    steerQueued=${_6}
                    onPanelToggle=${Q2}
                />
                <${U4}
                    onPost=${()=>{F(),w2()}}
                    onFocus=${w2}
                    searchMode=${j}
                    onSearch=${n8}
                    onEnterSearch=${l8}
                    onExitSearch=${o8}
                    fileRefs=${O}
                    onRemoveFileRef=${G2}
                    onClearFileRefs=${W2}
                    messageRefs=${V}
                    onRemoveMessageRef=${B2}
                    onClearMessageRefs=${d0}
                    activeEditorPath=${e_}
                    onAttachEditorFile=${A0}
                    onOpenFilePill=${J0}
                    followupQueueCount=${t_}
                    followupQueueItems=${H_}
                    onInjectQueuedFollowup=${s8}
                    onRemoveQueuedFollowup=${a8}
                    onMessageResponse=${t8}
                    isAgentActive=${d8}
                    activeModel=${L0}
                    modelUsage=${C_}
                    thinkingLevel=${w_}
                    supportsThinking=${D_}
                    contextUsage=${g_}
                    notificationsEnabled=${S0}
                    notificationPermission=${K0}
                    onToggleNotifications=${Y0}
                    onModelChange=${P_}
                    onModelStateChange=${F3}
                />
                <${p4} status=${_} />
                <${h4}
                    request=${p}
                    onRespond=${()=>{i(null),J_.current=null}}
                />
            </div>
        </div>
    `}l1(W`<${o$} />`,document.getElementById("app"));

//# debugId=39419A93B990EF4964756E2164756E21
//# sourceMappingURL=app.bundle.js.map

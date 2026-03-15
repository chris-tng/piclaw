var J6=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,Z)=>(typeof require<"u"?require:$)[Z]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var d2,P_,v1,K6,j2,E1,m1,R1,g1,M3,E3,b3,j6,l2={},o2=[],z6=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,s2=Array.isArray;function e0(_,$){for(var Z in $)_[Z]=$[Z];return _}function P3(_){_&&_.parentNode&&_.parentNode.removeChild(_)}function h1(_,$,Z){var N,K,J,j={};for(J in $)J=="key"?N=$[J]:J=="ref"?K=$[J]:j[J]=$[J];if(arguments.length>2&&(j.children=arguments.length>3?d2.call(arguments,2):Z),typeof _=="function"&&_.defaultProps!=null)for(J in _.defaultProps)j[J]===void 0&&(j[J]=_.defaultProps[J]);return p2(_,j,N,K,null)}function p2(_,$,Z,N,K){var J={type:_,props:$,key:Z,ref:N,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:K==null?++v1:K,__i:-1,__u:0};return K==null&&P_.vnode!=null&&P_.vnode(J),J}function a2(_){return _.children}function i2(_,$){this.props=_,this.context=$}function F2(_,$){if($==null)return _.__?F2(_.__,_.__i+1):null;for(var Z;$<_.__k.length;$++)if((Z=_.__k[$])!=null&&Z.__e!=null)return Z.__e;return typeof _.type=="function"?F2(_):null}function Y6(_){if(_.__P&&_.__d){var $=_.__v,Z=$.__e,N=[],K=[],J=e0({},$);J.__v=$.__v+1,P_.vnode&&P_.vnode(J),S3(_.__P,J,$,_.__n,_.__P.namespaceURI,32&$.__u?[Z]:null,N,Z==null?F2($):Z,!!(32&$.__u),K),J.__v=$.__v,J.__.__k[J.__i]=J,l1(N,J,K),$.__e=$.__=null,J.__e!=Z&&p1(J)}}function p1(_){if((_=_.__)!=null&&_.__c!=null)return _.__e=_.__c.base=null,_.__k.some(function($){if($!=null&&$.__e!=null)return _.__e=_.__c.base=$.__e}),p1(_)}function b1(_){(!_.__d&&(_.__d=!0)&&j2.push(_)&&!r2.__r++||E1!=P_.debounceRendering)&&((E1=P_.debounceRendering)||m1)(r2)}function r2(){try{for(var _,$=1;j2.length;)j2.length>$&&j2.sort(R1),_=j2.shift(),$=j2.length,Y6(_)}finally{j2.length=r2.__r=0}}function i1(_,$,Z,N,K,J,j,Y,O,z,V){var B,C,D,A,E,m,w,X=N&&N.__k||o2,P=$.length;for(O=O6(Z,$,X,O,P),B=0;B<P;B++)(D=Z.__k[B])!=null&&(C=D.__i!=-1&&X[D.__i]||l2,D.__i=B,m=S3(_,D,C,K,J,j,Y,O,z,V),A=D.__e,D.ref&&C.ref!=D.ref&&(C.ref&&x3(C.ref,null,D),V.push(D.ref,D.__c||A,D)),E==null&&A!=null&&(E=A),(w=!!(4&D.__u))||C.__k===D.__k?O=n1(D,O,_,w):typeof D.type=="function"&&m!==void 0?O=m:A&&(O=A.nextSibling),D.__u&=-7);return Z.__e=E,O}function O6(_,$,Z,N,K){var J,j,Y,O,z,V=Z.length,B=V,C=0;for(_.__k=Array(K),J=0;J<K;J++)(j=$[J])!=null&&typeof j!="boolean"&&typeof j!="function"?(typeof j=="string"||typeof j=="number"||typeof j=="bigint"||j.constructor==String?j=_.__k[J]=p2(null,j,null,null,null):s2(j)?j=_.__k[J]=p2(a2,{children:j},null,null,null):j.constructor===void 0&&j.__b>0?j=_.__k[J]=p2(j.type,j.props,j.key,j.ref?j.ref:null,j.__v):_.__k[J]=j,O=J+C,j.__=_,j.__b=_.__b+1,Y=null,(z=j.__i=G6(j,Z,O,B))!=-1&&(B--,(Y=Z[z])&&(Y.__u|=2)),Y==null||Y.__v==null?(z==-1&&(K>V?C--:K<V&&C++),typeof j.type!="function"&&(j.__u|=4)):z!=O&&(z==O-1?C--:z==O+1?C++:(z>O?C--:C++,j.__u|=4))):_.__k[J]=null;if(B)for(J=0;J<V;J++)(Y=Z[J])!=null&&(2&Y.__u)==0&&(Y.__e==N&&(N=F2(Y)),r1(Y,Y));return N}function n1(_,$,Z,N){var K,J;if(typeof _.type=="function"){for(K=_.__k,J=0;K&&J<K.length;J++)K[J]&&(K[J].__=_,$=n1(K[J],$,Z,N));return $}_.__e!=$&&(N&&($&&_.type&&!$.parentNode&&($=F2(_)),Z.insertBefore(_.__e,$||null)),$=_.__e);do $=$&&$.nextSibling;while($!=null&&$.nodeType==8);return $}function G6(_,$,Z,N){var K,J,j,Y=_.key,O=_.type,z=$[Z],V=z!=null&&(2&z.__u)==0;if(z===null&&Y==null||V&&Y==z.key&&O==z.type)return Z;if(N>(V?1:0)){for(K=Z-1,J=Z+1;K>=0||J<$.length;)if((z=$[j=K>=0?K--:J++])!=null&&(2&z.__u)==0&&Y==z.key&&O==z.type)return j}return-1}function A1(_,$,Z){$[0]=="-"?_.setProperty($,Z==null?"":Z):_[$]=Z==null?"":typeof Z!="number"||z6.test($)?Z:Z+"px"}function h2(_,$,Z,N,K){var J,j;_:if($=="style")if(typeof Z=="string")_.style.cssText=Z;else{if(typeof N=="string"&&(_.style.cssText=N=""),N)for($ in N)Z&&$ in Z||A1(_.style,$,"");if(Z)for($ in Z)N&&Z[$]==N[$]||A1(_.style,$,Z[$])}else if($[0]=="o"&&$[1]=="n")J=$!=($=$.replace(g1,"$1")),j=$.toLowerCase(),$=j in _||$=="onFocusOut"||$=="onFocusIn"?j.slice(2):$.slice(2),_.l||(_.l={}),_.l[$+J]=Z,Z?N?Z.u=N.u:(Z.u=M3,_.addEventListener($,J?b3:E3,J)):_.removeEventListener($,J?b3:E3,J);else{if(K=="http://www.w3.org/2000/svg")$=$.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if($!="width"&&$!="height"&&$!="href"&&$!="list"&&$!="form"&&$!="tabIndex"&&$!="download"&&$!="rowSpan"&&$!="colSpan"&&$!="role"&&$!="popover"&&$ in _)try{_[$]=Z==null?"":Z;break _}catch(Y){}typeof Z=="function"||(Z==null||Z===!1&&$[4]!="-"?_.removeAttribute($):_.setAttribute($,$=="popover"&&Z==1?"":Z))}}function w1(_){return function($){if(this.l){var Z=this.l[$.type+_];if($.t==null)$.t=M3++;else if($.t<Z.u)return;return Z(P_.event?P_.event($):$)}}}function S3(_,$,Z,N,K,J,j,Y,O,z){var V,B,C,D,A,E,m,w,X,P,M,f,p,i,Z_,Y_=$.type;if($.constructor!==void 0)return null;128&Z.__u&&(O=!!(32&Z.__u),J=[Y=$.__e=Z.__e]),(V=P_.__b)&&V($);_:if(typeof Y_=="function")try{if(w=$.props,X=Y_.prototype&&Y_.prototype.render,P=(V=Y_.contextType)&&N[V.__c],M=V?P?P.props.value:V.__:N,Z.__c?m=(B=$.__c=Z.__c).__=B.__E:(X?$.__c=B=new Y_(w,M):($.__c=B=new i2(w,M),B.constructor=Y_,B.render=B6),P&&P.sub(B),B.state||(B.state={}),B.__n=N,C=B.__d=!0,B.__h=[],B._sb=[]),X&&B.__s==null&&(B.__s=B.state),X&&Y_.getDerivedStateFromProps!=null&&(B.__s==B.state&&(B.__s=e0({},B.__s)),e0(B.__s,Y_.getDerivedStateFromProps(w,B.__s))),D=B.props,A=B.state,B.__v=$,C)X&&Y_.getDerivedStateFromProps==null&&B.componentWillMount!=null&&B.componentWillMount(),X&&B.componentDidMount!=null&&B.__h.push(B.componentDidMount);else{if(X&&Y_.getDerivedStateFromProps==null&&w!==D&&B.componentWillReceiveProps!=null&&B.componentWillReceiveProps(w,M),$.__v==Z.__v||!B.__e&&B.shouldComponentUpdate!=null&&B.shouldComponentUpdate(w,B.__s,M)===!1){$.__v!=Z.__v&&(B.props=w,B.state=B.__s,B.__d=!1),$.__e=Z.__e,$.__k=Z.__k,$.__k.some(function(s){s&&(s.__=$)}),o2.push.apply(B.__h,B._sb),B._sb=[],B.__h.length&&j.push(B);break _}B.componentWillUpdate!=null&&B.componentWillUpdate(w,B.__s,M),X&&B.componentDidUpdate!=null&&B.__h.push(function(){B.componentDidUpdate(D,A,E)})}if(B.context=M,B.props=w,B.__P=_,B.__e=!1,f=P_.__r,p=0,X)B.state=B.__s,B.__d=!1,f&&f($),V=B.render(B.props,B.state,B.context),o2.push.apply(B.__h,B._sb),B._sb=[];else do B.__d=!1,f&&f($),V=B.render(B.props,B.state,B.context),B.state=B.__s;while(B.__d&&++p<25);B.state=B.__s,B.getChildContext!=null&&(N=e0(e0({},N),B.getChildContext())),X&&!C&&B.getSnapshotBeforeUpdate!=null&&(E=B.getSnapshotBeforeUpdate(D,A)),i=V!=null&&V.type===a2&&V.key==null?o1(V.props.children):V,Y=i1(_,s2(i)?i:[i],$,Z,N,K,J,j,Y,O,z),B.base=$.__e,$.__u&=-161,B.__h.length&&j.push(B),m&&(B.__E=B.__=null)}catch(s){if($.__v=null,O||J!=null)if(s.then){for($.__u|=O?160:128;Y&&Y.nodeType==8&&Y.nextSibling;)Y=Y.nextSibling;J[J.indexOf(Y)]=null,$.__e=Y}else{for(Z_=J.length;Z_--;)P3(J[Z_]);A3($)}else $.__e=Z.__e,$.__k=Z.__k,s.then||A3($);P_.__e(s,$,Z)}else J==null&&$.__v==Z.__v?($.__k=Z.__k,$.__e=Z.__e):Y=$.__e=L6(Z.__e,$,Z,N,K,J,j,O,z);return(V=P_.diffed)&&V($),128&$.__u?void 0:Y}function A3(_){_&&(_.__c&&(_.__c.__e=!0),_.__k&&_.__k.some(A3))}function l1(_,$,Z){for(var N=0;N<Z.length;N++)x3(Z[N],Z[++N],Z[++N]);P_.__c&&P_.__c($,_),_.some(function(K){try{_=K.__h,K.__h=[],_.some(function(J){J.call(K)})}catch(J){P_.__e(J,K.__v)}})}function o1(_){return typeof _!="object"||_==null||_.__b>0?_:s2(_)?_.map(o1):e0({},_)}function L6(_,$,Z,N,K,J,j,Y,O){var z,V,B,C,D,A,E,m=Z.props||l2,w=$.props,X=$.type;if(X=="svg"?K="http://www.w3.org/2000/svg":X=="math"?K="http://www.w3.org/1998/Math/MathML":K||(K="http://www.w3.org/1999/xhtml"),J!=null){for(z=0;z<J.length;z++)if((D=J[z])&&"setAttribute"in D==!!X&&(X?D.localName==X:D.nodeType==3)){_=D,J[z]=null;break}}if(_==null){if(X==null)return document.createTextNode(w);_=document.createElementNS(K,X,w.is&&w),Y&&(P_.__m&&P_.__m($,J),Y=!1),J=null}if(X==null)m===w||Y&&_.data==w||(_.data=w);else{if(J=J&&d2.call(_.childNodes),!Y&&J!=null)for(m={},z=0;z<_.attributes.length;z++)m[(D=_.attributes[z]).name]=D.value;for(z in m)D=m[z],z=="dangerouslySetInnerHTML"?B=D:z=="children"||(z in w)||z=="value"&&("defaultValue"in w)||z=="checked"&&("defaultChecked"in w)||h2(_,z,null,D,K);for(z in w)D=w[z],z=="children"?C=D:z=="dangerouslySetInnerHTML"?V=D:z=="value"?A=D:z=="checked"?E=D:Y&&typeof D!="function"||m[z]===D||h2(_,z,D,m[z],K);if(V)Y||B&&(V.__html==B.__html||V.__html==_.innerHTML)||(_.innerHTML=V.__html),$.__k=[];else if(B&&(_.innerHTML=""),i1($.type=="template"?_.content:_,s2(C)?C:[C],$,Z,N,X=="foreignObject"?"http://www.w3.org/1999/xhtml":K,J,j,J?J[0]:Z.__k&&F2(Z,0),Y,O),J!=null)for(z=J.length;z--;)P3(J[z]);Y||(z="value",X=="progress"&&A==null?_.removeAttribute("value"):A!=null&&(A!==_[z]||X=="progress"&&!A||X=="option"&&A!=m[z])&&h2(_,z,A,m[z],K),z="checked",E!=null&&E!=_[z]&&h2(_,z,E,m[z],K))}return _}function x3(_,$,Z){try{if(typeof _=="function"){var N=typeof _.__u=="function";N&&_.__u(),N&&$==null||(_.__u=_($))}else _.current=$}catch(K){P_.__e(K,Z)}}function r1(_,$,Z){var N,K;if(P_.unmount&&P_.unmount(_),(N=_.ref)&&(N.current&&N.current!=_.__e||x3(N,null,$)),(N=_.__c)!=null){if(N.componentWillUnmount)try{N.componentWillUnmount()}catch(J){P_.__e(J,$)}N.base=N.__P=null}if(N=_.__k)for(K=0;K<N.length;K++)N[K]&&r1(N[K],$,Z||typeof _.type!="function");Z||P3(_.__e),_.__c=_.__=_.__e=void 0}function B6(_,$,Z){return this.constructor(_,Z)}function d1(_,$,Z){var N,K,J,j;$==document&&($=document.documentElement),P_.__&&P_.__(_,$),K=(N=typeof Z=="function")?null:Z&&Z.__k||$.__k,J=[],j=[],S3($,_=(!N&&Z||$).__k=h1(a2,null,[_]),K||l2,l2,$.namespaceURI,!N&&Z?[Z]:K?null:$.firstChild?d2.call($.childNodes):null,J,!N&&Z?Z:K?K.__e:$.firstChild,N,j),l1(J,_,j)}d2=o2.slice,P_={__e:function(_,$,Z,N){for(var K,J,j;$=$.__;)if((K=$.__c)&&!K.__)try{if((J=K.constructor)&&J.getDerivedStateFromError!=null&&(K.setState(J.getDerivedStateFromError(_)),j=K.__d),K.componentDidCatch!=null&&(K.componentDidCatch(_,N||{}),j=K.__d),j)return K.__E=K}catch(Y){_=Y}throw _}},v1=0,K6=function(_){return _!=null&&_.constructor===void 0},i2.prototype.setState=function(_,$){var Z;Z=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=e0({},this.state),typeof _=="function"&&(_=_(e0({},Z),this.props)),_&&e0(Z,_),_!=null&&this.__v&&($&&this._sb.push($),b1(this))},i2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),b1(this))},i2.prototype.render=a2,j2=[],m1=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,R1=function(_,$){return _.__v.__b-$.__v.__b},r2.__r=0,g1=/(PointerCapture)$|Capture$/i,M3=0,E3=w1(!1),b3=w1(!0),j6=0;var P2,p_,k3,M1,S2=0,s1=[],h_=P_,P1=h_.__b,S1=h_.__r,x1=h_.diffed,f1=h_.__c,T1=h_.unmount,I1=h_.__;function f3(_,$){h_.__h&&h_.__h(p_,_,S2||$),S2=0;var Z=p_.__H||(p_.__H={__:[],__h:[]});return _>=Z.__.length&&Z.__.push({}),Z.__[_]}function u(_){return S2=1,q6(t1,_)}function q6(_,$,Z){var N=f3(P2++,2);if(N.t=_,!N.__c&&(N.__=[Z?Z($):t1(void 0,$),function(Y){var O=N.__N?N.__N[0]:N.__[0],z=N.t(O,Y);O!==z&&(N.__N=[z,N.__[1]],N.__c.setState({}))}],N.__c=p_,!p_.__f)){var K=function(Y,O,z){if(!N.__c.__H)return!0;var V=N.__c.__H.__.filter(function(C){return C.__c});if(V.every(function(C){return!C.__N}))return!J||J.call(this,Y,O,z);var B=N.__c.props!==Y;return V.some(function(C){if(C.__N){var D=C.__[0];C.__=C.__N,C.__N=void 0,D!==C.__[0]&&(B=!0)}}),J&&J.call(this,Y,O,z)||B};p_.__f=!0;var{shouldComponentUpdate:J,componentWillUpdate:j}=p_;p_.componentWillUpdate=function(Y,O,z){if(this.__e){var V=J;J=void 0,K(Y,O,z),J=V}j&&j.call(this,Y,O,z)},p_.shouldComponentUpdate=K}return N.__N||N.__}function R(_,$){var Z=f3(P2++,3);!h_.__s&&a1(Z.__H,$)&&(Z.__=_,Z.u=$,p_.__H.__h.push(Z))}function y(_){return S2=5,d_(function(){return{current:_}},[])}function d_(_,$){var Z=f3(P2++,7);return a1(Z.__H,$)&&(Z.__=_(),Z.__H=$,Z.__h=_),Z.__}function x(_,$){return S2=8,d_(function(){return _},$)}function V6(){for(var _;_=s1.shift();){var $=_.__H;if(_.__P&&$)try{$.__h.some(n2),$.__h.some(w3),$.__h=[]}catch(Z){$.__h=[],h_.__e(Z,_.__v)}}}h_.__b=function(_){p_=null,P1&&P1(_)},h_.__=function(_,$){_&&$.__k&&$.__k.__m&&(_.__m=$.__k.__m),I1&&I1(_,$)},h_.__r=function(_){S1&&S1(_),P2=0;var $=(p_=_.__c).__H;$&&(k3===p_?($.__h=[],p_.__h=[],$.__.some(function(Z){Z.__N&&(Z.__=Z.__N),Z.u=Z.__N=void 0})):($.__h.some(n2),$.__h.some(w3),$.__h=[],P2=0)),k3=p_},h_.diffed=function(_){x1&&x1(_);var $=_.__c;$&&$.__H&&($.__H.__h.length&&(s1.push($)!==1&&M1===h_.requestAnimationFrame||((M1=h_.requestAnimationFrame)||W6)(V6)),$.__H.__.some(function(Z){Z.u&&(Z.__H=Z.u),Z.u=void 0})),k3=p_=null},h_.__c=function(_,$){$.some(function(Z){try{Z.__h.some(n2),Z.__h=Z.__h.filter(function(N){return!N.__||w3(N)})}catch(N){$.some(function(K){K.__h&&(K.__h=[])}),$=[],h_.__e(N,Z.__v)}}),f1&&f1(_,$)},h_.unmount=function(_){T1&&T1(_);var $,Z=_.__c;Z&&Z.__H&&(Z.__H.__.some(function(N){try{n2(N)}catch(K){$=K}}),Z.__H=void 0,$&&h_.__e($,Z.__v))};var u1=typeof requestAnimationFrame=="function";function W6(_){var $,Z=function(){clearTimeout(N),u1&&cancelAnimationFrame($),setTimeout(_)},N=setTimeout(Z,35);u1&&($=requestAnimationFrame(Z))}function n2(_){var $=p_,Z=_.__c;typeof Z=="function"&&(_.__c=void 0,Z()),p_=$}function w3(_){var $=p_;_.__c=_.__(),p_=$}function a1(_,$){return!_||_.length!==$.length||$.some(function(Z,N){return Z!==_[N]})}function t1(_,$){return typeof $=="function"?$(_):$}var e1=function(_,$,Z,N){var K;$[0]=0;for(var J=1;J<$.length;J++){var j=$[J++],Y=$[J]?($[0]|=j?1:2,Z[$[J++]]):$[++J];j===3?N[0]=Y:j===4?N[1]=Object.assign(N[1]||{},Y):j===5?(N[1]=N[1]||{})[$[++J]]=Y:j===6?N[1][$[++J]]+=Y+"":j?(K=_.apply(Y,e1(_,Y,Z,["",null])),N.push(K),Y[0]?$[0]|=2:($[J-2]=0,$[J]=K)):N.push(Y)}return N},c1=new Map;function X6(_){var $=c1.get(this);return $||($=new Map,c1.set(this,$)),($=e1(this,$.get(_)||($.set(_,$=function(Z){for(var N,K,J=1,j="",Y="",O=[0],z=function(C){J===1&&(C||(j=j.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?O.push(0,C,j):J===3&&(C||j)?(O.push(3,C,j),J=2):J===2&&j==="..."&&C?O.push(4,C,0):J===2&&j&&!C?O.push(5,0,!0,j):J>=5&&((j||!C&&J===5)&&(O.push(J,0,j,K),J=6),C&&(O.push(J,C,0,K),J=6)),j=""},V=0;V<Z.length;V++){V&&(J===1&&z(),z(V));for(var B=0;B<Z[V].length;B++)N=Z[V][B],J===1?N==="<"?(z(),O=[O],J=3):j+=N:J===4?j==="--"&&N===">"?(J=1,j=""):j=N+j[0]:Y?N===Y?Y="":j+=N:N==='"'||N==="'"?Y=N:N===">"?(z(),J=1):J&&(N==="="?(J=5,K=j,j=""):N==="/"&&(J<5||Z[V][B+1]===">")?(z(),J===3&&(O=O[0]),J=O,(O=O[0]).push(2,0,J),J=0):N===" "||N==="\t"||N===`
`||N==="\r"?(z(),J=2):j+=N),J===3&&j==="!--"&&(J=4,O=O[0])}return z(),O}(_)),$),arguments,[])).length>1?$:$[0]}var W=X6.bind(h1);async function s_(_,$={}){let Z=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Unknown error"}));throw Error(N.error||`HTTP ${Z.status}`)}return Z.json()}async function t2(_=10,$=null){let Z=`/timeline?limit=${_}`;if($)Z+=`&before=${$}`;return s_(Z)}async function _4(_,$=50,Z=0){return s_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${Z}`)}async function $4(_,$=50,Z=0){return s_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${Z}`)}async function Z4(_){return s_(`/thread/${_}`)}async function N4(_,$=!1){let Z=`/post/${_}?cascade=${$?"true":"false"}`;return s_(Z,{method:"DELETE"})}async function T3(_,$,Z=null,N=[],K=null){return s_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:Z,media_ids:N,mode:K})})}async function J4(){return s_("/agents")}async function K4(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return s_(`/agent/status${$}`)}async function I3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return s_(`/agent/context${$}`)}async function u3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return s_(`/agent/queue-state${$}`)}async function c3(_,$=null){let Z=await fetch("/agent/queue-remove",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Failed to remove queued item"}));throw Error(N.error||`HTTP ${Z.status}`)}return Z.json()}async function v3(_,$=null){let Z=await fetch("/agent/queue-steer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Failed to steer queued item"}));throw Error(N.error||`HTTP ${Z.status}`)}return Z.json()}async function V2(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return s_(`/agent/models${$}`)}async function j4(_){let $=new FormData;$.append("file",_);let Z=await fetch("/media/upload",{method:"POST",body:$});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Upload failed"}));throw Error(N.error||`HTTP ${Z.status}`)}return Z.json()}async function m3(_,$){let Z=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Failed to respond"}));throw Error(N.error||`HTTP ${Z.status}`)}return Z.json()}async function z4(_){let $=await fetch("/agent/card-action",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(_)});if(!$.ok){let Z=await $.json().catch(()=>({error:"Adaptive Card action failed"}));throw Error(Z.error||`HTTP ${$.status}`)}return $.json()}async function Y4(_,$){let Z=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(N.error||`HTTP ${Z.status}`)}return Z.json()}async function O4(_,$="thought"){let Z=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return s_(Z)}async function G4(_,$,Z){return s_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(Z)})})}function o0(_){return`/media/${_}`}function L4(_){return`/media/${_}/thumbnail`}async function x2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function B4(_){let $=await fetch(`/media/${_}`);if(!$.ok)throw Error("Failed to load media text");return $.text()}async function q4(_){let $=await fetch(`/media/${_}`);if(!$.ok)throw Error("Failed to load media blob");return $.blob()}async function e2(_="",$=2,Z=!1){let N=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${Z?"1":"0"}`;return s_(N)}async function V4(_,$=20000,Z=null){let N=Z?`&mode=${encodeURIComponent(Z)}`:"",K=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${N}`;return s_(K)}async function W4(_){return s_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function R3(_,$="",Z={}){let N=new FormData;N.append("file",_);let K=new URLSearchParams;if($)K.set("path",$);if(Z.overwrite)K.set("overwrite","1");let J=K.toString(),j=J?`/workspace/upload?${J}`:"/workspace/upload",Y=await fetch(""+j,{method:"POST",body:N});if(!Y.ok){let O=await Y.json().catch(()=>({error:"Upload failed"})),z=Error(O.error||`HTTP ${Y.status}`);throw z.status=Y.status,z.code=O.code,z}return Y.json()}async function X4(_,$,Z=""){let N=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:Z})});if(!N.ok){let K=await N.json().catch(()=>({error:"Create failed"})),J=Error(K.error||`HTTP ${N.status}`);throw J.status=N.status,J.code=K.code,J}return N.json()}async function Q4(_,$){let Z=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Rename failed"})),K=Error(N.error||`HTTP ${Z.status}`);throw K.status=Z.status,K.code=N.code,K}return Z.json()}async function U4(_,$){let Z=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!Z.ok){let N=await Z.json().catch(()=>({error:"Move failed"})),K=Error(N.error||`HTTP ${Z.status}`);throw K.status=Z.status,K.code=N.code,K}return Z.json()}async function H4(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return s_($,{method:"DELETE"})}async function _3(_,$=!1){return s_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function g3(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function F4(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class h3{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_queued",(_)=>{this.onEvent("agent_followup_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_consumed",(_)=>{this.onEvent("agent_followup_consumed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_removed",(_)=>{this.onEvent("agent_followup_removed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,Z=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,Z+$),this.reconnectAttempts=0;let N=Math.max(this.cooldownUntil-Z,0),K=Math.max(this.reconnectDelay,N);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},K),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function r0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function v_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function y2(_,$=!1){let Z=r0(_);if(Z===null)return $;return Z==="true"}function D2(_,$=null){let Z=r0(_);if(Z===null)return $;let N=parseInt(Z,10);return Number.isFinite(N)?N:$}function _2({prefix:_="file",label:$,title:Z,onRemove:N,onClick:K,removeTitle:J="Remove",icon:j="file"}){let Y=`${_}-file-pill`,O=`${_}-file-name`,z=`${_}-file-remove`,V=j==="message"?W`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:W`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return W`
    <span class=${Y} title=${Z||$} onClick=${K}>
      ${V}
      <span class=${O}>${$}</span>
      ${N&&W`
        <button
          class=${z}
          onClick=${(B)=>{B.preventDefault(),B.stopPropagation(),N()}}
          title=${J}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var U6=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/test-card",description:"Emit a built-in Adaptive Card test message (/test-card list for variants)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steer",description:"Steer the current response"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function H6({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),Z=_.tokens,N=_.contextWindow,K=Z!=null?`Context: ${y4(Z)} / ${y4(N)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,J=7,j=2*Math.PI*7,Y=$/100*j,O=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return W`
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
    `}function y4(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function D4({onPost:_,onFocus:$,searchMode:Z,onSearch:N,onEnterSearch:K,onExitSearch:J,fileRefs:j=[],onRemoveFileRef:Y,onClearFileRefs:O,messageRefs:z=[],onRemoveMessageRef:V,onClearMessageRefs:B,activeModel:C=null,modelUsage:D=null,thinkingLevel:A=null,supportsThinking:E=!1,contextUsage:m=null,notificationsEnabled:w=!1,notificationPermission:X="default",onToggleNotifications:P,onModelChange:M,onModelStateChange:f,activeEditorPath:p=null,onAttachEditorFile:i,onOpenFilePill:Z_,followupQueueItems:Y_=[],onInjectQueuedFollowup:s,onRemoveQueuedFollowup:G_,onMessageResponse:k_,isAgentActive:r=!1}){let[__,e]=u(""),[a,K_]=u(""),[L_,N_]=u([]),[B_,W_]=u(!1),[H_,x_]=u([]),[l_,L0]=u(0),[M_,A_]=u(!1),[J_,E_]=u(!1),[X_,D_]=u(!1),[Q_,R_]=u([]),[S_,C_]=u(!1),j_=y(null),I_=y(null),i_=y(null),a_=y(null),t_=y(0),N0=200,F_=(U)=>{let I=new Set,d=[];for(let O_ of U||[]){if(typeof O_!=="string")continue;let b_=O_.trim();if(!b_||I.has(b_))continue;I.add(b_),d.push(b_)}return d},Y0=()=>{let U=r0("piclaw_compose_history");if(!U)return[];try{let I=JSON.parse(U);if(!Array.isArray(I))return[];return F_(I)}catch{return[]}},C0=(U)=>{v_("piclaw_compose_history",JSON.stringify(U))},B0=y(Y0()),q0=y(-1),o_=y(""),x0=__.trim()||L_.length>0||j.length>0||z.length>0,k0=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),r_=typeof window<"u"&&typeof Notification<"u",f0=typeof window<"u"?Boolean(window.isSecureContext):!1,b=r_&&f0&&X!=="denied",$_=X==="granted"&&w,U_=$_?"Disable notifications":"Enable notifications",q_=C||"",f_=E&&A?` (${A})`:"",v0=f_.trim()?`${A}`:"",m0=typeof D?.hint_short==="string"?D.hint_short.trim():"",T0=[v0||null,m0||null].filter(Boolean).join(" • "),Z2=[q_?`Current model: ${q_}${f_}`:null,D?.plan?`Plan: ${D.plan}`:null,m0||null,D?.primary?.reset_description||null,D?.secondary?.reset_description||null].filter(Boolean),E0=J_?"Switching model…":Z2.join(" • ")||`Current model: ${q_}${f_} (tap to open model picker)`,J0=(U)=>{if(!U||typeof U!=="object")return;let I=U.model??U.current;if(typeof f==="function")f({model:I??null,thinking_level:U.thinking_level??null,supports_thinking:U.supports_thinking,provider_usage:U.provider_usage??null});if(I&&typeof M==="function")M(I)},K0=(U)=>{let I=U||j_.current;if(!I)return;I.style.height="auto",I.style.height=`${I.scrollHeight}px`,I.style.overflowY="hidden"},O0=(U)=>{if(!U.startsWith("/")||U.includes(`
`)){A_(!1),x_([]);return}let I=U.toLowerCase().split(" ")[0];if(I.length<1){A_(!1),x_([]);return}let d=U6.filter((O_)=>O_.name.startsWith(I)||O_.name.replace(/-/g,"").startsWith(I.replace(/-/g,"")));if(d.length>0&&!(d.length===1&&d[0].name===I))x_(d),L0(0),A_(!0);else A_(!1),x_([])},I0=(U)=>{let I=__,d=I.indexOf(" "),O_=d>=0?I.slice(d):"",b_=U.name+O_;e(b_),A_(!1),x_([]),requestAnimationFrame(()=>{let g_=j_.current;if(!g_)return;let V_=b_.length;g_.selectionStart=V_,g_.selectionEnd=V_,g_.focus()})},m_=(U)=>{if(Z)K_(U);else e(U),O0(U);requestAnimationFrame(()=>K0())},O2=(U)=>{let I=Z?a:__,d=I&&!I.endsWith(`
`)?`
`:"",O_=`${I}${d}${U}`.trimStart();m_(O_)},R0=(U)=>{let I=U?.command?.model_label;if(I)return I;let d=U?.command?.message;if(typeof d==="string"){let O_=d.match(/•\s+([^\n]+?)\s+\(current\)/);if(O_?.[1])return O_[1].trim()}return null},W0=async(U)=>{if(Z||J_)return;E_(!0);try{let I=await T3("default",U,null,[]),d=R0(I);J0({model:d??C??null,thinking_level:I?.command?.thinking_level,supports_thinking:I?.command?.supports_thinking});try{let O_=await V2();if(O_)J0(O_)}catch{}return _?.(),!0}catch(I){return console.error("Failed to switch model:",I),alert("Failed to switch model: "+I.message),!1}finally{E_(!1)}},g0=async()=>{await W0("/cycle-model")},e_=async(U)=>{if(!U||J_)return;if(await W0(`/model ${U}`))D_(!1)},H0=(U)=>{U.preventDefault(),U.stopPropagation(),D_((I)=>!I)},h0=(U)=>{if(U==="queue"||U==="steer"||U==="auto")return U;return r?"queue":null},u_=async(U,I,d={})=>{let{includeMedia:O_=!0,includeFileRefs:b_=!0,includeMessageRefs:g_=!0,clearAfterSubmit:V_=!0,recordHistory:$0=!0}=d||{},A0=typeof U==="string"?U:U&&typeof U?.target?.value==="string"?U.target.value:__,y0=typeof A0==="string"?A0:"";if(!y0.trim()&&(O_?L_.length===0:!0)&&(b_?j.length===0:!0)&&(g_?z.length===0:!0))return;A_(!1),x_([]);let d0=O_?[...L_]:[],G2=b_?[...j]:[],X2=g_?[...z]:[],D0=y0.trim();if($0&&D0){let Z0=B0.current,w0=F_(Z0.filter((L2)=>L2!==D0));if(w0.push(D0),w0.length>200)w0.splice(0,w0.length-200);B0.current=w0,C0(w0),q0.current=-1,o_.current=""}if(V_)e(""),N_([]),O?.(),B?.();(async()=>{try{let Z0=[];for(let T_ of d0){let j0=await j4(T_);Z0.push(j0.id)}let w0=G2.length?`Files:
${G2.map((T_)=>`- ${T_}`).join(`
`)}`:"",L2=X2.length?`Referenced messages:
${X2.map((T_)=>`- message:${T_}`).join(`
`)}`:"",c0=Z0.length?`Images:
${Z0.map((T_,j0)=>{let Q2=d0[j0]?.name||`image-${j0+1}`;return`- attachment:${T_} (${Q2})`}).join(`
`)}`:"",B2=[D0,w0,L2,c0].filter(Boolean).join(`

`),s0=await T3("default",B2,null,Z0,h0(I));if(k_?.(s0),s0?.command){J0({model:s0.command.model_label??C??null,thinking_level:s0.command.thinking_level,supports_thinking:s0.command.supports_thinking});try{let T_=await V2();if(T_)J0(T_)}catch{}}_?.()}catch(Z0){console.error("Failed to post:",Z0)}})()},_0=(U)=>{s?.(U)},F0=(U)=>{if(U.isComposing)return;if(Z&&U.key==="Escape"){U.preventDefault(),K_(""),J?.();return}if(M_&&H_.length>0){let I=j_.current?.value??(Z?a:__);if(!String(I||"").startsWith("/"))A_(!1),x_([]);else{if(U.key==="ArrowDown"){U.preventDefault(),L0((d)=>(d+1)%H_.length);return}if(U.key==="ArrowUp"){U.preventDefault(),L0((d)=>(d-1+H_.length)%H_.length);return}if(U.key==="Tab"){U.preventDefault(),I0(H_[l_]);return}if(U.key==="Enter"&&!U.shiftKey){if(!(j_.current?.value??(Z?a:__)).includes(" ")){U.preventDefault();let b_=H_[l_];A_(!1),x_([]),u_(b_.name);return}}if(U.key==="Escape"){U.preventDefault(),A_(!1),x_([]);return}}}if(!Z&&(U.key==="ArrowUp"||U.key==="ArrowDown")&&!U.metaKey&&!U.ctrlKey&&!U.altKey&&!U.shiftKey){let I=j_.current;if(!I)return;let d=I.value||"",O_=I.selectionStart===0&&I.selectionEnd===0,b_=I.selectionStart===d.length&&I.selectionEnd===d.length;if(U.key==="ArrowUp"&&O_||U.key==="ArrowDown"&&b_){let g_=B0.current;if(!g_.length)return;U.preventDefault();let V_=q0.current;if(U.key==="ArrowUp"){if(V_===-1)o_.current=d,V_=g_.length-1;else if(V_>0)V_-=1;q0.current=V_,m_(g_[V_]||"")}else{if(V_===-1)return;if(V_<g_.length-1)V_+=1,q0.current=V_,m_(g_[V_]||"");else q0.current=-1,m_(o_.current||""),o_.current=""}requestAnimationFrame(()=>{let $0=j_.current;if(!$0)return;let A0=$0.value.length;$0.selectionStart=A0,$0.selectionEnd=A0});return}}if(U.key==="Enter"&&!U.shiftKey&&(U.ctrlKey||U.metaKey)){U.preventDefault();let I=j_.current?.value??(Z?a:__);if(Z){if(I.trim())N?.(I.trim())}else u_(I,"steer");return}if(U.key==="Enter"&&!U.shiftKey){U.preventDefault();let I=j_.current?.value??(Z?a:__);if(Z){if(I.trim())N?.(I.trim())}else u_(I)}},X0=(U)=>{let I=Array.from(U||[]).filter((d)=>d&&d.type&&d.type.startsWith("image/"));if(!I.length)return;N_((d)=>[...d,...I])},b0=(U)=>{X0(U.target.files),U.target.value=""},p0=(U)=>{if(Z)return;U.preventDefault(),U.stopPropagation(),t_.current+=1,W_(!0)},N2=(U)=>{if(Z)return;if(U.preventDefault(),U.stopPropagation(),t_.current=Math.max(0,t_.current-1),t_.current===0)W_(!1)},Q0=(U)=>{if(Z)return;if(U.preventDefault(),U.stopPropagation(),U.dataTransfer)U.dataTransfer.dropEffect="copy";W_(!0)},b2=(U)=>{if(Z)return;U.preventDefault(),U.stopPropagation(),t_.current=0,W_(!1),X0(U.dataTransfer?.files||[])},U0=(U)=>{if(Z)return;let I=U.clipboardData?.items;if(!I||!I.length)return;let d=[];for(let O_ of I){if(O_.kind!=="file")continue;let b_=O_.getAsFile?.();if(b_)d.push(b_)}if(d.length>0)U.preventDefault(),X0(d)},u0=(U)=>{N_((I)=>I.filter((d,O_)=>O_!==U))},i0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((U)=>{let{latitude:I,longitude:d,accuracy:O_}=U.coords,b_=`${I.toFixed(5)}, ${d.toFixed(5)}`,g_=Number.isFinite(O_)?` ±${Math.round(O_)}m`:"",V_=`https://maps.google.com/?q=${I},${d}`,$0=`Location: ${b_}${g_} ${V_}`;O2($0)},(U)=>{let I=U?.message||"Unable to retrieve location.";alert(`Location error: ${I}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};R(()=>{if(!X_)return;C_(!0),V2().then((U)=>{let I=Array.isArray(U?.models)?U.models.filter((d)=>typeof d==="string"&&d.trim().length>0):[];R_(I),J0(U)}).catch((U)=>{console.warn("Failed to load model list:",U),R_([])}).finally(()=>{C_(!1)})},[X_,C]),R(()=>{if(Z)D_(!1)},[Z]),R(()=>{if(!X_)return;let U=(I)=>{let d=i_.current,O_=a_.current,b_=I.target;if(d&&d.contains(b_))return;if(O_&&O_.contains(b_))return;D_(!1)};return document.addEventListener("pointerdown",U),()=>document.removeEventListener("pointerdown",U)},[X_]);let J2=(U)=>{let I=U.target.value;K0(U.target),m_(I)};return R(()=>{requestAnimationFrame(()=>K0())},[__,a,Z]),W`
        <div class="compose-box">
            ${!Z&&Y_.length>0&&W`
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
                class=${`compose-input-wrapper${B_?" drag-active":""}`}
                onDragEnter=${p0}
                onDragOver=${Q0}
                onDragLeave=${N2}
                onDrop=${b2}
            >
                <div class="compose-input-main">
                    ${(j.length>0||L_.length>0||z.length>0)&&W`
                        <div class="compose-file-refs">
                            ${z.map((U)=>{return W`
                                    <${_2}
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
                                    <${_2}
                                        prefix="compose"
                                        label=${I}
                                        title=${U}
                                        onClick=${()=>Z_?.(U)}
                                        removeTitle="Remove file"
                                        onRemove=${()=>Y?.(U)}
                                    />
                                `})}
                            ${L_.map((U,I)=>{let d=U?.name||`image-${I+1}`;return W`
                                    <${_2}
                                        key=${d+I}
                                        prefix="compose"
                                        label=${d}
                                        title=${d}
                                        removeTitle="Remove image"
                                        onRemove=${()=>u0(I)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${j_}
                        placeholder=${Z?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${Z?a:__}
                        onInput=${J2}
                        onKeyDown=${F0}
                        onPaste=${U0}
                        onFocus=${$}
                        onClick=${$}
                        rows="1"
                    />
                    ${M_&&H_.length>0&&W`
                        <div class="slash-autocomplete" ref=${I_}>
                            ${H_.map((U,I)=>W`
                                <div
                                    key=${U.name}
                                    class=${`slash-item${I===l_?" active":""}`}
                                    onMouseDown=${(d)=>{d.preventDefault(),I0(U)}}
                                    onMouseEnter=${()=>L0(I)}
                                >
                                    <span class="slash-name">${U.name}</span>
                                    <span class="slash-desc">${U.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${X_&&!Z&&W`
                        <div class="compose-model-popup" ref=${i_}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${S_&&W`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!S_&&Q_.length===0&&W`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!S_&&Q_.map((U)=>W`
                                    <button
                                        key=${U}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${C===U?" active":""}`}
                                        onClick=${()=>{e_(U)}}
                                        disabled=${J_}
                                    >
                                        ${U}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{g0()}}
                                    disabled=${J_}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!Z&&C&&W`
                    <div class="compose-meta-row">
                        ${!Z&&C&&W`
                            <div class="compose-model-meta">
                                <button
                                    ref=${a_}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${E0}
                                    aria-label="Open model picker"
                                    onClick=${H0}
                                    disabled=${J_}
                                >
                                    ${J_?"Switching…":q_}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!J_&&T0&&W`
                                        <span class="compose-model-usage-hint" title=${E0}>
                                            ${T0}
                                        </span>
                                    `}
                                </div>
                            </div>
                        `}
                    </div>
                    `}
                    <div class="compose-actions ${Z?"search-mode":""}">
                    ${!Z&&m&&m.percent!=null&&W`
                        <${H6} usage=${m} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${Z?J:K}
                        title=${Z?"Close search":"Search"}
                    >
                        ${Z?W`
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
                    ${k0&&!Z&&W`
                        <button
                            class="icon-btn location-btn"
                            onClick=${i0}
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
                    ${b&&!Z&&W`
                        <button
                            class=${`icon-btn notification-btn${$_?" active":""}`}
                            onClick=${P}
                            title=${U_}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!Z&&W`
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
                            onClick=${()=>{u_()}}
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
    `}var k4="piclaw_theme",n3="piclaw_tint",N3={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},F6={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},C4={default:{label:"Default",mode:"auto",light:N3,dark:F6},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},y6=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],J3={theme:"default",tint:null},E4="light",p3=!1;function b4(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function C2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let Z=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(Z)&&!/^[0-9a-fA-F]{6}$/.test(Z))return null;let N=Z.length===3?Z.split("").map((J)=>J+J).join(""):Z,K=parseInt(N,16);return{r:K>>16&255,g:K>>8&255,b:K&255,hex:`#${N.toLowerCase()}`}}function D6(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let Z=document.createElement("div");if(Z.style.color="",Z.style.color=$,!Z.style.color)return null;let N=Z.style.color;try{if(document.body)Z.style.display="none",document.body.appendChild(Z),N=getComputedStyle(Z).color||Z.style.color,document.body.removeChild(Z)}catch{}let K=N.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!K)return null;let J=parseInt(K[1],10),j=parseInt(K[2],10),Y=parseInt(K[3],10);if(![J,j,Y].every((z)=>Number.isFinite(z)))return null;let O=`#${[J,j,Y].map((z)=>z.toString(16).padStart(2,"0")).join("")}`;return{r:J,g:j,b:Y,hex:O}}function A4(_){return C2(_)||D6(_)}function f2(_,$,Z){let N=Math.round(_.r+($.r-_.r)*Z),K=Math.round(_.g+($.g-_.g)*Z),J=Math.round(_.b+($.b-_.b)*Z);return`rgb(${N} ${K} ${J})`}function i3(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function w4(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function l3(_){return C4[_]||C4.default}function C6(_){return _.mode==="auto"?w4():_.mode}function k6(_,$){let Z=l3(_);if($==="dark"&&Z.dark)return Z.dark;if($==="light"&&Z.light)return Z.light;return Z.dark||Z.light||N3}function E6(_,$,Z){let N=A4($);if(!N)return _;let K=C2(_.bgPrimary),J=C2(_.bgSecondary),j=C2(_.bgHover),Y=C2(_.borderColor);if(!K||!J||!j||!Y)return _;let z=C2(Z==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:f2(K,N,0.08),bgSecondary:f2(J,N,0.12),bgHover:f2(j,N,0.16),borderColor:f2(Y,N,0.08),accent:N.hex,accentHover:z?f2(N,z,0.18):N.hex}}function b6(_,$){if(typeof document>"u")return;let Z=document.documentElement,N=_.accent,K=A4(N),J=K?i3(K,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,j=K?i3(K,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",Y=K?i3(K,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",O={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":N,"--accent-hover":_.accentHover||N,"--accent-soft":j,"--accent-soft-strong":Y,"--danger-color":_.danger||N3.danger,"--success-color":_.success||N3.success,"--search-highlight-color":J||"rgba(29, 155, 240, 0.2)"};Object.entries(O).forEach(([z,V])=>{if(V)Z.style.setProperty(z,V)})}function A6(){if(typeof document>"u")return;let _=document.documentElement;y6.forEach(($)=>_.style.removeProperty($))}function $3(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function w6(_,$){if(typeof document>"u")return;let Z=$3("theme-color");if(Z&&_)Z.setAttribute("content",_);let N=$3("msapplication-TileColor");if(N&&_)N.setAttribute("content",_);let K=$3("msapplication-navbutton-color");if(K&&_)K.setAttribute("content",_);let J=$3("apple-mobile-web-app-status-bar-style");if(J)J.setAttribute("content",$==="dark"?"black-translucent":"default")}function M6(){if(typeof window>"u")return;let _={...J3,mode:E4};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function o3(_,$={}){if(typeof window>"u"||typeof document>"u")return;let Z=b4(_?.theme||"default"),N=_?.tint?String(_.tint).trim():null,K=l3(Z),J=C6(K),j=k6(Z,J);J3={theme:Z,tint:N},E4=J;let Y=document.documentElement;Y.dataset.theme=J,Y.dataset.colorTheme=Z,Y.dataset.tint=N?String(N):"",Y.style.colorScheme=J;let O=j;if(Z==="default"&&N)O=E6(j,N,J);if(Z==="default"&&!N)A6();else b6(O,J);if(w6(O.bgPrimary,J),M6(),$.persist!==!1)if(v_(k4,Z),N)v_(n3,N);else v_(n3,"")}function Z3(){if(l3(J3.theme).mode!=="auto")return;o3(J3,{persist:!1})}function M4(){if(typeof window>"u")return()=>{};let _=b4(r0(k4)||"default"),$=r0(n3),Z=$?$.trim():null;if(o3({theme:_,tint:Z},{persist:!1}),window.matchMedia&&!p3){let N=window.matchMedia("(prefers-color-scheme: dark)");if(N.addEventListener)N.addEventListener("change",Z3);else if(N.addListener)N.addListener(Z3);return p3=!0,()=>{if(N.removeEventListener)N.removeEventListener("change",Z3);else if(N.removeListener)N.removeListener(Z3);p3=!1}}return()=>{}}function P4(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let Z=_.theme??_.name??_.colorTheme,N=_.tint??null;o3({theme:Z||"default",tint:N},{persist:!0})}function S4(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return w4()}var K3=/#(\w+)/g,P6=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),S6=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),x6=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),f6={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},T6=new Set(["http:","https:","mailto:",""]);function x4(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function W2(_,$={}){if(!_)return null;let Z=String(_).trim();if(!Z)return null;if(Z.startsWith("#")||Z.startsWith("/"))return Z;if(Z.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(Z))return Z;return null}if(Z.startsWith("blob:"))return Z;try{let N=new URL(Z,typeof window<"u"?window.location.origin:"http://localhost");if(!T6.has(N.protocol))return null;return N.href}catch{return null}}function f4(_,$={}){if(!_)return"";let Z=new DOMParser().parseFromString(_,"text/html"),N=[],K=Z.createTreeWalker(Z.body,NodeFilter.SHOW_ELEMENT),J;while(J=K.nextNode())N.push(J);for(let j of N){let Y=j.tagName.toLowerCase();if(!S6.has(Y)){let z=j.parentNode;if(!z)continue;while(j.firstChild)z.insertBefore(j.firstChild,j);z.removeChild(j);continue}let O=f6[Y]||new Set;for(let z of Array.from(j.attributes)){let V=z.name.toLowerCase(),B=z.value;if(V.startsWith("on")){j.removeAttribute(z.name);continue}if(V.startsWith("data-")||V.startsWith("aria-"))continue;if(O.has(V)||x6.has(V)){if(V==="href"){let C=W2(B);if(!C)j.removeAttribute(z.name);else if(j.setAttribute(z.name,C),Y==="a"&&!j.getAttribute("rel"))j.setAttribute("rel","noopener noreferrer")}else if(V==="src"){let C=Y==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(B):B,D=W2(C,{allowDataImage:Y==="img"});if(!D)j.removeAttribute(z.name);else j.setAttribute(z.name,D)}continue}j.removeAttribute(z.name)}}return Z.body.innerHTML}function T4(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function j3(_,$=2){if(!_)return _;let Z=_;for(let N=0;N<$;N+=1){let K=T4(Z);if(K===Z)break;Z=K}return Z}function I6(_){if(!_)return{text:"",blocks:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),N=[],K=[],J=!1,j=[];for(let Y of Z){if(!J&&Y.trim().match(/^```mermaid\s*$/i)){J=!0,j=[];continue}if(J&&Y.trim().match(/^```\s*$/)){let O=N.length;N.push(j.join(`
`)),K.push(`@@MERMAID_BLOCK_${O}@@`),J=!1,j=[];continue}if(J)j.push(Y);else K.push(Y)}if(J)K.push("```mermaid"),K.push(...j);return{text:K.join(`
`),blocks:N}}function u6(_){if(!_)return _;return j3(_,5)}function c6(_){let $=new TextEncoder().encode(String(_||"")),Z="";for(let N of $)Z+=String.fromCharCode(N);return btoa(Z)}function v6(_){let $=atob(String(_||"")),Z=new Uint8Array($.length);for(let N=0;N<$.length;N+=1)Z[N]=$.charCodeAt(N);return new TextDecoder().decode(Z)}function m6(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(Z,N)=>{let K=Number(N),J=$[K]??"",j=u6(J);return`<div class="mermaid-container" data-mermaid="${c6(j)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function I4(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,Z)=>{if(Z.includes(`
`))return`
\`\`\`
${Z}
\`\`\`
`;return`\`${Z}\``})}function u4(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,Z)=>{let N=Z.trim(),K=N.startsWith("/"),J=K?N.slice(1).trim():N,O=(J.endsWith("/")?J.slice(0,-1).trim():J).split(/\s+/)[0]?.toLowerCase();if(!O||!P6.has(O))return $;if(O==="br")return K?"":"<br>";if(K)return`</${O}>`;return`<${O}>`})}function c4(_){if(!_)return _;let $=(Z)=>Z.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(Z,N)=>`<pre><code>${$(N)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(Z,N)=>`<code>${$(N)}</code>`)}function v4(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),Z=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),N=(J)=>J.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),K;while(K=Z.nextNode()){if(!K.nodeValue)continue;let J=N(K.nodeValue);if(J!==K.nodeValue)K.nodeValue=J}return $.body.innerHTML}function R6(_){if(!window.katex)return _;let $=(j)=>T4(j).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),Z=(j)=>{let Y=[],O=j.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(z)=>{let V=Y.length;return Y.push(z),`@@CODE_BLOCK_${V}@@`});return O=O.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(z)=>{let V=Y.length;return Y.push(z),`@@CODE_INLINE_${V}@@`}),{html:O,blocks:Y}},N=(j,Y)=>{if(!Y.length)return j;return j.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(O,z)=>{let V=Number(z);return Y[V]??""})},K=Z(_),J=K.html;return J=J.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(j,Y,O)=>{try{let z=katex.renderToString($(O.trim()),{displayMode:!0,throwOnError:!1});return`${Y}${z}`}catch(z){return`<span class="math-error" title="${x4(z.message)}">${j}</span>`}}),J=J.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(j,Y,O)=>{if(/\s$/.test(O))return j;try{let z=katex.renderToString($(O),{displayMode:!1,throwOnError:!1});return`${Y}${z}`}catch(z){return`${Y}<span class="math-error" title="${x4(z.message)}">$${O}$</span>`}}),N(J,K.blocks)}function g6(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),Z=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),N=[],K;while(K=Z.nextNode())N.push(K);for(let J of N){let j=J.nodeValue;if(!j)continue;if(K3.lastIndex=0,!K3.test(j))continue;K3.lastIndex=0;let Y=J.parentElement;if(Y&&(Y.closest("a")||Y.closest("code")||Y.closest("pre")))continue;let O=j.split(K3);if(O.length<=1)continue;let z=$.createDocumentFragment();O.forEach((V,B)=>{if(B%2===1){let C=$.createElement("a");C.setAttribute("href","#"),C.className="hashtag",C.setAttribute("data-hashtag",V),C.textContent=`#${V}`,z.appendChild(C)}else z.appendChild($.createTextNode(V))}),J.parentNode?.replaceChild(z,J)}return $.body.innerHTML}function h6(_){if(!_)return _;let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),N=[],K=!1;for(let J of Z){if(!K&&J.trim().match(/^```(?:math|katex|latex)\s*$/i)){K=!0,N.push("$$");continue}if(K&&J.trim().match(/^```\s*$/)){K=!1,N.push("$$");continue}N.push(J)}return N.join(`
`)}function z2(_,$,Z={}){if(!_)return"";let N=h6(_),{text:K,blocks:J}=I6(N),j=j3(K,2),O=I4(j).replace(/</g,"&lt;").replace(/>/g,"&gt;"),z=u4(O),V=window.marked?marked.parse(z,{headerIds:!1,mangle:!1}):z.replace(/\n/g,"<br>");return V=c4(V),V=v4(V),V=R6(V),V=g6(V),V=m6(V,J),V=f4(V,Z),V}function m4(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),Z=j3($,2),K=I4(Z).replace(/</g,"&lt;").replace(/>/g,"&gt;"),J=u4(K),j=window.marked?marked.parse(J):J.replace(/\n/g,"<br>");return j=c4(j),j=v4(j),j=f4(j),j}async function k2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:Z}=window.beautifulMermaid,K=S4()==="dark"?Z["tokyo-night"]:Z["github-light"],J=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let j of J)try{let Y=j.dataset.mermaid,O=v6(Y||""),z=j3(O,2),V=await $(z,{...K,transparent:!0});j.innerHTML=V,j.removeAttribute("data-mermaid")}catch(Y){console.error("Mermaid render error:",Y);let O=document.createElement("pre");O.className="mermaid-error",O.textContent=`Diagram error: ${Y.message}`,j.innerHTML="",j.appendChild(O),j.removeAttribute("data-mermaid")}}var R4="PiClaw";function r3(_,$){let Z=_||"PiClaw",N=Z.charAt(0).toUpperCase(),K=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],J=N.charCodeAt(0)%K.length,j=K[J],Y=Z.trim().toLowerCase(),O=typeof $==="string"?$.trim():"",V=(O?O:null)||(Y==="PiClaw".toLowerCase()||Y==="pi"?"/static/icon-192.png":null);return{letter:N,color:j,image:V}}function g4(_,$){if(!_)return"PiClaw";let Z=$[_]?.name||_;return Z?Z.charAt(0).toUpperCase()+Z.slice(1):"PiClaw"}function h4(_,$){if(!_)return null;let Z=$[_]||{};return Z.avatar_url||Z.avatarUrl||Z.avatar||null}function p4(_){if(!_)return null;if(typeof document<"u"){let J=document.documentElement,j=J?.dataset?.colorTheme||"",Y=J?.dataset?.tint||"",O=getComputedStyle(J).getPropertyValue("--accent-color")?.trim();if(O&&(Y||j&&j!=="default"))return O}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],Z=String(_),N=0;for(let J=0;J<Z.length;J+=1)N=(N*31+Z.charCodeAt(J))%2147483647;let K=Math.abs(N)%$.length;return $[K]}function p6(_){if(!_||typeof _!=="object")return null;let $=_.started_at??_.startedAt;if(typeof $!=="string"||!$)return null;let Z=Date.parse($);return Number.isFinite(Z)?Z:null}function z3(_){if(!_||typeof _!=="object")return!1;let $=_.intent_key??_.intentKey;return _.type==="intent"&&$==="compaction"}function i6(_){let $=Math.max(0,Math.floor(_/1000)),Z=$%60,N=Math.floor($/60)%60,K=Math.floor($/3600);if(K>0)return`${K}:${String(N).padStart(2,"0")}:${String(Z).padStart(2,"0")}`;return`${N}:${String(Z).padStart(2,"0")}`}function i4(_,$=Date.now()){let Z=p6(_);if(Z===null)return null;return i6(Math.max(0,$-Z))}function n4({status:_,draft:$,plan:Z,thought:N,pendingRequest:K,intent:J,turnId:j,steerQueued:Y,onPanelToggle:O}){let B=(J_)=>{if(!J_)return{text:"",totalLines:0,fullText:""};if(typeof J_==="string"){let Q_=J_,R_=Q_?Q_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:Q_,totalLines:R_,fullText:Q_}}let E_=J_.text||"",X_=J_.fullText||J_.full_text||E_,D_=Number.isFinite(J_.totalLines)?J_.totalLines:X_?X_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:E_,totalLines:D_,fullText:X_}},C=160,D=(J_)=>{if(!J_)return 1;return Math.max(1,Math.ceil(J_.length/160))},A=(J_,E_,X_)=>{let D_=(J_||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!D_)return{text:"",omitted:0,totalLines:Number.isFinite(X_)?X_:0,visibleLines:0};let Q_=D_.split(`
`),R_=Q_.length>E_?Q_.slice(0,E_).join(`
`):D_,S_=Number.isFinite(X_)?X_:Q_.reduce((I_,i_)=>I_+D(i_),0),C_=R_?R_.split(`
`).reduce((I_,i_)=>I_+D(i_),0):0,j_=Math.max(S_-C_,0);return{text:R_,omitted:j_,totalLines:S_,visibleLines:C_}},E=B(Z),m=B(N),w=B($),X=Boolean(E.text)||E.totalLines>0,P=Boolean(m.text)||m.totalLines>0,M=Boolean(w.fullText?.trim()||w.text?.trim());if(!_&&!M&&!X&&!P&&!K&&!J)return null;let[f,p]=u(new Set),[i,Z_]=u(()=>Date.now()),Y_=(J_)=>p((E_)=>{let X_=new Set(E_),D_=!X_.has(J_);if(D_)X_.add(J_);else X_.delete(J_);if(typeof O==="function")O(J_,D_);return X_});R(()=>{p(new Set)},[j]);let s=z3(_);R(()=>{if(!s)return;Z_(Date.now());let J_=setInterval(()=>Z_(Date.now()),1000);return()=>clearInterval(J_)},[s,_?.started_at,_?.startedAt]);let G_=_?.turn_id||j,k_=p4(G_),r=Y?"turn-dot turn-dot-queued":"turn-dot",__=(J_)=>J_,e=Boolean(_?.last_activity||_?.lastActivity),a=(J_)=>J_==="warning"?"#f59e0b":J_==="error"?"var(--danger-color)":J_==="success"?"var(--success-color)":k_,K_=J?.kind||"info",L_=a(K_),N_=a(_?.kind||(s?"warning":"info")),B_="",W_=_?.title,H_=_?.status;if(_?.type==="plan")B_=W_?`Planning: ${W_}`:"Planning...";else if(_?.type==="tool_call")B_=W_?`Running: ${W_}`:"Running tool...";else if(_?.type==="tool_status")B_=W_?`${W_}: ${H_||"Working..."}`:H_||"Working...";else if(_?.type==="error")B_=W_||"Agent error";else B_=W_||H_||"Working...";if(e)B_="Last activity just now";let x_=({panelTitle:J_,text:E_,fullText:X_,totalLines:D_,maxLines:Q_,titleClass:R_,panelKey:S_})=>{let C_=f.has(S_),j_=X_||E_||"",I_=typeof Q_==="number",i_=C_&&I_,a_=I_?A(j_,Q_,D_):{text:j_||"",omitted:0,totalLines:Number.isFinite(D_)?D_:0};if(!j_&&!(Number.isFinite(a_.totalLines)&&a_.totalLines>0))return null;let t_=`agent-thinking-body${I_?" agent-thinking-body-collapsible":""}`,N0=I_?`--agent-thinking-collapsed-lines: ${Q_};`:"";return W`
            <div
                class="agent-thinking"
                data-expanded=${C_?"true":"false"}
                data-collapsible=${I_?"true":"false"}
                style=${k_?`--turn-color: ${k_};`:""}
            >
                <div class="agent-thinking-title ${R_||""}">
                    ${k_&&W`<span class=${r} aria-hidden="true"></span>`}
                    ${J_}
                    ${i_&&W`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${J_} panel`}
                            onClick=${()=>Y_(S_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${t_}
                    style=${N0}
                    dangerouslySetInnerHTML=${{__html:m4(j_)}}
                />
                ${!C_&&a_.omitted>0&&W`
                    <button class="agent-thinking-truncation" onClick=${()=>Y_(S_)}>
                        ▸ ${a_.omitted} more lines
                    </button>
                `}
                ${C_&&a_.omitted>0&&W`
                    <button class="agent-thinking-truncation" onClick=${()=>Y_(S_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},l_=K?.tool_call?.title,L0=l_?`Awaiting approval: ${l_}`:"Awaiting approval",M_=s?i4(_,i):null,A_=(J_,E_,X_=null)=>W`
        <div
            class="agent-thinking agent-thinking-intent"
            aria-live="polite"
            style=${E_?`--turn-color: ${E_};`:""}
            title=${J_?.detail||""}
        >
            <div class="agent-thinking-title intent">
                ${E_&&W`<span class=${r} aria-hidden="true"></span>`}
                <span class="agent-thinking-title-text">${J_.title}</span>
                ${X_&&W`<span class="agent-status-elapsed">${X_}</span>`}
            </div>
            ${J_.detail&&W`<div class="agent-thinking-body">${J_.detail}</div>`}
        </div>
    `;return W`
        <div class="agent-status-panel">
            ${J&&A_(J,L_)}
            ${_?.type==="intent"&&A_(_,N_,M_)}
            ${K&&W`
                <div class="agent-status agent-status-request" aria-live="polite" style=${k_?`--turn-color: ${k_};`:""}>
                    <span class=${r} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${L0}</span>
                </div>
            `}
            ${X&&x_({panelTitle:__("Planning"),text:E.text,fullText:E.fullText,totalLines:E.totalLines,panelKey:"plan"})}
            ${P&&x_({panelTitle:__("Thoughts"),text:m.text,fullText:m.fullText,totalLines:m.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${M&&x_({panelTitle:__("Draft"),text:w.text,fullText:w.fullText,totalLines:w.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&_?.type!=="intent"&&W`
                <div class=${`agent-status${e?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${k_?`--turn-color: ${k_};`:""}>
                    ${k_&&W`<span class=${r} aria-hidden="true"></span>`}
                    ${_?.type==="error"?W`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!e&&W`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${B_}</span>
                </div>
            `}
        </div>
    `}function l4({request:_,onRespond:$}){if(!_)return null;let{request_id:Z,tool_call:N,options:K}=_,J=N?.title||"Agent Request",j=N?.kind||"other",Y=N?.rawInput||{},O=Y.command||Y.commands&&Y.commands[0]||null,z=Y.diff||null,V=Y.fileName||Y.path||null,B=N?.description||Y.description||Y.explanation||null,D=(Array.isArray(N?.locations)?N.locations:[]).map((X)=>X?.path).filter((X)=>Boolean(X)),A=Array.from(new Set([V,...D].filter(Boolean)));console.log("AgentRequestModal:",{request_id:Z,tool_call:N,options:K});let E=async(X)=>{try{await m3(Z,X),$()}catch(P){console.error("Failed to respond to agent request:",P)}},m=async()=>{try{await Y4(J,`Auto-approved: ${J}`),await m3(Z,"approved"),$()}catch(X){console.error("Failed to add to whitelist:",X)}},w=K&&K.length>0;return W`
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
                ${(B||O||z||A.length>0)&&W`
                    <div class="agent-request-body">
                        ${B&&W`
                            <div class="agent-request-description">${B}</div>
                        `}
                        ${A.length>0&&W`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${A.map((X,P)=>W`<li key=${P}>${X}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${O&&W`
                            <pre class="agent-request-command">${O}</pre>
                        `}
                        ${z&&W`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${z}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${w?K.map((X)=>W`
                            <button 
                                key=${X.optionId||X.id||String(X)}
                                class="agent-request-btn ${X.kind==="allow_once"||X.kind==="allow_always"?"primary":""}"
                                onClick=${()=>E(X.optionId||X.id||X)}
                            >
                                ${X.name||X.label||X.optionId||X.id||String(X)}
                            </button>
                        `):W`
                        <button class="agent-request-btn primary" onClick=${()=>E("approved")}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${()=>E("denied")}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${m}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function o4({status:_}){if(_==="connected")return null;return W`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function r4(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let N=new Date-$,K=N/1000,J=86400000;if(N<J){if(K<60)return"just now";if(K<3600)return`${Math.floor(K/60)}m`;return`${Math.floor(K/3600)}h`}if(N<5*J){let O=$.toLocaleDateString(void 0,{weekday:"short"}),z=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${O} ${z}`}let j=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),Y=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${j} ${Y}`}function T2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function S0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function E2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}var n6=new Set(["application/json","application/xml","text/csv","text/html","text/markdown","text/plain","text/xml"]),l6=new Set(["text/markdown"]);function I2(_){let $=typeof _==="string"?_.trim().toLowerCase():"";if(!$)return"unsupported";if($.startsWith("image/"))return"image";if($==="application/pdf")return"pdf";if(n6.has($)||$.startsWith("text/"))return"text";return"unsupported"}function d4(_){let $=typeof _==="string"?_.trim().toLowerCase():"";return l6.has($)}function s4(_){switch(_){case"image":return"Image preview";case"pdf":return"PDF preview";case"text":return"Text preview";default:return"Preview unavailable"}}function a4(){let _=getComputedStyle(document.documentElement),$=(C,D)=>{for(let A of C){let E=_.getPropertyValue(A).trim();if(E)return E}return D},Z=$(["--text-primary","--color-text"],"#0f1419"),N=$(["--text-secondary","--color-text-muted"],"#536471"),K=$(["--bg-secondary","--color-bg-secondary"],"#f7f9fa"),J=$(["--bg-hover","--bg-tertiary","--color-bg-tertiary"],"#e8ebed"),j=$(["--accent-color","--color-accent"],"#1d9bf0"),Y=$(["--success-color","--color-success"],"#00ba7c"),O=$(["--warning-color","--color-warning","--accent-color"],"#f0b429"),z=$(["--danger-color","--color-error"],"#f4212e"),V=$(["--border-color","--color-border"],"#eff3f4");return{fontFamily:$(["--font-family"],"system-ui, sans-serif"),containerStyles:{default:{backgroundColor:K,foregroundColors:{default:{default:Z,subtle:N},accent:{default:j,subtle:j},good:{default:Y,subtle:Y},warning:{default:O,subtle:O},attention:{default:z,subtle:z}}},emphasis:{backgroundColor:J,foregroundColors:{default:{default:Z,subtle:N},accent:{default:j,subtle:j},good:{default:Y,subtle:Y},warning:{default:O,subtle:O},attention:{default:z,subtle:z}}}},actions:{actionsOrientation:"horizontal",actionAlignment:"left",buttonSpacing:8,maxActions:5,showCard:{actionMode:"inline"},spacing:"default"},adaptiveCard:{allowCustomStyle:!1},spacing:{small:4,default:8,medium:12,large:16,extraLarge:24,padding:12},separator:{lineThickness:1,lineColor:V},fontSizes:{small:12,default:14,medium:16,large:18,extraLarge:22},fontWeights:{lighter:300,default:400,bolder:600},imageSizes:{small:40,medium:80,large:120},textBlock:{headingLevel:2}}}var o6=new Set(["1.0","1.1","1.2","1.3","1.4","1.5","1.6"]),t4=!1,Y3=null;function d3(_){_.querySelector(".adaptive-card-notice")?.remove()}function r6(_,$,Z="error"){d3(_);let N=document.createElement("div");N.className=`adaptive-card-notice adaptive-card-notice-${Z}`,N.textContent=$,_.appendChild(N)}async function d6(){if(t4)return;if(Y3)return Y3;return Y3=new Promise((_,$)=>{let Z=document.createElement("script");Z.src="/static/js/vendor/adaptivecards.min.js",Z.onload=()=>{t4=!0,_()},Z.onerror=()=>$(Error("Failed to load adaptivecards SDK")),document.head.appendChild(Z)}),Y3}function s6(){return globalThis.AdaptiveCards}function a6(_){if(!_||typeof _!=="object")return!1;let $=_;return $.type==="adaptive_card"&&typeof $.card_id==="string"&&typeof $.schema_version==="string"&&typeof $.payload==="object"&&$.payload!==null}function t6(_){return o6.has(_)}function a3(_){if(!Array.isArray(_))return[];return _.filter(a6)}function e6(_){let $=typeof _?.toJSON==="function"?_.toJSON():null,Z=(typeof _?.getJsonTypeName==="function"?_.getJsonTypeName():"")||_?.constructor?.name||$?.type||"Unknown",N=(typeof _?.title==="string"?_.title:"")||(typeof $?.title==="string"?$.title:"")||"",K=(typeof _?.url==="string"?_.url:"")||(typeof $?.url==="string"?$.url:"")||void 0,J=_?.data??$?.data;return{type:Z,title:N,data:J,url:K,raw:_}}function s3(_){if(_==null)return"";if(typeof _==="string")return _.trim();if(typeof _==="number")return String(_);if(typeof _==="boolean")return _?"yes":"no";if(Array.isArray(_))return _.map(($)=>s3($)).filter(Boolean).join(", ");if(typeof _==="object")return Object.entries(_).map(([Z,N])=>`${Z}: ${s3(N)}`).filter((Z)=>!Z.endsWith(": ")).join(", ");return String(_).trim()}function _5(_){if(typeof _!=="string"||!_.trim())return"";let $=new Date(_);if(Number.isNaN($.getTime()))return"";return new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format($)}function $5(_){if(_.state==="active")return null;let $=_.state==="completed"?"Submitted":_.state==="cancelled"?"Cancelled":"Failed",Z=_.last_submission&&typeof _.last_submission==="object"?_.last_submission:null,N=Z&&typeof Z.title==="string"?Z.title.trim():"",K=Z?s3(Z.data):"",J=_5(_.completed_at||Z?.submitted_at),j=[N||null,K||null,J||null].filter(Boolean).join(" · ")||null;return{label:$,detail:j}}async function e4(_,$,Z){if(!t6($.schema_version))return console.warn(`[adaptive-card] Unsupported schema version ${$.schema_version} for card ${$.card_id}`),!1;try{await d6()}catch(N){return console.error("[adaptive-card] Failed to load SDK:",N),!1}try{let N=s6(),K=new N.AdaptiveCard;K.hostConfig=new N.HostConfig(a4()),K.parse($.payload),K.onExecuteAction=(Y)=>{let O=e6(Y);if(Z?.onAction)d3(_),_.classList.add("adaptive-card-busy"),Promise.resolve(Z.onAction(O)).catch((z)=>{console.error("[adaptive-card] Action failed:",z);let V=z instanceof Error?z.message:String(z||"Action failed.");r6(_,V||"Action failed.","error")}).finally(()=>{_.classList.remove("adaptive-card-busy")});else console.log("[adaptive-card] Action executed (not wired yet):",O)};let J=K.render();if(!J)return console.warn(`[adaptive-card] Card ${$.card_id} rendered to null`),!1;_.classList.add("adaptive-card-container");let j=$5($);if(j){_.classList.add("adaptive-card-finished");let Y=document.createElement("div");Y.className=`adaptive-card-status adaptive-card-status-${$.state}`;let O=document.createElement("span");if(O.className="adaptive-card-status-label",O.textContent=j.label,Y.appendChild(O),j.detail){let z=document.createElement("span");z.className="adaptive-card-status-detail",z.textContent=j.detail,Y.appendChild(z)}_.appendChild(Y)}return d3(_),_.appendChild(J),!0}catch(N){return console.error(`[adaptive-card] Failed to render card ${$.card_id}:`,N),!1}}function Z5(_){let $=_?.metadata?.size;return[{label:"Type",value:_?.content_type||"application/octet-stream"},{label:"Size",value:typeof $==="number"?S0($):null},{label:"Added",value:_?.created_at?E2(_.created_at):null}].filter((N)=>N.value)}function _8({mediaId:_,info:$,onClose:Z}){let N=$?.filename||`attachment-${_}`,K=d_(()=>I2($?.content_type),[$?.content_type]),J=s4(K),j=d_(()=>d4($?.content_type),[$?.content_type]),[Y,O]=u(K==="text"||K==="pdf"),[z,V]=u(""),[B,C]=u(null),[D,A]=u(null),E=y(null),m=d_(()=>Z5($),[$]),w=d_(()=>{if(!j||!z)return"";return z2(z)},[j,z]);return R(()=>{let X=(P)=>{if(P.key==="Escape")Z()};return document.addEventListener("keydown",X),()=>document.removeEventListener("keydown",X)},[Z]),R(()=>{if(!E.current||!w)return;k2(E.current);return},[w]),R(()=>{let X=!1,P=null;async function M(){if(K==="text"){O(!0),A(null);try{let f=await B4(_);if(!X)V(f)}catch{if(!X)A("Failed to load text preview.")}finally{if(!X)O(!1)}return}if(K==="pdf"){O(!0),A(null);try{let f=await q4(_);if(P=URL.createObjectURL(f),!X)C(P)}catch{if(!X)A("Failed to load PDF preview.")}finally{if(!X)O(!1)}return}O(!1)}return M(),()=>{if(X=!0,P)URL.revokeObjectURL(P)}},[_,K]),W`
        <div class="image-modal attachment-preview-modal" onClick=${Z}>
            <div class="attachment-preview-shell" onClick=${(X)=>{X.stopPropagation()}}>
                <div class="attachment-preview-header">
                    <div class="attachment-preview-heading">
                        <div class="attachment-preview-title">${N}</div>
                        <div class="attachment-preview-subtitle">${J}</div>
                    </div>
                    <div class="attachment-preview-header-actions">
                        <a
                            href=${o0(_)}
                            download=${N}
                            class="attachment-preview-download"
                            onClick=${(X)=>X.stopPropagation()}
                        >
                            Download
                        </a>
                        <button class="attachment-preview-close" type="button" onClick=${Z}>Close</button>
                    </div>
                </div>
                <div class="attachment-preview-body">
                    ${Y&&W`<div class="attachment-preview-state">Loading preview…</div>`}
                    ${!Y&&D&&W`<div class="attachment-preview-state">${D}</div>`}
                    ${!Y&&!D&&K==="image"&&W`
                        <img class="attachment-preview-image" src=${o0(_)} alt=${N} />
                    `}
                    ${!Y&&!D&&K==="pdf"&&B&&W`
                        <iframe class="attachment-preview-frame" src=${B} title=${N}></iframe>
                    `}
                    ${!Y&&!D&&K==="text"&&j&&W`
                        <div
                            ref=${E}
                            class="attachment-preview-markdown post-content"
                            dangerouslySetInnerHTML=${{__html:w}}
                        />
                    `}
                    ${!Y&&!D&&K==="text"&&!j&&W`
                        <pre class="attachment-preview-text">${z}</pre>
                    `}
                    ${!Y&&!D&&K==="unsupported"&&W`
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
    `}function $8({src:_,onClose:$}){return R(()=>{let Z=(N)=>{if(N.key==="Escape")$()};return document.addEventListener("keydown",Z),()=>document.removeEventListener("keydown",Z)},[$]),W`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function N5({mediaId:_,onPreview:$}){let[Z,N]=u(null);if(R(()=>{x2(_).then(N).catch(()=>{})},[_]),!Z)return null;let K=Z.filename||"file",J=Z.metadata?.size,j=J?S0(J):"",O=I2(Z.content_type)==="unsupported"?"Details":"Preview";return W`
        <div class="file-attachment" onClick=${(z)=>z.stopPropagation()}>
            <a href=${o0(_)} download=${K} class="file-attachment-main">
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
                        ${Z.content_type&&W`<span class="file-size">${Z.content_type}</span>`}
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
    `}function J5({attachment:_,onPreview:$}){let Z=Number(_?.id),[N,K]=u(null);R(()=>{if(!Number.isFinite(Z))return;x2(Z).then(K).catch(()=>{});return},[Z]);let J=N?.filename||_.label||`attachment-${_.id}`,j=Number.isFinite(Z)?o0(Z):null,O=I2(N?.content_type)==="unsupported"?"Details":"Preview";return W`
        <span class="attachment-pill" title=${J}>
            ${j?W`
                    <a href=${j} download=${J} class="attachment-pill-main" onClick=${(z)=>z.stopPropagation()}>
                        <${_2}
                            prefix="post"
                            label=${_.label}
                            title=${J}
                        />
                    </a>
                `:W`
                    <${_2}
                        prefix="post"
                        label=${_.label}
                        title=${J}
                    />
                `}
            ${Number.isFinite(Z)&&N&&W`
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
    `}function O3({annotations:_}){if(!_)return null;let{audience:$,priority:Z,lastModified:N}=_,K=N?E2(N):null;return W`
        <div class="content-annotations">
            ${$&&$.length>0&&W`
                <span class="content-annotation">Audience: ${$.join(", ")}</span>
            `}
            ${typeof Z==="number"&&W`
                <span class="content-annotation">Priority: ${Z}</span>
            `}
            ${K&&W`
                <span class="content-annotation">Updated: ${K}</span>
            `}
        </div>
    `}function K5({block:_}){let $=_.title||_.name||_.uri,Z=_.description,N=_.size?S0(_.size):"",K=_.mime_type||"",J=z5(K),j=W2(_.uri);return W`
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
                ${Z&&W`<div class="resource-link-description">${Z}</div>`}
                <div class="resource-link-meta">
                    ${K&&W`<span>${K}</span>`}
                    ${N&&W`<span>${N}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `}function j5({block:_}){let[$,Z]=u(!1),N=_.uri||"Embedded resource",K=_.text||"",J=Boolean(_.data),j=_.mime_type||"";return W`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(Y)=>{Y.preventDefault(),Y.stopPropagation(),Z(!$)}}>
                ${$?"▼":"▶"} ${N}
            </button>
            ${$&&W`
                ${K&&W`<pre class="resource-embed-content">${K}</pre>`}
                ${J&&W`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${j&&W`<span class="resource-embed-blob-meta">${j}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(Y)=>{Y.preventDefault(),Y.stopPropagation();let O=new Blob([Uint8Array.from(atob(_.data),(B)=>B.charCodeAt(0))],{type:j||"application/octet-stream"}),z=URL.createObjectURL(O),V=document.createElement("a");V.href=z,V.download=N.split("/").pop()||"resource",V.click(),URL.revokeObjectURL(z)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function z5(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function Y5({preview:_}){let $=W2(_.url),Z=W2(_.image,{allowDataImage:!0}),N=Z?`background-image: url('${Z}')`:"",K=_.site_name;if(!K&&$)try{K=new URL($).hostname}catch{K=$}return W`
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
                ${_.description&&W`
                    <div class="link-preview-description">${_.description}</div>
                `}
            </div>
        </a>
    `}function O5(_,$){return typeof _==="string"?_:""}var G5=1800,L5=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
    </svg>`,B5=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>`,q5=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;async function V5(_){let $=typeof _==="string"?_:"";if(!$)return!1;if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText($),!0}catch{}try{let Z=document.createElement("textarea");Z.value=$,Z.setAttribute("readonly",""),Z.style.position="fixed",Z.style.opacity="0",Z.style.pointerEvents="none",document.body.appendChild(Z),Z.select(),Z.setSelectionRange(0,Z.value.length);let N=document.execCommand("copy");return document.body.removeChild(Z),N}catch{return!1}}function W5(_){if(!_)return()=>{};let $=Array.from(_.querySelectorAll("pre")).filter((J)=>J.querySelector("code"));if($.length===0)return()=>{};let Z=new Map,N=[],K=(J,j)=>{let Y=j||"idle";if(J.dataset.copyState=Y,Y==="success")J.innerHTML=B5,J.setAttribute("aria-label","Copied"),J.setAttribute("title","Copied"),J.classList.add("is-success"),J.classList.remove("is-error");else if(Y==="error")J.innerHTML=q5,J.setAttribute("aria-label","Copy failed"),J.setAttribute("title","Copy failed"),J.classList.add("is-error"),J.classList.remove("is-success");else J.innerHTML=L5,J.setAttribute("aria-label","Copy code"),J.setAttribute("title","Copy code"),J.classList.remove("is-success","is-error")};return $.forEach((J)=>{let j=document.createElement("div");j.className="post-code-block",J.parentNode?.insertBefore(j,J),j.appendChild(J);let Y=document.createElement("button");Y.type="button",Y.className="post-code-copy-btn",K(Y,"idle"),j.appendChild(Y);let O=async(z)=>{z.preventDefault(),z.stopPropagation();let B=J.querySelector("code")?.textContent||"",C=await V5(B);K(Y,C?"success":"error");let D=Z.get(Y);if(D)clearTimeout(D);let A=setTimeout(()=>{K(Y,"idle"),Z.delete(Y)},G5);Z.set(Y,A)};Y.addEventListener("click",O),N.push(()=>{Y.removeEventListener("click",O);let z=Z.get(Y);if(z)clearTimeout(z);if(j.parentNode)j.parentNode.insertBefore(J,j),j.remove()})}),()=>{N.forEach((J)=>J())}}function X5(_){if(!_)return{content:_,fileRefs:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),N=-1;for(let z=0;z<Z.length;z+=1)if(Z[z].trim()==="Files:"&&Z[z+1]&&/^\s*-\s+/.test(Z[z+1])){N=z;break}if(N===-1)return{content:_,fileRefs:[]};let K=[],J=N+1;for(;J<Z.length;J+=1){let z=Z[J];if(/^\s*-\s+/.test(z))K.push(z.replace(/^\s*-\s+/,"").trim());else if(!z.trim())break;else break}if(K.length===0)return{content:_,fileRefs:[]};let j=Z.slice(0,N),Y=Z.slice(J),O=[...j,...Y].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,fileRefs:K}}function Q5(_){if(!_)return{content:_,messageRefs:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),N=-1;for(let z=0;z<Z.length;z+=1)if(Z[z].trim()==="Referenced messages:"&&Z[z+1]&&/^\s*-\s+/.test(Z[z+1])){N=z;break}if(N===-1)return{content:_,messageRefs:[]};let K=[],J=N+1;for(;J<Z.length;J+=1){let z=Z[J];if(/^\s*-\s+/.test(z)){let B=z.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(B)K.push(B[1])}else if(!z.trim())break;else break}if(K.length===0)return{content:_,messageRefs:[]};let j=Z.slice(0,N),Y=Z.slice(J),O=[...j,...Y].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,messageRefs:K}}function U5(_){if(!_)return{content:_,attachments:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),N=-1;for(let z=0;z<Z.length;z+=1)if(Z[z].trim()==="Images:"&&Z[z+1]&&/^\s*-\s+/.test(Z[z+1])){N=z;break}if(N===-1)return{content:_,attachments:[]};let K=[],J=N+1;for(;J<Z.length;J+=1){let z=Z[J];if(/^\s*-\s+/.test(z)){let V=z.replace(/^\s*-\s+/,"").trim(),B=V.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||V.match(/^attachment:([^\s]+)\s+(.+)$/i);if(B){let C=B[1],D=(B[2]||"").trim()||C;K.push({id:C,label:D,raw:V})}else K.push({id:null,label:V,raw:V})}else if(!z.trim())break;else break}if(K.length===0)return{content:_,attachments:[]};let j=Z.slice(0,N),Y=Z.slice(J),O=[...j,...Y].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,attachments:K}}function H5(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function F5(_,$){if(!_||!$)return _;let Z=String($).trim().split(/\s+/).filter(Boolean);if(Z.length===0)return _;let N=Z.map(H5).sort((V,B)=>B.length-V.length),K=new RegExp(`(${N.join("|")})`,"gi"),J=new RegExp(`^(${N.join("|")})$`,"i"),j=new DOMParser().parseFromString(_,"text/html"),Y=j.createTreeWalker(j.body,NodeFilter.SHOW_TEXT),O=[],z;while(z=Y.nextNode())O.push(z);for(let V of O){let B=V.nodeValue;if(!B||!K.test(B)){K.lastIndex=0;continue}K.lastIndex=0;let C=V.parentElement;if(C&&C.closest("code, pre, script, style"))continue;let D=B.split(K).filter((E)=>E!=="");if(D.length===0)continue;let A=j.createDocumentFragment();for(let E of D)if(J.test(E)){let m=j.createElement("mark");m.className="search-highlight-term",m.textContent=E,A.appendChild(m)}else A.appendChild(j.createTextNode(E));V.parentNode.replaceChild(A,V)}return j.body.innerHTML}function Z8({post:_,onClick:$,onHashtagClick:Z,onMessageRef:N,onScrollToMessage:K,agentName:J,agentAvatarUrl:j,userName:Y,userAvatarUrl:O,userAvatarBackground:z,onDelete:V,isThreadReply:B,isThreadPrev:C,isThreadNext:D,isRemoving:A,highlightQuery:E,onFileRef:m}){let[w,X]=u(null),P=y(null),M=_.data,f=M.type==="agent_response",p=Y||"You",i=f?J||R4:p,Z_=f?r3(J,j):r3(p,O),Y_=typeof z==="string"?z.trim().toLowerCase():"",s=!f&&Z_.image&&(Y_==="clear"||Y_==="transparent"),G_=f&&Boolean(Z_.image),k_=`background-color: ${s||G_?"transparent":Z_.color}`,r=M.content_meta,__=Boolean(r?.truncated),e=Boolean(r?.preview),a=__&&!e,K_=__?{originalLength:Number.isFinite(r?.original_length)?r.original_length:M.content?M.content.length:0,maxLength:Number.isFinite(r?.max_length)?r.max_length:0}:null,L_=M.content_blocks||[],N_=M.media_ids||[],B_=O5(M.content,M.link_previews),{content:W_,fileRefs:H_}=X5(B_),{content:x_,messageRefs:l_}=Q5(W_),{content:L0,attachments:M_}=U5(x_);B_=L0;let A_=a3(L_),J_=A_.length===1&&typeof A_[0]?.fallback_text==="string"?A_[0].fallback_text.trim():"",E_=Boolean(J_)&&B_?.trim()===J_,X_=Boolean(B_)&&!a&&!E_,D_=typeof E==="string"?E.trim():"",Q_=d_(()=>{if(!B_||E_)return"";let b=z2(B_,Z);return D_?F5(b,D_):b},[B_,E_,D_]),R_=(b,$_)=>{b.stopPropagation(),X(o0($_))},[S_,C_]=u(null),j_=(b)=>{C_(b)},I_=(b)=>{b.stopPropagation(),V?.(_)},i_=(b,$_)=>{let U_=new Set;if(!b||$_.length===0)return{content:b,usedIds:U_};return{content:b.replace(/attachment:([^\s)"']+)/g,(f_,v0,m0,T0)=>{let Z2=v0.replace(/^\/+/,""),J0=$_.find((O0)=>O0.name&&O0.name.toLowerCase()===Z2.toLowerCase()&&!U_.has(O0.id))||$_.find((O0)=>!U_.has(O0.id));if(!J0)return f_;if(U_.add(J0.id),T0.slice(Math.max(0,m0-2),m0)==="](")return`/media/${J0.id}`;return J0.name||"attachment"}),usedIds:U_}},a_=[],t_=[],N0=[],F_=[],Y0=[],C0=[],B0=0;if(L_.length>0)L_.forEach((b)=>{if(b?.type==="text"&&b.annotations)C0.push(b.annotations);if(b?.type==="resource_link")F_.push(b);else if(b?.type==="resource")Y0.push(b);else if(b?.type==="file"){let $_=N_[B0++];if($_)t_.push($_),N0.push({id:$_,name:b?.name||b?.filename||b?.title})}else if(b?.type==="image"||!b?.type){let $_=N_[B0++];if($_){let U_=typeof b?.mime_type==="string"?b.mime_type:void 0;a_.push({id:$_,annotations:b?.annotations,mimeType:U_}),N0.push({id:$_,name:b?.name||b?.filename||b?.title})}}});else if(N_.length>0)N_.forEach((b)=>{a_.push({id:b,annotations:null}),N0.push({id:b,name:null})});if(M_.length>0)M_.forEach((b)=>{if(!b?.id)return;let $_=N0.find((U_)=>String(U_.id)===String(b.id));if($_&&!$_.name)$_.name=b.label});let{content:q0,usedIds:o_}=i_(B_,N0);B_=q0;let x0=a_.filter(({id:b})=>!o_.has(b)),k0=t_.filter((b)=>!o_.has(b)),r_=M_.length>0?M_.map((b,$_)=>({id:b.id||`attachment-${$_+1}`,label:b.label||`attachment-${$_+1}`})):N0.map((b,$_)=>({id:b.id,label:b.name||`attachment-${$_+1}`})),f0=d_(()=>a3(L_),[L_]);R(()=>{if(!P.current)return;return k2(P.current),W5(P.current)},[Q_]);let V0=y(null);return R(()=>{if(!V0.current||f0.length===0)return;let b=V0.current;b.innerHTML="";for(let $_ of f0){let U_=document.createElement("div");b.appendChild(U_),e4(U_,$_,{onAction:async(q_)=>{if(q_.type==="Action.OpenUrl"){let f_=W2(q_.url||"");if(!f_)throw Error("Invalid URL");window.open(f_,"_blank","noopener,noreferrer");return}if(q_.type==="Action.Submit"){await z4({post_id:_.id,thread_id:M.thread_id||_.id,card_id:$_.card_id,action:{type:q_.type,title:q_.title||"",data:q_.data}});return}console.warn("[post] unsupported adaptive card action:",q_.type,q_)}}).catch((q_)=>{console.error("[post] adaptive card render error:",q_),U_.textContent=$_.fallback_text||"Card failed to render."})}},[f0,M.thread_id,_.id]),W`
        <div id=${`post-${_.id}`} class="post ${f?"agent-post":""} ${B?"thread-reply":""} ${C?"thread-prev":""} ${D?"thread-next":""} ${A?"removing":""}" onClick=${$}>
            <div class="post-avatar ${f?"agent-avatar":""} ${Z_.image?"has-image":""}" style=${k_}>
                ${Z_.image?W`<img src=${Z_.image} alt=${i} />`:Z_.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${I_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${i}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(b)=>{if(b.preventDefault(),b.stopPropagation(),N)N(_.id)}}>${r4(_.timestamp)}</a>
                </div>
                ${a&&K_&&W`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${T2(K_.originalLength)} chars
                            ${K_.maxLength?W` • Display limit: ${T2(K_.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${e&&K_&&W`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${T2(K_.maxLength)} of ${T2(K_.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(H_.length>0||l_.length>0||r_.length>0)&&W`
                    <div class="post-file-refs">
                        ${l_.map((b)=>{let $_=(U_)=>{if(U_.preventDefault(),U_.stopPropagation(),K)K(b);else{let q_=document.getElementById("post-"+b);if(q_)q_.scrollIntoView({behavior:"smooth",block:"center"}),q_.classList.add("post-highlight"),setTimeout(()=>q_.classList.remove("post-highlight"),2000)}};return W`
                                <a href=${`#msg-${b}`} class="post-msg-pill-link" onClick=${$_}>
                                    <${_2}
                                        prefix="post"
                                        label=${"msg:"+b}
                                        title=${"Message "+b}
                                        icon="message"
                                        onClick=${$_}
                                    />
                                </a>
                            `})}
                        ${H_.map((b)=>{let $_=b.split("/").pop()||b;return W`
                                <${_2}
                                    prefix="post"
                                    label=${$_}
                                    title=${b}
                                    onClick=${()=>m?.(b)}
                                />
                            `})}
                        ${r_.map((b)=>W`
                            <${J5}
                                key=${b.id}
                                attachment=${b}
                                onPreview=${j_}
                            />
                        `)}
                    </div>
                `}
                ${X_&&W`
                    <div 
                        ref=${P}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:Q_}}
                        onClick=${(b)=>{if(b.target.classList.contains("hashtag")){b.preventDefault(),b.stopPropagation();let $_=b.target.dataset.hashtag;if($_)Z?.($_)}else if(b.target.tagName==="IMG")b.preventDefault(),b.stopPropagation(),X(b.target.src)}}
                    />
                `}
                ${f0.length>0&&W`
                    <div ref=${V0} class="post-adaptive-cards" />
                `}
                ${C0.length>0&&W`
                    ${C0.map((b,$_)=>W`
                        <${O3} key=${$_} annotations=${b} />
                    `)}
                `}
                ${x0.length>0&&W`
                    <div class="media-preview">
                        ${x0.map(({id:b,mimeType:$_})=>{let q_=typeof $_==="string"&&$_.toLowerCase().startsWith("image/svg")?o0(b):L4(b);return W`
                                <img 
                                    key=${b} 
                                    src=${q_} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(f_)=>R_(f_,b)}
                                />
                            `})}
                    </div>
                `}
                ${x0.length>0&&W`
                    ${x0.map(({annotations:b},$_)=>W`
                        ${b&&W`<${O3} key=${$_} annotations=${b} />`}
                    `)}
                `}
                ${k0.length>0&&W`
                    <div class="file-attachments">
                        ${k0.map((b)=>W`
                            <${N5} key=${b} mediaId=${b} onPreview=${j_} />
                        `)}
                    </div>
                `}
                ${F_.length>0&&W`
                    <div class="resource-links">
                        ${F_.map((b,$_)=>W`
                            <div key=${$_}>
                                <${K5} block=${b} />
                                <${O3} annotations=${b.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${Y0.length>0&&W`
                    <div class="resource-embeds">
                        ${Y0.map((b,$_)=>W`
                            <div key=${$_}>
                                <${j5} block=${b} />
                                <${O3} annotations=${b.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${M.link_previews?.length>0&&W`
                    <div class="link-previews">
                        ${M.link_previews.map((b,$_)=>W`
                            <${Y5} key=${$_} preview=${b} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${w&&W`<${$8} src=${w} onClose=${()=>X(null)} />`}
        ${S_&&W`
            <${_8}
                mediaId=${S_.mediaId}
                info=${S_.info}
                onClose=${()=>C_(null)}
            />
        `}
    `}function N8({posts:_,hasMore:$,onLoadMore:Z,onPostClick:N,onHashtagClick:K,onMessageRef:J,onScrollToMessage:j,onFileRef:Y,emptyMessage:O,timelineRef:z,agents:V,user:B,onDeletePost:C,reverse:D=!0,removingPostIds:A,searchQuery:E}){let[m,w]=u(!1),X=y(null),P=typeof IntersectionObserver<"u",M=x(async()=>{if(!Z||!$||m)return;w(!0);try{await Z({preserveScroll:!0,preserveMode:"top"})}finally{w(!1)}},[$,m,Z]),f=x((r)=>{let{scrollTop:__,scrollHeight:e,clientHeight:a}=r.target,K_=D?e-a-__:__,L_=Math.max(300,a);if(K_<L_)M()},[D,M]);R(()=>{if(!P)return;let r=X.current,__=z?.current;if(!r||!__)return;let e=300,a=new IntersectionObserver((K_)=>{for(let L_ of K_){if(!L_.isIntersecting)continue;M()}},{root:__,rootMargin:`${e}px 0px ${e}px 0px`,threshold:0});return a.observe(r),()=>a.disconnect()},[P,$,Z,z,M]);let p=y(M);if(p.current=M,R(()=>{if(P)return;if(!z?.current)return;let{scrollTop:r,scrollHeight:__,clientHeight:e}=z.current,a=D?__-e-r:r,K_=Math.max(300,e);if(a<K_)p.current?.()},[P,_,$,D,z]),R(()=>{if(!z?.current)return;if(!$||m)return;let{scrollTop:r,scrollHeight:__,clientHeight:e}=z.current,a=D?__-e-r:r,K_=Math.max(300,e);if(__<=e+1||a<K_)p.current?.()},[_,$,m,D,z]),!_)return W`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return W`
            <div class="timeline" ref=${z}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${O||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let i=_.slice().sort((r,__)=>r.id-__.id),Z_=(r)=>{let __=r?.data?.thread_id;if(__===null||__===void 0||__==="")return null;let e=Number(__);return Number.isFinite(e)?e:null},Y_=new Map;for(let r=0;r<i.length;r+=1){let __=i[r],e=Number(__?.id),a=Z_(__);if(a!==null){let K_=Y_.get(a)||{anchorIndex:-1,replyIndexes:[]};K_.replyIndexes.push(r),Y_.set(a,K_)}else if(Number.isFinite(e)){let K_=Y_.get(e)||{anchorIndex:-1,replyIndexes:[]};K_.anchorIndex=r,Y_.set(e,K_)}}let s=new Map;for(let[r,__]of Y_.entries()){let e=new Set;if(__.anchorIndex>=0)e.add(__.anchorIndex);for(let a of __.replyIndexes)e.add(a);s.set(r,Array.from(e).sort((a,K_)=>a-K_))}let G_=i.map((r,__)=>{let e=Z_(r);if(e===null)return{hasThreadPrev:!1,hasThreadNext:!1};let a=s.get(e);if(!a||a.length===0)return{hasThreadPrev:!1,hasThreadNext:!1};let K_=a.indexOf(__);if(K_<0)return{hasThreadPrev:!1,hasThreadNext:!1};return{hasThreadPrev:K_>0,hasThreadNext:K_<a.length-1}}),k_=W`<div class="timeline-sentinel" ref=${X}></div>`;return W`
        <div class="timeline ${D?"reverse":"normal"}" ref=${z} onScroll=${f}>
            <div class="timeline-content">
                ${D?k_:null}
                ${i.map((r,__)=>{let e=Boolean(r.data?.thread_id&&r.data.thread_id!==r.id),a=A?.has?.(r.id),K_=G_[__]||{};return W`
                    <${Z8}
                        key=${r.id}
                        post=${r}
                        isThreadReply=${e}
                        isThreadPrev=${K_.hasThreadPrev}
                        isThreadNext=${K_.hasThreadNext}
                        isRemoving=${a}
                        highlightQuery=${E}
                        agentName=${g4(r.data?.agent_id,V||{})}
                        agentAvatarUrl=${h4(r.data?.agent_id,V||{})}
                        userName=${B?.name||B?.user_name}
                        userAvatarUrl=${B?.avatar_url||B?.avatarUrl||B?.avatar}
                        userAvatarBackground=${B?.avatar_background||B?.avatarBackground}
                        onClick=${()=>N?.(r)}
                        onHashtagClick=${K}
                        onMessageRef=${J}
                        onScrollToMessage=${j}
                        onFileRef=${Y}
                        onDelete=${C}
                    />
                `})}
                ${D?null:k_}
            </div>
        </div>
    `}class J8{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,Z=-1/0;for(let N of this.extensions.values()){if(N.placement!=="tabs")continue;if(!N.canHandle)continue;try{let K=N.canHandle(_);if(K===!1||K===0)continue;let J=K===!0?0:typeof K==="number"?K:0;if(J>Z)Z=J,$=N}catch(K){console.warn(`[PaneRegistry] canHandle() error for "${N.id}":`,K)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var n_=new J8;var G3=null,t3=null;function K8(){if(t3)return Promise.resolve(t3);if(!G3)G3=import("/static/dist/editor.bundle.js").then((_)=>{return t3=_,_}).catch((_)=>{throw G3=null,_});return G3}class j8{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await K8();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){this.queuedViewStateCb=_,this.real?.onViewStateChange?.(_)}restoreViewState(_){this.queuedViewState=_,this.real?.restoreViewState?.(_)}getPath(){return this.real?.getPath?.()??this.context.path??""}setPath(_){this.real?.setPath?.(_)}}var e3={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;if(_.mode!=="edit")return!1;return 1},mount(_,$){return new j8(_,$)}};function _1(){K8().catch(()=>{})}var y5={yellow:"#9a6700",magenta:"#8250df",cyan:"#1b7c83",brightBlack:"#57606a",brightRed:"#cf222e",brightGreen:"#1a7f37",brightYellow:"#bf8700",brightBlue:"#0550ae",brightMagenta:"#6f42c1",brightCyan:"#0a7b83"},D5={yellow:"#d29922",magenta:"#bc8cff",cyan:"#39c5cf",brightBlack:"#8b949e",brightRed:"#ff7b72",brightGreen:"#7ee787",brightYellow:"#e3b341",brightBlue:"#79c0ff",brightMagenta:"#d2a8ff",brightCyan:"#56d4dd"},L3=null,$1=null;function C5(_){if(!_)return!1;return _.startsWith("data:application/wasm")||/(^|\/)ghostty-vt\.wasm(?:[?#].*)?$/.test(_)}async function k5(_){let $=globalThis.fetch?.bind(globalThis);if(!$)return await _();let Z=new URL("/static/js/vendor/ghostty-vt.wasm",window.location.origin).href,N=(K,J)=>{let j=K instanceof Request?K.url:K instanceof URL?K.href:String(K);if(!C5(j))return $(K,J);if(K instanceof Request)return $(new Request(Z,K));return $(Z,J)};globalThis.fetch=N;try{return await _()}finally{globalThis.fetch=$}}async function E5(){let $=await import(new URL("/static/js/vendor/ghostty-web.js",window.location.origin).href);if(!L3)L3=k5(()=>Promise.resolve($.init?.())).catch((Z)=>{throw L3=null,Z});return await L3,$}async function b5(){if(typeof document>"u"||!("fonts"in document)||!document.fonts)return;if(!$1)$1=Promise.allSettled([document.fonts.load('400 13px "FiraCode Nerd Font Mono"'),document.fonts.load('700 13px "FiraCode Nerd Font Mono"'),document.fonts.ready]).then(()=>{return}).catch(()=>{return});await $1}async function A5(){let _=await fetch("/terminal/session",{method:"GET",credentials:"same-origin"}),$=await _.json().catch(()=>({}));if(!_.ok)throw Error($?.error||`HTTP ${_.status}`);return $}function w5(_){return`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}${_}`}function M5(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,Z=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(Z==="dark")return!0;if(Z==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function $2(_,$=""){if(typeof document>"u")return $;return getComputedStyle(document.documentElement).getPropertyValue(_)?.trim()||$}function P5(_,$){if(!_||!_.startsWith("#"))return _;let Z=_.slice(1);if(Z.length===3)return`#${Z[0]}${Z[0]}${Z[1]}${Z[1]}${Z[2]}${Z[2]}${$}`;if(Z.length===6)return`#${Z}${$}`;return _}function z8(){let _=M5(),$=_?D5:y5,Z=$2("--bg-primary",_?"#000000":"#ffffff"),N=$2("--text-primary",_?"#e7e9ea":"#0f1419"),K=$2("--text-secondary",_?"#71767b":"#536471"),J=$2("--accent-color","#1d9bf0"),j=$2("--danger-color",_?"#ff7b72":"#cf222e"),Y=$2("--success-color",_?"#7ee787":"#1a7f37"),O=$2("--bg-hover",_?"#1d1f23":"#e8ebed"),z=$2("--border-color",_?"#2f3336":"#eff3f4"),V=$2("--accent-soft-strong",P5(J,_?"47":"33"));return{background:Z,foreground:N,cursor:J,cursorAccent:Z,selectionBackground:V,selectionForeground:N,black:O,red:j,green:Y,yellow:$.yellow,blue:J,magenta:$.magenta,cyan:$.cyan,white:N,brightBlack:$.brightBlack,brightRed:$.brightRed,brightGreen:$.brightGreen,brightYellow:$.brightYellow,brightBlue:$.brightBlue,brightMagenta:$.brightMagenta,brightCyan:$.brightCyan,brightWhite:z}}class Y8{container;disposed=!1;termEl;bodyEl;statusEl;terminal=null;fitAddon=null;socket=null;themeObserver=null;themeChangeListener=null;mediaQuery=null;mediaQueryListener=null;resizeObserver=null;dockResizeListener=null;windowResizeListener=null;resizeFrame=0;lastAppliedThemeSignature=null;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0"),this.statusEl=document.createElement("span"),this.statusEl.className="terminal-pane-status",this.statusEl.textContent="Loading terminal…",this.bodyEl=document.createElement("div"),this.bodyEl.className="terminal-pane-body",this.bodyEl.innerHTML='<div class="terminal-placeholder">Bootstrapping ghostty-web…</div>',this.termEl.append(this.bodyEl),_.appendChild(this.termEl),this.bootstrapGhostty()}setStatus(_){this.statusEl.textContent=_,this.termEl.dataset.connectionStatus=_,this.termEl.setAttribute("aria-label",`Terminal ${_}`)}syncHostLayout(){let _=this.bodyEl.querySelector(".terminal-live-host");if(!(_ instanceof HTMLElement))return;let $=_.firstElementChild;if($ instanceof HTMLElement)$.style.width="100%",$.style.height="100%",$.style.maxWidth="100%",$.style.minWidth="0",$.style.display="block";let Z=_.querySelector("canvas");if(Z instanceof HTMLElement)Z.style.display="block",Z.style.maxWidth="none"}scheduleResize(){if(this.disposed)return;if(this.resizeFrame)cancelAnimationFrame(this.resizeFrame);this.resizeFrame=requestAnimationFrame(()=>{this.resizeFrame=0,this.resize()})}async bootstrapGhostty(){try{let _=await E5();if(await b5(),this.disposed)return;this.bodyEl.innerHTML="";let $=document.createElement("div");$.className="terminal-live-host",this.bodyEl.appendChild($);let Z=new _.Terminal({cols:120,rows:30,cursorBlink:!0,fontFamily:'FiraCode Nerd Font Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',fontSize:13,theme:z8()}),N=null;if(typeof _.FitAddon==="function")N=new _.FitAddon,Z.loadAddon?.(N);await Z.open($),this.syncHostLayout(),Z.loadFonts?.(),N?.observeResize?.(),this.terminal=Z,this.fitAddon=N,this.installThemeSync(),this.installResizeSync(),this.scheduleResize(),await this.connectBackend()}catch(_){if(console.error("[terminal-pane] Failed to bootstrap ghostty-web:",_),this.disposed)return;this.bodyEl.innerHTML='<div class="terminal-placeholder">Terminal failed to load. Check vendored assets and backend wiring.</div>',this.setStatus("Load failed")}}applyTheme(){if(!this.terminal)return;let _=z8(),$=JSON.stringify(_),Z=this.lastAppliedThemeSignature!==null&&this.lastAppliedThemeSignature!==$;try{this.termEl.style.backgroundColor=_.background,this.bodyEl.style.backgroundColor=_.background;let N=this.bodyEl.querySelector(".terminal-live-host");if(N instanceof HTMLElement)N.style.backgroundColor=_.background,N.style.color=_.foreground;let K=this.bodyEl.querySelector("canvas");if(K instanceof HTMLElement)K.style.backgroundColor=_.background,K.style.color=_.foreground}catch{}try{if(this.terminal.options)this.terminal.options.theme=_}catch{}try{if(Z&&this.terminal.reset)this.terminal.reset()}catch{}try{this.terminal.renderer?.setTheme?.(_),this.terminal.renderer?.clear?.()}catch{}try{this.terminal.loadFonts?.()}catch{}try{this.terminal.renderer?.remeasureFont?.()}catch{}try{if(this.terminal.wasmTerm&&this.terminal.renderer?.render)this.terminal.renderer.render(this.terminal.wasmTerm,!0,this.terminal.viewportY||0,this.terminal),this.terminal.renderer.render(this.terminal.wasmTerm,!1,this.terminal.viewportY||0,this.terminal)}catch{}try{this.resize()}catch{}try{if(Z&&this.socket?.readyState===WebSocket.OPEN)this.socket.send(JSON.stringify({type:"input",data:"\f"}))}catch{}try{this.terminal.refresh?.()}catch{}this.lastAppliedThemeSignature=$}installThemeSync(){if(typeof window>"u"||typeof document>"u")return;let _=()=>requestAnimationFrame(()=>this.applyTheme());_();let $=()=>_();window.addEventListener("piclaw-theme-change",$),this.themeChangeListener=$;let Z=window.matchMedia?.("(prefers-color-scheme: dark)"),N=()=>_();if(Z?.addEventListener)Z.addEventListener("change",N);else if(Z?.addListener)Z.addListener(N);this.mediaQuery=Z,this.mediaQueryListener=N;let K=typeof MutationObserver<"u"?new MutationObserver(()=>_()):null;if(K?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","style"]}),document.body)K?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});this.themeObserver=K}installResizeSync(){if(typeof window>"u")return;let _=()=>this.scheduleResize(),$=()=>this.scheduleResize();if(window.addEventListener("dock-resize",_),window.addEventListener("resize",$),this.dockResizeListener=_,this.windowResizeListener=$,typeof ResizeObserver<"u"){let Z=new ResizeObserver(()=>this.scheduleResize());Z.observe(this.container),Z.observe(this.bodyEl),this.resizeObserver=Z}}async connectBackend(){let _=this.terminal;if(!_)return;try{let $=await A5();if(this.disposed)return;if(!$?.enabled){_.write?.(`Terminal backend unavailable: ${$?.error||"disabled"}\r
`),this.setStatus("Unavailable");return}let Z=new WebSocket(w5($.ws_path||"/terminal/ws"));this.socket=Z,this.setStatus("Connecting…"),_.onData?.((N)=>{if(Z.readyState===WebSocket.OPEN)Z.send(JSON.stringify({type:"input",data:N}))}),_.onResize?.(({cols:N,rows:K})=>{if(Z.readyState===WebSocket.OPEN)Z.send(JSON.stringify({type:"resize",cols:N,rows:K}))}),Z.addEventListener("open",()=>{if(this.disposed)return;this.setStatus("Connected"),this.scheduleResize()}),Z.addEventListener("message",(N)=>{if(this.disposed)return;let K=null;try{K=JSON.parse(String(N.data))}catch{K={type:"output",data:String(N.data)}}if(K?.type==="output"&&typeof K.data==="string"){_.write?.(K.data);return}if(K?.type==="exit")_.write?.(`\r
[terminal exited]\r
`),this.setStatus("Exited")}),Z.addEventListener("close",()=>{if(this.disposed)return;this.setStatus("Disconnected")}),Z.addEventListener("error",()=>{if(this.disposed)return;this.setStatus("Connection error")})}catch($){_.write?.(`Terminal backend unavailable: ${$ instanceof Error?$.message:String($)}\r
`),this.setStatus("Unavailable")}}sendResize(){if(!this.socket||this.socket.readyState!==WebSocket.OPEN||!this.fitAddon?.proposeDimensions)return;let _=this.fitAddon.proposeDimensions();if(!_)return;this.socket.send(JSON.stringify({type:"resize",cols:_.cols,rows:_.rows}))}getContent(){return}isDirty(){return!1}focus(){if(this.terminal?.focus){this.terminal.focus();return}this.termEl?.focus()}resize(){this.syncHostLayout();try{this.terminal?.renderer?.remeasureFont?.()}catch{}try{this.fitAddon?.fit?.()}catch{}try{this.terminal?.refresh?.()}catch{}this.syncHostLayout(),this.sendResize()}dispose(){if(this.disposed)return;this.disposed=!0;try{if(this.resizeFrame)cancelAnimationFrame(this.resizeFrame),this.resizeFrame=0}catch{}try{if(this.themeChangeListener)window.removeEventListener("piclaw-theme-change",this.themeChangeListener)}catch{}try{if(this.mediaQuery&&this.mediaQueryListener){if(this.mediaQuery.removeEventListener)this.mediaQuery.removeEventListener("change",this.mediaQueryListener);else if(this.mediaQuery.removeListener)this.mediaQuery.removeListener(this.mediaQueryListener)}}catch{}try{if(this.dockResizeListener)window.removeEventListener("dock-resize",this.dockResizeListener);if(this.windowResizeListener)window.removeEventListener("resize",this.windowResizeListener)}catch{}try{this.themeObserver?.disconnect?.()}catch{}try{this.resizeObserver?.disconnect?.()}catch{}try{this.socket?.close?.()}catch{}try{this.fitAddon?.dispose?.()}catch{}try{this.terminal?.dispose?.()}catch{}this.termEl?.remove()}}var Z1={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new Y8(_,$)}};function Y2(_){return String(_||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function S5(_,$){let Z=String(_||"").trim();if(!Z)return Z;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(Z)||Z.startsWith("#")||Z.startsWith("data:")||Z.startsWith("blob:"))return Z;let N=Z.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),K=N?.[1]||Z,J=N?.[2]||"",j=N?.[3]||"",Y=String($||"").split("/").slice(0,-1).join("/"),z=K.startsWith("/")?K:`${Y?`${Y}/`:""}${K}`,V=[];for(let C of z.split("/")){if(!C||C===".")continue;if(C===".."){if(V.length>0)V.pop();continue}V.push(C)}let B=V.join("/");return`${g3(B)}${J}${j}`}function u2(_){return _?.preview||null}function x5(_){let $=String(_||""),Z=Math.max($.lastIndexOf("/"),$.lastIndexOf("\\")),N=Z>=0?$.slice(Z+1):$,K=N.lastIndexOf(".");if(K<=0||K===N.length-1)return"none";return N.slice(K+1)}function f5(_){if(!_)return"unknown";if(_.kind==="image")return"image";if(_.kind==="text")return _.content_type==="text/markdown"?"markdown":"text";if(_.kind==="binary")return"binary";return String(_.kind||"unknown")}function T5(_,$){let Z=$?.path||_?.path||"",N=[];if($?.content_type)N.push(`<span><strong>type:</strong> ${Y2($.content_type)}</span>`);if(typeof $?.size==="number")N.push(`<span><strong>size:</strong> ${Y2(S0($.size))}</span>`);if($?.mtime)N.push(`<span><strong>modified:</strong> ${Y2(E2($.mtime))}</span>`);if(N.push(`<span><strong>kind:</strong> ${Y2(f5($))}</span>`),N.push(`<span><strong>extension:</strong> ${Y2(x5(Z))}</span>`),Z)N.push(`<span><strong>path:</strong> ${Y2(Z)}</span>`);if($?.truncated)N.push("<span><strong>content:</strong> truncated</span>");return`<div class="workspace-preview-meta workspace-preview-meta-inline">${N.join("")}</div>`}function I5(_){let $=u2(_);if(!$)return'<div class="workspace-preview-text">No preview available.</div>';let Z=T5(_,$);if($.kind==="image"){let N=$.url||($.path?g3($.path):"");return`${Z}
            <div class="workspace-preview-image">
                <img src="${Y2(N)}" alt="preview" />
            </div>
        `}if($.kind==="text"){if($.content_type==="text/markdown"){let N=z2($.text||"",null,{rewriteImageSrc:(K)=>S5(K,$.path||_?.path)});return`${Z}<div class="workspace-preview-text">${N}</div>`}return`${Z}<pre class="workspace-preview-text"><code>${Y2($.text||"")}</code></pre>`}if($.kind==="binary")return`${Z}<div class="workspace-preview-text">Binary file — download to view.</div>`;return`${Z}<div class="workspace-preview-text">No preview available.</div>`}class N1{constructor(_,$){this.container=_,this.context=$,this.disposed=!1,this.host=document.createElement("div"),this.host.className="workspace-preview-render-host",this.host.tabIndex=0,this.container.appendChild(this.host),this.render()}render(){if(this.disposed)return;this.host.innerHTML=I5(this.context)}getContent(){let _=u2(this.context);return typeof _?.text==="string"?_.text:void 0}isDirty(){return!1}setContent(_,$){let Z=u2(this.context);if(Z&&Z.kind==="text"){if(Z.text=_,$!==void 0)Z.mtime=$}if(this.context.content=_,$!==void 0)this.context.mtime=$;this.render()}focus(){this.host?.focus?.()}dispose(){if(this.disposed)return;this.disposed=!0,this.host?.remove(),this.container.innerHTML=""}}var J1={id:"workspace-markdown-preview",label:"Workspace Markdown Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){let $=u2(_);if(_?.mode!=="view")return!1;if(!$||$.kind!=="text")return!1;return $.content_type==="text/markdown"?20:!1},mount(_,$){return new N1(_,$)}},K1={id:"workspace-preview-default",label:"Workspace Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){if(_?.mode!=="view")return!1;return u2(_)||_?.path?1:!1},mount(_,$){return new N1(_,$)}};class O8{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let Z of this.listeners)try{Z(_,$)}catch{}}open(_,$){let Z=this.tabs.get(_);if(!Z)Z={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,Z);return this.activate(_),Z}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((Z)=>Z!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,Z]of this.tabs)if($!==_&&!Z.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((N)=>N!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((Z)=>Z!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let Z=this.tabs.get(_);if(!Z||Z.dirty===$)return;Z.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let Z=this.tabs.get(_);if(Z)Z.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,Z){let N=this.tabs.get(_);if(!N)return;if(this.tabs.delete(_),N.id=$,N.path=$,N.label=Z||$.split("/").pop()||$,this.tabs.set($,N),this.mruOrder=this.mruOrder.map((K)=>K===_?$:K),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((N)=>N.id===this.activeId),Z=_[($+1)%_.length];this.activate(Z.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((N)=>N.id===this.activeId),Z=_[($-1+_.length)%_.length];this.activate(Z.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var w_=new O8;var B3="workspaceExplorerScale",u5=["compact","default","comfortable"],c5=new Set(u5),v5={compact:{indentPx:14},default:{indentPx:16},comfortable:{indentPx:18}};function G8(_,$="default"){if(typeof _!=="string")return $;let Z=_.trim().toLowerCase();return c5.has(Z)?Z:$}function j1(){if(typeof window>"u")return{width:0,isTouch:!1};let _=Number(window.innerWidth)||0,$=Boolean(window.matchMedia?.("(pointer: coarse)")?.matches),Z=Boolean(window.matchMedia?.("(hover: none)")?.matches),N=Number(globalThis.navigator?.maxTouchPoints||0)>0;return{width:_,isTouch:$||N&&Z}}function m5(_={}){let $=Math.max(0,Number(_.width)||0);if(Boolean(_.isTouch))return"comfortable";if($>0&&$<1180)return"comfortable";return"default"}function R5(_,$={}){if(Boolean($.isTouch)&&_==="compact")return"default";return _}function z1(_={}){let $=m5(_),Z=_.stored?G8(_.stored,$):$;return R5(Z,_)}function L8(_){return v5[G8(_)]}var g5=60000,W8=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function X8(_,$,Z,N=0,K=[]){if(!Z&&W8(_))return K;if(!_)return K;if(K.push({node:_,depth:N}),_.type==="dir"&&_.children&&$.has(_.path))for(let J of _.children)X8(J,$,Z,N+1,K);return K}function B8(_,$,Z){if(!_)return"";let N=[],K=(J)=>{if(!Z&&W8(J))return;if(N.push(J.type==="dir"?`d:${J.path}`:`f:${J.path}`),J.children&&$?.has(J.path))for(let j of J.children)K(j)};return K(_),N.join("|")}function L1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let Z=Array.isArray(_.children)?_.children:null,N=Array.isArray($.children)?$.children:null;if(!N)return _;let K=Z?new Map(Z.map((Y)=>[Y?.path,Y])):new Map,J=!Z||Z.length!==N.length,j=N.map((Y)=>{let O=L1(K.get(Y.path),Y);if(O!==K.get(Y.path))J=!0;return O});return J?{...$,children:j}:_}function O1(_,$,Z){if(!_)return _;if(_.path===$)return L1(_,Z);if(!Array.isArray(_.children))return _;let N=!1,K=_.children.map((J)=>{let j=O1(J,$,Z);if(j!==J)N=!0;return j});return N?{..._,children:K}:_}var Q8=4,Y1=14,h5=8,p5=16;function U8(_){if(!_)return 0;if(_.type==="file"){let N=Math.max(0,Number(_.size)||0);return _.__bytes=N,N}let $=Array.isArray(_.children)?_.children:[],Z=0;for(let N of $)Z+=U8(N);return _.__bytes=Z,Z}function H8(_,$=0){let Z=Math.max(0,Number(_?.__bytes??_?.size??0)),N={name:_?.name||_?.path||".",path:_?.path||".",size:Z,children:[]};if(!_||_.type!=="dir"||$>=Q8)return N;let K=Array.isArray(_.children)?_.children:[],J=[];for(let Y of K){let O=Math.max(0,Number(Y?.__bytes??Y?.size??0));if(O<=0)continue;if(Y.type==="dir")J.push({kind:"dir",node:Y,size:O});else J.push({kind:"file",name:Y.name,path:Y.path,size:O})}J.sort((Y,O)=>O.size-Y.size);let j=J;if(J.length>Y1){let Y=J.slice(0,Y1-1),O=J.slice(Y1-1),z=O.reduce((V,B)=>V+B.size,0);Y.push({kind:"other",name:`+${O.length} more`,path:`${N.path}/[other]`,size:z}),j=Y}return N.children=j.map((Y)=>{if(Y.kind==="dir")return H8(Y.node,$+1);return{name:Y.name,path:Y.path,size:Y.size,children:[]}}),N}function q8(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,Z=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(Z==="dark")return!0;if(Z==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function F8(_,$,Z){let N=((_+Math.PI/2)*180/Math.PI+360)%360,K=Z?Math.max(30,70-$*10):Math.max(34,66-$*8),J=Z?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${N.toFixed(1)} ${K}% ${J}%)`}function q3(_,$,Z,N){return{x:_+Z*Math.cos(N),y:$+Z*Math.sin(N)}}function B1(_,$,Z,N,K,J){let j=Math.PI*2-0.0001,Y=J-K>j?K+j:J,O=q3(_,$,N,K),z=q3(_,$,N,Y),V=q3(_,$,Z,Y),B=q3(_,$,Z,K),C=Y-K>Math.PI?1:0;return[`M ${O.x.toFixed(3)} ${O.y.toFixed(3)}`,`A ${N} ${N} 0 ${C} 1 ${z.x.toFixed(3)} ${z.y.toFixed(3)}`,`L ${V.x.toFixed(3)} ${V.y.toFixed(3)}`,`A ${Z} ${Z} 0 ${C} 0 ${B.x.toFixed(3)} ${B.y.toFixed(3)}`,"Z"].join(" ")}var y8={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function D8(_,$,Z){let N=[],K=[],J=Math.max(0,Number($)||0),j=(Y,O,z,V)=>{let B=Array.isArray(Y?.children)?Y.children:[];if(!B.length)return;let C=Math.max(0,Number(Y.size)||0);if(C<=0)return;let D=z-O,A=O;B.forEach((E,m)=>{let w=Math.max(0,Number(E.size)||0);if(w<=0)return;let X=w/C,P=A,M=m===B.length-1?z:A+D*X;if(A=M,M-P<0.003)return;let f=y8[V];if(f){let p=F8(P,V,Z);if(N.push({key:E.path,path:E.path,label:E.name,size:w,color:p,depth:V,startAngle:P,endAngle:M,innerRadius:f[0],outerRadius:f[1],d:B1(120,120,f[0],f[1],P,M)}),V===1)K.push({key:E.path,name:E.name,size:w,pct:J>0?w/J*100:0,color:p})}if(V<Q8)j(E,P,M,V+1)})};return j(_,-Math.PI/2,Math.PI*3/2,1),{segments:N,legend:K}}function G1(_,$){if(!_||!$)return null;if(_.path===$)return _;let Z=Array.isArray(_.children)?_.children:[];for(let N of Z){let K=G1(N,$);if(K)return K}return null}function C8(_,$,Z,N){if(!Z||Z<=0)return{segments:[],legend:[]};let K=y8[1];if(!K)return{segments:[],legend:[]};let J=-Math.PI/2,j=Math.PI*3/2,Y=F8(J,1,N),z=`${$||"."}/[files]`;return{segments:[{key:z,path:z,label:_,size:Z,color:Y,depth:1,startAngle:J,endAngle:j,innerRadius:K[0],outerRadius:K[1],d:B1(120,120,K[0],K[1],J,j)}],legend:[{key:z,name:_,size:Z,pct:100,color:Y}]}}function V8(_,$=!1,Z=!1){if(!_)return null;let N=U8(_),K=H8(_,0),J=K.size||N,{segments:j,legend:Y}=D8(K,J,Z);if(!j.length&&J>0){let O=C8("[files]",K.path,J,Z);j=O.segments,Y=O.legend}return{root:K,totalSize:J,segments:j,legend:Y,truncated:$,isDarkTheme:Z}}function i5({payload:_}){if(!_)return null;let[$,Z]=u(null),[N,K]=u(_?.root?.path||"."),[J,j]=u(()=>[_?.root?.path||"."]),[Y,O]=u(!1);R(()=>{let s=_?.root?.path||".";K(s),j([s]),Z(null)},[_?.root?.path,_?.totalSize]),R(()=>{if(!N)return;O(!0);let s=setTimeout(()=>O(!1),180);return()=>clearTimeout(s)},[N]);let z=d_(()=>{return G1(_.root,N)||_.root},[_?.root,N]),V=z?.size||_.totalSize||0,{segments:B,legend:C}=d_(()=>{let s=D8(z,V,_.isDarkTheme);if(s.segments.length>0)return s;if(V<=0)return s;let G_=z?.children?.length?"Total":"[files]";return C8(G_,z?.path||_?.root?.path||".",V,_.isDarkTheme)},[z,V,_.isDarkTheme,_?.root?.path]),[D,A]=u(B),E=y(new Map),m=y(0);R(()=>{let s=E.current,G_=new Map(B.map((e)=>[e.key,e])),k_=performance.now(),r=220,__=(e)=>{let a=Math.min(1,(e-k_)/220),K_=a*(2-a),L_=B.map((N_)=>{let W_=s.get(N_.key)||{startAngle:N_.startAngle,endAngle:N_.startAngle,innerRadius:N_.innerRadius,outerRadius:N_.innerRadius},H_=(A_,J_)=>A_+(J_-A_)*K_,x_=H_(W_.startAngle,N_.startAngle),l_=H_(W_.endAngle,N_.endAngle),L0=H_(W_.innerRadius,N_.innerRadius),M_=H_(W_.outerRadius,N_.outerRadius);return{...N_,d:B1(120,120,L0,M_,x_,l_)}});if(A(L_),a<1)m.current=requestAnimationFrame(__)};if(m.current)cancelAnimationFrame(m.current);return m.current=requestAnimationFrame(__),E.current=G_,()=>{if(m.current)cancelAnimationFrame(m.current)}},[B]);let w=D.length?D:B,X=V>0?S0(V):"0 B",P=z?.name||"",f=(P&&P!=="."?P:"Total")||"Total",p=X,i=J.length>1,Z_=(s)=>{if(!s?.path)return;let G_=G1(_.root,s.path);if(!G_||!Array.isArray(G_.children)||G_.children.length===0)return;j((k_)=>[...k_,G_.path]),K(G_.path),Z(null)},Y_=()=>{if(!i)return;j((s)=>{let G_=s.slice(0,-1);return K(G_[G_.length-1]||_?.root?.path||"."),G_}),Z(null)};return W`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${Y?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${z?.path||_?.root?.path||"."}`}
                data-segments=${w.length}
                data-base-size=${V}>
                ${w.map((s)=>W`
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
                        onClick=${()=>Z_(s)}
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
                            <span class="workspace-folder-starburst-size">${S0(s.size)}</span>
                            <span class="workspace-folder-starburst-pct">${s.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&W`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function n5({mediaId:_}){let[$,Z]=u(null);if(R(()=>{if(!_)return;x2(_).then(Z).catch(()=>{})},[_]),!$)return null;let N=$.filename||"file",K=$.metadata?.size?S0($.metadata.size):"";return W`
        <a href=${o0(_)} download=${N} class="file-attachment"
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
                ${K&&W`<span class="file-size">${K}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function k8({onFileSelect:_,visible:$=!0,active:Z=void 0,onOpenEditor:N}){let[K,J]=u(null),[j,Y]=u(new Set(["."])),[O,z]=u(null),[V,B]=u(null),[C,D]=u(""),[A,E]=u(null),[m,w]=u(null),[X,P]=u(!0),[M,f]=u(!1),[p,i]=u(null),[Z_,Y_]=u(()=>y2("workspaceShowHidden",!1)),[s,G_]=u(!1),[k_,r]=u(null),[__,e]=u(null),[a,K_]=u(null),[L_,N_]=u(!1),[B_,W_]=u(null),[H_,x_]=u(()=>q8()),[l_,L0]=u(()=>z1({stored:r0(B3),...j1()})),M_=y(j),A_=y(""),J_=y(null),E_=y(0),X_=y(new Set),D_=y(null),Q_=y(new Map),R_=y(_),S_=y(N),C_=y(null),j_=y(null),I_=y(null),i_=y(null),a_=y(null),t_=y(null),N0=y("."),F_=y(null),Y0=y({path:null,dragging:!1,startX:0,startY:0}),C0=y({path:null,dragging:!1,startX:0,startY:0}),B0=y({path:null,timer:0}),q0=y(!1),o_=y(0),x0=y(new Map),k0=y(null),r_=y(null),f0=y(null),V0=y(null),b=y(Z_),$_=y($),U_=y(Z??$),q_=y(0),f_=y(a),v0=y(s),m0=y(k_),T0=y(null),Z2=y({x:0,y:0}),E0=y(0),J0=y(null),K0=y(O),O0=y(V),I0=y(null),m_=y(null),O2=y(A);R_.current=_,S_.current=N,R(()=>{M_.current=j},[j]),R(()=>{b.current=Z_},[Z_]),R(()=>{$_.current=$},[$]),R(()=>{U_.current=Z??$},[Z,$]),R(()=>{f_.current=a},[a]),R(()=>{if(typeof window>"u")return;let G=()=>{L0(z1({stored:r0(B3),...j1()}))};G();let Q=()=>G(),F=()=>G(),H=(g)=>{if(!g||g.key===null||g.key===B3)G()};window.addEventListener("resize",Q),window.addEventListener("focus",F),window.addEventListener("storage",H);let v=window.matchMedia?.("(pointer: coarse)"),n=window.matchMedia?.("(hover: none)"),l=(g,z_)=>{if(!g)return;if(g.addEventListener)g.addEventListener("change",z_);else if(g.addListener)g.addListener(z_)},o=(g,z_)=>{if(!g)return;if(g.removeEventListener)g.removeEventListener("change",z_);else if(g.removeListener)g.removeListener(z_)};return l(v,Q),l(n,Q),()=>{window.removeEventListener("resize",Q),window.removeEventListener("focus",F),window.removeEventListener("storage",H),o(v,Q),o(n,Q)}},[]),R(()=>{let G=(Q)=>{let F=Q?.detail?.path;if(!F)return;let H=F.split("/"),v=[];for(let n=1;n<H.length;n++)v.push(H.slice(0,n).join("/"));if(v.length)Y((n)=>{let l=new Set(n);l.add(".");for(let o of v)l.add(o);return l});z(F),requestAnimationFrame(()=>{let n=document.querySelector(`[data-path="${CSS.escape(F)}"]`);if(n)n.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",G),()=>window.removeEventListener("workspace-reveal-path",G)},[]),R(()=>{v0.current=s},[s]),R(()=>{m0.current=k_},[k_]),R(()=>{K0.current=O},[O]),R(()=>{O0.current=V},[V]),R(()=>{O2.current=A},[A]),R(()=>{if(typeof window>"u"||typeof document>"u")return;let G=()=>x_(q8());G();let Q=window.matchMedia?.("(prefers-color-scheme: dark)"),F=()=>G();if(Q?.addEventListener)Q.addEventListener("change",F);else if(Q?.addListener)Q.addListener(F);let H=typeof MutationObserver<"u"?new MutationObserver(()=>G()):null;if(H?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)H?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(Q?.removeEventListener)Q.removeEventListener("change",F);else if(Q?.removeListener)Q.removeListener(F);H?.disconnect()}},[]),R(()=>{if(!V)return;let G=a_.current;if(!G)return;let Q=requestAnimationFrame(()=>{try{G.focus(),G.select()}catch{}});return()=>cancelAnimationFrame(Q)},[V]);let R0=async(G)=>{f(!0),E(null),w(null);try{let Q=await V4(G,20000);E(Q)}catch(Q){E({error:Q.message||"Failed to load preview"})}finally{f(!1)}};C_.current=R0;let W0=async()=>{if(!$_.current)return;try{let G=await e2("",1,b.current),Q=B8(G.root,M_.current,b.current);if(Q===A_.current){P(!1);return}if(A_.current=Q,J_.current=G.root,!E_.current)E_.current=requestAnimationFrame(()=>{E_.current=0,J((F)=>L1(F,J_.current)),P(!1)})}catch(G){i(G.message||"Failed to load workspace"),P(!1)}},g0=async(G)=>{if(!G)return;if(X_.current.has(G))return;X_.current.add(G);try{let Q=await e2(G,1,b.current);J((F)=>O1(F,G,Q.root))}catch(Q){i(Q.message||"Failed to load workspace")}finally{X_.current.delete(G)}};j_.current=g0;let e_=x(()=>{let G=O;if(!G)return".";let Q=Q_.current?.get(G);if(Q&&Q.type==="dir")return Q.path;if(G==="."||!G.includes("/"))return".";let F=G.split("/");return F.pop(),F.join("/")||"."},[O]),H0=x((G)=>{let Q=G?.closest?.(".workspace-row");if(!Q)return null;let F=Q.dataset.path,H=Q.dataset.type;if(!F)return null;if(H==="dir")return F;if(F.includes("/")){let v=F.split("/");return v.pop(),v.join("/")||"."}return"."},[]),h0=x((G)=>{return H0(G?.target||null)},[H0]),u_=x((G)=>{f_.current=G,K_(G)},[]),_0=x(()=>{let G=B0.current;if(G?.timer)clearTimeout(G.timer);B0.current={path:null,timer:0}},[]),F0=x((G)=>{if(!G||G==="."){_0();return}let Q=Q_.current?.get(G);if(!Q||Q.type!=="dir"){_0();return}if(M_.current?.has(G)){_0();return}if(B0.current?.path===G)return;_0();let F=setTimeout(()=>{B0.current={path:null,timer:0},j_.current?.(G),Y((H)=>{let v=new Set(H);return v.add(G),v})},600);B0.current={path:G,timer:F}},[_0]),X0=x((G,Q)=>{if(Z2.current={x:G,y:Q},E0.current)return;E0.current=requestAnimationFrame(()=>{E0.current=0;let F=T0.current;if(!F)return;let H=Z2.current;F.style.transform=`translate(${H.x+12}px, ${H.y+12}px)`})},[]),b0=x((G)=>{if(!G)return;let F=(Q_.current?.get(G)?.name||G.split("/").pop()||G).trim();if(!F)return;e({path:G,label:F})},[]),p0=x(()=>{if(e(null),E0.current)cancelAnimationFrame(E0.current),E0.current=0;if(T0.current)T0.current.style.transform="translate(-9999px, -9999px)"},[]),N2=x((G)=>{if(!G)return".";let Q=Q_.current?.get(G);if(Q&&Q.type==="dir")return Q.path;if(G==="."||!G.includes("/"))return".";let F=G.split("/");return F.pop(),F.join("/")||"."},[]),Q0=x(()=>{B(null),D("")},[]),b2=x((G)=>{if(!G)return;let F=(Q_.current?.get(G)?.name||G.split("/").pop()||G).trim();if(!F||G===".")return;B(G),D(F)},[]),U0=x(async()=>{let G=O0.current;if(!G)return;let Q=(C||"").trim();if(!Q){Q0();return}let F=Q_.current?.get(G),H=(F?.name||G.split("/").pop()||G).trim();if(Q===H){Q0();return}try{let n=(await Q4(G,Q))?.path||G,l=G.includes("/")?G.split("/").slice(0,-1).join("/")||".":".";if(Q0(),i(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:G,newPath:n,type:F?.type||"file"}})),F?.type==="dir")Y((o)=>{let g=new Set;for(let z_ of o)if(z_===G)g.add(n);else if(z_.startsWith(`${G}/`))g.add(`${n}${z_.slice(G.length)}`);else g.add(z_);return g});if(z(n),F?.type==="dir")E(null),f(!1),w(null);else C_.current?.(n);j_.current?.(l)}catch(v){i(v?.message||"Failed to rename file")}},[Q0,C]),u0=x(async(G)=>{let H=G||".";for(let v=0;v<50;v+=1){let l=`untitled${v===0?"":`-${v}`}.md`;try{let g=(await X4(H,l,""))?.path||(H==="."?l:`${H}/${l}`);if(H&&H!==".")Y((z_)=>new Set([...z_,H]));z(g),i(null),j_.current?.(H),C_.current?.(g);return}catch(o){if(o?.status===409||o?.code==="file_exists")continue;i(o?.message||"Failed to create file");return}}i("Failed to create file (untitled name already in use).")},[]),i0=x((G)=>{if(G?.stopPropagation?.(),L_)return;let Q=N2(K0.current);u0(Q)},[L_,N2,u0]);R(()=>{if(typeof window>"u")return;let G=(Q)=>{let F=Q?.detail?.updates||[];if(!Array.isArray(F)||F.length===0)return;J((o)=>{let g=o;for(let z_ of F){if(!z_?.root)continue;if(!g||z_.path==="."||!z_.path)g=z_.root;else g=O1(g,z_.path,z_.root)}if(g)A_.current=B8(g,M_.current,b.current);return P(!1),g});let H=K0.current;if(Boolean(H)&&F.some((o)=>{let g=o?.path||"";if(!g||g===".")return!0;return H===g||H.startsWith(`${g}/`)||g.startsWith(`${H}/`)}))x0.current.clear();if(!H||!O2.current)return;let n=Q_.current?.get(H);if(n&&n.type==="dir")return;if(F.some((o)=>{let g=o?.path||"";if(!g||g===".")return!0;return H===g||H.startsWith(`${g}/`)}))C_.current?.(H)};return window.addEventListener("workspace-update",G),()=>window.removeEventListener("workspace-update",G)},[]),D_.current=W0;let J2=y(()=>{if(typeof window>"u")return;let G=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),Q=U_.current??$_.current,F=document.visibilityState!=="hidden"&&(Q||G.matches&&$_.current);_3(F,b.current).catch(()=>{})}).current,U=y(0),I=y(()=>{if(U.current)clearTimeout(U.current);U.current=setTimeout(()=>{U.current=0,J2()},250)}).current;R(()=>{if($_.current)D_.current?.();I()},[$,Z]),R(()=>{D_.current(),J2();let G=setInterval(()=>D_.current(),g5),Q=D2("previewHeight",null),F=Number.isFinite(Q)?Math.min(Math.max(Q,80),600):280;if(o_.current=F,I_.current)I_.current.style.setProperty("--preview-height",`${F}px`);let H=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),v=()=>I();if(H.addEventListener)H.addEventListener("change",v);else if(H.addListener)H.addListener(v);return document.addEventListener("visibilitychange",v),()=>{if(clearInterval(G),E_.current)cancelAnimationFrame(E_.current),E_.current=0;if(H.removeEventListener)H.removeEventListener("change",v);else if(H.removeListener)H.removeListener(v);if(document.removeEventListener("visibilitychange",v),U.current)clearTimeout(U.current),U.current=0;if(F_.current)clearTimeout(F_.current),F_.current=null;_3(!1,b.current).catch(()=>{})}},[]);let d=d_(()=>X8(K,j,Z_),[K,j,Z_]),O_=d_(()=>new Map(d.map((G)=>[G.node.path,G.node])),[d]),b_=d_(()=>L8(l_),[l_]);Q_.current=O_;let V_=(O?Q_.current.get(O):null)?.type==="dir";R(()=>{if(!O||!V_){W_(null),k0.current=null,r_.current=null;return}let G=O,Q=`${Z_?"hidden":"visible"}:${O}`,F=x0.current,H=F.get(Q);if(H?.root){F.delete(Q),F.set(Q,H);let l=V8(H.root,Boolean(H.truncated),H_);if(l)k0.current=l,r_.current=O,W_({loading:!1,error:null,payload:l});return}let v=k0.current,n=r_.current;W_({loading:!0,error:null,payload:n===O?v:null}),e2(O,h5,Z_).then((l)=>{if(K0.current!==G)return;let o={root:l?.root,truncated:Boolean(l?.truncated)};F.delete(Q),F.set(Q,o);while(F.size>p5){let z_=F.keys().next().value;if(!z_)break;F.delete(z_)}let g=V8(o.root,o.truncated,H_);k0.current=g,r_.current=O,W_({loading:!1,error:null,payload:g})}).catch((l)=>{if(K0.current!==G)return;W_({loading:!1,error:l?.message||"Failed to load folder size chart",payload:n===O?v:null})})},[O,V_,Z_,H_]);let $0=Boolean(A&&A.kind==="text"&&!V_&&(!A.size||A.size<=262144)),A0=$0?"Open in editor":A?.size>262144?"File too large to edit":"File is not editable";R(()=>{let G=f0.current;if(V0.current)V0.current.dispose(),V0.current=null;if(!G)return;if(G.innerHTML="",!O||V_||!A||A.error)return;let Q={path:O,content:typeof A.text==="string"?A.text:void 0,mtime:A.mtime,size:A.size,preview:A,mode:"view"},F=n_.resolve(Q)||n_.get("workspace-preview-default");if(!F)return;let H=F.mount(G,Q);return V0.current=H,()=>{if(V0.current===H)H.dispose(),V0.current=null;G.innerHTML=""}},[O,V_,A]);let y0=(G)=>{let Q=G?.target;if(Q instanceof Element)return Q;return Q?.parentElement||null},d0=(G)=>{return Boolean(G?.closest?.(".workspace-node-icon, .workspace-label-text"))},G2=y((G)=>{if(m_.current)clearTimeout(m_.current),m_.current=null;let F=y0(G)?.closest?.("[data-path]");if(!F)return;let H=F.dataset.path;if(F.dataset.type==="dir"||!H)return;if(O0.current===H)Q0();S_.current?.(H)}).current,X2=y((G)=>{if(q0.current){q0.current=!1;return}let Q=y0(G),F=Q?.closest?.("[data-path]");if(i_.current?.focus?.(),!F)return;let H=F.dataset.path,v=F.dataset.type,n=Boolean(Q?.closest?.(".workspace-caret")),l=Boolean(Q?.closest?.("button"))||Boolean(Q?.closest?.("a"))||Boolean(Q?.closest?.("input")),o=K0.current===H,g=O0.current;if(g){if(g===H)return;Q0()}let z_=v==="file"&&I0.current===H&&!n&&!l;if(o&&!n&&!l&&H!=="."&&!z_){if(m_.current)clearTimeout(m_.current);m_.current=setTimeout(()=>{m_.current=null,b2(H)},350);return}if(v==="dir"){if(I0.current=null,z(H),E(null),w(null),f(!1),!M_.current.has(H))j_.current?.(H);if(o&&!n)return;Y((a0)=>{let l0=new Set(a0);if(l0.has(H))l0.delete(H);else l0.add(H);return l0})}else{I0.current=null,z(H);let G0=Q_.current.get(H);if(G0)R_.current?.(G0.path,G0);C_.current?.(H)}}).current,D0=y(()=>{A_.current="",D_.current(),Array.from(M_.current||[]).filter((Q)=>Q&&Q!==".").forEach((Q)=>j_.current?.(Q))}).current,Z0=y(()=>{I0.current=null,z(null),E(null),w(null),f(!1)}).current,w0=y(()=>{Y_((G)=>{let Q=!G;if(typeof window<"u")v_("workspaceShowHidden",String(Q));return b.current=Q,_3(!0,Q).catch(()=>{}),A_.current="",D_.current?.(),Array.from(M_.current||[]).filter((H)=>H&&H!==".").forEach((H)=>j_.current?.(H)),Q})}).current,L2=y((G)=>{if(y0(G)?.closest?.("[data-path]"))return;Z0()}).current,c0=x(async(G)=>{if(!G)return;let Q=G.split("/").pop()||G;if(!window.confirm(`Delete "${Q}"? This cannot be undone.`))return;try{await H4(G);let H=G.includes("/")?G.split("/").slice(0,-1).join("/")||".":".";if(K0.current===G)Z0();j_.current?.(H),i(null)}catch(H){E((v)=>({...v||{},error:H.message||"Failed to delete file"}))}},[Z0]),B2=x((G)=>{let Q=i_.current;if(!Q||!G||typeof CSS>"u"||typeof CSS.escape!=="function")return;Q.querySelector(`[data-path="${CSS.escape(G)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),s0=x((G)=>{let Q=d;if(!Q||Q.length===0)return;let F=O?Q.findIndex((H)=>H.node.path===O):-1;if(G.key==="ArrowDown"){G.preventDefault();let H=Math.min(F+1,Q.length-1),v=Q[H];if(!v)return;if(z(v.node.path),v.node.type!=="dir")R_.current?.(v.node.path,v.node),C_.current?.(v.node.path);else E(null),f(!1),w(null);B2(v.node.path);return}if(G.key==="ArrowUp"){G.preventDefault();let H=F<=0?0:F-1,v=Q[H];if(!v)return;if(z(v.node.path),v.node.type!=="dir")R_.current?.(v.node.path,v.node),C_.current?.(v.node.path);else E(null),f(!1),w(null);B2(v.node.path);return}if(G.key==="ArrowRight"&&F>=0){let H=Q[F];if(H?.node?.type==="dir"&&!j.has(H.node.path))G.preventDefault(),j_.current?.(H.node.path),Y((v)=>new Set([...v,H.node.path]));return}if(G.key==="ArrowLeft"&&F>=0){let H=Q[F];if(H?.node?.type==="dir"&&j.has(H.node.path))G.preventDefault(),Y((v)=>{let n=new Set(v);return n.delete(H.node.path),n});return}if(G.key==="Enter"&&F>=0){G.preventDefault();let H=Q[F];if(!H)return;let v=H.node.path;if(H.node.type==="dir"){if(!M_.current.has(v))j_.current?.(v);Y((l)=>{let o=new Set(l);if(o.has(v))o.delete(v);else o.add(v);return o}),E(null),w(null),f(!1)}else R_.current?.(v,H.node),C_.current?.(v);return}if((G.key==="Delete"||G.key==="Backspace")&&F>=0){let H=Q[F];if(!H||H.node.type==="dir")return;G.preventDefault(),c0(H.node.path);return}if(G.key==="Escape")G.preventDefault(),Z0()},[Z0,c0,j,d,B2,O]),T_=x((G)=>{let Q=y0(G),F=Q?.closest?.(".workspace-row");if(!F)return;let H=F.dataset.type,v=F.dataset.path;if(!v||v===".")return;if(O0.current===v)return;let n=G?.touches?.[0];if(!n)return;if(Y0.current={path:d0(Q)?v:null,dragging:!1,startX:n.clientX,startY:n.clientY},H!=="file")return;if(F_.current)clearTimeout(F_.current);F_.current=setTimeout(()=>{if(F_.current=null,Y0.current?.dragging)return;c0(v)},600)},[c0]),j0=x(()=>{if(F_.current)clearTimeout(F_.current),F_.current=null;let G=Y0.current;if(G?.dragging&&G.path){let Q=f_.current||e_(),F=J0.current;if(typeof F==="function")F(G.path,Q)}Y0.current={path:null,dragging:!1,startX:0,startY:0},q_.current=0,G_(!1),r(null),u_(null),_0(),p0()},[e_,p0,u_,_0]),q2=x((G)=>{let Q=Y0.current,F=G?.touches?.[0];if(!F||!Q?.path){if(F_.current)clearTimeout(F_.current),F_.current=null;return}let H=Math.abs(F.clientX-Q.startX),v=Math.abs(F.clientY-Q.startY),n=H>8||v>8;if(n&&F_.current)clearTimeout(F_.current),F_.current=null;if(!Q.dragging&&n)Q.dragging=!0,G_(!0),r("move"),b0(Q.path);if(Q.dragging){G.preventDefault(),X0(F.clientX,F.clientY);let l=document.elementFromPoint(F.clientX,F.clientY),o=H0(l)||e_();if(f_.current!==o)u_(o);F0(o)}},[H0,e_,b0,X0,u_,F0]),Q2=y((G)=>{G.preventDefault();let Q=I_.current;if(!Q)return;let F=G.clientY,H=o_.current||280,v=G.currentTarget;v.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let n=F,l=(g)=>{n=g.clientY;let z_=Q.clientHeight-80,G0=Math.min(Math.max(H-(g.clientY-F),80),z_);Q.style.setProperty("--preview-height",`${G0}px`),o_.current=G0},o=()=>{let g=Q.clientHeight-80,z_=Math.min(Math.max(H-(n-F),80),g);o_.current=z_,v.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",v_("previewHeight",String(Math.round(z_))),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",o)};document.addEventListener("mousemove",l),document.addEventListener("mouseup",o)}).current,M0=y((G)=>{G.preventDefault();let Q=I_.current;if(!Q)return;let F=G.touches[0];if(!F)return;let H=F.clientY,v=o_.current||280,n=G.currentTarget;n.classList.add("dragging"),document.body.style.userSelect="none";let l=(g)=>{let z_=g.touches[0];if(!z_)return;g.preventDefault();let G0=Q.clientHeight-80,a0=Math.min(Math.max(v-(z_.clientY-H),80),G0);Q.style.setProperty("--preview-height",`${a0}px`),o_.current=a0},o=()=>{n.classList.remove("dragging"),document.body.style.userSelect="",v_("previewHeight",String(Math.round(o_.current||v))),document.removeEventListener("touchmove",l),document.removeEventListener("touchend",o),document.removeEventListener("touchcancel",o)};document.addEventListener("touchmove",l,{passive:!1}),document.addEventListener("touchend",o),document.addEventListener("touchcancel",o)}).current,P0=async()=>{if(!O)return;try{let G=await W4(O);if(G.media_id)w(G.media_id)}catch(G){E((Q)=>({...Q||{},error:G.message||"Failed to attach"}))}},m2=async()=>{if(!O||V_)return;await c0(O)},U2=(G)=>{return Array.from(G?.dataTransfer?.types||[]).includes("Files")},A2=x((G)=>{if(!U2(G))return;if(G.preventDefault(),q_.current+=1,!v0.current)G_(!0);r("upload");let Q=h0(G)||e_();u_(Q),F0(Q)},[e_,h0,u_,F0]),w2=x((G)=>{if(!U2(G))return;if(G.preventDefault(),G.dataTransfer)G.dataTransfer.dropEffect="copy";if(!v0.current)G_(!0);if(m0.current!=="upload")r("upload");let Q=h0(G)||e_();if(f_.current!==Q)u_(Q);F0(Q)},[e_,h0,u_,F0]),V3=x((G)=>{if(!U2(G))return;if(G.preventDefault(),q_.current=Math.max(0,q_.current-1),q_.current===0)G_(!1),r(null),u_(null),_0()},[u_,_0]),n0=x(async(G,Q=".")=>{let F=Array.from(G||[]);if(F.length===0)return;let H=Q&&Q!==""?Q:".",v=H!=="."?H:"workspace root";N_(!0);try{let n=null;for(let l of F)try{n=await R3(l,H)}catch(o){let g=o?.status,z_=o?.code;if(g===409||z_==="file_exists"){let G0=l?.name||"file";if(!window.confirm(`"${G0}" already exists in ${v}. Overwrite?`))continue;n=await R3(l,H,{overwrite:!0})}else throw o}if(n?.path)I0.current=n.path,z(n.path),C_.current?.(n.path);j_.current?.(H)}catch(n){i(n.message||"Failed to upload file")}finally{N_(!1)}},[]),W3=x(async(G,Q)=>{if(!G)return;let F=Q_.current?.get(G);if(!F)return;let H=Q&&Q!==""?Q:".",v=G.includes("/")?G.split("/").slice(0,-1).join("/")||".":".";if(H===v)return;try{let l=(await U4(G,H))?.path||G;if(F.type==="dir")Y((o)=>{let g=new Set;for(let z_ of o)if(z_===G)g.add(l);else if(z_.startsWith(`${G}/`))g.add(`${l}${z_.slice(G.length)}`);else g.add(z_);return g});if(z(l),F.type==="dir")E(null),f(!1),w(null);else C_.current?.(l);j_.current?.(v),j_.current?.(H)}catch(n){i(n?.message||"Failed to move entry")}},[]);J0.current=W3;let X3=x(async(G)=>{if(!U2(G))return;G.preventDefault(),q_.current=0,G_(!1),r(null),K_(null),_0();let Q=Array.from(G?.dataTransfer?.files||[]);if(Q.length===0)return;let F=f_.current||h0(G)||e_();await n0(Q,F)},[e_,h0,n0]),R2=x((G)=>{if(G?.stopPropagation?.(),L_)return;let Q=G?.currentTarget?.dataset?.uploadTarget||".";N0.current=Q,t_.current?.click()},[L_]),g2=x(()=>{if(L_)return;let G=K0.current,Q=G?Q_.current?.get(G):null;N0.current=Q?.type==="dir"?Q.path:".",t_.current?.click()},[L_]),z0=x((G)=>{if(!G||G.button!==0)return;let Q=G.currentTarget;if(!Q||!Q.dataset)return;let F=Q.dataset.path;if(!F||F===".")return;if(O0.current===F)return;let H=y0(G);if(H?.closest?.("button, a, input, .workspace-caret"))return;if(!d0(H))return;G.preventDefault(),C0.current={path:F,dragging:!1,startX:G.clientX,startY:G.clientY};let v=(l)=>{let o=C0.current;if(!o?.path)return;let g=Math.abs(l.clientX-o.startX),z_=Math.abs(l.clientY-o.startY),G0=g>4||z_>4;if(!o.dragging&&G0)o.dragging=!0,q0.current=!0,G_(!0),r("move"),b0(o.path),X0(l.clientX,l.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(o.dragging){l.preventDefault(),X0(l.clientX,l.clientY);let a0=document.elementFromPoint(l.clientX,l.clientY),l0=H0(a0)||e_();if(f_.current!==l0)u_(l0);F0(l0)}},n=()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",n);let l=C0.current;if(l?.dragging&&l.path){let o=f_.current||e_(),g=J0.current;if(typeof g==="function")g(l.path,o)}C0.current={path:null,dragging:!1,startX:0,startY:0},q_.current=0,G_(!1),r(null),u_(null),_0(),p0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{q0.current=!1},0)};document.addEventListener("mousemove",v),document.addEventListener("mouseup",n)},[H0,e_,b0,X0,p0,u_,F0,_0]),Q3=x(async(G)=>{let Q=Array.from(G?.target?.files||[]);if(Q.length===0)return;let F=N0.current||".";if(await n0(Q,F),N0.current=".",G?.target)G.target.value=""},[n0]);return W`
        <aside
            class=${`workspace-sidebar${s?" workspace-drop-active":""}`}
            data-workspace-scale=${l_}
            ref=${I_}
            onDragEnter=${A2}
            onDragOver=${w2}
            onDragLeave=${V3}
            onDrop=${X3}
        >
            <input type="file" multiple style="display:none" ref=${t_} onChange=${Q3} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${i0} title="New file" disabled=${L_}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${D0} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${Z_?" active":""}`}
                        onClick=${w0}
                        title=${Z_?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!Z_&&W`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${L2}>
                ${L_&&W`<div class="workspace-drop-hint">Uploading…</div>`}
                ${X&&W`<div class="workspace-loading">Loading…</div>`}
                ${p&&W`<div class="workspace-error">${p}</div>`}
                ${K&&W`
                    <div
                        class="workspace-tree-list"
                        ref=${i_}
                        tabIndex="0"
                        onClick=${X2}
                        onDblClick=${G2}
                        onKeyDown=${s0}
                        onTouchStart=${T_}
                        onTouchEnd=${j0}
                        onTouchMove=${q2}
                        onTouchCancel=${j0}
                    >
                        ${d.map(({node:G,depth:Q})=>{let F=G.type==="dir",H=G.path===O,v=G.path===V,n=F&&j.has(G.path),l=a&&G.path===a,o=Array.isArray(G.children)&&G.children.length>0?G.children.length:Number(G.child_count)||0;return W`
                                <div
                                    key=${G.path}
                                    class=${`workspace-row${H?" selected":""}${l?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+Q*b_.indentPx}px`}}
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
                                                ref=${a_}
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
                                            disabled=${L_}
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
                <div class="workspace-preview-splitter-h" onMouseDown=${Q2} onTouchStart=${M0}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${O}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${i0} title="New file" disabled=${L_}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!V_&&W`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>$0&&S_.current?.(O,A)}
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
                            ${V_?W`
                                    <button class="workspace-download" onClick=${g2}
                                        title="Upload files to this folder" disabled=${L_}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${F4(O,Z_)}
                                        title="Download folder as zip" onClick=${(G)=>G.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:W`<button class="workspace-download" onClick=${P0} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${M&&W`<div class="workspace-loading">Loading preview…</div>`}
                    ${A?.error&&W`<div class="workspace-error">${A.error}</div>`}
                    ${V_&&W`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${B_?.loading&&W`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${B_?.error&&W`<div class="workspace-error">${B_.error}</div>`}
                        ${B_?.payload&&B_.payload.segments?.length>0&&W`
                            <${i5} payload=${B_.payload} />
                        `}
                        ${B_?.payload&&(!B_.payload.segments||B_.payload.segments.length===0)&&W`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${A&&!A.error&&!V_&&W`
                        <div class="workspace-preview-body" ref=${f0}></div>
                    `}
                    ${m&&W`
                        <div class="workspace-download-card">
                            <${n5} mediaId=${m} />
                        </div>
                    `}
                </div>
            `}
            ${__&&W`
                <div class="workspace-drag-ghost" ref=${T0}>${__.label}</div>
            `}
        </aside>
    `}function E8({tabs:_,activeId:$,onActivate:Z,onClose:N,onCloseOthers:K,onCloseAll:J,onTogglePin:j,onTogglePreview:Y,previewTabs:O,onToggleDock:z,dockVisible:V}){let[B,C]=u(null),D=y(null);R(()=>{if(!B)return;let X=(P)=>{if(P.type==="keydown"&&P.key!=="Escape")return;C(null)};return document.addEventListener("click",X),document.addEventListener("keydown",X),()=>{document.removeEventListener("click",X),document.removeEventListener("keydown",X)}},[B]),R(()=>{let X=(P)=>{if(P.ctrlKey&&P.key==="Tab"){if(P.preventDefault(),!_.length)return;let M=_.findIndex((f)=>f.id===$);if(P.shiftKey){let f=_[(M-1+_.length)%_.length];Z?.(f.id)}else{let f=_[(M+1)%_.length];Z?.(f.id)}return}if((P.ctrlKey||P.metaKey)&&P.key==="w"){let M=document.querySelector(".editor-pane");if(M&&M.contains(document.activeElement)){if(P.preventDefault(),$)N?.($)}}};return document.addEventListener("keydown",X),()=>document.removeEventListener("keydown",X)},[_,$,Z,N]);let A=x((X,P)=>{if(X.button===1){X.preventDefault(),N?.(P);return}if(X.button===0)Z?.(P)},[Z,N]),E=x((X,P)=>{X.preventDefault(),C({id:P,x:X.clientX,y:X.clientY})},[]),m=x((X)=>{X.preventDefault(),X.stopPropagation()},[]),w=x((X,P)=>{X.preventDefault(),X.stopPropagation(),N?.(P)},[N]);if(R(()=>{if(!$||!D.current)return;let X=D.current.querySelector(".tab-item.active");if(X)X.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return W`
        <div class="tab-strip" ref=${D} role="tablist">
            ${_.map((X)=>W`
                <div
                    key=${X.id}
                    class=${`tab-item${X.id===$?" active":""}${X.dirty?" dirty":""}${X.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${X.id===$}
                    title=${X.path}
                    onMouseDown=${(P)=>A(P,X.id)}
                    onContextMenu=${(P)=>E(P,X.id)}
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
                        onClick=${(P)=>w(P,X.id)}
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
            ${z&&W`
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
        ${B&&W`
            <div class="tab-context-menu" style=${{left:B.x+"px",top:B.y+"px"}}>
                <button onClick=${()=>{N?.(B.id),C(null)}}>Close</button>
                <button onClick=${()=>{K?.(B.id),C(null)}}>Close Others</button>
                <button onClick=${()=>{J?.(),C(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{j?.(B.id),C(null)}}>
                    ${_.find((X)=>X.id===B.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${Y&&/\.(md|mdx|markdown)$/i.test(B.id)&&W`
                    <hr />
                    <button onClick=${()=>{Y(B.id),C(null)}}>
                        ${O?.has(B.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var l5=400,q1=60,b8=220,V1="mdPreviewHeight";function o5(){try{let _=localStorage.getItem(V1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=q1?$:b8}catch{return b8}}function A8({getContent:_,path:$,onClose:Z}){let[N,K]=u(""),[J,j]=u(o5),Y=y(null),O=y(null),z=y(""),V=y(_);return V.current=_,R(()=>{let D=()=>{let E=V.current?.()||"";if(E===z.current)return;z.current=E;try{let m=z2(E,null,{sanitize:!1});K(m)}catch{K('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};D();let A=setInterval(D,l5);return()=>clearInterval(A)},[]),R(()=>{if(Y.current&&N)k2(Y.current).catch(()=>{})},[N]),W`
        <div
            class="md-preview-splitter"
            onMouseDown=${(D)=>{D.preventDefault();let A=D.clientY,E=O.current?.offsetHeight||J,m=O.current?.parentElement,w=m?m.offsetHeight*0.7:500,X=D.currentTarget;X.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let P=(f)=>{let p=Math.min(Math.max(E-(f.clientY-A),q1),w);j(p)},M=()=>{X.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(V1,String(Math.round(O.current?.offsetHeight||J)))}catch{}document.removeEventListener("mousemove",P),document.removeEventListener("mouseup",M)};document.addEventListener("mousemove",P),document.addEventListener("mouseup",M)}}
            onTouchStart=${(D)=>{D.preventDefault();let A=D.touches[0];if(!A)return;let E=A.clientY,m=O.current?.offsetHeight||J,w=O.current?.parentElement,X=w?w.offsetHeight*0.7:500,P=D.currentTarget;P.classList.add("dragging"),document.body.style.userSelect="none";let M=(p)=>{let i=p.touches[0];if(!i)return;p.preventDefault();let Z_=Math.min(Math.max(m-(i.clientY-E),q1),X);j(Z_)},f=()=>{P.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(V1,String(Math.round(O.current?.offsetHeight||J)))}catch{}document.removeEventListener("touchmove",M),document.removeEventListener("touchend",f),document.removeEventListener("touchcancel",f)};document.addEventListener("touchmove",M,{passive:!1}),document.addEventListener("touchend",f),document.addEventListener("touchcancel",f)}}
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
    `}function w8({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:Z}){let N=y(_);N.current=_;let K=y($);K.current=$;let J=y(Z);J.current=Z,R(()=>{J.current();let j=new h3((O,z)=>N.current(O,z),(O)=>K.current(O));j.connect();let Y=()=>{j.reconnectIfNeeded()};return window.addEventListener("focus",Y),document.addEventListener("visibilitychange",Y),()=>{window.removeEventListener("focus",Y),document.removeEventListener("visibilitychange",Y),j.disconnect()}},[])}function M8(){let[_,$]=u(!1),[Z,N]=u("default"),K=y(!1);R(()=>{let O=y2("notificationsEnabled",!1);if(K.current=O,$(O),typeof Notification<"u")N(Notification.permission)},[]),R(()=>{K.current=_},[_]);let J=x(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let O=Notification.requestPermission();if(O&&typeof O.then==="function")return O;return Promise.resolve(O)}catch{return Promise.resolve("default")}},[]),j=x(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){N("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let z=await J();if(N(z||"default"),z!=="granted"){K.current=!1,$(!1),v_("notificationsEnabled","false");return}}let O=!K.current;K.current=O,$(O),v_("notificationsEnabled",String(O))},[J]),Y=x((O,z)=>{if(!K.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let V=new Notification(O,{body:z});return V.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:Z,toggleNotifications:j,notify:Y}}var c2=(_)=>{let $=new Set;return(_||[]).filter((Z)=>{if(!Z||$.has(Z.id))return!1;return $.add(Z.id),!0})};function P8({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[Z,N]=u(null),[K,J]=u(!1),j=y(!1),Y=y(null),O=y(!1),z=y(null),V=y(null);R(()=>{j.current=K},[K]),R(()=>{V.current=Z},[Z]);let B=x(async(A=null)=>{try{if(A){let E=await _4(A);N(E.posts),J(!1)}else{let E=await t2(10);N(E.posts),J(E.has_more)}}catch(E){console.error("Failed to load posts:",E)}},[]),C=x(async()=>{try{let A=await t2(10);N((E)=>{if(!E||E.length===0)return A.posts;return c2([...A.posts,...E])}),J((E)=>E||A.has_more)}catch(A){console.error("Failed to refresh timeline:",A)}},[]),D=x(async(A={})=>{let E=V.current;if(!E||E.length===0)return;if(O.current)return;let{preserveScroll:m=!0,preserveMode:w="top",allowRepeat:X=!1}=A,P=(p)=>{if(!m){p();return}if(w==="top")$(p);else _(p)},f=E.slice().sort((p,i)=>p.id-i.id)[0]?.id;if(!Number.isFinite(f))return;if(!X&&z.current===f)return;O.current=!0,z.current=f;try{let p=await t2(10,f);if(p.posts.length>0)P(()=>{N((i)=>c2([...p.posts,...i||[]])),J(p.has_more)});else J(!1)}catch(p){console.error("Failed to load more posts:",p)}finally{O.current=!1}},[_,$]);return R(()=>{Y.current=D},[D]),{posts:Z,setPosts:N,hasMore:K,setHasMore:J,hasMoreRef:j,loadPosts:B,refreshTimeline:C,loadMore:D,loadMoreRef:Y,loadingMoreRef:O,lastBeforeIdRef:z}}function S8(){let[_,$]=u(null),[Z,N]=u({text:"",totalLines:0}),[K,J]=u(""),[j,Y]=u({text:"",totalLines:0}),[O,z]=u(null),[V,B]=u(null),[C,D]=u(null),A=y(null),E=y(0),m=y(!1),w=y(""),X=y(""),P=y(null),M=y(null),f=y(null),p=y(null),i=y(!1),Z_=y(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:Z,setAgentDraft:N,agentPlan:K,setAgentPlan:J,agentThought:j,setAgentThought:Y,pendingRequest:O,setPendingRequest:z,currentTurnId:V,setCurrentTurnId:B,steerQueuedTurnId:C,setSteerQueuedTurnId:D,lastAgentEventRef:A,lastSilenceNoticeRef:E,isAgentRunningRef:m,draftBufferRef:w,thoughtBufferRef:X,pendingRequestRef:P,stalledPostIdRef:M,currentTurnIdRef:f,steerQueuedTurnIdRef:p,thoughtExpandedRef:i,draftExpandedRef:Z_}}function x8({appShellRef:_,sidebarWidthRef:$,editorWidthRef:Z,dockHeightRef:N}){let K=y((V)=>{V.preventDefault();let B=_.current;if(!B)return;let C=V.clientX,D=$.current||280,A=V.currentTarget;A.classList.add("dragging"),B.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let E=C,m=(X)=>{E=X.clientX;let P=Math.min(Math.max(D+(X.clientX-C),160),600);B.style.setProperty("--sidebar-width",`${P}px`),$.current=P},w=()=>{let X=Math.min(Math.max(D+(E-C),160),600);$.current=X,A.classList.remove("dragging"),B.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",v_("sidebarWidth",String(Math.round(X))),document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",w)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",w)}).current,J=y((V)=>{V.preventDefault();let B=_.current;if(!B)return;let C=V.touches[0];if(!C)return;let D=C.clientX,A=$.current||280,E=V.currentTarget;E.classList.add("dragging"),B.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let m=(X)=>{let P=X.touches[0];if(!P)return;X.preventDefault();let M=Math.min(Math.max(A+(P.clientX-D),160),600);B.style.setProperty("--sidebar-width",`${M}px`),$.current=M},w=()=>{E.classList.remove("dragging"),B.classList.remove("sidebar-resizing"),document.body.style.userSelect="",v_("sidebarWidth",String(Math.round($.current||A))),document.removeEventListener("touchmove",m),document.removeEventListener("touchend",w),document.removeEventListener("touchcancel",w)};document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("touchend",w),document.addEventListener("touchcancel",w)}).current,j=y((V)=>{V.preventDefault();let B=_.current;if(!B)return;let C=V.clientX,D=Z.current||$.current||280,A=V.currentTarget;A.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let E=C,m=(X)=>{E=X.clientX;let P=Math.min(Math.max(D+(X.clientX-C),200),800);B.style.setProperty("--editor-width",`${P}px`),Z.current=P},w=()=>{let X=Math.min(Math.max(D+(E-C),200),800);Z.current=X,A.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",v_("editorWidth",String(Math.round(X))),document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",w)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",w)}).current,Y=y((V)=>{V.preventDefault();let B=_.current;if(!B)return;let C=V.touches[0];if(!C)return;let D=C.clientX,A=Z.current||$.current||280,E=V.currentTarget;E.classList.add("dragging"),document.body.style.userSelect="none";let m=(X)=>{let P=X.touches[0];if(!P)return;X.preventDefault();let M=Math.min(Math.max(A+(P.clientX-D),200),800);B.style.setProperty("--editor-width",`${M}px`),Z.current=M},w=()=>{E.classList.remove("dragging"),document.body.style.userSelect="",v_("editorWidth",String(Math.round(Z.current||A))),document.removeEventListener("touchmove",m),document.removeEventListener("touchend",w),document.removeEventListener("touchcancel",w)};document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("touchend",w),document.addEventListener("touchcancel",w)}).current,O=y((V)=>{V.preventDefault();let B=_.current;if(!B)return;let C=V.clientY,D=N?.current||200,A=V.currentTarget;A.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let E=C,m=(X)=>{E=X.clientY;let P=Math.min(Math.max(D-(X.clientY-C),100),window.innerHeight*0.5);if(B.style.setProperty("--dock-height",`${P}px`),N)N.current=P;window.dispatchEvent(new CustomEvent("dock-resize"))},w=()=>{let X=Math.min(Math.max(D-(E-C),100),window.innerHeight*0.5);if(N)N.current=X;A.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",v_("dockHeight",String(Math.round(X))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",w)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",w)}).current,z=y((V)=>{V.preventDefault();let B=_.current;if(!B)return;let C=V.touches[0];if(!C)return;let D=C.clientY,A=N?.current||200,E=V.currentTarget;E.classList.add("dragging"),document.body.style.userSelect="none";let m=(X)=>{let P=X.touches[0];if(!P)return;X.preventDefault();let M=Math.min(Math.max(A-(P.clientY-D),100),window.innerHeight*0.5);if(B.style.setProperty("--dock-height",`${M}px`),N)N.current=M;window.dispatchEvent(new CustomEvent("dock-resize"))},w=()=>{E.classList.remove("dragging"),document.body.style.userSelect="",v_("dockHeight",String(Math.round(N?.current||A))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",m),document.removeEventListener("touchend",w),document.removeEventListener("touchcancel",w)};document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("touchend",w),document.addEventListener("touchcancel",w)}).current;return{handleSplitterMouseDown:K,handleSplitterTouchStart:J,handleEditorSplitterMouseDown:j,handleEditorSplitterTouchStart:Y,handleDockSplitterMouseDown:O,handleDockSplitterTouchStart:z}}function f8({onTabClosed:_}={}){let $=y(_);$.current=_;let[Z,N]=u(()=>w_.getTabs()),[K,J]=u(()=>w_.getActiveId()),[j,Y]=u(()=>w_.getTabs().length>0);R(()=>{return w_.onChange((M,f)=>{N(M),J(f),Y(M.length>0)})},[]);let[O,z]=u(()=>new Set),V=x((M)=>{z((f)=>{let p=new Set(f);if(p.has(M))p.delete(M);else p.add(M);return p})},[]),B=x((M)=>{z((f)=>{if(!f.has(M))return f;let p=new Set(f);return p.delete(M),p})},[]),C=x((M)=>{if(!M)return;let f={path:M,mode:"edit"};try{if(!n_.resolve(f)){if(!n_.get("editor")){console.warn(`[openEditor] No pane handler for: ${M}`);return}}}catch(p){console.warn(`[openEditor] paneRegistry.resolve() error for "${M}":`,p)}w_.open(M)},[]),D=x(()=>{let M=w_.getActiveId();if(M){let f=w_.get(M);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}w_.close(M),B(M),$.current?.(M)}},[B]),A=x((M)=>{let f=w_.get(M);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}w_.close(M),B(M),$.current?.(M)},[B]),E=x((M)=>{w_.activate(M)},[]),m=x((M)=>{let f=w_.getTabs().filter((Z_)=>Z_.id!==M&&!Z_.pinned),p=f.filter((Z_)=>Z_.dirty).length;if(p>0){if(!window.confirm(`${p} unsaved tab${p>1?"s":""} will be closed. Continue?`))return}let i=f.map((Z_)=>Z_.id);w_.closeOthers(M),i.forEach((Z_)=>{B(Z_),$.current?.(Z_)})},[B]),w=x(()=>{let M=w_.getTabs().filter((i)=>!i.pinned),f=M.filter((i)=>i.dirty).length;if(f>0){if(!window.confirm(`${f} unsaved tab${f>1?"s":""} will be closed. Continue?`))return}let p=M.map((i)=>i.id);w_.closeAll(),p.forEach((i)=>{B(i),$.current?.(i)})},[B]),X=x((M)=>{w_.togglePin(M)},[]),P=x(()=>{let M=w_.getActiveId();if(M)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:M}}))},[]);return R(()=>{let M=(f)=>{let{oldPath:p,newPath:i,type:Z_}=f.detail||{};if(!p||!i)return;if(Z_==="dir"){for(let Y_ of w_.getTabs())if(Y_.path===p||Y_.path.startsWith(`${p}/`)){let s=`${i}${Y_.path.slice(p.length)}`;w_.rename(Y_.id,s)}}else w_.rename(p,i)};return window.addEventListener("workspace-file-renamed",M),()=>window.removeEventListener("workspace-file-renamed",M)},[]),R(()=>{let M=(f)=>{if(w_.hasUnsaved())f.preventDefault(),f.returnValue=""};return window.addEventListener("beforeunload",M),()=>window.removeEventListener("beforeunload",M)},[]),{editorOpen:j,tabStripTabs:Z,tabStripActiveId:K,previewTabs:O,openEditor:C,closeEditor:D,handleTabClose:A,handleTabActivate:E,handleTabCloseOthers:m,handleTabCloseAll:w,handleTabTogglePin:X,handleTabTogglePreview:V,revealInExplorer:P}}function W1(_,$){try{if(typeof window>"u")return $;let Z=window.__PICLAW_SILENCE||{},N=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,K=Z[_]??window[N],J=Number(K);return Number.isFinite(J)?J:$}catch{return $}}var X1=W1("warning",30000),T8=W1("finalize",120000),Q1=W1("refresh",30000),I8=30000;function u8(_){let $={};return(_?.agents||[]).forEach((Z)=>{$[Z.id]=Z}),$}function c8(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function v8(_=30000){let[,$]=u(0);R(()=>{let Z=setInterval(()=>$((N)=>N+1),_);return()=>clearInterval(Z)},[_])}function U1(_,$=160){let Z=String(_||"").replace(/\r\n/g,`
`);if(!Z)return 0;return Z.split(`
`).reduce((N,K)=>N+Math.max(1,Math.ceil(K.length/$)),0)}function m8(_,$){if(typeof _!=="string")return{kind:"ignore"};let Z=_.trim();if(!Z)return{kind:"toast",title:"No file selected",detail:"Use a valid file path from a file pill.",level:"warning"};if(!$.editorOpen)return{kind:"toast",title:"Editor pane is not open",detail:"Open the editor pane to open files from pills.",level:"warning"};if(/^[a-z][a-z0-9+.-]*:/i.test(Z))return{kind:"toast",title:"Cannot open external path from file pill",detail:"Use an in-workspace file path.",level:"warning"};try{if(!$.resolvePane({path:Z,mode:"edit"}))return{kind:"toast",title:"No editor available",detail:`No editor can open: ${Z}`,level:"warning"}}catch{return{kind:"toast",title:"No editor available",detail:`No editor can open: ${Z}`,level:"warning"}}return{kind:"open",path:Z}}function v2(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var r5=$4,R8=N4,d5=J4,g8=O4,h8=G4,p8=K4,H1=typeof I3==="function"?I3:v2("getAgentContext",null),s5=typeof V2==="function"?V2:v2("getAgentModels",{current:null,models:[]}),a5=typeof u3==="function"?u3:v2("getAgentQueueState",{count:0}),t5=typeof v3==="function"?v3:v2("steerAgentQueueItem",{removed:!1,queued:"steer"}),e5=typeof c3==="function"?c3:v2("removeAgentQueueItem",{removed:!1});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});n_.register(e3);n_.register(K1);n_.register(J1);_1();n_.register(Z1);function _$(){let[_,$]=u("disconnected"),[Z,N]=u(null),[K,J]=u(null),[j,Y]=u(!1),[O,z]=u([]),[V,B]=u([]),[C,D]=u(null),{agentStatus:A,setAgentStatus:E,agentDraft:m,setAgentDraft:w,agentPlan:X,setAgentPlan:P,agentThought:M,setAgentThought:f,pendingRequest:p,setPendingRequest:i,currentTurnId:Z_,setCurrentTurnId:Y_,steerQueuedTurnId:s,setSteerQueuedTurnId:G_,lastAgentEventRef:k_,lastSilenceNoticeRef:r,isAgentRunningRef:__,draftBufferRef:e,thoughtBufferRef:a,pendingRequestRef:K_,stalledPostIdRef:L_,currentTurnIdRef:N_,steerQueuedTurnIdRef:B_,thoughtExpandedRef:W_,draftExpandedRef:H_}=S8(),[x_,l_]=u({}),[L0,M_]=u(null),[A_,J_]=u(null),[E_,X_]=u(!1),[D_,Q_]=u(null),[R_,S_]=u(null),[C_,j_]=u([]),[I_,i_]=u(!1),a_=C_.length,t_=y(new Set),N0=y([]),F_=y(new Set),Y0=y({inFlight:!1,lastAttemptAt:0,turnId:null});t_.current=new Set(C_.map((L)=>L.row_id)),N0.current=C_;let{notificationsEnabled:C0,notificationPermission:B0,toggleNotifications:q0,notify:o_}=M8(),[x0,k0]=u(()=>new Set),[r_,f0]=u(()=>y2("workspaceOpen",!0)),V0=y(null),{editorOpen:b,tabStripTabs:$_,tabStripActiveId:U_,previewTabs:q_,openEditor:f_,closeEditor:v0,handleTabClose:m0,handleTabActivate:T0,handleTabCloseOthers:Z2,handleTabCloseAll:E0,handleTabTogglePin:J0,handleTabTogglePreview:K0,revealInExplorer:O0}=f8({onTabClosed:(L)=>V0.current?.(L)}),I0=y(null),m_=y(null),O2=y(null),R0=y(null),W0=n_.getDockPanes().length>0,[g0,e_]=u(!1),H0=x(()=>e_((L)=>!L),[]),h0=b||W0&&g0;R(()=>{let L=I0.current;if(!L)return;if(m_.current)m_.current.dispose(),m_.current=null;let q=U_;if(!q)return;let k={path:q,mode:"edit"},S=n_.resolve(k)||n_.get("editor");if(!S){L.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let c=S.mount(L,k);m_.current=c,c.onDirtyChange?.((h)=>{w_.setDirty(q,h)}),c.onSaveRequest?.(()=>{}),c.onClose?.(()=>{v0()});let T=w_.getViewState(q);if(T&&typeof c.restoreViewState==="function")requestAnimationFrame(()=>c.restoreViewState(T));if(typeof c.onViewStateChange==="function")c.onViewStateChange((h)=>{w_.saveViewState(q,h)});return requestAnimationFrame(()=>c.focus()),()=>{if(m_.current===c)c.dispose(),m_.current=null}},[U_,v0]),R(()=>{let L=O2.current;if(R0.current)R0.current.dispose(),R0.current=null;if(!L||!W0||!g0)return;let q=n_.getDockPanes()[0];if(!q){L.innerHTML='<div class="terminal-placeholder">No dock pane available.</div>';return}let k=q.mount(L,{mode:"view"});return R0.current=k,requestAnimationFrame(()=>k.focus?.()),()=>{if(R0.current===k)k.dispose(),R0.current=null}},[W0,g0]);let[u_,_0]=u({name:"You",avatar_url:null,avatar_background:null}),F0=y(!1),X0=y(!1),b0=y(null),p0=y(0),N2=y(0),Q0=y({}),b2=y({name:null,avatar_url:null}),U0=y({currentHashtag:null,searchQuery:null}),u0=y(null),i0=y(null),J2=y(0),U=y(0),I=y(0),d=y(null),O_=y(null),b_=y(null),g_=y(0),V_=y({title:null,avatarBase:null}),$0=y(null),A0=x(()=>{if($0.current)clearTimeout($0.current),$0.current=null;D(null)},[]);v8(30000),R(()=>{return M4()},[]),R(()=>{v_("workspaceOpen",String(r_))},[r_]),R(()=>{return()=>{A0()}},[A0]),R(()=>{Q0.current=x_||{}},[x_]),R(()=>{b2.current=u_||{name:"You",avatar_url:null,avatar_background:null}},[u_]);let y0=x((L,q,k=null)=>{if(typeof document>"u")return;let S=(L||"").trim()||"PiClaw";if(V_.current.title!==S){document.title=S;let y_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(y_&&y_.getAttribute("content")!==S)y_.setAttribute("content",S);V_.current.title=S}let c=document.getElementById("dynamic-favicon");if(!c)return;let T=c.getAttribute("data-default")||c.getAttribute("href")||"/favicon.ico",h=q||T,t=q?`${h}|${k||""}`:h;if(V_.current.avatarBase!==t){let y_=q?`${h}${h.includes("?")?"&":"?"}v=${k||Date.now()}`:h;c.setAttribute("href",y_),V_.current.avatarBase=t}},[]),d0=x((L)=>{if(!L)return;z((q)=>q.includes(L)?q:[...q,L])},[]),G2=x((L)=>{z((q)=>q.filter((k)=>k!==L))},[]);V0.current=G2;let X2=x(()=>{z([])},[]),D0=x((L,q=null,k="info",S=3000)=>{A0(),D({title:L,detail:q||null,kind:k||"info"}),$0.current=setTimeout(()=>{D((c)=>c?.title===L?null:c)},S)},[A0]),Z0=x((L)=>{let q=m8(L,{editorOpen:b,resolvePane:(k)=>n_.resolve(k)});if(q.kind==="open"){f_(q.path);return}if(q.kind==="toast")D0(q.title,q.detail,q.level)},[b,f_,D0]),w0=x(()=>{let L=U_;if(L)d0(L)},[U_,d0]),L2=x((L)=>{if(!L)return;B((q)=>q.includes(L)?q:[...q,L])},[]),c0=x(async(L)=>{let q=(S)=>{S.scrollIntoView({behavior:"smooth",block:"center"}),S.classList.add("post-highlight"),setTimeout(()=>S.classList.remove("post-highlight"),2000)},k=document.getElementById("post-"+L);if(k){q(k);return}try{let c=(await Z4(L))?.thread?.[0];if(!c)return;z0((T)=>{if(!T)return[c];if(T.some((h)=>h.id===c.id))return T;return[...T,c]}),requestAnimationFrame(()=>{setTimeout(()=>{let T=document.getElementById("post-"+L);if(T)q(T)},50)})}catch(S){console.error("[scrollToMessage] Failed to fetch message",L,S)}},[]),B2=x((L)=>{B((q)=>q.filter((k)=>k!==L))},[]),s0=x(()=>{B([])},[]),T_=x((L={})=>{let q=Date.now();if(k_.current=q,L.running)__.current=!0,i_((k)=>k?k:!0);if(L.clearSilence)r.current=0},[i_]),j0=x(()=>{if(b_.current)clearTimeout(b_.current),b_.current=null;g_.current=0},[]);R(()=>()=>{j0()},[j0]);let q2=x(()=>{j0(),E((L)=>{if(!L)return L;if(!(L.last_activity||L.lastActivity))return L;let{last_activity:q,lastActivity:k,...S}=L;return S})},[j0]),Q2=x((L)=>{if(!L)return;j0();let q=Date.now();g_.current=q,E({type:L.type||"active",last_activity:!0}),b_.current=setTimeout(()=>{if(g_.current!==q)return;E((k)=>{if(!k||!(k.last_activity||k.lastActivity))return k;return null})},I8)},[j0]),M0=x(()=>{__.current=!1,i_(!1),k_.current=null,r.current=0,e.current="",a.current="",K_.current=null,O_.current=null,N_.current=null,B_.current=null,b0.current=null,Y0.current={inFlight:!1,lastAttemptAt:0,turnId:null},j0(),Y_(null),G_(null),W_.current=!1,H_.current=!1},[j0,Y_,G_,i_]),P0=x((L)=>{if(!L)return;if(N_.current===L)return;N_.current=L,Y0.current={inFlight:!1,lastAttemptAt:0,turnId:L},Y_(L),B_.current=null,G_(null),e.current="",a.current="",w({text:"",totalLines:0}),P(""),f({text:"",totalLines:0}),i(null),K_.current=null,O_.current=null,W_.current=!1,H_.current=!1},[Y_,G_]),m2=x((L)=>{if(typeof document<"u"){let y_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&y_)return}let q=O_.current;if(!q||!q.post)return;if(L&&q.turnId&&q.turnId!==L)return;let k=q.post;if(k.id&&d.current===k.id)return;let S=String(k?.data?.content||"").trim();if(!S)return;d.current=k.id||d.current,O_.current=null;let c=S.replace(/\s+/g," ").slice(0,200),T=Q0.current||{},t=(k?.data?.agent_id?T[k.data.agent_id]:null)?.name||"Pi";o_(t,c)},[o_]),U2=x(async(L,q)=>{if(L!=="thought"&&L!=="draft")return;let k=N_.current;if(L==="thought"){if(W_.current=q,k)try{await h8(k,"thought",q)}catch(S){console.warn("Failed to update thought visibility:",S)}if(!q)return;try{let S=k?await g8(k,"thought"):null;if(S?.text)a.current=S.text;f((c)=>({...c||{text:"",totalLines:0},fullText:a.current||c?.fullText||"",totalLines:Number.isFinite(S?.total_lines)?S.total_lines:c?.totalLines||0}))}catch(S){console.warn("Failed to fetch full thought:",S)}return}if(H_.current=q,k)try{await h8(k,"draft",q)}catch(S){console.warn("Failed to update draft visibility:",S)}if(!q)return;try{let S=k?await g8(k,"draft"):null;if(S?.text)e.current=S.text;w((c)=>({...c||{text:"",totalLines:0},fullText:e.current||c?.fullText||"",totalLines:Number.isFinite(S?.total_lines)?S.total_lines:c?.totalLines||0}))}catch(S){console.warn("Failed to fetch full draft:",S)}},[]),A2=y(null),w2=x(()=>{let L=u0.current;if(!L)return;if(!(Math.abs(L.scrollTop)>150))L.scrollTop=0},[]);A2.current=w2;let V3=x((L)=>{let q=u0.current;if(!q||typeof L!=="function"){L?.();return}let{currentHashtag:k,searchQuery:S}=U0.current||{},c=!(S&&!k),T=c?q.scrollHeight-q.scrollTop:q.scrollTop;L(),requestAnimationFrame(()=>{let h=u0.current;if(!h)return;if(c){let t=Math.max(h.scrollHeight-T,0);h.scrollTop=t}else{let t=Math.max(h.scrollHeight-h.clientHeight,0),y_=Math.min(T,t);h.scrollTop=y_}})},[]),n0=x((L)=>{let q=u0.current;if(!q||typeof L!=="function"){L?.();return}let k=q.scrollTop;L(),requestAnimationFrame(()=>{let S=u0.current;if(!S)return;let c=Math.max(S.scrollHeight-S.clientHeight,0);S.scrollTop=Math.min(k,c)})},[]),W3="Queued as a follow-up (one-at-a-time).",X3="⁣",R2=x((L)=>{if(!L||!Array.isArray(L))return L;let q=t_.current,k=new Set(q),S=L.filter((c)=>{if(k.has(c?.id))return!1;if(c?.data?.is_bot_message){let T=c?.data?.content;if(T===W3||T===X3)return!1}return!0});return S.length===L.length?L:S},[]),{posts:g2,setPosts:z0,hasMore:Q3,setHasMore:G,hasMoreRef:Q,loadPosts:F,refreshTimeline:H,loadMore:v,loadMoreRef:n}=P8({preserveTimelineScroll:V3,preserveTimelineScrollTop:n0}),l=d_(()=>R2(g2),[g2,C_,R2]),o=x(()=>{let L=L_.current;if(!L)return;z0((q)=>q?q.filter((k)=>k.id!==L):q),L_.current=null},[z0]),{handleSplitterMouseDown:g,handleSplitterTouchStart:z_,handleEditorSplitterMouseDown:G0,handleEditorSplitterTouchStart:a0,handleDockSplitterMouseDown:l0,handleDockSplitterTouchStart:i8}=x8({appShellRef:i0,sidebarWidthRef:J2,editorWidthRef:U,dockHeightRef:I}),F1=x(()=>{if(!__.current)return;__.current=!1,r.current=0,k_.current=null,N_.current=null,Y_(null),W_.current=!1,H_.current=!1;let L=(e.current||"").trim();if(e.current="",a.current="",w({text:"",totalLines:0}),P(""),f({text:"",totalLines:0}),i(null),K_.current=null,O_.current=null,!L){E({type:"error",title:"Response stalled - No content received"});return}let k=`${L}${`

⚠️ Response may be incomplete - the model stopped responding`}`,S=Date.now(),c=new Date().toISOString(),T={id:S,timestamp:c,data:{type:"agent_response",content:k,agent_id:"default",is_local_stall:!0}};L_.current=S,z0((h)=>h?c2([...h,T]):[T]),A2.current?.(),E(null)},[Y_]);R(()=>{U0.current={currentHashtag:Z,searchQuery:K}},[Z,K]);let c_=x(()=>{a5().then((L)=>{let q=F_.current,k=Array.isArray(L?.items)?L.items.map((S)=>({...S})).filter((S)=>!q.has(S.row_id)):[];if(k.length){j_((S)=>{if(S.length===k.length&&S.every((c,T)=>c.row_id===k[T].row_id))return S;return k});return}q.clear(),j_((S)=>S.length===0?S:[])}).catch(()=>{j_((L)=>L.length===0?L:[])})},[j_]),U3=x(async()=>{try{let L=await H1();if(L)S_(L)}catch(L){console.warn("Failed to fetch agent context:",L)}},[]),K2=x(async()=>{try{let L=await p8("web:default");if(!L||L.status!=="active"||!L.data){if(X0.current){let{currentHashtag:S,searchQuery:c}=U0.current||{};if(!S&&!c)H()}return X0.current=!1,M0(),b0.current=null,E(null),w({text:"",totalLines:0}),P(""),f({text:"",totalLines:0}),i(null),K_.current=null,L??null}X0.current=!0;let q=L.data;b0.current=q;let k=q.turn_id||q.turnId;if(k)P0(k);if(T_({running:!0,clearSilence:!0}),q2(),E(q),L.thought&&L.thought.text)f((S)=>{if(S&&S.text&&S.text.length>=L.thought.text.length)return S;return a.current=L.thought.text,{text:L.thought.text,totalLines:L.thought.totalLines||0}});if(L.draft&&L.draft.text)w((S)=>{if(S&&S.text&&S.text.length>=L.draft.text.length)return S;return e.current=L.draft.text,{text:L.draft.text,totalLines:L.draft.totalLines||0}});return L}catch(L){return console.warn("Failed to fetch agent status:",L),null}},[M0,q2,T_,H,P0]),H3=x(async()=>{if(!__.current)return null;if(K_.current)return null;let L=N_.current||null,q=Y0.current,k=Date.now();if(q.inFlight)return null;if(q.turnId===L&&k-q.lastAttemptAt<Q1)return null;q.inFlight=!0,q.lastAttemptAt=k,q.turnId=L;try{let{currentHashtag:S,searchQuery:c}=U0.current||{};if(!S&&!c)await H();return await c_(),await K2()}finally{q.inFlight=!1}},[K2,c_,H]);R(()=>{let L=Math.min(1000,Math.max(100,Math.floor(X1/2))),q=setInterval(()=>{if(!__.current)return;if(K_.current)return;let k=k_.current;if(!k)return;let S=Date.now(),c=S-k,T=z3(b0.current);if(c>=T8){if(!T)E({type:"waiting",title:"Re-syncing after a quiet period…"});H3();return}if(c>=X1){if(S-r.current>=Q1){if(!T){let h=Math.floor(c/1000);E({type:"waiting",title:`Waiting for model… No events for ${h}s`})}r.current=S,H3()}}},L);return()=>clearInterval(q)},[H3]);let n8=x((L)=>{if($(L),L!=="connected"){E(null),w({text:"",totalLines:0}),P(""),f({text:"",totalLines:0}),i(null),K_.current=null,M0();return}if(!F0.current){F0.current=!0,K2();return}let{currentHashtag:q,searchQuery:k}=U0.current;if(!q&&!k)H();K2()},[M0,H,K2]),l8=x(async(L)=>{N(L),z0(null),await F(L)},[F]),o8=x(async()=>{N(null),J(null),z0(null),await F()},[F]),r8=x(async(L)=>{if(!L||!L.trim())return;J(L.trim()),N(null),z0(null);try{let q=await r5(L.trim());z0(q.results),G(!1)}catch(q){console.error("Failed to search:",q),z0([])}},[]),d8=x(()=>{Y(!0),J(null),N(null),z0([])},[]),s8=x(()=>{Y(!1),J(null),F()},[F]),$$=x(()=>{},[]),a8=x(async(L)=>{if(!L)return;let q=L.id,k=l?.filter((c)=>c?.data?.thread_id===q&&c?.id!==q).length||0;if(k>0){if(!window.confirm(`Delete this message and its ${k} replies?`))return}let S=(c)=>{if(!c.length)return;k0((h)=>{let t=new Set(h);return c.forEach((y_)=>t.add(y_)),t}),setTimeout(()=>{if(n0(()=>{z0((h)=>h?h.filter((t)=>!c.includes(t.id)):h)}),k0((h)=>{let t=new Set(h);return c.forEach((y_)=>t.delete(y_)),t}),Q.current)n.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let c=await R8(q,k>0);if(c?.ids?.length)S(c.ids)}catch(c){let T=c?.message||"";if(k===0&&T.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let t=await R8(q,!0);if(t?.ids?.length)S(t.ids);return}console.error("Failed to delete post:",c),alert(`Failed to delete message: ${T}`)}},[l,n0]),y1=x(async()=>{try{let L=await d5();l_(u8(L));let q=L?.user||{};_0((S)=>{let c=typeof q.name==="string"&&q.name.trim()?q.name.trim():"You",T=typeof q.avatar_url==="string"?q.avatar_url.trim():null,h=typeof q.avatar_background==="string"&&q.avatar_background.trim()?q.avatar_background.trim():null;if(S.name===c&&S.avatar_url===T&&S.avatar_background===h)return S;return{name:c,avatar_url:T,avatar_background:h}});let k=(L?.agents||[]).find((S)=>S.id==="default");if(k?.model)M_(k.model);y0(k?.name,k?.avatar_url)}catch(L){console.warn("Failed to load agents:",L)}try{let L=await H1();if(L)S_(L)}catch{}},[y0]);R(()=>{y1();let L=D2("sidebarWidth",null),q=Number.isFinite(L)?Math.min(Math.max(L,160),600):280;if(J2.current=q,i0.current)i0.current.style.setProperty("--sidebar-width",`${q}px`)},[y1]);let t8=I_||A!==null,D1=x((L)=>{if(!L||typeof L!=="object")return;let q=L.agent_id;if(!q)return;let{agent_name:k,agent_avatar:S}=L;if(!k&&S===void 0)return;let c=Q0.current?.[q]||{id:q},T=c.name||null,h=c.avatar_url??c.avatarUrl??c.avatar??null,t=!1,y_=!1;if(k&&k!==c.name)T=k,y_=!0;if(S!==void 0){let t0=typeof S==="string"?S.trim():null,k1=typeof h==="string"?h.trim():null,H2=t0||null;if(H2!==(k1||null))h=H2,t=!0}if(!y_&&!t)return;if(l_((t0)=>{let H2={...t0[q]||{id:q}};if(y_)H2.name=T;if(t)H2.avatar_url=h;return{...t0,[q]:H2}}),q==="default")y0(T,h,t?Date.now():null)},[y0]),C1=x((L)=>{if(!L||typeof L!=="object")return;let q=L.user_name??L.userName,k=L.user_avatar??L.userAvatar,S=L.user_avatar_background??L.userAvatarBackground;if(q===void 0&&k===void 0&&S===void 0)return;_0((c)=>{let T=typeof q==="string"&&q.trim()?q.trim():c.name||"You",h=k===void 0?c.avatar_url:typeof k==="string"&&k.trim()?k.trim():null,t=S===void 0?c.avatar_background:typeof S==="string"&&S.trim()?S.trim():null;if(c.name===T&&c.avatar_url===h&&c.avatar_background===t)return c;return{name:T,avatar_url:h,avatar_background:t}})},[]),F3=x((L)=>{if(!L||typeof L!=="object")return;let q=L.model??L.current;if(q!==void 0)M_(q);if(L.thinking_level!==void 0)J_(L.thinking_level??null);if(L.supports_thinking!==void 0)X_(Boolean(L.supports_thinking));if(L.provider_usage!==void 0)Q_(L.provider_usage??null)},[]),M2=x(()=>{s5().then((L)=>{if(L)F3(L)}).catch(()=>{})},[F3]),e8=x((L)=>{let q=L?.row_id;if(q==null)return;F_.current.add(q),j_((k)=>k.filter((S)=>S?.row_id!==q)),t5(q).then(()=>{c_()}).catch((k)=>{console.warn("[queue] Failed to steer queued item:",k),D0("Failed to steer message","The queued message could not be sent as steering.","warning"),F_.current.delete(q),c_()})},[c_,j_,D0]),_6=x((L)=>{let q=L?.row_id;if(q==null)return;F_.current.add(q),j_((k)=>k.filter((S)=>S?.row_id!==q)),e5(q).then(()=>{c_()}).catch((k)=>{console.warn("[queue] Failed to remove queued item:",k),D0("Failed to remove message","The queued message could not be removed.","warning"),F_.current.delete(q),c_()})},[c_,j_,D0]),$6=x((L)=>{if(!L||typeof L!=="object")return;if(L?.queued==="followup"||L?.queued==="steer"){c_();return}let q=L?.command;if(q&&typeof q==="object"&&(q?.queued_followup||q?.queued_steer))c_()},[c_]),y3=x(()=>{M2(),c_()},[M2,c_]);R(()=>{y3();let L=setInterval(()=>{M2(),c_()},60000);return()=>clearInterval(L)},[y3,M2,c_]);let D3=x((L,q)=>{let k=q?.turn_id;if(D1(q),C1(q),L==="ui_theme"){P4(q);return}if(L?.startsWith("agent_")){if(!(L==="agent_draft_delta"||L==="agent_thought_delta"||L==="agent_draft"||L==="agent_thought"))q2()}if(L==="connected"){E(null),w({text:"",totalLines:0}),P(""),f({text:"",totalLines:0}),i(null),K_.current=null,M0(),p8("web:default").then((t)=>{if(!t||t.status!=="active"||!t.data)return;let y_=t.data,t0=y_.turn_id||y_.turnId;if(t0)P0(t0);if(T_({clearSilence:!0}),Q2(y_),t.thought&&t.thought.text)a.current=t.thought.text,f({text:t.thought.text,totalLines:t.thought.totalLines||0});if(t.draft&&t.draft.text)e.current=t.draft.text,w({text:t.draft.text,totalLines:t.draft.totalLines||0})}).catch((t)=>{console.warn("Failed to fetch agent status:",t)});let{currentHashtag:T,searchQuery:h}=U0.current||{};if(!T&&!h)H();y3();return}if(L==="agent_status"){if(q.type==="done"||q.type==="error"){if(k&&N_.current&&k!==N_.current)return;if(q.type==="done"){m2(k||N_.current);let{currentHashtag:T,searchQuery:h}=U0.current||{};if(!T&&!h)H();if(q.context_usage)S_(q.context_usage)}if(X0.current=!1,M0(),F_.current.clear(),c_(),w({text:"",totalLines:0}),P(""),f({text:"",totalLines:0}),i(null),q.type==="error")E({type:"error",title:q.title||"Agent error"}),setTimeout(()=>E(null),8000);else E(null)}else{if(k)P0(k);if(T_({running:!0,clearSilence:!0}),q.type==="thinking")e.current="",a.current="",w({text:"",totalLines:0}),P(""),f({text:"",totalLines:0});b0.current=q,E((T)=>{if(T&&T.type===q.type&&T.title===q.title)return T;return q})}return}if(L==="agent_steer_queued"){if(k&&N_.current&&k!==N_.current)return;let T=k||N_.current;if(!T)return;B_.current=T,G_(T);return}if(L==="agent_followup_queued"){let T=q?.row_id,h=q?.content;if(T!=null&&typeof h==="string"&&h.trim())j_((t)=>{if(t.some((y_)=>y_?.row_id===T))return t;return[...t,{row_id:T,content:h,timestamp:q?.timestamp||null,thread_id:q?.thread_id??null}]});c_();return}if(L==="agent_followup_consumed"){let T=q?.row_id;if(T!=null)j_((h)=>h.filter((t)=>t.row_id!==T));c_(),H();return}if(L==="agent_followup_removed"){let T=q?.row_id;if(T!=null)F_.current.add(T),j_((h)=>h.filter((t)=>t.row_id!==T));c_();return}if(L==="agent_draft_delta"){if(k&&N_.current&&k!==N_.current)return;if(k&&!N_.current)P0(k);if(T_({running:!0,clearSilence:!0}),q?.reset)e.current="";if(q?.delta)e.current+=q.delta;let T=Date.now();if(!p0.current||T-p0.current>=100){p0.current=T;let h=e.current,t=U1(h);if(H_.current)w((y_)=>({text:y_?.text||"",totalLines:t,fullText:h}));else w({text:h,totalLines:t})}return}if(L==="agent_draft"){if(k&&N_.current&&k!==N_.current)return;if(k&&!N_.current)P0(k);T_({running:!0,clearSilence:!0});let T=q.text||"",h=q.mode||(q.kind==="plan"?"replace":"append"),t=Number.isFinite(q.total_lines)?q.total_lines:T?T.replace(/\r\n/g,`
`).split(`
`).length:0;if(q.kind==="plan")if(h==="replace")P(T);else P((y_)=>(y_||"")+T);else if(!H_.current)e.current=T,w({text:T,totalLines:t});return}if(L==="agent_thought_delta"){if(k&&N_.current&&k!==N_.current)return;if(k&&!N_.current)P0(k);if(T_({running:!0,clearSilence:!0}),q?.reset)a.current="";if(typeof q?.delta==="string")a.current+=q.delta;let T=Date.now();if(W_.current&&(!N2.current||T-N2.current>=100)){N2.current=T;let h=a.current;f((t)=>({text:t?.text||"",totalLines:U1(h),fullText:h}))}return}if(L==="agent_thought"){if(k&&N_.current&&k!==N_.current)return;if(k&&!N_.current)P0(k);T_({running:!0,clearSilence:!0});let T=q.text||"",h=Number.isFinite(q.total_lines)?q.total_lines:T?T.replace(/\r\n/g,`
`).split(`
`).length:0;if(!W_.current)a.current=T,f({text:T,totalLines:h});return}if(L==="agent_request"){if(console.log("Agent request:",q),k&&N_.current&&k!==N_.current)return;if(k)P0(k);T_({running:!0,clearSilence:!0}),i(q),K_.current=q;return}if(L==="agent_request_timeout"){if(console.log("Agent request timeout:",q),k&&N_.current&&k!==N_.current)return;i(null),K_.current=null,M0(),E({type:"error",title:"Permission request timed out"});return}if(L==="model_changed"){if(q?.model!==void 0)M_(q.model);if(q?.thinking_level!==void 0)J_(q.thinking_level??null);if(q?.supports_thinking!==void 0)X_(Boolean(q.supports_thinking));H1().then((T)=>{if(T)S_(T)}).catch(()=>{});return}if(L==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:q}));return}let{currentHashtag:S,searchQuery:c}=U0.current;if(L==="agent_response")o(),O_.current={post:q,turnId:N_.current};if(!S&&!c&&(L==="new_post"||L==="agent_response"))z0((T)=>{if(!T)return[q];if(T.some((h)=>h.id===q.id))return T;return[...T,q]}),A2.current?.();if(L==="interaction_updated")z0((T)=>{if(!T)return T;if(!T.some((h)=>h.id===q.id))return T;return T.map((h)=>h.id===q.id?q:h)});if(L==="interaction_deleted"){let T=q?.ids||[];if(T.length){n0(()=>{z0((y_)=>y_?y_.filter((t0)=>!T.includes(t0.id)):y_)});let{currentHashtag:h,searchQuery:t}=U0.current;if(Q.current&&!h&&!t)n.current?.({preserveScroll:!0,preserveMode:"top"})}}},[M0,q2,n,T_,m2,n0,H,o,P0,Q2,D1,C1,M2,c_,j_]);R(()=>{if(typeof window>"u")return;let L=window.__PICLAW_TEST_API||{};return L.emit=D3,L.reset=()=>{o(),M0(),E(null),w({text:"",totalLines:0}),P(""),f({text:"",totalLines:0}),i(null)},L.finalize=()=>F1(),window.__PICLAW_TEST_API=L,()=>{if(window.__PICLAW_TEST_API===L)window.__PICLAW_TEST_API=void 0}},[M0,F1,D3,o]),w8({handleSseEvent:D3,handleConnectionStatusChange:n8,loadPosts:F}),R(()=>{if(!l||l.length===0)return;let L=location.hash;if(!L||!L.startsWith("#msg-"))return;let q=L.slice(5);c0(q),history.replaceState(null,"",location.pathname+location.search)},[l,c0]);let C3=A!==null;R(()=>{if(_!=="connected")return;let q=setInterval(()=>{let{currentHashtag:k,searchQuery:S}=U0.current||{},c=!k&&!S;if(C3){if(c)H();c_(),K2(),U3()}else{if(c)H();K2(),U3()}},C3?15000:60000);return()=>clearInterval(q)},[_,C3,K2,U3,c_,H]);let Z6=x(()=>{f0((L)=>!L)},[]);R(()=>{if(!b)return;if(typeof window>"u")return;let L=i0.current;if(!L)return;if(!U.current){let q=D2("editorWidth",null),k=J2.current||280;U.current=Number.isFinite(q)?q:k}if(L.style.setProperty("--editor-width",`${U.current}px`),!I.current){let q=D2("dockHeight",null);I.current=Number.isFinite(q)?q:200}L.style.setProperty("--dock-height",`${I.current}px`)},[b]),R(()=>{if(!W0)return;let L=(q)=>{if(q.ctrlKey&&q.key==="`")q.preventDefault(),H0()};return document.addEventListener("keydown",L),()=>document.removeEventListener("keydown",L)},[H0,W0]);let N6=Boolean(s&&s===(A?.turn_id||Z_));return W`
        <div class=${`app-shell${r_?"":" workspace-collapsed"}${b?" editor-open":""}`} ref=${i0}>
            <${k8}
                onFileSelect=${d0}
                visible=${r_}
                active=${r_||b}
                onOpenEditor=${f_}
            />
            <button
                class=${`workspace-toggle-tab${r_?" open":" closed"}`}
                onClick=${Z6}
                title=${r_?"Hide workspace":"Show workspace"}
                aria-label=${r_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${g} onTouchStart=${z_}></div>
            ${h0&&W`
                <div class="editor-pane-container">
                    ${b&&W`
                        <${E8}
                            tabs=${$_}
                            activeId=${U_}
                            onActivate=${T0}
                            onClose=${m0}
                            onCloseOthers=${Z2}
                            onCloseAll=${E0}
                            onTogglePin=${J0}
                            onTogglePreview=${K0}
                            previewTabs=${q_}
                            onToggleDock=${W0?H0:void 0}
                            dockVisible=${W0&&g0}
                        />
                    `}
                    ${b&&W`<div class="editor-pane-host" ref=${I0}></div>`}
                    ${b&&U_&&q_.has(U_)&&W`
                        <${A8}
                            getContent=${()=>m_.current?.getContent?.()}
                            path=${U_}
                            onClose=${()=>K0(U_)}
                        />
                    `}
                    ${W0&&g0&&W`<div class="dock-splitter" onMouseDown=${l0} onTouchStart=${i8}></div>`}
                    ${W0&&W`<div class=${`dock-panel${g0?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${H0} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
                                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                    <line x1="4" y1="4" x2="12" y2="12"/>
                                    <line x1="12" y1="4" x2="4" y2="12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="dock-panel-body" ref=${O2}></div>
                    </div>`}
                </div>
                <div class="editor-splitter" onMouseDown=${G0} onTouchStart=${a0}></div>
            `}
            <div class="container">
                ${K&&c8()&&W`<div class="search-results-spacer"></div>`}
                ${(Z||K)&&W`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${o8}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${Z?`#${Z}`:`Search: ${K}`}</span>
                    </div>
                `}
                <${N8}
                    posts=${l}
                    hasMore=${Q3}
                    onLoadMore=${v}
                    timelineRef=${u0}
                    onHashtagClick=${l8}
                    onMessageRef=${L2}
                    onScrollToMessage=${c0}
                    onFileRef=${Z0}
                    onPostClick=${void 0}
                    onDeletePost=${a8}
                    emptyMessage=${Z?`No posts with #${Z}`:K?`No results for "${K}"`:void 0}
                    agents=${x_}
                    user=${u_}
                    reverse=${!(K&&!Z)}
                    removingPostIds=${x0}
                    searchQuery=${K}
                />
                <${n4}
                    status=${A}
                    draft=${m}
                    plan=${X}
                    thought=${M}
                    pendingRequest=${p}
                    intent=${C}
                    turnId=${Z_}
                    steerQueued=${N6}
                    onPanelToggle=${U2}
                />
                <${D4}
                    onPost=${()=>{F(),w2()}}
                    onFocus=${w2}
                    searchMode=${j}
                    onSearch=${r8}
                    onEnterSearch=${d8}
                    onExitSearch=${s8}
                    fileRefs=${O}
                    onRemoveFileRef=${G2}
                    onClearFileRefs=${X2}
                    messageRefs=${V}
                    onRemoveMessageRef=${B2}
                    onClearMessageRefs=${s0}
                    activeEditorPath=${U_}
                    onAttachEditorFile=${w0}
                    onOpenFilePill=${Z0}
                    followupQueueCount=${a_}
                    followupQueueItems=${C_}
                    onInjectQueuedFollowup=${e8}
                    onRemoveQueuedFollowup=${_6}
                    onMessageResponse=${$6}
                    isAgentActive=${t8}
                    activeModel=${L0}
                    modelUsage=${D_}
                    thinkingLevel=${A_}
                    supportsThinking=${E_}
                    contextUsage=${R_}
                    notificationsEnabled=${C0}
                    notificationPermission=${B0}
                    onToggleNotifications=${q0}
                    onModelChange=${M_}
                    onModelStateChange=${F3}
                />
                <${o4} status=${_} />
                <${l4}
                    request=${p}
                    onRespond=${()=>{i(null),K_.current=null}}
                />
            </div>
        </div>
    `}d1(W`<${_$} />`,document.getElementById("app"));

//# debugId=E98C2F7F7D10D18364756E2164756E21
//# sourceMappingURL=app.bundle.js.map

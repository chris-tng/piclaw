var T4=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,J)=>(typeof require<"u"?require:$)[J]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var z2,Z_,m1,$2,g1,A1,f4,N2={},c1=[],v4=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function v0(_,$){for(var J in $)_[J]=$[J];return _}function p1(_){var $=_.parentNode;$&&$.removeChild(_)}function h1(_,$,J){var Y,X,Z,j={};for(Z in $)Z=="key"?Y=$[Z]:Z=="ref"?X=$[Z]:j[Z]=$[Z];if(arguments.length>2&&(j.children=arguments.length>3?z2.call(arguments,2):J),typeof _=="function"&&_.defaultProps!=null)for(Z in _.defaultProps)j[Z]===void 0&&(j[Z]=_.defaultProps[Z]);return W2(_,j,Y,X,null)}function W2(_,$,J,Y,X){var Z={type:_,props:$,key:J,ref:Y,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:X==null?++m1:X};return Z_.vnode!=null&&Z_.vnode(Z),Z}function U2(_){return _.children}function O2(_,$){this.props=_,this.context=$}function n0(_,$){if($==null)return _.__?n0(_.__,_.__.__k.indexOf(_)+1):null;for(var J;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null)return J.__e;return typeof _.type=="function"?n0(_):null}function i1(_){var $,J;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,$=0;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null){_.__e=_.__c.base=J.__e;break}return i1(_)}}function w1(_){(!_.__d&&(_.__d=!0)&&$2.push(_)&&!B2.__r++||A1!==Z_.debounceRendering)&&((A1=Z_.debounceRendering)||g1)(B2)}function B2(){for(var _;B2.__r=$2.length;)_=$2.sort(function($,J){return $.__v.__b-J.__v.__b}),$2=[],_.some(function($){var J,Y,X,Z,j,G;$.__d&&(j=(Z=(J=$).__v).__e,(G=J.__P)&&(Y=[],(X=v0({},Z)).__v=Z.__v+1,a2(G,Z,X,J.__n,G.ownerSVGElement!==void 0,Z.__h!=null?[j]:null,Y,j==null?n0(Z):j,Z.__h),d1(Y,Z),Z.__e!=j&&i1(Z)))})}function l1(_,$,J,Y,X,Z,j,G,V,W){var Q,D,H,L,F,M,b,z=Y&&Y.__k||c1,k=z.length;for(J.__k=[],Q=0;Q<$.length;Q++)if((L=J.__k[Q]=(L=$[Q])==null||typeof L=="boolean"?null:typeof L=="string"||typeof L=="number"||typeof L=="bigint"?W2(null,L,null,null,L):Array.isArray(L)?W2(U2,{children:L},null,null,null):L.__b>0?W2(L.type,L.props,L.key,null,L.__v):L)!=null){if(L.__=J,L.__b=J.__b+1,(H=z[Q])===null||H&&L.key==H.key&&L.type===H.type)z[Q]=void 0;else for(D=0;D<k;D++){if((H=z[D])&&L.key==H.key&&L.type===H.type){z[D]=void 0;break}H=null}a2(_,L,H=H||N2,X,Z,j,G,V,W),F=L.__e,(D=L.ref)&&H.ref!=D&&(b||(b=[]),H.ref&&b.push(H.ref,null,L),b.push(D,L.__c||F,L)),F!=null?(M==null&&(M=F),typeof L.type=="function"&&L.__k!=null&&L.__k===H.__k?L.__d=V=o1(L,V,_):V=n1(_,L,H,z,F,V),W||J.type!=="option"?typeof J.type=="function"&&(J.__d=V):_.value=""):V&&H.__e==V&&V.parentNode!=_&&(V=n0(H))}for(J.__e=M,Q=k;Q--;)z[Q]!=null&&(typeof J.type=="function"&&z[Q].__e!=null&&z[Q].__e==J.__d&&(J.__d=n0(Y,Q+1)),s1(z[Q],z[Q]));if(b)for(Q=0;Q<b.length;Q++)r1(b[Q],b[++Q],b[++Q])}function o1(_,$,J){var Y,X;for(Y=0;Y<_.__k.length;Y++)(X=_.__k[Y])&&(X.__=_,$=typeof X.type=="function"?o1(X,$,J):n1(J,X,X,_.__k,X.__e,$));return $}function n1(_,$,J,Y,X,Z){var j,G,V;if($.__d!==void 0)j=$.__d,$.__d=void 0;else if(J==null||X!=Z||X.parentNode==null)_:if(Z==null||Z.parentNode!==_)_.appendChild(X),j=null;else{for(G=Z,V=0;(G=G.nextSibling)&&V<Y.length;V+=2)if(G==X)break _;_.insertBefore(X,Z),j=Z}return j!==void 0?j:X.nextSibling}function M1(_,$,J){$[0]==="-"?_.setProperty($,J):_[$]=J==null?"":typeof J!="number"||v4.test($)?J:J+"px"}function V2(_,$,J,Y,X){var Z;_:if($==="style")if(typeof J=="string")_.style.cssText=J;else{if(typeof Y=="string"&&(_.style.cssText=Y=""),Y)for($ in Y)J&&$ in J||M1(_.style,$,"");if(J)for($ in J)Y&&J[$]===Y[$]||M1(_.style,$,J[$])}else if($[0]==="o"&&$[1]==="n")Z=$!==($=$.replace(/Capture$/,"")),$=$.toLowerCase()in _?$.toLowerCase().slice(2):$.slice(2),_.l||(_.l={}),_.l[$+Z]=J,J?Y||_.addEventListener($,Z?b1:P1,Z):_.removeEventListener($,Z?b1:P1,Z);else if($!=="dangerouslySetInnerHTML"){if(X)$=$.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if($!=="href"&&$!=="list"&&$!=="form"&&$!=="tabIndex"&&$!=="download"&&$ in _)try{_[$]=J==null?"":J;break _}catch(j){}typeof J=="function"||(J!=null&&(J!==!1||$[0]==="a"&&$[1]==="r")?_.setAttribute($,J):_.removeAttribute($))}}function P1(_){this.l[_.type+!1](Z_.event?Z_.event(_):_)}function b1(_){this.l[_.type+!0](Z_.event?Z_.event(_):_)}function a2(_,$,J,Y,X,Z,j,G,V){var W,Q,D,H,L,F,M,b,z,k,E,A=$.type;if($.constructor!==void 0)return null;J.__h!=null&&(V=J.__h,G=$.__e=J.__e,$.__h=null,Z=[G]),(W=Z_.__b)&&W($);try{_:if(typeof A=="function"){if(b=$.props,z=(W=A.contextType)&&Y[W.__c],k=W?z?z.props.value:W.__:Y,J.__c?M=(Q=$.__c=J.__c).__=Q.__E:(("prototype"in A)&&A.prototype.render?$.__c=Q=new A(b,k):($.__c=Q=new O2(b,k),Q.constructor=A,Q.render=u4),z&&z.sub(Q),Q.props=b,Q.state||(Q.state={}),Q.context=k,Q.__n=Y,D=Q.__d=!0,Q.__h=[]),Q.__s==null&&(Q.__s=Q.state),A.getDerivedStateFromProps!=null&&(Q.__s==Q.state&&(Q.__s=v0({},Q.__s)),v0(Q.__s,A.getDerivedStateFromProps(b,Q.__s))),H=Q.props,L=Q.state,D)A.getDerivedStateFromProps==null&&Q.componentWillMount!=null&&Q.componentWillMount(),Q.componentDidMount!=null&&Q.__h.push(Q.componentDidMount);else{if(A.getDerivedStateFromProps==null&&b!==H&&Q.componentWillReceiveProps!=null&&Q.componentWillReceiveProps(b,k),!Q.__e&&Q.shouldComponentUpdate!=null&&Q.shouldComponentUpdate(b,Q.__s,k)===!1||$.__v===J.__v){Q.props=b,Q.state=Q.__s,$.__v!==J.__v&&(Q.__d=!1),Q.__v=$,$.__e=J.__e,$.__k=J.__k,$.__k.forEach(function(R){R&&(R.__=$)}),Q.__h.length&&j.push(Q);break _}Q.componentWillUpdate!=null&&Q.componentWillUpdate(b,Q.__s,k),Q.componentDidUpdate!=null&&Q.__h.push(function(){Q.componentDidUpdate(H,L,F)})}Q.context=k,Q.props=b,Q.state=Q.__s,(W=Z_.__r)&&W($),Q.__d=!1,Q.__v=$,Q.__P=_,W=Q.render(Q.props,Q.state,Q.context),Q.state=Q.__s,Q.getChildContext!=null&&(Y=v0(v0({},Y),Q.getChildContext())),D||Q.getSnapshotBeforeUpdate==null||(F=Q.getSnapshotBeforeUpdate(H,L)),E=W!=null&&W.type===U2&&W.key==null?W.props.children:W,l1(_,Array.isArray(E)?E:[E],$,J,Y,X,Z,j,G,V),Q.base=$.__e,$.__h=null,Q.__h.length&&j.push(Q),M&&(Q.__E=Q.__=null),Q.__e=!1}else Z==null&&$.__v===J.__v?($.__k=J.__k,$.__e=J.__e):$.__e=R4(J.__e,$,J,Y,X,Z,j,V);(W=Z_.diffed)&&W($)}catch(R){$.__v=null,(V||Z!=null)&&($.__e=G,$.__h=!!V,Z[Z.indexOf(G)]=null),Z_.__e(R,$,J)}}function d1(_,$){Z_.__c&&Z_.__c($,_),_.some(function(J){try{_=J.__h,J.__h=[],_.some(function(Y){Y.call(J)})}catch(Y){Z_.__e(Y,J.__v)}})}function R4(_,$,J,Y,X,Z,j,G){var V,W,Q,D=J.props,H=$.props,L=$.type,F=0;if(L==="svg"&&(X=!0),Z!=null){for(;F<Z.length;F++)if((V=Z[F])&&(V===_||(L?V.localName==L:V.nodeType==3))){_=V,Z[F]=null;break}}if(_==null){if(L===null)return document.createTextNode(H);_=X?document.createElementNS("http://www.w3.org/2000/svg",L):document.createElement(L,H.is&&H),Z=null,G=!1}if(L===null)D===H||G&&_.data===H||(_.data=H);else{if(Z=Z&&z2.call(_.childNodes),W=(D=J.props||N2).dangerouslySetInnerHTML,Q=H.dangerouslySetInnerHTML,!G){if(Z!=null)for(D={},F=0;F<_.attributes.length;F++)D[_.attributes[F].name]=_.attributes[F].value;(Q||W)&&(Q&&(W&&Q.__html==W.__html||Q.__html===_.innerHTML)||(_.innerHTML=Q&&Q.__html||""))}if(function(M,b,z,k,E){var A;for(A in z)A==="children"||A==="key"||A in b||V2(M,A,null,z[A],k);for(A in b)E&&typeof b[A]!="function"||A==="children"||A==="key"||A==="value"||A==="checked"||z[A]===b[A]||V2(M,A,b[A],z[A],k)}(_,H,D,X,G),Q)$.__k=[];else if(F=$.props.children,l1(_,Array.isArray(F)?F:[F],$,J,Y,X&&L!=="foreignObject",Z,j,Z?Z[0]:J.__k&&n0(J,0),G),Z!=null)for(F=Z.length;F--;)Z[F]!=null&&p1(Z[F]);G||(("value"in H)&&(F=H.value)!==void 0&&(F!==_.value||L==="progress"&&!F)&&V2(_,"value",F,D.value,!1),("checked"in H)&&(F=H.checked)!==void 0&&F!==_.checked&&V2(_,"checked",F,D.checked,!1))}return _}function r1(_,$,J){try{typeof _=="function"?_($):_.current=$}catch(Y){Z_.__e(Y,J)}}function s1(_,$,J){var Y,X;if(Z_.unmount&&Z_.unmount(_),(Y=_.ref)&&(Y.current&&Y.current!==_.__e||r1(Y,null,$)),(Y=_.__c)!=null){if(Y.componentWillUnmount)try{Y.componentWillUnmount()}catch(Z){Z_.__e(Z,$)}Y.base=Y.__P=null}if(Y=_.__k)for(X=0;X<Y.length;X++)Y[X]&&s1(Y[X],$,typeof _.type!="function");J||_.__e==null||p1(_.__e),_.__e=_.__d=void 0}function u4(_,$,J){return this.constructor(_,J)}function a1(_,$,J){var Y,X,Z;Z_.__&&Z_.__(_,$),X=(Y=typeof J=="function")?null:J&&J.__k||$.__k,Z=[],a2($,_=(!Y&&J||$).__k=h1(U2,null,[_]),X||N2,N2,$.ownerSVGElement!==void 0,!Y&&J?[J]:X?null:$.firstChild?z2.call($.childNodes):null,Z,!Y&&J?J:X?X.__e:$.firstChild,Y),d1(Z,_)}z2=c1.slice,Z_={__e:function(_,$){for(var J,Y,X;$=$.__;)if((J=$.__c)&&!J.__)try{if((Y=J.constructor)&&Y.getDerivedStateFromError!=null&&(J.setState(Y.getDerivedStateFromError(_)),X=J.__d),J.componentDidCatch!=null&&(J.componentDidCatch(_),X=J.__d),X)return J.__E=J}catch(Z){_=Z}throw _}},m1=0,O2.prototype.setState=function(_,$){var J;J=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v0({},this.state),typeof _=="function"&&(_=_(v0({},J),this.props)),_&&v0(J,_),_!=null&&this.__v&&($&&this.__h.push($),w1(this))},O2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),w1(this))},O2.prototype.render=U2,$2=[],g1=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,B2.__r=0,f4=0;var H2,W0,I1,J2=0,r2=[],S1=Z_.__b,x1=Z_.__r,T1=Z_.diffed,f1=Z_.__c,v1=Z_.unmount;function t2(_,$){Z_.__h&&Z_.__h(W0,_,J2||$),J2=0;var J=W0.__H||(W0.__H={__:[],__h:[]});return _>=J.__.length&&J.__.push({}),J.__[_]}function T(_){return J2=1,m4(e1,_)}function m4(_,$,J){var Y=t2(H2++,2);return Y.t=_,Y.__c||(Y.__=[J?J($):e1(void 0,$),function(X){var Z=Y.t(Y.__[0],X);Y.__[0]!==Z&&(Y.__=[Z,Y.__[1]],Y.__c.setState({}))}],Y.__c=W0),Y.__}function m(_,$){var J=t2(H2++,3);!Z_.__s&&t1(J.__H,$)&&(J.__=_,J.__H=$,W0.__H.__h.push(J))}function w(_){return J2=5,P0(function(){return{current:_}},[])}function P0(_,$){var J=t2(H2++,7);return t1(J.__H,$)&&(J.__=_(),J.__H=$,J.__h=_),J.__}function S(_,$){return J2=8,P0(function(){return _},$)}function g4(){r2.forEach(function(_){if(_.__P)try{_.__H.__h.forEach(q2),_.__H.__h.forEach(s2),_.__H.__h=[]}catch($){_.__H.__h=[],Z_.__e($,_.__v)}}),r2=[]}Z_.__b=function(_){W0=null,S1&&S1(_)},Z_.__r=function(_){x1&&x1(_),H2=0;var $=(W0=_.__c).__H;$&&($.__h.forEach(q2),$.__h.forEach(s2),$.__h=[])},Z_.diffed=function(_){T1&&T1(_);var $=_.__c;$&&$.__H&&$.__H.__h.length&&(r2.push($)!==1&&I1===Z_.requestAnimationFrame||((I1=Z_.requestAnimationFrame)||function(J){var Y,X=function(){clearTimeout(Z),R1&&cancelAnimationFrame(Y),setTimeout(J)},Z=setTimeout(X,100);R1&&(Y=requestAnimationFrame(X))})(g4)),W0=void 0},Z_.__c=function(_,$){$.some(function(J){try{J.__h.forEach(q2),J.__h=J.__h.filter(function(Y){return!Y.__||s2(Y)})}catch(Y){$.some(function(X){X.__h&&(X.__h=[])}),$=[],Z_.__e(Y,J.__v)}}),f1&&f1(_,$)},Z_.unmount=function(_){v1&&v1(_);var $=_.__c;if($&&$.__H)try{$.__H.__.forEach(q2)}catch(J){Z_.__e(J,$.__v)}};var R1=typeof requestAnimationFrame=="function";function q2(_){var $=W0;typeof _.__c=="function"&&_.__c(),W0=$}function s2(_){var $=W0;_.__c=_.__(),W0=$}function t1(_,$){return!_||_.length!==$.length||$.some(function(J,Y){return J!==_[Y]})}function e1(_,$){return typeof $=="function"?$(_):$}var _3=function(_,$,J,Y){var X;$[0]=0;for(var Z=1;Z<$.length;Z++){var j=$[Z++],G=$[Z]?($[0]|=j?1:2,J[$[Z++]]):$[++Z];j===3?Y[0]=G:j===4?Y[1]=Object.assign(Y[1]||{},G):j===5?(Y[1]=Y[1]||{})[$[++Z]]=G:j===6?Y[1][$[++Z]]+=G+"":j?(X=_.apply(G,_3(_,G,J,["",null])),Y.push(X),G[0]?$[0]|=2:($[Z-2]=0,$[Z]=X)):Y.push(G)}return Y},u1=new Map,q=function(_){var $=u1.get(this);return $||($=new Map,u1.set(this,$)),($=_3(this,$.get(_)||($.set(_,$=function(J){for(var Y,X,Z=1,j="",G="",V=[0],W=function(H){Z===1&&(H||(j=j.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?V.push(0,H,j):Z===3&&(H||j)?(V.push(3,H,j),Z=2):Z===2&&j==="..."&&H?V.push(4,H,0):Z===2&&j&&!H?V.push(5,0,!0,j):Z>=5&&((j||!H&&Z===5)&&(V.push(Z,0,j,X),Z=6),H&&(V.push(Z,H,0,X),Z=6)),j=""},Q=0;Q<J.length;Q++){Q&&(Z===1&&W(),W(Q));for(var D=0;D<J[Q].length;D++)Y=J[Q][D],Z===1?Y==="<"?(W(),V=[V],Z=3):j+=Y:Z===4?j==="--"&&Y===">"?(Z=1,j=""):j=Y+j[0]:G?Y===G?G="":j+=Y:Y==='"'||Y==="'"?G=Y:Y===">"?(W(),Z=1):Z&&(Y==="="?(Z=5,X=j,j=""):Y==="/"&&(Z<5||J[Q][D+1]===">")?(W(),Z===3&&(V=V[0]),Z=V,(V=V[0]).push(2,0,Z),Z=0):Y===" "||Y==="\t"||Y===`
`||Y==="\r"?(W(),Z=2):j+=Y),Z===3&&j==="!--"&&(Z=4,V=V[0])}return W(),V}(_)),$),arguments,[])).length>1?$:$[0]}.bind(h1);async function n_(_,$={}){let J=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!J.ok){let Y=await J.json().catch(()=>({error:"Unknown error"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function F2(_=10,$=null){let J=`/timeline?limit=${_}`;if($)J+=`&before=${$}`;return n_(J)}async function $3(_,$=50,J=0){return n_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${J}`)}async function J3(_,$=50,J=0){return n_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${J}`)}async function Y3(_,$=!1){let J=`/post/${_}?cascade=${$?"true":"false"}`;return n_(J,{method:"DELETE"})}async function e2(_,$,J=null,Y=[]){return n_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:J,media_ids:Y})})}async function Z3(){return n_("/agents")}async function X3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return n_(`/agent/status${$}`)}async function _1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return n_(`/agent/context${$}`)}async function Y2(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return n_(`/agent/models${$}`)}async function Q3(_){let $=new FormData;$.append("file",_);let J=await fetch("/media/upload",{method:"POST",body:$});if(!J.ok){let Y=await J.json().catch(()=>({error:"Upload failed"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function $1(_,$){let J=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Failed to respond"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function j3(_,$){let J=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function K3(_,$="thought"){let J=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return n_(J)}async function G3(_,$,J){return n_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(J)})})}function Z2(_){return`/media/${_}`}function V3(_){return`/media/${_}/thumbnail`}async function L2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function E2(_="",$=2,J=!1){let Y=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${J?"1":"0"}`;return n_(Y)}async function W3(_,$=20000,J=null){let Y=J?`&mode=${encodeURIComponent(J)}`:"",X=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${Y}`;return n_(X)}async function O3(_){return n_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function J1(_,$="",J={}){let Y=new FormData;Y.append("file",_);let X=new URLSearchParams;if($)X.set("path",$);if(J.overwrite)X.set("overwrite","1");let Z=X.toString(),j=Z?`/workspace/upload?${Z}`:"/workspace/upload",G=await fetch(""+j,{method:"POST",body:Y});if(!G.ok){let V=await G.json().catch(()=>({error:"Upload failed"})),W=Error(V.error||`HTTP ${G.status}`);throw W.status=G.status,W.code=V.code,W}return G.json()}async function q3(_,$,J=""){let Y=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:J})});if(!Y.ok){let X=await Y.json().catch(()=>({error:"Create failed"})),Z=Error(X.error||`HTTP ${Y.status}`);throw Z.status=Y.status,Z.code=X.code,Z}return Y.json()}async function N3(_,$){let J=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Rename failed"})),X=Error(Y.error||`HTTP ${J.status}`);throw X.status=J.status,X.code=Y.code,X}return J.json()}async function B3(_,$){let J=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Move failed"})),X=Error(Y.error||`HTTP ${J.status}`);throw X.status=J.status,X.code=Y.code,X}return J.json()}async function z3(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return n_($,{method:"DELETE"})}async function D2(_,$=!1){return n_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function Y1(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function U3(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class Z1{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,J=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,J+$),this.reconnectAttempts=0;let Y=Math.max(this.cooldownUntil-J,0),X=Math.max(this.reconnectDelay,Y);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},X),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function g0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function I_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function d0(_,$=!1){let J=g0(_);if(J===null)return $;return J==="true"}function r0(_,$=null){let J=g0(_);if(J===null)return $;let Y=parseInt(J,10);return Number.isFinite(Y)?Y:$}function R0({prefix:_="file",label:$,title:J,onRemove:Y,removeTitle:X="Remove",icon:Z="file"}){let j=`${_}-file-pill`,G=`${_}-file-name`,V=`${_}-file-remove`,W=Z==="message"?q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return q`
    <span class=${j} title=${J||$}>
      ${W}
      <span class=${G}>${$}</span>
      ${Y&&q`
        <button
          class=${V}
          onClick=${(Q)=>{Q.preventDefault(),Q.stopPropagation(),Y()}}
          title=${X}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var p4=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function h4({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),J=_.tokens,Y=_.contextWindow,X=J!=null?`Context: ${H3(J)} / ${H3(Y)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,Z=7,j=2*Math.PI*7,G=$/100*j,V=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return q`
        <span class="compose-context-pie icon-btn" title=${X}>
            <svg width="16" height="16" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke="var(--context-track, rgba(128,128,128,0.2))"
                    stroke-width="2.5" />
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke=${V}
                    stroke-width="2.5"
                    stroke-dasharray=${`${G} ${j}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `}function H3(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function F3({onPost:_,onFocus:$,searchMode:J,onSearch:Y,onEnterSearch:X,onExitSearch:Z,fileRefs:j=[],onRemoveFileRef:G,onClearFileRefs:V,messageRefs:W=[],onRemoveMessageRef:Q,onClearMessageRefs:D,activeModel:H=null,thinkingLevel:L=null,supportsThinking:F=!1,contextUsage:M=null,notificationsEnabled:b=!1,notificationPermission:z="default",onToggleNotifications:k,onModelChange:E,onModelStateChange:A,activeEditorPath:R=null,onAttachEditorFile:h}){let[p,s]=T(""),[X_,n]=T(""),[__,U_]=T(!1),[e,G_]=T([]),[F_,y_]=T(!1),[$_,t]=T([]),[V_,J_]=T(0),[O_,K_]=T(!1),[A_,z_]=T(!1),[D_,S_]=T(!1),[N_,f_]=T([]),[C_,L_]=T(!1),M_=w(null),B0=w(null),u_=w(null),k_=w(null),i_=w(0),C0=200,c_=(U)=>{let x=new Set,d=[];for(let Q_ of U||[]){if(typeof Q_!=="string")continue;let j_=Q_.trim();if(!j_||x.has(j_))continue;x.add(j_),d.push(j_)}return d},Y0=()=>{let U=g0("piclaw_compose_history");if(!U)return[];try{let x=JSON.parse(U);if(!Array.isArray(x))return[];return c_(x)}catch{return[]}},Z0=(U)=>{I_("piclaw_compose_history",JSON.stringify(U))},B_=w(Y0()),I=w(-1),l=w(""),m_=!__&&(p.trim()||e.length>0||j.length>0||W.length>0),y0=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),t_=typeof window<"u"&&typeof Notification<"u",I0=typeof window<"u"?Boolean(window.isSecureContext):!1,U0=t_&&I0&&z!=="denied",d_=z==="granted"&&b,H0=d_?"Disable notifications":"Enable notifications",X0=F&&L?` (${L})`:"",Q0=H?`${H}${X0}`:"",x_=(U)=>{if(!U||typeof U!=="object")return;let x=U.model??U.current;if(typeof A==="function")A({model:x??null,thinking_level:U.thinking_level??null,supports_thinking:U.supports_thinking});if(x&&typeof E==="function")E(x)},r_=(U)=>{let x=U||M_.current;if(!x)return;x.style.height="auto",x.style.height=`${x.scrollHeight}px`,x.style.overflowY="hidden"},S0=(U)=>{if(!U.startsWith("/")||U.includes(`
`)){K_(!1),t([]);return}let x=U.toLowerCase().split(" ")[0];if(x.length<1){K_(!1),t([]);return}let d=p4.filter((Q_)=>Q_.name.startsWith(x)||Q_.name.replace(/-/g,"").startsWith(x.replace(/-/g,"")));if(d.length>0&&!(d.length===1&&d[0].name===x))t(d),J_(0),K_(!0);else K_(!1),t([])},F0=(U)=>{let x=p,d=x.indexOf(" "),Q_=d>=0?x.slice(d):"",j_=U.name+Q_;s(j_),K_(!1),t([]),requestAnimationFrame(()=>{let E_=M_.current;if(!E_)return;let q_=j_.length;E_.selectionStart=q_,E_.selectionEnd=q_,E_.focus()})},q0=(U)=>{if(J)n(U);else s(U),S0(U);requestAnimationFrame(()=>r_())},_0=(U)=>{let x=J?X_:p,d=x&&!x.endsWith(`
`)?`
`:"",Q_=`${x}${d}${U}`.trimStart();q0(Q_)},k0=(U)=>{let x=U?.command?.model_label;if(x)return x;let d=U?.command?.message;if(typeof d==="string"){let Q_=d.match(/•\s+([^\n]+?)\s+\(current\)/);if(Q_?.[1])return Q_[1].trim()}return null},$0=async(U)=>{if(J||__||A_)return;z_(!0);try{let x=await e2("default",U,null,[]),d=k0(x);return x_({model:d??H??null,thinking_level:x?.command?.thinking_level,supports_thinking:x?.command?.supports_thinking}),_?.(),!0}catch(x){return console.error("Failed to switch model:",x),alert("Failed to switch model: "+x.message),!1}finally{z_(!1)}},l_=async()=>{await $0("/cycle-model")},j0=async(U)=>{if(!U||A_)return;if(await $0(`/model ${U}`))S_(!1)},A0=(U)=>{U.preventDefault(),U.stopPropagation(),S_((x)=>!x)},w0=async(U)=>{let x=typeof U==="string"?U:U&&typeof U?.target?.value==="string"?U.target.value:p,d=typeof x==="string"?x:"";if(!d.trim()&&e.length===0&&j.length===0&&W.length===0)return;U_(!0);try{let Q_=[];for(let J0 of e){let b_=await Q3(J0);Q_.push(b_.id)}let j_=d.trim(),E_=j.length?`Files:
${j.map((J0)=>`- ${J0}`).join(`
`)}`:"",q_=W.length?`Referenced messages:
${W.map((J0)=>`- message:${J0}`).join(`
`)}`:"",e_=Q_.length?`Images:
${Q_.map((J0,b_)=>{let u0=e[b_]?.name||`image-${b_+1}`;return`- attachment:${J0} (${u0})`}).join(`
`)}`:"",T_=[j_,E_,q_,e_].filter(Boolean).join(`

`),p_=await e2("default",T_,null,Q_);if(p_?.command)x_({model:p_.command.model_label??H??null,thinking_level:p_.command.thinking_level,supports_thinking:p_.command.supports_thinking});if(j_){let J0=B_.current,b_=c_(J0.filter((E0)=>E0!==j_));if(b_.push(j_),b_.length>200)b_.splice(0,b_.length-200);B_.current=b_,Z0(b_),I.current=-1,l.current=""}s(""),G_([]),V?.(),D?.(),_?.()}catch(Q_){console.error("Failed to post:",Q_),alert("Failed to post: "+Q_.message)}finally{U_(!1)}},x0=(U)=>{if(U.isComposing)return;if(J&&U.key==="Escape"){U.preventDefault(),n(""),Z?.();return}if(O_&&$_.length>0){let x=M_.current?.value??(J?X_:p);if(!String(x||"").startsWith("/"))K_(!1),t([]);else{if(U.key==="ArrowDown"){U.preventDefault(),J_((d)=>(d+1)%$_.length);return}if(U.key==="ArrowUp"){U.preventDefault(),J_((d)=>(d-1+$_.length)%$_.length);return}if(U.key==="Tab"){U.preventDefault(),F0($_[V_]);return}if(U.key==="Enter"&&!U.shiftKey){if(!(M_.current?.value??(J?X_:p)).includes(" ")){U.preventDefault();let j_=$_[V_];K_(!1),t([]),w0(j_.name);return}}if(U.key==="Escape"){U.preventDefault(),K_(!1),t([]);return}}}if(!J&&(U.key==="ArrowUp"||U.key==="ArrowDown")&&!U.metaKey&&!U.ctrlKey&&!U.altKey&&!U.shiftKey){let x=M_.current;if(!x)return;let d=x.value||"",Q_=x.selectionStart===0&&x.selectionEnd===0,j_=x.selectionStart===d.length&&x.selectionEnd===d.length;if(U.key==="ArrowUp"&&Q_||U.key==="ArrowDown"&&j_){let E_=B_.current;if(!E_.length)return;U.preventDefault();let q_=I.current;if(U.key==="ArrowUp"){if(q_===-1)l.current=d,q_=E_.length-1;else if(q_>0)q_-=1;I.current=q_,q0(E_[q_]||"")}else{if(q_===-1)return;if(q_<E_.length-1)q_+=1,I.current=q_,q0(E_[q_]||"");else I.current=-1,q0(l.current||""),l.current=""}requestAnimationFrame(()=>{let e_=M_.current;if(!e_)return;let T_=e_.value.length;e_.selectionStart=T_,e_.selectionEnd=T_});return}}if(U.key==="Enter"&&!U.shiftKey){U.preventDefault();let x=M_.current?.value??(J?X_:p);if(J){if(x.trim())Y?.(x.trim())}else w0(x)}},P_=(U)=>{let x=Array.from(U||[]).filter((d)=>d&&d.type&&d.type.startsWith("image/"));if(!x.length)return;G_((d)=>[...d,...x])},K0=(U)=>{P_(U.target.files),U.target.value=""},s_=(U)=>{if(J)return;U.preventDefault(),U.stopPropagation(),i_.current+=1,y_(!0)},v_=(U)=>{if(J)return;if(U.preventDefault(),U.stopPropagation(),i_.current=Math.max(0,i_.current-1),i_.current===0)y_(!1)},g_=(U)=>{if(J)return;if(U.preventDefault(),U.stopPropagation(),U.dataTransfer)U.dataTransfer.dropEffect="copy";y_(!0)},a_=(U)=>{if(J)return;U.preventDefault(),U.stopPropagation(),i_.current=0,y_(!1),P_(U.dataTransfer?.files||[])},G0=(U)=>{if(J)return;let x=U.clipboardData?.items;if(!x||!x.length)return;let d=[];for(let Q_ of x){if(Q_.kind!=="file")continue;let j_=Q_.getAsFile?.();if(j_)d.push(j_)}if(d.length>0)U.preventDefault(),P_(d)},L0=(U)=>{G_((x)=>x.filter((d,Q_)=>Q_!==U))},M0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((U)=>{let{latitude:x,longitude:d,accuracy:Q_}=U.coords,j_=`${x.toFixed(5)}, ${d.toFixed(5)}`,E_=Number.isFinite(Q_)?` ±${Math.round(Q_)}m`:"",q_=`https://maps.google.com/?q=${x},${d}`,e_=`Location: ${j_}${E_} ${q_}`;_0(e_)},(U)=>{let x=U?.message||"Unable to retrieve location.";alert(`Location error: ${x}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};m(()=>{if(!D_)return;L_(!0),Y2().then((U)=>{let x=Array.isArray(U?.models)?U.models.filter((d)=>typeof d==="string"&&d.trim().length>0):[];f_(x),x_(U)}).catch((U)=>{console.warn("Failed to load model list:",U),f_([])}).finally(()=>{L_(!1)})},[D_,H]),m(()=>{if(J)S_(!1)},[J]),m(()=>{if(!D_)return;let U=(x)=>{let d=u_.current,Q_=k_.current,j_=x.target;if(d&&d.contains(j_))return;if(Q_&&Q_.contains(j_))return;S_(!1)};return document.addEventListener("pointerdown",U),()=>document.removeEventListener("pointerdown",U)},[D_]);let c0=(U)=>{let x=U.target.value;r_(U.target),q0(x)};return m(()=>{requestAnimationFrame(()=>r_())},[p,X_,J]),q`
        <div class="compose-box">
            <div
                class=${`compose-input-wrapper${F_?" drag-active":""}`}
                onDragEnter=${s_}
                onDragOver=${g_}
                onDragLeave=${v_}
                onDrop=${a_}
            >
                <div class="compose-input-main">
                    ${!J&&(j.length>0||e.length>0||W.length>0)&&q`
                        <div class="compose-file-refs">
                            ${W.map((U)=>{return q`
                                    <${R0}
                                        key=${"msg-"+U}
                                        prefix="compose"
                                        label=${"msg:"+U}
                                        title=${"Message reference: "+U}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>Q?.(U)}
                                    />
                                `})}
                            ${j.map((U)=>{let x=U.split("/").pop()||U;return q`
                                    <${R0}
                                        prefix="compose"
                                        label=${x}
                                        title=${U}
                                        removeTitle="Remove file"
                                        onRemove=${()=>G?.(U)}
                                    />
                                `})}
                            ${e.map((U,x)=>{let d=U?.name||`image-${x+1}`;return q`
                                    <${R0}
                                        key=${d+x}
                                        prefix="compose"
                                        label=${d}
                                        title=${d}
                                        removeTitle="Remove image"
                                        onRemove=${()=>L0(x)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${M_}
                        placeholder=${J?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${J?X_:p}
                        onInput=${c0}
                        onKeyDown=${x0}
                        onPaste=${G0}
                        onFocus=${$}
                        onClick=${$}
                        disabled=${__}
                        rows="1"
                    />
                    ${O_&&$_.length>0&&q`
                        <div class="slash-autocomplete" ref=${B0}>
                            ${$_.map((U,x)=>q`
                                <div
                                    key=${U.name}
                                    class=${`slash-item${x===V_?" active":""}`}
                                    onMouseDown=${(d)=>{d.preventDefault(),F0(U)}}
                                    onMouseEnter=${()=>J_(x)}
                                >
                                    <span class="slash-name">${U.name}</span>
                                    <span class="slash-desc">${U.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${D_&&!J&&q`
                        <div class="compose-model-popup" ref=${u_}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${C_&&q`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!C_&&N_.length===0&&q`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!C_&&N_.map((U)=>q`
                                    <button
                                        key=${U}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${H===U?" active":""}`}
                                        onClick=${()=>{j0(U)}}
                                        disabled=${A_}
                                    >
                                        ${U}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{l_()}}
                                    disabled=${A_}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!J&&H&&q`
                        <div class="compose-meta-row">
                            <button
                                ref=${k_}
                                type="button"
                                class="compose-model-hint compose-model-hint-btn"
                                title=${A_?"Switching model…":`Current model: ${Q0} (tap to open model picker)`}
                                aria-label="Open model picker"
                                onClick=${A0}
                                disabled=${__||A_}
                            >
                                ${A_?"Switching…":Q0}
                            </button>
                        </div>
                    `}
                    <div class="compose-actions ${J?"search-mode":""}">
                    ${!J&&M&&M.percent!=null&&q`
                        <${h4} usage=${M} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${J?Z:X}
                        title=${J?"Close search":"Search"}
                    >
                        ${J?q`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        `:q`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        `}
                    </button>
                    ${y0&&!J&&q`
                        <button
                            class="icon-btn location-btn"
                            onClick=${M0}
                            title="Share location"
                            type="button"
                            disabled=${__}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14 14 0 0 1 0 20a14 14 0 0 1 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                        </button>
                    `}
                    ${U0&&!J&&q`
                        <button
                            class=${`icon-btn notification-btn${d_?" active":""}`}
                            onClick=${k}
                            title=${H0}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!J&&q`
                        ${R&&h&&q`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${h}
                                title=${`Attach open file: ${R}`}
                                type="button"
                                disabled=${__||j.includes(R)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${K0} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{w0()}}
                            disabled=${!m_}
                            title="Send (Ctrl+Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var E3="piclaw_theme",j1="piclaw_tint",k2={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},i4={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},L3={default:{label:"Default",mode:"auto",light:k2,dark:i4},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},l4=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],A2={theme:"default",tint:null},D3="light",X1=!1;function C3(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function s0(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let J=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(J)&&!/^[0-9a-fA-F]{6}$/.test(J))return null;let Y=J.length===3?J.split("").map((Z)=>Z+Z).join(""):J,X=parseInt(Y,16);return{r:X>>16&255,g:X>>8&255,b:X&255,hex:`#${Y.toLowerCase()}`}}function o4(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let J=document.createElement("div");if(J.style.color="",J.style.color=$,!J.style.color)return null;let Y=J.style.color;try{if(document.body)J.style.display="none",document.body.appendChild(J),Y=getComputedStyle(J).color||J.style.color,document.body.removeChild(J)}catch{}let X=Y.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!X)return null;let Z=parseInt(X[1],10),j=parseInt(X[2],10),G=parseInt(X[3],10);if(![Z,j,G].every((W)=>Number.isFinite(W)))return null;let V=`#${[Z,j,G].map((W)=>W.toString(16).padStart(2,"0")).join("")}`;return{r:Z,g:j,b:G,hex:V}}function y3(_){return s0(_)||o4(_)}function X2(_,$,J){let Y=Math.round(_.r+($.r-_.r)*J),X=Math.round(_.g+($.g-_.g)*J),Z=Math.round(_.b+($.b-_.b)*J);return`rgb(${Y} ${X} ${Z})`}function Q1(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function k3(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function K1(_){return L3[_]||L3.default}function n4(_){return _.mode==="auto"?k3():_.mode}function d4(_,$){let J=K1(_);if($==="dark"&&J.dark)return J.dark;if($==="light"&&J.light)return J.light;return J.dark||J.light||k2}function r4(_,$,J){let Y=y3($);if(!Y)return _;let X=s0(_.bgPrimary),Z=s0(_.bgSecondary),j=s0(_.bgHover),G=s0(_.borderColor);if(!X||!Z||!j||!G)return _;let W=s0(J==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:X2(X,Y,0.08),bgSecondary:X2(Z,Y,0.12),bgHover:X2(j,Y,0.16),borderColor:X2(G,Y,0.08),accent:Y.hex,accentHover:W?X2(Y,W,0.18):Y.hex}}function s4(_,$){if(typeof document>"u")return;let J=document.documentElement,Y=_.accent,X=y3(Y),Z=X?Q1(X,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,j=X?Q1(X,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",G=X?Q1(X,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",V={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":Y,"--accent-hover":_.accentHover||Y,"--accent-soft":j,"--accent-soft-strong":G,"--danger-color":_.danger||k2.danger,"--success-color":_.success||k2.success,"--search-highlight-color":Z||"rgba(29, 155, 240, 0.2)"};Object.entries(V).forEach(([W,Q])=>{if(Q)J.style.setProperty(W,Q)})}function a4(){if(typeof document>"u")return;let _=document.documentElement;l4.forEach(($)=>_.style.removeProperty($))}function C2(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function t4(_,$){if(typeof document>"u")return;let J=C2("theme-color");if(J&&_)J.setAttribute("content",_);let Y=C2("msapplication-TileColor");if(Y&&_)Y.setAttribute("content",_);let X=C2("msapplication-navbutton-color");if(X&&_)X.setAttribute("content",_);let Z=C2("apple-mobile-web-app-status-bar-style");if(Z)Z.setAttribute("content",$==="dark"?"black-translucent":"default")}function e4(){if(typeof window>"u")return;let _={...A2,mode:D3};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function G1(_,$={}){if(typeof window>"u"||typeof document>"u")return;let J=C3(_?.theme||"default"),Y=_?.tint?String(_.tint).trim():null,X=K1(J),Z=n4(X),j=d4(J,Z);A2={theme:J,tint:Y},D3=Z;let G=document.documentElement;G.dataset.theme=Z,G.dataset.colorTheme=J,G.dataset.tint=Y?String(Y):"",G.style.colorScheme=Z;let V=j;if(J==="default"&&Y)V=r4(j,Y,Z);if(J==="default"&&!Y)a4();else s4(V,Z);if(t4(V.bgPrimary,Z),e4(),$.persist!==!1)if(I_(E3,J),Y)I_(j1,Y);else I_(j1,"")}function y2(){if(K1(A2.theme).mode!=="auto")return;G1(A2,{persist:!1})}function A3(){if(typeof window>"u")return()=>{};let _=C3(g0(E3)||"default"),$=g0(j1),J=$?$.trim():null;if(G1({theme:_,tint:J},{persist:!1}),window.matchMedia&&!X1){let Y=window.matchMedia("(prefers-color-scheme: dark)");if(Y.addEventListener)Y.addEventListener("change",y2);else if(Y.addListener)Y.addListener(y2);return X1=!0,()=>{if(Y.removeEventListener)Y.removeEventListener("change",y2);else if(Y.removeListener)Y.removeListener(y2);X1=!1}}return()=>{}}function w3(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let J=_.theme??_.name??_.colorTheme,Y=_.tint??null;G1({theme:J||"default",tint:Y},{persist:!0})}function M3(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return k3()}var w2=/#(\w+)/g,_8=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),$8=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),J8=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),Y8={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},Z8=new Set(["http:","https:","mailto:",""]);function P3(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function a0(_,$={}){if(!_)return null;let J=String(_).trim();if(!J)return null;if(J.startsWith("#")||J.startsWith("/"))return J;if(J.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(J))return J;return null}if(J.startsWith("blob:"))return J;try{let Y=new URL(J,typeof window<"u"?window.location.origin:"http://localhost");if(!Z8.has(Y.protocol))return null;return Y.href}catch{return null}}function b3(_,$={}){if(!_)return"";let J=new DOMParser().parseFromString(_,"text/html"),Y=[],X=J.createTreeWalker(J.body,NodeFilter.SHOW_ELEMENT),Z;while(Z=X.nextNode())Y.push(Z);for(let j of Y){let G=j.tagName.toLowerCase();if(!$8.has(G)){let W=j.parentNode;if(!W)continue;while(j.firstChild)W.insertBefore(j.firstChild,j);W.removeChild(j);continue}let V=Y8[G]||new Set;for(let W of Array.from(j.attributes)){let Q=W.name.toLowerCase(),D=W.value;if(Q.startsWith("on")){j.removeAttribute(W.name);continue}if(Q.startsWith("data-")||Q.startsWith("aria-"))continue;if(V.has(Q)||J8.has(Q)){if(Q==="href"){let H=a0(D);if(!H)j.removeAttribute(W.name);else if(j.setAttribute(W.name,H),G==="a"&&!j.getAttribute("rel"))j.setAttribute("rel","noopener noreferrer")}else if(Q==="src"){let H=G==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(D):D,L=a0(H,{allowDataImage:G==="img"});if(!L)j.removeAttribute(W.name);else j.setAttribute(W.name,L)}continue}j.removeAttribute(W.name)}}return J.body.innerHTML}function I3(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function M2(_,$=2){if(!_)return _;let J=_;for(let Y=0;Y<$;Y+=1){let X=I3(J);if(X===J)break;J=X}return J}function X8(_){if(!_)return{text:"",blocks:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=[],X=[],Z=!1,j=[];for(let G of J){if(!Z&&G.trim().match(/^```mermaid\s*$/i)){Z=!0,j=[];continue}if(Z&&G.trim().match(/^```\s*$/)){let V=Y.length;Y.push(j.join(`
`)),X.push(`@@MERMAID_BLOCK_${V}@@`),Z=!1,j=[];continue}if(Z)j.push(G);else X.push(G)}if(Z)X.push("```mermaid"),X.push(...j);return{text:X.join(`
`),blocks:Y}}function Q8(_){if(!_)return _;return M2(_,5)}function j8(_){let $=new TextEncoder().encode(String(_||"")),J="";for(let Y of $)J+=String.fromCharCode(Y);return btoa(J)}function K8(_){let $=atob(String(_||"")),J=new Uint8Array($.length);for(let Y=0;Y<$.length;Y+=1)J[Y]=$.charCodeAt(Y);return new TextDecoder().decode(J)}function G8(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(J,Y)=>{let X=Number(Y),Z=$[X]??"",j=Q8(Z);return`<div class="mermaid-container" data-mermaid="${j8(j)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function S3(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,J)=>{if(J.includes(`
`))return`
\`\`\`
${J}
\`\`\`
`;return`\`${J}\``})}function x3(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,J)=>{let Y=J.trim(),X=Y.startsWith("/"),Z=X?Y.slice(1).trim():Y,V=(Z.endsWith("/")?Z.slice(0,-1).trim():Z).split(/\s+/)[0]?.toLowerCase();if(!V||!_8.has(V))return $;if(V==="br")return X?"":"<br>";if(X)return`</${V}>`;return`<${V}>`})}function T3(_){if(!_)return _;let $=(J)=>J.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(J,Y)=>`<pre><code>${$(Y)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(J,Y)=>`<code>${$(Y)}</code>`)}function f3(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Y=(Z)=>Z.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),X;while(X=J.nextNode()){if(!X.nodeValue)continue;let Z=Y(X.nodeValue);if(Z!==X.nodeValue)X.nodeValue=Z}return $.body.innerHTML}function V8(_){if(!window.katex)return _;let $=(j)=>I3(j).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),J=(j)=>{let G=[],V=j.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(W)=>{let Q=G.length;return G.push(W),`@@CODE_BLOCK_${Q}@@`});return V=V.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(W)=>{let Q=G.length;return G.push(W),`@@CODE_INLINE_${Q}@@`}),{html:V,blocks:G}},Y=(j,G)=>{if(!G.length)return j;return j.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(V,W)=>{let Q=Number(W);return G[Q]??""})},X=J(_),Z=X.html;return Z=Z.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(j,G,V)=>{try{let W=katex.renderToString($(V.trim()),{displayMode:!0,throwOnError:!1});return`${G}${W}`}catch(W){return`<span class="math-error" title="${P3(W.message)}">${j}</span>`}}),Z=Z.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(j,G,V)=>{if(/\s$/.test(V))return j;try{let W=katex.renderToString($(V),{displayMode:!1,throwOnError:!1});return`${G}${W}`}catch(W){return`${G}<span class="math-error" title="${P3(W.message)}">$${V}$</span>`}}),Y(Z,X.blocks)}function W8(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Y=[],X;while(X=J.nextNode())Y.push(X);for(let Z of Y){let j=Z.nodeValue;if(!j)continue;if(w2.lastIndex=0,!w2.test(j))continue;w2.lastIndex=0;let G=Z.parentElement;if(G&&(G.closest("a")||G.closest("code")||G.closest("pre")))continue;let V=j.split(w2);if(V.length<=1)continue;let W=$.createDocumentFragment();V.forEach((Q,D)=>{if(D%2===1){let H=$.createElement("a");H.setAttribute("href","#"),H.className="hashtag",H.setAttribute("data-hashtag",Q),H.textContent=`#${Q}`,W.appendChild(H)}else W.appendChild($.createTextNode(Q))}),Z.parentNode?.replaceChild(W,Z)}return $.body.innerHTML}function O8(_){if(!_)return _;let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=[],X=!1;for(let Z of J){if(!X&&Z.trim().match(/^```(?:math|katex|latex)\s*$/i)){X=!0,Y.push("$$");continue}if(X&&Z.trim().match(/^```\s*$/)){X=!1,Y.push("$$");continue}Y.push(Z)}return Y.join(`
`)}function t0(_,$,J={}){if(!_)return"";let Y=O8(_),{text:X,blocks:Z}=X8(Y),j=M2(X,2),V=S3(j).replace(/</g,"&lt;").replace(/>/g,"&gt;"),W=x3(V),Q=window.marked?marked.parse(W,{headerIds:!1,mangle:!1}):W.replace(/\n/g,"<br>");return Q=T3(Q),Q=f3(Q),Q=V8(Q),Q=W8(Q),Q=G8(Q,Z),Q=b3(Q,J),Q}function v3(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),J=M2($,2),X=S3(J).replace(/</g,"&lt;").replace(/>/g,"&gt;"),Z=x3(X),j=window.marked?marked.parse(Z):Z.replace(/\n/g,"<br>");return j=T3(j),j=f3(j),j=b3(j),j}async function P2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:J}=window.beautifulMermaid,X=M3()==="dark"?J["tokyo-night"]:J["github-light"],Z=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let j of Z)try{let G=j.dataset.mermaid,V=K8(G||""),W=M2(V,2),Q=await $(W,{...X,transparent:!0});j.innerHTML=Q,j.removeAttribute("data-mermaid")}catch(G){console.error("Mermaid render error:",G);let V=document.createElement("pre");V.className="mermaid-error",V.textContent=`Diagram error: ${G.message}`,j.innerHTML="",j.appendChild(V),j.removeAttribute("data-mermaid")}}var R3="PiClaw";function V1(_,$){let J=_||"PiClaw",Y=J.charAt(0).toUpperCase(),X=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],Z=Y.charCodeAt(0)%X.length,j=X[Z],G=J.trim().toLowerCase(),V=typeof $==="string"?$.trim():"",Q=(V?V:null)||(G==="PiClaw".toLowerCase()||G==="pi"?"/static/icon-192.png":null);return{letter:Y,color:j,image:Q}}function u3(_,$){if(!_)return"PiClaw";let J=$[_]?.name||_;return J?J.charAt(0).toUpperCase()+J.slice(1):"PiClaw"}function m3(_,$){if(!_)return null;let J=$[_]||{};return J.avatar_url||J.avatarUrl||J.avatar||null}function g3(_){if(!_)return null;if(typeof document<"u"){let Z=document.documentElement,j=Z?.dataset?.colorTheme||"",G=Z?.dataset?.tint||"",V=getComputedStyle(Z).getPropertyValue("--accent-color")?.trim();if(V&&(G||j&&j!=="default"))return V}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],J=String(_),Y=0;for(let Z=0;Z<J.length;Z+=1)Y=(Y*31+J.charCodeAt(Z))%2147483647;let X=Math.abs(Y)%$.length;return $[X]}function c3({status:_,draft:$,plan:J,thought:Y,pendingRequest:X,turnId:Z,steerQueued:j,onPanelToggle:G}){let Q=(t)=>{if(!t)return{text:"",totalLines:0,fullText:""};if(typeof t==="string"){let K_=t,A_=K_?K_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:K_,totalLines:A_,fullText:K_}}let V_=t.text||"",J_=t.fullText||t.full_text||V_,O_=Number.isFinite(t.totalLines)?t.totalLines:J_?J_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:V_,totalLines:O_,fullText:J_}},D=160,H=(t)=>{if(!t)return 1;return Math.max(1,Math.ceil(t.length/160))},L=(t,V_,J_)=>{let O_=(t||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!O_)return{text:"",omitted:0,totalLines:Number.isFinite(J_)?J_:0,visibleLines:0};let K_=O_.split(`
`),A_=K_.length>V_?K_.slice(0,V_).join(`
`):O_,z_=Number.isFinite(J_)?J_:K_.reduce((N_,f_)=>N_+H(f_),0),D_=A_?A_.split(`
`).reduce((N_,f_)=>N_+H(f_),0):0,S_=Math.max(z_-D_,0);return{text:A_,omitted:S_,totalLines:z_,visibleLines:D_}},F=Q(J),M=Q(Y),b=Q($),z=Boolean(F.text)||F.totalLines>0,k=Boolean(M.text)||M.totalLines>0,E=Boolean(b.fullText?.trim()||b.text?.trim());if(!_&&!E&&!z&&!k&&!X)return null;let[A,R]=T(new Set),h=(t)=>R((V_)=>{let J_=new Set(V_),O_=!J_.has(t);if(O_)J_.add(t);else J_.delete(t);if(typeof G==="function")G(t,O_);return J_});m(()=>{R(new Set)},[Z]);let p=_?.turn_id||Z,s=g3(p),X_=j?"turn-dot turn-dot-queued":"turn-dot",n=(t)=>t,__=Boolean(_?.last_activity||_?.lastActivity),U_="",e=_?.title,G_=_?.status;if(_?.type==="plan")U_=e?`Planning: ${e}`:"Planning...";else if(_?.type==="tool_call")U_=e?`Running: ${e}`:"Running tool...";else if(_?.type==="tool_status")U_=e?`${e}: ${G_||"Working..."}`:G_||"Working...";else if(_?.type==="error")U_=e||"Agent error";else U_=e||G_||"Working...";if(__)U_="Last activity just now";let F_=({panelTitle:t,text:V_,fullText:J_,totalLines:O_,maxLines:K_,titleClass:A_,panelKey:z_})=>{let D_=A.has(z_),S_=J_||V_||"",N_=typeof K_==="number",f_=D_&&N_,C_=N_?L(S_,K_,O_):{text:S_||"",omitted:0,totalLines:Number.isFinite(O_)?O_:0};if(!S_&&!(Number.isFinite(C_.totalLines)&&C_.totalLines>0))return null;let L_=`agent-thinking-body${N_?" agent-thinking-body-collapsible":""}`,M_=N_?`--agent-thinking-collapsed-lines: ${K_};`:"";return q`
            <div
                class="agent-thinking"
                data-expanded=${D_?"true":"false"}
                data-collapsible=${N_?"true":"false"}
                style=${s?`--turn-color: ${s};`:""}
            >
                <div class="agent-thinking-title ${A_||""}">
                    ${s&&q`<span class=${X_} aria-hidden="true"></span>`}
                    ${t}
                    ${f_&&q`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${t} panel`}
                            onClick=${()=>h(z_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${L_}
                    style=${M_}
                    dangerouslySetInnerHTML=${{__html:v3(S_)}}
                />
                ${!D_&&C_.omitted>0&&q`
                    <button class="agent-thinking-truncation" onClick=${()=>h(z_)}>
                        ▸ ${C_.omitted} more lines
                    </button>
                `}
                ${D_&&C_.omitted>0&&q`
                    <button class="agent-thinking-truncation" onClick=${()=>h(z_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},y_=X?.tool_call?.title,$_=y_?`Awaiting approval: ${y_}`:"Awaiting approval";return q`
        <div class="agent-status-panel">
            ${X&&q`
                <div class="agent-status agent-status-request" aria-live="polite" style=${s?`--turn-color: ${s};`:""}>
                    <span class=${X_} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${$_}</span>
                </div>
            `}
            ${z&&F_({panelTitle:n("Planning"),text:F.text,fullText:F.fullText,totalLines:F.totalLines,panelKey:"plan"})}
            ${k&&F_({panelTitle:n("Thoughts"),text:M.text,fullText:M.fullText,totalLines:M.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${E&&F_({panelTitle:n("Draft"),text:b.text,fullText:b.fullText,totalLines:b.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&q`
                <div class=${`agent-status${__?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${s?`--turn-color: ${s};`:""}>
                    ${s&&q`<span class=${X_} aria-hidden="true"></span>`}
                    ${_?.type==="error"?q`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!__&&q`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${U_}</span>
                </div>
            `}
        </div>
    `}function p3({request:_,onRespond:$}){if(!_)return null;let{request_id:J,tool_call:Y,options:X}=_,Z=Y?.title||"Agent Request",j=Y?.kind||"other",G=Y?.rawInput||{},V=G.command||G.commands&&G.commands[0]||null,W=G.diff||null,Q=G.fileName||G.path||null,D=Y?.description||G.description||G.explanation||null,L=(Array.isArray(Y?.locations)?Y.locations:[]).map((k)=>k?.path).filter((k)=>Boolean(k)),F=Array.from(new Set([Q,...L].filter(Boolean)));console.log("AgentRequestModal:",{request_id:J,tool_call:Y,options:X});let M=async(k)=>{try{await $1(J,k),$()}catch(E){console.error("Failed to respond to agent request:",E)}},b=async()=>{try{await j3(Z,`Auto-approved: ${Z}`),await $1(J,"approved"),$()}catch(k){console.error("Failed to add to whitelist:",k)}},z=X&&X.length>0;return q`
        <div class="agent-request-modal">
            <div class="agent-request-content">
                <div class="agent-request-header">
                    <div class="agent-request-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                    </div>
                    <div class="agent-request-title">${Z}</div>
                </div>
                ${(D||V||W||F.length>0)&&q`
                    <div class="agent-request-body">
                        ${D&&q`
                            <div class="agent-request-description">${D}</div>
                        `}
                        ${F.length>0&&q`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${F.map((k,E)=>q`<li key=${E}>${k}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${V&&q`
                            <pre class="agent-request-command">${V}</pre>
                        `}
                        ${W&&q`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${W}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${z?X.map((k)=>q`
                            <button 
                                key=${k.optionId||k.id||String(k)}
                                class="agent-request-btn ${k.kind==="allow_once"||k.kind==="allow_always"?"primary":""}"
                                onClick=${()=>M(k.optionId||k.id||k)}
                            >
                                ${k.name||k.label||k.optionId||k.id||String(k)}
                            </button>
                        `):q`
                        <button class="agent-request-btn primary" onClick=${()=>M("approved")}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${()=>M("denied")}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${b}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function h3({status:_}){if(_==="connected")return null;return q`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function i3(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let Y=new Date-$,X=Y/1000,Z=86400000;if(Y<Z){if(X<60)return"just now";if(X<3600)return`${Math.floor(X/60)}m`;return`${Math.floor(X/3600)}h`}if(Y<5*Z){let V=$.toLocaleDateString(void 0,{weekday:"short"}),W=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${V} ${W}`}let j=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),G=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${j} ${G}`}function Q2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function b0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function b2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}function l3({src:_,onClose:$}){return m(()=>{let J=(Y)=>{if(Y.key==="Escape")$()};return document.addEventListener("keydown",J),()=>document.removeEventListener("keydown",J)},[$]),q`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function q8({mediaId:_}){let[$,J]=T(null);if(m(()=>{L2(_).then(J).catch(()=>{})},[_]),!$)return null;let Y=$.filename||"file",X=$.metadata?.size,Z=X?b0(X):"";return q`
        <a href=${Z2(_)} download=${Y} class="file-attachment" onClick=${(j)=>j.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${Y}</span>
                ${Z&&q`<span class="file-size">${Z}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function I2({annotations:_}){if(!_)return null;let{audience:$,priority:J,lastModified:Y}=_,X=Y?b2(Y):null;return q`
        <div class="content-annotations">
            ${$&&$.length>0&&q`
                <span class="content-annotation">Audience: ${$.join(", ")}</span>
            `}
            ${typeof J==="number"&&q`
                <span class="content-annotation">Priority: ${J}</span>
            `}
            ${X&&q`
                <span class="content-annotation">Updated: ${X}</span>
            `}
        </div>
    `}function N8({block:_}){let $=_.title||_.name||_.uri,J=_.description,Y=_.size?b0(_.size):"",X=_.mime_type||"",Z=z8(X),j=a0(_.uri);return q`
        <a
            href=${j||"#"}
            class="resource-link"
            target=${j?"_blank":void 0}
            rel=${j?"noopener noreferrer":void 0}
            onClick=${(G)=>G.stopPropagation()}>
            <div class="resource-link-main">
                <div class="resource-link-header">
                    <span class="resource-link-icon-inline">${Z}</span>
                    <div class="resource-link-title">${$}</div>
                </div>
                ${J&&q`<div class="resource-link-description">${J}</div>`}
                <div class="resource-link-meta">
                    ${X&&q`<span>${X}</span>`}
                    ${Y&&q`<span>${Y}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `}function B8({block:_}){let[$,J]=T(!1),Y=_.uri||"Embedded resource",X=_.text||"",Z=Boolean(_.data),j=_.mime_type||"";return q`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(G)=>{G.preventDefault(),G.stopPropagation(),J(!$)}}>
                ${$?"▼":"▶"} ${Y}
            </button>
            ${$&&q`
                ${X&&q`<pre class="resource-embed-content">${X}</pre>`}
                ${Z&&q`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${j&&q`<span class="resource-embed-blob-meta">${j}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(G)=>{G.preventDefault(),G.stopPropagation();let V=new Blob([Uint8Array.from(atob(_.data),(D)=>D.charCodeAt(0))],{type:j||"application/octet-stream"}),W=URL.createObjectURL(V),Q=document.createElement("a");Q.href=W,Q.download=Y.split("/").pop()||"resource",Q.click(),URL.revokeObjectURL(W)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function z8(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function U8({preview:_}){let $=a0(_.url),J=a0(_.image,{allowDataImage:!0}),Y=J?`background-image: url('${J}')`:"",X=_.site_name;if(!X&&$)try{X=new URL($).hostname}catch{X=$}return q`
        <a
            href=${$||"#"}
            class="link-preview ${J?"has-image":""}"
            target=${$?"_blank":void 0}
            rel=${$?"noopener noreferrer":void 0}
            onClick=${(Z)=>Z.stopPropagation()}
            style=${Y}>
            <div class="link-preview-overlay">
                <div class="link-preview-site">${X||""}</div>
                <div class="link-preview-title">${_.title}</div>
                ${_.description&&q`
                    <div class="link-preview-description">${_.description}</div>
                `}
            </div>
        </a>
    `}function H8(_,$){return typeof _==="string"?_:""}function F8(_){if(!_)return{content:_,fileRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Files:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Y=W;break}if(Y===-1)return{content:_,fileRefs:[]};let X=[],Z=Y+1;for(;Z<J.length;Z+=1){let W=J[Z];if(/^\s*-\s+/.test(W))X.push(W.replace(/^\s*-\s+/,"").trim());else if(!W.trim())break;else break}if(X.length===0)return{content:_,fileRefs:[]};let j=J.slice(0,Y),G=J.slice(Z),V=[...j,...G].join(`
`);return V=V.replace(/\n{3,}/g,`

`).trim(),{content:V,fileRefs:X}}function L8(_){if(!_)return{content:_,messageRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Referenced messages:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Y=W;break}if(Y===-1)return{content:_,messageRefs:[]};let X=[],Z=Y+1;for(;Z<J.length;Z+=1){let W=J[Z];if(/^\s*-\s+/.test(W)){let D=W.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(D)X.push(D[1])}else if(!W.trim())break;else break}if(X.length===0)return{content:_,messageRefs:[]};let j=J.slice(0,Y),G=J.slice(Z),V=[...j,...G].join(`
`);return V=V.replace(/\n{3,}/g,`

`).trim(),{content:V,messageRefs:X}}function E8(_){if(!_)return{content:_,attachments:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Images:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Y=W;break}if(Y===-1)return{content:_,attachments:[]};let X=[],Z=Y+1;for(;Z<J.length;Z+=1){let W=J[Z];if(/^\s*-\s+/.test(W)){let Q=W.replace(/^\s*-\s+/,"").trim(),D=Q.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||Q.match(/^attachment:([^\s]+)\s+(.+)$/i);if(D){let H=D[1],L=(D[2]||"").trim()||H;X.push({id:H,label:L,raw:Q})}else X.push({id:null,label:Q,raw:Q})}else if(!W.trim())break;else break}if(X.length===0)return{content:_,attachments:[]};let j=J.slice(0,Y),G=J.slice(Z),V=[...j,...G].join(`
`);return V=V.replace(/\n{3,}/g,`

`).trim(),{content:V,attachments:X}}function D8(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function C8(_,$){if(!_||!$)return _;let J=String($).trim().split(/\s+/).filter(Boolean);if(J.length===0)return _;let Y=J.map(D8).sort((Q,D)=>D.length-Q.length),X=new RegExp(`(${Y.join("|")})`,"gi"),Z=new RegExp(`^(${Y.join("|")})$`,"i"),j=new DOMParser().parseFromString(_,"text/html"),G=j.createTreeWalker(j.body,NodeFilter.SHOW_TEXT),V=[],W;while(W=G.nextNode())V.push(W);for(let Q of V){let D=Q.nodeValue;if(!D||!X.test(D)){X.lastIndex=0;continue}X.lastIndex=0;let H=Q.parentElement;if(H&&H.closest("code, pre, script, style"))continue;let L=D.split(X).filter((M)=>M!=="");if(L.length===0)continue;let F=j.createDocumentFragment();for(let M of L)if(Z.test(M)){let b=j.createElement("mark");b.className="search-highlight-term",b.textContent=M,F.appendChild(b)}else F.appendChild(j.createTextNode(M));Q.parentNode.replaceChild(F,Q)}return j.body.innerHTML}function o3({post:_,onClick:$,onHashtagClick:J,onMessageRef:Y,agentName:X,agentAvatarUrl:Z,userName:j,userAvatarUrl:G,userAvatarBackground:V,onDelete:W,isThreadReply:Q,isRemoving:D,highlightQuery:H}){let[L,F]=T(null),M=w(null),b=_.data,z=b.type==="agent_response",k=j||"You",E=z?X||R3:k,A=z?V1(X,Z):V1(k,G),R=typeof V==="string"?V.trim().toLowerCase():"",h=!z&&A.image&&(R==="clear"||R==="transparent"),p=z&&Boolean(A.image),s=`background-color: ${h||p?"transparent":A.color}`,X_=b.content_meta,n=Boolean(X_?.truncated),__=Boolean(X_?.preview),U_=n&&!__,e=n?{originalLength:Number.isFinite(X_?.original_length)?X_.original_length:b.content?b.content.length:0,maxLength:Number.isFinite(X_?.max_length)?X_.max_length:0}:null,G_=H8(b.content,b.link_previews),{content:F_,fileRefs:y_}=F8(G_),{content:$_,messageRefs:t}=L8(F_),{content:V_,attachments:J_}=E8($_);G_=V_;let O_=Boolean(G_)&&!U_,K_=typeof H==="string"?H.trim():"",A_=P0(()=>{if(!G_)return"";let I=t0(G_,J);return K_?C8(I,K_):I},[G_,K_]),z_=(I,l)=>{I.stopPropagation(),F(Z2(l))},D_=(I)=>{I.stopPropagation(),W?.(_)},S_=(I,l)=>{let m_=new Set;if(!I||l.length===0)return{content:I,usedIds:m_};return{content:I.replace(/attachment:([^\s)"']+)/g,(t_,I0,z0,U0)=>{let d_=I0.replace(/^\/+/,""),X0=l.find((x_)=>x_.name&&x_.name.toLowerCase()===d_.toLowerCase()&&!m_.has(x_.id))||l.find((x_)=>!m_.has(x_.id));if(!X0)return t_;if(m_.add(X0.id),U0.slice(Math.max(0,z0-2),z0)==="](")return`/media/${X0.id}`;return X0.name||"attachment"}),usedIds:m_}},N_=[],f_=[],C_=[],L_=[],M_=[],B0=[],u_=b.content_blocks||[],k_=b.media_ids||[],i_=0;if(u_.length>0)u_.forEach((I)=>{if(I?.type==="text"&&I.annotations)B0.push(I.annotations);if(I?.type==="resource_link")L_.push(I);else if(I?.type==="resource")M_.push(I);else if(I?.type==="file"){let l=k_[i_++];if(l)f_.push(l),C_.push({id:l,name:I?.name||I?.filename||I?.title})}else if(I?.type==="image"||!I?.type){let l=k_[i_++];if(l)N_.push({id:l,annotations:I?.annotations}),C_.push({id:l,name:I?.name||I?.filename||I?.title})}});else if(k_.length>0)k_.forEach((I)=>{N_.push({id:I,annotations:null}),C_.push({id:I,name:null})});if(J_.length>0)J_.forEach((I)=>{if(!I?.id)return;let l=C_.find((m_)=>String(m_.id)===String(I.id));if(l&&!l.name)l.name=I.label});let{content:C0,usedIds:c_}=S_(G_,C_);G_=C0;let Y0=N_.filter(({id:I})=>!c_.has(I)),Z0=f_.filter((I)=>!c_.has(I)),B_=J_.length>0?J_.map((I,l)=>({id:I.id||`attachment-${l+1}`,label:I.label||`attachment-${l+1}`})):C_.map((I,l)=>({id:I.id,label:I.name||`attachment-${l+1}`}));return m(()=>{if(M.current)P2(M.current)},[G_]),q`
        <div id=${`post-${_.id}`} class="post ${z?"agent-post":""} ${Q?"thread-reply":""} ${D?"removing":""}" onClick=${$}>
            <div class="post-avatar ${z?"agent-avatar":""} ${A.image?"has-image":""}" style=${s}>
                ${A.image?q`<img src=${A.image} alt=${E} />`:A.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${D_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${E}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(I)=>{if(I.preventDefault(),I.stopPropagation(),Y)Y(_.id)}}>${i3(_.timestamp)}</a>
                </div>
                ${U_&&e&&q`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${Q2(e.originalLength)} chars
                            ${e.maxLength?q` • Display limit: ${Q2(e.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${__&&e&&q`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${Q2(e.maxLength)} of ${Q2(e.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(y_.length>0||t.length>0||B_.length>0)&&q`
                    <div class="post-file-refs">
                        ${t.map((I)=>{return q`
                                <a href=${`#msg-${I}`} class="post-msg-pill-link" onClick=${(l)=>{l.stopPropagation()}}>
                                    <${R0}
                                        prefix="post"
                                        label=${"msg:"+I}
                                        title=${"Message "+I}
                                        icon="message"
                                    />
                                </a>
                            `})}
                        ${y_.map((I)=>{let l=I.split("/").pop()||I;return q`
                                <${R0}
                                    prefix="post"
                                    label=${l}
                                    title=${I}
                                />
                            `})}
                        ${B_.map((I)=>q`
                            <${R0}
                                prefix="post"
                                label=${I.label}
                                title=${I.label}
                            />
                        `)}
                    </div>
                `}
                ${O_&&q`
                    <div 
                        ref=${M}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:A_}}
                        onClick=${(I)=>{if(I.target.classList.contains("hashtag")){I.preventDefault(),I.stopPropagation();let l=I.target.dataset.hashtag;if(l)J?.(l)}else if(I.target.tagName==="IMG")I.preventDefault(),I.stopPropagation(),F(I.target.src)}}
                    />
                `}
                ${B0.length>0&&q`
                    ${B0.map((I,l)=>q`
                        <${I2} key=${l} annotations=${I} />
                    `)}
                `}
                ${Y0.length>0&&q`
                    <div class="media-preview">
                        ${Y0.map(({id:I})=>q`
                            <img 
                                key=${I} 
                                src=${V3(I)} 
                                alt="Media" 
                                loading="lazy"
                                onClick=${(l)=>z_(l,I)}
                            />
                        `)}
                    </div>
                `}
                ${Y0.length>0&&q`
                    ${Y0.map(({annotations:I},l)=>q`
                        ${I&&q`<${I2} key=${l} annotations=${I} />`}
                    `)}
                `}
                ${Z0.length>0&&q`
                    <div class="file-attachments">
                        ${Z0.map((I)=>q`
                            <${q8} key=${I} mediaId=${I} />
                        `)}
                    </div>
                `}
                ${L_.length>0&&q`
                    <div class="resource-links">
                        ${L_.map((I,l)=>q`
                            <div key=${l}>
                                <${N8} block=${I} />
                                <${I2} annotations=${I.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${M_.length>0&&q`
                    <div class="resource-embeds">
                        ${M_.map((I,l)=>q`
                            <div key=${l}>
                                <${B8} block=${I} />
                                <${I2} annotations=${I.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${b.link_previews?.length>0&&q`
                    <div class="link-previews">
                        ${b.link_previews.map((I,l)=>q`
                            <${U8} key=${l} preview=${I} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${L&&q`<${l3} src=${L} onClose=${()=>F(null)} />`}
    `}function n3({posts:_,hasMore:$,onLoadMore:J,onPostClick:Y,onHashtagClick:X,onMessageRef:Z,emptyMessage:j,timelineRef:G,agents:V,user:W,onDeletePost:Q,reverse:D=!0,removingPostIds:H,searchQuery:L}){let[F,M]=T(!1),b=w(null),z=typeof IntersectionObserver<"u",k=S(async()=>{if(!J||!$||F)return;M(!0);try{await J({preserveScroll:!0,preserveMode:"top"})}finally{M(!1)}},[$,F,J]),E=S((h)=>{let{scrollTop:p,scrollHeight:s,clientHeight:X_}=h.target,n=D?s-X_-p:p,__=Math.max(300,X_);if(n<__)k()},[D,k]);if(m(()=>{if(!z)return;let h=b.current,p=G?.current;if(!h||!p)return;let s=300,X_=new IntersectionObserver((n)=>{for(let __ of n){if(!__.isIntersecting)continue;k()}},{root:p,rootMargin:`${s}px 0px ${s}px 0px`,threshold:0});return X_.observe(h),()=>X_.disconnect()},[z,$,J,G,k]),m(()=>{if(z)return;if(!G?.current)return;let{scrollTop:h,scrollHeight:p,clientHeight:s}=G.current,X_=D?p-s-h:h,n=Math.max(300,s);if(X_<n)k()},[z,_,$,D,G,k]),m(()=>{if(!G?.current)return;if(!$||F)return;let{scrollTop:h,scrollHeight:p,clientHeight:s}=G.current,X_=D?p-s-h:h,n=Math.max(300,s);if(p<=s+1||X_<n)k()},[_,$,F,D,G,k]),!_)return q`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return q`
            <div class="timeline" ref=${G}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${j||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let A=_.slice().sort((h,p)=>h.id-p.id),R=q`<div class="timeline-sentinel" ref=${b}></div>`;return q`
        <div class="timeline ${D?"reverse":"normal"}" ref=${G} onScroll=${E}>
            <div class="timeline-content">
                ${D?R:null}
                ${A.map((h)=>{let p=Boolean(h.data?.thread_id&&h.data.thread_id!==h.id),s=H?.has?.(h.id);return q`
                    <${o3}
                        key=${h.id}
                        post=${h}
                        isThreadReply=${p}
                        isRemoving=${s}
                        highlightQuery=${L}
                        agentName=${u3(h.data?.agent_id,V||{})}
                        agentAvatarUrl=${m3(h.data?.agent_id,V||{})}
                        userName=${W?.name||W?.user_name}
                        userAvatarUrl=${W?.avatar_url||W?.avatarUrl||W?.avatar}
                        userAvatarBackground=${W?.avatar_background||W?.avatarBackground}
                        onClick=${()=>Y?.(h)}
                        onHashtagClick=${X}
                        onMessageRef=${Z}
                        onDelete=${Q}
                    />
                `})}
                ${D?null:R}
            </div>
        </div>
    `}var y8=16,k8=60000,a3=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function A8(_,$){let J=String(_||"").trim();if(!J)return J;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(J)||J.startsWith("#")||J.startsWith("data:")||J.startsWith("blob:"))return J;let Y=J.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),X=Y?.[1]||J,Z=Y?.[2]||"",j=Y?.[3]||"",G=String($||"").split("/").slice(0,-1).join("/"),W=X.startsWith("/")?X:`${G?`${G}/`:""}${X}`,Q=[];for(let H of W.split("/")){if(!H||H===".")continue;if(H===".."){if(Q.length>0)Q.pop();continue}Q.push(H)}let D=Q.join("/");return`${Y1(D)}${Z}${j}`}function t3(_,$,J,Y=0,X=[]){if(!J&&a3(_))return X;if(!_)return X;if(X.push({node:_,depth:Y}),_.type==="dir"&&_.children&&$.has(_.path))for(let Z of _.children)t3(Z,$,J,Y+1,X);return X}function d3(_,$,J){if(!_)return"";let Y=[],X=(Z)=>{if(!J&&a3(Z))return;if(Y.push(Z.type==="dir"?`d:${Z.path}`:`f:${Z.path}`),Z.children&&$?.has(Z.path))for(let j of Z.children)X(j)};return X(_),Y.join("|")}function N1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let J=Array.isArray(_.children)?_.children:null,Y=Array.isArray($.children)?$.children:null;if(!Y)return _;let X=J?new Map(J.map((G)=>[G?.path,G])):new Map,Z=!J||J.length!==Y.length,j=Y.map((G)=>{let V=N1(X.get(G.path),G);if(V!==X.get(G.path))Z=!0;return V});return Z?{...$,children:j}:_}function O1(_,$,J){if(!_)return _;if(_.path===$)return N1(_,J);if(!Array.isArray(_.children))return _;let Y=!1,X=_.children.map((Z)=>{let j=O1(Z,$,J);if(j!==Z)Y=!0;return j});return Y?{..._,children:X}:_}var e3=4,W1=14,w8=8,M8=16;function _4(_){if(!_)return 0;if(_.type==="file"){let Y=Math.max(0,Number(_.size)||0);return _.__bytes=Y,Y}let $=Array.isArray(_.children)?_.children:[],J=0;for(let Y of $)J+=_4(Y);return _.__bytes=J,J}function $4(_,$=0){let J=Math.max(0,Number(_?.__bytes??_?.size??0)),Y={name:_?.name||_?.path||".",path:_?.path||".",size:J,children:[]};if(!_||_.type!=="dir"||$>=e3)return Y;let X=Array.isArray(_.children)?_.children:[],Z=[];for(let G of X){let V=Math.max(0,Number(G?.__bytes??G?.size??0));if(V<=0)continue;if(G.type==="dir")Z.push({kind:"dir",node:G,size:V});else Z.push({kind:"file",name:G.name,path:G.path,size:V})}Z.sort((G,V)=>V.size-G.size);let j=Z;if(Z.length>W1){let G=Z.slice(0,W1-1),V=Z.slice(W1-1),W=V.reduce((Q,D)=>Q+D.size,0);G.push({kind:"other",name:`+${V.length} more`,path:`${Y.path}/[other]`,size:W}),j=G}return Y.children=j.map((G)=>{if(G.kind==="dir")return $4(G.node,$+1);return{name:G.name,path:G.path,size:G.size,children:[]}}),Y}function r3(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,J=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(J==="dark")return!0;if(J==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function J4(_,$,J){let Y=((_+Math.PI/2)*180/Math.PI+360)%360,X=J?Math.max(30,70-$*10):Math.max(34,66-$*8),Z=J?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${Y.toFixed(1)} ${X}% ${Z}%)`}function S2(_,$,J,Y){return{x:_+J*Math.cos(Y),y:$+J*Math.sin(Y)}}function B1(_,$,J,Y,X,Z){let j=Math.PI*2-0.0001,G=Z-X>j?X+j:Z,V=S2(_,$,Y,X),W=S2(_,$,Y,G),Q=S2(_,$,J,G),D=S2(_,$,J,X),H=G-X>Math.PI?1:0;return[`M ${V.x.toFixed(3)} ${V.y.toFixed(3)}`,`A ${Y} ${Y} 0 ${H} 1 ${W.x.toFixed(3)} ${W.y.toFixed(3)}`,`L ${Q.x.toFixed(3)} ${Q.y.toFixed(3)}`,`A ${J} ${J} 0 ${H} 0 ${D.x.toFixed(3)} ${D.y.toFixed(3)}`,"Z"].join(" ")}var Y4={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function Z4(_,$,J){let Y=[],X=[],Z=Math.max(0,Number($)||0),j=(G,V,W,Q)=>{let D=Array.isArray(G?.children)?G.children:[];if(!D.length)return;let H=Math.max(0,Number(G.size)||0);if(H<=0)return;let L=W-V,F=V;D.forEach((M,b)=>{let z=Math.max(0,Number(M.size)||0);if(z<=0)return;let k=z/H,E=F,A=b===D.length-1?W:F+L*k;if(F=A,A-E<0.003)return;let R=Y4[Q];if(R){let h=J4(E,Q,J);if(Y.push({key:M.path,path:M.path,label:M.name,size:z,color:h,depth:Q,startAngle:E,endAngle:A,innerRadius:R[0],outerRadius:R[1],d:B1(120,120,R[0],R[1],E,A)}),Q===1)X.push({key:M.path,name:M.name,size:z,pct:Z>0?z/Z*100:0,color:h})}if(Q<e3)j(M,E,A,Q+1)})};return j(_,-Math.PI/2,Math.PI*3/2,1),{segments:Y,legend:X}}function q1(_,$){if(!_||!$)return null;if(_.path===$)return _;let J=Array.isArray(_.children)?_.children:[];for(let Y of J){let X=q1(Y,$);if(X)return X}return null}function X4(_,$,J,Y){if(!J||J<=0)return{segments:[],legend:[]};let X=Y4[1];if(!X)return{segments:[],legend:[]};let Z=-Math.PI/2,j=Math.PI*3/2,G=J4(Z,1,Y),W=`${$||"."}/[files]`;return{segments:[{key:W,path:W,label:_,size:J,color:G,depth:1,startAngle:Z,endAngle:j,innerRadius:X[0],outerRadius:X[1],d:B1(120,120,X[0],X[1],Z,j)}],legend:[{key:W,name:_,size:J,pct:100,color:G}]}}function s3(_,$=!1,J=!1){if(!_)return null;let Y=_4(_),X=$4(_,0),Z=X.size||Y,{segments:j,legend:G}=Z4(X,Z,J);if(!j.length&&Z>0){let V=X4("[files]",X.path,Z,J);j=V.segments,G=V.legend}return{root:X,totalSize:Z,segments:j,legend:G,truncated:$,isDarkTheme:J}}function P8({payload:_}){if(!_)return null;let[$,J]=T(null),[Y,X]=T(_?.root?.path||"."),[Z,j]=T(()=>[_?.root?.path||"."]),[G,V]=T(!1);m(()=>{let n=_?.root?.path||".";X(n),j([n]),J(null)},[_?.root?.path,_?.totalSize]),m(()=>{if(!Y)return;V(!0);let n=setTimeout(()=>V(!1),180);return()=>clearTimeout(n)},[Y]);let W=P0(()=>{return q1(_.root,Y)||_.root},[_?.root,Y]),Q=W?.size||_.totalSize||0,{segments:D,legend:H}=P0(()=>{let n=Z4(W,Q,_.isDarkTheme);if(n.segments.length>0)return n;if(Q<=0)return n;let __=W?.children?.length?"Total":"[files]";return X4(__,W?.path||_?.root?.path||".",Q,_.isDarkTheme)},[W,Q,_.isDarkTheme,_?.root?.path]),[L,F]=T(D),M=w(new Map),b=w(0);m(()=>{let n=M.current,__=new Map(D.map((F_)=>[F_.key,F_])),U_=performance.now(),e=220,G_=(F_)=>{let y_=Math.min(1,(F_-U_)/220),$_=y_*(2-y_),t=D.map((V_)=>{let O_=n.get(V_.key)||{startAngle:V_.startAngle,endAngle:V_.startAngle,innerRadius:V_.innerRadius,outerRadius:V_.innerRadius},K_=(N_,f_)=>N_+(f_-N_)*$_,A_=K_(O_.startAngle,V_.startAngle),z_=K_(O_.endAngle,V_.endAngle),D_=K_(O_.innerRadius,V_.innerRadius),S_=K_(O_.outerRadius,V_.outerRadius);return{...V_,d:B1(120,120,D_,S_,A_,z_)}});if(F(t),y_<1)b.current=requestAnimationFrame(G_)};if(b.current)cancelAnimationFrame(b.current);return b.current=requestAnimationFrame(G_),M.current=__,()=>{if(b.current)cancelAnimationFrame(b.current)}},[D]);let z=L.length?L:D,k=Q>0?b0(Q):"0 B",E=W?.name||"",R=(E&&E!=="."?E:"Total")||"Total",h=k,p=Z.length>1,s=(n)=>{if(!n?.path)return;let __=q1(_.root,n.path);if(!__||!Array.isArray(__.children)||__.children.length===0)return;j((U_)=>[...U_,__.path]),X(__.path),J(null)},X_=()=>{if(!p)return;j((n)=>{let __=n.slice(0,-1);return X(__[__.length-1]||_?.root?.path||"."),__}),J(null)};return q`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${G?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${W?.path||_?.root?.path||"."}`}
                data-segments=${z.length}
                data-base-size=${Q}>
                ${z.map((n)=>q`
                    <path
                        key=${n.key}
                        d=${n.d}
                        fill=${n.color}
                        stroke="var(--bg-primary)"
                        stroke-width="1"
                        class=${`workspace-folder-starburst-segment${$?.key===n.key?" is-hovered":""}`}
                        onMouseEnter=${()=>J(n)}
                        onMouseLeave=${()=>J(null)}
                        onTouchStart=${()=>J(n)}
                        onTouchEnd=${()=>J(null)}
                        onClick=${()=>s(n)}
                    >
                        <title>${n.label} — ${b0(n.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${p?" is-drill":""}`}
                    onClick=${X_}
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
                    <text x="120" y="114" text-anchor="middle" class="workspace-folder-starburst-total-label">${R}</text>
                    <text x="120" y="130" text-anchor="middle" class="workspace-folder-starburst-total-value">${h}</text>
                </g>
            </svg>
            ${H.length>0&&q`
                <div class="workspace-folder-starburst-legend">
                    ${H.slice(0,8).map((n)=>q`
                        <div key=${n.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${n.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${n.name}>${n.name}</span>
                            <span class="workspace-folder-starburst-size">${b0(n.size)}</span>
                            <span class="workspace-folder-starburst-pct">${n.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&q`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function b8({mediaId:_}){let[$,J]=T(null);if(m(()=>{if(!_)return;L2(_).then(J).catch(()=>{})},[_]),!$)return null;let Y=$.filename||"file",X=$.metadata?.size?b0($.metadata.size):"";return q`
        <a href=${Z2(_)} download=${Y} class="file-attachment"
            onClick=${(Z)=>Z.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${Y}</span>
                ${X&&q`<span class="file-size">${X}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function Q4({onFileSelect:_,visible:$=!0,active:J=void 0,onOpenEditor:Y}){let[X,Z]=T(null),[j,G]=T(new Set(["."])),[V,W]=T(null),[Q,D]=T(null),[H,L]=T(""),[F,M]=T(null),[b,z]=T(null),[k,E]=T(!0),[A,R]=T(!1),[h,p]=T(null),[s,X_]=T(()=>d0("workspaceShowHidden",!1)),[n,__]=T(!1),[U_,e]=T(null),[G_,F_]=T(null),[y_,$_]=T(null),[t,V_]=T(!1),[J_,O_]=T(null),[K_,A_]=T(()=>r3()),z_=w(j),D_=w(""),S_=w(null),N_=w(0),f_=w(new Set),C_=w(null),L_=w(new Map),M_=w(_),B0=w(Y),u_=w(null),k_=w(null),i_=w(null),C0=w(null),c_=w(null),Y0=w(null),Z0=w("."),B_=w(null),I=w({path:null,dragging:!1,startX:0,startY:0}),l=w({path:null,dragging:!1,startX:0,startY:0}),m_=w({path:null,timer:0}),y0=w(!1),t_=w(0),I0=w(new Map),z0=w(null),U0=w(null),d_=w(s),H0=w($),X0=w(J??$),Q0=w(0),x_=w(y_),r_=w(n),S0=w(U_),F0=w(null),q0=w({x:0,y:0}),_0=w(0),k0=w(null),$0=w(V),l_=w(Q),j0=w(F);M_.current=_,B0.current=Y,m(()=>{z_.current=j},[j]),m(()=>{d_.current=s},[s]),m(()=>{H0.current=$},[$]),m(()=>{X0.current=J??$},[J,$]),m(()=>{x_.current=y_},[y_]),m(()=>{let K=(B)=>{let y=B?.detail?.path;if(!y)return;let C=y.split("/"),v=[];for(let c=1;c<C.length;c++)v.push(C.slice(0,c).join("/"));if(v.length)G((c)=>{let a=new Set(c);a.add(".");for(let r of v)a.add(r);return a});W(y),requestAnimationFrame(()=>{let c=document.querySelector(`[data-path="${CSS.escape(y)}"]`);if(c)c.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",K),()=>window.removeEventListener("workspace-reveal-path",K)},[]),m(()=>{r_.current=n},[n]),m(()=>{S0.current=U_},[U_]),m(()=>{$0.current=V},[V]),m(()=>{l_.current=Q},[Q]),m(()=>{j0.current=F},[F]),m(()=>{if(typeof window>"u"||typeof document>"u")return;let K=()=>A_(r3());K();let B=window.matchMedia?.("(prefers-color-scheme: dark)"),y=()=>K();if(B?.addEventListener)B.addEventListener("change",y);else if(B?.addListener)B.addListener(y);let C=typeof MutationObserver<"u"?new MutationObserver(()=>K()):null;if(C?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)C?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(B?.removeEventListener)B.removeEventListener("change",y);else if(B?.removeListener)B.removeListener(y);C?.disconnect()}},[]),m(()=>{if(!Q)return;let K=c_.current;if(!K)return;let B=requestAnimationFrame(()=>{try{K.focus(),K.select()}catch{}});return()=>cancelAnimationFrame(B)},[Q]);let A0=async(K)=>{R(!0),M(null),z(null);try{let B=await W3(K,20000);M(B)}catch(B){M({error:B.message||"Failed to load preview"})}finally{R(!1)}};u_.current=A0;let w0=async()=>{if(!H0.current)return;try{let K=await E2("",1,d_.current),B=d3(K.root,z_.current,d_.current);if(B===D_.current){E(!1);return}if(D_.current=B,S_.current=K.root,!N_.current)N_.current=requestAnimationFrame(()=>{N_.current=0,Z((y)=>N1(y,S_.current)),E(!1)})}catch(K){p(K.message||"Failed to load workspace"),E(!1)}},x0=async(K)=>{if(!K)return;if(f_.current.has(K))return;f_.current.add(K);try{let B=await E2(K,1,d_.current);Z((y)=>O1(y,K,B.root))}catch(B){p(B.message||"Failed to load workspace")}finally{f_.current.delete(K)}};k_.current=x0;let P_=S(()=>{let K=V;if(!K)return".";let B=L_.current?.get(K);if(B&&B.type==="dir")return B.path;if(K==="."||!K.includes("/"))return".";let y=K.split("/");return y.pop(),y.join("/")||"."},[V]),K0=S((K)=>{let B=K?.closest?.(".workspace-row");if(!B)return null;let y=B.dataset.path,C=B.dataset.type;if(!y)return null;if(C==="dir")return y;if(y.includes("/")){let v=y.split("/");return v.pop(),v.join("/")||"."}return"."},[]),s_=S((K)=>{return K0(K?.target||null)},[K0]),v_=S((K)=>{x_.current=K,$_(K)},[]),g_=S(()=>{let K=m_.current;if(K?.timer)clearTimeout(K.timer);m_.current={path:null,timer:0}},[]),a_=S((K)=>{if(!K||K==="."){g_();return}let B=L_.current?.get(K);if(!B||B.type!=="dir"){g_();return}if(z_.current?.has(K)){g_();return}if(m_.current?.path===K)return;g_();let y=setTimeout(()=>{m_.current={path:null,timer:0},k_.current?.(K),G((C)=>{let v=new Set(C);return v.add(K),v})},600);m_.current={path:K,timer:y}},[g_]),G0=S((K,B)=>{if(q0.current={x:K,y:B},_0.current)return;_0.current=requestAnimationFrame(()=>{_0.current=0;let y=F0.current;if(!y)return;let C=q0.current;y.style.transform=`translate(${C.x+12}px, ${C.y+12}px)`})},[]),L0=S((K)=>{if(!K)return;let y=(L_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!y)return;F_({path:K,label:y})},[]),M0=S(()=>{if(F_(null),_0.current)cancelAnimationFrame(_0.current),_0.current=0;if(F0.current)F0.current.style.transform="translate(-9999px, -9999px)"},[]),c0=S((K)=>{if(!K)return".";let B=L_.current?.get(K);if(B&&B.type==="dir")return B.path;if(K==="."||!K.includes("/"))return".";let y=K.split("/");return y.pop(),y.join("/")||"."},[]),U=S(()=>{D(null),L("")},[]),x=S((K)=>{if(!K)return;let y=(L_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!y||K===".")return;D(K),L(y)},[]),d=S(async()=>{let K=l_.current;if(!K)return;let B=(H||"").trim();if(!B){U();return}let y=L_.current?.get(K),C=(y?.name||K.split("/").pop()||K).trim();if(B===C){U();return}try{let c=(await N3(K,B))?.path||K,a=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(U(),p(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:K,newPath:c,type:y?.type||"file"}})),y?.type==="dir")G((r)=>{let o=new Set;for(let Y_ of r)if(Y_===K)o.add(c);else if(Y_.startsWith(`${K}/`))o.add(`${c}${Y_.slice(K.length)}`);else o.add(Y_);return o});if(W(c),y?.type==="dir")M(null),R(!1),z(null);else u_.current?.(c);k_.current?.(a)}catch(v){p(v?.message||"Failed to rename file")}},[U,H]),Q_=S(async(K)=>{let C=K||".";for(let v=0;v<50;v+=1){let a=`untitled${v===0?"":`-${v}`}.md`;try{let o=(await q3(C,a,""))?.path||(C==="."?a:`${C}/${a}`);if(C&&C!==".")G((Y_)=>new Set([...Y_,C]));W(o),p(null),k_.current?.(C),u_.current?.(o);return}catch(r){if(r?.status===409||r?.code==="file_exists")continue;p(r?.message||"Failed to create file");return}}p("Failed to create file (untitled name already in use).")},[]),j_=S((K)=>{if(K?.stopPropagation?.(),t)return;let B=c0($0.current);Q_(B)},[t,c0,Q_]);m(()=>{if(typeof window>"u")return;let K=(B)=>{let y=B?.detail?.updates||[];if(!Array.isArray(y)||y.length===0)return;Z((r)=>{let o=r;for(let Y_ of y){if(!Y_?.root)continue;if(!o||Y_.path==="."||!Y_.path)o=Y_.root;else o=O1(o,Y_.path,Y_.root)}if(o)D_.current=d3(o,z_.current,d_.current);return E(!1),o});let C=$0.current;if(Boolean(C)&&y.some((r)=>{let o=r?.path||"";if(!o||o===".")return!0;return C===o||C.startsWith(`${o}/`)||o.startsWith(`${C}/`)}))I0.current.clear();if(!C||!j0.current)return;let c=L_.current?.get(C);if(c&&c.type==="dir")return;if(y.some((r)=>{let o=r?.path||"";if(!o||o===".")return!0;return C===o||C.startsWith(`${o}/`)}))u_.current?.(C)};return window.addEventListener("workspace-update",K),()=>window.removeEventListener("workspace-update",K)},[]),C_.current=w0;let E_=w(()=>{if(typeof window>"u")return;let K=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),B=X0.current??H0.current,y=document.visibilityState!=="hidden"&&(B||K.matches&&H0.current);D2(y,d_.current).catch(()=>{})}).current,q_=w(0),e_=w(()=>{if(q_.current)clearTimeout(q_.current);q_.current=setTimeout(()=>{q_.current=0,E_()},250)}).current;m(()=>{if(H0.current)C_.current?.();e_()},[$,J]),m(()=>{C_.current(),E_();let K=setInterval(()=>C_.current(),k8),B=r0("previewHeight",null),y=Number.isFinite(B)?Math.min(Math.max(B,80),600):280;if(t_.current=y,i_.current)i_.current.style.setProperty("--preview-height",`${y}px`);let C=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),v=()=>e_();if(C.addEventListener)C.addEventListener("change",v);else if(C.addListener)C.addListener(v);return document.addEventListener("visibilitychange",v),()=>{if(clearInterval(K),N_.current)cancelAnimationFrame(N_.current),N_.current=0;if(C.removeEventListener)C.removeEventListener("change",v);else if(C.removeListener)C.removeListener(v);if(document.removeEventListener("visibilitychange",v),q_.current)clearTimeout(q_.current),q_.current=0;if(B_.current)clearTimeout(B_.current),B_.current=null;D2(!1,d_.current).catch(()=>{})}},[]);let T_=P0(()=>t3(X,j,s),[X,j,s]),p_=P0(()=>new Map(T_.map((K)=>[K.node.path,K.node])),[T_]);L_.current=p_;let b_=(V?L_.current.get(V):null)?.type==="dir";m(()=>{if(!V||!b_){O_(null),z0.current=null,U0.current=null;return}let K=V,B=`${s?"hidden":"visible"}:${V}`,y=I0.current,C=y.get(B);if(C?.root){y.delete(B),y.set(B,C);let a=s3(C.root,Boolean(C.truncated),K_);if(a)z0.current=a,U0.current=V,O_({loading:!1,error:null,payload:a});return}let v=z0.current,c=U0.current;O_({loading:!0,error:null,payload:c===V?v:null}),E2(V,w8,s).then((a)=>{if($0.current!==K)return;let r={root:a?.root,truncated:Boolean(a?.truncated)};y.delete(B),y.set(B,r);while(y.size>M8){let Y_=y.keys().next().value;if(!Y_)break;y.delete(Y_)}let o=s3(r.root,r.truncated,K_);z0.current=o,U0.current=V,O_({loading:!1,error:null,payload:o})}).catch((a)=>{if($0.current!==K)return;O_({loading:!1,error:a?.message||"Failed to load folder size chart",payload:c===V?v:null})})},[V,b_,s,K_]);let E0=Boolean(F&&F.kind==="text"&&!b_&&(!F.size||F.size<=262144)),u0=E0?"Open in editor":F?.size>262144?"File too large to edit":"File is not editable",K2=(K)=>{let B=K?.target;if(B instanceof Element)return B;return B?.parentElement||null},m0=w((K)=>{if(y0.current){y0.current=!1;return}let B=K2(K),y=B?.closest?.("[data-path]");if(C0.current?.focus?.(),!y)return;let C=y.dataset.path,v=y.dataset.type,c=Boolean(B?.closest?.(".workspace-caret")),a=Boolean(B?.closest?.("button"))||Boolean(B?.closest?.("a"))||Boolean(B?.closest?.("input")),r=$0.current===C,o=l_.current;if(o){if(o===C)return;U()}if(r&&!c&&!a&&C!=="."){x(C);return}if(v==="dir"){if(W(C),M(null),z(null),R(!1),!z_.current.has(C))k_.current?.(C);if(r&&!c)return;G((h_)=>{let o_=new Set(h_);if(o_.has(C))o_.delete(C);else o_.add(C);return o_})}else{W(C);let Y_=L_.current.get(C);if(Y_)M_.current?.(Y_.path,Y_);u_.current?.(C)}}).current,T0=w(()=>{D_.current="",C_.current(),Array.from(z_.current||[]).filter((B)=>B&&B!==".").forEach((B)=>k_.current?.(B))}).current,R_=w(()=>{W(null),M(null),z(null),R(!1)}).current,f2=w(()=>{X_((K)=>{let B=!K;if(typeof window<"u")I_("workspaceShowHidden",String(B));return d_.current=B,D2(!0,B).catch(()=>{}),D_.current="",C_.current?.(),Array.from(z_.current||[]).filter((C)=>C&&C!==".").forEach((C)=>k_.current?.(C)),B})}).current,v2=w((K)=>{if(K2(K)?.closest?.("[data-path]"))return;R_()}).current,f0=S(async(K)=>{if(!K)return;let B=K.split("/").pop()||K;if(!window.confirm(`Delete "${B}"? This cannot be undone.`))return;try{await z3(K);let C=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if($0.current===K)R_();k_.current?.(C),p(null)}catch(C){M((v)=>({...v||{},error:C.message||"Failed to delete file"}))}},[R_]),V0=S((K)=>{let B=C0.current;if(!B||!K||typeof CSS>"u"||typeof CSS.escape!=="function")return;B.querySelector(`[data-path="${CSS.escape(K)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),D0=S((K)=>{let B=T_;if(!B||B.length===0)return;let y=V?B.findIndex((C)=>C.node.path===V):-1;if(K.key==="ArrowDown"){K.preventDefault();let C=Math.min(y+1,B.length-1),v=B[C];if(!v)return;if(W(v.node.path),v.node.type!=="dir")M_.current?.(v.node.path,v.node),u_.current?.(v.node.path);else M(null),R(!1),z(null);V0(v.node.path);return}if(K.key==="ArrowUp"){K.preventDefault();let C=y<=0?0:y-1,v=B[C];if(!v)return;if(W(v.node.path),v.node.type!=="dir")M_.current?.(v.node.path,v.node),u_.current?.(v.node.path);else M(null),R(!1),z(null);V0(v.node.path);return}if(K.key==="ArrowRight"&&y>=0){let C=B[y];if(C?.node?.type==="dir"&&!j.has(C.node.path))K.preventDefault(),k_.current?.(C.node.path),G((v)=>new Set([...v,C.node.path]));return}if(K.key==="ArrowLeft"&&y>=0){let C=B[y];if(C?.node?.type==="dir"&&j.has(C.node.path))K.preventDefault(),G((v)=>{let c=new Set(v);return c.delete(C.node.path),c});return}if(K.key==="Enter"&&y>=0){K.preventDefault();let C=B[y];if(!C)return;let v=C.node.path;if(C.node.type==="dir"){if(!z_.current.has(v))k_.current?.(v);G((a)=>{let r=new Set(a);if(r.has(v))r.delete(v);else r.add(v);return r}),M(null),z(null),R(!1)}else M_.current?.(v,C.node),u_.current?.(v);return}if((K.key==="Delete"||K.key==="Backspace")&&y>=0){let C=B[y];if(!C||C.node.type==="dir")return;K.preventDefault(),f0(C.node.path);return}if(K.key==="Escape")K.preventDefault(),R_()},[R_,f0,j,T_,V0,V]),R2=S((K)=>{let B=K?.target?.closest?.(".workspace-row");if(!B)return;let y=B.dataset.type,C=B.dataset.path;if(!C||C===".")return;if(l_.current===C)return;let v=K?.touches?.[0];if(!v)return;if(I.current={path:C,dragging:!1,startX:v.clientX,startY:v.clientY},y!=="file")return;if(B_.current)clearTimeout(B_.current);B_.current=setTimeout(()=>{if(B_.current=null,I.current?.dragging)return;f0(C)},600)},[f0]),e0=S(()=>{if(B_.current)clearTimeout(B_.current),B_.current=null;let K=I.current;if(K?.dragging&&K.path){let B=x_.current||P_(),y=k0.current;if(typeof y==="function")y(K.path,B)}I.current={path:null,dragging:!1,startX:0,startY:0},Q0.current=0,__(!1),e(null),v_(null),g_(),M0()},[P_,M0,v_,g_]),p0=S((K)=>{let B=I.current,y=K?.touches?.[0];if(!y||!B?.path){if(B_.current)clearTimeout(B_.current),B_.current=null;return}let C=Math.abs(y.clientX-B.startX),v=Math.abs(y.clientY-B.startY),c=C>8||v>8;if(c&&B_.current)clearTimeout(B_.current),B_.current=null;if(!B.dragging&&c)B.dragging=!0,__(!0),e("move"),L0(B.path);if(B.dragging){K.preventDefault(),G0(y.clientX,y.clientY);let a=document.elementFromPoint(y.clientX,y.clientY),r=K0(a)||P_();if(x_.current!==r)v_(r);a_(r)}},[K0,P_,L0,G0,v_,a_]),u2=w((K)=>{K.preventDefault();let B=i_.current;if(!B)return;let y=K.clientY,C=t_.current||280,v=K.currentTarget;v.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let c=y,a=(o)=>{c=o.clientY;let Y_=B.clientHeight-80,h_=Math.min(Math.max(C-(o.clientY-y),80),Y_);B.style.setProperty("--preview-height",`${h_}px`),t_.current=h_},r=()=>{let o=B.clientHeight-80,Y_=Math.min(Math.max(C-(c-y),80),o);t_.current=Y_,v.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",I_("previewHeight",String(Math.round(Y_))),document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",r)};document.addEventListener("mousemove",a),document.addEventListener("mouseup",r)}).current,m2=w((K)=>{K.preventDefault();let B=i_.current;if(!B)return;let y=K.touches[0];if(!y)return;let C=y.clientY,v=t_.current||280,c=K.currentTarget;c.classList.add("dragging"),document.body.style.userSelect="none";let a=(o)=>{let Y_=o.touches[0];if(!Y_)return;o.preventDefault();let h_=B.clientHeight-80,o_=Math.min(Math.max(v-(Y_.clientY-C),80),h_);B.style.setProperty("--preview-height",`${o_}px`),t_.current=o_},r=()=>{c.classList.remove("dragging"),document.body.style.userSelect="",I_("previewHeight",String(Math.round(t_.current||v))),document.removeEventListener("touchmove",a),document.removeEventListener("touchend",r),document.removeEventListener("touchcancel",r)};document.addEventListener("touchmove",a,{passive:!1}),document.addEventListener("touchend",r),document.addEventListener("touchcancel",r)}).current,g2=async()=>{if(!V)return;try{let K=await O3(V);if(K.media_id)z(K.media_id)}catch(K){M((B)=>({...B||{},error:K.message||"Failed to attach"}))}},c2=async()=>{if(!V||b_)return;await f0(V)},h0=(K)=>{return Array.from(K?.dataTransfer?.types||[]).includes("Files")},p2=S((K)=>{if(!h0(K))return;if(K.preventDefault(),Q0.current+=1,!r_.current)__(!0);e("upload");let B=s_(K)||P_();v_(B),a_(B)},[P_,s_,v_,a_]),i0=S((K)=>{if(!h0(K))return;if(K.preventDefault(),K.dataTransfer)K.dataTransfer.dropEffect="copy";if(!r_.current)__(!0);if(S0.current!=="upload")e("upload");let B=s_(K)||P_();if(x_.current!==B)v_(B);a_(B)},[P_,s_,v_,a_]),_2=S((K)=>{if(!h0(K))return;if(K.preventDefault(),Q0.current=Math.max(0,Q0.current-1),Q0.current===0)__(!1),e(null),v_(null),g_()},[v_,g_]),N0=S(async(K,B=".")=>{let y=Array.from(K||[]);if(y.length===0)return;let C=B&&B!==""?B:".",v=C!=="."?C:"workspace root";V_(!0);try{let c=null;for(let a of y)try{c=await J1(a,C)}catch(r){let o=r?.status,Y_=r?.code;if(o===409||Y_==="file_exists"){let h_=a?.name||"file";if(!window.confirm(`"${h_}" already exists in ${v}. Overwrite?`))continue;c=await J1(a,C,{overwrite:!0})}else throw r}if(c?.path)W(c.path),u_.current?.(c.path);k_.current?.(C)}catch(c){p(c.message||"Failed to upload file")}finally{V_(!1)}},[]),h2=S(async(K,B)=>{if(!K)return;let y=L_.current?.get(K);if(!y)return;let C=B&&B!==""?B:".",v=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(C===v)return;try{let a=(await B3(K,C))?.path||K;if(y.type==="dir")G((r)=>{let o=new Set;for(let Y_ of r)if(Y_===K)o.add(a);else if(Y_.startsWith(`${K}/`))o.add(`${a}${Y_.slice(K.length)}`);else o.add(Y_);return o});if(W(a),y.type==="dir")M(null),R(!1),z(null);else u_.current?.(a);k_.current?.(v),k_.current?.(C)}catch(c){p(c?.message||"Failed to move entry")}},[]);k0.current=h2;let i2=S(async(K)=>{if(!h0(K))return;K.preventDefault(),Q0.current=0,__(!1),e(null),$_(null),g_();let B=Array.from(K?.dataTransfer?.files||[]);if(B.length===0)return;let y=x_.current||s_(K)||P_();await N0(B,y)},[P_,s_,N0]),l2=S((K)=>{if(K?.stopPropagation?.(),t)return;let B=K?.currentTarget?.dataset?.uploadTarget||".";Z0.current=B,Y0.current?.click()},[t]),o2=S(()=>{if(t)return;let K=$0.current,B=K?L_.current?.get(K):null;Z0.current=B?.type==="dir"?B.path:".",Y0.current?.click()},[t]),n2=S((K)=>{if(!K||K.button!==0)return;let B=K.currentTarget;if(!B||!B.dataset)return;let y=B.dataset.path;if(!y||y===".")return;if(l_.current===y)return;if(K.target?.closest?.("button, a, input, .workspace-caret"))return;K.preventDefault(),l.current={path:y,dragging:!1,startX:K.clientX,startY:K.clientY};let C=(c)=>{let a=l.current;if(!a?.path)return;let r=Math.abs(c.clientX-a.startX),o=Math.abs(c.clientY-a.startY),Y_=r>4||o>4;if(!a.dragging&&Y_)a.dragging=!0,y0.current=!0,__(!0),e("move"),L0(a.path),G0(c.clientX,c.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(a.dragging){c.preventDefault(),G0(c.clientX,c.clientY);let h_=document.elementFromPoint(c.clientX,c.clientY),o_=K0(h_)||P_();if(x_.current!==o_)v_(o_);a_(o_)}},v=()=>{document.removeEventListener("mousemove",C),document.removeEventListener("mouseup",v);let c=l.current;if(c?.dragging&&c.path){let a=x_.current||P_(),r=k0.current;if(typeof r==="function")r(c.path,a)}l.current={path:null,dragging:!1,startX:0,startY:0},Q0.current=0,__(!1),e(null),v_(null),g_(),M0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{y0.current=!1},0)};document.addEventListener("mousemove",C),document.addEventListener("mouseup",v)},[K0,P_,L0,G0,M0,v_,a_,g_]),d2=S(async(K)=>{let B=Array.from(K?.target?.files||[]);if(B.length===0)return;let y=Z0.current||".";if(await N0(B,y),Z0.current=".",K?.target)K.target.value=""},[N0]);return q`
        <aside
            class=${`workspace-sidebar${n?" workspace-drop-active":""}`}
            ref=${i_}
            onDragEnter=${p2}
            onDragOver=${i0}
            onDragLeave=${_2}
            onDrop=${i2}
        >
            <input type="file" multiple style="display:none" ref=${Y0} onChange=${d2} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${j_} title="New file" disabled=${t}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${T0} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${s?" active":""}`}
                        onClick=${f2}
                        title=${s?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!s&&q`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${v2}>
                ${t&&q`<div class="workspace-drop-hint">Uploading…</div>`}
                ${k&&q`<div class="workspace-loading">Loading…</div>`}
                ${h&&q`<div class="workspace-error">${h}</div>`}
                ${X&&q`
                    <div
                        class="workspace-tree-list"
                        ref=${C0}
                        tabIndex="0"
                        onClick=${m0}
                        onKeyDown=${D0}
                        onTouchStart=${R2}
                        onTouchEnd=${e0}
                        onTouchMove=${p0}
                        onTouchCancel=${e0}
                    >
                        ${T_.map(({node:K,depth:B})=>{let y=K.type==="dir",C=K.path===V,v=K.path===Q,c=y&&j.has(K.path),a=y_&&K.path===y_,r=Array.isArray(K.children)&&K.children.length>0?K.children.length:Number(K.child_count)||0;return q`
                                <div
                                    key=${K.path}
                                    class=${`workspace-row${C?" selected":""}${a?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+B*y8}px`}}
                                    data-path=${K.path}
                                    data-type=${K.type}
                                    onMouseDown=${n2}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${y?c?q`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:q`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${y?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${y?q`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:q`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${v?q`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${c_}
                                                value=${H}
                                                onInput=${(o)=>L(o?.target?.value||"")}
                                                onKeyDown=${(o)=>{if(o.key==="Enter")o.preventDefault(),d();else if(o.key==="Escape")o.preventDefault(),U()}}
                                                onBlur=${U}
                                                onClick=${(o)=>o.stopPropagation()}
                                            />
                                        `:q`<span class="workspace-label">${K.name}</span>`}
                                    ${y&&!c&&r>0&&q`
                                        <span class="workspace-count">${r}</span>
                                    `}
                                    ${y&&q`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${K.path}
                                            title="Upload files to this folder"
                                            onClick=${l2}
                                            disabled=${t}
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
            ${V&&q`
                <div class="workspace-preview-splitter-h" onMouseDown=${u2} onTouchStart=${m2}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${V}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${j_} title="New file" disabled=${t}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!b_&&q`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>E0&&B0.current?.(V,F)}
                                    title=${u0}
                                    disabled=${!E0}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${c2}
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
                            ${b_?q`
                                    <button class="workspace-download" onClick=${o2}
                                        title="Upload files to this folder" disabled=${t}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${U3(V,s)}
                                        title="Download folder as zip" onClick=${(K)=>K.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:q`<button class="workspace-download" onClick=${g2} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${A&&q`<div class="workspace-loading">Loading preview…</div>`}
                    ${F?.error&&q`<div class="workspace-error">${F.error}</div>`}
                    ${b_&&q`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${J_?.loading&&q`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${J_?.error&&q`<div class="workspace-error">${J_.error}</div>`}
                        ${J_?.payload&&J_.payload.segments?.length>0&&q`
                            <${P8} payload=${J_.payload} />
                        `}
                        ${J_?.payload&&(!J_.payload.segments||J_.payload.segments.length===0)&&q`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${F&&!F.error&&!b_&&q`
                        <div class="workspace-preview-meta">
                            ${F.size?q`<span>${b0(F.size)}</span>`:""}
                            ${F.mtime?q`<span>${b2(F.mtime)}</span>`:""}
                            ${F.truncated?q`<span>truncated</span>`:""}
                        </div>
                        ${F.kind==="image"&&q`
                            <div class="workspace-preview-image">
                                <img src=${F.url||Y1(F.path)} alt="preview" />
                            </div>
                        `}
                        ${F.kind==="text"&&q`
                            ${F.content_type==="text/markdown"?q`<div class="workspace-preview-text"
                                    dangerouslySetInnerHTML=${{__html:t0(F.text||"",null,{rewriteImageSrc:(K)=>A8(K,F.path||V)})}} />`:q`<pre class="workspace-preview-text"><code>${F.text||""}</code></pre>`}
                        `}
                        ${F.kind==="binary"&&q`
                            <div class="workspace-preview-text">Binary file — download to view.</div>
                        `}
                    `}
                    ${b&&q`
                        <div class="workspace-download-card">
                            <${b8} mediaId=${b} />
                        </div>
                    `}
                </div>
            `}
            ${G_&&q`
                <div class="workspace-drag-ghost" ref=${F0}>${G_.label}</div>
            `}
        </aside>
    `}function j4({tabs:_,activeId:$,onActivate:J,onClose:Y,onCloseOthers:X,onCloseAll:Z,onTogglePin:j,onTogglePreview:G,previewTabs:V,onToggleDock:W,dockVisible:Q}){let[D,H]=T(null),L=w(null);m(()=>{if(!D)return;let z=(k)=>{if(k.type==="keydown"&&k.key!=="Escape")return;H(null)};return document.addEventListener("click",z),document.addEventListener("keydown",z),()=>{document.removeEventListener("click",z),document.removeEventListener("keydown",z)}},[D]),m(()=>{let z=(k)=>{if(k.ctrlKey&&k.key==="Tab"){if(k.preventDefault(),!_.length)return;let E=_.findIndex((A)=>A.id===$);if(k.shiftKey){let A=_[(E-1+_.length)%_.length];J?.(A.id)}else{let A=_[(E+1)%_.length];J?.(A.id)}return}if((k.ctrlKey||k.metaKey)&&k.key==="w"){let E=document.querySelector(".editor-pane");if(E&&E.contains(document.activeElement)){if(k.preventDefault(),$)Y?.($)}}};return document.addEventListener("keydown",z),()=>document.removeEventListener("keydown",z)},[_,$,J,Y]);let F=S((z,k)=>{if(z.button===1){z.preventDefault(),Y?.(k);return}if(z.button===0)J?.(k)},[J,Y]),M=S((z,k)=>{z.preventDefault(),H({id:k,x:z.clientX,y:z.clientY})},[]),b=S((z,k)=>{z.stopPropagation(),Y?.(k)},[Y]);if(m(()=>{if(!$||!L.current)return;let z=L.current.querySelector(".tab-item.active");if(z)z.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return q`
        <div class="tab-strip" ref=${L} role="tablist">
            ${_.map((z)=>q`
                <div
                    key=${z.id}
                    class=${`tab-item${z.id===$?" active":""}${z.dirty?" dirty":""}${z.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${z.id===$}
                    title=${z.path}
                    onMouseDown=${(k)=>F(k,z.id)}
                    onContextMenu=${(k)=>M(k,z.id)}
                >
                    ${z.pinned&&q`
                        <span class="tab-pin-icon" aria-label="Pinned">
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                <path d="M4.456.734a1.75 1.75 0 0 1 2.826.504l.613 1.327a3.1 3.1 0 0 0 2.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.1 3.1 0 0 0-1.707-2.084l-1.327-.613a1.75 1.75 0 0 1-.504-2.826z"/>
                            </svg>
                        </span>
                    `}
                    <span class="tab-label">${z.label}</span>
                    <span
                        class="tab-close"
                        onClick=${(k)=>b(k,z.id)}
                        title=${z.dirty?"Unsaved changes":"Close"}
                        aria-label=${z.dirty?"Unsaved changes":`Close ${z.label}`}
                    >
                        ${z.dirty?q`<span class="tab-dirty-dot" aria-hidden="true"></span>`:q`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                <line x1="4" y1="4" x2="12" y2="12"/>
                                <line x1="12" y1="4" x2="4" y2="12"/>
                            </svg>`}
                    </span>
                </div>
            `)}
            ${W&&q`
                <div class="tab-strip-spacer"></div>
                <button
                    class=${`tab-strip-dock-toggle${Q?" active":""}`}
                    onClick=${W}
                    title=${`${Q?"Hide":"Show"} terminal (Ctrl+\`)`}
                    aria-label=${`${Q?"Hide":"Show"} terminal`}
                    aria-pressed=${Q?"true":"false"}
                >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="4 12 4 10 8 6 12 10 12 12"/>
                        <line x1="2" y1="14" x2="14" y2="14"/>
                    </svg>
                </button>
            `}
        </div>
        ${D&&q`
            <div class="tab-context-menu" style=${{left:D.x+"px",top:D.y+"px"}}>
                <button onClick=${()=>{Y?.(D.id),H(null)}}>Close</button>
                <button onClick=${()=>{X?.(D.id),H(null)}}>Close Others</button>
                <button onClick=${()=>{Z?.(),H(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{j?.(D.id),H(null)}}>
                    ${_.find((z)=>z.id===D.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${G&&/\.(md|mdx|markdown)$/i.test(D.id)&&q`
                    <hr />
                    <button onClick=${()=>{G(D.id),H(null)}}>
                        ${V?.has(D.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var I8=400,z1=60,K4=220,U1="mdPreviewHeight";function S8(){try{let _=localStorage.getItem(U1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=z1?$:K4}catch{return K4}}function G4({getContent:_,path:$,onClose:J}){let[Y,X]=T(""),[Z,j]=T(S8),G=w(null),V=w(null),W=w(""),Q=w(_);return Q.current=_,m(()=>{let L=()=>{let M=Q.current?.()||"";if(M===W.current)return;W.current=M;try{let b=t0(M,null,{sanitize:!1});X(b)}catch{X('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};L();let F=setInterval(L,I8);return()=>clearInterval(F)},[]),m(()=>{if(G.current&&Y)P2(G.current).catch(()=>{})},[Y]),q`
        <div
            class="md-preview-splitter"
            onMouseDown=${(L)=>{L.preventDefault();let F=L.clientY,M=V.current?.offsetHeight||Z,b=V.current?.parentElement,z=b?b.offsetHeight*0.7:500,k=L.currentTarget;k.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let E=(R)=>{let h=Math.min(Math.max(M-(R.clientY-F),z1),z);j(h)},A=()=>{k.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(U1,String(Math.round(V.current?.offsetHeight||Z)))}catch{}document.removeEventListener("mousemove",E),document.removeEventListener("mouseup",A)};document.addEventListener("mousemove",E),document.addEventListener("mouseup",A)}}
            onTouchStart=${(L)=>{L.preventDefault();let F=L.touches[0];if(!F)return;let M=F.clientY,b=V.current?.offsetHeight||Z,z=V.current?.parentElement,k=z?z.offsetHeight*0.7:500,E=L.currentTarget;E.classList.add("dragging"),document.body.style.userSelect="none";let A=(h)=>{let p=h.touches[0];if(!p)return;h.preventDefault();let s=Math.min(Math.max(b-(p.clientY-M),z1),k);j(s)},R=()=>{E.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(U1,String(Math.round(V.current?.offsetHeight||Z)))}catch{}document.removeEventListener("touchmove",A),document.removeEventListener("touchend",R),document.removeEventListener("touchcancel",R)};document.addEventListener("touchmove",A,{passive:!1}),document.addEventListener("touchend",R),document.addEventListener("touchcancel",R)}}
        ></div>
        <div class="md-preview-panel" ref=${V} style=${{height:Z+"px"}}>
            <div class="md-preview-header">
                <span class="md-preview-title">Preview</span>
                <button class="md-preview-close" onClick=${J} title="Close preview" aria-label="Close preview">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                        <line x1="4" y1="4" x2="12" y2="12"/>
                        <line x1="12" y1="4" x2="4" y2="12"/>
                    </svg>
                </button>
            </div>
            <div
                class="md-preview-body post-content"
                ref=${G}
                dangerouslySetInnerHTML=${{__html:Y}}
            />
        </div>
    `}class V4{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,J=-1/0;for(let Y of this.extensions.values()){if(Y.placement!=="tabs")continue;if(!Y.canHandle)continue;try{let X=Y.canHandle(_);if(X===!1||X===0)continue;let Z=X===!0?0:typeof X==="number"?X:0;if(Z>J)J=Z,$=Y}catch(X){console.warn(`[PaneRegistry] canHandle() error for "${Y.id}":`,X)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var O0=new V4;var x2=null,H1=null;function W4(){if(H1)return Promise.resolve(H1);if(!x2)x2=import("/static/dist/editor.bundle.js").then((_)=>{return H1=_,_}).catch((_)=>{throw x2=null,_});return x2}class O4{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await W4();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){if(this.queuedViewStateCb=_,this.real&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(_)}restoreViewState(_){if(this.queuedViewState=_,this.real&&typeof this.real.restoreViewState==="function")this.real.restoreViewState(_)}getPath(){if(this.real&&typeof this.real.getPath==="function")return this.real.getPath();return this.context.path||""}setPath(_){if(this.real&&typeof this.real.setPath==="function")this.real.setPath(_)}}var F1={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;return 1},mount(_,$){return new O4(_,$)}};function L1(){W4().catch(()=>{})}class q4{container;disposed=!1;termEl;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0");let J=document.createElement("div");J.className="terminal-pane-header";let Y=document.createElement("span");Y.className="terminal-pane-title",Y.textContent="Terminal";let X=document.createElement("span");X.className="terminal-pane-status",X.textContent="Not connected",J.append(Y,X);let Z=document.createElement("div");Z.className="terminal-pane-body",Z.innerHTML='<div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>',this.termEl.append(J,Z),_.appendChild(this.termEl)}getContent(){return}isDirty(){return!1}focus(){this.termEl?.focus()}resize(){}dispose(){if(this.disposed)return;this.disposed=!0,this.termEl?.remove()}}var E1={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new q4(_,$)}};class N4{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let J of this.listeners)try{J(_,$)}catch{}}open(_,$){let J=this.tabs.get(_);if(!J)J={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,J);return this.activate(_),J}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,J]of this.tabs)if($!==_&&!J.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((Y)=>Y!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let J=this.tabs.get(_);if(!J||J.dirty===$)return;J.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let J=this.tabs.get(_);if(J)J.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,J){let Y=this.tabs.get(_);if(!Y)return;if(this.tabs.delete(_),Y.id=$,Y.path=$,Y.label=J||$.split("/").pop()||$,this.tabs.set($,Y),this.mruOrder=this.mruOrder.map((X)=>X===_?$:X),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Y)=>Y.id===this.activeId),J=_[($+1)%_.length];this.activate(J.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Y)=>Y.id===this.activeId),J=_[($-1+_.length)%_.length];this.activate(J.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var H_=new N4;function B4({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:J}){m(()=>{J();let Y=new Z1(_,$);Y.connect();let X=()=>{Y.reconnectIfNeeded()};return window.addEventListener("focus",X),document.addEventListener("visibilitychange",X),()=>{window.removeEventListener("focus",X),document.removeEventListener("visibilitychange",X),Y.disconnect()}},[$,_,J])}function z4(){let[_,$]=T(!1),[J,Y]=T("default"),X=w(!1);m(()=>{let V=d0("notificationsEnabled",!1);if(X.current=V,$(V),typeof Notification<"u")Y(Notification.permission)},[]),m(()=>{X.current=_},[_]);let Z=S(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let V=Notification.requestPermission();if(V&&typeof V.then==="function")return V;return Promise.resolve(V)}catch{return Promise.resolve("default")}},[]),j=S(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){Y("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let W=await Z();if(Y(W||"default"),W!=="granted"){X.current=!1,$(!1),I_("notificationsEnabled","false");return}}let V=!X.current;X.current=V,$(V),I_("notificationsEnabled",String(V))},[Z]),G=S((V,W)=>{if(!X.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let Q=new Notification(V,{body:W});return Q.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:J,toggleNotifications:j,notify:G}}var j2=(_)=>{let $=new Set;return(_||[]).filter((J)=>{if(!J||$.has(J.id))return!1;return $.add(J.id),!0})};function U4({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[J,Y]=T(null),[X,Z]=T(!1),j=w(!1),G=w(null),V=w(!1),W=w(null);m(()=>{j.current=X},[X]);let Q=S(async(L=null)=>{try{if(L){let F=await $3(L);Y(F.posts),Z(!1)}else{let F=await F2(10);Y(F.posts),Z(F.has_more)}}catch(F){console.error("Failed to load posts:",F)}},[]),D=S(async()=>{try{let L=await F2(10);Y((F)=>{if(!F||F.length===0)return L.posts;return j2([...L.posts,...F])}),Z((F)=>F||L.has_more)}catch(L){console.error("Failed to refresh timeline:",L)}},[]),H=S(async(L={})=>{if(!J||J.length===0)return;if(V.current)return;let{preserveScroll:F=!0,preserveMode:M="top",allowRepeat:b=!1}=L,z=(A)=>{if(!F){A();return}if(M==="top")$(A);else _(A)},E=J.slice().sort((A,R)=>A.id-R.id)[0]?.id;if(!Number.isFinite(E))return;if(!b&&W.current===E)return;V.current=!0,W.current=E;try{let A=await F2(10,E);if(A.posts.length>0)z(()=>{Y((R)=>j2([...A.posts,...R||[]])),Z(A.has_more)});else Z(!1)}catch(A){console.error("Failed to load more posts:",A)}finally{V.current=!1}},[J,_,$]);return m(()=>{G.current=H},[H]),{posts:J,setPosts:Y,hasMore:X,setHasMore:Z,hasMoreRef:j,loadPosts:Q,refreshTimeline:D,loadMore:H,loadMoreRef:G,loadingMoreRef:V,lastBeforeIdRef:W}}function H4(){let[_,$]=T(null),[J,Y]=T({text:"",totalLines:0}),[X,Z]=T(""),[j,G]=T({text:"",totalLines:0}),[V,W]=T(null),[Q,D]=T(null),[H,L]=T(null),F=w(null),M=w(0),b=w(!1),z=w(""),k=w(""),E=w(null),A=w(null),R=w(null),h=w(null),p=w(!1),s=w(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:J,setAgentDraft:Y,agentPlan:X,setAgentPlan:Z,agentThought:j,setAgentThought:G,pendingRequest:V,setPendingRequest:W,currentTurnId:Q,setCurrentTurnId:D,steerQueuedTurnId:H,setSteerQueuedTurnId:L,lastAgentEventRef:F,lastSilenceNoticeRef:M,isAgentRunningRef:b,draftBufferRef:z,thoughtBufferRef:k,pendingRequestRef:E,stalledPostIdRef:A,currentTurnIdRef:R,steerQueuedTurnIdRef:h,thoughtExpandedRef:p,draftExpandedRef:s}}function F4({appShellRef:_,sidebarWidthRef:$,editorWidthRef:J,dockHeightRef:Y}){let X=w((Q)=>{Q.preventDefault();let D=_.current;if(!D)return;let H=Q.clientX,L=$.current||280,F=Q.currentTarget;F.classList.add("dragging"),D.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let M=H,b=(k)=>{M=k.clientX;let E=Math.min(Math.max(L+(k.clientX-H),160),600);D.style.setProperty("--sidebar-width",`${E}px`),$.current=E},z=()=>{let k=Math.min(Math.max(L+(M-H),160),600);$.current=k,F.classList.remove("dragging"),D.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",I_("sidebarWidth",String(Math.round(k))),document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",b),document.addEventListener("mouseup",z)}).current,Z=w((Q)=>{Q.preventDefault();let D=_.current;if(!D)return;let H=Q.touches[0];if(!H)return;let L=H.clientX,F=$.current||280,M=Q.currentTarget;M.classList.add("dragging"),D.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let b=(k)=>{let E=k.touches[0];if(!E)return;k.preventDefault();let A=Math.min(Math.max(F+(E.clientX-L),160),600);D.style.setProperty("--sidebar-width",`${A}px`),$.current=A},z=()=>{M.classList.remove("dragging"),D.classList.remove("sidebar-resizing"),document.body.style.userSelect="",I_("sidebarWidth",String(Math.round($.current||F))),document.removeEventListener("touchmove",b),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",b,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current,j=w((Q)=>{Q.preventDefault();let D=_.current;if(!D)return;let H=Q.clientX,L=J.current||$.current||280,F=Q.currentTarget;F.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let M=H,b=(k)=>{M=k.clientX;let E=Math.min(Math.max(L+(k.clientX-H),200),800);D.style.setProperty("--editor-width",`${E}px`),J.current=E},z=()=>{let k=Math.min(Math.max(L+(M-H),200),800);J.current=k,F.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",I_("editorWidth",String(Math.round(k))),document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",b),document.addEventListener("mouseup",z)}).current,G=w((Q)=>{Q.preventDefault();let D=_.current;if(!D)return;let H=Q.touches[0];if(!H)return;let L=H.clientX,F=J.current||$.current||280,M=Q.currentTarget;M.classList.add("dragging"),document.body.style.userSelect="none";let b=(k)=>{let E=k.touches[0];if(!E)return;k.preventDefault();let A=Math.min(Math.max(F+(E.clientX-L),200),800);D.style.setProperty("--editor-width",`${A}px`),J.current=A},z=()=>{M.classList.remove("dragging"),document.body.style.userSelect="",I_("editorWidth",String(Math.round(J.current||F))),document.removeEventListener("touchmove",b),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",b,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current,V=w((Q)=>{Q.preventDefault();let D=_.current;if(!D)return;let H=Q.clientY,L=Y?.current||200,F=Q.currentTarget;F.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let M=H,b=(k)=>{M=k.clientY;let E=Math.min(Math.max(L-(k.clientY-H),100),window.innerHeight*0.5);if(D.style.setProperty("--dock-height",`${E}px`),Y)Y.current=E},z=()=>{let k=Math.min(Math.max(L-(M-H),100),window.innerHeight*0.5);if(Y)Y.current=k;F.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",I_("dockHeight",String(Math.round(k))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",b),document.addEventListener("mouseup",z)}).current,W=w((Q)=>{Q.preventDefault();let D=_.current;if(!D)return;let H=Q.touches[0];if(!H)return;let L=H.clientY,F=Y?.current||200,M=Q.currentTarget;M.classList.add("dragging"),document.body.style.userSelect="none";let b=(k)=>{let E=k.touches[0];if(!E)return;k.preventDefault();let A=Math.min(Math.max(F-(E.clientY-L),100),window.innerHeight*0.5);if(D.style.setProperty("--dock-height",`${A}px`),Y)Y.current=A},z=()=>{M.classList.remove("dragging"),document.body.style.userSelect="",I_("dockHeight",String(Math.round(Y?.current||F))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",b),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",b,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current;return{handleSplitterMouseDown:X,handleSplitterTouchStart:Z,handleEditorSplitterMouseDown:j,handleEditorSplitterTouchStart:G,handleDockSplitterMouseDown:V,handleDockSplitterTouchStart:W}}function L4({onTabClosed:_}={}){let[$,J]=T(()=>H_.getTabs()),[Y,X]=T(()=>H_.getActiveId()),[Z,j]=T(()=>H_.getTabs().length>0);m(()=>{return H_.onChange((E,A)=>{J(E),X(A),j(E.length>0)})},[]);let[G,V]=T(()=>new Set),W=S((E)=>{V((A)=>{let R=new Set(A);if(R.has(E))R.delete(E);else R.add(E);return R})},[]),Q=S((E)=>{V((A)=>{if(!A.has(E))return A;let R=new Set(A);return R.delete(E),R})},[]),D=S((E)=>{if(!E)return;let A={path:E,mode:"edit"};try{if(!O0.resolve(A)){if(!O0.get("editor")){console.warn(`[openEditor] No pane handler for: ${E}`);return}}}catch(R){console.warn(`[openEditor] paneRegistry.resolve() error for "${E}":`,R)}H_.open(E)},[]),H=S(()=>{let E=H_.getActiveId();if(E){let A=H_.get(E);if(A?.dirty){if(!window.confirm(`"${A.label}" has unsaved changes. Close anyway?`))return}H_.close(E),Q(E),_?.(E)}},[_,Q]),L=S((E)=>{let A=H_.get(E);if(A?.dirty){if(!window.confirm(`"${A.label}" has unsaved changes. Close anyway?`))return}H_.close(E),Q(E),_?.(E)},[_,Q]),F=S((E)=>{H_.activate(E)},[]),M=S((E)=>{let A=H_.getTabs().filter((p)=>p.id!==E&&!p.pinned),R=A.filter((p)=>p.dirty).length;if(R>0){if(!window.confirm(`${R} unsaved tab${R>1?"s":""} will be closed. Continue?`))return}let h=A.map((p)=>p.id);H_.closeOthers(E),h.forEach((p)=>{Q(p),_?.(p)})},[_,Q]),b=S(()=>{let E=H_.getTabs().filter((h)=>!h.pinned),A=E.filter((h)=>h.dirty).length;if(A>0){if(!window.confirm(`${A} unsaved tab${A>1?"s":""} will be closed. Continue?`))return}let R=E.map((h)=>h.id);H_.closeAll(),R.forEach((h)=>{Q(h),_?.(h)})},[_,Q]),z=S((E)=>{H_.togglePin(E)},[]),k=S(()=>{let E=H_.getActiveId();if(E)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:E}}))},[]);return m(()=>{let E=(A)=>{let{oldPath:R,newPath:h,type:p}=A.detail||{};if(!R||!h)return;if(p==="dir"){for(let s of H_.getTabs())if(s.path===R||s.path.startsWith(`${R}/`)){let X_=`${h}${s.path.slice(R.length)}`;H_.rename(s.id,X_)}}else H_.rename(R,h)};return window.addEventListener("workspace-file-renamed",E),()=>window.removeEventListener("workspace-file-renamed",E)},[]),m(()=>{let E=(A)=>{if(H_.hasUnsaved())A.preventDefault(),A.returnValue=""};return window.addEventListener("beforeunload",E),()=>window.removeEventListener("beforeunload",E)},[]),{editorOpen:Z,tabStripTabs:$,tabStripActiveId:Y,previewTabs:G,openEditor:D,closeEditor:H,handleTabClose:L,handleTabActivate:F,handleTabCloseOthers:M,handleTabCloseAll:b,handleTabTogglePin:z,handleTabTogglePreview:W,revealInExplorer:k}}function D1(_,$){try{if(typeof window>"u")return $;let J=window.__PICLAW_SILENCE||{},Y=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,X=J[_]??window[Y],Z=Number(X);return Number.isFinite(Z)?Z:$}catch{return $}}var C1=D1("warning",30000),E4=D1("finalize",120000),D4=D1("refresh",30000),C4=30000;function y4(_){let $={};return(_?.agents||[]).forEach((J)=>{$[J.id]=J}),$}function k4(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function A4(_=30000){let[,$]=T(0);m(()=>{let J=setInterval(()=>$((Y)=>Y+1),_);return()=>clearInterval(J)},[_])}function T2(_,$=160){let J=String(_||"").replace(/\r\n/g,`
`);if(!J)return 0;return J.split(`
`).reduce((Y,X)=>Y+Math.max(1,Math.ceil(X.length/$)),0)}function I4(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var x8=J3,w4=Y3,T8=Z3,M4=K3,P4=G3,b4=X3,y1=typeof _1==="function"?_1:I4("getAgentContext",null),f8=typeof Y2==="function"?Y2:I4("getAgentModels",{current:null,models:[]});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});O0.register(F1);L1();var v8=typeof localStorage<"u"&&localStorage.getItem("experimentalPanes")==="true";if(v8)O0.register(E1);function R8(){let[_,$]=T("disconnected"),[J,Y]=T(null),[X,Z]=T(null),[j,G]=T(!1),[V,W]=T([]),[Q,D]=T([]),{agentStatus:H,setAgentStatus:L,agentDraft:F,setAgentDraft:M,agentPlan:b,setAgentPlan:z,agentThought:k,setAgentThought:E,pendingRequest:A,setPendingRequest:R,currentTurnId:h,setCurrentTurnId:p,steerQueuedTurnId:s,setSteerQueuedTurnId:X_,lastAgentEventRef:n,lastSilenceNoticeRef:__,isAgentRunningRef:U_,draftBufferRef:e,thoughtBufferRef:G_,pendingRequestRef:F_,stalledPostIdRef:y_,currentTurnIdRef:$_,steerQueuedTurnIdRef:t,thoughtExpandedRef:V_,draftExpandedRef:J_}=H4(),[O_,K_]=T({}),[A_,z_]=T(null),[D_,S_]=T(null),[N_,f_]=T(!1),[C_,L_]=T(null),{notificationsEnabled:M_,notificationPermission:B0,toggleNotifications:u_,notify:k_}=z4(),[i_,C0]=T(()=>new Set),[c_,Y0]=T(()=>d0("workspaceOpen",!0)),Z0=w(null),{editorOpen:B_,tabStripTabs:I,tabStripActiveId:l,previewTabs:m_,openEditor:y0,closeEditor:t_,handleTabClose:I0,handleTabActivate:z0,handleTabCloseOthers:U0,handleTabCloseAll:d_,handleTabTogglePin:H0,handleTabTogglePreview:X0,revealInExplorer:Q0}=L4({onTabClosed:(O)=>Z0.current?.(O)}),x_=w(null),r_=w(null);m(()=>{let O=x_.current;if(!O)return;if(r_.current)r_.current.dispose(),r_.current=null;let N=l;if(!N)return;let P={path:N,mode:"edit"},u=O0.resolve(P)||O0.get("editor");if(!u){O.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let g=u.mount(O,P);r_.current=g,g.onDirtyChange?.((i)=>{H_.setDirty(N,i)}),g.onSaveRequest?.(()=>{}),g.onClose?.(()=>{t_()});let f=H_.getViewState(N);if(f&&typeof g.restoreViewState==="function")requestAnimationFrame(()=>g.restoreViewState(f));if(typeof g.onViewStateChange==="function")g.onViewStateChange((i)=>{H_.saveViewState(N,i)});return requestAnimationFrame(()=>g.focus()),()=>{if(r_.current===g)g.dispose(),r_.current=null}},[l,t_]);let[S0,F0]=T({name:"You",avatar_url:null,avatar_background:null}),q0=w(!1),_0=w(!1),k0=w({}),$0=w({name:null,avatar_url:null}),l_=w({currentHashtag:null,searchQuery:null}),j0=w(null),A0=w(null),w0=w(0),x0=w(0),P_=w(0),K0=w(null),s_=w(null),v_=w(null),g_=w(0),a_=w({title:null,avatarBase:null});A4(30000),m(()=>{return A3()},[]),m(()=>{I_("workspaceOpen",String(c_))},[c_]),m(()=>{k0.current=O_||{}},[O_]),m(()=>{$0.current=S0||{name:"You",avatar_url:null,avatar_background:null}},[S0]);let G0=S((O,N,P=null)=>{if(typeof document>"u")return;let u=(O||"").trim()||"PiClaw";if(a_.current.title!==u){document.title=u;let w_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(w_&&w_.getAttribute("content")!==u)w_.setAttribute("content",u);a_.current.title=u}let g=document.getElementById("dynamic-favicon");if(!g)return;let f=g.getAttribute("data-default")||g.getAttribute("href")||"/favicon.ico",i=N||f,W_=N?`${i}|${P||""}`:i;if(a_.current.avatarBase!==W_){let w_=N?`${i}${i.includes("?")?"&":"?"}v=${P||Date.now()}`:i;g.setAttribute("href",w_),a_.current.avatarBase=W_}},[]),L0=S((O)=>{if(!O)return;W((N)=>N.includes(O)?N:[...N,O])},[]),M0=S((O)=>{W((N)=>N.filter((P)=>P!==O))},[]);Z0.current=M0;let c0=S(()=>{W([])},[]),U=S(()=>{let O=l;if(O)L0(O)},[l,L0]),x=S((O)=>{if(!O)return;D((N)=>N.includes(O)?N:[...N,O])},[]),d=S((O)=>{D((N)=>N.filter((P)=>P!==O))},[]),Q_=S(()=>{D([])},[]),j_=S((O={})=>{let N=Date.now();if(n.current=N,O.running)U_.current=!0;if(O.clearSilence)__.current=0},[]),E_=S(()=>{if(v_.current)clearTimeout(v_.current),v_.current=null;g_.current=0},[]);m(()=>()=>{E_()},[E_]);let q_=S(()=>{E_(),L((O)=>{if(!O)return O;if(!(O.last_activity||O.lastActivity))return O;let{last_activity:N,lastActivity:P,...u}=O;return u})},[E_]),e_=S((O)=>{if(!O)return;E_();let N=Date.now();g_.current=N,L({type:O.type||"active",last_activity:!0}),v_.current=setTimeout(()=>{if(g_.current!==N)return;L((P)=>{if(!P||!(P.last_activity||P.lastActivity))return P;return null})},C4)},[E_]),T_=S(()=>{U_.current=!1,n.current=null,__.current=0,e.current="",G_.current="",F_.current=null,s_.current=null,$_.current=null,t.current=null,E_(),p(null),X_(null),V_.current=!1,J_.current=!1},[E_,p,X_]),p_=S((O)=>{if(!O)return;if($_.current===O)return;$_.current=O,p(O),t.current=null,X_(null),e.current="",G_.current="",M({text:"",totalLines:0}),z(""),E({text:"",totalLines:0}),R(null),F_.current=null,s_.current=null,V_.current=!1,J_.current=!1},[p,X_]),J0=S((O)=>{if(typeof document<"u"){let w_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&w_)return}let N=s_.current;if(!N||!N.post)return;if(O&&N.turnId&&N.turnId!==O)return;let P=N.post;if(P.id&&K0.current===P.id)return;let u=String(P?.data?.content||"").trim();if(!u)return;K0.current=P.id||K0.current,s_.current=null;let g=u.replace(/\s+/g," ").slice(0,200),f=k0.current||{},W_=(P?.data?.agent_id?f[P.data.agent_id]:null)?.name||"Pi";k_(W_,g)},[k_]),b_=S(async(O,N)=>{if(O!=="thought"&&O!=="draft")return;let P=$_.current;if(O==="thought"){if(V_.current=N,P)try{await P4(P,"thought",N)}catch(u){console.warn("Failed to update thought visibility:",u)}if(!N)return;try{let u=P?await M4(P,"thought"):null;if(u?.text)G_.current=u.text;E((g)=>({...g||{text:"",totalLines:0},fullText:G_.current||g?.fullText||"",totalLines:Number.isFinite(u?.total_lines)?u.total_lines:g?.totalLines||0}))}catch(u){console.warn("Failed to fetch full thought:",u)}return}if(J_.current=N,P)try{await P4(P,"draft",N)}catch(u){console.warn("Failed to update draft visibility:",u)}if(!N)return;try{let u=P?await M4(P,"draft"):null;if(u?.text)e.current=u.text;M((g)=>({...g||{text:"",totalLines:0},fullText:e.current||g?.fullText||"",totalLines:Number.isFinite(u?.total_lines)?u.total_lines:g?.totalLines||0}))}catch(u){console.warn("Failed to fetch full draft:",u)}},[]),E0=w(null),u0=S(()=>{if(j0.current)j0.current.scrollTop=0},[]);E0.current=u0;let K2=S((O)=>{let N=j0.current;if(!N||typeof O!=="function"){O?.();return}let{currentHashtag:P,searchQuery:u}=l_.current||{},g=!(u&&!P),f=g?N.scrollHeight-N.scrollTop:N.scrollTop;O(),requestAnimationFrame(()=>{let i=j0.current;if(!i)return;if(g){let W_=Math.max(i.scrollHeight-f,0);i.scrollTop=W_}else{let W_=Math.max(i.scrollHeight-i.clientHeight,0),w_=Math.min(f,W_);i.scrollTop=w_}})},[]),m0=S((O)=>{let N=j0.current;if(!N||typeof O!=="function"){O?.();return}let P=N.scrollTop;O(),requestAnimationFrame(()=>{let u=j0.current;if(!u)return;let g=Math.max(u.scrollHeight-u.clientHeight,0);u.scrollTop=Math.min(P,g)})},[]),{posts:T0,setPosts:R_,hasMore:f2,setHasMore:v2,hasMoreRef:f0,loadPosts:V0,refreshTimeline:D0,loadMore:R2,loadMoreRef:e0}=U4({preserveTimelineScroll:K2,preserveTimelineScrollTop:m0}),p0=S(()=>{let O=y_.current;if(!O)return;R_((N)=>N?N.filter((P)=>P.id!==O):N),y_.current=null},[R_]),{handleSplitterMouseDown:u2,handleSplitterTouchStart:m2,handleEditorSplitterMouseDown:g2,handleEditorSplitterTouchStart:c2,handleDockSplitterMouseDown:h0,handleDockSplitterTouchStart:p2}=F4({appShellRef:A0,sidebarWidthRef:w0,editorWidthRef:x0,dockHeightRef:P_}),i0=S(()=>{if(!U_.current)return;U_.current=!1,__.current=0,n.current=null,$_.current=null,p(null),V_.current=!1,J_.current=!1;let O=(e.current||"").trim();if(e.current="",G_.current="",M({text:"",totalLines:0}),z(""),E({text:"",totalLines:0}),R(null),F_.current=null,s_.current=null,!O){L({type:"error",title:"Response stalled — No content received"});return}let P=`${O}${`

⚠️ Response may be incomplete — the model stopped responding`}`,u=Date.now(),g=new Date().toISOString(),f={id:u,timestamp:g,data:{type:"agent_response",content:P,agent_id:"default",is_local_stall:!0}};y_.current=u,R_((i)=>i?j2([...i,f]):[f]),E0.current?.(),L(null)},[p]);m(()=>{l_.current={currentHashtag:J,searchQuery:X}},[J,X]),m(()=>{let O=Math.min(1000,Math.max(100,Math.floor(C1/2))),N=setInterval(()=>{if(!U_.current)return;if(F_.current)return;let P=n.current;if(!P)return;let u=Date.now(),g=u-P;if(g>=E4){i0();return}if(g>=C1){if(u-__.current>=D4){let f=Math.floor(g/1000);L({type:"waiting",title:`Waiting for model… No events for ${f}s`}),__.current=u}}},O);return()=>clearInterval(N)},[i0]);let _2=S(async()=>{try{let O=await y1();if(O)L_(O)}catch(O){console.warn("Failed to fetch agent context:",O)}},[]),N0=S(async()=>{try{let O=await b4("web:default");if(!O||O.status!=="active"||!O.data){if(_0.current){let{currentHashtag:u,searchQuery:g}=l_.current||{};if(!u&&!g)D0()}_0.current=!1,T_(),L(null),M({text:"",totalLines:0}),z(""),E({text:"",totalLines:0}),R(null),F_.current=null;return}_0.current=!0;let N=O.data,P=N.turn_id||N.turnId;if(P)p_(P);if(j_({running:!0,clearSilence:!0}),q_(),L(N),O.thought&&O.thought.text)E((u)=>{if(u&&u.text&&u.text.length>=O.thought.text.length)return u;return G_.current=O.thought.text,{text:O.thought.text,totalLines:O.thought.totalLines||0}});if(O.draft&&O.draft.text)M((u)=>{if(u&&u.text&&u.text.length>=O.draft.text.length)return u;return e.current=O.draft.text,{text:O.draft.text,totalLines:O.draft.totalLines||0}})}catch(O){console.warn("Failed to fetch agent status:",O)}},[T_,q_,j_,D0,p_]),h2=S((O)=>{if($(O),O!=="connected"){L(null),M({text:"",totalLines:0}),z(""),E({text:"",totalLines:0}),R(null),F_.current=null,T_();return}if(!q0.current){q0.current=!0,N0();return}let{currentHashtag:N,searchQuery:P}=l_.current;if(!N&&!P)D0();N0()},[T_,D0,N0]),i2=S(async(O)=>{Y(O),R_(null),await V0(O)},[V0]),l2=S(async()=>{Y(null),Z(null),R_(null),await V0()},[V0]),o2=S(async(O)=>{if(!O||!O.trim())return;Z(O.trim()),Y(null),R_(null);try{let N=await x8(O.trim());R_(N.results),v2(!1)}catch(N){console.error("Failed to search:",N),R_([])}},[]),n2=S(()=>{G(!0),Z(null),Y(null),R_([])},[]),d2=S(()=>{G(!1),Z(null),V0()},[V0]),K=S(()=>{},[]),B=S(async(O)=>{if(!O)return;let N=O.id,P=T0?.filter((g)=>g?.data?.thread_id===N&&g?.id!==N).length||0;if(P>0){if(!window.confirm(`Delete this message and its ${P} replies?`))return}let u=(g)=>{if(!g.length)return;C0((i)=>{let W_=new Set(i);return g.forEach((w_)=>W_.add(w_)),W_}),setTimeout(()=>{if(m0(()=>{R_((i)=>i?i.filter((W_)=>!g.includes(W_.id)):i)}),C0((i)=>{let W_=new Set(i);return g.forEach((w_)=>W_.delete(w_)),W_}),f0.current)e0.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let g=await w4(N,P>0);if(g?.ids?.length)u(g.ids)}catch(g){let f=g?.message||"";if(P===0&&f.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let W_=await w4(N,!0);if(W_?.ids?.length)u(W_.ids);return}console.error("Failed to delete post:",g),alert(`Failed to delete message: ${f}`)}},[T0,m0]),y=S(async()=>{try{let O=await T8();K_(y4(O));let N=O?.user||{};F0((u)=>{let g=typeof N.name==="string"&&N.name.trim()?N.name.trim():"You",f=typeof N.avatar_url==="string"?N.avatar_url.trim():null,i=typeof N.avatar_background==="string"&&N.avatar_background.trim()?N.avatar_background.trim():null;if(u.name===g&&u.avatar_url===f&&u.avatar_background===i)return u;return{name:g,avatar_url:f,avatar_background:i}});let P=(O?.agents||[]).find((u)=>u.id==="default");if(P?.model)z_(P.model);G0(P?.name,P?.avatar_url)}catch(O){console.warn("Failed to load agents:",O)}try{let O=await y1();if(O)L_(O)}catch{}},[G0]);m(()=>{y();let O=r0("sidebarWidth",null),N=Number.isFinite(O)?Math.min(Math.max(O,160),600):280;if(w0.current=N,A0.current)A0.current.style.setProperty("--sidebar-width",`${N}px`)},[y]);let C=S((O)=>{if(!O||typeof O!=="object")return;let N=O.agent_id;if(!N)return;let{agent_name:P,agent_avatar:u}=O;if(!P&&u===void 0)return;let g=k0.current?.[N]||{id:N},f=g.name||null,i=g.avatar_url??g.avatarUrl??g.avatar??null,W_=!1,w_=!1;if(P&&P!==g.name)f=P,w_=!0;if(u!==void 0){let l0=typeof u==="string"?u.trim():null,k1=typeof i==="string"?i.trim():null,o0=l0||null;if(o0!==(k1||null))i=o0,W_=!0}if(!w_&&!W_)return;if(K_((l0)=>{let o0={...l0[N]||{id:N}};if(w_)o0.name=f;if(W_)o0.avatar_url=i;return{...l0,[N]:o0}}),N==="default")G0(f,i,W_?Date.now():null)},[G0]),v=S((O)=>{if(!O||typeof O!=="object")return;let N=O.user_name??O.userName,P=O.user_avatar??O.userAvatar,u=O.user_avatar_background??O.userAvatarBackground;if(N===void 0&&P===void 0&&u===void 0)return;F0((g)=>{let f=typeof N==="string"&&N.trim()?N.trim():g.name||"You",i=P===void 0?g.avatar_url:typeof P==="string"&&P.trim()?P.trim():null,W_=u===void 0?g.avatar_background:typeof u==="string"&&u.trim()?u.trim():null;if(g.name===f&&g.avatar_url===i&&g.avatar_background===W_)return g;return{name:f,avatar_url:i,avatar_background:W_}})},[]),c=S((O)=>{if(!O||typeof O!=="object")return;let N=O.model??O.current;if(N!==void 0)z_(N);if(O.thinking_level!==void 0)S_(O.thinking_level??null);if(O.supports_thinking!==void 0)f_(Boolean(O.supports_thinking))},[]),a=S(()=>{f8().then((O)=>{if(O)c(O)}).catch(()=>{})},[c]),r=S((O,N)=>{let P=N?.turn_id;if(C(N),v(N),O==="ui_theme"){w3(N);return}if(O?.startsWith("agent_"))q_();if(O==="connected"){L(null),M({text:"",totalLines:0}),z(""),E({text:"",totalLines:0}),R(null),F_.current=null,T_(),b4("web:default").then((f)=>{if(!f||f.status!=="active"||!f.data)return;let i=f.data,W_=i.turn_id||i.turnId;if(W_)p_(W_);if(j_({clearSilence:!0}),e_(i),f.thought&&f.thought.text)G_.current=f.thought.text,E({text:f.thought.text,totalLines:f.thought.totalLines||0});if(f.draft&&f.draft.text)e.current=f.draft.text,M({text:f.draft.text,totalLines:f.draft.totalLines||0})}).catch((f)=>{console.warn("Failed to fetch agent status:",f)}),a();return}if(O==="agent_status"){if(N.type==="done"||N.type==="error"){if(P&&$_.current&&P!==$_.current)return;if(N.type==="done"){J0(P||$_.current);let{currentHashtag:f,searchQuery:i}=l_.current||{};if(!f&&!i)D0();if(N.context_usage)L_(N.context_usage)}if(_0.current=!1,T_(),M({text:"",totalLines:0}),z(""),E({text:"",totalLines:0}),R(null),N.type==="error")L({type:"error",title:N.title||"Agent error"}),setTimeout(()=>L(null),8000);else L(null)}else{if(P)p_(P);if(j_({running:!0,clearSilence:!0}),N.type==="thinking")e.current="",G_.current="",M({text:"",totalLines:0}),z(""),E({text:"",totalLines:0});L(N)}return}if(O==="agent_steer_queued"){if(P&&$_.current&&P!==$_.current)return;let f=P||$_.current;if(!f)return;t.current=f,X_(f);return}if(O==="agent_draft_delta"){if(P&&$_.current&&P!==$_.current)return;if(P&&!$_.current)p_(P);if(j_({running:!0,clearSilence:!0}),N?.reset)e.current="";if(N?.delta)e.current+=N.delta;if(J_.current){let f=e.current;M((i)=>({text:i?.text||"",totalLines:T2(f),fullText:f}))}else{let f=e.current,i=T2(f);M({text:f,totalLines:i})}return}if(O==="agent_draft"){if(P&&$_.current&&P!==$_.current)return;if(P&&!$_.current)p_(P);j_({running:!0,clearSilence:!0});let f=N.text||"",i=N.mode||(N.kind==="plan"?"replace":"append"),W_=Number.isFinite(N.total_lines)?N.total_lines:f?f.replace(/\r\n/g,`
`).split(`
`).length:0;if(N.kind==="plan")if(i==="replace")z(f);else z((w_)=>(w_||"")+f);else if(!J_.current)e.current=f,M({text:f,totalLines:W_});return}if(O==="agent_thought_delta"){if(P&&$_.current&&P!==$_.current)return;if(P&&!$_.current)p_(P);if(j_({running:!0,clearSilence:!0}),N?.reset)G_.current="";if(typeof N?.delta==="string")G_.current+=N.delta;if(V_.current){let f=G_.current;E((i)=>({text:i?.text||"",totalLines:T2(f),fullText:f}))}return}if(O==="agent_thought"){if(P&&$_.current&&P!==$_.current)return;if(P&&!$_.current)p_(P);j_({running:!0,clearSilence:!0});let f=N.text||"",i=Number.isFinite(N.total_lines)?N.total_lines:f?f.replace(/\r\n/g,`
`).split(`
`).length:0;if(!V_.current)G_.current=f,E({text:f,totalLines:i});return}if(O==="agent_request"){if(console.log("Agent request:",N),P&&$_.current&&P!==$_.current)return;if(P)p_(P);j_({running:!0,clearSilence:!0}),R(N),F_.current=N;return}if(O==="agent_request_timeout"){if(console.log("Agent request timeout:",N),P&&$_.current&&P!==$_.current)return;R(null),F_.current=null,T_(),L({type:"error",title:"Permission request timed out"});return}if(O==="model_changed"){if(N?.model!==void 0)z_(N.model);if(N?.thinking_level!==void 0)S_(N.thinking_level??null);if(N?.supports_thinking!==void 0)f_(Boolean(N.supports_thinking));y1().then((f)=>{if(f)L_(f)}).catch(()=>{});return}if(O==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:N}));return}let{currentHashtag:u,searchQuery:g}=l_.current;if(O==="agent_response")p0(),s_.current={post:N,turnId:$_.current};if(!u&&!g&&(O==="new_post"||O==="agent_response"))R_((f)=>{if(!f)return[N];if(f.some((i)=>i.id===N.id))return f;return[...f,N]}),E0.current?.();if(O==="interaction_updated")R_((f)=>f?f.map((i)=>i.id===N.id?N:i):f);if(O==="interaction_deleted"){let f=N?.ids||[];if(f.length){m0(()=>{R_((w_)=>w_?w_.filter((l0)=>!f.includes(l0.id)):w_)});let{currentHashtag:i,searchQuery:W_}=l_.current;if(f0.current&&!i&&!W_)e0.current?.({preserveScroll:!0,preserveMode:"top"})}}},[T_,q_,j_,J0,m0,D0,p0,p_,e_,C,v,a]);m(()=>{if(typeof window>"u")return;let O=window.__PICLAW_TEST_API||{};return O.emit=r,O.reset=()=>{p0(),T_(),L(null),M({text:"",totalLines:0}),z(""),E({text:"",totalLines:0}),R(null)},O.finalize=()=>i0(),window.__PICLAW_TEST_API=O,()=>{if(window.__PICLAW_TEST_API===O)window.__PICLAW_TEST_API=void 0}},[T_,i0,r,p0]),B4({handleSseEvent:r,handleConnectionStatusChange:h2,loadPosts:V0}),m(()=>{if(!T0||T0.length===0)return;let O=location.hash;if(!O||!O.startsWith("#msg-"))return;let N=document.getElementById(O.slice(1).replace("msg-","post-"));if(N)N.scrollIntoView({behavior:"smooth",block:"center"}),N.classList.add("post-highlight"),setTimeout(()=>N.classList.remove("post-highlight"),2000),history.replaceState(null,"",location.pathname+location.search)},[T0]);let o=H!==null;m(()=>{if(_!=="connected")return;let N=setInterval(()=>{if(o)N0(),_2();else{let{currentHashtag:P,searchQuery:u}=l_.current||{};if(!P&&!u)D0();N0(),_2()}},o?15000:60000);return()=>clearInterval(N)},[_,o,N0,_2,D0]);let Y_=S(()=>{Y0((O)=>!O)},[]);m(()=>{if(!B_)return;if(typeof window>"u")return;let O=A0.current;if(!O)return;if(!x0.current){let N=r0("editorWidth",null),P=w0.current||280;x0.current=Number.isFinite(N)?N:P}if(O.style.setProperty("--editor-width",`${x0.current}px`),!P_.current){let N=r0("dockHeight",null);P_.current=Number.isFinite(N)?N:200}O.style.setProperty("--dock-height",`${P_.current}px`)},[B_]);let h_=O0.getDockPanes().length>0,[o_,S4]=T(!1),G2=S(()=>S4((O)=>!O),[]);m(()=>{if(!h_)return;let O=(N)=>{if(N.ctrlKey&&N.key==="`")N.preventDefault(),G2()};return document.addEventListener("keydown",O),()=>document.removeEventListener("keydown",O)},[G2,h_]);let x4=Boolean(s&&s===(H?.turn_id||h));return q`
        <div class=${`app-shell${c_?"":" workspace-collapsed"}${B_?" editor-open":""}`} ref=${A0}>
            <${Q4}
                onFileSelect=${L0}
                visible=${c_}
                active=${c_||B_}
                onOpenEditor=${y0}
            />
            <button
                class=${`workspace-toggle-tab${c_?" open":" closed"}`}
                onClick=${Y_}
                title=${c_?"Hide workspace":"Show workspace"}
                aria-label=${c_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${u2} onTouchStart=${m2}></div>
            ${B_&&q`
                <div class="editor-pane-container">
                    <${j4}
                        tabs=${I}
                        activeId=${l}
                        onActivate=${z0}
                        onClose=${I0}
                        onCloseOthers=${U0}
                        onCloseAll=${d_}
                        onTogglePin=${H0}
                        onTogglePreview=${X0}
                        previewTabs=${m_}
                        onToggleDock=${h_?G2:void 0}
                        dockVisible=${h_&&o_}
                    />
                    <div class="editor-pane-host" ref=${x_}></div>
                    ${l&&m_.has(l)&&q`
                        <${G4}
                            getContent=${()=>r_.current?.getContent?.()}
                            path=${l}
                            onClose=${()=>X0(l)}
                        />
                    `}
                    ${h_&&o_&&q`<div class="dock-splitter" onMouseDown=${h0} onTouchStart=${p2}></div>`}
                    ${h_&&q`<div class=${`dock-panel${o_?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${G2} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
                                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                    <line x1="4" y1="12" x2="12" y2="4"/>
                                    <polyline points="4 4 12 4 12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="dock-panel-body">
                            <div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>
                        </div>
                    </div>`}
                </div>
                <div class="editor-splitter" onMouseDown=${g2} onTouchStart=${c2}></div>
            `}
            <div class="container">
                ${X&&k4()&&q`<div class="search-results-spacer"></div>`}
                ${(J||X)&&q`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${l2}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${J?`#${J}`:`Search: ${X}`}</span>
                    </div>
                `}
                <${n3} 
                    posts=${T0}
                    hasMore=${f2}
                    onLoadMore=${R2}
                    timelineRef=${j0}
                    onHashtagClick=${i2}
                    onMessageRef=${x}
                    onPostClick=${void 0}
                    onDeletePost=${B}
                    emptyMessage=${J?`No posts with #${J}`:X?`No results for "${X}"`:void 0}
                    agents=${O_}
                    user=${S0}
                    reverse=${!(X&&!J)}
                    removingPostIds=${i_}
                    searchQuery=${X}
                />
                <${c3}
                    status=${H}
                    draft=${F}
                    plan=${b}
                    thought=${k}
                    pendingRequest=${A}
                    turnId=${h}
                    steerQueued=${x4}
                    onPanelToggle=${b_}
                />
                <${F3} 
                    onPost=${()=>{V0(),u0()}}
                    onFocus=${u0}
                    searchMode=${j}
                    onSearch=${o2}
                    onEnterSearch=${n2}
                    onExitSearch=${d2}
                    fileRefs=${V}
                    onRemoveFileRef=${M0}
                    onClearFileRefs=${c0}
                    messageRefs=${Q}
                    onRemoveMessageRef=${d}
                    onClearMessageRefs=${Q_}
                    activeEditorPath=${l}
                    onAttachEditorFile=${U}
                    activeModel=${A_}
                    thinkingLevel=${D_}
                    supportsThinking=${N_}
                    contextUsage=${C_}
                    notificationsEnabled=${M_}
                    notificationPermission=${B0}
                    onToggleNotifications=${u_}
                    onModelChange=${z_}
                    onModelStateChange=${c}
                />
                <${h3} status=${_} />
                <${p3}
                    request=${A}
                    onRespond=${()=>{R(null),F_.current=null}}
                />
            </div>
        </div>
    `}a1(q`<${R8} />`,document.getElementById("app"));

//# debugId=E8495E92617D12B564756E2164756E21
//# sourceMappingURL=app.bundle.js.map

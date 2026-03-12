var i4=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,J)=>(typeof require<"u"?require:$)[J]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var w2,X_,n1,q2,d1,T1,l4,k2={},r1=[],o4=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function g0(_,$){for(var J in $)_[J]=$[J];return _}function s1(_){var $=_.parentNode;$&&$.removeChild(_)}function a1(_,$,J){var Y,X,Z,K={};for(Z in $)Z=="key"?Y=$[Z]:Z=="ref"?X=$[Z]:K[Z]=$[Z];if(arguments.length>2&&(K.children=arguments.length>3?w2.call(arguments,2):J),typeof _=="function"&&_.defaultProps!=null)for(Z in _.defaultProps)K[Z]===void 0&&(K[Z]=_.defaultProps[Z]);return D2(_,K,Y,X,null)}function D2(_,$,J,Y,X){var Z={type:_,props:$,key:J,ref:Y,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:X==null?++n1:X};return X_.vnode!=null&&X_.vnode(Z),Z}function M2(_){return _.children}function C2(_,$){this.props=_,this.context=$}function $2(_,$){if($==null)return _.__?$2(_.__,_.__.__k.indexOf(_)+1):null;for(var J;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null)return J.__e;return typeof _.type=="function"?$2(_):null}function t1(_){var $,J;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,$=0;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null){_.__e=_.__c.base=J.__e;break}return t1(_)}}function f1(_){(!_.__d&&(_.__d=!0)&&q2.push(_)&&!A2.__r++||T1!==X_.debounceRendering)&&((T1=X_.debounceRendering)||d1)(A2)}function A2(){for(var _;A2.__r=q2.length;)_=q2.sort(function($,J){return $.__v.__b-J.__v.__b}),q2=[],_.some(function($){var J,Y,X,Z,K,V;$.__d&&(K=(Z=(J=$).__v).__e,(V=J.__P)&&(Y=[],(X=g0({},Z)).__v=Z.__v+1,X1(V,Z,X,J.__n,V.ownerSVGElement!==void 0,Z.__h!=null?[K]:null,Y,K==null?$2(Z):K,Z.__h),J3(Y,Z),Z.__e!=K&&t1(Z)))})}function e1(_,$,J,Y,X,Z,K,V,G,W){var Q,U,D,F,E,P,I,H=Y&&Y.__k||r1,k=H.length;for(J.__k=[],Q=0;Q<$.length;Q++)if((F=J.__k[Q]=(F=$[Q])==null||typeof F=="boolean"?null:typeof F=="string"||typeof F=="number"||typeof F=="bigint"?D2(null,F,null,null,F):Array.isArray(F)?D2(M2,{children:F},null,null,null):F.__b>0?D2(F.type,F.props,F.key,null,F.__v):F)!=null){if(F.__=J,F.__b=J.__b+1,(D=H[Q])===null||D&&F.key==D.key&&F.type===D.type)H[Q]=void 0;else for(U=0;U<k;U++){if((D=H[U])&&F.key==D.key&&F.type===D.type){H[U]=void 0;break}D=null}X1(_,F,D=D||k2,X,Z,K,V,G,W),E=F.__e,(U=F.ref)&&D.ref!=U&&(I||(I=[]),D.ref&&I.push(D.ref,null,F),I.push(U,F.__c||E,F)),E!=null?(P==null&&(P=E),typeof F.type=="function"&&F.__k!=null&&F.__k===D.__k?F.__d=G=_3(F,G,_):G=$3(_,F,D,H,E,G),W||J.type!=="option"?typeof J.type=="function"&&(J.__d=G):_.value=""):G&&D.__e==G&&G.parentNode!=_&&(G=$2(D))}for(J.__e=P,Q=k;Q--;)H[Q]!=null&&(typeof J.type=="function"&&H[Q].__e!=null&&H[Q].__e==J.__d&&(J.__d=$2(Y,Q+1)),Z3(H[Q],H[Q]));if(I)for(Q=0;Q<I.length;Q++)Y3(I[Q],I[++Q],I[++Q])}function _3(_,$,J){var Y,X;for(Y=0;Y<_.__k.length;Y++)(X=_.__k[Y])&&(X.__=_,$=typeof X.type=="function"?_3(X,$,J):$3(J,X,X,_.__k,X.__e,$));return $}function $3(_,$,J,Y,X,Z){var K,V,G;if($.__d!==void 0)K=$.__d,$.__d=void 0;else if(J==null||X!=Z||X.parentNode==null)_:if(Z==null||Z.parentNode!==_)_.appendChild(X),K=null;else{for(V=Z,G=0;(V=V.nextSibling)&&G<Y.length;G+=2)if(V==X)break _;_.insertBefore(X,Z),K=Z}return K!==void 0?K:X.nextSibling}function v1(_,$,J){$[0]==="-"?_.setProperty($,J):_[$]=J==null?"":typeof J!="number"||o4.test($)?J:J+"px"}function E2(_,$,J,Y,X){var Z;_:if($==="style")if(typeof J=="string")_.style.cssText=J;else{if(typeof Y=="string"&&(_.style.cssText=Y=""),Y)for($ in Y)J&&$ in J||v1(_.style,$,"");if(J)for($ in J)Y&&J[$]===Y[$]||v1(_.style,$,J[$])}else if($[0]==="o"&&$[1]==="n")Z=$!==($=$.replace(/Capture$/,"")),$=$.toLowerCase()in _?$.toLowerCase().slice(2):$.slice(2),_.l||(_.l={}),_.l[$+Z]=J,J?Y||_.addEventListener($,Z?u1:R1,Z):_.removeEventListener($,Z?u1:R1,Z);else if($!=="dangerouslySetInnerHTML"){if(X)$=$.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if($!=="href"&&$!=="list"&&$!=="form"&&$!=="tabIndex"&&$!=="download"&&$ in _)try{_[$]=J==null?"":J;break _}catch(K){}typeof J=="function"||(J!=null&&(J!==!1||$[0]==="a"&&$[1]==="r")?_.setAttribute($,J):_.removeAttribute($))}}function R1(_){this.l[_.type+!1](X_.event?X_.event(_):_)}function u1(_){this.l[_.type+!0](X_.event?X_.event(_):_)}function X1(_,$,J,Y,X,Z,K,V,G){var W,Q,U,D,F,E,P,I,H,k,T,L=$.type;if($.constructor!==void 0)return null;J.__h!=null&&(G=J.__h,V=$.__e=J.__e,$.__h=null,Z=[V]),(W=X_.__b)&&W($);try{_:if(typeof L=="function"){if(I=$.props,H=(W=L.contextType)&&Y[W.__c],k=W?H?H.props.value:W.__:Y,J.__c?P=(Q=$.__c=J.__c).__=Q.__E:(("prototype"in L)&&L.prototype.render?$.__c=Q=new L(I,k):($.__c=Q=new C2(I,k),Q.constructor=L,Q.render=d4),H&&H.sub(Q),Q.props=I,Q.state||(Q.state={}),Q.context=k,Q.__n=Y,U=Q.__d=!0,Q.__h=[]),Q.__s==null&&(Q.__s=Q.state),L.getDerivedStateFromProps!=null&&(Q.__s==Q.state&&(Q.__s=g0({},Q.__s)),g0(Q.__s,L.getDerivedStateFromProps(I,Q.__s))),D=Q.props,F=Q.state,U)L.getDerivedStateFromProps==null&&Q.componentWillMount!=null&&Q.componentWillMount(),Q.componentDidMount!=null&&Q.__h.push(Q.componentDidMount);else{if(L.getDerivedStateFromProps==null&&I!==D&&Q.componentWillReceiveProps!=null&&Q.componentWillReceiveProps(I,k),!Q.__e&&Q.shouldComponentUpdate!=null&&Q.shouldComponentUpdate(I,Q.__s,k)===!1||$.__v===J.__v){Q.props=I,Q.state=Q.__s,$.__v!==J.__v&&(Q.__d=!1),Q.__v=$,$.__e=J.__e,$.__k=J.__k,$.__k.forEach(function(R){R&&(R.__=$)}),Q.__h.length&&K.push(Q);break _}Q.componentWillUpdate!=null&&Q.componentWillUpdate(I,Q.__s,k),Q.componentDidUpdate!=null&&Q.__h.push(function(){Q.componentDidUpdate(D,F,E)})}Q.context=k,Q.props=I,Q.state=Q.__s,(W=X_.__r)&&W($),Q.__d=!1,Q.__v=$,Q.__P=_,W=Q.render(Q.props,Q.state,Q.context),Q.state=Q.__s,Q.getChildContext!=null&&(Y=g0(g0({},Y),Q.getChildContext())),U||Q.getSnapshotBeforeUpdate==null||(E=Q.getSnapshotBeforeUpdate(D,F)),T=W!=null&&W.type===M2&&W.key==null?W.props.children:W,e1(_,Array.isArray(T)?T:[T],$,J,Y,X,Z,K,V,G),Q.base=$.__e,$.__h=null,Q.__h.length&&K.push(Q),P&&(Q.__E=Q.__=null),Q.__e=!1}else Z==null&&$.__v===J.__v?($.__k=J.__k,$.__e=J.__e):$.__e=n4(J.__e,$,J,Y,X,Z,K,G);(W=X_.diffed)&&W($)}catch(R){$.__v=null,(G||Z!=null)&&($.__e=V,$.__h=!!G,Z[Z.indexOf(V)]=null),X_.__e(R,$,J)}}function J3(_,$){X_.__c&&X_.__c($,_),_.some(function(J){try{_=J.__h,J.__h=[],_.some(function(Y){Y.call(J)})}catch(Y){X_.__e(Y,J.__v)}})}function n4(_,$,J,Y,X,Z,K,V){var G,W,Q,U=J.props,D=$.props,F=$.type,E=0;if(F==="svg"&&(X=!0),Z!=null){for(;E<Z.length;E++)if((G=Z[E])&&(G===_||(F?G.localName==F:G.nodeType==3))){_=G,Z[E]=null;break}}if(_==null){if(F===null)return document.createTextNode(D);_=X?document.createElementNS("http://www.w3.org/2000/svg",F):document.createElement(F,D.is&&D),Z=null,V=!1}if(F===null)U===D||V&&_.data===D||(_.data=D);else{if(Z=Z&&w2.call(_.childNodes),W=(U=J.props||k2).dangerouslySetInnerHTML,Q=D.dangerouslySetInnerHTML,!V){if(Z!=null)for(U={},E=0;E<_.attributes.length;E++)U[_.attributes[E].name]=_.attributes[E].value;(Q||W)&&(Q&&(W&&Q.__html==W.__html||Q.__html===_.innerHTML)||(_.innerHTML=Q&&Q.__html||""))}if(function(P,I,H,k,T){var L;for(L in H)L==="children"||L==="key"||L in I||E2(P,L,null,H[L],k);for(L in I)T&&typeof I[L]!="function"||L==="children"||L==="key"||L==="value"||L==="checked"||H[L]===I[L]||E2(P,L,I[L],H[L],k)}(_,D,U,X,V),Q)$.__k=[];else if(E=$.props.children,e1(_,Array.isArray(E)?E:[E],$,J,Y,X&&F!=="foreignObject",Z,K,Z?Z[0]:J.__k&&$2(J,0),V),Z!=null)for(E=Z.length;E--;)Z[E]!=null&&s1(Z[E]);V||(("value"in D)&&(E=D.value)!==void 0&&(E!==_.value||F==="progress"&&!E)&&E2(_,"value",E,U.value,!1),("checked"in D)&&(E=D.checked)!==void 0&&E!==_.checked&&E2(_,"checked",E,U.checked,!1))}return _}function Y3(_,$,J){try{typeof _=="function"?_($):_.current=$}catch(Y){X_.__e(Y,J)}}function Z3(_,$,J){var Y,X;if(X_.unmount&&X_.unmount(_),(Y=_.ref)&&(Y.current&&Y.current!==_.__e||Y3(Y,null,$)),(Y=_.__c)!=null){if(Y.componentWillUnmount)try{Y.componentWillUnmount()}catch(Z){X_.__e(Z,$)}Y.base=Y.__P=null}if(Y=_.__k)for(X=0;X<Y.length;X++)Y[X]&&Z3(Y[X],$,typeof _.type!="function");J||_.__e==null||s1(_.__e),_.__e=_.__d=void 0}function d4(_,$,J){return this.constructor(_,J)}function X3(_,$,J){var Y,X,Z;X_.__&&X_.__(_,$),X=(Y=typeof J=="function")?null:J&&J.__k||$.__k,Z=[],X1($,_=(!Y&&J||$).__k=a1(M2,null,[_]),X||k2,k2,$.ownerSVGElement!==void 0,!Y&&J?[J]:X?null:$.firstChild?w2.call($.childNodes):null,Z,!Y&&J?J:X?X.__e:$.firstChild,Y),J3(Z,_)}w2=r1.slice,X_={__e:function(_,$){for(var J,Y,X;$=$.__;)if((J=$.__c)&&!J.__)try{if((Y=J.constructor)&&Y.getDerivedStateFromError!=null&&(J.setState(Y.getDerivedStateFromError(_)),X=J.__d),J.componentDidCatch!=null&&(J.componentDidCatch(_),X=J.__d),X)return J.__E=J}catch(Z){_=Z}throw _}},n1=0,C2.prototype.setState=function(_,$){var J;J=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=g0({},this.state),typeof _=="function"&&(_=_(g0({},J),this.props)),_&&g0(J,_),_!=null&&this.__v&&($&&this.__h.push($),f1(this))},C2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),f1(this))},C2.prototype.render=M2,q2=[],d1=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,A2.__r=0,l4=0;var P2,z0,m1,N2=0,Y1=[],g1=X_.__b,c1=X_.__r,p1=X_.diffed,h1=X_.__c,i1=X_.unmount;function Q1(_,$){X_.__h&&X_.__h(z0,_,N2||$),N2=0;var J=z0.__H||(z0.__H={__:[],__h:[]});return _>=J.__.length&&J.__.push({}),J.__[_]}function v(_){return N2=1,r4(j3,_)}function r4(_,$,J){var Y=Q1(P2++,2);return Y.t=_,Y.__c||(Y.__=[J?J($):j3(void 0,$),function(X){var Z=Y.t(Y.__[0],X);Y.__[0]!==Z&&(Y.__=[Z,Y.__[1]],Y.__c.setState({}))}],Y.__c=z0),Y.__}function c(_,$){var J=Q1(P2++,3);!X_.__s&&Q3(J.__H,$)&&(J.__=_,J.__H=$,z0.__H.__h.push(J))}function A(_){return N2=5,T0(function(){return{current:_}},[])}function T0(_,$){var J=Q1(P2++,7);return Q3(J.__H,$)&&(J.__=_(),J.__H=$,J.__h=_),J.__}function b(_,$){return N2=8,T0(function(){return _},$)}function s4(){Y1.forEach(function(_){if(_.__P)try{_.__H.__h.forEach(y2),_.__H.__h.forEach(Z1),_.__H.__h=[]}catch($){_.__H.__h=[],X_.__e($,_.__v)}}),Y1=[]}X_.__b=function(_){z0=null,g1&&g1(_)},X_.__r=function(_){c1&&c1(_),P2=0;var $=(z0=_.__c).__H;$&&($.__h.forEach(y2),$.__h.forEach(Z1),$.__h=[])},X_.diffed=function(_){p1&&p1(_);var $=_.__c;$&&$.__H&&$.__H.__h.length&&(Y1.push($)!==1&&m1===X_.requestAnimationFrame||((m1=X_.requestAnimationFrame)||function(J){var Y,X=function(){clearTimeout(Z),l1&&cancelAnimationFrame(Y),setTimeout(J)},Z=setTimeout(X,100);l1&&(Y=requestAnimationFrame(X))})(s4)),z0=void 0},X_.__c=function(_,$){$.some(function(J){try{J.__h.forEach(y2),J.__h=J.__h.filter(function(Y){return!Y.__||Z1(Y)})}catch(Y){$.some(function(X){X.__h&&(X.__h=[])}),$=[],X_.__e(Y,J.__v)}}),h1&&h1(_,$)},X_.unmount=function(_){i1&&i1(_);var $=_.__c;if($&&$.__H)try{$.__H.__.forEach(y2)}catch(J){X_.__e(J,$.__v)}};var l1=typeof requestAnimationFrame=="function";function y2(_){var $=z0;typeof _.__c=="function"&&_.__c(),z0=$}function Z1(_){var $=z0;_.__c=_.__(),z0=$}function Q3(_,$){return!_||_.length!==$.length||$.some(function(J,Y){return J!==_[Y]})}function j3(_,$){return typeof $=="function"?$(_):$}var K3=function(_,$,J,Y){var X;$[0]=0;for(var Z=1;Z<$.length;Z++){var K=$[Z++],V=$[Z]?($[0]|=K?1:2,J[$[Z++]]):$[++Z];K===3?Y[0]=V:K===4?Y[1]=Object.assign(Y[1]||{},V):K===5?(Y[1]=Y[1]||{})[$[++Z]]=V:K===6?Y[1][$[++Z]]+=V+"":K?(X=_.apply(V,K3(_,V,J,["",null])),Y.push(X),V[0]?$[0]|=2:($[Z-2]=0,$[Z]=X)):Y.push(V)}return Y},o1=new Map,N=function(_){var $=o1.get(this);return $||($=new Map,o1.set(this,$)),($=K3(this,$.get(_)||($.set(_,$=function(J){for(var Y,X,Z=1,K="",V="",G=[0],W=function(D){Z===1&&(D||(K=K.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?G.push(0,D,K):Z===3&&(D||K)?(G.push(3,D,K),Z=2):Z===2&&K==="..."&&D?G.push(4,D,0):Z===2&&K&&!D?G.push(5,0,!0,K):Z>=5&&((K||!D&&Z===5)&&(G.push(Z,0,K,X),Z=6),D&&(G.push(Z,D,0,X),Z=6)),K=""},Q=0;Q<J.length;Q++){Q&&(Z===1&&W(),W(Q));for(var U=0;U<J[Q].length;U++)Y=J[Q][U],Z===1?Y==="<"?(W(),G=[G],Z=3):K+=Y:Z===4?K==="--"&&Y===">"?(Z=1,K=""):K=Y+K[0]:V?Y===V?V="":K+=Y:Y==='"'||Y==="'"?V=Y:Y===">"?(W(),Z=1):Z&&(Y==="="?(Z=5,X=K,K=""):Y==="/"&&(Z<5||J[Q][U+1]===">")?(W(),Z===3&&(G=G[0]),Z=G,(G=G[0]).push(2,0,Z),Z=0):Y===" "||Y==="\t"||Y===`
`||Y==="\r"?(W(),Z=2):K+=Y),Z===3&&K==="!--"&&(Z=4,G=G[0])}return W(),G}(_)),$),arguments,[])).length>1?$:$[0]}.bind(a1);async function o_(_,$={}){let J=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!J.ok){let Y=await J.json().catch(()=>({error:"Unknown error"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function b2(_=10,$=null){let J=`/timeline?limit=${_}`;if($)J+=`&before=${$}`;return o_(J)}async function G3(_,$=50,J=0){return o_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${J}`)}async function V3(_,$=50,J=0){return o_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${J}`)}async function W3(_){return o_(`/thread/${_}`)}async function O3(_,$=!1){let J=`/post/${_}?cascade=${$?"true":"false"}`;return o_(J,{method:"DELETE"})}async function j1(_,$,J=null,Y=[]){return o_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:J,media_ids:Y})})}async function q3(){return o_("/agents")}async function N3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/status${$}`)}async function K1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/context${$}`)}async function l0(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/models${$}`)}async function B3(_){let $=new FormData;$.append("file",_);let J=await fetch("/media/upload",{method:"POST",body:$});if(!J.ok){let Y=await J.json().catch(()=>({error:"Upload failed"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function G1(_,$){let J=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Failed to respond"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function z3(_,$){let J=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function H3(_,$="thought"){let J=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return o_(J)}async function U3(_,$,J){return o_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(J)})})}function J2(_){return`/media/${_}`}function F3(_){return`/media/${_}/thumbnail`}async function I2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function S2(_="",$=2,J=!1){let Y=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${J?"1":"0"}`;return o_(Y)}async function L3(_,$=20000,J=null){let Y=J?`&mode=${encodeURIComponent(J)}`:"",X=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${Y}`;return o_(X)}async function E3(_){return o_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function V1(_,$="",J={}){let Y=new FormData;Y.append("file",_);let X=new URLSearchParams;if($)X.set("path",$);if(J.overwrite)X.set("overwrite","1");let Z=X.toString(),K=Z?`/workspace/upload?${Z}`:"/workspace/upload",V=await fetch(""+K,{method:"POST",body:Y});if(!V.ok){let G=await V.json().catch(()=>({error:"Upload failed"})),W=Error(G.error||`HTTP ${V.status}`);throw W.status=V.status,W.code=G.code,W}return V.json()}async function D3(_,$,J=""){let Y=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:J})});if(!Y.ok){let X=await Y.json().catch(()=>({error:"Create failed"})),Z=Error(X.error||`HTTP ${Y.status}`);throw Z.status=Y.status,Z.code=X.code,Z}return Y.json()}async function C3(_,$){let J=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Rename failed"})),X=Error(Y.error||`HTTP ${J.status}`);throw X.status=J.status,X.code=Y.code,X}return J.json()}async function y3(_,$){let J=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Move failed"})),X=Error(Y.error||`HTTP ${J.status}`);throw X.status=J.status,X.code=Y.code,X}return J.json()}async function k3(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return o_($,{method:"DELETE"})}async function x2(_,$=!1){return o_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function W1(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function A3(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class O1{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,J=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,J+$),this.reconnectAttempts=0;let Y=Math.max(this.cooldownUntil-J,0),X=Math.max(this.reconnectDelay,Y);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},X),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function o0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function f_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function Y2(_,$=!1){let J=o0(_);if(J===null)return $;return J==="true"}function Z2(_,$=null){let J=o0(_);if(J===null)return $;let Y=parseInt(J,10);return Number.isFinite(Y)?Y:$}function c0({prefix:_="file",label:$,title:J,onRemove:Y,onClick:X,removeTitle:Z="Remove",icon:K="file"}){let V=`${_}-file-pill`,G=`${_}-file-name`,W=`${_}-file-remove`,Q=K==="message"?N`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:N`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return N`
    <span class=${V} title=${J||$} onClick=${X}>
      ${Q}
      <span class=${G}>${$}</span>
      ${Y&&N`
        <button
          class=${W}
          onClick=${(U)=>{U.preventDefault(),U.stopPropagation(),Y()}}
          title=${Z}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var t4=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function e4({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),J=_.tokens,Y=_.contextWindow,X=J!=null?`Context: ${w3(J)} / ${w3(Y)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,Z=7,K=2*Math.PI*7,V=$/100*K,G=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return N`
        <span class="compose-context-pie icon-btn" title=${X}>
            <svg width="16" height="16" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke="var(--context-track, rgba(128,128,128,0.2))"
                    stroke-width="2.5" />
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke=${G}
                    stroke-width="2.5"
                    stroke-dasharray=${`${V} ${K}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `}function w3(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function M3({onPost:_,onFocus:$,searchMode:J,onSearch:Y,onEnterSearch:X,onExitSearch:Z,fileRefs:K=[],onRemoveFileRef:V,onClearFileRefs:G,messageRefs:W=[],onRemoveMessageRef:Q,onClearMessageRefs:U,activeModel:D=null,modelUsage:F=null,thinkingLevel:E=null,supportsThinking:P=!1,contextUsage:I=null,notificationsEnabled:H=!1,notificationPermission:k="default",onToggleNotifications:T,onModelChange:L,onModelStateChange:R,activeEditorPath:r=null,onAttachEditorFile:s,onOpenFilePill:l}){let[e,h]=v(""),[a,q_]=v(""),[K_,F_]=v(!1),[J_,Z_]=v([]),[S_,B_]=v(!1),[g,G_]=v([]),[Q_,j_]=v(0),[C_,V_]=v(!1),[N_,x_]=v(!1),[L_,E_]=v(!1),[v_,z_]=v([]),[R_,a_]=v(!1),y_=A(null),M_=A(null),$0=A(null),J0=A(null),Y0=A(0),w0=200,W0=(z)=>{let f=new Set,o=[];for(let $_ of z||[]){if(typeof $_!=="string")continue;let H_=$_.trim();if(!H_||f.has(H_))continue;f.add(H_),o.push(H_)}return o},D_=()=>{let z=o0("piclaw_compose_history");if(!z)return[];try{let f=JSON.parse(z);if(!Array.isArray(f))return[];return W0(f)}catch{return[]}},c_=(z)=>{f_("piclaw_compose_history",JSON.stringify(z))},Z0=A(D_()),w=A(-1),n=A(""),k_=!K_&&(e.trim()||J_.length>0||K.length>0||W.length>0),b_=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),X0=typeof window<"u"&&typeof Notification<"u",O0=typeof window<"u"?Boolean(window.isSecureContext):!1,H0=X0&&O0&&k!=="denied",M0=k==="granted"&&H,q0=M0?"Disable notifications":"Enable notifications",u_=D||"",E0=P&&E?` (${E})`:"",Q0=E0.trim()?`${E}`:"",v0=typeof F?.hint_short==="string"?F.hint_short.trim():"",R0=[Q0||null,v0||null].filter(Boolean).join(" • "),n_=[u_?`Current model: ${u_}${E0}`:null,F?.plan?`Plan: ${F.plan}`:null,v0||null,F?.primary?.reset_description||null,F?.secondary?.reset_description||null].filter(Boolean),D0=N_?"Switching model…":n_.join(" • ")||`Current model: ${u_}${E0} (tap to open model picker)`,h_=(z)=>{if(!z||typeof z!=="object")return;let f=z.model??z.current;if(typeof R==="function")R({model:f??null,thinking_level:z.thinking_level??null,supports_thinking:z.supports_thinking,provider_usage:z.provider_usage??null});if(f&&typeof L==="function")L(f)},j0=(z)=>{let f=z||y_.current;if(!f)return;f.style.height="auto",f.style.height=`${f.scrollHeight}px`,f.style.overflowY="hidden"},t_=(z)=>{if(!z.startsWith("/")||z.includes(`
`)){V_(!1),G_([]);return}let f=z.toLowerCase().split(" ")[0];if(f.length<1){V_(!1),G_([]);return}let o=t4.filter(($_)=>$_.name.startsWith(f)||$_.name.replace(/-/g,"").startsWith(f.replace(/-/g,"")));if(o.length>0&&!(o.length===1&&o[0].name===f))G_(o),j_(0),V_(!0);else V_(!1),G_([])},P0=(z)=>{let f=e,o=f.indexOf(" "),$_=o>=0?f.slice(o):"",H_=z.name+$_;h(H_),V_(!1),G_([]),requestAnimationFrame(()=>{let A_=y_.current;if(!A_)return;let O_=H_.length;A_.selectionStart=O_,A_.selectionEnd=O_,A_.focus()})},b0=(z)=>{if(J)q_(z);else h(z),t_(z);requestAnimationFrame(()=>j0())},N0=(z)=>{let f=J?a:e,o=f&&!f.endsWith(`
`)?`
`:"",$_=`${f}${o}${z}`.trimStart();b0($_)},U0=(z)=>{let f=z?.command?.model_label;if(f)return f;let o=z?.command?.message;if(typeof o==="string"){let $_=o.match(/•\s+([^\n]+?)\s+\(current\)/);if($_?.[1])return $_[1].trim()}return null},T_=async(z)=>{if(J||K_||N_)return;x_(!0);try{let f=await j1("default",z,null,[]),o=U0(f);h_({model:o??D??null,thinking_level:f?.command?.thinking_level,supports_thinking:f?.command?.supports_thinking});try{let $_=await l0();if($_)h_($_)}catch{}return _?.(),!0}catch(f){return console.error("Failed to switch model:",f),alert("Failed to switch model: "+f.message),!1}finally{x_(!1)}},B0=async()=>{await T_("/cycle-model")},K0=async(z)=>{if(!z||N_)return;if(await T_(`/model ${z}`))E_(!1)},m_=(z)=>{z.preventDefault(),z.stopPropagation(),E_((f)=>!f)},g_=async(z)=>{let f=typeof z==="string"?z:z&&typeof z?.target?.value==="string"?z.target.value:e,o=typeof f==="string"?f:"";if(!o.trim()&&J_.length===0&&K.length===0&&W.length===0)return;F_(!0);try{let $_=[];for(let w_ of J_){let P_=await B3(w_);$_.push(P_.id)}let H_=o.trim(),A_=K.length?`Files:
${K.map((w_)=>`- ${w_}`).join(`
`)}`:"",O_=W.length?`Referenced messages:
${W.map((w_)=>`- message:${w_}`).join(`
`)}`:"",p_=$_.length?`Images:
${$_.map((w_,P_)=>{let K2=J_[P_]?.name||`image-${P_+1}`;return`- attachment:${w_} (${K2})`}).join(`
`)}`:"",G0=[H_,A_,O_,p_].filter(Boolean).join(`

`),S0=await j1("default",G0,null,$_);if(S0?.command){h_({model:S0.command.model_label??D??null,thinking_level:S0.command.thinking_level,supports_thinking:S0.command.supports_thinking});try{let w_=await l0();if(w_)h_(w_)}catch{}}if(H_){let w_=Z0.current,P_=W0(w_.filter((L0)=>L0!==H_));if(P_.push(H_),P_.length>200)P_.splice(0,P_.length-200);Z0.current=P_,c_(P_),w.current=-1,n.current=""}h(""),Z_([]),G?.(),U?.(),_?.()}catch($_){console.error("Failed to post:",$_),alert("Failed to post: "+$_.message)}finally{F_(!1)}},i_=(z)=>{if(z.isComposing)return;if(J&&z.key==="Escape"){z.preventDefault(),q_(""),Z?.();return}if(C_&&g.length>0){let f=y_.current?.value??(J?a:e);if(!String(f||"").startsWith("/"))V_(!1),G_([]);else{if(z.key==="ArrowDown"){z.preventDefault(),j_((o)=>(o+1)%g.length);return}if(z.key==="ArrowUp"){z.preventDefault(),j_((o)=>(o-1+g.length)%g.length);return}if(z.key==="Tab"){z.preventDefault(),P0(g[Q_]);return}if(z.key==="Enter"&&!z.shiftKey){if(!(y_.current?.value??(J?a:e)).includes(" ")){z.preventDefault();let H_=g[Q_];V_(!1),G_([]),g_(H_.name);return}}if(z.key==="Escape"){z.preventDefault(),V_(!1),G_([]);return}}}if(!J&&(z.key==="ArrowUp"||z.key==="ArrowDown")&&!z.metaKey&&!z.ctrlKey&&!z.altKey&&!z.shiftKey){let f=y_.current;if(!f)return;let o=f.value||"",$_=f.selectionStart===0&&f.selectionEnd===0,H_=f.selectionStart===o.length&&f.selectionEnd===o.length;if(z.key==="ArrowUp"&&$_||z.key==="ArrowDown"&&H_){let A_=Z0.current;if(!A_.length)return;z.preventDefault();let O_=w.current;if(z.key==="ArrowUp"){if(O_===-1)n.current=o,O_=A_.length-1;else if(O_>0)O_-=1;w.current=O_,b0(A_[O_]||"")}else{if(O_===-1)return;if(O_<A_.length-1)O_+=1,w.current=O_,b0(A_[O_]||"");else w.current=-1,b0(n.current||""),n.current=""}requestAnimationFrame(()=>{let p_=y_.current;if(!p_)return;let G0=p_.value.length;p_.selectionStart=G0,p_.selectionEnd=G0});return}}if(z.key==="Enter"&&!z.shiftKey){z.preventDefault();let f=y_.current?.value??(J?a:e);if(J){if(f.trim())Y?.(f.trim())}else g_(f)}},e_=(z)=>{let f=Array.from(z||[]).filter((o)=>o&&o.type&&o.type.startsWith("image/"));if(!f.length)return;Z_((o)=>[...o,...f])},C0=(z)=>{e_(z.target.files),z.target.value=""},F0=(z)=>{if(J)return;z.preventDefault(),z.stopPropagation(),Y0.current+=1,B_(!0)},I0=(z)=>{if(J)return;if(z.preventDefault(),z.stopPropagation(),Y0.current=Math.max(0,Y0.current-1),Y0.current===0)B_(!1)},r_=(z)=>{if(J)return;if(z.preventDefault(),z.stopPropagation(),z.dataTransfer)z.dataTransfer.dropEffect="copy";B_(!0)},u0=(z)=>{if(J)return;z.preventDefault(),z.stopPropagation(),Y0.current=0,B_(!1),e_(z.dataTransfer?.files||[])},p0=(z)=>{if(J)return;let f=z.clipboardData?.items;if(!f||!f.length)return;let o=[];for(let $_ of f){if($_.kind!=="file")continue;let H_=$_.getAsFile?.();if(H_)o.push(H_)}if(o.length>0)z.preventDefault(),e_(o)},h0=(z)=>{Z_((f)=>f.filter((o,$_)=>$_!==z))},n0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((z)=>{let{latitude:f,longitude:o,accuracy:$_}=z.coords,H_=`${f.toFixed(5)}, ${o.toFixed(5)}`,A_=Number.isFinite($_)?` ±${Math.round($_)}m`:"",O_=`https://maps.google.com/?q=${f},${o}`,p_=`Location: ${H_}${A_} ${O_}`;N0(p_)},(z)=>{let f=z?.message||"Unable to retrieve location.";alert(`Location error: ${f}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};c(()=>{if(!L_)return;a_(!0),l0().then((z)=>{let f=Array.isArray(z?.models)?z.models.filter((o)=>typeof o==="string"&&o.trim().length>0):[];z_(f),h_(z)}).catch((z)=>{console.warn("Failed to load model list:",z),z_([])}).finally(()=>{a_(!1)})},[L_,D]),c(()=>{if(J)E_(!1)},[J]),c(()=>{if(!L_)return;let z=(f)=>{let o=$0.current,$_=J0.current,H_=f.target;if(o&&o.contains(H_))return;if($_&&$_.contains(H_))return;E_(!1)};return document.addEventListener("pointerdown",z),()=>document.removeEventListener("pointerdown",z)},[L_]);let y0=(z)=>{let f=z.target.value;j0(z.target),b0(f)};return c(()=>{requestAnimationFrame(()=>j0())},[e,a,J]),N`
        <div class="compose-box">
            <div
                class=${`compose-input-wrapper${S_?" drag-active":""}`}
                onDragEnter=${F0}
                onDragOver=${r_}
                onDragLeave=${I0}
                onDrop=${u0}
            >
                <div class="compose-input-main">
                    ${(K.length>0||J_.length>0||W.length>0)&&N`
                        <div class="compose-file-refs">
                            ${W.map((z)=>{return N`
                                    <${c0}
                                        key=${"msg-"+z}
                                        prefix="compose"
                                        label=${"msg:"+z}
                                        title=${"Message reference: "+z}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>Q?.(z)}
                                    />
                                `})}
                            ${K.map((z)=>{let f=z.split("/").pop()||z;return N`
                                    <${c0}
                                        prefix="compose"
                                        label=${f}
                                        title=${z}
                                        onClick=${()=>l?.(z)}
                                        removeTitle="Remove file"
                                        onRemove=${()=>V?.(z)}
                                    />
                                `})}
                            ${J_.map((z,f)=>{let o=z?.name||`image-${f+1}`;return N`
                                    <${c0}
                                        key=${o+f}
                                        prefix="compose"
                                        label=${o}
                                        title=${o}
                                        removeTitle="Remove image"
                                        onRemove=${()=>h0(f)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${y_}
                        placeholder=${J?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${J?a:e}
                        onInput=${y0}
                        onKeyDown=${i_}
                        onPaste=${p0}
                        onFocus=${$}
                        onClick=${$}
                        disabled=${K_}
                        rows="1"
                    />
                    ${C_&&g.length>0&&N`
                        <div class="slash-autocomplete" ref=${M_}>
                            ${g.map((z,f)=>N`
                                <div
                                    key=${z.name}
                                    class=${`slash-item${f===Q_?" active":""}`}
                                    onMouseDown=${(o)=>{o.preventDefault(),P0(z)}}
                                    onMouseEnter=${()=>j_(f)}
                                >
                                    <span class="slash-name">${z.name}</span>
                                    <span class="slash-desc">${z.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${L_&&!J&&N`
                        <div class="compose-model-popup" ref=${$0}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${R_&&N`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!R_&&v_.length===0&&N`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!R_&&v_.map((z)=>N`
                                    <button
                                        key=${z}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${D===z?" active":""}`}
                                        onClick=${()=>{K0(z)}}
                                        disabled=${N_}
                                    >
                                        ${z}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{B0()}}
                                    disabled=${N_}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!J&&D&&N`
                        <div class="compose-meta-row">
                            <div class="compose-model-meta">
                                <button
                                    ref=${J0}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${D0}
                                    aria-label="Open model picker"
                                    onClick=${m_}
                                    disabled=${K_||N_}
                                >
                                    ${N_?"Switching…":u_}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!N_&&R0&&N`
                                        <span class="compose-model-usage-hint" title=${D0}>
                                            ${R0}
                                        </span>
                                    `}
                                </div>
                            </div>
                        </div>
                    `}
                    <div class="compose-actions ${J?"search-mode":""}">
                    ${!J&&I&&I.percent!=null&&N`
                        <${e4} usage=${I} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${J?Z:X}
                        title=${J?"Close search":"Search"}
                    >
                        ${J?N`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        `:N`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        `}
                    </button>
                    ${b_&&!J&&N`
                        <button
                            class="icon-btn location-btn"
                            onClick=${n0}
                            title="Share location"
                            type="button"
                            disabled=${K_}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14 14 0 0 1 0 20a14 14 0 0 1 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                        </button>
                    `}
                    ${H0&&!J&&N`
                        <button
                            class=${`icon-btn notification-btn${M0?" active":""}`}
                            onClick=${T}
                            title=${q0}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!J&&N`
                        ${r&&s&&N`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${s}
                                title=${`Attach open file: ${r}`}
                                type="button"
                                disabled=${K_||K.includes(r)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${C0} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{g_()}}
                            disabled=${!k_}
                            title="Send (Ctrl+Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var b3="piclaw_theme",B1="piclaw_tint",v2={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},_8={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},P3={default:{label:"Default",mode:"auto",light:v2,dark:_8},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},$8=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],R2={theme:"default",tint:null},I3="light",q1=!1;function S3(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function X2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let J=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(J)&&!/^[0-9a-fA-F]{6}$/.test(J))return null;let Y=J.length===3?J.split("").map((Z)=>Z+Z).join(""):J,X=parseInt(Y,16);return{r:X>>16&255,g:X>>8&255,b:X&255,hex:`#${Y.toLowerCase()}`}}function J8(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let J=document.createElement("div");if(J.style.color="",J.style.color=$,!J.style.color)return null;let Y=J.style.color;try{if(document.body)J.style.display="none",document.body.appendChild(J),Y=getComputedStyle(J).color||J.style.color,document.body.removeChild(J)}catch{}let X=Y.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!X)return null;let Z=parseInt(X[1],10),K=parseInt(X[2],10),V=parseInt(X[3],10);if(![Z,K,V].every((W)=>Number.isFinite(W)))return null;let G=`#${[Z,K,V].map((W)=>W.toString(16).padStart(2,"0")).join("")}`;return{r:Z,g:K,b:V,hex:G}}function x3(_){return X2(_)||J8(_)}function B2(_,$,J){let Y=Math.round(_.r+($.r-_.r)*J),X=Math.round(_.g+($.g-_.g)*J),Z=Math.round(_.b+($.b-_.b)*J);return`rgb(${Y} ${X} ${Z})`}function N1(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function T3(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function z1(_){return P3[_]||P3.default}function Y8(_){return _.mode==="auto"?T3():_.mode}function Z8(_,$){let J=z1(_);if($==="dark"&&J.dark)return J.dark;if($==="light"&&J.light)return J.light;return J.dark||J.light||v2}function X8(_,$,J){let Y=x3($);if(!Y)return _;let X=X2(_.bgPrimary),Z=X2(_.bgSecondary),K=X2(_.bgHover),V=X2(_.borderColor);if(!X||!Z||!K||!V)return _;let W=X2(J==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:B2(X,Y,0.08),bgSecondary:B2(Z,Y,0.12),bgHover:B2(K,Y,0.16),borderColor:B2(V,Y,0.08),accent:Y.hex,accentHover:W?B2(Y,W,0.18):Y.hex}}function Q8(_,$){if(typeof document>"u")return;let J=document.documentElement,Y=_.accent,X=x3(Y),Z=X?N1(X,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,K=X?N1(X,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",V=X?N1(X,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",G={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":Y,"--accent-hover":_.accentHover||Y,"--accent-soft":K,"--accent-soft-strong":V,"--danger-color":_.danger||v2.danger,"--success-color":_.success||v2.success,"--search-highlight-color":Z||"rgba(29, 155, 240, 0.2)"};Object.entries(G).forEach(([W,Q])=>{if(Q)J.style.setProperty(W,Q)})}function j8(){if(typeof document>"u")return;let _=document.documentElement;$8.forEach(($)=>_.style.removeProperty($))}function T2(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function K8(_,$){if(typeof document>"u")return;let J=T2("theme-color");if(J&&_)J.setAttribute("content",_);let Y=T2("msapplication-TileColor");if(Y&&_)Y.setAttribute("content",_);let X=T2("msapplication-navbutton-color");if(X&&_)X.setAttribute("content",_);let Z=T2("apple-mobile-web-app-status-bar-style");if(Z)Z.setAttribute("content",$==="dark"?"black-translucent":"default")}function G8(){if(typeof window>"u")return;let _={...R2,mode:I3};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function H1(_,$={}){if(typeof window>"u"||typeof document>"u")return;let J=S3(_?.theme||"default"),Y=_?.tint?String(_.tint).trim():null,X=z1(J),Z=Y8(X),K=Z8(J,Z);R2={theme:J,tint:Y},I3=Z;let V=document.documentElement;V.dataset.theme=Z,V.dataset.colorTheme=J,V.dataset.tint=Y?String(Y):"",V.style.colorScheme=Z;let G=K;if(J==="default"&&Y)G=X8(K,Y,Z);if(J==="default"&&!Y)j8();else Q8(G,Z);if(K8(G.bgPrimary,Z),G8(),$.persist!==!1)if(f_(b3,J),Y)f_(B1,Y);else f_(B1,"")}function f2(){if(z1(R2.theme).mode!=="auto")return;H1(R2,{persist:!1})}function f3(){if(typeof window>"u")return()=>{};let _=S3(o0(b3)||"default"),$=o0(B1),J=$?$.trim():null;if(H1({theme:_,tint:J},{persist:!1}),window.matchMedia&&!q1){let Y=window.matchMedia("(prefers-color-scheme: dark)");if(Y.addEventListener)Y.addEventListener("change",f2);else if(Y.addListener)Y.addListener(f2);return q1=!0,()=>{if(Y.removeEventListener)Y.removeEventListener("change",f2);else if(Y.removeListener)Y.removeListener(f2);q1=!1}}return()=>{}}function v3(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let J=_.theme??_.name??_.colorTheme,Y=_.tint??null;H1({theme:J||"default",tint:Y},{persist:!0})}function R3(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return T3()}var u2=/#(\w+)/g,V8=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),W8=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),O8=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),q8={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},N8=new Set(["http:","https:","mailto:",""]);function u3(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function Q2(_,$={}){if(!_)return null;let J=String(_).trim();if(!J)return null;if(J.startsWith("#")||J.startsWith("/"))return J;if(J.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(J))return J;return null}if(J.startsWith("blob:"))return J;try{let Y=new URL(J,typeof window<"u"?window.location.origin:"http://localhost");if(!N8.has(Y.protocol))return null;return Y.href}catch{return null}}function m3(_,$={}){if(!_)return"";let J=new DOMParser().parseFromString(_,"text/html"),Y=[],X=J.createTreeWalker(J.body,NodeFilter.SHOW_ELEMENT),Z;while(Z=X.nextNode())Y.push(Z);for(let K of Y){let V=K.tagName.toLowerCase();if(!W8.has(V)){let W=K.parentNode;if(!W)continue;while(K.firstChild)W.insertBefore(K.firstChild,K);W.removeChild(K);continue}let G=q8[V]||new Set;for(let W of Array.from(K.attributes)){let Q=W.name.toLowerCase(),U=W.value;if(Q.startsWith("on")){K.removeAttribute(W.name);continue}if(Q.startsWith("data-")||Q.startsWith("aria-"))continue;if(G.has(Q)||O8.has(Q)){if(Q==="href"){let D=Q2(U);if(!D)K.removeAttribute(W.name);else if(K.setAttribute(W.name,D),V==="a"&&!K.getAttribute("rel"))K.setAttribute("rel","noopener noreferrer")}else if(Q==="src"){let D=V==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(U):U,F=Q2(D,{allowDataImage:V==="img"});if(!F)K.removeAttribute(W.name);else K.setAttribute(W.name,F)}continue}K.removeAttribute(W.name)}}return J.body.innerHTML}function g3(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function m2(_,$=2){if(!_)return _;let J=_;for(let Y=0;Y<$;Y+=1){let X=g3(J);if(X===J)break;J=X}return J}function B8(_){if(!_)return{text:"",blocks:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=[],X=[],Z=!1,K=[];for(let V of J){if(!Z&&V.trim().match(/^```mermaid\s*$/i)){Z=!0,K=[];continue}if(Z&&V.trim().match(/^```\s*$/)){let G=Y.length;Y.push(K.join(`
`)),X.push(`@@MERMAID_BLOCK_${G}@@`),Z=!1,K=[];continue}if(Z)K.push(V);else X.push(V)}if(Z)X.push("```mermaid"),X.push(...K);return{text:X.join(`
`),blocks:Y}}function z8(_){if(!_)return _;return m2(_,5)}function H8(_){let $=new TextEncoder().encode(String(_||"")),J="";for(let Y of $)J+=String.fromCharCode(Y);return btoa(J)}function U8(_){let $=atob(String(_||"")),J=new Uint8Array($.length);for(let Y=0;Y<$.length;Y+=1)J[Y]=$.charCodeAt(Y);return new TextDecoder().decode(J)}function F8(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(J,Y)=>{let X=Number(Y),Z=$[X]??"",K=z8(Z);return`<div class="mermaid-container" data-mermaid="${H8(K)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function c3(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,J)=>{if(J.includes(`
`))return`
\`\`\`
${J}
\`\`\`
`;return`\`${J}\``})}function p3(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,J)=>{let Y=J.trim(),X=Y.startsWith("/"),Z=X?Y.slice(1).trim():Y,G=(Z.endsWith("/")?Z.slice(0,-1).trim():Z).split(/\s+/)[0]?.toLowerCase();if(!G||!V8.has(G))return $;if(G==="br")return X?"":"<br>";if(X)return`</${G}>`;return`<${G}>`})}function h3(_){if(!_)return _;let $=(J)=>J.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(J,Y)=>`<pre><code>${$(Y)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(J,Y)=>`<code>${$(Y)}</code>`)}function i3(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Y=(Z)=>Z.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),X;while(X=J.nextNode()){if(!X.nodeValue)continue;let Z=Y(X.nodeValue);if(Z!==X.nodeValue)X.nodeValue=Z}return $.body.innerHTML}function L8(_){if(!window.katex)return _;let $=(K)=>g3(K).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),J=(K)=>{let V=[],G=K.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(W)=>{let Q=V.length;return V.push(W),`@@CODE_BLOCK_${Q}@@`});return G=G.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(W)=>{let Q=V.length;return V.push(W),`@@CODE_INLINE_${Q}@@`}),{html:G,blocks:V}},Y=(K,V)=>{if(!V.length)return K;return K.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(G,W)=>{let Q=Number(W);return V[Q]??""})},X=J(_),Z=X.html;return Z=Z.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(K,V,G)=>{try{let W=katex.renderToString($(G.trim()),{displayMode:!0,throwOnError:!1});return`${V}${W}`}catch(W){return`<span class="math-error" title="${u3(W.message)}">${K}</span>`}}),Z=Z.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(K,V,G)=>{if(/\s$/.test(G))return K;try{let W=katex.renderToString($(G),{displayMode:!1,throwOnError:!1});return`${V}${W}`}catch(W){return`${V}<span class="math-error" title="${u3(W.message)}">$${G}$</span>`}}),Y(Z,X.blocks)}function E8(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Y=[],X;while(X=J.nextNode())Y.push(X);for(let Z of Y){let K=Z.nodeValue;if(!K)continue;if(u2.lastIndex=0,!u2.test(K))continue;u2.lastIndex=0;let V=Z.parentElement;if(V&&(V.closest("a")||V.closest("code")||V.closest("pre")))continue;let G=K.split(u2);if(G.length<=1)continue;let W=$.createDocumentFragment();G.forEach((Q,U)=>{if(U%2===1){let D=$.createElement("a");D.setAttribute("href","#"),D.className="hashtag",D.setAttribute("data-hashtag",Q),D.textContent=`#${Q}`,W.appendChild(D)}else W.appendChild($.createTextNode(Q))}),Z.parentNode?.replaceChild(W,Z)}return $.body.innerHTML}function D8(_){if(!_)return _;let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=[],X=!1;for(let Z of J){if(!X&&Z.trim().match(/^```(?:math|katex|latex)\s*$/i)){X=!0,Y.push("$$");continue}if(X&&Z.trim().match(/^```\s*$/)){X=!1,Y.push("$$");continue}Y.push(Z)}return Y.join(`
`)}function j2(_,$,J={}){if(!_)return"";let Y=D8(_),{text:X,blocks:Z}=B8(Y),K=m2(X,2),G=c3(K).replace(/</g,"&lt;").replace(/>/g,"&gt;"),W=p3(G),Q=window.marked?marked.parse(W,{headerIds:!1,mangle:!1}):W.replace(/\n/g,"<br>");return Q=h3(Q),Q=i3(Q),Q=L8(Q),Q=E8(Q),Q=F8(Q,Z),Q=m3(Q,J),Q}function l3(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),J=m2($,2),X=c3(J).replace(/</g,"&lt;").replace(/>/g,"&gt;"),Z=p3(X),K=window.marked?marked.parse(Z):Z.replace(/\n/g,"<br>");return K=h3(K),K=i3(K),K=m3(K),K}async function g2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:J}=window.beautifulMermaid,X=R3()==="dark"?J["tokyo-night"]:J["github-light"],Z=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let K of Z)try{let V=K.dataset.mermaid,G=U8(V||""),W=m2(G,2),Q=await $(W,{...X,transparent:!0});K.innerHTML=Q,K.removeAttribute("data-mermaid")}catch(V){console.error("Mermaid render error:",V);let G=document.createElement("pre");G.className="mermaid-error",G.textContent=`Diagram error: ${V.message}`,K.innerHTML="",K.appendChild(G),K.removeAttribute("data-mermaid")}}var o3="PiClaw";function U1(_,$){let J=_||"PiClaw",Y=J.charAt(0).toUpperCase(),X=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],Z=Y.charCodeAt(0)%X.length,K=X[Z],V=J.trim().toLowerCase(),G=typeof $==="string"?$.trim():"",Q=(G?G:null)||(V==="PiClaw".toLowerCase()||V==="pi"?"/static/icon-192.png":null);return{letter:Y,color:K,image:Q}}function n3(_,$){if(!_)return"PiClaw";let J=$[_]?.name||_;return J?J.charAt(0).toUpperCase()+J.slice(1):"PiClaw"}function d3(_,$){if(!_)return null;let J=$[_]||{};return J.avatar_url||J.avatarUrl||J.avatar||null}function r3(_){if(!_)return null;if(typeof document<"u"){let Z=document.documentElement,K=Z?.dataset?.colorTheme||"",V=Z?.dataset?.tint||"",G=getComputedStyle(Z).getPropertyValue("--accent-color")?.trim();if(G&&(V||K&&K!=="default"))return G}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],J=String(_),Y=0;for(let Z=0;Z<J.length;Z+=1)Y=(Y*31+J.charCodeAt(Z))%2147483647;let X=Math.abs(Y)%$.length;return $[X]}function s3({status:_,draft:$,plan:J,thought:Y,pendingRequest:X,intent:Z,turnId:K,steerQueued:V,onPanelToggle:G}){let U=(g)=>{if(!g)return{text:"",totalLines:0,fullText:""};if(typeof g==="string"){let C_=g,V_=C_?C_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:C_,totalLines:V_,fullText:C_}}let G_=g.text||"",Q_=g.fullText||g.full_text||G_,j_=Number.isFinite(g.totalLines)?g.totalLines:Q_?Q_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:G_,totalLines:j_,fullText:Q_}},D=160,F=(g)=>{if(!g)return 1;return Math.max(1,Math.ceil(g.length/160))},E=(g,G_,Q_)=>{let j_=(g||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!j_)return{text:"",omitted:0,totalLines:Number.isFinite(Q_)?Q_:0,visibleLines:0};let C_=j_.split(`
`),V_=C_.length>G_?C_.slice(0,G_).join(`
`):j_,N_=Number.isFinite(Q_)?Q_:C_.reduce((E_,v_)=>E_+F(v_),0),x_=V_?V_.split(`
`).reduce((E_,v_)=>E_+F(v_),0):0,L_=Math.max(N_-x_,0);return{text:V_,omitted:L_,totalLines:N_,visibleLines:x_}},P=U(J),I=U(Y),H=U($),k=Boolean(P.text)||P.totalLines>0,T=Boolean(I.text)||I.totalLines>0,L=Boolean(H.fullText?.trim()||H.text?.trim());if(!_&&!L&&!k&&!T&&!X&&!Z)return null;let[R,r]=v(new Set),s=(g)=>r((G_)=>{let Q_=new Set(G_),j_=!Q_.has(g);if(j_)Q_.add(g);else Q_.delete(g);if(typeof G==="function")G(g,j_);return Q_});c(()=>{r(new Set)},[K]);let l=_?.turn_id||K,e=r3(l),h=V?"turn-dot turn-dot-queued":"turn-dot",a=(g)=>g,q_=Boolean(_?.last_activity||_?.lastActivity),K_="",F_=_?.title,J_=_?.status;if(_?.type==="plan")K_=F_?`Planning: ${F_}`:"Planning...";else if(_?.type==="tool_call")K_=F_?`Running: ${F_}`:"Running tool...";else if(_?.type==="tool_status")K_=F_?`${F_}: ${J_||"Working..."}`:J_||"Working...";else if(_?.type==="error")K_=F_||"Agent error";else K_=F_||J_||"Working...";if(q_)K_="Last activity just now";let Z_=({panelTitle:g,text:G_,fullText:Q_,totalLines:j_,maxLines:C_,titleClass:V_,panelKey:N_})=>{let x_=R.has(N_),L_=Q_||G_||"",E_=typeof C_==="number",v_=x_&&E_,z_=E_?E(L_,C_,j_):{text:L_||"",omitted:0,totalLines:Number.isFinite(j_)?j_:0};if(!L_&&!(Number.isFinite(z_.totalLines)&&z_.totalLines>0))return null;let R_=`agent-thinking-body${E_?" agent-thinking-body-collapsible":""}`,a_=E_?`--agent-thinking-collapsed-lines: ${C_};`:"";return N`
            <div
                class="agent-thinking"
                data-expanded=${x_?"true":"false"}
                data-collapsible=${E_?"true":"false"}
                style=${e?`--turn-color: ${e};`:""}
            >
                <div class="agent-thinking-title ${V_||""}">
                    ${e&&N`<span class=${h} aria-hidden="true"></span>`}
                    ${g}
                    ${v_&&N`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${g} panel`}
                            onClick=${()=>s(N_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${R_}
                    style=${a_}
                    dangerouslySetInnerHTML=${{__html:l3(L_)}}
                />
                ${!x_&&z_.omitted>0&&N`
                    <button class="agent-thinking-truncation" onClick=${()=>s(N_)}>
                        ▸ ${z_.omitted} more lines
                    </button>
                `}
                ${x_&&z_.omitted>0&&N`
                    <button class="agent-thinking-truncation" onClick=${()=>s(N_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},S_=X?.tool_call?.title,B_=S_?`Awaiting approval: ${S_}`:"Awaiting approval";return N`
        <div class="agent-status-panel">
            ${Z&&N`
                <div
                    class="agent-status agent-status-intent"
                    aria-live="polite"
                    style=${e?`--turn-color: ${e};`:""}
                    title=${Z?.detail||""}
                >
                    <span class="agent-status-text">
                        ${Z.title}
                    </span>
                    ${Z.detail&&N`<span class="agent-status-intent-detail">${Z.detail}</span>`}
                </div>
            `}
            ${X&&N`
                <div class="agent-status agent-status-request" aria-live="polite" style=${e?`--turn-color: ${e};`:""}>
                    <span class=${h} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${B_}</span>
                </div>
            `}
            ${k&&Z_({panelTitle:a("Planning"),text:P.text,fullText:P.fullText,totalLines:P.totalLines,panelKey:"plan"})}
            ${T&&Z_({panelTitle:a("Thoughts"),text:I.text,fullText:I.fullText,totalLines:I.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${L&&Z_({panelTitle:a("Draft"),text:H.text,fullText:H.fullText,totalLines:H.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&N`
                <div class=${`agent-status${q_?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${e?`--turn-color: ${e};`:""}>
                    ${e&&N`<span class=${h} aria-hidden="true"></span>`}
                    ${_?.type==="error"?N`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!q_&&N`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${K_}</span>
                </div>
            `}
        </div>
    `}function a3({request:_,onRespond:$}){if(!_)return null;let{request_id:J,tool_call:Y,options:X}=_,Z=Y?.title||"Agent Request",K=Y?.kind||"other",V=Y?.rawInput||{},G=V.command||V.commands&&V.commands[0]||null,W=V.diff||null,Q=V.fileName||V.path||null,U=Y?.description||V.description||V.explanation||null,F=(Array.isArray(Y?.locations)?Y.locations:[]).map((k)=>k?.path).filter((k)=>Boolean(k)),E=Array.from(new Set([Q,...F].filter(Boolean)));console.log("AgentRequestModal:",{request_id:J,tool_call:Y,options:X});let P=async(k)=>{try{await G1(J,k),$()}catch(T){console.error("Failed to respond to agent request:",T)}},I=async()=>{try{await z3(Z,`Auto-approved: ${Z}`),await G1(J,"approved"),$()}catch(k){console.error("Failed to add to whitelist:",k)}},H=X&&X.length>0;return N`
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
                ${(U||G||W||E.length>0)&&N`
                    <div class="agent-request-body">
                        ${U&&N`
                            <div class="agent-request-description">${U}</div>
                        `}
                        ${E.length>0&&N`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${E.map((k,T)=>N`<li key=${T}>${k}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${G&&N`
                            <pre class="agent-request-command">${G}</pre>
                        `}
                        ${W&&N`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${W}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${H?X.map((k)=>N`
                            <button 
                                key=${k.optionId||k.id||String(k)}
                                class="agent-request-btn ${k.kind==="allow_once"||k.kind==="allow_always"?"primary":""}"
                                onClick=${()=>P(k.optionId||k.id||k)}
                            >
                                ${k.name||k.label||k.optionId||k.id||String(k)}
                            </button>
                        `):N`
                        <button class="agent-request-btn primary" onClick=${()=>P("approved")}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${()=>P("denied")}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${I}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function t3({status:_}){if(_==="connected")return null;return N`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function e3(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let Y=new Date-$,X=Y/1000,Z=86400000;if(Y<Z){if(X<60)return"just now";if(X<3600)return`${Math.floor(X/60)}m`;return`${Math.floor(X/3600)}h`}if(Y<5*Z){let G=$.toLocaleDateString(void 0,{weekday:"short"}),W=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${G} ${W}`}let K=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),V=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${K} ${V}`}function z2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function f0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function c2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}function _4({src:_,onClose:$}){return c(()=>{let J=(Y)=>{if(Y.key==="Escape")$()};return document.addEventListener("keydown",J),()=>document.removeEventListener("keydown",J)},[$]),N`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function C8({mediaId:_}){let[$,J]=v(null);if(c(()=>{I2(_).then(J).catch(()=>{})},[_]),!$)return null;let Y=$.filename||"file",X=$.metadata?.size,Z=X?f0(X):"";return N`
        <a href=${J2(_)} download=${Y} class="file-attachment" onClick=${(K)=>K.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${Y}</span>
                ${Z&&N`<span class="file-size">${Z}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function p2({annotations:_}){if(!_)return null;let{audience:$,priority:J,lastModified:Y}=_,X=Y?c2(Y):null;return N`
        <div class="content-annotations">
            ${$&&$.length>0&&N`
                <span class="content-annotation">Audience: ${$.join(", ")}</span>
            `}
            ${typeof J==="number"&&N`
                <span class="content-annotation">Priority: ${J}</span>
            `}
            ${X&&N`
                <span class="content-annotation">Updated: ${X}</span>
            `}
        </div>
    `}function y8({block:_}){let $=_.title||_.name||_.uri,J=_.description,Y=_.size?f0(_.size):"",X=_.mime_type||"",Z=A8(X),K=Q2(_.uri);return N`
        <a
            href=${K||"#"}
            class="resource-link"
            target=${K?"_blank":void 0}
            rel=${K?"noopener noreferrer":void 0}
            onClick=${(V)=>V.stopPropagation()}>
            <div class="resource-link-main">
                <div class="resource-link-header">
                    <span class="resource-link-icon-inline">${Z}</span>
                    <div class="resource-link-title">${$}</div>
                </div>
                ${J&&N`<div class="resource-link-description">${J}</div>`}
                <div class="resource-link-meta">
                    ${X&&N`<span>${X}</span>`}
                    ${Y&&N`<span>${Y}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `}function k8({block:_}){let[$,J]=v(!1),Y=_.uri||"Embedded resource",X=_.text||"",Z=Boolean(_.data),K=_.mime_type||"";return N`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(V)=>{V.preventDefault(),V.stopPropagation(),J(!$)}}>
                ${$?"▼":"▶"} ${Y}
            </button>
            ${$&&N`
                ${X&&N`<pre class="resource-embed-content">${X}</pre>`}
                ${Z&&N`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${K&&N`<span class="resource-embed-blob-meta">${K}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(V)=>{V.preventDefault(),V.stopPropagation();let G=new Blob([Uint8Array.from(atob(_.data),(U)=>U.charCodeAt(0))],{type:K||"application/octet-stream"}),W=URL.createObjectURL(G),Q=document.createElement("a");Q.href=W,Q.download=Y.split("/").pop()||"resource",Q.click(),URL.revokeObjectURL(W)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function A8(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function w8({preview:_}){let $=Q2(_.url),J=Q2(_.image,{allowDataImage:!0}),Y=J?`background-image: url('${J}')`:"",X=_.site_name;if(!X&&$)try{X=new URL($).hostname}catch{X=$}return N`
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
                ${_.description&&N`
                    <div class="link-preview-description">${_.description}</div>
                `}
            </div>
        </a>
    `}function M8(_,$){return typeof _==="string"?_:""}function P8(_){if(!_)return{content:_,fileRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Files:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Y=W;break}if(Y===-1)return{content:_,fileRefs:[]};let X=[],Z=Y+1;for(;Z<J.length;Z+=1){let W=J[Z];if(/^\s*-\s+/.test(W))X.push(W.replace(/^\s*-\s+/,"").trim());else if(!W.trim())break;else break}if(X.length===0)return{content:_,fileRefs:[]};let K=J.slice(0,Y),V=J.slice(Z),G=[...K,...V].join(`
`);return G=G.replace(/\n{3,}/g,`

`).trim(),{content:G,fileRefs:X}}function b8(_){if(!_)return{content:_,messageRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Referenced messages:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Y=W;break}if(Y===-1)return{content:_,messageRefs:[]};let X=[],Z=Y+1;for(;Z<J.length;Z+=1){let W=J[Z];if(/^\s*-\s+/.test(W)){let U=W.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(U)X.push(U[1])}else if(!W.trim())break;else break}if(X.length===0)return{content:_,messageRefs:[]};let K=J.slice(0,Y),V=J.slice(Z),G=[...K,...V].join(`
`);return G=G.replace(/\n{3,}/g,`

`).trim(),{content:G,messageRefs:X}}function I8(_){if(!_)return{content:_,attachments:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Images:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Y=W;break}if(Y===-1)return{content:_,attachments:[]};let X=[],Z=Y+1;for(;Z<J.length;Z+=1){let W=J[Z];if(/^\s*-\s+/.test(W)){let Q=W.replace(/^\s*-\s+/,"").trim(),U=Q.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||Q.match(/^attachment:([^\s]+)\s+(.+)$/i);if(U){let D=U[1],F=(U[2]||"").trim()||D;X.push({id:D,label:F,raw:Q})}else X.push({id:null,label:Q,raw:Q})}else if(!W.trim())break;else break}if(X.length===0)return{content:_,attachments:[]};let K=J.slice(0,Y),V=J.slice(Z),G=[...K,...V].join(`
`);return G=G.replace(/\n{3,}/g,`

`).trim(),{content:G,attachments:X}}function S8(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function x8(_,$){if(!_||!$)return _;let J=String($).trim().split(/\s+/).filter(Boolean);if(J.length===0)return _;let Y=J.map(S8).sort((Q,U)=>U.length-Q.length),X=new RegExp(`(${Y.join("|")})`,"gi"),Z=new RegExp(`^(${Y.join("|")})$`,"i"),K=new DOMParser().parseFromString(_,"text/html"),V=K.createTreeWalker(K.body,NodeFilter.SHOW_TEXT),G=[],W;while(W=V.nextNode())G.push(W);for(let Q of G){let U=Q.nodeValue;if(!U||!X.test(U)){X.lastIndex=0;continue}X.lastIndex=0;let D=Q.parentElement;if(D&&D.closest("code, pre, script, style"))continue;let F=U.split(X).filter((P)=>P!=="");if(F.length===0)continue;let E=K.createDocumentFragment();for(let P of F)if(Z.test(P)){let I=K.createElement("mark");I.className="search-highlight-term",I.textContent=P,E.appendChild(I)}else E.appendChild(K.createTextNode(P));Q.parentNode.replaceChild(E,Q)}return K.body.innerHTML}function $4({post:_,onClick:$,onHashtagClick:J,onMessageRef:Y,onScrollToMessage:X,agentName:Z,agentAvatarUrl:K,userName:V,userAvatarUrl:G,userAvatarBackground:W,onDelete:Q,isThreadReply:U,isRemoving:D,highlightQuery:F,onFileRef:E}){let[P,I]=v(null),H=A(null),k=_.data,T=k.type==="agent_response",L=V||"You",R=T?Z||o3:L,r=T?U1(Z,K):U1(L,G),s=typeof W==="string"?W.trim().toLowerCase():"",l=!T&&r.image&&(s==="clear"||s==="transparent"),e=T&&Boolean(r.image),h=`background-color: ${l||e?"transparent":r.color}`,a=k.content_meta,q_=Boolean(a?.truncated),K_=Boolean(a?.preview),F_=q_&&!K_,J_=q_?{originalLength:Number.isFinite(a?.original_length)?a.original_length:k.content?k.content.length:0,maxLength:Number.isFinite(a?.max_length)?a.max_length:0}:null,Z_=M8(k.content,k.link_previews),{content:S_,fileRefs:B_}=P8(Z_),{content:g,messageRefs:G_}=b8(S_),{content:Q_,attachments:j_}=I8(g);Z_=Q_;let C_=Boolean(Z_)&&!F_,V_=typeof F==="string"?F.trim():"",N_=T0(()=>{if(!Z_)return"";let w=j2(Z_,J);return V_?x8(w,V_):w},[Z_,V_]),x_=(w,n)=>{w.stopPropagation(),I(J2(n))},L_=(w)=>{w.stopPropagation(),Q?.(_)},E_=(w,n)=>{let k_=new Set;if(!w||n.length===0)return{content:w,usedIds:k_};return{content:w.replace(/attachment:([^\s)"']+)/g,(X0,O0,d_,H0)=>{let M0=O0.replace(/^\/+/,""),u_=n.find((Q0)=>Q0.name&&Q0.name.toLowerCase()===M0.toLowerCase()&&!k_.has(Q0.id))||n.find((Q0)=>!k_.has(Q0.id));if(!u_)return X0;if(k_.add(u_.id),H0.slice(Math.max(0,d_-2),d_)==="](")return`/media/${u_.id}`;return u_.name||"attachment"}),usedIds:k_}},v_=[],z_=[],R_=[],a_=[],y_=[],M_=[],$0=k.content_blocks||[],J0=k.media_ids||[],Y0=0;if($0.length>0)$0.forEach((w)=>{if(w?.type==="text"&&w.annotations)M_.push(w.annotations);if(w?.type==="resource_link")a_.push(w);else if(w?.type==="resource")y_.push(w);else if(w?.type==="file"){let n=J0[Y0++];if(n)z_.push(n),R_.push({id:n,name:w?.name||w?.filename||w?.title})}else if(w?.type==="image"||!w?.type){let n=J0[Y0++];if(n){let k_=typeof w?.mime_type==="string"?w.mime_type:void 0;v_.push({id:n,annotations:w?.annotations,mimeType:k_}),R_.push({id:n,name:w?.name||w?.filename||w?.title})}}});else if(J0.length>0)J0.forEach((w)=>{v_.push({id:w,annotations:null}),R_.push({id:w,name:null})});if(j_.length>0)j_.forEach((w)=>{if(!w?.id)return;let n=R_.find((k_)=>String(k_.id)===String(w.id));if(n&&!n.name)n.name=w.label});let{content:w0,usedIds:W0}=E_(Z_,R_);Z_=w0;let D_=v_.filter(({id:w})=>!W0.has(w)),c_=z_.filter((w)=>!W0.has(w)),Z0=j_.length>0?j_.map((w,n)=>({id:w.id||`attachment-${n+1}`,label:w.label||`attachment-${n+1}`})):R_.map((w,n)=>({id:w.id,label:w.name||`attachment-${n+1}`}));return c(()=>{if(H.current)g2(H.current)},[Z_]),N`
        <div id=${`post-${_.id}`} class="post ${T?"agent-post":""} ${U?"thread-reply":""} ${D?"removing":""}" onClick=${$}>
            <div class="post-avatar ${T?"agent-avatar":""} ${r.image?"has-image":""}" style=${h}>
                ${r.image?N`<img src=${r.image} alt=${R} />`:r.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${L_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${R}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(w)=>{if(w.preventDefault(),w.stopPropagation(),Y)Y(_.id)}}>${e3(_.timestamp)}</a>
                </div>
                ${F_&&J_&&N`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${z2(J_.originalLength)} chars
                            ${J_.maxLength?N` • Display limit: ${z2(J_.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${K_&&J_&&N`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${z2(J_.maxLength)} of ${z2(J_.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(B_.length>0||G_.length>0||Z0.length>0)&&N`
                    <div class="post-file-refs">
                        ${G_.map((w)=>{let n=(k_)=>{if(k_.preventDefault(),k_.stopPropagation(),X)X(w);else{let b_=document.getElementById("post-"+w);if(b_)b_.scrollIntoView({behavior:"smooth",block:"center"}),b_.classList.add("post-highlight"),setTimeout(()=>b_.classList.remove("post-highlight"),2000)}};return N`
                                <a href=${`#msg-${w}`} class="post-msg-pill-link" onClick=${n}>
                                    <${c0}
                                        prefix="post"
                                        label=${"msg:"+w}
                                        title=${"Message "+w}
                                        icon="message"
                                        onClick=${n}
                                    />
                                </a>
                            `})}
                        ${B_.map((w)=>{let n=w.split("/").pop()||w;return N`
                                <${c0}
                                    prefix="post"
                                    label=${n}
                                    title=${w}
                                    onClick=${()=>E?.(w)}
                                />
                            `})}
                        ${Z0.map((w)=>N`
                            <${c0}
                                prefix="post"
                                label=${w.label}
                                title=${w.label}
                            />
                        `)}
                    </div>
                `}
                ${C_&&N`
                    <div 
                        ref=${H}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:N_}}
                        onClick=${(w)=>{if(w.target.classList.contains("hashtag")){w.preventDefault(),w.stopPropagation();let n=w.target.dataset.hashtag;if(n)J?.(n)}else if(w.target.tagName==="IMG")w.preventDefault(),w.stopPropagation(),I(w.target.src)}}
                    />
                `}
                ${M_.length>0&&N`
                    ${M_.map((w,n)=>N`
                        <${p2} key=${n} annotations=${w} />
                    `)}
                `}
                ${D_.length>0&&N`
                    <div class="media-preview">
                        ${D_.map(({id:w,mimeType:n})=>{let b_=typeof n==="string"&&n.toLowerCase().startsWith("image/svg")?J2(w):F3(w);return N`
                                <img 
                                    key=${w} 
                                    src=${b_} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(X0)=>x_(X0,w)}
                                />
                            `})}
                    </div>
                `}
                ${D_.length>0&&N`
                    ${D_.map(({annotations:w},n)=>N`
                        ${w&&N`<${p2} key=${n} annotations=${w} />`}
                    `)}
                `}
                ${c_.length>0&&N`
                    <div class="file-attachments">
                        ${c_.map((w)=>N`
                            <${C8} key=${w} mediaId=${w} />
                        `)}
                    </div>
                `}
                ${a_.length>0&&N`
                    <div class="resource-links">
                        ${a_.map((w,n)=>N`
                            <div key=${n}>
                                <${y8} block=${w} />
                                <${p2} annotations=${w.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${y_.length>0&&N`
                    <div class="resource-embeds">
                        ${y_.map((w,n)=>N`
                            <div key=${n}>
                                <${k8} block=${w} />
                                <${p2} annotations=${w.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${k.link_previews?.length>0&&N`
                    <div class="link-previews">
                        ${k.link_previews.map((w,n)=>N`
                            <${w8} key=${n} preview=${w} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${P&&N`<${_4} src=${P} onClose=${()=>I(null)} />`}
    `}function J4({posts:_,hasMore:$,onLoadMore:J,onPostClick:Y,onHashtagClick:X,onMessageRef:Z,onScrollToMessage:K,onFileRef:V,emptyMessage:G,timelineRef:W,agents:Q,user:U,onDeletePost:D,reverse:F=!0,removingPostIds:E,searchQuery:P}){let[I,H]=v(!1),k=A(null),T=typeof IntersectionObserver<"u",L=b(async()=>{if(!J||!$||I)return;H(!0);try{await J({preserveScroll:!0,preserveMode:"top"})}finally{H(!1)}},[$,I,J]),R=b((l)=>{let{scrollTop:e,scrollHeight:h,clientHeight:a}=l.target,q_=F?h-a-e:e,K_=Math.max(300,a);if(q_<K_)L()},[F,L]);if(c(()=>{if(!T)return;let l=k.current,e=W?.current;if(!l||!e)return;let h=300,a=new IntersectionObserver((q_)=>{for(let K_ of q_){if(!K_.isIntersecting)continue;L()}},{root:e,rootMargin:`${h}px 0px ${h}px 0px`,threshold:0});return a.observe(l),()=>a.disconnect()},[T,$,J,W,L]),c(()=>{if(T)return;if(!W?.current)return;let{scrollTop:l,scrollHeight:e,clientHeight:h}=W.current,a=F?e-h-l:l,q_=Math.max(300,h);if(a<q_)L()},[T,_,$,F,W,L]),c(()=>{if(!W?.current)return;if(!$||I)return;let{scrollTop:l,scrollHeight:e,clientHeight:h}=W.current,a=F?e-h-l:l,q_=Math.max(300,h);if(e<=h+1||a<q_)L()},[_,$,I,F,W,L]),!_)return N`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return N`
            <div class="timeline" ref=${W}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${G||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let r=_.slice().sort((l,e)=>l.id-e.id),s=N`<div class="timeline-sentinel" ref=${k}></div>`;return N`
        <div class="timeline ${F?"reverse":"normal"}" ref=${W} onScroll=${R}>
            <div class="timeline-content">
                ${F?s:null}
                ${r.map((l)=>{let e=Boolean(l.data?.thread_id&&l.data.thread_id!==l.id),h=E?.has?.(l.id);return N`
                    <${$4}
                        key=${l.id}
                        post=${l}
                        isThreadReply=${e}
                        isRemoving=${h}
                        highlightQuery=${P}
                        agentName=${n3(l.data?.agent_id,Q||{})}
                        agentAvatarUrl=${d3(l.data?.agent_id,Q||{})}
                        userName=${U?.name||U?.user_name}
                        userAvatarUrl=${U?.avatar_url||U?.avatarUrl||U?.avatar}
                        userAvatarBackground=${U?.avatar_background||U?.avatarBackground}
                        onClick=${()=>Y?.(l)}
                        onHashtagClick=${X}
                        onMessageRef=${Z}
                        onScrollToMessage=${K}
                        onFileRef=${V}
                        onDelete=${D}
                    />
                `})}
                ${F?null:s}
            </div>
        </div>
    `}var T8=16,f8=60000,Q4=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function v8(_,$){let J=String(_||"").trim();if(!J)return J;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(J)||J.startsWith("#")||J.startsWith("data:")||J.startsWith("blob:"))return J;let Y=J.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),X=Y?.[1]||J,Z=Y?.[2]||"",K=Y?.[3]||"",V=String($||"").split("/").slice(0,-1).join("/"),W=X.startsWith("/")?X:`${V?`${V}/`:""}${X}`,Q=[];for(let D of W.split("/")){if(!D||D===".")continue;if(D===".."){if(Q.length>0)Q.pop();continue}Q.push(D)}let U=Q.join("/");return`${W1(U)}${Z}${K}`}function j4(_,$,J,Y=0,X=[]){if(!J&&Q4(_))return X;if(!_)return X;if(X.push({node:_,depth:Y}),_.type==="dir"&&_.children&&$.has(_.path))for(let Z of _.children)j4(Z,$,J,Y+1,X);return X}function Y4(_,$,J){if(!_)return"";let Y=[],X=(Z)=>{if(!J&&Q4(Z))return;if(Y.push(Z.type==="dir"?`d:${Z.path}`:`f:${Z.path}`),Z.children&&$?.has(Z.path))for(let K of Z.children)X(K)};return X(_),Y.join("|")}function D1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let J=Array.isArray(_.children)?_.children:null,Y=Array.isArray($.children)?$.children:null;if(!Y)return _;let X=J?new Map(J.map((V)=>[V?.path,V])):new Map,Z=!J||J.length!==Y.length,K=Y.map((V)=>{let G=D1(X.get(V.path),V);if(G!==X.get(V.path))Z=!0;return G});return Z?{...$,children:K}:_}function L1(_,$,J){if(!_)return _;if(_.path===$)return D1(_,J);if(!Array.isArray(_.children))return _;let Y=!1,X=_.children.map((Z)=>{let K=L1(Z,$,J);if(K!==Z)Y=!0;return K});return Y?{..._,children:X}:_}var K4=4,F1=14,R8=8,u8=16;function G4(_){if(!_)return 0;if(_.type==="file"){let Y=Math.max(0,Number(_.size)||0);return _.__bytes=Y,Y}let $=Array.isArray(_.children)?_.children:[],J=0;for(let Y of $)J+=G4(Y);return _.__bytes=J,J}function V4(_,$=0){let J=Math.max(0,Number(_?.__bytes??_?.size??0)),Y={name:_?.name||_?.path||".",path:_?.path||".",size:J,children:[]};if(!_||_.type!=="dir"||$>=K4)return Y;let X=Array.isArray(_.children)?_.children:[],Z=[];for(let V of X){let G=Math.max(0,Number(V?.__bytes??V?.size??0));if(G<=0)continue;if(V.type==="dir")Z.push({kind:"dir",node:V,size:G});else Z.push({kind:"file",name:V.name,path:V.path,size:G})}Z.sort((V,G)=>G.size-V.size);let K=Z;if(Z.length>F1){let V=Z.slice(0,F1-1),G=Z.slice(F1-1),W=G.reduce((Q,U)=>Q+U.size,0);V.push({kind:"other",name:`+${G.length} more`,path:`${Y.path}/[other]`,size:W}),K=V}return Y.children=K.map((V)=>{if(V.kind==="dir")return V4(V.node,$+1);return{name:V.name,path:V.path,size:V.size,children:[]}}),Y}function Z4(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,J=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(J==="dark")return!0;if(J==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function W4(_,$,J){let Y=((_+Math.PI/2)*180/Math.PI+360)%360,X=J?Math.max(30,70-$*10):Math.max(34,66-$*8),Z=J?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${Y.toFixed(1)} ${X}% ${Z}%)`}function h2(_,$,J,Y){return{x:_+J*Math.cos(Y),y:$+J*Math.sin(Y)}}function C1(_,$,J,Y,X,Z){let K=Math.PI*2-0.0001,V=Z-X>K?X+K:Z,G=h2(_,$,Y,X),W=h2(_,$,Y,V),Q=h2(_,$,J,V),U=h2(_,$,J,X),D=V-X>Math.PI?1:0;return[`M ${G.x.toFixed(3)} ${G.y.toFixed(3)}`,`A ${Y} ${Y} 0 ${D} 1 ${W.x.toFixed(3)} ${W.y.toFixed(3)}`,`L ${Q.x.toFixed(3)} ${Q.y.toFixed(3)}`,`A ${J} ${J} 0 ${D} 0 ${U.x.toFixed(3)} ${U.y.toFixed(3)}`,"Z"].join(" ")}var O4={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function q4(_,$,J){let Y=[],X=[],Z=Math.max(0,Number($)||0),K=(V,G,W,Q)=>{let U=Array.isArray(V?.children)?V.children:[];if(!U.length)return;let D=Math.max(0,Number(V.size)||0);if(D<=0)return;let F=W-G,E=G;U.forEach((P,I)=>{let H=Math.max(0,Number(P.size)||0);if(H<=0)return;let k=H/D,T=E,L=I===U.length-1?W:E+F*k;if(E=L,L-T<0.003)return;let R=O4[Q];if(R){let r=W4(T,Q,J);if(Y.push({key:P.path,path:P.path,label:P.name,size:H,color:r,depth:Q,startAngle:T,endAngle:L,innerRadius:R[0],outerRadius:R[1],d:C1(120,120,R[0],R[1],T,L)}),Q===1)X.push({key:P.path,name:P.name,size:H,pct:Z>0?H/Z*100:0,color:r})}if(Q<K4)K(P,T,L,Q+1)})};return K(_,-Math.PI/2,Math.PI*3/2,1),{segments:Y,legend:X}}function E1(_,$){if(!_||!$)return null;if(_.path===$)return _;let J=Array.isArray(_.children)?_.children:[];for(let Y of J){let X=E1(Y,$);if(X)return X}return null}function N4(_,$,J,Y){if(!J||J<=0)return{segments:[],legend:[]};let X=O4[1];if(!X)return{segments:[],legend:[]};let Z=-Math.PI/2,K=Math.PI*3/2,V=W4(Z,1,Y),W=`${$||"."}/[files]`;return{segments:[{key:W,path:W,label:_,size:J,color:V,depth:1,startAngle:Z,endAngle:K,innerRadius:X[0],outerRadius:X[1],d:C1(120,120,X[0],X[1],Z,K)}],legend:[{key:W,name:_,size:J,pct:100,color:V}]}}function X4(_,$=!1,J=!1){if(!_)return null;let Y=G4(_),X=V4(_,0),Z=X.size||Y,{segments:K,legend:V}=q4(X,Z,J);if(!K.length&&Z>0){let G=N4("[files]",X.path,Z,J);K=G.segments,V=G.legend}return{root:X,totalSize:Z,segments:K,legend:V,truncated:$,isDarkTheme:J}}function m8({payload:_}){if(!_)return null;let[$,J]=v(null),[Y,X]=v(_?.root?.path||"."),[Z,K]=v(()=>[_?.root?.path||"."]),[V,G]=v(!1);c(()=>{let h=_?.root?.path||".";X(h),K([h]),J(null)},[_?.root?.path,_?.totalSize]),c(()=>{if(!Y)return;G(!0);let h=setTimeout(()=>G(!1),180);return()=>clearTimeout(h)},[Y]);let W=T0(()=>{return E1(_.root,Y)||_.root},[_?.root,Y]),Q=W?.size||_.totalSize||0,{segments:U,legend:D}=T0(()=>{let h=q4(W,Q,_.isDarkTheme);if(h.segments.length>0)return h;if(Q<=0)return h;let a=W?.children?.length?"Total":"[files]";return N4(a,W?.path||_?.root?.path||".",Q,_.isDarkTheme)},[W,Q,_.isDarkTheme,_?.root?.path]),[F,E]=v(U),P=A(new Map),I=A(0);c(()=>{let h=P.current,a=new Map(U.map((J_)=>[J_.key,J_])),q_=performance.now(),K_=220,F_=(J_)=>{let Z_=Math.min(1,(J_-q_)/220),S_=Z_*(2-Z_),B_=U.map((g)=>{let Q_=h.get(g.key)||{startAngle:g.startAngle,endAngle:g.startAngle,innerRadius:g.innerRadius,outerRadius:g.innerRadius},j_=(L_,E_)=>L_+(E_-L_)*S_,C_=j_(Q_.startAngle,g.startAngle),V_=j_(Q_.endAngle,g.endAngle),N_=j_(Q_.innerRadius,g.innerRadius),x_=j_(Q_.outerRadius,g.outerRadius);return{...g,d:C1(120,120,N_,x_,C_,V_)}});if(E(B_),Z_<1)I.current=requestAnimationFrame(F_)};if(I.current)cancelAnimationFrame(I.current);return I.current=requestAnimationFrame(F_),P.current=a,()=>{if(I.current)cancelAnimationFrame(I.current)}},[U]);let H=F.length?F:U,k=Q>0?f0(Q):"0 B",T=W?.name||"",R=(T&&T!=="."?T:"Total")||"Total",r=k,s=Z.length>1,l=(h)=>{if(!h?.path)return;let a=E1(_.root,h.path);if(!a||!Array.isArray(a.children)||a.children.length===0)return;K((q_)=>[...q_,a.path]),X(a.path),J(null)},e=()=>{if(!s)return;K((h)=>{let a=h.slice(0,-1);return X(a[a.length-1]||_?.root?.path||"."),a}),J(null)};return N`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${V?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${W?.path||_?.root?.path||"."}`}
                data-segments=${H.length}
                data-base-size=${Q}>
                ${H.map((h)=>N`
                    <path
                        key=${h.key}
                        d=${h.d}
                        fill=${h.color}
                        stroke="var(--bg-primary)"
                        stroke-width="1"
                        class=${`workspace-folder-starburst-segment${$?.key===h.key?" is-hovered":""}`}
                        onMouseEnter=${()=>J(h)}
                        onMouseLeave=${()=>J(null)}
                        onTouchStart=${()=>J(h)}
                        onTouchEnd=${()=>J(null)}
                        onClick=${()=>l(h)}
                    >
                        <title>${h.label} — ${f0(h.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${s?" is-drill":""}`}
                    onClick=${e}
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
                    <text x="120" y="130" text-anchor="middle" class="workspace-folder-starburst-total-value">${r}</text>
                </g>
            </svg>
            ${D.length>0&&N`
                <div class="workspace-folder-starburst-legend">
                    ${D.slice(0,8).map((h)=>N`
                        <div key=${h.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${h.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${h.name}>${h.name}</span>
                            <span class="workspace-folder-starburst-size">${f0(h.size)}</span>
                            <span class="workspace-folder-starburst-pct">${h.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&N`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function g8({mediaId:_}){let[$,J]=v(null);if(c(()=>{if(!_)return;I2(_).then(J).catch(()=>{})},[_]),!$)return null;let Y=$.filename||"file",X=$.metadata?.size?f0($.metadata.size):"";return N`
        <a href=${J2(_)} download=${Y} class="file-attachment"
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
                ${X&&N`<span class="file-size">${X}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function B4({onFileSelect:_,visible:$=!0,active:J=void 0,onOpenEditor:Y}){let[X,Z]=v(null),[K,V]=v(new Set(["."])),[G,W]=v(null),[Q,U]=v(null),[D,F]=v(""),[E,P]=v(null),[I,H]=v(null),[k,T]=v(!0),[L,R]=v(!1),[r,s]=v(null),[l,e]=v(()=>Y2("workspaceShowHidden",!1)),[h,a]=v(!1),[q_,K_]=v(null),[F_,J_]=v(null),[Z_,S_]=v(null),[B_,g]=v(!1),[G_,Q_]=v(null),[j_,C_]=v(()=>Z4()),V_=A(K),N_=A(""),x_=A(null),L_=A(0),E_=A(new Set),v_=A(null),z_=A(new Map),R_=A(_),a_=A(Y),y_=A(null),M_=A(null),$0=A(null),J0=A(null),Y0=A(null),w0=A(null),W0=A("."),D_=A(null),c_=A({path:null,dragging:!1,startX:0,startY:0}),Z0=A({path:null,dragging:!1,startX:0,startY:0}),w=A({path:null,timer:0}),n=A(!1),k_=A(0),b_=A(new Map),X0=A(null),O0=A(null),d_=A(l),H0=A($),M0=A(J??$),q0=A(0),u_=A(Z_),E0=A(h),Q0=A(q_),v0=A(null),R0=A({x:0,y:0}),n_=A(0),D0=A(null),h_=A(G),j0=A(Q),t_=A(null),P0=A(E);R_.current=_,a_.current=Y,c(()=>{V_.current=K},[K]),c(()=>{d_.current=l},[l]),c(()=>{H0.current=$},[$]),c(()=>{M0.current=J??$},[J,$]),c(()=>{u_.current=Z_},[Z_]),c(()=>{let j=(B)=>{let y=B?.detail?.path;if(!y)return;let C=y.split("/"),u=[];for(let p=1;p<C.length;p++)u.push(C.slice(0,p).join("/"));if(u.length)V((p)=>{let t=new Set(p);t.add(".");for(let __ of u)t.add(__);return t});W(y),requestAnimationFrame(()=>{let p=document.querySelector(`[data-path="${CSS.escape(y)}"]`);if(p)p.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",j),()=>window.removeEventListener("workspace-reveal-path",j)},[]),c(()=>{E0.current=h},[h]),c(()=>{Q0.current=q_},[q_]),c(()=>{h_.current=G},[G]),c(()=>{j0.current=Q},[Q]),c(()=>{P0.current=E},[E]),c(()=>{if(typeof window>"u"||typeof document>"u")return;let j=()=>C_(Z4());j();let B=window.matchMedia?.("(prefers-color-scheme: dark)"),y=()=>j();if(B?.addEventListener)B.addEventListener("change",y);else if(B?.addListener)B.addListener(y);let C=typeof MutationObserver<"u"?new MutationObserver(()=>j()):null;if(C?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)C?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(B?.removeEventListener)B.removeEventListener("change",y);else if(B?.removeListener)B.removeListener(y);C?.disconnect()}},[]),c(()=>{if(!Q)return;let j=Y0.current;if(!j)return;let B=requestAnimationFrame(()=>{try{j.focus(),j.select()}catch{}});return()=>cancelAnimationFrame(B)},[Q]);let b0=async(j)=>{R(!0),P(null),H(null);try{let B=await L3(j,20000);P(B)}catch(B){P({error:B.message||"Failed to load preview"})}finally{R(!1)}};y_.current=b0;let N0=async()=>{if(!H0.current)return;try{let j=await S2("",1,d_.current),B=Y4(j.root,V_.current,d_.current);if(B===N_.current){T(!1);return}if(N_.current=B,x_.current=j.root,!L_.current)L_.current=requestAnimationFrame(()=>{L_.current=0,Z((y)=>D1(y,x_.current)),T(!1)})}catch(j){s(j.message||"Failed to load workspace"),T(!1)}},U0=async(j)=>{if(!j)return;if(E_.current.has(j))return;E_.current.add(j);try{let B=await S2(j,1,d_.current);Z((y)=>L1(y,j,B.root))}catch(B){s(B.message||"Failed to load workspace")}finally{E_.current.delete(j)}};M_.current=U0;let T_=b(()=>{let j=G;if(!j)return".";let B=z_.current?.get(j);if(B&&B.type==="dir")return B.path;if(j==="."||!j.includes("/"))return".";let y=j.split("/");return y.pop(),y.join("/")||"."},[G]),B0=b((j)=>{let B=j?.closest?.(".workspace-row");if(!B)return null;let y=B.dataset.path,C=B.dataset.type;if(!y)return null;if(C==="dir")return y;if(y.includes("/")){let u=y.split("/");return u.pop(),u.join("/")||"."}return"."},[]),K0=b((j)=>{return B0(j?.target||null)},[B0]),m_=b((j)=>{u_.current=j,S_(j)},[]),g_=b(()=>{let j=w.current;if(j?.timer)clearTimeout(j.timer);w.current={path:null,timer:0}},[]),i_=b((j)=>{if(!j||j==="."){g_();return}let B=z_.current?.get(j);if(!B||B.type!=="dir"){g_();return}if(V_.current?.has(j)){g_();return}if(w.current?.path===j)return;g_();let y=setTimeout(()=>{w.current={path:null,timer:0},M_.current?.(j),V((C)=>{let u=new Set(C);return u.add(j),u})},600);w.current={path:j,timer:y}},[g_]),e_=b((j,B)=>{if(R0.current={x:j,y:B},n_.current)return;n_.current=requestAnimationFrame(()=>{n_.current=0;let y=v0.current;if(!y)return;let C=R0.current;y.style.transform=`translate(${C.x+12}px, ${C.y+12}px)`})},[]),C0=b((j)=>{if(!j)return;let y=(z_.current?.get(j)?.name||j.split("/").pop()||j).trim();if(!y)return;J_({path:j,label:y})},[]),F0=b(()=>{if(J_(null),n_.current)cancelAnimationFrame(n_.current),n_.current=0;if(v0.current)v0.current.style.transform="translate(-9999px, -9999px)"},[]),I0=b((j)=>{if(!j)return".";let B=z_.current?.get(j);if(B&&B.type==="dir")return B.path;if(j==="."||!j.includes("/"))return".";let y=j.split("/");return y.pop(),y.join("/")||"."},[]),r_=b(()=>{U(null),F("")},[]),u0=b((j)=>{if(!j)return;let y=(z_.current?.get(j)?.name||j.split("/").pop()||j).trim();if(!y||j===".")return;U(j),F(y)},[]),p0=b(async()=>{let j=j0.current;if(!j)return;let B=(D||"").trim();if(!B){r_();return}let y=z_.current?.get(j),C=(y?.name||j.split("/").pop()||j).trim();if(B===C){r_();return}try{let p=(await C3(j,B))?.path||j,t=j.includes("/")?j.split("/").slice(0,-1).join("/")||".":".";if(r_(),s(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:j,newPath:p,type:y?.type||"file"}})),y?.type==="dir")V((__)=>{let d=new Set;for(let Y_ of __)if(Y_===j)d.add(p);else if(Y_.startsWith(`${j}/`))d.add(`${p}${Y_.slice(j.length)}`);else d.add(Y_);return d});if(W(p),y?.type==="dir")P(null),R(!1),H(null);else y_.current?.(p);M_.current?.(t)}catch(u){s(u?.message||"Failed to rename file")}},[r_,D]),h0=b(async(j)=>{let C=j||".";for(let u=0;u<50;u+=1){let t=`untitled${u===0?"":`-${u}`}.md`;try{let d=(await D3(C,t,""))?.path||(C==="."?t:`${C}/${t}`);if(C&&C!==".")V((Y_)=>new Set([...Y_,C]));W(d),s(null),M_.current?.(C),y_.current?.(d);return}catch(__){if(__?.status===409||__?.code==="file_exists")continue;s(__?.message||"Failed to create file");return}}s("Failed to create file (untitled name already in use).")},[]),n0=b((j)=>{if(j?.stopPropagation?.(),B_)return;let B=I0(h_.current);h0(B)},[B_,I0,h0]);c(()=>{if(typeof window>"u")return;let j=(B)=>{let y=B?.detail?.updates||[];if(!Array.isArray(y)||y.length===0)return;Z((__)=>{let d=__;for(let Y_ of y){if(!Y_?.root)continue;if(!d||Y_.path==="."||!Y_.path)d=Y_.root;else d=L1(d,Y_.path,Y_.root)}if(d)N_.current=Y4(d,V_.current,d_.current);return T(!1),d});let C=h_.current;if(Boolean(C)&&y.some((__)=>{let d=__?.path||"";if(!d||d===".")return!0;return C===d||C.startsWith(`${d}/`)||d.startsWith(`${C}/`)}))b_.current.clear();if(!C||!P0.current)return;let p=z_.current?.get(C);if(p&&p.type==="dir")return;if(y.some((__)=>{let d=__?.path||"";if(!d||d===".")return!0;return C===d||C.startsWith(`${d}/`)}))y_.current?.(C)};return window.addEventListener("workspace-update",j),()=>window.removeEventListener("workspace-update",j)},[]),v_.current=N0;let y0=A(()=>{if(typeof window>"u")return;let j=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),B=M0.current??H0.current,y=document.visibilityState!=="hidden"&&(B||j.matches&&H0.current);x2(y,d_.current).catch(()=>{})}).current,z=A(0),f=A(()=>{if(z.current)clearTimeout(z.current);z.current=setTimeout(()=>{z.current=0,y0()},250)}).current;c(()=>{if(H0.current)v_.current?.();f()},[$,J]),c(()=>{v_.current(),y0();let j=setInterval(()=>v_.current(),f8),B=Z2("previewHeight",null),y=Number.isFinite(B)?Math.min(Math.max(B,80),600):280;if(k_.current=y,$0.current)$0.current.style.setProperty("--preview-height",`${y}px`);let C=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),u=()=>f();if(C.addEventListener)C.addEventListener("change",u);else if(C.addListener)C.addListener(u);return document.addEventListener("visibilitychange",u),()=>{if(clearInterval(j),L_.current)cancelAnimationFrame(L_.current),L_.current=0;if(C.removeEventListener)C.removeEventListener("change",u);else if(C.removeListener)C.removeListener(u);if(document.removeEventListener("visibilitychange",u),z.current)clearTimeout(z.current),z.current=0;if(D_.current)clearTimeout(D_.current),D_.current=null;x2(!1,d_.current).catch(()=>{})}},[]);let o=T0(()=>j4(X,K,l),[X,K,l]),$_=T0(()=>new Map(o.map((j)=>[j.node.path,j.node])),[o]);z_.current=$_;let A_=(G?z_.current.get(G):null)?.type==="dir";c(()=>{if(!G||!A_){Q_(null),X0.current=null,O0.current=null;return}let j=G,B=`${l?"hidden":"visible"}:${G}`,y=b_.current,C=y.get(B);if(C?.root){y.delete(B),y.set(B,C);let t=X4(C.root,Boolean(C.truncated),j_);if(t)X0.current=t,O0.current=G,Q_({loading:!1,error:null,payload:t});return}let u=X0.current,p=O0.current;Q_({loading:!0,error:null,payload:p===G?u:null}),S2(G,R8,l).then((t)=>{if(h_.current!==j)return;let __={root:t?.root,truncated:Boolean(t?.truncated)};y.delete(B),y.set(B,__);while(y.size>u8){let Y_=y.keys().next().value;if(!Y_)break;y.delete(Y_)}let d=X4(__.root,__.truncated,j_);X0.current=d,O0.current=G,Q_({loading:!1,error:null,payload:d})}).catch((t)=>{if(h_.current!==j)return;Q_({loading:!1,error:t?.message||"Failed to load folder size chart",payload:p===G?u:null})})},[G,A_,l,j_]);let O_=Boolean(E&&E.kind==="text"&&!A_&&(!E.size||E.size<=262144)),p_=O_?"Open in editor":E?.size>262144?"File too large to edit":"File is not editable",G0=(j)=>{let B=j?.target;if(B instanceof Element)return B;return B?.parentElement||null},S0=A((j)=>{if(t_.current)clearTimeout(t_.current),t_.current=null;let y=G0(j)?.closest?.("[data-path]");if(!y)return;let C=y.dataset.path;if(y.dataset.type==="dir"||!C)return;if(j0.current===C)r_();a_.current?.(C)}).current,w_=A((j)=>{if(n.current){n.current=!1;return}let B=G0(j),y=B?.closest?.("[data-path]");if(J0.current?.focus?.(),!y)return;let C=y.dataset.path,u=y.dataset.type,p=Boolean(B?.closest?.(".workspace-caret")),t=Boolean(B?.closest?.("button"))||Boolean(B?.closest?.("a"))||Boolean(B?.closest?.("input")),__=h_.current===C,d=j0.current;if(d){if(d===C)return;r_()}if(__&&!p&&!t&&C!=="."){if(t_.current)clearTimeout(t_.current);t_.current=setTimeout(()=>{t_.current=null,u0(C)},350);return}if(u==="dir"){if(W(C),P(null),H(null),R(!1),!V_.current.has(C))M_.current?.(C);if(__&&!p)return;V((V0)=>{let s_=new Set(V0);if(s_.has(C))s_.delete(C);else s_.add(C);return s_})}else{W(C);let Y_=z_.current.get(C);if(Y_)R_.current?.(Y_.path,Y_);y_.current?.(C)}}).current,P_=A(()=>{N_.current="",v_.current(),Array.from(V_.current||[]).filter((B)=>B&&B!==".").forEach((B)=>M_.current?.(B))}).current,L0=A(()=>{W(null),P(null),H(null),R(!1)}).current,K2=A(()=>{e((j)=>{let B=!j;if(typeof window<"u")f_("workspaceShowHidden",String(B));return d_.current=B,x2(!0,B).catch(()=>{}),N_.current="",v_.current?.(),Array.from(V_.current||[]).filter((C)=>C&&C!==".").forEach((C)=>M_.current?.(C)),B})}).current,G2=A((j)=>{if(G0(j)?.closest?.("[data-path]"))return;L0()}).current,x0=b(async(j)=>{if(!j)return;let B=j.split("/").pop()||j;if(!window.confirm(`Delete "${B}"? This cannot be undone.`))return;try{await k3(j);let C=j.includes("/")?j.split("/").slice(0,-1).join("/")||".":".";if(h_.current===j)L0();M_.current?.(C),s(null)}catch(C){P((u)=>({...u||{},error:C.message||"Failed to delete file"}))}},[L0]),V2=b((j)=>{let B=J0.current;if(!B||!j||typeof CSS>"u"||typeof CSS.escape!=="function")return;B.querySelector(`[data-path="${CSS.escape(j)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),i0=b((j)=>{let B=o;if(!B||B.length===0)return;let y=G?B.findIndex((C)=>C.node.path===G):-1;if(j.key==="ArrowDown"){j.preventDefault();let C=Math.min(y+1,B.length-1),u=B[C];if(!u)return;if(W(u.node.path),u.node.type!=="dir")R_.current?.(u.node.path,u.node),y_.current?.(u.node.path);else P(null),R(!1),H(null);V2(u.node.path);return}if(j.key==="ArrowUp"){j.preventDefault();let C=y<=0?0:y-1,u=B[C];if(!u)return;if(W(u.node.path),u.node.type!=="dir")R_.current?.(u.node.path,u.node),y_.current?.(u.node.path);else P(null),R(!1),H(null);V2(u.node.path);return}if(j.key==="ArrowRight"&&y>=0){let C=B[y];if(C?.node?.type==="dir"&&!K.has(C.node.path))j.preventDefault(),M_.current?.(C.node.path),V((u)=>new Set([...u,C.node.path]));return}if(j.key==="ArrowLeft"&&y>=0){let C=B[y];if(C?.node?.type==="dir"&&K.has(C.node.path))j.preventDefault(),V((u)=>{let p=new Set(u);return p.delete(C.node.path),p});return}if(j.key==="Enter"&&y>=0){j.preventDefault();let C=B[y];if(!C)return;let u=C.node.path;if(C.node.type==="dir"){if(!V_.current.has(u))M_.current?.(u);V((t)=>{let __=new Set(t);if(__.has(u))__.delete(u);else __.add(u);return __}),P(null),H(null),R(!1)}else R_.current?.(u,C.node),y_.current?.(u);return}if((j.key==="Delete"||j.key==="Backspace")&&y>=0){let C=B[y];if(!C||C.node.type==="dir")return;j.preventDefault(),x0(C.node.path);return}if(j.key==="Escape")j.preventDefault(),L0()},[L0,x0,K,o,V2,G]),m0=b((j)=>{let B=j?.target?.closest?.(".workspace-row");if(!B)return;let y=B.dataset.type,C=B.dataset.path;if(!C||C===".")return;if(j0.current===C)return;let u=j?.touches?.[0];if(!u)return;if(c_.current={path:C,dragging:!1,startX:u.clientX,startY:u.clientY},y!=="file")return;if(D_.current)clearTimeout(D_.current);D_.current=setTimeout(()=>{if(D_.current=null,c_.current?.dragging)return;x0(C)},600)},[x0]),l_=b(()=>{if(D_.current)clearTimeout(D_.current),D_.current=null;let j=c_.current;if(j?.dragging&&j.path){let B=u_.current||T_(),y=D0.current;if(typeof y==="function")y(j.path,B)}c_.current={path:null,dragging:!1,startX:0,startY:0},q0.current=0,a(!1),K_(null),m_(null),g_(),F0()},[T_,F0,m_,g_]),o2=b((j)=>{let B=c_.current,y=j?.touches?.[0];if(!y||!B?.path){if(D_.current)clearTimeout(D_.current),D_.current=null;return}let C=Math.abs(y.clientX-B.startX),u=Math.abs(y.clientY-B.startY),p=C>8||u>8;if(p&&D_.current)clearTimeout(D_.current),D_.current=null;if(!B.dragging&&p)B.dragging=!0,a(!0),K_("move"),C0(B.path);if(B.dragging){j.preventDefault(),e_(y.clientX,y.clientY);let t=document.elementFromPoint(y.clientX,y.clientY),__=B0(t)||T_();if(u_.current!==__)m_(__);i_(__)}},[B0,T_,C0,e_,m_,i_]),n2=A((j)=>{j.preventDefault();let B=$0.current;if(!B)return;let y=j.clientY,C=k_.current||280,u=j.currentTarget;u.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let p=y,t=(d)=>{p=d.clientY;let Y_=B.clientHeight-80,V0=Math.min(Math.max(C-(d.clientY-y),80),Y_);B.style.setProperty("--preview-height",`${V0}px`),k_.current=V0},__=()=>{let d=B.clientHeight-80,Y_=Math.min(Math.max(C-(p-y),80),d);k_.current=Y_,u.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",f_("previewHeight",String(Math.round(Y_))),document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",__)};document.addEventListener("mousemove",t),document.addEventListener("mouseup",__)}).current,U2=A((j)=>{j.preventDefault();let B=$0.current;if(!B)return;let y=j.touches[0];if(!y)return;let C=y.clientY,u=k_.current||280,p=j.currentTarget;p.classList.add("dragging"),document.body.style.userSelect="none";let t=(d)=>{let Y_=d.touches[0];if(!Y_)return;d.preventDefault();let V0=B.clientHeight-80,s_=Math.min(Math.max(u-(Y_.clientY-C),80),V0);B.style.setProperty("--preview-height",`${s_}px`),k_.current=s_},__=()=>{p.classList.remove("dragging"),document.body.style.userSelect="",f_("previewHeight",String(Math.round(k_.current||u))),document.removeEventListener("touchmove",t),document.removeEventListener("touchend",__),document.removeEventListener("touchcancel",__)};document.addEventListener("touchmove",t,{passive:!1}),document.addEventListener("touchend",__),document.addEventListener("touchcancel",__)}).current,k0=async()=>{if(!G)return;try{let j=await E3(G);if(j.media_id)H(j.media_id)}catch(j){P((B)=>({...B||{},error:j.message||"Failed to attach"}))}},A0=async()=>{if(!G||A_)return;await x0(G)},d0=(j)=>{return Array.from(j?.dataTransfer?.types||[]).includes("Files")},F2=b((j)=>{if(!d0(j))return;if(j.preventDefault(),q0.current+=1,!E0.current)a(!0);K_("upload");let B=K0(j)||T_();m_(B),i_(B)},[T_,K0,m_,i_]),r0=b((j)=>{if(!d0(j))return;if(j.preventDefault(),j.dataTransfer)j.dataTransfer.dropEffect="copy";if(!E0.current)a(!0);if(Q0.current!=="upload")K_("upload");let B=K0(j)||T_();if(u_.current!==B)m_(B);i_(B)},[T_,K0,m_,i_]),d2=b((j)=>{if(!d0(j))return;if(j.preventDefault(),q0.current=Math.max(0,q0.current-1),q0.current===0)a(!1),K_(null),m_(null),g_()},[m_,g_]),s0=b(async(j,B=".")=>{let y=Array.from(j||[]);if(y.length===0)return;let C=B&&B!==""?B:".",u=C!=="."?C:"workspace root";g(!0);try{let p=null;for(let t of y)try{p=await V1(t,C)}catch(__){let d=__?.status,Y_=__?.code;if(d===409||Y_==="file_exists"){let V0=t?.name||"file";if(!window.confirm(`"${V0}" already exists in ${u}. Overwrite?`))continue;p=await V1(t,C,{overwrite:!0})}else throw __}if(p?.path)W(p.path),y_.current?.(p.path);M_.current?.(C)}catch(p){s(p.message||"Failed to upload file")}finally{g(!1)}},[]),r2=b(async(j,B)=>{if(!j)return;let y=z_.current?.get(j);if(!y)return;let C=B&&B!==""?B:".",u=j.includes("/")?j.split("/").slice(0,-1).join("/")||".":".";if(C===u)return;try{let t=(await y3(j,C))?.path||j;if(y.type==="dir")V((__)=>{let d=new Set;for(let Y_ of __)if(Y_===j)d.add(t);else if(Y_.startsWith(`${j}/`))d.add(`${t}${Y_.slice(j.length)}`);else d.add(Y_);return d});if(W(t),y.type==="dir")P(null),R(!1),H(null);else y_.current?.(t);M_.current?.(u),M_.current?.(C)}catch(p){s(p?.message||"Failed to move entry")}},[]);D0.current=r2;let s2=b(async(j)=>{if(!d0(j))return;j.preventDefault(),q0.current=0,a(!1),K_(null),S_(null),g_();let B=Array.from(j?.dataTransfer?.files||[]);if(B.length===0)return;let y=u_.current||K0(j)||T_();await s0(B,y)},[T_,K0,s0]),a2=b((j)=>{if(j?.stopPropagation?.(),B_)return;let B=j?.currentTarget?.dataset?.uploadTarget||".";W0.current=B,w0.current?.click()},[B_]),t2=b(()=>{if(B_)return;let j=h_.current,B=j?z_.current?.get(j):null;W0.current=B?.type==="dir"?B.path:".",w0.current?.click()},[B_]),a0=b((j)=>{if(!j||j.button!==0)return;let B=j.currentTarget;if(!B||!B.dataset)return;let y=B.dataset.path;if(!y||y===".")return;if(j0.current===y)return;if(j.target?.closest?.("button, a, input, .workspace-caret"))return;j.preventDefault(),Z0.current={path:y,dragging:!1,startX:j.clientX,startY:j.clientY};let C=(p)=>{let t=Z0.current;if(!t?.path)return;let __=Math.abs(p.clientX-t.startX),d=Math.abs(p.clientY-t.startY),Y_=__>4||d>4;if(!t.dragging&&Y_)t.dragging=!0,n.current=!0,a(!0),K_("move"),C0(t.path),e_(p.clientX,p.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(t.dragging){p.preventDefault(),e_(p.clientX,p.clientY);let V0=document.elementFromPoint(p.clientX,p.clientY),s_=B0(V0)||T_();if(u_.current!==s_)m_(s_);i_(s_)}},u=()=>{document.removeEventListener("mousemove",C),document.removeEventListener("mouseup",u);let p=Z0.current;if(p?.dragging&&p.path){let t=u_.current||T_(),__=D0.current;if(typeof __==="function")__(p.path,t)}Z0.current={path:null,dragging:!1,startX:0,startY:0},q0.current=0,a(!1),K_(null),m_(null),g_(),F0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{n.current=!1},0)};document.addEventListener("mousemove",C),document.addEventListener("mouseup",u)},[B0,T_,C0,e_,F0,m_,i_,g_]),W2=b(async(j)=>{let B=Array.from(j?.target?.files||[]);if(B.length===0)return;let y=W0.current||".";if(await s0(B,y),W0.current=".",j?.target)j.target.value=""},[s0]);return N`
        <aside
            class=${`workspace-sidebar${h?" workspace-drop-active":""}`}
            ref=${$0}
            onDragEnter=${F2}
            onDragOver=${r0}
            onDragLeave=${d2}
            onDrop=${s2}
        >
            <input type="file" multiple style="display:none" ref=${w0} onChange=${W2} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${n0} title="New file" disabled=${B_}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${P_} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${l?" active":""}`}
                        onClick=${K2}
                        title=${l?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!l&&N`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${G2}>
                ${B_&&N`<div class="workspace-drop-hint">Uploading…</div>`}
                ${k&&N`<div class="workspace-loading">Loading…</div>`}
                ${r&&N`<div class="workspace-error">${r}</div>`}
                ${X&&N`
                    <div
                        class="workspace-tree-list"
                        ref=${J0}
                        tabIndex="0"
                        onClick=${w_}
                        onDblClick=${S0}
                        onKeyDown=${i0}
                        onTouchStart=${m0}
                        onTouchEnd=${l_}
                        onTouchMove=${o2}
                        onTouchCancel=${l_}
                    >
                        ${o.map(({node:j,depth:B})=>{let y=j.type==="dir",C=j.path===G,u=j.path===Q,p=y&&K.has(j.path),t=Z_&&j.path===Z_,__=Array.isArray(j.children)&&j.children.length>0?j.children.length:Number(j.child_count)||0;return N`
                                <div
                                    key=${j.path}
                                    class=${`workspace-row${C?" selected":""}${t?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+B*T8}px`}}
                                    data-path=${j.path}
                                    data-type=${j.type}
                                    onMouseDown=${a0}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${y?p?N`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:N`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${y?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${y?N`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:N`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${u?N`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${Y0}
                                                value=${D}
                                                onInput=${(d)=>F(d?.target?.value||"")}
                                                onKeyDown=${(d)=>{if(d.key==="Enter")d.preventDefault(),p0();else if(d.key==="Escape")d.preventDefault(),r_()}}
                                                onBlur=${r_}
                                                onClick=${(d)=>d.stopPropagation()}
                                            />
                                        `:N`<span class="workspace-label">${j.name}</span>`}
                                    ${y&&!p&&__>0&&N`
                                        <span class="workspace-count">${__}</span>
                                    `}
                                    ${y&&N`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${j.path}
                                            title="Upload files to this folder"
                                            onClick=${a2}
                                            disabled=${B_}
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
            ${G&&N`
                <div class="workspace-preview-splitter-h" onMouseDown=${n2} onTouchStart=${U2}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${G}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${n0} title="New file" disabled=${B_}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!A_&&N`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>O_&&a_.current?.(G,E)}
                                    title=${p_}
                                    disabled=${!O_}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${A0}
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
                            ${A_?N`
                                    <button class="workspace-download" onClick=${t2}
                                        title="Upload files to this folder" disabled=${B_}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${A3(G,l)}
                                        title="Download folder as zip" onClick=${(j)=>j.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:N`<button class="workspace-download" onClick=${k0} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${L&&N`<div class="workspace-loading">Loading preview…</div>`}
                    ${E?.error&&N`<div class="workspace-error">${E.error}</div>`}
                    ${A_&&N`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${G_?.loading&&N`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${G_?.error&&N`<div class="workspace-error">${G_.error}</div>`}
                        ${G_?.payload&&G_.payload.segments?.length>0&&N`
                            <${m8} payload=${G_.payload} />
                        `}
                        ${G_?.payload&&(!G_.payload.segments||G_.payload.segments.length===0)&&N`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${E&&!E.error&&!A_&&N`
                        <div class="workspace-preview-meta">
                            ${E.size?N`<span>${f0(E.size)}</span>`:""}
                            ${E.mtime?N`<span>${c2(E.mtime)}</span>`:""}
                            ${E.truncated?N`<span>truncated</span>`:""}
                        </div>
                        ${E.kind==="image"&&N`
                            <div class="workspace-preview-image">
                                <img src=${E.url||W1(E.path)} alt="preview" />
                            </div>
                        `}
                        ${E.kind==="text"&&N`
                            ${E.content_type==="text/markdown"?N`<div class="workspace-preview-text"
                                    dangerouslySetInnerHTML=${{__html:j2(E.text||"",null,{rewriteImageSrc:(j)=>v8(j,E.path||G)})}} />`:N`<pre class="workspace-preview-text"><code>${E.text||""}</code></pre>`}
                        `}
                        ${E.kind==="binary"&&N`
                            <div class="workspace-preview-text">Binary file — download to view.</div>
                        `}
                    `}
                    ${I&&N`
                        <div class="workspace-download-card">
                            <${g8} mediaId=${I} />
                        </div>
                    `}
                </div>
            `}
            ${F_&&N`
                <div class="workspace-drag-ghost" ref=${v0}>${F_.label}</div>
            `}
        </aside>
    `}function z4({tabs:_,activeId:$,onActivate:J,onClose:Y,onCloseOthers:X,onCloseAll:Z,onTogglePin:K,onTogglePreview:V,previewTabs:G,onToggleDock:W,dockVisible:Q}){let[U,D]=v(null),F=A(null);c(()=>{if(!U)return;let H=(k)=>{if(k.type==="keydown"&&k.key!=="Escape")return;D(null)};return document.addEventListener("click",H),document.addEventListener("keydown",H),()=>{document.removeEventListener("click",H),document.removeEventListener("keydown",H)}},[U]),c(()=>{let H=(k)=>{if(k.ctrlKey&&k.key==="Tab"){if(k.preventDefault(),!_.length)return;let T=_.findIndex((L)=>L.id===$);if(k.shiftKey){let L=_[(T-1+_.length)%_.length];J?.(L.id)}else{let L=_[(T+1)%_.length];J?.(L.id)}return}if((k.ctrlKey||k.metaKey)&&k.key==="w"){let T=document.querySelector(".editor-pane");if(T&&T.contains(document.activeElement)){if(k.preventDefault(),$)Y?.($)}}};return document.addEventListener("keydown",H),()=>document.removeEventListener("keydown",H)},[_,$,J,Y]);let E=b((H,k)=>{if(H.button===1){H.preventDefault(),Y?.(k);return}if(H.button===0)J?.(k)},[J,Y]),P=b((H,k)=>{H.preventDefault(),D({id:k,x:H.clientX,y:H.clientY})},[]),I=b((H,k)=>{H.stopPropagation(),Y?.(k)},[Y]);if(c(()=>{if(!$||!F.current)return;let H=F.current.querySelector(".tab-item.active");if(H)H.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return N`
        <div class="tab-strip" ref=${F} role="tablist">
            ${_.map((H)=>N`
                <div
                    key=${H.id}
                    class=${`tab-item${H.id===$?" active":""}${H.dirty?" dirty":""}${H.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${H.id===$}
                    title=${H.path}
                    onMouseDown=${(k)=>E(k,H.id)}
                    onContextMenu=${(k)=>P(k,H.id)}
                >
                    ${H.pinned&&N`
                        <span class="tab-pin-icon" aria-label="Pinned">
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                <path d="M4.456.734a1.75 1.75 0 0 1 2.826.504l.613 1.327a3.1 3.1 0 0 0 2.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.1 3.1 0 0 0-1.707-2.084l-1.327-.613a1.75 1.75 0 0 1-.504-2.826z"/>
                            </svg>
                        </span>
                    `}
                    <span class="tab-label">${H.label}</span>
                    <span
                        class="tab-close"
                        onClick=${(k)=>I(k,H.id)}
                        title=${H.dirty?"Unsaved changes":"Close"}
                        aria-label=${H.dirty?"Unsaved changes":`Close ${H.label}`}
                    >
                        ${H.dirty?N`<span class="tab-dirty-dot" aria-hidden="true"></span>`:N`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                <line x1="4" y1="4" x2="12" y2="12"/>
                                <line x1="12" y1="4" x2="4" y2="12"/>
                            </svg>`}
                    </span>
                </div>
            `)}
            ${W&&N`
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
        ${U&&N`
            <div class="tab-context-menu" style=${{left:U.x+"px",top:U.y+"px"}}>
                <button onClick=${()=>{Y?.(U.id),D(null)}}>Close</button>
                <button onClick=${()=>{X?.(U.id),D(null)}}>Close Others</button>
                <button onClick=${()=>{Z?.(),D(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{K?.(U.id),D(null)}}>
                    ${_.find((H)=>H.id===U.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${V&&/\.(md|mdx|markdown)$/i.test(U.id)&&N`
                    <hr />
                    <button onClick=${()=>{V(U.id),D(null)}}>
                        ${G?.has(U.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var c8=400,y1=60,H4=220,k1="mdPreviewHeight";function p8(){try{let _=localStorage.getItem(k1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=y1?$:H4}catch{return H4}}function U4({getContent:_,path:$,onClose:J}){let[Y,X]=v(""),[Z,K]=v(p8),V=A(null),G=A(null),W=A(""),Q=A(_);return Q.current=_,c(()=>{let F=()=>{let P=Q.current?.()||"";if(P===W.current)return;W.current=P;try{let I=j2(P,null,{sanitize:!1});X(I)}catch{X('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};F();let E=setInterval(F,c8);return()=>clearInterval(E)},[]),c(()=>{if(V.current&&Y)g2(V.current).catch(()=>{})},[Y]),N`
        <div
            class="md-preview-splitter"
            onMouseDown=${(F)=>{F.preventDefault();let E=F.clientY,P=G.current?.offsetHeight||Z,I=G.current?.parentElement,H=I?I.offsetHeight*0.7:500,k=F.currentTarget;k.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let T=(R)=>{let r=Math.min(Math.max(P-(R.clientY-E),y1),H);K(r)},L=()=>{k.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(k1,String(Math.round(G.current?.offsetHeight||Z)))}catch{}document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",L)};document.addEventListener("mousemove",T),document.addEventListener("mouseup",L)}}
            onTouchStart=${(F)=>{F.preventDefault();let E=F.touches[0];if(!E)return;let P=E.clientY,I=G.current?.offsetHeight||Z,H=G.current?.parentElement,k=H?H.offsetHeight*0.7:500,T=F.currentTarget;T.classList.add("dragging"),document.body.style.userSelect="none";let L=(r)=>{let s=r.touches[0];if(!s)return;r.preventDefault();let l=Math.min(Math.max(I-(s.clientY-P),y1),k);K(l)},R=()=>{T.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(k1,String(Math.round(G.current?.offsetHeight||Z)))}catch{}document.removeEventListener("touchmove",L),document.removeEventListener("touchend",R),document.removeEventListener("touchcancel",R)};document.addEventListener("touchmove",L,{passive:!1}),document.addEventListener("touchend",R),document.addEventListener("touchcancel",R)}}
        ></div>
        <div class="md-preview-panel" ref=${G} style=${{height:Z+"px"}}>
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
                ref=${V}
                dangerouslySetInnerHTML=${{__html:Y}}
            />
        </div>
    `}class F4{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,J=-1/0;for(let Y of this.extensions.values()){if(Y.placement!=="tabs")continue;if(!Y.canHandle)continue;try{let X=Y.canHandle(_);if(X===!1||X===0)continue;let Z=X===!0?0:typeof X==="number"?X:0;if(Z>J)J=Z,$=Y}catch(X){console.warn(`[PaneRegistry] canHandle() error for "${Y.id}":`,X)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var _0=new F4;var i2=null,A1=null;function L4(){if(A1)return Promise.resolve(A1);if(!i2)i2=import("/static/dist/editor.bundle.js").then((_)=>{return A1=_,_}).catch((_)=>{throw i2=null,_});return i2}class E4{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await L4();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){if(this.queuedViewStateCb=_,this.real&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(_)}restoreViewState(_){if(this.queuedViewState=_,this.real&&typeof this.real.restoreViewState==="function")this.real.restoreViewState(_)}getPath(){if(this.real&&typeof this.real.getPath==="function")return this.real.getPath();return this.context.path||""}setPath(_){if(this.real&&typeof this.real.setPath==="function")this.real.setPath(_)}}var w1={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;return 1},mount(_,$){return new E4(_,$)}};function M1(){L4().catch(()=>{})}class D4{container;disposed=!1;termEl;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0");let J=document.createElement("div");J.className="terminal-pane-header";let Y=document.createElement("span");Y.className="terminal-pane-title",Y.textContent="Terminal";let X=document.createElement("span");X.className="terminal-pane-status",X.textContent="Not connected",J.append(Y,X);let Z=document.createElement("div");Z.className="terminal-pane-body",Z.innerHTML='<div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>',this.termEl.append(J,Z),_.appendChild(this.termEl)}getContent(){return}isDirty(){return!1}focus(){this.termEl?.focus()}resize(){}dispose(){if(this.disposed)return;this.disposed=!0,this.termEl?.remove()}}var P1={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new D4(_,$)}};class C4{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let J of this.listeners)try{J(_,$)}catch{}}open(_,$){let J=this.tabs.get(_);if(!J)J={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,J);return this.activate(_),J}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,J]of this.tabs)if($!==_&&!J.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((Y)=>Y!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let J=this.tabs.get(_);if(!J||J.dirty===$)return;J.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let J=this.tabs.get(_);if(J)J.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,J){let Y=this.tabs.get(_);if(!Y)return;if(this.tabs.delete(_),Y.id=$,Y.path=$,Y.label=J||$.split("/").pop()||$,this.tabs.set($,Y),this.mruOrder=this.mruOrder.map((X)=>X===_?$:X),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Y)=>Y.id===this.activeId),J=_[($+1)%_.length];this.activate(J.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Y)=>Y.id===this.activeId),J=_[($-1+_.length)%_.length];this.activate(J.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var U_=new C4;function y4({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:J}){c(()=>{J();let Y=new O1(_,$);Y.connect();let X=()=>{Y.reconnectIfNeeded()};return window.addEventListener("focus",X),document.addEventListener("visibilitychange",X),()=>{window.removeEventListener("focus",X),document.removeEventListener("visibilitychange",X),Y.disconnect()}},[$,_,J])}function k4(){let[_,$]=v(!1),[J,Y]=v("default"),X=A(!1);c(()=>{let G=Y2("notificationsEnabled",!1);if(X.current=G,$(G),typeof Notification<"u")Y(Notification.permission)},[]),c(()=>{X.current=_},[_]);let Z=b(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let G=Notification.requestPermission();if(G&&typeof G.then==="function")return G;return Promise.resolve(G)}catch{return Promise.resolve("default")}},[]),K=b(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){Y("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let W=await Z();if(Y(W||"default"),W!=="granted"){X.current=!1,$(!1),f_("notificationsEnabled","false");return}}let G=!X.current;X.current=G,$(G),f_("notificationsEnabled",String(G))},[Z]),V=b((G,W)=>{if(!X.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let Q=new Notification(G,{body:W});return Q.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:J,toggleNotifications:K,notify:V}}var H2=(_)=>{let $=new Set;return(_||[]).filter((J)=>{if(!J||$.has(J.id))return!1;return $.add(J.id),!0})};function A4({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[J,Y]=v(null),[X,Z]=v(!1),K=A(!1),V=A(null),G=A(!1),W=A(null);c(()=>{K.current=X},[X]);let Q=b(async(F=null)=>{try{if(F){let E=await G3(F);Y(E.posts),Z(!1)}else{let E=await b2(10);Y(E.posts),Z(E.has_more)}}catch(E){console.error("Failed to load posts:",E)}},[]),U=b(async()=>{try{let F=await b2(10);Y((E)=>{if(!E||E.length===0)return F.posts;return H2([...F.posts,...E])}),Z((E)=>E||F.has_more)}catch(F){console.error("Failed to refresh timeline:",F)}},[]),D=b(async(F={})=>{if(!J||J.length===0)return;if(G.current)return;let{preserveScroll:E=!0,preserveMode:P="top",allowRepeat:I=!1}=F,H=(L)=>{if(!E){L();return}if(P==="top")$(L);else _(L)},T=J.slice().sort((L,R)=>L.id-R.id)[0]?.id;if(!Number.isFinite(T))return;if(!I&&W.current===T)return;G.current=!0,W.current=T;try{let L=await b2(10,T);if(L.posts.length>0)H(()=>{Y((R)=>H2([...L.posts,...R||[]])),Z(L.has_more)});else Z(!1)}catch(L){console.error("Failed to load more posts:",L)}finally{G.current=!1}},[J,_,$]);return c(()=>{V.current=D},[D]),{posts:J,setPosts:Y,hasMore:X,setHasMore:Z,hasMoreRef:K,loadPosts:Q,refreshTimeline:U,loadMore:D,loadMoreRef:V,loadingMoreRef:G,lastBeforeIdRef:W}}function w4(){let[_,$]=v(null),[J,Y]=v({text:"",totalLines:0}),[X,Z]=v(""),[K,V]=v({text:"",totalLines:0}),[G,W]=v(null),[Q,U]=v(null),[D,F]=v(null),E=A(null),P=A(0),I=A(!1),H=A(""),k=A(""),T=A(null),L=A(null),R=A(null),r=A(null),s=A(!1),l=A(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:J,setAgentDraft:Y,agentPlan:X,setAgentPlan:Z,agentThought:K,setAgentThought:V,pendingRequest:G,setPendingRequest:W,currentTurnId:Q,setCurrentTurnId:U,steerQueuedTurnId:D,setSteerQueuedTurnId:F,lastAgentEventRef:E,lastSilenceNoticeRef:P,isAgentRunningRef:I,draftBufferRef:H,thoughtBufferRef:k,pendingRequestRef:T,stalledPostIdRef:L,currentTurnIdRef:R,steerQueuedTurnIdRef:r,thoughtExpandedRef:s,draftExpandedRef:l}}function M4({appShellRef:_,sidebarWidthRef:$,editorWidthRef:J,dockHeightRef:Y}){let X=A((Q)=>{Q.preventDefault();let U=_.current;if(!U)return;let D=Q.clientX,F=$.current||280,E=Q.currentTarget;E.classList.add("dragging"),U.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let P=D,I=(k)=>{P=k.clientX;let T=Math.min(Math.max(F+(k.clientX-D),160),600);U.style.setProperty("--sidebar-width",`${T}px`),$.current=T},H=()=>{let k=Math.min(Math.max(F+(P-D),160),600);$.current=k,E.classList.remove("dragging"),U.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",f_("sidebarWidth",String(Math.round(k))),document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",H)};document.addEventListener("mousemove",I),document.addEventListener("mouseup",H)}).current,Z=A((Q)=>{Q.preventDefault();let U=_.current;if(!U)return;let D=Q.touches[0];if(!D)return;let F=D.clientX,E=$.current||280,P=Q.currentTarget;P.classList.add("dragging"),U.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let I=(k)=>{let T=k.touches[0];if(!T)return;k.preventDefault();let L=Math.min(Math.max(E+(T.clientX-F),160),600);U.style.setProperty("--sidebar-width",`${L}px`),$.current=L},H=()=>{P.classList.remove("dragging"),U.classList.remove("sidebar-resizing"),document.body.style.userSelect="",f_("sidebarWidth",String(Math.round($.current||E))),document.removeEventListener("touchmove",I),document.removeEventListener("touchend",H),document.removeEventListener("touchcancel",H)};document.addEventListener("touchmove",I,{passive:!1}),document.addEventListener("touchend",H),document.addEventListener("touchcancel",H)}).current,K=A((Q)=>{Q.preventDefault();let U=_.current;if(!U)return;let D=Q.clientX,F=J.current||$.current||280,E=Q.currentTarget;E.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let P=D,I=(k)=>{P=k.clientX;let T=Math.min(Math.max(F+(k.clientX-D),200),800);U.style.setProperty("--editor-width",`${T}px`),J.current=T},H=()=>{let k=Math.min(Math.max(F+(P-D),200),800);J.current=k,E.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",f_("editorWidth",String(Math.round(k))),document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",H)};document.addEventListener("mousemove",I),document.addEventListener("mouseup",H)}).current,V=A((Q)=>{Q.preventDefault();let U=_.current;if(!U)return;let D=Q.touches[0];if(!D)return;let F=D.clientX,E=J.current||$.current||280,P=Q.currentTarget;P.classList.add("dragging"),document.body.style.userSelect="none";let I=(k)=>{let T=k.touches[0];if(!T)return;k.preventDefault();let L=Math.min(Math.max(E+(T.clientX-F),200),800);U.style.setProperty("--editor-width",`${L}px`),J.current=L},H=()=>{P.classList.remove("dragging"),document.body.style.userSelect="",f_("editorWidth",String(Math.round(J.current||E))),document.removeEventListener("touchmove",I),document.removeEventListener("touchend",H),document.removeEventListener("touchcancel",H)};document.addEventListener("touchmove",I,{passive:!1}),document.addEventListener("touchend",H),document.addEventListener("touchcancel",H)}).current,G=A((Q)=>{Q.preventDefault();let U=_.current;if(!U)return;let D=Q.clientY,F=Y?.current||200,E=Q.currentTarget;E.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let P=D,I=(k)=>{P=k.clientY;let T=Math.min(Math.max(F-(k.clientY-D),100),window.innerHeight*0.5);if(U.style.setProperty("--dock-height",`${T}px`),Y)Y.current=T},H=()=>{let k=Math.min(Math.max(F-(P-D),100),window.innerHeight*0.5);if(Y)Y.current=k;E.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",f_("dockHeight",String(Math.round(k))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",H)};document.addEventListener("mousemove",I),document.addEventListener("mouseup",H)}).current,W=A((Q)=>{Q.preventDefault();let U=_.current;if(!U)return;let D=Q.touches[0];if(!D)return;let F=D.clientY,E=Y?.current||200,P=Q.currentTarget;P.classList.add("dragging"),document.body.style.userSelect="none";let I=(k)=>{let T=k.touches[0];if(!T)return;k.preventDefault();let L=Math.min(Math.max(E-(T.clientY-F),100),window.innerHeight*0.5);if(U.style.setProperty("--dock-height",`${L}px`),Y)Y.current=L},H=()=>{P.classList.remove("dragging"),document.body.style.userSelect="",f_("dockHeight",String(Math.round(Y?.current||E))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",I),document.removeEventListener("touchend",H),document.removeEventListener("touchcancel",H)};document.addEventListener("touchmove",I,{passive:!1}),document.addEventListener("touchend",H),document.addEventListener("touchcancel",H)}).current;return{handleSplitterMouseDown:X,handleSplitterTouchStart:Z,handleEditorSplitterMouseDown:K,handleEditorSplitterTouchStart:V,handleDockSplitterMouseDown:G,handleDockSplitterTouchStart:W}}function P4({onTabClosed:_}={}){let $=A(_);$.current=_;let[J,Y]=v(()=>U_.getTabs()),[X,Z]=v(()=>U_.getActiveId()),[K,V]=v(()=>U_.getTabs().length>0);c(()=>{return U_.onChange((L,R)=>{Y(L),Z(R),V(L.length>0)})},[]);let[G,W]=v(()=>new Set),Q=b((L)=>{W((R)=>{let r=new Set(R);if(r.has(L))r.delete(L);else r.add(L);return r})},[]),U=b((L)=>{W((R)=>{if(!R.has(L))return R;let r=new Set(R);return r.delete(L),r})},[]),D=b((L)=>{if(!L)return;let R={path:L,mode:"edit"};try{if(!_0.resolve(R)){if(!_0.get("editor")){console.warn(`[openEditor] No pane handler for: ${L}`);return}}}catch(r){console.warn(`[openEditor] paneRegistry.resolve() error for "${L}":`,r)}U_.open(L)},[]),F=b(()=>{let L=U_.getActiveId();if(L){let R=U_.get(L);if(R?.dirty){if(!window.confirm(`"${R.label}" has unsaved changes. Close anyway?`))return}U_.close(L),U(L),$.current?.(L)}},[U]),E=b((L)=>{let R=U_.get(L);if(R?.dirty){if(!window.confirm(`"${R.label}" has unsaved changes. Close anyway?`))return}U_.close(L),U(L),$.current?.(L)},[U]),P=b((L)=>{U_.activate(L)},[]),I=b((L)=>{let R=U_.getTabs().filter((l)=>l.id!==L&&!l.pinned),r=R.filter((l)=>l.dirty).length;if(r>0){if(!window.confirm(`${r} unsaved tab${r>1?"s":""} will be closed. Continue?`))return}let s=R.map((l)=>l.id);U_.closeOthers(L),s.forEach((l)=>{U(l),$.current?.(l)})},[U]),H=b(()=>{let L=U_.getTabs().filter((s)=>!s.pinned),R=L.filter((s)=>s.dirty).length;if(R>0){if(!window.confirm(`${R} unsaved tab${R>1?"s":""} will be closed. Continue?`))return}let r=L.map((s)=>s.id);U_.closeAll(),r.forEach((s)=>{U(s),$.current?.(s)})},[U]),k=b((L)=>{U_.togglePin(L)},[]),T=b(()=>{let L=U_.getActiveId();if(L)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:L}}))},[]);return c(()=>{let L=(R)=>{let{oldPath:r,newPath:s,type:l}=R.detail||{};if(!r||!s)return;if(l==="dir"){for(let e of U_.getTabs())if(e.path===r||e.path.startsWith(`${r}/`)){let h=`${s}${e.path.slice(r.length)}`;U_.rename(e.id,h)}}else U_.rename(r,s)};return window.addEventListener("workspace-file-renamed",L),()=>window.removeEventListener("workspace-file-renamed",L)},[]),c(()=>{let L=(R)=>{if(U_.hasUnsaved())R.preventDefault(),R.returnValue=""};return window.addEventListener("beforeunload",L),()=>window.removeEventListener("beforeunload",L)},[]),{editorOpen:K,tabStripTabs:J,tabStripActiveId:X,previewTabs:G,openEditor:D,closeEditor:F,handleTabClose:E,handleTabActivate:P,handleTabCloseOthers:I,handleTabCloseAll:H,handleTabTogglePin:k,handleTabTogglePreview:Q,revealInExplorer:T}}function b1(_,$){try{if(typeof window>"u")return $;let J=window.__PICLAW_SILENCE||{},Y=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,X=J[_]??window[Y],Z=Number(X);return Number.isFinite(Z)?Z:$}catch{return $}}var I1=b1("warning",30000),b4=b1("finalize",120000),I4=b1("refresh",30000),S4=30000;function x4(_){let $={};return(_?.agents||[]).forEach((J)=>{$[J.id]=J}),$}function T4(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function f4(_=30000){let[,$]=v(0);c(()=>{let J=setInterval(()=>$((Y)=>Y+1),_);return()=>clearInterval(J)},[_])}function l2(_,$=160){let J=String(_||"").replace(/\r\n/g,`
`);if(!J)return 0;return J.split(`
`).reduce((Y,X)=>Y+Math.max(1,Math.ceil(X.length/$)),0)}function g4(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var h8=V3,v4=O3,i8=q3,R4=H3,u4=U3,m4=N3,S1=typeof K1==="function"?K1:g4("getAgentContext",null),l8=typeof l0==="function"?l0:g4("getAgentModels",{current:null,models:[]});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});_0.register(w1);M1();var o8=typeof localStorage<"u"&&localStorage.getItem("experimentalPanes")==="true";if(o8)_0.register(P1);function n8(){let[_,$]=v("disconnected"),[J,Y]=v(null),[X,Z]=v(null),[K,V]=v(!1),[G,W]=v([]),[Q,U]=v([]),[D,F]=v(null),{agentStatus:E,setAgentStatus:P,agentDraft:I,setAgentDraft:H,agentPlan:k,setAgentPlan:T,agentThought:L,setAgentThought:R,pendingRequest:r,setPendingRequest:s,currentTurnId:l,setCurrentTurnId:e,steerQueuedTurnId:h,setSteerQueuedTurnId:a,lastAgentEventRef:q_,lastSilenceNoticeRef:K_,isAgentRunningRef:F_,draftBufferRef:J_,thoughtBufferRef:Z_,pendingRequestRef:S_,stalledPostIdRef:B_,currentTurnIdRef:g,steerQueuedTurnIdRef:G_,thoughtExpandedRef:Q_,draftExpandedRef:j_}=w4(),[C_,V_]=v({}),[N_,x_]=v(null),[L_,E_]=v(null),[v_,z_]=v(!1),[R_,a_]=v(null),[y_,M_]=v(null),{notificationsEnabled:$0,notificationPermission:J0,toggleNotifications:Y0,notify:w0}=k4(),[W0,D_]=v(()=>new Set),[c_,Z0]=v(()=>Y2("workspaceOpen",!0)),w=A(null),{editorOpen:n,tabStripTabs:k_,tabStripActiveId:b_,previewTabs:X0,openEditor:O0,closeEditor:d_,handleTabClose:H0,handleTabActivate:M0,handleTabCloseOthers:q0,handleTabCloseAll:u_,handleTabTogglePin:E0,handleTabTogglePreview:Q0,revealInExplorer:v0}=P4({onTabClosed:(O)=>w.current?.(O)}),R0=A(null),n_=A(null);c(()=>{let O=R0.current;if(!O)return;if(n_.current)n_.current.dispose(),n_.current=null;let q=b_;if(!q)return;let M={path:q,mode:"edit"},x=_0.resolve(M)||_0.get("editor");if(!x){O.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let m=x.mount(O,M);n_.current=m,m.onDirtyChange?.((i)=>{U_.setDirty(q,i)}),m.onSaveRequest?.(()=>{}),m.onClose?.(()=>{d_()});let S=U_.getViewState(q);if(S&&typeof m.restoreViewState==="function")requestAnimationFrame(()=>m.restoreViewState(S));if(typeof m.onViewStateChange==="function")m.onViewStateChange((i)=>{U_.saveViewState(q,i)});return requestAnimationFrame(()=>m.focus()),()=>{if(n_.current===m)m.dispose(),n_.current=null}},[b_,d_]);let[D0,h_]=v({name:"You",avatar_url:null,avatar_background:null}),j0=A(!1),t_=A(!1),P0=A({}),b0=A({name:null,avatar_url:null}),N0=A({currentHashtag:null,searchQuery:null}),U0=A(null),T_=A(null),B0=A(0),K0=A(0),m_=A(0),g_=A(null),i_=A(null),e_=A(null),C0=A(0),F0=A({title:null,avatarBase:null}),I0=A(null),r_=b(()=>{if(I0.current)clearTimeout(I0.current),I0.current=null;F(null)},[]);f4(30000),c(()=>{return f3()},[]),c(()=>{f_("workspaceOpen",String(c_))},[c_]),c(()=>{return()=>{r_()}},[r_]),c(()=>{P0.current=C_||{}},[C_]),c(()=>{b0.current=D0||{name:"You",avatar_url:null,avatar_background:null}},[D0]);let u0=b((O,q,M=null)=>{if(typeof document>"u")return;let x=(O||"").trim()||"PiClaw";if(F0.current.title!==x){document.title=x;let I_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(I_&&I_.getAttribute("content")!==x)I_.setAttribute("content",x);F0.current.title=x}let m=document.getElementById("dynamic-favicon");if(!m)return;let S=m.getAttribute("data-default")||m.getAttribute("href")||"/favicon.ico",i=q||S,W_=q?`${i}|${M||""}`:i;if(F0.current.avatarBase!==W_){let I_=q?`${i}${i.includes("?")?"&":"?"}v=${M||Date.now()}`:i;m.setAttribute("href",I_),F0.current.avatarBase=W_}},[]),p0=b((O)=>{if(!O)return;W((q)=>q.includes(O)?q:[...q,O])},[]),h0=b((O)=>{W((q)=>q.filter((M)=>M!==O))},[]);w.current=h0;let n0=b(()=>{W([])},[]),y0=b((O,q=null,M=3000)=>{r_(),F({title:O,detail:q||null}),I0.current=setTimeout(()=>{F((x)=>x?.title===O?null:x)},M)},[r_]),z=b((O)=>{if(typeof O!=="string")return;let q=O.trim();if(!q){y0("No file selected","Use a valid file path from a file pill.");return}if(!n){y0("Editor pane is not open","Open the editor pane to open files from pills.");return}if(/^[a-z][a-z0-9+.-]*:/i.test(q)){y0("Cannot open external path from file pill","Use an in-workspace file path.");return}let x={path:q,mode:"edit"};if(!_0.resolve(x)){y0("No editor available",`No editor can open: ${q}`);return}O0(q)},[n,O0,y0]),f=b(()=>{let O=b_;if(O)p0(O)},[b_,p0]),o=b((O)=>{if(!O)return;U((q)=>q.includes(O)?q:[...q,O])},[]),$_=b(async(O)=>{let q=(x)=>{x.scrollIntoView({behavior:"smooth",block:"center"}),x.classList.add("post-highlight"),setTimeout(()=>x.classList.remove("post-highlight"),2000)},M=document.getElementById("post-"+O);if(M){q(M);return}try{let m=(await W3(O))?.thread?.[0];if(!m)return;l_((S)=>{if(!S)return[m];if(S.some((i)=>i.id===m.id))return S;return[...S,m]}),requestAnimationFrame(()=>{setTimeout(()=>{let S=document.getElementById("post-"+O);if(S)q(S)},50)})}catch(x){console.error("[scrollToMessage] Failed to fetch message",O,x)}},[]),H_=b((O)=>{U((q)=>q.filter((M)=>M!==O))},[]),A_=b(()=>{U([])},[]),O_=b((O={})=>{let q=Date.now();if(q_.current=q,O.running)F_.current=!0;if(O.clearSilence)K_.current=0},[]),p_=b(()=>{if(e_.current)clearTimeout(e_.current),e_.current=null;C0.current=0},[]);c(()=>()=>{p_()},[p_]);let G0=b(()=>{p_(),P((O)=>{if(!O)return O;if(!(O.last_activity||O.lastActivity))return O;let{last_activity:q,lastActivity:M,...x}=O;return x})},[p_]),S0=b((O)=>{if(!O)return;p_();let q=Date.now();C0.current=q,P({type:O.type||"active",last_activity:!0}),e_.current=setTimeout(()=>{if(C0.current!==q)return;P((M)=>{if(!M||!(M.last_activity||M.lastActivity))return M;return null})},S4)},[p_]),w_=b(()=>{F_.current=!1,q_.current=null,K_.current=0,J_.current="",Z_.current="",S_.current=null,i_.current=null,g.current=null,G_.current=null,p_(),e(null),a(null),Q_.current=!1,j_.current=!1},[p_,e,a]),P_=b((O)=>{if(!O)return;if(g.current===O)return;g.current=O,e(O),G_.current=null,a(null),J_.current="",Z_.current="",H({text:"",totalLines:0}),T(""),R({text:"",totalLines:0}),s(null),S_.current=null,i_.current=null,Q_.current=!1,j_.current=!1},[e,a]),L0=b((O)=>{if(typeof document<"u"){let I_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&I_)return}let q=i_.current;if(!q||!q.post)return;if(O&&q.turnId&&q.turnId!==O)return;let M=q.post;if(M.id&&g_.current===M.id)return;let x=String(M?.data?.content||"").trim();if(!x)return;g_.current=M.id||g_.current,i_.current=null;let m=x.replace(/\s+/g," ").slice(0,200),S=P0.current||{},W_=(M?.data?.agent_id?S[M.data.agent_id]:null)?.name||"Pi";w0(W_,m)},[w0]),K2=b(async(O,q)=>{if(O!=="thought"&&O!=="draft")return;let M=g.current;if(O==="thought"){if(Q_.current=q,M)try{await u4(M,"thought",q)}catch(x){console.warn("Failed to update thought visibility:",x)}if(!q)return;try{let x=M?await R4(M,"thought"):null;if(x?.text)Z_.current=x.text;R((m)=>({...m||{text:"",totalLines:0},fullText:Z_.current||m?.fullText||"",totalLines:Number.isFinite(x?.total_lines)?x.total_lines:m?.totalLines||0}))}catch(x){console.warn("Failed to fetch full thought:",x)}return}if(j_.current=q,M)try{await u4(M,"draft",q)}catch(x){console.warn("Failed to update draft visibility:",x)}if(!q)return;try{let x=M?await R4(M,"draft"):null;if(x?.text)J_.current=x.text;H((m)=>({...m||{text:"",totalLines:0},fullText:J_.current||m?.fullText||"",totalLines:Number.isFinite(x?.total_lines)?x.total_lines:m?.totalLines||0}))}catch(x){console.warn("Failed to fetch full draft:",x)}},[]),G2=A(null),x0=b(()=>{if(U0.current)U0.current.scrollTop=0},[]);G2.current=x0;let V2=b((O)=>{let q=U0.current;if(!q||typeof O!=="function"){O?.();return}let{currentHashtag:M,searchQuery:x}=N0.current||{},m=!(x&&!M),S=m?q.scrollHeight-q.scrollTop:q.scrollTop;O(),requestAnimationFrame(()=>{let i=U0.current;if(!i)return;if(m){let W_=Math.max(i.scrollHeight-S,0);i.scrollTop=W_}else{let W_=Math.max(i.scrollHeight-i.clientHeight,0),I_=Math.min(S,W_);i.scrollTop=I_}})},[]),i0=b((O)=>{let q=U0.current;if(!q||typeof O!=="function"){O?.();return}let M=q.scrollTop;O(),requestAnimationFrame(()=>{let x=U0.current;if(!x)return;let m=Math.max(x.scrollHeight-x.clientHeight,0);x.scrollTop=Math.min(M,m)})},[]),{posts:m0,setPosts:l_,hasMore:o2,setHasMore:n2,hasMoreRef:U2,loadPosts:k0,refreshTimeline:A0,loadMore:d0,loadMoreRef:F2}=A4({preserveTimelineScroll:V2,preserveTimelineScrollTop:i0}),r0=b(()=>{let O=B_.current;if(!O)return;l_((q)=>q?q.filter((M)=>M.id!==O):q),B_.current=null},[l_]),{handleSplitterMouseDown:d2,handleSplitterTouchStart:s0,handleEditorSplitterMouseDown:r2,handleEditorSplitterTouchStart:s2,handleDockSplitterMouseDown:a2,handleDockSplitterTouchStart:t2}=M4({appShellRef:T_,sidebarWidthRef:B0,editorWidthRef:K0,dockHeightRef:m_}),a0=b(()=>{if(!F_.current)return;F_.current=!1,K_.current=0,q_.current=null,g.current=null,e(null),Q_.current=!1,j_.current=!1;let O=(J_.current||"").trim();if(J_.current="",Z_.current="",H({text:"",totalLines:0}),T(""),R({text:"",totalLines:0}),s(null),S_.current=null,i_.current=null,!O){P({type:"error",title:"Response stalled — No content received"});return}let M=`${O}${`

⚠️ Response may be incomplete — the model stopped responding`}`,x=Date.now(),m=new Date().toISOString(),S={id:x,timestamp:m,data:{type:"agent_response",content:M,agent_id:"default",is_local_stall:!0}};B_.current=x,l_((i)=>i?H2([...i,S]):[S]),G2.current?.(),P(null)},[e]);c(()=>{N0.current={currentHashtag:J,searchQuery:X}},[J,X]),c(()=>{let O=Math.min(1000,Math.max(100,Math.floor(I1/2))),q=setInterval(()=>{if(!F_.current)return;if(S_.current)return;let M=q_.current;if(!M)return;let x=Date.now(),m=x-M;if(m>=b4){a0();return}if(m>=I1){if(x-K_.current>=I4){let S=Math.floor(m/1000);P({type:"waiting",title:`Waiting for model… No events for ${S}s`}),K_.current=x}}},O);return()=>clearInterval(q)},[a0]);let W2=b(async()=>{try{let O=await S1();if(O)M_(O)}catch(O){console.warn("Failed to fetch agent context:",O)}},[]),j=b(async()=>{try{let O=await m4("web:default");if(!O||O.status!=="active"||!O.data){if(t_.current){let{currentHashtag:x,searchQuery:m}=N0.current||{};if(!x&&!m)A0()}t_.current=!1,w_(),P(null),H({text:"",totalLines:0}),T(""),R({text:"",totalLines:0}),s(null),S_.current=null;return}t_.current=!0;let q=O.data,M=q.turn_id||q.turnId;if(M)P_(M);if(O_({running:!0,clearSilence:!0}),G0(),P(q),O.thought&&O.thought.text)R((x)=>{if(x&&x.text&&x.text.length>=O.thought.text.length)return x;return Z_.current=O.thought.text,{text:O.thought.text,totalLines:O.thought.totalLines||0}});if(O.draft&&O.draft.text)H((x)=>{if(x&&x.text&&x.text.length>=O.draft.text.length)return x;return J_.current=O.draft.text,{text:O.draft.text,totalLines:O.draft.totalLines||0}})}catch(O){console.warn("Failed to fetch agent status:",O)}},[w_,G0,O_,A0,P_]),B=b((O)=>{if($(O),O!=="connected"){P(null),H({text:"",totalLines:0}),T(""),R({text:"",totalLines:0}),s(null),S_.current=null,w_();return}if(!j0.current){j0.current=!0,j();return}let{currentHashtag:q,searchQuery:M}=N0.current;if(!q&&!M)A0();j()},[w_,A0,j]),y=b(async(O)=>{Y(O),l_(null),await k0(O)},[k0]),C=b(async()=>{Y(null),Z(null),l_(null),await k0()},[k0]),u=b(async(O)=>{if(!O||!O.trim())return;Z(O.trim()),Y(null),l_(null);try{let q=await h8(O.trim());l_(q.results),n2(!1)}catch(q){console.error("Failed to search:",q),l_([])}},[]),p=b(()=>{V(!0),Z(null),Y(null),l_([])},[]),t=b(()=>{V(!1),Z(null),k0()},[k0]),__=b(()=>{},[]),d=b(async(O)=>{if(!O)return;let q=O.id,M=m0?.filter((m)=>m?.data?.thread_id===q&&m?.id!==q).length||0;if(M>0){if(!window.confirm(`Delete this message and its ${M} replies?`))return}let x=(m)=>{if(!m.length)return;D_((i)=>{let W_=new Set(i);return m.forEach((I_)=>W_.add(I_)),W_}),setTimeout(()=>{if(i0(()=>{l_((i)=>i?i.filter((W_)=>!m.includes(W_.id)):i)}),D_((i)=>{let W_=new Set(i);return m.forEach((I_)=>W_.delete(I_)),W_}),U2.current)F2.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let m=await v4(q,M>0);if(m?.ids?.length)x(m.ids)}catch(m){let S=m?.message||"";if(M===0&&S.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let W_=await v4(q,!0);if(W_?.ids?.length)x(W_.ids);return}console.error("Failed to delete post:",m),alert(`Failed to delete message: ${S}`)}},[m0,i0]),Y_=b(async()=>{try{let O=await i8();V_(x4(O));let q=O?.user||{};h_((x)=>{let m=typeof q.name==="string"&&q.name.trim()?q.name.trim():"You",S=typeof q.avatar_url==="string"?q.avatar_url.trim():null,i=typeof q.avatar_background==="string"&&q.avatar_background.trim()?q.avatar_background.trim():null;if(x.name===m&&x.avatar_url===S&&x.avatar_background===i)return x;return{name:m,avatar_url:S,avatar_background:i}});let M=(O?.agents||[]).find((x)=>x.id==="default");if(M?.model)x_(M.model);u0(M?.name,M?.avatar_url)}catch(O){console.warn("Failed to load agents:",O)}try{let O=await S1();if(O)M_(O)}catch{}},[u0]);c(()=>{Y_();let O=Z2("sidebarWidth",null),q=Number.isFinite(O)?Math.min(Math.max(O,160),600):280;if(B0.current=q,T_.current)T_.current.style.setProperty("--sidebar-width",`${q}px`)},[Y_]);let V0=b((O)=>{if(!O||typeof O!=="object")return;let q=O.agent_id;if(!q)return;let{agent_name:M,agent_avatar:x}=O;if(!M&&x===void 0)return;let m=P0.current?.[q]||{id:q},S=m.name||null,i=m.avatar_url??m.avatarUrl??m.avatar??null,W_=!1,I_=!1;if(M&&M!==m.name)S=M,I_=!0;if(x!==void 0){let e0=typeof x==="string"?x.trim():null,x1=typeof i==="string"?i.trim():null,_2=e0||null;if(_2!==(x1||null))i=_2,W_=!0}if(!I_&&!W_)return;if(V_((e0)=>{let _2={...e0[q]||{id:q}};if(I_)_2.name=S;if(W_)_2.avatar_url=i;return{...e0,[q]:_2}}),q==="default")u0(S,i,W_?Date.now():null)},[u0]),s_=b((O)=>{if(!O||typeof O!=="object")return;let q=O.user_name??O.userName,M=O.user_avatar??O.userAvatar,x=O.user_avatar_background??O.userAvatarBackground;if(q===void 0&&M===void 0&&x===void 0)return;h_((m)=>{let S=typeof q==="string"&&q.trim()?q.trim():m.name||"You",i=M===void 0?m.avatar_url:typeof M==="string"&&M.trim()?M.trim():null,W_=x===void 0?m.avatar_background:typeof x==="string"&&x.trim()?x.trim():null;if(m.name===S&&m.avatar_url===i&&m.avatar_background===W_)return m;return{name:S,avatar_url:i,avatar_background:W_}})},[]),e2=b((O)=>{if(!O||typeof O!=="object")return;let q=O.model??O.current;if(q!==void 0)x_(q);if(O.thinking_level!==void 0)E_(O.thinking_level??null);if(O.supports_thinking!==void 0)z_(Boolean(O.supports_thinking));if(O.provider_usage!==void 0)a_(O.provider_usage??null)},[]),O2=b(()=>{l8().then((O)=>{if(O)e2(O)}).catch(()=>{})},[e2]);c(()=>{O2();let O=setInterval(()=>{O2()},60000);return()=>clearInterval(O)},[O2]);let _1=b((O,q)=>{let M=q?.turn_id;if(V0(q),s_(q),O==="ui_theme"){v3(q);return}if(O?.startsWith("agent_"))G0();if(O==="connected"){P(null),H({text:"",totalLines:0}),T(""),R({text:"",totalLines:0}),s(null),S_.current=null,w_(),m4("web:default").then((S)=>{if(!S||S.status!=="active"||!S.data)return;let i=S.data,W_=i.turn_id||i.turnId;if(W_)P_(W_);if(O_({clearSilence:!0}),S0(i),S.thought&&S.thought.text)Z_.current=S.thought.text,R({text:S.thought.text,totalLines:S.thought.totalLines||0});if(S.draft&&S.draft.text)J_.current=S.draft.text,H({text:S.draft.text,totalLines:S.draft.totalLines||0})}).catch((S)=>{console.warn("Failed to fetch agent status:",S)}),O2();return}if(O==="agent_status"){if(q.type==="done"||q.type==="error"){if(M&&g.current&&M!==g.current)return;if(q.type==="done"){L0(M||g.current);let{currentHashtag:S,searchQuery:i}=N0.current||{};if(!S&&!i)A0();if(q.context_usage)M_(q.context_usage)}if(t_.current=!1,w_(),H({text:"",totalLines:0}),T(""),R({text:"",totalLines:0}),s(null),q.type==="error")P({type:"error",title:q.title||"Agent error"}),setTimeout(()=>P(null),8000);else P(null)}else{if(M)P_(M);if(O_({running:!0,clearSilence:!0}),q.type==="thinking")J_.current="",Z_.current="",H({text:"",totalLines:0}),T(""),R({text:"",totalLines:0});P(q)}return}if(O==="agent_steer_queued"){if(M&&g.current&&M!==g.current)return;let S=M||g.current;if(!S)return;G_.current=S,a(S);return}if(O==="agent_draft_delta"){if(M&&g.current&&M!==g.current)return;if(M&&!g.current)P_(M);if(O_({running:!0,clearSilence:!0}),q?.reset)J_.current="";if(q?.delta)J_.current+=q.delta;if(j_.current){let S=J_.current;H((i)=>({text:i?.text||"",totalLines:l2(S),fullText:S}))}else{let S=J_.current,i=l2(S);H({text:S,totalLines:i})}return}if(O==="agent_draft"){if(M&&g.current&&M!==g.current)return;if(M&&!g.current)P_(M);O_({running:!0,clearSilence:!0});let S=q.text||"",i=q.mode||(q.kind==="plan"?"replace":"append"),W_=Number.isFinite(q.total_lines)?q.total_lines:S?S.replace(/\r\n/g,`
`).split(`
`).length:0;if(q.kind==="plan")if(i==="replace")T(S);else T((I_)=>(I_||"")+S);else if(!j_.current)J_.current=S,H({text:S,totalLines:W_});return}if(O==="agent_thought_delta"){if(M&&g.current&&M!==g.current)return;if(M&&!g.current)P_(M);if(O_({running:!0,clearSilence:!0}),q?.reset)Z_.current="";if(typeof q?.delta==="string")Z_.current+=q.delta;if(Q_.current){let S=Z_.current;R((i)=>({text:i?.text||"",totalLines:l2(S),fullText:S}))}return}if(O==="agent_thought"){if(M&&g.current&&M!==g.current)return;if(M&&!g.current)P_(M);O_({running:!0,clearSilence:!0});let S=q.text||"",i=Number.isFinite(q.total_lines)?q.total_lines:S?S.replace(/\r\n/g,`
`).split(`
`).length:0;if(!Q_.current)Z_.current=S,R({text:S,totalLines:i});return}if(O==="agent_request"){if(console.log("Agent request:",q),M&&g.current&&M!==g.current)return;if(M)P_(M);O_({running:!0,clearSilence:!0}),s(q),S_.current=q;return}if(O==="agent_request_timeout"){if(console.log("Agent request timeout:",q),M&&g.current&&M!==g.current)return;s(null),S_.current=null,w_(),P({type:"error",title:"Permission request timed out"});return}if(O==="model_changed"){if(q?.model!==void 0)x_(q.model);if(q?.thinking_level!==void 0)E_(q.thinking_level??null);if(q?.supports_thinking!==void 0)z_(Boolean(q.supports_thinking));S1().then((S)=>{if(S)M_(S)}).catch(()=>{});return}if(O==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:q}));return}let{currentHashtag:x,searchQuery:m}=N0.current;if(O==="agent_response")r0(),i_.current={post:q,turnId:g.current};if(!x&&!m&&(O==="new_post"||O==="agent_response"))l_((S)=>{if(!S)return[q];if(S.some((i)=>i.id===q.id))return S;return[...S,q]}),G2.current?.();if(O==="interaction_updated")l_((S)=>S?S.map((i)=>i.id===q.id?q:i):S);if(O==="interaction_deleted"){let S=q?.ids||[];if(S.length){i0(()=>{l_((I_)=>I_?I_.filter((e0)=>!S.includes(e0.id)):I_)});let{currentHashtag:i,searchQuery:W_}=N0.current;if(U2.current&&!i&&!W_)F2.current?.({preserveScroll:!0,preserveMode:"top"})}}},[w_,G0,O_,L0,i0,A0,r0,P_,S0,V0,s_,O2]);c(()=>{if(typeof window>"u")return;let O=window.__PICLAW_TEST_API||{};return O.emit=_1,O.reset=()=>{r0(),w_(),P(null),H({text:"",totalLines:0}),T(""),R({text:"",totalLines:0}),s(null)},O.finalize=()=>a0(),window.__PICLAW_TEST_API=O,()=>{if(window.__PICLAW_TEST_API===O)window.__PICLAW_TEST_API=void 0}},[w_,a0,_1,r0]),y4({handleSseEvent:_1,handleConnectionStatusChange:B,loadPosts:k0}),c(()=>{if(!m0||m0.length===0)return;let O=location.hash;if(!O||!O.startsWith("#msg-"))return;let q=O.slice(5);$_(q),history.replaceState(null,"",location.pathname+location.search)},[m0,$_]);let $1=E!==null;c(()=>{if(_!=="connected")return;let q=setInterval(()=>{if($1)j(),W2();else{let{currentHashtag:M,searchQuery:x}=N0.current||{};if(!M&&!x)A0();j(),W2()}},$1?15000:60000);return()=>clearInterval(q)},[_,$1,j,W2,A0]);let c4=b(()=>{Z0((O)=>!O)},[]);c(()=>{if(!n)return;if(typeof window>"u")return;let O=T_.current;if(!O)return;if(!K0.current){let q=Z2("editorWidth",null),M=B0.current||280;K0.current=Number.isFinite(q)?q:M}if(O.style.setProperty("--editor-width",`${K0.current}px`),!m_.current){let q=Z2("dockHeight",null);m_.current=Number.isFinite(q)?q:200}O.style.setProperty("--dock-height",`${m_.current}px`)},[n]);let t0=_0.getDockPanes().length>0,[J1,p4]=v(!1),L2=b(()=>p4((O)=>!O),[]);c(()=>{if(!t0)return;let O=(q)=>{if(q.ctrlKey&&q.key==="`")q.preventDefault(),L2()};return document.addEventListener("keydown",O),()=>document.removeEventListener("keydown",O)},[L2,t0]);let h4=Boolean(h&&h===(E?.turn_id||l));return N`
        <div class=${`app-shell${c_?"":" workspace-collapsed"}${n?" editor-open":""}`} ref=${T_}>
            <${B4}
                onFileSelect=${p0}
                visible=${c_}
                active=${c_||n}
                onOpenEditor=${O0}
            />
            <button
                class=${`workspace-toggle-tab${c_?" open":" closed"}`}
                onClick=${c4}
                title=${c_?"Hide workspace":"Show workspace"}
                aria-label=${c_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${d2} onTouchStart=${s0}></div>
            ${n&&N`
                <div class="editor-pane-container">
                    <${z4}
                        tabs=${k_}
                        activeId=${b_}
                        onActivate=${M0}
                        onClose=${H0}
                        onCloseOthers=${q0}
                        onCloseAll=${u_}
                        onTogglePin=${E0}
                        onTogglePreview=${Q0}
                        previewTabs=${X0}
                        onToggleDock=${t0?L2:void 0}
                        dockVisible=${t0&&J1}
                    />
                    <div class="editor-pane-host" ref=${R0}></div>
                    ${b_&&X0.has(b_)&&N`
                        <${U4}
                            getContent=${()=>n_.current?.getContent?.()}
                            path=${b_}
                            onClose=${()=>Q0(b_)}
                        />
                    `}
                    ${t0&&J1&&N`<div class="dock-splitter" onMouseDown=${a2} onTouchStart=${t2}></div>`}
                    ${t0&&N`<div class=${`dock-panel${J1?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${L2} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
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
                <div class="editor-splitter" onMouseDown=${r2} onTouchStart=${s2}></div>
            `}
            <div class="container">
                ${X&&T4()&&N`<div class="search-results-spacer"></div>`}
                ${(J||X)&&N`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${C}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${J?`#${J}`:`Search: ${X}`}</span>
                    </div>
                `}
                <${J4}
                    posts=${m0}
                    hasMore=${o2}
                    onLoadMore=${d0}
                    timelineRef=${U0}
                    onHashtagClick=${y}
                    onMessageRef=${o}
                    onScrollToMessage=${$_}
                    onFileRef=${z}
                    onPostClick=${void 0}
                    onDeletePost=${d}
                    emptyMessage=${J?`No posts with #${J}`:X?`No results for "${X}"`:void 0}
                    agents=${C_}
                    user=${D0}
                    reverse=${!(X&&!J)}
                    removingPostIds=${W0}
                    searchQuery=${X}
                />
                <${s3}
                    status=${E}
                    draft=${I}
                    plan=${k}
                    thought=${L}
                    pendingRequest=${r}
                    intent=${D}
                    turnId=${l}
                    steerQueued=${h4}
                    onPanelToggle=${K2}
                />
                <${M3}
                    onPost=${()=>{k0(),x0()}}
                    onFocus=${x0}
                    searchMode=${K}
                    onSearch=${u}
                    onEnterSearch=${p}
                    onExitSearch=${t}
                    fileRefs=${G}
                    onRemoveFileRef=${h0}
                    onClearFileRefs=${n0}
                    messageRefs=${Q}
                    onRemoveMessageRef=${H_}
                    onClearMessageRefs=${A_}
                    activeEditorPath=${b_}
                    onAttachEditorFile=${f}
                    onOpenFilePill=${z}
                    activeModel=${N_}
                    modelUsage=${R_}
                    thinkingLevel=${L_}
                    supportsThinking=${v_}
                    contextUsage=${y_}
                    notificationsEnabled=${$0}
                    notificationPermission=${J0}
                    onToggleNotifications=${Y0}
                    onModelChange=${x_}
                    onModelStateChange=${e2}
                />
                <${t3} status=${_} />
                <${a3}
                    request=${r}
                    onRespond=${()=>{s(null),S_.current=null}}
                />
            </div>
        </div>
    `}X3(N`<${n8} />`,document.getElementById("app"));

//# debugId=77C40181161208DD64756E2164756E21
//# sourceMappingURL=app.bundle.js.map

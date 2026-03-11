var T4=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,J)=>(typeof require<"u"?require:$)[J]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var U2,X_,g1,$2,c1,w1,f4,B2={},p1=[],v4=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function m0(_,$){for(var J in $)_[J]=$[J];return _}function h1(_){var $=_.parentNode;$&&$.removeChild(_)}function i1(_,$,J){var Y,X,Z,j={};for(Z in $)Z=="key"?Y=$[Z]:Z=="ref"?X=$[Z]:j[Z]=$[Z];if(arguments.length>2&&(j.children=arguments.length>3?U2.call(arguments,2):J),typeof _=="function"&&_.defaultProps!=null)for(Z in _.defaultProps)j[Z]===void 0&&(j[Z]=_.defaultProps[Z]);return O2(_,j,Y,X,null)}function O2(_,$,J,Y,X){var Z={type:_,props:$,key:J,ref:Y,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:X==null?++g1:X};return X_.vnode!=null&&X_.vnode(Z),Z}function H2(_){return _.children}function q2(_,$){this.props=_,this.context=$}function n0(_,$){if($==null)return _.__?n0(_.__,_.__.__k.indexOf(_)+1):null;for(var J;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null)return J.__e;return typeof _.type=="function"?n0(_):null}function l1(_){var $,J;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,$=0;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null){_.__e=_.__c.base=J.__e;break}return l1(_)}}function M1(_){(!_.__d&&(_.__d=!0)&&$2.push(_)&&!z2.__r++||w1!==X_.debounceRendering)&&((w1=X_.debounceRendering)||c1)(z2)}function z2(){for(var _;z2.__r=$2.length;)_=$2.sort(function($,J){return $.__v.__b-J.__v.__b}),$2=[],_.some(function($){var J,Y,X,Z,j,G;$.__d&&(j=(Z=(J=$).__v).__e,(G=J.__P)&&(Y=[],(X=m0({},Z)).__v=Z.__v+1,a2(G,Z,X,J.__n,G.ownerSVGElement!==void 0,Z.__h!=null?[j]:null,Y,j==null?n0(Z):j,Z.__h),r1(Y,Z),Z.__e!=j&&l1(Z)))})}function o1(_,$,J,Y,X,Z,j,G,V,W){var Q,U,H,E,F,w,b,z=Y&&Y.__k||p1,k=z.length;for(J.__k=[],Q=0;Q<$.length;Q++)if((E=J.__k[Q]=(E=$[Q])==null||typeof E=="boolean"?null:typeof E=="string"||typeof E=="number"||typeof E=="bigint"?O2(null,E,null,null,E):Array.isArray(E)?O2(H2,{children:E},null,null,null):E.__b>0?O2(E.type,E.props,E.key,null,E.__v):E)!=null){if(E.__=J,E.__b=J.__b+1,(H=z[Q])===null||H&&E.key==H.key&&E.type===H.type)z[Q]=void 0;else for(U=0;U<k;U++){if((H=z[U])&&E.key==H.key&&E.type===H.type){z[U]=void 0;break}H=null}a2(_,E,H=H||B2,X,Z,j,G,V,W),F=E.__e,(U=E.ref)&&H.ref!=U&&(b||(b=[]),H.ref&&b.push(H.ref,null,E),b.push(U,E.__c||F,E)),F!=null?(w==null&&(w=F),typeof E.type=="function"&&E.__k!=null&&E.__k===H.__k?E.__d=V=n1(E,V,_):V=d1(_,E,H,z,F,V),W||J.type!=="option"?typeof J.type=="function"&&(J.__d=V):_.value=""):V&&H.__e==V&&V.parentNode!=_&&(V=n0(H))}for(J.__e=w,Q=k;Q--;)z[Q]!=null&&(typeof J.type=="function"&&z[Q].__e!=null&&z[Q].__e==J.__d&&(J.__d=n0(Y,Q+1)),a1(z[Q],z[Q]));if(b)for(Q=0;Q<b.length;Q++)s1(b[Q],b[++Q],b[++Q])}function n1(_,$,J){var Y,X;for(Y=0;Y<_.__k.length;Y++)(X=_.__k[Y])&&(X.__=_,$=typeof X.type=="function"?n1(X,$,J):d1(J,X,X,_.__k,X.__e,$));return $}function d1(_,$,J,Y,X,Z){var j,G,V;if($.__d!==void 0)j=$.__d,$.__d=void 0;else if(J==null||X!=Z||X.parentNode==null)_:if(Z==null||Z.parentNode!==_)_.appendChild(X),j=null;else{for(G=Z,V=0;(G=G.nextSibling)&&V<Y.length;V+=2)if(G==X)break _;_.insertBefore(X,Z),j=Z}return j!==void 0?j:X.nextSibling}function P1(_,$,J){$[0]==="-"?_.setProperty($,J):_[$]=J==null?"":typeof J!="number"||v4.test($)?J:J+"px"}function W2(_,$,J,Y,X){var Z;_:if($==="style")if(typeof J=="string")_.style.cssText=J;else{if(typeof Y=="string"&&(_.style.cssText=Y=""),Y)for($ in Y)J&&$ in J||P1(_.style,$,"");if(J)for($ in J)Y&&J[$]===Y[$]||P1(_.style,$,J[$])}else if($[0]==="o"&&$[1]==="n")Z=$!==($=$.replace(/Capture$/,"")),$=$.toLowerCase()in _?$.toLowerCase().slice(2):$.slice(2),_.l||(_.l={}),_.l[$+Z]=J,J?Y||_.addEventListener($,Z?I1:b1,Z):_.removeEventListener($,Z?I1:b1,Z);else if($!=="dangerouslySetInnerHTML"){if(X)$=$.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if($!=="href"&&$!=="list"&&$!=="form"&&$!=="tabIndex"&&$!=="download"&&$ in _)try{_[$]=J==null?"":J;break _}catch(j){}typeof J=="function"||(J!=null&&(J!==!1||$[0]==="a"&&$[1]==="r")?_.setAttribute($,J):_.removeAttribute($))}}function b1(_){this.l[_.type+!1](X_.event?X_.event(_):_)}function I1(_){this.l[_.type+!0](X_.event?X_.event(_):_)}function a2(_,$,J,Y,X,Z,j,G,V){var W,Q,U,H,E,F,w,b,z,k,x,D=$.type;if($.constructor!==void 0)return null;J.__h!=null&&(V=J.__h,G=$.__e=J.__e,$.__h=null,Z=[G]),(W=X_.__b)&&W($);try{_:if(typeof D=="function"){if(b=$.props,z=(W=D.contextType)&&Y[W.__c],k=W?z?z.props.value:W.__:Y,J.__c?w=(Q=$.__c=J.__c).__=Q.__E:(("prototype"in D)&&D.prototype.render?$.__c=Q=new D(b,k):($.__c=Q=new q2(b,k),Q.constructor=D,Q.render=u4),z&&z.sub(Q),Q.props=b,Q.state||(Q.state={}),Q.context=k,Q.__n=Y,U=Q.__d=!0,Q.__h=[]),Q.__s==null&&(Q.__s=Q.state),D.getDerivedStateFromProps!=null&&(Q.__s==Q.state&&(Q.__s=m0({},Q.__s)),m0(Q.__s,D.getDerivedStateFromProps(b,Q.__s))),H=Q.props,E=Q.state,U)D.getDerivedStateFromProps==null&&Q.componentWillMount!=null&&Q.componentWillMount(),Q.componentDidMount!=null&&Q.__h.push(Q.componentDidMount);else{if(D.getDerivedStateFromProps==null&&b!==H&&Q.componentWillReceiveProps!=null&&Q.componentWillReceiveProps(b,k),!Q.__e&&Q.shouldComponentUpdate!=null&&Q.shouldComponentUpdate(b,Q.__s,k)===!1||$.__v===J.__v){Q.props=b,Q.state=Q.__s,$.__v!==J.__v&&(Q.__d=!1),Q.__v=$,$.__e=J.__e,$.__k=J.__k,$.__k.forEach(function(f){f&&(f.__=$)}),Q.__h.length&&j.push(Q);break _}Q.componentWillUpdate!=null&&Q.componentWillUpdate(b,Q.__s,k),Q.componentDidUpdate!=null&&Q.__h.push(function(){Q.componentDidUpdate(H,E,F)})}Q.context=k,Q.props=b,Q.state=Q.__s,(W=X_.__r)&&W($),Q.__d=!1,Q.__v=$,Q.__P=_,W=Q.render(Q.props,Q.state,Q.context),Q.state=Q.__s,Q.getChildContext!=null&&(Y=m0(m0({},Y),Q.getChildContext())),U||Q.getSnapshotBeforeUpdate==null||(F=Q.getSnapshotBeforeUpdate(H,E)),x=W!=null&&W.type===H2&&W.key==null?W.props.children:W,o1(_,Array.isArray(x)?x:[x],$,J,Y,X,Z,j,G,V),Q.base=$.__e,$.__h=null,Q.__h.length&&j.push(Q),w&&(Q.__E=Q.__=null),Q.__e=!1}else Z==null&&$.__v===J.__v?($.__k=J.__k,$.__e=J.__e):$.__e=R4(J.__e,$,J,Y,X,Z,j,V);(W=X_.diffed)&&W($)}catch(f){$.__v=null,(V||Z!=null)&&($.__e=G,$.__h=!!V,Z[Z.indexOf(G)]=null),X_.__e(f,$,J)}}function r1(_,$){X_.__c&&X_.__c($,_),_.some(function(J){try{_=J.__h,J.__h=[],_.some(function(Y){Y.call(J)})}catch(Y){X_.__e(Y,J.__v)}})}function R4(_,$,J,Y,X,Z,j,G){var V,W,Q,U=J.props,H=$.props,E=$.type,F=0;if(E==="svg"&&(X=!0),Z!=null){for(;F<Z.length;F++)if((V=Z[F])&&(V===_||(E?V.localName==E:V.nodeType==3))){_=V,Z[F]=null;break}}if(_==null){if(E===null)return document.createTextNode(H);_=X?document.createElementNS("http://www.w3.org/2000/svg",E):document.createElement(E,H.is&&H),Z=null,G=!1}if(E===null)U===H||G&&_.data===H||(_.data=H);else{if(Z=Z&&U2.call(_.childNodes),W=(U=J.props||B2).dangerouslySetInnerHTML,Q=H.dangerouslySetInnerHTML,!G){if(Z!=null)for(U={},F=0;F<_.attributes.length;F++)U[_.attributes[F].name]=_.attributes[F].value;(Q||W)&&(Q&&(W&&Q.__html==W.__html||Q.__html===_.innerHTML)||(_.innerHTML=Q&&Q.__html||""))}if(function(w,b,z,k,x){var D;for(D in z)D==="children"||D==="key"||D in b||W2(w,D,null,z[D],k);for(D in b)x&&typeof b[D]!="function"||D==="children"||D==="key"||D==="value"||D==="checked"||z[D]===b[D]||W2(w,D,b[D],z[D],k)}(_,H,U,X,G),Q)$.__k=[];else if(F=$.props.children,o1(_,Array.isArray(F)?F:[F],$,J,Y,X&&E!=="foreignObject",Z,j,Z?Z[0]:J.__k&&n0(J,0),G),Z!=null)for(F=Z.length;F--;)Z[F]!=null&&h1(Z[F]);G||(("value"in H)&&(F=H.value)!==void 0&&(F!==_.value||E==="progress"&&!F)&&W2(_,"value",F,U.value,!1),("checked"in H)&&(F=H.checked)!==void 0&&F!==_.checked&&W2(_,"checked",F,U.checked,!1))}return _}function s1(_,$,J){try{typeof _=="function"?_($):_.current=$}catch(Y){X_.__e(Y,J)}}function a1(_,$,J){var Y,X;if(X_.unmount&&X_.unmount(_),(Y=_.ref)&&(Y.current&&Y.current!==_.__e||s1(Y,null,$)),(Y=_.__c)!=null){if(Y.componentWillUnmount)try{Y.componentWillUnmount()}catch(Z){X_.__e(Z,$)}Y.base=Y.__P=null}if(Y=_.__k)for(X=0;X<Y.length;X++)Y[X]&&a1(Y[X],$,typeof _.type!="function");J||_.__e==null||h1(_.__e),_.__e=_.__d=void 0}function u4(_,$,J){return this.constructor(_,J)}function t1(_,$,J){var Y,X,Z;X_.__&&X_.__(_,$),X=(Y=typeof J=="function")?null:J&&J.__k||$.__k,Z=[],a2($,_=(!Y&&J||$).__k=i1(H2,null,[_]),X||B2,B2,$.ownerSVGElement!==void 0,!Y&&J?[J]:X?null:$.firstChild?U2.call($.childNodes):null,Z,!Y&&J?J:X?X.__e:$.firstChild,Y),r1(Z,_)}U2=p1.slice,X_={__e:function(_,$){for(var J,Y,X;$=$.__;)if((J=$.__c)&&!J.__)try{if((Y=J.constructor)&&Y.getDerivedStateFromError!=null&&(J.setState(Y.getDerivedStateFromError(_)),X=J.__d),J.componentDidCatch!=null&&(J.componentDidCatch(_),X=J.__d),X)return J.__E=J}catch(Z){_=Z}throw _}},g1=0,q2.prototype.setState=function(_,$){var J;J=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=m0({},this.state),typeof _=="function"&&(_=_(m0({},J),this.props)),_&&m0(J,_),_!=null&&this.__v&&($&&this.__h.push($),M1(this))},q2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),M1(this))},q2.prototype.render=H2,$2=[],c1=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,z2.__r=0,f4=0;var F2,O0,S1,J2=0,r2=[],x1=X_.__b,T1=X_.__r,f1=X_.diffed,v1=X_.__c,R1=X_.unmount;function t2(_,$){X_.__h&&X_.__h(O0,_,J2||$),J2=0;var J=O0.__H||(O0.__H={__:[],__h:[]});return _>=J.__.length&&J.__.push({}),J.__[_]}function T(_){return J2=1,m4(_3,_)}function m4(_,$,J){var Y=t2(F2++,2);return Y.t=_,Y.__c||(Y.__=[J?J($):_3(void 0,$),function(X){var Z=Y.t(Y.__[0],X);Y.__[0]!==Z&&(Y.__=[Z,Y.__[1]],Y.__c.setState({}))}],Y.__c=O0),Y.__}function g(_,$){var J=t2(F2++,3);!X_.__s&&e1(J.__H,$)&&(J.__=_,J.__H=$,O0.__H.__h.push(J))}function A(_){return J2=5,I0(function(){return{current:_}},[])}function I0(_,$){var J=t2(F2++,7);return e1(J.__H,$)&&(J.__=_(),J.__H=$,J.__h=_),J.__}function I(_,$){return J2=8,I0(function(){return _},$)}function g4(){r2.forEach(function(_){if(_.__P)try{_.__H.__h.forEach(N2),_.__H.__h.forEach(s2),_.__H.__h=[]}catch($){_.__H.__h=[],X_.__e($,_.__v)}}),r2=[]}X_.__b=function(_){O0=null,x1&&x1(_)},X_.__r=function(_){T1&&T1(_),F2=0;var $=(O0=_.__c).__H;$&&($.__h.forEach(N2),$.__h.forEach(s2),$.__h=[])},X_.diffed=function(_){f1&&f1(_);var $=_.__c;$&&$.__H&&$.__H.__h.length&&(r2.push($)!==1&&S1===X_.requestAnimationFrame||((S1=X_.requestAnimationFrame)||function(J){var Y,X=function(){clearTimeout(Z),u1&&cancelAnimationFrame(Y),setTimeout(J)},Z=setTimeout(X,100);u1&&(Y=requestAnimationFrame(X))})(g4)),O0=void 0},X_.__c=function(_,$){$.some(function(J){try{J.__h.forEach(N2),J.__h=J.__h.filter(function(Y){return!Y.__||s2(Y)})}catch(Y){$.some(function(X){X.__h&&(X.__h=[])}),$=[],X_.__e(Y,J.__v)}}),v1&&v1(_,$)},X_.unmount=function(_){R1&&R1(_);var $=_.__c;if($&&$.__H)try{$.__H.__.forEach(N2)}catch(J){X_.__e(J,$.__v)}};var u1=typeof requestAnimationFrame=="function";function N2(_){var $=O0;typeof _.__c=="function"&&_.__c(),O0=$}function s2(_){var $=O0;_.__c=_.__(),O0=$}function e1(_,$){return!_||_.length!==$.length||$.some(function(J,Y){return J!==_[Y]})}function _3(_,$){return typeof $=="function"?$(_):$}var $3=function(_,$,J,Y){var X;$[0]=0;for(var Z=1;Z<$.length;Z++){var j=$[Z++],G=$[Z]?($[0]|=j?1:2,J[$[Z++]]):$[++Z];j===3?Y[0]=G:j===4?Y[1]=Object.assign(Y[1]||{},G):j===5?(Y[1]=Y[1]||{})[$[++Z]]=G:j===6?Y[1][$[++Z]]+=G+"":j?(X=_.apply(G,$3(_,G,J,["",null])),Y.push(X),G[0]?$[0]|=2:($[Z-2]=0,$[Z]=X)):Y.push(G)}return Y},m1=new Map,q=function(_){var $=m1.get(this);return $||($=new Map,m1.set(this,$)),($=$3(this,$.get(_)||($.set(_,$=function(J){for(var Y,X,Z=1,j="",G="",V=[0],W=function(H){Z===1&&(H||(j=j.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?V.push(0,H,j):Z===3&&(H||j)?(V.push(3,H,j),Z=2):Z===2&&j==="..."&&H?V.push(4,H,0):Z===2&&j&&!H?V.push(5,0,!0,j):Z>=5&&((j||!H&&Z===5)&&(V.push(Z,0,j,X),Z=6),H&&(V.push(Z,H,0,X),Z=6)),j=""},Q=0;Q<J.length;Q++){Q&&(Z===1&&W(),W(Q));for(var U=0;U<J[Q].length;U++)Y=J[Q][U],Z===1?Y==="<"?(W(),V=[V],Z=3):j+=Y:Z===4?j==="--"&&Y===">"?(Z=1,j=""):j=Y+j[0]:G?Y===G?G="":j+=Y:Y==='"'||Y==="'"?G=Y:Y===">"?(W(),Z=1):Z&&(Y==="="?(Z=5,X=j,j=""):Y==="/"&&(Z<5||J[Q][U+1]===">")?(W(),Z===3&&(V=V[0]),Z=V,(V=V[0]).push(2,0,Z),Z=0):Y===" "||Y==="\t"||Y===`
`||Y==="\r"?(W(),Z=2):j+=Y),Z===3&&j==="!--"&&(Z=4,V=V[0])}return W(),V}(_)),$),arguments,[])).length>1?$:$[0]}.bind(i1);async function o_(_,$={}){let J=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!J.ok){let Y=await J.json().catch(()=>({error:"Unknown error"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function L2(_=10,$=null){let J=`/timeline?limit=${_}`;if($)J+=`&before=${$}`;return o_(J)}async function J3(_,$=50,J=0){return o_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${J}`)}async function Y3(_,$=50,J=0){return o_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${J}`)}async function Z3(_,$=!1){let J=`/post/${_}?cascade=${$?"true":"false"}`;return o_(J,{method:"DELETE"})}async function e2(_,$,J=null,Y=[]){return o_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:J,media_ids:Y})})}async function X3(){return o_("/agents")}async function Q3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/status${$}`)}async function _1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/context${$}`)}async function Y2(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/models${$}`)}async function j3(_){let $=new FormData;$.append("file",_);let J=await fetch("/media/upload",{method:"POST",body:$});if(!J.ok){let Y=await J.json().catch(()=>({error:"Upload failed"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function $1(_,$){let J=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Failed to respond"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function K3(_,$){let J=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function G3(_,$="thought"){let J=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return o_(J)}async function V3(_,$,J){return o_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(J)})})}function Z2(_){return`/media/${_}`}function W3(_){return`/media/${_}/thumbnail`}async function E2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function D2(_="",$=2,J=!1){let Y=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${J?"1":"0"}`;return o_(Y)}async function O3(_,$=20000,J=null){let Y=J?`&mode=${encodeURIComponent(J)}`:"",X=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${Y}`;return o_(X)}async function q3(_){return o_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function J1(_,$="",J={}){let Y=new FormData;Y.append("file",_);let X=new URLSearchParams;if($)X.set("path",$);if(J.overwrite)X.set("overwrite","1");let Z=X.toString(),j=Z?`/workspace/upload?${Z}`:"/workspace/upload",G=await fetch(""+j,{method:"POST",body:Y});if(!G.ok){let V=await G.json().catch(()=>({error:"Upload failed"})),W=Error(V.error||`HTTP ${G.status}`);throw W.status=G.status,W.code=V.code,W}return G.json()}async function N3(_,$,J=""){let Y=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:J})});if(!Y.ok){let X=await Y.json().catch(()=>({error:"Create failed"})),Z=Error(X.error||`HTTP ${Y.status}`);throw Z.status=Y.status,Z.code=X.code,Z}return Y.json()}async function B3(_,$){let J=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Rename failed"})),X=Error(Y.error||`HTTP ${J.status}`);throw X.status=J.status,X.code=Y.code,X}return J.json()}async function z3(_,$){let J=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Move failed"})),X=Error(Y.error||`HTTP ${J.status}`);throw X.status=J.status,X.code=Y.code,X}return J.json()}async function U3(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return o_($,{method:"DELETE"})}async function C2(_,$=!1){return o_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function Y1(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function H3(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class Z1{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,J=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,J+$),this.reconnectAttempts=0;let Y=Math.max(this.cooldownUntil-J,0),X=Math.max(this.reconnectDelay,Y);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},X),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function p0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function P_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function d0(_,$=!1){let J=p0(_);if(J===null)return $;return J==="true"}function r0(_,$=null){let J=p0(_);if(J===null)return $;let Y=parseInt(J,10);return Number.isFinite(Y)?Y:$}function g0({prefix:_="file",label:$,title:J,onRemove:Y,onClick:X,removeTitle:Z="Remove",icon:j="file"}){let G=`${_}-file-pill`,V=`${_}-file-name`,W=`${_}-file-remove`,Q=j==="message"?q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return q`
    <span class=${G} title=${J||$} onClick=${X}>
      ${Q}
      <span class=${V}>${$}</span>
      ${Y&&q`
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
  `}var p4=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function h4({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),J=_.tokens,Y=_.contextWindow,X=J!=null?`Context: ${F3(J)} / ${F3(Y)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,Z=7,j=2*Math.PI*7,G=$/100*j,V=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return q`
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
    `}function F3(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function L3({onPost:_,onFocus:$,searchMode:J,onSearch:Y,onEnterSearch:X,onExitSearch:Z,fileRefs:j=[],onRemoveFileRef:G,onClearFileRefs:V,messageRefs:W=[],onRemoveMessageRef:Q,onClearMessageRefs:U,activeModel:H=null,thinkingLevel:E=null,supportsThinking:F=!1,contextUsage:w=null,notificationsEnabled:b=!1,notificationPermission:z="default",onToggleNotifications:k,onModelChange:x,onModelStateChange:D,activeEditorPath:f=null,onAttachEditorFile:m}){let[p,o]=T(""),[Y_,d]=T(""),[__,z_]=T(!1),[e,G_]=T([]),[H_,y_]=T(!1),[$_,t]=T([]),[V_,J_]=T(0),[O_,K_]=T(!1),[A_,B_]=T(!1),[D_,b_]=T(!1),[q_,T_]=T([]),[C_,F_]=T(!1),M_=A(null),N0=A(null),m_=A(null),k_=A(null),l_=A(0),y0=200,c_=(L)=>{let S=new Set,r=[];for(let Q_ of L||[]){if(typeof Q_!=="string")continue;let j_=Q_.trim();if(!j_||S.has(j_))continue;S.add(j_),r.push(j_)}return r},j0=()=>{let L=p0("piclaw_compose_history");if(!L)return[];try{let S=JSON.parse(L);if(!Array.isArray(S))return[];return c_(S)}catch{return[]}},K0=(L)=>{P_("piclaw_compose_history",JSON.stringify(L))},N_=A(j0()),M=A(-1),n=A(""),I_=!__&&(p.trim()||e.length>0||j.length>0||W.length>0),e_=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),_0=typeof window<"u"&&typeof Notification<"u",x0=typeof window<"u"?Boolean(window.isSecureContext):!1,H0=_0&&x0&&z!=="denied",n_=z==="granted"&&b,F0=n_?"Disable notifications":"Enable notifications",G0=F&&E?` (${E})`:"",V0=H?`${H}${G0}`:"",S_=(L)=>{if(!L||typeof L!=="object")return;let S=L.model??L.current;if(typeof D==="function")D({model:S??null,thinking_level:L.thinking_level??null,supports_thinking:L.supports_thinking});if(S&&typeof x==="function")x(S)},d_=(L)=>{let S=L||M_.current;if(!S)return;S.style.height="auto",S.style.height=`${S.scrollHeight}px`,S.style.overflowY="hidden"},T0=(L)=>{if(!L.startsWith("/")||L.includes(`
`)){K_(!1),t([]);return}let S=L.toLowerCase().split(" ")[0];if(S.length<1){K_(!1),t([]);return}let r=p4.filter((Q_)=>Q_.name.startsWith(S)||Q_.name.replace(/-/g,"").startsWith(S.replace(/-/g,"")));if(r.length>0&&!(r.length===1&&r[0].name===S))t(r),J_(0),K_(!0);else K_(!1),t([])},L0=(L)=>{let S=p,r=S.indexOf(" "),Q_=r>=0?S.slice(r):"",j_=L.name+Q_;o(j_),K_(!1),t([]),requestAnimationFrame(()=>{let L_=M_.current;if(!L_)return;let E_=j_.length;L_.selectionStart=E_,L_.selectionEnd=E_,L_.focus()})},B0=(L)=>{if(J)d(L);else o(L),T0(L);requestAnimationFrame(()=>d_())},Z0=(L)=>{let S=J?Y_:p,r=S&&!S.endsWith(`
`)?`
`:"",Q_=`${S}${r}${L}`.trimStart();B0(Q_)},k0=(L)=>{let S=L?.command?.model_label;if(S)return S;let r=L?.command?.message;if(typeof r==="string"){let Q_=r.match(/•\s+([^\n]+?)\s+\(current\)/);if(Q_?.[1])return Q_[1].trim()}return null},X0=async(L)=>{if(J||__||A_)return;B_(!0);try{let S=await e2("default",L,null,[]),r=k0(S);return S_({model:r??H??null,thinking_level:S?.command?.thinking_level,supports_thinking:S?.command?.supports_thinking}),_?.(),!0}catch(S){return console.error("Failed to switch model:",S),alert("Failed to switch model: "+S.message),!1}finally{B_(!1)}},p_=async()=>{await X0("/cycle-model")},h_=async(L)=>{if(!L||A_)return;if(await X0(`/model ${L}`))b_(!1)},E0=(L)=>{L.preventDefault(),L.stopPropagation(),b_((S)=>!S)},A0=async(L)=>{let S=typeof L==="string"?L:L&&typeof L?.target?.value==="string"?L.target.value:p,r=typeof S==="string"?S:"";if(!r.trim()&&e.length===0&&j.length===0&&W.length===0)return;z_(!0);try{let Q_=[];for(let $0 of e){let J0=await j3($0);Q_.push(J0.id)}let j_=r.trim(),L_=j.length?`Files:
${j.map(($0)=>`- ${$0}`).join(`
`)}`:"",E_=W.length?`Referenced messages:
${W.map(($0)=>`- message:${$0}`).join(`
`)}`:"",u_=Q_.length?`Images:
${Q_.map(($0,J0)=>{let M0=e[J0]?.name||`image-${J0+1}`;return`- attachment:${$0} (${M0})`}).join(`
`)}`:"",g_=[j_,L_,E_,u_].filter(Boolean).join(`

`),x_=await e2("default",g_,null,Q_);if(x_?.command)S_({model:x_.command.model_label??H??null,thinking_level:x_.command.thinking_level,supports_thinking:x_.command.supports_thinking});if(j_){let $0=N_.current,J0=c_($0.filter((a_)=>a_!==j_));if(J0.push(j_),J0.length>200)J0.splice(0,J0.length-200);N_.current=J0,K0(J0),M.current=-1,n.current=""}o(""),G_([]),V?.(),U?.(),_?.()}catch(Q_){console.error("Failed to post:",Q_),alert("Failed to post: "+Q_.message)}finally{z_(!1)}},f0=(L)=>{if(L.isComposing)return;if(J&&L.key==="Escape"){L.preventDefault(),d(""),Z?.();return}if(O_&&$_.length>0){let S=M_.current?.value??(J?Y_:p);if(!String(S||"").startsWith("/"))K_(!1),t([]);else{if(L.key==="ArrowDown"){L.preventDefault(),J_((r)=>(r+1)%$_.length);return}if(L.key==="ArrowUp"){L.preventDefault(),J_((r)=>(r-1+$_.length)%$_.length);return}if(L.key==="Tab"){L.preventDefault(),L0($_[V_]);return}if(L.key==="Enter"&&!L.shiftKey){if(!(M_.current?.value??(J?Y_:p)).includes(" ")){L.preventDefault();let j_=$_[V_];K_(!1),t([]),A0(j_.name);return}}if(L.key==="Escape"){L.preventDefault(),K_(!1),t([]);return}}}if(!J&&(L.key==="ArrowUp"||L.key==="ArrowDown")&&!L.metaKey&&!L.ctrlKey&&!L.altKey&&!L.shiftKey){let S=M_.current;if(!S)return;let r=S.value||"",Q_=S.selectionStart===0&&S.selectionEnd===0,j_=S.selectionStart===r.length&&S.selectionEnd===r.length;if(L.key==="ArrowUp"&&Q_||L.key==="ArrowDown"&&j_){let L_=N_.current;if(!L_.length)return;L.preventDefault();let E_=M.current;if(L.key==="ArrowUp"){if(E_===-1)n.current=r,E_=L_.length-1;else if(E_>0)E_-=1;M.current=E_,B0(L_[E_]||"")}else{if(E_===-1)return;if(E_<L_.length-1)E_+=1,M.current=E_,B0(L_[E_]||"");else M.current=-1,B0(n.current||""),n.current=""}requestAnimationFrame(()=>{let u_=M_.current;if(!u_)return;let g_=u_.value.length;u_.selectionStart=g_,u_.selectionEnd=g_});return}}if(L.key==="Enter"&&!L.shiftKey){L.preventDefault();let S=M_.current?.value??(J?Y_:p);if(J){if(S.trim())Y?.(S.trim())}else A0(S)}},D0=(L)=>{let S=Array.from(L||[]).filter((r)=>r&&r.type&&r.type.startsWith("image/"));if(!S.length)return;G_((r)=>[...r,...S])},f_=(L)=>{D0(L.target.files),L.target.value=""},r_=(L)=>{if(J)return;L.preventDefault(),L.stopPropagation(),l_.current+=1,y_(!0)},Q0=(L)=>{if(J)return;if(L.preventDefault(),L.stopPropagation(),l_.current=Math.max(0,l_.current-1),l_.current===0)y_(!1)},v_=(L)=>{if(J)return;if(L.preventDefault(),L.stopPropagation(),L.dataTransfer)L.dataTransfer.dropEffect="copy";y_(!0)},R_=(L)=>{if(J)return;L.preventDefault(),L.stopPropagation(),l_.current=0,y_(!1),D0(L.dataTransfer?.files||[])},s_=(L)=>{if(J)return;let S=L.clipboardData?.items;if(!S||!S.length)return;let r=[];for(let Q_ of S){if(Q_.kind!=="file")continue;let j_=Q_.getAsFile?.();if(j_)r.push(j_)}if(r.length>0)L.preventDefault(),D0(r)},z0=(L)=>{G_((S)=>S.filter((r,Q_)=>Q_!==L))},w0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((L)=>{let{latitude:S,longitude:r,accuracy:Q_}=L.coords,j_=`${S.toFixed(5)}, ${r.toFixed(5)}`,L_=Number.isFinite(Q_)?` ±${Math.round(Q_)}m`:"",E_=`https://maps.google.com/?q=${S},${r}`,u_=`Location: ${j_}${L_} ${E_}`;Z0(u_)},(L)=>{let S=L?.message||"Unable to retrieve location.";alert(`Location error: ${S}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};g(()=>{if(!D_)return;F_(!0),Y2().then((L)=>{let S=Array.isArray(L?.models)?L.models.filter((r)=>typeof r==="string"&&r.trim().length>0):[];T_(S),S_(L)}).catch((L)=>{console.warn("Failed to load model list:",L),T_([])}).finally(()=>{F_(!1)})},[D_,H]),g(()=>{if(J)b_(!1)},[J]),g(()=>{if(!D_)return;let L=(S)=>{let r=m_.current,Q_=k_.current,j_=S.target;if(r&&r.contains(j_))return;if(Q_&&Q_.contains(j_))return;b_(!1)};return document.addEventListener("pointerdown",L),()=>document.removeEventListener("pointerdown",L)},[D_]);let v0=(L)=>{let S=L.target.value;d_(L.target),B0(S)};return g(()=>{requestAnimationFrame(()=>d_())},[p,Y_,J]),q`
        <div class="compose-box">
            <div
                class=${`compose-input-wrapper${H_?" drag-active":""}`}
                onDragEnter=${r_}
                onDragOver=${v_}
                onDragLeave=${Q0}
                onDrop=${R_}
            >
                <div class="compose-input-main">
                    ${(j.length>0||e.length>0||W.length>0)&&q`
                        <div class="compose-file-refs">
                            ${W.map((L)=>{return q`
                                    <${g0}
                                        key=${"msg-"+L}
                                        prefix="compose"
                                        label=${"msg:"+L}
                                        title=${"Message reference: "+L}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>Q?.(L)}
                                    />
                                `})}
                            ${j.map((L)=>{let S=L.split("/").pop()||L;return q`
                                    <${g0}
                                        prefix="compose"
                                        label=${S}
                                        title=${L}
                                        removeTitle="Remove file"
                                        onRemove=${()=>G?.(L)}
                                    />
                                `})}
                            ${e.map((L,S)=>{let r=L?.name||`image-${S+1}`;return q`
                                    <${g0}
                                        key=${r+S}
                                        prefix="compose"
                                        label=${r}
                                        title=${r}
                                        removeTitle="Remove image"
                                        onRemove=${()=>z0(S)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${M_}
                        placeholder=${J?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${J?Y_:p}
                        onInput=${v0}
                        onKeyDown=${f0}
                        onPaste=${s_}
                        onFocus=${$}
                        onClick=${$}
                        disabled=${__}
                        rows="1"
                    />
                    ${O_&&$_.length>0&&q`
                        <div class="slash-autocomplete" ref=${N0}>
                            ${$_.map((L,S)=>q`
                                <div
                                    key=${L.name}
                                    class=${`slash-item${S===V_?" active":""}`}
                                    onMouseDown=${(r)=>{r.preventDefault(),L0(L)}}
                                    onMouseEnter=${()=>J_(S)}
                                >
                                    <span class="slash-name">${L.name}</span>
                                    <span class="slash-desc">${L.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${D_&&!J&&q`
                        <div class="compose-model-popup" ref=${m_}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${C_&&q`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!C_&&q_.length===0&&q`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!C_&&q_.map((L)=>q`
                                    <button
                                        key=${L}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${H===L?" active":""}`}
                                        onClick=${()=>{h_(L)}}
                                        disabled=${A_}
                                    >
                                        ${L}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{p_()}}
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
                                title=${A_?"Switching model…":`Current model: ${V0} (tap to open model picker)`}
                                aria-label="Open model picker"
                                onClick=${E0}
                                disabled=${__||A_}
                            >
                                ${A_?"Switching…":V0}
                            </button>
                        </div>
                    `}
                    <div class="compose-actions ${J?"search-mode":""}">
                    ${!J&&w&&w.percent!=null&&q`
                        <${h4} usage=${w} />
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
                    ${e_&&!J&&q`
                        <button
                            class="icon-btn location-btn"
                            onClick=${w0}
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
                    ${H0&&!J&&q`
                        <button
                            class=${`icon-btn notification-btn${n_?" active":""}`}
                            onClick=${k}
                            title=${F0}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!J&&q`
                        ${f&&m&&q`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${m}
                                title=${`Attach open file: ${f}`}
                                type="button"
                                disabled=${__||j.includes(f)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${f_} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{A0()}}
                            disabled=${!I_}
                            title="Send (Ctrl+Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var D3="piclaw_theme",j1="piclaw_tint",A2={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},i4={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},E3={default:{label:"Default",mode:"auto",light:A2,dark:i4},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},l4=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],w2={theme:"default",tint:null},C3="light",X1=!1;function y3(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function s0(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let J=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(J)&&!/^[0-9a-fA-F]{6}$/.test(J))return null;let Y=J.length===3?J.split("").map((Z)=>Z+Z).join(""):J,X=parseInt(Y,16);return{r:X>>16&255,g:X>>8&255,b:X&255,hex:`#${Y.toLowerCase()}`}}function o4(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let J=document.createElement("div");if(J.style.color="",J.style.color=$,!J.style.color)return null;let Y=J.style.color;try{if(document.body)J.style.display="none",document.body.appendChild(J),Y=getComputedStyle(J).color||J.style.color,document.body.removeChild(J)}catch{}let X=Y.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!X)return null;let Z=parseInt(X[1],10),j=parseInt(X[2],10),G=parseInt(X[3],10);if(![Z,j,G].every((W)=>Number.isFinite(W)))return null;let V=`#${[Z,j,G].map((W)=>W.toString(16).padStart(2,"0")).join("")}`;return{r:Z,g:j,b:G,hex:V}}function k3(_){return s0(_)||o4(_)}function X2(_,$,J){let Y=Math.round(_.r+($.r-_.r)*J),X=Math.round(_.g+($.g-_.g)*J),Z=Math.round(_.b+($.b-_.b)*J);return`rgb(${Y} ${X} ${Z})`}function Q1(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function A3(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function K1(_){return E3[_]||E3.default}function n4(_){return _.mode==="auto"?A3():_.mode}function d4(_,$){let J=K1(_);if($==="dark"&&J.dark)return J.dark;if($==="light"&&J.light)return J.light;return J.dark||J.light||A2}function r4(_,$,J){let Y=k3($);if(!Y)return _;let X=s0(_.bgPrimary),Z=s0(_.bgSecondary),j=s0(_.bgHover),G=s0(_.borderColor);if(!X||!Z||!j||!G)return _;let W=s0(J==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:X2(X,Y,0.08),bgSecondary:X2(Z,Y,0.12),bgHover:X2(j,Y,0.16),borderColor:X2(G,Y,0.08),accent:Y.hex,accentHover:W?X2(Y,W,0.18):Y.hex}}function s4(_,$){if(typeof document>"u")return;let J=document.documentElement,Y=_.accent,X=k3(Y),Z=X?Q1(X,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,j=X?Q1(X,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",G=X?Q1(X,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",V={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":Y,"--accent-hover":_.accentHover||Y,"--accent-soft":j,"--accent-soft-strong":G,"--danger-color":_.danger||A2.danger,"--success-color":_.success||A2.success,"--search-highlight-color":Z||"rgba(29, 155, 240, 0.2)"};Object.entries(V).forEach(([W,Q])=>{if(Q)J.style.setProperty(W,Q)})}function a4(){if(typeof document>"u")return;let _=document.documentElement;l4.forEach(($)=>_.style.removeProperty($))}function y2(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function t4(_,$){if(typeof document>"u")return;let J=y2("theme-color");if(J&&_)J.setAttribute("content",_);let Y=y2("msapplication-TileColor");if(Y&&_)Y.setAttribute("content",_);let X=y2("msapplication-navbutton-color");if(X&&_)X.setAttribute("content",_);let Z=y2("apple-mobile-web-app-status-bar-style");if(Z)Z.setAttribute("content",$==="dark"?"black-translucent":"default")}function e4(){if(typeof window>"u")return;let _={...w2,mode:C3};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function G1(_,$={}){if(typeof window>"u"||typeof document>"u")return;let J=y3(_?.theme||"default"),Y=_?.tint?String(_.tint).trim():null,X=K1(J),Z=n4(X),j=d4(J,Z);w2={theme:J,tint:Y},C3=Z;let G=document.documentElement;G.dataset.theme=Z,G.dataset.colorTheme=J,G.dataset.tint=Y?String(Y):"",G.style.colorScheme=Z;let V=j;if(J==="default"&&Y)V=r4(j,Y,Z);if(J==="default"&&!Y)a4();else s4(V,Z);if(t4(V.bgPrimary,Z),e4(),$.persist!==!1)if(P_(D3,J),Y)P_(j1,Y);else P_(j1,"")}function k2(){if(K1(w2.theme).mode!=="auto")return;G1(w2,{persist:!1})}function w3(){if(typeof window>"u")return()=>{};let _=y3(p0(D3)||"default"),$=p0(j1),J=$?$.trim():null;if(G1({theme:_,tint:J},{persist:!1}),window.matchMedia&&!X1){let Y=window.matchMedia("(prefers-color-scheme: dark)");if(Y.addEventListener)Y.addEventListener("change",k2);else if(Y.addListener)Y.addListener(k2);return X1=!0,()=>{if(Y.removeEventListener)Y.removeEventListener("change",k2);else if(Y.removeListener)Y.removeListener(k2);X1=!1}}return()=>{}}function M3(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let J=_.theme??_.name??_.colorTheme,Y=_.tint??null;G1({theme:J||"default",tint:Y},{persist:!0})}function P3(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return A3()}var M2=/#(\w+)/g,_8=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),$8=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),J8=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),Y8={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},Z8=new Set(["http:","https:","mailto:",""]);function b3(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function a0(_,$={}){if(!_)return null;let J=String(_).trim();if(!J)return null;if(J.startsWith("#")||J.startsWith("/"))return J;if(J.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(J))return J;return null}if(J.startsWith("blob:"))return J;try{let Y=new URL(J,typeof window<"u"?window.location.origin:"http://localhost");if(!Z8.has(Y.protocol))return null;return Y.href}catch{return null}}function I3(_,$={}){if(!_)return"";let J=new DOMParser().parseFromString(_,"text/html"),Y=[],X=J.createTreeWalker(J.body,NodeFilter.SHOW_ELEMENT),Z;while(Z=X.nextNode())Y.push(Z);for(let j of Y){let G=j.tagName.toLowerCase();if(!$8.has(G)){let W=j.parentNode;if(!W)continue;while(j.firstChild)W.insertBefore(j.firstChild,j);W.removeChild(j);continue}let V=Y8[G]||new Set;for(let W of Array.from(j.attributes)){let Q=W.name.toLowerCase(),U=W.value;if(Q.startsWith("on")){j.removeAttribute(W.name);continue}if(Q.startsWith("data-")||Q.startsWith("aria-"))continue;if(V.has(Q)||J8.has(Q)){if(Q==="href"){let H=a0(U);if(!H)j.removeAttribute(W.name);else if(j.setAttribute(W.name,H),G==="a"&&!j.getAttribute("rel"))j.setAttribute("rel","noopener noreferrer")}else if(Q==="src"){let H=G==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(U):U,E=a0(H,{allowDataImage:G==="img"});if(!E)j.removeAttribute(W.name);else j.setAttribute(W.name,E)}continue}j.removeAttribute(W.name)}}return J.body.innerHTML}function S3(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function P2(_,$=2){if(!_)return _;let J=_;for(let Y=0;Y<$;Y+=1){let X=S3(J);if(X===J)break;J=X}return J}function X8(_){if(!_)return{text:"",blocks:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=[],X=[],Z=!1,j=[];for(let G of J){if(!Z&&G.trim().match(/^```mermaid\s*$/i)){Z=!0,j=[];continue}if(Z&&G.trim().match(/^```\s*$/)){let V=Y.length;Y.push(j.join(`
`)),X.push(`@@MERMAID_BLOCK_${V}@@`),Z=!1,j=[];continue}if(Z)j.push(G);else X.push(G)}if(Z)X.push("```mermaid"),X.push(...j);return{text:X.join(`
`),blocks:Y}}function Q8(_){if(!_)return _;return P2(_,5)}function j8(_){let $=new TextEncoder().encode(String(_||"")),J="";for(let Y of $)J+=String.fromCharCode(Y);return btoa(J)}function K8(_){let $=atob(String(_||"")),J=new Uint8Array($.length);for(let Y=0;Y<$.length;Y+=1)J[Y]=$.charCodeAt(Y);return new TextDecoder().decode(J)}function G8(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(J,Y)=>{let X=Number(Y),Z=$[X]??"",j=Q8(Z);return`<div class="mermaid-container" data-mermaid="${j8(j)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function x3(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,J)=>{if(J.includes(`
`))return`
\`\`\`
${J}
\`\`\`
`;return`\`${J}\``})}function T3(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,J)=>{let Y=J.trim(),X=Y.startsWith("/"),Z=X?Y.slice(1).trim():Y,V=(Z.endsWith("/")?Z.slice(0,-1).trim():Z).split(/\s+/)[0]?.toLowerCase();if(!V||!_8.has(V))return $;if(V==="br")return X?"":"<br>";if(X)return`</${V}>`;return`<${V}>`})}function f3(_){if(!_)return _;let $=(J)=>J.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(J,Y)=>`<pre><code>${$(Y)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(J,Y)=>`<code>${$(Y)}</code>`)}function v3(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Y=(Z)=>Z.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),X;while(X=J.nextNode()){if(!X.nodeValue)continue;let Z=Y(X.nodeValue);if(Z!==X.nodeValue)X.nodeValue=Z}return $.body.innerHTML}function V8(_){if(!window.katex)return _;let $=(j)=>S3(j).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),J=(j)=>{let G=[],V=j.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(W)=>{let Q=G.length;return G.push(W),`@@CODE_BLOCK_${Q}@@`});return V=V.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(W)=>{let Q=G.length;return G.push(W),`@@CODE_INLINE_${Q}@@`}),{html:V,blocks:G}},Y=(j,G)=>{if(!G.length)return j;return j.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(V,W)=>{let Q=Number(W);return G[Q]??""})},X=J(_),Z=X.html;return Z=Z.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(j,G,V)=>{try{let W=katex.renderToString($(V.trim()),{displayMode:!0,throwOnError:!1});return`${G}${W}`}catch(W){return`<span class="math-error" title="${b3(W.message)}">${j}</span>`}}),Z=Z.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(j,G,V)=>{if(/\s$/.test(V))return j;try{let W=katex.renderToString($(V),{displayMode:!1,throwOnError:!1});return`${G}${W}`}catch(W){return`${G}<span class="math-error" title="${b3(W.message)}">$${V}$</span>`}}),Y(Z,X.blocks)}function W8(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Y=[],X;while(X=J.nextNode())Y.push(X);for(let Z of Y){let j=Z.nodeValue;if(!j)continue;if(M2.lastIndex=0,!M2.test(j))continue;M2.lastIndex=0;let G=Z.parentElement;if(G&&(G.closest("a")||G.closest("code")||G.closest("pre")))continue;let V=j.split(M2);if(V.length<=1)continue;let W=$.createDocumentFragment();V.forEach((Q,U)=>{if(U%2===1){let H=$.createElement("a");H.setAttribute("href","#"),H.className="hashtag",H.setAttribute("data-hashtag",Q),H.textContent=`#${Q}`,W.appendChild(H)}else W.appendChild($.createTextNode(Q))}),Z.parentNode?.replaceChild(W,Z)}return $.body.innerHTML}function O8(_){if(!_)return _;let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=[],X=!1;for(let Z of J){if(!X&&Z.trim().match(/^```(?:math|katex|latex)\s*$/i)){X=!0,Y.push("$$");continue}if(X&&Z.trim().match(/^```\s*$/)){X=!1,Y.push("$$");continue}Y.push(Z)}return Y.join(`
`)}function t0(_,$,J={}){if(!_)return"";let Y=O8(_),{text:X,blocks:Z}=X8(Y),j=P2(X,2),V=x3(j).replace(/</g,"&lt;").replace(/>/g,"&gt;"),W=T3(V),Q=window.marked?marked.parse(W,{headerIds:!1,mangle:!1}):W.replace(/\n/g,"<br>");return Q=f3(Q),Q=v3(Q),Q=V8(Q),Q=W8(Q),Q=G8(Q,Z),Q=I3(Q,J),Q}function R3(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),J=P2($,2),X=x3(J).replace(/</g,"&lt;").replace(/>/g,"&gt;"),Z=T3(X),j=window.marked?marked.parse(Z):Z.replace(/\n/g,"<br>");return j=f3(j),j=v3(j),j=I3(j),j}async function b2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:J}=window.beautifulMermaid,X=P3()==="dark"?J["tokyo-night"]:J["github-light"],Z=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let j of Z)try{let G=j.dataset.mermaid,V=K8(G||""),W=P2(V,2),Q=await $(W,{...X,transparent:!0});j.innerHTML=Q,j.removeAttribute("data-mermaid")}catch(G){console.error("Mermaid render error:",G);let V=document.createElement("pre");V.className="mermaid-error",V.textContent=`Diagram error: ${G.message}`,j.innerHTML="",j.appendChild(V),j.removeAttribute("data-mermaid")}}var u3="PiClaw";function V1(_,$){let J=_||"PiClaw",Y=J.charAt(0).toUpperCase(),X=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],Z=Y.charCodeAt(0)%X.length,j=X[Z],G=J.trim().toLowerCase(),V=typeof $==="string"?$.trim():"",Q=(V?V:null)||(G==="PiClaw".toLowerCase()||G==="pi"?"/static/icon-192.png":null);return{letter:Y,color:j,image:Q}}function m3(_,$){if(!_)return"PiClaw";let J=$[_]?.name||_;return J?J.charAt(0).toUpperCase()+J.slice(1):"PiClaw"}function g3(_,$){if(!_)return null;let J=$[_]||{};return J.avatar_url||J.avatarUrl||J.avatar||null}function c3(_){if(!_)return null;if(typeof document<"u"){let Z=document.documentElement,j=Z?.dataset?.colorTheme||"",G=Z?.dataset?.tint||"",V=getComputedStyle(Z).getPropertyValue("--accent-color")?.trim();if(V&&(G||j&&j!=="default"))return V}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],J=String(_),Y=0;for(let Z=0;Z<J.length;Z+=1)Y=(Y*31+J.charCodeAt(Z))%2147483647;let X=Math.abs(Y)%$.length;return $[X]}function p3({status:_,draft:$,plan:J,thought:Y,pendingRequest:X,turnId:Z,steerQueued:j,onPanelToggle:G}){let Q=(t)=>{if(!t)return{text:"",totalLines:0,fullText:""};if(typeof t==="string"){let K_=t,A_=K_?K_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:K_,totalLines:A_,fullText:K_}}let V_=t.text||"",J_=t.fullText||t.full_text||V_,O_=Number.isFinite(t.totalLines)?t.totalLines:J_?J_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:V_,totalLines:O_,fullText:J_}},U=160,H=(t)=>{if(!t)return 1;return Math.max(1,Math.ceil(t.length/160))},E=(t,V_,J_)=>{let O_=(t||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!O_)return{text:"",omitted:0,totalLines:Number.isFinite(J_)?J_:0,visibleLines:0};let K_=O_.split(`
`),A_=K_.length>V_?K_.slice(0,V_).join(`
`):O_,B_=Number.isFinite(J_)?J_:K_.reduce((q_,T_)=>q_+H(T_),0),D_=A_?A_.split(`
`).reduce((q_,T_)=>q_+H(T_),0):0,b_=Math.max(B_-D_,0);return{text:A_,omitted:b_,totalLines:B_,visibleLines:D_}},F=Q(J),w=Q(Y),b=Q($),z=Boolean(F.text)||F.totalLines>0,k=Boolean(w.text)||w.totalLines>0,x=Boolean(b.fullText?.trim()||b.text?.trim());if(!_&&!x&&!z&&!k&&!X)return null;let[D,f]=T(new Set),m=(t)=>f((V_)=>{let J_=new Set(V_),O_=!J_.has(t);if(O_)J_.add(t);else J_.delete(t);if(typeof G==="function")G(t,O_);return J_});g(()=>{f(new Set)},[Z]);let p=_?.turn_id||Z,o=c3(p),Y_=j?"turn-dot turn-dot-queued":"turn-dot",d=(t)=>t,__=Boolean(_?.last_activity||_?.lastActivity),z_="",e=_?.title,G_=_?.status;if(_?.type==="plan")z_=e?`Planning: ${e}`:"Planning...";else if(_?.type==="tool_call")z_=e?`Running: ${e}`:"Running tool...";else if(_?.type==="tool_status")z_=e?`${e}: ${G_||"Working..."}`:G_||"Working...";else if(_?.type==="error")z_=e||"Agent error";else z_=e||G_||"Working...";if(__)z_="Last activity just now";let H_=({panelTitle:t,text:V_,fullText:J_,totalLines:O_,maxLines:K_,titleClass:A_,panelKey:B_})=>{let D_=D.has(B_),b_=J_||V_||"",q_=typeof K_==="number",T_=D_&&q_,C_=q_?E(b_,K_,O_):{text:b_||"",omitted:0,totalLines:Number.isFinite(O_)?O_:0};if(!b_&&!(Number.isFinite(C_.totalLines)&&C_.totalLines>0))return null;let F_=`agent-thinking-body${q_?" agent-thinking-body-collapsible":""}`,M_=q_?`--agent-thinking-collapsed-lines: ${K_};`:"";return q`
            <div
                class="agent-thinking"
                data-expanded=${D_?"true":"false"}
                data-collapsible=${q_?"true":"false"}
                style=${o?`--turn-color: ${o};`:""}
            >
                <div class="agent-thinking-title ${A_||""}">
                    ${o&&q`<span class=${Y_} aria-hidden="true"></span>`}
                    ${t}
                    ${T_&&q`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${t} panel`}
                            onClick=${()=>m(B_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${F_}
                    style=${M_}
                    dangerouslySetInnerHTML=${{__html:R3(b_)}}
                />
                ${!D_&&C_.omitted>0&&q`
                    <button class="agent-thinking-truncation" onClick=${()=>m(B_)}>
                        ▸ ${C_.omitted} more lines
                    </button>
                `}
                ${D_&&C_.omitted>0&&q`
                    <button class="agent-thinking-truncation" onClick=${()=>m(B_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},y_=X?.tool_call?.title,$_=y_?`Awaiting approval: ${y_}`:"Awaiting approval";return q`
        <div class="agent-status-panel">
            ${X&&q`
                <div class="agent-status agent-status-request" aria-live="polite" style=${o?`--turn-color: ${o};`:""}>
                    <span class=${Y_} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${$_}</span>
                </div>
            `}
            ${z&&H_({panelTitle:d("Planning"),text:F.text,fullText:F.fullText,totalLines:F.totalLines,panelKey:"plan"})}
            ${k&&H_({panelTitle:d("Thoughts"),text:w.text,fullText:w.fullText,totalLines:w.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${x&&H_({panelTitle:d("Draft"),text:b.text,fullText:b.fullText,totalLines:b.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&q`
                <div class=${`agent-status${__?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${o?`--turn-color: ${o};`:""}>
                    ${o&&q`<span class=${Y_} aria-hidden="true"></span>`}
                    ${_?.type==="error"?q`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!__&&q`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${z_}</span>
                </div>
            `}
        </div>
    `}function h3({request:_,onRespond:$}){if(!_)return null;let{request_id:J,tool_call:Y,options:X}=_,Z=Y?.title||"Agent Request",j=Y?.kind||"other",G=Y?.rawInput||{},V=G.command||G.commands&&G.commands[0]||null,W=G.diff||null,Q=G.fileName||G.path||null,U=Y?.description||G.description||G.explanation||null,E=(Array.isArray(Y?.locations)?Y.locations:[]).map((k)=>k?.path).filter((k)=>Boolean(k)),F=Array.from(new Set([Q,...E].filter(Boolean)));console.log("AgentRequestModal:",{request_id:J,tool_call:Y,options:X});let w=async(k)=>{try{await $1(J,k),$()}catch(x){console.error("Failed to respond to agent request:",x)}},b=async()=>{try{await K3(Z,`Auto-approved: ${Z}`),await $1(J,"approved"),$()}catch(k){console.error("Failed to add to whitelist:",k)}},z=X&&X.length>0;return q`
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
                ${(U||V||W||F.length>0)&&q`
                    <div class="agent-request-body">
                        ${U&&q`
                            <div class="agent-request-description">${U}</div>
                        `}
                        ${F.length>0&&q`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${F.map((k,x)=>q`<li key=${x}>${k}</li>`)}
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
                                onClick=${()=>w(k.optionId||k.id||k)}
                            >
                                ${k.name||k.label||k.optionId||k.id||String(k)}
                            </button>
                        `):q`
                        <button class="agent-request-btn primary" onClick=${()=>w("approved")}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${()=>w("denied")}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${b}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function i3({status:_}){if(_==="connected")return null;return q`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function l3(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let Y=new Date-$,X=Y/1000,Z=86400000;if(Y<Z){if(X<60)return"just now";if(X<3600)return`${Math.floor(X/60)}m`;return`${Math.floor(X/3600)}h`}if(Y<5*Z){let V=$.toLocaleDateString(void 0,{weekday:"short"}),W=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${V} ${W}`}let j=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),G=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${j} ${G}`}function Q2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function S0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function I2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}function o3({src:_,onClose:$}){return g(()=>{let J=(Y)=>{if(Y.key==="Escape")$()};return document.addEventListener("keydown",J),()=>document.removeEventListener("keydown",J)},[$]),q`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function q8({mediaId:_}){let[$,J]=T(null);if(g(()=>{E2(_).then(J).catch(()=>{})},[_]),!$)return null;let Y=$.filename||"file",X=$.metadata?.size,Z=X?S0(X):"";return q`
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
    `}function S2({annotations:_}){if(!_)return null;let{audience:$,priority:J,lastModified:Y}=_,X=Y?I2(Y):null;return q`
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
    `}function N8({block:_}){let $=_.title||_.name||_.uri,J=_.description,Y=_.size?S0(_.size):"",X=_.mime_type||"",Z=z8(X),j=a0(_.uri);return q`
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
                        <button class="resource-embed-blob-btn" onClick=${(G)=>{G.preventDefault(),G.stopPropagation();let V=new Blob([Uint8Array.from(atob(_.data),(U)=>U.charCodeAt(0))],{type:j||"application/octet-stream"}),W=URL.createObjectURL(V),Q=document.createElement("a");Q.href=W,Q.download=Y.split("/").pop()||"resource",Q.click(),URL.revokeObjectURL(W)}}>Download</button>
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
`),Y=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Referenced messages:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Y=W;break}if(Y===-1)return{content:_,messageRefs:[]};let X=[],Z=Y+1;for(;Z<J.length;Z+=1){let W=J[Z];if(/^\s*-\s+/.test(W)){let U=W.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(U)X.push(U[1])}else if(!W.trim())break;else break}if(X.length===0)return{content:_,messageRefs:[]};let j=J.slice(0,Y),G=J.slice(Z),V=[...j,...G].join(`
`);return V=V.replace(/\n{3,}/g,`

`).trim(),{content:V,messageRefs:X}}function E8(_){if(!_)return{content:_,attachments:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Images:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Y=W;break}if(Y===-1)return{content:_,attachments:[]};let X=[],Z=Y+1;for(;Z<J.length;Z+=1){let W=J[Z];if(/^\s*-\s+/.test(W)){let Q=W.replace(/^\s*-\s+/,"").trim(),U=Q.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||Q.match(/^attachment:([^\s]+)\s+(.+)$/i);if(U){let H=U[1],E=(U[2]||"").trim()||H;X.push({id:H,label:E,raw:Q})}else X.push({id:null,label:Q,raw:Q})}else if(!W.trim())break;else break}if(X.length===0)return{content:_,attachments:[]};let j=J.slice(0,Y),G=J.slice(Z),V=[...j,...G].join(`
`);return V=V.replace(/\n{3,}/g,`

`).trim(),{content:V,attachments:X}}function D8(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function C8(_,$){if(!_||!$)return _;let J=String($).trim().split(/\s+/).filter(Boolean);if(J.length===0)return _;let Y=J.map(D8).sort((Q,U)=>U.length-Q.length),X=new RegExp(`(${Y.join("|")})`,"gi"),Z=new RegExp(`^(${Y.join("|")})$`,"i"),j=new DOMParser().parseFromString(_,"text/html"),G=j.createTreeWalker(j.body,NodeFilter.SHOW_TEXT),V=[],W;while(W=G.nextNode())V.push(W);for(let Q of V){let U=Q.nodeValue;if(!U||!X.test(U)){X.lastIndex=0;continue}X.lastIndex=0;let H=Q.parentElement;if(H&&H.closest("code, pre, script, style"))continue;let E=U.split(X).filter((w)=>w!=="");if(E.length===0)continue;let F=j.createDocumentFragment();for(let w of E)if(Z.test(w)){let b=j.createElement("mark");b.className="search-highlight-term",b.textContent=w,F.appendChild(b)}else F.appendChild(j.createTextNode(w));Q.parentNode.replaceChild(F,Q)}return j.body.innerHTML}function n3({post:_,onClick:$,onHashtagClick:J,onMessageRef:Y,agentName:X,agentAvatarUrl:Z,userName:j,userAvatarUrl:G,userAvatarBackground:V,onDelete:W,isThreadReply:Q,isRemoving:U,highlightQuery:H}){let[E,F]=T(null),w=A(null),b=_.data,z=b.type==="agent_response",k=j||"You",x=z?X||u3:k,D=z?V1(X,Z):V1(k,G),f=typeof V==="string"?V.trim().toLowerCase():"",m=!z&&D.image&&(f==="clear"||f==="transparent"),p=z&&Boolean(D.image),o=`background-color: ${m||p?"transparent":D.color}`,Y_=b.content_meta,d=Boolean(Y_?.truncated),__=Boolean(Y_?.preview),z_=d&&!__,e=d?{originalLength:Number.isFinite(Y_?.original_length)?Y_.original_length:b.content?b.content.length:0,maxLength:Number.isFinite(Y_?.max_length)?Y_.max_length:0}:null,G_=H8(b.content,b.link_previews),{content:H_,fileRefs:y_}=F8(G_),{content:$_,messageRefs:t}=L8(H_),{content:V_,attachments:J_}=E8($_);G_=V_;let O_=Boolean(G_)&&!z_,K_=typeof H==="string"?H.trim():"",A_=I0(()=>{if(!G_)return"";let M=t0(G_,J);return K_?C8(M,K_):M},[G_,K_]),B_=(M,n)=>{M.stopPropagation(),F(Z2(n))},D_=(M)=>{M.stopPropagation(),W?.(_)},b_=(M,n)=>{let I_=new Set;if(!M||n.length===0)return{content:M,usedIds:I_};return{content:M.replace(/attachment:([^\s)"']+)/g,(_0,x0,U0,H0)=>{let n_=x0.replace(/^\/+/,""),G0=n.find((S_)=>S_.name&&S_.name.toLowerCase()===n_.toLowerCase()&&!I_.has(S_.id))||n.find((S_)=>!I_.has(S_.id));if(!G0)return _0;if(I_.add(G0.id),H0.slice(Math.max(0,U0-2),U0)==="](")return`/media/${G0.id}`;return G0.name||"attachment"}),usedIds:I_}},q_=[],T_=[],C_=[],F_=[],M_=[],N0=[],m_=b.content_blocks||[],k_=b.media_ids||[],l_=0;if(m_.length>0)m_.forEach((M)=>{if(M?.type==="text"&&M.annotations)N0.push(M.annotations);if(M?.type==="resource_link")F_.push(M);else if(M?.type==="resource")M_.push(M);else if(M?.type==="file"){let n=k_[l_++];if(n)T_.push(n),C_.push({id:n,name:M?.name||M?.filename||M?.title})}else if(M?.type==="image"||!M?.type){let n=k_[l_++];if(n)q_.push({id:n,annotations:M?.annotations}),C_.push({id:n,name:M?.name||M?.filename||M?.title})}});else if(k_.length>0)k_.forEach((M)=>{q_.push({id:M,annotations:null}),C_.push({id:M,name:null})});if(J_.length>0)J_.forEach((M)=>{if(!M?.id)return;let n=C_.find((I_)=>String(I_.id)===String(M.id));if(n&&!n.name)n.name=M.label});let{content:y0,usedIds:c_}=b_(G_,C_);G_=y0;let j0=q_.filter(({id:M})=>!c_.has(M)),K0=T_.filter((M)=>!c_.has(M)),N_=J_.length>0?J_.map((M,n)=>({id:M.id||`attachment-${n+1}`,label:M.label||`attachment-${n+1}`})):C_.map((M,n)=>({id:M.id,label:M.name||`attachment-${n+1}`}));return g(()=>{if(w.current)b2(w.current)},[G_]),q`
        <div id=${`post-${_.id}`} class="post ${z?"agent-post":""} ${Q?"thread-reply":""} ${U?"removing":""}" onClick=${$}>
            <div class="post-avatar ${z?"agent-avatar":""} ${D.image?"has-image":""}" style=${o}>
                ${D.image?q`<img src=${D.image} alt=${x} />`:D.letter}
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
                    <span class="post-author">${x}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(M)=>{if(M.preventDefault(),M.stopPropagation(),Y)Y(_.id)}}>${l3(_.timestamp)}</a>
                </div>
                ${z_&&e&&q`
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
                ${(y_.length>0||t.length>0||N_.length>0)&&q`
                    <div class="post-file-refs">
                        ${t.map((M)=>{let n=(I_)=>{I_.preventDefault(),I_.stopPropagation();let e_=document.getElementById("post-"+M);if(e_)e_.scrollIntoView({behavior:"smooth",block:"center"}),e_.classList.add("post-highlight"),setTimeout(()=>e_.classList.remove("post-highlight"),2000)};return q`
                                <a href=${`#msg-${M}`} class="post-msg-pill-link" onClick=${n}>
                                    <${g0}
                                        prefix="post"
                                        label=${"msg:"+M}
                                        title=${"Message "+M}
                                        icon="message"
                                        onClick=${n}
                                    />
                                </a>
                            `})}
                        ${y_.map((M)=>{let n=M.split("/").pop()||M;return q`
                                <${g0}
                                    prefix="post"
                                    label=${n}
                                    title=${M}
                                />
                            `})}
                        ${N_.map((M)=>q`
                            <${g0}
                                prefix="post"
                                label=${M.label}
                                title=${M.label}
                            />
                        `)}
                    </div>
                `}
                ${O_&&q`
                    <div 
                        ref=${w}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:A_}}
                        onClick=${(M)=>{if(M.target.classList.contains("hashtag")){M.preventDefault(),M.stopPropagation();let n=M.target.dataset.hashtag;if(n)J?.(n)}else if(M.target.tagName==="IMG")M.preventDefault(),M.stopPropagation(),F(M.target.src)}}
                    />
                `}
                ${N0.length>0&&q`
                    ${N0.map((M,n)=>q`
                        <${S2} key=${n} annotations=${M} />
                    `)}
                `}
                ${j0.length>0&&q`
                    <div class="media-preview">
                        ${j0.map(({id:M})=>q`
                            <img 
                                key=${M} 
                                src=${W3(M)} 
                                alt="Media" 
                                loading="lazy"
                                onClick=${(n)=>B_(n,M)}
                            />
                        `)}
                    </div>
                `}
                ${j0.length>0&&q`
                    ${j0.map(({annotations:M},n)=>q`
                        ${M&&q`<${S2} key=${n} annotations=${M} />`}
                    `)}
                `}
                ${K0.length>0&&q`
                    <div class="file-attachments">
                        ${K0.map((M)=>q`
                            <${q8} key=${M} mediaId=${M} />
                        `)}
                    </div>
                `}
                ${F_.length>0&&q`
                    <div class="resource-links">
                        ${F_.map((M,n)=>q`
                            <div key=${n}>
                                <${N8} block=${M} />
                                <${S2} annotations=${M.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${M_.length>0&&q`
                    <div class="resource-embeds">
                        ${M_.map((M,n)=>q`
                            <div key=${n}>
                                <${B8} block=${M} />
                                <${S2} annotations=${M.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${b.link_previews?.length>0&&q`
                    <div class="link-previews">
                        ${b.link_previews.map((M,n)=>q`
                            <${U8} key=${n} preview=${M} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${E&&q`<${o3} src=${E} onClose=${()=>F(null)} />`}
    `}function d3({posts:_,hasMore:$,onLoadMore:J,onPostClick:Y,onHashtagClick:X,onMessageRef:Z,emptyMessage:j,timelineRef:G,agents:V,user:W,onDeletePost:Q,reverse:U=!0,removingPostIds:H,searchQuery:E}){let[F,w]=T(!1),b=A(null),z=typeof IntersectionObserver<"u",k=I(async()=>{if(!J||!$||F)return;w(!0);try{await J({preserveScroll:!0,preserveMode:"top"})}finally{w(!1)}},[$,F,J]),x=I((m)=>{let{scrollTop:p,scrollHeight:o,clientHeight:Y_}=m.target,d=U?o-Y_-p:p,__=Math.max(300,Y_);if(d<__)k()},[U,k]);if(g(()=>{if(!z)return;let m=b.current,p=G?.current;if(!m||!p)return;let o=300,Y_=new IntersectionObserver((d)=>{for(let __ of d){if(!__.isIntersecting)continue;k()}},{root:p,rootMargin:`${o}px 0px ${o}px 0px`,threshold:0});return Y_.observe(m),()=>Y_.disconnect()},[z,$,J,G,k]),g(()=>{if(z)return;if(!G?.current)return;let{scrollTop:m,scrollHeight:p,clientHeight:o}=G.current,Y_=U?p-o-m:m,d=Math.max(300,o);if(Y_<d)k()},[z,_,$,U,G,k]),g(()=>{if(!G?.current)return;if(!$||F)return;let{scrollTop:m,scrollHeight:p,clientHeight:o}=G.current,Y_=U?p-o-m:m,d=Math.max(300,o);if(p<=o+1||Y_<d)k()},[_,$,F,U,G,k]),!_)return q`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return q`
            <div class="timeline" ref=${G}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${j||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let D=_.slice().sort((m,p)=>m.id-p.id),f=q`<div class="timeline-sentinel" ref=${b}></div>`;return q`
        <div class="timeline ${U?"reverse":"normal"}" ref=${G} onScroll=${x}>
            <div class="timeline-content">
                ${U?f:null}
                ${D.map((m)=>{let p=Boolean(m.data?.thread_id&&m.data.thread_id!==m.id),o=H?.has?.(m.id);return q`
                    <${n3}
                        key=${m.id}
                        post=${m}
                        isThreadReply=${p}
                        isRemoving=${o}
                        highlightQuery=${E}
                        agentName=${m3(m.data?.agent_id,V||{})}
                        agentAvatarUrl=${g3(m.data?.agent_id,V||{})}
                        userName=${W?.name||W?.user_name}
                        userAvatarUrl=${W?.avatar_url||W?.avatarUrl||W?.avatar}
                        userAvatarBackground=${W?.avatar_background||W?.avatarBackground}
                        onClick=${()=>Y?.(m)}
                        onHashtagClick=${X}
                        onMessageRef=${Z}
                        onDelete=${Q}
                    />
                `})}
                ${U?null:f}
            </div>
        </div>
    `}var y8=16,k8=60000,t3=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function A8(_,$){let J=String(_||"").trim();if(!J)return J;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(J)||J.startsWith("#")||J.startsWith("data:")||J.startsWith("blob:"))return J;let Y=J.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),X=Y?.[1]||J,Z=Y?.[2]||"",j=Y?.[3]||"",G=String($||"").split("/").slice(0,-1).join("/"),W=X.startsWith("/")?X:`${G?`${G}/`:""}${X}`,Q=[];for(let H of W.split("/")){if(!H||H===".")continue;if(H===".."){if(Q.length>0)Q.pop();continue}Q.push(H)}let U=Q.join("/");return`${Y1(U)}${Z}${j}`}function e3(_,$,J,Y=0,X=[]){if(!J&&t3(_))return X;if(!_)return X;if(X.push({node:_,depth:Y}),_.type==="dir"&&_.children&&$.has(_.path))for(let Z of _.children)e3(Z,$,J,Y+1,X);return X}function r3(_,$,J){if(!_)return"";let Y=[],X=(Z)=>{if(!J&&t3(Z))return;if(Y.push(Z.type==="dir"?`d:${Z.path}`:`f:${Z.path}`),Z.children&&$?.has(Z.path))for(let j of Z.children)X(j)};return X(_),Y.join("|")}function N1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let J=Array.isArray(_.children)?_.children:null,Y=Array.isArray($.children)?$.children:null;if(!Y)return _;let X=J?new Map(J.map((G)=>[G?.path,G])):new Map,Z=!J||J.length!==Y.length,j=Y.map((G)=>{let V=N1(X.get(G.path),G);if(V!==X.get(G.path))Z=!0;return V});return Z?{...$,children:j}:_}function O1(_,$,J){if(!_)return _;if(_.path===$)return N1(_,J);if(!Array.isArray(_.children))return _;let Y=!1,X=_.children.map((Z)=>{let j=O1(Z,$,J);if(j!==Z)Y=!0;return j});return Y?{..._,children:X}:_}var _4=4,W1=14,w8=8,M8=16;function $4(_){if(!_)return 0;if(_.type==="file"){let Y=Math.max(0,Number(_.size)||0);return _.__bytes=Y,Y}let $=Array.isArray(_.children)?_.children:[],J=0;for(let Y of $)J+=$4(Y);return _.__bytes=J,J}function J4(_,$=0){let J=Math.max(0,Number(_?.__bytes??_?.size??0)),Y={name:_?.name||_?.path||".",path:_?.path||".",size:J,children:[]};if(!_||_.type!=="dir"||$>=_4)return Y;let X=Array.isArray(_.children)?_.children:[],Z=[];for(let G of X){let V=Math.max(0,Number(G?.__bytes??G?.size??0));if(V<=0)continue;if(G.type==="dir")Z.push({kind:"dir",node:G,size:V});else Z.push({kind:"file",name:G.name,path:G.path,size:V})}Z.sort((G,V)=>V.size-G.size);let j=Z;if(Z.length>W1){let G=Z.slice(0,W1-1),V=Z.slice(W1-1),W=V.reduce((Q,U)=>Q+U.size,0);G.push({kind:"other",name:`+${V.length} more`,path:`${Y.path}/[other]`,size:W}),j=G}return Y.children=j.map((G)=>{if(G.kind==="dir")return J4(G.node,$+1);return{name:G.name,path:G.path,size:G.size,children:[]}}),Y}function s3(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,J=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(J==="dark")return!0;if(J==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function Y4(_,$,J){let Y=((_+Math.PI/2)*180/Math.PI+360)%360,X=J?Math.max(30,70-$*10):Math.max(34,66-$*8),Z=J?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${Y.toFixed(1)} ${X}% ${Z}%)`}function x2(_,$,J,Y){return{x:_+J*Math.cos(Y),y:$+J*Math.sin(Y)}}function B1(_,$,J,Y,X,Z){let j=Math.PI*2-0.0001,G=Z-X>j?X+j:Z,V=x2(_,$,Y,X),W=x2(_,$,Y,G),Q=x2(_,$,J,G),U=x2(_,$,J,X),H=G-X>Math.PI?1:0;return[`M ${V.x.toFixed(3)} ${V.y.toFixed(3)}`,`A ${Y} ${Y} 0 ${H} 1 ${W.x.toFixed(3)} ${W.y.toFixed(3)}`,`L ${Q.x.toFixed(3)} ${Q.y.toFixed(3)}`,`A ${J} ${J} 0 ${H} 0 ${U.x.toFixed(3)} ${U.y.toFixed(3)}`,"Z"].join(" ")}var Z4={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function X4(_,$,J){let Y=[],X=[],Z=Math.max(0,Number($)||0),j=(G,V,W,Q)=>{let U=Array.isArray(G?.children)?G.children:[];if(!U.length)return;let H=Math.max(0,Number(G.size)||0);if(H<=0)return;let E=W-V,F=V;U.forEach((w,b)=>{let z=Math.max(0,Number(w.size)||0);if(z<=0)return;let k=z/H,x=F,D=b===U.length-1?W:F+E*k;if(F=D,D-x<0.003)return;let f=Z4[Q];if(f){let m=Y4(x,Q,J);if(Y.push({key:w.path,path:w.path,label:w.name,size:z,color:m,depth:Q,startAngle:x,endAngle:D,innerRadius:f[0],outerRadius:f[1],d:B1(120,120,f[0],f[1],x,D)}),Q===1)X.push({key:w.path,name:w.name,size:z,pct:Z>0?z/Z*100:0,color:m})}if(Q<_4)j(w,x,D,Q+1)})};return j(_,-Math.PI/2,Math.PI*3/2,1),{segments:Y,legend:X}}function q1(_,$){if(!_||!$)return null;if(_.path===$)return _;let J=Array.isArray(_.children)?_.children:[];for(let Y of J){let X=q1(Y,$);if(X)return X}return null}function Q4(_,$,J,Y){if(!J||J<=0)return{segments:[],legend:[]};let X=Z4[1];if(!X)return{segments:[],legend:[]};let Z=-Math.PI/2,j=Math.PI*3/2,G=Y4(Z,1,Y),W=`${$||"."}/[files]`;return{segments:[{key:W,path:W,label:_,size:J,color:G,depth:1,startAngle:Z,endAngle:j,innerRadius:X[0],outerRadius:X[1],d:B1(120,120,X[0],X[1],Z,j)}],legend:[{key:W,name:_,size:J,pct:100,color:G}]}}function a3(_,$=!1,J=!1){if(!_)return null;let Y=$4(_),X=J4(_,0),Z=X.size||Y,{segments:j,legend:G}=X4(X,Z,J);if(!j.length&&Z>0){let V=Q4("[files]",X.path,Z,J);j=V.segments,G=V.legend}return{root:X,totalSize:Z,segments:j,legend:G,truncated:$,isDarkTheme:J}}function P8({payload:_}){if(!_)return null;let[$,J]=T(null),[Y,X]=T(_?.root?.path||"."),[Z,j]=T(()=>[_?.root?.path||"."]),[G,V]=T(!1);g(()=>{let d=_?.root?.path||".";X(d),j([d]),J(null)},[_?.root?.path,_?.totalSize]),g(()=>{if(!Y)return;V(!0);let d=setTimeout(()=>V(!1),180);return()=>clearTimeout(d)},[Y]);let W=I0(()=>{return q1(_.root,Y)||_.root},[_?.root,Y]),Q=W?.size||_.totalSize||0,{segments:U,legend:H}=I0(()=>{let d=X4(W,Q,_.isDarkTheme);if(d.segments.length>0)return d;if(Q<=0)return d;let __=W?.children?.length?"Total":"[files]";return Q4(__,W?.path||_?.root?.path||".",Q,_.isDarkTheme)},[W,Q,_.isDarkTheme,_?.root?.path]),[E,F]=T(U),w=A(new Map),b=A(0);g(()=>{let d=w.current,__=new Map(U.map((H_)=>[H_.key,H_])),z_=performance.now(),e=220,G_=(H_)=>{let y_=Math.min(1,(H_-z_)/220),$_=y_*(2-y_),t=U.map((V_)=>{let O_=d.get(V_.key)||{startAngle:V_.startAngle,endAngle:V_.startAngle,innerRadius:V_.innerRadius,outerRadius:V_.innerRadius},K_=(q_,T_)=>q_+(T_-q_)*$_,A_=K_(O_.startAngle,V_.startAngle),B_=K_(O_.endAngle,V_.endAngle),D_=K_(O_.innerRadius,V_.innerRadius),b_=K_(O_.outerRadius,V_.outerRadius);return{...V_,d:B1(120,120,D_,b_,A_,B_)}});if(F(t),y_<1)b.current=requestAnimationFrame(G_)};if(b.current)cancelAnimationFrame(b.current);return b.current=requestAnimationFrame(G_),w.current=__,()=>{if(b.current)cancelAnimationFrame(b.current)}},[U]);let z=E.length?E:U,k=Q>0?S0(Q):"0 B",x=W?.name||"",f=(x&&x!=="."?x:"Total")||"Total",m=k,p=Z.length>1,o=(d)=>{if(!d?.path)return;let __=q1(_.root,d.path);if(!__||!Array.isArray(__.children)||__.children.length===0)return;j((z_)=>[...z_,__.path]),X(__.path),J(null)},Y_=()=>{if(!p)return;j((d)=>{let __=d.slice(0,-1);return X(__[__.length-1]||_?.root?.path||"."),__}),J(null)};return q`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${G?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${W?.path||_?.root?.path||"."}`}
                data-segments=${z.length}
                data-base-size=${Q}>
                ${z.map((d)=>q`
                    <path
                        key=${d.key}
                        d=${d.d}
                        fill=${d.color}
                        stroke="var(--bg-primary)"
                        stroke-width="1"
                        class=${`workspace-folder-starburst-segment${$?.key===d.key?" is-hovered":""}`}
                        onMouseEnter=${()=>J(d)}
                        onMouseLeave=${()=>J(null)}
                        onTouchStart=${()=>J(d)}
                        onTouchEnd=${()=>J(null)}
                        onClick=${()=>o(d)}
                    >
                        <title>${d.label} — ${S0(d.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${p?" is-drill":""}`}
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
                    <text x="120" y="130" text-anchor="middle" class="workspace-folder-starburst-total-value">${m}</text>
                </g>
            </svg>
            ${H.length>0&&q`
                <div class="workspace-folder-starburst-legend">
                    ${H.slice(0,8).map((d)=>q`
                        <div key=${d.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${d.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${d.name}>${d.name}</span>
                            <span class="workspace-folder-starburst-size">${S0(d.size)}</span>
                            <span class="workspace-folder-starburst-pct">${d.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&q`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function b8({mediaId:_}){let[$,J]=T(null);if(g(()=>{if(!_)return;E2(_).then(J).catch(()=>{})},[_]),!$)return null;let Y=$.filename||"file",X=$.metadata?.size?S0($.metadata.size):"";return q`
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
    `}function j4({onFileSelect:_,visible:$=!0,active:J=void 0,onOpenEditor:Y}){let[X,Z]=T(null),[j,G]=T(new Set(["."])),[V,W]=T(null),[Q,U]=T(null),[H,E]=T(""),[F,w]=T(null),[b,z]=T(null),[k,x]=T(!0),[D,f]=T(!1),[m,p]=T(null),[o,Y_]=T(()=>d0("workspaceShowHidden",!1)),[d,__]=T(!1),[z_,e]=T(null),[G_,H_]=T(null),[y_,$_]=T(null),[t,V_]=T(!1),[J_,O_]=T(null),[K_,A_]=T(()=>s3()),B_=A(j),D_=A(""),b_=A(null),q_=A(0),T_=A(new Set),C_=A(null),F_=A(new Map),M_=A(_),N0=A(Y),m_=A(null),k_=A(null),l_=A(null),y0=A(null),c_=A(null),j0=A(null),K0=A("."),N_=A(null),M=A({path:null,dragging:!1,startX:0,startY:0}),n=A({path:null,dragging:!1,startX:0,startY:0}),I_=A({path:null,timer:0}),e_=A(!1),_0=A(0),x0=A(new Map),U0=A(null),H0=A(null),n_=A(o),F0=A($),G0=A(J??$),V0=A(0),S_=A(y_),d_=A(d),T0=A(z_),L0=A(null),B0=A({x:0,y:0}),Z0=A(0),k0=A(null),X0=A(V),p_=A(Q),h_=A(null),E0=A(F);M_.current=_,N0.current=Y,g(()=>{B_.current=j},[j]),g(()=>{n_.current=o},[o]),g(()=>{F0.current=$},[$]),g(()=>{G0.current=J??$},[J,$]),g(()=>{S_.current=y_},[y_]),g(()=>{let K=(B)=>{let y=B?.detail?.path;if(!y)return;let C=y.split("/"),R=[];for(let h=1;h<C.length;h++)R.push(C.slice(0,h).join("/"));if(R.length)G((h)=>{let s=new Set(h);s.add(".");for(let a of R)s.add(a);return s});W(y),requestAnimationFrame(()=>{let h=document.querySelector(`[data-path="${CSS.escape(y)}"]`);if(h)h.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",K),()=>window.removeEventListener("workspace-reveal-path",K)},[]),g(()=>{d_.current=d},[d]),g(()=>{T0.current=z_},[z_]),g(()=>{X0.current=V},[V]),g(()=>{p_.current=Q},[Q]),g(()=>{E0.current=F},[F]),g(()=>{if(typeof window>"u"||typeof document>"u")return;let K=()=>A_(s3());K();let B=window.matchMedia?.("(prefers-color-scheme: dark)"),y=()=>K();if(B?.addEventListener)B.addEventListener("change",y);else if(B?.addListener)B.addListener(y);let C=typeof MutationObserver<"u"?new MutationObserver(()=>K()):null;if(C?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)C?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(B?.removeEventListener)B.removeEventListener("change",y);else if(B?.removeListener)B.removeListener(y);C?.disconnect()}},[]),g(()=>{if(!Q)return;let K=c_.current;if(!K)return;let B=requestAnimationFrame(()=>{try{K.focus(),K.select()}catch{}});return()=>cancelAnimationFrame(B)},[Q]);let A0=async(K)=>{f(!0),w(null),z(null);try{let B=await O3(K,20000);w(B)}catch(B){w({error:B.message||"Failed to load preview"})}finally{f(!1)}};m_.current=A0;let f0=async()=>{if(!F0.current)return;try{let K=await D2("",1,n_.current),B=r3(K.root,B_.current,n_.current);if(B===D_.current){x(!1);return}if(D_.current=B,b_.current=K.root,!q_.current)q_.current=requestAnimationFrame(()=>{q_.current=0,Z((y)=>N1(y,b_.current)),x(!1)})}catch(K){p(K.message||"Failed to load workspace"),x(!1)}},D0=async(K)=>{if(!K)return;if(T_.current.has(K))return;T_.current.add(K);try{let B=await D2(K,1,n_.current);Z((y)=>O1(y,K,B.root))}catch(B){p(B.message||"Failed to load workspace")}finally{T_.current.delete(K)}};k_.current=D0;let f_=I(()=>{let K=V;if(!K)return".";let B=F_.current?.get(K);if(B&&B.type==="dir")return B.path;if(K==="."||!K.includes("/"))return".";let y=K.split("/");return y.pop(),y.join("/")||"."},[V]),r_=I((K)=>{let B=K?.closest?.(".workspace-row");if(!B)return null;let y=B.dataset.path,C=B.dataset.type;if(!y)return null;if(C==="dir")return y;if(y.includes("/")){let R=y.split("/");return R.pop(),R.join("/")||"."}return"."},[]),Q0=I((K)=>{return r_(K?.target||null)},[r_]),v_=I((K)=>{S_.current=K,$_(K)},[]),R_=I(()=>{let K=I_.current;if(K?.timer)clearTimeout(K.timer);I_.current={path:null,timer:0}},[]),s_=I((K)=>{if(!K||K==="."){R_();return}let B=F_.current?.get(K);if(!B||B.type!=="dir"){R_();return}if(B_.current?.has(K)){R_();return}if(I_.current?.path===K)return;R_();let y=setTimeout(()=>{I_.current={path:null,timer:0},k_.current?.(K),G((C)=>{let R=new Set(C);return R.add(K),R})},600);I_.current={path:K,timer:y}},[R_]),z0=I((K,B)=>{if(B0.current={x:K,y:B},Z0.current)return;Z0.current=requestAnimationFrame(()=>{Z0.current=0;let y=L0.current;if(!y)return;let C=B0.current;y.style.transform=`translate(${C.x+12}px, ${C.y+12}px)`})},[]),w0=I((K)=>{if(!K)return;let y=(F_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!y)return;H_({path:K,label:y})},[]),v0=I(()=>{if(H_(null),Z0.current)cancelAnimationFrame(Z0.current),Z0.current=0;if(L0.current)L0.current.style.transform="translate(-9999px, -9999px)"},[]),L=I((K)=>{if(!K)return".";let B=F_.current?.get(K);if(B&&B.type==="dir")return B.path;if(K==="."||!K.includes("/"))return".";let y=K.split("/");return y.pop(),y.join("/")||"."},[]),S=I(()=>{U(null),E("")},[]),r=I((K)=>{if(!K)return;let y=(F_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!y||K===".")return;U(K),E(y)},[]),Q_=I(async()=>{let K=p_.current;if(!K)return;let B=(H||"").trim();if(!B){S();return}let y=F_.current?.get(K),C=(y?.name||K.split("/").pop()||K).trim();if(B===C){S();return}try{let h=(await B3(K,B))?.path||K,s=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(S(),p(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:K,newPath:h,type:y?.type||"file"}})),y?.type==="dir")G((a)=>{let i=new Set;for(let Z_ of a)if(Z_===K)i.add(h);else if(Z_.startsWith(`${K}/`))i.add(`${h}${Z_.slice(K.length)}`);else i.add(Z_);return i});if(W(h),y?.type==="dir")w(null),f(!1),z(null);else m_.current?.(h);k_.current?.(s)}catch(R){p(R?.message||"Failed to rename file")}},[S,H]),j_=I(async(K)=>{let C=K||".";for(let R=0;R<50;R+=1){let s=`untitled${R===0?"":`-${R}`}.md`;try{let i=(await N3(C,s,""))?.path||(C==="."?s:`${C}/${s}`);if(C&&C!==".")G((Z_)=>new Set([...Z_,C]));W(i),p(null),k_.current?.(C),m_.current?.(i);return}catch(a){if(a?.status===409||a?.code==="file_exists")continue;p(a?.message||"Failed to create file");return}}p("Failed to create file (untitled name already in use).")},[]),L_=I((K)=>{if(K?.stopPropagation?.(),t)return;let B=L(X0.current);j_(B)},[t,L,j_]);g(()=>{if(typeof window>"u")return;let K=(B)=>{let y=B?.detail?.updates||[];if(!Array.isArray(y)||y.length===0)return;Z((a)=>{let i=a;for(let Z_ of y){if(!Z_?.root)continue;if(!i||Z_.path==="."||!Z_.path)i=Z_.root;else i=O1(i,Z_.path,Z_.root)}if(i)D_.current=r3(i,B_.current,n_.current);return x(!1),i});let C=X0.current;if(Boolean(C)&&y.some((a)=>{let i=a?.path||"";if(!i||i===".")return!0;return C===i||C.startsWith(`${i}/`)||i.startsWith(`${C}/`)}))x0.current.clear();if(!C||!E0.current)return;let h=F_.current?.get(C);if(h&&h.type==="dir")return;if(y.some((a)=>{let i=a?.path||"";if(!i||i===".")return!0;return C===i||C.startsWith(`${i}/`)}))m_.current?.(C)};return window.addEventListener("workspace-update",K),()=>window.removeEventListener("workspace-update",K)},[]),C_.current=f0;let E_=A(()=>{if(typeof window>"u")return;let K=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),B=G0.current??F0.current,y=document.visibilityState!=="hidden"&&(B||K.matches&&F0.current);C2(y,n_.current).catch(()=>{})}).current,u_=A(0),g_=A(()=>{if(u_.current)clearTimeout(u_.current);u_.current=setTimeout(()=>{u_.current=0,E_()},250)}).current;g(()=>{if(F0.current)C_.current?.();g_()},[$,J]),g(()=>{C_.current(),E_();let K=setInterval(()=>C_.current(),k8),B=r0("previewHeight",null),y=Number.isFinite(B)?Math.min(Math.max(B,80),600):280;if(_0.current=y,l_.current)l_.current.style.setProperty("--preview-height",`${y}px`);let C=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),R=()=>g_();if(C.addEventListener)C.addEventListener("change",R);else if(C.addListener)C.addListener(R);return document.addEventListener("visibilitychange",R),()=>{if(clearInterval(K),q_.current)cancelAnimationFrame(q_.current),q_.current=0;if(C.removeEventListener)C.removeEventListener("change",R);else if(C.removeListener)C.removeListener(R);if(document.removeEventListener("visibilitychange",R),u_.current)clearTimeout(u_.current),u_.current=0;if(N_.current)clearTimeout(N_.current),N_.current=null;C2(!1,n_.current).catch(()=>{})}},[]);let x_=I0(()=>e3(X,j,o),[X,j,o]),$0=I0(()=>new Map(x_.map((K)=>[K.node.path,K.node])),[x_]);F_.current=$0;let a_=(V?F_.current.get(V):null)?.type==="dir";g(()=>{if(!V||!a_){O_(null),U0.current=null,H0.current=null;return}let K=V,B=`${o?"hidden":"visible"}:${V}`,y=x0.current,C=y.get(B);if(C?.root){y.delete(B),y.set(B,C);let s=a3(C.root,Boolean(C.truncated),K_);if(s)U0.current=s,H0.current=V,O_({loading:!1,error:null,payload:s});return}let R=U0.current,h=H0.current;O_({loading:!0,error:null,payload:h===V?R:null}),D2(V,w8,o).then((s)=>{if(X0.current!==K)return;let a={root:s?.root,truncated:Boolean(s?.truncated)};y.delete(B),y.set(B,a);while(y.size>M8){let Z_=y.keys().next().value;if(!Z_)break;y.delete(Z_)}let i=a3(a.root,a.truncated,K_);U0.current=i,H0.current=V,O_({loading:!1,error:null,payload:i})}).catch((s)=>{if(X0.current!==K)return;O_({loading:!1,error:s?.message||"Failed to load folder size chart",payload:h===V?R:null})})},[V,a_,o,K_]);let M0=Boolean(F&&F.kind==="text"&&!a_&&(!F.size||F.size<=262144)),v2=M0?"Open in editor":F?.size>262144?"File too large to edit":"File is not editable",P0=(K)=>{let B=K?.target;if(B instanceof Element)return B;return B?.parentElement||null},R0=A((K)=>{if(h_.current)clearTimeout(h_.current),h_.current=null;let y=P0(K)?.closest?.("[data-path]");if(!y)return;let C=y.dataset.path;if(y.dataset.type==="dir"||!C)return;if(p_.current===C)S();N0.current?.(C)}).current,t_=A((K)=>{if(e_.current){e_.current=!1;return}let B=P0(K),y=B?.closest?.("[data-path]");if(y0.current?.focus?.(),!y)return;let C=y.dataset.path,R=y.dataset.type,h=Boolean(B?.closest?.(".workspace-caret")),s=Boolean(B?.closest?.("button"))||Boolean(B?.closest?.("a"))||Boolean(B?.closest?.("input")),a=X0.current===C,i=p_.current;if(i){if(i===C)return;S()}if(a&&!h&&!s&&C!=="."){if(h_.current)clearTimeout(h_.current);h_.current=setTimeout(()=>{h_.current=null,r(C)},350);return}if(R==="dir"){if(W(C),w(null),z(null),f(!1),!B_.current.has(C))k_.current?.(C);if(a&&!h)return;G((W0)=>{let i_=new Set(W0);if(i_.has(C))i_.delete(C);else i_.add(C);return i_})}else{W(C);let Z_=F_.current.get(C);if(Z_)M_.current?.(Z_.path,Z_);m_.current?.(C)}}).current,R2=A(()=>{D_.current="",C_.current(),Array.from(B_.current||[]).filter((B)=>B&&B!==".").forEach((B)=>k_.current?.(B))}).current,c0=A(()=>{W(null),w(null),z(null),f(!1)}).current,K2=A(()=>{Y_((K)=>{let B=!K;if(typeof window<"u")P_("workspaceShowHidden",String(B));return n_.current=B,C2(!0,B).catch(()=>{}),D_.current="",C_.current?.(),Array.from(B_.current||[]).filter((C)=>C&&C!==".").forEach((C)=>k_.current?.(C)),B})}).current,C0=A((K)=>{if(P0(K)?.closest?.("[data-path]"))return;c0()}).current,Y0=I(async(K)=>{if(!K)return;let B=K.split("/").pop()||K;if(!window.confirm(`Delete "${B}"? This cannot be undone.`))return;try{await U3(K);let C=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(X0.current===K)c0();k_.current?.(C),p(null)}catch(C){w((R)=>({...R||{},error:C.message||"Failed to delete file"}))}},[c0]),e0=I((K)=>{let B=y0.current;if(!B||!K||typeof CSS>"u"||typeof CSS.escape!=="function")return;B.querySelector(`[data-path="${CSS.escape(K)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),G2=I((K)=>{let B=x_;if(!B||B.length===0)return;let y=V?B.findIndex((C)=>C.node.path===V):-1;if(K.key==="ArrowDown"){K.preventDefault();let C=Math.min(y+1,B.length-1),R=B[C];if(!R)return;if(W(R.node.path),R.node.type!=="dir")M_.current?.(R.node.path,R.node),m_.current?.(R.node.path);else w(null),f(!1),z(null);e0(R.node.path);return}if(K.key==="ArrowUp"){K.preventDefault();let C=y<=0?0:y-1,R=B[C];if(!R)return;if(W(R.node.path),R.node.type!=="dir")M_.current?.(R.node.path,R.node),m_.current?.(R.node.path);else w(null),f(!1),z(null);e0(R.node.path);return}if(K.key==="ArrowRight"&&y>=0){let C=B[y];if(C?.node?.type==="dir"&&!j.has(C.node.path))K.preventDefault(),k_.current?.(C.node.path),G((R)=>new Set([...R,C.node.path]));return}if(K.key==="ArrowLeft"&&y>=0){let C=B[y];if(C?.node?.type==="dir"&&j.has(C.node.path))K.preventDefault(),G((R)=>{let h=new Set(R);return h.delete(C.node.path),h});return}if(K.key==="Enter"&&y>=0){K.preventDefault();let C=B[y];if(!C)return;let R=C.node.path;if(C.node.type==="dir"){if(!B_.current.has(R))k_.current?.(R);G((s)=>{let a=new Set(s);if(a.has(R))a.delete(R);else a.add(R);return a}),w(null),z(null),f(!1)}else M_.current?.(R,C.node),m_.current?.(R);return}if((K.key==="Delete"||K.key==="Backspace")&&y>=0){let C=B[y];if(!C||C.node.type==="dir")return;K.preventDefault(),Y0(C.node.path);return}if(K.key==="Escape")K.preventDefault(),c0()},[c0,Y0,j,x_,e0,V]),h0=I((K)=>{let B=K?.target?.closest?.(".workspace-row");if(!B)return;let y=B.dataset.type,C=B.dataset.path;if(!C||C===".")return;if(p_.current===C)return;let R=K?.touches?.[0];if(!R)return;if(M.current={path:C,dragging:!1,startX:R.clientX,startY:R.clientY},y!=="file")return;if(N_.current)clearTimeout(N_.current);N_.current=setTimeout(()=>{if(N_.current=null,M.current?.dragging)return;Y0(C)},600)},[Y0]),V2=I(()=>{if(N_.current)clearTimeout(N_.current),N_.current=null;let K=M.current;if(K?.dragging&&K.path){let B=S_.current||f_(),y=k0.current;if(typeof y==="function")y(K.path,B)}M.current={path:null,dragging:!1,startX:0,startY:0},V0.current=0,__(!1),e(null),v_(null),R_(),v0()},[f_,v0,v_,R_]),u2=I((K)=>{let B=M.current,y=K?.touches?.[0];if(!y||!B?.path){if(N_.current)clearTimeout(N_.current),N_.current=null;return}let C=Math.abs(y.clientX-B.startX),R=Math.abs(y.clientY-B.startY),h=C>8||R>8;if(h&&N_.current)clearTimeout(N_.current),N_.current=null;if(!B.dragging&&h)B.dragging=!0,__(!0),e("move"),w0(B.path);if(B.dragging){K.preventDefault(),z0(y.clientX,y.clientY);let s=document.elementFromPoint(y.clientX,y.clientY),a=r_(s)||f_();if(S_.current!==a)v_(a);s_(a)}},[r_,f_,w0,z0,v_,s_]),m2=A((K)=>{K.preventDefault();let B=l_.current;if(!B)return;let y=K.clientY,C=_0.current||280,R=K.currentTarget;R.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let h=y,s=(i)=>{h=i.clientY;let Z_=B.clientHeight-80,W0=Math.min(Math.max(C-(i.clientY-y),80),Z_);B.style.setProperty("--preview-height",`${W0}px`),_0.current=W0},a=()=>{let i=B.clientHeight-80,Z_=Math.min(Math.max(C-(h-y),80),i);_0.current=Z_,R.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",P_("previewHeight",String(Math.round(Z_))),document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",s),document.addEventListener("mouseup",a)}).current,g2=A((K)=>{K.preventDefault();let B=l_.current;if(!B)return;let y=K.touches[0];if(!y)return;let C=y.clientY,R=_0.current||280,h=K.currentTarget;h.classList.add("dragging"),document.body.style.userSelect="none";let s=(i)=>{let Z_=i.touches[0];if(!Z_)return;i.preventDefault();let W0=B.clientHeight-80,i_=Math.min(Math.max(R-(Z_.clientY-C),80),W0);B.style.setProperty("--preview-height",`${i_}px`),_0.current=i_},a=()=>{h.classList.remove("dragging"),document.body.style.userSelect="",P_("previewHeight",String(Math.round(_0.current||R))),document.removeEventListener("touchmove",s),document.removeEventListener("touchend",a),document.removeEventListener("touchcancel",a)};document.addEventListener("touchmove",s,{passive:!1}),document.addEventListener("touchend",a),document.addEventListener("touchcancel",a)}).current,c2=async()=>{if(!V)return;try{let K=await q3(V);if(K.media_id)z(K.media_id)}catch(K){w((B)=>({...B||{},error:K.message||"Failed to attach"}))}},p2=async()=>{if(!V||a_)return;await Y0(V)},b0=(K)=>{return Array.from(K?.dataTransfer?.types||[]).includes("Files")},_2=I((K)=>{if(!b0(K))return;if(K.preventDefault(),V0.current+=1,!d_.current)__(!0);e("upload");let B=Q0(K)||f_();v_(B),s_(B)},[f_,Q0,v_,s_]),u0=I((K)=>{if(!b0(K))return;if(K.preventDefault(),K.dataTransfer)K.dataTransfer.dropEffect="copy";if(!d_.current)__(!0);if(T0.current!=="upload")e("upload");let B=Q0(K)||f_();if(S_.current!==B)v_(B);s_(B)},[f_,Q0,v_,s_]),h2=I((K)=>{if(!b0(K))return;if(K.preventDefault(),V0.current=Math.max(0,V0.current-1),V0.current===0)__(!1),e(null),v_(null),R_()},[v_,R_]),i0=I(async(K,B=".")=>{let y=Array.from(K||[]);if(y.length===0)return;let C=B&&B!==""?B:".",R=C!=="."?C:"workspace root";V_(!0);try{let h=null;for(let s of y)try{h=await J1(s,C)}catch(a){let i=a?.status,Z_=a?.code;if(i===409||Z_==="file_exists"){let W0=s?.name||"file";if(!window.confirm(`"${W0}" already exists in ${R}. Overwrite?`))continue;h=await J1(s,C,{overwrite:!0})}else throw a}if(h?.path)W(h.path),m_.current?.(h.path);k_.current?.(C)}catch(h){p(h.message||"Failed to upload file")}finally{V_(!1)}},[]),i2=I(async(K,B)=>{if(!K)return;let y=F_.current?.get(K);if(!y)return;let C=B&&B!==""?B:".",R=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(C===R)return;try{let s=(await z3(K,C))?.path||K;if(y.type==="dir")G((a)=>{let i=new Set;for(let Z_ of a)if(Z_===K)i.add(s);else if(Z_.startsWith(`${K}/`))i.add(`${s}${Z_.slice(K.length)}`);else i.add(Z_);return i});if(W(s),y.type==="dir")w(null),f(!1),z(null);else m_.current?.(s);k_.current?.(R),k_.current?.(C)}catch(h){p(h?.message||"Failed to move entry")}},[]);k0.current=i2;let l2=I(async(K)=>{if(!b0(K))return;K.preventDefault(),V0.current=0,__(!1),e(null),$_(null),R_();let B=Array.from(K?.dataTransfer?.files||[]);if(B.length===0)return;let y=S_.current||Q0(K)||f_();await i0(B,y)},[f_,Q0,i0]),o2=I((K)=>{if(K?.stopPropagation?.(),t)return;let B=K?.currentTarget?.dataset?.uploadTarget||".";K0.current=B,j0.current?.click()},[t]),n2=I(()=>{if(t)return;let K=X0.current,B=K?F_.current?.get(K):null;K0.current=B?.type==="dir"?B.path:".",j0.current?.click()},[t]),k1=I((K)=>{if(!K||K.button!==0)return;let B=K.currentTarget;if(!B||!B.dataset)return;let y=B.dataset.path;if(!y||y===".")return;if(p_.current===y)return;if(K.target?.closest?.("button, a, input, .workspace-caret"))return;K.preventDefault(),n.current={path:y,dragging:!1,startX:K.clientX,startY:K.clientY};let C=(h)=>{let s=n.current;if(!s?.path)return;let a=Math.abs(h.clientX-s.startX),i=Math.abs(h.clientY-s.startY),Z_=a>4||i>4;if(!s.dragging&&Z_)s.dragging=!0,e_.current=!0,__(!0),e("move"),w0(s.path),z0(h.clientX,h.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(s.dragging){h.preventDefault(),z0(h.clientX,h.clientY);let W0=document.elementFromPoint(h.clientX,h.clientY),i_=r_(W0)||f_();if(S_.current!==i_)v_(i_);s_(i_)}},R=()=>{document.removeEventListener("mousemove",C),document.removeEventListener("mouseup",R);let h=n.current;if(h?.dragging&&h.path){let s=S_.current||f_(),a=k0.current;if(typeof a==="function")a(h.path,s)}n.current={path:null,dragging:!1,startX:0,startY:0},V0.current=0,__(!1),e(null),v_(null),R_(),v0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{e_.current=!1},0)};document.addEventListener("mousemove",C),document.addEventListener("mouseup",R)},[r_,f_,w0,z0,v0,v_,s_,R_]),d2=I(async(K)=>{let B=Array.from(K?.target?.files||[]);if(B.length===0)return;let y=K0.current||".";if(await i0(B,y),K0.current=".",K?.target)K.target.value=""},[i0]);return q`
        <aside
            class=${`workspace-sidebar${d?" workspace-drop-active":""}`}
            ref=${l_}
            onDragEnter=${_2}
            onDragOver=${u0}
            onDragLeave=${h2}
            onDrop=${l2}
        >
            <input type="file" multiple style="display:none" ref=${j0} onChange=${d2} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${L_} title="New file" disabled=${t}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${R2} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${o?" active":""}`}
                        onClick=${K2}
                        title=${o?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!o&&q`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${C0}>
                ${t&&q`<div class="workspace-drop-hint">Uploading…</div>`}
                ${k&&q`<div class="workspace-loading">Loading…</div>`}
                ${m&&q`<div class="workspace-error">${m}</div>`}
                ${X&&q`
                    <div
                        class="workspace-tree-list"
                        ref=${y0}
                        tabIndex="0"
                        onClick=${t_}
                        onDblClick=${R0}
                        onKeyDown=${G2}
                        onTouchStart=${h0}
                        onTouchEnd=${V2}
                        onTouchMove=${u2}
                        onTouchCancel=${V2}
                    >
                        ${x_.map(({node:K,depth:B})=>{let y=K.type==="dir",C=K.path===V,R=K.path===Q,h=y&&j.has(K.path),s=y_&&K.path===y_,a=Array.isArray(K.children)&&K.children.length>0?K.children.length:Number(K.child_count)||0;return q`
                                <div
                                    key=${K.path}
                                    class=${`workspace-row${C?" selected":""}${s?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+B*y8}px`}}
                                    data-path=${K.path}
                                    data-type=${K.type}
                                    onMouseDown=${k1}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${y?h?q`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:q`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${y?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${y?q`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:q`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${R?q`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${c_}
                                                value=${H}
                                                onInput=${(i)=>E(i?.target?.value||"")}
                                                onKeyDown=${(i)=>{if(i.key==="Enter")i.preventDefault(),Q_();else if(i.key==="Escape")i.preventDefault(),S()}}
                                                onBlur=${S}
                                                onClick=${(i)=>i.stopPropagation()}
                                            />
                                        `:q`<span class="workspace-label">${K.name}</span>`}
                                    ${y&&!h&&a>0&&q`
                                        <span class="workspace-count">${a}</span>
                                    `}
                                    ${y&&q`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${K.path}
                                            title="Upload files to this folder"
                                            onClick=${o2}
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
                <div class="workspace-preview-splitter-h" onMouseDown=${m2} onTouchStart=${g2}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${V}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${L_} title="New file" disabled=${t}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!a_&&q`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>M0&&N0.current?.(V,F)}
                                    title=${v2}
                                    disabled=${!M0}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${p2}
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
                            ${a_?q`
                                    <button class="workspace-download" onClick=${n2}
                                        title="Upload files to this folder" disabled=${t}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${H3(V,o)}
                                        title="Download folder as zip" onClick=${(K)=>K.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:q`<button class="workspace-download" onClick=${c2} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${D&&q`<div class="workspace-loading">Loading preview…</div>`}
                    ${F?.error&&q`<div class="workspace-error">${F.error}</div>`}
                    ${a_&&q`
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
                    ${F&&!F.error&&!a_&&q`
                        <div class="workspace-preview-meta">
                            ${F.size?q`<span>${S0(F.size)}</span>`:""}
                            ${F.mtime?q`<span>${I2(F.mtime)}</span>`:""}
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
                <div class="workspace-drag-ghost" ref=${L0}>${G_.label}</div>
            `}
        </aside>
    `}function K4({tabs:_,activeId:$,onActivate:J,onClose:Y,onCloseOthers:X,onCloseAll:Z,onTogglePin:j,onTogglePreview:G,previewTabs:V,onToggleDock:W,dockVisible:Q}){let[U,H]=T(null),E=A(null);g(()=>{if(!U)return;let z=(k)=>{if(k.type==="keydown"&&k.key!=="Escape")return;H(null)};return document.addEventListener("click",z),document.addEventListener("keydown",z),()=>{document.removeEventListener("click",z),document.removeEventListener("keydown",z)}},[U]),g(()=>{let z=(k)=>{if(k.ctrlKey&&k.key==="Tab"){if(k.preventDefault(),!_.length)return;let x=_.findIndex((D)=>D.id===$);if(k.shiftKey){let D=_[(x-1+_.length)%_.length];J?.(D.id)}else{let D=_[(x+1)%_.length];J?.(D.id)}return}if((k.ctrlKey||k.metaKey)&&k.key==="w"){let x=document.querySelector(".editor-pane");if(x&&x.contains(document.activeElement)){if(k.preventDefault(),$)Y?.($)}}};return document.addEventListener("keydown",z),()=>document.removeEventListener("keydown",z)},[_,$,J,Y]);let F=I((z,k)=>{if(z.button===1){z.preventDefault(),Y?.(k);return}if(z.button===0)J?.(k)},[J,Y]),w=I((z,k)=>{z.preventDefault(),H({id:k,x:z.clientX,y:z.clientY})},[]),b=I((z,k)=>{z.stopPropagation(),Y?.(k)},[Y]);if(g(()=>{if(!$||!E.current)return;let z=E.current.querySelector(".tab-item.active");if(z)z.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return q`
        <div class="tab-strip" ref=${E} role="tablist">
            ${_.map((z)=>q`
                <div
                    key=${z.id}
                    class=${`tab-item${z.id===$?" active":""}${z.dirty?" dirty":""}${z.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${z.id===$}
                    title=${z.path}
                    onMouseDown=${(k)=>F(k,z.id)}
                    onContextMenu=${(k)=>w(k,z.id)}
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
        ${U&&q`
            <div class="tab-context-menu" style=${{left:U.x+"px",top:U.y+"px"}}>
                <button onClick=${()=>{Y?.(U.id),H(null)}}>Close</button>
                <button onClick=${()=>{X?.(U.id),H(null)}}>Close Others</button>
                <button onClick=${()=>{Z?.(),H(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{j?.(U.id),H(null)}}>
                    ${_.find((z)=>z.id===U.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${G&&/\.(md|mdx|markdown)$/i.test(U.id)&&q`
                    <hr />
                    <button onClick=${()=>{G(U.id),H(null)}}>
                        ${V?.has(U.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var I8=400,z1=60,G4=220,U1="mdPreviewHeight";function S8(){try{let _=localStorage.getItem(U1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=z1?$:G4}catch{return G4}}function V4({getContent:_,path:$,onClose:J}){let[Y,X]=T(""),[Z,j]=T(S8),G=A(null),V=A(null),W=A(""),Q=A(_);return Q.current=_,g(()=>{let E=()=>{let w=Q.current?.()||"";if(w===W.current)return;W.current=w;try{let b=t0(w,null,{sanitize:!1});X(b)}catch{X('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};E();let F=setInterval(E,I8);return()=>clearInterval(F)},[]),g(()=>{if(G.current&&Y)b2(G.current).catch(()=>{})},[Y]),q`
        <div
            class="md-preview-splitter"
            onMouseDown=${(E)=>{E.preventDefault();let F=E.clientY,w=V.current?.offsetHeight||Z,b=V.current?.parentElement,z=b?b.offsetHeight*0.7:500,k=E.currentTarget;k.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let x=(f)=>{let m=Math.min(Math.max(w-(f.clientY-F),z1),z);j(m)},D=()=>{k.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(U1,String(Math.round(V.current?.offsetHeight||Z)))}catch{}document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",D)};document.addEventListener("mousemove",x),document.addEventListener("mouseup",D)}}
            onTouchStart=${(E)=>{E.preventDefault();let F=E.touches[0];if(!F)return;let w=F.clientY,b=V.current?.offsetHeight||Z,z=V.current?.parentElement,k=z?z.offsetHeight*0.7:500,x=E.currentTarget;x.classList.add("dragging"),document.body.style.userSelect="none";let D=(m)=>{let p=m.touches[0];if(!p)return;m.preventDefault();let o=Math.min(Math.max(b-(p.clientY-w),z1),k);j(o)},f=()=>{x.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(U1,String(Math.round(V.current?.offsetHeight||Z)))}catch{}document.removeEventListener("touchmove",D),document.removeEventListener("touchend",f),document.removeEventListener("touchcancel",f)};document.addEventListener("touchmove",D,{passive:!1}),document.addEventListener("touchend",f),document.addEventListener("touchcancel",f)}}
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
    `}class W4{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,J=-1/0;for(let Y of this.extensions.values()){if(Y.placement!=="tabs")continue;if(!Y.canHandle)continue;try{let X=Y.canHandle(_);if(X===!1||X===0)continue;let Z=X===!0?0:typeof X==="number"?X:0;if(Z>J)J=Z,$=Y}catch(X){console.warn(`[PaneRegistry] canHandle() error for "${Y.id}":`,X)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var q0=new W4;var T2=null,H1=null;function O4(){if(H1)return Promise.resolve(H1);if(!T2)T2=import("/static/dist/editor.bundle.js").then((_)=>{return H1=_,_}).catch((_)=>{throw T2=null,_});return T2}class q4{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await O4();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){if(this.queuedViewStateCb=_,this.real&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(_)}restoreViewState(_){if(this.queuedViewState=_,this.real&&typeof this.real.restoreViewState==="function")this.real.restoreViewState(_)}getPath(){if(this.real&&typeof this.real.getPath==="function")return this.real.getPath();return this.context.path||""}setPath(_){if(this.real&&typeof this.real.setPath==="function")this.real.setPath(_)}}var F1={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;return 1},mount(_,$){return new q4(_,$)}};function L1(){O4().catch(()=>{})}class N4{container;disposed=!1;termEl;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0");let J=document.createElement("div");J.className="terminal-pane-header";let Y=document.createElement("span");Y.className="terminal-pane-title",Y.textContent="Terminal";let X=document.createElement("span");X.className="terminal-pane-status",X.textContent="Not connected",J.append(Y,X);let Z=document.createElement("div");Z.className="terminal-pane-body",Z.innerHTML='<div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>',this.termEl.append(J,Z),_.appendChild(this.termEl)}getContent(){return}isDirty(){return!1}focus(){this.termEl?.focus()}resize(){}dispose(){if(this.disposed)return;this.disposed=!0,this.termEl?.remove()}}var E1={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new N4(_,$)}};class B4{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let J of this.listeners)try{J(_,$)}catch{}}open(_,$){let J=this.tabs.get(_);if(!J)J={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,J);return this.activate(_),J}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,J]of this.tabs)if($!==_&&!J.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((Y)=>Y!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let J=this.tabs.get(_);if(!J||J.dirty===$)return;J.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let J=this.tabs.get(_);if(J)J.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,J){let Y=this.tabs.get(_);if(!Y)return;if(this.tabs.delete(_),Y.id=$,Y.path=$,Y.label=J||$.split("/").pop()||$,this.tabs.set($,Y),this.mruOrder=this.mruOrder.map((X)=>X===_?$:X),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Y)=>Y.id===this.activeId),J=_[($+1)%_.length];this.activate(J.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Y)=>Y.id===this.activeId),J=_[($-1+_.length)%_.length];this.activate(J.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var U_=new B4;function z4({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:J}){g(()=>{J();let Y=new Z1(_,$);Y.connect();let X=()=>{Y.reconnectIfNeeded()};return window.addEventListener("focus",X),document.addEventListener("visibilitychange",X),()=>{window.removeEventListener("focus",X),document.removeEventListener("visibilitychange",X),Y.disconnect()}},[$,_,J])}function U4(){let[_,$]=T(!1),[J,Y]=T("default"),X=A(!1);g(()=>{let V=d0("notificationsEnabled",!1);if(X.current=V,$(V),typeof Notification<"u")Y(Notification.permission)},[]),g(()=>{X.current=_},[_]);let Z=I(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let V=Notification.requestPermission();if(V&&typeof V.then==="function")return V;return Promise.resolve(V)}catch{return Promise.resolve("default")}},[]),j=I(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){Y("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let W=await Z();if(Y(W||"default"),W!=="granted"){X.current=!1,$(!1),P_("notificationsEnabled","false");return}}let V=!X.current;X.current=V,$(V),P_("notificationsEnabled",String(V))},[Z]),G=I((V,W)=>{if(!X.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let Q=new Notification(V,{body:W});return Q.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:J,toggleNotifications:j,notify:G}}var j2=(_)=>{let $=new Set;return(_||[]).filter((J)=>{if(!J||$.has(J.id))return!1;return $.add(J.id),!0})};function H4({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[J,Y]=T(null),[X,Z]=T(!1),j=A(!1),G=A(null),V=A(!1),W=A(null);g(()=>{j.current=X},[X]);let Q=I(async(E=null)=>{try{if(E){let F=await J3(E);Y(F.posts),Z(!1)}else{let F=await L2(10);Y(F.posts),Z(F.has_more)}}catch(F){console.error("Failed to load posts:",F)}},[]),U=I(async()=>{try{let E=await L2(10);Y((F)=>{if(!F||F.length===0)return E.posts;return j2([...E.posts,...F])}),Z((F)=>F||E.has_more)}catch(E){console.error("Failed to refresh timeline:",E)}},[]),H=I(async(E={})=>{if(!J||J.length===0)return;if(V.current)return;let{preserveScroll:F=!0,preserveMode:w="top",allowRepeat:b=!1}=E,z=(D)=>{if(!F){D();return}if(w==="top")$(D);else _(D)},x=J.slice().sort((D,f)=>D.id-f.id)[0]?.id;if(!Number.isFinite(x))return;if(!b&&W.current===x)return;V.current=!0,W.current=x;try{let D=await L2(10,x);if(D.posts.length>0)z(()=>{Y((f)=>j2([...D.posts,...f||[]])),Z(D.has_more)});else Z(!1)}catch(D){console.error("Failed to load more posts:",D)}finally{V.current=!1}},[J,_,$]);return g(()=>{G.current=H},[H]),{posts:J,setPosts:Y,hasMore:X,setHasMore:Z,hasMoreRef:j,loadPosts:Q,refreshTimeline:U,loadMore:H,loadMoreRef:G,loadingMoreRef:V,lastBeforeIdRef:W}}function F4(){let[_,$]=T(null),[J,Y]=T({text:"",totalLines:0}),[X,Z]=T(""),[j,G]=T({text:"",totalLines:0}),[V,W]=T(null),[Q,U]=T(null),[H,E]=T(null),F=A(null),w=A(0),b=A(!1),z=A(""),k=A(""),x=A(null),D=A(null),f=A(null),m=A(null),p=A(!1),o=A(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:J,setAgentDraft:Y,agentPlan:X,setAgentPlan:Z,agentThought:j,setAgentThought:G,pendingRequest:V,setPendingRequest:W,currentTurnId:Q,setCurrentTurnId:U,steerQueuedTurnId:H,setSteerQueuedTurnId:E,lastAgentEventRef:F,lastSilenceNoticeRef:w,isAgentRunningRef:b,draftBufferRef:z,thoughtBufferRef:k,pendingRequestRef:x,stalledPostIdRef:D,currentTurnIdRef:f,steerQueuedTurnIdRef:m,thoughtExpandedRef:p,draftExpandedRef:o}}function L4({appShellRef:_,sidebarWidthRef:$,editorWidthRef:J,dockHeightRef:Y}){let X=A((Q)=>{Q.preventDefault();let U=_.current;if(!U)return;let H=Q.clientX,E=$.current||280,F=Q.currentTarget;F.classList.add("dragging"),U.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let w=H,b=(k)=>{w=k.clientX;let x=Math.min(Math.max(E+(k.clientX-H),160),600);U.style.setProperty("--sidebar-width",`${x}px`),$.current=x},z=()=>{let k=Math.min(Math.max(E+(w-H),160),600);$.current=k,F.classList.remove("dragging"),U.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",P_("sidebarWidth",String(Math.round(k))),document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",b),document.addEventListener("mouseup",z)}).current,Z=A((Q)=>{Q.preventDefault();let U=_.current;if(!U)return;let H=Q.touches[0];if(!H)return;let E=H.clientX,F=$.current||280,w=Q.currentTarget;w.classList.add("dragging"),U.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let b=(k)=>{let x=k.touches[0];if(!x)return;k.preventDefault();let D=Math.min(Math.max(F+(x.clientX-E),160),600);U.style.setProperty("--sidebar-width",`${D}px`),$.current=D},z=()=>{w.classList.remove("dragging"),U.classList.remove("sidebar-resizing"),document.body.style.userSelect="",P_("sidebarWidth",String(Math.round($.current||F))),document.removeEventListener("touchmove",b),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",b,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current,j=A((Q)=>{Q.preventDefault();let U=_.current;if(!U)return;let H=Q.clientX,E=J.current||$.current||280,F=Q.currentTarget;F.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let w=H,b=(k)=>{w=k.clientX;let x=Math.min(Math.max(E+(k.clientX-H),200),800);U.style.setProperty("--editor-width",`${x}px`),J.current=x},z=()=>{let k=Math.min(Math.max(E+(w-H),200),800);J.current=k,F.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",P_("editorWidth",String(Math.round(k))),document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",b),document.addEventListener("mouseup",z)}).current,G=A((Q)=>{Q.preventDefault();let U=_.current;if(!U)return;let H=Q.touches[0];if(!H)return;let E=H.clientX,F=J.current||$.current||280,w=Q.currentTarget;w.classList.add("dragging"),document.body.style.userSelect="none";let b=(k)=>{let x=k.touches[0];if(!x)return;k.preventDefault();let D=Math.min(Math.max(F+(x.clientX-E),200),800);U.style.setProperty("--editor-width",`${D}px`),J.current=D},z=()=>{w.classList.remove("dragging"),document.body.style.userSelect="",P_("editorWidth",String(Math.round(J.current||F))),document.removeEventListener("touchmove",b),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",b,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current,V=A((Q)=>{Q.preventDefault();let U=_.current;if(!U)return;let H=Q.clientY,E=Y?.current||200,F=Q.currentTarget;F.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let w=H,b=(k)=>{w=k.clientY;let x=Math.min(Math.max(E-(k.clientY-H),100),window.innerHeight*0.5);if(U.style.setProperty("--dock-height",`${x}px`),Y)Y.current=x},z=()=>{let k=Math.min(Math.max(E-(w-H),100),window.innerHeight*0.5);if(Y)Y.current=k;F.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",P_("dockHeight",String(Math.round(k))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",b),document.addEventListener("mouseup",z)}).current,W=A((Q)=>{Q.preventDefault();let U=_.current;if(!U)return;let H=Q.touches[0];if(!H)return;let E=H.clientY,F=Y?.current||200,w=Q.currentTarget;w.classList.add("dragging"),document.body.style.userSelect="none";let b=(k)=>{let x=k.touches[0];if(!x)return;k.preventDefault();let D=Math.min(Math.max(F-(x.clientY-E),100),window.innerHeight*0.5);if(U.style.setProperty("--dock-height",`${D}px`),Y)Y.current=D},z=()=>{w.classList.remove("dragging"),document.body.style.userSelect="",P_("dockHeight",String(Math.round(Y?.current||F))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",b),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",b,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current;return{handleSplitterMouseDown:X,handleSplitterTouchStart:Z,handleEditorSplitterMouseDown:j,handleEditorSplitterTouchStart:G,handleDockSplitterMouseDown:V,handleDockSplitterTouchStart:W}}function E4({onTabClosed:_}={}){let $=A(_);$.current=_;let[J,Y]=T(()=>U_.getTabs()),[X,Z]=T(()=>U_.getActiveId()),[j,G]=T(()=>U_.getTabs().length>0);g(()=>{return U_.onChange((D,f)=>{Y(D),Z(f),G(D.length>0)})},[]);let[V,W]=T(()=>new Set),Q=I((D)=>{W((f)=>{let m=new Set(f);if(m.has(D))m.delete(D);else m.add(D);return m})},[]),U=I((D)=>{W((f)=>{if(!f.has(D))return f;let m=new Set(f);return m.delete(D),m})},[]),H=I((D)=>{if(!D)return;let f={path:D,mode:"edit"};try{if(!q0.resolve(f)){if(!q0.get("editor")){console.warn(`[openEditor] No pane handler for: ${D}`);return}}}catch(m){console.warn(`[openEditor] paneRegistry.resolve() error for "${D}":`,m)}U_.open(D)},[]),E=I(()=>{let D=U_.getActiveId();if(D){let f=U_.get(D);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}U_.close(D),U(D),$.current?.(D)}},[U]),F=I((D)=>{let f=U_.get(D);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}U_.close(D),U(D),$.current?.(D)},[U]),w=I((D)=>{U_.activate(D)},[]),b=I((D)=>{let f=U_.getTabs().filter((o)=>o.id!==D&&!o.pinned),m=f.filter((o)=>o.dirty).length;if(m>0){if(!window.confirm(`${m} unsaved tab${m>1?"s":""} will be closed. Continue?`))return}let p=f.map((o)=>o.id);U_.closeOthers(D),p.forEach((o)=>{U(o),$.current?.(o)})},[U]),z=I(()=>{let D=U_.getTabs().filter((p)=>!p.pinned),f=D.filter((p)=>p.dirty).length;if(f>0){if(!window.confirm(`${f} unsaved tab${f>1?"s":""} will be closed. Continue?`))return}let m=D.map((p)=>p.id);U_.closeAll(),m.forEach((p)=>{U(p),$.current?.(p)})},[U]),k=I((D)=>{U_.togglePin(D)},[]),x=I(()=>{let D=U_.getActiveId();if(D)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:D}}))},[]);return g(()=>{let D=(f)=>{let{oldPath:m,newPath:p,type:o}=f.detail||{};if(!m||!p)return;if(o==="dir"){for(let Y_ of U_.getTabs())if(Y_.path===m||Y_.path.startsWith(`${m}/`)){let d=`${p}${Y_.path.slice(m.length)}`;U_.rename(Y_.id,d)}}else U_.rename(m,p)};return window.addEventListener("workspace-file-renamed",D),()=>window.removeEventListener("workspace-file-renamed",D)},[]),g(()=>{let D=(f)=>{if(U_.hasUnsaved())f.preventDefault(),f.returnValue=""};return window.addEventListener("beforeunload",D),()=>window.removeEventListener("beforeunload",D)},[]),{editorOpen:j,tabStripTabs:J,tabStripActiveId:X,previewTabs:V,openEditor:H,closeEditor:E,handleTabClose:F,handleTabActivate:w,handleTabCloseOthers:b,handleTabCloseAll:z,handleTabTogglePin:k,handleTabTogglePreview:Q,revealInExplorer:x}}function D1(_,$){try{if(typeof window>"u")return $;let J=window.__PICLAW_SILENCE||{},Y=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,X=J[_]??window[Y],Z=Number(X);return Number.isFinite(Z)?Z:$}catch{return $}}var C1=D1("warning",30000),D4=D1("finalize",120000),C4=D1("refresh",30000),y4=30000;function k4(_){let $={};return(_?.agents||[]).forEach((J)=>{$[J.id]=J}),$}function A4(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function w4(_=30000){let[,$]=T(0);g(()=>{let J=setInterval(()=>$((Y)=>Y+1),_);return()=>clearInterval(J)},[_])}function f2(_,$=160){let J=String(_||"").replace(/\r\n/g,`
`);if(!J)return 0;return J.split(`
`).reduce((Y,X)=>Y+Math.max(1,Math.ceil(X.length/$)),0)}function S4(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var x8=Y3,M4=Z3,T8=X3,P4=G3,b4=V3,I4=Q3,y1=typeof _1==="function"?_1:S4("getAgentContext",null),f8=typeof Y2==="function"?Y2:S4("getAgentModels",{current:null,models:[]});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});q0.register(F1);L1();var v8=typeof localStorage<"u"&&localStorage.getItem("experimentalPanes")==="true";if(v8)q0.register(E1);function R8(){let[_,$]=T("disconnected"),[J,Y]=T(null),[X,Z]=T(null),[j,G]=T(!1),[V,W]=T([]),[Q,U]=T([]),{agentStatus:H,setAgentStatus:E,agentDraft:F,setAgentDraft:w,agentPlan:b,setAgentPlan:z,agentThought:k,setAgentThought:x,pendingRequest:D,setPendingRequest:f,currentTurnId:m,setCurrentTurnId:p,steerQueuedTurnId:o,setSteerQueuedTurnId:Y_,lastAgentEventRef:d,lastSilenceNoticeRef:__,isAgentRunningRef:z_,draftBufferRef:e,thoughtBufferRef:G_,pendingRequestRef:H_,stalledPostIdRef:y_,currentTurnIdRef:$_,steerQueuedTurnIdRef:t,thoughtExpandedRef:V_,draftExpandedRef:J_}=F4(),[O_,K_]=T({}),[A_,B_]=T(null),[D_,b_]=T(null),[q_,T_]=T(!1),[C_,F_]=T(null),{notificationsEnabled:M_,notificationPermission:N0,toggleNotifications:m_,notify:k_}=U4(),[l_,y0]=T(()=>new Set),[c_,j0]=T(()=>d0("workspaceOpen",!0)),K0=A(null),{editorOpen:N_,tabStripTabs:M,tabStripActiveId:n,previewTabs:I_,openEditor:e_,closeEditor:_0,handleTabClose:x0,handleTabActivate:U0,handleTabCloseOthers:H0,handleTabCloseAll:n_,handleTabTogglePin:F0,handleTabTogglePreview:G0,revealInExplorer:V0}=E4({onTabClosed:(O)=>K0.current?.(O)}),S_=A(null),d_=A(null);g(()=>{let O=S_.current;if(!O)return;if(d_.current)d_.current.dispose(),d_.current=null;let N=n;if(!N)return;let P={path:N,mode:"edit"},u=q0.resolve(P)||q0.get("editor");if(!u){O.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let c=u.mount(O,P);d_.current=c,c.onDirtyChange?.((l)=>{U_.setDirty(N,l)}),c.onSaveRequest?.(()=>{}),c.onClose?.(()=>{_0()});let v=U_.getViewState(N);if(v&&typeof c.restoreViewState==="function")requestAnimationFrame(()=>c.restoreViewState(v));if(typeof c.onViewStateChange==="function")c.onViewStateChange((l)=>{U_.saveViewState(N,l)});return requestAnimationFrame(()=>c.focus()),()=>{if(d_.current===c)c.dispose(),d_.current=null}},[n,_0]);let[T0,L0]=T({name:"You",avatar_url:null,avatar_background:null}),B0=A(!1),Z0=A(!1),k0=A({}),X0=A({name:null,avatar_url:null}),p_=A({currentHashtag:null,searchQuery:null}),h_=A(null),E0=A(null),A0=A(0),f0=A(0),D0=A(0),f_=A(null),r_=A(null),Q0=A(null),v_=A(0),R_=A({title:null,avatarBase:null});w4(30000),g(()=>{return w3()},[]),g(()=>{P_("workspaceOpen",String(c_))},[c_]),g(()=>{k0.current=O_||{}},[O_]),g(()=>{X0.current=T0||{name:"You",avatar_url:null,avatar_background:null}},[T0]);let s_=I((O,N,P=null)=>{if(typeof document>"u")return;let u=(O||"").trim()||"PiClaw";if(R_.current.title!==u){document.title=u;let w_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(w_&&w_.getAttribute("content")!==u)w_.setAttribute("content",u);R_.current.title=u}let c=document.getElementById("dynamic-favicon");if(!c)return;let v=c.getAttribute("data-default")||c.getAttribute("href")||"/favicon.ico",l=N||v,W_=N?`${l}|${P||""}`:l;if(R_.current.avatarBase!==W_){let w_=N?`${l}${l.includes("?")?"&":"?"}v=${P||Date.now()}`:l;c.setAttribute("href",w_),R_.current.avatarBase=W_}},[]),z0=I((O)=>{if(!O)return;W((N)=>N.includes(O)?N:[...N,O])},[]),w0=I((O)=>{W((N)=>N.filter((P)=>P!==O))},[]);K0.current=w0;let v0=I(()=>{W([])},[]),L=I(()=>{let O=n;if(O)z0(O)},[n,z0]),S=I((O)=>{if(!O)return;U((N)=>N.includes(O)?N:[...N,O])},[]),r=I((O)=>{U((N)=>N.filter((P)=>P!==O))},[]),Q_=I(()=>{U([])},[]),j_=I((O={})=>{let N=Date.now();if(d.current=N,O.running)z_.current=!0;if(O.clearSilence)__.current=0},[]),L_=I(()=>{if(Q0.current)clearTimeout(Q0.current),Q0.current=null;v_.current=0},[]);g(()=>()=>{L_()},[L_]);let E_=I(()=>{L_(),E((O)=>{if(!O)return O;if(!(O.last_activity||O.lastActivity))return O;let{last_activity:N,lastActivity:P,...u}=O;return u})},[L_]),u_=I((O)=>{if(!O)return;L_();let N=Date.now();v_.current=N,E({type:O.type||"active",last_activity:!0}),Q0.current=setTimeout(()=>{if(v_.current!==N)return;E((P)=>{if(!P||!(P.last_activity||P.lastActivity))return P;return null})},y4)},[L_]),g_=I(()=>{z_.current=!1,d.current=null,__.current=0,e.current="",G_.current="",H_.current=null,r_.current=null,$_.current=null,t.current=null,L_(),p(null),Y_(null),V_.current=!1,J_.current=!1},[L_,p,Y_]),x_=I((O)=>{if(!O)return;if($_.current===O)return;$_.current=O,p(O),t.current=null,Y_(null),e.current="",G_.current="",w({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null),H_.current=null,r_.current=null,V_.current=!1,J_.current=!1},[p,Y_]),$0=I((O)=>{if(typeof document<"u"){let w_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&w_)return}let N=r_.current;if(!N||!N.post)return;if(O&&N.turnId&&N.turnId!==O)return;let P=N.post;if(P.id&&f_.current===P.id)return;let u=String(P?.data?.content||"").trim();if(!u)return;f_.current=P.id||f_.current,r_.current=null;let c=u.replace(/\s+/g," ").slice(0,200),v=k0.current||{},W_=(P?.data?.agent_id?v[P.data.agent_id]:null)?.name||"Pi";k_(W_,c)},[k_]),J0=I(async(O,N)=>{if(O!=="thought"&&O!=="draft")return;let P=$_.current;if(O==="thought"){if(V_.current=N,P)try{await b4(P,"thought",N)}catch(u){console.warn("Failed to update thought visibility:",u)}if(!N)return;try{let u=P?await P4(P,"thought"):null;if(u?.text)G_.current=u.text;x((c)=>({...c||{text:"",totalLines:0},fullText:G_.current||c?.fullText||"",totalLines:Number.isFinite(u?.total_lines)?u.total_lines:c?.totalLines||0}))}catch(u){console.warn("Failed to fetch full thought:",u)}return}if(J_.current=N,P)try{await b4(P,"draft",N)}catch(u){console.warn("Failed to update draft visibility:",u)}if(!N)return;try{let u=P?await P4(P,"draft"):null;if(u?.text)e.current=u.text;w((c)=>({...c||{text:"",totalLines:0},fullText:e.current||c?.fullText||"",totalLines:Number.isFinite(u?.total_lines)?u.total_lines:c?.totalLines||0}))}catch(u){console.warn("Failed to fetch full draft:",u)}},[]),a_=A(null),M0=I(()=>{if(h_.current)h_.current.scrollTop=0},[]);a_.current=M0;let v2=I((O)=>{let N=h_.current;if(!N||typeof O!=="function"){O?.();return}let{currentHashtag:P,searchQuery:u}=p_.current||{},c=!(u&&!P),v=c?N.scrollHeight-N.scrollTop:N.scrollTop;O(),requestAnimationFrame(()=>{let l=h_.current;if(!l)return;if(c){let W_=Math.max(l.scrollHeight-v,0);l.scrollTop=W_}else{let W_=Math.max(l.scrollHeight-l.clientHeight,0),w_=Math.min(v,W_);l.scrollTop=w_}})},[]),P0=I((O)=>{let N=h_.current;if(!N||typeof O!=="function"){O?.();return}let P=N.scrollTop;O(),requestAnimationFrame(()=>{let u=h_.current;if(!u)return;let c=Math.max(u.scrollHeight-u.clientHeight,0);u.scrollTop=Math.min(P,c)})},[]),{posts:R0,setPosts:t_,hasMore:R2,setHasMore:c0,hasMoreRef:K2,loadPosts:C0,refreshTimeline:Y0,loadMore:e0,loadMoreRef:G2}=H4({preserveTimelineScroll:v2,preserveTimelineScrollTop:P0}),h0=I(()=>{let O=y_.current;if(!O)return;t_((N)=>N?N.filter((P)=>P.id!==O):N),y_.current=null},[t_]),{handleSplitterMouseDown:V2,handleSplitterTouchStart:u2,handleEditorSplitterMouseDown:m2,handleEditorSplitterTouchStart:g2,handleDockSplitterMouseDown:c2,handleDockSplitterTouchStart:p2}=L4({appShellRef:E0,sidebarWidthRef:A0,editorWidthRef:f0,dockHeightRef:D0}),b0=I(()=>{if(!z_.current)return;z_.current=!1,__.current=0,d.current=null,$_.current=null,p(null),V_.current=!1,J_.current=!1;let O=(e.current||"").trim();if(e.current="",G_.current="",w({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null),H_.current=null,r_.current=null,!O){E({type:"error",title:"Response stalled — No content received"});return}let P=`${O}${`

⚠️ Response may be incomplete — the model stopped responding`}`,u=Date.now(),c=new Date().toISOString(),v={id:u,timestamp:c,data:{type:"agent_response",content:P,agent_id:"default",is_local_stall:!0}};y_.current=u,t_((l)=>l?j2([...l,v]):[v]),a_.current?.(),E(null)},[p]);g(()=>{p_.current={currentHashtag:J,searchQuery:X}},[J,X]),g(()=>{let O=Math.min(1000,Math.max(100,Math.floor(C1/2))),N=setInterval(()=>{if(!z_.current)return;if(H_.current)return;let P=d.current;if(!P)return;let u=Date.now(),c=u-P;if(c>=D4){b0();return}if(c>=C1){if(u-__.current>=C4){let v=Math.floor(c/1000);E({type:"waiting",title:`Waiting for model… No events for ${v}s`}),__.current=u}}},O);return()=>clearInterval(N)},[b0]);let _2=I(async()=>{try{let O=await y1();if(O)F_(O)}catch(O){console.warn("Failed to fetch agent context:",O)}},[]),u0=I(async()=>{try{let O=await I4("web:default");if(!O||O.status!=="active"||!O.data){if(Z0.current){let{currentHashtag:u,searchQuery:c}=p_.current||{};if(!u&&!c)Y0()}Z0.current=!1,g_(),E(null),w({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null),H_.current=null;return}Z0.current=!0;let N=O.data,P=N.turn_id||N.turnId;if(P)x_(P);if(j_({running:!0,clearSilence:!0}),E_(),E(N),O.thought&&O.thought.text)x((u)=>{if(u&&u.text&&u.text.length>=O.thought.text.length)return u;return G_.current=O.thought.text,{text:O.thought.text,totalLines:O.thought.totalLines||0}});if(O.draft&&O.draft.text)w((u)=>{if(u&&u.text&&u.text.length>=O.draft.text.length)return u;return e.current=O.draft.text,{text:O.draft.text,totalLines:O.draft.totalLines||0}})}catch(O){console.warn("Failed to fetch agent status:",O)}},[g_,E_,j_,Y0,x_]),h2=I((O)=>{if($(O),O!=="connected"){E(null),w({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null),H_.current=null,g_();return}if(!B0.current){B0.current=!0,u0();return}let{currentHashtag:N,searchQuery:P}=p_.current;if(!N&&!P)Y0();u0()},[g_,Y0,u0]),i0=I(async(O)=>{Y(O),t_(null),await C0(O)},[C0]),i2=I(async()=>{Y(null),Z(null),t_(null),await C0()},[C0]),l2=I(async(O)=>{if(!O||!O.trim())return;Z(O.trim()),Y(null),t_(null);try{let N=await x8(O.trim());t_(N.results),c0(!1)}catch(N){console.error("Failed to search:",N),t_([])}},[]),o2=I(()=>{G(!0),Z(null),Y(null),t_([])},[]),n2=I(()=>{G(!1),Z(null),C0()},[C0]),k1=I(()=>{},[]),d2=I(async(O)=>{if(!O)return;let N=O.id,P=R0?.filter((c)=>c?.data?.thread_id===N&&c?.id!==N).length||0;if(P>0){if(!window.confirm(`Delete this message and its ${P} replies?`))return}let u=(c)=>{if(!c.length)return;y0((l)=>{let W_=new Set(l);return c.forEach((w_)=>W_.add(w_)),W_}),setTimeout(()=>{if(P0(()=>{t_((l)=>l?l.filter((W_)=>!c.includes(W_.id)):l)}),y0((l)=>{let W_=new Set(l);return c.forEach((w_)=>W_.delete(w_)),W_}),K2.current)G2.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let c=await M4(N,P>0);if(c?.ids?.length)u(c.ids)}catch(c){let v=c?.message||"";if(P===0&&v.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let W_=await M4(N,!0);if(W_?.ids?.length)u(W_.ids);return}console.error("Failed to delete post:",c),alert(`Failed to delete message: ${v}`)}},[R0,P0]),K=I(async()=>{try{let O=await T8();K_(k4(O));let N=O?.user||{};L0((u)=>{let c=typeof N.name==="string"&&N.name.trim()?N.name.trim():"You",v=typeof N.avatar_url==="string"?N.avatar_url.trim():null,l=typeof N.avatar_background==="string"&&N.avatar_background.trim()?N.avatar_background.trim():null;if(u.name===c&&u.avatar_url===v&&u.avatar_background===l)return u;return{name:c,avatar_url:v,avatar_background:l}});let P=(O?.agents||[]).find((u)=>u.id==="default");if(P?.model)B_(P.model);s_(P?.name,P?.avatar_url)}catch(O){console.warn("Failed to load agents:",O)}try{let O=await y1();if(O)F_(O)}catch{}},[s_]);g(()=>{K();let O=r0("sidebarWidth",null),N=Number.isFinite(O)?Math.min(Math.max(O,160),600):280;if(A0.current=N,E0.current)E0.current.style.setProperty("--sidebar-width",`${N}px`)},[K]);let B=I((O)=>{if(!O||typeof O!=="object")return;let N=O.agent_id;if(!N)return;let{agent_name:P,agent_avatar:u}=O;if(!P&&u===void 0)return;let c=k0.current?.[N]||{id:N},v=c.name||null,l=c.avatar_url??c.avatarUrl??c.avatar??null,W_=!1,w_=!1;if(P&&P!==c.name)v=P,w_=!0;if(u!==void 0){let l0=typeof u==="string"?u.trim():null,A1=typeof l==="string"?l.trim():null,o0=l0||null;if(o0!==(A1||null))l=o0,W_=!0}if(!w_&&!W_)return;if(K_((l0)=>{let o0={...l0[N]||{id:N}};if(w_)o0.name=v;if(W_)o0.avatar_url=l;return{...l0,[N]:o0}}),N==="default")s_(v,l,W_?Date.now():null)},[s_]),y=I((O)=>{if(!O||typeof O!=="object")return;let N=O.user_name??O.userName,P=O.user_avatar??O.userAvatar,u=O.user_avatar_background??O.userAvatarBackground;if(N===void 0&&P===void 0&&u===void 0)return;L0((c)=>{let v=typeof N==="string"&&N.trim()?N.trim():c.name||"You",l=P===void 0?c.avatar_url:typeof P==="string"&&P.trim()?P.trim():null,W_=u===void 0?c.avatar_background:typeof u==="string"&&u.trim()?u.trim():null;if(c.name===v&&c.avatar_url===l&&c.avatar_background===W_)return c;return{name:v,avatar_url:l,avatar_background:W_}})},[]),C=I((O)=>{if(!O||typeof O!=="object")return;let N=O.model??O.current;if(N!==void 0)B_(N);if(O.thinking_level!==void 0)b_(O.thinking_level??null);if(O.supports_thinking!==void 0)T_(Boolean(O.supports_thinking))},[]),R=I(()=>{f8().then((O)=>{if(O)C(O)}).catch(()=>{})},[C]),h=I((O,N)=>{let P=N?.turn_id;if(B(N),y(N),O==="ui_theme"){M3(N);return}if(O?.startsWith("agent_"))E_();if(O==="connected"){E(null),w({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null),H_.current=null,g_(),I4("web:default").then((v)=>{if(!v||v.status!=="active"||!v.data)return;let l=v.data,W_=l.turn_id||l.turnId;if(W_)x_(W_);if(j_({clearSilence:!0}),u_(l),v.thought&&v.thought.text)G_.current=v.thought.text,x({text:v.thought.text,totalLines:v.thought.totalLines||0});if(v.draft&&v.draft.text)e.current=v.draft.text,w({text:v.draft.text,totalLines:v.draft.totalLines||0})}).catch((v)=>{console.warn("Failed to fetch agent status:",v)}),R();return}if(O==="agent_status"){if(N.type==="done"||N.type==="error"){if(P&&$_.current&&P!==$_.current)return;if(N.type==="done"){$0(P||$_.current);let{currentHashtag:v,searchQuery:l}=p_.current||{};if(!v&&!l)Y0();if(N.context_usage)F_(N.context_usage)}if(Z0.current=!1,g_(),w({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null),N.type==="error")E({type:"error",title:N.title||"Agent error"}),setTimeout(()=>E(null),8000);else E(null)}else{if(P)x_(P);if(j_({running:!0,clearSilence:!0}),N.type==="thinking")e.current="",G_.current="",w({text:"",totalLines:0}),z(""),x({text:"",totalLines:0});E(N)}return}if(O==="agent_steer_queued"){if(P&&$_.current&&P!==$_.current)return;let v=P||$_.current;if(!v)return;t.current=v,Y_(v);return}if(O==="agent_draft_delta"){if(P&&$_.current&&P!==$_.current)return;if(P&&!$_.current)x_(P);if(j_({running:!0,clearSilence:!0}),N?.reset)e.current="";if(N?.delta)e.current+=N.delta;if(J_.current){let v=e.current;w((l)=>({text:l?.text||"",totalLines:f2(v),fullText:v}))}else{let v=e.current,l=f2(v);w({text:v,totalLines:l})}return}if(O==="agent_draft"){if(P&&$_.current&&P!==$_.current)return;if(P&&!$_.current)x_(P);j_({running:!0,clearSilence:!0});let v=N.text||"",l=N.mode||(N.kind==="plan"?"replace":"append"),W_=Number.isFinite(N.total_lines)?N.total_lines:v?v.replace(/\r\n/g,`
`).split(`
`).length:0;if(N.kind==="plan")if(l==="replace")z(v);else z((w_)=>(w_||"")+v);else if(!J_.current)e.current=v,w({text:v,totalLines:W_});return}if(O==="agent_thought_delta"){if(P&&$_.current&&P!==$_.current)return;if(P&&!$_.current)x_(P);if(j_({running:!0,clearSilence:!0}),N?.reset)G_.current="";if(typeof N?.delta==="string")G_.current+=N.delta;if(V_.current){let v=G_.current;x((l)=>({text:l?.text||"",totalLines:f2(v),fullText:v}))}return}if(O==="agent_thought"){if(P&&$_.current&&P!==$_.current)return;if(P&&!$_.current)x_(P);j_({running:!0,clearSilence:!0});let v=N.text||"",l=Number.isFinite(N.total_lines)?N.total_lines:v?v.replace(/\r\n/g,`
`).split(`
`).length:0;if(!V_.current)G_.current=v,x({text:v,totalLines:l});return}if(O==="agent_request"){if(console.log("Agent request:",N),P&&$_.current&&P!==$_.current)return;if(P)x_(P);j_({running:!0,clearSilence:!0}),f(N),H_.current=N;return}if(O==="agent_request_timeout"){if(console.log("Agent request timeout:",N),P&&$_.current&&P!==$_.current)return;f(null),H_.current=null,g_(),E({type:"error",title:"Permission request timed out"});return}if(O==="model_changed"){if(N?.model!==void 0)B_(N.model);if(N?.thinking_level!==void 0)b_(N.thinking_level??null);if(N?.supports_thinking!==void 0)T_(Boolean(N.supports_thinking));y1().then((v)=>{if(v)F_(v)}).catch(()=>{});return}if(O==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:N}));return}let{currentHashtag:u,searchQuery:c}=p_.current;if(O==="agent_response")h0(),r_.current={post:N,turnId:$_.current};if(!u&&!c&&(O==="new_post"||O==="agent_response"))t_((v)=>{if(!v)return[N];if(v.some((l)=>l.id===N.id))return v;return[...v,N]}),a_.current?.();if(O==="interaction_updated")t_((v)=>v?v.map((l)=>l.id===N.id?N:l):v);if(O==="interaction_deleted"){let v=N?.ids||[];if(v.length){P0(()=>{t_((w_)=>w_?w_.filter((l0)=>!v.includes(l0.id)):w_)});let{currentHashtag:l,searchQuery:W_}=p_.current;if(K2.current&&!l&&!W_)G2.current?.({preserveScroll:!0,preserveMode:"top"})}}},[g_,E_,j_,$0,P0,Y0,h0,x_,u_,B,y,R]);g(()=>{if(typeof window>"u")return;let O=window.__PICLAW_TEST_API||{};return O.emit=h,O.reset=()=>{h0(),g_(),E(null),w({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null)},O.finalize=()=>b0(),window.__PICLAW_TEST_API=O,()=>{if(window.__PICLAW_TEST_API===O)window.__PICLAW_TEST_API=void 0}},[g_,b0,h,h0]),z4({handleSseEvent:h,handleConnectionStatusChange:h2,loadPosts:C0}),g(()=>{if(!R0||R0.length===0)return;let O=location.hash;if(!O||!O.startsWith("#msg-"))return;let N=document.getElementById(O.slice(1).replace("msg-","post-"));if(N)N.scrollIntoView({behavior:"smooth",block:"center"}),N.classList.add("post-highlight"),setTimeout(()=>N.classList.remove("post-highlight"),2000),history.replaceState(null,"",location.pathname+location.search)},[R0]);let s=H!==null;g(()=>{if(_!=="connected")return;let N=setInterval(()=>{if(s)u0(),_2();else{let{currentHashtag:P,searchQuery:u}=p_.current||{};if(!P&&!u)Y0();u0(),_2()}},s?15000:60000);return()=>clearInterval(N)},[_,s,u0,_2,Y0]);let a=I(()=>{j0((O)=>!O)},[]);g(()=>{if(!N_)return;if(typeof window>"u")return;let O=E0.current;if(!O)return;if(!f0.current){let N=r0("editorWidth",null),P=A0.current||280;f0.current=Number.isFinite(N)?N:P}if(O.style.setProperty("--editor-width",`${f0.current}px`),!D0.current){let N=r0("dockHeight",null);D0.current=Number.isFinite(N)?N:200}O.style.setProperty("--dock-height",`${D0.current}px`)},[N_]);let i=q0.getDockPanes().length>0,[Z_,W0]=T(!1),i_=I(()=>W0((O)=>!O),[]);g(()=>{if(!i)return;let O=(N)=>{if(N.ctrlKey&&N.key==="`")N.preventDefault(),i_()};return document.addEventListener("keydown",O),()=>document.removeEventListener("keydown",O)},[i_,i]);let x4=Boolean(o&&o===(H?.turn_id||m));return q`
        <div class=${`app-shell${c_?"":" workspace-collapsed"}${N_?" editor-open":""}`} ref=${E0}>
            <${j4}
                onFileSelect=${z0}
                visible=${c_}
                active=${c_||N_}
                onOpenEditor=${e_}
            />
            <button
                class=${`workspace-toggle-tab${c_?" open":" closed"}`}
                onClick=${a}
                title=${c_?"Hide workspace":"Show workspace"}
                aria-label=${c_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${V2} onTouchStart=${u2}></div>
            ${N_&&q`
                <div class="editor-pane-container">
                    <${K4}
                        tabs=${M}
                        activeId=${n}
                        onActivate=${U0}
                        onClose=${x0}
                        onCloseOthers=${H0}
                        onCloseAll=${n_}
                        onTogglePin=${F0}
                        onTogglePreview=${G0}
                        previewTabs=${I_}
                        onToggleDock=${i?i_:void 0}
                        dockVisible=${i&&Z_}
                    />
                    <div class="editor-pane-host" ref=${S_}></div>
                    ${n&&I_.has(n)&&q`
                        <${V4}
                            getContent=${()=>d_.current?.getContent?.()}
                            path=${n}
                            onClose=${()=>G0(n)}
                        />
                    `}
                    ${i&&Z_&&q`<div class="dock-splitter" onMouseDown=${c2} onTouchStart=${p2}></div>`}
                    ${i&&q`<div class=${`dock-panel${Z_?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${i_} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
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
                <div class="editor-splitter" onMouseDown=${m2} onTouchStart=${g2}></div>
            `}
            <div class="container">
                ${X&&A4()&&q`<div class="search-results-spacer"></div>`}
                ${(J||X)&&q`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${i2}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${J?`#${J}`:`Search: ${X}`}</span>
                    </div>
                `}
                <${d3} 
                    posts=${R0}
                    hasMore=${R2}
                    onLoadMore=${e0}
                    timelineRef=${h_}
                    onHashtagClick=${i0}
                    onMessageRef=${S}
                    onPostClick=${void 0}
                    onDeletePost=${d2}
                    emptyMessage=${J?`No posts with #${J}`:X?`No results for "${X}"`:void 0}
                    agents=${O_}
                    user=${T0}
                    reverse=${!(X&&!J)}
                    removingPostIds=${l_}
                    searchQuery=${X}
                />
                <${p3}
                    status=${H}
                    draft=${F}
                    plan=${b}
                    thought=${k}
                    pendingRequest=${D}
                    turnId=${m}
                    steerQueued=${x4}
                    onPanelToggle=${J0}
                />
                <${L3} 
                    onPost=${()=>{C0(),M0()}}
                    onFocus=${M0}
                    searchMode=${j}
                    onSearch=${l2}
                    onEnterSearch=${o2}
                    onExitSearch=${n2}
                    fileRefs=${V}
                    onRemoveFileRef=${w0}
                    onClearFileRefs=${v0}
                    messageRefs=${Q}
                    onRemoveMessageRef=${r}
                    onClearMessageRefs=${Q_}
                    activeEditorPath=${n}
                    onAttachEditorFile=${L}
                    activeModel=${A_}
                    thinkingLevel=${D_}
                    supportsThinking=${q_}
                    contextUsage=${C_}
                    notificationsEnabled=${M_}
                    notificationPermission=${N0}
                    onToggleNotifications=${m_}
                    onModelChange=${B_}
                    onModelStateChange=${C}
                />
                <${i3} status=${_} />
                <${h3}
                    request=${D}
                    onRespond=${()=>{f(null),H_.current=null}}
                />
            </div>
        </div>
    `}t1(q`<${R8} />`,document.getElementById("app"));

//# debugId=6ED320F10AA7DE4864756E2164756E21
//# sourceMappingURL=app.bundle.js.map

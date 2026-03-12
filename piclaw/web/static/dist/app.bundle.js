var u4=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,J)=>(typeof require<"u"?require:$)[J]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var E2,Z_,p1,j2,h1,P1,m4,F2={},i1=[],g4=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function R0(_,$){for(var J in $)_[J]=$[J];return _}function l1(_){var $=_.parentNode;$&&$.removeChild(_)}function o1(_,$,J){var Y,X,Z,j={};for(Z in $)Z=="key"?Y=$[Z]:Z=="ref"?X=$[Z]:j[Z]=$[Z];if(arguments.length>2&&(j.children=arguments.length>3?E2.call(arguments,2):J),typeof _=="function"&&_.defaultProps!=null)for(Z in _.defaultProps)j[Z]===void 0&&(j[Z]=_.defaultProps[Z]);return z2(_,j,Y,X,null)}function z2(_,$,J,Y,X){var Z={type:_,props:$,key:J,ref:Y,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:X==null?++p1:X};return Z_.vnode!=null&&Z_.vnode(Z),Z}function D2(_){return _.children}function H2(_,$){this.props=_,this.context=$}function t0(_,$){if($==null)return _.__?t0(_.__,_.__.__k.indexOf(_)+1):null;for(var J;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null)return J.__e;return typeof _.type=="function"?t0(_):null}function n1(_){var $,J;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,$=0;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null){_.__e=_.__c.base=J.__e;break}return n1(_)}}function I1(_){(!_.__d&&(_.__d=!0)&&j2.push(_)&&!L2.__r++||P1!==Z_.debounceRendering)&&((P1=Z_.debounceRendering)||h1)(L2)}function L2(){for(var _;L2.__r=j2.length;)_=j2.sort(function($,J){return $.__v.__b-J.__v.__b}),j2=[],_.some(function($){var J,Y,X,Z,j,V;$.__d&&(j=(Z=(J=$).__v).__e,(V=J.__P)&&(Y=[],(X=R0({},Z)).__v=Z.__v+1,_1(V,Z,X,J.__n,V.ownerSVGElement!==void 0,Z.__h!=null?[j]:null,Y,j==null?t0(Z):j,Z.__h),a1(Y,Z),Z.__e!=j&&n1(Z)))})}function d1(_,$,J,Y,X,Z,j,V,G,W){var Q,E,H,U,L,M,S,z=Y&&Y.__k||i1,k=z.length;for(J.__k=[],Q=0;Q<$.length;Q++)if((U=J.__k[Q]=(U=$[Q])==null||typeof U=="boolean"?null:typeof U=="string"||typeof U=="number"||typeof U=="bigint"?z2(null,U,null,null,U):Array.isArray(U)?z2(D2,{children:U},null,null,null):U.__b>0?z2(U.type,U.props,U.key,null,U.__v):U)!=null){if(U.__=J,U.__b=J.__b+1,(H=z[Q])===null||H&&U.key==H.key&&U.type===H.type)z[Q]=void 0;else for(E=0;E<k;E++){if((H=z[E])&&U.key==H.key&&U.type===H.type){z[E]=void 0;break}H=null}_1(_,U,H=H||F2,X,Z,j,V,G,W),L=U.__e,(E=U.ref)&&H.ref!=E&&(S||(S=[]),H.ref&&S.push(H.ref,null,U),S.push(E,U.__c||L,U)),L!=null?(M==null&&(M=L),typeof U.type=="function"&&U.__k!=null&&U.__k===H.__k?U.__d=G=r1(U,G,_):G=s1(_,U,H,z,L,G),W||J.type!=="option"?typeof J.type=="function"&&(J.__d=G):_.value=""):G&&H.__e==G&&G.parentNode!=_&&(G=t0(H))}for(J.__e=M,Q=k;Q--;)z[Q]!=null&&(typeof J.type=="function"&&z[Q].__e!=null&&z[Q].__e==J.__d&&(J.__d=t0(Y,Q+1)),e1(z[Q],z[Q]));if(S)for(Q=0;Q<S.length;Q++)t1(S[Q],S[++Q],S[++Q])}function r1(_,$,J){var Y,X;for(Y=0;Y<_.__k.length;Y++)(X=_.__k[Y])&&(X.__=_,$=typeof X.type=="function"?r1(X,$,J):s1(J,X,X,_.__k,X.__e,$));return $}function s1(_,$,J,Y,X,Z){var j,V,G;if($.__d!==void 0)j=$.__d,$.__d=void 0;else if(J==null||X!=Z||X.parentNode==null)_:if(Z==null||Z.parentNode!==_)_.appendChild(X),j=null;else{for(V=Z,G=0;(V=V.nextSibling)&&G<Y.length;G+=2)if(V==X)break _;_.insertBefore(X,Z),j=Z}return j!==void 0?j:X.nextSibling}function b1(_,$,J){$[0]==="-"?_.setProperty($,J):_[$]=J==null?"":typeof J!="number"||g4.test($)?J:J+"px"}function B2(_,$,J,Y,X){var Z;_:if($==="style")if(typeof J=="string")_.style.cssText=J;else{if(typeof Y=="string"&&(_.style.cssText=Y=""),Y)for($ in Y)J&&$ in J||b1(_.style,$,"");if(J)for($ in J)Y&&J[$]===Y[$]||b1(_.style,$,J[$])}else if($[0]==="o"&&$[1]==="n")Z=$!==($=$.replace(/Capture$/,"")),$=$.toLowerCase()in _?$.toLowerCase().slice(2):$.slice(2),_.l||(_.l={}),_.l[$+Z]=J,J?Y||_.addEventListener($,Z?x1:S1,Z):_.removeEventListener($,Z?x1:S1,Z);else if($!=="dangerouslySetInnerHTML"){if(X)$=$.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if($!=="href"&&$!=="list"&&$!=="form"&&$!=="tabIndex"&&$!=="download"&&$ in _)try{_[$]=J==null?"":J;break _}catch(j){}typeof J=="function"||(J!=null&&(J!==!1||$[0]==="a"&&$[1]==="r")?_.setAttribute($,J):_.removeAttribute($))}}function S1(_){this.l[_.type+!1](Z_.event?Z_.event(_):_)}function x1(_){this.l[_.type+!0](Z_.event?Z_.event(_):_)}function _1(_,$,J,Y,X,Z,j,V,G){var W,Q,E,H,U,L,M,S,z,k,x,D=$.type;if($.constructor!==void 0)return null;J.__h!=null&&(G=J.__h,V=$.__e=J.__e,$.__h=null,Z=[V]),(W=Z_.__b)&&W($);try{_:if(typeof D=="function"){if(S=$.props,z=(W=D.contextType)&&Y[W.__c],k=W?z?z.props.value:W.__:Y,J.__c?M=(Q=$.__c=J.__c).__=Q.__E:(("prototype"in D)&&D.prototype.render?$.__c=Q=new D(S,k):($.__c=Q=new H2(S,k),Q.constructor=D,Q.render=p4),z&&z.sub(Q),Q.props=S,Q.state||(Q.state={}),Q.context=k,Q.__n=Y,E=Q.__d=!0,Q.__h=[]),Q.__s==null&&(Q.__s=Q.state),D.getDerivedStateFromProps!=null&&(Q.__s==Q.state&&(Q.__s=R0({},Q.__s)),R0(Q.__s,D.getDerivedStateFromProps(S,Q.__s))),H=Q.props,U=Q.state,E)D.getDerivedStateFromProps==null&&Q.componentWillMount!=null&&Q.componentWillMount(),Q.componentDidMount!=null&&Q.__h.push(Q.componentDidMount);else{if(D.getDerivedStateFromProps==null&&S!==H&&Q.componentWillReceiveProps!=null&&Q.componentWillReceiveProps(S,k),!Q.__e&&Q.shouldComponentUpdate!=null&&Q.shouldComponentUpdate(S,Q.__s,k)===!1||$.__v===J.__v){Q.props=S,Q.state=Q.__s,$.__v!==J.__v&&(Q.__d=!1),Q.__v=$,$.__e=J.__e,$.__k=J.__k,$.__k.forEach(function(f){f&&(f.__=$)}),Q.__h.length&&j.push(Q);break _}Q.componentWillUpdate!=null&&Q.componentWillUpdate(S,Q.__s,k),Q.componentDidUpdate!=null&&Q.__h.push(function(){Q.componentDidUpdate(H,U,L)})}Q.context=k,Q.props=S,Q.state=Q.__s,(W=Z_.__r)&&W($),Q.__d=!1,Q.__v=$,Q.__P=_,W=Q.render(Q.props,Q.state,Q.context),Q.state=Q.__s,Q.getChildContext!=null&&(Y=R0(R0({},Y),Q.getChildContext())),E||Q.getSnapshotBeforeUpdate==null||(L=Q.getSnapshotBeforeUpdate(H,U)),x=W!=null&&W.type===D2&&W.key==null?W.props.children:W,d1(_,Array.isArray(x)?x:[x],$,J,Y,X,Z,j,V,G),Q.base=$.__e,$.__h=null,Q.__h.length&&j.push(Q),M&&(Q.__E=Q.__=null),Q.__e=!1}else Z==null&&$.__v===J.__v?($.__k=J.__k,$.__e=J.__e):$.__e=c4(J.__e,$,J,Y,X,Z,j,G);(W=Z_.diffed)&&W($)}catch(f){$.__v=null,(G||Z!=null)&&($.__e=V,$.__h=!!G,Z[Z.indexOf(V)]=null),Z_.__e(f,$,J)}}function a1(_,$){Z_.__c&&Z_.__c($,_),_.some(function(J){try{_=J.__h,J.__h=[],_.some(function(Y){Y.call(J)})}catch(Y){Z_.__e(Y,J.__v)}})}function c4(_,$,J,Y,X,Z,j,V){var G,W,Q,E=J.props,H=$.props,U=$.type,L=0;if(U==="svg"&&(X=!0),Z!=null){for(;L<Z.length;L++)if((G=Z[L])&&(G===_||(U?G.localName==U:G.nodeType==3))){_=G,Z[L]=null;break}}if(_==null){if(U===null)return document.createTextNode(H);_=X?document.createElementNS("http://www.w3.org/2000/svg",U):document.createElement(U,H.is&&H),Z=null,V=!1}if(U===null)E===H||V&&_.data===H||(_.data=H);else{if(Z=Z&&E2.call(_.childNodes),W=(E=J.props||F2).dangerouslySetInnerHTML,Q=H.dangerouslySetInnerHTML,!V){if(Z!=null)for(E={},L=0;L<_.attributes.length;L++)E[_.attributes[L].name]=_.attributes[L].value;(Q||W)&&(Q&&(W&&Q.__html==W.__html||Q.__html===_.innerHTML)||(_.innerHTML=Q&&Q.__html||""))}if(function(M,S,z,k,x){var D;for(D in z)D==="children"||D==="key"||D in S||B2(M,D,null,z[D],k);for(D in S)x&&typeof S[D]!="function"||D==="children"||D==="key"||D==="value"||D==="checked"||z[D]===S[D]||B2(M,D,S[D],z[D],k)}(_,H,E,X,V),Q)$.__k=[];else if(L=$.props.children,d1(_,Array.isArray(L)?L:[L],$,J,Y,X&&U!=="foreignObject",Z,j,Z?Z[0]:J.__k&&t0(J,0),V),Z!=null)for(L=Z.length;L--;)Z[L]!=null&&l1(Z[L]);V||(("value"in H)&&(L=H.value)!==void 0&&(L!==_.value||U==="progress"&&!L)&&B2(_,"value",L,E.value,!1),("checked"in H)&&(L=H.checked)!==void 0&&L!==_.checked&&B2(_,"checked",L,E.checked,!1))}return _}function t1(_,$,J){try{typeof _=="function"?_($):_.current=$}catch(Y){Z_.__e(Y,J)}}function e1(_,$,J){var Y,X;if(Z_.unmount&&Z_.unmount(_),(Y=_.ref)&&(Y.current&&Y.current!==_.__e||t1(Y,null,$)),(Y=_.__c)!=null){if(Y.componentWillUnmount)try{Y.componentWillUnmount()}catch(Z){Z_.__e(Z,$)}Y.base=Y.__P=null}if(Y=_.__k)for(X=0;X<Y.length;X++)Y[X]&&e1(Y[X],$,typeof _.type!="function");J||_.__e==null||l1(_.__e),_.__e=_.__d=void 0}function p4(_,$,J){return this.constructor(_,J)}function _3(_,$,J){var Y,X,Z;Z_.__&&Z_.__(_,$),X=(Y=typeof J=="function")?null:J&&J.__k||$.__k,Z=[],_1($,_=(!Y&&J||$).__k=o1(D2,null,[_]),X||F2,F2,$.ownerSVGElement!==void 0,!Y&&J?[J]:X?null:$.firstChild?E2.call($.childNodes):null,Z,!Y&&J?J:X?X.__e:$.firstChild,Y),a1(Z,_)}E2=i1.slice,Z_={__e:function(_,$){for(var J,Y,X;$=$.__;)if((J=$.__c)&&!J.__)try{if((Y=J.constructor)&&Y.getDerivedStateFromError!=null&&(J.setState(Y.getDerivedStateFromError(_)),X=J.__d),J.componentDidCatch!=null&&(J.componentDidCatch(_),X=J.__d),X)return J.__E=J}catch(Z){_=Z}throw _}},p1=0,H2.prototype.setState=function(_,$){var J;J=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=R0({},this.state),typeof _=="function"&&(_=_(R0({},J),this.props)),_&&R0(J,_),_!=null&&this.__v&&($&&this.__h.push($),I1(this))},H2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),I1(this))},H2.prototype.render=D2,j2=[],h1=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,L2.__r=0,m4=0;var C2,z0,T1,K2=0,t2=[],f1=Z_.__b,v1=Z_.__r,R1=Z_.diffed,u1=Z_.__c,m1=Z_.unmount;function $1(_,$){Z_.__h&&Z_.__h(z0,_,K2||$),K2=0;var J=z0.__H||(z0.__H={__:[],__h:[]});return _>=J.__.length&&J.__.push({}),J.__[_]}function R(_){return K2=1,h4(J3,_)}function h4(_,$,J){var Y=$1(C2++,2);return Y.t=_,Y.__c||(Y.__=[J?J($):J3(void 0,$),function(X){var Z=Y.t(Y.__[0],X);Y.__[0]!==Z&&(Y.__=[Z,Y.__[1]],Y.__c.setState({}))}],Y.__c=z0),Y.__}function g(_,$){var J=$1(C2++,3);!Z_.__s&&$3(J.__H,$)&&(J.__=_,J.__H=$,z0.__H.__h.push(J))}function A(_){return K2=5,M0(function(){return{current:_}},[])}function M0(_,$){var J=$1(C2++,7);return $3(J.__H,$)&&(J.__=_(),J.__H=$,J.__h=_),J.__}function b(_,$){return K2=8,M0(function(){return _},$)}function i4(){t2.forEach(function(_){if(_.__P)try{_.__H.__h.forEach(U2),_.__H.__h.forEach(e2),_.__H.__h=[]}catch($){_.__H.__h=[],Z_.__e($,_.__v)}}),t2=[]}Z_.__b=function(_){z0=null,f1&&f1(_)},Z_.__r=function(_){v1&&v1(_),C2=0;var $=(z0=_.__c).__H;$&&($.__h.forEach(U2),$.__h.forEach(e2),$.__h=[])},Z_.diffed=function(_){R1&&R1(_);var $=_.__c;$&&$.__H&&$.__H.__h.length&&(t2.push($)!==1&&T1===Z_.requestAnimationFrame||((T1=Z_.requestAnimationFrame)||function(J){var Y,X=function(){clearTimeout(Z),g1&&cancelAnimationFrame(Y),setTimeout(J)},Z=setTimeout(X,100);g1&&(Y=requestAnimationFrame(X))})(i4)),z0=void 0},Z_.__c=function(_,$){$.some(function(J){try{J.__h.forEach(U2),J.__h=J.__h.filter(function(Y){return!Y.__||e2(Y)})}catch(Y){$.some(function(X){X.__h&&(X.__h=[])}),$=[],Z_.__e(Y,J.__v)}}),u1&&u1(_,$)},Z_.unmount=function(_){m1&&m1(_);var $=_.__c;if($&&$.__H)try{$.__H.__.forEach(U2)}catch(J){Z_.__e(J,$.__v)}};var g1=typeof requestAnimationFrame=="function";function U2(_){var $=z0;typeof _.__c=="function"&&_.__c(),z0=$}function e2(_){var $=z0;_.__c=_.__(),z0=$}function $3(_,$){return!_||_.length!==$.length||$.some(function(J,Y){return J!==_[Y]})}function J3(_,$){return typeof $=="function"?$(_):$}var Y3=function(_,$,J,Y){var X;$[0]=0;for(var Z=1;Z<$.length;Z++){var j=$[Z++],V=$[Z]?($[0]|=j?1:2,J[$[Z++]]):$[++Z];j===3?Y[0]=V:j===4?Y[1]=Object.assign(Y[1]||{},V):j===5?(Y[1]=Y[1]||{})[$[++Z]]=V:j===6?Y[1][$[++Z]]+=V+"":j?(X=_.apply(V,Y3(_,V,J,["",null])),Y.push(X),V[0]?$[0]|=2:($[Z-2]=0,$[Z]=X)):Y.push(V)}return Y},c1=new Map,q=function(_){var $=c1.get(this);return $||($=new Map,c1.set(this,$)),($=Y3(this,$.get(_)||($.set(_,$=function(J){for(var Y,X,Z=1,j="",V="",G=[0],W=function(H){Z===1&&(H||(j=j.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?G.push(0,H,j):Z===3&&(H||j)?(G.push(3,H,j),Z=2):Z===2&&j==="..."&&H?G.push(4,H,0):Z===2&&j&&!H?G.push(5,0,!0,j):Z>=5&&((j||!H&&Z===5)&&(G.push(Z,0,j,X),Z=6),H&&(G.push(Z,H,0,X),Z=6)),j=""},Q=0;Q<J.length;Q++){Q&&(Z===1&&W(),W(Q));for(var E=0;E<J[Q].length;E++)Y=J[Q][E],Z===1?Y==="<"?(W(),G=[G],Z=3):j+=Y:Z===4?j==="--"&&Y===">"?(Z=1,j=""):j=Y+j[0]:V?Y===V?V="":j+=Y:Y==='"'||Y==="'"?V=Y:Y===">"?(W(),Z=1):Z&&(Y==="="?(Z=5,X=j,j=""):Y==="/"&&(Z<5||J[Q][E+1]===">")?(W(),Z===3&&(G=G[0]),Z=G,(G=G[0]).push(2,0,Z),Z=0):Y===" "||Y==="\t"||Y===`
`||Y==="\r"?(W(),Z=2):j+=Y),Z===3&&j==="!--"&&(Z=4,G=G[0])}return W(),G}(_)),$),arguments,[])).length>1?$:$[0]}.bind(o1);async function i_(_,$={}){let J=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!J.ok){let Y=await J.json().catch(()=>({error:"Unknown error"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function y2(_=10,$=null){let J=`/timeline?limit=${_}`;if($)J+=`&before=${$}`;return i_(J)}async function Z3(_,$=50,J=0){return i_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${J}`)}async function X3(_,$=50,J=0){return i_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${J}`)}async function Q3(_){return i_(`/thread/${_}`)}async function j3(_,$=!1){let J=`/post/${_}?cascade=${$?"true":"false"}`;return i_(J,{method:"DELETE"})}async function J1(_,$,J=null,Y=[]){return i_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:J,media_ids:Y})})}async function K3(){return i_("/agents")}async function G3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return i_(`/agent/status${$}`)}async function Y1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return i_(`/agent/context${$}`)}async function h0(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return i_(`/agent/models${$}`)}async function V3(_){let $=new FormData;$.append("file",_);let J=await fetch("/media/upload",{method:"POST",body:$});if(!J.ok){let Y=await J.json().catch(()=>({error:"Upload failed"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function Z1(_,$){let J=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Failed to respond"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function W3(_,$){let J=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(Y.error||`HTTP ${J.status}`)}return J.json()}async function O3(_,$="thought"){let J=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return i_(J)}async function q3(_,$,J){return i_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(J)})})}function e0(_){return`/media/${_}`}function N3(_){return`/media/${_}/thumbnail`}async function k2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function A2(_="",$=2,J=!1){let Y=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${J?"1":"0"}`;return i_(Y)}async function B3(_,$=20000,J=null){let Y=J?`&mode=${encodeURIComponent(J)}`:"",X=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${Y}`;return i_(X)}async function z3(_){return i_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function X1(_,$="",J={}){let Y=new FormData;Y.append("file",_);let X=new URLSearchParams;if($)X.set("path",$);if(J.overwrite)X.set("overwrite","1");let Z=X.toString(),j=Z?`/workspace/upload?${Z}`:"/workspace/upload",V=await fetch(""+j,{method:"POST",body:Y});if(!V.ok){let G=await V.json().catch(()=>({error:"Upload failed"})),W=Error(G.error||`HTTP ${V.status}`);throw W.status=V.status,W.code=G.code,W}return V.json()}async function H3(_,$,J=""){let Y=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:J})});if(!Y.ok){let X=await Y.json().catch(()=>({error:"Create failed"})),Z=Error(X.error||`HTTP ${Y.status}`);throw Z.status=Y.status,Z.code=X.code,Z}return Y.json()}async function U3(_,$){let J=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Rename failed"})),X=Error(Y.error||`HTTP ${J.status}`);throw X.status=J.status,X.code=Y.code,X}return J.json()}async function F3(_,$){let J=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!J.ok){let Y=await J.json().catch(()=>({error:"Move failed"})),X=Error(Y.error||`HTTP ${J.status}`);throw X.status=J.status,X.code=Y.code,X}return J.json()}async function L3(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return i_($,{method:"DELETE"})}async function w2(_,$=!1){return i_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function Q1(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function E3(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class j1{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,J=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,J+$),this.reconnectAttempts=0;let Y=Math.max(this.cooldownUntil-J,0),X=Math.max(this.reconnectDelay,Y);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},X),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function i0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function M_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function _2(_,$=!1){let J=i0(_);if(J===null)return $;return J==="true"}function $2(_,$=null){let J=i0(_);if(J===null)return $;let Y=parseInt(J,10);return Number.isFinite(Y)?Y:$}function u0({prefix:_="file",label:$,title:J,onRemove:Y,onClick:X,removeTitle:Z="Remove",icon:j="file"}){let V=`${_}-file-pill`,G=`${_}-file-name`,W=`${_}-file-remove`,Q=j==="message"?q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return q`
    <span class=${V} title=${J||$} onClick=${X}>
      ${Q}
      <span class=${G}>${$}</span>
      ${Y&&q`
        <button
          class=${W}
          onClick=${(E)=>{E.preventDefault(),E.stopPropagation(),Y()}}
          title=${Z}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var o4=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function n4({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),J=_.tokens,Y=_.contextWindow,X=J!=null?`Context: ${D3(J)} / ${D3(Y)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,Z=7,j=2*Math.PI*7,V=$/100*j,G=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return q`
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
                    stroke-dasharray=${`${V} ${j}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `}function D3(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function C3({onPost:_,onFocus:$,searchMode:J,onSearch:Y,onEnterSearch:X,onExitSearch:Z,fileRefs:j=[],onRemoveFileRef:V,onClearFileRefs:G,messageRefs:W=[],onRemoveMessageRef:Q,onClearMessageRefs:E,activeModel:H=null,modelUsage:U=null,thinkingLevel:L=null,supportsThinking:M=!1,contextUsage:S=null,notificationsEnabled:z=!1,notificationPermission:k="default",onToggleNotifications:x,onModelChange:D,onModelStateChange:f,activeEditorPath:r=null,onAttachEditorFile:c}){let[h,j_]=R(""),[p,__]=R(""),[O_,X_]=R(!1),[G_,W_]=R([]),[S_,$_]=R(!1),[t,J_]=R([]),[Q_,V_]=R(0),[z_,E_]=R(!1),[q_,A_]=R(!1),[w_,H_]=R(!1),[P_,x_]=R([]),[F_,l_]=R(!1),I_=A(null),g_=A(null),b_=A(null),r_=A(null),s_=A(0),m0=200,Z0=(F)=>{let I=new Set,l=[];for(let e of F||[]){if(typeof e!=="string")continue;let U_=e.trim();if(!U_||I.has(U_))continue;I.add(U_),l.push(U_)}return l},T_=()=>{let F=i0("piclaw_compose_history");if(!F)return[];try{let I=JSON.parse(F);if(!Array.isArray(I))return[];return Z0(I)}catch{return[]}},y_=(F)=>{M_("piclaw_compose_history",JSON.stringify(F))},a_=A(T_()),w=A(-1),s=A(""),B_=!O_&&(h.trim()||G_.length>0||j.length>0||W.length>0),f_=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),E0=typeof window<"u"&&typeof Notification<"u",U0=typeof window<"u"?Boolean(window.isSecureContext):!1,$0=E0&&U0&&k!=="denied",X0=k==="granted"&&z,g0=X0?"Disable notifications":"Enable notifications",R_=H||"",o_=M&&L?` (${L})`:"",Q0=o_.trim()?`${L}`:"",I0=typeof U?.hint_short==="string"?U.hint_short.trim():"",t_=[Q0||null,I0||null].filter(Boolean).join(" • "),b0=[R_?`Current model: ${R_}${o_}`:null,U?.plan?`Plan: ${U.plan}`:null,I0||null,U?.primary?.reset_description||null,U?.secondary?.reset_description||null].filter(Boolean),j0=q_?"Switching model…":b0.join(" • ")||`Current model: ${R_}${o_} (tap to open model picker)`,K0=(F)=>{if(!F||typeof F!=="object")return;let I=F.model??F.current;if(typeof f==="function")f({model:I??null,thinking_level:F.thinking_level??null,supports_thinking:F.supports_thinking,provider_usage:F.provider_usage??null});if(I&&typeof D==="function")D(I)},p_=(F)=>{let I=F||I_.current;if(!I)return;I.style.height="auto",I.style.height=`${I.scrollHeight}px`,I.style.overflowY="hidden"},G0=(F)=>{if(!F.startsWith("/")||F.includes(`
`)){E_(!1),J_([]);return}let I=F.toLowerCase().split(" ")[0];if(I.length<1){E_(!1),J_([]);return}let l=o4.filter((e)=>e.name.startsWith(I)||e.name.replace(/-/g,"").startsWith(I.replace(/-/g,"")));if(l.length>0&&!(l.length===1&&l[0].name===I))J_(l),V_(0),E_(!0);else E_(!1),J_([])},V0=(F)=>{let I=h,l=I.indexOf(" "),e=l>=0?I.slice(l):"",U_=F.name+e;j_(U_),E_(!1),J_([]),requestAnimationFrame(()=>{let D_=I_.current;if(!D_)return;let K_=U_.length;D_.selectionStart=K_,D_.selectionEnd=K_,D_.focus()})},h_=(F)=>{if(J)__(F);else j_(F),G0(F);requestAnimationFrame(()=>p_())},F0=(F)=>{let I=J?p:h,l=I&&!I.endsWith(`
`)?`
`:"",e=`${I}${l}${F}`.trimStart();h_(e)},w0=(F)=>{let I=F?.command?.model_label;if(I)return I;let l=F?.command?.message;if(typeof l==="string"){let e=l.match(/•\s+([^\n]+?)\s+\(current\)/);if(e?.[1])return e[1].trim()}return null},S0=async(F)=>{if(J||O_||q_)return;A_(!0);try{let I=await J1("default",F,null,[]),l=w0(I);K0({model:l??H??null,thinking_level:I?.command?.thinking_level,supports_thinking:I?.command?.supports_thinking});try{let e=await h0();if(e)K0(e)}catch{}return _?.(),!0}catch(I){return console.error("Failed to switch model:",I),alert("Failed to switch model: "+I.message),!1}finally{A_(!1)}},v_=async()=>{await S0("/cycle-model")},Y0=async(F)=>{if(!F||q_)return;if(await S0(`/model ${F}`))H_(!1)},W0=(F)=>{F.preventDefault(),F.stopPropagation(),H_((I)=>!I)},C_=async(F)=>{let I=typeof F==="string"?F:F&&typeof F?.target?.value==="string"?F.target.value:h,l=typeof I==="string"?I:"";if(!l.trim()&&G_.length===0&&j.length===0&&W.length===0)return;X_(!0);try{let e=[];for(let c_ of G_){let _0=await V3(c_);e.push(_0.id)}let U_=l.trim(),D_=j.length?`Files:
${j.map((c_)=>`- ${c_}`).join(`
`)}`:"",K_=W.length?`Referenced messages:
${W.map((c_)=>`- message:${c_}`).join(`
`)}`:"",e_=e.length?`Images:
${e.map((c_,_0)=>{let J0=G_[_0]?.name||`image-${_0+1}`;return`- attachment:${c_} (${J0})`}).join(`
`)}`:"",T0=[U_,D_,K_,e_].filter(Boolean).join(`

`),N0=await J1("default",T0,null,e);if(N0?.command){K0({model:N0.command.model_label??H??null,thinking_level:N0.command.thinking_level,supports_thinking:N0.command.supports_thinking});try{let c_=await h0();if(c_)K0(c_)}catch{}}if(U_){let c_=a_.current,_0=Z0(c_.filter((y0)=>y0!==U_));if(_0.push(U_),_0.length>200)_0.splice(0,_0.length-200);a_.current=_0,y_(_0),w.current=-1,s.current=""}j_(""),W_([]),G?.(),E?.(),_?.()}catch(e){console.error("Failed to post:",e),alert("Failed to post: "+e.message)}finally{X_(!1)}},u_=(F)=>{if(F.isComposing)return;if(J&&F.key==="Escape"){F.preventDefault(),__(""),Z?.();return}if(z_&&t.length>0){let I=I_.current?.value??(J?p:h);if(!String(I||"").startsWith("/"))E_(!1),J_([]);else{if(F.key==="ArrowDown"){F.preventDefault(),V_((l)=>(l+1)%t.length);return}if(F.key==="ArrowUp"){F.preventDefault(),V_((l)=>(l-1+t.length)%t.length);return}if(F.key==="Tab"){F.preventDefault(),V0(t[Q_]);return}if(F.key==="Enter"&&!F.shiftKey){if(!(I_.current?.value??(J?p:h)).includes(" ")){F.preventDefault();let U_=t[Q_];E_(!1),J_([]),C_(U_.name);return}}if(F.key==="Escape"){F.preventDefault(),E_(!1),J_([]);return}}}if(!J&&(F.key==="ArrowUp"||F.key==="ArrowDown")&&!F.metaKey&&!F.ctrlKey&&!F.altKey&&!F.shiftKey){let I=I_.current;if(!I)return;let l=I.value||"",e=I.selectionStart===0&&I.selectionEnd===0,U_=I.selectionStart===l.length&&I.selectionEnd===l.length;if(F.key==="ArrowUp"&&e||F.key==="ArrowDown"&&U_){let D_=a_.current;if(!D_.length)return;F.preventDefault();let K_=w.current;if(F.key==="ArrowUp"){if(K_===-1)s.current=l,K_=D_.length-1;else if(K_>0)K_-=1;w.current=K_,h_(D_[K_]||"")}else{if(K_===-1)return;if(K_<D_.length-1)K_+=1,w.current=K_,h_(D_[K_]||"");else w.current=-1,h_(s.current||""),s.current=""}requestAnimationFrame(()=>{let e_=I_.current;if(!e_)return;let T0=e_.value.length;e_.selectionStart=T0,e_.selectionEnd=T0});return}}if(F.key==="Enter"&&!F.shiftKey){F.preventDefault();let I=I_.current?.value??(J?p:h);if(J){if(I.trim())Y?.(I.trim())}else C_(I)}},n_=(F)=>{let I=Array.from(F||[]).filter((l)=>l&&l.type&&l.type.startsWith("image/"));if(!I.length)return;W_((l)=>[...l,...I])},O0=(F)=>{n_(F.target.files),F.target.value=""},L0=(F)=>{if(J)return;F.preventDefault(),F.stopPropagation(),s_.current+=1,$_(!0)},C0=(F)=>{if(J)return;if(F.preventDefault(),F.stopPropagation(),s_.current=Math.max(0,s_.current-1),s_.current===0)$_(!1)},c0=(F)=>{if(J)return;if(F.preventDefault(),F.stopPropagation(),F.dataTransfer)F.dataTransfer.dropEffect="copy";$_(!0)},q0=(F)=>{if(J)return;F.preventDefault(),F.stopPropagation(),s_.current=0,$_(!1),n_(F.dataTransfer?.files||[])},X2=(F)=>{if(J)return;let I=F.clipboardData?.items;if(!I||!I.length)return;let l=[];for(let e of I){if(e.kind!=="file")continue;let U_=e.getAsFile?.();if(U_)l.push(U_)}if(l.length>0)F.preventDefault(),n_(l)},Q2=(F)=>{W_((I)=>I.filter((l,e)=>e!==F))},x0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((F)=>{let{latitude:I,longitude:l,accuracy:e}=F.coords,U_=`${I.toFixed(5)}, ${l.toFixed(5)}`,D_=Number.isFinite(e)?` ±${Math.round(e)}m`:"",K_=`https://maps.google.com/?q=${I},${l}`,e_=`Location: ${U_}${D_} ${K_}`;F0(e_)},(F)=>{let I=F?.message||"Unable to retrieve location.";alert(`Location error: ${I}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};g(()=>{if(!w_)return;l_(!0),h0().then((F)=>{let I=Array.isArray(F?.models)?F.models.filter((l)=>typeof l==="string"&&l.trim().length>0):[];x_(I),K0(F)}).catch((F)=>{console.warn("Failed to load model list:",F),x_([])}).finally(()=>{l_(!1)})},[w_,H]),g(()=>{if(J)H_(!1)},[J]),g(()=>{if(!w_)return;let F=(I)=>{let l=b_.current,e=r_.current,U_=I.target;if(l&&l.contains(U_))return;if(e&&e.contains(U_))return;H_(!1)};return document.addEventListener("pointerdown",F),()=>document.removeEventListener("pointerdown",F)},[w_]);let l0=(F)=>{let I=F.target.value;p_(F.target),h_(I)};return g(()=>{requestAnimationFrame(()=>p_())},[h,p,J]),q`
        <div class="compose-box">
            <div
                class=${`compose-input-wrapper${S_?" drag-active":""}`}
                onDragEnter=${L0}
                onDragOver=${c0}
                onDragLeave=${C0}
                onDrop=${q0}
            >
                <div class="compose-input-main">
                    ${(j.length>0||G_.length>0||W.length>0)&&q`
                        <div class="compose-file-refs">
                            ${W.map((F)=>{return q`
                                    <${u0}
                                        key=${"msg-"+F}
                                        prefix="compose"
                                        label=${"msg:"+F}
                                        title=${"Message reference: "+F}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>Q?.(F)}
                                    />
                                `})}
                            ${j.map((F)=>{let I=F.split("/").pop()||F;return q`
                                    <${u0}
                                        prefix="compose"
                                        label=${I}
                                        title=${F}
                                        removeTitle="Remove file"
                                        onRemove=${()=>V?.(F)}
                                    />
                                `})}
                            ${G_.map((F,I)=>{let l=F?.name||`image-${I+1}`;return q`
                                    <${u0}
                                        key=${l+I}
                                        prefix="compose"
                                        label=${l}
                                        title=${l}
                                        removeTitle="Remove image"
                                        onRemove=${()=>Q2(I)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${I_}
                        placeholder=${J?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${J?p:h}
                        onInput=${l0}
                        onKeyDown=${u_}
                        onPaste=${X2}
                        onFocus=${$}
                        onClick=${$}
                        disabled=${O_}
                        rows="1"
                    />
                    ${z_&&t.length>0&&q`
                        <div class="slash-autocomplete" ref=${g_}>
                            ${t.map((F,I)=>q`
                                <div
                                    key=${F.name}
                                    class=${`slash-item${I===Q_?" active":""}`}
                                    onMouseDown=${(l)=>{l.preventDefault(),V0(F)}}
                                    onMouseEnter=${()=>V_(I)}
                                >
                                    <span class="slash-name">${F.name}</span>
                                    <span class="slash-desc">${F.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${w_&&!J&&q`
                        <div class="compose-model-popup" ref=${b_}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${F_&&q`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!F_&&P_.length===0&&q`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!F_&&P_.map((F)=>q`
                                    <button
                                        key=${F}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${H===F?" active":""}`}
                                        onClick=${()=>{Y0(F)}}
                                        disabled=${q_}
                                    >
                                        ${F}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{v_()}}
                                    disabled=${q_}
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
                            <div class="compose-model-meta">
                                <button
                                    ref=${r_}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${j0}
                                    aria-label="Open model picker"
                                    onClick=${W0}
                                    disabled=${O_||q_}
                                >
                                    ${q_?"Switching…":R_}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!q_&&t_&&q`
                                        <span class="compose-model-usage-hint" title=${j0}>
                                            ${t_}
                                        </span>
                                    `}
                                </div>
                            </div>
                        </div>
                    `}
                    <div class="compose-actions ${J?"search-mode":""}">
                    ${!J&&S&&S.percent!=null&&q`
                        <${n4} usage=${S} />
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
                    ${f_&&!J&&q`
                        <button
                            class="icon-btn location-btn"
                            onClick=${x0}
                            title="Share location"
                            type="button"
                            disabled=${O_}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14 14 0 0 1 0 20a14 14 0 0 1 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                        </button>
                    `}
                    ${$0&&!J&&q`
                        <button
                            class=${`icon-btn notification-btn${X0?" active":""}`}
                            onClick=${x}
                            title=${g0}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!J&&q`
                        ${r&&c&&q`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${c}
                                title=${`Attach open file: ${r}`}
                                type="button"
                                disabled=${O_||j.includes(r)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${O0} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{C_()}}
                            disabled=${!B_}
                            title="Send (Ctrl+Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var k3="piclaw_theme",V1="piclaw_tint",I2={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},d4={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},y3={default:{label:"Default",mode:"auto",light:I2,dark:d4},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},r4=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],b2={theme:"default",tint:null},A3="light",K1=!1;function w3(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function J2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let J=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(J)&&!/^[0-9a-fA-F]{6}$/.test(J))return null;let Y=J.length===3?J.split("").map((Z)=>Z+Z).join(""):J,X=parseInt(Y,16);return{r:X>>16&255,g:X>>8&255,b:X&255,hex:`#${Y.toLowerCase()}`}}function s4(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let J=document.createElement("div");if(J.style.color="",J.style.color=$,!J.style.color)return null;let Y=J.style.color;try{if(document.body)J.style.display="none",document.body.appendChild(J),Y=getComputedStyle(J).color||J.style.color,document.body.removeChild(J)}catch{}let X=Y.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!X)return null;let Z=parseInt(X[1],10),j=parseInt(X[2],10),V=parseInt(X[3],10);if(![Z,j,V].every((W)=>Number.isFinite(W)))return null;let G=`#${[Z,j,V].map((W)=>W.toString(16).padStart(2,"0")).join("")}`;return{r:Z,g:j,b:V,hex:G}}function M3(_){return J2(_)||s4(_)}function G2(_,$,J){let Y=Math.round(_.r+($.r-_.r)*J),X=Math.round(_.g+($.g-_.g)*J),Z=Math.round(_.b+($.b-_.b)*J);return`rgb(${Y} ${X} ${Z})`}function G1(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function P3(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function W1(_){return y3[_]||y3.default}function a4(_){return _.mode==="auto"?P3():_.mode}function t4(_,$){let J=W1(_);if($==="dark"&&J.dark)return J.dark;if($==="light"&&J.light)return J.light;return J.dark||J.light||I2}function e4(_,$,J){let Y=M3($);if(!Y)return _;let X=J2(_.bgPrimary),Z=J2(_.bgSecondary),j=J2(_.bgHover),V=J2(_.borderColor);if(!X||!Z||!j||!V)return _;let W=J2(J==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:G2(X,Y,0.08),bgSecondary:G2(Z,Y,0.12),bgHover:G2(j,Y,0.16),borderColor:G2(V,Y,0.08),accent:Y.hex,accentHover:W?G2(Y,W,0.18):Y.hex}}function _8(_,$){if(typeof document>"u")return;let J=document.documentElement,Y=_.accent,X=M3(Y),Z=X?G1(X,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,j=X?G1(X,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",V=X?G1(X,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",G={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":Y,"--accent-hover":_.accentHover||Y,"--accent-soft":j,"--accent-soft-strong":V,"--danger-color":_.danger||I2.danger,"--success-color":_.success||I2.success,"--search-highlight-color":Z||"rgba(29, 155, 240, 0.2)"};Object.entries(G).forEach(([W,Q])=>{if(Q)J.style.setProperty(W,Q)})}function $8(){if(typeof document>"u")return;let _=document.documentElement;r4.forEach(($)=>_.style.removeProperty($))}function M2(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function J8(_,$){if(typeof document>"u")return;let J=M2("theme-color");if(J&&_)J.setAttribute("content",_);let Y=M2("msapplication-TileColor");if(Y&&_)Y.setAttribute("content",_);let X=M2("msapplication-navbutton-color");if(X&&_)X.setAttribute("content",_);let Z=M2("apple-mobile-web-app-status-bar-style");if(Z)Z.setAttribute("content",$==="dark"?"black-translucent":"default")}function Y8(){if(typeof window>"u")return;let _={...b2,mode:A3};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function O1(_,$={}){if(typeof window>"u"||typeof document>"u")return;let J=w3(_?.theme||"default"),Y=_?.tint?String(_.tint).trim():null,X=W1(J),Z=a4(X),j=t4(J,Z);b2={theme:J,tint:Y},A3=Z;let V=document.documentElement;V.dataset.theme=Z,V.dataset.colorTheme=J,V.dataset.tint=Y?String(Y):"",V.style.colorScheme=Z;let G=j;if(J==="default"&&Y)G=e4(j,Y,Z);if(J==="default"&&!Y)$8();else _8(G,Z);if(J8(G.bgPrimary,Z),Y8(),$.persist!==!1)if(M_(k3,J),Y)M_(V1,Y);else M_(V1,"")}function P2(){if(W1(b2.theme).mode!=="auto")return;O1(b2,{persist:!1})}function I3(){if(typeof window>"u")return()=>{};let _=w3(i0(k3)||"default"),$=i0(V1),J=$?$.trim():null;if(O1({theme:_,tint:J},{persist:!1}),window.matchMedia&&!K1){let Y=window.matchMedia("(prefers-color-scheme: dark)");if(Y.addEventListener)Y.addEventListener("change",P2);else if(Y.addListener)Y.addListener(P2);return K1=!0,()=>{if(Y.removeEventListener)Y.removeEventListener("change",P2);else if(Y.removeListener)Y.removeListener(P2);K1=!1}}return()=>{}}function b3(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let J=_.theme??_.name??_.colorTheme,Y=_.tint??null;O1({theme:J||"default",tint:Y},{persist:!0})}function S3(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return P3()}var S2=/#(\w+)/g,Z8=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),X8=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),Q8=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),j8={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},K8=new Set(["http:","https:","mailto:",""]);function x3(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function Y2(_,$={}){if(!_)return null;let J=String(_).trim();if(!J)return null;if(J.startsWith("#")||J.startsWith("/"))return J;if(J.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(J))return J;return null}if(J.startsWith("blob:"))return J;try{let Y=new URL(J,typeof window<"u"?window.location.origin:"http://localhost");if(!K8.has(Y.protocol))return null;return Y.href}catch{return null}}function T3(_,$={}){if(!_)return"";let J=new DOMParser().parseFromString(_,"text/html"),Y=[],X=J.createTreeWalker(J.body,NodeFilter.SHOW_ELEMENT),Z;while(Z=X.nextNode())Y.push(Z);for(let j of Y){let V=j.tagName.toLowerCase();if(!X8.has(V)){let W=j.parentNode;if(!W)continue;while(j.firstChild)W.insertBefore(j.firstChild,j);W.removeChild(j);continue}let G=j8[V]||new Set;for(let W of Array.from(j.attributes)){let Q=W.name.toLowerCase(),E=W.value;if(Q.startsWith("on")){j.removeAttribute(W.name);continue}if(Q.startsWith("data-")||Q.startsWith("aria-"))continue;if(G.has(Q)||Q8.has(Q)){if(Q==="href"){let H=Y2(E);if(!H)j.removeAttribute(W.name);else if(j.setAttribute(W.name,H),V==="a"&&!j.getAttribute("rel"))j.setAttribute("rel","noopener noreferrer")}else if(Q==="src"){let H=V==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(E):E,U=Y2(H,{allowDataImage:V==="img"});if(!U)j.removeAttribute(W.name);else j.setAttribute(W.name,U)}continue}j.removeAttribute(W.name)}}return J.body.innerHTML}function f3(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function x2(_,$=2){if(!_)return _;let J=_;for(let Y=0;Y<$;Y+=1){let X=f3(J);if(X===J)break;J=X}return J}function G8(_){if(!_)return{text:"",blocks:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=[],X=[],Z=!1,j=[];for(let V of J){if(!Z&&V.trim().match(/^```mermaid\s*$/i)){Z=!0,j=[];continue}if(Z&&V.trim().match(/^```\s*$/)){let G=Y.length;Y.push(j.join(`
`)),X.push(`@@MERMAID_BLOCK_${G}@@`),Z=!1,j=[];continue}if(Z)j.push(V);else X.push(V)}if(Z)X.push("```mermaid"),X.push(...j);return{text:X.join(`
`),blocks:Y}}function V8(_){if(!_)return _;return x2(_,5)}function W8(_){let $=new TextEncoder().encode(String(_||"")),J="";for(let Y of $)J+=String.fromCharCode(Y);return btoa(J)}function O8(_){let $=atob(String(_||"")),J=new Uint8Array($.length);for(let Y=0;Y<$.length;Y+=1)J[Y]=$.charCodeAt(Y);return new TextDecoder().decode(J)}function q8(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(J,Y)=>{let X=Number(Y),Z=$[X]??"",j=V8(Z);return`<div class="mermaid-container" data-mermaid="${W8(j)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function v3(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,J)=>{if(J.includes(`
`))return`
\`\`\`
${J}
\`\`\`
`;return`\`${J}\``})}function R3(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,J)=>{let Y=J.trim(),X=Y.startsWith("/"),Z=X?Y.slice(1).trim():Y,G=(Z.endsWith("/")?Z.slice(0,-1).trim():Z).split(/\s+/)[0]?.toLowerCase();if(!G||!Z8.has(G))return $;if(G==="br")return X?"":"<br>";if(X)return`</${G}>`;return`<${G}>`})}function u3(_){if(!_)return _;let $=(J)=>J.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(J,Y)=>`<pre><code>${$(Y)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(J,Y)=>`<code>${$(Y)}</code>`)}function m3(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Y=(Z)=>Z.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),X;while(X=J.nextNode()){if(!X.nodeValue)continue;let Z=Y(X.nodeValue);if(Z!==X.nodeValue)X.nodeValue=Z}return $.body.innerHTML}function N8(_){if(!window.katex)return _;let $=(j)=>f3(j).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),J=(j)=>{let V=[],G=j.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(W)=>{let Q=V.length;return V.push(W),`@@CODE_BLOCK_${Q}@@`});return G=G.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(W)=>{let Q=V.length;return V.push(W),`@@CODE_INLINE_${Q}@@`}),{html:G,blocks:V}},Y=(j,V)=>{if(!V.length)return j;return j.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(G,W)=>{let Q=Number(W);return V[Q]??""})},X=J(_),Z=X.html;return Z=Z.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(j,V,G)=>{try{let W=katex.renderToString($(G.trim()),{displayMode:!0,throwOnError:!1});return`${V}${W}`}catch(W){return`<span class="math-error" title="${x3(W.message)}">${j}</span>`}}),Z=Z.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(j,V,G)=>{if(/\s$/.test(G))return j;try{let W=katex.renderToString($(G),{displayMode:!1,throwOnError:!1});return`${V}${W}`}catch(W){return`${V}<span class="math-error" title="${x3(W.message)}">$${G}$</span>`}}),Y(Z,X.blocks)}function B8(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Y=[],X;while(X=J.nextNode())Y.push(X);for(let Z of Y){let j=Z.nodeValue;if(!j)continue;if(S2.lastIndex=0,!S2.test(j))continue;S2.lastIndex=0;let V=Z.parentElement;if(V&&(V.closest("a")||V.closest("code")||V.closest("pre")))continue;let G=j.split(S2);if(G.length<=1)continue;let W=$.createDocumentFragment();G.forEach((Q,E)=>{if(E%2===1){let H=$.createElement("a");H.setAttribute("href","#"),H.className="hashtag",H.setAttribute("data-hashtag",Q),H.textContent=`#${Q}`,W.appendChild(H)}else W.appendChild($.createTextNode(Q))}),Z.parentNode?.replaceChild(W,Z)}return $.body.innerHTML}function z8(_){if(!_)return _;let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=[],X=!1;for(let Z of J){if(!X&&Z.trim().match(/^```(?:math|katex|latex)\s*$/i)){X=!0,Y.push("$$");continue}if(X&&Z.trim().match(/^```\s*$/)){X=!1,Y.push("$$");continue}Y.push(Z)}return Y.join(`
`)}function Z2(_,$,J={}){if(!_)return"";let Y=z8(_),{text:X,blocks:Z}=G8(Y),j=x2(X,2),G=v3(j).replace(/</g,"&lt;").replace(/>/g,"&gt;"),W=R3(G),Q=window.marked?marked.parse(W,{headerIds:!1,mangle:!1}):W.replace(/\n/g,"<br>");return Q=u3(Q),Q=m3(Q),Q=N8(Q),Q=B8(Q),Q=q8(Q,Z),Q=T3(Q,J),Q}function g3(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),J=x2($,2),X=v3(J).replace(/</g,"&lt;").replace(/>/g,"&gt;"),Z=R3(X),j=window.marked?marked.parse(Z):Z.replace(/\n/g,"<br>");return j=u3(j),j=m3(j),j=T3(j),j}async function T2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:J}=window.beautifulMermaid,X=S3()==="dark"?J["tokyo-night"]:J["github-light"],Z=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let j of Z)try{let V=j.dataset.mermaid,G=O8(V||""),W=x2(G,2),Q=await $(W,{...X,transparent:!0});j.innerHTML=Q,j.removeAttribute("data-mermaid")}catch(V){console.error("Mermaid render error:",V);let G=document.createElement("pre");G.className="mermaid-error",G.textContent=`Diagram error: ${V.message}`,j.innerHTML="",j.appendChild(G),j.removeAttribute("data-mermaid")}}var c3="PiClaw";function q1(_,$){let J=_||"PiClaw",Y=J.charAt(0).toUpperCase(),X=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],Z=Y.charCodeAt(0)%X.length,j=X[Z],V=J.trim().toLowerCase(),G=typeof $==="string"?$.trim():"",Q=(G?G:null)||(V==="PiClaw".toLowerCase()||V==="pi"?"/static/icon-192.png":null);return{letter:Y,color:j,image:Q}}function p3(_,$){if(!_)return"PiClaw";let J=$[_]?.name||_;return J?J.charAt(0).toUpperCase()+J.slice(1):"PiClaw"}function h3(_,$){if(!_)return null;let J=$[_]||{};return J.avatar_url||J.avatarUrl||J.avatar||null}function i3(_){if(!_)return null;if(typeof document<"u"){let Z=document.documentElement,j=Z?.dataset?.colorTheme||"",V=Z?.dataset?.tint||"",G=getComputedStyle(Z).getPropertyValue("--accent-color")?.trim();if(G&&(V||j&&j!=="default"))return G}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],J=String(_),Y=0;for(let Z=0;Z<J.length;Z+=1)Y=(Y*31+J.charCodeAt(Z))%2147483647;let X=Math.abs(Y)%$.length;return $[X]}function l3({status:_,draft:$,plan:J,thought:Y,pendingRequest:X,turnId:Z,steerQueued:j,onPanelToggle:V}){let Q=(t)=>{if(!t)return{text:"",totalLines:0,fullText:""};if(typeof t==="string"){let z_=t,E_=z_?z_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:z_,totalLines:E_,fullText:z_}}let J_=t.text||"",Q_=t.fullText||t.full_text||J_,V_=Number.isFinite(t.totalLines)?t.totalLines:Q_?Q_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:J_,totalLines:V_,fullText:Q_}},E=160,H=(t)=>{if(!t)return 1;return Math.max(1,Math.ceil(t.length/160))},U=(t,J_,Q_)=>{let V_=(t||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!V_)return{text:"",omitted:0,totalLines:Number.isFinite(Q_)?Q_:0,visibleLines:0};let z_=V_.split(`
`),E_=z_.length>J_?z_.slice(0,J_).join(`
`):V_,q_=Number.isFinite(Q_)?Q_:z_.reduce((H_,P_)=>H_+H(P_),0),A_=E_?E_.split(`
`).reduce((H_,P_)=>H_+H(P_),0):0,w_=Math.max(q_-A_,0);return{text:E_,omitted:w_,totalLines:q_,visibleLines:A_}},L=Q(J),M=Q(Y),S=Q($),z=Boolean(L.text)||L.totalLines>0,k=Boolean(M.text)||M.totalLines>0,x=Boolean(S.fullText?.trim()||S.text?.trim());if(!_&&!x&&!z&&!k&&!X)return null;let[D,f]=R(new Set),r=(t)=>f((J_)=>{let Q_=new Set(J_),V_=!Q_.has(t);if(V_)Q_.add(t);else Q_.delete(t);if(typeof V==="function")V(t,V_);return Q_});g(()=>{f(new Set)},[Z]);let c=_?.turn_id||Z,h=i3(c),j_=j?"turn-dot turn-dot-queued":"turn-dot",p=(t)=>t,__=Boolean(_?.last_activity||_?.lastActivity),O_="",X_=_?.title,G_=_?.status;if(_?.type==="plan")O_=X_?`Planning: ${X_}`:"Planning...";else if(_?.type==="tool_call")O_=X_?`Running: ${X_}`:"Running tool...";else if(_?.type==="tool_status")O_=X_?`${X_}: ${G_||"Working..."}`:G_||"Working...";else if(_?.type==="error")O_=X_||"Agent error";else O_=X_||G_||"Working...";if(__)O_="Last activity just now";let W_=({panelTitle:t,text:J_,fullText:Q_,totalLines:V_,maxLines:z_,titleClass:E_,panelKey:q_})=>{let A_=D.has(q_),w_=Q_||J_||"",H_=typeof z_==="number",P_=A_&&H_,x_=H_?U(w_,z_,V_):{text:w_||"",omitted:0,totalLines:Number.isFinite(V_)?V_:0};if(!w_&&!(Number.isFinite(x_.totalLines)&&x_.totalLines>0))return null;let F_=`agent-thinking-body${H_?" agent-thinking-body-collapsible":""}`,l_=H_?`--agent-thinking-collapsed-lines: ${z_};`:"";return q`
            <div
                class="agent-thinking"
                data-expanded=${A_?"true":"false"}
                data-collapsible=${H_?"true":"false"}
                style=${h?`--turn-color: ${h};`:""}
            >
                <div class="agent-thinking-title ${E_||""}">
                    ${h&&q`<span class=${j_} aria-hidden="true"></span>`}
                    ${t}
                    ${P_&&q`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${t} panel`}
                            onClick=${()=>r(q_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${F_}
                    style=${l_}
                    dangerouslySetInnerHTML=${{__html:g3(w_)}}
                />
                ${!A_&&x_.omitted>0&&q`
                    <button class="agent-thinking-truncation" onClick=${()=>r(q_)}>
                        ▸ ${x_.omitted} more lines
                    </button>
                `}
                ${A_&&x_.omitted>0&&q`
                    <button class="agent-thinking-truncation" onClick=${()=>r(q_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},S_=X?.tool_call?.title,$_=S_?`Awaiting approval: ${S_}`:"Awaiting approval";return q`
        <div class="agent-status-panel">
            ${X&&q`
                <div class="agent-status agent-status-request" aria-live="polite" style=${h?`--turn-color: ${h};`:""}>
                    <span class=${j_} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${$_}</span>
                </div>
            `}
            ${z&&W_({panelTitle:p("Planning"),text:L.text,fullText:L.fullText,totalLines:L.totalLines,panelKey:"plan"})}
            ${k&&W_({panelTitle:p("Thoughts"),text:M.text,fullText:M.fullText,totalLines:M.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${x&&W_({panelTitle:p("Draft"),text:S.text,fullText:S.fullText,totalLines:S.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&q`
                <div class=${`agent-status${__?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${h?`--turn-color: ${h};`:""}>
                    ${h&&q`<span class=${j_} aria-hidden="true"></span>`}
                    ${_?.type==="error"?q`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!__&&q`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${O_}</span>
                </div>
            `}
        </div>
    `}function o3({request:_,onRespond:$}){if(!_)return null;let{request_id:J,tool_call:Y,options:X}=_,Z=Y?.title||"Agent Request",j=Y?.kind||"other",V=Y?.rawInput||{},G=V.command||V.commands&&V.commands[0]||null,W=V.diff||null,Q=V.fileName||V.path||null,E=Y?.description||V.description||V.explanation||null,U=(Array.isArray(Y?.locations)?Y.locations:[]).map((k)=>k?.path).filter((k)=>Boolean(k)),L=Array.from(new Set([Q,...U].filter(Boolean)));console.log("AgentRequestModal:",{request_id:J,tool_call:Y,options:X});let M=async(k)=>{try{await Z1(J,k),$()}catch(x){console.error("Failed to respond to agent request:",x)}},S=async()=>{try{await W3(Z,`Auto-approved: ${Z}`),await Z1(J,"approved"),$()}catch(k){console.error("Failed to add to whitelist:",k)}},z=X&&X.length>0;return q`
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
                ${(E||G||W||L.length>0)&&q`
                    <div class="agent-request-body">
                        ${E&&q`
                            <div class="agent-request-description">${E}</div>
                        `}
                        ${L.length>0&&q`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${L.map((k,x)=>q`<li key=${x}>${k}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${G&&q`
                            <pre class="agent-request-command">${G}</pre>
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
                        <button class="agent-request-btn always-allow" onClick=${S}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function n3({status:_}){if(_==="connected")return null;return q`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function d3(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let Y=new Date-$,X=Y/1000,Z=86400000;if(Y<Z){if(X<60)return"just now";if(X<3600)return`${Math.floor(X/60)}m`;return`${Math.floor(X/3600)}h`}if(Y<5*Z){let G=$.toLocaleDateString(void 0,{weekday:"short"}),W=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${G} ${W}`}let j=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),V=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${j} ${V}`}function V2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function P0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function f2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}function r3({src:_,onClose:$}){return g(()=>{let J=(Y)=>{if(Y.key==="Escape")$()};return document.addEventListener("keydown",J),()=>document.removeEventListener("keydown",J)},[$]),q`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function H8({mediaId:_}){let[$,J]=R(null);if(g(()=>{k2(_).then(J).catch(()=>{})},[_]),!$)return null;let Y=$.filename||"file",X=$.metadata?.size,Z=X?P0(X):"";return q`
        <a href=${e0(_)} download=${Y} class="file-attachment" onClick=${(j)=>j.stopPropagation()}>
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
    `}function v2({annotations:_}){if(!_)return null;let{audience:$,priority:J,lastModified:Y}=_,X=Y?f2(Y):null;return q`
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
    `}function U8({block:_}){let $=_.title||_.name||_.uri,J=_.description,Y=_.size?P0(_.size):"",X=_.mime_type||"",Z=L8(X),j=Y2(_.uri);return q`
        <a
            href=${j||"#"}
            class="resource-link"
            target=${j?"_blank":void 0}
            rel=${j?"noopener noreferrer":void 0}
            onClick=${(V)=>V.stopPropagation()}>
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
    `}function F8({block:_}){let[$,J]=R(!1),Y=_.uri||"Embedded resource",X=_.text||"",Z=Boolean(_.data),j=_.mime_type||"";return q`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(V)=>{V.preventDefault(),V.stopPropagation(),J(!$)}}>
                ${$?"▼":"▶"} ${Y}
            </button>
            ${$&&q`
                ${X&&q`<pre class="resource-embed-content">${X}</pre>`}
                ${Z&&q`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${j&&q`<span class="resource-embed-blob-meta">${j}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(V)=>{V.preventDefault(),V.stopPropagation();let G=new Blob([Uint8Array.from(atob(_.data),(E)=>E.charCodeAt(0))],{type:j||"application/octet-stream"}),W=URL.createObjectURL(G),Q=document.createElement("a");Q.href=W,Q.download=Y.split("/").pop()||"resource",Q.click(),URL.revokeObjectURL(W)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function L8(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function E8({preview:_}){let $=Y2(_.url),J=Y2(_.image,{allowDataImage:!0}),Y=J?`background-image: url('${J}')`:"",X=_.site_name;if(!X&&$)try{X=new URL($).hostname}catch{X=$}return q`
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
    `}function D8(_,$){return typeof _==="string"?_:""}function C8(_){if(!_)return{content:_,fileRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Files:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Y=W;break}if(Y===-1)return{content:_,fileRefs:[]};let X=[],Z=Y+1;for(;Z<J.length;Z+=1){let W=J[Z];if(/^\s*-\s+/.test(W))X.push(W.replace(/^\s*-\s+/,"").trim());else if(!W.trim())break;else break}if(X.length===0)return{content:_,fileRefs:[]};let j=J.slice(0,Y),V=J.slice(Z),G=[...j,...V].join(`
`);return G=G.replace(/\n{3,}/g,`

`).trim(),{content:G,fileRefs:X}}function y8(_){if(!_)return{content:_,messageRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Referenced messages:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Y=W;break}if(Y===-1)return{content:_,messageRefs:[]};let X=[],Z=Y+1;for(;Z<J.length;Z+=1){let W=J[Z];if(/^\s*-\s+/.test(W)){let E=W.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(E)X.push(E[1])}else if(!W.trim())break;else break}if(X.length===0)return{content:_,messageRefs:[]};let j=J.slice(0,Y),V=J.slice(Z),G=[...j,...V].join(`
`);return G=G.replace(/\n{3,}/g,`

`).trim(),{content:G,messageRefs:X}}function k8(_){if(!_)return{content:_,attachments:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Y=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Images:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Y=W;break}if(Y===-1)return{content:_,attachments:[]};let X=[],Z=Y+1;for(;Z<J.length;Z+=1){let W=J[Z];if(/^\s*-\s+/.test(W)){let Q=W.replace(/^\s*-\s+/,"").trim(),E=Q.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||Q.match(/^attachment:([^\s]+)\s+(.+)$/i);if(E){let H=E[1],U=(E[2]||"").trim()||H;X.push({id:H,label:U,raw:Q})}else X.push({id:null,label:Q,raw:Q})}else if(!W.trim())break;else break}if(X.length===0)return{content:_,attachments:[]};let j=J.slice(0,Y),V=J.slice(Z),G=[...j,...V].join(`
`);return G=G.replace(/\n{3,}/g,`

`).trim(),{content:G,attachments:X}}function A8(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function w8(_,$){if(!_||!$)return _;let J=String($).trim().split(/\s+/).filter(Boolean);if(J.length===0)return _;let Y=J.map(A8).sort((Q,E)=>E.length-Q.length),X=new RegExp(`(${Y.join("|")})`,"gi"),Z=new RegExp(`^(${Y.join("|")})$`,"i"),j=new DOMParser().parseFromString(_,"text/html"),V=j.createTreeWalker(j.body,NodeFilter.SHOW_TEXT),G=[],W;while(W=V.nextNode())G.push(W);for(let Q of G){let E=Q.nodeValue;if(!E||!X.test(E)){X.lastIndex=0;continue}X.lastIndex=0;let H=Q.parentElement;if(H&&H.closest("code, pre, script, style"))continue;let U=E.split(X).filter((M)=>M!=="");if(U.length===0)continue;let L=j.createDocumentFragment();for(let M of U)if(Z.test(M)){let S=j.createElement("mark");S.className="search-highlight-term",S.textContent=M,L.appendChild(S)}else L.appendChild(j.createTextNode(M));Q.parentNode.replaceChild(L,Q)}return j.body.innerHTML}function s3({post:_,onClick:$,onHashtagClick:J,onMessageRef:Y,onScrollToMessage:X,agentName:Z,agentAvatarUrl:j,userName:V,userAvatarUrl:G,userAvatarBackground:W,onDelete:Q,isThreadReply:E,isRemoving:H,highlightQuery:U}){let[L,M]=R(null),S=A(null),z=_.data,k=z.type==="agent_response",x=V||"You",D=k?Z||c3:x,f=k?q1(Z,j):q1(x,G),r=typeof W==="string"?W.trim().toLowerCase():"",c=!k&&f.image&&(r==="clear"||r==="transparent"),h=k&&Boolean(f.image),j_=`background-color: ${c||h?"transparent":f.color}`,p=z.content_meta,__=Boolean(p?.truncated),O_=Boolean(p?.preview),X_=__&&!O_,G_=__?{originalLength:Number.isFinite(p?.original_length)?p.original_length:z.content?z.content.length:0,maxLength:Number.isFinite(p?.max_length)?p.max_length:0}:null,W_=D8(z.content,z.link_previews),{content:S_,fileRefs:$_}=C8(W_),{content:t,messageRefs:J_}=y8(S_),{content:Q_,attachments:V_}=k8(t);W_=Q_;let z_=Boolean(W_)&&!X_,E_=typeof U==="string"?U.trim():"",q_=M0(()=>{if(!W_)return"";let w=Z2(W_,J);return E_?w8(w,E_):w},[W_,E_]),A_=(w,s)=>{w.stopPropagation(),M(e0(s))},w_=(w)=>{w.stopPropagation(),Q?.(_)},H_=(w,s)=>{let B_=new Set;if(!w||s.length===0)return{content:w,usedIds:B_};return{content:w.replace(/attachment:([^\s)"']+)/g,(E0,U0,D0,$0)=>{let X0=U0.replace(/^\/+/,""),R_=s.find((Q0)=>Q0.name&&Q0.name.toLowerCase()===X0.toLowerCase()&&!B_.has(Q0.id))||s.find((Q0)=>!B_.has(Q0.id));if(!R_)return E0;if(B_.add(R_.id),$0.slice(Math.max(0,D0-2),D0)==="](")return`/media/${R_.id}`;return R_.name||"attachment"}),usedIds:B_}},P_=[],x_=[],F_=[],l_=[],I_=[],g_=[],b_=z.content_blocks||[],r_=z.media_ids||[],s_=0;if(b_.length>0)b_.forEach((w)=>{if(w?.type==="text"&&w.annotations)g_.push(w.annotations);if(w?.type==="resource_link")l_.push(w);else if(w?.type==="resource")I_.push(w);else if(w?.type==="file"){let s=r_[s_++];if(s)x_.push(s),F_.push({id:s,name:w?.name||w?.filename||w?.title})}else if(w?.type==="image"||!w?.type){let s=r_[s_++];if(s){let B_=typeof w?.mime_type==="string"?w.mime_type:void 0;P_.push({id:s,annotations:w?.annotations,mimeType:B_}),F_.push({id:s,name:w?.name||w?.filename||w?.title})}}});else if(r_.length>0)r_.forEach((w)=>{P_.push({id:w,annotations:null}),F_.push({id:w,name:null})});if(V_.length>0)V_.forEach((w)=>{if(!w?.id)return;let s=F_.find((B_)=>String(B_.id)===String(w.id));if(s&&!s.name)s.name=w.label});let{content:m0,usedIds:Z0}=H_(W_,F_);W_=m0;let T_=P_.filter(({id:w})=>!Z0.has(w)),y_=x_.filter((w)=>!Z0.has(w)),a_=V_.length>0?V_.map((w,s)=>({id:w.id||`attachment-${s+1}`,label:w.label||`attachment-${s+1}`})):F_.map((w,s)=>({id:w.id,label:w.name||`attachment-${s+1}`}));return g(()=>{if(S.current)T2(S.current)},[W_]),q`
        <div id=${`post-${_.id}`} class="post ${k?"agent-post":""} ${E?"thread-reply":""} ${H?"removing":""}" onClick=${$}>
            <div class="post-avatar ${k?"agent-avatar":""} ${f.image?"has-image":""}" style=${j_}>
                ${f.image?q`<img src=${f.image} alt=${D} />`:f.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${w_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${D}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(w)=>{if(w.preventDefault(),w.stopPropagation(),Y)Y(_.id)}}>${d3(_.timestamp)}</a>
                </div>
                ${X_&&G_&&q`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${V2(G_.originalLength)} chars
                            ${G_.maxLength?q` • Display limit: ${V2(G_.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${O_&&G_&&q`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${V2(G_.maxLength)} of ${V2(G_.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${($_.length>0||J_.length>0||a_.length>0)&&q`
                    <div class="post-file-refs">
                        ${J_.map((w)=>{let s=(B_)=>{if(B_.preventDefault(),B_.stopPropagation(),X)X(w);else{let f_=document.getElementById("post-"+w);if(f_)f_.scrollIntoView({behavior:"smooth",block:"center"}),f_.classList.add("post-highlight"),setTimeout(()=>f_.classList.remove("post-highlight"),2000)}};return q`
                                <a href=${`#msg-${w}`} class="post-msg-pill-link" onClick=${s}>
                                    <${u0}
                                        prefix="post"
                                        label=${"msg:"+w}
                                        title=${"Message "+w}
                                        icon="message"
                                        onClick=${s}
                                    />
                                </a>
                            `})}
                        ${$_.map((w)=>{let s=w.split("/").pop()||w;return q`
                                <${u0}
                                    prefix="post"
                                    label=${s}
                                    title=${w}
                                />
                            `})}
                        ${a_.map((w)=>q`
                            <${u0}
                                prefix="post"
                                label=${w.label}
                                title=${w.label}
                            />
                        `)}
                    </div>
                `}
                ${z_&&q`
                    <div 
                        ref=${S}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:q_}}
                        onClick=${(w)=>{if(w.target.classList.contains("hashtag")){w.preventDefault(),w.stopPropagation();let s=w.target.dataset.hashtag;if(s)J?.(s)}else if(w.target.tagName==="IMG")w.preventDefault(),w.stopPropagation(),M(w.target.src)}}
                    />
                `}
                ${g_.length>0&&q`
                    ${g_.map((w,s)=>q`
                        <${v2} key=${s} annotations=${w} />
                    `)}
                `}
                ${T_.length>0&&q`
                    <div class="media-preview">
                        ${T_.map(({id:w,mimeType:s})=>{let f_=typeof s==="string"&&s.toLowerCase().startsWith("image/svg")?e0(w):N3(w);return q`
                                <img 
                                    key=${w} 
                                    src=${f_} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(E0)=>A_(E0,w)}
                                />
                            `})}
                    </div>
                `}
                ${T_.length>0&&q`
                    ${T_.map(({annotations:w},s)=>q`
                        ${w&&q`<${v2} key=${s} annotations=${w} />`}
                    `)}
                `}
                ${y_.length>0&&q`
                    <div class="file-attachments">
                        ${y_.map((w)=>q`
                            <${H8} key=${w} mediaId=${w} />
                        `)}
                    </div>
                `}
                ${l_.length>0&&q`
                    <div class="resource-links">
                        ${l_.map((w,s)=>q`
                            <div key=${s}>
                                <${U8} block=${w} />
                                <${v2} annotations=${w.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${I_.length>0&&q`
                    <div class="resource-embeds">
                        ${I_.map((w,s)=>q`
                            <div key=${s}>
                                <${F8} block=${w} />
                                <${v2} annotations=${w.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${z.link_previews?.length>0&&q`
                    <div class="link-previews">
                        ${z.link_previews.map((w,s)=>q`
                            <${E8} key=${s} preview=${w} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${L&&q`<${r3} src=${L} onClose=${()=>M(null)} />`}
    `}function a3({posts:_,hasMore:$,onLoadMore:J,onPostClick:Y,onHashtagClick:X,onMessageRef:Z,onScrollToMessage:j,emptyMessage:V,timelineRef:G,agents:W,user:Q,onDeletePost:E,reverse:H=!0,removingPostIds:U,searchQuery:L}){let[M,S]=R(!1),z=A(null),k=typeof IntersectionObserver<"u",x=b(async()=>{if(!J||!$||M)return;S(!0);try{await J({preserveScroll:!0,preserveMode:"top"})}finally{S(!1)}},[$,M,J]),D=b((c)=>{let{scrollTop:h,scrollHeight:j_,clientHeight:p}=c.target,__=H?j_-p-h:h,O_=Math.max(300,p);if(__<O_)x()},[H,x]);if(g(()=>{if(!k)return;let c=z.current,h=G?.current;if(!c||!h)return;let j_=300,p=new IntersectionObserver((__)=>{for(let O_ of __){if(!O_.isIntersecting)continue;x()}},{root:h,rootMargin:`${j_}px 0px ${j_}px 0px`,threshold:0});return p.observe(c),()=>p.disconnect()},[k,$,J,G,x]),g(()=>{if(k)return;if(!G?.current)return;let{scrollTop:c,scrollHeight:h,clientHeight:j_}=G.current,p=H?h-j_-c:c,__=Math.max(300,j_);if(p<__)x()},[k,_,$,H,G,x]),g(()=>{if(!G?.current)return;if(!$||M)return;let{scrollTop:c,scrollHeight:h,clientHeight:j_}=G.current,p=H?h-j_-c:c,__=Math.max(300,j_);if(h<=j_+1||p<__)x()},[_,$,M,H,G,x]),!_)return q`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return q`
            <div class="timeline" ref=${G}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${V||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let f=_.slice().sort((c,h)=>c.id-h.id),r=q`<div class="timeline-sentinel" ref=${z}></div>`;return q`
        <div class="timeline ${H?"reverse":"normal"}" ref=${G} onScroll=${D}>
            <div class="timeline-content">
                ${H?r:null}
                ${f.map((c)=>{let h=Boolean(c.data?.thread_id&&c.data.thread_id!==c.id),j_=U?.has?.(c.id);return q`
                    <${s3}
                        key=${c.id}
                        post=${c}
                        isThreadReply=${h}
                        isRemoving=${j_}
                        highlightQuery=${L}
                        agentName=${p3(c.data?.agent_id,W||{})}
                        agentAvatarUrl=${h3(c.data?.agent_id,W||{})}
                        userName=${Q?.name||Q?.user_name}
                        userAvatarUrl=${Q?.avatar_url||Q?.avatarUrl||Q?.avatar}
                        userAvatarBackground=${Q?.avatar_background||Q?.avatarBackground}
                        onClick=${()=>Y?.(c)}
                        onHashtagClick=${X}
                        onMessageRef=${Z}
                        onScrollToMessage=${j}
                        onDelete=${E}
                    />
                `})}
                ${H?null:r}
            </div>
        </div>
    `}var M8=16,P8=60000,$4=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function I8(_,$){let J=String(_||"").trim();if(!J)return J;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(J)||J.startsWith("#")||J.startsWith("data:")||J.startsWith("blob:"))return J;let Y=J.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),X=Y?.[1]||J,Z=Y?.[2]||"",j=Y?.[3]||"",V=String($||"").split("/").slice(0,-1).join("/"),W=X.startsWith("/")?X:`${V?`${V}/`:""}${X}`,Q=[];for(let H of W.split("/")){if(!H||H===".")continue;if(H===".."){if(Q.length>0)Q.pop();continue}Q.push(H)}let E=Q.join("/");return`${Q1(E)}${Z}${j}`}function J4(_,$,J,Y=0,X=[]){if(!J&&$4(_))return X;if(!_)return X;if(X.push({node:_,depth:Y}),_.type==="dir"&&_.children&&$.has(_.path))for(let Z of _.children)J4(Z,$,J,Y+1,X);return X}function t3(_,$,J){if(!_)return"";let Y=[],X=(Z)=>{if(!J&&$4(Z))return;if(Y.push(Z.type==="dir"?`d:${Z.path}`:`f:${Z.path}`),Z.children&&$?.has(Z.path))for(let j of Z.children)X(j)};return X(_),Y.join("|")}function H1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let J=Array.isArray(_.children)?_.children:null,Y=Array.isArray($.children)?$.children:null;if(!Y)return _;let X=J?new Map(J.map((V)=>[V?.path,V])):new Map,Z=!J||J.length!==Y.length,j=Y.map((V)=>{let G=H1(X.get(V.path),V);if(G!==X.get(V.path))Z=!0;return G});return Z?{...$,children:j}:_}function B1(_,$,J){if(!_)return _;if(_.path===$)return H1(_,J);if(!Array.isArray(_.children))return _;let Y=!1,X=_.children.map((Z)=>{let j=B1(Z,$,J);if(j!==Z)Y=!0;return j});return Y?{..._,children:X}:_}var Y4=4,N1=14,b8=8,S8=16;function Z4(_){if(!_)return 0;if(_.type==="file"){let Y=Math.max(0,Number(_.size)||0);return _.__bytes=Y,Y}let $=Array.isArray(_.children)?_.children:[],J=0;for(let Y of $)J+=Z4(Y);return _.__bytes=J,J}function X4(_,$=0){let J=Math.max(0,Number(_?.__bytes??_?.size??0)),Y={name:_?.name||_?.path||".",path:_?.path||".",size:J,children:[]};if(!_||_.type!=="dir"||$>=Y4)return Y;let X=Array.isArray(_.children)?_.children:[],Z=[];for(let V of X){let G=Math.max(0,Number(V?.__bytes??V?.size??0));if(G<=0)continue;if(V.type==="dir")Z.push({kind:"dir",node:V,size:G});else Z.push({kind:"file",name:V.name,path:V.path,size:G})}Z.sort((V,G)=>G.size-V.size);let j=Z;if(Z.length>N1){let V=Z.slice(0,N1-1),G=Z.slice(N1-1),W=G.reduce((Q,E)=>Q+E.size,0);V.push({kind:"other",name:`+${G.length} more`,path:`${Y.path}/[other]`,size:W}),j=V}return Y.children=j.map((V)=>{if(V.kind==="dir")return X4(V.node,$+1);return{name:V.name,path:V.path,size:V.size,children:[]}}),Y}function e3(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,J=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(J==="dark")return!0;if(J==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function Q4(_,$,J){let Y=((_+Math.PI/2)*180/Math.PI+360)%360,X=J?Math.max(30,70-$*10):Math.max(34,66-$*8),Z=J?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${Y.toFixed(1)} ${X}% ${Z}%)`}function R2(_,$,J,Y){return{x:_+J*Math.cos(Y),y:$+J*Math.sin(Y)}}function U1(_,$,J,Y,X,Z){let j=Math.PI*2-0.0001,V=Z-X>j?X+j:Z,G=R2(_,$,Y,X),W=R2(_,$,Y,V),Q=R2(_,$,J,V),E=R2(_,$,J,X),H=V-X>Math.PI?1:0;return[`M ${G.x.toFixed(3)} ${G.y.toFixed(3)}`,`A ${Y} ${Y} 0 ${H} 1 ${W.x.toFixed(3)} ${W.y.toFixed(3)}`,`L ${Q.x.toFixed(3)} ${Q.y.toFixed(3)}`,`A ${J} ${J} 0 ${H} 0 ${E.x.toFixed(3)} ${E.y.toFixed(3)}`,"Z"].join(" ")}var j4={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function K4(_,$,J){let Y=[],X=[],Z=Math.max(0,Number($)||0),j=(V,G,W,Q)=>{let E=Array.isArray(V?.children)?V.children:[];if(!E.length)return;let H=Math.max(0,Number(V.size)||0);if(H<=0)return;let U=W-G,L=G;E.forEach((M,S)=>{let z=Math.max(0,Number(M.size)||0);if(z<=0)return;let k=z/H,x=L,D=S===E.length-1?W:L+U*k;if(L=D,D-x<0.003)return;let f=j4[Q];if(f){let r=Q4(x,Q,J);if(Y.push({key:M.path,path:M.path,label:M.name,size:z,color:r,depth:Q,startAngle:x,endAngle:D,innerRadius:f[0],outerRadius:f[1],d:U1(120,120,f[0],f[1],x,D)}),Q===1)X.push({key:M.path,name:M.name,size:z,pct:Z>0?z/Z*100:0,color:r})}if(Q<Y4)j(M,x,D,Q+1)})};return j(_,-Math.PI/2,Math.PI*3/2,1),{segments:Y,legend:X}}function z1(_,$){if(!_||!$)return null;if(_.path===$)return _;let J=Array.isArray(_.children)?_.children:[];for(let Y of J){let X=z1(Y,$);if(X)return X}return null}function G4(_,$,J,Y){if(!J||J<=0)return{segments:[],legend:[]};let X=j4[1];if(!X)return{segments:[],legend:[]};let Z=-Math.PI/2,j=Math.PI*3/2,V=Q4(Z,1,Y),W=`${$||"."}/[files]`;return{segments:[{key:W,path:W,label:_,size:J,color:V,depth:1,startAngle:Z,endAngle:j,innerRadius:X[0],outerRadius:X[1],d:U1(120,120,X[0],X[1],Z,j)}],legend:[{key:W,name:_,size:J,pct:100,color:V}]}}function _4(_,$=!1,J=!1){if(!_)return null;let Y=Z4(_),X=X4(_,0),Z=X.size||Y,{segments:j,legend:V}=K4(X,Z,J);if(!j.length&&Z>0){let G=G4("[files]",X.path,Z,J);j=G.segments,V=G.legend}return{root:X,totalSize:Z,segments:j,legend:V,truncated:$,isDarkTheme:J}}function x8({payload:_}){if(!_)return null;let[$,J]=R(null),[Y,X]=R(_?.root?.path||"."),[Z,j]=R(()=>[_?.root?.path||"."]),[V,G]=R(!1);g(()=>{let p=_?.root?.path||".";X(p),j([p]),J(null)},[_?.root?.path,_?.totalSize]),g(()=>{if(!Y)return;G(!0);let p=setTimeout(()=>G(!1),180);return()=>clearTimeout(p)},[Y]);let W=M0(()=>{return z1(_.root,Y)||_.root},[_?.root,Y]),Q=W?.size||_.totalSize||0,{segments:E,legend:H}=M0(()=>{let p=K4(W,Q,_.isDarkTheme);if(p.segments.length>0)return p;if(Q<=0)return p;let __=W?.children?.length?"Total":"[files]";return G4(__,W?.path||_?.root?.path||".",Q,_.isDarkTheme)},[W,Q,_.isDarkTheme,_?.root?.path]),[U,L]=R(E),M=A(new Map),S=A(0);g(()=>{let p=M.current,__=new Map(E.map((W_)=>[W_.key,W_])),O_=performance.now(),X_=220,G_=(W_)=>{let S_=Math.min(1,(W_-O_)/220),$_=S_*(2-S_),t=E.map((J_)=>{let V_=p.get(J_.key)||{startAngle:J_.startAngle,endAngle:J_.startAngle,innerRadius:J_.innerRadius,outerRadius:J_.innerRadius},z_=(H_,P_)=>H_+(P_-H_)*$_,E_=z_(V_.startAngle,J_.startAngle),q_=z_(V_.endAngle,J_.endAngle),A_=z_(V_.innerRadius,J_.innerRadius),w_=z_(V_.outerRadius,J_.outerRadius);return{...J_,d:U1(120,120,A_,w_,E_,q_)}});if(L(t),S_<1)S.current=requestAnimationFrame(G_)};if(S.current)cancelAnimationFrame(S.current);return S.current=requestAnimationFrame(G_),M.current=__,()=>{if(S.current)cancelAnimationFrame(S.current)}},[E]);let z=U.length?U:E,k=Q>0?P0(Q):"0 B",x=W?.name||"",f=(x&&x!=="."?x:"Total")||"Total",r=k,c=Z.length>1,h=(p)=>{if(!p?.path)return;let __=z1(_.root,p.path);if(!__||!Array.isArray(__.children)||__.children.length===0)return;j((O_)=>[...O_,__.path]),X(__.path),J(null)},j_=()=>{if(!c)return;j((p)=>{let __=p.slice(0,-1);return X(__[__.length-1]||_?.root?.path||"."),__}),J(null)};return q`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${V?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${W?.path||_?.root?.path||"."}`}
                data-segments=${z.length}
                data-base-size=${Q}>
                ${z.map((p)=>q`
                    <path
                        key=${p.key}
                        d=${p.d}
                        fill=${p.color}
                        stroke="var(--bg-primary)"
                        stroke-width="1"
                        class=${`workspace-folder-starburst-segment${$?.key===p.key?" is-hovered":""}`}
                        onMouseEnter=${()=>J(p)}
                        onMouseLeave=${()=>J(null)}
                        onTouchStart=${()=>J(p)}
                        onTouchEnd=${()=>J(null)}
                        onClick=${()=>h(p)}
                    >
                        <title>${p.label} — ${P0(p.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${c?" is-drill":""}`}
                    onClick=${j_}
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
                    <text x="120" y="130" text-anchor="middle" class="workspace-folder-starburst-total-value">${r}</text>
                </g>
            </svg>
            ${H.length>0&&q`
                <div class="workspace-folder-starburst-legend">
                    ${H.slice(0,8).map((p)=>q`
                        <div key=${p.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${p.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${p.name}>${p.name}</span>
                            <span class="workspace-folder-starburst-size">${P0(p.size)}</span>
                            <span class="workspace-folder-starburst-pct">${p.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&q`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function T8({mediaId:_}){let[$,J]=R(null);if(g(()=>{if(!_)return;k2(_).then(J).catch(()=>{})},[_]),!$)return null;let Y=$.filename||"file",X=$.metadata?.size?P0($.metadata.size):"";return q`
        <a href=${e0(_)} download=${Y} class="file-attachment"
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
    `}function V4({onFileSelect:_,visible:$=!0,active:J=void 0,onOpenEditor:Y}){let[X,Z]=R(null),[j,V]=R(new Set(["."])),[G,W]=R(null),[Q,E]=R(null),[H,U]=R(""),[L,M]=R(null),[S,z]=R(null),[k,x]=R(!0),[D,f]=R(!1),[r,c]=R(null),[h,j_]=R(()=>_2("workspaceShowHidden",!1)),[p,__]=R(!1),[O_,X_]=R(null),[G_,W_]=R(null),[S_,$_]=R(null),[t,J_]=R(!1),[Q_,V_]=R(null),[z_,E_]=R(()=>e3()),q_=A(j),A_=A(""),w_=A(null),H_=A(0),P_=A(new Set),x_=A(null),F_=A(new Map),l_=A(_),I_=A(Y),g_=A(null),b_=A(null),r_=A(null),s_=A(null),m0=A(null),Z0=A(null),T_=A("."),y_=A(null),a_=A({path:null,dragging:!1,startX:0,startY:0}),w=A({path:null,dragging:!1,startX:0,startY:0}),s=A({path:null,timer:0}),B_=A(!1),f_=A(0),E0=A(new Map),U0=A(null),D0=A(null),$0=A(h),X0=A($),g0=A(J??$),R_=A(0),o_=A(S_),Q0=A(p),I0=A(O_),t_=A(null),b0=A({x:0,y:0}),j0=A(0),K0=A(null),p_=A(G),G0=A(Q),V0=A(null),h_=A(L);l_.current=_,I_.current=Y,g(()=>{q_.current=j},[j]),g(()=>{$0.current=h},[h]),g(()=>{X0.current=$},[$]),g(()=>{g0.current=J??$},[J,$]),g(()=>{o_.current=S_},[S_]),g(()=>{let K=(B)=>{let y=B?.detail?.path;if(!y)return;let C=y.split("/"),u=[];for(let i=1;i<C.length;i++)u.push(C.slice(0,i).join("/"));if(u.length)V((i)=>{let a=new Set(i);a.add(".");for(let d of u)a.add(d);return a});W(y),requestAnimationFrame(()=>{let i=document.querySelector(`[data-path="${CSS.escape(y)}"]`);if(i)i.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",K),()=>window.removeEventListener("workspace-reveal-path",K)},[]),g(()=>{Q0.current=p},[p]),g(()=>{I0.current=O_},[O_]),g(()=>{p_.current=G},[G]),g(()=>{G0.current=Q},[Q]),g(()=>{h_.current=L},[L]),g(()=>{if(typeof window>"u"||typeof document>"u")return;let K=()=>E_(e3());K();let B=window.matchMedia?.("(prefers-color-scheme: dark)"),y=()=>K();if(B?.addEventListener)B.addEventListener("change",y);else if(B?.addListener)B.addListener(y);let C=typeof MutationObserver<"u"?new MutationObserver(()=>K()):null;if(C?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)C?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(B?.removeEventListener)B.removeEventListener("change",y);else if(B?.removeListener)B.removeListener(y);C?.disconnect()}},[]),g(()=>{if(!Q)return;let K=m0.current;if(!K)return;let B=requestAnimationFrame(()=>{try{K.focus(),K.select()}catch{}});return()=>cancelAnimationFrame(B)},[Q]);let F0=async(K)=>{f(!0),M(null),z(null);try{let B=await B3(K,20000);M(B)}catch(B){M({error:B.message||"Failed to load preview"})}finally{f(!1)}};g_.current=F0;let w0=async()=>{if(!X0.current)return;try{let K=await A2("",1,$0.current),B=t3(K.root,q_.current,$0.current);if(B===A_.current){x(!1);return}if(A_.current=B,w_.current=K.root,!H_.current)H_.current=requestAnimationFrame(()=>{H_.current=0,Z((y)=>H1(y,w_.current)),x(!1)})}catch(K){c(K.message||"Failed to load workspace"),x(!1)}},S0=async(K)=>{if(!K)return;if(P_.current.has(K))return;P_.current.add(K);try{let B=await A2(K,1,$0.current);Z((y)=>B1(y,K,B.root))}catch(B){c(B.message||"Failed to load workspace")}finally{P_.current.delete(K)}};b_.current=S0;let v_=b(()=>{let K=G;if(!K)return".";let B=F_.current?.get(K);if(B&&B.type==="dir")return B.path;if(K==="."||!K.includes("/"))return".";let y=K.split("/");return y.pop(),y.join("/")||"."},[G]),Y0=b((K)=>{let B=K?.closest?.(".workspace-row");if(!B)return null;let y=B.dataset.path,C=B.dataset.type;if(!y)return null;if(C==="dir")return y;if(y.includes("/")){let u=y.split("/");return u.pop(),u.join("/")||"."}return"."},[]),W0=b((K)=>{return Y0(K?.target||null)},[Y0]),C_=b((K)=>{o_.current=K,$_(K)},[]),u_=b(()=>{let K=s.current;if(K?.timer)clearTimeout(K.timer);s.current={path:null,timer:0}},[]),n_=b((K)=>{if(!K||K==="."){u_();return}let B=F_.current?.get(K);if(!B||B.type!=="dir"){u_();return}if(q_.current?.has(K)){u_();return}if(s.current?.path===K)return;u_();let y=setTimeout(()=>{s.current={path:null,timer:0},b_.current?.(K),V((C)=>{let u=new Set(C);return u.add(K),u})},600);s.current={path:K,timer:y}},[u_]),O0=b((K,B)=>{if(b0.current={x:K,y:B},j0.current)return;j0.current=requestAnimationFrame(()=>{j0.current=0;let y=t_.current;if(!y)return;let C=b0.current;y.style.transform=`translate(${C.x+12}px, ${C.y+12}px)`})},[]),L0=b((K)=>{if(!K)return;let y=(F_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!y)return;W_({path:K,label:y})},[]),C0=b(()=>{if(W_(null),j0.current)cancelAnimationFrame(j0.current),j0.current=0;if(t_.current)t_.current.style.transform="translate(-9999px, -9999px)"},[]),c0=b((K)=>{if(!K)return".";let B=F_.current?.get(K);if(B&&B.type==="dir")return B.path;if(K==="."||!K.includes("/"))return".";let y=K.split("/");return y.pop(),y.join("/")||"."},[]),q0=b(()=>{E(null),U("")},[]),X2=b((K)=>{if(!K)return;let y=(F_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!y||K===".")return;E(K),U(y)},[]),Q2=b(async()=>{let K=G0.current;if(!K)return;let B=(H||"").trim();if(!B){q0();return}let y=F_.current?.get(K),C=(y?.name||K.split("/").pop()||K).trim();if(B===C){q0();return}try{let i=(await U3(K,B))?.path||K,a=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(q0(),c(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:K,newPath:i,type:y?.type||"file"}})),y?.type==="dir")V((d)=>{let n=new Set;for(let Y_ of d)if(Y_===K)n.add(i);else if(Y_.startsWith(`${K}/`))n.add(`${i}${Y_.slice(K.length)}`);else n.add(Y_);return n});if(W(i),y?.type==="dir")M(null),f(!1),z(null);else g_.current?.(i);b_.current?.(a)}catch(u){c(u?.message||"Failed to rename file")}},[q0,H]),x0=b(async(K)=>{let C=K||".";for(let u=0;u<50;u+=1){let a=`untitled${u===0?"":`-${u}`}.md`;try{let n=(await H3(C,a,""))?.path||(C==="."?a:`${C}/${a}`);if(C&&C!==".")V((Y_)=>new Set([...Y_,C]));W(n),c(null),b_.current?.(C),g_.current?.(n);return}catch(d){if(d?.status===409||d?.code==="file_exists")continue;c(d?.message||"Failed to create file");return}}c("Failed to create file (untitled name already in use).")},[]),l0=b((K)=>{if(K?.stopPropagation?.(),t)return;let B=c0(p_.current);x0(B)},[t,c0,x0]);g(()=>{if(typeof window>"u")return;let K=(B)=>{let y=B?.detail?.updates||[];if(!Array.isArray(y)||y.length===0)return;Z((d)=>{let n=d;for(let Y_ of y){if(!Y_?.root)continue;if(!n||Y_.path==="."||!Y_.path)n=Y_.root;else n=B1(n,Y_.path,Y_.root)}if(n)A_.current=t3(n,q_.current,$0.current);return x(!1),n});let C=p_.current;if(Boolean(C)&&y.some((d)=>{let n=d?.path||"";if(!n||n===".")return!0;return C===n||C.startsWith(`${n}/`)||n.startsWith(`${C}/`)}))E0.current.clear();if(!C||!h_.current)return;let i=F_.current?.get(C);if(i&&i.type==="dir")return;if(y.some((d)=>{let n=d?.path||"";if(!n||n===".")return!0;return C===n||C.startsWith(`${n}/`)}))g_.current?.(C)};return window.addEventListener("workspace-update",K),()=>window.removeEventListener("workspace-update",K)},[]),x_.current=w0;let F=A(()=>{if(typeof window>"u")return;let K=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),B=g0.current??X0.current,y=document.visibilityState!=="hidden"&&(B||K.matches&&X0.current);w2(y,$0.current).catch(()=>{})}).current,I=A(0),l=A(()=>{if(I.current)clearTimeout(I.current);I.current=setTimeout(()=>{I.current=0,F()},250)}).current;g(()=>{if(X0.current)x_.current?.();l()},[$,J]),g(()=>{x_.current(),F();let K=setInterval(()=>x_.current(),P8),B=$2("previewHeight",null),y=Number.isFinite(B)?Math.min(Math.max(B,80),600):280;if(f_.current=y,r_.current)r_.current.style.setProperty("--preview-height",`${y}px`);let C=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),u=()=>l();if(C.addEventListener)C.addEventListener("change",u);else if(C.addListener)C.addListener(u);return document.addEventListener("visibilitychange",u),()=>{if(clearInterval(K),H_.current)cancelAnimationFrame(H_.current),H_.current=0;if(C.removeEventListener)C.removeEventListener("change",u);else if(C.removeListener)C.removeListener(u);if(document.removeEventListener("visibilitychange",u),I.current)clearTimeout(I.current),I.current=0;if(y_.current)clearTimeout(y_.current),y_.current=null;w2(!1,$0.current).catch(()=>{})}},[]);let e=M0(()=>J4(X,j,h),[X,j,h]),U_=M0(()=>new Map(e.map((K)=>[K.node.path,K.node])),[e]);F_.current=U_;let K_=(G?F_.current.get(G):null)?.type==="dir";g(()=>{if(!G||!K_){V_(null),U0.current=null,D0.current=null;return}let K=G,B=`${h?"hidden":"visible"}:${G}`,y=E0.current,C=y.get(B);if(C?.root){y.delete(B),y.set(B,C);let a=_4(C.root,Boolean(C.truncated),z_);if(a)U0.current=a,D0.current=G,V_({loading:!1,error:null,payload:a});return}let u=U0.current,i=D0.current;V_({loading:!0,error:null,payload:i===G?u:null}),A2(G,b8,h).then((a)=>{if(p_.current!==K)return;let d={root:a?.root,truncated:Boolean(a?.truncated)};y.delete(B),y.set(B,d);while(y.size>S8){let Y_=y.keys().next().value;if(!Y_)break;y.delete(Y_)}let n=_4(d.root,d.truncated,z_);U0.current=n,D0.current=G,V_({loading:!1,error:null,payload:n})}).catch((a)=>{if(p_.current!==K)return;V_({loading:!1,error:a?.message||"Failed to load folder size chart",payload:i===G?u:null})})},[G,K_,h,z_]);let e_=Boolean(L&&L.kind==="text"&&!K_&&(!L.size||L.size<=262144)),T0=e_?"Open in editor":L?.size>262144?"File too large to edit":"File is not editable",N0=(K)=>{let B=K?.target;if(B instanceof Element)return B;return B?.parentElement||null},c_=A((K)=>{if(V0.current)clearTimeout(V0.current),V0.current=null;let y=N0(K)?.closest?.("[data-path]");if(!y)return;let C=y.dataset.path;if(y.dataset.type==="dir"||!C)return;if(G0.current===C)q0();I_.current?.(C)}).current,_0=A((K)=>{if(B_.current){B_.current=!1;return}let B=N0(K),y=B?.closest?.("[data-path]");if(s_.current?.focus?.(),!y)return;let C=y.dataset.path,u=y.dataset.type,i=Boolean(B?.closest?.(".workspace-caret")),a=Boolean(B?.closest?.("button"))||Boolean(B?.closest?.("a"))||Boolean(B?.closest?.("input")),d=p_.current===C,n=G0.current;if(n){if(n===C)return;q0()}if(d&&!i&&!a&&C!=="."){if(V0.current)clearTimeout(V0.current);V0.current=setTimeout(()=>{V0.current=null,X2(C)},350);return}if(u==="dir"){if(W(C),M(null),z(null),f(!1),!q_.current.has(C))b_.current?.(C);if(d&&!i)return;V((B0)=>{let m_=new Set(B0);if(m_.has(C))m_.delete(C);else m_.add(C);return m_})}else{W(C);let Y_=F_.current.get(C);if(Y_)l_.current?.(Y_.path,Y_);g_.current?.(C)}}).current,y0=A(()=>{A_.current="",x_.current(),Array.from(q_.current||[]).filter((B)=>B&&B!==".").forEach((B)=>b_.current?.(B))}).current,J0=A(()=>{W(null),M(null),z(null),f(!1)}).current,d_=A(()=>{j_((K)=>{let B=!K;if(typeof window<"u")M_("workspaceShowHidden",String(B));return $0.current=B,w2(!0,B).catch(()=>{}),A_.current="",x_.current?.(),Array.from(q_.current||[]).filter((C)=>C&&C!==".").forEach((C)=>b_.current?.(C)),B})}).current,g2=A((K)=>{if(N0(K)?.closest?.("[data-path]"))return;J0()}).current,p0=b(async(K)=>{if(!K)return;let B=K.split("/").pop()||K;if(!window.confirm(`Delete "${B}"? This cannot be undone.`))return;try{await L3(K);let C=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(p_.current===K)J0();b_.current?.(C),c(null)}catch(C){M((u)=>({...u||{},error:C.message||"Failed to delete file"}))}},[J0]),o0=b((K)=>{let B=s_.current;if(!B||!K||typeof CSS>"u"||typeof CSS.escape!=="function")return;B.querySelector(`[data-path="${CSS.escape(K)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),k0=b((K)=>{let B=e;if(!B||B.length===0)return;let y=G?B.findIndex((C)=>C.node.path===G):-1;if(K.key==="ArrowDown"){K.preventDefault();let C=Math.min(y+1,B.length-1),u=B[C];if(!u)return;if(W(u.node.path),u.node.type!=="dir")l_.current?.(u.node.path,u.node),g_.current?.(u.node.path);else M(null),f(!1),z(null);o0(u.node.path);return}if(K.key==="ArrowUp"){K.preventDefault();let C=y<=0?0:y-1,u=B[C];if(!u)return;if(W(u.node.path),u.node.type!=="dir")l_.current?.(u.node.path,u.node),g_.current?.(u.node.path);else M(null),f(!1),z(null);o0(u.node.path);return}if(K.key==="ArrowRight"&&y>=0){let C=B[y];if(C?.node?.type==="dir"&&!j.has(C.node.path))K.preventDefault(),b_.current?.(C.node.path),V((u)=>new Set([...u,C.node.path]));return}if(K.key==="ArrowLeft"&&y>=0){let C=B[y];if(C?.node?.type==="dir"&&j.has(C.node.path))K.preventDefault(),V((u)=>{let i=new Set(u);return i.delete(C.node.path),i});return}if(K.key==="Enter"&&y>=0){K.preventDefault();let C=B[y];if(!C)return;let u=C.node.path;if(C.node.type==="dir"){if(!q_.current.has(u))b_.current?.(u);V((a)=>{let d=new Set(a);if(d.has(u))d.delete(u);else d.add(u);return d}),M(null),z(null),f(!1)}else l_.current?.(u,C.node),g_.current?.(u);return}if((K.key==="Delete"||K.key==="Backspace")&&y>=0){let C=B[y];if(!C||C.node.type==="dir")return;K.preventDefault(),p0(C.node.path);return}if(K.key==="Escape")K.preventDefault(),J0()},[J0,p0,j,e,o0,G]),A0=b((K)=>{let B=K?.target?.closest?.(".workspace-row");if(!B)return;let y=B.dataset.type,C=B.dataset.path;if(!C||C===".")return;if(G0.current===C)return;let u=K?.touches?.[0];if(!u)return;if(a_.current={path:C,dragging:!1,startX:u.clientX,startY:u.clientY},y!=="file")return;if(y_.current)clearTimeout(y_.current);y_.current=setTimeout(()=>{if(y_.current=null,a_.current?.dragging)return;p0(C)},600)},[p0]),O2=b(()=>{if(y_.current)clearTimeout(y_.current),y_.current=null;let K=a_.current;if(K?.dragging&&K.path){let B=o_.current||v_(),y=K0.current;if(typeof y==="function")y(K.path,B)}a_.current={path:null,dragging:!1,startX:0,startY:0},R_.current=0,__(!1),X_(null),C_(null),u_(),C0()},[v_,C0,C_,u_]),q2=b((K)=>{let B=a_.current,y=K?.touches?.[0];if(!y||!B?.path){if(y_.current)clearTimeout(y_.current),y_.current=null;return}let C=Math.abs(y.clientX-B.startX),u=Math.abs(y.clientY-B.startY),i=C>8||u>8;if(i&&y_.current)clearTimeout(y_.current),y_.current=null;if(!B.dragging&&i)B.dragging=!0,__(!0),X_("move"),L0(B.path);if(B.dragging){K.preventDefault(),O0(y.clientX,y.clientY);let a=document.elementFromPoint(y.clientX,y.clientY),d=Y0(a)||v_();if(o_.current!==d)C_(d);n_(d)}},[Y0,v_,L0,O0,C_,n_]),n0=A((K)=>{K.preventDefault();let B=r_.current;if(!B)return;let y=K.clientY,C=f_.current||280,u=K.currentTarget;u.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let i=y,a=(n)=>{i=n.clientY;let Y_=B.clientHeight-80,B0=Math.min(Math.max(C-(n.clientY-y),80),Y_);B.style.setProperty("--preview-height",`${B0}px`),f_.current=B0},d=()=>{let n=B.clientHeight-80,Y_=Math.min(Math.max(C-(i-y),80),n);f_.current=Y_,u.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",M_("previewHeight",String(Math.round(Y_))),document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",d)};document.addEventListener("mousemove",a),document.addEventListener("mouseup",d)}).current,c2=A((K)=>{K.preventDefault();let B=r_.current;if(!B)return;let y=K.touches[0];if(!y)return;let C=y.clientY,u=f_.current||280,i=K.currentTarget;i.classList.add("dragging"),document.body.style.userSelect="none";let a=(n)=>{let Y_=n.touches[0];if(!Y_)return;n.preventDefault();let B0=B.clientHeight-80,m_=Math.min(Math.max(u-(Y_.clientY-C),80),B0);B.style.setProperty("--preview-height",`${m_}px`),f_.current=m_},d=()=>{i.classList.remove("dragging"),document.body.style.userSelect="",M_("previewHeight",String(Math.round(f_.current||u))),document.removeEventListener("touchmove",a),document.removeEventListener("touchend",d),document.removeEventListener("touchcancel",d)};document.addEventListener("touchmove",a,{passive:!1}),document.addEventListener("touchend",d),document.addEventListener("touchcancel",d)}).current,p2=async()=>{if(!G)return;try{let K=await z3(G);if(K.media_id)z(K.media_id)}catch(K){M((B)=>({...B||{},error:K.message||"Failed to attach"}))}},h2=async()=>{if(!G||K_)return;await p0(G)},d0=(K)=>{return Array.from(K?.dataTransfer?.types||[]).includes("Files")},i2=b((K)=>{if(!d0(K))return;if(K.preventDefault(),R_.current+=1,!Q0.current)__(!0);X_("upload");let B=W0(K)||v_();C_(B),n_(B)},[v_,W0,C_,n_]),l2=b((K)=>{if(!d0(K))return;if(K.preventDefault(),K.dataTransfer)K.dataTransfer.dropEffect="copy";if(!Q0.current)__(!0);if(I0.current!=="upload")X_("upload");let B=W0(K)||v_();if(o_.current!==B)C_(B);n_(B)},[v_,W0,C_,n_]),r0=b((K)=>{if(!d0(K))return;if(K.preventDefault(),R_.current=Math.max(0,R_.current-1),R_.current===0)__(!1),X_(null),C_(null),u_()},[C_,u_]),f0=b(async(K,B=".")=>{let y=Array.from(K||[]);if(y.length===0)return;let C=B&&B!==""?B:".",u=C!=="."?C:"workspace root";J_(!0);try{let i=null;for(let a of y)try{i=await X1(a,C)}catch(d){let n=d?.status,Y_=d?.code;if(n===409||Y_==="file_exists"){let B0=a?.name||"file";if(!window.confirm(`"${B0}" already exists in ${u}. Overwrite?`))continue;i=await X1(a,C,{overwrite:!0})}else throw d}if(i?.path)W(i.path),g_.current?.(i.path);b_.current?.(C)}catch(i){c(i.message||"Failed to upload file")}finally{J_(!1)}},[]),v0=b(async(K,B)=>{if(!K)return;let y=F_.current?.get(K);if(!y)return;let C=B&&B!==""?B:".",u=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(C===u)return;try{let a=(await F3(K,C))?.path||K;if(y.type==="dir")V((d)=>{let n=new Set;for(let Y_ of d)if(Y_===K)n.add(a);else if(Y_.startsWith(`${K}/`))n.add(`${a}${Y_.slice(K.length)}`);else n.add(Y_);return n});if(W(a),y.type==="dir")M(null),f(!1),z(null);else g_.current?.(a);b_.current?.(u),b_.current?.(C)}catch(i){c(i?.message||"Failed to move entry")}},[]);K0.current=v0;let o2=b(async(K)=>{if(!d0(K))return;K.preventDefault(),R_.current=0,__(!1),X_(null),$_(null),u_();let B=Array.from(K?.dataTransfer?.files||[]);if(B.length===0)return;let y=o_.current||W0(K)||v_();await f0(B,y)},[v_,W0,f0]),n2=b((K)=>{if(K?.stopPropagation?.(),t)return;let B=K?.currentTarget?.dataset?.uploadTarget||".";T_.current=B,Z0.current?.click()},[t]),d2=b(()=>{if(t)return;let K=p_.current,B=K?F_.current?.get(K):null;T_.current=B?.type==="dir"?B.path:".",Z0.current?.click()},[t]),r2=b((K)=>{if(!K||K.button!==0)return;let B=K.currentTarget;if(!B||!B.dataset)return;let y=B.dataset.path;if(!y||y===".")return;if(G0.current===y)return;if(K.target?.closest?.("button, a, input, .workspace-caret"))return;K.preventDefault(),w.current={path:y,dragging:!1,startX:K.clientX,startY:K.clientY};let C=(i)=>{let a=w.current;if(!a?.path)return;let d=Math.abs(i.clientX-a.startX),n=Math.abs(i.clientY-a.startY),Y_=d>4||n>4;if(!a.dragging&&Y_)a.dragging=!0,B_.current=!0,__(!0),X_("move"),L0(a.path),O0(i.clientX,i.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(a.dragging){i.preventDefault(),O0(i.clientX,i.clientY);let B0=document.elementFromPoint(i.clientX,i.clientY),m_=Y0(B0)||v_();if(o_.current!==m_)C_(m_);n_(m_)}},u=()=>{document.removeEventListener("mousemove",C),document.removeEventListener("mouseup",u);let i=w.current;if(i?.dragging&&i.path){let a=o_.current||v_(),d=K0.current;if(typeof d==="function")d(i.path,a)}w.current={path:null,dragging:!1,startX:0,startY:0},R_.current=0,__(!1),X_(null),C_(null),u_(),C0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{B_.current=!1},0)};document.addEventListener("mousemove",C),document.addEventListener("mouseup",u)},[Y0,v_,L0,O0,C0,C_,n_,u_]),s2=b(async(K)=>{let B=Array.from(K?.target?.files||[]);if(B.length===0)return;let y=T_.current||".";if(await f0(B,y),T_.current=".",K?.target)K.target.value=""},[f0]);return q`
        <aside
            class=${`workspace-sidebar${p?" workspace-drop-active":""}`}
            ref=${r_}
            onDragEnter=${i2}
            onDragOver=${l2}
            onDragLeave=${r0}
            onDrop=${o2}
        >
            <input type="file" multiple style="display:none" ref=${Z0} onChange=${s2} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${l0} title="New file" disabled=${t}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${y0} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${h?" active":""}`}
                        onClick=${d_}
                        title=${h?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!h&&q`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${g2}>
                ${t&&q`<div class="workspace-drop-hint">Uploading…</div>`}
                ${k&&q`<div class="workspace-loading">Loading…</div>`}
                ${r&&q`<div class="workspace-error">${r}</div>`}
                ${X&&q`
                    <div
                        class="workspace-tree-list"
                        ref=${s_}
                        tabIndex="0"
                        onClick=${_0}
                        onDblClick=${c_}
                        onKeyDown=${k0}
                        onTouchStart=${A0}
                        onTouchEnd=${O2}
                        onTouchMove=${q2}
                        onTouchCancel=${O2}
                    >
                        ${e.map(({node:K,depth:B})=>{let y=K.type==="dir",C=K.path===G,u=K.path===Q,i=y&&j.has(K.path),a=S_&&K.path===S_,d=Array.isArray(K.children)&&K.children.length>0?K.children.length:Number(K.child_count)||0;return q`
                                <div
                                    key=${K.path}
                                    class=${`workspace-row${C?" selected":""}${a?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+B*M8}px`}}
                                    data-path=${K.path}
                                    data-type=${K.type}
                                    onMouseDown=${r2}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${y?i?q`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:q`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${y?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${y?q`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:q`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${u?q`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${m0}
                                                value=${H}
                                                onInput=${(n)=>U(n?.target?.value||"")}
                                                onKeyDown=${(n)=>{if(n.key==="Enter")n.preventDefault(),Q2();else if(n.key==="Escape")n.preventDefault(),q0()}}
                                                onBlur=${q0}
                                                onClick=${(n)=>n.stopPropagation()}
                                            />
                                        `:q`<span class="workspace-label">${K.name}</span>`}
                                    ${y&&!i&&d>0&&q`
                                        <span class="workspace-count">${d}</span>
                                    `}
                                    ${y&&q`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${K.path}
                                            title="Upload files to this folder"
                                            onClick=${n2}
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
            ${G&&q`
                <div class="workspace-preview-splitter-h" onMouseDown=${n0} onTouchStart=${c2}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${G}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${l0} title="New file" disabled=${t}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!K_&&q`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>e_&&I_.current?.(G,L)}
                                    title=${T0}
                                    disabled=${!e_}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${h2}
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
                            ${K_?q`
                                    <button class="workspace-download" onClick=${d2}
                                        title="Upload files to this folder" disabled=${t}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${E3(G,h)}
                                        title="Download folder as zip" onClick=${(K)=>K.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:q`<button class="workspace-download" onClick=${p2} title="Download">
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
                    ${L?.error&&q`<div class="workspace-error">${L.error}</div>`}
                    ${K_&&q`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${Q_?.loading&&q`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${Q_?.error&&q`<div class="workspace-error">${Q_.error}</div>`}
                        ${Q_?.payload&&Q_.payload.segments?.length>0&&q`
                            <${x8} payload=${Q_.payload} />
                        `}
                        ${Q_?.payload&&(!Q_.payload.segments||Q_.payload.segments.length===0)&&q`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${L&&!L.error&&!K_&&q`
                        <div class="workspace-preview-meta">
                            ${L.size?q`<span>${P0(L.size)}</span>`:""}
                            ${L.mtime?q`<span>${f2(L.mtime)}</span>`:""}
                            ${L.truncated?q`<span>truncated</span>`:""}
                        </div>
                        ${L.kind==="image"&&q`
                            <div class="workspace-preview-image">
                                <img src=${L.url||Q1(L.path)} alt="preview" />
                            </div>
                        `}
                        ${L.kind==="text"&&q`
                            ${L.content_type==="text/markdown"?q`<div class="workspace-preview-text"
                                    dangerouslySetInnerHTML=${{__html:Z2(L.text||"",null,{rewriteImageSrc:(K)=>I8(K,L.path||G)})}} />`:q`<pre class="workspace-preview-text"><code>${L.text||""}</code></pre>`}
                        `}
                        ${L.kind==="binary"&&q`
                            <div class="workspace-preview-text">Binary file — download to view.</div>
                        `}
                    `}
                    ${S&&q`
                        <div class="workspace-download-card">
                            <${T8} mediaId=${S} />
                        </div>
                    `}
                </div>
            `}
            ${G_&&q`
                <div class="workspace-drag-ghost" ref=${t_}>${G_.label}</div>
            `}
        </aside>
    `}function W4({tabs:_,activeId:$,onActivate:J,onClose:Y,onCloseOthers:X,onCloseAll:Z,onTogglePin:j,onTogglePreview:V,previewTabs:G,onToggleDock:W,dockVisible:Q}){let[E,H]=R(null),U=A(null);g(()=>{if(!E)return;let z=(k)=>{if(k.type==="keydown"&&k.key!=="Escape")return;H(null)};return document.addEventListener("click",z),document.addEventListener("keydown",z),()=>{document.removeEventListener("click",z),document.removeEventListener("keydown",z)}},[E]),g(()=>{let z=(k)=>{if(k.ctrlKey&&k.key==="Tab"){if(k.preventDefault(),!_.length)return;let x=_.findIndex((D)=>D.id===$);if(k.shiftKey){let D=_[(x-1+_.length)%_.length];J?.(D.id)}else{let D=_[(x+1)%_.length];J?.(D.id)}return}if((k.ctrlKey||k.metaKey)&&k.key==="w"){let x=document.querySelector(".editor-pane");if(x&&x.contains(document.activeElement)){if(k.preventDefault(),$)Y?.($)}}};return document.addEventListener("keydown",z),()=>document.removeEventListener("keydown",z)},[_,$,J,Y]);let L=b((z,k)=>{if(z.button===1){z.preventDefault(),Y?.(k);return}if(z.button===0)J?.(k)},[J,Y]),M=b((z,k)=>{z.preventDefault(),H({id:k,x:z.clientX,y:z.clientY})},[]),S=b((z,k)=>{z.stopPropagation(),Y?.(k)},[Y]);if(g(()=>{if(!$||!U.current)return;let z=U.current.querySelector(".tab-item.active");if(z)z.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return q`
        <div class="tab-strip" ref=${U} role="tablist">
            ${_.map((z)=>q`
                <div
                    key=${z.id}
                    class=${`tab-item${z.id===$?" active":""}${z.dirty?" dirty":""}${z.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${z.id===$}
                    title=${z.path}
                    onMouseDown=${(k)=>L(k,z.id)}
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
                        onClick=${(k)=>S(k,z.id)}
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
        ${E&&q`
            <div class="tab-context-menu" style=${{left:E.x+"px",top:E.y+"px"}}>
                <button onClick=${()=>{Y?.(E.id),H(null)}}>Close</button>
                <button onClick=${()=>{X?.(E.id),H(null)}}>Close Others</button>
                <button onClick=${()=>{Z?.(),H(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{j?.(E.id),H(null)}}>
                    ${_.find((z)=>z.id===E.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${V&&/\.(md|mdx|markdown)$/i.test(E.id)&&q`
                    <hr />
                    <button onClick=${()=>{V(E.id),H(null)}}>
                        ${G?.has(E.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var f8=400,F1=60,O4=220,L1="mdPreviewHeight";function v8(){try{let _=localStorage.getItem(L1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=F1?$:O4}catch{return O4}}function q4({getContent:_,path:$,onClose:J}){let[Y,X]=R(""),[Z,j]=R(v8),V=A(null),G=A(null),W=A(""),Q=A(_);return Q.current=_,g(()=>{let U=()=>{let M=Q.current?.()||"";if(M===W.current)return;W.current=M;try{let S=Z2(M,null,{sanitize:!1});X(S)}catch{X('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};U();let L=setInterval(U,f8);return()=>clearInterval(L)},[]),g(()=>{if(V.current&&Y)T2(V.current).catch(()=>{})},[Y]),q`
        <div
            class="md-preview-splitter"
            onMouseDown=${(U)=>{U.preventDefault();let L=U.clientY,M=G.current?.offsetHeight||Z,S=G.current?.parentElement,z=S?S.offsetHeight*0.7:500,k=U.currentTarget;k.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let x=(f)=>{let r=Math.min(Math.max(M-(f.clientY-L),F1),z);j(r)},D=()=>{k.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(L1,String(Math.round(G.current?.offsetHeight||Z)))}catch{}document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",D)};document.addEventListener("mousemove",x),document.addEventListener("mouseup",D)}}
            onTouchStart=${(U)=>{U.preventDefault();let L=U.touches[0];if(!L)return;let M=L.clientY,S=G.current?.offsetHeight||Z,z=G.current?.parentElement,k=z?z.offsetHeight*0.7:500,x=U.currentTarget;x.classList.add("dragging"),document.body.style.userSelect="none";let D=(r)=>{let c=r.touches[0];if(!c)return;r.preventDefault();let h=Math.min(Math.max(S-(c.clientY-M),F1),k);j(h)},f=()=>{x.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(L1,String(Math.round(G.current?.offsetHeight||Z)))}catch{}document.removeEventListener("touchmove",D),document.removeEventListener("touchend",f),document.removeEventListener("touchcancel",f)};document.addEventListener("touchmove",D,{passive:!1}),document.addEventListener("touchend",f),document.addEventListener("touchcancel",f)}}
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
    `}class N4{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,J=-1/0;for(let Y of this.extensions.values()){if(Y.placement!=="tabs")continue;if(!Y.canHandle)continue;try{let X=Y.canHandle(_);if(X===!1||X===0)continue;let Z=X===!0?0:typeof X==="number"?X:0;if(Z>J)J=Z,$=Y}catch(X){console.warn(`[PaneRegistry] canHandle() error for "${Y.id}":`,X)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var H0=new N4;var u2=null,E1=null;function B4(){if(E1)return Promise.resolve(E1);if(!u2)u2=import("/static/dist/editor.bundle.js").then((_)=>{return E1=_,_}).catch((_)=>{throw u2=null,_});return u2}class z4{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await B4();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){if(this.queuedViewStateCb=_,this.real&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(_)}restoreViewState(_){if(this.queuedViewState=_,this.real&&typeof this.real.restoreViewState==="function")this.real.restoreViewState(_)}getPath(){if(this.real&&typeof this.real.getPath==="function")return this.real.getPath();return this.context.path||""}setPath(_){if(this.real&&typeof this.real.setPath==="function")this.real.setPath(_)}}var D1={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;return 1},mount(_,$){return new z4(_,$)}};function C1(){B4().catch(()=>{})}class H4{container;disposed=!1;termEl;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0");let J=document.createElement("div");J.className="terminal-pane-header";let Y=document.createElement("span");Y.className="terminal-pane-title",Y.textContent="Terminal";let X=document.createElement("span");X.className="terminal-pane-status",X.textContent="Not connected",J.append(Y,X);let Z=document.createElement("div");Z.className="terminal-pane-body",Z.innerHTML='<div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>',this.termEl.append(J,Z),_.appendChild(this.termEl)}getContent(){return}isDirty(){return!1}focus(){this.termEl?.focus()}resize(){}dispose(){if(this.disposed)return;this.disposed=!0,this.termEl?.remove()}}var y1={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new H4(_,$)}};class U4{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let J of this.listeners)try{J(_,$)}catch{}}open(_,$){let J=this.tabs.get(_);if(!J)J={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,J);return this.activate(_),J}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,J]of this.tabs)if($!==_&&!J.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((Y)=>Y!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let J=this.tabs.get(_);if(!J||J.dirty===$)return;J.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let J=this.tabs.get(_);if(J)J.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,J){let Y=this.tabs.get(_);if(!Y)return;if(this.tabs.delete(_),Y.id=$,Y.path=$,Y.label=J||$.split("/").pop()||$,this.tabs.set($,Y),this.mruOrder=this.mruOrder.map((X)=>X===_?$:X),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Y)=>Y.id===this.activeId),J=_[($+1)%_.length];this.activate(J.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Y)=>Y.id===this.activeId),J=_[($-1+_.length)%_.length];this.activate(J.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var L_=new U4;function F4({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:J}){g(()=>{J();let Y=new j1(_,$);Y.connect();let X=()=>{Y.reconnectIfNeeded()};return window.addEventListener("focus",X),document.addEventListener("visibilitychange",X),()=>{window.removeEventListener("focus",X),document.removeEventListener("visibilitychange",X),Y.disconnect()}},[$,_,J])}function L4(){let[_,$]=R(!1),[J,Y]=R("default"),X=A(!1);g(()=>{let G=_2("notificationsEnabled",!1);if(X.current=G,$(G),typeof Notification<"u")Y(Notification.permission)},[]),g(()=>{X.current=_},[_]);let Z=b(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let G=Notification.requestPermission();if(G&&typeof G.then==="function")return G;return Promise.resolve(G)}catch{return Promise.resolve("default")}},[]),j=b(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){Y("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let W=await Z();if(Y(W||"default"),W!=="granted"){X.current=!1,$(!1),M_("notificationsEnabled","false");return}}let G=!X.current;X.current=G,$(G),M_("notificationsEnabled",String(G))},[Z]),V=b((G,W)=>{if(!X.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let Q=new Notification(G,{body:W});return Q.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:J,toggleNotifications:j,notify:V}}var W2=(_)=>{let $=new Set;return(_||[]).filter((J)=>{if(!J||$.has(J.id))return!1;return $.add(J.id),!0})};function E4({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[J,Y]=R(null),[X,Z]=R(!1),j=A(!1),V=A(null),G=A(!1),W=A(null);g(()=>{j.current=X},[X]);let Q=b(async(U=null)=>{try{if(U){let L=await Z3(U);Y(L.posts),Z(!1)}else{let L=await y2(10);Y(L.posts),Z(L.has_more)}}catch(L){console.error("Failed to load posts:",L)}},[]),E=b(async()=>{try{let U=await y2(10);Y((L)=>{if(!L||L.length===0)return U.posts;return W2([...U.posts,...L])}),Z((L)=>L||U.has_more)}catch(U){console.error("Failed to refresh timeline:",U)}},[]),H=b(async(U={})=>{if(!J||J.length===0)return;if(G.current)return;let{preserveScroll:L=!0,preserveMode:M="top",allowRepeat:S=!1}=U,z=(D)=>{if(!L){D();return}if(M==="top")$(D);else _(D)},x=J.slice().sort((D,f)=>D.id-f.id)[0]?.id;if(!Number.isFinite(x))return;if(!S&&W.current===x)return;G.current=!0,W.current=x;try{let D=await y2(10,x);if(D.posts.length>0)z(()=>{Y((f)=>W2([...D.posts,...f||[]])),Z(D.has_more)});else Z(!1)}catch(D){console.error("Failed to load more posts:",D)}finally{G.current=!1}},[J,_,$]);return g(()=>{V.current=H},[H]),{posts:J,setPosts:Y,hasMore:X,setHasMore:Z,hasMoreRef:j,loadPosts:Q,refreshTimeline:E,loadMore:H,loadMoreRef:V,loadingMoreRef:G,lastBeforeIdRef:W}}function D4(){let[_,$]=R(null),[J,Y]=R({text:"",totalLines:0}),[X,Z]=R(""),[j,V]=R({text:"",totalLines:0}),[G,W]=R(null),[Q,E]=R(null),[H,U]=R(null),L=A(null),M=A(0),S=A(!1),z=A(""),k=A(""),x=A(null),D=A(null),f=A(null),r=A(null),c=A(!1),h=A(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:J,setAgentDraft:Y,agentPlan:X,setAgentPlan:Z,agentThought:j,setAgentThought:V,pendingRequest:G,setPendingRequest:W,currentTurnId:Q,setCurrentTurnId:E,steerQueuedTurnId:H,setSteerQueuedTurnId:U,lastAgentEventRef:L,lastSilenceNoticeRef:M,isAgentRunningRef:S,draftBufferRef:z,thoughtBufferRef:k,pendingRequestRef:x,stalledPostIdRef:D,currentTurnIdRef:f,steerQueuedTurnIdRef:r,thoughtExpandedRef:c,draftExpandedRef:h}}function C4({appShellRef:_,sidebarWidthRef:$,editorWidthRef:J,dockHeightRef:Y}){let X=A((Q)=>{Q.preventDefault();let E=_.current;if(!E)return;let H=Q.clientX,U=$.current||280,L=Q.currentTarget;L.classList.add("dragging"),E.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let M=H,S=(k)=>{M=k.clientX;let x=Math.min(Math.max(U+(k.clientX-H),160),600);E.style.setProperty("--sidebar-width",`${x}px`),$.current=x},z=()=>{let k=Math.min(Math.max(U+(M-H),160),600);$.current=k,L.classList.remove("dragging"),E.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",M_("sidebarWidth",String(Math.round(k))),document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",S),document.addEventListener("mouseup",z)}).current,Z=A((Q)=>{Q.preventDefault();let E=_.current;if(!E)return;let H=Q.touches[0];if(!H)return;let U=H.clientX,L=$.current||280,M=Q.currentTarget;M.classList.add("dragging"),E.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let S=(k)=>{let x=k.touches[0];if(!x)return;k.preventDefault();let D=Math.min(Math.max(L+(x.clientX-U),160),600);E.style.setProperty("--sidebar-width",`${D}px`),$.current=D},z=()=>{M.classList.remove("dragging"),E.classList.remove("sidebar-resizing"),document.body.style.userSelect="",M_("sidebarWidth",String(Math.round($.current||L))),document.removeEventListener("touchmove",S),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",S,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current,j=A((Q)=>{Q.preventDefault();let E=_.current;if(!E)return;let H=Q.clientX,U=J.current||$.current||280,L=Q.currentTarget;L.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let M=H,S=(k)=>{M=k.clientX;let x=Math.min(Math.max(U+(k.clientX-H),200),800);E.style.setProperty("--editor-width",`${x}px`),J.current=x},z=()=>{let k=Math.min(Math.max(U+(M-H),200),800);J.current=k,L.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",M_("editorWidth",String(Math.round(k))),document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",S),document.addEventListener("mouseup",z)}).current,V=A((Q)=>{Q.preventDefault();let E=_.current;if(!E)return;let H=Q.touches[0];if(!H)return;let U=H.clientX,L=J.current||$.current||280,M=Q.currentTarget;M.classList.add("dragging"),document.body.style.userSelect="none";let S=(k)=>{let x=k.touches[0];if(!x)return;k.preventDefault();let D=Math.min(Math.max(L+(x.clientX-U),200),800);E.style.setProperty("--editor-width",`${D}px`),J.current=D},z=()=>{M.classList.remove("dragging"),document.body.style.userSelect="",M_("editorWidth",String(Math.round(J.current||L))),document.removeEventListener("touchmove",S),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",S,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current,G=A((Q)=>{Q.preventDefault();let E=_.current;if(!E)return;let H=Q.clientY,U=Y?.current||200,L=Q.currentTarget;L.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let M=H,S=(k)=>{M=k.clientY;let x=Math.min(Math.max(U-(k.clientY-H),100),window.innerHeight*0.5);if(E.style.setProperty("--dock-height",`${x}px`),Y)Y.current=x},z=()=>{let k=Math.min(Math.max(U-(M-H),100),window.innerHeight*0.5);if(Y)Y.current=k;L.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",M_("dockHeight",String(Math.round(k))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",S),document.addEventListener("mouseup",z)}).current,W=A((Q)=>{Q.preventDefault();let E=_.current;if(!E)return;let H=Q.touches[0];if(!H)return;let U=H.clientY,L=Y?.current||200,M=Q.currentTarget;M.classList.add("dragging"),document.body.style.userSelect="none";let S=(k)=>{let x=k.touches[0];if(!x)return;k.preventDefault();let D=Math.min(Math.max(L-(x.clientY-U),100),window.innerHeight*0.5);if(E.style.setProperty("--dock-height",`${D}px`),Y)Y.current=D},z=()=>{M.classList.remove("dragging"),document.body.style.userSelect="",M_("dockHeight",String(Math.round(Y?.current||L))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",S),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",S,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current;return{handleSplitterMouseDown:X,handleSplitterTouchStart:Z,handleEditorSplitterMouseDown:j,handleEditorSplitterTouchStart:V,handleDockSplitterMouseDown:G,handleDockSplitterTouchStart:W}}function y4({onTabClosed:_}={}){let $=A(_);$.current=_;let[J,Y]=R(()=>L_.getTabs()),[X,Z]=R(()=>L_.getActiveId()),[j,V]=R(()=>L_.getTabs().length>0);g(()=>{return L_.onChange((D,f)=>{Y(D),Z(f),V(D.length>0)})},[]);let[G,W]=R(()=>new Set),Q=b((D)=>{W((f)=>{let r=new Set(f);if(r.has(D))r.delete(D);else r.add(D);return r})},[]),E=b((D)=>{W((f)=>{if(!f.has(D))return f;let r=new Set(f);return r.delete(D),r})},[]),H=b((D)=>{if(!D)return;let f={path:D,mode:"edit"};try{if(!H0.resolve(f)){if(!H0.get("editor")){console.warn(`[openEditor] No pane handler for: ${D}`);return}}}catch(r){console.warn(`[openEditor] paneRegistry.resolve() error for "${D}":`,r)}L_.open(D)},[]),U=b(()=>{let D=L_.getActiveId();if(D){let f=L_.get(D);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}L_.close(D),E(D),$.current?.(D)}},[E]),L=b((D)=>{let f=L_.get(D);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}L_.close(D),E(D),$.current?.(D)},[E]),M=b((D)=>{L_.activate(D)},[]),S=b((D)=>{let f=L_.getTabs().filter((h)=>h.id!==D&&!h.pinned),r=f.filter((h)=>h.dirty).length;if(r>0){if(!window.confirm(`${r} unsaved tab${r>1?"s":""} will be closed. Continue?`))return}let c=f.map((h)=>h.id);L_.closeOthers(D),c.forEach((h)=>{E(h),$.current?.(h)})},[E]),z=b(()=>{let D=L_.getTabs().filter((c)=>!c.pinned),f=D.filter((c)=>c.dirty).length;if(f>0){if(!window.confirm(`${f} unsaved tab${f>1?"s":""} will be closed. Continue?`))return}let r=D.map((c)=>c.id);L_.closeAll(),r.forEach((c)=>{E(c),$.current?.(c)})},[E]),k=b((D)=>{L_.togglePin(D)},[]),x=b(()=>{let D=L_.getActiveId();if(D)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:D}}))},[]);return g(()=>{let D=(f)=>{let{oldPath:r,newPath:c,type:h}=f.detail||{};if(!r||!c)return;if(h==="dir"){for(let j_ of L_.getTabs())if(j_.path===r||j_.path.startsWith(`${r}/`)){let p=`${c}${j_.path.slice(r.length)}`;L_.rename(j_.id,p)}}else L_.rename(r,c)};return window.addEventListener("workspace-file-renamed",D),()=>window.removeEventListener("workspace-file-renamed",D)},[]),g(()=>{let D=(f)=>{if(L_.hasUnsaved())f.preventDefault(),f.returnValue=""};return window.addEventListener("beforeunload",D),()=>window.removeEventListener("beforeunload",D)},[]),{editorOpen:j,tabStripTabs:J,tabStripActiveId:X,previewTabs:G,openEditor:H,closeEditor:U,handleTabClose:L,handleTabActivate:M,handleTabCloseOthers:S,handleTabCloseAll:z,handleTabTogglePin:k,handleTabTogglePreview:Q,revealInExplorer:x}}function k1(_,$){try{if(typeof window>"u")return $;let J=window.__PICLAW_SILENCE||{},Y=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,X=J[_]??window[Y],Z=Number(X);return Number.isFinite(Z)?Z:$}catch{return $}}var A1=k1("warning",30000),k4=k1("finalize",120000),A4=k1("refresh",30000),w4=30000;function M4(_){let $={};return(_?.agents||[]).forEach((J)=>{$[J.id]=J}),$}function P4(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function I4(_=30000){let[,$]=R(0);g(()=>{let J=setInterval(()=>$((Y)=>Y+1),_);return()=>clearInterval(J)},[_])}function m2(_,$=160){let J=String(_||"").replace(/\r\n/g,`
`);if(!J)return 0;return J.split(`
`).reduce((Y,X)=>Y+Math.max(1,Math.ceil(X.length/$)),0)}function f4(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var R8=X3,b4=j3,u8=K3,S4=O3,x4=q3,T4=G3,w1=typeof Y1==="function"?Y1:f4("getAgentContext",null),m8=typeof h0==="function"?h0:f4("getAgentModels",{current:null,models:[]});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});H0.register(D1);C1();var g8=typeof localStorage<"u"&&localStorage.getItem("experimentalPanes")==="true";if(g8)H0.register(y1);function c8(){let[_,$]=R("disconnected"),[J,Y]=R(null),[X,Z]=R(null),[j,V]=R(!1),[G,W]=R([]),[Q,E]=R([]),{agentStatus:H,setAgentStatus:U,agentDraft:L,setAgentDraft:M,agentPlan:S,setAgentPlan:z,agentThought:k,setAgentThought:x,pendingRequest:D,setPendingRequest:f,currentTurnId:r,setCurrentTurnId:c,steerQueuedTurnId:h,setSteerQueuedTurnId:j_,lastAgentEventRef:p,lastSilenceNoticeRef:__,isAgentRunningRef:O_,draftBufferRef:X_,thoughtBufferRef:G_,pendingRequestRef:W_,stalledPostIdRef:S_,currentTurnIdRef:$_,steerQueuedTurnIdRef:t,thoughtExpandedRef:J_,draftExpandedRef:Q_}=D4(),[V_,z_]=R({}),[E_,q_]=R(null),[A_,w_]=R(null),[H_,P_]=R(!1),[x_,F_]=R(null),[l_,I_]=R(null),{notificationsEnabled:g_,notificationPermission:b_,toggleNotifications:r_,notify:s_}=L4(),[m0,Z0]=R(()=>new Set),[T_,y_]=R(()=>_2("workspaceOpen",!0)),a_=A(null),{editorOpen:w,tabStripTabs:s,tabStripActiveId:B_,previewTabs:f_,openEditor:E0,closeEditor:U0,handleTabClose:D0,handleTabActivate:$0,handleTabCloseOthers:X0,handleTabCloseAll:g0,handleTabTogglePin:R_,handleTabTogglePreview:o_,revealInExplorer:Q0}=y4({onTabClosed:(O)=>a_.current?.(O)}),I0=A(null),t_=A(null);g(()=>{let O=I0.current;if(!O)return;if(t_.current)t_.current.dispose(),t_.current=null;let N=B_;if(!N)return;let P={path:N,mode:"edit"},v=H0.resolve(P)||H0.get("editor");if(!v){O.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let m=v.mount(O,P);t_.current=m,m.onDirtyChange?.((o)=>{L_.setDirty(N,o)}),m.onSaveRequest?.(()=>{}),m.onClose?.(()=>{U0()});let T=L_.getViewState(N);if(T&&typeof m.restoreViewState==="function")requestAnimationFrame(()=>m.restoreViewState(T));if(typeof m.onViewStateChange==="function")m.onViewStateChange((o)=>{L_.saveViewState(N,o)});return requestAnimationFrame(()=>m.focus()),()=>{if(t_.current===m)m.dispose(),t_.current=null}},[B_,U0]);let[b0,j0]=R({name:"You",avatar_url:null,avatar_background:null}),K0=A(!1),p_=A(!1),G0=A({}),V0=A({name:null,avatar_url:null}),h_=A({currentHashtag:null,searchQuery:null}),F0=A(null),w0=A(null),S0=A(0),v_=A(0),Y0=A(0),W0=A(null),C_=A(null),u_=A(null),n_=A(0),O0=A({title:null,avatarBase:null});I4(30000),g(()=>{return I3()},[]),g(()=>{M_("workspaceOpen",String(T_))},[T_]),g(()=>{G0.current=V_||{}},[V_]),g(()=>{V0.current=b0||{name:"You",avatar_url:null,avatar_background:null}},[b0]);let L0=b((O,N,P=null)=>{if(typeof document>"u")return;let v=(O||"").trim()||"PiClaw";if(O0.current.title!==v){document.title=v;let k_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(k_&&k_.getAttribute("content")!==v)k_.setAttribute("content",v);O0.current.title=v}let m=document.getElementById("dynamic-favicon");if(!m)return;let T=m.getAttribute("data-default")||m.getAttribute("href")||"/favicon.ico",o=N||T,N_=N?`${o}|${P||""}`:o;if(O0.current.avatarBase!==N_){let k_=N?`${o}${o.includes("?")?"&":"?"}v=${P||Date.now()}`:o;m.setAttribute("href",k_),O0.current.avatarBase=N_}},[]),C0=b((O)=>{if(!O)return;W((N)=>N.includes(O)?N:[...N,O])},[]),c0=b((O)=>{W((N)=>N.filter((P)=>P!==O))},[]);a_.current=c0;let q0=b(()=>{W([])},[]),X2=b(()=>{let O=B_;if(O)C0(O)},[B_,C0]),Q2=b((O)=>{if(!O)return;E((N)=>N.includes(O)?N:[...N,O])},[]),x0=b(async(O)=>{let N=(v)=>{v.scrollIntoView({behavior:"smooth",block:"center"}),v.classList.add("post-highlight"),setTimeout(()=>v.classList.remove("post-highlight"),2000)},P=document.getElementById("post-"+O);if(P){N(P);return}try{let m=(await Q3(O))?.thread?.[0];if(!m)return;d_((T)=>{if(!T)return[m];if(T.some((o)=>o.id===m.id))return T;return[...T,m]}),requestAnimationFrame(()=>{setTimeout(()=>{let T=document.getElementById("post-"+O);if(T)N(T)},50)})}catch(v){console.error("[scrollToMessage] Failed to fetch message",O,v)}},[]),l0=b((O)=>{E((N)=>N.filter((P)=>P!==O))},[]),F=b(()=>{E([])},[]),I=b((O={})=>{let N=Date.now();if(p.current=N,O.running)O_.current=!0;if(O.clearSilence)__.current=0},[]),l=b(()=>{if(u_.current)clearTimeout(u_.current),u_.current=null;n_.current=0},[]);g(()=>()=>{l()},[l]);let e=b(()=>{l(),U((O)=>{if(!O)return O;if(!(O.last_activity||O.lastActivity))return O;let{last_activity:N,lastActivity:P,...v}=O;return v})},[l]),U_=b((O)=>{if(!O)return;l();let N=Date.now();n_.current=N,U({type:O.type||"active",last_activity:!0}),u_.current=setTimeout(()=>{if(n_.current!==N)return;U((P)=>{if(!P||!(P.last_activity||P.lastActivity))return P;return null})},w4)},[l]),D_=b(()=>{O_.current=!1,p.current=null,__.current=0,X_.current="",G_.current="",W_.current=null,C_.current=null,$_.current=null,t.current=null,l(),c(null),j_(null),J_.current=!1,Q_.current=!1},[l,c,j_]),K_=b((O)=>{if(!O)return;if($_.current===O)return;$_.current=O,c(O),t.current=null,j_(null),X_.current="",G_.current="",M({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null),W_.current=null,C_.current=null,J_.current=!1,Q_.current=!1},[c,j_]),e_=b((O)=>{if(typeof document<"u"){let k_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&k_)return}let N=C_.current;if(!N||!N.post)return;if(O&&N.turnId&&N.turnId!==O)return;let P=N.post;if(P.id&&W0.current===P.id)return;let v=String(P?.data?.content||"").trim();if(!v)return;W0.current=P.id||W0.current,C_.current=null;let m=v.replace(/\s+/g," ").slice(0,200),T=G0.current||{},N_=(P?.data?.agent_id?T[P.data.agent_id]:null)?.name||"Pi";s_(N_,m)},[s_]),T0=b(async(O,N)=>{if(O!=="thought"&&O!=="draft")return;let P=$_.current;if(O==="thought"){if(J_.current=N,P)try{await x4(P,"thought",N)}catch(v){console.warn("Failed to update thought visibility:",v)}if(!N)return;try{let v=P?await S4(P,"thought"):null;if(v?.text)G_.current=v.text;x((m)=>({...m||{text:"",totalLines:0},fullText:G_.current||m?.fullText||"",totalLines:Number.isFinite(v?.total_lines)?v.total_lines:m?.totalLines||0}))}catch(v){console.warn("Failed to fetch full thought:",v)}return}if(Q_.current=N,P)try{await x4(P,"draft",N)}catch(v){console.warn("Failed to update draft visibility:",v)}if(!N)return;try{let v=P?await S4(P,"draft"):null;if(v?.text)X_.current=v.text;M((m)=>({...m||{text:"",totalLines:0},fullText:X_.current||m?.fullText||"",totalLines:Number.isFinite(v?.total_lines)?v.total_lines:m?.totalLines||0}))}catch(v){console.warn("Failed to fetch full draft:",v)}},[]),N0=A(null),c_=b(()=>{if(F0.current)F0.current.scrollTop=0},[]);N0.current=c_;let _0=b((O)=>{let N=F0.current;if(!N||typeof O!=="function"){O?.();return}let{currentHashtag:P,searchQuery:v}=h_.current||{},m=!(v&&!P),T=m?N.scrollHeight-N.scrollTop:N.scrollTop;O(),requestAnimationFrame(()=>{let o=F0.current;if(!o)return;if(m){let N_=Math.max(o.scrollHeight-T,0);o.scrollTop=N_}else{let N_=Math.max(o.scrollHeight-o.clientHeight,0),k_=Math.min(T,N_);o.scrollTop=k_}})},[]),y0=b((O)=>{let N=F0.current;if(!N||typeof O!=="function"){O?.();return}let P=N.scrollTop;O(),requestAnimationFrame(()=>{let v=F0.current;if(!v)return;let m=Math.max(v.scrollHeight-v.clientHeight,0);v.scrollTop=Math.min(P,m)})},[]),{posts:J0,setPosts:d_,hasMore:g2,setHasMore:p0,hasMoreRef:o0,loadPosts:k0,refreshTimeline:A0,loadMore:O2,loadMoreRef:q2}=E4({preserveTimelineScroll:_0,preserveTimelineScrollTop:y0}),n0=b(()=>{let O=S_.current;if(!O)return;d_((N)=>N?N.filter((P)=>P.id!==O):N),S_.current=null},[d_]),{handleSplitterMouseDown:c2,handleSplitterTouchStart:p2,handleEditorSplitterMouseDown:h2,handleEditorSplitterTouchStart:d0,handleDockSplitterMouseDown:i2,handleDockSplitterTouchStart:l2}=C4({appShellRef:w0,sidebarWidthRef:S0,editorWidthRef:v_,dockHeightRef:Y0}),r0=b(()=>{if(!O_.current)return;O_.current=!1,__.current=0,p.current=null,$_.current=null,c(null),J_.current=!1,Q_.current=!1;let O=(X_.current||"").trim();if(X_.current="",G_.current="",M({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null),W_.current=null,C_.current=null,!O){U({type:"error",title:"Response stalled — No content received"});return}let P=`${O}${`

⚠️ Response may be incomplete — the model stopped responding`}`,v=Date.now(),m=new Date().toISOString(),T={id:v,timestamp:m,data:{type:"agent_response",content:P,agent_id:"default",is_local_stall:!0}};S_.current=v,d_((o)=>o?W2([...o,T]):[T]),N0.current?.(),U(null)},[c]);g(()=>{h_.current={currentHashtag:J,searchQuery:X}},[J,X]),g(()=>{let O=Math.min(1000,Math.max(100,Math.floor(A1/2))),N=setInterval(()=>{if(!O_.current)return;if(W_.current)return;let P=p.current;if(!P)return;let v=Date.now(),m=v-P;if(m>=k4){r0();return}if(m>=A1){if(v-__.current>=A4){let T=Math.floor(m/1000);U({type:"waiting",title:`Waiting for model… No events for ${T}s`}),__.current=v}}},O);return()=>clearInterval(N)},[r0]);let f0=b(async()=>{try{let O=await w1();if(O)I_(O)}catch(O){console.warn("Failed to fetch agent context:",O)}},[]),v0=b(async()=>{try{let O=await T4("web:default");if(!O||O.status!=="active"||!O.data){if(p_.current){let{currentHashtag:v,searchQuery:m}=h_.current||{};if(!v&&!m)A0()}p_.current=!1,D_(),U(null),M({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null),W_.current=null;return}p_.current=!0;let N=O.data,P=N.turn_id||N.turnId;if(P)K_(P);if(I({running:!0,clearSilence:!0}),e(),U(N),O.thought&&O.thought.text)x((v)=>{if(v&&v.text&&v.text.length>=O.thought.text.length)return v;return G_.current=O.thought.text,{text:O.thought.text,totalLines:O.thought.totalLines||0}});if(O.draft&&O.draft.text)M((v)=>{if(v&&v.text&&v.text.length>=O.draft.text.length)return v;return X_.current=O.draft.text,{text:O.draft.text,totalLines:O.draft.totalLines||0}})}catch(O){console.warn("Failed to fetch agent status:",O)}},[D_,e,I,A0,K_]),o2=b((O)=>{if($(O),O!=="connected"){U(null),M({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null),W_.current=null,D_();return}if(!K0.current){K0.current=!0,v0();return}let{currentHashtag:N,searchQuery:P}=h_.current;if(!N&&!P)A0();v0()},[D_,A0,v0]),n2=b(async(O)=>{Y(O),d_(null),await k0(O)},[k0]),d2=b(async()=>{Y(null),Z(null),d_(null),await k0()},[k0]),r2=b(async(O)=>{if(!O||!O.trim())return;Z(O.trim()),Y(null),d_(null);try{let N=await R8(O.trim());d_(N.results),p0(!1)}catch(N){console.error("Failed to search:",N),d_([])}},[]),s2=b(()=>{V(!0),Z(null),Y(null),d_([])},[]),K=b(()=>{V(!1),Z(null),k0()},[k0]),B=b(()=>{},[]),y=b(async(O)=>{if(!O)return;let N=O.id,P=J0?.filter((m)=>m?.data?.thread_id===N&&m?.id!==N).length||0;if(P>0){if(!window.confirm(`Delete this message and its ${P} replies?`))return}let v=(m)=>{if(!m.length)return;Z0((o)=>{let N_=new Set(o);return m.forEach((k_)=>N_.add(k_)),N_}),setTimeout(()=>{if(y0(()=>{d_((o)=>o?o.filter((N_)=>!m.includes(N_.id)):o)}),Z0((o)=>{let N_=new Set(o);return m.forEach((k_)=>N_.delete(k_)),N_}),o0.current)q2.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let m=await b4(N,P>0);if(m?.ids?.length)v(m.ids)}catch(m){let T=m?.message||"";if(P===0&&T.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let N_=await b4(N,!0);if(N_?.ids?.length)v(N_.ids);return}console.error("Failed to delete post:",m),alert(`Failed to delete message: ${T}`)}},[J0,y0]),C=b(async()=>{try{let O=await u8();z_(M4(O));let N=O?.user||{};j0((v)=>{let m=typeof N.name==="string"&&N.name.trim()?N.name.trim():"You",T=typeof N.avatar_url==="string"?N.avatar_url.trim():null,o=typeof N.avatar_background==="string"&&N.avatar_background.trim()?N.avatar_background.trim():null;if(v.name===m&&v.avatar_url===T&&v.avatar_background===o)return v;return{name:m,avatar_url:T,avatar_background:o}});let P=(O?.agents||[]).find((v)=>v.id==="default");if(P?.model)q_(P.model);L0(P?.name,P?.avatar_url)}catch(O){console.warn("Failed to load agents:",O)}try{let O=await w1();if(O)I_(O)}catch{}},[L0]);g(()=>{C();let O=$2("sidebarWidth",null),N=Number.isFinite(O)?Math.min(Math.max(O,160),600):280;if(S0.current=N,w0.current)w0.current.style.setProperty("--sidebar-width",`${N}px`)},[C]);let u=b((O)=>{if(!O||typeof O!=="object")return;let N=O.agent_id;if(!N)return;let{agent_name:P,agent_avatar:v}=O;if(!P&&v===void 0)return;let m=G0.current?.[N]||{id:N},T=m.name||null,o=m.avatar_url??m.avatarUrl??m.avatar??null,N_=!1,k_=!1;if(P&&P!==m.name)T=P,k_=!0;if(v!==void 0){let s0=typeof v==="string"?v.trim():null,M1=typeof o==="string"?o.trim():null,a0=s0||null;if(a0!==(M1||null))o=a0,N_=!0}if(!k_&&!N_)return;if(z_((s0)=>{let a0={...s0[N]||{id:N}};if(k_)a0.name=T;if(N_)a0.avatar_url=o;return{...s0,[N]:a0}}),N==="default")L0(T,o,N_?Date.now():null)},[L0]),i=b((O)=>{if(!O||typeof O!=="object")return;let N=O.user_name??O.userName,P=O.user_avatar??O.userAvatar,v=O.user_avatar_background??O.userAvatarBackground;if(N===void 0&&P===void 0&&v===void 0)return;j0((m)=>{let T=typeof N==="string"&&N.trim()?N.trim():m.name||"You",o=P===void 0?m.avatar_url:typeof P==="string"&&P.trim()?P.trim():null,N_=v===void 0?m.avatar_background:typeof v==="string"&&v.trim()?v.trim():null;if(m.name===T&&m.avatar_url===o&&m.avatar_background===N_)return m;return{name:T,avatar_url:o,avatar_background:N_}})},[]),a=b((O)=>{if(!O||typeof O!=="object")return;let N=O.model??O.current;if(N!==void 0)q_(N);if(O.thinking_level!==void 0)w_(O.thinking_level??null);if(O.supports_thinking!==void 0)P_(Boolean(O.supports_thinking));if(O.provider_usage!==void 0)F_(O.provider_usage??null)},[]),d=b(()=>{m8().then((O)=>{if(O)a(O)}).catch(()=>{})},[a]);g(()=>{d();let O=setInterval(()=>{d()},60000);return()=>clearInterval(O)},[d]);let n=b((O,N)=>{let P=N?.turn_id;if(u(N),i(N),O==="ui_theme"){b3(N);return}if(O?.startsWith("agent_"))e();if(O==="connected"){U(null),M({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null),W_.current=null,D_(),T4("web:default").then((T)=>{if(!T||T.status!=="active"||!T.data)return;let o=T.data,N_=o.turn_id||o.turnId;if(N_)K_(N_);if(I({clearSilence:!0}),U_(o),T.thought&&T.thought.text)G_.current=T.thought.text,x({text:T.thought.text,totalLines:T.thought.totalLines||0});if(T.draft&&T.draft.text)X_.current=T.draft.text,M({text:T.draft.text,totalLines:T.draft.totalLines||0})}).catch((T)=>{console.warn("Failed to fetch agent status:",T)}),d();return}if(O==="agent_status"){if(N.type==="done"||N.type==="error"){if(P&&$_.current&&P!==$_.current)return;if(N.type==="done"){e_(P||$_.current);let{currentHashtag:T,searchQuery:o}=h_.current||{};if(!T&&!o)A0();if(N.context_usage)I_(N.context_usage)}if(p_.current=!1,D_(),M({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null),N.type==="error")U({type:"error",title:N.title||"Agent error"}),setTimeout(()=>U(null),8000);else U(null)}else{if(P)K_(P);if(I({running:!0,clearSilence:!0}),N.type==="thinking")X_.current="",G_.current="",M({text:"",totalLines:0}),z(""),x({text:"",totalLines:0});U(N)}return}if(O==="agent_steer_queued"){if(P&&$_.current&&P!==$_.current)return;let T=P||$_.current;if(!T)return;t.current=T,j_(T);return}if(O==="agent_draft_delta"){if(P&&$_.current&&P!==$_.current)return;if(P&&!$_.current)K_(P);if(I({running:!0,clearSilence:!0}),N?.reset)X_.current="";if(N?.delta)X_.current+=N.delta;if(Q_.current){let T=X_.current;M((o)=>({text:o?.text||"",totalLines:m2(T),fullText:T}))}else{let T=X_.current,o=m2(T);M({text:T,totalLines:o})}return}if(O==="agent_draft"){if(P&&$_.current&&P!==$_.current)return;if(P&&!$_.current)K_(P);I({running:!0,clearSilence:!0});let T=N.text||"",o=N.mode||(N.kind==="plan"?"replace":"append"),N_=Number.isFinite(N.total_lines)?N.total_lines:T?T.replace(/\r\n/g,`
`).split(`
`).length:0;if(N.kind==="plan")if(o==="replace")z(T);else z((k_)=>(k_||"")+T);else if(!Q_.current)X_.current=T,M({text:T,totalLines:N_});return}if(O==="agent_thought_delta"){if(P&&$_.current&&P!==$_.current)return;if(P&&!$_.current)K_(P);if(I({running:!0,clearSilence:!0}),N?.reset)G_.current="";if(typeof N?.delta==="string")G_.current+=N.delta;if(J_.current){let T=G_.current;x((o)=>({text:o?.text||"",totalLines:m2(T),fullText:T}))}return}if(O==="agent_thought"){if(P&&$_.current&&P!==$_.current)return;if(P&&!$_.current)K_(P);I({running:!0,clearSilence:!0});let T=N.text||"",o=Number.isFinite(N.total_lines)?N.total_lines:T?T.replace(/\r\n/g,`
`).split(`
`).length:0;if(!J_.current)G_.current=T,x({text:T,totalLines:o});return}if(O==="agent_request"){if(console.log("Agent request:",N),P&&$_.current&&P!==$_.current)return;if(P)K_(P);I({running:!0,clearSilence:!0}),f(N),W_.current=N;return}if(O==="agent_request_timeout"){if(console.log("Agent request timeout:",N),P&&$_.current&&P!==$_.current)return;f(null),W_.current=null,D_(),U({type:"error",title:"Permission request timed out"});return}if(O==="model_changed"){if(N?.model!==void 0)q_(N.model);if(N?.thinking_level!==void 0)w_(N.thinking_level??null);if(N?.supports_thinking!==void 0)P_(Boolean(N.supports_thinking));w1().then((T)=>{if(T)I_(T)}).catch(()=>{});return}if(O==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:N}));return}let{currentHashtag:v,searchQuery:m}=h_.current;if(O==="agent_response")n0(),C_.current={post:N,turnId:$_.current};if(!v&&!m&&(O==="new_post"||O==="agent_response"))d_((T)=>{if(!T)return[N];if(T.some((o)=>o.id===N.id))return T;return[...T,N]}),N0.current?.();if(O==="interaction_updated")d_((T)=>T?T.map((o)=>o.id===N.id?N:o):T);if(O==="interaction_deleted"){let T=N?.ids||[];if(T.length){y0(()=>{d_((k_)=>k_?k_.filter((s0)=>!T.includes(s0.id)):k_)});let{currentHashtag:o,searchQuery:N_}=h_.current;if(o0.current&&!o&&!N_)q2.current?.({preserveScroll:!0,preserveMode:"top"})}}},[D_,e,I,e_,y0,A0,n0,K_,U_,u,i,d]);g(()=>{if(typeof window>"u")return;let O=window.__PICLAW_TEST_API||{};return O.emit=n,O.reset=()=>{n0(),D_(),U(null),M({text:"",totalLines:0}),z(""),x({text:"",totalLines:0}),f(null)},O.finalize=()=>r0(),window.__PICLAW_TEST_API=O,()=>{if(window.__PICLAW_TEST_API===O)window.__PICLAW_TEST_API=void 0}},[D_,r0,n,n0]),F4({handleSseEvent:n,handleConnectionStatusChange:o2,loadPosts:k0}),g(()=>{if(!J0||J0.length===0)return;let O=location.hash;if(!O||!O.startsWith("#msg-"))return;let N=O.slice(5);x0(N),history.replaceState(null,"",location.pathname+location.search)},[J0,x0]);let Y_=H!==null;g(()=>{if(_!=="connected")return;let N=setInterval(()=>{if(Y_)v0(),f0();else{let{currentHashtag:P,searchQuery:v}=h_.current||{};if(!P&&!v)A0();v0(),f0()}},Y_?15000:60000);return()=>clearInterval(N)},[_,Y_,v0,f0,A0]);let B0=b(()=>{y_((O)=>!O)},[]);g(()=>{if(!w)return;if(typeof window>"u")return;let O=w0.current;if(!O)return;if(!v_.current){let N=$2("editorWidth",null),P=S0.current||280;v_.current=Number.isFinite(N)?N:P}if(O.style.setProperty("--editor-width",`${v_.current}px`),!Y0.current){let N=$2("dockHeight",null);Y0.current=Number.isFinite(N)?N:200}O.style.setProperty("--dock-height",`${Y0.current}px`)},[w]);let m_=H0.getDockPanes().length>0,[a2,v4]=R(!1),N2=b(()=>v4((O)=>!O),[]);g(()=>{if(!m_)return;let O=(N)=>{if(N.ctrlKey&&N.key==="`")N.preventDefault(),N2()};return document.addEventListener("keydown",O),()=>document.removeEventListener("keydown",O)},[N2,m_]);let R4=Boolean(h&&h===(H?.turn_id||r));return q`
        <div class=${`app-shell${T_?"":" workspace-collapsed"}${w?" editor-open":""}`} ref=${w0}>
            <${V4}
                onFileSelect=${C0}
                visible=${T_}
                active=${T_||w}
                onOpenEditor=${E0}
            />
            <button
                class=${`workspace-toggle-tab${T_?" open":" closed"}`}
                onClick=${B0}
                title=${T_?"Hide workspace":"Show workspace"}
                aria-label=${T_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${c2} onTouchStart=${p2}></div>
            ${w&&q`
                <div class="editor-pane-container">
                    <${W4}
                        tabs=${s}
                        activeId=${B_}
                        onActivate=${$0}
                        onClose=${D0}
                        onCloseOthers=${X0}
                        onCloseAll=${g0}
                        onTogglePin=${R_}
                        onTogglePreview=${o_}
                        previewTabs=${f_}
                        onToggleDock=${m_?N2:void 0}
                        dockVisible=${m_&&a2}
                    />
                    <div class="editor-pane-host" ref=${I0}></div>
                    ${B_&&f_.has(B_)&&q`
                        <${q4}
                            getContent=${()=>t_.current?.getContent?.()}
                            path=${B_}
                            onClose=${()=>o_(B_)}
                        />
                    `}
                    ${m_&&a2&&q`<div class="dock-splitter" onMouseDown=${i2} onTouchStart=${l2}></div>`}
                    ${m_&&q`<div class=${`dock-panel${a2?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${N2} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
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
                <div class="editor-splitter" onMouseDown=${h2} onTouchStart=${d0}></div>
            `}
            <div class="container">
                ${X&&P4()&&q`<div class="search-results-spacer"></div>`}
                ${(J||X)&&q`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${d2}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${J?`#${J}`:`Search: ${X}`}</span>
                    </div>
                `}
                <${a3} 
                    posts=${J0}
                    hasMore=${g2}
                    onLoadMore=${O2}
                    timelineRef=${F0}
                    onHashtagClick=${n2}
                    onMessageRef=${Q2}
                    onScrollToMessage=${x0}
                    onPostClick=${void 0}
                    onDeletePost=${y}
                    emptyMessage=${J?`No posts with #${J}`:X?`No results for "${X}"`:void 0}
                    agents=${V_}
                    user=${b0}
                    reverse=${!(X&&!J)}
                    removingPostIds=${m0}
                    searchQuery=${X}
                />
                <${l3}
                    status=${H}
                    draft=${L}
                    plan=${S}
                    thought=${k}
                    pendingRequest=${D}
                    turnId=${r}
                    steerQueued=${R4}
                    onPanelToggle=${T0}
                />
                <${C3} 
                    onPost=${()=>{k0(),c_()}}
                    onFocus=${c_}
                    searchMode=${j}
                    onSearch=${r2}
                    onEnterSearch=${s2}
                    onExitSearch=${K}
                    fileRefs=${G}
                    onRemoveFileRef=${c0}
                    onClearFileRefs=${q0}
                    messageRefs=${Q}
                    onRemoveMessageRef=${l0}
                    onClearMessageRefs=${F}
                    activeEditorPath=${B_}
                    onAttachEditorFile=${X2}
                    activeModel=${E_}
                    modelUsage=${x_}
                    thinkingLevel=${A_}
                    supportsThinking=${H_}
                    contextUsage=${l_}
                    notificationsEnabled=${g_}
                    notificationPermission=${b_}
                    onToggleNotifications=${r_}
                    onModelChange=${q_}
                    onModelStateChange=${a}
                />
                <${n3} status=${_} />
                <${o3}
                    request=${D}
                    onRespond=${()=>{f(null),W_.current=null}}
                />
            </div>
        </div>
    `}_3(q`<${c8} />`,document.getElementById("app"));

//# debugId=DFA73D82D65CDF6E64756E2164756E21
//# sourceMappingURL=app.bundle.js.map

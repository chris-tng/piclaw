var _8=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,J)=>(typeof require<"u"?require:$)[J]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var y2,K_,J3,q2,Z3,h1,$8,k2={},Y3=[],J8=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function o0(_,$){for(var J in $)_[J]=$[J];return _}function j3(_){var $=_.parentNode;$&&$.removeChild(_)}function X3(_,$,J){var Z,j,Y,W={};for(Y in $)Y=="key"?Z=$[Y]:Y=="ref"?j=$[Y]:W[Y]=$[Y];if(arguments.length>2&&(W.children=arguments.length>3?y2.call(arguments,2):J),typeof _=="function"&&_.defaultProps!=null)for(Y in _.defaultProps)W[Y]===void 0&&(W[Y]=_.defaultProps[Y]);return E2(_,W,Z,j,null)}function E2(_,$,J,Z,j){var Y={type:_,props:$,key:J,ref:Z,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:j==null?++J3:j};return K_.vnode!=null&&K_.vnode(Y),Y}function A2(_){return _.children}function C2(_,$){this.props=_,this.context=$}function Z2(_,$){if($==null)return _.__?Z2(_.__,_.__.__k.indexOf(_)+1):null;for(var J;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null)return J.__e;return typeof _.type=="function"?Z2(_):null}function W3(_){var $,J;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,$=0;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null){_.__e=_.__c.base=J.__e;break}return W3(_)}}function i1(_){(!_.__d&&(_.__d=!0)&&q2.push(_)&&!w2.__r++||h1!==K_.debounceRendering)&&((h1=K_.debounceRendering)||Z3)(w2)}function w2(){for(var _;w2.__r=q2.length;)_=q2.sort(function($,J){return $.__v.__b-J.__v.__b}),q2=[],_.some(function($){var J,Z,j,Y,W,K;$.__d&&(W=(Y=(J=$).__v).__e,(K=J.__P)&&(Z=[],(j=o0({},Y)).__v=Y.__v+1,K1(K,Y,j,J.__n,K.ownerSVGElement!==void 0,Y.__h!=null?[W]:null,Z,W==null?Z2(Y):W,Y.__h),V3(Z,Y),Y.__e!=W&&W3(Y)))})}function Q3(_,$,J,Z,j,Y,W,K,G,V){var X,U,C,L,D,M,S,z=Z&&Z.__k||Y3,y=z.length;for(J.__k=[],X=0;X<$.length;X++)if((L=J.__k[X]=(L=$[X])==null||typeof L=="boolean"?null:typeof L=="string"||typeof L=="number"||typeof L=="bigint"?E2(null,L,null,null,L):Array.isArray(L)?E2(A2,{children:L},null,null,null):L.__b>0?E2(L.type,L.props,L.key,null,L.__v):L)!=null){if(L.__=J,L.__b=J.__b+1,(C=z[X])===null||C&&L.key==C.key&&L.type===C.type)z[X]=void 0;else for(U=0;U<y;U++){if((C=z[U])&&L.key==C.key&&L.type===C.type){z[U]=void 0;break}C=null}K1(_,L,C=C||k2,j,Y,W,K,G,V),D=L.__e,(U=L.ref)&&C.ref!=U&&(S||(S=[]),C.ref&&S.push(C.ref,null,L),S.push(U,L.__c||D,L)),D!=null?(M==null&&(M=D),typeof L.type=="function"&&L.__k!=null&&L.__k===C.__k?L.__d=G=K3(L,G,_):G=G3(_,L,C,z,D,G),V||J.type!=="option"?typeof J.type=="function"&&(J.__d=G):_.value=""):G&&C.__e==G&&G.parentNode!=_&&(G=Z2(C))}for(J.__e=M,X=y;X--;)z[X]!=null&&(typeof J.type=="function"&&z[X].__e!=null&&z[X].__e==J.__d&&(J.__d=Z2(Z,X+1)),q3(z[X],z[X]));if(S)for(X=0;X<S.length;X++)N3(S[X],S[++X],S[++X])}function K3(_,$,J){var Z,j;for(Z=0;Z<_.__k.length;Z++)(j=_.__k[Z])&&(j.__=_,$=typeof j.type=="function"?K3(j,$,J):G3(J,j,j,_.__k,j.__e,$));return $}function G3(_,$,J,Z,j,Y){var W,K,G;if($.__d!==void 0)W=$.__d,$.__d=void 0;else if(J==null||j!=Y||j.parentNode==null)_:if(Y==null||Y.parentNode!==_)_.appendChild(j),W=null;else{for(K=Y,G=0;(K=K.nextSibling)&&G<Z.length;G+=2)if(K==j)break _;_.insertBefore(j,Y),W=Y}return W!==void 0?W:j.nextSibling}function l1(_,$,J){$[0]==="-"?_.setProperty($,J):_[$]=J==null?"":typeof J!="number"||J8.test($)?J:J+"px"}function L2(_,$,J,Z,j){var Y;_:if($==="style")if(typeof J=="string")_.style.cssText=J;else{if(typeof Z=="string"&&(_.style.cssText=Z=""),Z)for($ in Z)J&&$ in J||l1(_.style,$,"");if(J)for($ in J)Z&&J[$]===Z[$]||l1(_.style,$,J[$])}else if($[0]==="o"&&$[1]==="n")Y=$!==($=$.replace(/Capture$/,"")),$=$.toLowerCase()in _?$.toLowerCase().slice(2):$.slice(2),_.l||(_.l={}),_.l[$+Y]=J,J?Z||_.addEventListener($,Y?n1:o1,Y):_.removeEventListener($,Y?n1:o1,Y);else if($!=="dangerouslySetInnerHTML"){if(j)$=$.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if($!=="href"&&$!=="list"&&$!=="form"&&$!=="tabIndex"&&$!=="download"&&$ in _)try{_[$]=J==null?"":J;break _}catch(W){}typeof J=="function"||(J!=null&&(J!==!1||$[0]==="a"&&$[1]==="r")?_.setAttribute($,J):_.removeAttribute($))}}function o1(_){this.l[_.type+!1](K_.event?K_.event(_):_)}function n1(_){this.l[_.type+!0](K_.event?K_.event(_):_)}function K1(_,$,J,Z,j,Y,W,K,G){var V,X,U,C,L,D,M,S,z,y,v,H=$.type;if($.constructor!==void 0)return null;J.__h!=null&&(G=J.__h,K=$.__e=J.__e,$.__h=null,Y=[K]),(V=K_.__b)&&V($);try{_:if(typeof H=="function"){if(S=$.props,z=(V=H.contextType)&&Z[V.__c],y=V?z?z.props.value:V.__:Z,J.__c?M=(X=$.__c=J.__c).__=X.__E:(("prototype"in H)&&H.prototype.render?$.__c=X=new H(S,y):($.__c=X=new C2(S,y),X.constructor=H,X.render=Y8),z&&z.sub(X),X.props=S,X.state||(X.state={}),X.context=y,X.__n=Z,U=X.__d=!0,X.__h=[]),X.__s==null&&(X.__s=X.state),H.getDerivedStateFromProps!=null&&(X.__s==X.state&&(X.__s=o0({},X.__s)),o0(X.__s,H.getDerivedStateFromProps(S,X.__s))),C=X.props,L=X.state,U)H.getDerivedStateFromProps==null&&X.componentWillMount!=null&&X.componentWillMount(),X.componentDidMount!=null&&X.__h.push(X.componentDidMount);else{if(H.getDerivedStateFromProps==null&&S!==C&&X.componentWillReceiveProps!=null&&X.componentWillReceiveProps(S,y),!X.__e&&X.shouldComponentUpdate!=null&&X.shouldComponentUpdate(S,X.__s,y)===!1||$.__v===J.__v){X.props=S,X.state=X.__s,$.__v!==J.__v&&(X.__d=!1),X.__v=$,$.__e=J.__e,$.__k=J.__k,$.__k.forEach(function(f){f&&(f.__=$)}),X.__h.length&&W.push(X);break _}X.componentWillUpdate!=null&&X.componentWillUpdate(S,X.__s,y),X.componentDidUpdate!=null&&X.__h.push(function(){X.componentDidUpdate(C,L,D)})}X.context=y,X.props=S,X.state=X.__s,(V=K_.__r)&&V($),X.__d=!1,X.__v=$,X.__P=_,V=X.render(X.props,X.state,X.context),X.state=X.__s,X.getChildContext!=null&&(Z=o0(o0({},Z),X.getChildContext())),U||X.getSnapshotBeforeUpdate==null||(D=X.getSnapshotBeforeUpdate(C,L)),v=V!=null&&V.type===A2&&V.key==null?V.props.children:V,Q3(_,Array.isArray(v)?v:[v],$,J,Z,j,Y,W,K,G),X.base=$.__e,$.__h=null,X.__h.length&&W.push(X),M&&(X.__E=X.__=null),X.__e=!1}else Y==null&&$.__v===J.__v?($.__k=J.__k,$.__e=J.__e):$.__e=Z8(J.__e,$,J,Z,j,Y,W,G);(V=K_.diffed)&&V($)}catch(f){$.__v=null,(G||Y!=null)&&($.__e=K,$.__h=!!G,Y[Y.indexOf(K)]=null),K_.__e(f,$,J)}}function V3(_,$){K_.__c&&K_.__c($,_),_.some(function(J){try{_=J.__h,J.__h=[],_.some(function(Z){Z.call(J)})}catch(Z){K_.__e(Z,J.__v)}})}function Z8(_,$,J,Z,j,Y,W,K){var G,V,X,U=J.props,C=$.props,L=$.type,D=0;if(L==="svg"&&(j=!0),Y!=null){for(;D<Y.length;D++)if((G=Y[D])&&(G===_||(L?G.localName==L:G.nodeType==3))){_=G,Y[D]=null;break}}if(_==null){if(L===null)return document.createTextNode(C);_=j?document.createElementNS("http://www.w3.org/2000/svg",L):document.createElement(L,C.is&&C),Y=null,K=!1}if(L===null)U===C||K&&_.data===C||(_.data=C);else{if(Y=Y&&y2.call(_.childNodes),V=(U=J.props||k2).dangerouslySetInnerHTML,X=C.dangerouslySetInnerHTML,!K){if(Y!=null)for(U={},D=0;D<_.attributes.length;D++)U[_.attributes[D].name]=_.attributes[D].value;(X||V)&&(X&&(V&&X.__html==V.__html||X.__html===_.innerHTML)||(_.innerHTML=X&&X.__html||""))}if(function(M,S,z,y,v){var H;for(H in z)H==="children"||H==="key"||H in S||L2(M,H,null,z[H],y);for(H in S)v&&typeof S[H]!="function"||H==="children"||H==="key"||H==="value"||H==="checked"||z[H]===S[H]||L2(M,H,S[H],z[H],y)}(_,C,U,j,K),X)$.__k=[];else if(D=$.props.children,Q3(_,Array.isArray(D)?D:[D],$,J,Z,j&&L!=="foreignObject",Y,W,Y?Y[0]:J.__k&&Z2(J,0),K),Y!=null)for(D=Y.length;D--;)Y[D]!=null&&j3(Y[D]);K||(("value"in C)&&(D=C.value)!==void 0&&(D!==_.value||L==="progress"&&!D)&&L2(_,"value",D,U.value,!1),("checked"in C)&&(D=C.checked)!==void 0&&D!==_.checked&&L2(_,"checked",D,U.checked,!1))}return _}function N3(_,$,J){try{typeof _=="function"?_($):_.current=$}catch(Z){K_.__e(Z,J)}}function q3(_,$,J){var Z,j;if(K_.unmount&&K_.unmount(_),(Z=_.ref)&&(Z.current&&Z.current!==_.__e||N3(Z,null,$)),(Z=_.__c)!=null){if(Z.componentWillUnmount)try{Z.componentWillUnmount()}catch(Y){K_.__e(Y,$)}Z.base=Z.__P=null}if(Z=_.__k)for(j=0;j<Z.length;j++)Z[j]&&q3(Z[j],$,typeof _.type!="function");J||_.__e==null||j3(_.__e),_.__e=_.__d=void 0}function Y8(_,$,J){return this.constructor(_,J)}function O3(_,$,J){var Z,j,Y;K_.__&&K_.__(_,$),j=(Z=typeof J=="function")?null:J&&J.__k||$.__k,Y=[],K1($,_=(!Z&&J||$).__k=X3(A2,null,[_]),j||k2,k2,$.ownerSVGElement!==void 0,!Z&&J?[J]:j?null:$.firstChild?y2.call($.childNodes):null,Y,!Z&&J?J:j?j.__e:$.firstChild,Z),V3(Y,_)}y2=Y3.slice,K_={__e:function(_,$){for(var J,Z,j;$=$.__;)if((J=$.__c)&&!J.__)try{if((Z=J.constructor)&&Z.getDerivedStateFromError!=null&&(J.setState(Z.getDerivedStateFromError(_)),j=J.__d),J.componentDidCatch!=null&&(J.componentDidCatch(_),j=J.__d),j)return J.__E=J}catch(Y){_=Y}throw _}},J3=0,C2.prototype.setState=function(_,$){var J;J=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=o0({},this.state),typeof _=="function"&&(_=_(o0({},J),this.props)),_&&o0(J,_),_!=null&&this.__v&&($&&this.__h.push($),i1(this))},C2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),i1(this))},C2.prototype.render=A2,q2=[],Z3=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,w2.__r=0,$8=0;var M2,F0,r1,O2=0,W1=[],d1=K_.__b,s1=K_.__r,a1=K_.diffed,t1=K_.__c,e1=K_.unmount;function G1(_,$){K_.__h&&K_.__h(F0,_,O2||$),O2=0;var J=F0.__H||(F0.__H={__:[],__h:[]});return _>=J.__.length&&J.__.push({}),J.__[_]}function u(_){return O2=1,j8(z3,_)}function j8(_,$,J){var Z=G1(M2++,2);return Z.t=_,Z.__c||(Z.__=[J?J($):z3(void 0,$),function(j){var Y=Z.t(Z.__[0],j);Z.__[0]!==Y&&(Z.__=[Y,Z.__[1]],Z.__c.setState({}))}],Z.__c=F0),Z.__}function g(_,$){var J=G1(M2++,3);!K_.__s&&B3(J.__H,$)&&(J.__=_,J.__H=$,F0.__H.__h.push(J))}function w(_){return O2=5,S0(function(){return{current:_}},[])}function S0(_,$){var J=G1(M2++,7);return B3(J.__H,$)&&(J.__=_(),J.__H=$,J.__h=_),J.__}function b(_,$){return O2=8,S0(function(){return _},$)}function X8(){W1.forEach(function(_){if(_.__P)try{_.__H.__h.forEach(D2),_.__H.__h.forEach(Q1),_.__H.__h=[]}catch($){_.__H.__h=[],K_.__e($,_.__v)}}),W1=[]}K_.__b=function(_){F0=null,d1&&d1(_)},K_.__r=function(_){s1&&s1(_),M2=0;var $=(F0=_.__c).__H;$&&($.__h.forEach(D2),$.__h.forEach(Q1),$.__h=[])},K_.diffed=function(_){a1&&a1(_);var $=_.__c;$&&$.__H&&$.__H.__h.length&&(W1.push($)!==1&&r1===K_.requestAnimationFrame||((r1=K_.requestAnimationFrame)||function(J){var Z,j=function(){clearTimeout(Y),_3&&cancelAnimationFrame(Z),setTimeout(J)},Y=setTimeout(j,100);_3&&(Z=requestAnimationFrame(j))})(X8)),F0=void 0},K_.__c=function(_,$){$.some(function(J){try{J.__h.forEach(D2),J.__h=J.__h.filter(function(Z){return!Z.__||Q1(Z)})}catch(Z){$.some(function(j){j.__h&&(j.__h=[])}),$=[],K_.__e(Z,J.__v)}}),t1&&t1(_,$)},K_.unmount=function(_){e1&&e1(_);var $=_.__c;if($&&$.__H)try{$.__H.__.forEach(D2)}catch(J){K_.__e(J,$.__v)}};var _3=typeof requestAnimationFrame=="function";function D2(_){var $=F0;typeof _.__c=="function"&&_.__c(),F0=$}function Q1(_){var $=F0;_.__c=_.__(),F0=$}function B3(_,$){return!_||_.length!==$.length||$.some(function(J,Z){return J!==_[Z]})}function z3(_,$){return typeof $=="function"?$(_):$}var H3=function(_,$,J,Z){var j;$[0]=0;for(var Y=1;Y<$.length;Y++){var W=$[Y++],K=$[Y]?($[0]|=W?1:2,J[$[Y++]]):$[++Y];W===3?Z[0]=K:W===4?Z[1]=Object.assign(Z[1]||{},K):W===5?(Z[1]=Z[1]||{})[$[++Y]]=K:W===6?Z[1][$[++Y]]+=K+"":W?(j=_.apply(K,H3(_,K,J,["",null])),Z.push(j),K[0]?$[0]|=2:($[Y-2]=0,$[Y]=j)):Z.push(K)}return Z},$3=new Map,B=function(_){var $=$3.get(this);return $||($=new Map,$3.set(this,$)),($=H3(this,$.get(_)||($.set(_,$=function(J){for(var Z,j,Y=1,W="",K="",G=[0],V=function(C){Y===1&&(C||(W=W.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?G.push(0,C,W):Y===3&&(C||W)?(G.push(3,C,W),Y=2):Y===2&&W==="..."&&C?G.push(4,C,0):Y===2&&W&&!C?G.push(5,0,!0,W):Y>=5&&((W||!C&&Y===5)&&(G.push(Y,0,W,j),Y=6),C&&(G.push(Y,C,0,j),Y=6)),W=""},X=0;X<J.length;X++){X&&(Y===1&&V(),V(X));for(var U=0;U<J[X].length;U++)Z=J[X][U],Y===1?Z==="<"?(V(),G=[G],Y=3):W+=Z:Y===4?W==="--"&&Z===">"?(Y=1,W=""):W=Z+W[0]:K?Z===K?K="":W+=Z:Z==='"'||Z==="'"?K=Z:Z===">"?(V(),Y=1):Y&&(Z==="="?(Y=5,j=W,W=""):Z==="/"&&(Y<5||J[X][U+1]===">")?(V(),Y===3&&(G=G[0]),Y=G,(G=G[0]).push(2,0,Y),Y=0):Z===" "||Z==="\t"||Z===`
`||Z==="\r"?(V(),Y=2):W+=Z),Y===3&&W==="!--"&&(Y=4,G=G[0])}return V(),G}(_)),$),arguments,[])).length>1?$:$[0]}.bind(X3);async function a_(_,$={}){let J=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!J.ok){let Z=await J.json().catch(()=>({error:"Unknown error"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function P2(_=10,$=null){let J=`/timeline?limit=${_}`;if($)J+=`&before=${$}`;return a_(J)}async function U3(_,$=50,J=0){return a_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${J}`)}async function F3(_,$=50,J=0){return a_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${J}`)}async function L3(_){return a_(`/thread/${_}`)}async function E3(_,$=!1){let J=`/post/${_}?cascade=${$?"true":"false"}`;return a_(J,{method:"DELETE"})}async function V1(_,$,J=null,Z=[]){return a_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:J,media_ids:Z})})}async function C3(){return a_("/agents")}async function D3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return a_(`/agent/status${$}`)}async function N1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return a_(`/agent/context${$}`)}async function d0(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return a_(`/agent/models${$}`)}async function k3(_){let $=new FormData;$.append("file",_);let J=await fetch("/media/upload",{method:"POST",body:$});if(!J.ok){let Z=await J.json().catch(()=>({error:"Upload failed"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function q1(_,$){let J=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Failed to respond"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function w3(_,$){let J=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function y3(_,$="thought"){let J=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return a_(J)}async function A3(_,$,J){return a_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(J)})})}function Y2(_){return`/media/${_}`}function M3(_){return`/media/${_}/thumbnail`}async function b2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function S2(_="",$=2,J=!1){let Z=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${J?"1":"0"}`;return a_(Z)}async function P3(_,$=20000,J=null){let Z=J?`&mode=${encodeURIComponent(J)}`:"",j=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${Z}`;return a_(j)}async function b3(_){return a_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function O1(_,$="",J={}){let Z=new FormData;Z.append("file",_);let j=new URLSearchParams;if($)j.set("path",$);if(J.overwrite)j.set("overwrite","1");let Y=j.toString(),W=Y?`/workspace/upload?${Y}`:"/workspace/upload",K=await fetch(""+W,{method:"POST",body:Z});if(!K.ok){let G=await K.json().catch(()=>({error:"Upload failed"})),V=Error(G.error||`HTTP ${K.status}`);throw V.status=K.status,V.code=G.code,V}return K.json()}async function S3(_,$,J=""){let Z=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:J})});if(!Z.ok){let j=await Z.json().catch(()=>({error:"Create failed"})),Y=Error(j.error||`HTTP ${Z.status}`);throw Y.status=Z.status,Y.code=j.code,Y}return Z.json()}async function I3(_,$){let J=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Rename failed"})),j=Error(Z.error||`HTTP ${J.status}`);throw j.status=J.status,j.code=Z.code,j}return J.json()}async function x3(_,$){let J=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Move failed"})),j=Error(Z.error||`HTTP ${J.status}`);throw j.status=J.status,j.code=Z.code,j}return J.json()}async function T3(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return a_($,{method:"DELETE"})}async function I2(_,$=!1){return a_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function B1(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function f3(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class z1{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,J=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,J+$),this.reconnectAttempts=0;let Z=Math.max(this.cooldownUntil-J,0),j=Math.max(this.reconnectDelay,Z);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},j),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function I0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function u_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function j2(_,$=!1){let J=I0(_);if(J===null)return $;return J==="true"}function X2(_,$=null){let J=I0(_);if(J===null)return $;let Z=parseInt(J,10);return Number.isFinite(Z)?Z:$}function n0({prefix:_="file",label:$,title:J,onRemove:Z,onClick:j,removeTitle:Y="Remove",icon:W="file"}){let K=`${_}-file-pill`,G=`${_}-file-name`,V=`${_}-file-remove`,X=W==="message"?B`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:B`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return B`
    <span class=${K} title=${J||$} onClick=${j}>
      ${X}
      <span class=${G}>${$}</span>
      ${Z&&B`
        <button
          class=${V}
          onClick=${(U)=>{U.preventDefault(),U.stopPropagation(),Z()}}
          title=${Y}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var Q8=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function K8({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),J=_.tokens,Z=_.contextWindow,j=J!=null?`Context: ${u3(J)} / ${u3(Z)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,Y=7,W=2*Math.PI*7,K=$/100*W,G=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return B`
        <span class="compose-context-pie icon-btn" title=${j}>
            <svg width="16" height="16" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke="var(--context-track, rgba(128,128,128,0.2))"
                    stroke-width="2.5" />
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke=${G}
                    stroke-width="2.5"
                    stroke-dasharray=${`${K} ${W}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `}function u3(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function v3({onPost:_,onFocus:$,searchMode:J,onSearch:Z,onEnterSearch:j,onExitSearch:Y,fileRefs:W=[],onRemoveFileRef:K,onClearFileRefs:G,messageRefs:V=[],onRemoveMessageRef:X,onClearMessageRefs:U,activeModel:C=null,modelUsage:L=null,thinkingLevel:D=null,supportsThinking:M=!1,contextUsage:S=null,notificationsEnabled:z=!1,notificationPermission:y="default",onToggleNotifications:v,onModelChange:H,onModelStateChange:f,activeEditorPath:a=null,onAttachEditorFile:s,onOpenFilePill:Z_}){let[Q_,$_]=u(""),[j_,t]=u(""),[r,J_]=u(!1),[h,e]=u([]),[O_,N_]=u(!1),[__,Y_]=u([]),[B_,G_]=u(0),[k_,V_]=u(!1),[y_,U_]=u(!1),[L_,v_]=u(!1),[A_,n_]=u([]),[I_,x_]=u(!1),w_=w(null),X0=w(null),h_=w(null),T_=w(null),t_=w(0),G0=200,D0=(F)=>{let R=new Set,d=[];for(let X_ of F||[]){if(typeof X_!=="string")continue;let F_=X_.trim();if(!F_||R.has(F_))continue;R.add(F_),d.push(F_)}return d},k0=()=>{let F=I0("piclaw_compose_history");if(!F)return[];try{let R=JSON.parse(F);if(!Array.isArray(R))return[];return D0(R)}catch{return[]}},o_=(F)=>{u_("piclaw_compose_history",JSON.stringify(F))},E_=w(k0()),r_=w(-1),R_=w(""),P=!r&&(Q_.trim()||h.length>0||W.length>0||V.length>0),n=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),D_=typeof window<"u"&&typeof Notification<"u",e_=typeof window<"u"?Boolean(window.isSecureContext):!1,w0=D_&&e_&&y!=="denied",y0=y==="granted"&&z,N0=y0?"Disable notifications":"Enable notifications",d_=C||"",q0=M&&D?` (${D})`:"",O0=q0.trim()?`${D}`:"",B0=typeof L?.hint_short==="string"?L.hint_short.trim():"",c_=[O0||null,B0||null].filter(Boolean).join(" • "),W0=[d_?`Current model: ${d_}${q0}`:null,L?.plan?`Plan: ${L.plan}`:null,B0||null,L?.primary?.reset_description||null,L?.secondary?.reset_description||null].filter(Boolean),x0=y_?"Switching model…":W0.join(" • ")||`Current model: ${d_}${q0} (tap to open model picker)`,Q0=(F)=>{if(!F||typeof F!=="object")return;let R=F.model??F.current;if(typeof f==="function")f({model:R??null,thinking_level:F.thinking_level??null,supports_thinking:F.supports_thinking,provider_usage:F.provider_usage??null});if(R&&typeof H==="function")H(R)},T0=(F)=>{let R=F||w_.current;if(!R)return;R.style.height="auto",R.style.height=`${R.scrollHeight}px`,R.style.overflowY="hidden"},K0=(F)=>{if(!F.startsWith("/")||F.includes(`
`)){V_(!1),Y_([]);return}let R=F.toLowerCase().split(" ")[0];if(R.length<1){V_(!1),Y_([]);return}let d=Q8.filter((X_)=>X_.name.startsWith(R)||X_.name.replace(/-/g,"").startsWith(R.replace(/-/g,"")));if(d.length>0&&!(d.length===1&&d[0].name===R))Y_(d),G_(0),V_(!0);else V_(!1),Y_([])},A0=(F)=>{let R=Q_,d=R.indexOf(" "),X_=d>=0?R.slice(d):"",F_=F.name+X_;$_(F_),V_(!1),Y_([]),requestAnimationFrame(()=>{let M_=w_.current;if(!M_)return;let H_=F_.length;M_.selectionStart=H_,M_.selectionEnd=H_,M_.focus()})},_0=(F)=>{if(J)t(F);else $_(F),K0(F);requestAnimationFrame(()=>T0())},s_=(F)=>{let R=J?j_:Q_,d=R&&!R.endsWith(`
`)?`
`:"",X_=`${R}${d}${F}`.trimStart();_0(X_)},Z0=(F)=>{let R=F?.command?.model_label;if(R)return R;let d=F?.command?.message;if(typeof d==="string"){let X_=d.match(/•\s+([^\n]+?)\s+\(current\)/);if(X_?.[1])return X_[1].trim()}return null},$0=async(F)=>{if(J||r||y_)return;U_(!0);try{let R=await V1("default",F,null,[]),d=Z0(R);Q0({model:d??C??null,thinking_level:R?.command?.thinking_level,supports_thinking:R?.command?.supports_thinking});try{let X_=await d0();if(X_)Q0(X_)}catch{}return _?.(),!0}catch(R){return console.error("Failed to switch model:",R),alert("Failed to switch model: "+R.message),!1}finally{U_(!1)}},g0=async()=>{await $0("/cycle-model")},p0=async(F)=>{if(!F||y_)return;if(await $0(`/model ${F}`))v_(!1)},h0=(F)=>{F.preventDefault(),F.stopPropagation(),v_((R)=>!R)},f0=async(F)=>{let R=typeof F==="string"?F:F&&typeof F?.target?.value==="string"?F.target.value:Q_,d=typeof R==="string"?R:"";if(!d.trim()&&h.length===0&&W.length===0&&V.length===0)return;J_(!0);try{let X_=[];for(let P_ of h){let z_=await k3(P_);X_.push(z_.id)}let F_=d.trim(),M_=W.length?`Files:
${W.map((P_)=>`- ${P_}`).join(`
`)}`:"",H_=V.length?`Referenced messages:
${V.map((P_)=>`- message:${P_}`).join(`
`)}`:"",b_=X_.length?`Images:
${X_.map((P_,z_)=>{let G2=h[z_]?.name||`image-${z_+1}`;return`- attachment:${P_} (${G2})`}).join(`
`)}`:"",L0=[F_,M_,H_,b_].filter(Boolean).join(`

`),v0=await V1("default",L0,null,X_);if(v0?.command){Q0({model:v0.command.model_label??C??null,thinking_level:v0.command.thinking_level,supports_thinking:v0.command.supports_thinking});try{let P_=await d0();if(P_)Q0(P_)}catch{}}if(F_){let P_=E_.current,z_=D0(P_.filter((R0)=>R0!==F_));if(z_.push(F_),z_.length>200)z_.splice(0,z_.length-200);E_.current=z_,o_(z_),r_.current=-1,R_.current=""}$_(""),e([]),G?.(),U?.(),_?.()}catch(X_){console.error("Failed to post:",X_),alert("Failed to post: "+X_.message)}finally{J_(!1)}},f_=(F)=>{if(F.isComposing)return;if(J&&F.key==="Escape"){F.preventDefault(),t(""),Y?.();return}if(k_&&__.length>0){let R=w_.current?.value??(J?j_:Q_);if(!String(R||"").startsWith("/"))V_(!1),Y_([]);else{if(F.key==="ArrowDown"){F.preventDefault(),G_((d)=>(d+1)%__.length);return}if(F.key==="ArrowUp"){F.preventDefault(),G_((d)=>(d-1+__.length)%__.length);return}if(F.key==="Tab"){F.preventDefault(),A0(__[B_]);return}if(F.key==="Enter"&&!F.shiftKey){if(!(w_.current?.value??(J?j_:Q_)).includes(" ")){F.preventDefault();let F_=__[B_];V_(!1),Y_([]),f0(F_.name);return}}if(F.key==="Escape"){F.preventDefault(),V_(!1),Y_([]);return}}}if(!J&&(F.key==="ArrowUp"||F.key==="ArrowDown")&&!F.metaKey&&!F.ctrlKey&&!F.altKey&&!F.shiftKey){let R=w_.current;if(!R)return;let d=R.value||"",X_=R.selectionStart===0&&R.selectionEnd===0,F_=R.selectionStart===d.length&&R.selectionEnd===d.length;if(F.key==="ArrowUp"&&X_||F.key==="ArrowDown"&&F_){let M_=E_.current;if(!M_.length)return;F.preventDefault();let H_=r_.current;if(F.key==="ArrowUp"){if(H_===-1)R_.current=d,H_=M_.length-1;else if(H_>0)H_-=1;r_.current=H_,_0(M_[H_]||"")}else{if(H_===-1)return;if(H_<M_.length-1)H_+=1,r_.current=H_,_0(M_[H_]||"");else r_.current=-1,_0(R_.current||""),R_.current=""}requestAnimationFrame(()=>{let b_=w_.current;if(!b_)return;let L0=b_.value.length;b_.selectionStart=L0,b_.selectionEnd=L0});return}}if(F.key==="Enter"&&!F.shiftKey){F.preventDefault();let R=w_.current?.value??(J?j_:Q_);if(J){if(R.trim())Z?.(R.trim())}else f0(R)}},Y0=(F)=>{let R=Array.from(F||[]).filter((d)=>d&&d.type&&d.type.startsWith("image/"));if(!R.length)return;e((d)=>[...d,...R])},z0=(F)=>{Y0(F.target.files),F.target.value=""},m_=(F)=>{if(J)return;F.preventDefault(),F.stopPropagation(),t_.current+=1,N_(!0)},i_=(F)=>{if(J)return;if(F.preventDefault(),F.stopPropagation(),t_.current=Math.max(0,t_.current-1),t_.current===0)N_(!1)},j0=(F)=>{if(J)return;if(F.preventDefault(),F.stopPropagation(),F.dataTransfer)F.dataTransfer.dropEffect="copy";N_(!0)},H0=(F)=>{if(J)return;F.preventDefault(),F.stopPropagation(),t_.current=0,N_(!1),Y0(F.dataTransfer?.files||[])},M0=(F)=>{if(J)return;let R=F.clipboardData?.items;if(!R||!R.length)return;let d=[];for(let X_ of R){if(X_.kind!=="file")continue;let F_=X_.getAsFile?.();if(F_)d.push(F_)}if(d.length>0)F.preventDefault(),Y0(d)},u0=(F)=>{e((R)=>R.filter((d,X_)=>X_!==F))},s0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((F)=>{let{latitude:R,longitude:d,accuracy:X_}=F.coords,F_=`${R.toFixed(5)}, ${d.toFixed(5)}`,M_=Number.isFinite(X_)?` ±${Math.round(X_)}m`:"",H_=`https://maps.google.com/?q=${R},${d}`,b_=`Location: ${F_}${M_} ${H_}`;s_(b_)},(F)=>{let R=F?.message||"Unable to retrieve location.";alert(`Location error: ${R}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};g(()=>{if(!L_)return;x_(!0),d0().then((F)=>{let R=Array.isArray(F?.models)?F.models.filter((d)=>typeof d==="string"&&d.trim().length>0):[];n_(R),Q0(F)}).catch((F)=>{console.warn("Failed to load model list:",F),n_([])}).finally(()=>{x_(!1)})},[L_,C]),g(()=>{if(J)v_(!1)},[J]),g(()=>{if(!L_)return;let F=(R)=>{let d=h_.current,X_=T_.current,F_=R.target;if(d&&d.contains(F_))return;if(X_&&X_.contains(F_))return;v_(!1)};return document.addEventListener("pointerdown",F),()=>document.removeEventListener("pointerdown",F)},[L_]);let J0=(F)=>{let R=F.target.value;T0(F.target),_0(R)};return g(()=>{requestAnimationFrame(()=>T0())},[Q_,j_,J]),B`
        <div class="compose-box">
            <div
                class=${`compose-input-wrapper${O_?" drag-active":""}`}
                onDragEnter=${m_}
                onDragOver=${j0}
                onDragLeave=${i_}
                onDrop=${H0}
            >
                <div class="compose-input-main">
                    ${(W.length>0||h.length>0||V.length>0)&&B`
                        <div class="compose-file-refs">
                            ${V.map((F)=>{return B`
                                    <${n0}
                                        key=${"msg-"+F}
                                        prefix="compose"
                                        label=${"msg:"+F}
                                        title=${"Message reference: "+F}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>X?.(F)}
                                    />
                                `})}
                            ${W.map((F)=>{let R=F.split("/").pop()||F;return B`
                                    <${n0}
                                        prefix="compose"
                                        label=${R}
                                        title=${F}
                                        onClick=${()=>Z_?.(F)}
                                        removeTitle="Remove file"
                                        onRemove=${()=>K?.(F)}
                                    />
                                `})}
                            ${h.map((F,R)=>{let d=F?.name||`image-${R+1}`;return B`
                                    <${n0}
                                        key=${d+R}
                                        prefix="compose"
                                        label=${d}
                                        title=${d}
                                        removeTitle="Remove image"
                                        onRemove=${()=>u0(R)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${w_}
                        placeholder=${J?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${J?j_:Q_}
                        onInput=${J0}
                        onKeyDown=${f_}
                        onPaste=${M0}
                        onFocus=${$}
                        onClick=${$}
                        disabled=${r}
                        rows="1"
                    />
                    ${k_&&__.length>0&&B`
                        <div class="slash-autocomplete" ref=${X0}>
                            ${__.map((F,R)=>B`
                                <div
                                    key=${F.name}
                                    class=${`slash-item${R===B_?" active":""}`}
                                    onMouseDown=${(d)=>{d.preventDefault(),A0(F)}}
                                    onMouseEnter=${()=>G_(R)}
                                >
                                    <span class="slash-name">${F.name}</span>
                                    <span class="slash-desc">${F.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${L_&&!J&&B`
                        <div class="compose-model-popup" ref=${h_}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${I_&&B`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!I_&&A_.length===0&&B`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!I_&&A_.map((F)=>B`
                                    <button
                                        key=${F}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${C===F?" active":""}`}
                                        onClick=${()=>{p0(F)}}
                                        disabled=${y_}
                                    >
                                        ${F}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{g0()}}
                                    disabled=${y_}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!J&&C&&B`
                        <div class="compose-meta-row">
                            <div class="compose-model-meta">
                                <button
                                    ref=${T_}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${x0}
                                    aria-label="Open model picker"
                                    onClick=${h0}
                                    disabled=${r||y_}
                                >
                                    ${y_?"Switching…":d_}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!y_&&c_&&B`
                                        <span class="compose-model-usage-hint" title=${x0}>
                                            ${c_}
                                        </span>
                                    `}
                                </div>
                            </div>
                        </div>
                    `}
                    <div class="compose-actions ${J?"search-mode":""}">
                    ${!J&&S&&S.percent!=null&&B`
                        <${K8} usage=${S} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${J?Y:j}
                        title=${J?"Close search":"Search"}
                    >
                        ${J?B`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        `:B`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        `}
                    </button>
                    ${n&&!J&&B`
                        <button
                            class="icon-btn location-btn"
                            onClick=${s0}
                            title="Share location"
                            type="button"
                            disabled=${r}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14 14 0 0 1 0 20a14 14 0 0 1 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                        </button>
                    `}
                    ${w0&&!J&&B`
                        <button
                            class=${`icon-btn notification-btn${y0?" active":""}`}
                            onClick=${v}
                            title=${N0}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!J&&B`
                        ${a&&s&&B`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${s}
                                title=${`Attach open file: ${a}`}
                                type="button"
                                disabled=${r||W.includes(a)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${z0} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{f0()}}
                            disabled=${!P}
                            title="Send (Ctrl+Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var c3="piclaw_theme",F1="piclaw_tint",f2={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},G8={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},R3={default:{label:"Default",mode:"auto",light:f2,dark:G8},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},V8=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],u2={theme:"default",tint:null},m3="light",H1=!1;function g3(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function W2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let J=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(J)&&!/^[0-9a-fA-F]{6}$/.test(J))return null;let Z=J.length===3?J.split("").map((Y)=>Y+Y).join(""):J,j=parseInt(Z,16);return{r:j>>16&255,g:j>>8&255,b:j&255,hex:`#${Z.toLowerCase()}`}}function N8(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let J=document.createElement("div");if(J.style.color="",J.style.color=$,!J.style.color)return null;let Z=J.style.color;try{if(document.body)J.style.display="none",document.body.appendChild(J),Z=getComputedStyle(J).color||J.style.color,document.body.removeChild(J)}catch{}let j=Z.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!j)return null;let Y=parseInt(j[1],10),W=parseInt(j[2],10),K=parseInt(j[3],10);if(![Y,W,K].every((V)=>Number.isFinite(V)))return null;let G=`#${[Y,W,K].map((V)=>V.toString(16).padStart(2,"0")).join("")}`;return{r:Y,g:W,b:K,hex:G}}function p3(_){return W2(_)||N8(_)}function B2(_,$,J){let Z=Math.round(_.r+($.r-_.r)*J),j=Math.round(_.g+($.g-_.g)*J),Y=Math.round(_.b+($.b-_.b)*J);return`rgb(${Z} ${j} ${Y})`}function U1(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function h3(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function L1(_){return R3[_]||R3.default}function q8(_){return _.mode==="auto"?h3():_.mode}function O8(_,$){let J=L1(_);if($==="dark"&&J.dark)return J.dark;if($==="light"&&J.light)return J.light;return J.dark||J.light||f2}function B8(_,$,J){let Z=p3($);if(!Z)return _;let j=W2(_.bgPrimary),Y=W2(_.bgSecondary),W=W2(_.bgHover),K=W2(_.borderColor);if(!j||!Y||!W||!K)return _;let V=W2(J==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:B2(j,Z,0.08),bgSecondary:B2(Y,Z,0.12),bgHover:B2(W,Z,0.16),borderColor:B2(K,Z,0.08),accent:Z.hex,accentHover:V?B2(Z,V,0.18):Z.hex}}function z8(_,$){if(typeof document>"u")return;let J=document.documentElement,Z=_.accent,j=p3(Z),Y=j?U1(j,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,W=j?U1(j,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",K=j?U1(j,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",G={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":Z,"--accent-hover":_.accentHover||Z,"--accent-soft":W,"--accent-soft-strong":K,"--danger-color":_.danger||f2.danger,"--success-color":_.success||f2.success,"--search-highlight-color":Y||"rgba(29, 155, 240, 0.2)"};Object.entries(G).forEach(([V,X])=>{if(X)J.style.setProperty(V,X)})}function H8(){if(typeof document>"u")return;let _=document.documentElement;V8.forEach(($)=>_.style.removeProperty($))}function x2(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function U8(_,$){if(typeof document>"u")return;let J=x2("theme-color");if(J&&_)J.setAttribute("content",_);let Z=x2("msapplication-TileColor");if(Z&&_)Z.setAttribute("content",_);let j=x2("msapplication-navbutton-color");if(j&&_)j.setAttribute("content",_);let Y=x2("apple-mobile-web-app-status-bar-style");if(Y)Y.setAttribute("content",$==="dark"?"black-translucent":"default")}function F8(){if(typeof window>"u")return;let _={...u2,mode:m3};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function E1(_,$={}){if(typeof window>"u"||typeof document>"u")return;let J=g3(_?.theme||"default"),Z=_?.tint?String(_.tint).trim():null,j=L1(J),Y=q8(j),W=O8(J,Y);u2={theme:J,tint:Z},m3=Y;let K=document.documentElement;K.dataset.theme=Y,K.dataset.colorTheme=J,K.dataset.tint=Z?String(Z):"",K.style.colorScheme=Y;let G=W;if(J==="default"&&Z)G=B8(W,Z,Y);if(J==="default"&&!Z)H8();else z8(G,Y);if(U8(G.bgPrimary,Y),F8(),$.persist!==!1)if(u_(c3,J),Z)u_(F1,Z);else u_(F1,"")}function T2(){if(L1(u2.theme).mode!=="auto")return;E1(u2,{persist:!1})}function i3(){if(typeof window>"u")return()=>{};let _=g3(I0(c3)||"default"),$=I0(F1),J=$?$.trim():null;if(E1({theme:_,tint:J},{persist:!1}),window.matchMedia&&!H1){let Z=window.matchMedia("(prefers-color-scheme: dark)");if(Z.addEventListener)Z.addEventListener("change",T2);else if(Z.addListener)Z.addListener(T2);return H1=!0,()=>{if(Z.removeEventListener)Z.removeEventListener("change",T2);else if(Z.removeListener)Z.removeListener(T2);H1=!1}}return()=>{}}function l3(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let J=_.theme??_.name??_.colorTheme,Z=_.tint??null;E1({theme:J||"default",tint:Z},{persist:!0})}function o3(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return h3()}var v2=/#(\w+)/g,L8=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),E8=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),C8=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),D8={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},k8=new Set(["http:","https:","mailto:",""]);function n3(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function Q2(_,$={}){if(!_)return null;let J=String(_).trim();if(!J)return null;if(J.startsWith("#")||J.startsWith("/"))return J;if(J.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(J))return J;return null}if(J.startsWith("blob:"))return J;try{let Z=new URL(J,typeof window<"u"?window.location.origin:"http://localhost");if(!k8.has(Z.protocol))return null;return Z.href}catch{return null}}function r3(_,$={}){if(!_)return"";let J=new DOMParser().parseFromString(_,"text/html"),Z=[],j=J.createTreeWalker(J.body,NodeFilter.SHOW_ELEMENT),Y;while(Y=j.nextNode())Z.push(Y);for(let W of Z){let K=W.tagName.toLowerCase();if(!E8.has(K)){let V=W.parentNode;if(!V)continue;while(W.firstChild)V.insertBefore(W.firstChild,W);V.removeChild(W);continue}let G=D8[K]||new Set;for(let V of Array.from(W.attributes)){let X=V.name.toLowerCase(),U=V.value;if(X.startsWith("on")){W.removeAttribute(V.name);continue}if(X.startsWith("data-")||X.startsWith("aria-"))continue;if(G.has(X)||C8.has(X)){if(X==="href"){let C=Q2(U);if(!C)W.removeAttribute(V.name);else if(W.setAttribute(V.name,C),K==="a"&&!W.getAttribute("rel"))W.setAttribute("rel","noopener noreferrer")}else if(X==="src"){let C=K==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(U):U,L=Q2(C,{allowDataImage:K==="img"});if(!L)W.removeAttribute(V.name);else W.setAttribute(V.name,L)}continue}W.removeAttribute(V.name)}}return J.body.innerHTML}function d3(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function R2(_,$=2){if(!_)return _;let J=_;for(let Z=0;Z<$;Z+=1){let j=d3(J);if(j===J)break;J=j}return J}function w8(_){if(!_)return{text:"",blocks:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],j=[],Y=!1,W=[];for(let K of J){if(!Y&&K.trim().match(/^```mermaid\s*$/i)){Y=!0,W=[];continue}if(Y&&K.trim().match(/^```\s*$/)){let G=Z.length;Z.push(W.join(`
`)),j.push(`@@MERMAID_BLOCK_${G}@@`),Y=!1,W=[];continue}if(Y)W.push(K);else j.push(K)}if(Y)j.push("```mermaid"),j.push(...W);return{text:j.join(`
`),blocks:Z}}function y8(_){if(!_)return _;return R2(_,5)}function A8(_){let $=new TextEncoder().encode(String(_||"")),J="";for(let Z of $)J+=String.fromCharCode(Z);return btoa(J)}function M8(_){let $=atob(String(_||"")),J=new Uint8Array($.length);for(let Z=0;Z<$.length;Z+=1)J[Z]=$.charCodeAt(Z);return new TextDecoder().decode(J)}function P8(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(J,Z)=>{let j=Number(Z),Y=$[j]??"",W=y8(Y);return`<div class="mermaid-container" data-mermaid="${A8(W)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function s3(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,J)=>{if(J.includes(`
`))return`
\`\`\`
${J}
\`\`\`
`;return`\`${J}\``})}function a3(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,J)=>{let Z=J.trim(),j=Z.startsWith("/"),Y=j?Z.slice(1).trim():Z,G=(Y.endsWith("/")?Y.slice(0,-1).trim():Y).split(/\s+/)[0]?.toLowerCase();if(!G||!L8.has(G))return $;if(G==="br")return j?"":"<br>";if(j)return`</${G}>`;return`<${G}>`})}function t3(_){if(!_)return _;let $=(J)=>J.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(J,Z)=>`<pre><code>${$(Z)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(J,Z)=>`<code>${$(Z)}</code>`)}function e3(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=(Y)=>Y.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),j;while(j=J.nextNode()){if(!j.nodeValue)continue;let Y=Z(j.nodeValue);if(Y!==j.nodeValue)j.nodeValue=Y}return $.body.innerHTML}function b8(_){if(!window.katex)return _;let $=(W)=>d3(W).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),J=(W)=>{let K=[],G=W.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(V)=>{let X=K.length;return K.push(V),`@@CODE_BLOCK_${X}@@`});return G=G.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(V)=>{let X=K.length;return K.push(V),`@@CODE_INLINE_${X}@@`}),{html:G,blocks:K}},Z=(W,K)=>{if(!K.length)return W;return W.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(G,V)=>{let X=Number(V);return K[X]??""})},j=J(_),Y=j.html;return Y=Y.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(W,K,G)=>{try{let V=katex.renderToString($(G.trim()),{displayMode:!0,throwOnError:!1});return`${K}${V}`}catch(V){return`<span class="math-error" title="${n3(V.message)}">${W}</span>`}}),Y=Y.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(W,K,G)=>{if(/\s$/.test(G))return W;try{let V=katex.renderToString($(G),{displayMode:!1,throwOnError:!1});return`${K}${V}`}catch(V){return`${K}<span class="math-error" title="${n3(V.message)}">$${G}$</span>`}}),Z(Y,j.blocks)}function S8(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=[],j;while(j=J.nextNode())Z.push(j);for(let Y of Z){let W=Y.nodeValue;if(!W)continue;if(v2.lastIndex=0,!v2.test(W))continue;v2.lastIndex=0;let K=Y.parentElement;if(K&&(K.closest("a")||K.closest("code")||K.closest("pre")))continue;let G=W.split(v2);if(G.length<=1)continue;let V=$.createDocumentFragment();G.forEach((X,U)=>{if(U%2===1){let C=$.createElement("a");C.setAttribute("href","#"),C.className="hashtag",C.setAttribute("data-hashtag",X),C.textContent=`#${X}`,V.appendChild(C)}else V.appendChild($.createTextNode(X))}),Y.parentNode?.replaceChild(V,Y)}return $.body.innerHTML}function I8(_){if(!_)return _;let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],j=!1;for(let Y of J){if(!j&&Y.trim().match(/^```(?:math|katex|latex)\s*$/i)){j=!0,Z.push("$$");continue}if(j&&Y.trim().match(/^```\s*$/)){j=!1,Z.push("$$");continue}Z.push(Y)}return Z.join(`
`)}function K2(_,$,J={}){if(!_)return"";let Z=I8(_),{text:j,blocks:Y}=w8(Z),W=R2(j,2),G=s3(W).replace(/</g,"&lt;").replace(/>/g,"&gt;"),V=a3(G),X=window.marked?marked.parse(V,{headerIds:!1,mangle:!1}):V.replace(/\n/g,"<br>");return X=t3(X),X=e3(X),X=b8(X),X=S8(X),X=P8(X,Y),X=r3(X,J),X}function _4(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),J=R2($,2),j=s3(J).replace(/</g,"&lt;").replace(/>/g,"&gt;"),Y=a3(j),W=window.marked?marked.parse(Y):Y.replace(/\n/g,"<br>");return W=t3(W),W=e3(W),W=r3(W),W}async function c2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:J}=window.beautifulMermaid,j=o3()==="dark"?J["tokyo-night"]:J["github-light"],Y=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let W of Y)try{let K=W.dataset.mermaid,G=M8(K||""),V=R2(G,2),X=await $(V,{...j,transparent:!0});W.innerHTML=X,W.removeAttribute("data-mermaid")}catch(K){console.error("Mermaid render error:",K);let G=document.createElement("pre");G.className="mermaid-error",G.textContent=`Diagram error: ${K.message}`,W.innerHTML="",W.appendChild(G),W.removeAttribute("data-mermaid")}}var $4="PiClaw";function C1(_,$){let J=_||"PiClaw",Z=J.charAt(0).toUpperCase(),j=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],Y=Z.charCodeAt(0)%j.length,W=j[Y],K=J.trim().toLowerCase(),G=typeof $==="string"?$.trim():"",X=(G?G:null)||(K==="PiClaw".toLowerCase()||K==="pi"?"/static/icon-192.png":null);return{letter:Z,color:W,image:X}}function J4(_,$){if(!_)return"PiClaw";let J=$[_]?.name||_;return J?J.charAt(0).toUpperCase()+J.slice(1):"PiClaw"}function Z4(_,$){if(!_)return null;let J=$[_]||{};return J.avatar_url||J.avatarUrl||J.avatar||null}function Y4(_){if(!_)return null;if(typeof document<"u"){let Y=document.documentElement,W=Y?.dataset?.colorTheme||"",K=Y?.dataset?.tint||"",G=getComputedStyle(Y).getPropertyValue("--accent-color")?.trim();if(G&&(K||W&&W!=="default"))return G}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],J=String(_),Z=0;for(let Y=0;Y<J.length;Y+=1)Z=(Z*31+J.charCodeAt(Y))%2147483647;let j=Math.abs(Z)%$.length;return $[j]}function j4({status:_,draft:$,plan:J,thought:Z,pendingRequest:j,intent:Y,turnId:W,steerQueued:K,onPanelToggle:G}){let U=(Y_)=>{if(!Y_)return{text:"",totalLines:0,fullText:""};if(typeof Y_==="string"){let V_=Y_,y_=V_?V_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:V_,totalLines:y_,fullText:V_}}let B_=Y_.text||"",G_=Y_.fullText||Y_.full_text||B_,k_=Number.isFinite(Y_.totalLines)?Y_.totalLines:G_?G_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:B_,totalLines:k_,fullText:G_}},C=160,L=(Y_)=>{if(!Y_)return 1;return Math.max(1,Math.ceil(Y_.length/160))},D=(Y_,B_,G_)=>{let k_=(Y_||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!k_)return{text:"",omitted:0,totalLines:Number.isFinite(G_)?G_:0,visibleLines:0};let V_=k_.split(`
`),y_=V_.length>B_?V_.slice(0,B_).join(`
`):k_,U_=Number.isFinite(G_)?G_:V_.reduce((A_,n_)=>A_+L(n_),0),L_=y_?y_.split(`
`).reduce((A_,n_)=>A_+L(n_),0):0,v_=Math.max(U_-L_,0);return{text:y_,omitted:v_,totalLines:U_,visibleLines:L_}},M=U(J),S=U(Z),z=U($),y=Boolean(M.text)||M.totalLines>0,v=Boolean(S.text)||S.totalLines>0,H=Boolean(z.fullText?.trim()||z.text?.trim());if(!_&&!H&&!y&&!v&&!j&&!Y)return null;let[f,a]=u(new Set),s=(Y_)=>a((B_)=>{let G_=new Set(B_),k_=!G_.has(Y_);if(k_)G_.add(Y_);else G_.delete(Y_);if(typeof G==="function")G(Y_,k_);return G_});g(()=>{a(new Set)},[W]);let Z_=_?.turn_id||W,Q_=Y4(Z_),$_=K?"turn-dot turn-dot-queued":"turn-dot",j_=(Y_)=>Y_,t=Boolean(_?.last_activity||_?.lastActivity),r=Y?.kind||"info",J_="",h=_?.title,e=_?.status;if(_?.type==="plan")J_=h?`Planning: ${h}`:"Planning...";else if(_?.type==="tool_call")J_=h?`Running: ${h}`:"Running tool...";else if(_?.type==="tool_status")J_=h?`${h}: ${e||"Working..."}`:e||"Working...";else if(_?.type==="error")J_=h||"Agent error";else J_=h||e||"Working...";if(t)J_="Last activity just now";let O_=({panelTitle:Y_,text:B_,fullText:G_,totalLines:k_,maxLines:V_,titleClass:y_,panelKey:U_})=>{let L_=f.has(U_),v_=G_||B_||"",A_=typeof V_==="number",n_=L_&&A_,I_=A_?D(v_,V_,k_):{text:v_||"",omitted:0,totalLines:Number.isFinite(k_)?k_:0};if(!v_&&!(Number.isFinite(I_.totalLines)&&I_.totalLines>0))return null;let x_=`agent-thinking-body${A_?" agent-thinking-body-collapsible":""}`,w_=A_?`--agent-thinking-collapsed-lines: ${V_};`:"";return B`
            <div
                class="agent-thinking"
                data-expanded=${L_?"true":"false"}
                data-collapsible=${A_?"true":"false"}
                style=${Q_?`--turn-color: ${Q_};`:""}
            >
                <div class="agent-thinking-title ${y_||""}">
                    ${Q_&&B`<span class=${$_} aria-hidden="true"></span>`}
                    ${Y_}
                    ${n_&&B`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${Y_} panel`}
                            onClick=${()=>s(U_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${x_}
                    style=${w_}
                    dangerouslySetInnerHTML=${{__html:_4(v_)}}
                />
                ${!L_&&I_.omitted>0&&B`
                    <button class="agent-thinking-truncation" onClick=${()=>s(U_)}>
                        ▸ ${I_.omitted} more lines
                    </button>
                `}
                ${L_&&I_.omitted>0&&B`
                    <button class="agent-thinking-truncation" onClick=${()=>s(U_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},N_=j?.tool_call?.title,__=N_?`Awaiting approval: ${N_}`:"Awaiting approval";return B`
        <div class="agent-status-panel">
            ${Y&&B`
                <div
                    class=${`agent-status agent-status-intent agent-status-intent-${r}`}
                    aria-live="polite"
                    style=${Q_?`--turn-color: ${Q_};`:""}
                    title=${Y?.detail||""}
                >
                    <span class="agent-status-text">
                        ${Y.title}
                    </span>
                    ${Y.detail&&B`<span class="agent-status-intent-detail">${Y.detail}</span>`}
                </div>
            `}
            ${j&&B`
                <div class="agent-status agent-status-request" aria-live="polite" style=${Q_?`--turn-color: ${Q_};`:""}>
                    <span class=${$_} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${__}</span>
                </div>
            `}
            ${y&&O_({panelTitle:j_("Planning"),text:M.text,fullText:M.fullText,totalLines:M.totalLines,panelKey:"plan"})}
            ${v&&O_({panelTitle:j_("Thoughts"),text:S.text,fullText:S.fullText,totalLines:S.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${H&&O_({panelTitle:j_("Draft"),text:z.text,fullText:z.fullText,totalLines:z.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&B`
                <div class=${`agent-status${t?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${Q_?`--turn-color: ${Q_};`:""}>
                    ${Q_&&B`<span class=${$_} aria-hidden="true"></span>`}
                    ${_?.type==="error"?B`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!t&&B`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${J_}</span>
                </div>
            `}
        </div>
    `}function X4({request:_,onRespond:$}){if(!_)return null;let{request_id:J,tool_call:Z,options:j}=_,Y=Z?.title||"Agent Request",W=Z?.kind||"other",K=Z?.rawInput||{},G=K.command||K.commands&&K.commands[0]||null,V=K.diff||null,X=K.fileName||K.path||null,U=Z?.description||K.description||K.explanation||null,L=(Array.isArray(Z?.locations)?Z.locations:[]).map((y)=>y?.path).filter((y)=>Boolean(y)),D=Array.from(new Set([X,...L].filter(Boolean)));console.log("AgentRequestModal:",{request_id:J,tool_call:Z,options:j});let M=async(y)=>{try{await q1(J,y),$()}catch(v){console.error("Failed to respond to agent request:",v)}},S=async()=>{try{await w3(Y,`Auto-approved: ${Y}`),await q1(J,"approved"),$()}catch(y){console.error("Failed to add to whitelist:",y)}},z=j&&j.length>0;return B`
        <div class="agent-request-modal">
            <div class="agent-request-content">
                <div class="agent-request-header">
                    <div class="agent-request-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                    </div>
                    <div class="agent-request-title">${Y}</div>
                </div>
                ${(U||G||V||D.length>0)&&B`
                    <div class="agent-request-body">
                        ${U&&B`
                            <div class="agent-request-description">${U}</div>
                        `}
                        ${D.length>0&&B`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${D.map((y,v)=>B`<li key=${v}>${y}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${G&&B`
                            <pre class="agent-request-command">${G}</pre>
                        `}
                        ${V&&B`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${V}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${z?j.map((y)=>B`
                            <button 
                                key=${y.optionId||y.id||String(y)}
                                class="agent-request-btn ${y.kind==="allow_once"||y.kind==="allow_always"?"primary":""}"
                                onClick=${()=>M(y.optionId||y.id||y)}
                            >
                                ${y.name||y.label||y.optionId||y.id||String(y)}
                            </button>
                        `):B`
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
    `}function W4({status:_}){if(_==="connected")return null;return B`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function Q4(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let Z=new Date-$,j=Z/1000,Y=86400000;if(Z<Y){if(j<60)return"just now";if(j<3600)return`${Math.floor(j/60)}m`;return`${Math.floor(j/3600)}h`}if(Z<5*Y){let G=$.toLocaleDateString(void 0,{weekday:"short"}),V=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${G} ${V}`}let W=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),K=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${W} ${K}`}function z2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function m0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function m2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}function K4({src:_,onClose:$}){return g(()=>{let J=(Z)=>{if(Z.key==="Escape")$()};return document.addEventListener("keydown",J),()=>document.removeEventListener("keydown",J)},[$]),B`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function x8({mediaId:_}){let[$,J]=u(null);if(g(()=>{b2(_).then(J).catch(()=>{})},[_]),!$)return null;let Z=$.filename||"file",j=$.metadata?.size,Y=j?m0(j):"";return B`
        <a href=${Y2(_)} download=${Z} class="file-attachment" onClick=${(W)=>W.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${Z}</span>
                ${Y&&B`<span class="file-size">${Y}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function g2({annotations:_}){if(!_)return null;let{audience:$,priority:J,lastModified:Z}=_,j=Z?m2(Z):null;return B`
        <div class="content-annotations">
            ${$&&$.length>0&&B`
                <span class="content-annotation">Audience: ${$.join(", ")}</span>
            `}
            ${typeof J==="number"&&B`
                <span class="content-annotation">Priority: ${J}</span>
            `}
            ${j&&B`
                <span class="content-annotation">Updated: ${j}</span>
            `}
        </div>
    `}function T8({block:_}){let $=_.title||_.name||_.uri,J=_.description,Z=_.size?m0(_.size):"",j=_.mime_type||"",Y=u8(j),W=Q2(_.uri);return B`
        <a
            href=${W||"#"}
            class="resource-link"
            target=${W?"_blank":void 0}
            rel=${W?"noopener noreferrer":void 0}
            onClick=${(K)=>K.stopPropagation()}>
            <div class="resource-link-main">
                <div class="resource-link-header">
                    <span class="resource-link-icon-inline">${Y}</span>
                    <div class="resource-link-title">${$}</div>
                </div>
                ${J&&B`<div class="resource-link-description">${J}</div>`}
                <div class="resource-link-meta">
                    ${j&&B`<span>${j}</span>`}
                    ${Z&&B`<span>${Z}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `}function f8({block:_}){let[$,J]=u(!1),Z=_.uri||"Embedded resource",j=_.text||"",Y=Boolean(_.data),W=_.mime_type||"";return B`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(K)=>{K.preventDefault(),K.stopPropagation(),J(!$)}}>
                ${$?"▼":"▶"} ${Z}
            </button>
            ${$&&B`
                ${j&&B`<pre class="resource-embed-content">${j}</pre>`}
                ${Y&&B`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${W&&B`<span class="resource-embed-blob-meta">${W}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(K)=>{K.preventDefault(),K.stopPropagation();let G=new Blob([Uint8Array.from(atob(_.data),(U)=>U.charCodeAt(0))],{type:W||"application/octet-stream"}),V=URL.createObjectURL(G),X=document.createElement("a");X.href=V,X.download=Z.split("/").pop()||"resource",X.click(),URL.revokeObjectURL(V)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function u8(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function v8({preview:_}){let $=Q2(_.url),J=Q2(_.image,{allowDataImage:!0}),Z=J?`background-image: url('${J}')`:"",j=_.site_name;if(!j&&$)try{j=new URL($).hostname}catch{j=$}return B`
        <a
            href=${$||"#"}
            class="link-preview ${J?"has-image":""}"
            target=${$?"_blank":void 0}
            rel=${$?"noopener noreferrer":void 0}
            onClick=${(Y)=>Y.stopPropagation()}
            style=${Z}>
            <div class="link-preview-overlay">
                <div class="link-preview-site">${j||""}</div>
                <div class="link-preview-title">${_.title}</div>
                ${_.description&&B`
                    <div class="link-preview-description">${_.description}</div>
                `}
            </div>
        </a>
    `}function R8(_,$){return typeof _==="string"?_:""}var c8=1800,m8=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
    </svg>`,g8=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>`,p8=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;async function h8(_){let $=typeof _==="string"?_:"";if(!$)return!1;if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText($),!0}catch{}try{let J=document.createElement("textarea");J.value=$,J.setAttribute("readonly",""),J.style.position="fixed",J.style.opacity="0",J.style.pointerEvents="none",document.body.appendChild(J),J.select(),J.setSelectionRange(0,J.value.length);let Z=document.execCommand("copy");return document.body.removeChild(J),Z}catch{return!1}}function i8(_){if(!_)return()=>{};let $=Array.from(_.querySelectorAll("pre")).filter((Y)=>Y.querySelector("code"));if($.length===0)return()=>{};let J=new Map,Z=[],j=(Y,W)=>{let K=W||"idle";if(Y.dataset.copyState=K,K==="success")Y.innerHTML=g8,Y.setAttribute("aria-label","Copied"),Y.setAttribute("title","Copied"),Y.classList.add("is-success"),Y.classList.remove("is-error");else if(K==="error")Y.innerHTML=p8,Y.setAttribute("aria-label","Copy failed"),Y.setAttribute("title","Copy failed"),Y.classList.add("is-error"),Y.classList.remove("is-success");else Y.innerHTML=m8,Y.setAttribute("aria-label","Copy code"),Y.setAttribute("title","Copy code"),Y.classList.remove("is-success","is-error")};return $.forEach((Y)=>{let W=document.createElement("div");W.className="post-code-block",Y.parentNode?.insertBefore(W,Y),W.appendChild(Y);let K=document.createElement("button");K.type="button",K.className="post-code-copy-btn",j(K,"idle"),W.appendChild(K);let G=async(V)=>{V.preventDefault(),V.stopPropagation();let U=Y.querySelector("code")?.textContent||"",C=await h8(U);j(K,C?"success":"error");let L=J.get(K);if(L)clearTimeout(L);let D=setTimeout(()=>{j(K,"idle"),J.delete(K)},c8);J.set(K,D)};K.addEventListener("click",G),Z.push(()=>{K.removeEventListener("click",G);let V=J.get(K);if(V)clearTimeout(V);if(W.parentNode)W.parentNode.insertBefore(Y,W),W.remove()})}),()=>{Z.forEach((Y)=>Y())}}function l8(_){if(!_)return{content:_,fileRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let V=0;V<J.length;V+=1)if(J[V].trim()==="Files:"&&J[V+1]&&/^\s*-\s+/.test(J[V+1])){Z=V;break}if(Z===-1)return{content:_,fileRefs:[]};let j=[],Y=Z+1;for(;Y<J.length;Y+=1){let V=J[Y];if(/^\s*-\s+/.test(V))j.push(V.replace(/^\s*-\s+/,"").trim());else if(!V.trim())break;else break}if(j.length===0)return{content:_,fileRefs:[]};let W=J.slice(0,Z),K=J.slice(Y),G=[...W,...K].join(`
`);return G=G.replace(/\n{3,}/g,`

`).trim(),{content:G,fileRefs:j}}function o8(_){if(!_)return{content:_,messageRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let V=0;V<J.length;V+=1)if(J[V].trim()==="Referenced messages:"&&J[V+1]&&/^\s*-\s+/.test(J[V+1])){Z=V;break}if(Z===-1)return{content:_,messageRefs:[]};let j=[],Y=Z+1;for(;Y<J.length;Y+=1){let V=J[Y];if(/^\s*-\s+/.test(V)){let U=V.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(U)j.push(U[1])}else if(!V.trim())break;else break}if(j.length===0)return{content:_,messageRefs:[]};let W=J.slice(0,Z),K=J.slice(Y),G=[...W,...K].join(`
`);return G=G.replace(/\n{3,}/g,`

`).trim(),{content:G,messageRefs:j}}function n8(_){if(!_)return{content:_,attachments:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let V=0;V<J.length;V+=1)if(J[V].trim()==="Images:"&&J[V+1]&&/^\s*-\s+/.test(J[V+1])){Z=V;break}if(Z===-1)return{content:_,attachments:[]};let j=[],Y=Z+1;for(;Y<J.length;Y+=1){let V=J[Y];if(/^\s*-\s+/.test(V)){let X=V.replace(/^\s*-\s+/,"").trim(),U=X.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||X.match(/^attachment:([^\s]+)\s+(.+)$/i);if(U){let C=U[1],L=(U[2]||"").trim()||C;j.push({id:C,label:L,raw:X})}else j.push({id:null,label:X,raw:X})}else if(!V.trim())break;else break}if(j.length===0)return{content:_,attachments:[]};let W=J.slice(0,Z),K=J.slice(Y),G=[...W,...K].join(`
`);return G=G.replace(/\n{3,}/g,`

`).trim(),{content:G,attachments:j}}function r8(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function d8(_,$){if(!_||!$)return _;let J=String($).trim().split(/\s+/).filter(Boolean);if(J.length===0)return _;let Z=J.map(r8).sort((X,U)=>U.length-X.length),j=new RegExp(`(${Z.join("|")})`,"gi"),Y=new RegExp(`^(${Z.join("|")})$`,"i"),W=new DOMParser().parseFromString(_,"text/html"),K=W.createTreeWalker(W.body,NodeFilter.SHOW_TEXT),G=[],V;while(V=K.nextNode())G.push(V);for(let X of G){let U=X.nodeValue;if(!U||!j.test(U)){j.lastIndex=0;continue}j.lastIndex=0;let C=X.parentElement;if(C&&C.closest("code, pre, script, style"))continue;let L=U.split(j).filter((M)=>M!=="");if(L.length===0)continue;let D=W.createDocumentFragment();for(let M of L)if(Y.test(M)){let S=W.createElement("mark");S.className="search-highlight-term",S.textContent=M,D.appendChild(S)}else D.appendChild(W.createTextNode(M));X.parentNode.replaceChild(D,X)}return W.body.innerHTML}function G4({post:_,onClick:$,onHashtagClick:J,onMessageRef:Z,onScrollToMessage:j,agentName:Y,agentAvatarUrl:W,userName:K,userAvatarUrl:G,userAvatarBackground:V,onDelete:X,isThreadReply:U,isThreadPrev:C,isThreadNext:L,isRemoving:D,highlightQuery:M,onFileRef:S}){let[z,y]=u(null),v=w(null),H=_.data,f=H.type==="agent_response",a=K||"You",s=f?Y||$4:a,Z_=f?C1(Y,W):C1(a,G),Q_=typeof V==="string"?V.trim().toLowerCase():"",$_=!f&&Z_.image&&(Q_==="clear"||Q_==="transparent"),j_=f&&Boolean(Z_.image),t=`background-color: ${$_||j_?"transparent":Z_.color}`,r=H.content_meta,J_=Boolean(r?.truncated),h=Boolean(r?.preview),e=J_&&!h,O_=J_?{originalLength:Number.isFinite(r?.original_length)?r.original_length:H.content?H.content.length:0,maxLength:Number.isFinite(r?.max_length)?r.max_length:0}:null,N_=R8(H.content,H.link_previews),{content:__,fileRefs:Y_}=l8(N_),{content:B_,messageRefs:G_}=o8(__),{content:k_,attachments:V_}=n8(B_);N_=k_;let y_=Boolean(N_)&&!e,U_=typeof M==="string"?M.trim():"",L_=S0(()=>{if(!N_)return"";let P=K2(N_,J);return U_?d8(P,U_):P},[N_,U_]),v_=(P,n)=>{P.stopPropagation(),y(Y2(n))},A_=(P)=>{P.stopPropagation(),X?.(_)},n_=(P,n)=>{let D_=new Set;if(!P||n.length===0)return{content:P,usedIds:D_};return{content:P.replace(/attachment:([^\s)"']+)/g,(V0,w0,y0,N0)=>{let d_=w0.replace(/^\/+/,""),O0=n.find((c_)=>c_.name&&c_.name.toLowerCase()===d_.toLowerCase()&&!D_.has(c_.id))||n.find((c_)=>!D_.has(c_.id));if(!O0)return V0;if(D_.add(O0.id),N0.slice(Math.max(0,y0-2),y0)==="](")return`/media/${O0.id}`;return O0.name||"attachment"}),usedIds:D_}},I_=[],x_=[],w_=[],X0=[],h_=[],T_=[],t_=H.content_blocks||[],G0=H.media_ids||[],D0=0;if(t_.length>0)t_.forEach((P)=>{if(P?.type==="text"&&P.annotations)T_.push(P.annotations);if(P?.type==="resource_link")X0.push(P);else if(P?.type==="resource")h_.push(P);else if(P?.type==="file"){let n=G0[D0++];if(n)x_.push(n),w_.push({id:n,name:P?.name||P?.filename||P?.title})}else if(P?.type==="image"||!P?.type){let n=G0[D0++];if(n){let D_=typeof P?.mime_type==="string"?P.mime_type:void 0;I_.push({id:n,annotations:P?.annotations,mimeType:D_}),w_.push({id:n,name:P?.name||P?.filename||P?.title})}}});else if(G0.length>0)G0.forEach((P)=>{I_.push({id:P,annotations:null}),w_.push({id:P,name:null})});if(V_.length>0)V_.forEach((P)=>{if(!P?.id)return;let n=w_.find((D_)=>String(D_.id)===String(P.id));if(n&&!n.name)n.name=P.label});let{content:k0,usedIds:o_}=n_(N_,w_);N_=k0;let E_=I_.filter(({id:P})=>!o_.has(P)),r_=x_.filter((P)=>!o_.has(P)),R_=V_.length>0?V_.map((P,n)=>({id:P.id||`attachment-${n+1}`,label:P.label||`attachment-${n+1}`})):w_.map((P,n)=>({id:P.id,label:P.name||`attachment-${n+1}`}));return g(()=>{if(!v.current)return;return c2(v.current),i8(v.current)},[L_]),B`
        <div id=${`post-${_.id}`} class="post ${f?"agent-post":""} ${U?"thread-reply":""} ${C?"thread-prev":""} ${L?"thread-next":""} ${D?"removing":""}" onClick=${$}>
            <div class="post-avatar ${f?"agent-avatar":""} ${Z_.image?"has-image":""}" style=${t}>
                ${Z_.image?B`<img src=${Z_.image} alt=${s} />`:Z_.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${A_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${s}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(P)=>{if(P.preventDefault(),P.stopPropagation(),Z)Z(_.id)}}>${Q4(_.timestamp)}</a>
                </div>
                ${e&&O_&&B`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${z2(O_.originalLength)} chars
                            ${O_.maxLength?B` • Display limit: ${z2(O_.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${h&&O_&&B`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${z2(O_.maxLength)} of ${z2(O_.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(Y_.length>0||G_.length>0||R_.length>0)&&B`
                    <div class="post-file-refs">
                        ${G_.map((P)=>{let n=(D_)=>{if(D_.preventDefault(),D_.stopPropagation(),j)j(P);else{let e_=document.getElementById("post-"+P);if(e_)e_.scrollIntoView({behavior:"smooth",block:"center"}),e_.classList.add("post-highlight"),setTimeout(()=>e_.classList.remove("post-highlight"),2000)}};return B`
                                <a href=${`#msg-${P}`} class="post-msg-pill-link" onClick=${n}>
                                    <${n0}
                                        prefix="post"
                                        label=${"msg:"+P}
                                        title=${"Message "+P}
                                        icon="message"
                                        onClick=${n}
                                    />
                                </a>
                            `})}
                        ${Y_.map((P)=>{let n=P.split("/").pop()||P;return B`
                                <${n0}
                                    prefix="post"
                                    label=${n}
                                    title=${P}
                                    onClick=${()=>S?.(P)}
                                />
                            `})}
                        ${R_.map((P)=>B`
                            <${n0}
                                prefix="post"
                                label=${P.label}
                                title=${P.label}
                            />
                        `)}
                    </div>
                `}
                ${y_&&B`
                    <div 
                        ref=${v}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:L_}}
                        onClick=${(P)=>{if(P.target.classList.contains("hashtag")){P.preventDefault(),P.stopPropagation();let n=P.target.dataset.hashtag;if(n)J?.(n)}else if(P.target.tagName==="IMG")P.preventDefault(),P.stopPropagation(),y(P.target.src)}}
                    />
                `}
                ${T_.length>0&&B`
                    ${T_.map((P,n)=>B`
                        <${g2} key=${n} annotations=${P} />
                    `)}
                `}
                ${E_.length>0&&B`
                    <div class="media-preview">
                        ${E_.map(({id:P,mimeType:n})=>{let e_=typeof n==="string"&&n.toLowerCase().startsWith("image/svg")?Y2(P):M3(P);return B`
                                <img 
                                    key=${P} 
                                    src=${e_} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(V0)=>v_(V0,P)}
                                />
                            `})}
                    </div>
                `}
                ${E_.length>0&&B`
                    ${E_.map(({annotations:P},n)=>B`
                        ${P&&B`<${g2} key=${n} annotations=${P} />`}
                    `)}
                `}
                ${r_.length>0&&B`
                    <div class="file-attachments">
                        ${r_.map((P)=>B`
                            <${x8} key=${P} mediaId=${P} />
                        `)}
                    </div>
                `}
                ${X0.length>0&&B`
                    <div class="resource-links">
                        ${X0.map((P,n)=>B`
                            <div key=${n}>
                                <${T8} block=${P} />
                                <${g2} annotations=${P.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${h_.length>0&&B`
                    <div class="resource-embeds">
                        ${h_.map((P,n)=>B`
                            <div key=${n}>
                                <${f8} block=${P} />
                                <${g2} annotations=${P.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${H.link_previews?.length>0&&B`
                    <div class="link-previews">
                        ${H.link_previews.map((P,n)=>B`
                            <${v8} key=${n} preview=${P} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${z&&B`<${K4} src=${z} onClose=${()=>y(null)} />`}
    `}function V4({posts:_,hasMore:$,onLoadMore:J,onPostClick:Z,onHashtagClick:j,onMessageRef:Y,onScrollToMessage:W,onFileRef:K,emptyMessage:G,timelineRef:V,agents:X,user:U,onDeletePost:C,reverse:L=!0,removingPostIds:D,searchQuery:M}){let[S,z]=u(!1),y=w(null),v=typeof IntersectionObserver<"u",H=b(async()=>{if(!J||!$||S)return;z(!0);try{await J({preserveScroll:!0,preserveMode:"top"})}finally{z(!1)}},[$,S,J]),f=b((t)=>{let{scrollTop:r,scrollHeight:J_,clientHeight:h}=t.target,e=L?J_-h-r:r,O_=Math.max(300,h);if(e<O_)H()},[L,H]);if(g(()=>{if(!v)return;let t=y.current,r=V?.current;if(!t||!r)return;let J_=300,h=new IntersectionObserver((e)=>{for(let O_ of e){if(!O_.isIntersecting)continue;H()}},{root:r,rootMargin:`${J_}px 0px ${J_}px 0px`,threshold:0});return h.observe(t),()=>h.disconnect()},[v,$,J,V,H]),g(()=>{if(v)return;if(!V?.current)return;let{scrollTop:t,scrollHeight:r,clientHeight:J_}=V.current,h=L?r-J_-t:t,e=Math.max(300,J_);if(h<e)H()},[v,_,$,L,V,H]),g(()=>{if(!V?.current)return;if(!$||S)return;let{scrollTop:t,scrollHeight:r,clientHeight:J_}=V.current,h=L?r-J_-t:t,e=Math.max(300,J_);if(r<=J_+1||h<e)H()},[_,$,S,L,V,H]),!_)return B`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return B`
            <div class="timeline" ref=${V}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${G||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let a=_.slice().sort((t,r)=>t.id-r.id),s=(t)=>{let r=t?.data?.thread_id;if(r===null||r===void 0||r==="")return null;let J_=Number(r);return Number.isFinite(J_)?J_:null},Z_=new Map;for(let t=0;t<a.length;t+=1){let r=a[t],J_=Number(r?.id),h=s(r);if(h!==null){let e=Z_.get(h)||{anchorIndex:-1,replyIndexes:[]};e.replyIndexes.push(t),Z_.set(h,e)}else if(Number.isFinite(J_)){let e=Z_.get(J_)||{anchorIndex:-1,replyIndexes:[]};e.anchorIndex=t,Z_.set(J_,e)}}let Q_=new Map;for(let[t,r]of Z_.entries()){let J_=new Set;if(r.anchorIndex>=0)J_.add(r.anchorIndex);for(let h of r.replyIndexes)J_.add(h);Q_.set(t,Array.from(J_).sort((h,e)=>h-e))}let $_=a.map((t,r)=>{let J_=s(t);if(J_===null)return{hasThreadPrev:!1,hasThreadNext:!1};let h=Q_.get(J_);if(!h||h.length===0)return{hasThreadPrev:!1,hasThreadNext:!1};let e=h.indexOf(r);if(e<0)return{hasThreadPrev:!1,hasThreadNext:!1};return{hasThreadPrev:e>0,hasThreadNext:e<h.length-1}}),j_=B`<div class="timeline-sentinel" ref=${y}></div>`;return B`
        <div class="timeline ${L?"reverse":"normal"}" ref=${V} onScroll=${f}>
            <div class="timeline-content">
                ${L?j_:null}
                ${a.map((t,r)=>{let J_=Boolean(t.data?.thread_id&&t.data.thread_id!==t.id),h=D?.has?.(t.id),e=$_[r]||{};return B`
                    <${G4}
                        key=${t.id}
                        post=${t}
                        isThreadReply=${J_}
                        isThreadPrev=${e.hasThreadPrev}
                        isThreadNext=${e.hasThreadNext}
                        isRemoving=${h}
                        highlightQuery=${M}
                        agentName=${J4(t.data?.agent_id,X||{})}
                        agentAvatarUrl=${Z4(t.data?.agent_id,X||{})}
                        userName=${U?.name||U?.user_name}
                        userAvatarUrl=${U?.avatar_url||U?.avatarUrl||U?.avatar}
                        userAvatarBackground=${U?.avatar_background||U?.avatarBackground}
                        onClick=${()=>Z?.(t)}
                        onHashtagClick=${j}
                        onMessageRef=${Y}
                        onScrollToMessage=${W}
                        onFileRef=${K}
                        onDelete=${C}
                    />
                `})}
                ${L?null:j_}
            </div>
        </div>
    `}class N4{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,J=-1/0;for(let Z of this.extensions.values()){if(Z.placement!=="tabs")continue;if(!Z.canHandle)continue;try{let j=Z.canHandle(_);if(j===!1||j===0)continue;let Y=j===!0?0:typeof j==="number"?j:0;if(Y>J)J=Y,$=Z}catch(j){console.warn(`[PaneRegistry] canHandle() error for "${Z.id}":`,j)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var l_=new N4;var p2=null,D1=null;function q4(){if(D1)return Promise.resolve(D1);if(!p2)p2=import("/static/dist/editor.bundle.js").then((_)=>{return D1=_,_}).catch((_)=>{throw p2=null,_});return p2}class O4{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await q4();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){if(this.queuedViewStateCb=_,this.real&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(_)}restoreViewState(_){if(this.queuedViewState=_,this.real&&typeof this.real.restoreViewState==="function")this.real.restoreViewState(_)}getPath(){if(this.real&&typeof this.real.getPath==="function")return this.real.getPath();return this.context.path||""}setPath(_){if(this.real&&typeof this.real.setPath==="function")this.real.setPath(_)}}var k1={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;if(_.mode!=="edit")return!1;return 1},mount(_,$){return new O4(_,$)}};function w1(){q4().catch(()=>{})}class B4{container;disposed=!1;termEl;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0");let J=document.createElement("div");J.className="terminal-pane-header";let Z=document.createElement("span");Z.className="terminal-pane-title",Z.textContent="Terminal";let j=document.createElement("span");j.className="terminal-pane-status",j.textContent="Not connected",J.append(Z,j);let Y=document.createElement("div");Y.className="terminal-pane-body",Y.innerHTML='<div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>',this.termEl.append(J,Y),_.appendChild(this.termEl)}getContent(){return}isDirty(){return!1}focus(){this.termEl?.focus()}resize(){}dispose(){if(this.disposed)return;this.disposed=!0,this.termEl?.remove()}}var y1={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new B4(_,$)}};function z4(_){return String(_||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function s8(_,$){let J=String(_||"").trim();if(!J)return J;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(J)||J.startsWith("#")||J.startsWith("data:")||J.startsWith("blob:"))return J;let Z=J.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),j=Z?.[1]||J,Y=Z?.[2]||"",W=Z?.[3]||"",K=String($||"").split("/").slice(0,-1).join("/"),V=j.startsWith("/")?j:`${K?`${K}/`:""}${j}`,X=[];for(let C of V.split("/")){if(!C||C===".")continue;if(C===".."){if(X.length>0)X.pop();continue}X.push(C)}let U=X.join("/");return`${B1(U)}${Y}${W}`}function H2(_){return _?.preview||null}function a8(_){let $=H2(_);if(!$)return'<div class="workspace-preview-text">No preview available.</div>';if($.kind==="image"){let J=$.url||($.path?B1($.path):"");return`
            <div class="workspace-preview-image">
                <img src="${z4(J)}" alt="preview" />
            </div>
        `}if($.kind==="text"){if($.content_type==="text/markdown")return`<div class="workspace-preview-text">${K2($.text||"",null,{rewriteImageSrc:(Z)=>s8(Z,$.path||_?.path)})}</div>`;return`<pre class="workspace-preview-text"><code>${z4($.text||"")}</code></pre>`}if($.kind==="binary")return'<div class="workspace-preview-text">Binary file — download to view.</div>';return'<div class="workspace-preview-text">No preview available.</div>'}class A1{constructor(_,$){this.container=_,this.context=$,this.disposed=!1,this.host=document.createElement("div"),this.host.className="workspace-preview-render-host",this.host.tabIndex=0,this.container.appendChild(this.host),this.render()}render(){if(this.disposed)return;this.host.innerHTML=a8(this.context)}getContent(){let _=H2(this.context);return typeof _?.text==="string"?_.text:void 0}isDirty(){return!1}setContent(_,$){let J=H2(this.context);if(J&&J.kind==="text"){if(J.text=_,$!==void 0)J.mtime=$}if(this.context.content=_,$!==void 0)this.context.mtime=$;this.render()}focus(){this.host?.focus?.()}dispose(){if(this.disposed)return;this.disposed=!0,this.host?.remove(),this.container.innerHTML=""}}var M1={id:"workspace-markdown-preview",label:"Workspace Markdown Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){let $=H2(_);if(_?.mode!=="view")return!1;if(!$||$.kind!=="text")return!1;return $.content_type==="text/markdown"?20:!1},mount(_,$){return new A1(_,$)}},P1={id:"workspace-preview-default",label:"Workspace Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){if(_?.mode!=="view")return!1;return H2(_)||_?.path?1:!1},mount(_,$){return new A1(_,$)}};class H4{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let J of this.listeners)try{J(_,$)}catch{}}open(_,$){let J=this.tabs.get(_);if(!J)J={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,J);return this.activate(_),J}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,J]of this.tabs)if($!==_&&!J.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((Z)=>Z!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let J=this.tabs.get(_);if(!J||J.dirty===$)return;J.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let J=this.tabs.get(_);if(J)J.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,J){let Z=this.tabs.get(_);if(!Z)return;if(this.tabs.delete(_),Z.id=$,Z.path=$,Z.label=J||$.split("/").pop()||$,this.tabs.set($,Z),this.mruOrder=this.mruOrder.map((j)=>j===_?$:j),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),J=_[($+1)%_.length];this.activate(J.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),J=_[($-1+_.length)%_.length];this.activate(J.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var C_=new H4;var h2="workspaceExplorerScale",t8=["compact","default","comfortable"],e8=new Set(t8),_6={compact:{indentPx:14},default:{indentPx:16},comfortable:{indentPx:18}};function U4(_,$="default"){if(typeof _!=="string")return $;let J=_.trim().toLowerCase();return e8.has(J)?J:$}function b1(){if(typeof window>"u")return{width:0,isTouch:!1};let _=Number(window.innerWidth)||0,$=Boolean(window.matchMedia?.("(pointer: coarse)")?.matches),J=Boolean(window.matchMedia?.("(hover: none)")?.matches),Z=Number(globalThis.navigator?.maxTouchPoints||0)>0;return{width:_,isTouch:$||Z&&J}}function $6(_={}){let $=Math.max(0,Number(_.width)||0);if(Boolean(_.isTouch))return"comfortable";if($>0&&$<1180)return"comfortable";return"default"}function J6(_,$={}){if(Boolean($.isTouch)&&_==="compact")return"default";return _}function S1(_={}){let $=$6(_),J=_.stored?U4(_.stored,$):$;return J6(J,_)}function F4(_){return _6[U4(_)]}var Z6=60000,D4=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function k4(_,$,J,Z=0,j=[]){if(!J&&D4(_))return j;if(!_)return j;if(j.push({node:_,depth:Z}),_.type==="dir"&&_.children&&$.has(_.path))for(let Y of _.children)k4(Y,$,J,Z+1,j);return j}function L4(_,$,J){if(!_)return"";let Z=[],j=(Y)=>{if(!J&&D4(Y))return;if(Z.push(Y.type==="dir"?`d:${Y.path}`:`f:${Y.path}`),Y.children&&$?.has(Y.path))for(let W of Y.children)j(W)};return j(_),Z.join("|")}function f1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let J=Array.isArray(_.children)?_.children:null,Z=Array.isArray($.children)?$.children:null;if(!Z)return _;let j=J?new Map(J.map((K)=>[K?.path,K])):new Map,Y=!J||J.length!==Z.length,W=Z.map((K)=>{let G=f1(j.get(K.path),K);if(G!==j.get(K.path))Y=!0;return G});return Y?{...$,children:W}:_}function x1(_,$,J){if(!_)return _;if(_.path===$)return f1(_,J);if(!Array.isArray(_.children))return _;let Z=!1,j=_.children.map((Y)=>{let W=x1(Y,$,J);if(W!==Y)Z=!0;return W});return Z?{..._,children:j}:_}var w4=4,I1=14,Y6=8,j6=16;function y4(_){if(!_)return 0;if(_.type==="file"){let Z=Math.max(0,Number(_.size)||0);return _.__bytes=Z,Z}let $=Array.isArray(_.children)?_.children:[],J=0;for(let Z of $)J+=y4(Z);return _.__bytes=J,J}function A4(_,$=0){let J=Math.max(0,Number(_?.__bytes??_?.size??0)),Z={name:_?.name||_?.path||".",path:_?.path||".",size:J,children:[]};if(!_||_.type!=="dir"||$>=w4)return Z;let j=Array.isArray(_.children)?_.children:[],Y=[];for(let K of j){let G=Math.max(0,Number(K?.__bytes??K?.size??0));if(G<=0)continue;if(K.type==="dir")Y.push({kind:"dir",node:K,size:G});else Y.push({kind:"file",name:K.name,path:K.path,size:G})}Y.sort((K,G)=>G.size-K.size);let W=Y;if(Y.length>I1){let K=Y.slice(0,I1-1),G=Y.slice(I1-1),V=G.reduce((X,U)=>X+U.size,0);K.push({kind:"other",name:`+${G.length} more`,path:`${Z.path}/[other]`,size:V}),W=K}return Z.children=W.map((K)=>{if(K.kind==="dir")return A4(K.node,$+1);return{name:K.name,path:K.path,size:K.size,children:[]}}),Z}function E4(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,J=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(J==="dark")return!0;if(J==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function M4(_,$,J){let Z=((_+Math.PI/2)*180/Math.PI+360)%360,j=J?Math.max(30,70-$*10):Math.max(34,66-$*8),Y=J?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${Z.toFixed(1)} ${j}% ${Y}%)`}function i2(_,$,J,Z){return{x:_+J*Math.cos(Z),y:$+J*Math.sin(Z)}}function u1(_,$,J,Z,j,Y){let W=Math.PI*2-0.0001,K=Y-j>W?j+W:Y,G=i2(_,$,Z,j),V=i2(_,$,Z,K),X=i2(_,$,J,K),U=i2(_,$,J,j),C=K-j>Math.PI?1:0;return[`M ${G.x.toFixed(3)} ${G.y.toFixed(3)}`,`A ${Z} ${Z} 0 ${C} 1 ${V.x.toFixed(3)} ${V.y.toFixed(3)}`,`L ${X.x.toFixed(3)} ${X.y.toFixed(3)}`,`A ${J} ${J} 0 ${C} 0 ${U.x.toFixed(3)} ${U.y.toFixed(3)}`,"Z"].join(" ")}var P4={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function b4(_,$,J){let Z=[],j=[],Y=Math.max(0,Number($)||0),W=(K,G,V,X)=>{let U=Array.isArray(K?.children)?K.children:[];if(!U.length)return;let C=Math.max(0,Number(K.size)||0);if(C<=0)return;let L=V-G,D=G;U.forEach((M,S)=>{let z=Math.max(0,Number(M.size)||0);if(z<=0)return;let y=z/C,v=D,H=S===U.length-1?V:D+L*y;if(D=H,H-v<0.003)return;let f=P4[X];if(f){let a=M4(v,X,J);if(Z.push({key:M.path,path:M.path,label:M.name,size:z,color:a,depth:X,startAngle:v,endAngle:H,innerRadius:f[0],outerRadius:f[1],d:u1(120,120,f[0],f[1],v,H)}),X===1)j.push({key:M.path,name:M.name,size:z,pct:Y>0?z/Y*100:0,color:a})}if(X<w4)W(M,v,H,X+1)})};return W(_,-Math.PI/2,Math.PI*3/2,1),{segments:Z,legend:j}}function T1(_,$){if(!_||!$)return null;if(_.path===$)return _;let J=Array.isArray(_.children)?_.children:[];for(let Z of J){let j=T1(Z,$);if(j)return j}return null}function S4(_,$,J,Z){if(!J||J<=0)return{segments:[],legend:[]};let j=P4[1];if(!j)return{segments:[],legend:[]};let Y=-Math.PI/2,W=Math.PI*3/2,K=M4(Y,1,Z),V=`${$||"."}/[files]`;return{segments:[{key:V,path:V,label:_,size:J,color:K,depth:1,startAngle:Y,endAngle:W,innerRadius:j[0],outerRadius:j[1],d:u1(120,120,j[0],j[1],Y,W)}],legend:[{key:V,name:_,size:J,pct:100,color:K}]}}function C4(_,$=!1,J=!1){if(!_)return null;let Z=y4(_),j=A4(_,0),Y=j.size||Z,{segments:W,legend:K}=b4(j,Y,J);if(!W.length&&Y>0){let G=S4("[files]",j.path,Y,J);W=G.segments,K=G.legend}return{root:j,totalSize:Y,segments:W,legend:K,truncated:$,isDarkTheme:J}}function X6({payload:_}){if(!_)return null;let[$,J]=u(null),[Z,j]=u(_?.root?.path||"."),[Y,W]=u(()=>[_?.root?.path||"."]),[K,G]=u(!1);g(()=>{let $_=_?.root?.path||".";j($_),W([$_]),J(null)},[_?.root?.path,_?.totalSize]),g(()=>{if(!Z)return;G(!0);let $_=setTimeout(()=>G(!1),180);return()=>clearTimeout($_)},[Z]);let V=S0(()=>{return T1(_.root,Z)||_.root},[_?.root,Z]),X=V?.size||_.totalSize||0,{segments:U,legend:C}=S0(()=>{let $_=b4(V,X,_.isDarkTheme);if($_.segments.length>0)return $_;if(X<=0)return $_;let j_=V?.children?.length?"Total":"[files]";return S4(j_,V?.path||_?.root?.path||".",X,_.isDarkTheme)},[V,X,_.isDarkTheme,_?.root?.path]),[L,D]=u(U),M=w(new Map),S=w(0);g(()=>{let $_=M.current,j_=new Map(U.map((h)=>[h.key,h])),t=performance.now(),r=220,J_=(h)=>{let e=Math.min(1,(h-t)/220),O_=e*(2-e),N_=U.map((__)=>{let B_=$_.get(__.key)||{startAngle:__.startAngle,endAngle:__.startAngle,innerRadius:__.innerRadius,outerRadius:__.innerRadius},G_=(L_,v_)=>L_+(v_-L_)*O_,k_=G_(B_.startAngle,__.startAngle),V_=G_(B_.endAngle,__.endAngle),y_=G_(B_.innerRadius,__.innerRadius),U_=G_(B_.outerRadius,__.outerRadius);return{...__,d:u1(120,120,y_,U_,k_,V_)}});if(D(N_),e<1)S.current=requestAnimationFrame(J_)};if(S.current)cancelAnimationFrame(S.current);return S.current=requestAnimationFrame(J_),M.current=j_,()=>{if(S.current)cancelAnimationFrame(S.current)}},[U]);let z=L.length?L:U,y=X>0?m0(X):"0 B",v=V?.name||"",f=(v&&v!=="."?v:"Total")||"Total",a=y,s=Y.length>1,Z_=($_)=>{if(!$_?.path)return;let j_=T1(_.root,$_.path);if(!j_||!Array.isArray(j_.children)||j_.children.length===0)return;W((t)=>[...t,j_.path]),j(j_.path),J(null)},Q_=()=>{if(!s)return;W(($_)=>{let j_=$_.slice(0,-1);return j(j_[j_.length-1]||_?.root?.path||"."),j_}),J(null)};return B`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${K?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${V?.path||_?.root?.path||"."}`}
                data-segments=${z.length}
                data-base-size=${X}>
                ${z.map(($_)=>B`
                    <path
                        key=${$_.key}
                        d=${$_.d}
                        fill=${$_.color}
                        stroke="var(--bg-primary)"
                        stroke-width="1"
                        class=${`workspace-folder-starburst-segment${$?.key===$_.key?" is-hovered":""}`}
                        onMouseEnter=${()=>J($_)}
                        onMouseLeave=${()=>J(null)}
                        onTouchStart=${()=>J($_)}
                        onTouchEnd=${()=>J(null)}
                        onClick=${()=>Z_($_)}
                    >
                        <title>${$_.label} — ${m0($_.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${s?" is-drill":""}`}
                    onClick=${Q_}
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
                    <text x="120" y="130" text-anchor="middle" class="workspace-folder-starburst-total-value">${a}</text>
                </g>
            </svg>
            ${C.length>0&&B`
                <div class="workspace-folder-starburst-legend">
                    ${C.slice(0,8).map(($_)=>B`
                        <div key=${$_.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${$_.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${$_.name}>${$_.name}</span>
                            <span class="workspace-folder-starburst-size">${m0($_.size)}</span>
                            <span class="workspace-folder-starburst-pct">${$_.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&B`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function W6({mediaId:_}){let[$,J]=u(null);if(g(()=>{if(!_)return;b2(_).then(J).catch(()=>{})},[_]),!$)return null;let Z=$.filename||"file",j=$.metadata?.size?m0($.metadata.size):"";return B`
        <a href=${Y2(_)} download=${Z} class="file-attachment"
            onClick=${(Y)=>Y.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${Z}</span>
                ${j&&B`<span class="file-size">${j}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function I4({onFileSelect:_,visible:$=!0,active:J=void 0,onOpenEditor:Z}){let[j,Y]=u(null),[W,K]=u(new Set(["."])),[G,V]=u(null),[X,U]=u(null),[C,L]=u(""),[D,M]=u(null),[S,z]=u(null),[y,v]=u(!0),[H,f]=u(!1),[a,s]=u(null),[Z_,Q_]=u(()=>j2("workspaceShowHidden",!1)),[$_,j_]=u(!1),[t,r]=u(null),[J_,h]=u(null),[e,O_]=u(null),[N_,__]=u(!1),[Y_,B_]=u(null),[G_,k_]=u(()=>E4()),[V_,y_]=u(()=>S1({stored:I0(h2),...b1()})),U_=w(W),L_=w(""),v_=w(null),A_=w(0),n_=w(new Set),I_=w(null),x_=w(new Map),w_=w(_),X0=w(Z),h_=w(null),T_=w(null),t_=w(null),G0=w(null),D0=w(null),k0=w(null),o_=w("."),E_=w(null),r_=w({path:null,dragging:!1,startX:0,startY:0}),R_=w({path:null,dragging:!1,startX:0,startY:0}),P=w({path:null,timer:0}),n=w(!1),D_=w(0),e_=w(new Map),V0=w(null),w0=w(null),y0=w(null),N0=w(null),d_=w(Z_),q0=w($),O0=w(J??$),B0=w(0),c_=w(e),W0=w($_),x0=w(t),Q0=w(null),T0=w({x:0,y:0}),K0=w(0),A0=w(null),_0=w(G),s_=w(X),Z0=w(null),$0=w(null),g0=w(D);w_.current=_,X0.current=Z,g(()=>{U_.current=W},[W]),g(()=>{d_.current=Z_},[Z_]),g(()=>{q0.current=$},[$]),g(()=>{O0.current=J??$},[J,$]),g(()=>{c_.current=e},[e]),g(()=>{if(typeof window>"u")return;let Q=()=>{y_(S1({stored:I0(h2),...b1()}))};Q();let O=()=>Q(),E=()=>Q(),k=(m)=>{if(!m||m.key===null||m.key===h2)Q()};window.addEventListener("resize",O),window.addEventListener("focus",E),window.addEventListener("storage",k);let T=window.matchMedia?.("(pointer: coarse)"),p=window.matchMedia?.("(hover: none)"),i=(m,W_)=>{if(!m)return;if(m.addEventListener)m.addEventListener("change",W_);else if(m.addListener)m.addListener(W_)},o=(m,W_)=>{if(!m)return;if(m.removeEventListener)m.removeEventListener("change",W_);else if(m.removeListener)m.removeListener(W_)};return i(T,O),i(p,O),()=>{window.removeEventListener("resize",O),window.removeEventListener("focus",E),window.removeEventListener("storage",k),o(T,O),o(p,O)}},[]),g(()=>{let Q=(O)=>{let E=O?.detail?.path;if(!E)return;let k=E.split("/"),T=[];for(let p=1;p<k.length;p++)T.push(k.slice(0,p).join("/"));if(T.length)K((p)=>{let i=new Set(p);i.add(".");for(let o of T)i.add(o);return i});V(E),requestAnimationFrame(()=>{let p=document.querySelector(`[data-path="${CSS.escape(E)}"]`);if(p)p.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",Q),()=>window.removeEventListener("workspace-reveal-path",Q)},[]),g(()=>{W0.current=$_},[$_]),g(()=>{x0.current=t},[t]),g(()=>{_0.current=G},[G]),g(()=>{s_.current=X},[X]),g(()=>{g0.current=D},[D]),g(()=>{if(typeof window>"u"||typeof document>"u")return;let Q=()=>k_(E4());Q();let O=window.matchMedia?.("(prefers-color-scheme: dark)"),E=()=>Q();if(O?.addEventListener)O.addEventListener("change",E);else if(O?.addListener)O.addListener(E);let k=typeof MutationObserver<"u"?new MutationObserver(()=>Q()):null;if(k?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)k?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(O?.removeEventListener)O.removeEventListener("change",E);else if(O?.removeListener)O.removeListener(E);k?.disconnect()}},[]),g(()=>{if(!X)return;let Q=D0.current;if(!Q)return;let O=requestAnimationFrame(()=>{try{Q.focus(),Q.select()}catch{}});return()=>cancelAnimationFrame(O)},[X]);let p0=async(Q)=>{f(!0),M(null),z(null);try{let O=await P3(Q,20000);M(O)}catch(O){M({error:O.message||"Failed to load preview"})}finally{f(!1)}};h_.current=p0;let h0=async()=>{if(!q0.current)return;try{let Q=await S2("",1,d_.current),O=L4(Q.root,U_.current,d_.current);if(O===L_.current){v(!1);return}if(L_.current=O,v_.current=Q.root,!A_.current)A_.current=requestAnimationFrame(()=>{A_.current=0,Y((E)=>f1(E,v_.current)),v(!1)})}catch(Q){s(Q.message||"Failed to load workspace"),v(!1)}},f0=async(Q)=>{if(!Q)return;if(n_.current.has(Q))return;n_.current.add(Q);try{let O=await S2(Q,1,d_.current);Y((E)=>x1(E,Q,O.root))}catch(O){s(O.message||"Failed to load workspace")}finally{n_.current.delete(Q)}};T_.current=f0;let f_=b(()=>{let Q=G;if(!Q)return".";let O=x_.current?.get(Q);if(O&&O.type==="dir")return O.path;if(Q==="."||!Q.includes("/"))return".";let E=Q.split("/");return E.pop(),E.join("/")||"."},[G]),Y0=b((Q)=>{let O=Q?.closest?.(".workspace-row");if(!O)return null;let E=O.dataset.path,k=O.dataset.type;if(!E)return null;if(k==="dir")return E;if(E.includes("/")){let T=E.split("/");return T.pop(),T.join("/")||"."}return"."},[]),z0=b((Q)=>{return Y0(Q?.target||null)},[Y0]),m_=b((Q)=>{c_.current=Q,O_(Q)},[]),i_=b(()=>{let Q=P.current;if(Q?.timer)clearTimeout(Q.timer);P.current={path:null,timer:0}},[]),j0=b((Q)=>{if(!Q||Q==="."){i_();return}let O=x_.current?.get(Q);if(!O||O.type!=="dir"){i_();return}if(U_.current?.has(Q)){i_();return}if(P.current?.path===Q)return;i_();let E=setTimeout(()=>{P.current={path:null,timer:0},T_.current?.(Q),K((k)=>{let T=new Set(k);return T.add(Q),T})},600);P.current={path:Q,timer:E}},[i_]),H0=b((Q,O)=>{if(T0.current={x:Q,y:O},K0.current)return;K0.current=requestAnimationFrame(()=>{K0.current=0;let E=Q0.current;if(!E)return;let k=T0.current;E.style.transform=`translate(${k.x+12}px, ${k.y+12}px)`})},[]),M0=b((Q)=>{if(!Q)return;let E=(x_.current?.get(Q)?.name||Q.split("/").pop()||Q).trim();if(!E)return;h({path:Q,label:E})},[]),u0=b(()=>{if(h(null),K0.current)cancelAnimationFrame(K0.current),K0.current=0;if(Q0.current)Q0.current.style.transform="translate(-9999px, -9999px)"},[]),s0=b((Q)=>{if(!Q)return".";let O=x_.current?.get(Q);if(O&&O.type==="dir")return O.path;if(Q==="."||!Q.includes("/"))return".";let E=Q.split("/");return E.pop(),E.join("/")||"."},[]),J0=b(()=>{U(null),L("")},[]),F=b((Q)=>{if(!Q)return;let E=(x_.current?.get(Q)?.name||Q.split("/").pop()||Q).trim();if(!E||Q===".")return;U(Q),L(E)},[]),R=b(async()=>{let Q=s_.current;if(!Q)return;let O=(C||"").trim();if(!O){J0();return}let E=x_.current?.get(Q),k=(E?.name||Q.split("/").pop()||Q).trim();if(O===k){J0();return}try{let p=(await I3(Q,O))?.path||Q,i=Q.includes("/")?Q.split("/").slice(0,-1).join("/")||".":".";if(J0(),s(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:Q,newPath:p,type:E?.type||"file"}})),E?.type==="dir")K((o)=>{let m=new Set;for(let W_ of o)if(W_===Q)m.add(p);else if(W_.startsWith(`${Q}/`))m.add(`${p}${W_.slice(Q.length)}`);else m.add(W_);return m});if(V(p),E?.type==="dir")M(null),f(!1),z(null);else h_.current?.(p);T_.current?.(i)}catch(T){s(T?.message||"Failed to rename file")}},[J0,C]),d=b(async(Q)=>{let k=Q||".";for(let T=0;T<50;T+=1){let i=`untitled${T===0?"":`-${T}`}.md`;try{let m=(await S3(k,i,""))?.path||(k==="."?i:`${k}/${i}`);if(k&&k!==".")K((W_)=>new Set([...W_,k]));V(m),s(null),T_.current?.(k),h_.current?.(m);return}catch(o){if(o?.status===409||o?.code==="file_exists")continue;s(o?.message||"Failed to create file");return}}s("Failed to create file (untitled name already in use).")},[]),X_=b((Q)=>{if(Q?.stopPropagation?.(),N_)return;let O=s0(_0.current);d(O)},[N_,s0,d]);g(()=>{if(typeof window>"u")return;let Q=(O)=>{let E=O?.detail?.updates||[];if(!Array.isArray(E)||E.length===0)return;Y((o)=>{let m=o;for(let W_ of E){if(!W_?.root)continue;if(!m||W_.path==="."||!W_.path)m=W_.root;else m=x1(m,W_.path,W_.root)}if(m)L_.current=L4(m,U_.current,d_.current);return v(!1),m});let k=_0.current;if(Boolean(k)&&E.some((o)=>{let m=o?.path||"";if(!m||m===".")return!0;return k===m||k.startsWith(`${m}/`)||m.startsWith(`${k}/`)}))e_.current.clear();if(!k||!g0.current)return;let p=x_.current?.get(k);if(p&&p.type==="dir")return;if(E.some((o)=>{let m=o?.path||"";if(!m||m===".")return!0;return k===m||k.startsWith(`${m}/`)}))h_.current?.(k)};return window.addEventListener("workspace-update",Q),()=>window.removeEventListener("workspace-update",Q)},[]),I_.current=h0;let F_=w(()=>{if(typeof window>"u")return;let Q=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),O=O0.current??q0.current,E=document.visibilityState!=="hidden"&&(O||Q.matches&&q0.current);I2(E,d_.current).catch(()=>{})}).current,M_=w(0),H_=w(()=>{if(M_.current)clearTimeout(M_.current);M_.current=setTimeout(()=>{M_.current=0,F_()},250)}).current;g(()=>{if(q0.current)I_.current?.();H_()},[$,J]),g(()=>{I_.current(),F_();let Q=setInterval(()=>I_.current(),Z6),O=X2("previewHeight",null),E=Number.isFinite(O)?Math.min(Math.max(O,80),600):280;if(D_.current=E,t_.current)t_.current.style.setProperty("--preview-height",`${E}px`);let k=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),T=()=>H_();if(k.addEventListener)k.addEventListener("change",T);else if(k.addListener)k.addListener(T);return document.addEventListener("visibilitychange",T),()=>{if(clearInterval(Q),A_.current)cancelAnimationFrame(A_.current),A_.current=0;if(k.removeEventListener)k.removeEventListener("change",T);else if(k.removeListener)k.removeListener(T);if(document.removeEventListener("visibilitychange",T),M_.current)clearTimeout(M_.current),M_.current=0;if(E_.current)clearTimeout(E_.current),E_.current=null;I2(!1,d_.current).catch(()=>{})}},[]);let b_=S0(()=>k4(j,W,Z_),[j,W,Z_]),L0=S0(()=>new Map(b_.map((Q)=>[Q.node.path,Q.node])),[b_]),v0=S0(()=>F4(V_),[V_]);x_.current=L0;let z_=(G?x_.current.get(G):null)?.type==="dir";g(()=>{if(!G||!z_){B_(null),V0.current=null,w0.current=null;return}let Q=G,O=`${Z_?"hidden":"visible"}:${G}`,E=e_.current,k=E.get(O);if(k?.root){E.delete(O),E.set(O,k);let i=C4(k.root,Boolean(k.truncated),G_);if(i)V0.current=i,w0.current=G,B_({loading:!1,error:null,payload:i});return}let T=V0.current,p=w0.current;B_({loading:!0,error:null,payload:p===G?T:null}),S2(G,Y6,Z_).then((i)=>{if(_0.current!==Q)return;let o={root:i?.root,truncated:Boolean(i?.truncated)};E.delete(O),E.set(O,o);while(E.size>j6){let W_=E.keys().next().value;if(!W_)break;E.delete(W_)}let m=C4(o.root,o.truncated,G_);V0.current=m,w0.current=G,B_({loading:!1,error:null,payload:m})}).catch((i)=>{if(_0.current!==Q)return;B_({loading:!1,error:i?.message||"Failed to load folder size chart",payload:p===G?T:null})})},[G,z_,Z_,G_]);let R0=Boolean(D&&D.kind==="text"&&!z_&&(!D.size||D.size<=262144)),G2=R0?"Open in editor":D?.size>262144?"File too large to edit":"File is not editable";g(()=>{let Q=y0.current;if(N0.current)N0.current.dispose(),N0.current=null;if(!Q)return;if(Q.innerHTML="",!G||z_||!D||D.error)return;let O={path:G,content:typeof D.text==="string"?D.text:void 0,mtime:D.mtime,size:D.size,preview:D,mode:"view"},E=l_.resolve(O)||l_.get("workspace-preview-default");if(!E)return;let k=E.mount(Q,O);return N0.current=k,()=>{if(N0.current===k)k.dispose(),N0.current=null;Q.innerHTML=""}},[G,z_,D]);let c0=(Q)=>{let O=Q?.target;if(O instanceof Element)return O;return O?.parentElement||null},a0=(Q)=>{return Boolean(Q?.closest?.(".workspace-node-icon, .workspace-label"))},o2=w((Q)=>{if($0.current)clearTimeout($0.current),$0.current=null;let E=c0(Q)?.closest?.("[data-path]");if(!E)return;let k=E.dataset.path;if(E.dataset.type==="dir"||!k)return;if(s_.current===k)J0();X0.current?.(k)}).current,r0=w((Q)=>{if(n.current){n.current=!1;return}let O=c0(Q),E=O?.closest?.("[data-path]");if(G0.current?.focus?.(),!E)return;let k=E.dataset.path,T=E.dataset.type,p=Boolean(O?.closest?.(".workspace-caret")),i=Boolean(O?.closest?.("button"))||Boolean(O?.closest?.("a"))||Boolean(O?.closest?.("input")),o=_0.current===k,m=s_.current;if(m){if(m===k)return;J0()}let W_=T==="file"&&Z0.current===k&&!p&&!i;if(o&&!p&&!i&&k!=="."&&!W_){if($0.current)clearTimeout($0.current);$0.current=setTimeout(()=>{$0.current=null,F(k)},350);return}if(T==="dir"){if(Z0.current=null,V(k),M(null),z(null),f(!1),!U_.current.has(k))T_.current?.(k);if(o&&!p)return;K((C0)=>{let b0=new Set(C0);if(b0.has(k))b0.delete(k);else b0.add(k);return b0})}else{Z0.current=null,V(k);let p_=x_.current.get(k);if(p_)w_.current?.(p_.path,p_);h_.current?.(k)}}).current,i0=w(()=>{L_.current="",I_.current(),Array.from(U_.current||[]).filter((O)=>O&&O!==".").forEach((O)=>T_.current?.(O))}).current,g_=w(()=>{Z0.current=null,V(null),M(null),z(null),f(!1)}).current,n2=w(()=>{Q_((Q)=>{let O=!Q;if(typeof window<"u")u_("workspaceShowHidden",String(O));return d_.current=O,I2(!0,O).catch(()=>{}),L_.current="",I_.current?.(),Array.from(U_.current||[]).filter((k)=>k&&k!==".").forEach((k)=>T_.current?.(k)),O})}).current,r2=w((Q)=>{if(c0(Q)?.closest?.("[data-path]"))return;g_()}).current,l0=b(async(Q)=>{if(!Q)return;let O=Q.split("/").pop()||Q;if(!window.confirm(`Delete "${O}"? This cannot be undone.`))return;try{await T3(Q);let k=Q.includes("/")?Q.split("/").slice(0,-1).join("/")||".":".";if(_0.current===Q)g_();T_.current?.(k),s(null)}catch(k){M((T)=>({...T||{},error:k.message||"Failed to delete file"}))}},[g_]),U0=b((Q)=>{let O=G0.current;if(!O||!Q||typeof CSS>"u"||typeof CSS.escape!=="function")return;O.querySelector(`[data-path="${CSS.escape(Q)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),P0=b((Q)=>{let O=b_;if(!O||O.length===0)return;let E=G?O.findIndex((k)=>k.node.path===G):-1;if(Q.key==="ArrowDown"){Q.preventDefault();let k=Math.min(E+1,O.length-1),T=O[k];if(!T)return;if(V(T.node.path),T.node.type!=="dir")w_.current?.(T.node.path,T.node),h_.current?.(T.node.path);else M(null),f(!1),z(null);U0(T.node.path);return}if(Q.key==="ArrowUp"){Q.preventDefault();let k=E<=0?0:E-1,T=O[k];if(!T)return;if(V(T.node.path),T.node.type!=="dir")w_.current?.(T.node.path,T.node),h_.current?.(T.node.path);else M(null),f(!1),z(null);U0(T.node.path);return}if(Q.key==="ArrowRight"&&E>=0){let k=O[E];if(k?.node?.type==="dir"&&!W.has(k.node.path))Q.preventDefault(),T_.current?.(k.node.path),K((T)=>new Set([...T,k.node.path]));return}if(Q.key==="ArrowLeft"&&E>=0){let k=O[E];if(k?.node?.type==="dir"&&W.has(k.node.path))Q.preventDefault(),K((T)=>{let p=new Set(T);return p.delete(k.node.path),p});return}if(Q.key==="Enter"&&E>=0){Q.preventDefault();let k=O[E];if(!k)return;let T=k.node.path;if(k.node.type==="dir"){if(!U_.current.has(T))T_.current?.(T);K((i)=>{let o=new Set(i);if(o.has(T))o.delete(T);else o.add(T);return o}),M(null),z(null),f(!1)}else w_.current?.(T,k.node),h_.current?.(T);return}if((Q.key==="Delete"||Q.key==="Backspace")&&E>=0){let k=O[E];if(!k||k.node.type==="dir")return;Q.preventDefault(),l0(k.node.path);return}if(Q.key==="Escape")Q.preventDefault(),g_()},[g_,l0,W,b_,U0,G]),d2=b((Q)=>{let O=c0(Q),E=O?.closest?.(".workspace-row");if(!E)return;let k=E.dataset.type,T=E.dataset.path;if(!T||T===".")return;if(s_.current===T)return;let p=Q?.touches?.[0];if(!p)return;if(r_.current={path:a0(O)?T:null,dragging:!1,startX:p.clientX,startY:p.clientY},k!=="file")return;if(E_.current)clearTimeout(E_.current);E_.current=setTimeout(()=>{if(E_.current=null,r_.current?.dragging)return;l0(T)},600)},[l0]),V2=b(()=>{if(E_.current)clearTimeout(E_.current),E_.current=null;let Q=r_.current;if(Q?.dragging&&Q.path){let O=c_.current||f_(),E=A0.current;if(typeof E==="function")E(Q.path,O)}r_.current={path:null,dragging:!1,startX:0,startY:0},B0.current=0,j_(!1),r(null),m_(null),i_(),u0()},[f_,u0,m_,i_]),t0=b((Q)=>{let O=r_.current,E=Q?.touches?.[0];if(!E||!O?.path){if(E_.current)clearTimeout(E_.current),E_.current=null;return}let k=Math.abs(E.clientX-O.startX),T=Math.abs(E.clientY-O.startY),p=k>8||T>8;if(p&&E_.current)clearTimeout(E_.current),E_.current=null;if(!O.dragging&&p)O.dragging=!0,j_(!0),r("move"),M0(O.path);if(O.dragging){Q.preventDefault(),H0(E.clientX,E.clientY);let i=document.elementFromPoint(E.clientX,E.clientY),o=Y0(i)||f_();if(c_.current!==o)m_(o);j0(o)}},[Y0,f_,M0,H0,m_,j0]),s2=w((Q)=>{Q.preventDefault();let O=t_.current;if(!O)return;let E=Q.clientY,k=D_.current||280,T=Q.currentTarget;T.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let p=E,i=(m)=>{p=m.clientY;let W_=O.clientHeight-80,p_=Math.min(Math.max(k-(m.clientY-E),80),W_);O.style.setProperty("--preview-height",`${p_}px`),D_.current=p_},o=()=>{let m=O.clientHeight-80,W_=Math.min(Math.max(k-(p-E),80),m);D_.current=W_,T.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",u_("previewHeight",String(Math.round(W_))),document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",o)};document.addEventListener("mousemove",i),document.addEventListener("mouseup",o)}).current,a2=w((Q)=>{Q.preventDefault();let O=t_.current;if(!O)return;let E=Q.touches[0];if(!E)return;let k=E.clientY,T=D_.current||280,p=Q.currentTarget;p.classList.add("dragging"),document.body.style.userSelect="none";let i=(m)=>{let W_=m.touches[0];if(!W_)return;m.preventDefault();let p_=O.clientHeight-80,C0=Math.min(Math.max(T-(W_.clientY-k),80),p_);O.style.setProperty("--preview-height",`${C0}px`),D_.current=C0},o=()=>{p.classList.remove("dragging"),document.body.style.userSelect="",u_("previewHeight",String(Math.round(D_.current||T))),document.removeEventListener("touchmove",i),document.removeEventListener("touchend",o),document.removeEventListener("touchcancel",o)};document.addEventListener("touchmove",i,{passive:!1}),document.addEventListener("touchend",o),document.addEventListener("touchcancel",o)}).current,t2=async()=>{if(!G)return;try{let Q=await b3(G);if(Q.media_id)z(Q.media_id)}catch(Q){M((O)=>({...O||{},error:Q.message||"Failed to attach"}))}},e2=async()=>{if(!G||z_)return;await l0(G)},e0=(Q)=>{return Array.from(Q?.dataTransfer?.types||[]).includes("Files")},_1=b((Q)=>{if(!e0(Q))return;if(Q.preventDefault(),B0.current+=1,!W0.current)j_(!0);r("upload");let O=z0(Q)||f_();m_(O),j0(O)},[f_,z0,m_,j0]),_2=b((Q)=>{if(!e0(Q))return;if(Q.preventDefault(),Q.dataTransfer)Q.dataTransfer.dropEffect="copy";if(!W0.current)j_(!0);if(x0.current!=="upload")r("upload");let O=z0(Q)||f_();if(c_.current!==O)m_(O);j0(O)},[f_,z0,m_,j0]),N2=b((Q)=>{if(!e0(Q))return;if(Q.preventDefault(),B0.current=Math.max(0,B0.current-1),B0.current===0)j_(!1),r(null),m_(null),i_()},[m_,i_]),E0=b(async(Q,O=".")=>{let E=Array.from(Q||[]);if(E.length===0)return;let k=O&&O!==""?O:".",T=k!=="."?k:"workspace root";__(!0);try{let p=null;for(let i of E)try{p=await O1(i,k)}catch(o){let m=o?.status,W_=o?.code;if(m===409||W_==="file_exists"){let p_=i?.name||"file";if(!window.confirm(`"${p_}" already exists in ${T}. Overwrite?`))continue;p=await O1(i,k,{overwrite:!0})}else throw o}if(p?.path)Z0.current=p.path,V(p.path),h_.current?.(p.path);T_.current?.(k)}catch(p){s(p.message||"Failed to upload file")}finally{__(!1)}},[]),$1=b(async(Q,O)=>{if(!Q)return;let E=x_.current?.get(Q);if(!E)return;let k=O&&O!==""?O:".",T=Q.includes("/")?Q.split("/").slice(0,-1).join("/")||".":".";if(k===T)return;try{let i=(await x3(Q,k))?.path||Q;if(E.type==="dir")K((o)=>{let m=new Set;for(let W_ of o)if(W_===Q)m.add(i);else if(W_.startsWith(`${Q}/`))m.add(`${i}${W_.slice(Q.length)}`);else m.add(W_);return m});if(V(i),E.type==="dir")M(null),f(!1),z(null);else h_.current?.(i);T_.current?.(T),T_.current?.(k)}catch(p){s(p?.message||"Failed to move entry")}},[]);A0.current=$1;let J1=b(async(Q)=>{if(!e0(Q))return;Q.preventDefault(),B0.current=0,j_(!1),r(null),O_(null),i_();let O=Array.from(Q?.dataTransfer?.files||[]);if(O.length===0)return;let E=c_.current||z0(Q)||f_();await E0(O,E)},[f_,z0,E0]),Z1=b((Q)=>{if(Q?.stopPropagation?.(),N_)return;let O=Q?.currentTarget?.dataset?.uploadTarget||".";o_.current=O,k0.current?.click()},[N_]),Y1=b(()=>{if(N_)return;let Q=_0.current,O=Q?x_.current?.get(Q):null;o_.current=O?.type==="dir"?O.path:".",k0.current?.click()},[N_]),j1=b((Q)=>{if(!Q||Q.button!==0)return;let O=Q.currentTarget;if(!O||!O.dataset)return;let E=O.dataset.path;if(!E||E===".")return;if(s_.current===E)return;let k=c0(Q);if(k?.closest?.("button, a, input, .workspace-caret"))return;if(!a0(k))return;Q.preventDefault(),R_.current={path:E,dragging:!1,startX:Q.clientX,startY:Q.clientY};let T=(i)=>{let o=R_.current;if(!o?.path)return;let m=Math.abs(i.clientX-o.startX),W_=Math.abs(i.clientY-o.startY),p_=m>4||W_>4;if(!o.dragging&&p_)o.dragging=!0,n.current=!0,j_(!0),r("move"),M0(o.path),H0(i.clientX,i.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(o.dragging){i.preventDefault(),H0(i.clientX,i.clientY);let C0=document.elementFromPoint(i.clientX,i.clientY),b0=Y0(C0)||f_();if(c_.current!==b0)m_(b0);j0(b0)}},p=()=>{document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",p);let i=R_.current;if(i?.dragging&&i.path){let o=c_.current||f_(),m=A0.current;if(typeof m==="function")m(i.path,o)}R_.current={path:null,dragging:!1,startX:0,startY:0},B0.current=0,j_(!1),r(null),m_(null),i_(),u0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{n.current=!1},0)};document.addEventListener("mousemove",T),document.addEventListener("mouseup",p)},[Y0,f_,M0,H0,u0,m_,j0,i_]),X1=b(async(Q)=>{let O=Array.from(Q?.target?.files||[]);if(O.length===0)return;let E=o_.current||".";if(await E0(O,E),o_.current=".",Q?.target)Q.target.value=""},[E0]);return B`
        <aside
            class=${`workspace-sidebar${$_?" workspace-drop-active":""}`}
            data-workspace-scale=${V_}
            ref=${t_}
            onDragEnter=${_1}
            onDragOver=${_2}
            onDragLeave=${N2}
            onDrop=${J1}
        >
            <input type="file" multiple style="display:none" ref=${k0} onChange=${X1} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${X_} title="New file" disabled=${N_}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${i0} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${Z_?" active":""}`}
                        onClick=${n2}
                        title=${Z_?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!Z_&&B`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${r2}>
                ${N_&&B`<div class="workspace-drop-hint">Uploading…</div>`}
                ${y&&B`<div class="workspace-loading">Loading…</div>`}
                ${a&&B`<div class="workspace-error">${a}</div>`}
                ${j&&B`
                    <div
                        class="workspace-tree-list"
                        ref=${G0}
                        tabIndex="0"
                        onClick=${r0}
                        onDblClick=${o2}
                        onKeyDown=${P0}
                        onTouchStart=${d2}
                        onTouchEnd=${V2}
                        onTouchMove=${t0}
                        onTouchCancel=${V2}
                    >
                        ${b_.map(({node:Q,depth:O})=>{let E=Q.type==="dir",k=Q.path===G,T=Q.path===X,p=E&&W.has(Q.path),i=e&&Q.path===e,o=Array.isArray(Q.children)&&Q.children.length>0?Q.children.length:Number(Q.child_count)||0;return B`
                                <div
                                    key=${Q.path}
                                    class=${`workspace-row${k?" selected":""}${i?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+O*v0.indentPx}px`}}
                                    data-path=${Q.path}
                                    data-type=${Q.type}
                                    onMouseDown=${j1}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${E?p?B`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:B`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${E?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${E?B`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:B`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${T?B`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${D0}
                                                value=${C}
                                                onInput=${(m)=>L(m?.target?.value||"")}
                                                onKeyDown=${(m)=>{if(m.key==="Enter")m.preventDefault(),R();else if(m.key==="Escape")m.preventDefault(),J0()}}
                                                onBlur=${J0}
                                                onClick=${(m)=>m.stopPropagation()}
                                            />
                                        `:B`<span class="workspace-label">${Q.name}</span>`}
                                    ${E&&!p&&o>0&&B`
                                        <span class="workspace-count">${o}</span>
                                    `}
                                    ${E&&B`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${Q.path}
                                            title="Upload files to this folder"
                                            onClick=${Z1}
                                            disabled=${N_}
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
            ${G&&B`
                <div class="workspace-preview-splitter-h" onMouseDown=${s2} onTouchStart=${a2}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${G}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${X_} title="New file" disabled=${N_}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!z_&&B`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>R0&&X0.current?.(G,D)}
                                    title=${G2}
                                    disabled=${!R0}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${e2}
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
                            ${z_?B`
                                    <button class="workspace-download" onClick=${Y1}
                                        title="Upload files to this folder" disabled=${N_}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${f3(G,Z_)}
                                        title="Download folder as zip" onClick=${(Q)=>Q.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:B`<button class="workspace-download" onClick=${t2} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${H&&B`<div class="workspace-loading">Loading preview…</div>`}
                    ${D?.error&&B`<div class="workspace-error">${D.error}</div>`}
                    ${z_&&B`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${Y_?.loading&&B`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${Y_?.error&&B`<div class="workspace-error">${Y_.error}</div>`}
                        ${Y_?.payload&&Y_.payload.segments?.length>0&&B`
                            <${X6} payload=${Y_.payload} />
                        `}
                        ${Y_?.payload&&(!Y_.payload.segments||Y_.payload.segments.length===0)&&B`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${D&&!D.error&&!z_&&B`
                        <div class="workspace-preview-meta">
                            ${D.size?B`<span>${m0(D.size)}</span>`:""}
                            ${D.mtime?B`<span>${m2(D.mtime)}</span>`:""}
                            ${D.truncated?B`<span>truncated</span>`:""}
                        </div>
                        <div class="workspace-preview-body" ref=${y0}></div>
                    `}
                    ${S&&B`
                        <div class="workspace-download-card">
                            <${W6} mediaId=${S} />
                        </div>
                    `}
                </div>
            `}
            ${J_&&B`
                <div class="workspace-drag-ghost" ref=${Q0}>${J_.label}</div>
            `}
        </aside>
    `}function x4({tabs:_,activeId:$,onActivate:J,onClose:Z,onCloseOthers:j,onCloseAll:Y,onTogglePin:W,onTogglePreview:K,previewTabs:G,onToggleDock:V,dockVisible:X}){let[U,C]=u(null),L=w(null);g(()=>{if(!U)return;let z=(y)=>{if(y.type==="keydown"&&y.key!=="Escape")return;C(null)};return document.addEventListener("click",z),document.addEventListener("keydown",z),()=>{document.removeEventListener("click",z),document.removeEventListener("keydown",z)}},[U]),g(()=>{let z=(y)=>{if(y.ctrlKey&&y.key==="Tab"){if(y.preventDefault(),!_.length)return;let v=_.findIndex((H)=>H.id===$);if(y.shiftKey){let H=_[(v-1+_.length)%_.length];J?.(H.id)}else{let H=_[(v+1)%_.length];J?.(H.id)}return}if((y.ctrlKey||y.metaKey)&&y.key==="w"){let v=document.querySelector(".editor-pane");if(v&&v.contains(document.activeElement)){if(y.preventDefault(),$)Z?.($)}}};return document.addEventListener("keydown",z),()=>document.removeEventListener("keydown",z)},[_,$,J,Z]);let D=b((z,y)=>{if(z.button===1){z.preventDefault(),Z?.(y);return}if(z.button===0)J?.(y)},[J,Z]),M=b((z,y)=>{z.preventDefault(),C({id:y,x:z.clientX,y:z.clientY})},[]),S=b((z,y)=>{z.stopPropagation(),Z?.(y)},[Z]);if(g(()=>{if(!$||!L.current)return;let z=L.current.querySelector(".tab-item.active");if(z)z.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return B`
        <div class="tab-strip" ref=${L} role="tablist">
            ${_.map((z)=>B`
                <div
                    key=${z.id}
                    class=${`tab-item${z.id===$?" active":""}${z.dirty?" dirty":""}${z.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${z.id===$}
                    title=${z.path}
                    onMouseDown=${(y)=>D(y,z.id)}
                    onContextMenu=${(y)=>M(y,z.id)}
                >
                    ${z.pinned&&B`
                        <span class="tab-pin-icon" aria-label="Pinned">
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                <path d="M4.456.734a1.75 1.75 0 0 1 2.826.504l.613 1.327a3.1 3.1 0 0 0 2.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.1 3.1 0 0 0-1.707-2.084l-1.327-.613a1.75 1.75 0 0 1-.504-2.826z"/>
                            </svg>
                        </span>
                    `}
                    <span class="tab-label">${z.label}</span>
                    <span
                        class="tab-close"
                        onClick=${(y)=>S(y,z.id)}
                        title=${z.dirty?"Unsaved changes":"Close"}
                        aria-label=${z.dirty?"Unsaved changes":`Close ${z.label}`}
                    >
                        ${z.dirty?B`<span class="tab-dirty-dot" aria-hidden="true"></span>`:B`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                <line x1="4" y1="4" x2="12" y2="12"/>
                                <line x1="12" y1="4" x2="4" y2="12"/>
                            </svg>`}
                    </span>
                </div>
            `)}
            ${V&&B`
                <div class="tab-strip-spacer"></div>
                <button
                    class=${`tab-strip-dock-toggle${X?" active":""}`}
                    onClick=${V}
                    title=${`${X?"Hide":"Show"} terminal (Ctrl+\`)`}
                    aria-label=${`${X?"Hide":"Show"} terminal`}
                    aria-pressed=${X?"true":"false"}
                >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="4 12 4 10 8 6 12 10 12 12"/>
                        <line x1="2" y1="14" x2="14" y2="14"/>
                    </svg>
                </button>
            `}
        </div>
        ${U&&B`
            <div class="tab-context-menu" style=${{left:U.x+"px",top:U.y+"px"}}>
                <button onClick=${()=>{Z?.(U.id),C(null)}}>Close</button>
                <button onClick=${()=>{j?.(U.id),C(null)}}>Close Others</button>
                <button onClick=${()=>{Y?.(),C(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{W?.(U.id),C(null)}}>
                    ${_.find((z)=>z.id===U.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${K&&/\.(md|mdx|markdown)$/i.test(U.id)&&B`
                    <hr />
                    <button onClick=${()=>{K(U.id),C(null)}}>
                        ${G?.has(U.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var Q6=400,v1=60,T4=220,R1="mdPreviewHeight";function K6(){try{let _=localStorage.getItem(R1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=v1?$:T4}catch{return T4}}function f4({getContent:_,path:$,onClose:J}){let[Z,j]=u(""),[Y,W]=u(K6),K=w(null),G=w(null),V=w(""),X=w(_);return X.current=_,g(()=>{let L=()=>{let M=X.current?.()||"";if(M===V.current)return;V.current=M;try{let S=K2(M,null,{sanitize:!1});j(S)}catch{j('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};L();let D=setInterval(L,Q6);return()=>clearInterval(D)},[]),g(()=>{if(K.current&&Z)c2(K.current).catch(()=>{})},[Z]),B`
        <div
            class="md-preview-splitter"
            onMouseDown=${(L)=>{L.preventDefault();let D=L.clientY,M=G.current?.offsetHeight||Y,S=G.current?.parentElement,z=S?S.offsetHeight*0.7:500,y=L.currentTarget;y.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let v=(f)=>{let a=Math.min(Math.max(M-(f.clientY-D),v1),z);W(a)},H=()=>{y.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(R1,String(Math.round(G.current?.offsetHeight||Y)))}catch{}document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",H)};document.addEventListener("mousemove",v),document.addEventListener("mouseup",H)}}
            onTouchStart=${(L)=>{L.preventDefault();let D=L.touches[0];if(!D)return;let M=D.clientY,S=G.current?.offsetHeight||Y,z=G.current?.parentElement,y=z?z.offsetHeight*0.7:500,v=L.currentTarget;v.classList.add("dragging"),document.body.style.userSelect="none";let H=(a)=>{let s=a.touches[0];if(!s)return;a.preventDefault();let Z_=Math.min(Math.max(S-(s.clientY-M),v1),y);W(Z_)},f=()=>{v.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(R1,String(Math.round(G.current?.offsetHeight||Y)))}catch{}document.removeEventListener("touchmove",H),document.removeEventListener("touchend",f),document.removeEventListener("touchcancel",f)};document.addEventListener("touchmove",H,{passive:!1}),document.addEventListener("touchend",f),document.addEventListener("touchcancel",f)}}
        ></div>
        <div class="md-preview-panel" ref=${G} style=${{height:Y+"px"}}>
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
                ref=${K}
                dangerouslySetInnerHTML=${{__html:Z}}
            />
        </div>
    `}function u4({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:J}){g(()=>{J();let Z=new z1(_,$);Z.connect();let j=()=>{Z.reconnectIfNeeded()};return window.addEventListener("focus",j),document.addEventListener("visibilitychange",j),()=>{window.removeEventListener("focus",j),document.removeEventListener("visibilitychange",j),Z.disconnect()}},[$,_,J])}function v4(){let[_,$]=u(!1),[J,Z]=u("default"),j=w(!1);g(()=>{let G=j2("notificationsEnabled",!1);if(j.current=G,$(G),typeof Notification<"u")Z(Notification.permission)},[]),g(()=>{j.current=_},[_]);let Y=b(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let G=Notification.requestPermission();if(G&&typeof G.then==="function")return G;return Promise.resolve(G)}catch{return Promise.resolve("default")}},[]),W=b(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){Z("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let V=await Y();if(Z(V||"default"),V!=="granted"){j.current=!1,$(!1),u_("notificationsEnabled","false");return}}let G=!j.current;j.current=G,$(G),u_("notificationsEnabled",String(G))},[Y]),K=b((G,V)=>{if(!j.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let X=new Notification(G,{body:V});return X.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:J,toggleNotifications:W,notify:K}}var U2=(_)=>{let $=new Set;return(_||[]).filter((J)=>{if(!J||$.has(J.id))return!1;return $.add(J.id),!0})};function R4({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[J,Z]=u(null),[j,Y]=u(!1),W=w(!1),K=w(null),G=w(!1),V=w(null);g(()=>{W.current=j},[j]);let X=b(async(L=null)=>{try{if(L){let D=await U3(L);Z(D.posts),Y(!1)}else{let D=await P2(10);Z(D.posts),Y(D.has_more)}}catch(D){console.error("Failed to load posts:",D)}},[]),U=b(async()=>{try{let L=await P2(10);Z((D)=>{if(!D||D.length===0)return L.posts;return U2([...L.posts,...D])}),Y((D)=>D||L.has_more)}catch(L){console.error("Failed to refresh timeline:",L)}},[]),C=b(async(L={})=>{if(!J||J.length===0)return;if(G.current)return;let{preserveScroll:D=!0,preserveMode:M="top",allowRepeat:S=!1}=L,z=(H)=>{if(!D){H();return}if(M==="top")$(H);else _(H)},v=J.slice().sort((H,f)=>H.id-f.id)[0]?.id;if(!Number.isFinite(v))return;if(!S&&V.current===v)return;G.current=!0,V.current=v;try{let H=await P2(10,v);if(H.posts.length>0)z(()=>{Z((f)=>U2([...H.posts,...f||[]])),Y(H.has_more)});else Y(!1)}catch(H){console.error("Failed to load more posts:",H)}finally{G.current=!1}},[J,_,$]);return g(()=>{K.current=C},[C]),{posts:J,setPosts:Z,hasMore:j,setHasMore:Y,hasMoreRef:W,loadPosts:X,refreshTimeline:U,loadMore:C,loadMoreRef:K,loadingMoreRef:G,lastBeforeIdRef:V}}function c4(){let[_,$]=u(null),[J,Z]=u({text:"",totalLines:0}),[j,Y]=u(""),[W,K]=u({text:"",totalLines:0}),[G,V]=u(null),[X,U]=u(null),[C,L]=u(null),D=w(null),M=w(0),S=w(!1),z=w(""),y=w(""),v=w(null),H=w(null),f=w(null),a=w(null),s=w(!1),Z_=w(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:J,setAgentDraft:Z,agentPlan:j,setAgentPlan:Y,agentThought:W,setAgentThought:K,pendingRequest:G,setPendingRequest:V,currentTurnId:X,setCurrentTurnId:U,steerQueuedTurnId:C,setSteerQueuedTurnId:L,lastAgentEventRef:D,lastSilenceNoticeRef:M,isAgentRunningRef:S,draftBufferRef:z,thoughtBufferRef:y,pendingRequestRef:v,stalledPostIdRef:H,currentTurnIdRef:f,steerQueuedTurnIdRef:a,thoughtExpandedRef:s,draftExpandedRef:Z_}}function m4({appShellRef:_,sidebarWidthRef:$,editorWidthRef:J,dockHeightRef:Z}){let j=w((X)=>{X.preventDefault();let U=_.current;if(!U)return;let C=X.clientX,L=$.current||280,D=X.currentTarget;D.classList.add("dragging"),U.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let M=C,S=(y)=>{M=y.clientX;let v=Math.min(Math.max(L+(y.clientX-C),160),600);U.style.setProperty("--sidebar-width",`${v}px`),$.current=v},z=()=>{let y=Math.min(Math.max(L+(M-C),160),600);$.current=y,D.classList.remove("dragging"),U.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",u_("sidebarWidth",String(Math.round(y))),document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",S),document.addEventListener("mouseup",z)}).current,Y=w((X)=>{X.preventDefault();let U=_.current;if(!U)return;let C=X.touches[0];if(!C)return;let L=C.clientX,D=$.current||280,M=X.currentTarget;M.classList.add("dragging"),U.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let S=(y)=>{let v=y.touches[0];if(!v)return;y.preventDefault();let H=Math.min(Math.max(D+(v.clientX-L),160),600);U.style.setProperty("--sidebar-width",`${H}px`),$.current=H},z=()=>{M.classList.remove("dragging"),U.classList.remove("sidebar-resizing"),document.body.style.userSelect="",u_("sidebarWidth",String(Math.round($.current||D))),document.removeEventListener("touchmove",S),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",S,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current,W=w((X)=>{X.preventDefault();let U=_.current;if(!U)return;let C=X.clientX,L=J.current||$.current||280,D=X.currentTarget;D.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let M=C,S=(y)=>{M=y.clientX;let v=Math.min(Math.max(L+(y.clientX-C),200),800);U.style.setProperty("--editor-width",`${v}px`),J.current=v},z=()=>{let y=Math.min(Math.max(L+(M-C),200),800);J.current=y,D.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",u_("editorWidth",String(Math.round(y))),document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",S),document.addEventListener("mouseup",z)}).current,K=w((X)=>{X.preventDefault();let U=_.current;if(!U)return;let C=X.touches[0];if(!C)return;let L=C.clientX,D=J.current||$.current||280,M=X.currentTarget;M.classList.add("dragging"),document.body.style.userSelect="none";let S=(y)=>{let v=y.touches[0];if(!v)return;y.preventDefault();let H=Math.min(Math.max(D+(v.clientX-L),200),800);U.style.setProperty("--editor-width",`${H}px`),J.current=H},z=()=>{M.classList.remove("dragging"),document.body.style.userSelect="",u_("editorWidth",String(Math.round(J.current||D))),document.removeEventListener("touchmove",S),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",S,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current,G=w((X)=>{X.preventDefault();let U=_.current;if(!U)return;let C=X.clientY,L=Z?.current||200,D=X.currentTarget;D.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let M=C,S=(y)=>{M=y.clientY;let v=Math.min(Math.max(L-(y.clientY-C),100),window.innerHeight*0.5);if(U.style.setProperty("--dock-height",`${v}px`),Z)Z.current=v},z=()=>{let y=Math.min(Math.max(L-(M-C),100),window.innerHeight*0.5);if(Z)Z.current=y;D.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",u_("dockHeight",String(Math.round(y))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",S),document.addEventListener("mouseup",z)}).current,V=w((X)=>{X.preventDefault();let U=_.current;if(!U)return;let C=X.touches[0];if(!C)return;let L=C.clientY,D=Z?.current||200,M=X.currentTarget;M.classList.add("dragging"),document.body.style.userSelect="none";let S=(y)=>{let v=y.touches[0];if(!v)return;y.preventDefault();let H=Math.min(Math.max(D-(v.clientY-L),100),window.innerHeight*0.5);if(U.style.setProperty("--dock-height",`${H}px`),Z)Z.current=H},z=()=>{M.classList.remove("dragging"),document.body.style.userSelect="",u_("dockHeight",String(Math.round(Z?.current||D))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",S),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",S,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current;return{handleSplitterMouseDown:j,handleSplitterTouchStart:Y,handleEditorSplitterMouseDown:W,handleEditorSplitterTouchStart:K,handleDockSplitterMouseDown:G,handleDockSplitterTouchStart:V}}function g4({onTabClosed:_}={}){let $=w(_);$.current=_;let[J,Z]=u(()=>C_.getTabs()),[j,Y]=u(()=>C_.getActiveId()),[W,K]=u(()=>C_.getTabs().length>0);g(()=>{return C_.onChange((H,f)=>{Z(H),Y(f),K(H.length>0)})},[]);let[G,V]=u(()=>new Set),X=b((H)=>{V((f)=>{let a=new Set(f);if(a.has(H))a.delete(H);else a.add(H);return a})},[]),U=b((H)=>{V((f)=>{if(!f.has(H))return f;let a=new Set(f);return a.delete(H),a})},[]),C=b((H)=>{if(!H)return;let f={path:H,mode:"edit"};try{if(!l_.resolve(f)){if(!l_.get("editor")){console.warn(`[openEditor] No pane handler for: ${H}`);return}}}catch(a){console.warn(`[openEditor] paneRegistry.resolve() error for "${H}":`,a)}C_.open(H)},[]),L=b(()=>{let H=C_.getActiveId();if(H){let f=C_.get(H);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}C_.close(H),U(H),$.current?.(H)}},[U]),D=b((H)=>{let f=C_.get(H);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}C_.close(H),U(H),$.current?.(H)},[U]),M=b((H)=>{C_.activate(H)},[]),S=b((H)=>{let f=C_.getTabs().filter((Z_)=>Z_.id!==H&&!Z_.pinned),a=f.filter((Z_)=>Z_.dirty).length;if(a>0){if(!window.confirm(`${a} unsaved tab${a>1?"s":""} will be closed. Continue?`))return}let s=f.map((Z_)=>Z_.id);C_.closeOthers(H),s.forEach((Z_)=>{U(Z_),$.current?.(Z_)})},[U]),z=b(()=>{let H=C_.getTabs().filter((s)=>!s.pinned),f=H.filter((s)=>s.dirty).length;if(f>0){if(!window.confirm(`${f} unsaved tab${f>1?"s":""} will be closed. Continue?`))return}let a=H.map((s)=>s.id);C_.closeAll(),a.forEach((s)=>{U(s),$.current?.(s)})},[U]),y=b((H)=>{C_.togglePin(H)},[]),v=b(()=>{let H=C_.getActiveId();if(H)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:H}}))},[]);return g(()=>{let H=(f)=>{let{oldPath:a,newPath:s,type:Z_}=f.detail||{};if(!a||!s)return;if(Z_==="dir"){for(let Q_ of C_.getTabs())if(Q_.path===a||Q_.path.startsWith(`${a}/`)){let $_=`${s}${Q_.path.slice(a.length)}`;C_.rename(Q_.id,$_)}}else C_.rename(a,s)};return window.addEventListener("workspace-file-renamed",H),()=>window.removeEventListener("workspace-file-renamed",H)},[]),g(()=>{let H=(f)=>{if(C_.hasUnsaved())f.preventDefault(),f.returnValue=""};return window.addEventListener("beforeunload",H),()=>window.removeEventListener("beforeunload",H)},[]),{editorOpen:W,tabStripTabs:J,tabStripActiveId:j,previewTabs:G,openEditor:C,closeEditor:L,handleTabClose:D,handleTabActivate:M,handleTabCloseOthers:S,handleTabCloseAll:z,handleTabTogglePin:y,handleTabTogglePreview:X,revealInExplorer:v}}function c1(_,$){try{if(typeof window>"u")return $;let J=window.__PICLAW_SILENCE||{},Z=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,j=J[_]??window[Z],Y=Number(j);return Number.isFinite(Y)?Y:$}catch{return $}}var m1=c1("warning",30000),p4=c1("finalize",120000),h4=c1("refresh",30000),i4=30000;function l4(_){let $={};return(_?.agents||[]).forEach((J)=>{$[J.id]=J}),$}function o4(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function n4(_=30000){let[,$]=u(0);g(()=>{let J=setInterval(()=>$((Z)=>Z+1),_);return()=>clearInterval(J)},[_])}function l2(_,$=160){let J=String(_||"").replace(/\r\n/g,`
`);if(!J)return 0;return J.split(`
`).reduce((Z,j)=>Z+Math.max(1,Math.ceil(j.length/$)),0)}function t4(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var G6=F3,r4=E3,V6=C3,d4=y3,s4=A3,a4=D3,g1=typeof N1==="function"?N1:t4("getAgentContext",null),N6=typeof d0==="function"?d0:t4("getAgentModels",{current:null,models:[]});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});l_.register(k1);l_.register(P1);l_.register(M1);w1();var q6=typeof localStorage<"u"&&localStorage.getItem("experimentalPanes")==="true";if(q6)l_.register(y1);function O6(){let[_,$]=u("disconnected"),[J,Z]=u(null),[j,Y]=u(null),[W,K]=u(!1),[G,V]=u([]),[X,U]=u([]),[C,L]=u(null),{agentStatus:D,setAgentStatus:M,agentDraft:S,setAgentDraft:z,agentPlan:y,setAgentPlan:v,agentThought:H,setAgentThought:f,pendingRequest:a,setPendingRequest:s,currentTurnId:Z_,setCurrentTurnId:Q_,steerQueuedTurnId:$_,setSteerQueuedTurnId:j_,lastAgentEventRef:t,lastSilenceNoticeRef:r,isAgentRunningRef:J_,draftBufferRef:h,thoughtBufferRef:e,pendingRequestRef:O_,stalledPostIdRef:N_,currentTurnIdRef:__,steerQueuedTurnIdRef:Y_,thoughtExpandedRef:B_,draftExpandedRef:G_}=c4(),[k_,V_]=u({}),[y_,U_]=u(null),[L_,v_]=u(null),[A_,n_]=u(!1),[I_,x_]=u(null),[w_,X0]=u(null),{notificationsEnabled:h_,notificationPermission:T_,toggleNotifications:t_,notify:G0}=v4(),[D0,k0]=u(()=>new Set),[o_,E_]=u(()=>j2("workspaceOpen",!0)),r_=w(null),{editorOpen:R_,tabStripTabs:P,tabStripActiveId:n,previewTabs:D_,openEditor:e_,closeEditor:V0,handleTabClose:w0,handleTabActivate:y0,handleTabCloseOthers:N0,handleTabCloseAll:d_,handleTabTogglePin:q0,handleTabTogglePreview:O0,revealInExplorer:B0}=g4({onTabClosed:(N)=>r_.current?.(N)}),c_=w(null),W0=w(null);g(()=>{let N=c_.current;if(!N)return;if(W0.current)W0.current.dispose(),W0.current=null;let q=n;if(!q)return;let A={path:q,mode:"edit"},x=l_.resolve(A)||l_.get("editor");if(!x){N.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let c=x.mount(N,A);W0.current=c,c.onDirtyChange?.((l)=>{C_.setDirty(q,l)}),c.onSaveRequest?.(()=>{}),c.onClose?.(()=>{V0()});let I=C_.getViewState(q);if(I&&typeof c.restoreViewState==="function")requestAnimationFrame(()=>c.restoreViewState(I));if(typeof c.onViewStateChange==="function")c.onViewStateChange((l)=>{C_.saveViewState(q,l)});return requestAnimationFrame(()=>c.focus()),()=>{if(W0.current===c)c.dispose(),W0.current=null}},[n,V0]);let[x0,Q0]=u({name:"You",avatar_url:null,avatar_background:null}),T0=w(!1),K0=w(!1),A0=w({}),_0=w({name:null,avatar_url:null}),s_=w({currentHashtag:null,searchQuery:null}),Z0=w(null),$0=w(null),g0=w(0),p0=w(0),h0=w(0),f0=w(null),f_=w(null),Y0=w(null),z0=w(0),m_=w({title:null,avatarBase:null}),i_=w(null),j0=b(()=>{if(i_.current)clearTimeout(i_.current),i_.current=null;L(null)},[]);n4(30000),g(()=>{return i3()},[]),g(()=>{u_("workspaceOpen",String(o_))},[o_]),g(()=>{return()=>{j0()}},[j0]),g(()=>{A0.current=k_||{}},[k_]),g(()=>{_0.current=x0||{name:"You",avatar_url:null,avatar_background:null}},[x0]);let H0=b((N,q,A=null)=>{if(typeof document>"u")return;let x=(N||"").trim()||"PiClaw";if(m_.current.title!==x){document.title=x;let S_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(S_&&S_.getAttribute("content")!==x)S_.setAttribute("content",x);m_.current.title=x}let c=document.getElementById("dynamic-favicon");if(!c)return;let I=c.getAttribute("data-default")||c.getAttribute("href")||"/favicon.ico",l=q||I,q_=q?`${l}|${A||""}`:l;if(m_.current.avatarBase!==q_){let S_=q?`${l}${l.includes("?")?"&":"?"}v=${A||Date.now()}`:l;c.setAttribute("href",S_),m_.current.avatarBase=q_}},[]),M0=b((N)=>{if(!N)return;V((q)=>q.includes(N)?q:[...q,N])},[]),u0=b((N)=>{V((q)=>q.filter((A)=>A!==N))},[]);r_.current=u0;let s0=b(()=>{V([])},[]),J0=b((N,q=null,A="info",x=3000)=>{j0(),L({title:N,detail:q||null,kind:A||"info"}),i_.current=setTimeout(()=>{L((c)=>c?.title===N?null:c)},x)},[j0]),F=b((N)=>{if(typeof N!=="string")return;let q=N.trim();if(!q){J0("No file selected","Use a valid file path from a file pill.","warning");return}if(!R_){J0("Editor pane is not open","Open the editor pane to open files from pills.","warning");return}if(/^[a-z][a-z0-9+.-]*:/i.test(q)){J0("Cannot open external path from file pill","Use an in-workspace file path.","warning");return}let x={path:q,mode:"edit"};if(!l_.resolve(x)){J0("No editor available",`No editor can open: ${q}`,"warning");return}e_(q)},[R_,e_,J0]),R=b(()=>{let N=n;if(N)M0(N)},[n,M0]),d=b((N)=>{if(!N)return;U((q)=>q.includes(N)?q:[...q,N])},[]),X_=b(async(N)=>{let q=(x)=>{x.scrollIntoView({behavior:"smooth",block:"center"}),x.classList.add("post-highlight"),setTimeout(()=>x.classList.remove("post-highlight"),2000)},A=document.getElementById("post-"+N);if(A){q(A);return}try{let c=(await L3(N))?.thread?.[0];if(!c)return;g_((I)=>{if(!I)return[c];if(I.some((l)=>l.id===c.id))return I;return[...I,c]}),requestAnimationFrame(()=>{setTimeout(()=>{let I=document.getElementById("post-"+N);if(I)q(I)},50)})}catch(x){console.error("[scrollToMessage] Failed to fetch message",N,x)}},[]),F_=b((N)=>{U((q)=>q.filter((A)=>A!==N))},[]),M_=b(()=>{U([])},[]),H_=b((N={})=>{let q=Date.now();if(t.current=q,N.running)J_.current=!0;if(N.clearSilence)r.current=0},[]),b_=b(()=>{if(Y0.current)clearTimeout(Y0.current),Y0.current=null;z0.current=0},[]);g(()=>()=>{b_()},[b_]);let L0=b(()=>{b_(),M((N)=>{if(!N)return N;if(!(N.last_activity||N.lastActivity))return N;let{last_activity:q,lastActivity:A,...x}=N;return x})},[b_]),v0=b((N)=>{if(!N)return;b_();let q=Date.now();z0.current=q,M({type:N.type||"active",last_activity:!0}),Y0.current=setTimeout(()=>{if(z0.current!==q)return;M((A)=>{if(!A||!(A.last_activity||A.lastActivity))return A;return null})},i4)},[b_]),P_=b(()=>{J_.current=!1,t.current=null,r.current=0,h.current="",e.current="",O_.current=null,f_.current=null,__.current=null,Y_.current=null,b_(),Q_(null),j_(null),B_.current=!1,G_.current=!1},[b_,Q_,j_]),z_=b((N)=>{if(!N)return;if(__.current===N)return;__.current=N,Q_(N),Y_.current=null,j_(null),h.current="",e.current="",z({text:"",totalLines:0}),v(""),f({text:"",totalLines:0}),s(null),O_.current=null,f_.current=null,B_.current=!1,G_.current=!1},[Q_,j_]),R0=b((N)=>{if(typeof document<"u"){let S_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&S_)return}let q=f_.current;if(!q||!q.post)return;if(N&&q.turnId&&q.turnId!==N)return;let A=q.post;if(A.id&&f0.current===A.id)return;let x=String(A?.data?.content||"").trim();if(!x)return;f0.current=A.id||f0.current,f_.current=null;let c=x.replace(/\s+/g," ").slice(0,200),I=A0.current||{},q_=(A?.data?.agent_id?I[A.data.agent_id]:null)?.name||"Pi";G0(q_,c)},[G0]),G2=b(async(N,q)=>{if(N!=="thought"&&N!=="draft")return;let A=__.current;if(N==="thought"){if(B_.current=q,A)try{await s4(A,"thought",q)}catch(x){console.warn("Failed to update thought visibility:",x)}if(!q)return;try{let x=A?await d4(A,"thought"):null;if(x?.text)e.current=x.text;f((c)=>({...c||{text:"",totalLines:0},fullText:e.current||c?.fullText||"",totalLines:Number.isFinite(x?.total_lines)?x.total_lines:c?.totalLines||0}))}catch(x){console.warn("Failed to fetch full thought:",x)}return}if(G_.current=q,A)try{await s4(A,"draft",q)}catch(x){console.warn("Failed to update draft visibility:",x)}if(!q)return;try{let x=A?await d4(A,"draft"):null;if(x?.text)h.current=x.text;z((c)=>({...c||{text:"",totalLines:0},fullText:h.current||c?.fullText||"",totalLines:Number.isFinite(x?.total_lines)?x.total_lines:c?.totalLines||0}))}catch(x){console.warn("Failed to fetch full draft:",x)}},[]),c0=w(null),a0=b(()=>{if(Z0.current)Z0.current.scrollTop=0},[]);c0.current=a0;let o2=b((N)=>{let q=Z0.current;if(!q||typeof N!=="function"){N?.();return}let{currentHashtag:A,searchQuery:x}=s_.current||{},c=!(x&&!A),I=c?q.scrollHeight-q.scrollTop:q.scrollTop;N(),requestAnimationFrame(()=>{let l=Z0.current;if(!l)return;if(c){let q_=Math.max(l.scrollHeight-I,0);l.scrollTop=q_}else{let q_=Math.max(l.scrollHeight-l.clientHeight,0),S_=Math.min(I,q_);l.scrollTop=S_}})},[]),r0=b((N)=>{let q=Z0.current;if(!q||typeof N!=="function"){N?.();return}let A=q.scrollTop;N(),requestAnimationFrame(()=>{let x=Z0.current;if(!x)return;let c=Math.max(x.scrollHeight-x.clientHeight,0);x.scrollTop=Math.min(A,c)})},[]),{posts:i0,setPosts:g_,hasMore:n2,setHasMore:r2,hasMoreRef:l0,loadPosts:U0,refreshTimeline:P0,loadMore:d2,loadMoreRef:V2}=R4({preserveTimelineScroll:o2,preserveTimelineScrollTop:r0}),t0=b(()=>{let N=N_.current;if(!N)return;g_((q)=>q?q.filter((A)=>A.id!==N):q),N_.current=null},[g_]),{handleSplitterMouseDown:s2,handleSplitterTouchStart:a2,handleEditorSplitterMouseDown:t2,handleEditorSplitterTouchStart:e2,handleDockSplitterMouseDown:e0,handleDockSplitterTouchStart:_1}=m4({appShellRef:$0,sidebarWidthRef:g0,editorWidthRef:p0,dockHeightRef:h0}),_2=b(()=>{if(!J_.current)return;J_.current=!1,r.current=0,t.current=null,__.current=null,Q_(null),B_.current=!1,G_.current=!1;let N=(h.current||"").trim();if(h.current="",e.current="",z({text:"",totalLines:0}),v(""),f({text:"",totalLines:0}),s(null),O_.current=null,f_.current=null,!N){M({type:"error",title:"Response stalled — No content received"});return}let A=`${N}${`

⚠️ Response may be incomplete — the model stopped responding`}`,x=Date.now(),c=new Date().toISOString(),I={id:x,timestamp:c,data:{type:"agent_response",content:A,agent_id:"default",is_local_stall:!0}};N_.current=x,g_((l)=>l?U2([...l,I]):[I]),c0.current?.(),M(null)},[Q_]);g(()=>{s_.current={currentHashtag:J,searchQuery:j}},[J,j]),g(()=>{let N=Math.min(1000,Math.max(100,Math.floor(m1/2))),q=setInterval(()=>{if(!J_.current)return;if(O_.current)return;let A=t.current;if(!A)return;let x=Date.now(),c=x-A;if(c>=p4){_2();return}if(c>=m1){if(x-r.current>=h4){let I=Math.floor(c/1000);M({type:"waiting",title:`Waiting for model… No events for ${I}s`}),r.current=x}}},N);return()=>clearInterval(q)},[_2]);let N2=b(async()=>{try{let N=await g1();if(N)X0(N)}catch(N){console.warn("Failed to fetch agent context:",N)}},[]),E0=b(async()=>{try{let N=await a4("web:default");if(!N||N.status!=="active"||!N.data){if(K0.current){let{currentHashtag:x,searchQuery:c}=s_.current||{};if(!x&&!c)P0()}K0.current=!1,P_(),M(null),z({text:"",totalLines:0}),v(""),f({text:"",totalLines:0}),s(null),O_.current=null;return}K0.current=!0;let q=N.data,A=q.turn_id||q.turnId;if(A)z_(A);if(H_({running:!0,clearSilence:!0}),L0(),M(q),N.thought&&N.thought.text)f((x)=>{if(x&&x.text&&x.text.length>=N.thought.text.length)return x;return e.current=N.thought.text,{text:N.thought.text,totalLines:N.thought.totalLines||0}});if(N.draft&&N.draft.text)z((x)=>{if(x&&x.text&&x.text.length>=N.draft.text.length)return x;return h.current=N.draft.text,{text:N.draft.text,totalLines:N.draft.totalLines||0}})}catch(N){console.warn("Failed to fetch agent status:",N)}},[P_,L0,H_,P0,z_]),$1=b((N)=>{if($(N),N!=="connected"){M(null),z({text:"",totalLines:0}),v(""),f({text:"",totalLines:0}),s(null),O_.current=null,P_();return}if(!T0.current){T0.current=!0,E0();return}let{currentHashtag:q,searchQuery:A}=s_.current;if(!q&&!A)P0();E0()},[P_,P0,E0]),J1=b(async(N)=>{Z(N),g_(null),await U0(N)},[U0]),Z1=b(async()=>{Z(null),Y(null),g_(null),await U0()},[U0]),Y1=b(async(N)=>{if(!N||!N.trim())return;Y(N.trim()),Z(null),g_(null);try{let q=await G6(N.trim());g_(q.results),r2(!1)}catch(q){console.error("Failed to search:",q),g_([])}},[]),j1=b(()=>{K(!0),Y(null),Z(null),g_([])},[]),X1=b(()=>{K(!1),Y(null),U0()},[U0]),Q=b(()=>{},[]),O=b(async(N)=>{if(!N)return;let q=N.id,A=i0?.filter((c)=>c?.data?.thread_id===q&&c?.id!==q).length||0;if(A>0){if(!window.confirm(`Delete this message and its ${A} replies?`))return}let x=(c)=>{if(!c.length)return;k0((l)=>{let q_=new Set(l);return c.forEach((S_)=>q_.add(S_)),q_}),setTimeout(()=>{if(r0(()=>{g_((l)=>l?l.filter((q_)=>!c.includes(q_.id)):l)}),k0((l)=>{let q_=new Set(l);return c.forEach((S_)=>q_.delete(S_)),q_}),l0.current)V2.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let c=await r4(q,A>0);if(c?.ids?.length)x(c.ids)}catch(c){let I=c?.message||"";if(A===0&&I.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let q_=await r4(q,!0);if(q_?.ids?.length)x(q_.ids);return}console.error("Failed to delete post:",c),alert(`Failed to delete message: ${I}`)}},[i0,r0]),E=b(async()=>{try{let N=await V6();V_(l4(N));let q=N?.user||{};Q0((x)=>{let c=typeof q.name==="string"&&q.name.trim()?q.name.trim():"You",I=typeof q.avatar_url==="string"?q.avatar_url.trim():null,l=typeof q.avatar_background==="string"&&q.avatar_background.trim()?q.avatar_background.trim():null;if(x.name===c&&x.avatar_url===I&&x.avatar_background===l)return x;return{name:c,avatar_url:I,avatar_background:l}});let A=(N?.agents||[]).find((x)=>x.id==="default");if(A?.model)U_(A.model);H0(A?.name,A?.avatar_url)}catch(N){console.warn("Failed to load agents:",N)}try{let N=await g1();if(N)X0(N)}catch{}},[H0]);g(()=>{E();let N=X2("sidebarWidth",null),q=Number.isFinite(N)?Math.min(Math.max(N,160),600):280;if(g0.current=q,$0.current)$0.current.style.setProperty("--sidebar-width",`${q}px`)},[E]);let k=b((N)=>{if(!N||typeof N!=="object")return;let q=N.agent_id;if(!q)return;let{agent_name:A,agent_avatar:x}=N;if(!A&&x===void 0)return;let c=A0.current?.[q]||{id:q},I=c.name||null,l=c.avatar_url??c.avatarUrl??c.avatar??null,q_=!1,S_=!1;if(A&&A!==c.name)I=A,S_=!0;if(x!==void 0){let $2=typeof x==="string"?x.trim():null,p1=typeof l==="string"?l.trim():null,J2=$2||null;if(J2!==(p1||null))l=J2,q_=!0}if(!S_&&!q_)return;if(V_(($2)=>{let J2={...$2[q]||{id:q}};if(S_)J2.name=I;if(q_)J2.avatar_url=l;return{...$2,[q]:J2}}),q==="default")H0(I,l,q_?Date.now():null)},[H0]),T=b((N)=>{if(!N||typeof N!=="object")return;let q=N.user_name??N.userName,A=N.user_avatar??N.userAvatar,x=N.user_avatar_background??N.userAvatarBackground;if(q===void 0&&A===void 0&&x===void 0)return;Q0((c)=>{let I=typeof q==="string"&&q.trim()?q.trim():c.name||"You",l=A===void 0?c.avatar_url:typeof A==="string"&&A.trim()?A.trim():null,q_=x===void 0?c.avatar_background:typeof x==="string"&&x.trim()?x.trim():null;if(c.name===I&&c.avatar_url===l&&c.avatar_background===q_)return c;return{name:I,avatar_url:l,avatar_background:q_}})},[]),p=b((N)=>{if(!N||typeof N!=="object")return;let q=N.model??N.current;if(q!==void 0)U_(q);if(N.thinking_level!==void 0)v_(N.thinking_level??null);if(N.supports_thinking!==void 0)n_(Boolean(N.supports_thinking));if(N.provider_usage!==void 0)x_(N.provider_usage??null)},[]),i=b(()=>{N6().then((N)=>{if(N)p(N)}).catch(()=>{})},[p]);g(()=>{i();let N=setInterval(()=>{i()},60000);return()=>clearInterval(N)},[i]);let o=b((N,q)=>{let A=q?.turn_id;if(k(q),T(q),N==="ui_theme"){l3(q);return}if(N?.startsWith("agent_"))L0();if(N==="connected"){M(null),z({text:"",totalLines:0}),v(""),f({text:"",totalLines:0}),s(null),O_.current=null,P_(),a4("web:default").then((I)=>{if(!I||I.status!=="active"||!I.data)return;let l=I.data,q_=l.turn_id||l.turnId;if(q_)z_(q_);if(H_({clearSilence:!0}),v0(l),I.thought&&I.thought.text)e.current=I.thought.text,f({text:I.thought.text,totalLines:I.thought.totalLines||0});if(I.draft&&I.draft.text)h.current=I.draft.text,z({text:I.draft.text,totalLines:I.draft.totalLines||0})}).catch((I)=>{console.warn("Failed to fetch agent status:",I)}),i();return}if(N==="agent_status"){if(q.type==="done"||q.type==="error"){if(A&&__.current&&A!==__.current)return;if(q.type==="done"){R0(A||__.current);let{currentHashtag:I,searchQuery:l}=s_.current||{};if(!I&&!l)P0();if(q.context_usage)X0(q.context_usage)}if(K0.current=!1,P_(),z({text:"",totalLines:0}),v(""),f({text:"",totalLines:0}),s(null),q.type==="error")M({type:"error",title:q.title||"Agent error"}),setTimeout(()=>M(null),8000);else M(null)}else{if(A)z_(A);if(H_({running:!0,clearSilence:!0}),q.type==="thinking")h.current="",e.current="",z({text:"",totalLines:0}),v(""),f({text:"",totalLines:0});M(q)}return}if(N==="agent_steer_queued"){if(A&&__.current&&A!==__.current)return;let I=A||__.current;if(!I)return;Y_.current=I,j_(I);return}if(N==="agent_draft_delta"){if(A&&__.current&&A!==__.current)return;if(A&&!__.current)z_(A);if(H_({running:!0,clearSilence:!0}),q?.reset)h.current="";if(q?.delta)h.current+=q.delta;if(G_.current){let I=h.current;z((l)=>({text:l?.text||"",totalLines:l2(I),fullText:I}))}else{let I=h.current,l=l2(I);z({text:I,totalLines:l})}return}if(N==="agent_draft"){if(A&&__.current&&A!==__.current)return;if(A&&!__.current)z_(A);H_({running:!0,clearSilence:!0});let I=q.text||"",l=q.mode||(q.kind==="plan"?"replace":"append"),q_=Number.isFinite(q.total_lines)?q.total_lines:I?I.replace(/\r\n/g,`
`).split(`
`).length:0;if(q.kind==="plan")if(l==="replace")v(I);else v((S_)=>(S_||"")+I);else if(!G_.current)h.current=I,z({text:I,totalLines:q_});return}if(N==="agent_thought_delta"){if(A&&__.current&&A!==__.current)return;if(A&&!__.current)z_(A);if(H_({running:!0,clearSilence:!0}),q?.reset)e.current="";if(typeof q?.delta==="string")e.current+=q.delta;if(B_.current){let I=e.current;f((l)=>({text:l?.text||"",totalLines:l2(I),fullText:I}))}return}if(N==="agent_thought"){if(A&&__.current&&A!==__.current)return;if(A&&!__.current)z_(A);H_({running:!0,clearSilence:!0});let I=q.text||"",l=Number.isFinite(q.total_lines)?q.total_lines:I?I.replace(/\r\n/g,`
`).split(`
`).length:0;if(!B_.current)e.current=I,f({text:I,totalLines:l});return}if(N==="agent_request"){if(console.log("Agent request:",q),A&&__.current&&A!==__.current)return;if(A)z_(A);H_({running:!0,clearSilence:!0}),s(q),O_.current=q;return}if(N==="agent_request_timeout"){if(console.log("Agent request timeout:",q),A&&__.current&&A!==__.current)return;s(null),O_.current=null,P_(),M({type:"error",title:"Permission request timed out"});return}if(N==="model_changed"){if(q?.model!==void 0)U_(q.model);if(q?.thinking_level!==void 0)v_(q.thinking_level??null);if(q?.supports_thinking!==void 0)n_(Boolean(q.supports_thinking));g1().then((I)=>{if(I)X0(I)}).catch(()=>{});return}if(N==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:q}));return}let{currentHashtag:x,searchQuery:c}=s_.current;if(N==="agent_response")t0(),f_.current={post:q,turnId:__.current};if(!x&&!c&&(N==="new_post"||N==="agent_response"))g_((I)=>{if(!I)return[q];if(I.some((l)=>l.id===q.id))return I;return[...I,q]}),c0.current?.();if(N==="interaction_updated")g_((I)=>I?I.map((l)=>l.id===q.id?q:l):I);if(N==="interaction_deleted"){let I=q?.ids||[];if(I.length){r0(()=>{g_((S_)=>S_?S_.filter(($2)=>!I.includes($2.id)):S_)});let{currentHashtag:l,searchQuery:q_}=s_.current;if(l0.current&&!l&&!q_)V2.current?.({preserveScroll:!0,preserveMode:"top"})}}},[P_,L0,H_,R0,r0,P0,t0,z_,v0,k,T,i]);g(()=>{if(typeof window>"u")return;let N=window.__PICLAW_TEST_API||{};return N.emit=o,N.reset=()=>{t0(),P_(),M(null),z({text:"",totalLines:0}),v(""),f({text:"",totalLines:0}),s(null)},N.finalize=()=>_2(),window.__PICLAW_TEST_API=N,()=>{if(window.__PICLAW_TEST_API===N)window.__PICLAW_TEST_API=void 0}},[P_,_2,o,t0]),u4({handleSseEvent:o,handleConnectionStatusChange:$1,loadPosts:U0}),g(()=>{if(!i0||i0.length===0)return;let N=location.hash;if(!N||!N.startsWith("#msg-"))return;let q=N.slice(5);X_(q),history.replaceState(null,"",location.pathname+location.search)},[i0,X_]);let m=D!==null;g(()=>{if(_!=="connected")return;let q=setInterval(()=>{if(m)E0(),N2();else{let{currentHashtag:A,searchQuery:x}=s_.current||{};if(!A&&!x)P0();E0(),N2()}},m?15000:60000);return()=>clearInterval(q)},[_,m,E0,N2,P0]);let W_=b(()=>{E_((N)=>!N)},[]);g(()=>{if(!R_)return;if(typeof window>"u")return;let N=$0.current;if(!N)return;if(!p0.current){let q=X2("editorWidth",null),A=g0.current||280;p0.current=Number.isFinite(q)?q:A}if(N.style.setProperty("--editor-width",`${p0.current}px`),!h0.current){let q=X2("dockHeight",null);h0.current=Number.isFinite(q)?q:200}N.style.setProperty("--dock-height",`${h0.current}px`)},[R_]);let p_=l_.getDockPanes().length>0,[C0,b0]=u(!1),F2=b(()=>b0((N)=>!N),[]);g(()=>{if(!p_)return;let N=(q)=>{if(q.ctrlKey&&q.key==="`")q.preventDefault(),F2()};return document.addEventListener("keydown",N),()=>document.removeEventListener("keydown",N)},[F2,p_]);let e4=Boolean($_&&$_===(D?.turn_id||Z_));return B`
        <div class=${`app-shell${o_?"":" workspace-collapsed"}${R_?" editor-open":""}`} ref=${$0}>
            <${I4}
                onFileSelect=${M0}
                visible=${o_}
                active=${o_||R_}
                onOpenEditor=${e_}
            />
            <button
                class=${`workspace-toggle-tab${o_?" open":" closed"}`}
                onClick=${W_}
                title=${o_?"Hide workspace":"Show workspace"}
                aria-label=${o_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${s2} onTouchStart=${a2}></div>
            ${R_&&B`
                <div class="editor-pane-container">
                    <${x4}
                        tabs=${P}
                        activeId=${n}
                        onActivate=${y0}
                        onClose=${w0}
                        onCloseOthers=${N0}
                        onCloseAll=${d_}
                        onTogglePin=${q0}
                        onTogglePreview=${O0}
                        previewTabs=${D_}
                        onToggleDock=${p_?F2:void 0}
                        dockVisible=${p_&&C0}
                    />
                    <div class="editor-pane-host" ref=${c_}></div>
                    ${n&&D_.has(n)&&B`
                        <${f4}
                            getContent=${()=>W0.current?.getContent?.()}
                            path=${n}
                            onClose=${()=>O0(n)}
                        />
                    `}
                    ${p_&&C0&&B`<div class="dock-splitter" onMouseDown=${e0} onTouchStart=${_1}></div>`}
                    ${p_&&B`<div class=${`dock-panel${C0?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${F2} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
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
                <div class="editor-splitter" onMouseDown=${t2} onTouchStart=${e2}></div>
            `}
            <div class="container">
                ${j&&o4()&&B`<div class="search-results-spacer"></div>`}
                ${(J||j)&&B`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${Z1}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${J?`#${J}`:`Search: ${j}`}</span>
                    </div>
                `}
                <${V4}
                    posts=${i0}
                    hasMore=${n2}
                    onLoadMore=${d2}
                    timelineRef=${Z0}
                    onHashtagClick=${J1}
                    onMessageRef=${d}
                    onScrollToMessage=${X_}
                    onFileRef=${F}
                    onPostClick=${void 0}
                    onDeletePost=${O}
                    emptyMessage=${J?`No posts with #${J}`:j?`No results for "${j}"`:void 0}
                    agents=${k_}
                    user=${x0}
                    reverse=${!(j&&!J)}
                    removingPostIds=${D0}
                    searchQuery=${j}
                />
                <${j4}
                    status=${D}
                    draft=${S}
                    plan=${y}
                    thought=${H}
                    pendingRequest=${a}
                    intent=${C}
                    turnId=${Z_}
                    steerQueued=${e4}
                    onPanelToggle=${G2}
                />
                <${v3}
                    onPost=${()=>{U0(),a0()}}
                    onFocus=${a0}
                    searchMode=${W}
                    onSearch=${Y1}
                    onEnterSearch=${j1}
                    onExitSearch=${X1}
                    fileRefs=${G}
                    onRemoveFileRef=${u0}
                    onClearFileRefs=${s0}
                    messageRefs=${X}
                    onRemoveMessageRef=${F_}
                    onClearMessageRefs=${M_}
                    activeEditorPath=${n}
                    onAttachEditorFile=${R}
                    onOpenFilePill=${F}
                    activeModel=${y_}
                    modelUsage=${I_}
                    thinkingLevel=${L_}
                    supportsThinking=${A_}
                    contextUsage=${w_}
                    notificationsEnabled=${h_}
                    notificationPermission=${T_}
                    onToggleNotifications=${t_}
                    onModelChange=${U_}
                    onModelStateChange=${p}
                />
                <${W4} status=${_} />
                <${X4}
                    request=${a}
                    onRespond=${()=>{s(null),O_.current=null}}
                />
            </div>
        </div>
    `}O3(B`<${O6} />`,document.getElementById("app"));

//# debugId=1BD1AE7BACF530C264756E2164756E21
//# sourceMappingURL=app.bundle.js.map

var y8=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,Z)=>(typeof require<"u"?require:$)[Z]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var m2,G_,H3,y2,L3,X3,A8,u2={},F3=[],w8=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function e0(_,$){for(var Z in $)_[Z]=$[Z];return _}function E3(_){var $=_.parentNode;$&&$.removeChild(_)}function D3(_,$,Z){var J,X,Y,j={};for(Y in $)Y=="key"?J=$[Y]:Y=="ref"?X=$[Y]:j[Y]=$[Y];if(arguments.length>2&&(j.children=arguments.length>3?m2.call(arguments,2):Z),typeof _=="function"&&_.defaultProps!=null)for(Y in _.defaultProps)j[Y]===void 0&&(j[Y]=_.defaultProps[Y]);return v2(_,j,J,X,null)}function v2(_,$,Z,J,X){var Y={type:_,props:$,key:Z,ref:J,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:X==null?++H3:X};return G_.vnode!=null&&G_.vnode(Y),Y}function h2(_){return _.children}function R2(_,$){this.props=_,this.context=$}function z2(_,$){if($==null)return _.__?z2(_.__,_.__.__k.indexOf(_)+1):null;for(var Z;$<_.__k.length;$++)if((Z=_.__k[$])!=null&&Z.__e!=null)return Z.__e;return typeof _.type=="function"?z2(_):null}function k3(_){var $,Z;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,$=0;$<_.__k.length;$++)if((Z=_.__k[$])!=null&&Z.__e!=null){_.__e=_.__c.base=Z.__e;break}return k3(_)}}function W3(_){(!_.__d&&(_.__d=!0)&&y2.push(_)&&!c2.__r++||X3!==G_.debounceRendering)&&((X3=G_.debounceRendering)||L3)(c2)}function c2(){for(var _;c2.__r=y2.length;)_=y2.sort(function($,Z){return $.__v.__b-Z.__v.__b}),y2=[],_.some(function($){var Z,J,X,Y,j,V;$.__d&&(j=(Y=(Z=$).__v).__e,(V=Z.__P)&&(J=[],(X=e0({},Y)).__v=Y.__v+1,U1(V,Y,X,Z.__n,V.ownerSVGElement!==void 0,Y.__h!=null?[j]:null,J,j==null?z2(Y):j,Y.__h),w3(J,Y),Y.__e!=j&&k3(Y)))})}function C3(_,$,Z,J,X,Y,j,V,N,O){var W,H,E,D,C,w,T,U=J&&J.__k||F3,P=U.length;for(Z.__k=[],W=0;W<$.length;W++)if((D=Z.__k[W]=(D=$[W])==null||typeof D=="boolean"?null:typeof D=="string"||typeof D=="number"||typeof D=="bigint"?v2(null,D,null,null,D):Array.isArray(D)?v2(h2,{children:D},null,null,null):D.__b>0?v2(D.type,D.props,D.key,null,D.__v):D)!=null){if(D.__=Z,D.__b=Z.__b+1,(E=U[W])===null||E&&D.key==E.key&&D.type===E.type)U[W]=void 0;else for(H=0;H<P;H++){if((E=U[H])&&D.key==E.key&&D.type===E.type){U[H]=void 0;break}E=null}U1(_,D,E=E||u2,X,Y,j,V,N,O),C=D.__e,(H=D.ref)&&E.ref!=H&&(T||(T=[]),E.ref&&T.push(E.ref,null,D),T.push(H,D.__c||C,D)),C!=null?(w==null&&(w=C),typeof D.type=="function"&&D.__k!=null&&D.__k===E.__k?D.__d=N=y3(D,N,_):N=A3(_,D,E,U,C,N),O||Z.type!=="option"?typeof Z.type=="function"&&(Z.__d=N):_.value=""):N&&E.__e==N&&N.parentNode!=_&&(N=z2(E))}for(Z.__e=w,W=P;W--;)U[W]!=null&&(typeof Z.type=="function"&&U[W].__e!=null&&U[W].__e==Z.__d&&(Z.__d=z2(J,W+1)),b3(U[W],U[W]));if(T)for(W=0;W<T.length;W++)P3(T[W],T[++W],T[++W])}function y3(_,$,Z){var J,X;for(J=0;J<_.__k.length;J++)(X=_.__k[J])&&(X.__=_,$=typeof X.type=="function"?y3(X,$,Z):A3(Z,X,X,_.__k,X.__e,$));return $}function A3(_,$,Z,J,X,Y){var j,V,N;if($.__d!==void 0)j=$.__d,$.__d=void 0;else if(Z==null||X!=Y||X.parentNode==null)_:if(Y==null||Y.parentNode!==_)_.appendChild(X),j=null;else{for(V=Y,N=0;(V=V.nextSibling)&&N<J.length;N+=2)if(V==X)break _;_.insertBefore(X,Y),j=Y}return j!==void 0?j:X.nextSibling}function j3(_,$,Z){$[0]==="-"?_.setProperty($,Z):_[$]=Z==null?"":typeof Z!="number"||w8.test($)?Z:Z+"px"}function f2(_,$,Z,J,X){var Y;_:if($==="style")if(typeof Z=="string")_.style.cssText=Z;else{if(typeof J=="string"&&(_.style.cssText=J=""),J)for($ in J)Z&&$ in Z||j3(_.style,$,"");if(Z)for($ in Z)J&&Z[$]===J[$]||j3(_.style,$,Z[$])}else if($[0]==="o"&&$[1]==="n")Y=$!==($=$.replace(/Capture$/,"")),$=$.toLowerCase()in _?$.toLowerCase().slice(2):$.slice(2),_.l||(_.l={}),_.l[$+Y]=Z,Z?J||_.addEventListener($,Y?G3:K3,Y):_.removeEventListener($,Y?G3:K3,Y);else if($!=="dangerouslySetInnerHTML"){if(X)$=$.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if($!=="href"&&$!=="list"&&$!=="form"&&$!=="tabIndex"&&$!=="download"&&$ in _)try{_[$]=Z==null?"":Z;break _}catch(j){}typeof Z=="function"||(Z!=null&&(Z!==!1||$[0]==="a"&&$[1]==="r")?_.setAttribute($,Z):_.removeAttribute($))}}function K3(_){this.l[_.type+!1](G_.event?G_.event(_):_)}function G3(_){this.l[_.type+!0](G_.event?G_.event(_):_)}function U1(_,$,Z,J,X,Y,j,V,N){var O,W,H,E,D,C,w,T,U,P,u,y=$.type;if($.constructor!==void 0)return null;Z.__h!=null&&(N=Z.__h,V=$.__e=Z.__e,$.__h=null,Y=[V]),(O=G_.__b)&&O($);try{_:if(typeof y=="function"){if(T=$.props,U=(O=y.contextType)&&J[O.__c],P=O?U?U.props.value:O.__:J,Z.__c?w=(W=$.__c=Z.__c).__=W.__E:(("prototype"in y)&&y.prototype.render?$.__c=W=new y(T,P):($.__c=W=new R2(T,P),W.constructor=y,W.render=b8),U&&U.sub(W),W.props=T,W.state||(W.state={}),W.context=P,W.__n=J,H=W.__d=!0,W.__h=[]),W.__s==null&&(W.__s=W.state),y.getDerivedStateFromProps!=null&&(W.__s==W.state&&(W.__s=e0({},W.__s)),e0(W.__s,y.getDerivedStateFromProps(T,W.__s))),E=W.props,D=W.state,H)y.getDerivedStateFromProps==null&&W.componentWillMount!=null&&W.componentWillMount(),W.componentDidMount!=null&&W.__h.push(W.componentDidMount);else{if(y.getDerivedStateFromProps==null&&T!==E&&W.componentWillReceiveProps!=null&&W.componentWillReceiveProps(T,P),!W.__e&&W.shouldComponentUpdate!=null&&W.shouldComponentUpdate(T,W.__s,P)===!1||$.__v===Z.__v){W.props=T,W.state=W.__s,$.__v!==Z.__v&&(W.__d=!1),W.__v=$,$.__e=Z.__e,$.__k=Z.__k,$.__k.forEach(function(f){f&&(f.__=$)}),W.__h.length&&j.push(W);break _}W.componentWillUpdate!=null&&W.componentWillUpdate(T,W.__s,P),W.componentDidUpdate!=null&&W.__h.push(function(){W.componentDidUpdate(E,D,C)})}W.context=P,W.props=T,W.state=W.__s,(O=G_.__r)&&O($),W.__d=!1,W.__v=$,W.__P=_,O=W.render(W.props,W.state,W.context),W.state=W.__s,W.getChildContext!=null&&(J=e0(e0({},J),W.getChildContext())),H||W.getSnapshotBeforeUpdate==null||(C=W.getSnapshotBeforeUpdate(E,D)),u=O!=null&&O.type===h2&&O.key==null?O.props.children:O,C3(_,Array.isArray(u)?u:[u],$,Z,J,X,Y,j,V,N),W.base=$.__e,$.__h=null,W.__h.length&&j.push(W),w&&(W.__E=W.__=null),W.__e=!1}else Y==null&&$.__v===Z.__v?($.__k=Z.__k,$.__e=Z.__e):$.__e=P8(Z.__e,$,Z,J,X,Y,j,N);(O=G_.diffed)&&O($)}catch(f){$.__v=null,(N||Y!=null)&&($.__e=V,$.__h=!!N,Y[Y.indexOf(V)]=null),G_.__e(f,$,Z)}}function w3(_,$){G_.__c&&G_.__c($,_),_.some(function(Z){try{_=Z.__h,Z.__h=[],_.some(function(J){J.call(Z)})}catch(J){G_.__e(J,Z.__v)}})}function P8(_,$,Z,J,X,Y,j,V){var N,O,W,H=Z.props,E=$.props,D=$.type,C=0;if(D==="svg"&&(X=!0),Y!=null){for(;C<Y.length;C++)if((N=Y[C])&&(N===_||(D?N.localName==D:N.nodeType==3))){_=N,Y[C]=null;break}}if(_==null){if(D===null)return document.createTextNode(E);_=X?document.createElementNS("http://www.w3.org/2000/svg",D):document.createElement(D,E.is&&E),Y=null,V=!1}if(D===null)H===E||V&&_.data===E||(_.data=E);else{if(Y=Y&&m2.call(_.childNodes),O=(H=Z.props||u2).dangerouslySetInnerHTML,W=E.dangerouslySetInnerHTML,!V){if(Y!=null)for(H={},C=0;C<_.attributes.length;C++)H[_.attributes[C].name]=_.attributes[C].value;(W||O)&&(W&&(O&&W.__html==O.__html||W.__html===_.innerHTML)||(_.innerHTML=W&&W.__html||""))}if(function(w,T,U,P,u){var y;for(y in U)y==="children"||y==="key"||y in T||f2(w,y,null,U[y],P);for(y in T)u&&typeof T[y]!="function"||y==="children"||y==="key"||y==="value"||y==="checked"||U[y]===T[y]||f2(w,y,T[y],U[y],P)}(_,E,H,X,V),W)$.__k=[];else if(C=$.props.children,C3(_,Array.isArray(C)?C:[C],$,Z,J,X&&D!=="foreignObject",Y,j,Y?Y[0]:Z.__k&&z2(Z,0),V),Y!=null)for(C=Y.length;C--;)Y[C]!=null&&E3(Y[C]);V||(("value"in E)&&(C=E.value)!==void 0&&(C!==_.value||D==="progress"&&!C)&&f2(_,"value",C,H.value,!1),("checked"in E)&&(C=E.checked)!==void 0&&C!==_.checked&&f2(_,"checked",C,H.checked,!1))}return _}function P3(_,$,Z){try{typeof _=="function"?_($):_.current=$}catch(J){G_.__e(J,Z)}}function b3(_,$,Z){var J,X;if(G_.unmount&&G_.unmount(_),(J=_.ref)&&(J.current&&J.current!==_.__e||P3(J,null,$)),(J=_.__c)!=null){if(J.componentWillUnmount)try{J.componentWillUnmount()}catch(Y){G_.__e(Y,$)}J.base=J.__P=null}if(J=_.__k)for(X=0;X<J.length;X++)J[X]&&b3(J[X],$,typeof _.type!="function");Z||_.__e==null||E3(_.__e),_.__e=_.__d=void 0}function b8(_,$,Z){return this.constructor(_,Z)}function M3(_,$,Z){var J,X,Y;G_.__&&G_.__(_,$),X=(J=typeof Z=="function")?null:Z&&Z.__k||$.__k,Y=[],U1($,_=(!J&&Z||$).__k=D3(h2,null,[_]),X||u2,u2,$.ownerSVGElement!==void 0,!J&&Z?[Z]:X?null:$.firstChild?m2.call($.childNodes):null,Y,!J&&Z?Z:X?X.__e:$.firstChild,J),w3(Y,_)}m2=F3.slice,G_={__e:function(_,$){for(var Z,J,X;$=$.__;)if((Z=$.__c)&&!Z.__)try{if((J=Z.constructor)&&J.getDerivedStateFromError!=null&&(Z.setState(J.getDerivedStateFromError(_)),X=Z.__d),Z.componentDidCatch!=null&&(Z.componentDidCatch(_),X=Z.__d),X)return Z.__E=Z}catch(Y){_=Y}throw _}},H3=0,R2.prototype.setState=function(_,$){var Z;Z=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=e0({},this.state),typeof _=="function"&&(_=_(e0({},Z),this.props)),_&&e0(Z,_),_!=null&&this.__v&&($&&this.__h.push($),W3(this))},R2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),W3(this))},R2.prototype.render=h2,y2=[],L3=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,c2.__r=0,A8=0;var p2,L0,V3,A2=0,z1=[],N3=G_.__b,O3=G_.__r,B3=G_.diffed,q3=G_.__c,z3=G_.unmount;function H1(_,$){G_.__h&&G_.__h(L0,_,A2||$),A2=0;var Z=L0.__H||(L0.__H={__:[],__h:[]});return _>=Z.__.length&&Z.__.push({}),Z.__[_]}function R(_){return A2=1,M8(x3,_)}function M8(_,$,Z){var J=H1(p2++,2);return J.t=_,J.__c||(J.__=[Z?Z($):x3(void 0,$),function(X){var Y=J.t(J.__[0],X);J.__[0]!==Y&&(J.__=[Y,J.__[1]],J.__c.setState({}))}],J.__c=L0),J.__}function m(_,$){var Z=H1(p2++,3);!G_.__s&&S3(Z.__H,$)&&(Z.__=_,Z.__H=$,L0.__H.__h.push(Z))}function L(_){return A2=5,F0(function(){return{current:_}},[])}function F0(_,$){var Z=H1(p2++,7);return S3(Z.__H,$)&&(Z.__=_(),Z.__H=$,Z.__h=_),Z.__}function M(_,$){return A2=8,F0(function(){return _},$)}function S8(){z1.forEach(function(_){if(_.__P)try{_.__H.__h.forEach(g2),_.__H.__h.forEach(Q1),_.__H.__h=[]}catch($){_.__H.__h=[],G_.__e($,_.__v)}}),z1=[]}G_.__b=function(_){L0=null,N3&&N3(_)},G_.__r=function(_){O3&&O3(_),p2=0;var $=(L0=_.__c).__H;$&&($.__h.forEach(g2),$.__h.forEach(Q1),$.__h=[])},G_.diffed=function(_){B3&&B3(_);var $=_.__c;$&&$.__H&&$.__H.__h.length&&(z1.push($)!==1&&V3===G_.requestAnimationFrame||((V3=G_.requestAnimationFrame)||function(Z){var J,X=function(){clearTimeout(Y),Q3&&cancelAnimationFrame(J),setTimeout(Z)},Y=setTimeout(X,100);Q3&&(J=requestAnimationFrame(X))})(S8)),L0=void 0},G_.__c=function(_,$){$.some(function(Z){try{Z.__h.forEach(g2),Z.__h=Z.__h.filter(function(J){return!J.__||Q1(J)})}catch(J){$.some(function(X){X.__h&&(X.__h=[])}),$=[],G_.__e(J,Z.__v)}}),q3&&q3(_,$)},G_.unmount=function(_){z3&&z3(_);var $=_.__c;if($&&$.__H)try{$.__H.__.forEach(g2)}catch(Z){G_.__e(Z,$.__v)}};var Q3=typeof requestAnimationFrame=="function";function g2(_){var $=L0;typeof _.__c=="function"&&_.__c(),L0=$}function Q1(_){var $=L0;_.__c=_.__(),L0=$}function S3(_,$){return!_||_.length!==$.length||$.some(function(Z,J){return Z!==_[J]})}function x3(_,$){return typeof $=="function"?$(_):$}var I3=function(_,$,Z,J){var X;$[0]=0;for(var Y=1;Y<$.length;Y++){var j=$[Y++],V=$[Y]?($[0]|=j?1:2,Z[$[Y++]]):$[++Y];j===3?J[0]=V:j===4?J[1]=Object.assign(J[1]||{},V):j===5?(J[1]=J[1]||{})[$[++Y]]=V:j===6?J[1][$[++Y]]+=V+"":j?(X=_.apply(V,I3(_,V,Z,["",null])),J.push(X),V[0]?$[0]|=2:($[Y-2]=0,$[Y]=X)):J.push(V)}return J},U3=new Map,Q=function(_){var $=U3.get(this);return $||($=new Map,U3.set(this,$)),($=I3(this,$.get(_)||($.set(_,$=function(Z){for(var J,X,Y=1,j="",V="",N=[0],O=function(E){Y===1&&(E||(j=j.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?N.push(0,E,j):Y===3&&(E||j)?(N.push(3,E,j),Y=2):Y===2&&j==="..."&&E?N.push(4,E,0):Y===2&&j&&!E?N.push(5,0,!0,j):Y>=5&&((j||!E&&Y===5)&&(N.push(Y,0,j,X),Y=6),E&&(N.push(Y,E,0,X),Y=6)),j=""},W=0;W<Z.length;W++){W&&(Y===1&&O(),O(W));for(var H=0;H<Z[W].length;H++)J=Z[W][H],Y===1?J==="<"?(O(),N=[N],Y=3):j+=J:Y===4?j==="--"&&J===">"?(Y=1,j=""):j=J+j[0]:V?J===V?V="":j+=J:J==='"'||J==="'"?V=J:J===">"?(O(),Y=1):Y&&(J==="="?(Y=5,X=j,j=""):J==="/"&&(Y<5||Z[W][H+1]===">")?(O(),Y===3&&(N=N[0]),Y=N,(N=N[0]).push(2,0,Y),Y=0):J===" "||J==="\t"||J===`
`||J==="\r"?(O(),Y=2):j+=J),Y===3&&j==="!--"&&(Y=4,N=N[0])}return O(),N}(_)),$),arguments,[])).length>1?$:$[0]}.bind(D3);async function o_(_,$={}){let Z=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Unknown error"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function i2(_=10,$=null){let Z=`/timeline?limit=${_}`;if($)Z+=`&before=${$}`;return o_(Z)}async function T3(_,$=50,Z=0){return o_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${Z}`)}async function f3(_,$=50,Z=0){return o_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${Z}`)}async function v3(_){return o_(`/thread/${_}`)}async function R3(_,$=!1){let Z=`/post/${_}?cascade=${$?"true":"false"}`;return o_(Z,{method:"DELETE"})}async function L1(_,$,Z=null,J=[],X=null){return o_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:Z,media_ids:J,mode:X})})}async function g3(){return o_("/agents")}async function u3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/status${$}`)}async function F1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/context${$}`)}async function E1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/queue-state${$}`)}async function D1(_,$=null){let Z=await fetch("/agent/queue-remove",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Failed to remove queued item"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function k1(_,$=null){let Z=await fetch("/agent/queue-steer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Failed to steer queued item"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function W2(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/models${$}`)}async function c3(_){let $=new FormData;$.append("file",_);let Z=await fetch("/media/upload",{method:"POST",body:$});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Upload failed"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function C1(_,$){let Z=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Failed to respond"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function m3(_,$){let Z=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function h3(_,$="thought"){let Z=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return o_(Z)}async function p3(_,$,Z){return o_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(Z)})})}function Q2(_){return`/media/${_}`}function i3(_){return`/media/${_}/thumbnail`}async function l2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function n2(_="",$=2,Z=!1){let J=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${Z?"1":"0"}`;return o_(J)}async function l3(_,$=20000,Z=null){let J=Z?`&mode=${encodeURIComponent(Z)}`:"",X=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${J}`;return o_(X)}async function n3(_){return o_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function y1(_,$="",Z={}){let J=new FormData;J.append("file",_);let X=new URLSearchParams;if($)X.set("path",$);if(Z.overwrite)X.set("overwrite","1");let Y=X.toString(),j=Y?`/workspace/upload?${Y}`:"/workspace/upload",V=await fetch(""+j,{method:"POST",body:J});if(!V.ok){let N=await V.json().catch(()=>({error:"Upload failed"})),O=Error(N.error||`HTTP ${V.status}`);throw O.status=V.status,O.code=N.code,O}return V.json()}async function o3(_,$,Z=""){let J=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:Z})});if(!J.ok){let X=await J.json().catch(()=>({error:"Create failed"})),Y=Error(X.error||`HTTP ${J.status}`);throw Y.status=J.status,Y.code=X.code,Y}return J.json()}async function d3(_,$){let Z=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Rename failed"})),X=Error(J.error||`HTTP ${Z.status}`);throw X.status=Z.status,X.code=J.code,X}return Z.json()}async function r3(_,$){let Z=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Move failed"})),X=Error(J.error||`HTTP ${Z.status}`);throw X.status=Z.status,X.code=J.code,X}return Z.json()}async function s3(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return o_($,{method:"DELETE"})}async function o2(_,$=!1){return o_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function A1(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function a3(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class w1{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_queued",(_)=>{this.onEvent("agent_followup_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_consumed",(_)=>{this.onEvent("agent_followup_consumed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_removed",(_)=>{this.onEvent("agent_followup_removed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,Z=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,Z+$),this.reconnectAttempts=0;let J=Math.max(this.cooldownUntil-Z,0),X=Math.max(this.reconnectDelay,J);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},X),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function f0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function f_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function U2(_,$=!1){let Z=f0(_);if(Z===null)return $;return Z==="true"}function H2(_,$=null){let Z=f0(_);if(Z===null)return $;let J=parseInt(Z,10);return Number.isFinite(J)?J:$}function _2({prefix:_="file",label:$,title:Z,onRemove:J,onClick:X,removeTitle:Y="Remove",icon:j="file"}){let V=`${_}-file-pill`,N=`${_}-file-name`,O=`${_}-file-remove`,W=j==="message"?Q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:Q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return Q`
    <span class=${V} title=${Z||$} onClick=${X}>
      ${W}
      <span class=${N}>${$}</span>
      ${J&&Q`
        <button
          class=${O}
          onClick=${(H)=>{H.preventDefault(),H.stopPropagation(),J()}}
          title=${Y}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var I8=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steer",description:"Steer the current response"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function T8({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),Z=_.tokens,J=_.contextWindow,X=Z!=null?`Context: ${t3(Z)} / ${t3(J)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,Y=7,j=2*Math.PI*7,V=$/100*j,N=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return Q`
        <span class="compose-context-pie icon-btn" title=${X}>
            <svg width="16" height="16" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke="var(--context-track, rgba(128,128,128,0.2))"
                    stroke-width="2.5" />
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke=${N}
                    stroke-width="2.5"
                    stroke-dasharray=${`${V} ${j}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `}function t3(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function e3({onPost:_,onFocus:$,searchMode:Z,onSearch:J,onEnterSearch:X,onExitSearch:Y,fileRefs:j=[],onRemoveFileRef:V,onClearFileRefs:N,messageRefs:O=[],onRemoveMessageRef:W,onClearMessageRefs:H,activeModel:E=null,modelUsage:D=null,thinkingLevel:C=null,supportsThinking:w=!1,contextUsage:T=null,notificationsEnabled:U=!1,notificationPermission:P="default",onToggleNotifications:u,onModelChange:y,onModelStateChange:f,activeEditorPath:p=null,onAttachEditorFile:l,onOpenFilePill:X_,followupQueueItems:B_=[],onInjectQueuedFollowup:$_,onRemoveQueuedFollowup:N_,onMessageResponse:P_,isAgentActive:r=!1}){let[e,d]=R(""),[i,Z_]=R(""),[j_,J_]=R([]),[v_,W_]=R(!1),[q_,z_]=R([]),[L_,A_]=R(0),[F_,U_]=R(!1),[C_,u_]=R(!1),[w_,b_]=R(!1),[y_,h_]=R([]),[i_,M_]=R(!1),K_=L(null),q0=L(null),t_=L(null),P0=L(null),G0=L(0),E0=200,Q_=(z)=>{let I=new Set,n=[];for(let O_ of z||[]){if(typeof O_!=="string")continue;let D_=O_.trim();if(!D_||I.has(D_))continue;I.add(D_),n.push(D_)}return n},V0=()=>{let z=f0("piclaw_compose_history");if(!z)return[];try{let I=JSON.parse(z);if(!Array.isArray(I))return[];return Q_(I)}catch{return[]}},D0=(z)=>{f_("piclaw_compose_history",JSON.stringify(z))},S=L(V0()),__=L(-1),E_=L(""),N0=e.trim()||j_.length>0||j.length>0||O.length>0,B0=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),d_=typeof window<"u"&&typeof Notification<"u",v0=typeof window<"u"?Boolean(window.isSecureContext):!1,c_=d_&&v0&&P!=="denied",k0=P==="granted"&&U,m_=k0?"Disable notifications":"Enable notifications",e_=E||"",x_=w&&C?` (${C})`:"",o0=x_.trim()?`${C}`:"",$2=typeof D?.hint_short==="string"?D.hint_short.trim():"",R0=[o0||null,$2||null].filter(Boolean).join(" • "),j2=[e_?`Current model: ${e_}${x_}`:null,D?.plan?`Plan: ${D.plan}`:null,$2||null,D?.primary?.reset_description||null,D?.secondary?.reset_description||null].filter(Boolean),C0=C_?"Switching model…":j2.join(" • ")||`Current model: ${e_}${x_} (tap to open model picker)`,y0=(z)=>{if(!z||typeof z!=="object")return;let I=z.model??z.current;if(typeof f==="function")f({model:I??null,thinking_level:z.thinking_level??null,supports_thinking:z.supports_thinking,provider_usage:z.provider_usage??null});if(I&&typeof y==="function")y(I)},Y0=(z)=>{let I=z||K_.current;if(!I)return;I.style.height="auto",I.style.height=`${I.scrollHeight}px`,I.style.overflowY="hidden"},g0=(z)=>{if(!z.startsWith("/")||z.includes(`
`)){U_(!1),z_([]);return}let I=z.toLowerCase().split(" ")[0];if(I.length<1){U_(!1),z_([]);return}let n=I8.filter((O_)=>O_.name.startsWith(I)||O_.name.replace(/-/g,"").startsWith(I.replace(/-/g,"")));if(n.length>0&&!(n.length===1&&n[0].name===I))z_(n),A_(0),U_(!0);else U_(!1),z_([])},A0=(z)=>{let I=e,n=I.indexOf(" "),O_=n>=0?I.slice(n):"",D_=z.name+O_;d(D_),U_(!1),z_([]),requestAnimationFrame(()=>{let l_=K_.current;if(!l_)return;let V_=D_.length;l_.selectionStart=V_,l_.selectionEnd=V_,l_.focus()})},R_=(z)=>{if(Z)Z_(z);else d(z),g0(z);requestAnimationFrame(()=>Y0())},d0=(z)=>{let I=Z?i:e,n=I&&!I.endsWith(`
`)?`
`:"",O_=`${I}${n}${z}`.trimStart();R_(O_)},K2=(z)=>{let I=z?.command?.model_label;if(I)return I;let n=z?.command?.message;if(typeof n==="string"){let O_=n.match(/•\s+([^\n]+?)\s+\(current\)/);if(O_?.[1])return O_[1].trim()}return null},Z2=async(z)=>{if(Z||C_)return;u_(!0);try{let I=await L1("default",z,null,[]),n=K2(I);y0({model:n??E??null,thinking_level:I?.command?.thinking_level,supports_thinking:I?.command?.supports_thinking});try{let O_=await W2();if(O_)y0(O_)}catch{}return _?.(),!0}catch(I){return console.error("Failed to switch model:",I),alert("Failed to switch model: "+I.message),!1}finally{u_(!1)}},r0=async()=>{await Z2("/cycle-model")},r_=async(z)=>{if(!z||C_)return;if(await Z2(`/model ${z}`))b_(!1)},Q0=(z)=>{z.preventDefault(),z.stopPropagation(),b_((I)=>!I)},U0=(z)=>{if(z==="queue"||z==="steer"||z==="auto")return z;return r?"queue":null},I_=async(z,I,n={})=>{let{includeMedia:O_=!0,includeFileRefs:D_=!0,includeMessageRefs:l_=!0,clearAfterSubmit:V_=!0,recordHistory:W0=!0}=n||{},h0=typeof z==="string"?z:z&&typeof z?.target?.value==="string"?z.target.value:e,S0=typeof h0==="string"?h0:"";if(!S0.trim()&&(O_?j_.length===0:!0)&&(D_?j.length===0:!0)&&(l_?O.length===0:!0))return;U_(!1),z_([]);let p0=O_?[...j_]:[],G2=D_?[...j]:[],V2=l_?[...O]:[],s_=S0.trim();if(W0&&s_){let S_=S.current,j0=Q_(S_.filter((a0)=>a0!==s_));if(j0.push(s_),j0.length>200)j0.splice(0,j0.length-200);S.current=j0,D0(j0),__.current=-1,E_.current=""}if(V_)d(""),J_([]),N?.(),H?.();(async()=>{try{let S_=[];for(let O0 of p0){let w0=await c3(O0);S_.push(w0.id)}let j0=G2.length?`Files:
${G2.map((O0)=>`- ${O0}`).join(`
`)}`:"",a0=V2.length?`Referenced messages:
${V2.map((O0)=>`- message:${O0}`).join(`
`)}`:"",n_=S_.length?`Images:
${S_.map((O0,w0)=>{let D2=p0[w0]?.name||`image-${w0+1}`;return`- attachment:${O0} (${D2})`}).join(`
`)}`:"",Z0=[s_,j0,a0,n_].filter(Boolean).join(`

`),x0=await L1("default",Z0,null,S_,U0(I));if(P_?.(x0),x0?.command){y0({model:x0.command.model_label??E??null,thinking_level:x0.command.thinking_level,supports_thinking:x0.command.supports_thinking});try{let O0=await W2();if(O0)y0(O0)}catch{}}_?.()}catch(S_){console.error("Failed to post:",S_)}})()},_0=(z)=>{$_?.(z)},g_=(z)=>{if(z.isComposing)return;if(Z&&z.key==="Escape"){z.preventDefault(),Z_(""),Y?.();return}if(F_&&q_.length>0){let I=K_.current?.value??(Z?i:e);if(!String(I||"").startsWith("/"))U_(!1),z_([]);else{if(z.key==="ArrowDown"){z.preventDefault(),A_((n)=>(n+1)%q_.length);return}if(z.key==="ArrowUp"){z.preventDefault(),A_((n)=>(n-1+q_.length)%q_.length);return}if(z.key==="Tab"){z.preventDefault(),A0(q_[L_]);return}if(z.key==="Enter"&&!z.shiftKey){if(!(K_.current?.value??(Z?i:e)).includes(" ")){z.preventDefault();let D_=q_[L_];U_(!1),z_([]),I_(D_.name);return}}if(z.key==="Escape"){z.preventDefault(),U_(!1),z_([]);return}}}if(!Z&&(z.key==="ArrowUp"||z.key==="ArrowDown")&&!z.metaKey&&!z.ctrlKey&&!z.altKey&&!z.shiftKey){let I=K_.current;if(!I)return;let n=I.value||"",O_=I.selectionStart===0&&I.selectionEnd===0,D_=I.selectionStart===n.length&&I.selectionEnd===n.length;if(z.key==="ArrowUp"&&O_||z.key==="ArrowDown"&&D_){let l_=S.current;if(!l_.length)return;z.preventDefault();let V_=__.current;if(z.key==="ArrowUp"){if(V_===-1)E_.current=n,V_=l_.length-1;else if(V_>0)V_-=1;__.current=V_,R_(l_[V_]||"")}else{if(V_===-1)return;if(V_<l_.length-1)V_+=1,__.current=V_,R_(l_[V_]||"");else __.current=-1,R_(E_.current||""),E_.current=""}requestAnimationFrame(()=>{let W0=K_.current;if(!W0)return;let h0=W0.value.length;W0.selectionStart=h0,W0.selectionEnd=h0});return}}if(z.key==="Enter"&&!z.shiftKey&&(z.ctrlKey||z.metaKey)){z.preventDefault();let I=K_.current?.value??(Z?i:e);if(Z){if(I.trim())J?.(I.trim())}else I_(I,"steer");return}if(z.key==="Enter"&&!z.shiftKey){z.preventDefault();let I=K_.current?.value??(Z?i:e);if(Z){if(I.trim())J?.(I.trim())}else I_(I)}},$0=(z)=>{let I=Array.from(z||[]).filter((n)=>n&&n.type&&n.type.startsWith("image/"));if(!I.length)return;J_((n)=>[...n,...I])},H0=(z)=>{$0(z.target.files),z.target.value=""},b0=(z)=>{if(Z)return;z.preventDefault(),z.stopPropagation(),G0.current+=1,W_(!0)},u0=(z)=>{if(Z)return;if(z.preventDefault(),z.stopPropagation(),G0.current=Math.max(0,G0.current-1),G0.current===0)W_(!1)},X0=(z)=>{if(Z)return;if(z.preventDefault(),z.stopPropagation(),z.dataTransfer)z.dataTransfer.dropEffect="copy";W_(!0)},J2=(z)=>{if(Z)return;z.preventDefault(),z.stopPropagation(),G0.current=0,W_(!1),$0(z.dataTransfer?.files||[])},M0=(z)=>{if(Z)return;let I=z.clipboardData?.items;if(!I||!I.length)return;let n=[];for(let O_ of I){if(O_.kind!=="file")continue;let D_=O_.getAsFile?.();if(D_)n.push(D_)}if(n.length>0)z.preventDefault(),$0(n)},c0=(z)=>{J_((I)=>I.filter((n,O_)=>O_!==z))},s0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((z)=>{let{latitude:I,longitude:n,accuracy:O_}=z.coords,D_=`${I.toFixed(5)}, ${n.toFixed(5)}`,l_=Number.isFinite(O_)?` ±${Math.round(O_)}m`:"",V_=`https://maps.google.com/?q=${I},${n}`,W0=`Location: ${D_}${l_} ${V_}`;d0(W0)},(z)=>{let I=z?.message||"Unable to retrieve location.";alert(`Location error: ${I}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};m(()=>{if(!w_)return;M_(!0),W2().then((z)=>{let I=Array.isArray(z?.models)?z.models.filter((n)=>typeof n==="string"&&n.trim().length>0):[];h_(I),y0(z)}).catch((z)=>{console.warn("Failed to load model list:",z),h_([])}).finally(()=>{M_(!1)})},[w_,E]),m(()=>{if(Z)b_(!1)},[Z]),m(()=>{if(!w_)return;let z=(I)=>{let n=t_.current,O_=P0.current,D_=I.target;if(n&&n.contains(D_))return;if(O_&&O_.contains(D_))return;b_(!1)};return document.addEventListener("pointerdown",z),()=>document.removeEventListener("pointerdown",z)},[w_]);let m0=(z)=>{let I=z.target.value;Y0(z.target),R_(I)};return m(()=>{requestAnimationFrame(()=>Y0())},[e,i,Z]),Q`
        <div class="compose-box">
            ${!Z&&B_.length>0&&Q`
                <div class="compose-queue-stack">
                    ${B_.map((z)=>{let I=typeof z?.content==="string"?z.content:"";if(!I.trim())return null;return Q`
                            <div class="compose-queue-stack-item" role="listitem">
                                <span class="compose-queue-stack-content" title=${I}>
                                    ${I}
                                </span>
                                <button
                                    class="compose-queue-stack-steer-btn"
                                    type="button"
                                    title="Inject queued follow-up as steer"
                                    onClick=${()=>_0(z)}
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
                                    onClick=${()=>N_?.(z)}
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
                class=${`compose-input-wrapper${v_?" drag-active":""}`}
                onDragEnter=${b0}
                onDragOver=${X0}
                onDragLeave=${u0}
                onDrop=${J2}
            >
                <div class="compose-input-main">
                    ${(j.length>0||j_.length>0||O.length>0)&&Q`
                        <div class="compose-file-refs">
                            ${O.map((z)=>{return Q`
                                    <${_2}
                                        key=${"msg-"+z}
                                        prefix="compose"
                                        label=${"msg:"+z}
                                        title=${"Message reference: "+z}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>W?.(z)}
                                    />
                                `})}
                            ${j.map((z)=>{let I=z.split("/").pop()||z;return Q`
                                    <${_2}
                                        prefix="compose"
                                        label=${I}
                                        title=${z}
                                        onClick=${()=>X_?.(z)}
                                        removeTitle="Remove file"
                                        onRemove=${()=>V?.(z)}
                                    />
                                `})}
                            ${j_.map((z,I)=>{let n=z?.name||`image-${I+1}`;return Q`
                                    <${_2}
                                        key=${n+I}
                                        prefix="compose"
                                        label=${n}
                                        title=${n}
                                        removeTitle="Remove image"
                                        onRemove=${()=>c0(I)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${K_}
                        placeholder=${Z?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${Z?i:e}
                        onInput=${m0}
                        onKeyDown=${g_}
                        onPaste=${M0}
                        onFocus=${$}
                        onClick=${$}
                        rows="1"
                    />
                    ${F_&&q_.length>0&&Q`
                        <div class="slash-autocomplete" ref=${q0}>
                            ${q_.map((z,I)=>Q`
                                <div
                                    key=${z.name}
                                    class=${`slash-item${I===L_?" active":""}`}
                                    onMouseDown=${(n)=>{n.preventDefault(),A0(z)}}
                                    onMouseEnter=${()=>A_(I)}
                                >
                                    <span class="slash-name">${z.name}</span>
                                    <span class="slash-desc">${z.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${w_&&!Z&&Q`
                        <div class="compose-model-popup" ref=${t_}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${i_&&Q`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!i_&&y_.length===0&&Q`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!i_&&y_.map((z)=>Q`
                                    <button
                                        key=${z}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${E===z?" active":""}`}
                                        onClick=${()=>{r_(z)}}
                                        disabled=${C_}
                                    >
                                        ${z}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{r0()}}
                                    disabled=${C_}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!Z&&E&&Q`
                    <div class="compose-meta-row">
                        ${!Z&&E&&Q`
                            <div class="compose-model-meta">
                                <button
                                    ref=${P0}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${C0}
                                    aria-label="Open model picker"
                                    onClick=${Q0}
                                    disabled=${C_}
                                >
                                    ${C_?"Switching…":e_}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!C_&&R0&&Q`
                                        <span class="compose-model-usage-hint" title=${C0}>
                                            ${R0}
                                        </span>
                                    `}
                                </div>
                            </div>
                        `}
                    </div>
                    `}
                    <div class="compose-actions ${Z?"search-mode":""}">
                    ${!Z&&T&&T.percent!=null&&Q`
                        <${T8} usage=${T} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${Z?Y:X}
                        title=${Z?"Close search":"Search"}
                    >
                        ${Z?Q`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        `:Q`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        `}
                    </button>
                    ${B0&&!Z&&Q`
                        <button
                            class="icon-btn location-btn"
                            onClick=${s0}
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
                    ${c_&&!Z&&Q`
                        <button
                            class=${`icon-btn notification-btn${k0?" active":""}`}
                            onClick=${u}
                            title=${m_}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!Z&&Q`
                        ${p&&l&&Q`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${l}
                                title=${`Attach open file: ${p}`}
                                type="button"
                                disabled=${j.includes(p)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${H0} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{I_()}}
                            disabled=${!N0}
                            title="Send (Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var $4="piclaw_theme",M1="piclaw_tint",s2={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},f8={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},_4={default:{label:"Default",mode:"auto",light:s2,dark:f8},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},v8=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],a2={theme:"default",tint:null},Z4="light",P1=!1;function J4(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function L2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let Z=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(Z)&&!/^[0-9a-fA-F]{6}$/.test(Z))return null;let J=Z.length===3?Z.split("").map((Y)=>Y+Y).join(""):Z,X=parseInt(J,16);return{r:X>>16&255,g:X>>8&255,b:X&255,hex:`#${J.toLowerCase()}`}}function R8(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let Z=document.createElement("div");if(Z.style.color="",Z.style.color=$,!Z.style.color)return null;let J=Z.style.color;try{if(document.body)Z.style.display="none",document.body.appendChild(Z),J=getComputedStyle(Z).color||Z.style.color,document.body.removeChild(Z)}catch{}let X=J.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!X)return null;let Y=parseInt(X[1],10),j=parseInt(X[2],10),V=parseInt(X[3],10);if(![Y,j,V].every((O)=>Number.isFinite(O)))return null;let N=`#${[Y,j,V].map((O)=>O.toString(16).padStart(2,"0")).join("")}`;return{r:Y,g:j,b:V,hex:N}}function Y4(_){return L2(_)||R8(_)}function w2(_,$,Z){let J=Math.round(_.r+($.r-_.r)*Z),X=Math.round(_.g+($.g-_.g)*Z),Y=Math.round(_.b+($.b-_.b)*Z);return`rgb(${J} ${X} ${Y})`}function b1(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function X4(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function S1(_){return _4[_]||_4.default}function g8(_){return _.mode==="auto"?X4():_.mode}function u8(_,$){let Z=S1(_);if($==="dark"&&Z.dark)return Z.dark;if($==="light"&&Z.light)return Z.light;return Z.dark||Z.light||s2}function c8(_,$,Z){let J=Y4($);if(!J)return _;let X=L2(_.bgPrimary),Y=L2(_.bgSecondary),j=L2(_.bgHover),V=L2(_.borderColor);if(!X||!Y||!j||!V)return _;let O=L2(Z==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:w2(X,J,0.08),bgSecondary:w2(Y,J,0.12),bgHover:w2(j,J,0.16),borderColor:w2(V,J,0.08),accent:J.hex,accentHover:O?w2(J,O,0.18):J.hex}}function m8(_,$){if(typeof document>"u")return;let Z=document.documentElement,J=_.accent,X=Y4(J),Y=X?b1(X,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,j=X?b1(X,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",V=X?b1(X,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",N={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":J,"--accent-hover":_.accentHover||J,"--accent-soft":j,"--accent-soft-strong":V,"--danger-color":_.danger||s2.danger,"--success-color":_.success||s2.success,"--search-highlight-color":Y||"rgba(29, 155, 240, 0.2)"};Object.entries(N).forEach(([O,W])=>{if(W)Z.style.setProperty(O,W)})}function h8(){if(typeof document>"u")return;let _=document.documentElement;v8.forEach(($)=>_.style.removeProperty($))}function d2(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function p8(_,$){if(typeof document>"u")return;let Z=d2("theme-color");if(Z&&_)Z.setAttribute("content",_);let J=d2("msapplication-TileColor");if(J&&_)J.setAttribute("content",_);let X=d2("msapplication-navbutton-color");if(X&&_)X.setAttribute("content",_);let Y=d2("apple-mobile-web-app-status-bar-style");if(Y)Y.setAttribute("content",$==="dark"?"black-translucent":"default")}function i8(){if(typeof window>"u")return;let _={...a2,mode:Z4};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function x1(_,$={}){if(typeof window>"u"||typeof document>"u")return;let Z=J4(_?.theme||"default"),J=_?.tint?String(_.tint).trim():null,X=S1(Z),Y=g8(X),j=u8(Z,Y);a2={theme:Z,tint:J},Z4=Y;let V=document.documentElement;V.dataset.theme=Y,V.dataset.colorTheme=Z,V.dataset.tint=J?String(J):"",V.style.colorScheme=Y;let N=j;if(Z==="default"&&J)N=c8(j,J,Y);if(Z==="default"&&!J)h8();else m8(N,Y);if(p8(N.bgPrimary,Y),i8(),$.persist!==!1)if(f_($4,Z),J)f_(M1,J);else f_(M1,"")}function r2(){if(S1(a2.theme).mode!=="auto")return;x1(a2,{persist:!1})}function W4(){if(typeof window>"u")return()=>{};let _=J4(f0($4)||"default"),$=f0(M1),Z=$?$.trim():null;if(x1({theme:_,tint:Z},{persist:!1}),window.matchMedia&&!P1){let J=window.matchMedia("(prefers-color-scheme: dark)");if(J.addEventListener)J.addEventListener("change",r2);else if(J.addListener)J.addListener(r2);return P1=!0,()=>{if(J.removeEventListener)J.removeEventListener("change",r2);else if(J.removeListener)J.removeListener(r2);P1=!1}}return()=>{}}function j4(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let Z=_.theme??_.name??_.colorTheme,J=_.tint??null;x1({theme:Z||"default",tint:J},{persist:!0})}function K4(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return X4()}var t2=/#(\w+)/g,l8=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),n8=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),o8=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),d8={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},r8=new Set(["http:","https:","mailto:",""]);function G4(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function F2(_,$={}){if(!_)return null;let Z=String(_).trim();if(!Z)return null;if(Z.startsWith("#")||Z.startsWith("/"))return Z;if(Z.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(Z))return Z;return null}if(Z.startsWith("blob:"))return Z;try{let J=new URL(Z,typeof window<"u"?window.location.origin:"http://localhost");if(!r8.has(J.protocol))return null;return J.href}catch{return null}}function V4(_,$={}){if(!_)return"";let Z=new DOMParser().parseFromString(_,"text/html"),J=[],X=Z.createTreeWalker(Z.body,NodeFilter.SHOW_ELEMENT),Y;while(Y=X.nextNode())J.push(Y);for(let j of J){let V=j.tagName.toLowerCase();if(!n8.has(V)){let O=j.parentNode;if(!O)continue;while(j.firstChild)O.insertBefore(j.firstChild,j);O.removeChild(j);continue}let N=d8[V]||new Set;for(let O of Array.from(j.attributes)){let W=O.name.toLowerCase(),H=O.value;if(W.startsWith("on")){j.removeAttribute(O.name);continue}if(W.startsWith("data-")||W.startsWith("aria-"))continue;if(N.has(W)||o8.has(W)){if(W==="href"){let E=F2(H);if(!E)j.removeAttribute(O.name);else if(j.setAttribute(O.name,E),V==="a"&&!j.getAttribute("rel"))j.setAttribute("rel","noopener noreferrer")}else if(W==="src"){let E=V==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(H):H,D=F2(E,{allowDataImage:V==="img"});if(!D)j.removeAttribute(O.name);else j.setAttribute(O.name,D)}continue}j.removeAttribute(O.name)}}return Z.body.innerHTML}function N4(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function e2(_,$=2){if(!_)return _;let Z=_;for(let J=0;J<$;J+=1){let X=N4(Z);if(X===Z)break;Z=X}return Z}function s8(_){if(!_)return{text:"",blocks:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=[],X=[],Y=!1,j=[];for(let V of Z){if(!Y&&V.trim().match(/^```mermaid\s*$/i)){Y=!0,j=[];continue}if(Y&&V.trim().match(/^```\s*$/)){let N=J.length;J.push(j.join(`
`)),X.push(`@@MERMAID_BLOCK_${N}@@`),Y=!1,j=[];continue}if(Y)j.push(V);else X.push(V)}if(Y)X.push("```mermaid"),X.push(...j);return{text:X.join(`
`),blocks:J}}function a8(_){if(!_)return _;return e2(_,5)}function t8(_){let $=new TextEncoder().encode(String(_||"")),Z="";for(let J of $)Z+=String.fromCharCode(J);return btoa(Z)}function e8(_){let $=atob(String(_||"")),Z=new Uint8Array($.length);for(let J=0;J<$.length;J+=1)Z[J]=$.charCodeAt(J);return new TextDecoder().decode(Z)}function _6(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(Z,J)=>{let X=Number(J),Y=$[X]??"",j=a8(Y);return`<div class="mermaid-container" data-mermaid="${t8(j)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function O4(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,Z)=>{if(Z.includes(`
`))return`
\`\`\`
${Z}
\`\`\`
`;return`\`${Z}\``})}function B4(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,Z)=>{let J=Z.trim(),X=J.startsWith("/"),Y=X?J.slice(1).trim():J,N=(Y.endsWith("/")?Y.slice(0,-1).trim():Y).split(/\s+/)[0]?.toLowerCase();if(!N||!l8.has(N))return $;if(N==="br")return X?"":"<br>";if(X)return`</${N}>`;return`<${N}>`})}function q4(_){if(!_)return _;let $=(Z)=>Z.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(Z,J)=>`<pre><code>${$(J)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(Z,J)=>`<code>${$(J)}</code>`)}function z4(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),Z=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),J=(Y)=>Y.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),X;while(X=Z.nextNode()){if(!X.nodeValue)continue;let Y=J(X.nodeValue);if(Y!==X.nodeValue)X.nodeValue=Y}return $.body.innerHTML}function $6(_){if(!window.katex)return _;let $=(j)=>N4(j).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),Z=(j)=>{let V=[],N=j.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(O)=>{let W=V.length;return V.push(O),`@@CODE_BLOCK_${W}@@`});return N=N.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(O)=>{let W=V.length;return V.push(O),`@@CODE_INLINE_${W}@@`}),{html:N,blocks:V}},J=(j,V)=>{if(!V.length)return j;return j.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(N,O)=>{let W=Number(O);return V[W]??""})},X=Z(_),Y=X.html;return Y=Y.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(j,V,N)=>{try{let O=katex.renderToString($(N.trim()),{displayMode:!0,throwOnError:!1});return`${V}${O}`}catch(O){return`<span class="math-error" title="${G4(O.message)}">${j}</span>`}}),Y=Y.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(j,V,N)=>{if(/\s$/.test(N))return j;try{let O=katex.renderToString($(N),{displayMode:!1,throwOnError:!1});return`${V}${O}`}catch(O){return`${V}<span class="math-error" title="${G4(O.message)}">$${N}$</span>`}}),J(Y,X.blocks)}function Z6(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),Z=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),J=[],X;while(X=Z.nextNode())J.push(X);for(let Y of J){let j=Y.nodeValue;if(!j)continue;if(t2.lastIndex=0,!t2.test(j))continue;t2.lastIndex=0;let V=Y.parentElement;if(V&&(V.closest("a")||V.closest("code")||V.closest("pre")))continue;let N=j.split(t2);if(N.length<=1)continue;let O=$.createDocumentFragment();N.forEach((W,H)=>{if(H%2===1){let E=$.createElement("a");E.setAttribute("href","#"),E.className="hashtag",E.setAttribute("data-hashtag",W),E.textContent=`#${W}`,O.appendChild(E)}else O.appendChild($.createTextNode(W))}),Y.parentNode?.replaceChild(O,Y)}return $.body.innerHTML}function J6(_){if(!_)return _;let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=[],X=!1;for(let Y of Z){if(!X&&Y.trim().match(/^```(?:math|katex|latex)\s*$/i)){X=!0,J.push("$$");continue}if(X&&Y.trim().match(/^```\s*$/)){X=!1,J.push("$$");continue}J.push(Y)}return J.join(`
`)}function E2(_,$,Z={}){if(!_)return"";let J=J6(_),{text:X,blocks:Y}=s8(J),j=e2(X,2),N=O4(j).replace(/</g,"&lt;").replace(/>/g,"&gt;"),O=B4(N),W=window.marked?marked.parse(O,{headerIds:!1,mangle:!1}):O.replace(/\n/g,"<br>");return W=q4(W),W=z4(W),W=$6(W),W=Z6(W),W=_6(W,Y),W=V4(W,Z),W}function Q4(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),Z=e2($,2),X=O4(Z).replace(/</g,"&lt;").replace(/>/g,"&gt;"),Y=B4(X),j=window.marked?marked.parse(Y):Y.replace(/\n/g,"<br>");return j=q4(j),j=z4(j),j=V4(j),j}async function _1(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:Z}=window.beautifulMermaid,X=K4()==="dark"?Z["tokyo-night"]:Z["github-light"],Y=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let j of Y)try{let V=j.dataset.mermaid,N=e8(V||""),O=e2(N,2),W=await $(O,{...X,transparent:!0});j.innerHTML=W,j.removeAttribute("data-mermaid")}catch(V){console.error("Mermaid render error:",V);let N=document.createElement("pre");N.className="mermaid-error",N.textContent=`Diagram error: ${V.message}`,j.innerHTML="",j.appendChild(N),j.removeAttribute("data-mermaid")}}var U4="PiClaw";function I1(_,$){let Z=_||"PiClaw",J=Z.charAt(0).toUpperCase(),X=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],Y=J.charCodeAt(0)%X.length,j=X[Y],V=Z.trim().toLowerCase(),N=typeof $==="string"?$.trim():"",W=(N?N:null)||(V==="PiClaw".toLowerCase()||V==="pi"?"/static/icon-192.png":null);return{letter:J,color:j,image:W}}function H4(_,$){if(!_)return"PiClaw";let Z=$[_]?.name||_;return Z?Z.charAt(0).toUpperCase()+Z.slice(1):"PiClaw"}function L4(_,$){if(!_)return null;let Z=$[_]||{};return Z.avatar_url||Z.avatarUrl||Z.avatar||null}function F4(_){if(!_)return null;if(typeof document<"u"){let Y=document.documentElement,j=Y?.dataset?.colorTheme||"",V=Y?.dataset?.tint||"",N=getComputedStyle(Y).getPropertyValue("--accent-color")?.trim();if(N&&(V||j&&j!=="default"))return N}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],Z=String(_),J=0;for(let Y=0;Y<Z.length;Y+=1)J=(J*31+Z.charCodeAt(Y))%2147483647;let X=Math.abs(J)%$.length;return $[X]}function E4({status:_,draft:$,plan:Z,thought:J,pendingRequest:X,intent:Y,turnId:j,steerQueued:V,onPanelToggle:N}){let H=(W_)=>{if(!W_)return{text:"",totalLines:0,fullText:""};if(typeof W_==="string"){let A_=W_,F_=A_?A_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:A_,totalLines:F_,fullText:A_}}let q_=W_.text||"",z_=W_.fullText||W_.full_text||q_,L_=Number.isFinite(W_.totalLines)?W_.totalLines:z_?z_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:q_,totalLines:L_,fullText:z_}},E=160,D=(W_)=>{if(!W_)return 1;return Math.max(1,Math.ceil(W_.length/160))},C=(W_,q_,z_)=>{let L_=(W_||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!L_)return{text:"",omitted:0,totalLines:Number.isFinite(z_)?z_:0,visibleLines:0};let A_=L_.split(`
`),F_=A_.length>q_?A_.slice(0,q_).join(`
`):L_,U_=Number.isFinite(z_)?z_:A_.reduce((w_,b_)=>w_+D(b_),0),C_=F_?F_.split(`
`).reduce((w_,b_)=>w_+D(b_),0):0,u_=Math.max(U_-C_,0);return{text:F_,omitted:u_,totalLines:U_,visibleLines:C_}},w=H(Z),T=H(J),U=H($),P=Boolean(w.text)||w.totalLines>0,u=Boolean(T.text)||T.totalLines>0,y=Boolean(U.fullText?.trim()||U.text?.trim());if(!_&&!y&&!P&&!u&&!X&&!Y)return null;let[f,p]=R(new Set),l=(W_)=>p((q_)=>{let z_=new Set(q_),L_=!z_.has(W_);if(L_)z_.add(W_);else z_.delete(W_);if(typeof N==="function")N(W_,L_);return z_});m(()=>{p(new Set)},[j]);let X_=_?.turn_id||j,B_=F4(X_),$_=V?"turn-dot turn-dot-queued":"turn-dot",N_=(W_)=>W_,P_=Boolean(_?.last_activity||_?.lastActivity),r=Y?.kind||"info",e=r==="warning"?"#f59e0b":r==="error"?"var(--danger-color)":r==="success"?"var(--success-color)":B_,d="",i=_?.title,Z_=_?.status;if(_?.type==="plan")d=i?`Planning: ${i}`:"Planning...";else if(_?.type==="tool_call")d=i?`Running: ${i}`:"Running tool...";else if(_?.type==="tool_status")d=i?`${i}: ${Z_||"Working..."}`:Z_||"Working...";else if(_?.type==="error")d=i||"Agent error";else d=i||Z_||"Working...";if(P_)d="Last activity just now";let j_=({panelTitle:W_,text:q_,fullText:z_,totalLines:L_,maxLines:A_,titleClass:F_,panelKey:U_})=>{let C_=f.has(U_),u_=z_||q_||"",w_=typeof A_==="number",b_=C_&&w_,y_=w_?C(u_,A_,L_):{text:u_||"",omitted:0,totalLines:Number.isFinite(L_)?L_:0};if(!u_&&!(Number.isFinite(y_.totalLines)&&y_.totalLines>0))return null;let h_=`agent-thinking-body${w_?" agent-thinking-body-collapsible":""}`,i_=w_?`--agent-thinking-collapsed-lines: ${A_};`:"";return Q`
            <div
                class="agent-thinking"
                data-expanded=${C_?"true":"false"}
                data-collapsible=${w_?"true":"false"}
                style=${B_?`--turn-color: ${B_};`:""}
            >
                <div class="agent-thinking-title ${F_||""}">
                    ${B_&&Q`<span class=${$_} aria-hidden="true"></span>`}
                    ${W_}
                    ${b_&&Q`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${W_} panel`}
                            onClick=${()=>l(U_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${h_}
                    style=${i_}
                    dangerouslySetInnerHTML=${{__html:Q4(u_)}}
                />
                ${!C_&&y_.omitted>0&&Q`
                    <button class="agent-thinking-truncation" onClick=${()=>l(U_)}>
                        ▸ ${y_.omitted} more lines
                    </button>
                `}
                ${C_&&y_.omitted>0&&Q`
                    <button class="agent-thinking-truncation" onClick=${()=>l(U_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},J_=X?.tool_call?.title,v_=J_?`Awaiting approval: ${J_}`:"Awaiting approval";return Q`
        <div class="agent-status-panel">
            ${Y&&Q`
                <div
                    class="agent-thinking agent-thinking-intent"
                    aria-live="polite"
                    style=${e?`--turn-color: ${e};`:""}
                    title=${Y?.detail||""}
                >
                    <div class="agent-thinking-title intent">
                        ${e&&Q`<span class=${$_} aria-hidden="true"></span>`}
                        ${Y.title}
                    </div>
                    ${Y.detail&&Q`<div class="agent-thinking-body">${Y.detail}</div>`}
                </div>
            `}
            ${X&&Q`
                <div class="agent-status agent-status-request" aria-live="polite" style=${B_?`--turn-color: ${B_};`:""}>
                    <span class=${$_} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${v_}</span>
                </div>
            `}
            ${P&&j_({panelTitle:N_("Planning"),text:w.text,fullText:w.fullText,totalLines:w.totalLines,panelKey:"plan"})}
            ${u&&j_({panelTitle:N_("Thoughts"),text:T.text,fullText:T.fullText,totalLines:T.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${y&&j_({panelTitle:N_("Draft"),text:U.text,fullText:U.fullText,totalLines:U.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&Q`
                <div class=${`agent-status${P_?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${B_?`--turn-color: ${B_};`:""}>
                    ${B_&&Q`<span class=${$_} aria-hidden="true"></span>`}
                    ${_?.type==="error"?Q`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!P_&&Q`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${d}</span>
                </div>
            `}
        </div>
    `}function D4({request:_,onRespond:$}){if(!_)return null;let{request_id:Z,tool_call:J,options:X}=_,Y=J?.title||"Agent Request",j=J?.kind||"other",V=J?.rawInput||{},N=V.command||V.commands&&V.commands[0]||null,O=V.diff||null,W=V.fileName||V.path||null,H=J?.description||V.description||V.explanation||null,D=(Array.isArray(J?.locations)?J.locations:[]).map((P)=>P?.path).filter((P)=>Boolean(P)),C=Array.from(new Set([W,...D].filter(Boolean)));console.log("AgentRequestModal:",{request_id:Z,tool_call:J,options:X});let w=async(P)=>{try{await C1(Z,P),$()}catch(u){console.error("Failed to respond to agent request:",u)}},T=async()=>{try{await m3(Y,`Auto-approved: ${Y}`),await C1(Z,"approved"),$()}catch(P){console.error("Failed to add to whitelist:",P)}},U=X&&X.length>0;return Q`
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
                ${(H||N||O||C.length>0)&&Q`
                    <div class="agent-request-body">
                        ${H&&Q`
                            <div class="agent-request-description">${H}</div>
                        `}
                        ${C.length>0&&Q`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${C.map((P,u)=>Q`<li key=${u}>${P}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${N&&Q`
                            <pre class="agent-request-command">${N}</pre>
                        `}
                        ${O&&Q`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${O}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${U?X.map((P)=>Q`
                            <button 
                                key=${P.optionId||P.id||String(P)}
                                class="agent-request-btn ${P.kind==="allow_once"||P.kind==="allow_always"?"primary":""}"
                                onClick=${()=>w(P.optionId||P.id||P)}
                            >
                                ${P.name||P.label||P.optionId||P.id||String(P)}
                            </button>
                        `):Q`
                        <button class="agent-request-btn primary" onClick=${()=>w("approved")}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${()=>w("denied")}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${T}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function k4({status:_}){if(_==="connected")return null;return Q`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function C4(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let J=new Date-$,X=J/1000,Y=86400000;if(J<Y){if(X<60)return"just now";if(X<3600)return`${Math.floor(X/60)}m`;return`${Math.floor(X/3600)}h`}if(J<5*Y){let N=$.toLocaleDateString(void 0,{weekday:"short"}),O=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${N} ${O}`}let j=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),V=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${j} ${V}`}function P2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function n0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function $1(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}function y4({src:_,onClose:$}){return m(()=>{let Z=(J)=>{if(J.key==="Escape")$()};return document.addEventListener("keydown",Z),()=>document.removeEventListener("keydown",Z)},[$]),Q`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function Y6({mediaId:_}){let[$,Z]=R(null);if(m(()=>{l2(_).then(Z).catch(()=>{})},[_]),!$)return null;let J=$.filename||"file",X=$.metadata?.size,Y=X?n0(X):"";return Q`
        <a href=${Q2(_)} download=${J} class="file-attachment" onClick=${(j)=>j.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${J}</span>
                ${Y&&Q`<span class="file-size">${Y}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function Z1({annotations:_}){if(!_)return null;let{audience:$,priority:Z,lastModified:J}=_,X=J?$1(J):null;return Q`
        <div class="content-annotations">
            ${$&&$.length>0&&Q`
                <span class="content-annotation">Audience: ${$.join(", ")}</span>
            `}
            ${typeof Z==="number"&&Q`
                <span class="content-annotation">Priority: ${Z}</span>
            `}
            ${X&&Q`
                <span class="content-annotation">Updated: ${X}</span>
            `}
        </div>
    `}function X6({block:_}){let $=_.title||_.name||_.uri,Z=_.description,J=_.size?n0(_.size):"",X=_.mime_type||"",Y=j6(X),j=F2(_.uri);return Q`
        <a
            href=${j||"#"}
            class="resource-link"
            target=${j?"_blank":void 0}
            rel=${j?"noopener noreferrer":void 0}
            onClick=${(V)=>V.stopPropagation()}>
            <div class="resource-link-main">
                <div class="resource-link-header">
                    <span class="resource-link-icon-inline">${Y}</span>
                    <div class="resource-link-title">${$}</div>
                </div>
                ${Z&&Q`<div class="resource-link-description">${Z}</div>`}
                <div class="resource-link-meta">
                    ${X&&Q`<span>${X}</span>`}
                    ${J&&Q`<span>${J}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `}function W6({block:_}){let[$,Z]=R(!1),J=_.uri||"Embedded resource",X=_.text||"",Y=Boolean(_.data),j=_.mime_type||"";return Q`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(V)=>{V.preventDefault(),V.stopPropagation(),Z(!$)}}>
                ${$?"▼":"▶"} ${J}
            </button>
            ${$&&Q`
                ${X&&Q`<pre class="resource-embed-content">${X}</pre>`}
                ${Y&&Q`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${j&&Q`<span class="resource-embed-blob-meta">${j}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(V)=>{V.preventDefault(),V.stopPropagation();let N=new Blob([Uint8Array.from(atob(_.data),(H)=>H.charCodeAt(0))],{type:j||"application/octet-stream"}),O=URL.createObjectURL(N),W=document.createElement("a");W.href=O,W.download=J.split("/").pop()||"resource",W.click(),URL.revokeObjectURL(O)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function j6(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function K6({preview:_}){let $=F2(_.url),Z=F2(_.image,{allowDataImage:!0}),J=Z?`background-image: url('${Z}')`:"",X=_.site_name;if(!X&&$)try{X=new URL($).hostname}catch{X=$}return Q`
        <a
            href=${$||"#"}
            class="link-preview ${Z?"has-image":""}"
            target=${$?"_blank":void 0}
            rel=${$?"noopener noreferrer":void 0}
            onClick=${(Y)=>Y.stopPropagation()}
            style=${J}>
            <div class="link-preview-overlay">
                <div class="link-preview-site">${X||""}</div>
                <div class="link-preview-title">${_.title}</div>
                ${_.description&&Q`
                    <div class="link-preview-description">${_.description}</div>
                `}
            </div>
        </a>
    `}function G6(_,$){return typeof _==="string"?_:""}var V6=1800,N6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
    </svg>`,O6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>`,B6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;async function q6(_){let $=typeof _==="string"?_:"";if(!$)return!1;if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText($),!0}catch{}try{let Z=document.createElement("textarea");Z.value=$,Z.setAttribute("readonly",""),Z.style.position="fixed",Z.style.opacity="0",Z.style.pointerEvents="none",document.body.appendChild(Z),Z.select(),Z.setSelectionRange(0,Z.value.length);let J=document.execCommand("copy");return document.body.removeChild(Z),J}catch{return!1}}function z6(_){if(!_)return()=>{};let $=Array.from(_.querySelectorAll("pre")).filter((Y)=>Y.querySelector("code"));if($.length===0)return()=>{};let Z=new Map,J=[],X=(Y,j)=>{let V=j||"idle";if(Y.dataset.copyState=V,V==="success")Y.innerHTML=O6,Y.setAttribute("aria-label","Copied"),Y.setAttribute("title","Copied"),Y.classList.add("is-success"),Y.classList.remove("is-error");else if(V==="error")Y.innerHTML=B6,Y.setAttribute("aria-label","Copy failed"),Y.setAttribute("title","Copy failed"),Y.classList.add("is-error"),Y.classList.remove("is-success");else Y.innerHTML=N6,Y.setAttribute("aria-label","Copy code"),Y.setAttribute("title","Copy code"),Y.classList.remove("is-success","is-error")};return $.forEach((Y)=>{let j=document.createElement("div");j.className="post-code-block",Y.parentNode?.insertBefore(j,Y),j.appendChild(Y);let V=document.createElement("button");V.type="button",V.className="post-code-copy-btn",X(V,"idle"),j.appendChild(V);let N=async(O)=>{O.preventDefault(),O.stopPropagation();let H=Y.querySelector("code")?.textContent||"",E=await q6(H);X(V,E?"success":"error");let D=Z.get(V);if(D)clearTimeout(D);let C=setTimeout(()=>{X(V,"idle"),Z.delete(V)},V6);Z.set(V,C)};V.addEventListener("click",N),J.push(()=>{V.removeEventListener("click",N);let O=Z.get(V);if(O)clearTimeout(O);if(j.parentNode)j.parentNode.insertBefore(Y,j),j.remove()})}),()=>{J.forEach((Y)=>Y())}}function Q6(_){if(!_)return{content:_,fileRefs:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=-1;for(let O=0;O<Z.length;O+=1)if(Z[O].trim()==="Files:"&&Z[O+1]&&/^\s*-\s+/.test(Z[O+1])){J=O;break}if(J===-1)return{content:_,fileRefs:[]};let X=[],Y=J+1;for(;Y<Z.length;Y+=1){let O=Z[Y];if(/^\s*-\s+/.test(O))X.push(O.replace(/^\s*-\s+/,"").trim());else if(!O.trim())break;else break}if(X.length===0)return{content:_,fileRefs:[]};let j=Z.slice(0,J),V=Z.slice(Y),N=[...j,...V].join(`
`);return N=N.replace(/\n{3,}/g,`

`).trim(),{content:N,fileRefs:X}}function U6(_){if(!_)return{content:_,messageRefs:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=-1;for(let O=0;O<Z.length;O+=1)if(Z[O].trim()==="Referenced messages:"&&Z[O+1]&&/^\s*-\s+/.test(Z[O+1])){J=O;break}if(J===-1)return{content:_,messageRefs:[]};let X=[],Y=J+1;for(;Y<Z.length;Y+=1){let O=Z[Y];if(/^\s*-\s+/.test(O)){let H=O.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(H)X.push(H[1])}else if(!O.trim())break;else break}if(X.length===0)return{content:_,messageRefs:[]};let j=Z.slice(0,J),V=Z.slice(Y),N=[...j,...V].join(`
`);return N=N.replace(/\n{3,}/g,`

`).trim(),{content:N,messageRefs:X}}function H6(_){if(!_)return{content:_,attachments:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=-1;for(let O=0;O<Z.length;O+=1)if(Z[O].trim()==="Images:"&&Z[O+1]&&/^\s*-\s+/.test(Z[O+1])){J=O;break}if(J===-1)return{content:_,attachments:[]};let X=[],Y=J+1;for(;Y<Z.length;Y+=1){let O=Z[Y];if(/^\s*-\s+/.test(O)){let W=O.replace(/^\s*-\s+/,"").trim(),H=W.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||W.match(/^attachment:([^\s]+)\s+(.+)$/i);if(H){let E=H[1],D=(H[2]||"").trim()||E;X.push({id:E,label:D,raw:W})}else X.push({id:null,label:W,raw:W})}else if(!O.trim())break;else break}if(X.length===0)return{content:_,attachments:[]};let j=Z.slice(0,J),V=Z.slice(Y),N=[...j,...V].join(`
`);return N=N.replace(/\n{3,}/g,`

`).trim(),{content:N,attachments:X}}function L6(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function F6(_,$){if(!_||!$)return _;let Z=String($).trim().split(/\s+/).filter(Boolean);if(Z.length===0)return _;let J=Z.map(L6).sort((W,H)=>H.length-W.length),X=new RegExp(`(${J.join("|")})`,"gi"),Y=new RegExp(`^(${J.join("|")})$`,"i"),j=new DOMParser().parseFromString(_,"text/html"),V=j.createTreeWalker(j.body,NodeFilter.SHOW_TEXT),N=[],O;while(O=V.nextNode())N.push(O);for(let W of N){let H=W.nodeValue;if(!H||!X.test(H)){X.lastIndex=0;continue}X.lastIndex=0;let E=W.parentElement;if(E&&E.closest("code, pre, script, style"))continue;let D=H.split(X).filter((w)=>w!=="");if(D.length===0)continue;let C=j.createDocumentFragment();for(let w of D)if(Y.test(w)){let T=j.createElement("mark");T.className="search-highlight-term",T.textContent=w,C.appendChild(T)}else C.appendChild(j.createTextNode(w));W.parentNode.replaceChild(C,W)}return j.body.innerHTML}function A4({post:_,onClick:$,onHashtagClick:Z,onMessageRef:J,onScrollToMessage:X,agentName:Y,agentAvatarUrl:j,userName:V,userAvatarUrl:N,userAvatarBackground:O,onDelete:W,isThreadReply:H,isThreadPrev:E,isThreadNext:D,isRemoving:C,highlightQuery:w,onFileRef:T}){let[U,P]=R(null),u=L(null),y=_.data,f=y.type==="agent_response",p=V||"You",l=f?Y||U4:p,X_=f?I1(Y,j):I1(p,N),B_=typeof O==="string"?O.trim().toLowerCase():"",$_=!f&&X_.image&&(B_==="clear"||B_==="transparent"),N_=f&&Boolean(X_.image),P_=`background-color: ${$_||N_?"transparent":X_.color}`,r=y.content_meta,e=Boolean(r?.truncated),d=Boolean(r?.preview),i=e&&!d,Z_=e?{originalLength:Number.isFinite(r?.original_length)?r.original_length:y.content?y.content.length:0,maxLength:Number.isFinite(r?.max_length)?r.max_length:0}:null,j_=G6(y.content,y.link_previews),{content:J_,fileRefs:v_}=Q6(j_),{content:W_,messageRefs:q_}=U6(J_),{content:z_,attachments:L_}=H6(W_);j_=z_;let A_=Boolean(j_)&&!i,F_=typeof w==="string"?w.trim():"",U_=F0(()=>{if(!j_)return"";let S=E2(j_,Z);return F_?F6(S,F_):S},[j_,F_]),C_=(S,__)=>{S.stopPropagation(),P(Q2(__))},u_=(S)=>{S.stopPropagation(),W?.(_)},w_=(S,__)=>{let E_=new Set;if(!S||__.length===0)return{content:S,usedIds:E_};return{content:S.replace(/attachment:([^\s)"']+)/g,(B0,d_,v0,z0)=>{let c_=d_.replace(/^\/+/,""),m_=__.find((x_)=>x_.name&&x_.name.toLowerCase()===c_.toLowerCase()&&!E_.has(x_.id))||__.find((x_)=>!E_.has(x_.id));if(!m_)return B0;if(E_.add(m_.id),z0.slice(Math.max(0,v0-2),v0)==="](")return`/media/${m_.id}`;return m_.name||"attachment"}),usedIds:E_}},b_=[],y_=[],h_=[],i_=[],M_=[],K_=[],q0=y.content_blocks||[],t_=y.media_ids||[],P0=0;if(q0.length>0)q0.forEach((S)=>{if(S?.type==="text"&&S.annotations)K_.push(S.annotations);if(S?.type==="resource_link")i_.push(S);else if(S?.type==="resource")M_.push(S);else if(S?.type==="file"){let __=t_[P0++];if(__)y_.push(__),h_.push({id:__,name:S?.name||S?.filename||S?.title})}else if(S?.type==="image"||!S?.type){let __=t_[P0++];if(__){let E_=typeof S?.mime_type==="string"?S.mime_type:void 0;b_.push({id:__,annotations:S?.annotations,mimeType:E_}),h_.push({id:__,name:S?.name||S?.filename||S?.title})}}});else if(t_.length>0)t_.forEach((S)=>{b_.push({id:S,annotations:null}),h_.push({id:S,name:null})});if(L_.length>0)L_.forEach((S)=>{if(!S?.id)return;let __=h_.find((E_)=>String(E_.id)===String(S.id));if(__&&!__.name)__.name=S.label});let{content:G0,usedIds:E0}=w_(j_,h_);j_=G0;let Q_=b_.filter(({id:S})=>!E0.has(S)),V0=y_.filter((S)=>!E0.has(S)),D0=L_.length>0?L_.map((S,__)=>({id:S.id||`attachment-${__+1}`,label:S.label||`attachment-${__+1}`})):h_.map((S,__)=>({id:S.id,label:S.name||`attachment-${__+1}`}));return m(()=>{if(!u.current)return;return _1(u.current),z6(u.current)},[U_]),Q`
        <div id=${`post-${_.id}`} class="post ${f?"agent-post":""} ${H?"thread-reply":""} ${E?"thread-prev":""} ${D?"thread-next":""} ${C?"removing":""}" onClick=${$}>
            <div class="post-avatar ${f?"agent-avatar":""} ${X_.image?"has-image":""}" style=${P_}>
                ${X_.image?Q`<img src=${X_.image} alt=${l} />`:X_.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${u_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${l}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(S)=>{if(S.preventDefault(),S.stopPropagation(),J)J(_.id)}}>${C4(_.timestamp)}</a>
                </div>
                ${i&&Z_&&Q`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${P2(Z_.originalLength)} chars
                            ${Z_.maxLength?Q` • Display limit: ${P2(Z_.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${d&&Z_&&Q`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${P2(Z_.maxLength)} of ${P2(Z_.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(v_.length>0||q_.length>0||D0.length>0)&&Q`
                    <div class="post-file-refs">
                        ${q_.map((S)=>{let __=(E_)=>{if(E_.preventDefault(),E_.stopPropagation(),X)X(S);else{let N0=document.getElementById("post-"+S);if(N0)N0.scrollIntoView({behavior:"smooth",block:"center"}),N0.classList.add("post-highlight"),setTimeout(()=>N0.classList.remove("post-highlight"),2000)}};return Q`
                                <a href=${`#msg-${S}`} class="post-msg-pill-link" onClick=${__}>
                                    <${_2}
                                        prefix="post"
                                        label=${"msg:"+S}
                                        title=${"Message "+S}
                                        icon="message"
                                        onClick=${__}
                                    />
                                </a>
                            `})}
                        ${v_.map((S)=>{let __=S.split("/").pop()||S;return Q`
                                <${_2}
                                    prefix="post"
                                    label=${__}
                                    title=${S}
                                    onClick=${()=>T?.(S)}
                                />
                            `})}
                        ${D0.map((S)=>Q`
                            <${_2}
                                prefix="post"
                                label=${S.label}
                                title=${S.label}
                            />
                        `)}
                    </div>
                `}
                ${A_&&Q`
                    <div 
                        ref=${u}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:U_}}
                        onClick=${(S)=>{if(S.target.classList.contains("hashtag")){S.preventDefault(),S.stopPropagation();let __=S.target.dataset.hashtag;if(__)Z?.(__)}else if(S.target.tagName==="IMG")S.preventDefault(),S.stopPropagation(),P(S.target.src)}}
                    />
                `}
                ${K_.length>0&&Q`
                    ${K_.map((S,__)=>Q`
                        <${Z1} key=${__} annotations=${S} />
                    `)}
                `}
                ${Q_.length>0&&Q`
                    <div class="media-preview">
                        ${Q_.map(({id:S,mimeType:__})=>{let N0=typeof __==="string"&&__.toLowerCase().startsWith("image/svg")?Q2(S):i3(S);return Q`
                                <img 
                                    key=${S} 
                                    src=${N0} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(B0)=>C_(B0,S)}
                                />
                            `})}
                    </div>
                `}
                ${Q_.length>0&&Q`
                    ${Q_.map(({annotations:S},__)=>Q`
                        ${S&&Q`<${Z1} key=${__} annotations=${S} />`}
                    `)}
                `}
                ${V0.length>0&&Q`
                    <div class="file-attachments">
                        ${V0.map((S)=>Q`
                            <${Y6} key=${S} mediaId=${S} />
                        `)}
                    </div>
                `}
                ${i_.length>0&&Q`
                    <div class="resource-links">
                        ${i_.map((S,__)=>Q`
                            <div key=${__}>
                                <${X6} block=${S} />
                                <${Z1} annotations=${S.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${M_.length>0&&Q`
                    <div class="resource-embeds">
                        ${M_.map((S,__)=>Q`
                            <div key=${__}>
                                <${W6} block=${S} />
                                <${Z1} annotations=${S.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${y.link_previews?.length>0&&Q`
                    <div class="link-previews">
                        ${y.link_previews.map((S,__)=>Q`
                            <${K6} key=${__} preview=${S} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${U&&Q`<${y4} src=${U} onClose=${()=>P(null)} />`}
    `}function w4({posts:_,hasMore:$,onLoadMore:Z,onPostClick:J,onHashtagClick:X,onMessageRef:Y,onScrollToMessage:j,onFileRef:V,emptyMessage:N,timelineRef:O,agents:W,user:H,onDeletePost:E,reverse:D=!0,removingPostIds:C,searchQuery:w}){let[T,U]=R(!1),P=L(null),u=typeof IntersectionObserver<"u",y=M(async()=>{if(!Z||!$||T)return;U(!0);try{await Z({preserveScroll:!0,preserveMode:"top"})}finally{U(!1)}},[$,T,Z]),f=M((r)=>{let{scrollTop:e,scrollHeight:d,clientHeight:i}=r.target,Z_=D?d-i-e:e,j_=Math.max(300,i);if(Z_<j_)y()},[D,y]);m(()=>{if(!u)return;let r=P.current,e=O?.current;if(!r||!e)return;let d=300,i=new IntersectionObserver((Z_)=>{for(let j_ of Z_){if(!j_.isIntersecting)continue;y()}},{root:e,rootMargin:`${d}px 0px ${d}px 0px`,threshold:0});return i.observe(r),()=>i.disconnect()},[u,$,Z,O,y]);let p=L(y);if(p.current=y,m(()=>{if(u)return;if(!O?.current)return;let{scrollTop:r,scrollHeight:e,clientHeight:d}=O.current,i=D?e-d-r:r,Z_=Math.max(300,d);if(i<Z_)p.current?.()},[u,_,$,D,O]),m(()=>{if(!O?.current)return;if(!$||T)return;let{scrollTop:r,scrollHeight:e,clientHeight:d}=O.current,i=D?e-d-r:r,Z_=Math.max(300,d);if(e<=d+1||i<Z_)p.current?.()},[_,$,T,D,O]),!_)return Q`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return Q`
            <div class="timeline" ref=${O}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${N||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let l=_.slice().sort((r,e)=>r.id-e.id),X_=(r)=>{let e=r?.data?.thread_id;if(e===null||e===void 0||e==="")return null;let d=Number(e);return Number.isFinite(d)?d:null},B_=new Map;for(let r=0;r<l.length;r+=1){let e=l[r],d=Number(e?.id),i=X_(e);if(i!==null){let Z_=B_.get(i)||{anchorIndex:-1,replyIndexes:[]};Z_.replyIndexes.push(r),B_.set(i,Z_)}else if(Number.isFinite(d)){let Z_=B_.get(d)||{anchorIndex:-1,replyIndexes:[]};Z_.anchorIndex=r,B_.set(d,Z_)}}let $_=new Map;for(let[r,e]of B_.entries()){let d=new Set;if(e.anchorIndex>=0)d.add(e.anchorIndex);for(let i of e.replyIndexes)d.add(i);$_.set(r,Array.from(d).sort((i,Z_)=>i-Z_))}let N_=l.map((r,e)=>{let d=X_(r);if(d===null)return{hasThreadPrev:!1,hasThreadNext:!1};let i=$_.get(d);if(!i||i.length===0)return{hasThreadPrev:!1,hasThreadNext:!1};let Z_=i.indexOf(e);if(Z_<0)return{hasThreadPrev:!1,hasThreadNext:!1};return{hasThreadPrev:Z_>0,hasThreadNext:Z_<i.length-1}}),P_=Q`<div class="timeline-sentinel" ref=${P}></div>`;return Q`
        <div class="timeline ${D?"reverse":"normal"}" ref=${O} onScroll=${f}>
            <div class="timeline-content">
                ${D?P_:null}
                ${l.map((r,e)=>{let d=Boolean(r.data?.thread_id&&r.data.thread_id!==r.id),i=C?.has?.(r.id),Z_=N_[e]||{};return Q`
                    <${A4}
                        key=${r.id}
                        post=${r}
                        isThreadReply=${d}
                        isThreadPrev=${Z_.hasThreadPrev}
                        isThreadNext=${Z_.hasThreadNext}
                        isRemoving=${i}
                        highlightQuery=${w}
                        agentName=${H4(r.data?.agent_id,W||{})}
                        agentAvatarUrl=${L4(r.data?.agent_id,W||{})}
                        userName=${H?.name||H?.user_name}
                        userAvatarUrl=${H?.avatar_url||H?.avatarUrl||H?.avatar}
                        userAvatarBackground=${H?.avatar_background||H?.avatarBackground}
                        onClick=${()=>J?.(r)}
                        onHashtagClick=${X}
                        onMessageRef=${Y}
                        onScrollToMessage=${j}
                        onFileRef=${V}
                        onDelete=${E}
                    />
                `})}
                ${D?null:P_}
            </div>
        </div>
    `}class P4{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,Z=-1/0;for(let J of this.extensions.values()){if(J.placement!=="tabs")continue;if(!J.canHandle)continue;try{let X=J.canHandle(_);if(X===!1||X===0)continue;let Y=X===!0?0:typeof X==="number"?X:0;if(Y>Z)Z=Y,$=J}catch(X){console.warn(`[PaneRegistry] canHandle() error for "${J.id}":`,X)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var p_=new P4;var J1=null,T1=null;function b4(){if(T1)return Promise.resolve(T1);if(!J1)J1=import("/static/dist/editor.bundle.js").then((_)=>{return T1=_,_}).catch((_)=>{throw J1=null,_});return J1}class M4{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await b4();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){if(this.queuedViewStateCb=_,this.real&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(_)}restoreViewState(_){if(this.queuedViewState=_,this.real&&typeof this.real.restoreViewState==="function")this.real.restoreViewState(_)}getPath(){if(this.real&&typeof this.real.getPath==="function")return this.real.getPath();return this.context.path||""}setPath(_){if(this.real&&typeof this.real.setPath==="function")this.real.setPath(_)}}var f1={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;if(_.mode!=="edit")return!1;return 1},mount(_,$){return new M4(_,$)}};function v1(){b4().catch(()=>{})}class S4{container;disposed=!1;termEl;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0");let Z=document.createElement("div");Z.className="terminal-pane-header";let J=document.createElement("span");J.className="terminal-pane-title",J.textContent="Terminal";let X=document.createElement("span");X.className="terminal-pane-status",X.textContent="Not connected",Z.append(J,X);let Y=document.createElement("div");Y.className="terminal-pane-body",Y.innerHTML='<div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>',this.termEl.append(Z,Y),_.appendChild(this.termEl)}getContent(){return}isDirty(){return!1}focus(){this.termEl?.focus()}resize(){}dispose(){if(this.disposed)return;this.disposed=!0,this.termEl?.remove()}}var R1={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new S4(_,$)}};function x4(_){return String(_||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function E6(_,$){let Z=String(_||"").trim();if(!Z)return Z;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(Z)||Z.startsWith("#")||Z.startsWith("data:")||Z.startsWith("blob:"))return Z;let J=Z.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),X=J?.[1]||Z,Y=J?.[2]||"",j=J?.[3]||"",V=String($||"").split("/").slice(0,-1).join("/"),O=X.startsWith("/")?X:`${V?`${V}/`:""}${X}`,W=[];for(let E of O.split("/")){if(!E||E===".")continue;if(E===".."){if(W.length>0)W.pop();continue}W.push(E)}let H=W.join("/");return`${A1(H)}${Y}${j}`}function b2(_){return _?.preview||null}function D6(_){let $=b2(_);if(!$)return'<div class="workspace-preview-text">No preview available.</div>';if($.kind==="image"){let Z=$.url||($.path?A1($.path):"");return`
            <div class="workspace-preview-image">
                <img src="${x4(Z)}" alt="preview" />
            </div>
        `}if($.kind==="text"){if($.content_type==="text/markdown")return`<div class="workspace-preview-text">${E2($.text||"",null,{rewriteImageSrc:(J)=>E6(J,$.path||_?.path)})}</div>`;return`<pre class="workspace-preview-text"><code>${x4($.text||"")}</code></pre>`}if($.kind==="binary")return'<div class="workspace-preview-text">Binary file — download to view.</div>';return'<div class="workspace-preview-text">No preview available.</div>'}class g1{constructor(_,$){this.container=_,this.context=$,this.disposed=!1,this.host=document.createElement("div"),this.host.className="workspace-preview-render-host",this.host.tabIndex=0,this.container.appendChild(this.host),this.render()}render(){if(this.disposed)return;this.host.innerHTML=D6(this.context)}getContent(){let _=b2(this.context);return typeof _?.text==="string"?_.text:void 0}isDirty(){return!1}setContent(_,$){let Z=b2(this.context);if(Z&&Z.kind==="text"){if(Z.text=_,$!==void 0)Z.mtime=$}if(this.context.content=_,$!==void 0)this.context.mtime=$;this.render()}focus(){this.host?.focus?.()}dispose(){if(this.disposed)return;this.disposed=!0,this.host?.remove(),this.container.innerHTML=""}}var u1={id:"workspace-markdown-preview",label:"Workspace Markdown Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){let $=b2(_);if(_?.mode!=="view")return!1;if(!$||$.kind!=="text")return!1;return $.content_type==="text/markdown"?20:!1},mount(_,$){return new g1(_,$)}},c1={id:"workspace-preview-default",label:"Workspace Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){if(_?.mode!=="view")return!1;return b2(_)||_?.path?1:!1},mount(_,$){return new g1(_,$)}};class I4{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let Z of this.listeners)try{Z(_,$)}catch{}}open(_,$){let Z=this.tabs.get(_);if(!Z)Z={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,Z);return this.activate(_),Z}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((Z)=>Z!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,Z]of this.tabs)if($!==_&&!Z.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((J)=>J!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((Z)=>Z!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let Z=this.tabs.get(_);if(!Z||Z.dirty===$)return;Z.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let Z=this.tabs.get(_);if(Z)Z.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,Z){let J=this.tabs.get(_);if(!J)return;if(this.tabs.delete(_),J.id=$,J.path=$,J.label=Z||$.split("/").pop()||$,this.tabs.set($,J),this.mruOrder=this.mruOrder.map((X)=>X===_?$:X),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((J)=>J.id===this.activeId),Z=_[($+1)%_.length];this.activate(Z.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((J)=>J.id===this.activeId),Z=_[($-1+_.length)%_.length];this.activate(Z.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var k_=new I4;var Y1="workspaceExplorerScale",k6=["compact","default","comfortable"],C6=new Set(k6),y6={compact:{indentPx:14},default:{indentPx:16},comfortable:{indentPx:18}};function T4(_,$="default"){if(typeof _!=="string")return $;let Z=_.trim().toLowerCase();return C6.has(Z)?Z:$}function m1(){if(typeof window>"u")return{width:0,isTouch:!1};let _=Number(window.innerWidth)||0,$=Boolean(window.matchMedia?.("(pointer: coarse)")?.matches),Z=Boolean(window.matchMedia?.("(hover: none)")?.matches),J=Number(globalThis.navigator?.maxTouchPoints||0)>0;return{width:_,isTouch:$||J&&Z}}function A6(_={}){let $=Math.max(0,Number(_.width)||0);if(Boolean(_.isTouch))return"comfortable";if($>0&&$<1180)return"comfortable";return"default"}function w6(_,$={}){if(Boolean($.isTouch)&&_==="compact")return"default";return _}function h1(_={}){let $=A6(_),Z=_.stored?T4(_.stored,$):$;return w6(Z,_)}function f4(_){return y6[T4(_)]}var P6=60000,u4=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function c4(_,$,Z,J=0,X=[]){if(!Z&&u4(_))return X;if(!_)return X;if(X.push({node:_,depth:J}),_.type==="dir"&&_.children&&$.has(_.path))for(let Y of _.children)c4(Y,$,Z,J+1,X);return X}function v4(_,$,Z){if(!_)return"";let J=[],X=(Y)=>{if(!Z&&u4(Y))return;if(J.push(Y.type==="dir"?`d:${Y.path}`:`f:${Y.path}`),Y.children&&$?.has(Y.path))for(let j of Y.children)X(j)};return X(_),J.join("|")}function n1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let Z=Array.isArray(_.children)?_.children:null,J=Array.isArray($.children)?$.children:null;if(!J)return _;let X=Z?new Map(Z.map((V)=>[V?.path,V])):new Map,Y=!Z||Z.length!==J.length,j=J.map((V)=>{let N=n1(X.get(V.path),V);if(N!==X.get(V.path))Y=!0;return N});return Y?{...$,children:j}:_}function i1(_,$,Z){if(!_)return _;if(_.path===$)return n1(_,Z);if(!Array.isArray(_.children))return _;let J=!1,X=_.children.map((Y)=>{let j=i1(Y,$,Z);if(j!==Y)J=!0;return j});return J?{..._,children:X}:_}var m4=4,p1=14,b6=8,M6=16;function h4(_){if(!_)return 0;if(_.type==="file"){let J=Math.max(0,Number(_.size)||0);return _.__bytes=J,J}let $=Array.isArray(_.children)?_.children:[],Z=0;for(let J of $)Z+=h4(J);return _.__bytes=Z,Z}function p4(_,$=0){let Z=Math.max(0,Number(_?.__bytes??_?.size??0)),J={name:_?.name||_?.path||".",path:_?.path||".",size:Z,children:[]};if(!_||_.type!=="dir"||$>=m4)return J;let X=Array.isArray(_.children)?_.children:[],Y=[];for(let V of X){let N=Math.max(0,Number(V?.__bytes??V?.size??0));if(N<=0)continue;if(V.type==="dir")Y.push({kind:"dir",node:V,size:N});else Y.push({kind:"file",name:V.name,path:V.path,size:N})}Y.sort((V,N)=>N.size-V.size);let j=Y;if(Y.length>p1){let V=Y.slice(0,p1-1),N=Y.slice(p1-1),O=N.reduce((W,H)=>W+H.size,0);V.push({kind:"other",name:`+${N.length} more`,path:`${J.path}/[other]`,size:O}),j=V}return J.children=j.map((V)=>{if(V.kind==="dir")return p4(V.node,$+1);return{name:V.name,path:V.path,size:V.size,children:[]}}),J}function R4(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,Z=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(Z==="dark")return!0;if(Z==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function i4(_,$,Z){let J=((_+Math.PI/2)*180/Math.PI+360)%360,X=Z?Math.max(30,70-$*10):Math.max(34,66-$*8),Y=Z?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${J.toFixed(1)} ${X}% ${Y}%)`}function X1(_,$,Z,J){return{x:_+Z*Math.cos(J),y:$+Z*Math.sin(J)}}function o1(_,$,Z,J,X,Y){let j=Math.PI*2-0.0001,V=Y-X>j?X+j:Y,N=X1(_,$,J,X),O=X1(_,$,J,V),W=X1(_,$,Z,V),H=X1(_,$,Z,X),E=V-X>Math.PI?1:0;return[`M ${N.x.toFixed(3)} ${N.y.toFixed(3)}`,`A ${J} ${J} 0 ${E} 1 ${O.x.toFixed(3)} ${O.y.toFixed(3)}`,`L ${W.x.toFixed(3)} ${W.y.toFixed(3)}`,`A ${Z} ${Z} 0 ${E} 0 ${H.x.toFixed(3)} ${H.y.toFixed(3)}`,"Z"].join(" ")}var l4={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function n4(_,$,Z){let J=[],X=[],Y=Math.max(0,Number($)||0),j=(V,N,O,W)=>{let H=Array.isArray(V?.children)?V.children:[];if(!H.length)return;let E=Math.max(0,Number(V.size)||0);if(E<=0)return;let D=O-N,C=N;H.forEach((w,T)=>{let U=Math.max(0,Number(w.size)||0);if(U<=0)return;let P=U/E,u=C,y=T===H.length-1?O:C+D*P;if(C=y,y-u<0.003)return;let f=l4[W];if(f){let p=i4(u,W,Z);if(J.push({key:w.path,path:w.path,label:w.name,size:U,color:p,depth:W,startAngle:u,endAngle:y,innerRadius:f[0],outerRadius:f[1],d:o1(120,120,f[0],f[1],u,y)}),W===1)X.push({key:w.path,name:w.name,size:U,pct:Y>0?U/Y*100:0,color:p})}if(W<m4)j(w,u,y,W+1)})};return j(_,-Math.PI/2,Math.PI*3/2,1),{segments:J,legend:X}}function l1(_,$){if(!_||!$)return null;if(_.path===$)return _;let Z=Array.isArray(_.children)?_.children:[];for(let J of Z){let X=l1(J,$);if(X)return X}return null}function o4(_,$,Z,J){if(!Z||Z<=0)return{segments:[],legend:[]};let X=l4[1];if(!X)return{segments:[],legend:[]};let Y=-Math.PI/2,j=Math.PI*3/2,V=i4(Y,1,J),O=`${$||"."}/[files]`;return{segments:[{key:O,path:O,label:_,size:Z,color:V,depth:1,startAngle:Y,endAngle:j,innerRadius:X[0],outerRadius:X[1],d:o1(120,120,X[0],X[1],Y,j)}],legend:[{key:O,name:_,size:Z,pct:100,color:V}]}}function g4(_,$=!1,Z=!1){if(!_)return null;let J=h4(_),X=p4(_,0),Y=X.size||J,{segments:j,legend:V}=n4(X,Y,Z);if(!j.length&&Y>0){let N=o4("[files]",X.path,Y,Z);j=N.segments,V=N.legend}return{root:X,totalSize:Y,segments:j,legend:V,truncated:$,isDarkTheme:Z}}function S6({payload:_}){if(!_)return null;let[$,Z]=R(null),[J,X]=R(_?.root?.path||"."),[Y,j]=R(()=>[_?.root?.path||"."]),[V,N]=R(!1);m(()=>{let $_=_?.root?.path||".";X($_),j([$_]),Z(null)},[_?.root?.path,_?.totalSize]),m(()=>{if(!J)return;N(!0);let $_=setTimeout(()=>N(!1),180);return()=>clearTimeout($_)},[J]);let O=F0(()=>{return l1(_.root,J)||_.root},[_?.root,J]),W=O?.size||_.totalSize||0,{segments:H,legend:E}=F0(()=>{let $_=n4(O,W,_.isDarkTheme);if($_.segments.length>0)return $_;if(W<=0)return $_;let N_=O?.children?.length?"Total":"[files]";return o4(N_,O?.path||_?.root?.path||".",W,_.isDarkTheme)},[O,W,_.isDarkTheme,_?.root?.path]),[D,C]=R(H),w=L(new Map),T=L(0);m(()=>{let $_=w.current,N_=new Map(H.map((d)=>[d.key,d])),P_=performance.now(),r=220,e=(d)=>{let i=Math.min(1,(d-P_)/220),Z_=i*(2-i),j_=H.map((J_)=>{let W_=$_.get(J_.key)||{startAngle:J_.startAngle,endAngle:J_.startAngle,innerRadius:J_.innerRadius,outerRadius:J_.innerRadius},q_=(U_,C_)=>U_+(C_-U_)*Z_,z_=q_(W_.startAngle,J_.startAngle),L_=q_(W_.endAngle,J_.endAngle),A_=q_(W_.innerRadius,J_.innerRadius),F_=q_(W_.outerRadius,J_.outerRadius);return{...J_,d:o1(120,120,A_,F_,z_,L_)}});if(C(j_),i<1)T.current=requestAnimationFrame(e)};if(T.current)cancelAnimationFrame(T.current);return T.current=requestAnimationFrame(e),w.current=N_,()=>{if(T.current)cancelAnimationFrame(T.current)}},[H]);let U=D.length?D:H,P=W>0?n0(W):"0 B",u=O?.name||"",f=(u&&u!=="."?u:"Total")||"Total",p=P,l=Y.length>1,X_=($_)=>{if(!$_?.path)return;let N_=l1(_.root,$_.path);if(!N_||!Array.isArray(N_.children)||N_.children.length===0)return;j((P_)=>[...P_,N_.path]),X(N_.path),Z(null)},B_=()=>{if(!l)return;j(($_)=>{let N_=$_.slice(0,-1);return X(N_[N_.length-1]||_?.root?.path||"."),N_}),Z(null)};return Q`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${V?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${O?.path||_?.root?.path||"."}`}
                data-segments=${U.length}
                data-base-size=${W}>
                ${U.map(($_)=>Q`
                    <path
                        key=${$_.key}
                        d=${$_.d}
                        fill=${$_.color}
                        stroke="var(--bg-primary)"
                        stroke-width="1"
                        class=${`workspace-folder-starburst-segment${$?.key===$_.key?" is-hovered":""}`}
                        onMouseEnter=${()=>Z($_)}
                        onMouseLeave=${()=>Z(null)}
                        onTouchStart=${()=>Z($_)}
                        onTouchEnd=${()=>Z(null)}
                        onClick=${()=>X_($_)}
                    >
                        <title>${$_.label} — ${n0($_.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${l?" is-drill":""}`}
                    onClick=${B_}
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
            ${E.length>0&&Q`
                <div class="workspace-folder-starburst-legend">
                    ${E.slice(0,8).map(($_)=>Q`
                        <div key=${$_.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${$_.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${$_.name}>${$_.name}</span>
                            <span class="workspace-folder-starburst-size">${n0($_.size)}</span>
                            <span class="workspace-folder-starburst-pct">${$_.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&Q`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function x6({mediaId:_}){let[$,Z]=R(null);if(m(()=>{if(!_)return;l2(_).then(Z).catch(()=>{})},[_]),!$)return null;let J=$.filename||"file",X=$.metadata?.size?n0($.metadata.size):"";return Q`
        <a href=${Q2(_)} download=${J} class="file-attachment"
            onClick=${(Y)=>Y.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${J}</span>
                ${X&&Q`<span class="file-size">${X}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function d4({onFileSelect:_,visible:$=!0,active:Z=void 0,onOpenEditor:J}){let[X,Y]=R(null),[j,V]=R(new Set(["."])),[N,O]=R(null),[W,H]=R(null),[E,D]=R(""),[C,w]=R(null),[T,U]=R(null),[P,u]=R(!0),[y,f]=R(!1),[p,l]=R(null),[X_,B_]=R(()=>U2("workspaceShowHidden",!1)),[$_,N_]=R(!1),[P_,r]=R(null),[e,d]=R(null),[i,Z_]=R(null),[j_,J_]=R(!1),[v_,W_]=R(null),[q_,z_]=R(()=>R4()),[L_,A_]=R(()=>h1({stored:f0(Y1),...m1()})),F_=L(j),U_=L(""),C_=L(null),u_=L(0),w_=L(new Set),b_=L(null),y_=L(new Map),h_=L(_),i_=L(J),M_=L(null),K_=L(null),q0=L(null),t_=L(null),P0=L(null),G0=L(null),E0=L("."),Q_=L(null),V0=L({path:null,dragging:!1,startX:0,startY:0}),D0=L({path:null,dragging:!1,startX:0,startY:0}),S=L({path:null,timer:0}),__=L(!1),E_=L(0),N0=L(new Map),B0=L(null),d_=L(null),v0=L(null),z0=L(null),c_=L(X_),k0=L($),m_=L(Z??$),e_=L(0),x_=L(i),o0=L($_),$2=L(P_),R0=L(null),j2=L({x:0,y:0}),C0=L(0),y0=L(null),Y0=L(N),g0=L(W),A0=L(null),R_=L(null),d0=L(C);h_.current=_,i_.current=J,m(()=>{F_.current=j},[j]),m(()=>{c_.current=X_},[X_]),m(()=>{k0.current=$},[$]),m(()=>{m_.current=Z??$},[Z,$]),m(()=>{x_.current=i},[i]),m(()=>{if(typeof window>"u")return;let K=()=>{A_(h1({stored:f0(Y1),...m1()}))};K();let q=()=>K(),F=()=>K(),k=(c)=>{if(!c||c.key===null||c.key===Y1)K()};window.addEventListener("resize",q),window.addEventListener("focus",F),window.addEventListener("storage",k);let g=window.matchMedia?.("(pointer: coarse)"),o=window.matchMedia?.("(hover: none)"),a=(c,Y_)=>{if(!c)return;if(c.addEventListener)c.addEventListener("change",Y_);else if(c.addListener)c.addListener(Y_)},s=(c,Y_)=>{if(!c)return;if(c.removeEventListener)c.removeEventListener("change",Y_);else if(c.removeListener)c.removeListener(Y_)};return a(g,q),a(o,q),()=>{window.removeEventListener("resize",q),window.removeEventListener("focus",F),window.removeEventListener("storage",k),s(g,q),s(o,q)}},[]),m(()=>{let K=(q)=>{let F=q?.detail?.path;if(!F)return;let k=F.split("/"),g=[];for(let o=1;o<k.length;o++)g.push(k.slice(0,o).join("/"));if(g.length)V((o)=>{let a=new Set(o);a.add(".");for(let s of g)a.add(s);return a});O(F),requestAnimationFrame(()=>{let o=document.querySelector(`[data-path="${CSS.escape(F)}"]`);if(o)o.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",K),()=>window.removeEventListener("workspace-reveal-path",K)},[]),m(()=>{o0.current=$_},[$_]),m(()=>{$2.current=P_},[P_]),m(()=>{Y0.current=N},[N]),m(()=>{g0.current=W},[W]),m(()=>{d0.current=C},[C]),m(()=>{if(typeof window>"u"||typeof document>"u")return;let K=()=>z_(R4());K();let q=window.matchMedia?.("(prefers-color-scheme: dark)"),F=()=>K();if(q?.addEventListener)q.addEventListener("change",F);else if(q?.addListener)q.addListener(F);let k=typeof MutationObserver<"u"?new MutationObserver(()=>K()):null;if(k?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)k?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(q?.removeEventListener)q.removeEventListener("change",F);else if(q?.removeListener)q.removeListener(F);k?.disconnect()}},[]),m(()=>{if(!W)return;let K=P0.current;if(!K)return;let q=requestAnimationFrame(()=>{try{K.focus(),K.select()}catch{}});return()=>cancelAnimationFrame(q)},[W]);let K2=async(K)=>{f(!0),w(null),U(null);try{let q=await l3(K,20000);w(q)}catch(q){w({error:q.message||"Failed to load preview"})}finally{f(!1)}};M_.current=K2;let Z2=async()=>{if(!k0.current)return;try{let K=await n2("",1,c_.current),q=v4(K.root,F_.current,c_.current);if(q===U_.current){u(!1);return}if(U_.current=q,C_.current=K.root,!u_.current)u_.current=requestAnimationFrame(()=>{u_.current=0,Y((F)=>n1(F,C_.current)),u(!1)})}catch(K){l(K.message||"Failed to load workspace"),u(!1)}},r0=async(K)=>{if(!K)return;if(w_.current.has(K))return;w_.current.add(K);try{let q=await n2(K,1,c_.current);Y((F)=>i1(F,K,q.root))}catch(q){l(q.message||"Failed to load workspace")}finally{w_.current.delete(K)}};K_.current=r0;let r_=M(()=>{let K=N;if(!K)return".";let q=y_.current?.get(K);if(q&&q.type==="dir")return q.path;if(K==="."||!K.includes("/"))return".";let F=K.split("/");return F.pop(),F.join("/")||"."},[N]),Q0=M((K)=>{let q=K?.closest?.(".workspace-row");if(!q)return null;let F=q.dataset.path,k=q.dataset.type;if(!F)return null;if(k==="dir")return F;if(F.includes("/")){let g=F.split("/");return g.pop(),g.join("/")||"."}return"."},[]),U0=M((K)=>{return Q0(K?.target||null)},[Q0]),I_=M((K)=>{x_.current=K,Z_(K)},[]),_0=M(()=>{let K=S.current;if(K?.timer)clearTimeout(K.timer);S.current={path:null,timer:0}},[]),g_=M((K)=>{if(!K||K==="."){_0();return}let q=y_.current?.get(K);if(!q||q.type!=="dir"){_0();return}if(F_.current?.has(K)){_0();return}if(S.current?.path===K)return;_0();let F=setTimeout(()=>{S.current={path:null,timer:0},K_.current?.(K),V((k)=>{let g=new Set(k);return g.add(K),g})},600);S.current={path:K,timer:F}},[_0]),$0=M((K,q)=>{if(j2.current={x:K,y:q},C0.current)return;C0.current=requestAnimationFrame(()=>{C0.current=0;let F=R0.current;if(!F)return;let k=j2.current;F.style.transform=`translate(${k.x+12}px, ${k.y+12}px)`})},[]),H0=M((K)=>{if(!K)return;let F=(y_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!F)return;d({path:K,label:F})},[]),b0=M(()=>{if(d(null),C0.current)cancelAnimationFrame(C0.current),C0.current=0;if(R0.current)R0.current.style.transform="translate(-9999px, -9999px)"},[]),u0=M((K)=>{if(!K)return".";let q=y_.current?.get(K);if(q&&q.type==="dir")return q.path;if(K==="."||!K.includes("/"))return".";let F=K.split("/");return F.pop(),F.join("/")||"."},[]),X0=M(()=>{H(null),D("")},[]),J2=M((K)=>{if(!K)return;let F=(y_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!F||K===".")return;H(K),D(F)},[]),M0=M(async()=>{let K=g0.current;if(!K)return;let q=(E||"").trim();if(!q){X0();return}let F=y_.current?.get(K),k=(F?.name||K.split("/").pop()||K).trim();if(q===k){X0();return}try{let o=(await d3(K,q))?.path||K,a=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(X0(),l(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:K,newPath:o,type:F?.type||"file"}})),F?.type==="dir")V((s)=>{let c=new Set;for(let Y_ of s)if(Y_===K)c.add(o);else if(Y_.startsWith(`${K}/`))c.add(`${o}${Y_.slice(K.length)}`);else c.add(Y_);return c});if(O(o),F?.type==="dir")w(null),f(!1),U(null);else M_.current?.(o);K_.current?.(a)}catch(g){l(g?.message||"Failed to rename file")}},[X0,E]),c0=M(async(K)=>{let k=K||".";for(let g=0;g<50;g+=1){let a=`untitled${g===0?"":`-${g}`}.md`;try{let c=(await o3(k,a,""))?.path||(k==="."?a:`${k}/${a}`);if(k&&k!==".")V((Y_)=>new Set([...Y_,k]));O(c),l(null),K_.current?.(k),M_.current?.(c);return}catch(s){if(s?.status===409||s?.code==="file_exists")continue;l(s?.message||"Failed to create file");return}}l("Failed to create file (untitled name already in use).")},[]),s0=M((K)=>{if(K?.stopPropagation?.(),j_)return;let q=u0(Y0.current);c0(q)},[j_,u0,c0]);m(()=>{if(typeof window>"u")return;let K=(q)=>{let F=q?.detail?.updates||[];if(!Array.isArray(F)||F.length===0)return;Y((s)=>{let c=s;for(let Y_ of F){if(!Y_?.root)continue;if(!c||Y_.path==="."||!Y_.path)c=Y_.root;else c=i1(c,Y_.path,Y_.root)}if(c)U_.current=v4(c,F_.current,c_.current);return u(!1),c});let k=Y0.current;if(Boolean(k)&&F.some((s)=>{let c=s?.path||"";if(!c||c===".")return!0;return k===c||k.startsWith(`${c}/`)||c.startsWith(`${k}/`)}))N0.current.clear();if(!k||!d0.current)return;let o=y_.current?.get(k);if(o&&o.type==="dir")return;if(F.some((s)=>{let c=s?.path||"";if(!c||c===".")return!0;return k===c||k.startsWith(`${c}/`)}))M_.current?.(k)};return window.addEventListener("workspace-update",K),()=>window.removeEventListener("workspace-update",K)},[]),b_.current=Z2;let m0=L(()=>{if(typeof window>"u")return;let K=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),q=m_.current??k0.current,F=document.visibilityState!=="hidden"&&(q||K.matches&&k0.current);o2(F,c_.current).catch(()=>{})}).current,z=L(0),I=L(()=>{if(z.current)clearTimeout(z.current);z.current=setTimeout(()=>{z.current=0,m0()},250)}).current;m(()=>{if(k0.current)b_.current?.();I()},[$,Z]),m(()=>{b_.current(),m0();let K=setInterval(()=>b_.current(),P6),q=H2("previewHeight",null),F=Number.isFinite(q)?Math.min(Math.max(q,80),600):280;if(E_.current=F,q0.current)q0.current.style.setProperty("--preview-height",`${F}px`);let k=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),g=()=>I();if(k.addEventListener)k.addEventListener("change",g);else if(k.addListener)k.addListener(g);return document.addEventListener("visibilitychange",g),()=>{if(clearInterval(K),u_.current)cancelAnimationFrame(u_.current),u_.current=0;if(k.removeEventListener)k.removeEventListener("change",g);else if(k.removeListener)k.removeListener(g);if(document.removeEventListener("visibilitychange",g),z.current)clearTimeout(z.current),z.current=0;if(Q_.current)clearTimeout(Q_.current),Q_.current=null;o2(!1,c_.current).catch(()=>{})}},[]);let n=F0(()=>c4(X,j,X_),[X,j,X_]),O_=F0(()=>new Map(n.map((K)=>[K.node.path,K.node])),[n]),D_=F0(()=>f4(L_),[L_]);y_.current=O_;let V_=(N?y_.current.get(N):null)?.type==="dir";m(()=>{if(!N||!V_){W_(null),B0.current=null,d_.current=null;return}let K=N,q=`${X_?"hidden":"visible"}:${N}`,F=N0.current,k=F.get(q);if(k?.root){F.delete(q),F.set(q,k);let a=g4(k.root,Boolean(k.truncated),q_);if(a)B0.current=a,d_.current=N,W_({loading:!1,error:null,payload:a});return}let g=B0.current,o=d_.current;W_({loading:!0,error:null,payload:o===N?g:null}),n2(N,b6,X_).then((a)=>{if(Y0.current!==K)return;let s={root:a?.root,truncated:Boolean(a?.truncated)};F.delete(q),F.set(q,s);while(F.size>M6){let Y_=F.keys().next().value;if(!Y_)break;F.delete(Y_)}let c=g4(s.root,s.truncated,q_);B0.current=c,d_.current=N,W_({loading:!1,error:null,payload:c})}).catch((a)=>{if(Y0.current!==K)return;W_({loading:!1,error:a?.message||"Failed to load folder size chart",payload:o===N?g:null})})},[N,V_,X_,q_]);let W0=Boolean(C&&C.kind==="text"&&!V_&&(!C.size||C.size<=262144)),h0=W0?"Open in editor":C?.size>262144?"File too large to edit":"File is not editable";m(()=>{let K=v0.current;if(z0.current)z0.current.dispose(),z0.current=null;if(!K)return;if(K.innerHTML="",!N||V_||!C||C.error)return;let q={path:N,content:typeof C.text==="string"?C.text:void 0,mtime:C.mtime,size:C.size,preview:C,mode:"view"},F=p_.resolve(q)||p_.get("workspace-preview-default");if(!F)return;let k=F.mount(K,q);return z0.current=k,()=>{if(z0.current===k)k.dispose(),z0.current=null;K.innerHTML=""}},[N,V_,C]);let S0=(K)=>{let q=K?.target;if(q instanceof Element)return q;return q?.parentElement||null},p0=(K)=>{return Boolean(K?.closest?.(".workspace-node-icon, .workspace-label-text"))},G2=L((K)=>{if(R_.current)clearTimeout(R_.current),R_.current=null;let F=S0(K)?.closest?.("[data-path]");if(!F)return;let k=F.dataset.path;if(F.dataset.type==="dir"||!k)return;if(g0.current===k)X0();i_.current?.(k)}).current,V2=L((K)=>{if(__.current){__.current=!1;return}let q=S0(K),F=q?.closest?.("[data-path]");if(t_.current?.focus?.(),!F)return;let k=F.dataset.path,g=F.dataset.type,o=Boolean(q?.closest?.(".workspace-caret")),a=Boolean(q?.closest?.("button"))||Boolean(q?.closest?.("a"))||Boolean(q?.closest?.("input")),s=Y0.current===k,c=g0.current;if(c){if(c===k)return;X0()}let Y_=g==="file"&&A0.current===k&&!o&&!a;if(s&&!o&&!a&&k!=="."&&!Y_){if(R_.current)clearTimeout(R_.current);R_.current=setTimeout(()=>{R_.current=null,J2(k)},350);return}if(g==="dir"){if(A0.current=null,O(k),w(null),U(null),f(!1),!F_.current.has(k))K_.current?.(k);if(s&&!o)return;V((i0)=>{let T0=new Set(i0);if(T0.has(k))T0.delete(k);else T0.add(k);return T0})}else{A0.current=null,O(k);let a_=y_.current.get(k);if(a_)h_.current?.(a_.path,a_);M_.current?.(k)}}).current,s_=L(()=>{U_.current="",b_.current(),Array.from(F_.current||[]).filter((q)=>q&&q!==".").forEach((q)=>K_.current?.(q))}).current,S_=L(()=>{A0.current=null,O(null),w(null),U(null),f(!1)}).current,j0=L(()=>{B_((K)=>{let q=!K;if(typeof window<"u")f_("workspaceShowHidden",String(q));return c_.current=q,o2(!0,q).catch(()=>{}),U_.current="",b_.current?.(),Array.from(F_.current||[]).filter((k)=>k&&k!==".").forEach((k)=>K_.current?.(k)),q})}).current,a0=L((K)=>{if(S0(K)?.closest?.("[data-path]"))return;S_()}).current,n_=M(async(K)=>{if(!K)return;let q=K.split("/").pop()||K;if(!window.confirm(`Delete "${q}"? This cannot be undone.`))return;try{await s3(K);let k=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(Y0.current===K)S_();K_.current?.(k),l(null)}catch(k){w((g)=>({...g||{},error:k.message||"Failed to delete file"}))}},[S_]),Z0=M((K)=>{let q=t_.current;if(!q||!K||typeof CSS>"u"||typeof CSS.escape!=="function")return;q.querySelector(`[data-path="${CSS.escape(K)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),x0=M((K)=>{let q=n;if(!q||q.length===0)return;let F=N?q.findIndex((k)=>k.node.path===N):-1;if(K.key==="ArrowDown"){K.preventDefault();let k=Math.min(F+1,q.length-1),g=q[k];if(!g)return;if(O(g.node.path),g.node.type!=="dir")h_.current?.(g.node.path,g.node),M_.current?.(g.node.path);else w(null),f(!1),U(null);Z0(g.node.path);return}if(K.key==="ArrowUp"){K.preventDefault();let k=F<=0?0:F-1,g=q[k];if(!g)return;if(O(g.node.path),g.node.type!=="dir")h_.current?.(g.node.path,g.node),M_.current?.(g.node.path);else w(null),f(!1),U(null);Z0(g.node.path);return}if(K.key==="ArrowRight"&&F>=0){let k=q[F];if(k?.node?.type==="dir"&&!j.has(k.node.path))K.preventDefault(),K_.current?.(k.node.path),V((g)=>new Set([...g,k.node.path]));return}if(K.key==="ArrowLeft"&&F>=0){let k=q[F];if(k?.node?.type==="dir"&&j.has(k.node.path))K.preventDefault(),V((g)=>{let o=new Set(g);return o.delete(k.node.path),o});return}if(K.key==="Enter"&&F>=0){K.preventDefault();let k=q[F];if(!k)return;let g=k.node.path;if(k.node.type==="dir"){if(!F_.current.has(g))K_.current?.(g);V((a)=>{let s=new Set(a);if(s.has(g))s.delete(g);else s.add(g);return s}),w(null),U(null),f(!1)}else h_.current?.(g,k.node),M_.current?.(g);return}if((K.key==="Delete"||K.key==="Backspace")&&F>=0){let k=q[F];if(!k||k.node.type==="dir")return;K.preventDefault(),n_(k.node.path);return}if(K.key==="Escape")K.preventDefault(),S_()},[S_,n_,j,n,Z0,N]),O0=M((K)=>{let q=S0(K),F=q?.closest?.(".workspace-row");if(!F)return;let k=F.dataset.type,g=F.dataset.path;if(!g||g===".")return;if(g0.current===g)return;let o=K?.touches?.[0];if(!o)return;if(V0.current={path:p0(q)?g:null,dragging:!1,startX:o.clientX,startY:o.clientY},k!=="file")return;if(Q_.current)clearTimeout(Q_.current);Q_.current=setTimeout(()=>{if(Q_.current=null,V0.current?.dragging)return;n_(g)},600)},[n_]),w0=M(()=>{if(Q_.current)clearTimeout(Q_.current),Q_.current=null;let K=V0.current;if(K?.dragging&&K.path){let q=x_.current||r_(),F=y0.current;if(typeof F==="function")F(K.path,q)}V0.current={path:null,dragging:!1,startX:0,startY:0},e_.current=0,N_(!1),r(null),I_(null),_0(),b0()},[r_,b0,I_,_0]),N2=M((K)=>{let q=V0.current,F=K?.touches?.[0];if(!F||!q?.path){if(Q_.current)clearTimeout(Q_.current),Q_.current=null;return}let k=Math.abs(F.clientX-q.startX),g=Math.abs(F.clientY-q.startY),o=k>8||g>8;if(o&&Q_.current)clearTimeout(Q_.current),Q_.current=null;if(!q.dragging&&o)q.dragging=!0,N_(!0),r("move"),H0(q.path);if(q.dragging){K.preventDefault(),$0(F.clientX,F.clientY);let a=document.elementFromPoint(F.clientX,F.clientY),s=Q0(a)||r_();if(x_.current!==s)I_(s);g_(s)}},[Q0,r_,H0,$0,I_,g_]),D2=L((K)=>{K.preventDefault();let q=q0.current;if(!q)return;let F=K.clientY,k=E_.current||280,g=K.currentTarget;g.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let o=F,a=(c)=>{o=c.clientY;let Y_=q.clientHeight-80,a_=Math.min(Math.max(k-(c.clientY-F),80),Y_);q.style.setProperty("--preview-height",`${a_}px`),E_.current=a_},s=()=>{let c=q.clientHeight-80,Y_=Math.min(Math.max(k-(o-F),80),c);E_.current=Y_,g.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",f_("previewHeight",String(Math.round(Y_))),document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",s)};document.addEventListener("mousemove",a),document.addEventListener("mouseup",s)}).current,Y2=L((K)=>{K.preventDefault();let q=q0.current;if(!q)return;let F=K.touches[0];if(!F)return;let k=F.clientY,g=E_.current||280,o=K.currentTarget;o.classList.add("dragging"),document.body.style.userSelect="none";let a=(c)=>{let Y_=c.touches[0];if(!Y_)return;c.preventDefault();let a_=q.clientHeight-80,i0=Math.min(Math.max(g-(Y_.clientY-k),80),a_);q.style.setProperty("--preview-height",`${i0}px`),E_.current=i0},s=()=>{o.classList.remove("dragging"),document.body.style.userSelect="",f_("previewHeight",String(Math.round(E_.current||g))),document.removeEventListener("touchmove",a),document.removeEventListener("touchend",s),document.removeEventListener("touchcancel",s)};document.addEventListener("touchmove",a,{passive:!1}),document.addEventListener("touchend",s),document.addEventListener("touchcancel",s)}).current,W1=async()=>{if(!N)return;try{let K=await n3(N);if(K.media_id)U(K.media_id)}catch(K){w((q)=>({...q||{},error:K.message||"Failed to attach"}))}},j1=async()=>{if(!N||V_)return;await n_(N)},X2=(K)=>{return Array.from(K?.dataTransfer?.types||[]).includes("Files")},x2=M((K)=>{if(!X2(K))return;if(K.preventDefault(),e_.current+=1,!o0.current)N_(!0);r("upload");let q=U0(K)||r_();I_(q),g_(q)},[r_,U0,I_,g_]),J0=M((K)=>{if(!X2(K))return;if(K.preventDefault(),K.dataTransfer)K.dataTransfer.dropEffect="copy";if(!o0.current)N_(!0);if($2.current!=="upload")r("upload");let q=U0(K)||r_();if(x_.current!==q)I_(q);g_(q)},[r_,U0,I_,g_]),K1=M((K)=>{if(!X2(K))return;if(K.preventDefault(),e_.current=Math.max(0,e_.current-1),e_.current===0)N_(!1),r(null),I_(null),_0()},[I_,_0]),O2=M(async(K,q=".")=>{let F=Array.from(K||[]);if(F.length===0)return;let k=q&&q!==""?q:".",g=k!=="."?k:"workspace root";J_(!0);try{let o=null;for(let a of F)try{o=await y1(a,k)}catch(s){let c=s?.status,Y_=s?.code;if(c===409||Y_==="file_exists"){let a_=a?.name||"file";if(!window.confirm(`"${a_}" already exists in ${g}. Overwrite?`))continue;o=await y1(a,k,{overwrite:!0})}else throw s}if(o?.path)A0.current=o.path,O(o.path),M_.current?.(o.path);K_.current?.(k)}catch(o){l(o.message||"Failed to upload file")}finally{J_(!1)}},[]),I2=M(async(K,q)=>{if(!K)return;let F=y_.current?.get(K);if(!F)return;let k=q&&q!==""?q:".",g=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(k===g)return;try{let a=(await r3(K,k))?.path||K;if(F.type==="dir")V((s)=>{let c=new Set;for(let Y_ of s)if(Y_===K)c.add(a);else if(Y_.startsWith(`${K}/`))c.add(`${a}${Y_.slice(K.length)}`);else c.add(Y_);return c});if(O(a),F.type==="dir")w(null),f(!1),U(null);else M_.current?.(a);K_.current?.(g),K_.current?.(k)}catch(o){l(o?.message||"Failed to move entry")}},[]);y0.current=I2;let I0=M(async(K)=>{if(!X2(K))return;K.preventDefault(),e_.current=0,N_(!1),r(null),Z_(null),_0();let q=Array.from(K?.dataTransfer?.files||[]);if(q.length===0)return;let F=x_.current||U0(K)||r_();await O2(q,F)},[r_,U0,O2]),K0=M((K)=>{if(K?.stopPropagation?.(),j_)return;let q=K?.currentTarget?.dataset?.uploadTarget||".";E0.current=q,G0.current?.click()},[j_]),G1=M(()=>{if(j_)return;let K=Y0.current,q=K?y_.current?.get(K):null;E0.current=q?.type==="dir"?q.path:".",G0.current?.click()},[j_]),k2=M((K)=>{if(!K||K.button!==0)return;let q=K.currentTarget;if(!q||!q.dataset)return;let F=q.dataset.path;if(!F||F===".")return;if(g0.current===F)return;let k=S0(K);if(k?.closest?.("button, a, input, .workspace-caret"))return;if(!p0(k))return;K.preventDefault(),D0.current={path:F,dragging:!1,startX:K.clientX,startY:K.clientY};let g=(a)=>{let s=D0.current;if(!s?.path)return;let c=Math.abs(a.clientX-s.startX),Y_=Math.abs(a.clientY-s.startY),a_=c>4||Y_>4;if(!s.dragging&&a_)s.dragging=!0,__.current=!0,N_(!0),r("move"),H0(s.path),$0(a.clientX,a.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(s.dragging){a.preventDefault(),$0(a.clientX,a.clientY);let i0=document.elementFromPoint(a.clientX,a.clientY),T0=Q0(i0)||r_();if(x_.current!==T0)I_(T0);g_(T0)}},o=()=>{document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",o);let a=D0.current;if(a?.dragging&&a.path){let s=x_.current||r_(),c=y0.current;if(typeof c==="function")c(a.path,s)}D0.current={path:null,dragging:!1,startX:0,startY:0},e_.current=0,N_(!1),r(null),I_(null),_0(),b0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{__.current=!1},0)};document.addEventListener("mousemove",g),document.addEventListener("mouseup",o)},[Q0,r_,H0,$0,b0,I_,g_,_0]),t0=M(async(K)=>{let q=Array.from(K?.target?.files||[]);if(q.length===0)return;let F=E0.current||".";if(await O2(q,F),E0.current=".",K?.target)K.target.value=""},[O2]);return Q`
        <aside
            class=${`workspace-sidebar${$_?" workspace-drop-active":""}`}
            data-workspace-scale=${L_}
            ref=${q0}
            onDragEnter=${x2}
            onDragOver=${J0}
            onDragLeave=${K1}
            onDrop=${I0}
        >
            <input type="file" multiple style="display:none" ref=${G0} onChange=${t0} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${s0} title="New file" disabled=${j_}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${s_} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${X_?" active":""}`}
                        onClick=${j0}
                        title=${X_?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!X_&&Q`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${a0}>
                ${j_&&Q`<div class="workspace-drop-hint">Uploading…</div>`}
                ${P&&Q`<div class="workspace-loading">Loading…</div>`}
                ${p&&Q`<div class="workspace-error">${p}</div>`}
                ${X&&Q`
                    <div
                        class="workspace-tree-list"
                        ref=${t_}
                        tabIndex="0"
                        onClick=${V2}
                        onDblClick=${G2}
                        onKeyDown=${x0}
                        onTouchStart=${O0}
                        onTouchEnd=${w0}
                        onTouchMove=${N2}
                        onTouchCancel=${w0}
                    >
                        ${n.map(({node:K,depth:q})=>{let F=K.type==="dir",k=K.path===N,g=K.path===W,o=F&&j.has(K.path),a=i&&K.path===i,s=Array.isArray(K.children)&&K.children.length>0?K.children.length:Number(K.child_count)||0;return Q`
                                <div
                                    key=${K.path}
                                    class=${`workspace-row${k?" selected":""}${a?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+q*D_.indentPx}px`}}
                                    data-path=${K.path}
                                    data-type=${K.type}
                                    onMouseDown=${k2}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${F?o?Q`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:Q`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${F?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${F?Q`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:Q`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${g?Q`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${P0}
                                                value=${E}
                                                onInput=${(c)=>D(c?.target?.value||"")}
                                                onKeyDown=${(c)=>{if(c.key==="Enter")c.preventDefault(),M0();else if(c.key==="Escape")c.preventDefault(),X0()}}
                                                onBlur=${X0}
                                                onClick=${(c)=>c.stopPropagation()}
                                            />
                                        `:Q`<span class="workspace-label"><span class="workspace-label-text">${K.name}</span></span>`}
                                    ${F&&!o&&s>0&&Q`
                                        <span class="workspace-count">${s}</span>
                                    `}
                                    ${F&&Q`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${K.path}
                                            title="Upload files to this folder"
                                            onClick=${K0}
                                            disabled=${j_}
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
            ${N&&Q`
                <div class="workspace-preview-splitter-h" onMouseDown=${D2} onTouchStart=${Y2}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${N}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${s0} title="New file" disabled=${j_}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!V_&&Q`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>W0&&i_.current?.(N,C)}
                                    title=${h0}
                                    disabled=${!W0}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${j1}
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
                            ${V_?Q`
                                    <button class="workspace-download" onClick=${G1}
                                        title="Upload files to this folder" disabled=${j_}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${a3(N,X_)}
                                        title="Download folder as zip" onClick=${(K)=>K.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:Q`<button class="workspace-download" onClick=${W1} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${y&&Q`<div class="workspace-loading">Loading preview…</div>`}
                    ${C?.error&&Q`<div class="workspace-error">${C.error}</div>`}
                    ${V_&&Q`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${v_?.loading&&Q`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${v_?.error&&Q`<div class="workspace-error">${v_.error}</div>`}
                        ${v_?.payload&&v_.payload.segments?.length>0&&Q`
                            <${S6} payload=${v_.payload} />
                        `}
                        ${v_?.payload&&(!v_.payload.segments||v_.payload.segments.length===0)&&Q`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${C&&!C.error&&!V_&&Q`
                        <div class="workspace-preview-meta">
                            ${C.size?Q`<span>${n0(C.size)}</span>`:""}
                            ${C.mtime?Q`<span>${$1(C.mtime)}</span>`:""}
                            ${C.truncated?Q`<span>truncated</span>`:""}
                        </div>
                        <div class="workspace-preview-body" ref=${v0}></div>
                    `}
                    ${T&&Q`
                        <div class="workspace-download-card">
                            <${x6} mediaId=${T} />
                        </div>
                    `}
                </div>
            `}
            ${e&&Q`
                <div class="workspace-drag-ghost" ref=${R0}>${e.label}</div>
            `}
        </aside>
    `}function r4({tabs:_,activeId:$,onActivate:Z,onClose:J,onCloseOthers:X,onCloseAll:Y,onTogglePin:j,onTogglePreview:V,previewTabs:N,onToggleDock:O,dockVisible:W}){let[H,E]=R(null),D=L(null);m(()=>{if(!H)return;let U=(P)=>{if(P.type==="keydown"&&P.key!=="Escape")return;E(null)};return document.addEventListener("click",U),document.addEventListener("keydown",U),()=>{document.removeEventListener("click",U),document.removeEventListener("keydown",U)}},[H]),m(()=>{let U=(P)=>{if(P.ctrlKey&&P.key==="Tab"){if(P.preventDefault(),!_.length)return;let u=_.findIndex((y)=>y.id===$);if(P.shiftKey){let y=_[(u-1+_.length)%_.length];Z?.(y.id)}else{let y=_[(u+1)%_.length];Z?.(y.id)}return}if((P.ctrlKey||P.metaKey)&&P.key==="w"){let u=document.querySelector(".editor-pane");if(u&&u.contains(document.activeElement)){if(P.preventDefault(),$)J?.($)}}};return document.addEventListener("keydown",U),()=>document.removeEventListener("keydown",U)},[_,$,Z,J]);let C=M((U,P)=>{if(U.button===1){U.preventDefault(),J?.(P);return}if(U.button===0)Z?.(P)},[Z,J]),w=M((U,P)=>{U.preventDefault(),E({id:P,x:U.clientX,y:U.clientY})},[]),T=M((U,P)=>{U.stopPropagation(),J?.(P)},[J]);if(m(()=>{if(!$||!D.current)return;let U=D.current.querySelector(".tab-item.active");if(U)U.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return Q`
        <div class="tab-strip" ref=${D} role="tablist">
            ${_.map((U)=>Q`
                <div
                    key=${U.id}
                    class=${`tab-item${U.id===$?" active":""}${U.dirty?" dirty":""}${U.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${U.id===$}
                    title=${U.path}
                    onMouseDown=${(P)=>C(P,U.id)}
                    onContextMenu=${(P)=>w(P,U.id)}
                >
                    ${U.pinned&&Q`
                        <span class="tab-pin-icon" aria-label="Pinned">
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                <path d="M4.456.734a1.75 1.75 0 0 1 2.826.504l.613 1.327a3.1 3.1 0 0 0 2.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.1 3.1 0 0 0-1.707-2.084l-1.327-.613a1.75 1.75 0 0 1-.504-2.826z"/>
                            </svg>
                        </span>
                    `}
                    <span class="tab-label">${U.label}</span>
                    <span
                        class="tab-close"
                        onClick=${(P)=>T(P,U.id)}
                        title=${U.dirty?"Unsaved changes":"Close"}
                        aria-label=${U.dirty?"Unsaved changes":`Close ${U.label}`}
                    >
                        ${U.dirty?Q`<span class="tab-dirty-dot" aria-hidden="true"></span>`:Q`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                <line x1="4" y1="4" x2="12" y2="12"/>
                                <line x1="12" y1="4" x2="4" y2="12"/>
                            </svg>`}
                    </span>
                </div>
            `)}
            ${O&&Q`
                <div class="tab-strip-spacer"></div>
                <button
                    class=${`tab-strip-dock-toggle${W?" active":""}`}
                    onClick=${O}
                    title=${`${W?"Hide":"Show"} terminal (Ctrl+\`)`}
                    aria-label=${`${W?"Hide":"Show"} terminal`}
                    aria-pressed=${W?"true":"false"}
                >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="4 12 4 10 8 6 12 10 12 12"/>
                        <line x1="2" y1="14" x2="14" y2="14"/>
                    </svg>
                </button>
            `}
        </div>
        ${H&&Q`
            <div class="tab-context-menu" style=${{left:H.x+"px",top:H.y+"px"}}>
                <button onClick=${()=>{J?.(H.id),E(null)}}>Close</button>
                <button onClick=${()=>{X?.(H.id),E(null)}}>Close Others</button>
                <button onClick=${()=>{Y?.(),E(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{j?.(H.id),E(null)}}>
                    ${_.find((U)=>U.id===H.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${V&&/\.(md|mdx|markdown)$/i.test(H.id)&&Q`
                    <hr />
                    <button onClick=${()=>{V(H.id),E(null)}}>
                        ${N?.has(H.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var I6=400,d1=60,s4=220,r1="mdPreviewHeight";function T6(){try{let _=localStorage.getItem(r1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=d1?$:s4}catch{return s4}}function a4({getContent:_,path:$,onClose:Z}){let[J,X]=R(""),[Y,j]=R(T6),V=L(null),N=L(null),O=L(""),W=L(_);return W.current=_,m(()=>{let D=()=>{let w=W.current?.()||"";if(w===O.current)return;O.current=w;try{let T=E2(w,null,{sanitize:!1});X(T)}catch{X('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};D();let C=setInterval(D,I6);return()=>clearInterval(C)},[]),m(()=>{if(V.current&&J)_1(V.current).catch(()=>{})},[J]),Q`
        <div
            class="md-preview-splitter"
            onMouseDown=${(D)=>{D.preventDefault();let C=D.clientY,w=N.current?.offsetHeight||Y,T=N.current?.parentElement,U=T?T.offsetHeight*0.7:500,P=D.currentTarget;P.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let u=(f)=>{let p=Math.min(Math.max(w-(f.clientY-C),d1),U);j(p)},y=()=>{P.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(r1,String(Math.round(N.current?.offsetHeight||Y)))}catch{}document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",y)};document.addEventListener("mousemove",u),document.addEventListener("mouseup",y)}}
            onTouchStart=${(D)=>{D.preventDefault();let C=D.touches[0];if(!C)return;let w=C.clientY,T=N.current?.offsetHeight||Y,U=N.current?.parentElement,P=U?U.offsetHeight*0.7:500,u=D.currentTarget;u.classList.add("dragging"),document.body.style.userSelect="none";let y=(p)=>{let l=p.touches[0];if(!l)return;p.preventDefault();let X_=Math.min(Math.max(T-(l.clientY-w),d1),P);j(X_)},f=()=>{u.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(r1,String(Math.round(N.current?.offsetHeight||Y)))}catch{}document.removeEventListener("touchmove",y),document.removeEventListener("touchend",f),document.removeEventListener("touchcancel",f)};document.addEventListener("touchmove",y,{passive:!1}),document.addEventListener("touchend",f),document.addEventListener("touchcancel",f)}}
        ></div>
        <div class="md-preview-panel" ref=${N} style=${{height:Y+"px"}}>
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
                ref=${V}
                dangerouslySetInnerHTML=${{__html:J}}
            />
        </div>
    `}function t4({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:Z}){let J=L(_);J.current=_;let X=L($);X.current=$;let Y=L(Z);Y.current=Z,m(()=>{Y.current();let j=new w1((N,O)=>J.current(N,O),(N)=>X.current(N));j.connect();let V=()=>{j.reconnectIfNeeded()};return window.addEventListener("focus",V),document.addEventListener("visibilitychange",V),()=>{window.removeEventListener("focus",V),document.removeEventListener("visibilitychange",V),j.disconnect()}},[])}function e4(){let[_,$]=R(!1),[Z,J]=R("default"),X=L(!1);m(()=>{let N=U2("notificationsEnabled",!1);if(X.current=N,$(N),typeof Notification<"u")J(Notification.permission)},[]),m(()=>{X.current=_},[_]);let Y=M(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let N=Notification.requestPermission();if(N&&typeof N.then==="function")return N;return Promise.resolve(N)}catch{return Promise.resolve("default")}},[]),j=M(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){J("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let O=await Y();if(J(O||"default"),O!=="granted"){X.current=!1,$(!1),f_("notificationsEnabled","false");return}}let N=!X.current;X.current=N,$(N),f_("notificationsEnabled",String(N))},[Y]),V=M((N,O)=>{if(!X.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let W=new Notification(N,{body:O});return W.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:Z,toggleNotifications:j,notify:V}}var M2=(_)=>{let $=new Set;return(_||[]).filter((Z)=>{if(!Z||$.has(Z.id))return!1;return $.add(Z.id),!0})};function _8({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[Z,J]=R(null),[X,Y]=R(!1),j=L(!1),V=L(null),N=L(!1),O=L(null),W=L(null);m(()=>{j.current=X},[X]),m(()=>{W.current=Z},[Z]);let H=M(async(C=null)=>{try{if(C){let w=await T3(C);J(w.posts),Y(!1)}else{let w=await i2(10);J(w.posts),Y(w.has_more)}}catch(w){console.error("Failed to load posts:",w)}},[]),E=M(async()=>{try{let C=await i2(10);J((w)=>{if(!w||w.length===0)return C.posts;return M2([...C.posts,...w])}),Y((w)=>w||C.has_more)}catch(C){console.error("Failed to refresh timeline:",C)}},[]),D=M(async(C={})=>{let w=W.current;if(!w||w.length===0)return;if(N.current)return;let{preserveScroll:T=!0,preserveMode:U="top",allowRepeat:P=!1}=C,u=(p)=>{if(!T){p();return}if(U==="top")$(p);else _(p)},f=w.slice().sort((p,l)=>p.id-l.id)[0]?.id;if(!Number.isFinite(f))return;if(!P&&O.current===f)return;N.current=!0,O.current=f;try{let p=await i2(10,f);if(p.posts.length>0)u(()=>{J((l)=>M2([...p.posts,...l||[]])),Y(p.has_more)});else Y(!1)}catch(p){console.error("Failed to load more posts:",p)}finally{N.current=!1}},[_,$]);return m(()=>{V.current=D},[D]),{posts:Z,setPosts:J,hasMore:X,setHasMore:Y,hasMoreRef:j,loadPosts:H,refreshTimeline:E,loadMore:D,loadMoreRef:V,loadingMoreRef:N,lastBeforeIdRef:O}}function $8(){let[_,$]=R(null),[Z,J]=R({text:"",totalLines:0}),[X,Y]=R(""),[j,V]=R({text:"",totalLines:0}),[N,O]=R(null),[W,H]=R(null),[E,D]=R(null),C=L(null),w=L(0),T=L(!1),U=L(""),P=L(""),u=L(null),y=L(null),f=L(null),p=L(null),l=L(!1),X_=L(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:Z,setAgentDraft:J,agentPlan:X,setAgentPlan:Y,agentThought:j,setAgentThought:V,pendingRequest:N,setPendingRequest:O,currentTurnId:W,setCurrentTurnId:H,steerQueuedTurnId:E,setSteerQueuedTurnId:D,lastAgentEventRef:C,lastSilenceNoticeRef:w,isAgentRunningRef:T,draftBufferRef:U,thoughtBufferRef:P,pendingRequestRef:u,stalledPostIdRef:y,currentTurnIdRef:f,steerQueuedTurnIdRef:p,thoughtExpandedRef:l,draftExpandedRef:X_}}function Z8({appShellRef:_,sidebarWidthRef:$,editorWidthRef:Z,dockHeightRef:J}){let X=L((W)=>{W.preventDefault();let H=_.current;if(!H)return;let E=W.clientX,D=$.current||280,C=W.currentTarget;C.classList.add("dragging"),H.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let w=E,T=(P)=>{w=P.clientX;let u=Math.min(Math.max(D+(P.clientX-E),160),600);H.style.setProperty("--sidebar-width",`${u}px`),$.current=u},U=()=>{let P=Math.min(Math.max(D+(w-E),160),600);$.current=P,C.classList.remove("dragging"),H.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",f_("sidebarWidth",String(Math.round(P))),document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",U)};document.addEventListener("mousemove",T),document.addEventListener("mouseup",U)}).current,Y=L((W)=>{W.preventDefault();let H=_.current;if(!H)return;let E=W.touches[0];if(!E)return;let D=E.clientX,C=$.current||280,w=W.currentTarget;w.classList.add("dragging"),H.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let T=(P)=>{let u=P.touches[0];if(!u)return;P.preventDefault();let y=Math.min(Math.max(C+(u.clientX-D),160),600);H.style.setProperty("--sidebar-width",`${y}px`),$.current=y},U=()=>{w.classList.remove("dragging"),H.classList.remove("sidebar-resizing"),document.body.style.userSelect="",f_("sidebarWidth",String(Math.round($.current||C))),document.removeEventListener("touchmove",T),document.removeEventListener("touchend",U),document.removeEventListener("touchcancel",U)};document.addEventListener("touchmove",T,{passive:!1}),document.addEventListener("touchend",U),document.addEventListener("touchcancel",U)}).current,j=L((W)=>{W.preventDefault();let H=_.current;if(!H)return;let E=W.clientX,D=Z.current||$.current||280,C=W.currentTarget;C.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let w=E,T=(P)=>{w=P.clientX;let u=Math.min(Math.max(D+(P.clientX-E),200),800);H.style.setProperty("--editor-width",`${u}px`),Z.current=u},U=()=>{let P=Math.min(Math.max(D+(w-E),200),800);Z.current=P,C.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",f_("editorWidth",String(Math.round(P))),document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",U)};document.addEventListener("mousemove",T),document.addEventListener("mouseup",U)}).current,V=L((W)=>{W.preventDefault();let H=_.current;if(!H)return;let E=W.touches[0];if(!E)return;let D=E.clientX,C=Z.current||$.current||280,w=W.currentTarget;w.classList.add("dragging"),document.body.style.userSelect="none";let T=(P)=>{let u=P.touches[0];if(!u)return;P.preventDefault();let y=Math.min(Math.max(C+(u.clientX-D),200),800);H.style.setProperty("--editor-width",`${y}px`),Z.current=y},U=()=>{w.classList.remove("dragging"),document.body.style.userSelect="",f_("editorWidth",String(Math.round(Z.current||C))),document.removeEventListener("touchmove",T),document.removeEventListener("touchend",U),document.removeEventListener("touchcancel",U)};document.addEventListener("touchmove",T,{passive:!1}),document.addEventListener("touchend",U),document.addEventListener("touchcancel",U)}).current,N=L((W)=>{W.preventDefault();let H=_.current;if(!H)return;let E=W.clientY,D=J?.current||200,C=W.currentTarget;C.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let w=E,T=(P)=>{w=P.clientY;let u=Math.min(Math.max(D-(P.clientY-E),100),window.innerHeight*0.5);if(H.style.setProperty("--dock-height",`${u}px`),J)J.current=u},U=()=>{let P=Math.min(Math.max(D-(w-E),100),window.innerHeight*0.5);if(J)J.current=P;C.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",f_("dockHeight",String(Math.round(P))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",U)};document.addEventListener("mousemove",T),document.addEventListener("mouseup",U)}).current,O=L((W)=>{W.preventDefault();let H=_.current;if(!H)return;let E=W.touches[0];if(!E)return;let D=E.clientY,C=J?.current||200,w=W.currentTarget;w.classList.add("dragging"),document.body.style.userSelect="none";let T=(P)=>{let u=P.touches[0];if(!u)return;P.preventDefault();let y=Math.min(Math.max(C-(u.clientY-D),100),window.innerHeight*0.5);if(H.style.setProperty("--dock-height",`${y}px`),J)J.current=y},U=()=>{w.classList.remove("dragging"),document.body.style.userSelect="",f_("dockHeight",String(Math.round(J?.current||C))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",T),document.removeEventListener("touchend",U),document.removeEventListener("touchcancel",U)};document.addEventListener("touchmove",T,{passive:!1}),document.addEventListener("touchend",U),document.addEventListener("touchcancel",U)}).current;return{handleSplitterMouseDown:X,handleSplitterTouchStart:Y,handleEditorSplitterMouseDown:j,handleEditorSplitterTouchStart:V,handleDockSplitterMouseDown:N,handleDockSplitterTouchStart:O}}function J8({onTabClosed:_}={}){let $=L(_);$.current=_;let[Z,J]=R(()=>k_.getTabs()),[X,Y]=R(()=>k_.getActiveId()),[j,V]=R(()=>k_.getTabs().length>0);m(()=>{return k_.onChange((y,f)=>{J(y),Y(f),V(y.length>0)})},[]);let[N,O]=R(()=>new Set),W=M((y)=>{O((f)=>{let p=new Set(f);if(p.has(y))p.delete(y);else p.add(y);return p})},[]),H=M((y)=>{O((f)=>{if(!f.has(y))return f;let p=new Set(f);return p.delete(y),p})},[]),E=M((y)=>{if(!y)return;let f={path:y,mode:"edit"};try{if(!p_.resolve(f)){if(!p_.get("editor")){console.warn(`[openEditor] No pane handler for: ${y}`);return}}}catch(p){console.warn(`[openEditor] paneRegistry.resolve() error for "${y}":`,p)}k_.open(y)},[]),D=M(()=>{let y=k_.getActiveId();if(y){let f=k_.get(y);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}k_.close(y),H(y),$.current?.(y)}},[H]),C=M((y)=>{let f=k_.get(y);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}k_.close(y),H(y),$.current?.(y)},[H]),w=M((y)=>{k_.activate(y)},[]),T=M((y)=>{let f=k_.getTabs().filter((X_)=>X_.id!==y&&!X_.pinned),p=f.filter((X_)=>X_.dirty).length;if(p>0){if(!window.confirm(`${p} unsaved tab${p>1?"s":""} will be closed. Continue?`))return}let l=f.map((X_)=>X_.id);k_.closeOthers(y),l.forEach((X_)=>{H(X_),$.current?.(X_)})},[H]),U=M(()=>{let y=k_.getTabs().filter((l)=>!l.pinned),f=y.filter((l)=>l.dirty).length;if(f>0){if(!window.confirm(`${f} unsaved tab${f>1?"s":""} will be closed. Continue?`))return}let p=y.map((l)=>l.id);k_.closeAll(),p.forEach((l)=>{H(l),$.current?.(l)})},[H]),P=M((y)=>{k_.togglePin(y)},[]),u=M(()=>{let y=k_.getActiveId();if(y)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:y}}))},[]);return m(()=>{let y=(f)=>{let{oldPath:p,newPath:l,type:X_}=f.detail||{};if(!p||!l)return;if(X_==="dir"){for(let B_ of k_.getTabs())if(B_.path===p||B_.path.startsWith(`${p}/`)){let $_=`${l}${B_.path.slice(p.length)}`;k_.rename(B_.id,$_)}}else k_.rename(p,l)};return window.addEventListener("workspace-file-renamed",y),()=>window.removeEventListener("workspace-file-renamed",y)},[]),m(()=>{let y=(f)=>{if(k_.hasUnsaved())f.preventDefault(),f.returnValue=""};return window.addEventListener("beforeunload",y),()=>window.removeEventListener("beforeunload",y)},[]),{editorOpen:j,tabStripTabs:Z,tabStripActiveId:X,previewTabs:N,openEditor:E,closeEditor:D,handleTabClose:C,handleTabActivate:w,handleTabCloseOthers:T,handleTabCloseAll:U,handleTabTogglePin:P,handleTabTogglePreview:W,revealInExplorer:u}}function s1(_,$){try{if(typeof window>"u")return $;let Z=window.__PICLAW_SILENCE||{},J=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,X=Z[_]??window[J],Y=Number(X);return Number.isFinite(Y)?Y:$}catch{return $}}var a1=s1("warning",30000),Y8=s1("finalize",120000),t1=s1("refresh",30000),X8=30000;function W8(_){let $={};return(_?.agents||[]).forEach((Z)=>{$[Z.id]=Z}),$}function j8(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function K8(_=30000){let[,$]=R(0);m(()=>{let Z=setInterval(()=>$((J)=>J+1),_);return()=>clearInterval(Z)},[_])}function e1(_,$=160){let Z=String(_||"").replace(/\r\n/g,`
`);if(!Z)return 0;return Z.split(`
`).reduce((J,X)=>J+Math.max(1,Math.ceil(X.length/$)),0)}function S2(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var f6=f3,G8=R3,v6=g3,V8=h3,N8=p3,O8=u3,_3=typeof F1==="function"?F1:S2("getAgentContext",null),R6=typeof W2==="function"?W2:S2("getAgentModels",{current:null,models:[]}),g6=typeof E1==="function"?E1:S2("getAgentQueueState",{count:0}),u6=typeof k1==="function"?k1:S2("steerAgentQueueItem",{removed:!1,queued:"steer"}),c6=typeof D1==="function"?D1:S2("removeAgentQueueItem",{removed:!1});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});p_.register(f1);p_.register(c1);p_.register(u1);v1();var m6=typeof localStorage<"u"&&localStorage.getItem("experimentalPanes")==="true";if(m6)p_.register(R1);function h6(){let[_,$]=R("disconnected"),[Z,J]=R(null),[X,Y]=R(null),[j,V]=R(!1),[N,O]=R([]),[W,H]=R([]),[E,D]=R(null),{agentStatus:C,setAgentStatus:w,agentDraft:T,setAgentDraft:U,agentPlan:P,setAgentPlan:u,agentThought:y,setAgentThought:f,pendingRequest:p,setPendingRequest:l,currentTurnId:X_,setCurrentTurnId:B_,steerQueuedTurnId:$_,setSteerQueuedTurnId:N_,lastAgentEventRef:P_,lastSilenceNoticeRef:r,isAgentRunningRef:e,draftBufferRef:d,thoughtBufferRef:i,pendingRequestRef:Z_,stalledPostIdRef:j_,currentTurnIdRef:J_,steerQueuedTurnIdRef:v_,thoughtExpandedRef:W_,draftExpandedRef:q_}=$8(),[z_,L_]=R({}),[A_,F_]=R(null),[U_,C_]=R(null),[u_,w_]=R(!1),[b_,y_]=R(null),[h_,i_]=R(null),[M_,K_]=R([]),[q0,t_]=R(!1),P0=M_.length,G0=L(new Set),E0=L([]),Q_=L(new Set),V0=L({inFlight:!1,lastAttemptAt:0,turnId:null});G0.current=new Set(M_.map((G)=>G.row_id)),E0.current=M_;let{notificationsEnabled:D0,notificationPermission:S,toggleNotifications:__,notify:E_}=e4(),[N0,B0]=R(()=>new Set),[d_,v0]=R(()=>U2("workspaceOpen",!0)),z0=L(null),{editorOpen:c_,tabStripTabs:k0,tabStripActiveId:m_,previewTabs:e_,openEditor:x_,closeEditor:o0,handleTabClose:$2,handleTabActivate:R0,handleTabCloseOthers:j2,handleTabCloseAll:C0,handleTabTogglePin:y0,handleTabTogglePreview:Y0,revealInExplorer:g0}=J8({onTabClosed:(G)=>z0.current?.(G)}),A0=L(null),R_=L(null);m(()=>{let G=A0.current;if(!G)return;if(R_.current)R_.current.dispose(),R_.current=null;let B=m_;if(!B)return;let A={path:B,mode:"edit"},b=p_.resolve(A)||p_.get("editor");if(!b){G.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let v=b.mount(G,A);R_.current=v,v.onDirtyChange?.((h)=>{k_.setDirty(B,h)}),v.onSaveRequest?.(()=>{}),v.onClose?.(()=>{o0()});let x=k_.getViewState(B);if(x&&typeof v.restoreViewState==="function")requestAnimationFrame(()=>v.restoreViewState(x));if(typeof v.onViewStateChange==="function")v.onViewStateChange((h)=>{k_.saveViewState(B,h)});return requestAnimationFrame(()=>v.focus()),()=>{if(R_.current===v)v.dispose(),R_.current=null}},[m_,o0]);let[d0,K2]=R({name:"You",avatar_url:null,avatar_background:null}),Z2=L(!1),r0=L(!1),r_=L(null),Q0=L(0),U0=L(0),I_=L({}),_0=L({name:null,avatar_url:null}),g_=L({currentHashtag:null,searchQuery:null}),$0=L(null),H0=L(null),b0=L(0),u0=L(0),X0=L(0),J2=L(null),M0=L(null),c0=L(null),s0=L(0),m0=L({title:null,avatarBase:null}),z=L(null),I=M(()=>{if(z.current)clearTimeout(z.current),z.current=null;D(null)},[]);K8(30000),m(()=>{return W4()},[]),m(()=>{f_("workspaceOpen",String(d_))},[d_]),m(()=>{return()=>{I()}},[I]),m(()=>{I_.current=z_||{}},[z_]),m(()=>{_0.current=d0||{name:"You",avatar_url:null,avatar_background:null}},[d0]);let n=M((G,B,A=null)=>{if(typeof document>"u")return;let b=(G||"").trim()||"PiClaw";if(m0.current.title!==b){document.title=b;let H_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(H_&&H_.getAttribute("content")!==b)H_.setAttribute("content",b);m0.current.title=b}let v=document.getElementById("dynamic-favicon");if(!v)return;let x=v.getAttribute("data-default")||v.getAttribute("href")||"/favicon.ico",h=B||x,t=B?`${h}|${A||""}`:h;if(m0.current.avatarBase!==t){let H_=B?`${h}${h.includes("?")?"&":"?"}v=${A||Date.now()}`:h;v.setAttribute("href",H_),m0.current.avatarBase=t}},[]),O_=M((G)=>{if(!G)return;O((B)=>B.includes(G)?B:[...B,G])},[]),D_=M((G)=>{O((B)=>B.filter((A)=>A!==G))},[]);z0.current=D_;let l_=M(()=>{O([])},[]),V_=M((G,B=null,A="info",b=3000)=>{I(),D({title:G,detail:B||null,kind:A||"info"}),z.current=setTimeout(()=>{D((v)=>v?.title===G?null:v)},b)},[I]),W0=M((G)=>{if(typeof G!=="string")return;let B=G.trim();if(!B){V_("No file selected","Use a valid file path from a file pill.","warning");return}if(!c_){V_("Editor pane is not open","Open the editor pane to open files from pills.","warning");return}if(/^[a-z][a-z0-9+.-]*:/i.test(B)){V_("Cannot open external path from file pill","Use an in-workspace file path.","warning");return}let b={path:B,mode:"edit"};if(!p_.resolve(b)){V_("No editor available",`No editor can open: ${B}`,"warning");return}x_(B)},[c_,x_,V_]),h0=M(()=>{let G=m_;if(G)O_(G)},[m_,O_]),S0=M((G)=>{if(!G)return;H((B)=>B.includes(G)?B:[...B,G])},[]),p0=M(async(G)=>{let B=(b)=>{b.scrollIntoView({behavior:"smooth",block:"center"}),b.classList.add("post-highlight"),setTimeout(()=>b.classList.remove("post-highlight"),2000)},A=document.getElementById("post-"+G);if(A){B(A);return}try{let v=(await v3(G))?.thread?.[0];if(!v)return;J0((x)=>{if(!x)return[v];if(x.some((h)=>h.id===v.id))return x;return[...x,v]}),requestAnimationFrame(()=>{setTimeout(()=>{let x=document.getElementById("post-"+G);if(x)B(x)},50)})}catch(b){console.error("[scrollToMessage] Failed to fetch message",G,b)}},[]),G2=M((G)=>{H((B)=>B.filter((A)=>A!==G))},[]),V2=M(()=>{H([])},[]),s_=M((G={})=>{let B=Date.now();if(P_.current=B,G.running)e.current=!0,t_((A)=>A?A:!0);if(G.clearSilence)r.current=0},[t_]),S_=M(()=>{if(c0.current)clearTimeout(c0.current),c0.current=null;s0.current=0},[]);m(()=>()=>{S_()},[S_]);let j0=M(()=>{S_(),w((G)=>{if(!G)return G;if(!(G.last_activity||G.lastActivity))return G;let{last_activity:B,lastActivity:A,...b}=G;return b})},[S_]),a0=M((G)=>{if(!G)return;S_();let B=Date.now();s0.current=B,w({type:G.type||"active",last_activity:!0}),c0.current=setTimeout(()=>{if(s0.current!==B)return;w((A)=>{if(!A||!(A.last_activity||A.lastActivity))return A;return null})},X8)},[S_]),n_=M(()=>{e.current=!1,t_(!1),P_.current=null,r.current=0,d.current="",i.current="",Z_.current=null,M0.current=null,J_.current=null,v_.current=null,V0.current={inFlight:!1,lastAttemptAt:0,turnId:null},S_(),B_(null),N_(null),W_.current=!1,q_.current=!1},[S_,B_,N_,t_]),Z0=M((G)=>{if(!G)return;if(J_.current===G)return;J_.current=G,V0.current={inFlight:!1,lastAttemptAt:0,turnId:G},B_(G),v_.current=null,N_(null),d.current="",i.current="",U({text:"",totalLines:0}),u(""),f({text:"",totalLines:0}),l(null),Z_.current=null,M0.current=null,W_.current=!1,q_.current=!1},[B_,N_]),x0=M((G)=>{if(typeof document<"u"){let H_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&H_)return}let B=M0.current;if(!B||!B.post)return;if(G&&B.turnId&&B.turnId!==G)return;let A=B.post;if(A.id&&J2.current===A.id)return;let b=String(A?.data?.content||"").trim();if(!b)return;J2.current=A.id||J2.current,M0.current=null;let v=b.replace(/\s+/g," ").slice(0,200),x=I_.current||{},t=(A?.data?.agent_id?x[A.data.agent_id]:null)?.name||"Pi";E_(t,v)},[E_]),O0=M(async(G,B)=>{if(G!=="thought"&&G!=="draft")return;let A=J_.current;if(G==="thought"){if(W_.current=B,A)try{await N8(A,"thought",B)}catch(b){console.warn("Failed to update thought visibility:",b)}if(!B)return;try{let b=A?await V8(A,"thought"):null;if(b?.text)i.current=b.text;f((v)=>({...v||{text:"",totalLines:0},fullText:i.current||v?.fullText||"",totalLines:Number.isFinite(b?.total_lines)?b.total_lines:v?.totalLines||0}))}catch(b){console.warn("Failed to fetch full thought:",b)}return}if(q_.current=B,A)try{await N8(A,"draft",B)}catch(b){console.warn("Failed to update draft visibility:",b)}if(!B)return;try{let b=A?await V8(A,"draft"):null;if(b?.text)d.current=b.text;U((v)=>({...v||{text:"",totalLines:0},fullText:d.current||v?.fullText||"",totalLines:Number.isFinite(b?.total_lines)?b.total_lines:v?.totalLines||0}))}catch(b){console.warn("Failed to fetch full draft:",b)}},[]),w0=L(null),N2=M(()=>{let G=$0.current;if(!G)return;if(!(Math.abs(G.scrollTop)>150))G.scrollTop=0},[]);w0.current=N2;let D2=M((G)=>{let B=$0.current;if(!B||typeof G!=="function"){G?.();return}let{currentHashtag:A,searchQuery:b}=g_.current||{},v=!(b&&!A),x=v?B.scrollHeight-B.scrollTop:B.scrollTop;G(),requestAnimationFrame(()=>{let h=$0.current;if(!h)return;if(v){let t=Math.max(h.scrollHeight-x,0);h.scrollTop=t}else{let t=Math.max(h.scrollHeight-h.clientHeight,0),H_=Math.min(x,t);h.scrollTop=H_}})},[]),Y2=M((G)=>{let B=$0.current;if(!B||typeof G!=="function"){G?.();return}let A=B.scrollTop;G(),requestAnimationFrame(()=>{let b=$0.current;if(!b)return;let v=Math.max(b.scrollHeight-b.clientHeight,0);b.scrollTop=Math.min(A,v)})},[]),W1="Queued as a follow-up (one-at-a-time).",j1="⁣",X2=M((G)=>{if(!G||!Array.isArray(G))return G;let B=G0.current,A=new Set(B),b=E0.current;for(let x of b)if(x?.thread_id!=null)A.add(x.thread_id);let v=G.filter((x)=>{if(A.has(x?.id))return!1;if(x?.data?.is_bot_message){let h=x?.data?.content;if(h===W1||h===j1)return!1}return!0});return v.length===G.length?G:v},[]),{posts:x2,setPosts:J0,hasMore:K1,setHasMore:O2,hasMoreRef:I2,loadPosts:I0,refreshTimeline:K0,loadMore:G1,loadMoreRef:k2}=_8({preserveTimelineScroll:D2,preserveTimelineScrollTop:Y2}),t0=F0(()=>X2(x2),[x2,M_,X2]),K=M(()=>{let G=j_.current;if(!G)return;J0((B)=>B?B.filter((A)=>A.id!==G):B),j_.current=null},[J0]),{handleSplitterMouseDown:q,handleSplitterTouchStart:F,handleEditorSplitterMouseDown:k,handleEditorSplitterTouchStart:g,handleDockSplitterMouseDown:o,handleDockSplitterTouchStart:a}=Z8({appShellRef:H0,sidebarWidthRef:b0,editorWidthRef:u0,dockHeightRef:X0}),s=M(()=>{if(!e.current)return;e.current=!1,r.current=0,P_.current=null,J_.current=null,B_(null),W_.current=!1,q_.current=!1;let G=(d.current||"").trim();if(d.current="",i.current="",U({text:"",totalLines:0}),u(""),f({text:"",totalLines:0}),l(null),Z_.current=null,M0.current=null,!G){w({type:"error",title:"Response stalled - No content received"});return}let A=`${G}${`

⚠️ Response may be incomplete - the model stopped responding`}`,b=Date.now(),v=new Date().toISOString(),x={id:b,timestamp:v,data:{type:"agent_response",content:A,agent_id:"default",is_local_stall:!0}};j_.current=b,J0((h)=>h?M2([...h,x]):[x]),w0.current?.(),w(null)},[B_]);m(()=>{g_.current={currentHashtag:Z,searchQuery:X}},[Z,X]),m(()=>{let G=Math.min(1000,Math.max(100,Math.floor(a1/2))),B=setInterval(()=>{if(!e.current)return;if(Z_.current)return;let A=P_.current;if(!A)return;let b=Date.now(),v=b-A;if(v>=Y8){w({type:"waiting",title:"Re-syncing after a quiet period…"}),a_();return}if(v>=a1){if(b-r.current>=t1){let x=Math.floor(v/1000);w({type:"waiting",title:`Waiting for model… No events for ${x}s`}),r.current=b,a_()}}},G);return()=>clearInterval(B)},[a_]);let c=M(async()=>{try{let G=await _3();if(G)i_(G)}catch(G){console.warn("Failed to fetch agent context:",G)}},[]),Y_=M(async()=>{try{let G=await O8("web:default");if(!G||G.status!=="active"||!G.data){if(r0.current){let{currentHashtag:b,searchQuery:v}=g_.current||{};if(!b&&!v)K0()}return r0.current=!1,n_(),w(null),U({text:"",totalLines:0}),u(""),f({text:"",totalLines:0}),l(null),Z_.current=null,G??null}r0.current=!0;let B=G.data,A=B.turn_id||B.turnId;if(A)Z0(A);if(s_({running:!0,clearSilence:!0}),j0(),w(B),G.thought&&G.thought.text)f((b)=>{if(b&&b.text&&b.text.length>=G.thought.text.length)return b;return i.current=G.thought.text,{text:G.thought.text,totalLines:G.thought.totalLines||0}});if(G.draft&&G.draft.text)U((b)=>{if(b&&b.text&&b.text.length>=G.draft.text.length)return b;return d.current=G.draft.text,{text:G.draft.text,totalLines:G.draft.totalLines||0}});return G}catch(G){return console.warn("Failed to fetch agent status:",G),null}},[n_,j0,s_,K0,Z0]),a_=M(async()=>{if(!e.current)return null;if(Z_.current)return null;let G=J_.current||null,B=V0.current,A=Date.now();if(B.inFlight)return null;if(B.turnId===G&&A-B.lastAttemptAt<t1)return null;B.inFlight=!0,B.lastAttemptAt=A,B.turnId=G;try{let{currentHashtag:b,searchQuery:v}=g_.current||{};if(!b&&!v)await K0();return await T_(),await Y_()}finally{B.inFlight=!1}},[Y_,T_,K0]),i0=M((G)=>{if($(G),G!=="connected"){w(null),U({text:"",totalLines:0}),u(""),f({text:"",totalLines:0}),l(null),Z_.current=null,n_();return}if(!Z2.current){Z2.current=!0,Y_();return}let{currentHashtag:B,searchQuery:A}=g_.current;if(!B&&!A)K0();Y_()},[n_,K0,Y_]),T0=M(async(G)=>{J(G),J0(null),await I0(G)},[I0]),B8=M(async()=>{J(null),Y(null),J0(null),await I0()},[I0]),q8=M(async(G)=>{if(!G||!G.trim())return;Y(G.trim()),J(null),J0(null);try{let B=await f6(G.trim());J0(B.results),O2(!1)}catch(B){console.error("Failed to search:",B),J0([])}},[]),z8=M(()=>{V(!0),Y(null),J(null),J0([])},[]),Q8=M(()=>{V(!1),Y(null),I0()},[I0]),p6=M(()=>{},[]),U8=M(async(G)=>{if(!G)return;let B=G.id,A=t0?.filter((v)=>v?.data?.thread_id===B&&v?.id!==B).length||0;if(A>0){if(!window.confirm(`Delete this message and its ${A} replies?`))return}let b=(v)=>{if(!v.length)return;B0((h)=>{let t=new Set(h);return v.forEach((H_)=>t.add(H_)),t}),setTimeout(()=>{if(Y2(()=>{J0((h)=>h?h.filter((t)=>!v.includes(t.id)):h)}),B0((h)=>{let t=new Set(h);return v.forEach((H_)=>t.delete(H_)),t}),I2.current)k2.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let v=await G8(B,A>0);if(v?.ids?.length)b(v.ids)}catch(v){let x=v?.message||"";if(A===0&&x.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let t=await G8(B,!0);if(t?.ids?.length)b(t.ids);return}console.error("Failed to delete post:",v),alert(`Failed to delete message: ${x}`)}},[t0,Y2]),$3=M(async()=>{try{let G=await v6();L_(W8(G));let B=G?.user||{};K2((b)=>{let v=typeof B.name==="string"&&B.name.trim()?B.name.trim():"You",x=typeof B.avatar_url==="string"?B.avatar_url.trim():null,h=typeof B.avatar_background==="string"&&B.avatar_background.trim()?B.avatar_background.trim():null;if(b.name===v&&b.avatar_url===x&&b.avatar_background===h)return b;return{name:v,avatar_url:x,avatar_background:h}});let A=(G?.agents||[]).find((b)=>b.id==="default");if(A?.model)F_(A.model);n(A?.name,A?.avatar_url)}catch(G){console.warn("Failed to load agents:",G)}try{let G=await _3();if(G)i_(G)}catch{}},[n]);m(()=>{$3();let G=H2("sidebarWidth",null),B=Number.isFinite(G)?Math.min(Math.max(G,160),600):280;if(b0.current=B,H0.current)H0.current.style.setProperty("--sidebar-width",`${B}px`)},[$3]);let H8=q0||C!==null,Z3=M((G)=>{if(!G||typeof G!=="object")return;let B=G.agent_id;if(!B)return;let{agent_name:A,agent_avatar:b}=G;if(!A&&b===void 0)return;let v=I_.current?.[B]||{id:B},x=v.name||null,h=v.avatar_url??v.avatarUrl??v.avatar??null,t=!1,H_=!1;if(A&&A!==v.name)x=A,H_=!0;if(b!==void 0){let l0=typeof b==="string"?b.trim():null,Y3=typeof h==="string"?h.trim():null,q2=l0||null;if(q2!==(Y3||null))h=q2,t=!0}if(!H_&&!t)return;if(L_((l0)=>{let q2={...l0[B]||{id:B}};if(H_)q2.name=x;if(t)q2.avatar_url=h;return{...l0,[B]:q2}}),B==="default")n(x,h,t?Date.now():null)},[n]),J3=M((G)=>{if(!G||typeof G!=="object")return;let B=G.user_name??G.userName,A=G.user_avatar??G.userAvatar,b=G.user_avatar_background??G.userAvatarBackground;if(B===void 0&&A===void 0&&b===void 0)return;K2((v)=>{let x=typeof B==="string"&&B.trim()?B.trim():v.name||"You",h=A===void 0?v.avatar_url:typeof A==="string"&&A.trim()?A.trim():null,t=b===void 0?v.avatar_background:typeof b==="string"&&b.trim()?b.trim():null;if(v.name===x&&v.avatar_url===h&&v.avatar_background===t)return v;return{name:x,avatar_url:h,avatar_background:t}})},[]),V1=M((G)=>{if(!G||typeof G!=="object")return;let B=G.model??G.current;if(B!==void 0)F_(B);if(G.thinking_level!==void 0)C_(G.thinking_level??null);if(G.supports_thinking!==void 0)w_(Boolean(G.supports_thinking));if(G.provider_usage!==void 0)y_(G.provider_usage??null)},[]),C2=M(()=>{R6().then((G)=>{if(G)V1(G)}).catch(()=>{})},[V1]),T_=M(()=>{g6().then((G)=>{let B=Q_.current,A=Array.isArray(G?.items)?G.items.map((b)=>({...b})).filter((b)=>!B.has(b.row_id)):[];if(A.length){K_((b)=>{if(b.length===A.length&&b.every((v,x)=>v.row_id===A[x].row_id))return b;return A});return}B.clear(),K_((b)=>b.length===0?b:[])}).catch(()=>{K_((G)=>G.length===0?G:[])})},[K_]),L8=M((G)=>{let B=G?.row_id;if(B==null)return;Q_.current.add(B),K_((A)=>A.filter((b)=>b?.row_id!==B)),u6(B).then(()=>{T_()}).catch((A)=>{console.warn("[queue] Failed to steer queued item:",A),V_("Failed to steer message","The queued message could not be sent as steering.","warning"),Q_.current.delete(B),T_()})},[T_,K_,V_]),F8=M((G)=>{let B=G?.row_id;if(B==null)return;Q_.current.add(B),K_((A)=>A.filter((b)=>b?.row_id!==B)),c6(B).then(()=>{T_()}).catch((A)=>{console.warn("[queue] Failed to remove queued item:",A),V_("Failed to remove message","The queued message could not be removed.","warning"),Q_.current.delete(B),T_()})},[T_,K_,V_]),E8=M((G)=>{if(!G||typeof G!=="object")return;if(G?.queued==="followup"||G?.queued==="steer"){T_();return}let B=G?.command;if(B&&typeof B==="object"&&(B?.queued_followup||B?.queued_steer))T_()},[T_]),N1=M(()=>{C2(),T_()},[C2,T_]);m(()=>{N1();let G=setInterval(()=>{C2(),T_()},60000);return()=>clearInterval(G)},[N1,C2,T_]);let O1=M((G,B)=>{let A=B?.turn_id;if(Z3(B),J3(B),G==="ui_theme"){j4(B);return}if(G?.startsWith("agent_")){if(!(G==="agent_draft_delta"||G==="agent_thought_delta"||G==="agent_draft"||G==="agent_thought"))j0()}if(G==="connected"){w(null),U({text:"",totalLines:0}),u(""),f({text:"",totalLines:0}),l(null),Z_.current=null,n_(),O8("web:default").then((t)=>{if(!t||t.status!=="active"||!t.data)return;let H_=t.data,l0=H_.turn_id||H_.turnId;if(l0)Z0(l0);if(s_({clearSilence:!0}),a0(H_),t.thought&&t.thought.text)i.current=t.thought.text,f({text:t.thought.text,totalLines:t.thought.totalLines||0});if(t.draft&&t.draft.text)d.current=t.draft.text,U({text:t.draft.text,totalLines:t.draft.totalLines||0})}).catch((t)=>{console.warn("Failed to fetch agent status:",t)});let{currentHashtag:x,searchQuery:h}=g_.current||{};if(!x&&!h)K0();N1();return}if(G==="agent_status"){if(B.type==="done"||B.type==="error"){if(A&&J_.current&&A!==J_.current)return;if(B.type==="done"){x0(A||J_.current);let{currentHashtag:x,searchQuery:h}=g_.current||{};if(!x&&!h)K0();if(B.context_usage)i_(B.context_usage)}if(r0.current=!1,n_(),Q_.current.clear(),T_(),U({text:"",totalLines:0}),u(""),f({text:"",totalLines:0}),l(null),B.type==="error")w({type:"error",title:B.title||"Agent error"}),setTimeout(()=>w(null),8000);else w(null)}else{if(A)Z0(A);if(s_({running:!0,clearSilence:!0}),B.type==="thinking")d.current="",i.current="",U({text:"",totalLines:0}),u(""),f({text:"",totalLines:0});r_.current=B,w((x)=>{if(x&&x.type===B.type&&x.title===B.title)return x;return B})}return}if(G==="agent_steer_queued"){if(A&&J_.current&&A!==J_.current)return;let x=A||J_.current;if(!x)return;v_.current=x,N_(x);return}if(G==="agent_followup_queued"){let x=B?.row_id,h=B?.content;if(x!=null&&typeof h==="string"&&h.trim())K_((t)=>{if(t.some((H_)=>H_?.row_id===x))return t;return[...t,{row_id:x,content:h,timestamp:B?.timestamp||null,thread_id:B?.thread_id??null}]});T_();return}if(G==="agent_followup_consumed"){let x=B?.row_id;if(x!=null)K_((h)=>h.filter((t)=>t.row_id!==x));T_(),K0();return}if(G==="agent_followup_removed"){let x=B?.row_id;if(x!=null)Q_.current.add(x),K_((h)=>h.filter((t)=>t.row_id!==x));T_();return}if(G==="agent_draft_delta"){if(A&&J_.current&&A!==J_.current)return;if(A&&!J_.current)Z0(A);if(s_({running:!0,clearSilence:!0}),B?.reset)d.current="";if(B?.delta)d.current+=B.delta;let x=Date.now();if(!Q0.current||x-Q0.current>=100){Q0.current=x;let h=d.current,t=e1(h);if(q_.current)U((H_)=>({text:H_?.text||"",totalLines:t,fullText:h}));else U({text:h,totalLines:t})}return}if(G==="agent_draft"){if(A&&J_.current&&A!==J_.current)return;if(A&&!J_.current)Z0(A);s_({running:!0,clearSilence:!0});let x=B.text||"",h=B.mode||(B.kind==="plan"?"replace":"append"),t=Number.isFinite(B.total_lines)?B.total_lines:x?x.replace(/\r\n/g,`
`).split(`
`).length:0;if(B.kind==="plan")if(h==="replace")u(x);else u((H_)=>(H_||"")+x);else if(!q_.current)d.current=x,U({text:x,totalLines:t});return}if(G==="agent_thought_delta"){if(A&&J_.current&&A!==J_.current)return;if(A&&!J_.current)Z0(A);if(s_({running:!0,clearSilence:!0}),B?.reset)i.current="";if(typeof B?.delta==="string")i.current+=B.delta;let x=Date.now();if(W_.current&&(!U0.current||x-U0.current>=100)){U0.current=x;let h=i.current;f((t)=>({text:t?.text||"",totalLines:e1(h),fullText:h}))}return}if(G==="agent_thought"){if(A&&J_.current&&A!==J_.current)return;if(A&&!J_.current)Z0(A);s_({running:!0,clearSilence:!0});let x=B.text||"",h=Number.isFinite(B.total_lines)?B.total_lines:x?x.replace(/\r\n/g,`
`).split(`
`).length:0;if(!W_.current)i.current=x,f({text:x,totalLines:h});return}if(G==="agent_request"){if(console.log("Agent request:",B),A&&J_.current&&A!==J_.current)return;if(A)Z0(A);s_({running:!0,clearSilence:!0}),l(B),Z_.current=B;return}if(G==="agent_request_timeout"){if(console.log("Agent request timeout:",B),A&&J_.current&&A!==J_.current)return;l(null),Z_.current=null,n_(),w({type:"error",title:"Permission request timed out"});return}if(G==="model_changed"){if(B?.model!==void 0)F_(B.model);if(B?.thinking_level!==void 0)C_(B.thinking_level??null);if(B?.supports_thinking!==void 0)w_(Boolean(B.supports_thinking));_3().then((x)=>{if(x)i_(x)}).catch(()=>{});return}if(G==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:B}));return}let{currentHashtag:b,searchQuery:v}=g_.current;if(G==="agent_response")K(),M0.current={post:B,turnId:J_.current};if(!b&&!v&&(G==="new_post"||G==="agent_response"))J0((x)=>{if(!x)return[B];if(x.some((h)=>h.id===B.id))return x;return[...x,B]}),w0.current?.();if(G==="interaction_updated")J0((x)=>{if(!x)return x;if(!x.some((h)=>h.id===B.id))return x;return x.map((h)=>h.id===B.id?B:h)});if(G==="interaction_deleted"){let x=B?.ids||[];if(x.length){Y2(()=>{J0((H_)=>H_?H_.filter((l0)=>!x.includes(l0.id)):H_)});let{currentHashtag:h,searchQuery:t}=g_.current;if(I2.current&&!h&&!t)k2.current?.({preserveScroll:!0,preserveMode:"top"})}}},[n_,j0,k2,s_,x0,Y2,K0,K,Z0,a0,Z3,J3,C2,T_,K_]);m(()=>{if(typeof window>"u")return;let G=window.__PICLAW_TEST_API||{};return G.emit=O1,G.reset=()=>{K(),n_(),w(null),U({text:"",totalLines:0}),u(""),f({text:"",totalLines:0}),l(null)},G.finalize=()=>s(),window.__PICLAW_TEST_API=G,()=>{if(window.__PICLAW_TEST_API===G)window.__PICLAW_TEST_API=void 0}},[n_,s,O1,K]),t4({handleSseEvent:O1,handleConnectionStatusChange:i0,loadPosts:I0}),m(()=>{if(!t0||t0.length===0)return;let G=location.hash;if(!G||!G.startsWith("#msg-"))return;let B=G.slice(5);p0(B),history.replaceState(null,"",location.pathname+location.search)},[t0,p0]);let B1=C!==null;m(()=>{if(_!=="connected")return;let B=setInterval(()=>{let{currentHashtag:A,searchQuery:b}=g_.current||{},v=!A&&!b;if(B1){if(v)K0();T_(),Y_(),c()}else{if(v)K0();Y_(),c()}},B1?15000:60000);return()=>clearInterval(B)},[_,B1,Y_,c,T_,K0]);let D8=M(()=>{v0((G)=>!G)},[]);m(()=>{if(!c_)return;if(typeof window>"u")return;let G=H0.current;if(!G)return;if(!u0.current){let B=H2("editorWidth",null),A=b0.current||280;u0.current=Number.isFinite(B)?B:A}if(G.style.setProperty("--editor-width",`${u0.current}px`),!X0.current){let B=H2("dockHeight",null);X0.current=Number.isFinite(B)?B:200}G.style.setProperty("--dock-height",`${X0.current}px`)},[c_]);let B2=p_.getDockPanes().length>0,[q1,k8]=R(!1),T2=M(()=>k8((G)=>!G),[]);m(()=>{if(!B2)return;let G=(B)=>{if(B.ctrlKey&&B.key==="`")B.preventDefault(),T2()};return document.addEventListener("keydown",G),()=>document.removeEventListener("keydown",G)},[T2,B2]);let C8=Boolean($_&&$_===(C?.turn_id||X_));return Q`
        <div class=${`app-shell${d_?"":" workspace-collapsed"}${c_?" editor-open":""}`} ref=${H0}>
            <${d4}
                onFileSelect=${O_}
                visible=${d_}
                active=${d_||c_}
                onOpenEditor=${x_}
            />
            <button
                class=${`workspace-toggle-tab${d_?" open":" closed"}`}
                onClick=${D8}
                title=${d_?"Hide workspace":"Show workspace"}
                aria-label=${d_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${q} onTouchStart=${F}></div>
            ${c_&&Q`
                <div class="editor-pane-container">
                    <${r4}
                        tabs=${k0}
                        activeId=${m_}
                        onActivate=${R0}
                        onClose=${$2}
                        onCloseOthers=${j2}
                        onCloseAll=${C0}
                        onTogglePin=${y0}
                        onTogglePreview=${Y0}
                        previewTabs=${e_}
                        onToggleDock=${B2?T2:void 0}
                        dockVisible=${B2&&q1}
                    />
                    <div class="editor-pane-host" ref=${A0}></div>
                    ${m_&&e_.has(m_)&&Q`
                        <${a4}
                            getContent=${()=>R_.current?.getContent?.()}
                            path=${m_}
                            onClose=${()=>Y0(m_)}
                        />
                    `}
                    ${B2&&q1&&Q`<div class="dock-splitter" onMouseDown=${o} onTouchStart=${a}></div>`}
                    ${B2&&Q`<div class=${`dock-panel${q1?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${T2} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
                                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                    <line x1="4" y1="12" x2="12" y2="4"/>
                                    <polyline points="4 4 12 4 12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="dock-panel-body">
                            <div class="terminal-placeholder">Terminal integration pending - xterm.js + WebSocket</div>
                        </div>
                    </div>`}
                </div>
                <div class="editor-splitter" onMouseDown=${k} onTouchStart=${g}></div>
            `}
            <div class="container">
                ${X&&j8()&&Q`<div class="search-results-spacer"></div>`}
                ${(Z||X)&&Q`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${B8}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${Z?`#${Z}`:`Search: ${X}`}</span>
                    </div>
                `}
                <${w4}
                    posts=${t0}
                    hasMore=${K1}
                    onLoadMore=${G1}
                    timelineRef=${$0}
                    onHashtagClick=${T0}
                    onMessageRef=${S0}
                    onScrollToMessage=${p0}
                    onFileRef=${W0}
                    onPostClick=${void 0}
                    onDeletePost=${U8}
                    emptyMessage=${Z?`No posts with #${Z}`:X?`No results for "${X}"`:void 0}
                    agents=${z_}
                    user=${d0}
                    reverse=${!(X&&!Z)}
                    removingPostIds=${N0}
                    searchQuery=${X}
                />
                <${E4}
                    status=${C}
                    draft=${T}
                    plan=${P}
                    thought=${y}
                    pendingRequest=${p}
                    intent=${E}
                    turnId=${X_}
                    steerQueued=${C8}
                    onPanelToggle=${O0}
                />
                <${e3}
                    onPost=${()=>{I0(),N2()}}
                    onFocus=${N2}
                    searchMode=${j}
                    onSearch=${q8}
                    onEnterSearch=${z8}
                    onExitSearch=${Q8}
                    fileRefs=${N}
                    onRemoveFileRef=${D_}
                    onClearFileRefs=${l_}
                    messageRefs=${W}
                    onRemoveMessageRef=${G2}
                    onClearMessageRefs=${V2}
                    activeEditorPath=${m_}
                    onAttachEditorFile=${h0}
                    onOpenFilePill=${W0}
                    followupQueueCount=${P0}
                    followupQueueItems=${M_}
                    onInjectQueuedFollowup=${L8}
                    onRemoveQueuedFollowup=${F8}
                    onMessageResponse=${E8}
                    isAgentActive=${H8}
                    activeModel=${A_}
                    modelUsage=${b_}
                    thinkingLevel=${U_}
                    supportsThinking=${u_}
                    contextUsage=${h_}
                    notificationsEnabled=${D0}
                    notificationPermission=${S}
                    onToggleNotifications=${__}
                    onModelChange=${F_}
                    onModelStateChange=${V1}
                />
                <${k4} status=${_} />
                <${D4}
                    request=${p}
                    onRespond=${()=>{l(null),Z_.current=null}}
                />
            </div>
        </div>
    `}M3(Q`<${h6} />`,document.getElementById("app"));

//# debugId=1A39000BFD1D5DF364756E2164756E21
//# sourceMappingURL=app.bundle.js.map

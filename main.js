(()=>{"use strict";var t=document.querySelector("#card-template").content;function e(e,n,o,c,a){var u=t.querySelector(".card").cloneNode(!0),i=u.querySelector(".card__image"),l=u.querySelector(".card__title"),s=u.querySelector(".card__delete-button"),d=u.querySelector(".card__like-button"),p=u.querySelector(".card__like-count");return i.src=e.link,i.alt=e.name,l.textContent=e.name,e.likes.some((function(t){return t._id===n}))&&r(d),e.owner._id!==n&&s.classList.add("card__delete-button-visible"),p.textContent=e.likes.length,s.addEventListener("click",(function(){return o(u,e._id)})),d.addEventListener("click",(function(){return c(d.classList.contains("card__like-button_is-active"),e._id,d,p)})),i.addEventListener("click",a),u}function n(t,e){t.textContent=e}function r(t){t.classList.toggle("card__like-button_is-active")}function o(t){if("Escape"===t.key){var e=document.querySelector(".popup_is-opened");e&&u(e)}}function c(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close"))&&u(t.currentTarget)}function a(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function u(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}var i={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},l=function(t,e,n){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},s=function(t,e,n){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?l(t,e,n):function(t,e,n,r){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(t,e,e.validationMessage,n)},d=function(t,e,n){p(t)?f(e,n):(e.disabled=!1,e.classList.remove(n.inactiveButtonClass))},p=function(t){return t.some((function(t){return!t.validity.valid}))},f=function(t,e){t.disabled=!0,t.classList.add(e.inactiveButtonClass)},_={baseUrl:"https://nomoreparties.co/v1/wff-cohort-17",headers:{authorization:"a10858c0-a82a-4b67-a8a1-00223439122d","Content-Type":"application/json"}},m=function(t,e,n){return fetch(t,{method:e,headers:_.headers,body:JSON.stringify(n)}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))},y=function(t){return m("".concat(_.baseUrl,"/cards/").concat(t),"DELETE")},v=function(t){return m("".concat(_.baseUrl,"/cards/likes/").concat(t),"PUT")},S=function(t){return m("".concat(_.baseUrl,"/cards/likes/").concat(t),"DELETE")};function b(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var h=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),g=document.forms.namedItem("edit-profile"),E=document.querySelector(".popup__input_type_name"),L=document.querySelector(".popup__input_type_description"),C=document.querySelector(".profile__edit-button"),k=g.querySelector(".popup__button"),A=document.querySelector(".profile__add-button"),x=document.querySelector(".popup__input_type_url"),w=document.querySelector(".popup__input_type_card-name"),T=document.forms.namedItem("new-place"),U=T.querySelector(".popup__button"),I=document.querySelector(".profile__avatar-edit-button"),j=document.querySelector(".popup_type_edit-avatar"),P=document.querySelector(".popup__input_new_avatar_url"),B=document.forms.namedItem("avatar"),D=B.querySelector(".popup__button"),O=document.querySelector(".profile__image"),M=document.querySelector(".popup_type_image"),G=M.querySelector(".popup__image"),H=M.querySelector(".popup__caption"),N=document.querySelector(".places__list"),V=document.querySelector(".popup_type_edit"),z=document.querySelector(".popup_type_new-card"),J=Array.from(document.querySelectorAll(".popup"));function $(t,e){y(e).then((function(){t.remove()})).catch((function(t){console.log(t)}))}function F(t,e,o,c){t?S(e).then((function(t){n(c,t.likes.length),r(o)})).catch((function(t){console.log(t)})):v(e).then((function(t){n(c,t.likes.length),r(o)})).catch((function(t){console.log(t)}))}function K(t){G.src=t.target.src,G.alt=t.target.alt,H.textContent=t.target.alt,a(M)}function Q(t,e){e.textContent=t?"Сохранить...":"Сохранить"}C.addEventListener("click",(function(){a(V),E.value=h.textContent,L.value=q.textContent,function(t,e){Array.from(t.querySelectorAll(e.inputSelector)).forEach((function(n){l(t,n,e)}))}(V,i)})),A.addEventListener("click",(function(){a(z)})),I.addEventListener("click",(function(){a(j)})),g.addEventListener("submit",(function(t){!function(t){var e,n;t.preventDefault(),Q(!0,k),(e=E.value,n=L.value,m("".concat(_.baseUrl,"/users/me"),"PATCH",{name:e,about:n})).then((function(t){h.textContent=t.name,q.textContent=t.about,u(V)})).catch((function(t){console.log(t)})).finally((function(){Q(!1,k)}))}(t)})),T.addEventListener("submit",(function(t){!function(t){var n,r;t.preventDefault(),Q(!0,U),(n=w.value,r=x.value,m("".concat(_.baseUrl,"/cards"),"POST",{name:n,link:r})).then((function(n){var r=e(n,n.owner._id,$,F,K);N.prepend(r),u(z),t.target.reset()})).catch((function(t){console.log(t)})).finally((function(){Q(!1,U)}))}(t)})),B.addEventListener("submit",(function(t){!function(t){var e;t.preventDefault(),Q(!0,D),(e=P.value,m("".concat(_.baseUrl,"/users/me/avatar"),"PATCH",{avatar:e})).then((function(t){O.style.backgroundImage="url(".concat(t.avatar,")"),u(j)})).catch((function(t){console.error("Ошибка: ".concat(t))})).finally((function(){Q(!1,D)}))}(t)})),J.forEach((function(t){t.addEventListener("click",c)})),function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){!function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);d(n,r,e),t.addEventListener("reset",(function(){return f(r,e)})),n.forEach((function(o){o.addEventListener("input",(function(){s(t,o,e),d(n,r,e)}))}))}(e,t)}))}(i),Promise.all([m("".concat(_.baseUrl,"/cards"),"GET"),m("".concat(_.baseUrl,"/users/me"),"GET")]).then((function(t){var n,r,o=(r=2,function(t){if(Array.isArray(t))return t}(n=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==e);i=!0);}catch(t){l=!0,o=t}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(n,r)||function(t,e){if(t){if("string"==typeof t)return b(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(t,e):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];h.textContent=a.name,q.textContent=a.about,O.style.backgroundImage="url(".concat(a.avatar,")"),c.forEach((function(t){var n=e(t,a._id,$,F,K);N.append(n)}))})).catch((function(t){console.log(t)}))})();
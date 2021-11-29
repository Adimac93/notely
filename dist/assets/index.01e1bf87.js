import{d as g,c as i,a as n,w as p,v as m,t as u,F as f,r as h,o as a,b as v,e as b}from"./vendor.3692b33c.js";const k=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function d(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerpolicy&&(l.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?l.credentials="include":o.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=d(o);fetch(o.href,l)}};k();var N=(e,t)=>{for(const[d,r]of t)e[d]=r;return e};const S=g({name:"app",data(){var e;return{title:"",text:"",notes:JSON.parse((e=localStorage.getItem("notes"))!=null?e:"[]"),maxChars:1e3,currentChars:0}},methods:{playSound(e){if(e){var t=new Audio(e);t.volume=.05,t.play()}},saveNote(){this.title!=""&&this.text!=""&&(this.notes.unshift({title:this.title,text:this.text}),localStorage.setItem("notes",JSON.stringify(this.notes)))},clearFields(){this.title="",this.text=""},displayNote(e){this.title=this.notes[e].title,this.text=this.notes[e].text},delNote(e){this.notes.splice(e,1),localStorage.setItem("notes",JSON.stringify(this.notes))}}}),_=n("header",null,null,-1),w={class:"grid justify-items-center justify-center mx-10"},C=n("label",{class:"font-bold pt-5"},"Notes",-1),$=n("br",null,null,-1),x=n("br",null,null,-1),F={class:"p-2"},O={class:"inline-flex"},L={key:1,class:"note-save p-1 w-20 bg-gray-100 rounded-md opacity-70 rounded-r-none"},A=n("br",null,null,-1),B={class:"note-view items-center cursor-pointer"},D=["onClick","onDblclick"],V={class:"font-bold"};function j(e,t,d,r,o,l){return a(),i(f,null,[_,n("main",null,[n("div",w,[C,$,p(n("input",{type:"text",class:"note-content p-2 border-2 rounded-md","onUpdate:modelValue":t[0]||(t[0]=s=>e.title=s),placeholder:"Title...",onFocus:t[1]||(t[1]=s=>e.playSound("mouse_click.mp3"))},null,544),[[m,e.title]]),x,p(n("textarea",{class:"p-2 border-2 rounded-md",rows:"5",cols:"50","onUpdate:modelValue":t[2]||(t[2]=s=>e.text=s),placeholder:"Place for your note \u21B4",onFocus:t[3]||(t[3]=s=>e.playSound("mouse_click.mp3"))},null,544),[[m,e.text]]),n("label",F,u(e.text.length)+" / "+u(e.maxChars),1),n("div",O,[e.text.length<=e.maxChars?(a(),i("button",{key:0,class:"note-save p-1 w-20 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-100 rounded-r-none",onClick:t[4]||(t[4]=s=>(e.saveNote(),e.playSound("mouse_click.mp3")))},"Save")):(a(),i("button",L,"Save")),n("button",{class:"note-save p-1 w-20 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-100 rounded-l-none",onClick:t[5]||(t[5]=s=>(e.clearFields(),e.playSound("mouse_click.mp3")))},"Clear")]),A,n("ul",B,[(a(!0),i(f,null,h(e.notes,(s,c)=>(a(),i("li",{class:"note text-center break-words max-w-6xl hover:bg-gray-100 active:bg-gray-200 rounded-md",key:s.title,onClick:y=>e.displayNote(c),onDblclick:y=>e.delNote(c)},[n("a",V,u(s.title),1),v(" - "+u(s.text),1)],40,D))),128))])])])],64)}var I=N(S,[["render",j]]);b(I).mount("#app");
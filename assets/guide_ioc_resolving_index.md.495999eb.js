import{_ as e,c as r,o as i,a}from"./app.8aee9f9c.js";const u=JSON.parse('{"title":"Resolving Services","description":"","frontmatter":{},"headers":[],"relativePath":"guide/ioc/resolving/index.md"}'),t={name:"guide/ioc/resolving/index.md"},o=a('<h1 id="resolving-services" tabindex="-1">Resolving Services <a class="header-anchor" href="#resolving-services" aria-hidden="true">#</a></h1><p>This will be the easy part of interacting with Lamar. During application execution, you will need to <em>resolve</em> the services you previously registered in the container. When you ask Lamar to resolve a service, Lamar either creates a new object instance or finds the previously built object for the correct <a href="/lamar/guide/ioc/lifetime.html">service lifetimes</a>.</p><p>While in many systems you will probably only resolve the default service of a type or a named instance of a service, there are far more ways to resolve services exposed by StructureMap. The <code>IContainer</code> interface acts as a <a href="http://en.wikipedia.org/wiki/Service_locator_pattern" target="_blank" rel="noreferrer">Service Locator</a> to build and resolve configured services on demand.</p>',3),s=[o];function n(c,l,d,_,h,v){return i(),r("div",null,s)}const f=e(t,[["render",n]]);export{u as __pageData,f as default};

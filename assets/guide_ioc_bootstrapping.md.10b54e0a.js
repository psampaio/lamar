import{_ as n,c as a,o as s,a as t}from"./app.35d600bb.js";const m='{"title":"Bootstrapping a Container","description":"","frontmatter":{},"relativePath":"guide/ioc/bootstrapping.md","lastUpdated":1644423598331}',e={},o=t(`<h1 id="bootstrapping-a-container" tabindex="-1">Bootstrapping a Container <a class="header-anchor" href="#bootstrapping-a-container" aria-hidden="true">#</a></h1><p>To configure and bootstrap a Lamar container, you have a couple options. You can create a <code>Container</code> object with inline registrations:</p><p><a id="snippet-sample_bootstrap-inline"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span>
<span class="token punctuation">{</span>
    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddTransient</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IClock<span class="token punctuation">,</span> Clock<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Samples/Bootstrapping.cs#L18-L23" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_bootstrap-inline" title="Start of snippet">anchor</a></sup></p><p>Or pass in a configured <code>ServiceRegistry</code> object as shown below:</p><p><a id="snippet-sample_bootstrap-with-registry"></a></p><div class="language-cs"><pre><code><span class="token comment">// Create a Lamar.ServiceRegistry object</span>
<span class="token comment">// and define your service registrations</span>
<span class="token class-name"><span class="token keyword">var</span></span> registry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ServiceRegistry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Use ASP.Net Core style registrations</span>
<span class="token comment">// for basic functionality</span>
registry<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddSingleton</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IClock<span class="token punctuation">,</span> Clock<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
registry<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddTransient</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">,</span> RedWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Or use StructureMap style registration syntax</span>
<span class="token comment">// as an alternative or to use more advanced usage</span>
registry<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IClockFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ClockFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>registry<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Samples/Bootstrapping.cs#L32-L50" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_bootstrap-with-registry" title="Start of snippet">anchor</a></sup></p><p>Lamar&#39;s <code>ServiceRegistry</code> supports a subset of StructureMap&#39;s old <code>Registry</code> class and should be used as a replacement when replacing StructureMap with Lamar. We renamed the class to disambiguate the name from the many other <code>Registry</code> classes in the CLR. <code>ServiceRegistry</code> implements the <a href="https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.iservicecollection?view=aspnetcore-2.0" target="_blank" rel="noopener noreferrer">IServiceCollection</a> interface from <a href="http://ASP.Net" target="_blank" rel="noopener noreferrer">ASP.Net</a> Core. You can also create a Lamar container by passing in an instance of <code>IServiceCollection</code> like you&#39;d get within an <a href="http://ASP.Net" target="_blank" rel="noopener noreferrer">ASP.Net</a> Core application.</p>`,10),p=[o];function c(i,r,l,u,k,d){return s(),a("div",null,p)}var h=n(e,[["render",c]]);export{m as __pageData,h as default};

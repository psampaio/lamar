import{_ as n,c as s,o as a,a as t}from"./app.35d600bb.js";const g='{"title":"WhatDoIHave()","description":"","frontmatter":{},"headers":[{"level":2,"title":"Filtering WhatDoIHave()","slug":"filtering-whatdoihave"},{"level":2,"title":"WhatDoIHave() under ASP.Net Core","slug":"whatdoihave-under-asp-net-core"}],"relativePath":"guide/ioc/diagnostics/what-do-i-have.md","lastUpdated":1644423598339}',p={},e=t(`<h1 id="whatdoihave" tabindex="-1">WhatDoIHave() <a class="header-anchor" href="#whatdoihave" aria-hidden="true">#</a></h1><p>The <code>IContainer.WhatDoIHave()</code> method can give you a quick textual report of the current configuration of a running <code>Container</code>:</p><p><a id="snippet-sample_whatdoihave-simple"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> Container<span class="token punctuation">.</span><span class="token function">Empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> report <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">WhatDoIHave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>report<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Diagnostics/WhatDoIHave_smoke_tests.cs#L22-L27" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_whatdoihave-simple" title="Start of snippet">anchor</a></sup><a id="snippet-sample_whatdoihave-simple-1"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> report <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">WhatDoIHave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Debug<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>report<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/WhatDoIHave_Smoke_Tester.cs#L14-L19" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_whatdoihave-simple-1" title="Start of snippet">anchor</a></sup></p><p>Enough talk, say you have a <code>Container</code> with this configuration:</p><p><a id="snippet-sample_what_do_i_have_container"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span>
<span class="token punctuation">{</span>
    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Hemi<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Named</span><span class="token punctuation">(</span><span class="token string">&quot;The Hemi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Add</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>VEight<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Named</span><span class="token punctuation">(</span><span class="token string">&quot;V8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Add</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>FourFiftyFour<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Add</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>StraightSix<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Scoped</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Rotary</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Named</span><span class="token punctuation">(</span><span class="token string">&quot;Rotary&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> c<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>PluginElectric<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">InlineFour</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">UseIfNone</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>VTwelve<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Diagnostics/WhatDoIHave_smoke_tests.cs#L33-L49" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_what_do_i_have_container" title="Start of snippet">anchor</a></sup><a id="snippet-sample_what_do_i_have_container-1"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span>
<span class="token punctuation">{</span>
    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Hemi<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Named</span><span class="token punctuation">(</span><span class="token string">&quot;The Hemi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Add</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>VEight<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Named</span><span class="token punctuation">(</span><span class="token string">&quot;V8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Add</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>FourFiftyFour<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">AlwaysUnique</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Add</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>StraightSix<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">LifecycleIs</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ThreadLocalStorageLifecycle<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Rotary</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Named</span><span class="token punctuation">(</span><span class="token string">&quot;Rotary&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> c<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>PluginElectric<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">InlineFour</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">UseIfNone</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>VTwelve<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IEngine<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>MissingNamedInstanceIs<span class="token punctuation">.</span><span class="token function">ConstructedBy</span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NamedEngine</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>RequestedName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/WhatDoIHave_Smoke_Tester.cs#L25-L42" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_what_do_i_have_container-1" title="Start of snippet">anchor</a></sup></p><p>If you were to run the code below against this <code>Container</code>:</p><p><a id="snippet-sample_whatdoihave_everything"></a></p><div class="language-cs"><pre><code>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token function">WhatDoIHave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Diagnostics/WhatDoIHave_smoke_tests.cs#L51-L53" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_whatdoihave_everything" title="Start of snippet">anchor</a></sup><a id="snippet-sample_whatdoihave_everything-1"></a></p><div class="language-cs"><pre><code>Debug<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token function">WhatDoIHave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/WhatDoIHave_Smoke_Tester.cs#L44-L46" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_whatdoihave_everything-1" title="Start of snippet">anchor</a></sup></p><p>you would get the output shown in <a href="https://gist.github.com/jeremydmiller/7eae90eda21cc47ed24fa30623f9feb2" target="_blank" rel="noopener noreferrer">this gist</a>.</p><p>If you&#39;re curious, all the raw code for this example is in <a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Diagnostics/WhatDoIHave_smoke_tests.cs" target="_blank" rel="noopener noreferrer">here</a>.</p><h2 id="filtering-whatdoihave" tabindex="-1">Filtering WhatDoIHave() <a class="header-anchor" href="#filtering-whatdoihave" aria-hidden="true">#</a></h2><p>Filtering the <code>WhatDoIHave()</code> results can be done in these ways:</p><p><a id="snippet-sample_whatdoihave-filtering"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> Container<span class="token punctuation">.</span><span class="token function">Empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Filter by the Assembly of the Service Type</span>
<span class="token class-name"><span class="token keyword">var</span></span> byAssembly <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">WhatDoIHave</span><span class="token punctuation">(</span><span class="token named-parameter punctuation">assembly</span><span class="token punctuation">:</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">IWidget</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Assembly<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Only report on the specified Service Type</span>
<span class="token class-name"><span class="token keyword">var</span></span> byServiceType <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">WhatDoIHave</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">IWidget</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Filter to Service Type&#39;s in the named namespace</span>
<span class="token comment">// The &#39;IsInNamespace&#39; test will include child namespaces</span>
<span class="token class-name"><span class="token keyword">var</span></span> byNamespace <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">WhatDoIHave</span><span class="token punctuation">(</span>@<span class="token keyword">namespace</span><span class="token punctuation">:</span> <span class="token string">&quot;StructureMap.Testing.Widget&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Filter by a case insensitive string.Contains() match</span>
<span class="token comment">// against the Service Type name</span>
<span class="token class-name"><span class="token keyword">var</span></span> byType <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">WhatDoIHave</span><span class="token punctuation">(</span><span class="token named-parameter punctuation">typeName</span><span class="token punctuation">:</span> <span class="token string">&quot;Widget&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Diagnostics/WhatDoIHave_smoke_tests.cs#L108-L124" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_whatdoihave-filtering" title="Start of snippet">anchor</a></sup><a id="snippet-sample_whatdoihave-filtering-1"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Filter by the Assembly of the Plugin Type</span>
<span class="token class-name"><span class="token keyword">var</span></span> byAssembly <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">WhatDoIHave</span><span class="token punctuation">(</span><span class="token named-parameter punctuation">assembly</span><span class="token punctuation">:</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">IWidget</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Only report on the specified Plugin Type</span>
<span class="token class-name"><span class="token keyword">var</span></span> byPluginType <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">WhatDoIHave</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">IWidget</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Filter to Plugin Type&#39;s in the named namespace</span>
<span class="token comment">// The &#39;IsInNamespace&#39; test will include child namespaces</span>
<span class="token class-name"><span class="token keyword">var</span></span> byNamespace <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">WhatDoIHave</span><span class="token punctuation">(</span>@<span class="token keyword">namespace</span><span class="token punctuation">:</span> <span class="token string">&quot;StructureMap.Testing.Widget&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Filter by a case insensitive string.Contains() match</span>
<span class="token comment">// against the Plugin Type name</span>
<span class="token class-name"><span class="token keyword">var</span></span> byType <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">WhatDoIHave</span><span class="token punctuation">(</span><span class="token named-parameter punctuation">typeName</span><span class="token punctuation">:</span> <span class="token string">&quot;Widget&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/WhatDoIHave_Smoke_Tester.cs#L159-L175" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_whatdoihave-filtering-1" title="Start of snippet">anchor</a></sup></p><h2 id="whatdoihave-under-asp-net-core" tabindex="-1">WhatDoIHave() under <a href="http://ASP.Net" target="_blank" rel="noopener noreferrer">ASP.Net</a> Core <a class="header-anchor" href="#whatdoihave-under-asp-net-core" aria-hidden="true">#</a></h2><p>You can call <code>WhatDoIHave()</code> and <code>WhatDidIScan()</code> when running in <a href="http://ASP.Net" target="_blank" rel="noopener noreferrer">ASP.Net</a> Core like so:</p><p><a id="snippet-sample_whatdoihave-aspnetcore"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StartupWithDiagnostics</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Take in Lamar&#39;s ServiceRegistry instead of IServiceCollection</span>
    <span class="token comment">// as your argument, but fear not, it implements IServiceCollection</span>
    <span class="token comment">// as well</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ConfigureContainer</span><span class="token punctuation">(</span><span class="token class-name">ServiceRegistry</span> services<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Supports ASP.Net Core DI abstractions</span>
        services<span class="token punctuation">.</span><span class="token function">AddMvc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        services<span class="token punctuation">.</span><span class="token function">AddLogging</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Also exposes Lamar specific registrations</span>
        <span class="token comment">// and functionality</span>
        services<span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span>s <span class="token operator">=&gt;</span>
        <span class="token punctuation">{</span>
            s<span class="token punctuation">.</span><span class="token function">TheCallingAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            s<span class="token punctuation">.</span><span class="token function">WithDefaultConventions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Configure</span><span class="token punctuation">(</span><span class="token class-name">IApplicationBuilder</span> app<span class="token punctuation">,</span> <span class="token class-name">IHostingEnvironment</span> env<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span><span class="token function">IsDevelopment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token punctuation">(</span>IContainer<span class="token punctuation">)</span>app<span class="token punctuation">.</span>ApplicationServices<span class="token punctuation">;</span>
            <span class="token comment">// or write to your own Logger</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token function">WhatDidIScan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token function">WhatDoIHave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        app<span class="token punctuation">.</span><span class="token function">UseMvc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.AspNetCoreTests/Samples/StartUp.cs#L63-L97" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_whatdoihave-aspnetcore" title="Start of snippet">anchor</a></sup></p>`,33),o=[e];function c(u,i,l,k,r,m){return a(),s("div",null,o)}var h=n(p,[["render",c]]);export{g as __pageData,h as default};

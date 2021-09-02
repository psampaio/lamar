import{o as n,c as s,a,b as t}from"./app.21b67795.js";const e='{"title":"Working with Enumerable Types","description":"","frontmatter":{},"headers":[{"level":2,"title":"Sample Usage: Validation Rules","slug":"sample-usage-validation-rules"}],"relativePath":"guide/ioc/working-with-enumerable-types.md","lastUpdated":1630571332881}',p={},o=t('<h1 id="working-with-enumerable-types"><a class="header-anchor" href="#working-with-enumerable-types" aria-hidden="true">#</a> Working with Enumerable Types</h1><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Be aware that the Lamar registrations and execution plans for enumerable types that are not explicitly registered are created on the first usage <strong>and will not appear in the WhatDoIHave() output until they are used as either a dependency for another service or directly through a service location call for the first time</strong>. This is normal, as expected behavior.</p></div><p>While you can certainly use <em>any</em> <code>IEnumerable</code> type as a service type with your own explicit configuration, Lamar has <em>some</em> built in support for these specific enumerable types:</p><ol><li><code>IEnumerable&lt;T&gt;</code></li><li><code>IList&lt;T&gt;</code></li><li><code>List&lt;T&gt;</code></li><li><code>ICollection&lt;T&gt;</code></li><li><code>T[]</code></li></ol><p>Specifically, if you request one of these types either directly with <code>GetInstance&lt;IList&lt;IWidget&gt;&gt;()</code> or as a declared dependency in a constructor or setter (<code>new WidgetUser(IList&lt;IWidgets&gt; widgets)</code> for example) and you have no specific registration for the enumerable types, Lamar has a built in policy to return all the registered instances of <code>IWidget</code> <strong>in the exact order that the registrations were made to Lamar</strong>.</p><p>Note, if there are not any registrations for whatever <code>T</code> is, you&#39;ll get an empty enumeration.</p><p>Here&#39;s an acceptance test from the Lamar codebase that demonstrates this:</p>',7),c=t('<p><a id="snippet-sample_enumerablefamilypolicy_in_action"></a></p><div class="language-cs"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>\n<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">collection_types_are_all_possible_by_default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">// NOTE that we do NOT make any explicit registration of</span>\n    <span class="token comment">// IList&lt;IWidget&gt;, IEnumerable&lt;IWidget&gt;, ICollection&lt;IWidget&gt;, or IWidget[]</span>\n    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>\n    <span class="token punctuation">{</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Add</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>AWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Add</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>BWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Add</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>CWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// IList&lt;T&gt;</span>\n    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IList<span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">ShouldHaveTheSameElementsAs</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">AWidget</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">BWidget</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">CWidget</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// ICollection&lt;T&gt;</span>\n    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ICollection<span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">ShouldHaveTheSameElementsAs</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">AWidget</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">BWidget</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">CWidget</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// Array of T</span>\n    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">ShouldHaveTheSameElementsAs</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">AWidget</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">BWidget</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">CWidget</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Acceptance/enumerable_instances.cs#L10-L39" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_enumerablefamilypolicy_in_action" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>And another showing how you can override this behavior with explicit configuration:</p>',4),l=t('<p><a id="snippet-sample_explicit-enumeration-behavior"></a></p><div class="language-cs"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>\n<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">override_enumeration_behavior</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>\n    <span class="token punctuation">{</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Add</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>AWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Add</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>BWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Add</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>CWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// Explicit registration should have precedence over the default</span>\n        <span class="token comment">// behavior</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">IWidget<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DefaultWidget</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">Single</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ShouldBeOfType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DefaultWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Acceptance/enumerable_instances.cs#L41-L60" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_explicit-enumeration-behavior" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><h2 id="sample-usage-validation-rules"><a class="header-anchor" href="#sample-usage-validation-rules" aria-hidden="true">#</a> Sample Usage: Validation Rules</h2><p>One of the ways that I have used the built in <code>IEnumerable</code> handling is for extensible validation rules. Say that we are building a system to process <code>IWidget</code> objects. As part of processing a widget, we first need to validate that widget with a series of rules that we might model with the <code>IWidgetValidator</code> interface shown below and used within the main <code>WidgetProcessor</code> class:</p>',5),i=t('<p><a id="snippet-sample_iwidgetvalidator-enumerable"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IWidgetValidator</span>\n<span class="token punctuation">{</span>\n    <span class="token return-type class-name">IEnumerable<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> <span class="token function">Validate</span><span class="token punctuation">(</span><span class="token class-name">IWidget</span> widget<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WidgetProcessor</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">IEnumerable<span class="token punctuation">&lt;</span>IWidgetValidator<span class="token punctuation">&gt;</span></span> _validators<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token function">WidgetProcessor</span><span class="token punctuation">(</span><span class="token class-name">IEnumerable<span class="token punctuation">&lt;</span>IWidgetValidator<span class="token punctuation">&gt;</span></span> validators<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        _validators <span class="token operator">=</span> validators<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Process</span><span class="token punctuation">(</span><span class="token class-name">IWidget</span> widget<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token class-name"><span class="token keyword">var</span></span> validationMessages <span class="token operator">=</span> _validators<span class="token punctuation">.</span><span class="token function">SelectMany</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span><span class="token function">Validate</span><span class="token punctuation">(</span>widget<span class="token punctuation">)</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">ToArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>validationMessages<span class="token punctuation">.</span><span class="token function">Any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">{</span>\n            <span class="token comment">// don&#39;t process the widget</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Acceptance/enumerable_instances.cs#L62-L89" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_iwidgetvalidator-enumerable" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>We <em>could</em> simply configure all of the <code>IWidgetValidator</code> rules in one place with an explicit registration of <code>IEnumerable&lt;IWidgetValidator&gt;</code>, but what if we need to have an extensibility to add more validation rules later? What if we want to add these additional rules in addon packages? Or we just don&#39;t want to continuously break into the centralized <code>Registry</code> class every single time we add a new validation rule?</p><p>By relying on Lamar&#39;s <code>IEnumerable</code> behavior, we&#39;re able to split our <code>IWidgetValidatior</code> registration across multiple <code>Registry</code> classes and that&#39;s not infrequently useful to do.</p>',5);p.render=function(t,e,p,u,k,r){return n(),s("div",null,[o,a(" snippet: sample_EnumerableFamilyPolicy_in_action "),c,a(" snippet: sample_explicit-enumeration-behavior "),l,a(" snippet: sample_IWidgetValidator-enumerable "),i])};export{e as __pageData,p as default};

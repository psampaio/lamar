import{_ as n,c as s,o as a,a as t}from"./app.35d600bb.js";const m='{"title":"Constructor Selection","description":"","frontmatter":{},"headers":[{"level":2,"title":"Greediest Constructor","slug":"greediest-constructor"},{"level":2,"title":"Explicitly Selecting a Constructor","slug":"explicitly-selecting-a-constructor"},{"level":2,"title":"[DefaultConstructor] Attribute","slug":"defaultconstructor-attribute"}],"relativePath":"guide/ioc/registration/constructor-selection.md","lastUpdated":1644423598335}',p={},o=t(`<h1 id="constructor-selection" tabindex="-1">Constructor Selection <a class="header-anchor" href="#constructor-selection" aria-hidden="true">#</a></h1><p>Lamar&#39;s constructor selection logic is compliant with the <a href="http://ASP.Net" target="_blank" rel="noopener noreferrer">ASP.Net</a> Core DI specifications and uses their definition of selecting the &quot;greediest constructor.&quot; Definitely note that <strong>this behavior is different than StructureMap&#39;s version of &quot;greediest constructor&quot; selection</strong>.</p><p>Constructor selection can be happily overridden by using one of the mechanisms shown below or using custom [instance policies](/guide/ioc/registration/policies;title=instance policies).</p><h2 id="greediest-constructor" tabindex="-1">Greediest Constructor <a class="header-anchor" href="#greediest-constructor" aria-hidden="true">#</a></h2><p>If there are multiple public constructor functions on a concrete class, Lamar&#39;s default behavior is to select the &quot;greediest&quot; constructor where Lamar can resolve all of the parameters, i.e., the constructor function with the most parameters. In the case of two or more constructor functions with the same number of parameters Lamar will simply take the first constructor encountered in that subset of constructors assuming all the constructor parameter lists can be filled by the container.</p><p>The default constructor selection is demonstrated below:</p><p><a id="snippet-sample_select-the-greediest-ctor"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GreaterThanRule</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Rule</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Attribute <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Value <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">GreaterThanRule</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">GreaterThanRule</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> attribute<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Attribute <span class="token operator">=</span> attribute<span class="token punctuation">;</span>
        Value <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">GreaterThanRule</span><span class="token punctuation">(</span><span class="token class-name">IWidget</span> widget<span class="token punctuation">,</span> <span class="token class-name">Rule</span> rule<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">using_the_greediest_ctor</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>
    <span class="token punctuation">{</span>
        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ForConcreteType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>GreaterThanRule<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Configure
            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Ctor</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;attribute&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Is</span><span class="token punctuation">(</span><span class="token string">&quot;foo&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Ctor</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Is</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">var</span></span> rule <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>GreaterThanRule<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    rule<span class="token punctuation">.</span>Attribute<span class="token punctuation">.</span><span class="token function">ShouldBe</span><span class="token punctuation">(</span><span class="token string">&quot;foo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    rule<span class="token punctuation">.</span>Value<span class="token punctuation">.</span><span class="token function">ShouldBe</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Pipeline/ConstructorSelectorTester.cs#L26-L62" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_select-the-greediest-ctor" title="Start of snippet">anchor</a></sup></p><p>The &quot;greediest constructor selection&quot; will bypass any constructor function that requires &quot;simple&quot; arguments like strings, numbers, or enumeration values that are not explicitly configured for the instance.</p><p>You can see this behavior shown below:</p><p><a id="snippet-sample_skip-ctor-with-missing-simples"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DbContext</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> ConnectionString <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">DbContext</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> connectionString<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        ConnectionString <span class="token operator">=</span> connectionString<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">DbContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token string">&quot;default value&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">should_bypass_ctor_with_unresolvable_simple_args</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> Container<span class="token punctuation">.</span><span class="token function">Empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DbContext<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span>ConnectionString<span class="token punctuation">.</span><span class="token function">ShouldBe</span><span class="token punctuation">(</span><span class="token string">&quot;default value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">should_use_greediest_ctor_that_has_all_of_simple_dependencies</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>
    <span class="token punctuation">{</span>
        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ForConcreteType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DbContext<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Configure
            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Ctor</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;connectionString&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Is</span><span class="token punctuation">(</span><span class="token string">&quot;not the default&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DbContext<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span>ConnectionString<span class="token punctuation">.</span><span class="token function">ShouldBe</span><span class="token punctuation">(</span><span class="token string">&quot;not the default&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Acceptance/constructor_selection.cs#L127-L163" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_skip-ctor-with-missing-simples" title="Start of snippet">anchor</a></sup><a id="snippet-sample_skip-ctor-with-missing-simples-1"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DbContext</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> ConnectionString <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">DbContext</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> connectionString<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        ConnectionString <span class="token operator">=</span> connectionString<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">DbContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token string">&quot;default value&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">should_bypass_ctor_with_unresolvable_simple_args</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DbContext<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span>ConnectionString<span class="token punctuation">.</span><span class="token function">ShouldBe</span><span class="token punctuation">(</span><span class="token string">&quot;default value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">should_use_greediest_ctor_that_has_all_of_simple_dependencies</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>
    <span class="token punctuation">{</span>
        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ForConcreteType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DbContext<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Configure
            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Ctor</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;connectionString&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Is</span><span class="token punctuation">(</span><span class="token string">&quot;not the default&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DbContext<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span>ConnectionString<span class="token punctuation">.</span><span class="token function">ShouldBe</span><span class="token punctuation">(</span><span class="token string">&quot;not the default&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Acceptance/constructor_selection.cs#L158-L194" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_skip-ctor-with-missing-simples-1" title="Start of snippet">anchor</a></sup></p><h2 id="explicitly-selecting-a-constructor" tabindex="-1">Explicitly Selecting a Constructor <a class="header-anchor" href="#explicitly-selecting-a-constructor" aria-hidden="true">#</a></h2><p>To override the constructor selection explicitly on a case by case basis, you can use the <code>SelectConstructor(Expression)</code> method in the <a href="/guide/ioc/registration/registry-dsl.html">ServiceRegistry DSL</a> as shown below:</p><p><a id="snippet-sample_explicit-ctor-selection"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Thingie</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">Thingie</span><span class="token punctuation">(</span><span class="token class-name">IWidget</span> widget<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        CorrectCtorWasUsed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> CorrectCtorWasUsed <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">Thingie</span><span class="token punctuation">(</span><span class="token class-name">IWidget</span> widget<span class="token punctuation">,</span> <span class="token class-name">IService</span> service<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Assert<span class="token punctuation">.</span><span class="token function">True</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">&quot;I should not have been called&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">override_the_constructor_selection</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>
    <span class="token punctuation">{</span>
        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>AWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ForConcreteType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Thingie<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Configure

            <span class="token comment">// StructureMap parses the expression passed</span>
            <span class="token comment">// into the method below to determine the</span>
            <span class="token comment">// constructor</span>
            <span class="token punctuation">.</span><span class="token function">SelectConstructor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thingie</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Thingie<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span>CorrectCtorWasUsed
        <span class="token punctuation">.</span><span class="token function">ShouldBeTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Acceptance/constructor_selection.cs#L89-L125" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_explicit-ctor-selection" title="Start of snippet">anchor</a></sup><a id="snippet-sample_explicit-ctor-selection-1"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Thingie</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">Thingie</span><span class="token punctuation">(</span><span class="token class-name">IWidget</span> widget<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        CorrectCtorWasUsed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> CorrectCtorWasUsed <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">Thingie</span><span class="token punctuation">(</span><span class="token class-name">IWidget</span> widget<span class="token punctuation">,</span> <span class="token class-name">IService</span> service<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Assert<span class="token punctuation">.</span><span class="token function">True</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">&quot;I should not have been called&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">override_the_constructor_selection</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>
    <span class="token punctuation">{</span>
        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>AWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ForConcreteType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Thingie<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Configure

            <span class="token comment">// StructureMap parses the expression passed</span>
            <span class="token comment">// into the method below to determine the</span>
            <span class="token comment">// constructor</span>
            <span class="token punctuation">.</span><span class="token function">SelectConstructor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thingie</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Thingie<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span>CorrectCtorWasUsed
        <span class="token punctuation">.</span><span class="token function">ShouldBeTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Acceptance/constructor_selection.cs#L120-L156" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_explicit-ctor-selection-1" title="Start of snippet">anchor</a></sup></p><h2 id="defaultconstructor-attribute" tabindex="-1">[DefaultConstructor] Attribute <a class="header-anchor" href="#defaultconstructor-attribute" aria-hidden="true">#</a></h2><p>Alternatively, you can override the choice of constructor function by using the older <code>[DefaultConstructor]</code> attribute like this:</p><p><a id="snippet-sample_using-default-ctor-attribute"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AttributedThing</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Normally the greediest ctor would be</span>
    <span class="token comment">// selected, but using this attribute</span>
    <span class="token comment">// will overrid that behavior</span>
    <span class="token punctuation">[</span>DefaultConstructor<span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token function">AttributedThing</span><span class="token punctuation">(</span><span class="token class-name">IWidget</span> widget<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        CorrectCtorWasUsed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> CorrectCtorWasUsed <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">AttributedThing</span><span class="token punctuation">(</span><span class="token class-name">IWidget</span> widget<span class="token punctuation">,</span> <span class="token class-name">IService</span> service<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Assert<span class="token punctuation">.</span><span class="token function">True</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">&quot;I should not have been called&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">select_constructor_by_attribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>AWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>AttributedThing<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span>CorrectCtorWasUsed
        <span class="token punctuation">.</span><span class="token function">ShouldBeTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Acceptance/constructor_selection.cs#L57-L87" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_using-default-ctor-attribute" title="Start of snippet">anchor</a></sup><a id="snippet-sample_using-default-ctor-attribute-1"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AttributedThing</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Normally the greediest ctor would be</span>
    <span class="token comment">// selected, but using this attribute</span>
    <span class="token comment">// will overrid that behavior</span>
    <span class="token punctuation">[</span>DefaultConstructor<span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token function">AttributedThing</span><span class="token punctuation">(</span><span class="token class-name">IWidget</span> widget<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        CorrectCtorWasUsed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> CorrectCtorWasUsed <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">AttributedThing</span><span class="token punctuation">(</span><span class="token class-name">IWidget</span> widget<span class="token punctuation">,</span> <span class="token class-name">IService</span> service<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Assert<span class="token punctuation">.</span><span class="token function">True</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">&quot;I should not have been called&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">select_constructor_by_attribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>AWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>AttributedThing<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span>CorrectCtorWasUsed
        <span class="token punctuation">.</span><span class="token function">ShouldBeTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Acceptance/constructor_selection.cs#L88-L118" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_using-default-ctor-attribute-1" title="Start of snippet">anchor</a></sup></p>`,30),e=[o];function c(u,l,i,k,r,d){return a(),s("div",null,e)}var h=n(p,[["render",c]]);export{m as __pageData,h as default};

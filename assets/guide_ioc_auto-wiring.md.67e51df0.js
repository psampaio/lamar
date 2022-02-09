import{_ as n,c as s,o as a,a as t}from"./app.35d600bb.js";const m='{"title":"Auto Wiring","description":"","frontmatter":{},"relativePath":"guide/ioc/auto-wiring.md","lastUpdated":1644423598327}',e={},p=t(`<h1 id="auto-wiring" tabindex="-1">Auto Wiring <a class="header-anchor" href="#auto-wiring" aria-hidden="true">#</a></h1><p>The best way to use an IoC container is to allow &quot;Auto Wiring&quot; to do most of the work for you. IoC Containers like Lamar are an infrastructure concern, and as such, should be isolated from as much of your code as possible. Before examining Auto Wiring in depth, let&#39;s look at a common anti pattern of IoC usage:</p><p><a id="snippet-sample_shippingscreenpresenter-anti-pattern"></a></p><div class="language-cs"><pre><code><span class="token comment">// This is the wrong way to use an IoC container.  Do NOT invoke the container from</span>
<span class="token comment">// the constructor function.  This tightly couples the ShippingScreenPresenter to</span>
<span class="token comment">// the IoC container in a harmful way.  This class cannot be used in either</span>
<span class="token comment">// production or testing without a valid IoC configuration.  Plus, you&#39;re writing more</span>
<span class="token comment">// code</span>
<span class="token keyword">public</span> <span class="token function">ShippingScreenPresenter</span><span class="token punctuation">(</span><span class="token class-name">IContainer</span> container<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// It&#39;s even worse if you use a static facade to retrieve</span>
    <span class="token comment">// a service locator!</span>
    _service <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IShippingService<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    _repository <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IRepository<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Examples/SetterExamples.cs#L202-L215" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_shippingscreenpresenter-anti-pattern" title="Start of snippet">anchor</a></sup></p><p>Instead of binding <code>ShippingScreenPresenter</code> so tightly to Lamar and having to explicitly fetch its dependencies, let&#39;s switch it to using Lamar a little more idiomatically and just exposing a constructor function with the necessary dependencies as arguments:</p><p><a id="snippet-sample_shippingscreenpresenter-with-ctor-injection"></a></p><div class="language-cs"><pre><code><span class="token comment">// This is the way to write a Constructor Function with an IoC tool</span>
<span class="token comment">// Let the IoC container &quot;inject&quot; services from outside, and keep</span>
<span class="token comment">// ShippingScreenPresenter ignorant of the IoC infrastructure</span>
<span class="token keyword">public</span> <span class="token function">ShippingScreenPresenter</span><span class="token punctuation">(</span><span class="token class-name">IShippingService</span> service<span class="token punctuation">,</span> <span class="token class-name">IRepository</span> repository<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    _service <span class="token operator">=</span> service<span class="token punctuation">;</span>
    _repository <span class="token operator">=</span> repository<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Examples/SetterExamples.cs#L191-L200" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_shippingscreenpresenter-with-ctor-injection" title="Start of snippet">anchor</a></sup></p><p>As long as a Lamar <code>Container</code> knows how to resolve the <code>IRepository</code> and <code>IShippingService</code> interfaces, Lamar can build <code>ShippingScreenPresenter</code> by using &quot;auto-wiring.&quot; All this means is that instead of forcing you to explicitly configure all the dependencies for <code>ShippingScreenPresenter</code>, Lamar can infer from the public <a href="/guide/ioc/registration/constructor-selection.html">constructor function</a> what dependencies <code>ShippingScreenPresenter</code> needs and uses the defaults of both to build it out.</p><p>Looking at the <a href="/guide/ioc/diagnostics/build-plans.html">build plan</a> for <code>ShippingScreenPresenter</code>:</p><p><a id="snippet-sample_shippingscreenpresenter-build-plan"></a></p><div class="language-cs"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowBuildPlan</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>
    <span class="token punctuation">{</span>
        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IShippingService<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>InternalShippingService<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IRepository<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>SimpleRepository<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Just proving that we can build ShippingScreenPresenter;)</span>
    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ShippingScreenPresenter<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ShouldNotBeNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">var</span></span> buildPlan <span class="token operator">=</span> container<span class="token punctuation">.</span>Model<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ShippingScreenPresenter<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">DescribeBuildPlan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// _output is the xUnit ITestOutputHelper here</span>
    _output<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>buildPlan<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Examples/SetterExamples.cs#L237-L255" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_shippingscreenpresenter-build-plan" title="Start of snippet">anchor</a></sup></p>`,14),o=[p];function c(i,r,u,l,k,d){return a(),s("div",null,o)}var g=n(e,[["render",c]]);export{m as __pageData,g as default};

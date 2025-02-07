/*<div id="disqus_thread"></div>
*/

//<script>
 let disqus_config = function() {
  this.page.url = '<data:post.url.canonical/>';
  this.page.identifier = '<data:post.id/>';
 };
const disqusLaz = () => {
 if (!document.getElementById('disqus_script')) {
  let script = document.createElement('script');
  script.src = '//scanslation.disqus.com/embed.js';
  script.id = 'disqus_script';
  script.setAttribute('data-timestamp', +new Date());
  document.body.appendChild(script);
 }
};

const disqus_thread = new IntersectionObserver(
 (entries) => {
  if (entries[0].isIntersecting) {
   disqusLaz();
   disqus_thread.disconnect();
  }
 }, { rootMargin: '50px' }
);
disqus_thread.observe(document.getElementById('disqus_thread'));
//</script>
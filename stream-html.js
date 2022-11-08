customElements.define('stream-html', class extends HTMLElement {
  static get observedAttributes() { return ['src']; }
  constructor() { super(); }

  async #startStreaming(url) {
    const doc = document.implementation.createHTMLDocument();
    doc.write('<div>');
    this.replaceChildren(doc.body.firstChild);

    const response = await fetch(url);
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      const {done, value} = await reader.read();
      if (done) {
        doc.write('</div>');
        break;
      }

      doc.write(value);
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name !== 'src') return;
    if (newVal === oldVal) return;
    this.#startStreaming(newVal);
  }
});

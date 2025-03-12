class LikeButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.articleID = this.getAttribute("article-id");
    this.render();
    this.db = new PouchDB("user-likes");
    this.remoteDB = new PouchDB("pouchdb-sync-hub");

    await this.loadLikes();

    this.db.sync(this.remoteDB, { live: true, retry: true })
      .on("change", () => this.loadLikes());

    this.shadowRoot.querySelector("#like-btn").addEventListener("click", () => this.likeAndSync());
  }

  async loadLikes() {
    try {
      const doc = await this.db.get(this.articleID);
      this.shadowRoot.querySelector("#like-count").textContent = doc.count;
    } catch (error) {
      if (error.name === "not_found") {
        await this.db.put({ _id: this.articleID, count: 0 });
      }
    }
  }

  async likeAndSync() {
    let doc = await this.db.get(this.articleID).catch(() => ({ _id: this.articleID, count: 0 }));
    doc.count++;
    await this.db.put(doc);
    this.shadowRoot.querySelector("#like-count").textContent = doc.count;

    const likeBtn = this.shadowRoot.querySelector("#like-btn");
    likeBtn.classList.add("is-success");
    setTimeout(() => likeBtn.classList.remove("is-success"), 500);

    this.db.sync(this.remoteDB, { live: true, retry: true });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
      
      <style>
        .like-container {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }
        .like-btn {
          transition: all 0.3s ease-in-out;
        }
        .like-btn:hover {
          transform: scale(1.1);
        }
      </style>
      
      <div class="like-container">
        <button id="like-btn" class="button is-primary is-rounded is-small like-btn">
          <span class="icon"><i class="fas fa-thumbs-up"></i></span>
        </button>
        
        <span id="like-count" class="tag is-small">0</span>
      </div>
    `;
  }
}

customElements.define("like-button", LikeButton);

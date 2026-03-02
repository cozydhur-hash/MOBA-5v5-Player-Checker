export const ui = {
  get userIdInput() { return document.getElementById("userId"); },
  get zoneIdInput() { return document.getElementById("zoneId"); },
  get resultDiv() { return document.getElementById("result"); },
  get lookupBtn() { return document.getElementById("lookupBtn"); },

  resetResult() {
    this.resultDiv.className = "";
    this.resultDiv.innerHTML = "";
  },

  setLoading() {
    this.lookupBtn.disabled = true;
    this.resultDiv.className = "loading";
    this.resultDiv.innerHTML = '<span class="spinner"></span>Checking…';
  },

  setError(message) {
    this.resultDiv.className = "error";
    this.resultDiv.textContent = message;
    this.lookupBtn.disabled = false;
  },

  setSuccess(nickname, region) {
    this.resultDiv.className = "success";
    this.resultDiv.innerHTML = `
      <div class="result-header">
        <i data-lucide="check-circle"></i>
        Valid Account
      </div>
      <div class="result-field">
        <i data-lucide="user-round"></i>
        <div class="result-field-content">
          <span class="result-label">Nickname</span>
          <span class="result-value">${nickname}</span>
        </div>
      </div>
      ${region ? `
      <div class="result-field">
        <i data-lucide="globe"></i>
        <div class="result-field-content">
          <span class="result-label">Country</span>
          <span class="result-value">${region}</span>
        </div>
      </div>` : ""}
    `;
    this.lookupBtn.disabled = false;

    // Re-render Lucide icons initially dynamically added
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  clearFields() {
    this.userIdInput.value = "";
    this.zoneIdInput.value = "";
    this.resetResult();
  }
};

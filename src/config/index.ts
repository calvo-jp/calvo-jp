class Config {
  /** returns true if mode is development  */
  get debug() {
    return process.env.NODE_ENV === "development";
  }

  /** base url of api */
  get APIPrefix(): string {
    if (this.debug) {
      return "http://localhost:8000";
    } else {
      return ""; // TODO
    }
  }
}

const config = new Config();
export default config;

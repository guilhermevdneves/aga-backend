class User {
  constructor(data) {
    const {
      id, username, name, email,
    } = data;

    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      name: this.name,
      email: this.email,
    };
  }
}

module.exports = User;

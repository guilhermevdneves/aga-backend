class User {
  constructor(data) {
    const {
      id, username, name, number, admin,
    } = data;

    this.id = id;
    this.username = username;
    this.number = number;
    this.name = name;
    this.admin = admin;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      name: this.name,
      number: this.number,
      admin: this.admin,
    };
  }
}

module.exports = User;

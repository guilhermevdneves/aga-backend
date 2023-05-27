class Dates {
  constructor(data) {
    const {
      id, date, queue,
    } = data;

    this.id = id;
    this.date = date;
    this.queue = queue;
  }

  toJSON() {
    return {
      id: this.id,
      date: this.date,
      queue: this.queue,
    };
  }
}

module.exports = Dates;

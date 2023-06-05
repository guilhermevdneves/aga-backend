class Dates {
  constructor(data) {
    const {
      id, date, reservedBy,
    } = data;

    this.id = id;
    this.date = date;
    this.reservedBy = reservedBy;
  }

  toJSON() {
    return {
      id: this.id,
      date: this.date,
      reservedBy: this.reservedBy,
    };
  }
}

module.exports = Dates;

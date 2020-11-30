export const ENTRY_TYPE_IN = "ENTRY_IN";
export const ENTRY_TYPE_OUT = "ENTRY_OUT";

export function Entry(notebook) {
  this.type;
  this.amount;
  this.note;
  this.notebook = notebook;
  this.setNote = function(note) {
    if (note != "") {
      this.note = note;
    }
  };

  this.setType = function(type) {
    if (type == ENTRY_TYPE_OUT || type == ENTRY_TYPE_IN) {
      this.type = type;
    } else {
      throw "Invalid type";
    }
  };

  this.getType = function() {
    if (this.type == null) {
      throw "Error Null type";
    }
    if (this.type == ENTRY_TYPE_IN) {
      return "IN";
    } else {
      return "OUT";
    }
  }

  this.setAmount = function(amount) {
    const val_num = Number.parseFloat(amount);
    if (Number.isNaN(val_num) == false && val_num > 0) {
      this.amount = val_num;
    } else {
      throw "Error amount value";
    }
  }

  this.getNotebookId = function() {
    return this.notebook.id;
  }
}

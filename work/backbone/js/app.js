(function ($) {
    var employees = [
        { fname: "Theodore", sname:"Garcia", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "CEO@fakework.com", job: "CEO", pay: "100000", type: "Director"},
        { fname: "Lowell", sname:"Mullins", address: "2, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "CFO@fakework.com", job: "CFO", pay: "80000", type: "Director"},
        { fname: "Santos", sname:"Maldonado", address: "3, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "CXO@fakework.com", job: "CXO", pay: "80000", type: "Director"},
        { fname: "Frank", sname:"Peters", address: "4, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "Janitor@fakework.com", job: "Janitor", pay: "12000", type: "Service"},
        { fname: "Doyle", sname:"Roberts", address: "5, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "Developer@fakework.com", job: "Developer", pay: "30000", type: "Techincal"},
        { fname: "Al", sname:"Arnold", address: "6, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "Designer@fakework.com", job: "Designer", pay: "30000", type: "Techincal"},
        { fname: "Bertha", sname:"Little", address: "7, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "DesignManager@fakework.com", job: "Design Manager", pay: "45000", type: "Manager"},
        { fname: "Alice", sname:"Perez", address: "8, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "ProductLead@fakework.com", job: "Product Lead", pay: "45000", type: "Manager" }
    ];


var Employee = Backbone.Model.extend({
    defaults: {
        photo: "/images/svgs/user.svg"
    }
});

var Directory = Backbone.Collection.extend({
  model: Employee
});

var EmployeeView = Backbone.View.extend({
  tagName: "div",
  className: "col-3 flexDirection",
  template: $("#employeeTemplate").html(),

  render: function () {
    var tmpl = _.template(this.template);
    this.$el.html(tmpl(this.model.toJSON()));
    return this;
  }
});

var DirectoryView = Backbone.View.extend({
  el: $('#Employees'),

  initialize: function () {
    this.collection = new Directory(employees);
    this.render();
  },

  render: function () {
    var that = this;
    _.each(this.collection.models, function (item) {
      that.renderEmployee(item);
    }, this);
  },

  renderEmployee: function (item) {
    var employeeView = new EmployeeView({
      model : item
    });
    this.$el.append(employeeView.render().el);
  }
});

var directory = new DirectoryView();

} (jQuery));

(function ($) {
    var employees = [
        { fname: "Theodore", sname:"Garcia", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "CEO@fakework.com", job: "CEO", pay: "100000", type: "director"},
        { fname: "Lowell", sname:"Mullins", address: "2, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "CFO@fakework.com", job: "CFO", pay: "80000", type: "director"},
        { fname: "Santos", sname:"Maldonado", address: "3, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "CXO@fakework.com", job: "CXO", pay: "80000", type: "director"},
        { fname: "Frank", sname:"Peters", address: "4, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "Janitor@fakework.com", job: "Janitor", pay: "12000", type: "service"},
        { fname: "Doyle", sname:"Roberts", address: "5, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "Developer@fakework.com", job: "Developer", pay: "30000", type: "techincal"},
        { fname: "Al", sname:"Arnold", address: "6, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "Designer@fakework.com", job: "Designer", pay: "30000", type: "techincal"},
        { fname: "Bertha", sname:"Little", address: "7, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "DesignManager@fakework.com", job: "Design Manager", pay: "45000", type: "manager"},
        { fname: "Alice", sname:"Perez", address: "8, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "ProductLead@fakework.com", job: "Product Lead", pay: "45000", type: "manager" }
    ];


var Employee = Backbone.Model.extend({
    defaults: {
        photo: "/images/svgs/user.svg",
        fname: '',
        sname: '',
        address: '',
        tel: '',
        email: '',
        job: '',
        pay: '',
        type: ''
    }
});

var Directory = Backbone.Collection.extend({
  model: Employee
});

var EmployeeView = Backbone.View.extend({
  tagName: "section",
  className: "col-3 flexDirection",
  template: _.template($("#employeeTemplate").html()),

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

var DirectoryView = Backbone.View.extend({
  el: $('#Employees'),

  initialize: function () {
    this.collection = new Directory(employees);
    this.render();
    this.$el.find('#filter').append(this.createSelect());
    this.on("change:filterType", this.filterByType, this);
    this.collection.on("reset", this.render, this);
  },

  render: function () {
    this.$el.find("section").remove();
    _.each(this.collection.models, function (item) {
      this.renderEmployee(item);
    }, this);
  },

  renderEmployee: function (item) {
    var employeeView = new EmployeeView({
      model : item
    });
    this.$el.append(employeeView.render().el);
  },

  getTypes: function () {
    return _.uniq(this.collection.pluck("type"));
  },

  createSelect: function () {
      var select = $("<select/>", {
              html: "<option value='all'>All</option>"
      });

      _.each(this.getTypes(), function (item) {
          var option = $("<option/>", {
              value: item,
              text: item
          }).appendTo(select);
      });
      return select;
  },

  events: {
    "change #filter select" : "setFilter",
    "click #addUserDialog" : "addUserDialog"
  },

  addUserDialog: function(e) {
    $( "#addDialog" ).dialog({
      modal: true,
      closeText: ""
    });
  },

  setFilter: function (e) {
    this.filterType = e.currentTarget.value;
    this.trigger("change:filterType");
  },

  filterByType: function () {
    if (this.filterType === "all") {
      EmployeeRouter.navigate("/");
      this.collection.reset(employees);
    } else {
      this.collection.reset(employees, {silent: true});
      var filterType = this.filterType,
        filtered = _.filter(this.collection.models, function (item) {
          return item.get("type") === filterType;
        });
      this.collection.reset(filtered);
      EmployeeRouter.navigate("filter/" + filterType);
    }
  }

});

var EmployeeRouter = Backbone.Router.extend({
    routes: {
        "filter/:type": "urlFilter"
    },

    urlFilter: function (type) {
        directory.filterType = type;
        directory.trigger("change:filterType");
    }
});

var directory = new DirectoryView();

var EmployeeRouter = new EmployeeRouter();

Backbone.history.start();

} (jQuery));

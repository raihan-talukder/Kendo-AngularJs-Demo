app.controller('DemoController', ['$scope', '$http' , function ($scope, $http) {

    $scope.User = {
        Id: 0,
        Name: "",
        Type: 1,
        Birthdate: new Date(),
        TypeString: "Officer",
        IsActive: true
    };
    $scope.DemoDataResult = {
        data: [],
        total: 0
    };
    

    $scope.Init = function () {
        $scope.LoadData();
        $scope.setDropDownOptions();
    };

    $scope.LoadData = function () {
        //console.log($scope.Data);
        $scope.DemoDataResult = {
            data: $scope.Data,
            total: $scope.Data.length
        };
        $scope.gridDataSource.read();
    };

    $scope.NewCommand = function () {
        var grid = $("#demoDataGrid").data("kendoGrid");
        grid.clearSelection();

        $scope.User = {
            Id: 0,
            Name: "",
            Type: 1,
            Birthdate: new Date(),
            TypeString: "Officer",
            IsActive: true
        };

        $scope.LoadData();
    };

    $scope.RefreshCommand = function () {
        $scope.gridDataSource.filter({});
        $scope.SearchKey = "";
        $scope.IsLoadFromList = false;
        $scope.NewCommand();
    };

    $scope.gridSelectionChange = function (data, dataItem, columns) {
        angular.copy(data, $scope.User);
        $scope.GridUser = data;
    };


    $scope.LocalGridSearchCommand = function () {
        $scope.SearchKey.trim();

        $scope.IsLoadFromList = false;
        $scope.gridDataSource.filter({
            logic: "or",
            filters: [
            //   { field: "EntityNo", operator: "eq", value: $scope.SearchKey },
            { field: "Name", operator: "contains", value: $scope.SearchKey },
            { field: "RoomNo", operator: "eq", value: $scope.SearchKey },
            { field: "Birthdate", operator: "contains", value: $scope.SearchKey }
            ]
        });
        $scope.gridDataSource.read();
    };

    $scope.toolbarTemplate = $("#template").html();

    $scope.gridOptions = {
        height: $(window).height() - 120,
        scrollable: true,
        filterable: true,
        sortable: {
            mode: "multiple"
        },
        pageable: {
            refresh: true,
            input: true,
            numeric: false,
            pageSizes: [10, 50, 100, 200, "all"]
        },
        dataBound: function (e) {
            var grid = $("#demoDataGrid").data("kendoGrid");
            var pageData = grid.dataSource.view();

            for (var i = 0; i < pageData.length; i++) {
                if (pageData[i].ID == $scope.User.Id) {
                    grid.select("tr:eq(" + i + ")");
                    break;
                }
            }
        },
        selectable: true,
        columns:
            [
                {
                    field: "Id",
                    title: "No",
                    width: "50px",
                    filterable: false
                }, {
                    field: "Name",
                    title: "Name"
                }, {
                    field: "TypeString",
                    title: "Type",
                    width: "100px",
                }, {
                    field: "Birthdate",
                    title: "Date",
                    width: "120px",
                    template: "#= kendo.toString(kendo.parseDate(Birthdate, 'yyyy-MM-dd'), 'dd/MM/yyyy') #"
                }, {
                    field: "RoomNo",
                    title: "Room No",
                    width: "100px"
                }
            ]
    };

    $scope.gridDataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
            read: function (o) {
                o.success($scope.DemoDataResult);
            }
        },
        schema: {
            data: "data",
            total: "total"
        },
        pageSize: 100
    });

    $scope.DatePickerOptions = {
        format: "dd/MM/yyyy",
        max: new Date(2100, 0, 1)
    };

    $scope.OpenDatePicker = function (item) {
        $(item).data('kendoDatePicker').open();
    };



    $scope.DropDownData = [
        {
            ID: 1,
            Title: "Officer"
        }, {
            ID: 2,
            Title: "Student"
        }
    ];

    $scope.setDropDownOptions = function () {
        $scope.DropdownOptions = {
            dataTextField: "Title",
            dataValueField: "ID",
            dataSource: $scope.DropDownDataSource,
            optionLabel: {
                Title: ' -- Select a Option-- ',
                ID: ''
            }
        };
    };

    $scope.DropDownDataSource = new kendo.data.DataSource({
        transport: {
            read: function (o) {
                o.success($scope.DropDownData);
            }
        }
    });

    $scope.ComboBoxData = [
        {
            ID: 1, Name: "Abdul Zabbar"
        }, {
            ID: 2, Name: "Korim Mollah"
        }, {
            ID: 3, Name: "Nusrat Jahan"
        }, {
            ID: 4, Name: "Sadiqur Rahman"
        }, {
            ID: 5, Name: "Mehadi Sayed"
        }
    ];

    $scope.ComboBoxDataSource = new kendo.data.DataSource({
        transport: {
            read: function (o) {
                o.success($scope.ComboBoxData);
            }
        }
    });

    $scope.comboBoxOptions = {
        autoBind: false,
        dataSource: $scope.ComboBoxDataSource,
        dataTextField: 'Name',
        dataValueField: 'ID',
        filter: 'contains'
      };

    $scope.comboBoxSelectionChanged = function (){

    };

    $scope.selectOptions = {
        placeholder: "Select products...",
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        valuePrimitive: true,
        autoBind: false,
        dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                }
            }
        }
    };
    $scope.selectedIds = [ 4, 7 ];

    $scope.Data = [
        {
            "Id": 1,
            "Name": "Md. Raihan",
            "Type": 1,
            "Birthdate": "1993-08-10T00:00:00Z",
            "TypeString": "Officer",
            "IsActive": true,
            "RoomNo": 6217,
            Gender: "Male"
        },
        {
            "Id": 2,
            "Name": "Md. Jahid",
            "Type": 1,
            "Birthdate": "1990-10-10T00:00:00Z",
            "TypeString": "Officer",
            "IsActive": true,
            "RoomNo": 6217,
            Gender: "Male"
        },
        {
            "Id": 3,
            "Name": "Md. Sadiq",
            "Type": 2,
            "Birthdate": "1990-10-10T00:00:00Z",
            "TypeString": "Student",
            "IsActive": false,
            "RoomNo": 6217,
            Gender: "Male"
        },
        {
            "Id": 4,
            "Name": "Sokhina",
            "Type": 2,
            "Birthdate": "1990-10-10T00:00:00Z",
            "TypeString": "Student",
            "IsActive": true,
            "RoomNo": 6217,
            Gender: "Female"
        }
    ];

    $scope.countryNames = [
        "Albania",
        "Andorra",
        "Armenia",
        "Austria",
        "Azerbaijan",
        "Belarus",
        "Belgium",
        "Bosnia & Herzegovina",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Estonia",
        "Finland",
        "France",
        "Georgia",
        "Germany",
        "Greece",
        "Hungary",
        "Iceland",
        "Ireland",
        "Italy",
        "Kosovo",
        "Latvia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Malta",
        "Moldova",
        "Monaco",
        "Montenegro",
        "Netherlands",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "San Marino",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkey",
        "Ukraine",
        "United Kingdom",
        "Vatican City"
            ];

}]);

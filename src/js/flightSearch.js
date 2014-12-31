/**
 * Created by Deepak Sisodiya on 30/12/14.
 */


var flightSearchJSON = [
  // delhi pune 25 flight
  {
    GFlightNo : "AI-202",
    totalPrice : 9000,
    GOriginCity : "Delhi",
    GDestinationCity : "Pune",
    GDepartureDate : "25/12/2014",
    GArrivalDate : "25/12/2014",
    GDepartTime : "12 AM",
    GArriveTime : "5 PM"
  },
  {
    GFlightNo : "AI-203",
    totalPrice : 8000,
    GOriginCity : "Delhi",
    GDestinationCity : "Pune",
    GDepartureDate : "25/12/2014",
    GArrivalDate : "25/12/2014",
    GDepartTime : "10 AM",
    GArriveTime : "4 PM"
  },
  {
    GFlightNo : "AI-204",
    totlaPrice : 7000,
    GOriginCity : "Delhi",
    GDestinationCity : "Pune",
    GDepartureDate : "25/12/2014",
    GArrivalDate : "25/12/2014",
    GDepartTime : "1 PM",
    GArriveTime : "8 PM"
  },
  {
    GFlightNo : "AI-202",
    totalPrice : 9000,
    GOriginCity : "Pune",
    GDestinationCity : "Delhi",
    GDepartureDate : "26/12/2014",
    GArrivalDate : "26/12/2014",
    GDepartTime : "11 AM",
    GArriveTime : "4 PM"
  },
  {
    GFlightNo : "AI-203",
    totalPrice : 8000,
    GOriginCity : "Pune",
    GDestinationCity : "Delhi",
    GDepartureDate : "26/12/2014",
    GArrivalDate : "26/12/2014",
    GDepartTime : "1 PM",
    GArriveTime : "7 PM"
  },
  {
    GFlightNo : "AI-204",
    totalPrice : 7000,
    GOriginCity : "Pune",
    GDestinationCity : "Delhi",
    GDepartureDate : "26/12/2014",
    GArrivalDate : "26/12/2014",
    GDepartTime : "3 PM",
    GArriveTime : "10 PM"
  }

]

var flightSearchJSONTwoWay = [
  {
    GFlightNo : "AI-202",
    totalPrice : 17000,
    GOriginCity : "Delhi",
    GDestinationCity : "Pune",
    GDepartureDate : "25/12/2014",
    GArrivalDate : "25/12/2014",
    GDepartTime : "12 AM",
    GArriveTime : "5 PM",

    RFlightNo : "AI-203",
    RDepartureDate : "26/12/2014",
    RArrivalDate : "26/12/2014",
    RDepartTime : "1 AM",
    RArriveTime : "7 PM"
  },
  {
    GFlightNo : "AI-203",
    totalPrice : 15000,
    GOriginCity : "Delhi",
    GDestinationCity : "Pune",
    GDepartureDate : "25/12/2014",
    GArrivalDate : "25/12/2014",
    GDepartTime : "10 PM",
    GArriveTime : "4 PM",

    RFlightNo : "AI-204",
    RDepartureDate : "26/12/2014",
    RArrivalDate : "26/12/2014",
    RDepartTime : "3 PM",
    RArriveTime : "10 PM"
  },
  {
    GFlightNo : "AI-204",
    totalPrice : 16000,
    GOriginCity : "Delhi",
    GDestinationCity : "Pune",
    GDepartureDate : "25/12/2014",
    GArrivalDate : "25/12/2014",
    GDepartTime : "1 PM",
    GArriveTime : "8 PM",

    RFlightNo : "AI-202",
    RDepartureDate : "26/12/2014",
    RArrivalDate : "26/12/2014",
    RDepartTime : "11 AM",
    RArriveTime : "4 PM"
  }
]


$( document ).ready(function () {

  $("#submitSearchForm").click(function() {
    $("#flightInformation").html("");
    getFormData();
  });

  $("#submitSearchForm2").click(function() {
    $("#flightInformationOneWay").html("");
    getFormDataForTwoWay();
  });

  $("#tabs").tab();
  $("#refineSearchResult").slider().on("slide", function(obj) {

    console.log(obj.value);

    getDataAccordingToSlider(obj.value);

  });
  //var value = mySlider.slider('getValue');

  //alert(value);
});

function getFormDataForTwoWay() {
  var originCity2 = $("#originCity2").val();
  var destinationCity2 = $("#destinationCity2").val();
  var departureDate2 = $("#departureDate2").val();
  var returnDate2 = $("#returnDate2").val();

  var twoWayData = getFlightInformationForTwoWay(originCity2, destinationCity2, departureDate2, returnDate2);

  myFunction(twoWayData);

}

function getFlightInformationForTwoWay(originCity2, destinationCity2, departureDate2, returnDate2) {

  var data = flightSearchJSONTwoWay.filter(function (el) {
    return el.GOriginCity === originCity2  &&
      el.GDestinationCity === destinationCity2  &&
      el.GDepartureDate === departureDate2 &&
      el.RDepartureDate === returnDate2
  });
  return data;
}

function getDataAccordingToSlider(value) {
  var originCity = $("#originCity").val();
  var destinationCity = $("#destinationCity").val();
  var departureDate = $("#departureDate").val();
  var minPrice = value[0];
  var maxPrice = value[1];
  var data = refineSearchResult(originCity, destinationCity, departureDate, minPrice, maxPrice);
  myFunctiononeway(data);
}

function refineSearchResult(originCity, destinationCity, departureDate, minPrice, maxPrice) {
  var data = flightSearchJSON.filter(function (el) {
    return el.OriginCity === originCity  &&
      el.DestinationCity === destinationCity  &&
      el.DepartureDate === departureDate &&
      el.Price > minPrice &&
      el.Price < maxPrice
  });
  console.log(data);
  return data;
}

function getFormData() {
  var originCity = $("#originCity").val();
  var destinationCity = $("#destinationCity").val();
  var departureDate = $("#departureDate").val();
  var data = getFlightInformation(originCity, destinationCity, departureDate);
  myFunctiononeway(data);
}

function getFlightInformation(originCity, destinationCity, departureDate) {
  var data = flightSearchJSON.filter(function (el) {
    return el.GOriginCity === originCity  &&
           el.GDestinationCity === destinationCity  &&
           el.GDepartureDate === departureDate
  });
  return data;
}

function myFunction(data) {
  var tempHTML = _.template($("#flightInfoTemplate").html())({
    obj : data
  });
  $("#flightInformation").html(tempHTML);
}


function myFunctiononeway(data) {
  var tempHTML = _.template($("#flightInfoTemplateOneWay").html())({
    obj : data
  });
  $("#flightInformationOneWay").html(tempHTML);
}

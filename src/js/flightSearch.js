/**
 * Created by Deepak Sisodiya on 30/12/14.
 */


var flightSearchJSON = [
  // delhi pune 25 flight
  {
    FlightNo : "AI-202",
    Price : 9000,
    OriginCity : "Delhi",
    DestinationCity : "Pune",
    DepartureDate : "25/12/2014",
    ArrivalDate : "25/12/2014",
    DepartTime : "12 PM",
    ArriveTime : "5 PM"
  },
  {
    FlightNo : "AI-203",
    Price : 8000,
    OriginCity : "Delhi",
    DestinationCity : "Pune",
    DepartureDate : "25/12/2014",
    ArrivalDate : "25/12/2014",
    DepartTime : "10 AM",
    ArriveTime : "3 PM"
  },
  {
    FlightNo : "AI-204",
    Price : 7000,
    OriginCity : "Delhi",
    DestinationCity : "Pune",
    DepartureDate : "25/12/2014",
    ArrivalDate : "25/12/2014",
    DepartTime : "1 PM",
    ArriveTime : "6 PM"
  },

  // pune delhi 26 return of above three flight
  {
    FlightNo : "AI-202R",
    Price : 9000,
    OriginCity : "Pune",
    DestinationCity : "Delhi",
    DepartureDate : "26/12/2014",
    ArrivalDate : "26/12/2014",
    DepartTime : "12 PM",
    ArriveTime : "5 PM"
  },
  {
    FlightNo : "AI-203R",
    Price : 8000,
    OriginCity : "Pune",
    DestinationCity : "Delhi",
    DepartureDate : "26/12/2014",
    ArrivalDate : "26/12/2014",
    DepartTime : "10 AM",
    ArriveTime : "3 PM"
  },
  {
    FlightNo : "AI-204R",
    Price : 7000,
    OriginCity : "Pune",
    DestinationCity : "Delhi",
    DepartureDate : "26/12/2014",
    ArrivalDate : "26/12/2014",
    DepartTime : "1 PM",
    ArriveTime : "6 PM"
  },

  // flight going again to pune on 27
  {
    FlightNo : "AI-202",
    Price : 9000,
    OriginCity : "Delhi",
    DestinationCity : "Pune",
    DepartureDate : "27/12/2014",
    ArrivalDate : "27/12/2014",
    DepartTime : "12 PM",
    ArriveTime : "5 PM"
  },
  {
    FlightNo : "AI-203",
    Price : 8000,
    OriginCity : "Delhi",
    DestinationCity : "Pune",
    DepartureDate : "27/12/2014",
    ArrivalDate : "27/12/2014",
    DepartTime : "10 AM",
    ArriveTime : "3 PM"
  },
  {
    FlightNo : "AI-204",
    Price : 7000,
    OriginCity : "Delhi",
    DestinationCity : "Pune",
    DepartureDate : "27/12/2014",
    ArrivalDate : "27/12/2014",
    DepartTime : "1 PM",
    ArriveTime : "6 PM"
  },

  // flight comming from pune 28
  {
    FlightNo : "AI-202",
    Price : 9000,
    OriginCity : "Pune",
    DestinationCity : "Delhi",
    DepartureDate : "28/12/2014",
    ArrivalDate : "28/12/2014",
    DepartTime : "12 PM",
    ArriveTime : "5 PM"
  },
  {
    FlightNo : "AI-203",
    Price : 8000,
    OriginCity : "Pune",
    DestinationCity : "Delhi",
    DepartureDate : "28/12/2014",
    ArrivalDate : "28/12/2014",
    DepartTime : "10 AM",
    ArriveTime : "3 PM"
  },
  {
    FlightNo : "AI-204",
    Price : 7000,
    OriginCity : "Delhi",
    DestinationCity : "Pune",
    DepartureDate : "28/12/2014",
    ArrivalDate : "28/12/2014",
    DepartTime : "1 PM",
    ArriveTime : "6 PM"
  }
]

$( document ).ready(function () {

  $("#submitSearchForm").click(function() {
    getFormData();
  });

  $("#submitSearchForm2").click(function() {
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

  var goingData = getFlightInformation(originCity2, destinationCity2, departureDate2);
  var returnData = getFlightInformation(destinationCity2, originCity2, returnDate2);
}

function getDataAccordingToSlider(value) {
  var originCity = $("#originCity").val();
  var destinationCity = $("#destinationCity").val();
  var departureDate = $("#departureDate").val();
  var minPrice = value[0];
  var maxPrice = value[1];
  var data = refineSearchResult(originCity, destinationCity, departureDate, minPrice, maxPrice);
  myFunction(data);
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
  myFunction(data);
}

function getFlightInformation(originCity, destinationCity, departureDate) {
  var data = flightSearchJSON.filter(function (el) {
    return el.OriginCity === originCity  &&
           el.DestinationCity === destinationCity  &&
           el.DepartureDate === departureDate
  });
  return data;
}

function myFunction(data) {

  var tempHTML = _.template($("#flightInfoTemplate").html())({
    obj : data
  });

  $("#flightInformation").html(tempHTML);

}
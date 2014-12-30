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
    FlightNo : "AI-202",
    Price : 9000,
    OriginCity : "Pune",
    DestinationCity : "Delhi",
    DepartureDate : "26/12/2014",
    ArrivalDate : "26/12/2014",
    DepartTime : "12 PM",
    ArriveTime : "5 PM"
  },
  {
    FlightNo : "AI-203",
    Price : 8000,
    OriginCity : "Pune",
    DestinationCity : "Delhi",
    DepartureDate : "26/12/2014",
    ArrivalDate : "26/12/2014",
    DepartTime : "10 AM",
    ArriveTime : "3 PM"
  },
  {
    FlightNo : "AI-204",
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

  $("#tabs").tab();
  $("#refineSearchResult").slider().on("slide", function(obj) {

    console.log(obj.value);

    getDataAccordingToSlider(obj.value);

  });
  //var value = mySlider.slider('getValue');

  //alert(value);
});

function getDataAccordingToSlider(value) {
  var originCity = $("#originCity").val();
  var destinationCity = $("#destinationCity").val();
  var departureDate = $("#departureDate").val();
  var minPrice = value[0];
  var maxPrice = value[1];
  refineSearchResult(originCity, destinationCity, departureDate, minPrice, maxPrice);
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

  myFunction(data);

}

function getFormData() {
  var originCity = $("#originCity").val();
  var destinationCity = $("#destinationCity").val();
  var departureDate = $("#departureDate").val();
  getFlightInformation(originCity, destinationCity, departureDate);
}

function getFlightInformation(originCity, destinationCity, departureDate) {

  var data = flightSearchJSON.filter(function (el) {
    return el.OriginCity === originCity  &&
           el.DestinationCity === destinationCity  &&
           el.DepartureDate === departureDate
  });
  console.log(data);

  myFunction(data);
}

function myFunction(data) {

  var tempHTML = _.template($("#flightInfoTemplate").html())({
    obj : data
  });

  $("#flightInformation").html(tempHTML);

}
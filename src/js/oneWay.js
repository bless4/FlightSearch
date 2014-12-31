/**
 * Created by Deepak Sisodiya on 31/12/14.
 */


function getDataForOneWay() {
  var originCity = $("#originCity").val();
  var destinationCity = $("#destinationCity").val();
  var departureDate = $("#departureDate").val();
  var data = getFlightInformationForOneWay(originCity, destinationCity, departureDate);
  underscoreTemplateForOneWay(data);
  $("#travelInfoBlock").show();
  $("#travelPath").text("");
  $("#travelPath").text(originCity + " > " + destinationCity);
  $("#departDate").text("");
  $("#departDate").text("Depart Date :" + departureDate);
}

function getFlightInformationForOneWay(originCity, destinationCity, departureDate) {
  var data = flightSearchJSONOneWay .filter(function(el) {
    return el.GOriginCity === originCity &&
      el.GDestinationCity === destinationCity &&
      el.GDepartureDate === departureDate
  });
  return data;
}

function underscoreTemplateForOneWay(data) {
  var tempHTML = _.template($("#flightInfoTemplateOneWay").html())({
    obj: data
  });
  $("#flightInformationOneWay").html(tempHTML);
}

function getDataAccordingToSliderOneWay(value) {
  var originCity = $("#originCity").val();
  var destinationCity = $("#destinationCity").val();
  var departureDate = $("#departureDate").val();
  var minPrice = value[0];
  var maxPrice = value[1];
  var data = refineSearchResultForOneWay(originCity, destinationCity, departureDate, minPrice, maxPrice);
  underscoreTemplateForOneWay(data);
}

function refineSearchResultForOneWay(originCity, destinationCity, departureDate, minPrice, maxPrice) {
  var data = flightSearchJSONOneWay .filter(function(el) {
    return el.GOriginCity === originCity &&
      el.GDestinationCity === destinationCity &&
      el.GDepartureDate === departureDate &&
      el.totalPrice > minPrice &&
      el.totalPrice < maxPrice
  });
  console.log(data);
  return data;
}
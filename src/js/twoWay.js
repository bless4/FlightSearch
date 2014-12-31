/**
 * Created by Deepak Sisodiya on 30/12/14.
 */


$(document).ready(function() {

  $("#tabs").tab();

  $("#submitForOneWay").click(function() {
    $("#flightInformation").html("");
    $("#refineSearchResultTwoWay").hide();
    $("#refineSearchResultOneWay").show();
    getDataForOneWay();
  });

  $("#submitForTwoWay").click(function() {
    $("#flightInformationOneWay").html("");
    $("#refineSearchResultTwoWay").show();
    $("#refineSearchResultOneWay").hide();
    getDataForTwoWay();
  });

  $("#refineSearchResultForOneWayId").slider().on("slide", function(obj) {
    getDataAccordingToSliderOneWay(obj.value);
  });

  $("#refineSearchResultForTwoWayId").slider().on("slide", function(obj) {
    getDataAccordingToSliderTwoWay(obj.value);
  });

});

function getDataForTwoWay() {
  var originCity2 = $("#originCity2").val();
  var destinationCity2 = $("#destinationCity2").val();
  var departureDate2 = $("#departureDate2").val();
  var returnDate2 = $("#returnDate2").val();
  var twoWayData = getFlightInformationForTwoWay(originCity2, destinationCity2, departureDate2, returnDate2);
  underscoreTemplateForTwoWay(twoWayData);
}

function getFlightInformationForTwoWay(originCity2, destinationCity2, departureDate2, returnDate2) {
  var data = flightSearchJSONTwoWay.filter(function(el) {
    return el.GOriginCity === originCity2 &&
      el.GDestinationCity === destinationCity2 &&
      el.GDepartureDate === departureDate2 &&
      el.RDepartureDate === returnDate2
  });
  return data;
}

function getDataAccordingToSliderTwoWay(value) {
  var originCity2 = $("#originCity2").val();
  var destinationCity2 = $("#destinationCity2").val();
  var departureDate2 = $("#departureDate2").val();
  var returnDate2 = $("#returnDate2").val();
  var minPrice = value[0];
  var maxPrice = value[1];
  var data = refineSearchResultForTwoWay(originCity2, destinationCity2, departureDate2, returnDate2, minPrice, maxPrice);
  underscoreTemplateForTwoWay(data);
}

function refineSearchResultForTwoWay(originCity2, destinationCity2, departureDate2, returnDate2, minPrice, maxPrice) {
  var data = flightSearchJSONTwoWay.filter(function(el) {
    return el.GOriginCity === originCity2 &&
      el.GDestinationCity === destinationCity2 &&
      el.GDepartureDate === departureDate2 &&
      el.RDepartureDate === returnDate2 &&
      el.totalPrice > minPrice &&
      el.totalPrice < maxPrice
  });
  return data;
}

function underscoreTemplateForTwoWay(data) {
  var tempHTML = _.template($("#flightInfoTemplate").html())({
    obj: data
  });
  $("#flightInformation").html(tempHTML);
}
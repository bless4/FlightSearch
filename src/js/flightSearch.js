/**
 * Created by Deepak Sisodiya on 30/12/14.
 */


$(document).ready(function() {

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

  $("#tabs").tab();
  $("#refineSearchResult").slider().on("slide", function(obj) {

    console.log(obj.value);

    getDataAccordingToSlider(obj.value);

  });
  $("#refineSearchResultTwoWayInput").slider().on("slide", function(obj) {

    console.log(obj.value);

    getDataAccordingToSliderTwoWay(obj.value);

  });
  //var value = mySlider.slider('getValue');

  //alert(value);
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

function getDataAccordingToSlider(value) {
  var originCity = $("#originCity").val();
  var destinationCity = $("#destinationCity").val();
  var departureDate = $("#departureDate").val();
  var minPrice = value[0];
  var maxPrice = value[1];
  var data = refineSearchResult(originCity, destinationCity, departureDate, minPrice, maxPrice);
  underscoreTemplateForOneWay(data);
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

function refineSearchResult(originCity, destinationCity, departureDate, minPrice, maxPrice) {
  var data = flightSearchJSON.filter(function(el) {
    return el.GOriginCity === originCity &&
      el.GDestinationCity === destinationCity &&
      el.GDepartureDate === departureDate &&
      el.totalPrice > minPrice &&
      el.totalPrice < maxPrice
  });
  console.log(data);
  return data;
}

function getDataForOneWay() {
  var originCity = $("#originCity").val();
  var destinationCity = $("#destinationCity").val();
  var departureDate = $("#departureDate").val();
  var data = getFlightInformationForOneWay(originCity, destinationCity, departureDate);
  underscoreTemplateForOneWay(data);
}

function getFlightInformationForOneWay(originCity, destinationCity, departureDate) {
  var data = flightSearchJSON.filter(function(el) {
    return el.GOriginCity === originCity &&
      el.GDestinationCity === destinationCity &&
      el.GDepartureDate === departureDate
  });
  return data;
}

function underscoreTemplateForTwoWay(data) {
  var tempHTML = _.template($("#flightInfoTemplate").html())({
    obj: data
  });
  $("#flightInformation").html(tempHTML);
}


function underscoreTemplateForOneWay(data) {
  var tempHTML = _.template($("#flightInfoTemplateOneWay").html())({
    obj: data
  });
  $("#flightInformationOneWay").html(tempHTML);
}

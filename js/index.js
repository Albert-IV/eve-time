/* global moment */
$(function() {
  var dateFormat = "H:mm:ss MM-DD-YYYY";

  $('#calculate-time').click(calculateLocalTime);

  init();

  function init() {
    populateTimezones();
    setTimeNow(true);

    setInterval(setTimeNow, 500);
  }

  function populateTimezones () {
    window.timezones.forEach(function(tzGroup) {
      var $group = $("<optgroup label='" + tzGroup.group + "'></optgroup>");

      tzGroup.zones.forEach(function(tz) {
        $group.append("<option>" + tz.value + "</option>");
      });

      $group.appendTo($('#timezone-select'));
    });
  }

  function setTimeNow(init) {
    var localTime = moment();
    var eveTime = moment().tz("GMT");

    $('#current-time').text( eveTime.format(dateFormat) );
    $('#your-time').text( localTime.format(dateFormat) );

    if( init ) {
      calcFleetTime(eveTime.format(dateFormat));
    }
  }

  function calcFleetTime(dateStr) {
    var urlTime = getParameterByName('time') || dateStr;
    $('#from-time').val(urlTime);
  }

  function calculateLocalTime(e) {
    var currentTz = $('#timezone-select').val();
    if( !currentTz ) return false;

    var fromDate = moment.tz($("#from-time").val(), 'GMT');
    fromDate.tz(currentTz);
    var dateText = fromDate.format(dateFormat);

    $('#to-time').val(dateText);
    $('#share-time').val("http://eve-time.com/?time=" + encodeURIComponent(dateText));
    $('#share-block').fadeIn(1500);
  }

  // Shamelessly stolen from here:
  // http://stackoverflow.com/a/901144/23875
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
});
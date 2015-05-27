/* global moment */
$(function() {
  var dateFormat = "H:mm:ss MM/DD/YYYY";

  $('#calculate-time').click(calculateLocalTime);

  init();

  function init() {
    setTimeNow(true);
    setInterval(setTimeNow, 500);
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
    var timeParam = getParameterByName('time') && parseInt(getParameterByName('time'), 10) || 0;
    var urlTime = timeParam &&
                  moment(timeParam).format(dateFormat) ||
                  dateStr;

    $('#from-time').val(urlTime);
    if( !!timeParam ) {
      calculateLocalTime();
    }
  }

  function calculateLocalTime() {
    var convertedDate = moment.tz($("#from-time").val(), 'GMT').local();
    var dateText = convertedDate.format(dateFormat);

    $('#to-time').val(dateText);
    if( dateText != "Invalid date" ) {
      $('#share-time').val("http://eve-time.com/?time=" + encodeURIComponent(convertedDate.valueOf()));
      $('#share-block').fadeIn(1500);
    }
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
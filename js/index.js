/* global moment */
$(function() {
  init();


  function init() {
    setTimeNow();

    setInterval(setTimeNow, 500);
  }

  function setTimeNow() {
    var localTime = moment();
    var eveTime = moment().tz("GMT");

    $('#current-time').text( eveTime.format("H:mm:ss MMMM do YYYY") );
    $('#your-time').text( localTime.format("H:mm:ss MMMM do YYYY") );
  }
});
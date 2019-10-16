function getListItem() {

  CamlQuery = "<Query><Where><Eq><FieldRef Name='TipoPedido' /><Value Type='Text'>" + ' ' + "</Value></Eq></Where></Query>";

  $().SPServices({
    operation: "GetListItems",
    async: false,
      listName: 'SolicitudDeServicio',
    CAMLViewFields: CamlQuery,
    completefunc: function (xData, Status) {
      $(xData.responseXML).SPFilterNode("z:row").each(function() {
        console.log($(this).attr("ows_Title"))

      });
    }
  });

}

function getItems(apiUrl) {
  var d = $.Deferred();
  $.ajax({
    url: apiUrl,
    method: "GET",
    headers: { "Accept": "application/json; odata=verbose" },
    success: function (data) {
      d.resolve(data.d.results);
    },
    error: function (data) {
      alert(err);
    }
  });
return d.promise();
}

function update(id) {
  var dfd = jQuery.Deferred();

  $().SPServices(
    {
      operation: "UpdateListItems",
      async: false,
      batchCmd: "Update",
      listName: 'SolicitudDeServicio',
      ID: id,
      valuepairs: [
          ["TipoPedido",'40;#Insp-R- Final / Release'],
      ],
      completefunc: function(xData, Status)
      {
        dfd.resolve( "hurray" );
      }
  });

  return dfd.promise();
}

function validaCedula()
{
    var ced = $("#cedula").val();
    $.ajax({
        url:"https://www.cedulaprofesional.sep.gob.mx/cedula/buscaCedulaJson.action?json={'maxResult':'100','nombre':'','paterno':'','materno':'','idCedula':'6971771'}",
        method:"GET",
        dataType: "json",
        succes:function(data)
        {
            $("#titulo").val(data.titulo);
        },
        error: function(xhr,status,error)
        {
            console.error("Error:",error);
            alert("No existe la cedula.");
        }
    })
}
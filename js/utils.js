$(document).ready(function(){
    $("#frmTable").hide();
    $("#frmTableCedulas").hide();

$("#tbl-cedulas").on("click", "tr", function () {
    
    var cedula  = $(this).find("td:eq(0)").text();
    var nombre   = $(this).find("td:eq(1)").text();
    let titulo   = $(this).find("td:eq(2)").text();

    $("#titulo").val(titulo);
    $("#cedula").val(cedula);
    $("#contacto").val(nombre);
    $("#frmTableCedulas").fadeOut();
    $("#frmParticipante").show();
});

});

function validaCedula()
{
    
    var ced = $("#cedula").val();
    $.ajax({
        // url:"https://localhost:7213/Busqueda?cedula="+ced,
        url:"https://consulta.somee.com/busqueda?cedula="+ced,
        method:"GET",
        dataType: "json",
        success:function(data)
        {
            console.log("Respuesta completa: " + data);
            if(data.length > 0)
            {
                if(data.length==1)
                {
                    var nombre = data[0].nombre + " " + data[0].paterno +" "+ data[0].materno;
                    $("#titulo").val(data[0].titulo);
                    $("#contacto").val(nombre);
                }
                else{
                    data.forEach(function(data){
                    var nombre = data.nombre + " " + data.paterno +" "+ data.materno;
                $("#tbl-cedulas").append(`
                    <tr>
                        <td>${data.cedula}</td>
                        <td>${nombre}</td>
                        <td>${data.titulo}</td>
                    </tr>`
                )});
                $("#frmParticipante").fadeOut();
                $("#frmTableCedulas").show();
                }
            }
            else{

            }
                    },
        error: function(xhr,status,error)
        {
            console.error("Error:",error);
            alert("No existe la cedula.");
        }
    })
}
function limpiaFormulario()
{
    $("#compania").val("");
    $("#compania").removeClass("is-invalid");
    $("#correo").val("");
    $("#acecorreopto").removeClass("is-invalid");
    $("#telefono").val("");
    $("#telefono").removeClass("is-invalid");
    $("#acepto").val("");
    $("#acepto").removeClass("is-invalid");
}

function validaInfo()
{
    var listo = 0;
    var company = $("#compania").val();
    if(company.length == 0)
    {
        listo = listo + 1;
        $("#eCompania").text("Nombre de compañia");
        $("#compania").addClass("is-invalid");
    }
    else{
        $("#eCompania").hide();
        $("#compania").removeClass("is-invalid").addClass("is-valid");
    }
    var nombre = $("#contacto").val();
    if(nombre.length == 0)
    {
        listo = listo + 1;
        $("#eNombre").text("Nombre de la persona para contacto.");
        $("#contacto").addClass("is-invalid");
    }
    else{
        $("#eNombre").hide();
        $("#contacto").removeClass("is-invalid").addClass("is-valid");
    }
    var titulo = $("#titulo").val();
    if(titulo.length == 0)
    {
        listo = listo + 1;
        $("#eTitulo").text("Titulo.");
        $("#titulo").addClass("is-invalid");
    }
     else{
        $("#eTitulo").hide();
        $("#titulo").removeClass("is-invalid").addClass("is-valid");
    }
     var cedula = $("#cedula").val();
    if(cedula.length == 0)
    {
        listo = listo + 1;
        $("#eCedula").text("Titulo.");
        $("#cedula").addClass("is-invalid");
    }
    else{
        $("#eCedula").hide();
        $("#cedula").removeClass("is-invalid").addClass("is-valid");
    }
    var correo = $("#correo").val();
    if(correo.length == 0)
    {
        listo = listo + 1;
        $("#eCorreo").text("Correo.");
        $("#correo").addClass("is-invalid");
    }
    else{
        $("#eCorreo").hide();
        $("#cedcorreoula").removeClass("is-invalid").addClass("is-valid");
    }
    var telefono = $("#telefono").val();
    if(telefono.length == 0)
    {
        listo = listo + 1;
        $("#eTelefono").text("Telefono.");
        $("#telefono").addClass("is-invalid");
    }
    else{
        $("#eTelefono").hide();
        $("#telefono").removeClass("is-invalid").addClass("is-valid");
    }
    if(!$("#acepto").is(":checked"))
    {
        listo = listo + 1;
        $("#eTerminos").text("Terminos y Condiciones.");
        $("#acepto").addClass("is-invalid");
    }
    else
    {
        $("#acepto").removeClass("is-invalid").addClass("is-valid");
    }
    if(listo==0)
    {
        guardaDatos();
    }
    else{
         var miModal = new bootstrap.Modal(document.getElementById('modalError'));
            miModal.show();
    }
}
function formulario()
{
    location.reload();
}
function guardaDatos()
{
    var datos = {
        cedula:$("#cedula").val(),
        correo:$("#correo").val(),
        nombre:$("#contacto").val(),
        titulo:$("#titulo").val(),
        telefono:$("#telefono").val(),
        company:$("#compania").val()
    };

    $.ajax({
        // url:"https://localhost:7213/Inserta",
        url:"https://consulta.somee.com/Inserta",
        method:"POST",
        contentType: "application/json",
        data:JSON.stringify(datos),
        success:function(data)
        {
            $("#mNombre").text(datos.nombre);
            $("#mCorreo").text(datos.correo);
            $("#mCedula").text(datos.cedula);
            $("#mTitulo").text(datos.titulo);
            $("#mTelefono").text(datos.telefono);
            $("#mCompania").text(datos.company);

            var miModal = new bootstrap.Modal(document.getElementById('miModal'));
            miModal.show();
        },
        error: function(xhr,status,error)
        {
            console.error("Error:",error);
            alert("No existe la cedula.");
        }
    })
}
function validaCorreo()
{
    var correo = $("#correo").val().trim();
    var patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronCorreo.test(correo)) {
        $("#correo").addClass("is-invalid");
        valido = false;
    } else {
        $("#correo").removeClass("is-invalid").addClass("is-valid");
    }
}

function soloNumeros()
{
    var telefono = $("#telefono").val().trim();
    var len = telefono.length;
    if(len>10)
    {
        $("#telefono").addClass("is-invalid");
    }else {
        $("#telefono").removeClass("is-invalid").addClass("is-valid");
    }
}

function showTable()
{
    $("#frmParticipante").fadeOut();
    var modal = document.getElementById("miModal");
    var modalI = bootstrap.Modal.getInstance(modal);
    modalI.hide();
    llenaTabla();
    $("#frmTable").show();
}

function llenaTabla()
{
    $('#tbl-participantes').empty();
    $.ajax({
        // url:"https://localhost:7213/Busqueda/GetAll",
        url:"https://consulta.somee.com/busqueda/GetAll",
        method:"GET",
        dataType: "json",
        success:function(data)
        {
            data.forEach(function(data){
                $("#tbl-participantes").append(`
                    <tr>
                        <td>${data.company}</td>
                        <td>${data.cedula}</td>
                        <td>${data.nombre}</td>
                        <td>${data.titulo}</td>
                        <td>${data.correo}</td>
                        <td>${data.telefono}</td>
                    </tr>`
                )
            })
        },
        error: function(xhr,status,error)
        {
            console.error("Error:",error);
            alert("No hay datos");
        }
    })
}
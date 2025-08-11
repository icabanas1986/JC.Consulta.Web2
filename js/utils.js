$(document).ready(function(){
    $("#frmTable").hide();
});

function validaCedula()
{
    limpiaFormulario();
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
    var listo = false;
    if(!$("#acepto").is(":checked"))
    {
        $("#acepto").addClass("is-invalid");
    }
    else
    {
        $("#acepto").removeClass("is-invalid").addClass("is-valid");
        listo = true;
    }
    if(listo)
    {
        guardaDatos();
    }
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
            alert("No existe la cedula.");
        }
    })
}
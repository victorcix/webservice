function init(){

}

$(document).ready(function(){
    vertodo();
});

$(document).on("click","#btnvertodo", function(){
    vertodo();
});

$(document).on("click","#btnnuevo", function(){
    limpiar();
    $("#modalmantenimiento").modal('show');
});

$(document).on("click","#btnbuscar", function(){
    var apellidos = $('#txtapellidos').val();

    tabla= $('#cliente_table').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'pdfHtml5'
        ],
        "ajax":{
            url: 'ServicioCliente.php?op=buscarapellidos',
            type : "post",
            dataType : "json",
            data : {apellidos:apellidos},
            error: function(e){
                console.log(e.responseText);
            }
        },
        "ordering": false,
        'rowsGroup': [0,1],
        "bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 100,
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
    });
});








$(document).on("click","#btnbuscarid", function(){
    var id = $('#txtid').val();

    tabla= $('#cliente_table').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'pdfHtml5'
        ],
        "ajax":{
            url: 'ServicioCliente.php?op=mostrarid',
            type : "post",
            dataType : "json",
            data : {id:id},
            error: function(e){
                console.log(e.responseText);
            }
        },
        "ordering": false,
        'rowsGroup': [0,1],
        "bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 100,
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Filtrar tabla:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
    });
});







$(document).on("click","#btnguardar", function(){
    var id = $('#id').val();
    var nombres = $('#nombres').val();
    var apellidos = $('#apellidos').val();
    var email = $('#email').val();
    var celular = $('#celular').val();
     var direccion = $('#direccion').val();

     if ((nombres == "") || (apellidos == "") || (email == "") || (celular == "") || (direccion == "")) {  //COMPRUEBA CAMPOS VACIOS
    alert("Los campos no pueden quedar vacios");
    return true;
        }

    if(id==''){
        $.post("ServicioCliente.php?op=guardar",{nombres:nombres,apellidos:apellidos,email:email,celular:celular,direccion:direccion},function(data, status){

        });
    }else{
        $.post("ServicioCliente.php?op=actualizar",{id:id,nombres:nombres,apellidos:apellidos,email:email,celular:celular,direccion:direccion},function(data, status){

        });
    }

    $('#cliente_table').DataTable().ajax.reload();

    $("#modalmantenimiento").modal('hide');
});

function editar(id){
    $.post("ServicioCliente.php?op=mostrar",{id:id},function(data, status){
        data = JSON.parse(data);
        $('#id').val(data.id);
        $('#nombres').val(data.nombres);
        $('#apellidos').val(data.apellidos);
        $('#email').val(data.email);
        $('#celular').val(data.celular);
        $('#direccion').val(data.direccion);
    });

    $("#modalmantenimiento").modal('show');
}

function limpiar(){
    $('#id').val('');
    $('#nombres').val('');
    $('#apellidos').val('');
    $('#email').val('');
    $('#celular').val('');
     $('#direccion').val('');
}

function eliminar(id){
    Swal.fire({
        title: 'Desea Eliminar el Registro?',
        showCancelButton: true,
        cancelButtonText: `Cerrar`,
        confirmButtonText: `Eliminar`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.post("ServicioCliente.php?op=eliminar",{id:id},function(data, status){

            });

            Swal.fire('Eliminado!', '', 'success')

            $('#cliente_table').DataTable().ajax.reload();

        }
    })
}

function activar(id){
    $.post("ServicioCliente.php?op=activar",{id:id,estado:1},function(data, status){

    });

    $('#cliente_table').DataTable().ajax.reload();
}

function desactivar(id){
    $.post("ServicioCliente.php?op=activar",{id:id,estado:0},function(data, status){

    });

    $('#cliente_table').DataTable().ajax.reload();
}

function vertodo(){
    tabla= $('#cliente_table').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'pdfHtml5'
        ],
        "ajax":{
            url: 'ServicioCliente.php?op=listar',
            type : "post",
            dataType : "json",
            error: function(e){
                console.log(e.responseText);
            }
        },
        "ordering": false,
        'rowsGroup': [0,1],
        "bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 100,
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Filtrar Tabla:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
    });
}

             function soloNumeros(e){
                var key = window.Event ? e.which : e.keyCode
                return (key >= 48 && key <= 57)
            }


              function soloLetras(e) {
                    var key = e.keyCode || e.which,
                      tecla = String.fromCharCode(key).toLowerCase(),
                      letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
                      especiales = [8, 37, 39, 46],
                      tecla_especial = false;

                    for (var i in especiales) {
                      if (key == especiales[i]) {
                        tecla_especial = true;
                        break;
                      }
                    }

                    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
                      return false;
                    }
                  }


init();
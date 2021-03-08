<!DOCTYPE html>
<html lang="en">
<head>
    <title>Clientes</title>
    <meta charset="utf8">
    <meta name="viewport" >
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" >
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.dataTables.min.css" >
</head>
<body>

<div id="container" class="container">
    <div class="container-fluid">
        <div class="panel panel-default">
            <hr>

            <h2>Mantenimiento de Clientes</h2>

            <hr>

            <div class="panel-body">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" id="txtapellidos" placeholder="Buscar por Apellido" aria-label="Ingrese Apellido" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button" id="btnbuscar">Buscar por Apellido</button>
                        <button class="btn btn-info" type="button" id="btnvertodo">Ver Todo</button>
                    </div>
                </div>
            </div>



             <div class="input-group mb-3">
                    <input type="text" class="form-control" id="txtid" placeholder="Buscar por ID" aria-label="Ingrese ID" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button" id="btnbuscarid">Buscar por ID</button>
                        <button class="btn btn-info" type="button" id="btnvertodo">Ver Todo</button>
                    </div>
                </div>
            </div>



            <hr>

            <div class="panel-body">
                <button type="button" class="btn btn-primary" id="btnnuevo">Nuevo</button>
            </div>

            <hr>

            <div class="panel-body">
                <table id="cliente_table" class="display">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Email</th>
                            <th>Celular</th>
                            <th>Dirección</th>
                            <th>Estado</th>
                            <th>Accion</th>
                            <th></th>
                        </tr>
                    </thead>
                <tbody>

                </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalmantenimiento" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Mantenimiento Cliente</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <input type="hidden" name="id" id="id"/>
            <div class="form-group">
                <label for="nombres" class="col-form-label">Nombres</label>
                <input type="text" class="form-control" id="nombres" name="nombres" onkeypress="return soloLetras(event)" required>
            </div>
            <div class="form-group">
                <label for="apellidos" class="col-form-label">Apellidos</label>
                <input type="text" class="form-control" id="apellidos" name="apellidos" onkeypress="return soloLetras(event)" required>
            </div>
            <div class="form-group">
                <label for="email" class="col-form-label">Email</label>
                <input type="text" class="form-control" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="celular" class="col-form-label">Celular</label>
                <input type="text" class="form-control" id="celular" name="celular"  onKeyPress="return soloNumeros(event)" required>
            </div>
            <div class="form-group">
                <label for="direccion" class="col-form-label">Direccion</label>
                <input type="text" class="form-control" id="direccion" name="direccion"  required>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnguardar">Guardar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        </div>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.js" ></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" ></script>
<script src="https://cdn.datatables.net/buttons/1.5.6/js/dataTables.buttons.min.js" ></script>
<script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.flash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js" ></script>
<script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.html5.min.js" ></script>
<script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.print.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>

<script src="mntcliente.js" type="text/javascript"></script>

</body>
</html>
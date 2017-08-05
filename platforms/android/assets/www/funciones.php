<?php

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    }


$servername = "localhost";
$username = "id1923973_zaion_user01";
$password = "Zaion1250";
$dbname = "id1923973_01_curso";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

	//echo ">>." . PHP_EOL;
	$v_opcion=$_POST['opcion'];


//echo "Información del host: " . mysqli_POST_host_info($conn) . PHP_EOL;

// usuario
	if ($v_opcion=='usuario_entrar'){
		$v_correo=htmlspecialchars($_POST['email'],ENT_QUOTES);
		  $v_encontrado=0;
			$strQuery = "select id_usu,usuario,imagen,correo,genero,fecha_cumple from admin_usu where correo='$v_correo'";

			if ($conn->multi_query($strQuery)){
		  	if ($result=$conn->store_result()){
		  		while($row=$result->fetch_assoc()){
		  			echo json_encode($row);
		  			$v_encontrado=1;
		  		}
		  		$result->free();
		  	}
	  	}
			if ($v_encontrado==0){
	  		echo 0;
	  	}
	}
	if ($v_opcion=='registro_google'){
		$v_id=$_POST['id'];
		$v_usuario=$_POST['usu'];
		$v_correo=htmlspecialchars($_POST['email'],ENT_QUOTES);
		$v_imagen=$_POST['imagen'];
		$strQuery = "insert into admin_usu (id_tiplog,id_login,usuario,nombre,correo,imagen) ".
                            " values (1,'$v_id','$v_usuario','$v_usuario','$v_correo','$v_imagen')  ON DUPLICATE KEY UPDATE entrada=entrada+1";

	  	$conn->multi_query($strQuery);
	  	echo 1;
	}
	if ($v_opcion=='registro_facebook'){
		$v_usuario=$_POST['usu'];
		$v_id=$_POST['id'];
		$v_imagen=$_POST['imagen'];
		$strQuery = "insert into admin_usu (usuario,nombre,id_logintip,id_login,imagen) values ('$v_usuario','$v_usuario',2,$v_id,'$v_imagen')  ON DUPLICATE KEY UPDATE entrada=entrada+1";

	  	$conn->multi_query($strQuery);
	  	echo 1;
	}
	if ($v_opcion=='registro_correo'){
		$v_nombre=htmlspecialchars($_POST['nombre'],ENT_QUOTES);
		$v_apellido=htmlspecialchars($_POST['apellido'],ENT_QUOTES);
		$v_correo=htmlspecialchars($_POST['correo'],ENT_QUOTES);
		$v_genero=htmlspecialchars($_POST['genero'],ENT_QUOTES);
		$v_password=htmlspecialchars($_POST['password'],ENT_QUOTES);
		$strQuery = "insert into admin_usu (nombre,apellido,correo,genero,password) ".
								"values ('$v_nombre','$v_apellido','$v_correo','$v_genero','$v_password')  ON DUPLICATE KEY UPDATE entrada=entrada+1";

	  	$conn->multi_query($strQuery);

			$v_encontrado=0;
			$strQuery = "select id,usuario,imagen,correo,genero,fecha_cumple from admin_usu where correo='$v_correo'";
			if ($conn->multi_query($strQuery)){
		  	if ($result=$conn->store_result()){
		  		while($row=$result->fetch_assoc()){
		  			echo json_encode($row);
		  			$v_encontrado=1;
		  		}
		  		$result->free();
		  	}
	  	}
			if ($v_encontrado==0){
	  		echo 0;
	  	}
	}
	if ($v_opcion=='usuario_dispositivo'){
		$v_usuario=htmlspecialchars($_POST['usuario'],ENT_QUOTES);
		$v_dispositivo=$_POST['dispositivo'];
		$strQuery = "insert into admin_usu_disp (codigo,id_usu) ".
								"values ('$v_dispositivo',$v_usuario)  ON DUPLICATE KEY UPDATE num_entrada=num_entrada+1";
	  	$conn->multi_query($strQuery);
		echo $strQuery;
	}


//curso
	if ($v_opcion=='curso_nuevo'){
		$v_usuario=htmlspecialchars($_POST['usuario'],ENT_QUOTES);
		$v_nombre=htmlspecialchars($_POST['nombre'],ENT_QUOTES);
		$v_descripcion=htmlspecialchars($_POST['descripcion'],ENT_QUOTES);
		$v_carpeta=htmlspecialchars($_POST['carpeta'],ENT_QUOTES);
		$v_tag=htmlspecialchars($_POST['tag'],ENT_QUOTES);

		if (isset($_POST['nombre']) && trim($_POST['nombre'])!=''){
			$strQuery = "	select count(*) as conteo from  curs_nom  where nombre='$v_nombre'";

			$conn->multi_query($strQuery);
			$result=$conn->store_result();
			$row=$result->fetch_assoc();
			$existe=0;
			$existe=$row['conteo'];
		  	$result->free();

			if ($existe==0){
					$strQuery = "insert into curs_nom (nombre,descripcion,id_carp,id_usu) values ('$v_nombre','$v_descripcion',$v_carpeta,$v_usuario)";
			  	$conn->multi_query($strQuery);
					echo 1;
			}else{
				echo 'Existe un curso con esa información';
			}
		}else{
		echo 'Debe de ingresar un nombre del curso valido';
		}
	}


	if ($v_opcion=='curso_tarea_nuevo'){
		$v_usuario=htmlspecialchars($_POST['usuario'],ENT_QUOTES);
		$v_curso=htmlspecialchars($_POST['curso'],ENT_QUOTES);
		$v_descripcion=htmlspecialchars($_POST['descripcion'],ENT_QUOTES);
		$v_tarea=htmlspecialchars($_POST['tarea'],ENT_QUOTES);
		$v_tipo=htmlspecialchars($_POST['tipo'],ENT_QUOTES);
		$v_finaliza=htmlspecialchars($_POST['fecha_finalizacion'],ENT_QUOTES);

		if (isset($_POST['tarea']) && trim($_POST['tarea'])!=''){

			$strQuery = "insert into curs_tar (tarea,descripcion,id_tip,id_curs,id_usu,fecha_finalizacion) values ('$v_tarea','$v_descripcion',$v_tipo,$v_curso,$v_usuario,'$v_finaliza')";
			$conn->multi_query($strQuery);

			if ($v_tipo==2){
				$strQuery = "SELECT max(id_tar) as conteo from curs_tar";
				$conn->multi_query($strQuery);
				$result=$conn->store_result();
				$row=$result->fetch_assoc();
				$existe=0;
				$codigo=$row['conteo'];
			  	$result->free();

				$v_palabra=htmlspecialchars($_POST['palabras'],ENT_QUOTES);
				$data=json_decode($_POST['palabras']);

				foreach ($data as &$valor) {
					echo '>>'.$valor;
					$strQuery = "insert into curs_tar_glos (id_tar,palabra) values ($codigo,'$valor')";
					echo $strQuery;
				    	$conn->multi_query($strQuery);
				}
			}

			echo 1;
		}else{
			echo 'Debe de ingresar el titulo de la tarea';
		}
	}

	if ($v_opcion=='curso_tarea_nuevo_glosario'){
		$v_tarea=htmlspecialchars($_POST['id_tarea'],ENT_QUOTES);
		$v_palabra=htmlspecialchars($_POST['palabra'],ENT_QUOTES);

		if (isset($_POST['palabra']) && trim($_POST['palabra'])!=''){

			$strQuery = "insert into curs_tar (tarea,descripcion,id_curs,id_usu,fecha_finalizacion) values ('$v_tarea','$v_descripcion',$v_curso,$v_usuario,'$_finaliza')";
			  	$conn->multi_query($strQuery);
					echo 1;
			//}else{
			//	echo 'Existe una tarea con esta información';
			//}
		}else{
			echo 'Debe de ingresar el titulo de la tarea';
		}
	}


	if ($v_opcion=='curso_listado'){
		$v_usuario=htmlspecialchars($_POST['usuario'],ENT_QUOTES);
		$v_encontrado=0;

		$strQuery = "
		select a.*,c.*,b.id_rol,
			(select count(*) from curs_tem where curs_tem.id_curs=a.id_curs) as conteo_tema,
			(select count(*) from curs_tar where curs_tar.id_curs=a.id_curs) as conteo_tarea,
			(select count(*) from curs_adj where curs_adj.id_curs=a.id_curs) as conteo_adjunto
		from
			curs_nom a,curs_asig b, admin_usu c
		where
			a.id_curs=b.id_curs
			and a.id_usu=c.id_usu
			and b.id_usu=$v_usuario
		order by
			b.id_rol desc,a.curso" ;
		if ($conn->multi_query($strQuery)){
			if ($result=$conn->store_result()){
				while($row=$result->fetch_assoc()){
					$data[] = json_encode($row);
					$v_encontrado=1;
				}
				$result->free();
			}
		}
		if ($v_encontrado==0){
			echo 0;
		}else{
			echo json_encode($data);
		}
	}

	if ($v_opcion=='curso_busqueda'){
		$v_usuario=htmlspecialchars($_POST['usuario'],ENT_QUOTES);
		$v_encontrado=0;

		if (isset($_POST['asignar'])){
			$v_curso=$_POST['curso'];
			$strQuery = "insert into curs_asig (id_usu,id_curs,id_rol,id_est)
					values
					($v_usuario,$v_curso,1,1)";
			$conn->multi_query($strQuery);
		}

		$strQuery = "
		select a.id_curs,a.codigo,a.curso,c.usuario,count(b.id_usu) asignado
		from curs_nom a left join curs_asig b on a.id_curs=b.id_curs and b.id_est=1 and  b.id_usu=$v_usuario , admin_usu c
		where  a.id_usu=c.id_usu and a.id_est=1 group by 1,2,3,4 order by a.curso" ;

		if ($conn->multi_query($strQuery)){
			if ($result=$conn->store_result()){
				while($row=$result->fetch_assoc()){
					$data[] = json_encode($row);
					$v_encontrado=1;
				}
				$result->free();
			}
		}
		if ($v_encontrado==0){
			echo 0;
		}else{
			echo json_encode($data);
		}
	}


	if ($v_opcion=='curso_cronograma'){
		$v_curso=htmlspecialchars($_POST['curso'],ENT_QUOTES);
		$v_encontrado=0;

		if (isset($_POST['eliminar'])){
			$tarea=$_POST['tarea'];
			$strQuery = "delete from curs_tar_glos where id_tar=$tarea";
			$conn->multi_query($strQuery);
			$strQuery = "delete from curs_tar where id_tar=$tarea";
			$conn->multi_query($strQuery);
		}

		$strQuery = "select 'tar' tipo, tarea titulo,descripcion,fecha_finalizacion,
						DATE_FORMAT(fecha_finalizacion,'%d') dia,
						DATE_FORMAT(fecha_finalizacion,'%b') mes
						from curs_tar
						where id_curs=$v_curso
						order by fecha_finalizacion desc" ;
		if ($conn->multi_query($strQuery)){
			if ($result=$conn->store_result()){
				while($row=$result->fetch_assoc()){
					$data[] = json_encode($row);
					$v_encontrado=1;
				}
				$result->free();
			}
		}
		if ($v_encontrado==0){
			echo 0;
		}else{
			echo json_encode($data);
		}
	}

	if ($v_opcion=='curso_tareas'){
		$v_curso=htmlspecialchars($_POST['curso'],ENT_QUOTES);
		$v_encontrado=0;

		if (isset($_POST['eliminar'])){
			$tarea=$_POST['tarea'];
			$strQuery = "delete from curs_tar_glos where id_tar=$tarea";
			$conn->multi_query($strQuery);
			$strQuery = "delete from curs_tar where id_tar=$tarea";
			$conn->multi_query($strQuery);
		}

		$strQuery = "select *,DATE_FORMAT(fecha_finalizacion,'%d/%m/%Y') finalizacion from curs_tar where id_curs=$v_curso order by fecha_finalizacion desc" ;
		if ($conn->multi_query($strQuery)){
			if ($result=$conn->store_result()){
				while($row=$result->fetch_assoc()){
					$data[] = json_encode($row);
					$v_encontrado=1;
				}
				$result->free();
			}
		}
		if ($v_encontrado==0){
			echo 0;
		}else{
			echo json_encode($data);
		}
	}


	if ($v_opcion=='curso_adjuntos' || $v_opcion=='curso_tareas__adjuntos'){

		$v_curso=htmlspecialchars($_POST['curso'],ENT_QUOTES);
		$v_usuario=htmlspecialchars($_POST['usuario'],ENT_QUOTES);
		$v_encontrado=0;

		if (isset($_POST['eliminar'])){
			$v_adjunto=htmlspecialchars($_POST['adjunto'],ENT_QUOTES);
			$strQuery = "delete from curs_adj where id_adj=$v_adjunto";
			$conn->multi_query($strQuery);
		}
		if (isset($_POST['agregar'])){
			$v_codarchivo=htmlspecialchars($_POST['codigo_archivo'],ENT_QUOTES);
			$v_archivo=htmlspecialchars($_POST['archivo'],ENT_QUOTES);
			if (isset($_POST['tarea'])){
				$v_tarea=htmlspecialchars($_POST['tarea'],ENT_QUOTES);
				$strQuery = "insert into curs_adj (codigo_archivo,nombre_archivo,id_curs,id_tar,id_usu)
						values
						('$v_codarchivo','$v_archivo',$v_curso,$v_tarea,$v_usuario)";
				$conn->multi_query($strQuery);
			}else{
				$strQuery = "insert into curs_adj (codigo_archivo,nombre_archivo,id_curs,id_usu)
						values
						('$v_codarchivo','$v_archivo',$v_curso,$v_usuario)";
				$conn->multi_query($strQuery);
			}
		}

    if (isset($_POST['tarea'])){
        $v_tarea=htmlspecialchars($_POST['tarea'],ENT_QUOTES);
		    $strQuery = "select a.*,DATE_FORMAT(a.fecha_creacion,'%d/%m/%Y') creacion,b.usuario
            				from curs_adj a, admin_usu b
            				where a.id_usu=b.id_usu and a.id_curs=$v_curso and a.id_tar=$v_tarea and a.id_usu=$v_usuario " ;
    }else{
      $strQuery = "select a.*,DATE_FORMAT(a.fecha_creacion,'%d/%m/%Y') creacion,b.usuario
                  from curs_adj a, admin_usu b
                  where a.id_usu=b.id_usu and a.id_curs=$v_curso and a.id_usu=$v_usuario" ;
    }

		if ($conn->multi_query($strQuery)){
			if ($result=$conn->store_result()){
				while($row=$result->fetch_assoc()){
					$data[] = json_encode($row);
					$v_encontrado=1;
				}
				$result->free();
			}
		}
		if ($v_encontrado==0){
			echo 0;
		}else{
			echo json_encode($data);
		}
	}

	if ($v_opcion=='curso_detalle'){
			$v_curso=htmlspecialchars($_POST['curso'],ENT_QUOTES);
			$v_rol=htmlspecialchars($_POST['rol'],ENT_QUOTES);

			$strQuery = "select 'tema' as tipo,id_tem,tema,descripcion,fecha_creacion,'' as fecha_finalizacion
					from  curs_tem
					where id_curs=$v_curso
					union
					select 'tarea' as tipo,id_tar,tarea,descripcion,fecha_creacion,fecha_finalizacion
					from curs_tar
					where id_curs=$v_curso
					union
					select 'adjunto' as tipo,id_adj,nombre_archivo,codigo_archivo,fecha_creacion,'' as fecha_finalizacion
					from curs_adj
					where id_curs=$v_curso";

			if ($conn->multi_query($strQuery)){
			if ($result=$conn->store_result()){
				while($row=$result->fetch_assoc()){
					echo json_encode($row).'--%';
					$v_encontrado=1;
				}
				$result->free();
			}
		}
		if ($v_encontrado==0){
			echo 0;
		}
	}




//Comentarios

	if ($v_opcion=='comentario_nuevo'){
		$v_usuario=htmlspecialchars($_POST['usuario'],ENT_QUOTES);
		$v_comentario=htmlspecialchars($_POST['comentario'],ENT_QUOTES);
		$strQuery = "insert into admin_comentario (id_usu,comentario) ".
								"values ($v_usuario,'$v_comentario')";
	  	$conn->multi_query($strQuery);
		echo 1;
	}

	if ($v_opcion=='comentario_lista'){
		$v_encontrado=0;

		$strQuery = "select * from admin_comentario order by  fecha_creado" ;
		if ($conn->multi_query($strQuery)){
			if ($result=$conn->store_result()){
				while($row=$result->fetch_assoc()){
					$data[] = json_encode($row);
					$v_encontrado=1;
				}
				$result->free();
			}
		}
		if ($v_encontrado==0){
			echo 0;
		}else{
			echo json_encode($data);
		}
	}


mysqli_close($conn);
 ?>

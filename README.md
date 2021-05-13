# Virket
Instalacion:  
	Contar con el entorno de trabajo configurado:
		-Sdk android.
		-Editor de texto o IDE.
	
	Paso #1: Descarag el zip del proyecto desde github o utilizar el comando git clone  url desde la terminal de su editor.
	Paso #2: Ejecutar el comando npm install( el comando creara la carpeta node_modules con las referencias del archivo package.json).
	paso #4: Ejecutar el comando ionic cordova platform add android, se creara la carpeta android en la carpeta platforms.
	paso #5: Para  generar solo la apk usar el comando ionic cordova build android, se creara una apk en el path platforms\android\app\build\outputs\apk\debug.
	Paso #6: Para hacer run la app usar el comando ionic cordova run android con el dispositivo conectado y habilitado la opcion de desarrollador, en caso de no contar con un dispositivo puede ejecutar un emulador de android studio.

	Nota: La aplicacion no funcionara en el navegador ya que se ejecutan dos complementos nativos.
		-native storage.
		-htt native.
	
	El unico punto pendiete del proyecto fue el siguiente:
		-Código: RF07 productActions.
	
	Bugs:
		-en el apartado de detalle del producto se implemento un scroll para que se oculte la imagen y detalles del mismo, se hizo la prueba en varios dispositivos y en un xiaomi el scroll no se ejecutaba  de la manera correcta.

	Dispositivos donde se hicieron pruebas:
		-xiaomi.
		-moto one macro.
		-mogo g7 power.
		-nokia 4.2.
		-samsung A71.
		-Lg v30+.
		

	Comandos:
	Run `git clone`
	Run `npm install`
	Run `ionic cordova platform add android `
	Run `ionic cordova build android`
	Run `ionic cordova run android`

	Anexos:
		https://github.com/alicarlo/virketShoppingCar.git;
		https://drive.google.com/drive/folders/1Dy6wuX9qaUnvF3jOwPWXd9N6rrkJvLLq?usp=sharing

	

	
	

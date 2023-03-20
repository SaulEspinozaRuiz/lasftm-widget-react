## Widget para mostrar la cancion que se esta en reproduccion.

Este widget hace uso de la api de last.fm para obtener la cancion que se esta reproduciendo en el
momento, para poder usarlo es necesario tener una cuenta en last.fm y obtener una api key.

Estos datos se requieren en un archivo .env en la raiz del proyecto, el archivo debe tener el
siguiente formato:

```bash
VITE_LASTFM_USER=********************************************
VITE_LASTFM_API=********************************************
```

Para ejecutar el proyecto se debe usar el comando:

```bash
npm run dev
```

![Widget](/src/assets/sample.png)

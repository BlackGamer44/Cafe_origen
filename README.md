# Café Origen — Sitio web estático

Sitio hecho con **HTML + CSS + JavaScript (Bootstrap 5)**. Incluye:
inicio, historia, misión y visión, menú, promociones, ubicación +
horarios + contacto + formulario, Google Maps, modo oscuro y selector
de idioma Español/Inglés. Es 100% responsivo (celular, tablet,
escritorio).

## Cómo abrir el sitio

Ya no necesitas PHP. Abre `index.html` en el navegador, o sirve la
carpeta con cualquier servidor estático:

```bash
cd cafe-origen
npx --yes serve .
```

O arrastra `index.html` al navegador.

## Estructura

```
cafe-origen/
├── index.html
├── historia.html
├── mision-vision.html
├── menu.html
├── promociones.html
├── visitanos.html
└── assets/
    ├── css/style.css
    ├── js/script.js
    └── img/
        ├── menu/      → fotos de productos
        ├── promos/    → fotos de promociones
        └── historia/  → fundadores.jpg (agregar si aún no está)
```

## Formulario de contacto

Sin servidor, el formulario abre el cliente de correo (`mailto:`)
con el mensaje listo para enviar a `hola@cafeorigen.com`.

## Funciones incluidas

- **Modo oscuro**: botón de luna/sol, se recuerda con `localStorage`.
- **Idioma ES/EN**: botón EN/ES, también se recuerda.
- **Filtro de menú** por categoría (calientes / frías / comida).
- **Diseño responsivo** con Bootstrap 5.

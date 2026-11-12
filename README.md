# 🌱 Huerta Mágica

Tienda de kits de jardinería para niños. Web estática (HTML + CSS + JS) con pedidos por WhatsApp
y base de datos opcional (XAMPP o Supabase).

## Estructura
```
huerta-magica/
├── index.html              Solo el contenido (sin CSS ni JS dentro)
├── css/
│   ├── bootstrap-lite.css  Rejilla, botones, modales (copia ligera tipo Bootstrap)
│   ├── theme.css           Colores, fuentes, título de marca, hero
│   ├── components.css      Productos y pasos
│   └── cart.css            Carrito y botón fijo
├── js/                     Se cargan en este orden:
│   ├── bootstrap-lite.js   Modales, carrito lateral, menú
│   ├── config.js           ⚙️ Código admin, Supabase, URL de XAMPP
│   ├── data.js             Productos y contactos por defecto
│   ├── store.js            Estado, localStorage y avisos
│   ├── contacto.js         WhatsApp y redes
│   ├── carrusel.js         Carrusel de fotos
│   ├── productos.js        Tarjetas de productos
│   ├── carrito.js          Carrito, pago, envío del pedido
│   ├── admin.js            Modo administrador
│   ├── efectos.js          Emojis y lluvia
│   └── main.js             Arranque
├── images/                 kit-sembrando-vida.jpg, semillas.jpg, logo.png, qr-yape.png ...
├── api/pedidos.php         Guarda pedidos en MySQL (XAMPP)
└── database/
    ├── xampp.sql           Tabla para phpMyAdmin
    └── supabase.sql        Tabla + seguridad (RLS) para Supabase
```

## Usar con XAMPP
1. Copia la carpeta a `C:\xampp\htdocs\huerta-magica`.
2. Inicia Apache y MySQL. En phpMyAdmin importa `database/xampp.sql`.
3. En `js/config.js`: `xamppUrl: "http://localhost/huerta-magica/api/pedidos.php"`.
4. Abre `http://localhost/huerta-magica/`.

## Usar con Supabase
1. Ejecuta `database/supabase.sql` en el SQL Editor.
2. En `js/config.js` pon `supabaseUrl` y `supabaseKey` (clave *anon public*).

## Publicar en GitHub Pages
`git init && git add . && git commit -m "Huerta Mágica"`, sube al repositorio y activa
Settings → Pages → rama `main`. Ahí no corre PHP: usa Supabase.

## Pendiente de seguridad
`codigoAdmin` en `js/config.js` es visible para cualquiera. Para protegerlo de verdad,
el login del admin debe validarse en el servidor (Supabase Auth o PHP).

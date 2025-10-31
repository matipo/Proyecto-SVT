<h1 align="center">
<a href="https://imgbb.com/"><img src="https://i.ibb.co/HkPdbQD/ticket.png" alt="ticket" border="0" width="100"></a>

Proyecto SVT

</h1>
<div align="center">
  <a href="#requisitos-previos">Requisitos</a> |
  <a href="#instalación-para-colaboradores">Instalación</a> |
  <a href="#ejecutando-el-proyecto">Ejecutando el Proyecto</a>
</div>

<p align="center">Aplicacion web para el proyecto del ramo Tecnologias web y moviles</p>

## 🛠️ Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 18.x o superior)
- [Git](https://git-scm.com/) (para subir los cambios realizados)

## ⚙️ Instalación (para Colaboradores)

Sigue estos pasos para configurar el proyecto y trabajar en la **branch `dev`**.

1.  **Clona la _branch_ `dev` directamente:**
    Este comando clona el repositorio y te sitúa en la _branch_ `dev` automáticamente.

    ```sh
    git clone -b dev [https://github.com/matipo/Proyecto-SVT.git](https://github.com/matipo/Proyecto-SVT.git)
    cd Proyecto-SVT
    ```

2.  **Instala las dependencias (con pnpm):**
    Este comando leerá el archivo `package.json` y creará la carpeta `node_modules` en tu máquina.
    ```sh
    pnpm install
    ```

Este proyecto necesita variables de entorno para conectarse a la API.

1.  **En la raíz del proyecto (la carpeta `Proyecto-SVT`), crea un archivo llamado `.env`.**

2.  Copia y pega el siguiente contenido en ese archivo:

    ```env
    VITE_API_URL=[URL_DE_LA_API_AQUI]
    ```

    > **Nota:** Busca la `URL_DE_LA_API_AQUI` en las instrucciones del proyecto que se encuentra en [ulagosvirtual.cl](https://www.ulagosvirtual.cl/)

## 🖥️ Ejecutando el Proyecto

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo:

```sh
pnpm run dev
```

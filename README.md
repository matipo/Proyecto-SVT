<h1 align="center">
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#ea2831" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-ticket"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 5l0 2" /><path d="M15 11l0 2" /><path d="M15 17l0 2" /><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" /></svg>

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

## 🖥️ Ejecutando el Proyecto

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo:

```sh
pnpm run dev
```

# Challenge Técnico Front Mobile - Frávega Tech

Este proyecto implementa los requisitos funcionales y técnicos del challenge:

## Requisitos Funcionales

- Pantalla de Inicio (Home):
  - Obtiene lista inicial de usuarios de GitHub.
  - Muestra usuarios en FlatList con avatar y nombre.
  - Buscador para filtrar usuarios vía API.
  - Marcado de favoritos en memoria o AsyncStorage.

- Pantalla de Detalle del Usuario:
  - Navegación desde Home.
  - Muestra detalles del usuario via API.
  - Permite marcar/desmarcar favorito.

- Navegación y Estado Global:
  - React Navigation para navegación.
  - Context API para estado global de favoritos.

## Requisitos Técnicos

- React Native con Expo.
- React Navigation.
- Axios para peticiones HTTP.
- Uso de StyleSheet para estilos.

---




# Proyecto Expo - Setup y Uso

Este proyecto fue creado con [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) y usa Expo para el desarrollo móvil multiplataforma, para el challenge de Frávega.tech.

## Instrucciones para comenzar

### 1. Instalación de dependencias

> **Importante:** Para evitar conflictos con las dependencias y peer dependencies, ejecutá la instalación con el flag:

```bash
npm install --legacy-peer-deps

# o
yarn install --legacy-peer-deps
```
### 2. Ejecutar el proyecto
Para iniciar el proyecto, ejecutá el siguiente comando:

```bash
npx run start
```

### 3. Tests
Este proyecto utiliza Jest y React Native Testing Library para tests unitarios y de integración.

Ejecutar tests :

```bash
npm run test
```
Ejectutar tests en watch mode:

```bash
npm run test:watch
```
Esto permite ejecutar tests en modo interactivo, corriendo solo los tests afectados al cambiar archivos.


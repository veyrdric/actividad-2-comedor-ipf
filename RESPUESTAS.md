# RESPUESTAS — TP N° 2 · Expo Router

Alumno: Ruiz Diaz Dario Ezequiel  ·  Fecha de entrega: 01 de Octubre de 2026

---

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos

**a)** LIFO es "el último que entra es el primero que sale" y es la **pila**. FIFO es "el primero que entra es el primero que sale" y es la **cola**.

**b)** En la pila se entra y se sale por el mismo lado (el tope). En la cola se entra por el final y se sale por el frente.

**c)** Pila: el historial de pantallas de una app, el botón "atrás" saca la última. Cola: la lista de reproducción de música, se reproduce en el orden en que se agregaron.

### A2. Seguimiento de una pila

Paso a paso:

```
push('Inicio')      → [Inicio]
push('Productos')   → [Inicio, Productos]
push('Detalle 3')   → [Inicio, Productos, Detalle 3]
pop()               → [Inicio, Productos]
push('Perfil')      → [Inicio, Productos, Perfil]
```

- (1) `p.tope()` → `'Perfil'`
- (2) `p.pop()` → `'Perfil'` (lo saca y lo devuelve)
- (3) `p.tope()` → `'Productos'`
- (4) `p.vacia` → `false`

Queda (base → tope): `[Inicio, Productos]`

### A3. Seguimiento de una cola

```
encolar('Ana')      → [Ana]
encolar('Beto')     → [Ana, Beto]
desencolar()        → [Beto]
encolar('Caro')     → [Beto, Caro]
encolar('Dani')     → [Beto, Caro, Dani]
```

- (1) `c.frente()` → `'Beto'`
- (2) `c.desencolar()` → `'Beto'`
- (3) `c.vacia` → `false`

Queda (frente → final): `[Caro, Dani]`

### A4. Análisis de la implementación

**a)** El `#` hace que el campo sea privado, solo se puede usar desde adentro de la clase. Evita que desde afuera alguien toque el array directamente (por ejemplo, hacer `p.items.push(...)`) y rompa cómo funciona la pila o la cola.

**b)** `shift()` saca el primero pero tiene que mover todos los demás un lugar, y con colas muy grandes eso se vuelve lento. Las colas "serias" guardan un índice que indica dónde está el frente, así desencolar solo mueve ese índice y no hay que correr nada.

**c)** La pila usa `pop()`, que saca el último del array. La cola usa `shift()`, que saca el primero. No pueden usar el mismo porque cada una saca por un extremo distinto.

### A5. Cola eficiente

```js
class ColaEficiente {
  #items = [];
  #frente = 0; // posición del primer elemento

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) return undefined;
    const x = this.#items[this.#frente];
    this.#items[this.#frente] = undefined;
    this.#frente++;
    return x;
  }

  frente() {
    return this.vacia ? undefined : this.#items[this.#frente];
  }

  get vacia() {
    return this.#frente >= this.#items.length;
  }

  get tamanio() {
    return this.#items.length - this.#frente;
  }
}
```

En vez de sacar el elemento del array, solo avanzo el índice del frente. (En la clase `Cola` del proyecto además agregué una limpieza cada tanto para que el array no crezca para siempre.)

### A6. Pila y cola en Expo Router

**a)** El historial de pantallas de un Stack es una **pila**. La pantalla que se ve es la de arriba (el tope), y "atrás" hace un `pop`, saca esa pantalla y queda la anterior.

**b)** Las acciones de navegación funcionan como una **cola**: se hacen en el orden en que llegaron. Si el usuario toca dos links muy rápido, se procesan los dos, uno atrás del otro (con dos `push` se apilarían dos pantallas).

---

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo | URL que genera / función |
|---|---|
| `src/app/(tabs)/index.tsx` | `/` (el grupo `(tabs)` no aparece en la URL) |
| `src/app/acerca.tsx` | `/acerca` |
| `src/app/(tabs)/perfil.tsx` | `/perfil` |
| `src/app/(tabs)/productos/index.tsx` | `/productos` |
| `src/app/(tabs)/productos/[id].tsx` | `/productos/3`, `/productos/5`, etc. (ruta dinámica) |
| `src/app/docs/[...slug].tsx` | `/docs/react`, `/docs/react/hooks`, etc. (catch-all, necesita al menos un segmento) |
| `src/app/_layout.tsx` | No genera pantalla, define el navegador (Stack, Tabs, etc.) de esa carpeta |
| `src/app/+not-found.tsx` | Pantalla 404, se muestra cuando la URL no existe |
| `src/app/Boton.tsx` | Genera un problema: como está dentro de `app/` se vuelve una ruta (`/Boton`). Los componentes tienen que ir en `src/components` |

### B2. De la URL al archivo

| URL | Archivo |
|---|---|
| `/categorias/bebidas` (y cualquier otra categoría) | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco` | `src/app/buscar.tsx` (lo que va después del `?` no se pone en el nombre del archivo) |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | `src/app/ayuda/[...slug].tsx` |
| `/ayuda` (con pantalla propia) | `src/app/ayuda/index.tsx` |

### B3. Verdadero o falso

- a) **F.** No hace falta registrar nada, con crear el archivo ya se crea la ruta.
- b) **F.** Los `_layout.tsx` no son pantallas, solo definen el navegador.
- c) **V.** Las carpetas con paréntesis sirven para organizar y no forman parte de la URL.
- d) **F.** Conviene `npx expo install` porque instala la versión compatible con el SDK. `npm install` puede traer una versión que no anda.
- e) **V.** Ese `main` reemplaza al `App.tsx` de antes.
- f) **V.** `/_sitemap` muestra todas las rutas de la app, sirve para revisar.
- g) **V.** `/docs` es una ruta exacta y tiene prioridad sobre el catch-all.
- h) **V.** Desde SDK 55 `expo-router` usa el mismo número de versión que el SDK.

---

## Parte C · Navegar: `<Link>`, router y la pila

### C1. Métodos de router

| Método | Qué le hace a la pila del Stack |
|---|---|
| `router.push(href)` | Agrega una pantalla nueva arriba, siempre |
| `router.navigate(href)` | Va a esa ruta: si ya estaba en la pila vuelve a ella, si no, agrega una nueva |
| `router.replace(href)` | Cambia la pantalla actual por la nueva, la pila no crece |
| `router.back()` | Saca la pantalla de arriba y vuelve a la anterior |
| `router.dismissTo(href)` | Saca pantallas hasta llegar a esa ruta (si no está, reemplaza la actual) |
| `router.dismissAll()` | Vuelve a la primera pantalla del Stack |
| `router.canGoBack()` | Dice si hay a dónde volver, no toca la pila |
| `router.setParams({...})` | Cambia los parámetros de la pantalla actual sin agregar nada a la pila |

### C2. Simulación de la pila

Empieza en `[ /productos ]` (base → tope):

| # | Instrucción | Pila resultante |
|---|---|---|
| 1 | `router.push("/productos/1")` | `[/productos, /productos/1]` |
| 2 | `router.push("/productos/2")` | `[/productos, /productos/1, /productos/2]` |
| 3 | `router.navigate("/productos/5")` | `[/productos, /productos/1, /productos/2, /productos/5]` |
| 4 | `router.push("/perfil")` | `[/productos, /productos/1, /productos/2, /productos/5, /perfil]` |
| 5 | `router.replace("/buscar")` | `[/productos, /productos/1, /productos/2, /productos/5, /buscar]` |
| 6 | `router.back()` | `[/productos, /productos/1, /productos/2, /productos/5]` |
| 7 | `router.dismissTo("/productos")` | `[/productos]` |
| 8 | `router.canGoBack()` → | `false` (queda una sola pantalla) |

### C3. ¿Link o router?

- a) `<Link>`, porque es un toque del usuario sobre algo de la pantalla.
- b) `router.replace`, porque la navegación pasa después de que responde la API, no por un toque. Con `replace` no se vuelve al formulario con "atrás".
- c) `router.back()`, cancelar un modal es volver a la pantalla anterior.
- d) `router.replace("/")`, así después del login no se puede volver al login con "atrás".
- e) `router.dismissTo("/pedidos")`, saca las tres pantallas de una vez.

### C4. Escribí el código

**a)**
```tsx
<Link href={{ pathname: '/productos/[id]', params: { id: 8 } }}>Ver producto</Link>
```

**b)**
```tsx
<Link href="/perfil" push>Perfil</Link>
```

**c)**
```tsx
<Link href="/carrito" asChild>
  <Pressable>
    <Text>Ir al carrito</Text>
  </Pressable>
</Link>
```

### C5. Pensar

En la web un `<a href>` real permite abrir el link en otra pestaña, copiarlo y compartirlo. En el celular no hay barra de direcciones, pero igual cada pantalla tiene su URL, y sirve para los deep links (abrir la app directo en una pantalla desde un mensaje o una notificación).

---

## Parte D · Stack, Tabs y Drawer

### D1. Comparación

| | Stack | Tabs | Drawer |
|---|---|---|---|
| ¿Apila pantallas? | Sí | No, las pestañas están al mismo nivel | No, las secciones están al mismo nivel |
| ¿Cómo cambia de pantalla el usuario? | Con links o botones, y vuelve con "atrás" | Tocando la barra de pestañas | Deslizando desde el costado o con el botón de menú |
| ¿Desde dónde se importa en SDK 57? | `expo-router` | `expo-router/js-tabs` | `expo-router/drawer` |
| Un caso de uso típico | De una lista de productos al detalle de uno | Las secciones principales (Inicio, Menú, Carrito) | Un panel con varias secciones, como el de la cocina |

### D2. Cada tab tiene su pila

Ve el detalle del producto 4. Cada tab mantiene su propia pila, entonces al volver a Productos sigue donde lo dejó. Instagram y Spotify funcionan así.

### D3. ¿Dónde va cada pantalla?

- a) Dentro de la tab (Stack de Productos), así la barra sigue visible.
- b) Stack raíz, para que tape la barra.
- c) Stack raíz (como modal), no pertenece a ninguna tab.
- d) Dentro de la tab Perfil, es parte de esa sección.

### D4. Configurar el Stack

**a)** `screenOptions` aplica a todas las pantallas del Stack. `options` aplica solo a esa pantalla y pisa a las de `screenOptions`.

**b)** Porque `(tabs)` ya trae sus propios headers, y si el Stack raíz también mostrara uno quedaría doble.

**c)** Sí existe, porque toda ruta se registra sola por el archivo. Declararla en el layout sirve para configurarle opciones (título, presentación, etc.).

**d)** Valores de `presentation`: `card`, `modal`, `transparentModal`, `fullScreenModal`, `formSheet`. Para una hoja inferior que abre al 50% usaría `formSheet` con `sheetAllowedDetents: [0.5, 1]`.

**e)** Desde la pantalla de detalle: `<Stack.Screen options={{ title: 'Producto 7' }} />`.

### D5. Tabs y Drawer en SDK 57

**a)** `Tabs` ya no se importa de `expo-router` sino de `expo-router/js-tabs`. La alternativa experimental son las pestañas nativas (`expo-router/unstable-native-tabs`), que usan la barra nativa de cada sistema.

**b)** Hacen falta `react-native-gesture-handler` y `react-native-reanimated` (también `react-native-worklets`). Conviene poner `GestureHandlerRootView` en el layout raíz para que anden los gestos.

**c)** No, desde SDK 56 el drawer ya viene dentro de `expo-router`.

**d)** `router.back()` actúa en el navegador que tiene el foco (el más interno). Si ese no puede volver, pasa al navegador de arriba.

---

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error

El parámetro `id` de la URL siempre llega como texto (`"3"`), pero en los productos el `id` es número (`3`). Con `===` se comparan distinto y nunca lo encuentra. Hay que convertirlo con `Number`:

```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNumero = Number(id);
  const producto = productos.find((p) => p.id === idNumero);

  if (Number.isNaN(idNumero) || !producto) {
    return <Text>No existe el producto {id}</Text>;
  }
  return <Text>{producto.nombre}</Text>;
}
```

### E2. Catch-all

| URL | slug |
|---|---|
| `/docs/react` | `['react']` |
| `/docs/react/hooks/useState` | `['react', 'hooks', 'useState']` |
| `/docs` | No coincide con `[...slug]` (hace falta al menos un segmento), da 404 salvo que exista un `docs/index.tsx` |

### E3. Anatomía de una URL

Con `rutasipf://buscar?q=mate&categoria=bebidas`:

**a)** El scheme es `rutasipf`, la ruta es `buscar`, y los parámetros son `q=mate` y `categoria=bebidas`.

**b)** Devuelve `{ q: 'mate', categoria: 'bebidas' }`.

**c)** No hacen falta corchetes. Los corchetes son para partes de la ruta que cambian, los parámetros después del `?` llegan igual en cualquier archivo.

**d)** Con `setParams` la pantalla se actualiza sin apilar otra, así "atrás" no pasa por cada letra que se escribió. Además la URL queda siempre actualizada y se puede compartir.

### E4. ¿Dónde estoy?

| Hook | En /productos/3 | En /buscar?q=chipa |
|---|---|---|
| `usePathname()` | `/productos/3` | `/buscar` |
| `useSegments()` | `['(tabs)', 'productos', '[id]']` | `['buscar']` |
| `useLocalSearchParams()` | `{ id: '3' }` | `{ q: 'chipa' }` |

### E5. Local vs global

**a)** `useLocalSearchParams` da los parámetros de la pantalla donde se usa, y `useGlobalSearchParams` da los de la URL que está activa en toda la app. Por defecto uso el local, porque cada pantalla se ocupa de lo suyo y no se vuelve a renderizar por cambios de otras.

**b)** `useFocusEffect` ejecuta código cada vez que la pantalla vuelve a tener el foco, no solo al abrirse. Por ejemplo, para recargar la lista de pedidos cuando el usuario vuelve a esa pantalla.

**c)** No es un error de Expo Router, porque `/productos/mate` coincide con `[id]`. Validar que el producto exista le toca a la pantalla.

---

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

**a)** `<Redirect href="/productos" />` manda al usuario a `/productos`. Es como hacer `router.replace('/productos')`.

**b)** Tiene que reemplazar y no apilar, porque si apila, al tocar "atrás" el usuario vuelve a la pantalla que lo redirige y lo vuelve a mandar al mismo lugar, y queda atrapado.

### F2. Stack.Protected

```tsx
function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="privado" />
      </Stack.Protected>
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
```

**a)** La pantalla deja de existir en el navegador: no se puede entrar (ni por link ni por deep link) y, si el usuario estaba en ella, lo saca.

**b)** Porque al iniciar sesión el `guard` del login pasa a `false`, la pantalla se elimina sola y el Stack vuelve a la anterior.

**c)** Pasa cuando se navega a una ruta que en ese momento no está disponible (por ejemplo una protegida con el `guard` en `false`). Se evita revisando la sesión antes de navegar y dejando que `Stack.Protected` maneje esas rutas.

**d)** Se define en un solo lugar (el layout) y no hay que repetir la validación en cada pantalla. Además no se llega a mostrar contenido protegido por un instante y protege también los deep links.

### F3. 404, anchor y rutas tipadas

**a)** `+not-found.tsx` es la pantalla 404, se muestra cuando la URL no existe. Va en `src/app/`.

**b)** `anchor: "(tabs)"` indica qué pantalla queda abajo en la pila cuando se abre un deep link directo. Así "atrás" lleva a las pestañas y no sale de la app. Se define en el `_layout.tsx` raíz.

**c)** Con `typedRoutes`, escribir `href="/prodcutos"` da error de TypeScript porque esa ruta no existe. Los tipos se generan solos al correr `npx expo start`.

### F4. Deep links

| Dónde | URL |
|---|---|
| App instalada (build propia) | `comedoripf://menu/7` |
| Expo Go en desarrollo | `exp://192.168.1.20:8081/--/menu/7` |
| Web (`npx expo start --web`) | `http://localhost:8081/menu/7` |

El `/--/` separa la dirección del servidor (IP y puerto) de la ruta de la app. El scheme propio no funciona en Expo Go porque Expo Go es otra app, y solo responde a `exp://`. El scheme `comedoripf` queda registrado únicamente en una build propia.

### F5. Errores comunes

**a)** Con `asChild`, `Link` le pasa las props al hijo y no acepta un array de estilos. Se arregla aplanándolo con `StyleSheet.flatten([...])`.

**b)** Todo archivo dentro de `src/app` es una ruta, entonces se creó `/TarjetaProducto`. Se soluciona moviendo el componente a `src/components`.

**c)** `router.push("/")` apila el inicio arriba del login, entonces "atrás" vuelve al login. Hay que usar `router.replace("/")`.

**d)** `npm install` instaló una versión que no es compatible con el SDK. Hay que usar `npx expo install`, y si ya se rompió, `npx expo install --fix`.

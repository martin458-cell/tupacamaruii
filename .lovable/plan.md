

## Plan: Corregir enlaces de Herramientas IA

### Problema
En móvil, el primer clic en una tarjeta intercepta la navegación (`e.preventDefault()`) para mostrar detalles, impidiendo que el usuario acceda a la página oficial.

### Solución
En `src/pages/HerramientasIA.tsx` (líneas 254-258):

1. **Eliminar el `preventDefault` en móvil** — quitar el bloque `onClick` que intercepta el clic, permitiendo que el `<a href>` funcione normalmente en todos los dispositivos.
2. **Mantener el `onMouseEnter`/`onMouseLeave`** para mostrar detalles en hover (desktop).
3. **En móvil**, el panel de detalles se mostrará al mantener presionado o simplemente no se mostrará — el clic llevará directo a la herramienta.

Cambio mínimo: eliminar las líneas 254-259 (el `onClick` handler completo).


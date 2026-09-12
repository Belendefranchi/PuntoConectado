# AGENTS.md — PUNTO CONECTADO

## 1. Objetivo

Este archivo contiene las reglas de trabajo que Codex debe respetar al analizar, modificar y mantener el proyecto web PUNTO CONECTADO.

Estas instrucciones son permanentes y deben aplicarse a todas las tareas realizadas sobre este repositorio.

---

## 2. Contexto obligatorio antes de trabajar

Antes de realizar cualquier modificación:

1. Leer este archivo `AGENTS.md`.
2. Leer `PROMPT_BASE.txt` para conocer las definiciones permanentes del proyecto.
3. Leer `VERSION.txt` para conocer la versión actual y el historial de cambios.
4. Revisar los archivos involucrados en la solicitud antes de modificarlos.
5. Revisar el estado actual del repositorio con Git cuando sea necesario para distinguir cambios existentes de cambios realizados durante la tarea.

No asumir la estructura o el contenido de un archivo sin inspeccionarlo previamente.

---

## 3. Alcance de las modificaciones

Modificar únicamente los archivos, componentes o secciones necesarios para cumplir la solicitud.

No realizar cambios adicionales por iniciativa propia salvo que sean estrictamente necesarios para que la modificación solicitada funcione correctamente.

Si una tarea indica explícitamente elementos que NO deben modificarse, deben conservarse sin cambios.

No realizar rediseños generales, refactorizaciones extensas ni cambios visuales fuera del alcance solicitado.

---

## 4. Conservación del diseño

Mantener la identidad visual existente de PUNTO CONECTADO salvo que la solicitud indique expresamente lo contrario.

Identidad principal:

* Nombre: PUNTO CONECTADO
* Slogan: TU PUNTO DE PARTIDA
* Color principal: `#22265D`
* Color secundario: `#00B0E6`

No modificar colores, tipografías, espaciados, tamaños, imágenes, estructura o comportamiento de componentes que estén fuera del alcance de la tarea.

---

## 5. Código limpio

Después de cada modificación:

* Eliminar código que haya quedado sin uso.
* Eliminar clases, reglas, variables, recursos o referencias obsoletas.
* No dejar código comentado que haya sido reemplazado.
* No conservar implementaciones anteriores si ya no son utilizadas.
* No introducir código duplicado innecesariamente.

El resultado final debe contener únicamente el código necesario para la versión vigente.

---

## 6. CSS

No duplicar clases ni reglas CSS.

Si una clase o selector existente necesita cambios:

* localizar su definición actual;
* modificar las propiedades necesarias en esa definición;
* eliminar propiedades que hayan quedado obsoletas.

No agregar una segunda definición del mismo selector como mecanismo para sobrescribir la anterior, salvo que exista una razón estructural válida relacionada con cascada, responsive design o estados específicos.

Antes de crear una nueva clase, comprobar si ya existe una clase que cumple esa función.

---

## 7. HTML y estructura

Mantener HTML semántico y una estructura clara.

Evitar:

* contenedores innecesarios;
* clases sin uso;
* estilos inline cuando el proyecto ya dispone de una estructura CSS apropiada;
* duplicación de componentes;
* elementos agregados únicamente para corregir visualmente un problema que pueda resolverse correctamente mediante CSS.

---

## 8. JavaScript

No agregar JavaScript si la funcionalidad puede resolverse correctamente con HTML o CSS.

Cuando sea necesario modificar JavaScript:

* reutilizar la lógica existente cuando corresponda;
* evitar duplicar funciones;
* eliminar código que quede obsoleto;
* no introducir dependencias nuevas sin necesidad.

---

## 9. Responsive design

Toda modificación visual debe comprobarse conceptualmente para:

* escritorio;
* tablet;
* dispositivos móviles.

No solucionar un problema de escritorio provocando regresiones evidentes en resoluciones menores.

Respetar los breakpoints y patrones responsive ya utilizados por el proyecto.

---

## 10. Versionado

El proyecto utiliza versionado semántico:

`MAJOR.MINOR.PATCH`

Ejemplo:

`1.0.12`

Para modificaciones normales y correcciones utilizar incremento de `PATCH`, salvo que la solicitud indique otro tipo de incremento.

Antes de determinar la nueva versión, consultar `VERSION.txt`.

No inventar la versión actual basándose únicamente en conversaciones, commits anteriores o suposiciones.

---

## 11. VERSION.txt

`VERSION.txt` debe mantener un historial acumulativo.

Cuando corresponda preparar una nueva versión:

1. Conservar el historial existente.
2. Agregar la nueva versión.
3. Describir de forma breve y concreta los cambios realizados.
4. Incluir el mensaje de commit correspondiente.

No eliminar versiones anteriores.

---

## 12. PROMPT_BASE.txt

`PROMPT_BASE.txt` contiene únicamente:

* reglas permanentes del proyecto;
* decisiones de diseño permanentes;
* cambios de definición que deban aplicarse en versiones futuras;
* versión y fecha actuales, y versión y fecha iniciales de referencia.

No agregar a `PROMPT_BASE.txt`:

* historial de versiones;
* detalle de cambios puntuales de una versión;
* mensajes de commit;
* información temporal que ya esté registrada en `VERSION.txt`, salvo la versión y fecha actuales.

Modificar `PROMPT_BASE.txt` cuando una tarea cambie una regla o definición permanente del proyecto, o para actualizar la versión y fecha actuales al preparar una nueva versión. Conservar la versión y fecha iniciales de referencia.

---

## 13. Mensajes de commit

Los mensajes de commit deben estar escritos en español e incluir siempre el número de versión.

Formato:

`vX.Y.Z - Descripción breve del cambio`

Ejemplo:

`v1.0.12 - Corregir degradado del navbar conservando los colores definidos`

La descripción debe indicar claramente el objetivo principal de la versión.

---

## 14. Git

Codex puede utilizar comandos Git de lectura para analizar el repositorio, por ejemplo:

* `git status`
* `git diff`
* `git log`
* `git show`

No ejecutar automáticamente:

* `git commit`
* `git push`
* `git reset --hard`
* `git clean`
* eliminación de ramas;
* reescritura del historial;
* otros comandos Git destructivos.

`git commit` y `git push` requieren autorización explícita del usuario.

No descartar cambios existentes que no hayan sido realizados por Codex.

---

## 15. Revisión antes de finalizar

Antes de considerar terminada una modificación:

1. Revisar los archivos modificados.
2. Ejecutar `git diff` cuando el proyecto esté bajo Git.
3. Confirmar que solamente se modificó lo necesario.
4. Buscar código obsoleto relacionado con el cambio.
5. Comprobar que no se hayan duplicado reglas CSS.
6. Verificar que no se hayan producido cambios accidentales en otras secciones.
7. Verificar coherencia responsive.
8. Comprobar si corresponde actualizar `VERSION.txt`.
9. Comprobar si corresponde actualizar reglas permanentes o la versión y fecha actuales en `PROMPT_BASE.txt`.

---

## 16. Manejo de incertidumbre

Si una solicitud es ambigua y existen varias interpretaciones que producirían resultados significativamente diferentes, no elegir arbitrariamente una.

Primero:

1. inspeccionar el código existente;
2. intentar resolver la intención utilizando el contexto del proyecto;
3. si continúa existiendo una ambigüedad relevante, consultar al usuario antes de realizar el cambio.

No inventar requisitos.

---

## 17. Errores y regresiones

Si durante una modificación se detecta un problema directamente causado por el cambio actual, corregirlo antes de finalizar.

Si se detecta un problema preexistente que no está relacionado con la tarea:

* no modificarlo automáticamente;
* informar al usuario;
* mantenerlo fuera del alcance de la versión salvo autorización expresa.

---

## 18. Dependencias

No instalar, actualizar ni eliminar dependencias del proyecto salvo que sea necesario para la tarea y exista autorización del usuario.

Antes de agregar una dependencia, comprobar si la funcionalidad puede implementarse utilizando las herramientas ya disponibles en el proyecto.

---

## 19. Archivos y recursos

No eliminar imágenes, fuentes, scripts, hojas de estilo u otros recursos únicamente porque parezcan no utilizados sin verificar previamente sus referencias.

Cuando una modificación deje un recurso definitivamente obsoleto, puede eliminarse como parte de la limpieza de la misma tarea.

No renombrar archivos innecesariamente.

---

## 20. Resultado esperado

Cada tarea debe terminar con un proyecto:

* funcional;
* limpio;
* consistente con el diseño existente;
* sin modificaciones fuera del alcance;
* sin código obsoleto generado por el cambio;
* sin reglas CSS duplicadas innecesariamente;
* correctamente versionado cuando corresponda.

Al finalizar, informar de forma concisa:

* qué se modificó;
* qué archivos fueron modificados;
* qué versión corresponde;
* qué mensaje de commit se propone;
* cualquier problema o decisión relevante detectada durante la tarea.

No realizar el commit ni el push hasta recibir autorización explícita.

## 21. Protección de archivos de contexto

Los archivos AGENTS.md, PROMPT_BASE.txt y VERSION.txt son archivos críticos
para la continuidad del proyecto.

VERSION.txt es un archivo de historial acumulativo y debe tratarse como
append-only.

Al crear una nueva versión:
- nunca reemplazar el contenido completo de VERSION.txt;
- nunca eliminar entradas de versiones anteriores;
- agregar la nueva entrada conservando literalmente el historial existente;
- antes de finalizar ejecutar `git diff -- VERSION.txt`;
- si el diff muestra eliminación de entradas históricas, detener la operación
  y corregirla antes de continuar.

AGENTS.md y PROMPT_BASE.txt tampoco deben reconstruirse desde cero.
Cuando sea necesario modificarlos, editar únicamente las secciones afectadas
y conservar el resto del contenido.

Antes de finalizar cualquier tarea que modifique alguno de estos tres archivos,
compararlo contra HEAD y verificar que no se haya perdido información.

Si existe cualquier duda sobre si determinado contenido histórico debe
eliminarse, conservarlo y consultar al usuario.

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
* Color principal: `#24265D`
* Color secundario: `#51AEE5`

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

## 22. Preservación integral del repositorio y principio de cambio mínimo

Esta regla es obligatoria para cualquier tarea que implique modificar, copiar,
extraer, reconstruir, empaquetar, comprimir o devolver el proyecto completo o
una parte de él.

### 22.1. Principio fundamental

Todo elemento existente antes de iniciar una tarea se considera PRESERVADO POR
DEFECTO.

Si el usuario no solicitó explícitamente modificar, reemplazar, mover, renombrar
o eliminar un elemento, dicho elemento debe permanecer exactamente como estaba.

La ausencia de una instrucción sobre un archivo NO constituye autorización para
eliminarlo, omitirlo, regenerarlo, reemplazarlo ni modificarlo.

Regla:

    NO SOLICITADO = NO TOCAR

Esta regla aplica tanto al contenido de los archivos como a la estructura del
repositorio.

### 22.2. Alcance de la preservación

Deben preservarse todos los elementos preexistentes, incluyendo:

- archivos;
- directorios;
- subdirectorios;
- archivos ocultos;
- directorios ocultos;
- archivos de configuración;
- metadatos pertenecientes al proyecto;
- assets;
- documentación;
- archivos auxiliares;
- archivos sin referencias aparentes;
- archivos generados que formen parte del proyecto;
- estructura Git;
- directorio `.git/`;
- `.gitignore`;
- `.gitattributes`;
- hooks o configuraciones Git existentes;
- cualquier otro elemento presente en el repositorio original.

No asumir que un elemento es prescindible porque no interviene directamente en
la ejecución del sitio.

### 22.3. Prohibición de eliminación implícita

Está prohibido eliminar u omitir elementos como efecto secundario de una tarea.

Una eliminación solamente está permitida cuando se cumple al menos una de estas
condiciones:

1. el usuario solicitó explícitamente eliminar ese elemento; o
2. el reemplazo solicitado hace técnicamente necesaria su eliminación y dicha
   eliminación pertenece inequívocamente al alcance aprobado.

En caso de duda, PRESERVAR.

No realizar limpieza oportunista.
No eliminar archivos aparentemente obsoletos.
No eliminar assets aparentemente no utilizados.
No eliminar archivos ocultos.
No eliminar `.git/`.

### 22.4. Regla especial para ZIP y otros paquetes

Cuando el usuario entrega un ZIP del proyecto y solicita una modificación, el
ZIP resultante debe considerarse una MODIFICACIÓN DEL PAQUETE ORIGINAL, no una
reconstrucción parcial del proyecto.

Por lo tanto:

    ZIP SALIDA = ZIP ENTRADA + CAMBIOS EXPLÍCITAMENTE SOLICITADOS

Todo elemento presente en el ZIP de entrada debe estar presente en el ZIP de
salida, salvo que su eliminación haya sido explícitamente solicitada o sea una
consecuencia directa y necesaria del reemplazo aprobado.

No crear el ZIP final seleccionando únicamente los archivos que parezcan
necesarios para ejecutar el proyecto.

No reconstruir manualmente la estructura del ZIP a partir de una lista parcial
de archivos.

La extracción y posterior compresión deben preservar la estructura completa del
paquete original.

### 22.5. Preservación obligatoria de `.git`

Si el proyecto recibido contiene `.git/`, el directorio `.git/` forma parte
integral del proyecto entregado y DEBE conservarse.

Está prohibido:

- omitir `.git/` del ZIP de salida;
- crear un repositorio Git nuevo;
- ejecutar `git init` para sustituirlo;
- reconstruir su historial;
- copiar solamente los archivos de trabajo;
- reemplazar su configuración;
- modificar su historial salvo autorización explícita.

La presencia de `.git/` debe verificarse ANTES y DESPUÉS de cualquier proceso
de extracción, modificación y reempaquetado.

### 22.6. Inventario previo obligatorio

Antes de modificar un proyecto recibido como directorio o paquete:

1. inspeccionar su estructura;
2. identificar archivos y directorios ocultos;
3. comprobar si existe `.git/`;
4. identificar los archivos que serán modificados;
5. establecer explícitamente el alcance permitido.

No asumir que una herramienta de extracción, copia o compresión preservará
automáticamente archivos o directorios ocultos.

### 22.7. Comparación entrada/salida

Antes de entregar un proyecto modificado, comparar la estructura original con
la estructura final.

Clasificar las diferencias como:

- MODIFICADO;
- AGREGADO;
- ELIMINADO;
- RENOMBRADO.

Todo elemento ELIMINADO o RENOMBRADO debe poder justificarse directamente por
una instrucción del usuario.

Si aparece una eliminación no solicitada:

    DETENER LA ENTREGA
    RESTAURAR EL ELEMENTO
    VOLVER A VALIDAR

No entregar el paquete mientras existan eliminaciones accidentales.

### 22.8. Git como mecanismo adicional de control

Cuando exista un repositorio Git válido, utilizar Git para verificar el alcance
antes de finalizar.

Ejecutar, como mínimo:

    git status --short
    git diff --stat
    git diff

Los cambios observados deben corresponder exclusivamente al alcance solicitado.

No utilizar Git como única comprobación de preservación cuando se esté
reconstruyendo un ZIP, porque un `.git/` omitido impediría precisamente realizar
esa comprobación.

Primero verificar la preservación estructural; después utilizar Git.

### 22.9. Regla de modificación mínima

Entre varias soluciones técnicamente válidas, elegir aquella que produzca la
menor cantidad de cambios sobre el estado existente.

No modificar un archivo simplemente para:

- reformatearlo;
- normalizarlo;
- reorganizarlo;
- limpiarlo;
- modernizarlo;
- mejorar su estilo;
- corregir problemas no relacionados;
- eliminar código aparentemente innecesario.

Los problemas preexistentes fuera del alcance pueden informarse, pero no deben
corregirse sin autorización.

### 22.10. Archivos críticos de continuidad

Además de las reglas específicas existentes para:

- AGENTS.md;
- PROMPT_BASE.txt;
- VERSION.txt;

estos archivos están sujetos al principio general de preservación.

Nunca deben reconstruirse a partir de memoria, conversaciones anteriores,
resúmenes ni versiones parciales cuando existe una copia original disponible.

El archivo existente es la fuente de verdad.

### 22.11. Validación obligatoria antes de empaquetar

Antes de generar el paquete final:

1. verificar que todos los elementos originales no afectados sigan presentes;
2. verificar archivos y directorios ocultos;
3. verificar `.git/` si existía originalmente;
4. revisar elementos agregados;
5. revisar elementos eliminados;
6. revisar elementos modificados;
7. comprobar que cada diferencia pertenece al alcance solicitado;
8. ejecutar las validaciones Git cuando corresponda;
9. comprobar la integridad técnica del paquete resultante.

### 22.12. Significado de "ZIP verificado"

No informar simplemente:

    "ZIP verificado"
    "ZIP verificado sin errores"
    "proyecto verificado"

salvo que se hayan realizado las verificaciones correspondientes.

Distinguir explícitamente entre:

A. INTEGRIDAD DEL ARCHIVO
El ZIP abre correctamente y no presenta errores de compresión/CRC.

B. INTEGRIDAD ESTRUCTURAL
La estructura de entrada y salida fue comparada y no existen pérdidas no
autorizadas.

C. INTEGRIDAD DEL REPOSITORIO
`.git/` y los demás elementos del repositorio fueron preservados.

D. ALCANCE DEL CAMBIO
Las diferencias encontradas corresponden exclusivamente a lo solicitado.

E. VALIDACIÓN FUNCIONAL/VISUAL
Las pruebas funcionales o visuales que realmente hayan podido ejecutarse.

Nunca presentar una de estas verificaciones como si implicara automáticamente
las demás.

### 22.13. Criterio ante incertidumbre

Ante cualquier duda sobre si un archivo, directorio, asset, configuración,
metadato o elemento oculto debe conservarse:

    CONSERVARLO.

Si conservarlo impide realizar correctamente la tarea, informar la situación
antes de eliminarlo o modificarlo.

La preservación tiene prioridad sobre la limpieza, optimización o simplificación
no solicitada.

# Elementos del TFM aprovechables en CV y portfolio

Extraído de *Securización de Edificios Inteligentes (Smart Buildings)* — Trabajo Fin de
Máster, Máster Universitario en Seguridad de las TIC, Universidad Europea de Madrid,
curso 2023-2024.

Este documento recoge material listo para pegar en los dos CV y señala qué se ha
incorporado ya al portfolio. Todo lo de aquí está respaldado por el contenido del TFM:
no hay nada inferido ni adornado.

---

## 1. Qué contiene realmente el trabajo

Conviene tenerlo claro antes de decidir qué reivindicar, porque el TFM es bastante más
denso de lo que sugiere el título.

| Bloque | Contenido |
|---|---|
| Análisis de riesgos | Identificación y estructuración de activos siguiendo MAGERIT, con dependencias entre activos y propagación del daño |
| Clasificación de amenazas | Taxonomía apoyada en marcos MITRE, relacionando CAPEC, CWE y CVE; patrones de ataque a sistemas de control industrial |
| Categorización de vulnerabilidades | Cuatro orígenes: protocolos de comunicación, operación y mantenimiento, desarrollo de software, desarrollo de hardware |
| Protocolos evaluados | KNX, KNX Secure, BACnet, BACnet/SC, Modbus, LonWorks, Zigbee, Z-Wave, MQTT, Matter, DALI |
| Marco normativo | ISO/IEC 27001, IEC 62443, NIS2, Directiva CER, Ley PIC 8/2011, RGPD, marco NIST, IEEE 802.1X |
| Entregable | Catálogo de buenas prácticas y controles por tipo de activo, cada medida etiquetada como de prevención, detección, protección o corrección |
| Dimensiones de seguridad | Confidencialidad, integridad y disponibilidad, más autenticidad y trazabilidad |

**Límite que conviene respetar:** el trabajo es teórico y se aplica a un modelo genérico
de edificio. No se validó en una instalación real. Nunca lo describas como implantación.

---

## 2. Para el CV de GRC / Consultoría

### Línea de formación (sustituye a la actual)

> **Máster en Seguridad de las TIC** — Universidad Europea de Madrid
> TFM: *Securización de Edificios Inteligentes*. Análisis de riesgos con metodología
> MAGERIT, clasificación de amenazas mediante los marcos CAPEC, CWE y CVE de MITRE, y
> elaboración de un catálogo de controles mapeado contra ISO/IEC 27001, IEC 62443 y NIS2.

### Viñetas alternativas, por si quieres separarlo en varias

- Apliqué la metodología **MAGERIT** para identificar y estructurar los activos de un
  entorno OT/IoT convergente, modelando dependencias entre activos y propagación del daño
  como base para dimensionar las salvaguardas.
- Clasifiqué amenazas y vulnerabilidades apoyándome en los marcos de **MITRE**,
  relacionando patrones de ataque (CAPEC), debilidades (CWE) y vulnerabilidades
  publicadas (CVE), con foco en patrones propios de sistemas de control industrial.
- Elaboré un **catálogo de controles de seguridad** organizado por tipo de activo, con
  cada medida clasificada por función: prevención, detección, protección o corrección.
- Analicé el encaje normativo de un entorno de edificio inteligente frente a
  **ISO/IEC 27001, IEC 62443, NIS2, Directiva CER, Ley PIC 8/2011 y RGPD**.

### Palabras clave para la sección de competencias

```
MAGERIT · Análisis y gestión de riesgos · Identificación de activos · Salvaguardas
ISO/IEC 27001 · SGSI · IEC 62443 · NIS2 · Directiva CER · Ley PIC 8/2011 · RGPD
NIST CSF · MITRE CAPEC · MITRE CWE · CVE · Modelado de amenazas
Clasificación de la información · Seguridad OT/IoT · Infraestructuras críticas
```

---

## 3. Para el CV de Redes / Sistemas / Infraestructura

El TFM también da material técnico de red, que en el CV de infraestructura rinde más que
la parte de gobierno.

### Línea de formación

> **Máster en Seguridad de las TIC** — Universidad Europea de Madrid
> TFM: *Securización de Edificios Inteligentes*. Análisis comparativo de la seguridad de
> los protocolos de automatización de edificios (KNX, BACnet, Modbus, LonWorks, Zigbee,
> Z-Wave, MQTT, Matter) y diseño de controles de red para entornos OT/IoT convergentes.

### Viñetas alternativas

- Evalué comparativamente los **protocolos de automatización de edificios** según las
  garantías de seguridad que ofrecen, incluidas sus variantes seguras (**BACnet/SC**,
  **KNX Secure** con cifrado AES-128 y TLS), determinando cuáles sostienen un entorno con
  requisitos reales y cuáles exigen compensación en capas superiores.
- Definí controles de red para entornos convergentes IT/OT: **segmentación**,
  **control de acceso a red (NAC) con IEEE 802.1X y RADIUS**, cifrado de comunicaciones,
  monitorización de tráfico, política de firewall y **redundancia**.
- Especifiqué medidas de seguridad física y de entorno para salas técnicas: alimentación
  ininterrumpida (SAI), control de temperatura y humedad, protección contra incendios y
  control de acceso físico.

### Palabras clave para la sección de competencias

```
KNX · KNX Secure · BACnet · BACnet/SC · Modbus · LonWorks · Zigbee · Z-Wave · Matter · MQTT
IEEE 802.1X · NAC · RADIUS · Segmentación de red · Cifrado de comunicaciones
BMS/BAS · Convergencia IT/OT · Edge Computing · Seguridad perimetral
```

---

## 4. Términos con alto valor para filtros automáticos

Estos aparecen en el TFM y son los que más se buscan en ofertas de consultoría y
ciberseguridad en España. Si no están en tu CV, los estás dejando en la mesa.

| Término | Por qué importa |
|---|---|
| **NIS2** | Directiva en aplicación desde 2024. Está generando demanda de perfiles de cumplimiento |
| **IEC 62443** | Norma de referencia en ciberseguridad industrial. Diferencia mucho en OT |
| **MAGERIT** | Metodología estándar en sector público español y en el Esquema Nacional de Seguridad |
| **MITRE CAPEC / CWE** | Menos común que ATT&CK en CV, y demuestra rigor en modelado de amenazas |
| **Directiva CER / Ley PIC** | Protección de infraestructuras críticas. Nicho con poca competencia |
| **Convergencia IT/OT** | Es el lenguaje con el que se describen estos puestos |

---

## 5. Cómo describirlo en una entrevista

Tres respuestas preparadas, por si te preguntan.

**¿De qué iba el TFM?**
De analizar la seguridad de los edificios inteligentes como lo que son, entornos donde
convergen IT y OT. Identifiqué los activos con MAGERIT, clasifiqué las amenazas con los
marcos de MITRE y acabé produciendo un catálogo de controles organizado por tipo de
activo y por función de la medida.

**¿Por qué MAGERIT y no otra metodología?**
Porque el trabajo se planteaba con vocación de aplicarse en España, donde MAGERIT es la
metodología de referencia en el sector público y encaja con el Esquema Nacional de
Seguridad. Además su estructura de activos y dependencias permite razonar la propagación
del daño, que es justo lo que necesitas para dimensionar salvaguardas.

**¿Qué limitaciones tiene?**
Es teórico y sobre un modelo genérico de edificio. No lo validé en una instalación real,
y esa era precisamente la línea futura que identifiqué: llevarlo a casos de estudio para
comprobar la eficacia de las medidas y afinarlas.

---

## 6. Qué se ha incorporado ya al portfolio

- **Tarjeta de proyecto del TFM**, ampliada a formato ancho con seis bloques: contexto,
  análisis de riesgos, clasificación de amenazas, protocolos evaluados, marco normativo y
  entregable, más una nota explícita sobre el alcance teórico.
- **Competencias GRC:** añadidos NIS2, IEC 62443, RGPD y MITRE CAPEC / CWE.
- **Formación:** descripción del TFM reescrita con la metodología real.
- Corregido un dato que era inexacto: la tarjeta anterior decía *implementación de
  controles ISO/IEC 27001*, cuando el trabajo propone controles, no los implanta.

Lo mismo se ha replicado en la versión autónoma para envío por correo.

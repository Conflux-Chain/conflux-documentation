---
id: pos_overview
title: Introducción a PoS
sidebar_position: 1
displayed_sidebar: generalSidebar
keywords:
  - Conflux-Network
  - Proof-of-Stake
  - PoS
  - consensus-mechanism
  - 51-attack
  - PoW-chain
  - pivot-block
  - voting-committee
  - BLS
  - VRF
  - staking
  - CFX
  - incentive-plan
  - security
tags:
  - Proof-of-Stake
---

Este documento es una introducción a la finalidad de Conflux PoS sin detalles prácticos. Es para ayudar a los lectores a entender PoS en general, y es esencial para leer otros documentos técnicos.

Puede haber un problema de ataque del `51%` en la fase inicial en una cadena PoW cuando el poder de hashing es bajo. Esto se convirtió en un problema aún más importante cuando surgieron las plataformas de renta de hashpower junto con el desarrollo de blockchains públicas. Ethereum Classic, Grin y Abge han sido víctimas del ataque del 51%.

Para hacer frente a las amenazas causadas por ataques del 51%, Conflux introduce una cadena PoS independiente. Los participantes del consenso de la cadena PoS firmarán el pivot de la estructura Tree-Graph. Todos los mineros de PoW deben seleccionar el bloque pivot con suficientes firmas en la cadena, incluso si sus bloques hermanos tienen más pesos. En pocas palabras, la cadena de PoS especifica un bloque pivot y todos los mineros de PoW deber seguir ese bloque.

Esto significa que mientras el consenso PoS vote a un bloque pivote, aunque los atacantes del 51% intenten revertir el bloque, no será reconocido por los nodos de PoW.

Conflux requiere que el consenso PoS utilice el poder de especificar bloques pivot de manera restrictiva. Un bloque debe confirmarse durante unos minutos según las reglas de PoW antes de que los nodos de PoS honestos lo firmen. Esto significa que los mineros de PoW siguen encargándose de la clasificación de bloques y la confirmación del tree-graph.

* La cadena de PoS sólo se utiliza para hacer frente al 51% de los ataques. Por lo tanto, sólo incluye funciones básicas como la votación del bloque pivot y la elección del comité de votación. No incluye las funcionalidades de blockchains generales como transacciones y ejecuciones de contratos
* Las características de la cadena de PoS son funcionalidades integradas en los nodos de Conflux. Externamente, sigue habiendo un solo programa: el Conflux-rust.
* En este documento, la cadena Conflux se refiere a la cadena de bloques en funcionamiento, y la cadena PoS se refiere a la cadena introducida.
* Hay aproximadamente 1 bloque de PoS generado por minuto. Todos los tiempos indicados a continuación corresponden al número de bloques.

## Cuenta de PoS

### Address (dirección)

En términos generales, el modelo de cuenta en una blockchain es: una clave privada crea una clave pública, y una clave pública produce una dirección. Las cuentas en la cadena de PoS son similares, pero hay dos claves privadas llamadas la clave privada BLS y la clave privada VRF, con sus correspondientes clave pública BLS y clave pública VRF. Las dos claves privadas son procesadas para obtener la dirección PoS, que actualmente es de 256-bits de  longitud.


```js
0xd731d7633dd38c47769c2a62926b9a54d288a5e664f4d2108ac5bb6601bb30f5
```

### Wallet (billetera)

La responsabilidad principal de una cuenta PoS es mantener el protocolo de consenso de Conflux. Cada cuenta PoS debe correr un nodo de Conflux independiente. Por lo tanto, el código de Conflux Core tiene la funcionalidad de cartera incorporada para cuentas PoS, incluyendo: Cuando se inicia el nodo Conflux por primera vez y se ejecuta en modo de cuenta PoS, generará automáticamente la clave privada PoS y requerirá que los usuarios proporcionen la contraseña. La clave privada que es encriptada por la contraseña suministrada es almacenada localmente.

* Cuando el nodo de Conflux se reinicia, se requiere que el usuario introduzca la contraseña para desbloquear el archivo de clave privada si el archivo de clave privada encriptado es detectado.
* Las transacciones se procesan automáticamente bajo el protocolo de consenso de PoS durante la operación, sin intervención del usuario.
* Puesto que la billetera está implementada por un nodo completo, la interacción con la cartera es primitiva, lo que puede implicar la copia de archivos manualmente, etc.

### Convertirse en un nodo de consenso

Después de crear una cuenta PoS, sólo puede convertirse en un nodo de consenso legal al hacer Staking y registrarse en la cadena PoW.

* Staking: sin diferencias respecto al proceso de staking corriente.
* Registro: involucra interactuar con un contacto interno específico en la red de Conflux; enviar información relevante proporcionada por el nodo completo; bloquear el monto en staking, un voto por `1000` CFX bloqueados.

Después de completar el registro, la cuenta de PoW que participó y la cuenta de PoS forman una relación vinculante uno a uno. La cuenta PoS no puede cambiar su vinculo con la cuenta PoW. La cuenta PoW puede vincularse con otras cuentas PoS siempre y cuando libere el vinculo anterior.

## Participando en el Consenso PoS

### Obtener derechos de voto

Las cuentas PoS pueden obtener derechos de voto bloqueando CFX. (consulte el capítulo “Convertirse en un nodo de consenso”)

* Conflux-rust supervisará automáticamente la información de registro. Por lo tanto, una vez registrada la cuenta PoS, realizará las operaciones correspondientes sin la intervención del usuario.
* Los usuarios pueden bloquear más tokens CFX en la cadena Conflux en cualquier momento para obtener más derechos de voto.
* Después de que el token está bloqueado, se tarda aproximadamente `10 minutos` en sincronizar el estado de la cadena Conflux a la cadena PoS. El usuario obtendrá los derechos de voto después de la sincronización.

### Retirar derechos de voto

La cuenta PoS puede retirar los derechos de voto y desbloquear CFX.

* Los usuarios deben utilizar la cuenta vinculada de PoW para enviar transacciones en la cadena Conflux para solicitar el desbloqueo de tokens (denominado "retiro" en el código). Los usuarios pueden desbloquear cualquier número de tokens bloqueados.
* Los usuarios pueden solicitar el desbloqueo en cualquier momento. Una vez que se solicite el desbloqueo, los derechos de voto correspondientes se invalidarán inmediatamente. Sin embargo, los tokens sólo se desbloquearán cuando se cumplan las siguientes condiciones:
  1. Los tokens han sido bloqueados por al menos 14 días.
  2. The request for unlocking has passed for 1 days
* Si existen multiples transacciones de bloqueo de tokens, van a ser desbloqueados en orden cronológico hasta que la cantidad desbloqueada requerida es alcanzada.

### Ejemplo

Supongamos que el usuario A bloquea 2000 CFX en 1 de enero, 3 y 5, respectivamente, y se aplica para desbloquear 3000 CFX el 9 de enero.

* Los 2000 CFX bloqueados el 1 de enero se desbloquearán primero.
* Requisito de 14 días de bloqueo: 1 de enero + 14 días = 15 de enero.
* 1-day requirement after unlocking request: Jan 9th + 1 days = Jan 10th.
* Therefore, there will be 2000 CFX unlocked on Jan 15th.
* Luego, 1000 CFX del bloqueo del 3 de enero se desbloquearán.
* Requisito de 14 días de bloqueo: 3 de enero + 14 días = 17 de enero.
* 1-day requirement after unlocking request: Jan 9th + 1 days = Jan 10th.
* Por lo tanto, se desbloquearán 1000 CFX el 17 de enero, lo que cumple con la cantidad solicitada de desbloqueo, 3000 CFX.

Al final, el usuario queda con 1000 CFX bloqueados el 3 de enero y 2000 CFX bloqueados el 5 de enero.

## El trabajo del consenso PoS

El siguiente contenido es sobre lo que hace el nodo PoS automáticamente, para su información.

### Comité de Candidatos

* La cuenta PoS se unirá a la elección de un comité de hasta `300` plazas a través de VRF.
* El comité se compone de 6 grupos, cada uno con 50 plazas.
* Cada hora, el grupo que sirvió más tiempo se retirará y un nuevo grupo tendrá entrará al comité..
* La elección comienza con una hora y media de antelación y termina con media hora de antelación.
* El voto de cada cuenta de PoS se considera un candidato independiente en el momento de la elección. Si una cuenta PoS tiene 10 votos, será considerada como 10 candidatos diferentes que participan en la elección. Si se han elegido 2 votos de esta cuenta, ocupará 2 plazas en esta comisión, y los restantes 8 votos pueden participar en las próximas elecciones.
* La cuenta PoS envía el resultado del VRF durante el período electoral. El valor del hash se calcula basándose en el resultado, y los 50 votos con el  hash más pequeño serán seleccionados.

Por ejemplo, si el resultado VRF es x, y la cuenta PoS tiene 5 votos, entonces el valor del hash es hash(x, 0) ~ hash(x, 4).

### Como miembro

* Los miembros del comité participarán en el consenso PoS y votarán el bloque pivot de la cadena Conflux.

### Plan de incentivos

**El interés de staking existente en Conflux será cancelado.**

* Después de que la cuenta PoS participe en la elección o se convierta en miembro del comité, los puntos se otorgarán en función de las diferentes acciones que tome. El puntaje total es de 6.000.000.
* Los puntos se reparten cuando cambia el comité (cada 60 bloques). El interés generado por la red de Conflux durante este período se dividirá en 6.000.000 de acciones uniformemente. El interés se distribuirá a las cuentas PoW que estén vinculadas a las cuentas PoS de acuerdo con los puntos que tengan.
* Los puntos producidos por un comité pueden ser inferiores a 6.000.000. El interés que no se distribuya será quemado.

### Composición del puntaje

* Los 10000 votos que participan en la elección y tienen el valor hash más pequeño obtienen 120 puntos cada uno, formando un total de 1.2M puntos.
* Se otorgarán 15.000 puntos a cuentas PoS por voto elegido. Habrá un total de 4,5 millones de puntos para las 300 votaciones del comité.
* Convertirse en el líder de un bloque PoS otorgará 3.000 puntos. Hay 60 bloques obteniendo un total de 180,000 puntos.
* Cada bloque PoS requiere 201 de 300 firmas, pero el líder puede reunir más de 200 firmas. A partir de la firma número 200, cada firma adicional recibirá desde 20 puntos hasta 2.000 puntos. Hay 60 bloques obteniendo un total de 120,000 puntos como máximo.

### Interés acumulado

* Dado que la cantidad de staking y la emisión total de CFX están cambiando, el interés generado por cada bloque de la cadena de Conflux también está cambiando. El interés generado por cada bloque en Conflux es: sqrt(staking total/CFX total circulando) * 4% / número de bloques por año.
* No se acumulará ningún interés si el comité PoS no ha sido modificado después de 7200 bloques consecutivos de la red. Los intereses acumulados se reanudarán sólo después de que se distribuya el interés actual. Esto es para evitar que los nodos PoS desaceleren deliberadamente el consenso para obtener más interés.

## Recordatorio de riesgos

### Pérdida del Principal

Si una cuenta PoS firma dos bloques PoS diferentes con el mismo peso, sus tokens CFX serán bloqueados permanentemente. Esta situación puede ocurrir cuando:

* La cuenta ataca el protocolo de consenso modificando el nodo de Conflux;
* Se usa la misma cuenta PoS en múltiples nodos de Conflux. (Esto causará que la misma cuenta realice operaciones contradictorias, que se consideran un ataque al protocolo de consenso.)
* Se pierden archivos de clave privada de la cuenta PoS.

### Riesgo de liquidez

* Todos los votos bloqueados se desbloquearán automáticamente si un candidato es elegido para formar parte del comité, pero no participa en la votación entre dos elecciones. All newly locked votes will unlock automatically in the next `1` days as well.

### Pérdida de Ingresos

* Si el nodo vinculado a la cuenta PoS no se ejecuta con éxito, puede que no haya ganancias.


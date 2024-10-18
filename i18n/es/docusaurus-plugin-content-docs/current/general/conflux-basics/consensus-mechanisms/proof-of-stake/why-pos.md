---
sidebar_position: 2
title: '¿Por qué introducir PoS?'
id: why_pos
keywords:
  - Conflux-Network
  - Proof-of-Stake
  - PoS
  - Proof-of-Work
  - PoW
  - 51-attack
  - hybrid-consensus
  - security
displayed_sidebar: generalSidebar
tags:
  - Proof-of-Stake
---

:::note

Este es un artículo escrito antes del merge de Ethereum para explicar por qué Conflux decide introducir PoS.

:::

Empecemos por explicar la realidad de que Conflux tendrá que considerar el riesgo de un ataque del 51% en un período bastante largo: debido a los enormes ingresos mineros de Ethereum y a las crecientes demandas de tarjetas gráficas, los mineros ya han comprado un montón de tarjetas gráficas, formando un enorme grupo de poder de hashing.

Conflux también utiliza tarjetas gráficas para la minería, y el poder de hashing de las tarjetas gráficas para mantener la seguridad de Conflux sigue estando muy por detrás de la de Ethereum. Por lo tanto, existe el riesgo de que un gran número de tarjetas gráficas se cambien a Conflux en un corto período de tiempo para realizar un ataque del 51%.

Riesgos similares de ataques del 51% no sólo existen en cadenas públicas de PoW con minería por tarjetas gráficas, también existen en blockchains como BCH, que utiliza la misma minería ASIC que BTC pero con una potencia de cómputo significativamente menor. Para hacer frente al riesgo de ataque del 51%, BCH ha llegado incluso a adoptar una solución "menos elegante" al limitar la duración de la cancelación.

En teoría, una cadena pública con PoW nunca puede eliminar completamente el riesgo de un ataque del 51%. En la práctica, si un atacante lanza o no un ataque del 51 % depende en gran medida de los beneficios y costos del ataque. En términos de la ganancia del atacante: un ataque del 51% exitoso no dañará la ganancia de la minería. La ganancia del atacante puede reducirse principalmente por dos razones. Uno es la pérdida causada por el colapso del valor del token después de un ataque exitoso; la otra es que la comunidad puede llegar a un consenso para hacer retroceder el estado a través de un hard fork para eliminar la ganancia del atacante. Sin embargo, hoy en día las blockchains han soportado múltiples activos en cadena y proporcionado servicios cruzados, así que ahora es difícil eliminar el impacto causado por un ataque de doble gasto a través de un simple hard fork, que es muy diferente de la situación cuando se bifurcó la ETC de ETH.

En términos de aumentar el coste para los atacantes del 51%, ahora hay tres opciones disponibles:

1. Evitar todos los grupos de poder de hashing de gran escala. Específicamente, abandonar la minería por tarjetas gráficas y cambiar a la minería especializada ASIC.
2. Obtener un poder de hashing en la red de Conflux cercana o incluso superior a la de Ethereum. Esto requiere aumentar los ingresos totales de la minería de Conflux a un nivel comparable al de Ethereum. La emisión de minería actual de Ethereum es de aproximadamente 2,6 ETH cada 13 segundos, o un promedio de 0,2 ETH por segundo. Basado en el precio de mercado de 3400 USD/ETH, que da a Ethereum un ingreso minero de unos 680 USD por segundo, o unos 58.752.000 USD por día. Para aumentar los ingresos de minería de Conflux a este nivel, requeriría un impulso de alrededor de 170 veces. Esto significa aumentar los ingresos de cada bloque a $340, es decir, aumentar la recompensa por bloque a más de 340 CFX manteniendo el precio de 1USD/CFX, o aumentar el precio unitario de CFX 170 veces mientras se mantiene la salida. Alcanzar este objetivo en el corto plazo puede requerir que Elon Musk envíe un tweet para CFX cada semana o incluso cada día.
3. Introducir un mecanismo de PoS para contrarrestar ataques del 51%. La decisión PoS hace imposible que un atacante consiga un ataque de doble gasto basado únicamente en la ventaja del poder de cómputo. a menos que el atacante invierta adicionalmente suficiente CFX para influir en la decisión de PoS.

De estas tres opciones, creemos que sólo la última es realmente factible.

En cuanto al roadmap técnico del equipo, el objetivo de Conflux es lograr una "plataforma de cadena pública descentralizada accesible y asequible para todos", en lugar de una "cadena pública con un protocolo específico de consenso de PoW". El enfoque técnico es sólo un medio para servir al objetivo, no al propio objetivo. Por esta razón, añadir decisiones PoS al final al mecanismo de consenso de Conflux para mejorar la velocidad de confirmación y resistir posibles ataques del 51% está en línea con los objetivos de Conflux. Además, reducir la complejidad y el riesgo potencial de añadir mecanismo de finalidad de PoS, elegimos dejar la selección y el despacho de las transacciones enteramente en manos de los mineros de PoW, y el ordenamiento de bloques sigue las reglas de ordenación de los árboles, con la votación de PoS sólo sobre la finalidad de bloques generados por los mineros de PoW.

En cuanto a la comprensión de PoW y PoS, nunca hemos cambiado: PoW es más seguro pero más lento para confirmar; PoS es más rápido de confirmar pero menos seguro. La combinación de PoW y PoS tiene el potencial de ser un protocolo de consenso más deseable

## Consenso Híbrido PoW + PoS?

- Las ventajas del consenso de PoW - seguridad y fiabilidad
- Ventajas de consenso PoS - eficiencia (confirmación rápida, bajo consumo de energía)
- Ambos pueden lograr un avance cercano al límite de capacidad de red
  - La expansión adicional requiere actualización de infraestructura o soluciones de capa 2
- ¿Cómo combinar las ventajas de ambos?
  - Alta seguridad
  - Confirmación rápida
  - Consumo energético razonable
